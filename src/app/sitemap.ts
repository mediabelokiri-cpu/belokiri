import { MetadataRoute } from "next";
import { getAllArticlesForAdmin } from "@/lib/data/admin";
import { MOCK_RUBRIKS, MOCK_AUTHORS } from "@/lib/data/mock-articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rekrutmen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/literatur-liberte`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/konstitusi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kabinet-belokiri`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rekrutmen/form`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pedoman-media-siber`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kebijakan-privasi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/syarat-ketentuan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. 8 Rubriks
  const rubrikRoutes: MetadataRoute.Sitemap = MOCK_RUBRIKS.map((rubrik) => ({
    url: `${baseUrl}/kategori/${rubrik.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 3. Authors
  const authorRoutes: MetadataRoute.Sitemap = MOCK_AUTHORS.map((author) => ({
    url: `${baseUrl}/penulis/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 4. Published Articles
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedArticles = await getAllArticlesForAdmin({ status: "PUBLISHED" });
    articleRoutes = publishedArticles.map((article) => ({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || article.createdAt),
      changeFrequency: "daily",
      priority: article.isEditorPick ? 0.95 : 0.85,
    }));
  } catch (err) {
    console.error("Error generating article routes for sitemap:", err);
  }

  return [...staticRoutes, ...rubrikRoutes, ...authorRoutes, ...articleRoutes];
}
