"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserSessionData } from "@/types";
import { updateAdminProfileAction } from "@/actions/admin.actions";
import {
  Save,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

interface AdminProfileFormProps {
  admin: UserSessionData & { bio?: string | null };
}

export default function AdminProfileForm({ admin }: AdminProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(admin.name);
  const [penName, setPenName] = useState(admin.penName || "");
  const [avatarUrl, setAvatarUrl] = useState(admin.avatarUrl || "");
  const [bio, setBio] = useState(admin.bio || "");

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    startTransition(async () => {
      const res = await updateAdminProfileAction({
        name,
        penName: penName || null,
        avatarUrl: avatarUrl || null,
        bio: bio || null,
      });

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: res.message || "Profil Admin berhasil diperbarui.",
        });
        router.refresh();
      } else {
        setStatusMessage({
          type: "error",
          text: res.message || "Gagal memperbarui profil admin.",
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Form: 7 cols */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-black text-black uppercase tracking-tight">
            Data Akun Administrator
          </h2>
          <p className="text-xs text-zinc-500 font-normal">
            Perbarui nama tampilan, nama pena redaksi, foto profil, dan biodata akun pengelola.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2 text-xs font-bold ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
              Nama Admin / Penanggung Jawab <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Admin Belokiri / Ihsanul Hakim"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-red-600 bg-zinc-50/50 text-black font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
              Nama Pena / Jabatan Redaksi (Opsional)
            </label>
            <input
              type="text"
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              placeholder="Contoh: Dewan Agen Belokan / Pemimpin Redaksi"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-red-600 bg-zinc-50/50 text-black font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
              URL Foto Profil / Avatar
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... atau URL gambar langsung"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-red-600 bg-zinc-50/50 text-black font-medium"
            />
            <p className="text-[10px] text-zinc-400 mt-1 font-medium">
              Masukkan tautan langsung gambar (JPG, PNG, atau WebP).
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700">
                Biodata Redaksi
              </label>
              <span className="text-[10px] text-zinc-400">
                {bio.length}/1000 karakter
              </span>
            </div>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 1000))}
              placeholder="Tuliskan catatan singkat peran Anda di redaksi BELOKIRI..."
              className="w-full p-3 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-red-600 bg-zinc-50/50 leading-relaxed text-black font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? "Menyimpan..." : "Simpan Perubahan Admin"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Admin Badge Preview (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
          Pratinjau Identitas Admin
        </span>

        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-5 text-center">
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-red-600 shadow-md bg-zinc-100">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-2xl text-zinc-500">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-black text-black uppercase tracking-tight">
              {penName || name}
            </h3>
            {penName && penName !== name && (
              <p className="text-[11px] text-zinc-400 font-medium">({name})</p>
            )}
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white bg-black px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-red-500" />
                <span>Agen Belokan (Admin)</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed font-normal italic">
            “{bio || "Administrator Utama Meja Agen Belokan BELOKIRI."}”
          </p>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-around text-xs">
            <div>
              <span className="block text-base font-black text-black">Akses Penuh</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">
                Hak Kelola
              </span>
            </div>
            <div className="w-[1px] h-6 bg-zinc-200" />
            <div>
              <span className="block text-base font-black text-red-600">Terautentikasi</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">
                Status
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
