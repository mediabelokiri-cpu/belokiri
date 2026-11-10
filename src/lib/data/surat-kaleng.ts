import { prisma } from "@/lib/db/prisma";
import type { PublicSuratKalengItem } from "@/lib/data/site-settings";

/**
 * Fetch public-safe Surat Kaleng messages ordered newest first.
 * Excludes admin-only triage flags such as `isRead`.
 */
export async function getPublicSuratKaleng(
  limit: number = 30
): Promise<PublicSuratKalengItem[]> {
  const safeLimit = Math.min(Math.max(1, Math.trunc(limit || 30)), 50);

  try {
    const letters = await prisma.suratKaleng.findMany({
      select: {
        id: true,
        namaSamaran: true,
        isiSurat: true,
        createdAt: true,
        isStarred: true,
      },
      orderBy: { createdAt: "desc" },
      take: safeLimit,
    });

    return letters.map((item) => ({
      id: item.id,
      namaSamaran: item.namaSamaran,
      isiSurat: item.isiSurat,
      createdAt: item.createdAt.toISOString(),
      isStarred: item.isStarred,
    }));
  } catch (error) {
    console.error("Error fetching public Surat Kaleng:", error);
    return [];
  }
}
