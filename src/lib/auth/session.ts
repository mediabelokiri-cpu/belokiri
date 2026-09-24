import { cookies } from "next/headers";
import { UserSessionData } from "@/types";
import { redirect } from "next/navigation";
import { signToken, verifyToken } from "@/lib/security/token";

const SESSION_COOKIE_NAME = "belokiri_session";

export const DEMO_CONTRIBUTOR: UserSessionData = {
  id: "user-demo-1",
  email: "budi.santoso@belokiri.id",
  name: "Budi Santoso",
  penName: "Budi Santoso",
  slug: "budi-santoso",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  role: "USER",
  status: "ACTIVE",
};

export const DEMO_ADMIN: UserSessionData = {
  id: "cmuf74mql0008uft8108jhxex",
  email: "admin@belokiri.id",
  name: "Agen Belokan",
  penName: "Agen Belokan",
  slug: "agen-belokan",
  avatarUrl:
    "https://vdvwjosnilunsubnttjj.supabase.co/storage/v1/object/sign/PRPFILE%20AVATAR/logourlbar.png?token=eyJraWQiOiI1ODA3Y2RjZC0xZGE5LTQ0NjEtYWQ4Ny0yYWEwZWM1YTY2NmEiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJQUlBGSUxFIEFWQVRBUi9sb2dvdXJsYmFyLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTAyMzY1MzYsImV4cCI6MjEwNTU5NjUzNn0.WYSa0aSREFHV5bb2U85kCQvNwm0qOoEe0t5WmKkgmgCegMqHEGyZDdgLbRrbsWXxURFp-i0sZhqSO1drnUvMXA",
  role: "ADMIN",
  status: "ACTIVE",
};

/**
 * Retrieve current user session from HTTP-only cookie.
 * Cryptographically verifies HMAC-SHA256 signature to prevent tampering.
 */
export async function getSession(): Promise<UserSessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    // 1. Verify HMAC-SHA256 signed token
    const verified = await verifyToken<UserSessionData>(sessionCookie.value);
    if (verified && verified.id && verified.role) {
      return verified;
    }

    // 2. Fallback only in local development for unsigned legacy cookies
    if (process.env.NODE_ENV !== "production") {
      try {
        const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
        const user: UserSessionData = JSON.parse(decoded);
        if (user && user.id && user.role) {
          return user;
        }
      } catch {
        // Not a legacy JSON cookie
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Persist user session to HTTP-only cookie with cryptographic HMAC signature.
 */
export async function setSession(user: UserSessionData): Promise<void> {
  const cookieStore = await cookies();
  const signedToken = await signToken<UserSessionData>(user);

  cookieStore.set(SESSION_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clear user session (Logout).
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Guard for server components: requires logged in user.
 * Redirects to /login if unauthenticated or suspended.
 */
export async function requireUser(): Promise<UserSessionData> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.status === "SUSPENDED") {
    await clearSession();
    redirect("/login?error=suspended");
  }

  return session;
}

/**
 * Guard for server components: requires logged in user with role ADMIN.
 * Redirects to /dashboard if role is USER, or /login if unauthenticated.
 */
export async function requireAdmin(): Promise<UserSessionData> {
  const session = await requireUser();

  if (session.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return session;
}
