"use client";

import { useState } from "react";
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
} from "lucide-react";
import {
  FullSiteSettings,
  KabinetMember,
} from "@/lib/data/site-settings";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "identity" | "sections" | "cta" | "social" | "kabinet"
  >("identity");

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Identity Form State
  const [identity, setIdentity] = useState({
    siteName: "BELOKIRI",
    tagline: "Liar Seperlunya, Jenaka Secukupnya",
    description:
      "BELOKIRI adalah media esai populer, analisis santai, arsip sejarah rakyat, dan percakapan kritis yang disajikan dengan tajam dan jenaka. Menanggapi dunia yang berisik tanpa harus kehilangan akal sehat.",
    copyrightText:
      "© 2026 BELOKIRI. Seluruh hak cipta milik Tuhan YME. | Liar Seperlunya, Jenaka Secukupnya",
    logoUrl: "/images/logo-belokiri-red.png",
    logoWhiteUrl: "/images/logo-belokiri-white.png",
  });

  // Sections State
  const [sections, setSections] = useState({
    berisik: {
      enabled: true,
      title: "BERISIK",
      subtitle: "Esai Populer, Politik & Sosial Kritis",
      iconName: "Megaphone",
    },
    editorsPick: {
      enabled: true,
      title: "PILIHAN AGEN BELOKAN",
      subtitle: "Kurasi Khusus Naskah Berani & Tajam",
      iconName: "Star",
    },
    mejaWarkop: {
      enabled: true,
      title: "MEJA WARKOP",
      subtitle: "Dialektika Tongkrongan & Kultur Warung Kopi",
      iconName: "Coffee",
    },
    latestArticles: {
      enabled: true,
      title: "TULISAN TERBARU",
      subtitle: "Semua Tulisan Masuk Berdasarkan Waktu Terbit",
      iconName: "PenLine",
    },
  });

  // CTA State
  const [cta, setCta] = useState({
    ruangWarga: {
      title: "Punya Gagasan atau Cerita yang Perlu Didengar?",
      description:
        "BELOKIRI membuka ruang seluas-luasnya bagi mahasiswa, pelajar, peneliti, dan masyarakat umum untuk menyumbangkan tulisan, esai kritis, atau pandangan nyeleneh yang jujur.",
      buttonText: "KIRIM TULISAN",
      buttonUrl: "/login",
    },
    ruangAgen: {
      title: "Tertarik Menjadi Bagian Awak BELOKIRI?",
      description:
        "Kami membuka kesempatan bagi jurnalis investigasi, penulis esai, editor, dan kreator independen yang berani menyusup di antara narasi mapan demi menyuarakan realitas rakyat.",
      buttonText: "GABUNG JADI AGEN",
      buttonUrl: "/rekrutmen",
    },
    rekrutmenBanner: {
      badgeText: "PANGGILAN AGEN",
      title: "SIAP BERGABUNG DENGAN DEWAN BELOKAN?",
      description:
        "Kami tidak mencari orang yang patuh, tapi mereka yang punya sudut pandang tajam dan berani bersuara.",
      buttonText: "ISI FORM AGEN",
      buttonUrl: "/rekrutmen/form",
      bgColor: "bg-red-600",
    },
  });

  // Social State
  const [social, setSocial] = useState({
    whatsapp: "https://wa.me/6281234567890",
    facebook: "https://facebook.com/belokiri.id",
    instagram: "https://instagram.com/belokiri.id",
    tiktok: "https://tiktok.com/@belokiri.id",
    email: "redaksi@belokiri.id",
    address: "Gedung Media Nusantara Lt. 4, Jl. Kebon Sirih No. 45, Jakarta Pusat 10340",
  });

  // Kabinet Members State
  const [kabinet, setKabinet] = useState<KabinetMember[]>([
    {
      id: "kab-1",
      name: "Mbah Broto",
      alias: "Pak RT Warkop",
      role: "Ketua RT Belokan",
      title: "Pamong Warga & Kepala Lingkungan Gagasan",
      category: "PIMPINAN",
      desc: "Menjaga keharmonisan pertikaian intelektual warga belokan, mengesahkan maklumat darurat, dan memastikan ronda malam akal sehat tetap berjalan.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-2",
      name: "Ibu Ratna Susanti",
      alias: "Juru Kunci Dapur",
      role: "Bendahara RT Belokan",
      title: "Juru Kunci Kas & Logistik Kopi",
      category: "PIMPINAN",
      desc: "Mengelola iuran sukarela, subsidi kopi warkop sachet, transparansi kas recehan, dan menjamin dapur redaksi tidak pernah kehabisan gula.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-3",
      name: "Arya Wicaksono",
      alias: "Pena Belokan",
      role: "Pimpinan Redaksi",
      title: "Kurator Utama & Penjaga Ketajaman",
      category: "PIMPINAN",
      desc: "Menentukan arah kurasi naskah, mencoret kalimat basa-basi birokratis, menolak intervensi kepentingan kekuasaan, dan bertanggung jawab penuh.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-4",
      name: "Gilang Perkasa",
      alias: "Si Pamflet",
      role: "Agen Agitasi & Propaganda",
      title: "Pemicu Percakapan & Pamflet Digital",
      category: "PIMPINAN",
      desc: "Mengemas narasi perlawanan menjadi visual jenaka nan tajam, mengguncang kenyamanan linimasa, dan membakar semangat pembangkangan kritis warga.",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-5",
      name: "Dian Paramita",
      alias: "Mbak Lapangan",
      role: "Agen Program",
      title: "Penggerak Meja Warkop & Aksi Warga",
      category: "PIMPINAN",
      desc: "Mengorganisir lapak baca mandiri Literatur Liberte, bedah opini akar rumput di warung kopi pinggiran, serta menjalin aliansi antar-komunitas.",
      photo: "https://images.unsplash.com/photo-1534751516642-a171ed28a0e5?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-6",
      name: "Fajar Nugroho",
      alias: "Penggedor Pintu",
      role: "Agen Rubrik BERISIK",
      title: "Kurator Esai Politik & Sosial Kritis",
      category: "AGEN_RUBRIK",
      rubrik: "BERISIK",
      focus: "Esai Populer Politik, Ekonomi & Sosial Kritis",
      desc: "Menyaring artikel-artikel bervolume tinggi yang membongkar kemunafikan kebijakan dan ketimpangan struktural.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
    {
      id: "kab-7",
      name: "Reza Mahendra",
      alias: "Juru Seduh",
      role: "Agen Rubrik MEJA WARKOP",
      title: "Kurator Kultur & Tongkrongan Warga",
      category: "AGEN_RUBRIK",
      rubrik: "MEJA WARKOP",
      focus: "Analisis Budaya & Percakapan Tongkrongan",
      desc: "Mencatat dialektika meja warung kopi: obrolan santai, satire pinggir jalan, dan keresahan rakyat sehari-hari.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      status: "AKTIF",
    },
  ]);

  const [editingMember, setEditingMember] = useState<KabinetMember | null>(null);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handleSaveMember = (member: KabinetMember) => {
    setKabinet((prev) =>
      prev.map((k) => (k.id === member.id ? member : k))
    );
    setEditingMember(null);
    handleSave();
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Hapus personil ini dari struktur Kabinet Belokiri?")) {
      setKabinet((prev) => prev.filter((k) => k.id !== id));
      handleSave();
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
            Kelola identitas, susunan section beranda, banner CTA, tautan media sosial, hingga struktur Kabinet Belokiri.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-black text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

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
                  Kelola pimpinan RT, bendahara, pemred, dan kurator masing-masing rubrik
                </p>
              </div>

              <button
                onClick={() =>
                  alert(
                    "Fitur Tambah Personil siap! Anda dapat mengedit personil yang sudah terdaftar langsung di bawah."
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Personil</span>
              </button>
            </div>

            {/* Editing Modal / Form */}
            {editingMember && (
              <div className="p-6 rounded-2xl bg-red-50/50 border-2 border-red-600 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-red-600">
                  Edit Personil: {editingMember.name} ({editingMember.role})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Nama Asli
                    </label>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Nama Alias / Samaran
                    </label>
                    <input
                      type="text"
                      value={editingMember.alias}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, alias: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Jabatan / Peran
                    </label>
                    <input
                      type="text"
                      value={editingMember.role}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, role: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Foto Profil URL
                    </label>
                    <input
                      type="text"
                      value={editingMember.photo}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, photo: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                      Gelar / Tugas Singkat
                    </label>
                    <input
                      type="text"
                      value={editingMember.title}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, title: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
                    Deskripsi Tugas
                  </label>
                  <textarea
                    rows={2}
                    value={editingMember.desc}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, desc: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-medium"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 rounded-xl bg-zinc-200 text-zinc-800 text-xs font-bold uppercase"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveMember(editingMember)}
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold uppercase shadow-sm"
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
                    <th className="py-3 px-4">Foto & Personil</th>
                    <th className="py-3 px-4">Jabatan</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {kabinet.map((m) => (
                    <tr key={m.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 shrink-0">
                            <Image
                              src={m.photo}
                              alt={m.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-black text-black uppercase">{m.name}</p>
                            <p className="text-[11px] text-zinc-400 font-bold">&ldquo;{m.alias}&rdquo;</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-zinc-800 block">{m.role}</span>
                        <span className="text-[11px] text-zinc-500">{m.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 font-bold text-[10px] text-zinc-700">
                          {m.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingMember(m)}
                            className="p-1.5 rounded-lg text-zinc-600 hover:text-red-600 hover:bg-zinc-100 transition-colors"
                            title="Edit Personil"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-zinc-100 transition-colors"
                            title="Hapus Personil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
