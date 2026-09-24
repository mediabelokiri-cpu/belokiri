import { prisma } from "@/lib/db/prisma";
import { MOCK_RUBRIKS } from "./mock-articles";
import { slugify } from "@/lib/utils/slugify";
import { CreateArticleInput, UpdateArticleInput } from "@/lib/validations/article.schema";
import { ProfileInput } from "@/lib/validations/profile.schema";

export interface ContributorArticleItem {
  id: string;
  authorId: string;
  authorName?: string;
  authorAvatarUrl?: string | null;
  authorBio?: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  featuredImageCaption: string | null;
  photoSource: string | null;
  source: string | null;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  status: "DRAFT" | "REVIEW" | "REVISION" | "PUBLISHED";
  adminNote: string | null;
  tags: string[];
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContributorStats {
  draftCount: number;
  reviewCount: number;
  revisionCount: number;
  publishedCount: number;
  totalViews: number;
}

// Initial in-memory mock store for local development / demo testing
let contributorArticlesStore: ContributorArticleItem[] = [];

export interface ContributorProfile {
  id: string;
  name: string;
  penName: string | null;
  slug: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
}

function mapDbArticleToContributorItem(a: any): ContributorArticleItem {
  return {
    id: a.id,
    authorId: a.authorId,
    authorName: a.author ? (a.author.penName || a.author.name) : undefined,
    authorAvatarUrl: a.author ? a.author.avatarUrl : undefined,
    authorBio: a.author ? a.author.bio : undefined,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    featuredImage: a.featuredImage,
    featuredImageCaption: a.featuredImageCaption,
    photoSource: a.photoSource,
    source: a.source,
    categoryId: a.categoryId,
    categoryName: a.category ? a.category.name : "BERISIK",
    categorySlug: a.category ? a.category.slug : "berisik",
    status: a.status,
    adminNote: a.adminNote,
    tags: a.tags ? a.tags.map((t: any) => t.tag?.name || t.name || t) : [],
    views: a.views || 0,
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    createdAt: a.createdAt ? a.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: a.updatedAt ? a.updatedAt.toISOString() : new Date().toISOString(),
  };
}

/**
 * Get dashboard overview metrics for contributor
 */
export async function getContributorStats(userId: string): Promise<ContributorStats> {
  try {
    const [draftCount, reviewCount, revisionCount, publishedArticles] = await Promise.all([
      prisma.article.count({ where: { authorId: userId, status: "DRAFT" } }),
      prisma.article.count({ where: { authorId: userId, status: "REVIEW" } }),
      prisma.article.count({ where: { authorId: userId, status: "REVISION" } }),
      prisma.article.findMany({
        where: { authorId: userId, status: "PUBLISHED" },
        select: { views: true },
      }),
    ]);

    const publishedCount = publishedArticles.length;
    const totalViews = publishedArticles.reduce((acc, curr) => acc + (curr.views || 0), 0);

    return {
      draftCount,
      reviewCount,
      revisionCount,
      publishedCount,
      totalViews,
    };
  } catch (error) {
    console.error("Error getContributorStats:", error);
    const userArticles = contributorArticlesStore.filter((a) => a.authorId === userId);
    return {
      draftCount: userArticles.filter((a) => a.status === "DRAFT").length,
      reviewCount: userArticles.filter((a) => a.status === "REVIEW").length,
      revisionCount: userArticles.filter((a) => a.status === "REVISION").length,
      publishedCount: userArticles.filter((a) => a.status === "PUBLISHED").length,
      totalViews: userArticles.reduce((acc, curr) => acc + curr.views, 0),
    };
  }
}

/**
 * Get list of articles for contributor with optional status and search filter
 */
export async function getContributorArticles(
  userId: string,
  filter?: {
    status?: "ALL" | "DRAFT" | "REVIEW" | "REVISION" | "PUBLISHED";
    search?: string;
  }
): Promise<ContributorArticleItem[]> {
  try {
    const whereClause: any = { authorId: userId };
    if (filter?.status && filter.status !== "ALL") {
      whereClause.status = filter.status;
    }
    if (filter?.search && filter.search.trim()) {
      whereClause.OR = [
        { title: { contains: filter.search.trim(), mode: "insensitive" } },
        { excerpt: { contains: filter.search.trim(), mode: "insensitive" } },
      ];
    }

    const dbArticles = await prisma.article.findMany({
      where: whereClause,
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const mapped = dbArticles.map(mapDbArticleToContributorItem);
    return mapped;
  } catch (error) {
    console.error("Error in getContributorArticles:", error);
  }

  let list = contributorArticlesStore.filter((a) => a.authorId === userId);
  if (filter?.status && filter.status !== "ALL") {
    list = list.filter((a) => a.status === filter.status);
  }
  if (filter?.search && filter.search.trim()) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
  }
  return [...list].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/**
 * Get single article by ID ensuring author ownership
 */
export async function getContributorArticleById(
  articleId: string,
  userId: string
): Promise<ContributorArticleItem | null> {
  try {
    const dbArticle = await prisma.article.findFirst({
      where: { id: articleId, authorId: userId },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    });

    if (dbArticle) {
      return mapDbArticleToContributorItem(dbArticle);
    }
  } catch (error) {
    console.error("Error in getContributorArticleById:", error);
  }

  const article = contributorArticlesStore.find(
    (a) => a.id === articleId && a.authorId === userId
  );
  return article || null;
}

/**
 * Save article as DRAFT (Create new or Update existing)
 */
export async function saveArticleDraft(
  userId: string,
  data: CreateArticleInput | UpdateArticleInput,
  articleId?: string,
  authorMeta?: {
    name?: string;
    avatarUrl?: string | null;
    bio?: string | null;
  }
): Promise<ContributorArticleItem> {
  const catSlug = (data.categoryId || "berisik").replace(/^rubrik-/, "");
  let dbCategory = null;
  try {
    dbCategory = await prisma.category.findFirst({
      where: {
        OR: [{ slug: catSlug }, { id: data.categoryId }],
      },
    });
  } catch (err) {
    console.error("Error finding category in db:", err);
  }

  const rubrik =
    MOCK_RUBRIKS.find(
      (r) => r.slug === catSlug || `rubrik-${r.slug}` === data.categoryId
    ) || MOCK_RUBRIKS[0];

  const now = new Date().toISOString();

  // 1. Try PostgreSQL persistence
  try {
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (dbUser) {
      if (articleId) {
        const existing = await prisma.article.findFirst({
          where: { id: articleId, authorId: userId },
        });

        if (existing) {
          const updated = await prisma.article.update({
            where: { id: articleId },
            data: {
              title: data.title || existing.title,
              content: data.content || existing.content,
              excerpt: data.excerpt !== undefined ? data.excerpt : existing.excerpt,
              featuredImage: data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
              featuredImageCaption:
                data.featuredImageCaption !== undefined
                  ? data.featuredImageCaption
                  : existing.featuredImageCaption,
              photoSource: data.photoSource !== undefined ? data.photoSource : existing.photoSource,
              source: data.source !== undefined ? data.source : existing.source,
              ...(dbCategory ? { categoryId: dbCategory.id } : {}),
            },
            include: {
              category: true,
              author: true,
              tags: { include: { tag: true } },
            },
          });

          if (data.tags && data.tags.length > 0) {
            await prisma.articleTag.deleteMany({ where: { articleId } });
            for (const tagName of data.tags) {
              const tagSlug = slugify(tagName);
              const tag = await prisma.tag.upsert({
                where: { slug: tagSlug },
                update: { name: tagName },
                create: { name: tagName, slug: tagSlug },
              });
              await prisma.articleTag.create({
                data: { articleId, tagId: tag.id },
              });
            }
          }

          return mapDbArticleToContributorItem(updated);
        }
      } else {
        const generatedSlug = `${slugify(data.title || "draf-artikel")}-${Date.now().toString().slice(-4)}`;
        let finalCatId = dbCategory?.id;
        if (!finalCatId) {
          const defaultCat = await prisma.category.findFirst();
          finalCatId = defaultCat?.id;
        }

        if (finalCatId) {
          const created = await prisma.article.create({
            data: {
              authorId: userId,
              categoryId: finalCatId,
              title: data.title || "Draf Artikel Baru",
              slug: generatedSlug,
              content: data.content || "",
              excerpt: data.excerpt || null,
              featuredImage: data.featuredImage || null,
              featuredImageCaption: data.featuredImageCaption || null,
              photoSource: data.photoSource || null,
              source: data.source || null,
              status: "DRAFT",
            },
            include: {
              category: true,
              author: true,
              tags: { include: { tag: true } },
            },
          });

          if (data.tags && data.tags.length > 0) {
            for (const tagName of data.tags) {
              const tagSlug = slugify(tagName);
              const tag = await prisma.tag.upsert({
                where: { slug: tagSlug },
                update: { name: tagName },
                create: { name: tagName, slug: tagSlug },
              });
              await prisma.articleTag.create({
                data: { articleId: created.id, tagId: tag.id },
              });
            }
          }

          return mapDbArticleToContributorItem(created);
        }
      }
    }
  } catch (dbErr) {
    console.error("Error saving draft to DB:", dbErr);
  }

  // 2. In-memory fallback
  if (articleId) {
    const existingIndex = contributorArticlesStore.findIndex(
      (a) => a.id === articleId && a.authorId === userId
    );

    if (existingIndex === -1) {
      throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
    }

    const existing = contributorArticlesStore[existingIndex];

    const updated: ContributorArticleItem = {
      ...existing,
      authorName: authorMeta?.name || existing.authorName,
      authorAvatarUrl: authorMeta?.avatarUrl !== undefined ? authorMeta.avatarUrl : existing.authorAvatarUrl,
      authorBio: authorMeta?.bio || existing.authorBio,
      title: data.title || existing.title,
      slug: data.title ? `${slugify(data.title)}-${existing.id.slice(-4)}` : existing.slug,
      content: data.content || existing.content,
      excerpt: data.excerpt !== undefined ? data.excerpt : existing.excerpt,
      featuredImage: data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
      featuredImageCaption: data.featuredImageCaption !== undefined ? data.featuredImageCaption : existing.featuredImageCaption,
      photoSource: data.photoSource !== undefined ? data.photoSource : existing.photoSource,
      source: data.source !== undefined ? data.source : existing.source,
      categoryId: `rubrik-${rubrik.slug}`,
      categoryName: rubrik.name,
      categorySlug: rubrik.slug,
      tags: data.tags || existing.tags,
      updatedAt: now,
    };

    contributorArticlesStore[existingIndex] = updated;
    return updated;
  }

  const newId = `art-contrib-${Date.now()}`;
  const newSlug = `${slugify(data.title || "draf-artikel")}-${newId.slice(-4)}`;

  const newArticle: ContributorArticleItem = {
    id: newId,
    authorId: userId,
    authorName: authorMeta?.name,
    authorAvatarUrl: authorMeta?.avatarUrl,
    authorBio: authorMeta?.bio,
    title: data.title || "Draf Artikel Baru",
    slug: newSlug,
    content: data.content || "",
    excerpt: data.excerpt || null,
    featuredImage: data.featuredImage || null,
    featuredImageCaption: data.featuredImageCaption || null,
    photoSource: data.photoSource || null,
    source: data.source || null,
    categoryId: `rubrik-${rubrik.slug}`,
    categoryName: rubrik.name,
    categorySlug: rubrik.slug,
    status: "DRAFT",
    adminNote: null,
    tags: data.tags || [],
    views: 0,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  contributorArticlesStore.unshift(newArticle);
  return newArticle;
}

/**
 * Submit article to editorial review
 * Allowed only from DRAFT or REVISION status!
 */
export async function submitArticleToReview(
  articleId: string,
  userId: string
): Promise<ContributorArticleItem> {
  try {
    const dbArticle = await prisma.article.findFirst({
      where: { id: articleId, authorId: userId },
    });

    if (dbArticle) {
      if (dbArticle.status !== "DRAFT" && dbArticle.status !== "REVISION") {
        throw new Error(`Artikel dengan status ${dbArticle.status} tidak dapat diajukan ke review`);
      }

      const updated = await prisma.article.update({
        where: { id: articleId },
        data: {
          status: "REVIEW",
        },
        include: {
          category: true,
          author: true,
          tags: { include: { tag: true } },
        },
      });

      return mapDbArticleToContributorItem(updated);
    }
  } catch (error: any) {
    if (error.message?.includes("tidak dapat diajukan")) throw error;
    console.error("Error submitting article to review in DB:", error);
  }

  const existingIndex = contributorArticlesStore.findIndex(
    (a) => a.id === articleId && a.authorId === userId
  );

  if (existingIndex === -1) {
    throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
  }

  const existing = contributorArticlesStore[existingIndex];

  if (existing.status !== "DRAFT" && existing.status !== "REVISION") {
    throw new Error(`Artikel dengan status ${existing.status} tidak dapat diajukan ke review`);
  }

  const updated: ContributorArticleItem = {
    ...existing,
    status: "REVIEW",
    updatedAt: new Date().toISOString(),
  };

  contributorArticlesStore[existingIndex] = updated;
  return updated;
}

/**
 * Delete draft article
 * Strict rule: only DRAFT status can be deleted!
 */
export async function deleteArticleDraft(
  articleId: string,
  userId: string
): Promise<boolean> {
  try {
    const dbArticle = await prisma.article.findFirst({
      where: { id: articleId, authorId: userId },
    });

    if (dbArticle) {
      if (dbArticle.status !== "DRAFT") {
        throw new Error("Hanya artikel berstatus Draf yang dapat dihapus");
      }

      await prisma.articleTag.deleteMany({ where: { articleId } });
      await prisma.article.delete({ where: { id: articleId } });
      return true;
    }
  } catch (error: any) {
    if (error.message?.includes("Hanya artikel berstatus")) throw error;
    console.error("Error deleting draft in DB:", error);
  }

  const existingIndex = contributorArticlesStore.findIndex(
    (a) => a.id === articleId && a.authorId === userId
  );

  if (existingIndex === -1) {
    throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
  }

  const existing = contributorArticlesStore[existingIndex];

  if (existing.status !== "DRAFT") {
    throw new Error("Hanya artikel berstatus Draf yang dapat dihapus");
  }

  contributorArticlesStore.splice(existingIndex, 1);
  return true;
}

/**
 * Get profile of contributor from Prisma database
 */
export async function getContributorProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      return {
        id: user.id,
        name: user.name,
        penName: user.penName,
        slug: user.slug,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      };
    }
  } catch (error) {
    console.error("Error in getContributorProfile:", error);
  }
  return null;
}

/**
 * Update profile of contributor in Prisma database
 */
export async function updateContributorProfile(
  userId: string,
  data: ProfileInput
) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      penName: data.penName || null,
      bio: data.bio || null,
      ...(data.avatarUrl ? { avatarUrl: data.avatarUrl } : {}),
    },
  });

  return {
    id: updated.id,
    name: updated.name,
    penName: updated.penName,
    slug: updated.slug,
    email: updated.email,
    bio: updated.bio,
    avatarUrl: updated.avatarUrl,
  };
}

export { contributorArticlesStore };


