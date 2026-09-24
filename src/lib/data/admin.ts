import { contributorArticlesStore, ContributorArticleItem } from "./contributor";
import { MOCK_RUBRIKS } from "./mock-articles";
import { slugify } from "@/lib/utils/slugify";
import { prisma } from "@/lib/db/prisma";

export interface AdminArticleItem extends ContributorArticleItem {
  authorName: string;
  authorEmail: string;
  authorAvatarUrl: string | null;
  authorBio: string | null;
  isEditorPick?: boolean;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

export interface AdminUserItem {
  id: string;
  name: string;
  penName: string | null;
  email: string;
  slug: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  avatarUrl: string | null;
  bio: string | null;
  articleCount: number;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  action:
    | "LOGIN"
    | "CREATE_ARTICLE"
    | "UPDATE_ARTICLE"
    | "SUBMIT_ARTICLE"
    | "REQUEST_REVISION"
    | "PUBLISH_ARTICLE"
    | "UNPUBLISH_ARTICLE"
    | "UPDATE_PROFILE"
    | "SUSPEND_USER"
    | "ACTIVATE_USER";
  userName: string;
  userRole: "USER" | "ADMIN";
  targetType: "ARTICLE" | "USER" | "CATEGORY";
  targetTitle: string;
  targetId: string;
  note?: string | null;
  createdAt: string;
}

export interface AdminDashboardStats {
  reviewQueueCount: number;
  publishedCount: number;
  revisionCount: number;
  draftCount: number;
  totalContributors: number;
  totalViews: number;
}

// User registry store
let adminUsersStore: AdminUserItem[] = [
  {
    id: "user-demo-1",
    name: "Budi Santoso",
    penName: "Budi Santoso",
    email: "budi.santoso@belokiri.id",
    slug: "budi-santoso",
    role: "USER",
    status: "ACTIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Penulis lepas dan pemerhati tata ruang kota, kebijakan transportasi, serta kebudayaan Nusantara.",
    articleCount: 5,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: "user-demo-2",
    name: "Arya Wicaksono",
    penName: "Arya W.",
    email: "arya.wicaksono@belokiri.id",
    slug: "arya-wicaksono",
    role: "USER",
    status: "ACTIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Jurnalis investigasi independen dan peminat isu kebijakan publik.",
    articleCount: 3,
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
  {
    id: "user-demo-3",
    name: "Dian Paramita",
    penName: null,
    email: "dian.paramita@belokiri.id",
    slug: "dian-paramita",
    role: "USER",
    status: "ACTIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Peneliti data sosial dan pengamat dinamika pendidikan tinggi.",
    articleCount: 2,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: "admin-demo-1",
    name: "Agen Belokan BELOKIRI",
    penName: null,
    email: "agen@belokiri.id",
    slug: "agen-belokan-belokiri",
    role: "ADMIN",
    status: "ACTIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Dewan Agen Belokan dan Tim Kurasi BELOKIRI.",
    articleCount: 0,
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
];

// Activity logs store
let activityLogsStore: ActivityLogItem[] = [
  {
    id: "act-1",
    action: "REQUEST_REVISION",
    userName: "Agen Belokan BELOKIRI",
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: "Menakar Efektivitas Beasiswa Pendidikan Tinggi di Daerah 3T: Harapan dan Hambatan",
    targetId: "art-contrib-3",
    note: "Perlu ditambahkan data perbandingan penerima beasiswa tahun 2024 vs 2025.",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "act-2",
    action: "SUBMIT_ARTICLE",
    userName: "Budi Santoso",
    userRole: "USER",
    targetType: "ARTICLE",
    targetTitle: "Polemik Penyesuaian Tarif KRL dan Beban Mobilitas Pekerja Komuter",
    targetId: "art-contrib-2",
    note: null,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "act-3",
    action: "PUBLISH_ARTICLE",
    userName: "Agen Belokan BELOKIRI",
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: "Melacak Jejak Tenun Ikat Tradisional yang Terancam Sunyi di Lembata",
    targetId: "art-contrib-4",
    note: "Disetujui untuk tayang di Rubrik SISA BAHASA.",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "act-4",
    action: "PUBLISH_ARTICLE",
    userName: "Agen Belokan BELOKIRI",
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: "Suara dari Bilik Suara: Refleksi Partisipasi Pemilih Muda dalam Demokrasi Lokal",
    targetId: "art-contrib-5",
    note: "Disetujui untuk tayang di Rubrik BERISIK.",
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
];

/**
 * Helper to enrich article with author metadata
 */
async function enrichArticle(article: ContributorArticleItem): Promise<AdminArticleItem> {
  let authorName = article.authorName || "";
  let authorEmail = "";
  let authorAvatarUrl: string | null = article.authorAvatarUrl || null;
  let authorBio: string | null = article.authorBio || "Warga Belokan resmi BELOKIRI.";

  if (!authorName) {
    try {
      const dbUser = await prisma.user.findFirst({
        where: {
          OR: [
            { id: article.authorId },
            { email: article.authorId },
            { slug: article.authorId },
          ],
        },
      });

      if (dbUser) {
        authorName = dbUser.penName || dbUser.name;
        authorEmail = dbUser.email;
        authorAvatarUrl = dbUser.avatarUrl || null;
        authorBio = dbUser.bio || "Warga Belokan resmi BELOKIRI.";
      }
    } catch (err) {
      console.error("Error finding user in db for enrichArticle:", err);
    }
  }

  if (!authorName) {
    const author = adminUsersStore.find((u) => u.id === article.authorId);
    if (author) {
      authorName = author.penName || author.name;
      authorEmail = author.email;
      authorAvatarUrl = author.avatarUrl;
      authorBio = author.bio || "Warga Belokan resmi BELOKIRI.";
    }
  }

  if (!authorName) {
    authorName = "Warga Belokan";
  }

  return {
    ...article,
    authorName,
    authorEmail,
    authorAvatarUrl,
    authorBio,
    isEditorPick: (article as any).isEditorPick || false,
    seoTitle: (article as any).seoTitle || null,
    metaDescription: (article as any).metaDescription || null,
  };
}

/**
 * Get comprehensive editorial dashboard KPIs
 */
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const reviewQueueCount = contributorArticlesStore.filter((a) => a.status === "REVIEW").length;
  const publishedArticles = contributorArticlesStore.filter((a) => a.status === "PUBLISHED");
  const publishedCount = publishedArticles.length;
  const revisionCount = contributorArticlesStore.filter((a) => a.status === "REVISION").length;
  const draftCount = contributorArticlesStore.filter((a) => a.status === "DRAFT").length;
  const totalContributors = adminUsersStore.filter((u) => u.role === "USER").length;
  const totalViews = publishedArticles.reduce((acc, a) => acc + (a.views || 0), 0);

  return {
    reviewQueueCount,
    publishedCount,
    revisionCount,
    draftCount,
    totalContributors,
    totalViews,
  };
}

/**
 * Get all articles currently in REVIEW queue awaiting editor action
 */
export async function getReviewQueue(): Promise<AdminArticleItem[]> {
  try {
    const dbReviews = await prisma.article.findMany({
      where: { status: "REVIEW" },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const mappedDb: AdminArticleItem[] = dbReviews.map((a) => ({
      id: a.id,
      authorId: a.authorId,
      authorName: a.author.penName || a.author.name,
      authorEmail: a.author.email,
      authorAvatarUrl: a.author.avatarUrl,
      authorBio: a.author.bio || "Warga Belokan resmi BELOKIRI.",
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      featuredImage: a.featuredImage,
      featuredImageCaption: a.featuredImageCaption,
      photoSource: a.photoSource,
      source: a.source,
      categoryId: a.categoryId,
      categoryName: a.category.name,
      categorySlug: a.category.slug,
      status: "REVIEW" as const,
      adminNote: a.adminNote,
      tags: a.tags.map((t) => t.tag.name),
      views: a.views,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
      isEditorPick: a.isEditorPick,
      seoTitle: a.seoTitle,
      metaDescription: a.metaDescription,
    }));

    const reviews = contributorArticlesStore.filter((a) => a.status === "REVIEW");
    const enriched = await Promise.all(reviews.map(enrichArticle));
    const existingIds = new Set(mappedDb.map((m) => m.id));
    const combined = [...mappedDb, ...enriched.filter((e) => !existingIds.has(e.id))];

    return combined.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (err) {
    console.error("Error getReviewQueue db:", err);
  }

  const reviews = contributorArticlesStore.filter((a) => a.status === "REVIEW");
  const enriched = await Promise.all(reviews.map(enrichArticle));
  return enriched.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/**
 * Get all articles across the platform with filtering
 */
export async function getAllArticlesForAdmin(filters?: {
  status?: "ALL" | "REVIEW" | "PUBLISHED" | "REVISION" | "DRAFT";
  categorySlug?: string;
  search?: string;
}): Promise<AdminArticleItem[]> {
  try {
    const whereClause: any = {};
    if (filters?.status && filters.status !== "ALL") {
      whereClause.status = filters.status;
    }
    if (filters?.categorySlug && filters.categorySlug !== "ALL") {
      whereClause.category = { slug: filters.categorySlug };
    }
    if (filters?.search && filters.search.trim()) {
      whereClause.OR = [
        { title: { contains: filters.search.trim(), mode: "insensitive" } },
        { excerpt: { contains: filters.search.trim(), mode: "insensitive" } },
      ];
    }

    const dbArticles = await prisma.article.findMany({
      where: whereClause,
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const mappedDb: AdminArticleItem[] = dbArticles.map((a) => ({
      id: a.id,
      authorId: a.authorId,
      authorName: a.author.penName || a.author.name,
      authorEmail: a.author.email,
      authorAvatarUrl: a.author.avatarUrl,
      authorBio: a.author.bio || "Warga Belokan resmi BELOKIRI.",
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      featuredImage: a.featuredImage,
      featuredImageCaption: a.featuredImageCaption,
      photoSource: a.photoSource,
      source: a.source,
      categoryId: a.categoryId,
      categoryName: a.category.name,
      categorySlug: a.category.slug,
      status: a.status as any,
      adminNote: a.adminNote,
      tags: a.tags.map((t) => t.tag.name),
      views: a.views,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
      isEditorPick: a.isEditorPick,
      seoTitle: a.seoTitle,
      metaDescription: a.metaDescription,
    }));

    let list = await Promise.all(contributorArticlesStore.map(enrichArticle));
    if (filters?.status && filters.status !== "ALL") {
      list = list.filter((a) => a.status === filters.status);
    }
    if (filters?.categorySlug && filters.categorySlug !== "ALL") {
      list = list.filter((a) => a.categorySlug === filters.categorySlug);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q)
      );
    }

    const existingIds = new Set(mappedDb.map((m) => m.id));
    const combined = [...mappedDb, ...list.filter((m) => !existingIds.has(m.id))];

    return combined.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (err) {
    console.error("Error in getAllArticlesForAdmin db:", err);
  }

  let list = await Promise.all(contributorArticlesStore.map(enrichArticle));

  if (filters?.status && filters.status !== "ALL") {
    list = list.filter((a) => a.status === filters.status);
  }

  if (filters?.categorySlug && filters.categorySlug !== "ALL") {
    list = list.filter((a) => a.categorySlug === filters.categorySlug);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q)
    );
  }

  return list.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/**
 * Get single article for review workbench
 */
export async function getArticleForReview(articleId: string): Promise<AdminArticleItem | null> {
  try {
    const dbArticle = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (dbArticle) {
      return {
        id: dbArticle.id,
        authorId: dbArticle.authorId,
        authorName: dbArticle.author.penName || dbArticle.author.name,
        authorEmail: dbArticle.author.email,
        authorAvatarUrl: dbArticle.author.avatarUrl,
        authorBio: dbArticle.author.bio || "Warga Belokan resmi BELOKIRI.",
        title: dbArticle.title,
        slug: dbArticle.slug,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content,
        featuredImage: dbArticle.featuredImage,
        featuredImageCaption: dbArticle.featuredImageCaption,
        photoSource: dbArticle.photoSource,
        source: dbArticle.source,
        categoryId: dbArticle.categoryId,
        categoryName: dbArticle.category.name,
        categorySlug: dbArticle.category.slug,
        status: dbArticle.status as any,
        adminNote: dbArticle.adminNote,
        tags: dbArticle.tags.map((t) => t.tag.name),
        views: dbArticle.views,
        publishedAt: dbArticle.publishedAt ? dbArticle.publishedAt.toISOString() : null,
        createdAt: dbArticle.createdAt.toISOString(),
        updatedAt: dbArticle.updatedAt.toISOString(),
        isEditorPick: dbArticle.isEditorPick,
        seoTitle: dbArticle.seoTitle,
        metaDescription: dbArticle.metaDescription,
      };
    }
  } catch (err) {
    console.error("Error getArticleForReview db:", err);
  }

  const article = contributorArticlesStore.find((a) => a.id === articleId);
  if (!article) return null;
  return await enrichArticle(article);
}

/**
 * Publish article (Editorial approval)
 */
export async function publishArticleByAdmin(
  articleId: string,
  adminName: string,
  seoData?: {
    seoTitle?: string;
    metaDescription?: string;
    isEditorPick?: boolean;
    title?: string;
    categoryId?: string;
  }
): Promise<AdminArticleItem> {
  const now = new Date().toISOString();

  try {
    const dbArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (dbArticle) {
      let finalCatId = dbArticle.categoryId;
      if (seoData?.categoryId) {
        const catSlug = seoData.categoryId.replace(/^rubrik-/, "");
        const cat = await prisma.category.findFirst({
          where: { OR: [{ slug: catSlug }, { id: seoData.categoryId }] },
        });
        if (cat) finalCatId = cat.id;
      }

      const updated = await prisma.article.update({
        where: { id: articleId },
        data: {
          title: seoData?.title || dbArticle.title,
          categoryId: finalCatId,
          status: "PUBLISHED",
          adminNote: null,
          isEditorPick: seoData?.isEditorPick !== undefined ? seoData.isEditorPick : true,
          seoTitle: seoData?.seoTitle || null,
          metaDescription: seoData?.metaDescription || null,
          publishedAt: dbArticle.publishedAt || new Date(),
        },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
      });

      activityLogsStore.unshift({
        id: `act-${Date.now()}`,
        action: "PUBLISH_ARTICLE",
        userName: adminName,
        userRole: "ADMIN",
        targetType: "ARTICLE",
        targetTitle: updated.title,
        targetId: updated.id,
        note: `Diterbitkan di Rubrik ${updated.category.name}`,
        createdAt: now,
      });

      return {
        id: updated.id,
        authorId: updated.authorId,
        authorName: updated.author.penName || updated.author.name,
        authorEmail: updated.author.email,
        authorAvatarUrl: updated.author.avatarUrl,
        authorBio: updated.author.bio || "Warga Belokan resmi BELOKIRI.",
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content: updated.content,
        featuredImage: updated.featuredImage,
        featuredImageCaption: updated.featuredImageCaption,
        photoSource: updated.photoSource,
        source: updated.source,
        categoryId: updated.categoryId,
        categoryName: updated.category.name,
        categorySlug: updated.category.slug,
        status: "PUBLISHED",
        adminNote: null,
        tags: updated.tags.map((t) => t.tag.name),
        views: updated.views,
        publishedAt: updated.publishedAt ? updated.publishedAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        isEditorPick: updated.isEditorPick,
        seoTitle: updated.seoTitle,
        metaDescription: updated.metaDescription,
      };
    }
  } catch (err) {
    console.error("Error publishArticleByAdmin db:", err);
  }

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];

  // If editor updated rubrik
  let categoryName = existing.categoryName;
  let categorySlug = existing.categorySlug;
  if (seoData?.categoryId) {
    const rubrik = MOCK_RUBRIKS.find(
      (r) => r.slug === seoData.categoryId || `rubrik-${r.slug}` === seoData.categoryId
    );
    if (rubrik) {
      categoryName = rubrik.name;
      categorySlug = rubrik.slug;
    }
  }

  const updated: ContributorArticleItem = {
    ...existing,
    title: seoData?.title || existing.title,
    categoryName,
    categorySlug,
    status: "PUBLISHED",
    adminNote: null,
    publishedAt: existing.publishedAt || now,
    updatedAt: now,
  };

  // Attach SEO properties
  (updated as any).isEditorPick = seoData?.isEditorPick !== undefined ? seoData.isEditorPick : true;
  (updated as any).seoTitle = seoData?.seoTitle || null;
  (updated as any).metaDescription = seoData?.metaDescription || null;

  contributorArticlesStore[index] = updated;

  // Log action
  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: "PUBLISH_ARTICLE",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: updated.title,
    targetId: updated.id,
    note: `Diterbitkan di Rubrik ${updated.categoryName}${
      (updated as any).isEditorPick ? " • Ditandai Pilihan Agen Belokan" : ""
    }`,
    createdAt: now,
  });

  return await enrichArticle(updated);
}

/**
 * Request revision from contributor with required adminNote
 */
export async function requestRevisionByAdmin(
  articleId: string,
  adminName: string,
  adminNote: string
): Promise<AdminArticleItem> {
  if (!adminNote || adminNote.trim().length < 10) {
    throw new Error("Catatan kurasi revisi wajib diisi dengan jelas (minimal 10 karakter).");
  }

  const now = new Date().toISOString();

  try {
    const dbArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (dbArticle) {
      const updated = await prisma.article.update({
        where: { id: articleId },
        data: {
          status: "REVISION",
          adminNote: adminNote.trim(),
        },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
      });

      activityLogsStore.unshift({
        id: `act-${Date.now()}`,
        action: "REQUEST_REVISION",
        userName: adminName,
        userRole: "ADMIN",
        targetType: "ARTICLE",
        targetTitle: updated.title,
        targetId: updated.id,
        note: adminNote.trim(),
        createdAt: now,
      });

      return {
        id: updated.id,
        authorId: updated.authorId,
        authorName: updated.author.penName || updated.author.name,
        authorEmail: updated.author.email,
        authorAvatarUrl: updated.author.avatarUrl,
        authorBio: updated.author.bio || "Warga Belokan resmi BELOKIRI.",
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content: updated.content,
        featuredImage: updated.featuredImage,
        featuredImageCaption: updated.featuredImageCaption,
        photoSource: updated.photoSource,
        source: updated.source,
        categoryId: updated.categoryId,
        categoryName: updated.category.name,
        categorySlug: updated.category.slug,
        status: "REVISION",
        adminNote: updated.adminNote,
        tags: updated.tags.map((t) => t.tag.name),
        views: updated.views,
        publishedAt: updated.publishedAt ? updated.publishedAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        isEditorPick: updated.isEditorPick,
        seoTitle: updated.seoTitle,
        metaDescription: updated.metaDescription,
      };
    }
  } catch (err) {
    console.error("Error requestRevisionByAdmin db:", err);
  }

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];

  const updated: ContributorArticleItem = {
    ...existing,
    status: "REVISION",
    adminNote: adminNote.trim(),
    updatedAt: now,
  };

  contributorArticlesStore[index] = updated;

  // Log action
  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: "REQUEST_REVISION",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: updated.title,
    targetId: updated.id,
    note: adminNote.trim(),
    createdAt: now,
  });

  return await enrichArticle(updated);
}

/**
 * Unpublish article back to DRAFT
 */
export async function unpublishArticleByAdmin(
  articleId: string,
  adminName: string
): Promise<AdminArticleItem> {
  const now = new Date().toISOString();

  try {
    const dbArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (dbArticle) {
      const updated = await prisma.article.update({
        where: { id: articleId },
        data: {
          status: "DRAFT",
        },
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
      });

      activityLogsStore.unshift({
        id: `act-${Date.now()}`,
        action: "UNPUBLISH_ARTICLE",
        userName: adminName,
        userRole: "ADMIN",
        targetType: "ARTICLE",
        targetTitle: updated.title,
        targetId: updated.id,
        note: "Status ditarik kembali menjadi Draf oleh Agen Belokan",
        createdAt: now,
      });

      return {
        id: updated.id,
        authorId: updated.authorId,
        authorName: updated.author.penName || updated.author.name,
        authorEmail: updated.author.email,
        authorAvatarUrl: updated.author.avatarUrl,
        authorBio: updated.author.bio || "Warga Belokan resmi BELOKIRI.",
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content: updated.content,
        featuredImage: updated.featuredImage,
        featuredImageCaption: updated.featuredImageCaption,
        photoSource: updated.photoSource,
        source: updated.source,
        categoryId: updated.categoryId,
        categoryName: updated.category.name,
        categorySlug: updated.category.slug,
        status: "DRAFT",
        adminNote: updated.adminNote,
        tags: updated.tags.map((t) => t.tag.name),
        views: updated.views,
        publishedAt: updated.publishedAt ? updated.publishedAt.toISOString() : null,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        isEditorPick: updated.isEditorPick,
        seoTitle: updated.seoTitle,
        metaDescription: updated.metaDescription,
      };
    }
  } catch (err) {
    console.error("Error unpublishArticleByAdmin db:", err);
  }

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];

