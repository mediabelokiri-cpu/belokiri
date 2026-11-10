"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import type {
  PublicSuratKalengItem,
  SuratKalengItem,
} from "@/lib/data/site-settings";

function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Graceful fallback if called outside Next.js request context
  }
}

function stripControlChars(input: string, preserveNewlines: boolean): string {
  if (preserveNewlines) {
    return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }
  return input.replace(/[\x00-\x1F\x7F]/g, " ");
}

/**
 * Public action to submit a new Surat Kaleng to Supabase PostgreSQL.
 */
export async function submitSuratKalengAction(formData: {
  namaSamaran?: string;
  isiSurat: string;
}): Promise<{
  success: boolean;
  error?: string;
  message?: string;
  item?: PublicSuratKalengItem;
}> {
  try {
    try {
      const hdrs = await headers();
      const ip = getClientIp(hdrs);
      const limitResult = checkRateLimit(`surat-kaleng:${ip}`, 6, 60 * 1000);
      if (!limitResult.success) {
        return {
          success: false,
          error: `Terlalu banyak kiriman dalam waktu singkat. Coba lagi dalam ${limitResult.resetSeconds} detik.`,
        };
      }
    } catch {
      // Allow invocation outside Next.js HTTP header context (e.g. direct scripts)
    }

    const rawIsi = typeof formData.isiSurat === "string" ? formData.isiSurat : "";
    const isi = stripControlChars(rawIsi, true).trim();

    if (!isi) {
      return {
        success: false,
        error: "Isi surat kaleng tidak boleh kosong.",
      };
    }

    if (isi.length < 3) {
      return {
        success: false,
        error: "Tulis isi surat kaleng minimal 3 karakter.",
      };
    }

    if (isi.length > 3000) {
      return {
        success: false,
        error: "Isi surat terlalu panjang (maksimal 3000 karakter).",
      };
    }

    const rawNama =
      typeof formData.namaSamaran === "string" ? formData.namaSamaran : "";
    const cleanedNama = stripControlChars(rawNama, false)
      .replace(/\s+/g, " ")
      .trim();

    if (cleanedNama.length > 60) {
      return {
        success: false,
        error: "Nama samaran maksimal 60 karakter.",
      };
    }

    const nama = cleanedNama || "Warga Anonim";

    const created = await prisma.suratKaleng.create({
      data: {
        namaSamaran: nama,
        isiSurat: isi,
      },
      select: {
        id: true,
        namaSamaran: true,
        isiSurat: true,
        createdAt: true,
        isStarred: true,
      },
    });

    safeRevalidatePath("/");
    safeRevalidatePath("/admin/surat-kaleng");

    return {
      success: true,
      message: "Surat kaleng berhasil mendarat di dinding Warga & meja redaksi BAKUBACA.",
      item: {
        id: created.id,
        namaSamaran: created.namaSamaran,
        isiSurat: created.isiSurat,
        createdAt: created.createdAt.toISOString(),
        isStarred: created.isStarred,
      },
    };
  } catch (error) {
    console.error("Error submitting Surat Kaleng:", error);
    return {
      success: false,
      error: "Gagal mengirim surat kaleng ke server. Silakan coba lagi.",
    };
  }
}

/**
 * Admin action to fetch all Surat Kaleng from Supabase PostgreSQL.
 */
export async function getSuratKalengListAction(): Promise<{
  success: boolean;
  data: SuratKalengItem[];
  error?: string;
}> {
  try {
    await requireAdmin();

    const letters = await prisma.suratKaleng.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted: SuratKalengItem[] = letters.map((l) => ({
      id: l.id,
      namaSamaran: l.namaSamaran,
      isiSurat: l.isiSurat,
      createdAt: l.createdAt.toISOString(),
      isRead: l.isRead,
      isStarred: l.isStarred,
    }));

    return {
      success: true,
      data: formatted,
    };
  } catch (error) {
    console.error("Error fetching Surat Kaleng:", error);
    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Gagal mengambil daftar surat kaleng.",
    };
  }
}

/**
 * Admin action to toggle read/unread status of a Surat Kaleng.
 */
export async function toggleSuratKalengReadAction(
  id: string
): Promise<{ success: boolean; isRead?: boolean; error?: string }> {
  try {
    await requireAdmin();

    const current = await prisma.suratKaleng.findUnique({
      where: { id },
      select: { isRead: true },
    });

    if (!current) {
      return { success: false, error: "Surat tidak ditemukan." };
    }

    const updated = await prisma.suratKaleng.update({
      where: { id },
      data: { isRead: !current.isRead },
      select: { isRead: true },
    });

    safeRevalidatePath("/admin/surat-kaleng");

    return { success: true, isRead: updated.isRead };
  } catch (error) {
    console.error("Error toggling Surat Kaleng read status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status baca.",
    };
  }
}

/**
 * Admin action to toggle star/unstar status of a Surat Kaleng.
 */
export async function toggleSuratKalengStarAction(
  id: string
): Promise<{ success: boolean; isStarred?: boolean; error?: string }> {
  try {
    await requireAdmin();

    const current = await prisma.suratKaleng.findUnique({
      where: { id },
      select: { isStarred: true },
    });

    if (!current) {
      return { success: false, error: "Surat tidak ditemukan." };
    }

    const updated = await prisma.suratKaleng.update({
      where: { id },
      data: { isStarred: !current.isStarred },
      select: { isStarred: true },
    });

    safeRevalidatePath("/");
    safeRevalidatePath("/admin/surat-kaleng");

    return { success: true, isStarred: updated.isStarred };
  } catch (error) {
    console.error("Error toggling Surat Kaleng star status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status bintang.",
    };
  }
}

/**
 * Admin action to delete a Surat Kaleng from Supabase PostgreSQL.
 */
export async function deleteSuratKalengAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await prisma.suratKaleng.delete({
      where: { id },
    });

    safeRevalidatePath("/");
    safeRevalidatePath("/admin/surat-kaleng");

    return { success: true };
  } catch (error) {
    console.error("Error deleting Surat Kaleng:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal menghapus surat kaleng.",
    };
  }
}
