import { cache } from "react";
import {
  MOCK_ARTICLES,
  MOCK_RUBRIKS,
  MOCK_AUTHORS,
  MockArticle,
} from "./mock-articles";
import { prisma } from "@/lib/db/prisma";

function mapDbToArticle(a: any): MockArticle {
  const roleLabel =
    a.author.role === "ADMIN" ? "Agen Belokan (Admin)" : "Warga Belokan BELOKIRI";

  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || "",
    content: a.content,
    featuredImage: a.featuredImage || "/images/placeholder.jpg",
    featuredImageCaption: a.featuredImageCaption || "",
    photoSource: a.photoSource || "BELOKIRI",
    source: a.source || "BELOKIRI",
    publishedAt: (a.publishedAt || a.createdAt).toISOString(),
    updatedAt: a.updatedAt ? a.updatedAt.toISOString() : undefined,
    views: a.views || 0,
    isFeatured: a.isEditorPick || false,
    isEditorPick: a.isEditorPick || false,
    seoTitle: a.seoTitle || undefined,
    metaDescription: a.metaDescription || undefined,
    rubrik: {
      name: a.category.name,
      slug: a.category.slug,
      question: a.category.description || "Liar Seperlunya, Jenaka Secukupnya.",
      badgeColor: "bg-red-600",
      description: a.category.description || "",
    },
    author: {
      name: a.author.penName || a.author.name,
      penName: a.author.penName,
      slug: a.author.slug,
      avatarUrl:
        a.author.avatarUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      bio:
        a.author.bio ||
        "Warga Belokan aktif yang menyuarakan gagasan, opini kritis, dan cerita masyarakat sehari-hari.",
      role: roleLabel,
    },
    tags: a.tags ? a.tags.map((t: any) => t.tag?.name || t.name || t) : [],
  };
}

export async function getHeroArticles(limit: number = 3): Promise<MockArticle[]> {
  try {
    const dbArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit * 2,
    });

    const mapped = dbArticles.map(mapDbToArticle);
    const featured = mapped.find((a) => a.isFeatured);
    const others = mapped.filter((a) => a.id !== featured?.id);
    const result = featured ? [featured, ...others] : [...mapped];
    return result.slice(0, limit);
  } catch (err) {
    console.error("Error getHeroArticles db:", err);
  }

  const featured = MOCK_ARTICLES.find((a) => a.isFeatured);
  const others = MOCK_ARTICLES.filter((a) => a.id !== featured?.id);
  const result = featured ? [featured, ...others] : [...MOCK_ARTICLES];
  return result.slice(0, limit);
}

export async function getHeroArticle(): Promise<MockArticle | null> {
  const articles = await getHeroArticles(1);
  return articles[0] || null;
}

