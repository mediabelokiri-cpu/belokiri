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
  donasiBanner?: {
    enabled: boolean;
    badgeText: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
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
  role: string;
  desc: string;
  photo: string;
  status: "AKTIF" | "NONAKTIF";
  alias?: string;
  title?: string;
  category?: "PIMPINAN" | "AGEN_RUBRIK";
  rubrik?: string;
  focus?: string;
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
    donasiBanner: {
      enabled: true,
      badgeText: "DARI WARGA UNTUK WARGA",
      title: "PATUNGAN SOLIDARITAS: JAGA BELOKIRI TETAP MENGUDARA",
      description:
        "Belokiri tidak disokong cukong dan tidak jualan iklan sampah. Kami hidup dari kemandirian dan sokongan Warga Belokan. Sisihkan secangkir kopi untuk menjaga akal sehat tetap bersuara.",
      buttonText: "DONASI SOLIDARITAS",
      buttonUrl: "/donasi",
    },
  },
  social: {
    whatsapp: "https://wa.me/6281234567890",
    facebook: "https://facebook.com/belokiri.id",
    instagram: "https://instagram.com/belokiri.id",
    tiktok: "https://tiktok.com/@belokiri.id",
    email: "redaksi@belokiri.id",
    address: "Jl. Warkop Tuya No. 45, Jakarta",
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
    name: "ANINDITTA WIJAYA",
    role: "Pemimpin Redaksi",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
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
