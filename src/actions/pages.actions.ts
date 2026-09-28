"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import {
  CustomPageContent,
  DEFAULT_CUSTOM_PAGES,
  getDefaultCustomPage,
} from "@/lib/data/custom-pages";
import { Prisma } from "@prisma/client";

function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Graceful fallback if called outside Next.js request context
  }
}

/**
 * Fetch a single custom page by its slug.
 * Returns the customized version from Supabase if present,
 * or falls back to the system default.
 */
export async function getCustomPageAction(slug: string): Promise<{
  success: boolean;
  page: CustomPageContent;
  isCustom: boolean;
}> {
  try {
    const row = await prisma.siteSetting.findUnique({
      where: { key: `page_${slug}` },
    });

    const defaultPage = getDefaultCustomPage(slug);

    if (row && row.value) {
      const dbData = row.value as unknown as Partial<CustomPageContent>;
      return {
        success: true,
        page: {
          ...defaultPage,
          ...dbData,
          slug,
          updatedAt: row.updatedAt?.toISOString() || new Date().toISOString(),
        },
        isCustom: true,
      };
    }

    return {
      success: true,
      page: defaultPage,
      isCustom: false,
    };
  } catch (error) {
    console.error(`Error fetching custom page [${slug}]:`, error);
    return {
      success: false,
      page: getDefaultCustomPage(slug),
      isCustom: false,
    };
  }
}

/**
 * Fetch all 11 custom pages for the Admin CMS manager.
 */
export async function getAllCustomPagesAction(): Promise<{
  success: boolean;
  pages: CustomPageContent[];
  customSlugs: string[];
}> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: {
        key: {
          startsWith: "page_",
        },
      },
    });

    const dbMap = new Map<string, { value: Partial<CustomPageContent>; updatedAt: string }>();
    rows.forEach((r) => {
      const slug = r.key.replace(/^page_/, "");
      dbMap.set(slug, {
        value: r.value as unknown as Partial<CustomPageContent>,
        updatedAt: r.updatedAt.toISOString(),
      });
    });

    const customSlugs: string[] = [];
    const pages: CustomPageContent[] = Object.keys(DEFAULT_CUSTOM_PAGES).map((slug) => {
      const def = DEFAULT_CUSTOM_PAGES[slug];
      const custom = dbMap.get(slug);
      if (custom) {
        customSlugs.push(slug);
        return {
          ...def,
          ...custom.value,
          slug,
          updatedAt: custom.updatedAt,
        };
      }
      return def;
    });

    return {
      success: true,
      pages,
      customSlugs,
    };
  } catch (error) {
    console.error("Error fetching all custom pages:", error);
    return {
      success: false,
      pages: Object.values(DEFAULT_CUSTOM_PAGES),
      customSlugs: [],
    };
  }
}

/**
 * Save / Update a custom page in Supabase PostgreSQL.
 * Requires Admin privileges.
 */
export async function saveCustomPageAction(
  slug: string,
  data: Partial<CustomPageContent>
): Promise<{ success: boolean; error?: string; page?: CustomPageContent }> {
  try {
    const admin = await requireAdmin();

    const def = getDefaultCustomPage(slug);
    const mergedPayload: CustomPageContent = {
      ...def,
      ...data,
      slug,
      updatedAt: new Date().toISOString(),
    };

    await prisma.siteSetting.upsert({
      where: { key: `page_${slug}` },
      update: {
        value: mergedPayload as unknown as Prisma.InputJsonValue,
      },
      create: {
        key: `page_${slug}`,
        value: mergedPayload as unknown as Prisma.InputJsonValue,
      },
    });

    // If saving 'kontak', sync address/email to main site_settings as well for consistency
    if (slug === "kontak" && data.extraData) {
      try {
        const currentSettings = await prisma.siteSetting.findUnique({
          where: { key: "site_settings" },
        });
        if (currentSettings && currentSettings.value) {
          const val = currentSettings.value as any;
          if (data.extraData.address) val.social = { ...val.social, address: data.extraData.address };
          if (data.extraData.email) val.social = { ...val.social, email: data.extraData.email };
          if (data.extraData.whatsapp) val.social = { ...val.social, whatsapp: data.extraData.whatsapp };
          await prisma.siteSetting.update({
            where: { key: "site_settings" },
            data: { value: val },
          });
        }
      } catch (err) {
        console.warn("Could not sync kontak extraData with site_settings:", err);
      }
    }

    // Trigger on-demand revalidation for the public page
    const publicPath = def.path || `/${slug}`;
    safeRevalidatePath(publicPath);
    safeRevalidatePath("/sitemap.xml");

    return {
      success: true,
      page: mergedPayload,
    };
  } catch (error: any) {
    console.error(`Error saving custom page [${slug}]:`, error);
    return {
      success: false,
      error: error?.message || "Gagal menyimpan perubahan ke database.",
    };
  }
}

/**
 * Reset a custom page back to default by deleting its custom record in Supabase.
 * Requires Admin privileges.
 */
export async function resetCustomPageAction(
  slug: string
): Promise<{ success: boolean; error?: string; page?: CustomPageContent }> {
  try {
    await requireAdmin();

    try {
      await prisma.siteSetting.delete({
        where: { key: `page_${slug}` },
      });
    } catch {
      // Ignored if record didn't exist in DB
    }

    const defaultPage = getDefaultCustomPage(slug);
    safeRevalidatePath(defaultPage.path || `/${slug}`);

    return {
      success: true,
      page: defaultPage,
    };
  } catch (error: any) {
    console.error(`Error resetting custom page [${slug}]:`, error);
    return {
      success: false,
      error: error?.message || "Gagal mengembalikan halaman ke setelan bawaan.",
    };
  }
}
