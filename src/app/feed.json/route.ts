import { NextResponse } from "next/server";
import { getAllArticlesForAdmin } from "@/lib/data/admin";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";

  let articles: any[] = [];
  try {
    articles = await getAllArticlesForAdmin({ status: "PUBLISHED" });
  } catch (err) {
    console.error("Error fetching articles for JSON feed:", err);
  }

  const feedData = {
    version: "https://jsonfeed.org/version/1.1",
    title: "BAKUBACA — Setiap Pikiran Punya Ruang.",
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description:
      "Ruang baca dan media gagasan independen. Setiap Pikiran Punya Ruang — menyuarakan realitas, merekam pengalaman, dan membaca kebudayaan.",
    icon: `${baseUrl}/images/logourlbarbakubaca.png`,
    favicon: `${baseUrl}/favicon.ico`,
    language: "id-ID",
    authors: [
      {
        name: "Tim Redaksi BAKUBACA",
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
