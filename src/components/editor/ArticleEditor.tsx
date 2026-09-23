"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { ContributorArticleItem } from "@/lib/data/contributor";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import { saveDraftAction, submitToReviewAction } from "@/actions/contributor.actions";
import {
  Save,
  Send,
  Eye,
  Edit3,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Plus,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Minus,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";

interface ArticleEditorProps {
  initialData?: ContributorArticleItem | null;
}

export default function ArticleEditor({ initialData }: ArticleEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Mode: "edit" or "preview"
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.categorySlug || MOCK_RUBRIKS[0].slug
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [featuredImageCaption, setFeaturedImageCaption] = useState(
    initialData?.featuredImageCaption || ""
  );
  const [photoSource, setPhotoSource] = useState(
    initialData?.photoSource || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [source, setSource] = useState(initialData?.source || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || ["Opini Publik"]);
  const [tagInput, setTagInput] = useState("");

  // Feedback states
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const status = initialData?.status || "DRAFT";
  const isLocked = status === "REVIEW";

  // Calculation helpers
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  // Toolbar insertion helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("article-content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || "Teks"}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected ? selected.length : 4)
      );
    }, 10);
  };

  // Tag helpers
  const addTag = () => {
    const cleaned = tagInput.trim().replace(/^#/, "");
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, i) => i !== indexToRemove));
  };

  // Actions
  const handleSaveDraft = () => {
    setStatusMessage(null);
    startTransition(async () => {
      const res = await saveDraftAction(
        {
          title: title || "Draf Tanpa Judul",
          categoryId,
          content: content || "Draf naskah...",
          excerpt,
          featuredImage,
          featuredImageCaption,
          photoSource,
          source,
          tags,
        },
        initialData?.id
      );

      if (res.success) {
        setStatusMessage({ type: "success", text: res.message || "Draf tersimpan." });
        if (!initialData?.id && res.data?.id) {
          router.push(`/dashboard/artikel/${res.data.id}/edit`);
        }
      } else {
        setStatusMessage({ type: "error", text: res.message });
      }
    });
  };

  const handleSubmitReview = () => {
    if (title.trim().length < 5) {
      setStatusMessage({
        type: "error",
        text: "Judul artikel minimal 5 karakter sebelum dapat diajukan ke redaksi.",
      });
      return;
    }

    if (content.trim().length < 20) {
      setStatusMessage({
        type: "error",
        text: "Isi artikel minimal 20 karakter sebelum dapat diajukan ke redaksi.",
      });
      return;
    }

    setStatusMessage(null);
    startTransition(async () => {
      // First save latest edits
      const saveRes = await saveDraftAction(
        {
          title,
          categoryId,
          content,
          excerpt,
          featuredImage,
          featuredImageCaption,
          photoSource,
          source,
          tags,
        },
        initialData?.id
      );

      if (!saveRes.success) {
        setStatusMessage({ type: "error", text: saveRes.message });
        return;
      }

      const articleId = initialData?.id || saveRes.data?.id;
      if (!articleId) return;

      const submitRes = await submitToReviewAction(articleId);
      if (submitRes.success) {
        setStatusMessage({
          type: "success",
          text: "Naskah berhasil diajukan ke meja redaksi untuk kurasi!",
        });
        setTimeout(() => {
          router.push("/dashboard/artikel?status=REVIEW");
        }, 1200);
      } else {
        setStatusMessage({ type: "error", text: submitRes.message });
      }
    });
  };

  const currentRubrik =
    MOCK_RUBRIKS.find((r) => r.slug === categoryId) || MOCK_RUBRIKS[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Top Bar: Navigation & Action Buttons */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/artikel"
            className="p-2 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
            title="Kembali ke Daftar Naskah"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <ArticleStatusBadge status={status} size="sm" />
              <span className="text-xs text-zinc-400 font-medium">
                {wordCount} kata • ±{readingTime} menit baca
              </span>
            </div>
            <h1 className="text-sm font-black text-black uppercase tracking-tight truncate max-w-md mt-0.5">
              {title || "Naskah Baru"}
            </h1>
          </div>
        </div>

        {/* View Mode Switcher + Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="bg-zinc-100 p-1 rounded-xl flex items-center gap-1 border border-zinc-200">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "edit"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Tulis</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "preview"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau</span>
            </button>
          </div>

          {!isLocked && (
            <>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Draf</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === "REVISION" ? "Ajukan Perbaikan" : "Kirim ke Redaksi"}</span>
              </button>
            </>
          )}

          {isLocked && (
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-2 rounded-xl flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Terkunci saat proses kurasi redaksi</span>
            </span>
          )}
        </div>
      </div>

      {/* Status Feedback Notification */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-zinc-400 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. REVISION NOTE ALERT BANNER (If requested for revision) */}
      {status === "REVISION" && initialData?.adminNote && (
        <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 text-red-700 font-black text-sm uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>Catatan Kurasi Meja Redaksi NALAR</span>
          </div>
          <p className="text-xs sm:text-sm text-red-900 leading-relaxed font-medium bg-white/70 p-4 rounded-xl border border-red-200">
            “{initialData.adminNote}”
          </p>
          <p className="text-[11px] text-red-700 font-normal">
            Mohon perbaiki bagian tulisan yang disebutkan di atas. Setelah selesai, klik tombol{" "}
            <strong>“Ajukan Perbaikan”</strong> agar naskah masuk kembali ke antrean kurasi editor.
          </p>
        </div>
      )}

      {/* 3. MAIN EDITOR FORM or PREVIEW */}
      {viewMode === "edit" ? (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Rubrik Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">
              Pilih Rubrik NALAR <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {MOCK_RUBRIKS.map((rubrik) => {
                const isSelected = categoryId === rubrik.slug;
                return (
                  <button
                    key={rubrik.slug}
                    type="button"
                    disabled={isLocked}
                    onClick={() => setCategoryId(rubrik.slug)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 shadow-xs"
                        : "border-zinc-200 hover:border-zinc-300 bg-zinc-50/50"
                    } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <span
                      className={`text-xs font-black uppercase tracking-wider block ${
                        isSelected ? "text-red-600" : "text-zinc-800"
                      }`}
                    >
                      {rubrik.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 font-normal italic">
                      “{rubrik.question}”
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700">
                Judul Artikel / Naskah <span className="text-red-600">*</span>
              </label>
              <span
                className={`text-[11px] font-bold ${
                  title.length > 150
                    ? "text-red-600"
                    : title.length >= 5
                    ? "text-zinc-400"
                    : "text-amber-600"
                }`}
              >
                {title.length}/150 karakter
              </span>
            </div>
            <input
              type="text"
              disabled={isLocked}
              placeholder="Ketik judul artikel yang lugas, tajam, dan memikat..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3.5 text-lg sm:text-xl font-black text-black placeholder:text-zinc-300 rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/30 uppercase tracking-tight"
            />
            {title.length > 0 && title.length < 5 && (
              <p className="text-[11px] text-amber-600 mt-1 font-medium">
                Judul terlalu pendek (minimal 5 karakter).
              </p>
            )}
          </div>

          {/* Featured Image & Sources */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-800">
              <ImageIcon className="w-4 h-4 text-red-600" />
              <span>Gambar Cover & Hak Cipta</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  URL Gambar Cover
                </label>
                <input
                  type="url"
                  disabled={isLocked}
                  placeholder="https://images.unsplash.com/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  Sumber / Kredit Foto
                </label>
                <input
                  type="text"
                  disabled={isLocked}
                  placeholder="Contoh: Dokumentasi Penulis / Unsplash"
                  value={photoSource}
                  onChange={(e) => setPhotoSource(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                Keterangan / Caption Gambar
              </label>
              <input
                type="text"
                disabled={isLocked}
                placeholder="Jelaskan objek atau peristiwa dalam gambar cover..."
                value={featuredImageCaption}
                onChange={(e) => setFeaturedImageCaption(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
              />
            </div>

            {/* Image Preview Box */}
            {featuredImage && (
              <div className="relative aspect-video max-w-md mx-auto rounded-xl overflow-hidden border border-zinc-300 mt-2">
                <Image
                  src={featuredImage}
                  alt={featuredImageCaption || "Cover Pratinjau"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Rich Content Toolbar & Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-700">
                Isi Tulisan Naskah <span className="text-red-600">*</span>
              </label>
              <span className="text-[11px] text-zinc-400 font-medium">
                {wordCount} kata
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-zinc-100 rounded-t-xl border border-b-0 border-zinc-200 flex-wrap">
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("## ", "\n")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Heading 2 (Subjudul)"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("### ", "\n")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Heading 3 (Subjudul Kecil)"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-zinc-300 mx-1" />
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("**", "**")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Tebal (Bold)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("*", "*")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Miring (Italic)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-zinc-300 mx-1" />
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting('> "', '"')}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Kutipan (Blockquote)"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("- ", "\n")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Daftar Butir (Bullet List)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("1. ", "\n")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Daftar Nomor"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => insertFormatting("\n---\n")}
                className="p-1.5 rounded hover:bg-white text-zinc-700 hover:text-black transition-colors cursor-pointer"
                title="Garis Pembatas (Divider)"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              id="article-content-textarea"
              disabled={isLocked}
              rows={16}
              placeholder="Tuliskan naskah Anda di sini. Gunakan heading, kutipan, dan paragraf berkedalaman..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-sm leading-relaxed text-zinc-900 rounded-b-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white font-mono"
            />
          </div>

          {/* Excerpt & Source Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-zinc-700">
                  Ringkasan / Excerpt Singkat
                </label>
                <span className="text-[10px] text-zinc-400">
                  {excerpt.length}/300
                </span>
              </div>
              <textarea
                disabled={isLocked}
                rows={3}
                placeholder="Ringkasan 1-2 kalimat untuk pengantar pembaca dan pratinjau media sosial..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value.slice(0, 300))}
                className="w-full p-3 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Sumber Liputan / Riset
              </label>
              <textarea
                disabled={isLocked}
                rows={3}
                placeholder="Sebutkan rujukan, wawancara lapangan, atau data sekunder yang digunakan..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50/50"
              />
            </div>
          </div>

          {/* Tags Chips Manager */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">
              Topik & Tag Kata Kunci
            </label>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800 border border-zinc-200"
                >
                  <span>#{tag}</span>
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="text-zinc-400 hover:text-red-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {!isLocked && (
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Tambah tag (misal: Demokrasi)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-white"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 4. LIVE READER PREVIEW MODE */
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs p-6 sm:p-12 space-y-8 animate-in fade-in">
          {/* Header Preview */}
          <div className="space-y-4 border-b border-zinc-200 pb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider">
              <span>{currentRubrik.name}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-tight">
              {title || "Judul Belum Diisi"}
            </h1>

            {excerpt && (
              <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed italic">
                “{excerpt}”
              </p>
            )}

            <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500 font-medium">
              <span>Penulis: <strong>Anda</strong></span>
              <span>•</span>
              <span>{wordCount} kata</span>
              <span>•</span>
              <span>±{readingTime} menit membaca</span>
            </div>
          </div>

          {/* Cover Image Preview */}
          {featuredImage ? (
            <div className="space-y-2">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200">
                <Image
                  src={featuredImage}
                  alt={featuredImageCaption || title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {(featuredImageCaption || photoSource) && (
                <p className="text-xs text-zinc-500 italic text-center font-normal">
                  {featuredImageCaption}{" "}
                  {photoSource && <span className="font-bold text-zinc-700">({photoSource})</span>}
                </p>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-zinc-50 border border-dashed border-zinc-300 text-center text-xs text-zinc-400">
              Belum ada gambar cover utama. Anda dapat menambahkannya di tab Tulis.
            </div>
          )}

          {/* Parsed Content Preview */}
          <div className="prose max-w-none text-zinc-800 space-y-4 font-sans leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
            {content || "Belum ada isi naskah yang ditulis."}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="pt-6 border-t border-zinc-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">
                Topik Terkait:
              </span>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