  const updated: ContributorArticleItem = {
    ...existing,
    status: "DRAFT",
    updatedAt: now,
  };

  contributorArticlesStore[index] = updated;

  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: "UNPUBLISH_ARTICLE",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: updated.title,
    targetId: updated.id,
    note: "Status ditarik kembali menjadi Draf oleh Agen Belokan",
    createdAt: now,
  });

  return await enrichArticle(updated);
}

/**
 * Toggle Editor's Pick
 */
export async function toggleEditorPickByAdmin(
  articleId: string
): Promise<boolean> {
  try {
    const dbArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (dbArticle) {
      const updated = await prisma.article.update({
        where: { id: articleId },
        data: { isEditorPick: !dbArticle.isEditorPick },
      });
      return updated.isEditorPick;
    }
  } catch (err) {
    console.error("Error toggleEditorPickByAdmin db:", err);
  }

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) return false;

  const current = (contributorArticlesStore[index] as any).isEditorPick || false;
  (contributorArticlesStore[index] as any).isEditorPick = !current;
  return !current;
}

/**
 * Delete article by admin
 */
export async function deleteArticleByAdmin(
  articleId: string,
  adminName: string
): Promise<boolean> {
  try {
    const dbArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (dbArticle) {
      await prisma.articleTag.deleteMany({ where: { articleId } });
      await prisma.article.delete({ where: { id: articleId } });

      activityLogsStore.unshift({
        id: `act-${Date.now()}`,
        action: "UPDATE_ARTICLE",
        userName: adminName,
        userRole: "ADMIN",
        targetType: "ARTICLE",
        targetTitle: dbArticle.title,
        targetId: dbArticle.id,
        note: "Artikel dihapus permanen oleh Agen Belokan",
        createdAt: new Date().toISOString(),
      });
      return true;
    }
  } catch (err) {
    console.error("Error deleteArticleByAdmin db:", err);
  }

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) return false;

  const deleted = contributorArticlesStore[index];
  contributorArticlesStore.splice(index, 1);

  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: "UPDATE_ARTICLE",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: deleted.title,
    targetId: deleted.id,
    note: "Artikel dihapus permanen oleh Agen Belokan",
    createdAt: new Date().toISOString(),
  });

  return true;
}

