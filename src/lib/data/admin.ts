import { contributorArticlesStore, ContributorArticleItem } from "./contributor";
import { MOCK_RUBRIKS } from "./mock-articles";

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
    email: "budi.santoso@nalar.id",
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
    email: "arya.wicaksono@nalar.id",
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
    email: "dian.paramita@nalar.id",
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
    name: "Redaksi NALAR",
    penName: null,
    email: "redaksi@nalar.id",
    slug: "redaksi-nalar",
    role: "ADMIN",
    status: "ACTIVE",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Dewan Redaksi dan Tim Kurasi NALAR Media Nusantara.",
    articleCount: 0,
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
];

// Activity logs store
let activityLogsStore: ActivityLogItem[] = [
  {
    id: "act-1",
    action: "REQUEST_REVISION",
    userName: "Redaksi NALAR",
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
    userName: "Redaksi NALAR",
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: "Melacak Jejak Tenun Ikat Tradisional yang Terancam Sunyi di Lembata",
    targetId: "art-contrib-4",
    note: "Disetujui untuk tayang di Rubrik JEJAK.",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "act-4",
    action: "PUBLISH_ARTICLE",
    userName: "Redaksi NALAR",
    userRole: "ADMIN",
    targetType: "ARTICLE",
    targetTitle: "Suara dari Bilik Suara: Refleksi Partisipasi Pemilih Muda dalam Demokrasi Lokal",
    targetId: "art-contrib-5",
    note: "Disetujui untuk tayang di Rubrik SUARA.",
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
];

/**
 * Helper to enrich article with author metadata
 */
function enrichArticle(article: ContributorArticleItem): AdminArticleItem {
  const author = adminUsersStore.find((u) => u.id === article.authorId) || adminUsersStore[0];
  return {
    ...article,
    authorName: author.penName || author.name,
    authorEmail: author.email,
    authorAvatarUrl: author.avatarUrl,
    authorBio: author.bio,
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
  const reviews = contributorArticlesStore.filter((a) => a.status === "REVIEW");
  return reviews
    .map(enrichArticle)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/**
 * Get all articles across the platform with filtering
 */
export async function getAllArticlesForAdmin(filters?: {
  status?: "ALL" | "REVIEW" | "PUBLISHED" | "REVISION" | "DRAFT";
  categorySlug?: string;
  search?: string;
}): Promise<AdminArticleItem[]> {
  let list = contributorArticlesStore.map(enrichArticle);

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
  const article = contributorArticlesStore.find((a) => a.id === articleId);
  if (!article) return null;
  return enrichArticle(article);
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
  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];
  const now = new Date().toISOString();

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
      (updated as any).isEditorPick ? " • Ditandai Pilihan Redaksi" : ""
    }`,
    createdAt: now,
  });

  return enrichArticle(updated);
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

  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];
  const now = new Date().toISOString();

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

  return enrichArticle(updated);
}

/**
 * Unpublish article back to DRAFT
 */
export async function unpublishArticleByAdmin(
  articleId: string,
  adminName: string
): Promise<AdminArticleItem> {
  const index = contributorArticlesStore.findIndex((a) => a.id === articleId);
  if (index === -1) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = contributorArticlesStore[index];
  const now = new Date().toISOString();

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
    note: "Status ditarik kembali menjadi Draf oleh Redaksi",
    createdAt: now,
  });

  return enrichArticle(updated);
}

/**
 * Toggle Editor's Pick
 */
export async function toggleEditorPickByAdmin(
  articleId: string
): Promise<boolean> {
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
    note: "Artikel dihapus permanen oleh Redaksi",
    createdAt: new Date().toISOString(),
  });

  return true;
}

/**
 * Get all users for admin management
 */
export async function getAdminUsersList(): Promise<AdminUserItem[]> {
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
