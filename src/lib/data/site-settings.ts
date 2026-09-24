export interface SiteIdentity {
  siteName: string;
  tagline: string;
  description: string;
  copyrightText: string;
  logoUrl: string;
  logoWhiteUrl: string;
}

export interface SectionConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  iconName: string;
}

export interface HomepageSections {
  berisik: SectionConfig;
  editorsPick: SectionConfig;
  mejaWarkop: SectionConfig;
  latestArticles: SectionConfig;
}

export interface CtaBannerConfig {
  ruangWarga: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
  ruangAgen: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
  rekrutmenBanner: {
    badgeText: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    bgColor: string;
  };
}

export interface SocialMediaConfig {
  whatsapp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  email: string;
  address: string;
}

export interface SuratKalengItem {
  id: string;
  namaSamaran: string;
  isiSurat: string;
  createdAt: string;
  isRead: boolean;
  isStarred: boolean;
}

export interface KabinetMember {
  id: string;
  name: string;
  alias: string;
  role: string;
  title: string;
  category: "PIMPINAN" | "AGEN_RUBRIK";
  rubrik?: string;
  focus?: string;
  desc: string;
  photo: string;
  status: "AKTIF" | "NONAKTIF";
}

export interface FullSiteSettings {
  identity: SiteIdentity;
  sections: HomepageSections;
  cta: CtaBannerConfig;
  social: SocialMediaConfig;
}

// Initial In-Memory Store & Defaults
export const defaultSiteSettings: FullSiteSettings = {
  identity: {
    siteName: "BELOKIRI",
    tagline: "Liar Seperlunya, Jenaka Secukupnya",
    description:
      "BELOKIRI adalah media esai populer, analisis santai, arsip sejarah rakyat, dan percakapan kritis yang disajikan dengan tajam dan jenaka. Menanggapi dunia yang berisik tanpa harus kehilangan akal sehat.",
    copyrightText:
      "© 2026 BELOKIRI. Seluruh hak cipta milik Tuhan YME. | Liar Seperlunya, Jenaka Secukupnya",
    logoUrl: "/images/logo-belokiri-red.png",
    logoWhiteUrl: "/images/logo-belokiri-white.png",
  },
  sections: {
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
  },
  cta: {
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
  },
  social: {
    whatsapp: "https://wa.me/6281234567890",
    facebook: "https://facebook.com/belokiri.id",
    instagram: "https://instagram.com/belokiri.id",
    tiktok: "https://tiktok.com/@belokiri.id",
    email: "redaksi@belokiri.id",
    address: "Gedung Media Nusantara Lt. 4, Jl. Kebon Sirih No. 45, Jakarta Pusat 10340",
  },
};

let siteSettingsStore: FullSiteSettings = { ...defaultSiteSettings };

let suratKalengStore: SuratKalengItem[] = [
  {
    id: "sk-1",
    namaSamaran: "Anonim Senja Warkop",
    isiSurat:
      "Tolong bahas tuntas soal kenaikan pajak rokok linting dan dampaknya ke warung-warung kopi kecil di kampung. Kami makin terjepit.",
    createdAt: "2026-09-24T08:30:00Z",
    isRead: false,
    isStarred: true,
  },
  {
    id: "sk-2",
    namaSamaran: "Buruh Desain Lepas",
    isiSurat:
      "Terima kasih rubrik Ordal-nya tajam sekali. Akhirnya ada media yang berani buka-bukaan soal praktik oligarki pengadaan aplikasi pemerintah.",
    createdAt: "2026-09-23T14:15:00Z",
    isRead: true,
    isStarred: false,
  },
  {
    id: "sk-3",
    namaSamaran: "Warga Pinggiran Rel",
    isiSurat:
      "Bahas isu penggusuran lahan sempadan rel di kota satelit dong min, jangan cuma ributin pilkada doang!",
    createdAt: "2026-09-22T19:40:00Z",
    isRead: true,
    isStarred: true,
  },
];

