import { NextResponse } from "next/server";
import { getAllArticlesForAdmin } from "@/lib/data/admin";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://belokiri.id";

  let articles: any[] = [];
  try {
    articles = await getAllArticlesForAdmin({ status: "PUBLISHED" });
  } catch (err) {
    console.error("Error fetching articles for RSS feed:", err);
  }

  const latestBuildDate =
    articles.length > 0
      ? new Date(articles[0].updatedAt || articles[0].publishedAt || Date.now()).toUTCString()
      : new Date().toUTCString();

  const itemsXml = articles
    .slice(0, 30)
    .map((article) => {
      const pubDate = new Date(
        article.publishedAt || article.createdAt || Date.now()
      ).toUTCString();
      const articleUrl = `${baseUrl}/artikel/${article.slug}`;

      return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.excerpt || article.title}]]></description>
      <category><![CDATA[${article.categoryName}]]></category>
      <author><![CDATA[${article.authorName}]]></author>
      <pubDate>${pubDate}</pubDate>
      ${
        article.featuredImage
          ? `<enclosure url="${article.featuredImage}" type="image/jpeg" length="0" />`
          : ""
      }
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BELOKIRI - Liar Seperlunya, Jenaka Secukupnya</title>
    <link>${baseUrl}</link>
    <description>Media esai populer, analisis santai, arsip sejarah rakyat, dan percakapan kritis yang disajikan dengan tajam dan jenaka.</description>
    <language>id-ID</language>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
