import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db/prisma";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { category: true, author: true },
    });

    if (!article) {
      return new Response("Artikel tidak ditemukan", { status: 404 });
    }

    const title = article.title;
    const categoryName = article.category.name;
    const authorName = article.author.penName || article.author.name;
    const featuredImage = article.featuredImage;

    let imageBase64: string | null = null;
    if (featuredImage) {
      try {
        const imgRes = await fetch(featuredImage);
        if (imgRes.ok) {
          const buf = await imgRes.arrayBuffer();
          const mime = imgRes.headers.get("content-type") || "image/jpeg";
          imageBase64 = `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;
        }
      } catch (err) {
        console.warn("Could not pre-fetch featured image for OG:", err);
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            backgroundColor: "#09090b",
          }}
        >
          {/* Full Cover Background */}
          {imageBase64 ? (
            <img
              src={imageBase64}
              alt={title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : null}

          {/* Dark Cinematic Gradient Overlay for crisp text contrast */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* Content Wrapper */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "50px 65px",
            }}
          >
            {/* Top Bar: Brand Logo + Rubrik */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontSize: "38px",
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-1.5px",
                  }}
                >
                  BELOKIRI
                </span>
                <span
                  style={{
                    fontSize: "44px",
                    fontWeight: 900,
                    color: "#dc2626",
                    marginLeft: "2px",
                  }}
                >
                  .
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  padding: "7px 18px",
                  borderRadius: "6px",
                }}
              >
                RUBRIK {categoryName}
              </div>
            </div>

            {/* Middle: Article Title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                margin: "20px 0",
              }}
            >
              <div
                style={{
                  fontSize: title.length > 65 ? "38px" : "46px",
                  fontWeight: 900,
                  lineHeight: 1.25,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                  maxHeight: "180px",
                  overflow: "hidden",
                }}
              >
                {title}
              </div>
            </div>

            {/* Bottom Bar: Tagline & Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.25)",
                paddingTop: "20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#d4d4d8",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Liar Seperlunya, Jenaka Secukupnya
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Ditulis oleh {authorName}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control":
            "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("Error generating OG image:", err);
    return new Response("Gagal memuat cover gambar", { status: 500 });
  }
}
