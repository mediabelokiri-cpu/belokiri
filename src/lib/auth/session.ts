import { cookies } from "next/headers";
import { UserSessionData } from "@/types";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "nalar_session";

export const DEMO_CONTRIBUTOR: UserSessionData = {
  id: "user-demo-1",
  email: "budi.santoso@nalar.id",
  name: "Budi Santoso",
  penName: "Budi Santoso",
  slug: "budi-santoso",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  role: "USER",
  status: "ACTIVE",
};

export const DEMO_ADMIN: UserSessionData = {
  id: "admin-demo-1",
  email: "redaksi@nalar.id",
  name: "Redaksi NALAR",
  penName: null,
  slug: "redaksi-nalar",
  avatarUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
  role: "ADMIN",
  status: "ACTIVE",
};

/**
 * Retrieve current user session from HTTP-only cookie.
 */
export async function getSession(): Promise<UserSessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    const user: UserSessionData = JSON.parse(decoded);

    if (!user || !user.id || !user.role) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

/**
 * Persist user session to HTTP-only cookie.
 */
export async function setSession(user: UserSessionData): Promise<void> {
  const cookieStore = await cookies();
  const serialized = Buffer.from(JSON.stringify(user)).toString("base64");

  cookieStore.set(SESSION_COOKIE_NAME, serialized, {
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
