"use server";

import { revalidatePath } from "next/cache";
import { requireUser, setSession } from "@/lib/auth/session";
import {
  saveArticleDraft,
  submitArticleToReview,
  deleteArticleDraft,
  updateContributorProfile,
} from "@/lib/data/contributor";
import {
  CreateArticleSchema,
  UpdateArticleSchema,
  CreateArticleInput,
  UpdateArticleInput,
} from "@/lib/validations/article.schema";
import { ProfileSchema, ProfileInput } from "@/lib/validations/profile.schema";
import { ApiResponse } from "@/types";
import { sanitizeHtml } from "@/lib/security/sanitize";
import { rateLimitSubmission } from "@/lib/security/rate-limit";

/**
 * Save article as DRAFT with rate limiting and HTML sanitization
 */
export async function saveDraftAction(
  data: CreateArticleInput | UpdateArticleInput,
  articleId?: string
): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const session = await requireUser();

    // 1. Rate limiting check per user
    const rateCheck = rateLimitSubmission(session.id);
    if (!rateCheck.success) {
      return {
        success: false,
        message: `Terlalu banyak permintaan penyimpanan. Harap tunggu ${rateCheck.resetSeconds} detik sebelum mencoba lagi.`,
      };
    }

    // 2. Partial validation for drafts
    const parsed = articleId
      ? UpdateArticleSchema.parse(data)
      : CreateArticleSchema.parse(data);

    // 3. Content sanitization to prevent stored XSS
    if (parsed.content) {
      parsed.content = sanitizeHtml(parsed.content);
    }
    if (parsed.title) {
      parsed.title = parsed.title.trim();
    }
    if (parsed.excerpt) {
      parsed.excerpt = parsed.excerpt.trim();
    }

    const saved = await saveArticleDraft(session.id, parsed, articleId);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    if (articleId) {
      revalidatePath(`/dashboard/artikel/${articleId}/edit`);
    }

    return {
      success: true,
      data: { id: saved.id, slug: saved.slug },
      message: "Draf naskah berhasil disimpan secara aman.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menyimpan draf artikel.",
    };
  }
}

/**
 * Submit article to editorial review queue with rate limiting
 */
export async function submitToReviewAction(
  articleId: string
): Promise<ApiResponse<{ id: string }>> {
  try {
    const session = await requireUser();

    // 1. Rate limiting check per user
    const rateCheck = rateLimitSubmission(session.id);
    if (!rateCheck.success) {
      return {
        success: false,
        message: `Terlalu banyak permintaan. Harap tunggu ${rateCheck.resetSeconds} detik sebelum mencoba lagi.`,
      };
    }

    const submitted = await submitArticleToReview(articleId, session.id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath(`/dashboard/artikel/${articleId}/edit`);

    return {
      success: true,
      data: { id: submitted.id },
      message: "Naskah berhasil diajukan ke meja kurasi Agen Belokan.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengajukan naskah ke Agen Belokan.",
    };
  }
}

/**
 * Delete draft article
 */
export async function deleteDraftAction(
  articleId: string
): Promise<ApiResponse<null>> {
  try {
    const session = await requireUser();

    await deleteArticleDraft(articleId, session.id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");

    return {
      success: true,
      data: null,
      message: "Draf naskah berhasil dihapus.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus draf.",
    };
  }
}

/**
 * Update contributor profile with input sanitization
 */
export async function updateProfileAction(
  data: ProfileInput
): Promise<ApiResponse<null>> {
  try {
    const session = await requireUser();
    const parsed = ProfileSchema.parse(data);

    // Sanitize bio and name
    parsed.name = parsed.name.trim();
    if (parsed.penName) parsed.penName = parsed.penName.trim();
    if (parsed.bio) parsed.bio = sanitizeHtml(parsed.bio).trim();

    await updateContributorProfile(session.id, parsed);

    // Sync session data
    await setSession({
      ...session,
      name: parsed.name,
      penName: parsed.penName || null,
      avatarUrl: parsed.avatarUrl || session.avatarUrl,
    });

    revalidatePath("/dashboard/profil");
    revalidatePath(`/penulis/${session.slug}`);

    return {
      success: true,
      data: null,
      message: "Profil penulis berhasil diperbarui.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal memperbarui profil penulis.",
    };
  }
}
