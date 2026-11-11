import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session || session.status === "SUSPENDED") {
    return NextResponse.json(
      { authenticated: false, user: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        name: session.penName || session.name,
        role: session.role,
      },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
