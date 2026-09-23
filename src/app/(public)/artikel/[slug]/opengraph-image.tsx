import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/data/articles";

export const runtime = "nodejs";

export const alt = "BELOKIRI - Liar Seperlunya, Jenaka Secukupnya";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const title = article ? article.title : "BELOKIRI Media";
  const rubrik = article ? article.rubrik.name : "BERISIK";
  const author = article ? article.author.name : "Redaksi BELOKIRI";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#09090b",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Header: Logo + Rubrik */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                color: "#ffffff",
              }}
            >
              BELOKIRI
            </span>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: "#cc0001",
                marginLeft: "2px",
              }}
            >
              .
            </span>
          </div>

          {/* Rubrik Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#cc0001",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "3px",
              padding: "8px 20px",
              borderRadius: "8px",
            }}
          >
            RUBRIK {rubrik}
          </div>
        </div>

        {/* Center: Article Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "40px 0",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 900,
              lineHeight: 1.25,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              maxHeight: "240px",
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
            borderTop: "2px solid #27272a",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            Liar Seperlunya, Jenaka Secukupnya
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            Ditulis oleh {author}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
