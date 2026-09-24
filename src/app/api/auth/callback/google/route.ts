import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { setSession } from "@/lib/auth/session";
import { Role, UserStatus } from "@prisma/client";
import { UserSessionData } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");

  let redirectTo = "/dashboard";
  if (state) {
    try {
      const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf-8"));
      if (decoded.redirectTo && typeof decoded.redirectTo === "string") {
        redirectTo = decoded.redirectTo;
      }
    } catch {
      // ignore state parsing error
    }
  }

  // Derive origin from Host header or NEXT_PUBLIC_APP_URL
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const detectedOrigin = host ? `${proto}://${host}` : "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || detectedOrigin || "http://localhost:3000";

  if (error || !code) {
    console.error("Google OAuth error parameter:", error);
    return NextResponse.redirect(`${appUrl}/login?error=google_auth_failed`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
    return NextResponse.redirect(`${appUrl}/login?error=google_not_configured`);
  }

  try {
    // 1. Exchange authorization code with Google for Access Token
    const redirectUri = `${appUrl}/api/auth/callback/google`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Google token exchange error:", errorText);
      return NextResponse.redirect(`${appUrl}/login?error=google_auth_failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch User Profile from Google UserInfo API
    const userinfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userinfoResponse.ok) {
      console.error("Failed to fetch Google userinfo");
      return NextResponse.redirect(`${appUrl}/login?error=google_auth_failed`);
    }

    const googleUser = await userinfoResponse.json();
    const { sub: googleId, email, name, picture } = googleUser;

    if (!email) {
      return NextResponse.redirect(`${appUrl}/login?error=google_email_missing`);
    }

    // 3. Find or Create User in PostgreSQL Supabase
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId },
          { email: { equals: email.toLowerCase(), mode: "insensitive" } },
        ],
      },
    });

    if (user) {
      // Check if suspended
      if (user.status === UserStatus.SUSPENDED) {
        return NextResponse.redirect(`${appUrl}/login?error=suspended`);
      }

      // Update googleId and avatarUrl if empty
      if (!user.googleId || !user.avatarUrl) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: user.googleId || googleId,
            avatarUrl: user.avatarUrl || picture || null,
          },
        });
      }
    } else {
      // Auto-register new Warga Belokan
      let baseSlug = (name || email.split("@")[0])
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      if (!baseSlug) baseSlug = "warga";

      let slug = baseSlug;
      let counter = 1;
      while (await prisma.user.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter++}`;
      }

      user = await prisma.user.create({
        data: {
          googleId,
          email: email.toLowerCase(),
          name: name || "Warga Belokan",
          slug,
          avatarUrl: picture || null,
          role: Role.USER,
          status: UserStatus.ACTIVE,
        },
      });
    }

    // 4. Create Session and set HTTP-only cryptographic cookie
    const sessionData: UserSessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      penName: user.penName,
      slug: user.slug,
      avatarUrl: user.avatarUrl,
      role: user.role,
      status: user.status,
    };

    await setSession(sessionData);

    // 5. Redirect user to intended page or dashboard
    const targetUrl = user.role === Role.ADMIN ? "/admin" : redirectTo;
    const finalRedirect = targetUrl.startsWith("/") ? targetUrl : `/${targetUrl}`;

    return NextResponse.redirect(`${appUrl}${finalRedirect}`);
  } catch (err) {
    console.error("Error in Google OAuth Callback:", err);
    return NextResponse.redirect(`${appUrl}/login?error=google_auth_failed`);
  }
}
