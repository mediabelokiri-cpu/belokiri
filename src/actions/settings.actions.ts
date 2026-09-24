"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import {
  FullSiteSettings,
  KabinetMember,
  defaultSiteSettings,
  defaultKabinetMembers,
} from "@/lib/data/site-settings";
import { Prisma } from "@prisma/client";

function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Graceful fallback if called outside Next.js request context
  }
}

/**
 * Get site settings and kabinet members from Supabase,
 * falling back to defaults if not yet customized in database.
 */
export async function getSiteSettingsAction(): Promise<{
  success: boolean;
  settings: FullSiteSettings;
  kabinet: KabinetMember[];
}> {
  try {
    const [settingsRow, kabinetRow] = await Promise.all([
      prisma.siteSetting.findUnique({
        where: { key: "site_settings" },
      }),
      prisma.siteSetting.findUnique({
        where: { key: "kabinet" },
      }),
    ]);

    const settings: FullSiteSettings = settingsRow
      ? (settingsRow.value as unknown as FullSiteSettings)
      : defaultSiteSettings;

    const kabinet: KabinetMember[] = kabinetRow
      ? (kabinetRow.value as unknown as KabinetMember[])
      : defaultKabinetMembers;

    return {
      success: true,
      settings,
      kabinet,
    };
  } catch (error) {
    console.error("Error fetching site settings from DB:", error);
    return {
      success: false,
      settings: defaultSiteSettings,
      kabinet: defaultKabinetMembers,
    };
  }
}

/**
 * Save site settings and/or kabinet members to Supabase PostgreSQL.
 * Requires admin authentication.
 */
export async function saveSiteSettingsAction(
  settings: FullSiteSettings,
  kabinet?: KabinetMember[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    const operations: Prisma.PrismaPromise<unknown>[] = [
      prisma.siteSetting.upsert({
        where: { key: "site_settings" },
        update: {
          value: settings as unknown as Prisma.InputJsonValue,
        },
        create: {
          key: "site_settings",
          value: settings as unknown as Prisma.InputJsonValue,
        },
      }),
    ];

    if (kabinet) {
      operations.push(
        prisma.siteSetting.upsert({
          where: { key: "kabinet" },
          update: {
            value: kabinet as unknown as Prisma.InputJsonValue,
          },
          create: {
            key: "kabinet",
            value: kabinet as unknown as Prisma.InputJsonValue,
          },
        })
      );
    }

    await prisma.$transaction(operations);

    // Revalidate public and admin pages
    safeRevalidatePath("/");
    safeRevalidatePath("/kabinet-belokiri");
    safeRevalidatePath("/kontak");
    safeRevalidatePath("/manifesto");
    safeRevalidatePath("/rekrutmen");
    safeRevalidatePath("/admin/settings");

    return { success: true };
  } catch (error) {
    console.error("Error saving site settings:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal menyimpan pengaturan ke database.",
    };
  }
}
