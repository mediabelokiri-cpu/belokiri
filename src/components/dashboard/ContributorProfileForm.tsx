"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserSessionData } from "@/types";
import { updateProfileAction } from "@/actions/contributor.actions";
import {
  User,
  Save,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Camera,
  PenTool,
} from "lucide-react";

interface ContributorProfileFormProps {
  initialUser: UserSessionData & { bio?: string | null };
}

export default function ContributorProfileForm({
  initialUser,
}: ContributorProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialUser.name);
  const [penName, setPenName] = useState(initialUser.penName || "");
  const [bio, setBio] = useState(
    initialUser.bio ||
      "Penulis lepas dan pemerhati isu sosial, kebudayaan Nusantara, serta tata kelola perkotaan."
  );
  const [avatarUrl, setAvatarUrl] = useState(initialUser.avatarUrl || "");

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    startTransition(async () => {
      const res = await updateProfileAction({
        name,
        penName: penName || null,
        bio: bio || null,
        avatarUrl: avatarUrl || null,
      });

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: res.message || "Profil berhasil diperbarui.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.message,
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Profile Form (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-black text-black uppercase tracking-tight">
            Data Penulis
          </h2>
          <p className="text-xs text-zinc-500 font-normal">
            Perbarui nama pena, foto, dan bio yang akan dibaca publik.
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
              Nama Lengkap Asli <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama sesuai identitas..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
              Nama Pena / Pen Name (Opsional)
            </label>
            <input
              type="text"
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              placeholder="Nama pena yang akan ditampilkan di artikel (kosongkan jika sama)..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50"
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
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700">
                Biodata Singkat
              </label>
              <span className="text-[10px] text-zinc-400">
                {bio.length}/1000 karakter
              </span>
            </div>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 1000))}
              placeholder="Tuliskan latar belakang, minat isu, atau kredensial kepenulisan Anda..."
              className="w-full p-3 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50 leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Author Card Preview (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
            Pratinjau Kartu Penulis Publik
          </span>
          <Link
            href={`/penulis/${initialUser.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
          >
            <span>Buka Profil Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card Mockup */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-5 text-center">
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-red-600 shadow-md">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={penName || name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-black text-2xl text-zinc-500">
                {(penName || name).charAt(0).toUpperCase()}
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
            <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
              Kontributor NALAR
            </span>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed font-normal italic">
            “{bio || "Belum ada biodata yang ditambahkan."}”
          </p>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-around text-xs">
            <div>
              <span className="block text-base font-black text-black">NALAR</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">
                Portal
              </span>
            </div>
            <div className="w-[1px] h-6 bg-zinc-200" />
            <div>
              <span className="block text-base font-black text-red-600">Terverifikasi</span>
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