export async function getLatestArticles(
  limit: number = 6,
  page: number = 1
): Promise<{ articles: MockArticle[]; total: number; totalPages: number }> {
  try {
    const [total, dbArticles] = await Promise.all([
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.findMany({
        where: { status: "PUBLISHED" },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const articles = dbArticles.map(mapDbToArticle);
    const totalPages = Math.ceil(total / limit);

    return { articles, total, totalPages };
  } catch (err) {
    console.error("Error getLatestArticles db:", err);
  }

  const sorted = [...MOCK_ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const start = (page - 1) * limit;
  const articles = sorted.slice(start, start + limit);
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);

  return { articles, total, totalPages };
}

export async function getEditorsPick(limit: number = 4): Promise<MockArticle[]> {
  try {
    const dbArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED", isEditorPick: true },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return dbArticles.map(mapDbToArticle);
  } catch (err) {
    console.error("Error getEditorsPick db:", err);
  }

  return MOCK_ARTICLES.filter((a) => a.isEditorPick).slice(0, limit);
}

export async function getPopularArticles(limit: number = 5): Promise<MockArticle[]> {
  try {
    const dbArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { views: "desc" },
      take: limit,
    });

    return dbArticles.map(mapDbToArticle);
  } catch (err) {
    console.error("Error getPopularArticles db:", err);
  }

  return [...MOCK_ARTICLES]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export const getArticleBySlug = cache(async function getArticleBySlug(
  slug: string
): Promise<MockArticle | null> {
  try {
    const dbArticle = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (dbArticle) {
      return mapDbToArticle(dbArticle);
    }
    return null;
  } catch (err) {
    console.error("Error getArticleBySlug db:", err);
  }

  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  return article || null;
});

export async function getArticlesByRubrik(
  rubrikSlug: string,
  limit: number = 10,
  page: number = 1
): Promise<{
  rubrik: (typeof MOCK_RUBRIKS)[number] | null;
  articles: MockArticle[];
  total: number;
}> {
  const rubrik =
    MOCK_RUBRIKS.find(
      (r) => r.slug.toLowerCase() === rubrikSlug.toLowerCase()
    ) || null;

  if (!rubrik) {
    return { rubrik: null, articles: [], total: 0 };
  }

  try {
    const [total, dbArticles] = await Promise.all([
      prisma.article.count({
        where: {
          status: "PUBLISHED",
          category: { slug: rubrikSlug.toLowerCase() },
        },
      }),
      prisma.article.findMany({
        where: {
          status: "PUBLISHED",
          category: { slug: rubrikSlug.toLowerCase() },
        },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const articles = dbArticles.map(mapDbToArticle);
    return { rubrik, articles, total };
  } catch (err) {
    console.error("Error getArticlesByRubrik db:", err);
  }

  const filtered = MOCK_ARTICLES.filter(
    (a) => a.rubrik.slug.toLowerCase() === rubrikSlug.toLowerCase()
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const start = (page - 1) * limit;
  const articles = filtered.slice(start, start + limit);

  return { rubrik, articles, total: filtered.length };
}

export async function searchArticles(
  query: string
): Promise<{ articles: MockArticle[]; count: number }> {
  const q = query.toLowerCase().trim();
  if (!q) return { articles: [], count: 0 };

  try {
    const dbArticles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
          { category: { name: { contains: q, mode: "insensitive" } } },
          { author: { name: { contains: q, mode: "insensitive" } } },
          { author: { penName: { contains: q, mode: "insensitive" } } },
          { tags: { some: { tag: { name: { contains: q, mode: "insensitive" } } } } },
        ],
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
    });

    const mapped = dbArticles.map(mapDbToArticle);
    return { articles: mapped, count: mapped.length };
  } catch (err) {
    console.error("Error searchArticles db:", err);
  }

  const results = MOCK_ARTICLES.filter((article) => {
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.rubrik.name.toLowerCase().includes(q) ||
      article.author.name.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return { articles: results, count: results.length };
}

export async function getAuthorBySlug(slug: string) {
  try {
    // 1. Try querying registered user from Prisma PostgreSQL
    const dbUser = await prisma.user.findFirst({
      where: {
        OR: [
          { slug: slug.toLowerCase() },
          { id: slug },
        ],
      },
      include: {
        articles: {
          where: { status: "PUBLISHED" },
          include: {
            category: true,
            tags: { include: { tag: true } },
          },
          orderBy: { publishedAt: "desc" },
        },
      },
    });

    if (dbUser) {
      const roleLabel =
        dbUser.role === "ADMIN" ? "Agen Belokan (Admin)" : "Warga Belokan BELOKIRI";

      const author = {
        id: dbUser.id,
        name: dbUser.name,
        penName: dbUser.penName,
        slug: dbUser.slug,
        avatarUrl:
          dbUser.avatarUrl ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        bio:
          dbUser.bio ||
          "Warga Belokan aktif yang menyuarakan gagasan, opini kritis, dan cerita masyarakat sehari-hari.",
        role: roleLabel,
      };

      const mappedArticles: MockArticle[] = dbUser.articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt || "",
        content: a.content,
        featuredImage: a.featuredImage || "/images/placeholder.jpg",
        featuredImageCaption: a.featuredImageCaption || "",
        photoSource: a.photoSource || "BELOKIRI",
        source: a.source || "BELOKIRI",
        publishedAt: (a.publishedAt || a.createdAt).toISOString(),
        views: a.views,
        isFeatured: false,
        isEditorPick: a.isEditorPick,
        rubrik: {
          name: a.category.name,
          slug: a.category.slug,
          question: a.category.description || "Liar Seperlunya, Jenaka Secukupnya.",
          badgeColor: "bg-red-600",
          description: a.category.description || "",
        },
        author: {
          name: dbUser.name,
          penName: dbUser.penName,
          slug: dbUser.slug,
          avatarUrl: author.avatarUrl,
          bio: author.bio,
          role: roleLabel,
        },
        tags: a.tags.map((t) => t.tag.name),
        readTimeMinutes: Math.max(1, Math.ceil((a.content || "").length / 800)),
      }));

      return {
        author,
        articles: mappedArticles,
        totalArticles: mappedArticles.length,
      };
    }
  } catch (err) {
    console.error("getAuthorBySlug db error:", err);
  }

  // 2. Fallback to mock authors
  const author = MOCK_AUTHORS.find((a) => a.slug === slug) || null;
  if (!author) return null;

  const articles = MOCK_ARTICLES.filter((a) => a.author.slug === slug);
  return { author, articles, totalArticles: articles.length };
}

export async function getRelatedArticles(
  currentSlug: string,
  rubrikSlug: string,
  limit: number = 3
): Promise<MockArticle[]> {
  try {
    const sameRubrik = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        slug: { not: currentSlug },
        category: { slug: rubrikSlug.toLowerCase() },
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    if (sameRubrik.length >= limit) {
      return sameRubrik.map(mapDbToArticle);
    }

    const otherArticles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        slug: { notIn: [currentSlug, ...sameRubrik.map((a) => a.slug)] },
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit - sameRubrik.length,
    });

    return [...sameRubrik.map(mapDbToArticle), ...otherArticles.map(mapDbToArticle)];
  } catch (err) {
    console.error("Error getRelatedArticles db:", err);
  }

  // 1. First priority: same rubrik
  const sameRubrik = MOCK_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.rubrik.slug === rubrikSlug
  );

  if (sameRubrik.length >= limit) {
    return sameRubrik.slice(0, limit);
  }

  // 2. Second priority: backfill with recent articles from other rubriks
  const otherArticles = MOCK_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.rubrik.slug !== rubrikSlug
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return [...sameRubrik, ...otherArticles].slice(0, limit);
}

export async function getRecentArticles(
  currentSlug?: string,
  limit: number = 4
): Promise<MockArticle[]> {
  try {
    const dbArticles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        ...(currentSlug ? { slug: { not: currentSlug } } : {}),
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return dbArticles.map(mapDbToArticle);
  } catch (err) {
    console.error("Error getRecentArticles db:", err);
  }

  return MOCK_ARTICLES.filter((a) => !currentSlug || a.slug !== currentSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export async function getAllRubriks() {
  try {
    const dbCats = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (dbCats.length > 0) {
      return dbCats.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        question: c.description || "Liar Seperlunya, Jenaka Secukupnya.",
        badgeColor: "bg-red-600",
        description: c.description || "",
      }));
    }
  } catch (err) {
    console.error("Error getAllRubriks db:", err);
  }
  return MOCK_RUBRIKS;
}

