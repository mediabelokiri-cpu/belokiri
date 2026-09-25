"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";

const VALID_REACTIONS = [
  "masuk-akal",
  "sepakat",
  "mendidih",
  "jenaka",
  "tersentil",
] as const;

export type ValidReactionType = (typeof VALID_REACTIONS)[number];

function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Graceful fallback if called outside Next.js request context
  }
}

export interface ReactionCounts {
  "masuk-akal": number;
  sepakat: number;
  mendidih: number;
  jenaka: number;
  tersentil: number;
  [key: string]: number;
}

export interface ArticleReactionsResult {
  success: boolean;
  counts: ReactionCounts;
  userSelected: string | null;
  total: number;
  error?: string;
}

/**
 * Fetch live reaction counts for an article and check voter's current selection.
 */
export async function getArticleReactionsAction(
  articleSlug: string,
  voterToken?: string
): Promise<ArticleReactionsResult> {
  const defaultCounts: ReactionCounts = {
    "masuk-akal": 0,
    sepakat: 0,
    mendidih: 0,
    jenaka: 0,
    tersentil: 0,
  };

  try {
    const article = await prisma.article.findUnique({
      where: { slug: articleSlug },
      select: { id: true },
    });

    if (!article) {
      return {
        success: false,
        counts: defaultCounts,
        userSelected: null,
        total: 0,
        error: "Artikel tidak ditemukan.",
      };
    }

    const countsRaw = await prisma.articleReaction.groupBy({
      by: ["reactionType"],
      where: { articleId: article.id },
      _count: true,
    });

    const counts: ReactionCounts = { ...defaultCounts };
    let total = 0;

    countsRaw.forEach((item) => {
      const type = item.reactionType as ValidReactionType;
      if (counts[type] !== undefined) {
        counts[type] = item._count;
        total += item._count;
      }
    });

    let userSelected: string | null = null;
    if (voterToken && voterToken.trim()) {
      const voterReaction = await prisma.articleReaction.findUnique({
        where: {
          articleId_voterToken: {
            articleId: article.id,
            voterToken: voterToken.trim(),
          },
        },
        select: { reactionType: true },
      });

      if (voterReaction) {
        userSelected = voterReaction.reactionType;
      }
    }

    return {
      success: true,
      counts,
      userSelected,
      total,
    };
  } catch (error) {
    console.error("Error fetching article reactions:", error);
    return {
      success: false,
      counts: defaultCounts,
      userSelected: null,
      total: 0,
      error:
        error instanceof Error ? error.message : "Gagal memuat reaksi artikel.",
    };
  }
}

/**
 * Toggle or switch reaction for an article from a specific voter token.
 */
export async function toggleArticleReactionAction(
  articleSlug: string,
  reactionType: string,
  voterToken: string
): Promise<ArticleReactionsResult> {
  const defaultCounts: ReactionCounts = {
    "masuk-akal": 0,
    sepakat: 0,
    mendidih: 0,
    jenaka: 0,
    tersentil: 0,
  };

  if (!VALID_REACTIONS.includes(reactionType as ValidReactionType)) {
    return {
      success: false,
      counts: defaultCounts,
      userSelected: null,
      total: 0,
      error: "Jenis reaksi tidak valid.",
    };
  }

  const cleanToken = voterToken?.trim();
  if (!cleanToken) {
    return {
      success: false,
      counts: defaultCounts,
      userSelected: null,
      total: 0,
      error: "Voter token tidak valid.",
    };
  }

  try {
    const article = await prisma.article.findUnique({
      where: { slug: articleSlug },
      select: { id: true },
    });

    if (!article) {
      return {
        success: false,
        counts: defaultCounts,
        userSelected: null,
        total: 0,
        error: "Artikel tidak ditemukan.",
      };
    }

    const existing = await prisma.articleReaction.findUnique({
      where: {
        articleId_voterToken: {
          articleId: article.id,
          voterToken: cleanToken,
        },
      },
    });

    if (existing) {
      if (existing.reactionType === reactionType) {
        // Toggle OFF (un-react)
        await prisma.articleReaction.delete({
          where: { id: existing.id },
        });
      } else {
        // Switch reaction to new type
        await prisma.articleReaction.update({
          where: { id: existing.id },
          data: { reactionType },
        });
      }
    } else {
      // First time reaction
      await prisma.articleReaction.create({
        data: {
          articleId: article.id,
          voterToken: cleanToken,
          reactionType,
        },
      });
    }

    safeRevalidatePath(`/artikel/${articleSlug}`);

    // Return the updated aggregated counts and new user selection
    return await getArticleReactionsAction(articleSlug, cleanToken);
  } catch (error) {
    console.error("Error toggling article reaction:", error);
    return {
      success: false,
      counts: defaultCounts,
      userSelected: null,
      total: 0,
      error:
        error instanceof Error ? error.message : "Gagal menyimpan reaksi artikel.",
    };
  }
}
