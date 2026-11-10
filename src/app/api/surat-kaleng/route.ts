import { NextRequest, NextResponse } from "next/server";
import { getPublicSuratKaleng } from "@/lib/data/surat-kaleng";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 30;
    const limit = Number.isFinite(parsedLimit) ? parsedLimit : 30;

    const items = await getPublicSuratKaleng(limit);

    return NextResponse.json(
      {
        success: true,
        items,
        serverTime: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error serving public Surat Kaleng:", error);
    return NextResponse.json(
      {
        success: false,
        items: [],
        error: "Gagal memuat daftar surat kaleng terbaru.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
