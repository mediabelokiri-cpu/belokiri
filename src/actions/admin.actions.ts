"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import {
  publishArticleByAdmin,
  requestRevisionByAdmin,
  unpublishArticleByAdmin,
  toggleEditorPickByAdmin,
  deleteArticleByAdmin,
  toggleUserStatusByAdmin,
  saveArticleByAdmin,
} from "@/lib/data/admin";
import { ApiResponse } from "@/types";
import { sanitizeHtml } from "@/lib/security/sanitize";

/**
 * Publish article (Editorial approval)
 */
export async function publishArticleAction(
  articleId: string,
  seoData?: {
    seoTitle?: string;
    metaDescription?: string;
    isEditorPick?: boolean;
    title?: string;
    categoryId?: string;
  }
): Promise<ApiResponse<{ id: string }>> {
  try {
    const admin = await requireAdmin();

    const sanitizedSeo = seoData
      ? {
          ...seoData,
          seoTitle: seoData.seoTitle?.trim(),
          metaDescription: seoData.metaDescription?.trim(),
          title: seoData.title?.trim(),
        }
      : undefined;

    const published = await publishArticleByAdmin(
      articleId,
      admin.name,
      sanitizedSeo
    );

    revalidatePath("/admin");
    revalidatePath("/admin/review");
    revalidatePath("/admin/articles");
    revalidatePath(`/admin/articles/${articleId}/review`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath("/");
    revalidatePath("/berita");
    revalidatePath(`/artikel/${published.slug}`);

    return {
      success: true,
      data: { id: published.id },
      message: "Naskah berhasil disetujui dan resmi diterbitkan di BELOKIRI!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menerbitkan artikel.",
    };
  }
}

/**
 * Request revision from contributor with required admin note
 */
export async function requestRevisionAction(
  articleId: string,
  adminNote: string
): Promise<ApiResponse<{ id: string }>> {
  try {
    const admin = await requireAdmin();

    if (!adminNote || adminNote.trim().length === 0) {
      return {
        success: false,
        message: "Catatan revisi wajib diisi untuk panduan penulis.",
      };
    }

    const cleanNote = sanitizeHtml(adminNote.trim());

    const revised = await requestRevisionByAdmin(
      articleId,
      admin.name,
      cleanNote
    );

    revalidatePath("/admin");
    revalidatePath("/admin/review");
    revalidatePath("/admin/articles");
    revalidatePath(`/admin/articles/${articleId}/review`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");

    return {
      success: true,
      data: { id: revised.id },
      message: "Catatan kurasi berhasil dikirim. Naskah berstatus Perlu Revisi.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengirim catatan revisi.",
    };
  }
}

/**
 * Unpublish article back to DRAFT
 */
export async function unpublishArticleAction(
  articleId: string
): Promise<ApiResponse<{ id: string }>> {
  try {
    const admin = await requireAdmin();

    const article = await unpublishArticleByAdmin(articleId, admin.name);

    revalidatePath("/admin");
    revalidatePath("/admin/articles");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath("/");
    revalidatePath("/berita");

    return {
      success: true,
      data: { id: article.id },
      message: "Artikel berhasil ditarik dari tayang dan berstatus Draf.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menarik artikel.",
    };
  }
}

/**
 * Toggle Editor's Pick
 */
export async function toggleEditorPickAction(
  articleId: string
): Promise<ApiResponse<{ isEditorPick: boolean }>> {
  try {
    await requireAdmin();

    const isEditorPick = await toggleEditorPickByAdmin(articleId);

    revalidatePath("/admin");
    revalidatePath("/admin/articles");
    revalidatePath("/");

    return {
      success: true,
      data: { isEditorPick },
      message: isEditorPick
        ? "Artikel ditandai sebagai Pilihan Agen Belokan."
        : "Label Pilihan Agen Belokan dilepas.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengubah status Pilihan Agen Belokan.",
    };
  }
}

/**
 * Delete article by admin
 */
export async function deleteArticleByAdminAction(
  articleId: string
): Promise<ApiResponse<null>> {
  try {
    const admin = await requireAdmin();

    await deleteArticleByAdmin(articleId, admin.name);

    revalidatePath("/admin");
    revalidatePath("/admin/review");
    revalidatePath("/admin/articles");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath("/");

    return {
      success: true,
      data: null,
      message: "Artikel berhasil dihapus permanen.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus artikel.",
    };
  }
}

/**
 * Toggle user account status (ACTIVE <-> SUSPENDED)
 */
export async function toggleUserStatusAction(
  userId: string
): Promise<ApiResponse<{ status: "ACTIVE" | "SUSPENDED" }>> {
  try {
    const admin = await requireAdmin();

    const newStatus = await toggleUserStatusByAdmin(userId, admin.name);

    revalidatePath("/admin/users");
    revalidatePath("/admin");

    return {
      success: true,
      data: { status: newStatus },
      message:
        newStatus === "SUSPENDED"
          ? "Akun Warga Belokan berhasil ditangguhkan."
          : "Akun Warga Belokan berhasil diaktifkan kembali.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengubah status pengguna.",
    };
  }
}

/**
 * Save or Publish article directly by Agen Belokan
 */
export async function saveArticleByAdminAction(
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
): Promise<ApiResponse<{ id: string; slug: string; status: string }>> {
  try {
    const admin = await requireAdmin();

    if (!data.title || data.title.trim().length < 5) {
      return {
        success: false,
        message: "Judul artikel minimal 5 karakter.",
      };
    }

    if (!data.content || data.content.trim().length < 20) {
      return {
        success: false,
        message: "Isi naskah minimal 20 karakter.",
      };
    }

    // Sanitize content and text inputs
    const sanitizedData = {
      ...data,
      title: data.title.trim(),
      content: sanitizeHtml(data.content),
      excerpt: data.excerpt ? data.excerpt.trim() : null,
      seoTitle: data.seoTitle ? data.seoTitle.trim() : null,
      metaDescription: data.metaDescription ? data.metaDescription.trim() : null,
      photoSource: data.photoSource ? data.photoSource.trim() : null,
      source: data.source ? data.source.trim() : null,
    };

    const saved = await saveArticleByAdmin(
      admin.id,
      admin.name,
      sanitizedData,
      articleId
    );

    revalidatePath("/admin");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/review");
    revalidatePath("/admin/activity");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath("/");
    revalidatePath("/berita");
    revalidatePath(`/artikel/${saved.slug}`);

    const message =
      saved.status === "PUBLISHED"
        ? "Artikel resmi diterbitkan langsung ke publik!"
        : saved.status === "REVIEW"
        ? "Naskah berhasil dimasukkan ke Antrean Kurasi Agen Belokan."
        : "Draf naskah berhasil disimpan.";

    return {
      success: true,
      data: { id: saved.id, slug: saved.slug, status: saved.status },
      message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menyimpan artikel Agen Belokan.",
    };
  }
}
