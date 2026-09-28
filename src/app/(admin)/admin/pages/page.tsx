"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import Link from "next/link";
import {
  Compass,
  FileText,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
  Sparkles,
  Layers,
  Search,
  Users,
  ShieldCheck,
  Scale,
  BookOpen,
  Mail,
  HelpCircle,
  Flame,
  Check,
  MapPin,
  HeartHandshake,
  Upload,
  Trash2,
  Loader2,
  ImageIcon,
} from "lucide-react";
import {
  CustomPageContent,
  DEFAULT_CUSTOM_PAGES,
} from "@/lib/data/custom-pages";
import {
  getAllCustomPagesAction,
  saveCustomPageAction,
  resetCustomPageAction,
} from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export default function AdminPagesManagerPage() {
  const [pages, setPages] = useState<CustomPageContent[]>([]);
  const [customSlugs, setCustomSlugs] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("manifesto");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Current editing state
  const [formData, setFormData] = useState<CustomPageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // QRIS Image Upload state
  const [uploadingQris, setUploadingQris] = useState(false);
  const qrisFileInputRef = useRef<HTMLInputElement>(null);

  // Load all pages on mount
  useEffect(() => {
    async function loadPages() {
      setLoading(true);
      try {
        const res = await getAllCustomPagesAction();
        if (res.success) {
          setPages(res.pages);
          setCustomSlugs(res.customSlugs);
          const first = res.pages.find((p) => p.slug === selectedSlug) || res.pages[0];
          if (first) setFormData({ ...first, extraData: first.extraData ? { ...first.extraData } : {} });
        }
      } catch (err) {
        console.error("Gagal memuat daftar halaman:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPages();
  }, []);

  // When selected slug changes
  const handleSelectPage = (slug: string) => {
    setSelectedSlug(slug);
    const target = pages.find((p) => p.slug === slug);
    if (target) {
      setFormData({ ...target, extraData: target.extraData ? { ...target.extraData } : {} });
      setActiveTab("edit");
      setStatusMessage(null);
    }
  };

  // Handle Save
  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveCustomPageAction(formData.slug, formData);
      if (res.success && res.page) {
        setPages((prev) =>
          prev.map((p) => (p.slug === res.page!.slug ? res.page! : p))
        );
        if (!customSlugs.includes(formData.slug)) {
          setCustomSlugs((prev) => [...prev, formData.slug]);
        }
        setFormData({ ...res.page });
        setStatusMessage({
          type: "success",
          text: `Perubahan halaman "${formData.name}" berhasil disimpan ke Supabase PostgreSQL dan live di website!`,
        });
        setTimeout(() => setStatusMessage(null), 5000);
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Gagal menyimpan perubahan.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Terjadi kesalahan saat menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle Reset to Default
  const handleReset = async () => {
    if (!formData) return;
    const confirmReset = window.confirm(
      `Apakah Anda yakin ingin mengembalikan halaman "${formData.name}" ke teks dan format bawaan sistem?`
    );
    if (!confirmReset) return;

    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await resetCustomPageAction(formData.slug);
      if (res.success && res.page) {
        setPages((prev) =>
          prev.map((p) => (p.slug === res.page!.slug ? res.page! : p))
        );
        setCustomSlugs((prev) => prev.filter((s) => s !== formData.slug));
        setFormData({ ...res.page });
        setStatusMessage({
          type: "success",
          text: `Halaman "${formData.name}" berhasil dikembalikan ke format default sistem!`,
        });
        setTimeout(() => setStatusMessage(null), 5000);
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Gagal mereset halaman.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle QRIS Image Direct Upload from device
  const handleQrisUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage({
        type: "error",
        text: "Harap pilih berkas gambar (PNG, JPG, WebP).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "Ukuran gambar barcode QRIS maksimal 5 MB.",
      });
      return;
    }

    setUploadingQris(true);
    setStatusMessage(null);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (res.ok && json.success && json.url) {
        setFormData({
          ...formData,
          extraData: {
            ...formData.extraData,
            qrisImageUrl: json.url,
          },
        });
        setStatusMessage({
          type: "success",
          text: "Gambar barcode QRIS berhasil diunggah! Jangan lupa klik 'Simpan Perubahan' di atas.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.message || "Gagal mengunggah gambar QRIS.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Terjadi kesalahan saat mengunggah gambar QRIS.",
      });
    } finally {
      setUploadingQris(false);
      if (qrisFileInputRef.current) qrisFileInputRef.current.value = "";
    }
  };

  // Quick Markdown formatting inserter
  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea || !formData) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.content || "";
    const selectedText = currentText.substring(start, end);
    const replacement = `${prefix}${selectedText || "Teks"}${suffix}`;

    const newContent =
      currentText.substring(0, start) + replacement + currentText.substring(end);

    setFormData({ ...formData, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText ? selectedText.length : 4)
      );
    }, 10);
  };

  const isCustomized = customSlugs.includes(selectedSlug);

  // Group pages into Kanal & Gerakan vs Sindikasi & Arsip
  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kanalGerakanPages = filteredPages.filter((p) => p.group === "kanal-gerakan");
  const sindikasiArsipPages = filteredPages.filter((p) => p.group === "sindikasi-arsip");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Manajemen Konten Statis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
            Kelola 11 Halaman Website
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
            Sunting teks judul, subjudul/slogan, isi naskah, dan regulasi untuk seluruh halaman navigasi footer BELOKIRI.
          </p>
        </div>

        {formData && (
          <div className="flex items-center gap-2.5">
            <Link
              href={formData.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 text-xs font-bold hover:bg-zinc-100 hover:text-black transition-all"
            >
              <span>Lihat Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Status Notification Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm font-medium border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">{statusMessage.text}</div>
        </div>
      )}

      {/* Main Grid: Sidebar List + Workspace Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 11 Pages Navigation List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-2xs space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari halaman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
            </div>

            {/* Group 1: Kanal & Gerakan */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2 block">
                KANAL & GERAKAN ({kanalGerakanPages.length})
              </span>
              <div className="space-y-1">
                {kanalGerakanPages.map((p) => {
                  const isSelected = p.slug === selectedSlug;
                  const isCustom = customSlugs.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      onClick={() => handleSelectPage(p.slug)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? "bg-black text-white font-bold shadow-xs"
                          : "hover:bg-zinc-100 text-zinc-700 font-medium"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block truncate">{p.name}</span>
                        <span
                          className={`text-[10px] block font-mono truncate ${
                            isSelected ? "text-zinc-400" : "text-zinc-400"
                          }`}
                        >
                          {p.path}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                          isCustom
                            ? isSelected
                              ? "bg-red-600 text-white"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isSelected
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {isCustom ? "Kustom" : "Bawaan"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Sindikasi & Arsip */}
            <div className="space-y-1.5 pt-3 border-t border-zinc-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2 block">
                SINDIKASI & ARSIP ({sindikasiArsipPages.length})
              </span>
              <div className="space-y-1">
                {sindikasiArsipPages.map((p) => {
                  const isSelected = p.slug === selectedSlug;
                  const isCustom = customSlugs.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      onClick={() => handleSelectPage(p.slug)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? "bg-black text-white font-bold shadow-xs"
                          : "hover:bg-zinc-100 text-zinc-700 font-medium"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block truncate">{p.name}</span>
                        <span
                          className={`text-[10px] block font-mono truncate ${
                            isSelected ? "text-zinc-400" : "text-zinc-400"
                          }`}
                        >
                          {p.path}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                          isCustom
                            ? isSelected
                              ? "bg-red-600 text-white"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isSelected
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {isCustom ? "Kustom" : "Bawaan"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Page Editor */}
        <div className="lg:col-span-8 space-y-6">
          {formData ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-2xs space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
                      {formData.path}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isCustomized
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {isCustomized ? "Tersimpan di Database" : "Menggunakan Bawaan"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-2">
                    {formData.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {isCustomized && (
                    <button
                      onClick={handleReset}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset ke Bawaan</span>
                    </button>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? "Menyimpan..." : "Simpan"}</span>
                  </button>
                </div>
              </div>

              {/* Form Fields: Meta & Titles */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Judul Halaman */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-black uppercase tracking-wider block">
                      Judul Halaman (H1)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-600/30"
                    />
                  </div>

                  {/* Badge Kategori */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-black uppercase tracking-wider block">
                      Pill Badge / Label Tag
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      placeholder="Contoh: SIKAP EDITORIAL"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30"
                    />
                  </div>
                </div>

                {/* Subjudul / Slogan */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-black uppercase tracking-wider block">
                    Subjudul / Slogan Kutipan
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30"
                  />
                </div>

                {/* Meta Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-wider block">
                    Ringkasan Meta SEO (Search Engine & Social Share)
                  </label>
                  <input
                    type="text"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600/30"
                  />
                </div>
              </div>

              {/* Special Extras: Rekrutmen Status Toggle */}
              {formData.slug === "rekrutmen" && (
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-black uppercase text-black">
                      Status Pendaftaran Calon Agen Belokan
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      Bila ditutup, tombol ajakan daftar akan otomatis menampilkan status tutup.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.extraData?.isOpen ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          extraData: {
                            ...formData.extraData,
                            isOpen: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              )}

              {/* Special Extras: Kontak Detail Fields */}
              {formData.slug === "kontak" && (
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                  <div className="flex items-start gap-2.5 pb-3 border-b border-zinc-200">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-black">
                        Data Kartu Kontak & Saluran Resmi
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-normal">
                        Data ini tampil langsung pada kartu info &quot;Alamat &amp; Saluran Resmi&quot; di halaman publik dan otomatis tersinkronisasi dua arah dengan menu Kelola Website (Tab Media Sosial &amp; Kontak).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Alamat Lengkap Kantor Redaksi
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.address || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              address: e.target.value,
                            },
                          })
                        }
                        placeholder="Contoh: Jl. Warkop Tuya No. 45, Jakarta"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Surel / Email Resmi Redaksi
                      </label>
                      <input
                        type="email"
                        value={formData.extraData?.email || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="redaksi@belokiri.id"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Nomor WhatsApp Hotline Layanan
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.whatsapp || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              whatsapp: e.target.value,
                            },
                          })
                        }
                        placeholder="0812-3456-7890"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Extras: Donasi Detail Fields */}
              {formData.slug === "donasi" && (
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                  <div className="flex items-start gap-2.5 pb-3 border-b border-zinc-200">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-black">
                        Data Kanal Donasi &amp; Rekening Solidaritas
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-normal">
                        Data ini tampil langsung pada kotak metode pembayaran (QRIS, Transfer Bank, dan Saweria/Trakteer) di halaman /donasi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* QRIS Upload & URL */}
                    <div className="sm:col-span-2 space-y-3 p-4 rounded-xl bg-white border border-zinc-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <label className="text-xs font-black text-zinc-900 uppercase tracking-wider block">
                            Gambar / Barcode QRIS
                          </label>
                          <p className="text-[11px] text-zinc-500 font-normal">
                            Unggah langsung foto atau tangkapan layar barcode QRIS dari HP / Laptop Anda.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <input
                            type="file"
                            ref={qrisFileInputRef}
                            onChange={handleQrisUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => qrisFileInputRef.current?.click()}
                            disabled={uploadingQris}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                          >
                            {uploadingQris ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Mengunggah...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5" />
                                <span>Unggah Gambar QRIS</span>
                              </>
                            )}
                          </button>

                          {formData.extraData?.qrisImageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  extraData: {
                                    ...formData.extraData,
                                    qrisImageUrl: "",
                                  },
                                })
                              }
                              className="p-2.5 rounded-xl border border-zinc-200 hover:bg-red-50 hover:text-red-600 text-zinc-500 transition-colors cursor-pointer"
                              title="Hapus Gambar QRIS"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Preview if exists */}
                      {formData.extraData?.qrisImageUrl && (
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                          <div className="relative w-16 h-16 rounded-lg bg-white border border-zinc-200 overflow-hidden shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={formData.extraData.qrisImageUrl}
                              alt="Preview QRIS"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-1">
                              ✓ Gambar QRIS Terpasang
                            </span>
                            <p className="text-xs font-mono text-zinc-600 truncate">
                              {formData.extraData.qrisImageUrl}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Atau Tulis Tautan / URL Gambar Manual:
                        </label>
                        <input
                          type="text"
                          value={formData.extraData?.qrisImageUrl || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              extraData: {
                                ...formData.extraData,
                                qrisImageUrl: e.target.value,
                              },
                            })
                          }
                          placeholder="Contoh: /images/qris.png atau https://..."
                          className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-zinc-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Nama Bank
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.bankName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              bankName: e.target.value,
                            },
                          })
                        }
                        placeholder="Contoh: BCA / Bank Mandiri"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Nomor Rekening
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.bankAccountNumber || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              bankAccountNumber: e.target.value,
                            },
                          })
                        }
                        placeholder="Contoh: 123-456-7890"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Nama Pemilik Rekening
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.bankAccountName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              bankAccountName: e.target.value,
                            },
                          })
                        }
                        placeholder="Contoh: Kolektif Belokiri"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Tautan Saweria (Opsional)
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.saweriaUrl || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              saweriaUrl: e.target.value,
                            },
                          })
                        }
                        placeholder="https://saweria.co/belokiri"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                        Tautan Trakteer (Opsional)
                      </label>
                      <input
                        type="text"
                        value={formData.extraData?.trakteerUrl || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            extraData: {
                              ...formData.extraData,
                              trakteerUrl: e.target.value,
                            },
                          })
                        }
                        placeholder="https://trakteer.id/belokiri"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Extras: Kabinet Shortcut */}
              {formData.slug === "kabinet-belokiri" && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <p className="font-bold">
                    💡 Pengelolaan Foto & Profil Personil Kabinet Belokiri:
                  </p>
                  <p>
                    Daftar anggota Kabinet, foto avatar, jabatan RT, dan kutipan dewan dapat dikelola secara mendalam melalui{" "}
                    <Link
                      href="/admin/settings"
                      className="underline font-bold text-black hover:text-red-600"
                    >
                      Kelola Website &gt; Tab Kabinet ↗
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* Content Markdown Editor Section */}
              <div className="space-y-3 pt-4 border-t border-zinc-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("edit")}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                        activeTab === "edit"
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editor Teks Markdown</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pratinjau Tampilan (Live Preview)</span>
                    </button>
                  </div>

                  {activeTab === "edit" && (
                    <div className="flex flex-wrap items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => insertMarkdown("**", "**")}
                        title="Tebal (Bold)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("*", "*")}
                        title="Miring (Italic)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-3.5 bg-zinc-300 mx-0.5" />
                      <button
                        type="button"
                        onClick={() => insertMarkdown("## ", "\n")}
                        title="Subjudul (H2)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors font-bold text-xs"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("### ", "\n")}
                        title="Sub-subjudul (H3 / Pasal)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors font-bold text-xs"
                      >
                        <Heading3 className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-3.5 bg-zinc-300 mx-0.5" />
                      <button
                        type="button"
                        onClick={() => insertMarkdown("> ", "\n")}
                        title="Kutipan (Quote)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("- ", "\n")}
                        title="Daftar Poin"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("1. ", "\n")}
                        title="Daftar Nomor"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n---\n")}
                        title="Garis Pembatas (Divider)"
                        className="p-1.5 rounded hover:bg-white text-zinc-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {activeTab === "edit" ? (
                  <div className="space-y-1.5">
                    <textarea
                      id="content-textarea"
                      rows={18}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Ketik isi naskah atau pedoman di sini menggunakan format Markdown..."
                      className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-600/30 resize-y"
                    />
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
                      <span>Mendukung Markdown lengkap: ## Subjudul, ### Poin, **teks tebal**, *teks miring*, &gt; kutipan</span>
                      <span>{formData.content?.length || 0} karakter</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 sm:p-10 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-6">
                    <div className="text-center space-y-2 border-b border-zinc-200 pb-6">
                      <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                        {formData.badge}
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                        {formData.title}
                      </h1>
                      {formData.subtitle && (
                        <p className="text-sm font-bold text-red-600 uppercase tracking-wide">
                          {formData.subtitle}
                        </p>
                      )}
                    </div>

                    <div
                      className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base
                        [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-3
                        [&_h3]:text-base [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2
                        [&_p]:mb-4 [&_p]:leading-relaxed
                        [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-white [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:font-bold [&_blockquote]:text-black [&_blockquote]:my-6
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-4
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mb-4
                        [&_hr]:my-8 [&_hr]:border-zinc-300"
                      dangerouslySetInnerHTML={{
                        __html: formatArticleContent(formData.content || ""),
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                <p className="text-xs text-zinc-400">
                  Terakhir diperbarui:{" "}
                  {formData.updatedAt
                    ? new Date(formData.updatedAt).toLocaleString("id-ID")
                    : "Bawaan sistem"}
                </p>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Menyimpan..." : "Simpan Perubahan Halaman"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center text-zinc-400">
              Pilih salah satu halaman di samping untuk mulai menyunting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