/**
 * Get all users for admin management
 */
export async function getAdminUsersList(): Promise<AdminUserItem[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      include: {
        articles: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    if (dbUsers.length > 0) {
      return dbUsers.map((u) => {
        const memoryCount = contributorArticlesStore.filter((a) => a.authorId === u.id).length;
        return {
          id: u.id,
          name: u.name,
          penName: u.penName,
          email: u.email,
          slug: u.slug,
          role: u.role,
          status: u.status,
          avatarUrl: u.avatarUrl,
          bio: u.bio,
          articleCount: u.articles.length + memoryCount,
          createdAt: u.createdAt.toISOString(),
        };
      });
    }
  } catch (err) {
    console.error("Error fetching db users for admin:", err);
  }

  // Update article counts
  return adminUsersStore.map((u) => {
    const count = contributorArticlesStore.filter((a) => a.authorId === u.id).length;
    return {
      ...u,
      articleCount: count,
    };
  });
}

/**
 * Toggle user account status (ACTIVE <-> SUSPENDED)
 */
export async function toggleUserStatusByAdmin(
  userId: string,
  adminName: string
): Promise<"ACTIVE" | "SUSPENDED"> {
  const index = adminUsersStore.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("Pengguna tidak ditemukan");
  }

  const current = adminUsersStore[index].status;
  const nextStatus = current === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
  adminUsersStore[index].status = nextStatus;

  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: nextStatus === "SUSPENDED" ? "SUSPEND_USER" : "ACTIVATE_USER",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "USER",
    targetTitle: adminUsersStore[index].name,
    targetId: userId,
    note: `Akun diubah menjadi ${nextStatus}`,
    createdAt: new Date().toISOString(),
  });

  return nextStatus;
}

