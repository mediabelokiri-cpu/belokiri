"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { setSession, clearSession } from "@/lib/auth/session";
import { rateLimitAuth, getClientIp } from "@/lib/security/rate-limit";
import { verifyPassword, hashPassword } from "@/lib/security/password";
import prisma from "@/lib/db/prisma";
import { Role, UserStatus } from "@prisma/client";
import { UserSessionData } from "@/types";

export type AuthActionResult = {
  success?: boolean;
  error?: string;
};

/**
 * Log in with Username / Email and Password.
 * Supports both Contributor (USER) and Editorial / Admin (ADMIN).
 */
export async function loginWithCredentialsAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    return { error: "Terlalu banyak percobaan masuk secara beruntun. Mohon tunggu 1 menit demi keamanan sistem." };
  }

  const identifier = (formData.get("identifier") as string)?.trim();
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string)?.trim();

  if (!identifier || !password) {
    return { error: "Username / Email dan Password wajib diisi." };
  }

  try {
    // Search user by email or slug (username)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifier, mode: "insensitive" } },
          { slug: { equals: identifier.toLowerCase() } },
        ],
      },
    });

    if (!user || !user.passwordHash) {
      return { error: "Username / Email atau Password salah." };
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { error: "Username / Email atau Password salah." };
    }

    if (user.status === UserStatus.SUSPENDED) {
      return { error: "Akun Anda sedang ditangguhkan. Hubungi tim redaksi BELOKIRI." };
    }

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

    // Redirect: if user is admin go to /admin or callbackUrl, if user go to /dashboard
    let targetUrl = user.role === Role.ADMIN ? "/admin" : "/dashboard";
    if (callbackUrl && callbackUrl !== "/login" && !callbackUrl.includes("/login")) {
      targetUrl = callbackUrl;
    }

    redirect(targetUrl);
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: string }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.error("Login error:", err);
    return { error: "Terjadi kesalahan sistem saat mencoba masuk. Silakan coba beberapa saat lagi." };
  }
}

/**
 * Register a new Warga Belokan (Contributor) account.
 */
export async function registerUserAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    return { error: "Terlalu banyak percobaan. Mohon tunggu 1 menit demi keamanan sistem." };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string)?.trim();

  if (!name || name.length < 2) {
    return { error: "Nama lengkap minimal 2 karakter." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: "Format alamat email tidak valid." };
  }

  if (!password || password.length < 6) {
    return { error: "Password minimal 6 karakter demi keamanan akun Anda." };
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return { error: "Email ini sudah terdaftar. Silakan pilih tab 'Masuk Akun'." };
    }

    // Generate unique slug from name
    let baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    if (!baseSlug) baseSlug = "warga";

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const hashedPassword = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        slug,
        passwordHash: hashedPassword,
        role: Role.USER,
        status: UserStatus.ACTIVE,
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      },
    });

    const sessionData: UserSessionData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      penName: newUser.penName,
      slug: newUser.slug,
      avatarUrl: newUser.avatarUrl,
      role: newUser.role,
      status: newUser.status,
    };

    await setSession(sessionData);

    const targetUrl =
      callbackUrl && callbackUrl !== "/login" && !callbackUrl.includes("/login")
        ? callbackUrl
        : "/dashboard";

    redirect(targetUrl);
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: string }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.error("Register error:", err);
    return { error: "Terjadi kesalahan saat mendaftar akun. Silakan coba lagi." };
  }
}

/**
 * Handle Google OAuth.
 */
export async function loginWithGoogleAction(redirectTo: string = "/dashboard") {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    redirect(`/login?error=ratelimit`);
  }

  const googleClientId = process.env.GOOGLE_CLIENT_ID;

  if (!googleClientId || googleClientId.includes("your-google") || googleClientId.trim() === "") {
    // Google OAuth keys not yet added
    redirect(`/login?error=google_not_configured`);
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/google`;
  const state = Buffer.from(JSON.stringify({ redirectTo })).toString("base64url");
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${state}`;

  redirect(googleAuthUrl);
}

/**
 * Log out user and redirect to login page.
 */
export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
