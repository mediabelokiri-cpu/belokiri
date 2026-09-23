import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/security/token";
import { UserSessionData } from "@/types";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("belokiri_session");

  // Helper to extract session data safely
  async function parseSession(): Promise<UserSessionData | null> {
    if (!sessionCookie || !sessionCookie.value) return null;

    // 1. Verify HMAC-SHA256 signature
    const verified = await verifyToken<UserSessionData>(sessionCookie.value);
    if (verified && verified.id && verified.role) {
      return verified;
    }

    // 2. Fallback for legacy dev cookies
    if (process.env.NODE_ENV !== "production") {
      try {
        const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
        const user = JSON.parse(decoded);
        if (user && user.id && user.role) {
          return user;
        }
      } catch {
        // invalid
      }
    }

    return null;
  }

  // Route protection for /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    const user = await parseSession();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user.status === "SUSPENDED") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "suspended");
      return NextResponse.redirect(loginUrl);
    }
  }

  // Route protection for /admin/*
  if (pathname.startsWith("/admin")) {
    const user = await parseSession();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user.status === "SUSPENDED") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "suspended");
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== "ADMIN") {
      // Contributor cannot access admin pages; redirect to contributor dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
