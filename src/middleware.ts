import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("nalar_session");

  // Route protection for /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
      const user = JSON.parse(decoded);
      if (!user || user.status === "SUSPENDED") {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("error", "suspended");
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Route protection for /admin/*
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
      const user = JSON.parse(decoded);
      if (user?.role !== "ADMIN") {
        // Contributor cannot access admin pages; redirect to contributor dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