export const defaultKabinetMembers: KabinetMember[] = [
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
  {
    id: "kab-8",
    name: "Bayu Kusuma",
    alias: "Mata Elang",
    role: "Agen Rubrik ORDAL",
    title: "Investigasi Dinamika Kuasa & Elite",
    category: "AGEN_RUBRIK",
    rubrik: "ORDAL",
    focus: "Membongkar Dinamika Kuasa, Kebijakan & Elite",
    desc: "Mengendus manuver orang dalam, relasi oligarki, dan kroni kekuasaan di balik panggung seremonial.",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
  {
    id: "kab-9",
    name: "Hendra Wijaya",
    alias: "Pencatat Sunyi",
    role: "Agen Rubrik ARSIP PINGGIRAN",
    title: "Kurator Sejarah Rakyat & Buruh",
    category: "AGEN_RUBRIK",
    rubrik: "ARSIP PINGGIRAN",
    focus: "Sejarah Rakyat, Kaum Buruh & Marjinal",
    desc: "Menggali memori kolektif yang sengaja ditenggelamkan historiografi resmi penguasa.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
  {
    id: "kab-10",
    name: "Dr. Danang Prabowo",
    alias: "Filsuf Kopi",
    role: "Agen Rubrik SEDIKIT AKADEMIS",
    title: "Kurator Teori Kritis & Filsafat Populer",
    category: "AGEN_RUBRIK",
    rubrik: "SEDIKIT AKADEMIS",
    focus: "Filsafat & Teori Kritis Tanpa Jargon Rumit",
    desc: "Membumikan gagasan para filsuf dan pemikir kiri agar bisa dipahami sambil menyeruput kopi hitam.",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
  {
    id: "kab-11",
    name: "Larasati Dewi",
    alias: "Pena Renjana",
    role: "Agen Rubrik SISA BAHASA",
    title: "Kurator Sastra & Bahasa Emosional",
    category: "AGEN_RUBRIK",
    rubrik: "SISA BAHASA",
    focus: "Puisi, Prosa, Fragmen & Sastra Emosional",
    desc: "Merawat kepekaan rasa dan estetika kata ketika kalimat berita kehilangan daya gugahnya.",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
  {
    id: "kab-12",
    name: "Anisa Nurul",
    alias: "Suara Merdeka",
    role: "Agen Rubrik SETARA",
    title: "Kurator Keadilan Gender & Hak Sosial",
    category: "AGEN_RUBRIK",
    rubrik: "SETARA",
    focus: "Isu Perempuan, Gender & Keadilan Sosial",
    desc: "Mengawal ruang aman, keadilan gender, dan perjuangan kelompok rentan yang kerap dikesampingkan.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
  {
    id: "kab-13",
    name: "Joko Parodi",
    alias: "Pawang Satir",
    role: "Agen Rubrik SERIAL ANABEL",
    title: "Kurator Serial Fiksi & Cerita Parodi",
    category: "AGEN_RUBRIK",
    rubrik: "SERIAL ANABEL",
    focus: "Serial Fiksi Satir & Parodi Mingguan",
    desc: "Menertawakan realitas politik yang lebih absurd daripada fiksi melalui serial cerita berkala.",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    status: "AKTIF",
  },
];

let kabinetStore: KabinetMember[] = [...defaultKabinetMembers];

// Helper Functions
export async function getSiteSettings(): Promise<FullSiteSettings> {
  return siteSettingsStore;
}

export async function updateSiteSettings(
  partial: Partial<FullSiteSettings>
): Promise<FullSiteSettings> {
  siteSettingsStore = {
    ...siteSettingsStore,
    ...partial,
    identity: { ...siteSettingsStore.identity, ...(partial.identity || {}) },
    sections: { ...siteSettingsStore.sections, ...(partial.sections || {}) },
    cta: { ...siteSettingsStore.cta, ...(partial.cta || {}) },
    social: { ...siteSettingsStore.social, ...(partial.social || {}) },
  };
  return siteSettingsStore;
}

export async function getSuratKalengList(): Promise<SuratKalengItem[]> {
  return suratKalengStore;
}

export async function addSuratKaleng(nama: string, isi: string): Promise<SuratKalengItem> {
  const item: SuratKalengItem = {
    id: `sk-${Date.now()}`,
    namaSamaran: nama || "Warga Anonim",
    isiSurat: isi,
    createdAt: new Date().toISOString(),
    isRead: false,
    isStarred: false,
  };
  suratKalengStore.unshift(item);
  return item;
}

export async function toggleSuratKalengRead(id: string): Promise<boolean> {
  const item = suratKalengStore.find((s) => s.id === id);
  if (item) {
    item.isRead = !item.isRead;
    return true;
  }
  return false;
}

export async function toggleSuratKalengStar(id: string): Promise<boolean> {
  const item = suratKalengStore.find((s) => s.id === id);
  if (item) {
    item.isStarred = !item.isStarred;
    return true;
  }
  return false;
}

export async function deleteSuratKaleng(id: string): Promise<boolean> {
  suratKalengStore = suratKalengStore.filter((s) => s.id !== id);
  return true;
}

export async function getKabinetMembers(): Promise<KabinetMember[]> {
  return kabinetStore;
}

export async function updateKabinetMember(
  id: string,
  data: Partial<KabinetMember>
): Promise<KabinetMember | null> {
  const idx = kabinetStore.findIndex((k) => k.id === id);
  if (idx !== -1) {
    kabinetStore[idx] = { ...kabinetStore[idx], ...data };
    return kabinetStore[idx];
  }
  return null;
}

export async function addKabinetMember(
  data: Omit<KabinetMember, "id">
): Promise<KabinetMember> {
  const newMember: KabinetMember = {
    id: `kab-${Date.now()}`,
    ...data,
  };
  kabinetStore.push(newMember);
  return newMember;
}

export async function deleteKabinetMember(id: string): Promise<boolean> {
  kabinetStore = kabinetStore.filter((k) => k.id !== id);
  return true;
}
