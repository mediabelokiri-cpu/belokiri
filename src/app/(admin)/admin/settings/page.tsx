"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sliders,
  Globe,
  LayoutTemplate,
  Megaphone,
  Share2,
  Users,
  Save,
  CheckCircle2,
  Eye,
  Plus,
  Trash2,
  Edit2,
  ShieldCheck,
  Coffee,
  Sparkles,
  PenLine,
  Star,
  Loader2,
  AlertCircle,
  RefreshCw,
  HeartHandshake,
  Upload,
} from "lucide-react";
import {
  FullSiteSettings,
  KabinetMember,
  defaultSiteSettings,
  defaultKabinetMembers,
} from "@/lib/data/site-settings";
import {
  getSiteSettingsAction,
  saveSiteSettingsAction,
} from "@/actions/settings.actions";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "identity" | "sections" | "cta" | "social" | "kabinet"
  >("identity");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Identity Form State
  const [identity, setIdentity] = useState(defaultSiteSettings.identity);

  // Sections State
  const [sections, setSections] = useState(defaultSiteSettings.sections);

  // CTA State
  const [cta, setCta] = useState(defaultSiteSettings.cta);

  // Social State
  const [social, setSocial] = useState(defaultSiteSettings.social);

  // Kabinet Members State
  const [kabinet, setKabinet] = useState<KabinetMember[]>(defaultKabinetMembers);
  const [editingMember, setEditingMember] = useState<KabinetMember | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMember) return;

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    setUploadingPhoto(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (res.ok && json.success && json.url) {
        setEditingMember({ ...editingMember, photo: json.url });
      } else {
        alert(json.message || "Gagal mengunggah foto.");
      }
    } catch (err: any) {
      alert(err?.message || "Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setUploadingPhoto(false);
      if (photoFileInputRef.current) photoFileInputRef.current.value = "";
    }
  };

  const handleResetDummy = () => {
    if (confirm("Reset susunan kabinet kembali ke 1 dummy card default sesuai desain?")) {
      setKabinet(defaultKabinetMembers);
      handleSave(defaultKabinetMembers);
    }
  };

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getSiteSettingsAction();
        if (res.success) {
          if (res.settings.identity) setIdentity(res.settings.identity);
          if (res.settings.sections) setSections(res.settings.sections);
          if (res.settings.cta) {
            setCta({
              ...defaultSiteSettings.cta,
              ...res.settings.cta,
              donasiBanner: {
                ...defaultSiteSettings.cta.donasiBanner!,
                ...(res.settings.cta.donasiBanner || {}),
              },
            });
          }
          if (res.settings.social) setSocial(res.settings.social);
          if (res.kabinet && res.kabinet.length > 0) setKabinet(res.kabinet);
        }
      } catch (err) {
        console.error("Gagal memuat pengaturan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (overrideKabinet?: KabinetMember[]) => {
    setSaving(true);
    setErrorMsg(null);
    try {
      const targetKabinet = overrideKabinet || kabinet;
      const res = await saveSiteSettingsAction(
        { identity, sections, cta, social },
        targetKabinet
      );
      if (res.success) {
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
        }, 3000);
      } else {
        setErrorMsg(res.error || "Gagal menyimpan pengaturan ke database.");
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddMember = () => {
    const newMember: KabinetMember = {
      id: `kab-${Date.now()}`,
      name: "",
      role: "",
      desc: "",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      status: "AKTIF",
    };
    setEditingMember(newMember);
  };

  const handleSaveMember = (member: KabinetMember) => {
    if (!member.name.trim() || !member.role.trim()) {
      alert("Nama asli dan peran/jabatan wajib diisi!");
      return;
    }
    const exists = kabinet.some((k) => k.id === member.id);
    const updatedKabinet = exists
      ? kabinet.map((k) => (k.id === member.id ? member : k))
      : [...kabinet, member];

    setKabinet(updatedKabinet);
    setEditingMember(null);
    handleSave(updatedKabinet);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Hapus personil ini dari struktur Kabinet Belokiri?")) {
      const updatedKabinet = kabinet.filter((k) => k.id !== id);
      setKabinet(updatedKabinet);
      handleSave(updatedKabinet);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            KONTROL TOTAL CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-2">
            Kelola Tampilan & Pengaturan Website
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
            Kelola identitas, susunan section beranda, banner CTA, tautan media sosial, hingga struktur Kabinet Belokiri (Tersimpan Permanen di Supabase).
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving || loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-black text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan ke Supabase...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-xs sm:text-sm font-bold">{errorMsg}</p>
        </div>
      )}

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs sm:text-sm font-bold">
            Pengaturan website berhasil diperbarui dan diterapkan ke seluruh halaman publik!
          </p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-zinc-200 overflow-x-auto pb-px">
        {[
          { id: "identity", label: "Identitas & Branding", icon: Globe },
          { id: "sections", label: "Section Beranda", icon: LayoutTemplate },
          { id: "cta", label: "Banner & CTA", icon: Megaphone },
          { id: "social", label: "Media Sosial & Kontak", icon: Share2 },
          { id: "kabinet", label: "Susunan Kabinet", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                isActive
                  ? "border-red-600 text-red-600 bg-white shadow-xs font-black"
                  : "border-transparent text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: IDENTITAS & BRANDING
      ========================================================================= */}
      {activeTab === "identity" && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-base font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-600" />
            <span>Identitas Situs & Hak Cipta</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Nama Media / Situs
              </label>
              <input
                type="text"
                value={identity.siteName}
                onChange={(e) => setIdentity({ ...identity, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Tagline Utama
              </label>
              <input
                type="text"
                value={identity.tagline}
                onChange={(e) => setIdentity({ ...identity, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
              Deskripsi Profil Media (Tampil di Footer & SEO)
            </label>
            <textarea
              rows={3}
              value={identity.description}
              onChange={(e) => setIdentity({ ...identity, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
              Teks Hak Cipta & Disclaimer Bawah Footer
            </label>
            <input
              type="text"
              value={identity.copyrightText}
              onChange={(e) => setIdentity({ ...identity, copyrightText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-mono text-zinc-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Logo Utama (Header / Terang)
              </label>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="p-2 bg-white rounded-lg border border-zinc-200">
                  <Image
                    src={identity.logoUrl}
                    alt="Logo"
                    width={120}
                    height={30}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <input
                  type="text"
                  value={identity.logoUrl}
                  onChange={(e) => setIdentity({ ...identity, logoUrl: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Logo Footer (Gelap / Putih)
              </label>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white">
                <div className="p-2 bg-black rounded-lg border border-zinc-800">
                  <Image
                    src={identity.logoWhiteUrl}
                    alt="Logo Putih"
                    width={120}
                    height={30}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <input
                  type="text"
                  value={identity.logoWhiteUrl}
                  onChange={(e) => setIdentity({ ...identity, logoWhiteUrl: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: KELOLA SECTION BERANDA
      ========================================================================= */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-base font-black uppercase tracking-tight text-black flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-red-600" />
                <span>Susunan & Visibilitas Section Beranda</span>
              </h2>
              <span className="text-xs text-zinc-500 font-medium">
                Kontrol aktif/nonaktif dan judul masing-masing section
              </span>
            </div>

            <div className="space-y-6">
              {/* 1. BERISIK */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-red-100 text-red-600">
                      <Megaphone className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-black uppercase text-black">Section 1: BERISIK</h3>
                      <p className="text-xs text-zinc-500">1 Naskah Banner Gambar + List Naskah Judul Saja</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sections.berisik.enabled}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          berisik: { ...sections.berisik, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Judul Section
                    </label>
                    <input
                      type="text"
                      value={sections.berisik.title}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          berisik: { ...sections.berisik, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Subtitle / Keterangan
                    </label>
                    <input
                      type="text"
                      value={sections.berisik.subtitle}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          berisik: { ...sections.berisik, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 2. PILIHAN AGEN BELOKAN */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
                      <Star className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-black uppercase text-black">Section 2: PILIHAN AGEN BELOKAN</h3>
                      <p className="text-xs text-zinc-500">1 Naskah Display Gambar Besar + List Samping</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sections.editorsPick.enabled}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          editorsPick: { ...sections.editorsPick, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Judul Section
                    </label>
                    <input
                      type="text"
                      value={sections.editorsPick.title}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          editorsPick: { ...sections.editorsPick, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Subtitle / Keterangan
                    </label>
                    <input
                      type="text"
                      value={sections.editorsPick.subtitle}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          editorsPick: { ...sections.editorsPick, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 3. MEJA WARKOP */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-zinc-200 text-black">
                      <Coffee className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-black uppercase text-black">Section 3: MEJA WARKOP</h3>
                      <p className="text-xs text-zinc-500">Kultur Warkop, 1 Display Card + List Samping</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sections.mejaWarkop.enabled}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          mejaWarkop: { ...sections.mejaWarkop, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Judul Section
                    </label>
                    <input
                      type="text"
                      value={sections.mejaWarkop.title}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          mejaWarkop: { ...sections.mejaWarkop, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Subtitle / Keterangan
                    </label>
                    <input
                      type="text"
                      value={sections.mejaWarkop.subtitle}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          mejaWarkop: { ...sections.mejaWarkop, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 4. TULISAN TERBARU */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-red-100 text-red-600">
                      <PenLine className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-black uppercase text-black">Section 4: TULISAN TERBARU</h3>
                      <p className="text-xs text-zinc-500">Semua Naskah Kronologis (4 Kolom Grid)</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sections.latestArticles.enabled}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          latestArticles: { ...sections.latestArticles, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Judul Section
                    </label>
                    <input
                      type="text"
                      value={sections.latestArticles.title}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          latestArticles: { ...sections.latestArticles, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 mb-1">
                      Subtitle / Keterangan
                    </label>
                    <input
                      type="text"
                      value={sections.latestArticles.subtitle}
                      onChange={(e) =>
                        setSections({
                          ...sections,
                          latestArticles: { ...sections.latestArticles, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: BANNER & CTA
      ========================================================================= */}
      {activeTab === "cta" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-red-600" />
              <span>Dua Kolom CTA Footer Beranda</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolom 1: Ruang Warga Belokan */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white px-2.5 py-1 rounded-md border border-zinc-200">
                  KOLOM 1 (KIRIM TULISAN)
                </span>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Judul Kolom
                  </label>
                  <input
                    type="text"
                    value={cta.ruangWarga.title}
                    onChange={(e) =>
                      setCta({
                        ...cta,
                        ruangWarga: { ...cta.ruangWarga, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Deskripsi Ringkas
                  </label>
                  <textarea
                    rows={3}
                    value={cta.ruangWarga.description}
                    onChange={(e) =>
                      setCta({
                        ...cta,
                        ruangWarga: { ...cta.ruangWarga, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Teks Tombol
                    </label>
                    <input
                      type="text"
                      value={cta.ruangWarga.buttonText}
                      onChange={(e) =>
                        setCta({
                          ...cta,
                          ruangWarga: { ...cta.ruangWarga, buttonText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-black uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Tautan URL
                    </label>
                    <input
                      type="text"
                      value={cta.ruangWarga.buttonUrl}
                      onChange={(e) =>
                        setCta({
                          ...cta,
                          ruangWarga: { ...cta.ruangWarga, buttonUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Kolom 2: Ruang Agen Belokan */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white px-2.5 py-1 rounded-md border border-zinc-200">
                  KOLOM 2 (REKRUTMEN AGEN)
                </span>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Judul Kolom
                  </label>
                  <input
                    type="text"
                    value={cta.ruangAgen.title}
                    onChange={(e) =>
                      setCta({
                        ...cta,
                        ruangAgen: { ...cta.ruangAgen, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                    Deskripsi Ringkas
                  </label>
                  <textarea
                    rows={3}
                    value={cta.ruangAgen.description}
                    onChange={(e) =>
                      setCta({
                        ...cta,
                        ruangAgen: { ...cta.ruangAgen, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Teks Tombol
                    </label>
                    <input
                      type="text"
                      value={cta.ruangAgen.buttonText}
                      onChange={(e) =>
                        setCta({
                          ...cta,
                          ruangAgen: { ...cta.ruangAgen, buttonText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-black uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Tautan URL
                    </label>
                    <input
                      type="text"
                      value={cta.ruangAgen.buttonUrl}
                      onChange={(e) =>
                        setCta({
                          ...cta,
                          ruangAgen: { ...cta.ruangAgen, buttonUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Rekrutmen Solid Red */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3">
              Banner CTA Halaman Rekrutmen (/rekrutmen)
            </h2>

            <div className="p-6 rounded-2xl bg-red-600 text-white space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-white px-2.5 py-1 rounded-md">
                {cta.rekrutmenBanner.badgeText}
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                {cta.rekrutmenBanner.title}
              </h3>
              <p className="text-xs text-red-100 font-normal">
                {cta.rekrutmenBanner.description}
              </p>
              <div className="pt-2">
                <span className="px-5 py-2.5 rounded-xl bg-white text-red-600 font-black text-xs uppercase shadow-sm inline-block">
                  {cta.rekrutmenBanner.buttonText}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Judul Banner
                </label>
                <input
                  type="text"
                  value={cta.rekrutmenBanner.title}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      rekrutmenBanner: { ...cta.rekrutmenBanner, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Teks Tombol
                </label>
                <input
                  type="text"
                  value={cta.rekrutmenBanner.buttonText}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      rekrutmenBanner: { ...cta.rekrutmenBanner, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-black uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Tautan Formulir
                </label>
                <input
                  type="text"
                  value={cta.rekrutmenBanner.buttonUrl}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      rekrutmenBanner: { ...cta.rekrutmenBanner, buttonUrl: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Banner CTA Donasi Solidaritas Warga */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-zinc-950 text-red-500">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-black">
                    Banner CTA Donasi Solidaritas Warga
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Banner ajakan patungan warga yang tampil di Beranda dan mengarah ke halaman donasi.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cta.donasiBanner?.enabled !== false}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                <span className="ml-3 text-xs font-bold uppercase text-zinc-700">
                  {cta.donasiBanner?.enabled !== false ? "Aktif di Beranda" : "Dinonaktifkan"}
                </span>
              </label>
            </div>

            {/* Live Preview Card */}
            <div className="p-6 rounded-2xl bg-zinc-950 text-white space-y-4 border-2 border-red-600">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-950/80 px-2.5 py-1 rounded-md border border-red-900/60 inline-block">
                {cta.donasiBanner?.badgeText || "DARI WARGA UNTUK WARGA"}
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                {cta.donasiBanner?.title || "PATUNGAN SOLIDARITAS: JAGA BELOKIRI TETAP MENGUDARA"}
              </h3>
              <p className="text-xs text-zinc-300 font-normal leading-relaxed">
                {cta.donasiBanner?.description ||
                  "Belokiri tidak disokong cukong dan tidak jualan iklan sampah. Kami hidup dari kemandirian dan sokongan Warga Belokan."}
              </p>
              <div className="pt-1">
                <span className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase shadow-sm inline-block">
                  {cta.donasiBanner?.buttonText || "DONASI SOLIDARITAS"} →
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Label Badge Kecil
                </label>
                <input
                  type="text"
                  value={cta.donasiBanner?.badgeText || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        badgeText: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Judul Banner
                </label>
                <input
                  type="text"
                  value={cta.donasiBanner?.title || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Deskripsi / Pesan Ajakan
                </label>
                <textarea
                  rows={2}
                  value={cta.donasiBanner?.description || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Teks Tombol
                </label>
                <input
                  type="text"
                  value={cta.donasiBanner?.buttonText || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        buttonText: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-black uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                  Tautan Tombol
                </label>
                <input
                  type="text"
                  value={cta.donasiBanner?.buttonUrl || ""}
                  onChange={(e) =>
                    setCta({
                      ...cta,
                      donasiBanner: {
                        ...(cta.donasiBanner || defaultSiteSettings.cta.donasiBanner!),
                        buttonUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: MEDIA SOSIAL & KONTAK
      ========================================================================= */}
      {activeTab === "social" && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-base font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-red-600" />
            <span>Tautan Media Sosial & Kontak Redaksi</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Nomor / Tautan WhatsApp
              </label>
              <input
                type="text"
                value={social.whatsapp}
                onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })}
                placeholder="https://wa.me/..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Halaman Facebook
              </label>
              <input
                type="text"
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Akun Instagram
              </label>
              <input
                type="text"
                value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Akun TikTok
              </label>
              <input
                type="text"
                value={social.tiktok}
                onChange={(e) => setSocial({ ...social, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Surel / Alamat Email Resmi
              </label>
              <input
                type="email"
                value={social.email}
                onChange={(e) => setSocial({ ...social, email: e.target.value })}
                placeholder="redaksi@belokiri.id"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-2">
                Alamat Kantor Redaksi
              </label>
              <input
                type="text"
                value={social.address}
                onChange={(e) => setSocial({ ...social, address: e.target.value })}
                placeholder="Gedung Media Nusantara..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: SUSUNAN KABINET BELOKIRI
      ========================================================================= */}
      {activeTab === "kabinet" && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <h2 className="text-base font-black uppercase tracking-tight text-black flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>Daftar Personil Kabinet Belokiri</span>
                </h2>
                <p className="text-xs text-zinc-500 font-normal">
                  Kelola nama, jabatan, foto, dan deskripsi singkat personil kabinet yang tampil pada grid card di /kabinet-belokiri
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetDummy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Kembalikan susunan ke 1 dummy card default"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Dummy</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Personil</span>
                </button>
              </div>
            </div>

            {/* Editing Modal / Form */}
            {editingMember && (
              <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-red-600 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <h3 className="text-xs font-black uppercase tracking-wider text-red-600">
                    {editingMember.id.startsWith("kab-") && !editingMember.name
                      ? "Tambah Personil Baru"
                      : `Edit Personil: ${editingMember.name || "Tanpa Nama"}`}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    ID: {editingMember.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Nama Personil (Huruf Besar / Kapital)
                    </label>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, name: e.target.value })
                      }
                      placeholder="Contoh: ANINDITTA WIJAYA"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Jabatan / Posisi
                    </label>
                    <input
                      type="text"
                      value={editingMember.role}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, role: e.target.value })
                      }
                      placeholder="Contoh: Pemimpin Redaksi"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Foto Personil with Upload Button */}
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-zinc-800">
                        Foto Profil Personil
                      </label>
                      <p className="text-[11px] text-zinc-500 font-normal">
                        Unggah foto dari HP / laptop atau tempel tautan URL gambar.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="file"
                        ref={photoFileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => photoFileInputRef.current?.click()}
                        disabled={uploadingPhoto}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {uploadingPhoto ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Mengunggah...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Unggah Foto</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-200 shrink-0 bg-zinc-100 flex items-center justify-center">
                      {editingMember.photo ? (
                        <Image
                          src={editingMember.photo}
                          alt="Preview Foto"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <Users className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={editingMember.photo}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, photo: e.target.value })
                        }
                        placeholder="https://... atau /images/..."
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-mono text-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                    Deskripsi Singkat Profil
                  </label>
                  <textarea
                    rows={3}
                    value={editingMember.desc}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, desc: e.target.value })
                    }
                    placeholder="Tuliskan deskripsi singkat mengenai personil ini..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-normal leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                    Status Personil
                  </label>
                  <select
                    value={editingMember.status}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        status: e.target.value as "AKTIF" | "NONAKTIF",
                      })
                    }
                    className="w-full sm:w-60 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                  >
                    <option value="AKTIF">AKTIF (Tampil di Website)</option>
                    <option value="NONAKTIF">NONAKTIF (Disembunyikan)</option>
                  </select>
                </div>

                <div className="flex gap-2 justify-end pt-3 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold uppercase cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveMember(editingMember)}
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase shadow-sm cursor-pointer"
                  >
                    Simpan Personil
                  </button>
                </div>
              </div>
            )}

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 font-black uppercase tracking-wider">
                    <th className="py-3 px-4">Foto & Nama</th>
                    <th className="py-3 px-4">Jabatan</th>
                    <th className="py-3 px-4">Deskripsi</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {kabinet.map((m) => (
                    <tr key={m.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-200 shrink-0 bg-zinc-100">
                            <Image
                              src={
                                m.photo ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                              }
                              alt={m.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-black text-black uppercase tracking-tight text-sm">
                              {m.name || "Tanpa Nama"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-zinc-900 block">{m.role}</span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-zinc-600 font-normal line-clamp-2 leading-relaxed">
                          {m.desc || "-"}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            m.status === "AKTIF"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              m.status === "AKTIF" ? "bg-emerald-600" : "bg-zinc-400"
                            }`}
                          />
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingMember(m)}
                            className="p-2 rounded-lg text-zinc-600 hover:text-red-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                            title="Edit Personil"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(m.id)}
                            className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Personil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {kabinet.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-400 font-medium">
                        Belum ada personil kabinet. Klik tombol &ldquo;Tambah Personil&rdquo; di atas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
