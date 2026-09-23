"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { AdminArticleItem } from "@/lib/data/admin";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import { saveArticleByAdminAction } from "@/actions/admin.actions";
import ImageUploadDropzone from "@/components/common/ImageUploadDropzone";
import {
  Save,
  Send,
  Eye,
  Edit3,
  Globe,
  Sparkles,
  Star,
  ArrowLeft,
  Clock,
  HelpCircle,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
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
  ExternalLink,
} from "lucide-react";

interface AdminArticleEditorProps {
  initialData?: AdminArticleItem | null;
}

export default function AdminArticleEditor({
  initialData,
}: AdminArticleEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Mode: edit or preview
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
  const [tags, setTags] = useState<string[]>(
    initialData?.tags || ["Liputan Agen Belokan"]
  );
  const [tagInput, setTagInput] = useState("");
  const [isEditorPick, setIsEditorPick] = useState(
    initialData?.isEditorPick || false
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || ""
  );

  // Feedback states
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
    publishedSlug?: string;
  } | null>(null);

  const currentRubrik =
    MOCK_RUBRIKS.find((r) => r.slug === categoryId) || MOCK_RUBRIKS[0];
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  // Toolbar formatting helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(
      "admin-article-content"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || "Teks"}${suffix}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
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

  // Save handler with designated status
  const handleSave = (targetStatus: "DRAFT" | "REVIEW" | "PUBLISHED") => {
    if (!title.trim() || title.trim().length < 5) {
      setFeedback({
        type: "error",
        text: "Judul artikel wajib diisi minimal 5 karakter.",
      });
      return;
    }

    if (targetStatus === "PUBLISHED" && (!content.trim() || wordCount < 50)) {
      setFeedback({
        type: "error",
        text: "Untuk langsung diterbitkan, naskah artikel minimal 50 kata.",
      });
      return;
    }

    setFeedback(null);
    startTransition(async () => {
      const res = await saveArticleByAdminAction(
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
          isEditorPick,
          seoTitle,
          metaDescription,
          status: targetStatus,
        },
        initialData?.id
      );

      if (res.success && res.data) {
        setFeedback({
          type: "success",
          text: res.message || "Artikel berhasil disimpan!",
          publishedSlug:
            targetStatus === "PUBLISHED" ? res.data.slug : undefined,
        });

        if (targetStatus === "PUBLISHED") {
          setTimeout(() => {
            router.push("/admin/articles");
          }, 1800);
        } else if (!initialData?.id && res.data.id) {
          router.push(`/admin/articles/${res.data.id}/edit`);
        }
      } else {
        setFeedback({
          type: "error",
          text: res.message || "Gagal menyimpan artikel.",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
            title="Kembali ke Manajemen Artikel"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                Meja Penulisan Agen Belokan
              </span>
              {initialData && (
                <ArticleStatusBadge status={initialData.status} size="sm" />
              )}
            </div>
            <h1 className="text-sm font-black text-black uppercase tracking-tight truncate max-w-md mt-0.5">
              {title || "Naskah Baru Tanpa Judul"}
            </h1>
          </div>
        </div>

        {/* View mode toggle & Metrics */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-400 border-r border-zinc-200 pr-3">
            <span>{wordCount} kata</span>
            <span>•</span>
            <span>±{readingTime} menit baca</span>
          </div>

          <div className="bg-zinc-100 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "preview"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <div>
              <p>{feedback.text}</p>
              {feedback.publishedSlug && (
                <Link
                  href={`/artikel/${feedback.publishedSlug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline text-emerald-900 mt-0.5"
                >
                  <span>Buka Artikel Tayang</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-black uppercase text-[10px] tracking-wider font-black"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Grid: Content Editor (Left) & Sidebar Settings (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Title & Content */}
        <div className="lg:col-span-8 space-y-6">
          {viewMode === "edit" ? (
            <div className="space-y-6">
              {/* Title Card */}
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                  Judul Artikel Agen Belokan
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ketik judul artikel yang bernas, lugas, dan menggugah rasa ingin tahu..."
                  rows={2}
                  className="w-full text-xl sm:text-2xl lg:text-3xl font-black text-black placeholder:text-zinc-300 border-0 focus:outline-hidden resize-none leading-snug"
                />
              </div>

              {/* Formatting Toolbar & Editor */}
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
                {/* Toolbar */}
                <div className="border-b border-zinc-200 bg-zinc-50 p-3 flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => insertFormatting("## ")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Sub-judul (H2)"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("### ")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Sub-judul Kecil (H3)"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-zinc-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormatting("**", "**")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Tebal (Bold)"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("*", "*")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Miring (Italic)"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-zinc-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormatting("> ")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Kutipan (Blockquote)"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("- ")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Daftar Poin"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("1. ")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Daftar Nomor"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n---\n\n")}
                    className="p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
                    title="Garis Pemisah"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Content Textarea */}
                <div className="p-6 sm:p-8">
                  <textarea
                    id="admin-article-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mulai tuliskan naskah liputan atau analisis Agen Belokan di sini (Mendukung Markdown)..."
                    rows={18}
                    className="w-full text-base sm:text-lg text-zinc-900 leading-relaxed placeholder:text-zinc-300 border-0 focus:outline-hidden resize-none font-normal"
                  />
                </div>
              </div>

              {/* Excerpt Card */}
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-xs space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                  Lead / Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan pembuka 1-2 kalimat untuk kartu beranda dan media sosial..."
                  rows={3}
                  className="w-full text-xs sm:text-sm text-zinc-800 p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Investigation / Source Card */}
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-xs space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                  Sumber Data & Wawancara Agen Belokan
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Contoh: Tim Investigasi BELOKIRI, Laporan Riset 2025, Wawancara Khusus"
                  className="w-full text-xs text-zinc-800 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
                />
              </div>
            </div>
          ) : (
            /* Live Preview Mode */
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentRubrik.badgeColor}`}
                  >
                    Rubrik {currentRubrik.name}
                  </span>
                  {isEditorPick && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Pilihan Agen Belokan</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight">
                  {title || "Judul Belum Diisi"}
                </h1>

                {excerpt && (
                  <p className="text-base sm:text-lg text-zinc-600 font-serif leading-relaxed italic border-l-4 border-red-600 pl-4 py-1">
                    {excerpt}
                  </p>
                )}

                {featuredImage && (
                  <div className="space-y-2 pt-2">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200">
                      <Image
                        src={featuredImage}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {featuredImageCaption && (
                      <p className="text-xs text-zinc-500 italic">
                        {featuredImageCaption}{" "}
                        {photoSource && (
                          <span className="font-bold">({photoSource})</span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Rendered Body */}
              <div className="prose prose-zinc max-w-none pt-4 text-zinc-800 leading-relaxed space-y-4">
                {content ? (
                  content.split("\n\n").map((para, i) => {
                    if (para.startsWith("## ")) {
                      return (
                        <h2
                          key={i}
                          className="text-xl font-black text-black uppercase tracking-tight mt-6 mb-2"
                        >
                          {para.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (para.startsWith("### ")) {
                      return (
                        <h3
                          key={i}
                          className="text-lg font-bold text-black mt-4 mb-2"
                        >
                          {para.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (para.startsWith("> ")) {
                      return (
                        <blockquote
                          key={i}
                          className="border-l-4 border-red-600 pl-4 italic text-zinc-700 my-4"
                        >
                          {para.replace("> ", "")}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={i} className="text-base leading-relaxed">
                        {para}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-zinc-400 italic">Belum ada naskah isi.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Publishing Controls & Rubrik */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card: Publish Directly / Submit Review / Save Draft */}
          <div className="bg-white rounded-3xl border-2 border-red-600/30 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-red-600">
                <Globe className="w-4 h-4" />
                <h3 className="text-xs font-black uppercase tracking-wider text-red-600">
                  Pusat Penerbitan Agen Belokan
                </h3>
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-normal">
                Sebagai Dewan Agen Belokan, Anda dapat langsung menerbitkan naskah ke situs publik tanpa menunggu antrean.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Publish Directly */}
              <button
                type="button"
                onClick={() => handleSave("PUBLISHED")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-red-200 group-hover:scale-110 transition-transform" />
                <span>Terbitkan Langsung (Publish)</span>
              </button>

              {/* Option 2: Submit to Review Queue */}
              <button
                type="button"
                onClick={() => handleSave("REVIEW")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-zinc-400" />
                <span>Kirim ke Antrean Kurasi</span>
              </button>

              {/* Option 3: Save as Draft */}
              <button
                type="button"
                onClick={() => handleSave("DRAFT")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-zinc-500" />
                <span>Simpan Sebagai Draf</span>
              </button>
            </div>
          </div>

          {/* Rubrik Selector Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-black">
                Pilih Rubrik BELOKIRI
              </label>
              <span className="text-[10px] font-bold text-zinc-400">8 Rubrik</span>
            </div>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-black uppercase text-black focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all cursor-pointer"
            >
              {MOCK_RUBRIKS.map((r) => (
                <option key={r.slug} value={r.slug}>
                  Rubrik {r.name}
                </option>
              ))}
            </select>

            {/* Rubrik Guidance Box */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-start gap-1.5 text-zinc-500">
                <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-600" />
                <p className="text-[11px] font-bold text-black italic leading-snug">
                  &ldquo;{currentRubrik.question}&rdquo;
                </p>
              </div>
              <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                {currentRubrik.description}
              </p>
            </div>
          </div>

          {/* Editor's Pick Toggle Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isEditorPick}
                onChange={(e) => setIsEditorPick(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-red-600 border-zinc-300 focus:ring-red-500"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase tracking-tight">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Tandai Pilihan Agen Belokan</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                  Sorot artikel ini di beranda publik pada seksi khusus rekomendasi Dewan Agen Belokan.
                </p>
              </div>
            </label>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
            <ImageUploadDropzone
              value={featuredImage}
              onChange={setFeaturedImage}
              label="Foto Utama Naskah (Cover)"
              helperText="Tarik gambar atau pilih dari perangkat (Maks. 5 MB). Rasio ideal 16:9."
            />

            <div className="space-y-3 pt-2 border-t border-zinc-100">
              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Takarir (Caption) Foto
                </span>
                <input
                  type="text"
                  value={featuredImageCaption}
                  onChange={(e) => setFeaturedImageCaption(e.target.value)}
                  placeholder="Keterangan singkat peristiwa dalam foto..."
                  className="w-full text-xs text-zinc-800 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white mt-1"
                />
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Hak Cipta / Sumber Foto
                </span>
                <input
                  type="text"
                  value={photoSource}
                  onChange={(e) => setPhotoSource(e.target.value)}
                  placeholder="Contoh: Dokumentasi Agen Belokan BELOKIRI / Unsplash"
                  className="w-full text-xs text-zinc-800 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white mt-1"
                />
              </div>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-black block">
              Tagar / Topik
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Tambah topik..."
                className="w-full text-xs text-zinc-800 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
              <button
                type="button"
                onClick={addTag}
                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-[11px] font-bold"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(idx)}
                    className="text-zinc-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-black block">
              Optimasi Mesin Pencari (SEO)
            </label>

            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                SEO Meta Title
              </span>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || "Judul untuk Google Search..."}
                className="w-full text-xs text-zinc-800 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white mt-1"
              />
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                Meta Description
              </span>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Deskripsi pencarian (140-160 karakter)..."
                rows={2}
                className="w-full text-xs text-zinc-800 p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white mt-1 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
