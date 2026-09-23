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

/**
 * Save article as DRAFT
 */
export async function saveDraftAction(
  data: CreateArticleInput | UpdateArticleInput,
  articleId?: string
): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const session = await requireUser();

    // Partial validation for drafts so contributors can save incremental work
    const parsed = articleId
      ? UpdateArticleSchema.parse(data)
      : CreateArticleSchema.parse(data);

    const saved = await saveArticleDraft(session.id, parsed, articleId);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    if (articleId) {
      revalidatePath(`/dashboard/artikel/${articleId}/edit`);
    }

    return {
      success: true,
      data: { id: saved.id, slug: saved.slug },
      message: "Draf naskah berhasil disimpan.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal menyimpan draf artikel.",
    };
  }
}

/**
 * Submit article to editorial review queue
 */
export async function submitToReviewAction(
  articleId: string
): Promise<ApiResponse<{ id: string }>> {
  try {
    const session = await requireUser();

    const submitted = await submitArticleToReview(articleId, session.id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/artikel");
    revalidatePath(`/dashboard/artikel/${articleId}/edit`);

    return {
      success: true,
      data: { id: submitted.id },
      message: "Naskah berhasil diajukan ke meja kurasi redaksi.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengajukan naskah ke redaksi.",
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
 * Update contributor profile
 */
export async function updateProfileAction(
  data: ProfileInput
): Promise<ApiResponse<null>> {
  try {
    const session = await requireUser();
    const parsed = ProfileSchema.parse(data);

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
