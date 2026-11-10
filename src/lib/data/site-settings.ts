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

export interface PublicSuratKalengItem {
  id: string;
  namaSamaran: string;
  isiSurat: string;
  createdAt: string;
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
    siteName: "BAKUBACA",
    tagline: "Setiap Pikiran Punya Ruang.",
    description:
      "Bakubaca adalah ruang bersama bagi Warga untuk menyuarakan realitas, merekam pengalaman, bertukar gagasan, membaca kebudayaan, dan merayakan ekspresi. Setiap Pikiran Punya Ruang.",
    copyrightText:
      "© 2026 BAKUBACA. Setiap Pikiran Punya Ruang.",
    logoUrl: "/images/logourlbarbakubaca.png",
    logoWhiteUrl: "/images/logoheaderbakubaca.png",
  },
  sections: {
    berisik: {
      enabled: true,
      title: "BISING",
      subtitle: "Menyuarakan Realitas — Kritik, Opini & Persoalan Publik",
      iconName: "Megaphone",
    },
    editorsPick: {
      enabled: true,
      title: "PILIHAN REDAKSI",
      subtitle: "Kurasi Khusus Naskah Bermakna & Tajam",
      iconName: "Star",
    },
    mejaWarkop: {
      enabled: true,
      title: "TERAS",
      subtitle: "Ruang Temu Gagasan — Filsafat, Literasi & Refleksi",
      iconName: "Coffee",
    },
    latestArticles: {
      enabled: true,
      title: "TULISAN TERBARU",
      subtitle: "Setiap Pikiran Terbaru dari Para Warga",
      iconName: "PenLine",
    },
  },
  cta: {
    ruangWarga: {
      title: "Punya Pikiran, Esai, atau Cerita yang Perlu Dibagi?",
      description:
        "Bakubaca membuka ruang seluas-luasnya bagi siapa saja untuk hadir sebagai Warga—mengirim esai kritis, catatan perjalanan, refleksi gagasan, ulasan budaya, hingga karya sastra yang jujur.",
      buttonText: "KIRIM TULISAN",
      buttonUrl: "/login",
    },
    ruangAgen: {
      title: "Tertarik Bergabung di Tim Redaksi BAKUBACA?",
      description:
        "Kami membuka pintu kolaborasi bagi penulis esai, penyunting, periset, dan penggerak literasi yang ingin merawat ruang pikir terbuka bersama para Warga.",
      buttonText: "GABUNG REDAKSI",
      buttonUrl: "/rekrutmen",
    },
    rekrutmenBanner: {
      badgeText: "PANGGILAN REDAKSI",
      title: "SIAP MERAWAT RUANG PIKIRAN BERSAMA BAKUBACA?",
      description:
        "Kami tidak mencari suara yang seragam, melainkan mereka yang mau jujur membaca realitas dan tekun merawat gagasan.",
      buttonText: "ISI FORM REDAKSI",
      buttonUrl: "/rekrutmen/form",
      bgColor: "bg-[#4c13ff]",
    },
    donasiBanner: {
      enabled: true,
      badgeText: "DARI WARGA UNTUK WARGA",
      title: "PATUNGAN WARGA: JAGA BAKUBACA TETAP MENGUDARA",
      description:
        "Bakubaca hidup dari kemandirian dan solidaritas para Warga, tanpa kendali pemodal dan tanpa iklan pengganggu. Sisihkan secangkir kopi agar setiap pikiran tetap punya ruang.",
      buttonText: "PATUNGAN WARGA",
      buttonUrl: "/donasi",
    },
  },
  social: {
    whatsapp: "https://wa.me/6281234567890",
    facebook: "https://facebook.com/belokiri.id",
    instagram: "https://instagram.com/belokiri.id",
    tiktok: "https://tiktok.com/@belokiri.id",
    email: "redaksi@belokiri.id",
    address: "Majene, Sulawesi Barat",
  },
};

let siteSettingsStore: FullSiteSettings = { ...defaultSiteSettings };

let suratKalengStore: SuratKalengItem[] = [
  {
    id: "sk-1",
    namaSamaran: "Anonim Teras Warkop",
    isiSurat:
      "Tolong bahas tuntas soal kenaikan biaya hidup di kota kecil dan dampaknya ke usaha-usaha warga. Kami butuh suara yang membumi.",
    createdAt: "2026-09-24T08:30:00Z",
    isRead: false,
    isStarred: true,
  },
  {
    id: "sk-2",
    namaSamaran: "Buruh Desain Lepas",
    isiSurat:
      "Terima kasih rubrik Bising-nya tajam sekali. Akhirnya ada ruang publik yang jujur membedah kebijakan lokal secara jernih.",
    createdAt: "2026-09-23T14:15:00Z",
    isRead: true,
    isStarred: false,
  },
  {
    id: "sk-3",
    namaSamaran: "Warga Pinggiran Kota",
    isiSurat:
      "Perbanyak juga esai sejarah kampung di rubrik Jejak ya, Min! Banyak memori warga daerah yang layak didokumentasikan.",
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
