import { NextResponse } from "next/server";
import { getAllArticlesForAdmin } from "@/lib/data/admin";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://belokiri.id";

  let articles: any[] = [];
  try {
    articles = await getAllArticlesForAdmin({ status: "PUBLISHED" });
  } catch (err) {
    console.error("Error fetching articles for JSON feed:", err);
  }

  const feedData = {
    version: "https://jsonfeed.org/version/1.1",
    title: "BELOKIRI - Liar Seperlunya, Jenaka Secukupnya",
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description:
      "Media esai populer, analisis santai, arsip sejarah rakyat, dan percakapan kritis yang disajikan dengan tajam dan jenaka.",
    icon: `${baseUrl}/images/logo-belokiri-red.png`,
    favicon: `${baseUrl}/favicon.ico`,
    language: "id-ID",
    authors: [
      {
        name: "Dewan Agen Belokan BELOKIRI",
        url: baseUrl,
      },
    ],
    items: articles.slice(0, 30).map((article) => ({
      id: `${baseUrl}/artikel/${article.slug}`,
      url: `${baseUrl}/artikel/${article.slug}`,
      title: article.title,
      summary: article.excerpt,
      content_text: article.content,
      image: article.featuredImage,
      date_published: new Date(article.publishedAt || article.createdAt).toISOString(),
      date_modified: new Date(article.updatedAt || article.publishedAt || article.createdAt).toISOString(),
      authors: [
        {
          name: article.authorName,
        },
      ],
      tags: article.tags || [article.categoryName],
    })),
  };

  return new NextResponse(JSON.stringify(feedData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
