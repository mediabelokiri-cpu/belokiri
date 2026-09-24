import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      select: { featuredImage: true },
    });

    if (!article || !article.featuredImage) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";
    const optimizedUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(article.featuredImage)}&w=1200&q=75`;

    try {
      const res = await fetch(optimizedUrl, {
        headers: {
          Accept: "image/jpeg,image/*",
        },
      });

      if (res.ok) {
        const imageBuffer = await res.arrayBuffer();
        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        });
      }
    } catch (optErr) {
      console.warn("Optimized fetch failed, falling back to direct fetch:", optErr);
    }

    // Direct fallback
    const directRes = await fetch(article.featuredImage);
    if (!directRes.ok) {
      return new NextResponse("Failed to fetch image", { status: 502 });
    }

    const directBuffer = await directRes.arrayBuffer();
    const contentType = directRes.headers.get("content-type") || "image/jpeg";

    return new NextResponse(directBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("Cover image proxy error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
