"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminArticleItem } from "@/lib/data/admin";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  publishArticleAction,
  requestRevisionAction,
  unpublishArticleAction,
} from "@/actions/admin.actions";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Send,
  Star,
  Globe,
  Tag,
  Calendar,
  User,
  Clock,
  ExternalLink,
  X,
  FileCheck2,
  Sparkles,
} from "lucide-react";

interface EditorialWorkbenchProps {
  article: AdminArticleItem;
}

export default function EditorialWorkbench({ article }: EditorialWorkbenchProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Editable fields by editor
  const [title, setTitle] = useState(article.title);
  const [categoryId, setCategoryId] = useState(article.categorySlug);
  const [seoTitle, setSeoTitle] = useState(article.seoTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    article.metaDescription || article.excerpt || ""
  );
  const [isEditorPick, setIsEditorPick] = useState(article.isEditorPick || false);

  // Revision modal states
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [adminNote, setAdminNote] = useState(article.adminNote || "");

  // Notification states
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const wordCount = article.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));
  const currentRubrik =
    MOCK_RUBRIKS.find((r) => r.slug === categoryId) || MOCK_RUBRIKS[0];

  // Actions
  const handlePublish = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await publishArticleAction(article.id, {
        title,
        categoryId,
        seoTitle,
        metaDescription,
        isEditorPick,
      });

      if (res.success) {
        setFeedback({ type: "success", text: res.message || "Artikel berhasil diterbitkan!" });
        setTimeout(() => {
          router.push("/admin/articles?status=PUBLISHED");
        }, 1200);
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal menerbitkan artikel" });
      }
    });
  };

  const handleRequestRevision = () => {
    if (adminNote.trim().length < 10) {
      setFeedback({
        type: "error",
        text: "Catatan kurasi revisi wajib diisi dengan jelas (minimal 10 karakter).",
      });
      return;
    }

    setFeedback(null);
    startTransition(async () => {
      const res = await requestRevisionAction(article.id, adminNote);

      if (res.success) {
        setRevisionModalOpen(false);
        setFeedback({ type: "success", text: res.message || "Catatan revisi berhasil dikirim" });
        setTimeout(() => {
          router.push("/admin/review");
        }, 1200);
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal mengirim catatan revisi" });
      }
    });
  };

  const handleUnpublish = () => {
    if (confirm("Apakah Anda yakin ingin menarik artikel ini dari tayang publik?")) {
      startTransition(async () => {
        const res = await unpublishArticleAction(article.id);
        if (res.success) {
          setFeedback({ type: "success", text: res.message || "Artikel berhasil ditarik dari tayang" });
          setTimeout(() => {
            router.push("/admin/articles");
          }, 1000);
        } else {
          setFeedback({ type: "error", text: res.message || "Gagal menarik artikel" });
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/review"
            className="p-2 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
            title="Kembali ke Antrean"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <ArticleStatusBadge status={article.status} size="sm" />
              <span className="text-xs text-zinc-400 font-medium">
                Diajukan oleh: <strong className="text-black">{article.authorName}</strong>
              </span>
            </div>
            <h1 className="text-sm font-black text-black uppercase tracking-tight truncate max-w-md mt-0.5">
              Meja Uji: {title}
            </h1>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5">
          {article.status !== "PUBLISHED" ? (
            <>
              <button
                type="button"
                onClick={() => setRevisionModalOpen(true)}
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                Minta Revisi
              </button>

              <button
                type="button"
                onClick={handlePublish}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Terbitkan Naskah</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleUnpublish}
              disabled={isPending}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              Tarik dari Tayang (Unpublish)
            </button>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Left Reader (7 cols) + Right Editorial Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reader & Article Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-3 pb-6 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-red-600 text-white">
                {currentRubrik.name}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {wordCount} kata • ±{readingTime} menit baca
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-tight">
              {title}
            </h2>

            {article.excerpt && (
              <p className="text-sm text-zinc-600 italic font-medium leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                “{article.excerpt}”
              </p>
            )}

            <div className="flex items-center gap-3 pt-1 text-xs text-zinc-500">
              <span>Penulis: <strong className="text-black">{article.authorName}</strong></span>
              <span>•</span>
              <span>Email: {article.authorEmail}</span>
            </div>
          </div>

          {/* Cover Preview */}
          {article.featuredImage ? (
            <div className="space-y-2">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200">
                <Image
                  src={article.featuredImage}
                  alt={article.featuredImageCaption || title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="text-[11px] text-zinc-500 italic text-center font-normal">
                {article.featuredImageCaption}{" "}
                {article.photoSource && <strong>({article.photoSource})</strong>}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-zinc-50 border border-dashed border-zinc-300 text-center text-xs text-zinc-400">
              Tidak ada gambar cover utama yang disertakan penulis.
            </div>
          )}

          {/* Body Content */}
          <div className="prose max-w-none text-zinc-900 leading-relaxed text-sm sm:text-base font-sans whitespace-pre-wrap pt-2">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="pt-6 border-t border-zinc-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                Tag Penulis:
              </span>
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Author Card Info */}
          <div className="pt-6 border-t border-zinc-200 flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-300 bg-white shrink-0">
              {article.authorAvatarUrl ? (
                <Image
                  src={article.authorAvatarUrl}
                  alt={article.authorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-zinc-500">
                  {article.authorName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-black text-black uppercase">
                {article.authorName}
              </p>
              <p className="text-[11px] text-zinc-500 line-clamp-2 mt-0.5">
                {article.authorBio || "Warga Belokan resmi BELOKIRI."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Decision Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-40">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <FileCheck2 className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-black text-black uppercase tracking-tight">
                Panel Kontrol & Optimasi Agen Belokan
              </h3>
            </div>

            {/* Rubrik Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Rubrik Penempatan
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50 font-bold"
              >
                {MOCK_RUBRIKS.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name} — {r.question}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Polish */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Penyelarasan Judul (Editorial Polish)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50 font-black"
              />
            </div>

            {/* SEO Settings */}
            <div className="pt-2 space-y-3 border-t border-zinc-100">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-700">
                <Globe className="w-4 h-4 text-zinc-400" />
                <span>Optimasi SEO & Metadata</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  SEO Meta Title (Maks 70 Karakter)
                </label>
                <input
                  type="text"
                  placeholder={title}
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  Meta Description (Maks 160 Karakter)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan informatif untuk cuplikan Google Search..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            {/* Editor's Pick Toggle */}
            <div className="pt-2 border-t border-zinc-100">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Star
                    className={`w-5 h-5 ${
                      isEditorPick
                        ? "text-red-600 fill-current"
                        : "text-zinc-400"
                    }`}
                  />
                  <div>
                    <span className="block text-xs font-black uppercase tracking-tight text-black">
                      Tandai Pilihan Agen Belokan
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      Tampil di blok khusus Beranda BELOKIRI
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isEditorPick}
                  onChange={(e) => setIsEditorPick(e.target.checked)}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Setujui & Terbitkan Artikel</span>
              </button>

              <button
                type="button"
                onClick={() => setRevisionModalOpen(true)}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Minta Revisi ke Penulis</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Revision Modal */}
      {revisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-red-600 font-black text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5" />
                <span>Catatan Kurasi Meja Agen Belokan</span>
              </div>
              <button
                type="button"
                onClick={() => setRevisionModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-zinc-600">
                Tuliskan instruksi perbaikan yang jelas dan konstruktif untuk Warga Belokan (minimal 10 karakter):
              </p>
              <textarea
                rows={5}
                required
                placeholder="Contoh: Naskah sangat menarik. Mohon tambahkan data perbandingan tahun 2024 vs 2025 di bagian awal, serta pastikan lisensi foto cover tercantum..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full p-3 text-xs leading-relaxed rounded-xl border border-zinc-300 focus:outline-none focus:border-red-600 bg-zinc-50"
              />
              <span className="text-[10px] text-zinc-400 block text-right">
                {adminNote.length} karakter
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRevisionModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleRequestRevision}
                disabled={isPending || adminNote.trim().length < 10}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isPending ? "Mengirim..." : "Kirim Catatan Revisi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
