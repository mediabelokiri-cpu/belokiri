"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { RekrutmenStatus } from "@prisma/client";

function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Graceful fallback if called outside Next.js request context
  }
}

export interface RekrutmenSubmissionInput {
  namaLengkap: string;
  namaPena?: string;
  whatsapp: string;
  email: string;
  domisili: string;
  institusi?: string;
  namaPresiden: string;
  kepercayaanBumi: string;
  ayamAtauTelur: string;
  alasanBergabung: string;
  fokusBidang: string[];
}

export interface RekrutmenItem {
  id: string;
  namaLengkap: string;
  namaPena: string | null;
  whatsapp: string;
  email: string;
  domisili: string;
  institusi: string | null;
  namaPresiden: string;
  kepercayaanBumi: string;
  ayamAtauTelur: string;
  alasanBergabung: string;
  fokusBidang: string[];
  status: RekrutmenStatus;
  catatanAdmin: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Public action: submit a new recruitment application for Agen Belokan.
 */
export async function submitRekrutmenAction(
  data: RekrutmenSubmissionInput
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    if (!data.namaLengkap?.trim()) {
      return { success: false, error: "Nama lengkap wajib diisi." };
    }
    if (!data.whatsapp?.trim()) {
      return { success: false, error: "Nomor WhatsApp wajib diisi." };
    }
    if (!data.email?.trim()) {
      return { success: false, error: "Alamat email wajib diisi." };
    }
    if (!data.domisili?.trim()) {
      return { success: false, error: "Domisili wajib diisi." };
    }
    if (!data.alasanBergabung?.trim()) {
      return { success: false, error: "Alasan bergabung wajib diisi." };
    }
    if (!data.fokusBidang || data.fokusBidang.length === 0) {
      return { success: false, error: "Pilih minimal satu Fokus Bidang Agen!" };
    }

    await prisma.rekrutmenAgen.create({
      data: {
        namaLengkap: data.namaLengkap.trim(),
        namaPena: data.namaPena?.trim() || null,
        whatsapp: data.whatsapp.trim(),
        email: data.email.trim().toLowerCase(),
        domisili: data.domisili.trim(),
        institusi: data.institusi?.trim() || null,
        namaPresiden: data.namaPresiden?.trim() || "Tidak Dijawab",
        kepercayaanBumi: data.kepercayaanBumi?.trim() || "Bumi Bulat",
        ayamAtauTelur: data.ayamAtauTelur?.trim() || "Ayam",
        alasanBergabung: data.alasanBergabung.trim(),
        fokusBidang: data.fokusBidang,
        status: RekrutmenStatus.PENDING,
      },
    });

    safeRevalidatePath("/admin/rekrutmen");

    return {
      success: true,
      message: "Formulir pendaftaran calon agen berhasil terkirim ke Dewan Belokan.",
    };
  } catch (error) {
    console.error("Error submitting Rekrutmen Agen:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal menyimpan formulir pendaftaran.",
    };
  }
}

/**
 * Admin action: get list of all recruitment applications.
 */
export async function getRekrutmenListAction(
  statusFilter?: "ALL" | "PENDING" | "DITERIMA" | "DITOLAK"
): Promise<{
  success: boolean;
  data: RekrutmenItem[];
  error?: string;
}> {
  try {
    await requireAdmin();

    const where: { status?: RekrutmenStatus } = {};
    if (statusFilter && statusFilter !== "ALL") {
      where.status = statusFilter as RekrutmenStatus;
    }

    const rows = await prisma.rekrutmenAgen.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const formatted: RekrutmenItem[] = rows.map((r) => ({
      id: r.id,
      namaLengkap: r.namaLengkap,
      namaPena: r.namaPena,
      whatsapp: r.whatsapp,
      email: r.email,
      domisili: r.domisili,
      institusi: r.institusi,
      namaPresiden: r.namaPresiden,
      kepercayaanBumi: r.kepercayaanBumi,
      ayamAtauTelur: r.ayamAtauTelur,
      alasanBergabung: r.alasanBergabung,
      fokusBidang: r.fokusBidang,
      status: r.status,
      catatanAdmin: r.catatanAdmin,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));

    return {
      success: true,
      data: formatted,
    };
  } catch (error) {
    console.error("Error fetching Rekrutmen list:", error);
    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Gagal mengambil daftar pendaftaran agen.",
    };
  }
}

/**
 * Admin action: update recruitment application status and admin notes.
 */
export async function updateRekrutmenStatusAction(
  id: string,
  status: "PENDING" | "DITERIMA" | "DITOLAK",
  catatanAdmin?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await prisma.rekrutmenAgen.update({
      where: { id },
      data: {
        status: status as RekrutmenStatus,
        catatanAdmin: catatanAdmin !== undefined ? catatanAdmin : undefined,
      },
    });

    safeRevalidatePath("/admin/rekrutmen");

    return { success: true };
  } catch (error) {
    console.error("Error updating Rekrutmen status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status pendaftar.",
    };
  }
}

/**
 * Admin action: permanently delete an application.
 */
export async function deleteRekrutmenAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();

    await prisma.rekrutmenAgen.delete({
      where: { id },
    });

    safeRevalidatePath("/admin/rekrutmen");

    return { success: true };
  } catch (error) {
    console.error("Error deleting Rekrutmen application:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Gagal menghapus berkas pendaftar.",
    };
  }
}
