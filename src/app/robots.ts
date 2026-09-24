import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/login",
        ],
      },
      {
        userAgent: "Googlebot-News",
        allow: [
          "/",
          "/berita",
          "/artikel/",
          "/kategori/",
          "/penulis/",
        ],
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
