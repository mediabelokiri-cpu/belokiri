import {
  MOCK_ARTICLES,
  MOCK_RUBRIKS,
  MOCK_AUTHORS,
  MockArticle,
} from "./mock-articles";

export async function getHeroArticles(limit: number = 3): Promise<MockArticle[]> {
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
  // Urutkan berdasarkan tanggal terbit descending
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
  return MOCK_ARTICLES.filter((a) => a.isEditorPick).slice(0, limit);
}

export async function getPopularArticles(limit: number = 5): Promise<MockArticle[]> {
  return [...MOCK_ARTICLES]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export async function getArticleBySlug(
  slug: string
): Promise<MockArticle | null> {
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  return article || null;
}

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
  return MOCK_ARTICLES.filter((a) => !currentSlug || a.slug !== currentSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export async function getAllRubriks() {
  return MOCK_RUBRIKS;
}

