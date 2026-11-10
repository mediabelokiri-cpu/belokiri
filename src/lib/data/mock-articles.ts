export interface MockArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageCaption: string;
  photoSource?: string | null;
  source?: string | null;
  rubrik: {
    name: string;
    slug: string;
    question: string;
    badgeColor: string;
    description: string;
  };
  author: {
    name: string;
    penName: string | null;
    slug: string;
    avatarUrl: string;
    bio: string;
    role: string;
  };
  tags: string[];
  views: number;
  isEditorPick: boolean;
  isFeatured: boolean;
  publishedAt: string;
  updatedAt?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export const MOCK_AUTHORS: any[] = [];

export const MOCK_RUBRIKS = [
  {
    name: "BISING",
    slug: "bising",
    question: "Menyuarakan Realitas",
    badgeColor: "bg-[#f3efff] text-[#4c13ff] border-[#ccc0ff]",
    description:
      "Ruang untuk kritik, opini, keresahan sosial, politik, demokrasi, dan berbagai persoalan publik.",
  },
  {
    name: "JEJAK",
    slug: "jejak",
    question: "Merekam Pengalaman",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    description:
      "Ruang untuk sejarah, perjalanan, pengalaman personal, dokumentasi sosial, dan ingatan kolektif.",
  },
  {
    name: "TERAS",
    slug: "teras",
    question: "Ruang Temu Gagasan",
    badgeColor: "bg-indigo-50 text-indigo-900 border-indigo-200",
    description:
      "Ruang untuk filsafat, pendidikan, pengetahuan, literasi, refleksi, dan gagasan intelektual.",
  },
  {
    name: "GURAT",
    slug: "gurat",
    question: "Membaca Kebudayaan",
    badgeColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
    description:
      "Ruang untuk seni, budaya, film, musik, buku, dan berbagai fenomena kebudayaan.",
  },
  {
    name: "FRAGMEN",
    slug: "fragmen",
    question: "Merayakan Ekspresi",
    badgeColor: "bg-zinc-100 text-zinc-900 border-zinc-300",
    description:
      "Ruang untuk puisi, cerpen, prosa, catatan personal, dan berbagai bentuk ekspresi kreatif.",
  },
];


export const MOCK_ARTICLES: MockArticle[] = [];