/**
 * Get activity logs
 */
export async function getActivityLogs(): Promise<ActivityLogItem[]> {
  return [...activityLogsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Create or Update an article directly by Admin/Editorial staff
 */
export async function saveArticleByAdmin(
  adminId: string,
  adminName: string,
  data: {
    title: string;
    categoryId: string;
    content: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    featuredImageCaption?: string | null;
    photoSource?: string | null;
    source?: string | null;
    tags?: string[];
    isEditorPick?: boolean;
    seoTitle?: string | null;
    metaDescription?: string | null;
    status: "DRAFT" | "REVIEW" | "PUBLISHED";
  },
  articleId?: string
): Promise<AdminArticleItem> {
  const rubrik = MOCK_RUBRIKS.find(
    (r) => r.slug === data.categoryId || `rubrik-${r.slug}` === data.categoryId
  ) || MOCK_RUBRIKS[0];

  const now = new Date().toISOString();

  if (articleId) {
    const existingIndex = contributorArticlesStore.findIndex((a) => a.id === articleId);
    if (existingIndex === -1) {
      throw new Error("Artikel tidak ditemukan");
    }

    const existing = contributorArticlesStore[existingIndex];
    const isNowPublished = data.status === "PUBLISHED";
    const publishedAt = isNowPublished
      ? existing.publishedAt || now
      : data.status === "DRAFT"
      ? null
      : existing.publishedAt;

    const updated: ContributorArticleItem = {
      ...existing,
      title: data.title || existing.title,
      slug: data.title ? `${slugify(data.title)}-${existing.id.slice(-4)}` : existing.slug,
      content: data.content || existing.content,
      excerpt: data.excerpt !== undefined ? data.excerpt : existing.excerpt,
      featuredImage: data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
      featuredImageCaption:
        data.featuredImageCaption !== undefined
          ? data.featuredImageCaption
          : existing.featuredImageCaption,
      photoSource: data.photoSource !== undefined ? data.photoSource : existing.photoSource,
      source: data.source !== undefined ? data.source : existing.source,
      categoryId: `rubrik-${rubrik.slug}`,
      categoryName: rubrik.name,
      categorySlug: rubrik.slug,
      status: data.status,
      publishedAt,
      tags: data.tags || existing.tags,
      updatedAt: now,
    };

    (updated as any).isEditorPick =
      data.isEditorPick !== undefined
        ? data.isEditorPick
        : (existing as any).isEditorPick || false;
    (updated as any).seoTitle =
      data.seoTitle || (existing as any).seoTitle || null;
    (updated as any).metaDescription =
      data.metaDescription || (existing as any).metaDescription || null;

    contributorArticlesStore[existingIndex] = updated;

    activityLogsStore.unshift({
      id: `act-${Date.now()}`,
      action: isNowPublished ? "PUBLISH_ARTICLE" : "UPDATE_ARTICLE",
      userName: adminName,
      userRole: "ADMIN",
      targetType: "ARTICLE",
      targetTitle: updated.title,
      targetId: updated.id,
      note: isNowPublished
        ? `Diterbitkan langsung oleh Agen Belokan di Rubrik ${rubrik.name}`
        : `Naskah diperbarui oleh Agen Belokan (Status: ${data.status})`,
      createdAt: now,
    });

    return await enrichArticle(updated);
  }

  // Create new article
  const newId = `art-admin-${Date.now()}`;
  const newSlug = `${slugify(data.title || "naskah-agen-belokan")}-${newId.slice(-4)}`;
  const isPublished = data.status === "PUBLISHED";

  const newArticle: ContributorArticleItem = {
    id: newId,
    authorId: adminId,
    title: data.title || "Naskah Agen Belokan BELOKIRI",
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
    status: data.status,
    adminNote: null,
    tags: data.tags || ["Liputan Khusus"],
    views: 0,
    publishedAt: isPublished ? now : null,
    createdAt: now,
    updatedAt: now,
  };

  (newArticle as any).isEditorPick =
    data.isEditorPick !== undefined ? data.isEditorPick : isPublished;
  (newArticle as any).seoTitle = data.seoTitle || null;
  (newArticle as any).metaDescription = data.metaDescription || null;

  contributorArticlesStore.unshift(newArticle);

  activityLogsStore.unshift({
    id: `act-${Date.now()}`,
    action: isPublished ? "PUBLISH_ARTICLE" : "CREATE_ARTICLE",
    userName: adminName,
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: newArticle.title,
    targetId: newArticle.id,
    note: isPublished
      ? `Artikel baru diterbitkan langsung oleh Agen Belokan di Rubrik ${rubrik.name}`
      : `Draf naskah baru dibuat oleh Agen Belokan (Status: ${data.status})`,
    createdAt: now,
  });

  return await enrichArticle(newArticle);
}

