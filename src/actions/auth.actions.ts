"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { setSession, clearSession, DEMO_CONTRIBUTOR, DEMO_ADMIN } from "@/lib/auth/session";
import { rateLimitAuth, getClientIp } from "@/lib/security/rate-limit";

/**
 * Log in as Demo Contributor for development and testing.
 */
export async function loginAsDemoContributor(redirectTo: string = "/dashboard") {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    redirect(`/login?error=ratelimit`);
  }

  await setSession(DEMO_CONTRIBUTOR);
  redirect(redirectTo);
}

/**
 * Log in as Demo Admin for development and editorial testing.
 */
export async function loginAsDemoAdmin(redirectTo: string = "/admin") {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    redirect(`/login?error=ratelimit`);
  }

  await setSession(DEMO_ADMIN);
  redirect(redirectTo);
}

/**
 * Handle Google OAuth or fallback to demo contributor login.
 */
export async function loginWithGoogleAction(redirectTo: string = "/dashboard") {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateCheck = rateLimitAuth(ip);

  if (!rateCheck.success) {
    redirect(`/login?error=ratelimit`);
  }

  const googleClientId = process.env.GOOGLE_CLIENT_ID;

  if (!googleClientId || googleClientId.includes("your-google")) {
    // Graceful fallback for local development before Google Cloud Console keys are entered
    await setSession(DEMO_CONTRIBUTOR);
    redirect(redirectTo);
  }

  // When live Google OAuth is enabled in env, construct redirect to Google OAuth
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/google`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;

  redirect(googleAuthUrl);
}

/**
 * Log out user and redirect to login page.
 */
export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
