import { prisma } from "@/lib/db/prisma";
import { MOCK_RUBRIKS } from "./mock-articles";
import { slugify } from "@/lib/utils/slugify";
import { CreateArticleInput, UpdateArticleInput } from "@/lib/validations/article.schema";
import { ProfileInput } from "@/lib/validations/profile.schema";

export interface ContributorArticleItem {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  featuredImageCaption: string | null;
  photoSource: string | null;
  source: string | null;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  status: "DRAFT" | "REVIEW" | "REVISION" | "PUBLISHED";
  adminNote: string | null;
  tags: string[];
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContributorStats {
  draftCount: number;
  reviewCount: number;
  revisionCount: number;
  publishedCount: number;
  totalViews: number;
}

// Initial in-memory mock store for local development / demo testing
let contributorArticlesStore: ContributorArticleItem[] = [
  {
    id: "art-contrib-1",
    authorId: "user-demo-1",
    title: "Catatan dari Pinggiran: Mengapa Ruang Terbuka Hijau Kian Menghilang di Kota Satelit",
    slug: "catatan-dari-pinggiran-mengapa-ruang-terbuka-hijau-kian-menghilang",
    excerpt: "Sebuah pengamatan lapangan tentang alih fungsi lahan resapan air dan dampaknya terhadap keseharian warga pinggiran.",
    content: `## Ironi di Balik Deru Pembangunan Kota

Setiap pagi, ribuan warga di pinggiran kota bergegas menembus kemacetan menuju pusat metropolis. Namun di balik riuhnya gerak ekonomi itu, ada sesuatu yang perlahan tapi pasti lenyap dari pandangan: ruang terbuka hijau dan pohon-pohon peneduh tempat warga saling bertukar kabar.

> "Dulu lapangan ini tempat anak-anak main bola setiap sore. Sekarang sudah dipagari seng, katanya mau dibangun ruko," kenang Pak Slamet (58), warga setempat.

### Alih Fungsi Lahan yang Tak Terbendung
Berdasarkan data pantauan tata ruang mandiri, proporsi area hijau di kawasan penyangga telah menyusut hingga di bawah 12% dalam satu dekade terakhir. Pembangunan perumahan klaster baru dan pusat logistik komersial sering kali mengabaikan penyediaan sempadan sungai dan sabuk hijau.

### Langkah yang Dibutuhkan
1. Penegakan Perda Zonasi Ruang Terbuka Hijau minimal 30%.
2. Partisipasi warga dalam merawat kantong taman komunitas.
3. Transparansi perizinan alih fungsi lahan publik.`,
    featuredImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Sisa pepohonan di kawasan sempadan yang berbatasan langsung dengan proyek pembangunan ruko.",
    photoSource: "Dokumentasi Penulis / BELOKIRI",
    source: "Liputan Lapangan & Observasi Komunitas",
    categoryId: "rubrik-arsip-pinggiran",
    categoryName: "ARSIP PINGGIRAN",
    categorySlug: "arsip-pinggiran",
    status: "DRAFT",
    adminNote: null,
    tags: ["Tata Ruang", "Lingkungan", "Komunitas", "Kota Hijau"],
    views: 0,
    publishedAt: null,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "art-contrib-2",
    authorId: "user-demo-1",
    title: "Polemik Penyesuaian Tarif KRL dan Beban Mobilitas Pekerja Komuter",
    slug: "polemik-penyesuaian-tarif-krl-dan-beban-mobilitas-pekerja-komuter",
    excerpt: "Rencana penyesuaian tarif transportasi publik berbasis rel memicu perdebatan mengenai subsidi silang dan keadilan akses transportasi massal.",
    content: `## Menakar Dampak Ekonomi Komuter Harian

Bagi lebih dari satu juta pekerja komuter yang menggantungkan mobilitas hariannya pada KRL Commuter Line, setiap desas-desus kenaikan tarif adalah perkara kalkulasi dapur yang nyata.

### Keadilan Subsidi Transportasi Publik
Transportasi massal pada hakikatnya bukan sekadar entitas bisnis komersial, melainkan urat nadi mobilitas sosial dan peredam polusi udara perkotaan yang paling efektif.

> Subsidi transportasi publik bukan beban fiskal yang merugikan, melainkan investasi negara dalam menekan angka kecelakaan lalu lintas dan emisi karbon.`,
    featuredImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Kepadatan penumpang KRL Commuter Line di peron transit pada jam pulang kantor.",
    photoSource: "Unsplash / BELOKIRI",
    source: "Wawancara Asosiasi Pengguna KRL & Analisis Tarif",
    categoryId: "rubrik-meja-warkop",
    categoryName: "MEJA WARKOP",
    categorySlug: "meja-warkop",
    status: "REVIEW",
    adminNote: null,
    tags: ["Transportasi", "KRL", "Subsidi", "Kebijakan Publik"],
    views: 0,
    publishedAt: null,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "art-contrib-3",
    authorId: "user-demo-1",
    title: "Menakar Efektivitas Beasiswa Pendidikan Tinggi di Daerah 3T: Harapan dan Hambatan",
    slug: "menakar-efektivitas-beasiswa-pendidikan-tinggi-di-daerah-3t",
    excerpt: "Penyaluran beasiswa afirmasi telah membuka pintu bagi generasi muda daerah terluar, namun pendampingan adaptasi kampus masih menyisakan tantangan besar.",
    content: `## Gerbang Menuju Perguruan Tinggi Terbuka, Namun Adaptasi Menyisakan Celah

Program afirmasi pendidikan tinggi telah mengantarkan ribuan anak muda dari daerah 3T ke kampus-kampus terbaik di tanah air. Ini adalah capaian pemerataan pendidikan yang patut diapresiasi.

Namun, survei pendampingan menunjukkan bahwa tantangan terbesar justru muncul di tahun pertama: perbedaan kurikulum dasar SMA, adaptasi biaya hidup tak terduga, dan keterbatasan akses literasi digital.

### Catatan Penting
- Perlu bimbingan matrikulasi akademik komprehensif di semester pertama.
- Pendampingan konseling kesehatan mental bagi mahasiswa perantau jauh.`,
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Mahasiswa berdiskusi di perpustakaan kampus.",
    photoSource: "Unsplash / BELOKIRI",
    source: "Riset Lembaga Pendidikan & Wawancara Mahasiswa Afirmasi",
    categoryId: "rubrik-sedikit-akademis",
    categoryName: "SEDIKIT AKADEMIS",
    categorySlug: "sedikit-akademis",
    status: "REVISION",
    adminNote: "Naskah sangat menarik dan relevan. Mohon tambahkan data perbandingan jumlah penerima beasiswa tahun 2024 vs 2025 di bagian awal, serta pastikan mencantumkan sumber lisensi foto cover secara resmi.",
    tags: ["Pendidikan", "Beasiswa", "Anak Muda", "Daerah 3T"],
    views: 0,
    publishedAt: null,
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "art-contrib-4",
    authorId: "user-demo-1",
    title: "Melacak Jejak Tenun Ikat Tradisional yang Terancam Sunyi di Lembata",
    slug: "melacak-jejak-tenun-ikat-tradisional-yang-terancam-sunyi-di-lembata",
    excerpt: "Di tengah gempuran tekstil pabrik cepat, para mama di Lembata bertahan menenun tradisi dengan pewarna alami dan kidung leluhur.",
    content: `## Menjaga Helai Benang Identitas Nusantara

Dentingan kayu alat tenun tradisional masih berdetak teratur di teras rumah panggung Desa Lamalera, Lembata. Tangan-tangan keriput para mama dengan telaten menyilangkan benang kapas yang telah direndam akar mengkudu dan daun nila selama berminggu-minggu.

> "Menenun bukan cuma soal kain, Nak. Di setiap motif ada doa untuk keselamatan pelaut dan pesan para leluhur yang tak tertulis di buku," ucap Mama Maria (64).

### Tantangan Regenerasi
Minat generasi muda untuk mempelajari teknik pewarnaan alami semakin menurun seiring maraknya benang sintetis murah. Namun gerakan kolektif komunitas muda lokal mulai merintis upaya revitalisasi dan pencatatan digital atas motif-motif kuno yang sarat makna filosofis.`,
    featuredImage: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Proses penenunan kain tradisional dengan pewarna alami di beranda rumah adat.",
    photoSource: "Dokumentasi Ekspedisi Budaya BELOKIRI",
    source: "Liputan Budaya Nusantara BELOKIRI",
    categoryId: "rubrik-sisa-bahasa",
    categoryName: "SISA BAHASA",
    categorySlug: "sisa-bahasa",
    status: "PUBLISHED",
    adminNote: null,
    tags: ["Budaya", "Tenun", "Tradisi", "Nusantara"],
    views: 1420,
    publishedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "art-contrib-5",
    authorId: "user-demo-1",
    title: "Suara dari Bilik Suara: Refleksi Partisipasi Pemilih Muda dalam Demokrasi Lokal",
    slug: "suara-dari-bilik-suara-refleksi-partisipasi-pemilih-muda-dalam-demokrasi-lokal",
    excerpt: "Anak muda tidak apatis terhadap politik, mereka hanya muak pada janji normatif dan mencari ruang diskusi yang otentik serta berintegritas.",
    content: `## Mendobrak Mitos Apatisme Generasi Baru

Sering kali generasi muda dicap apolitis dan acuh terhadap kebijakan publik. Namun realitas di lapangan dan ruang digital menunjukkan kebalikannya: anak muda begitu aktif membedah rekam jejak, menguji argumen rasional, dan mengawal isu-isu lingkungan hidup.

Demokrasi membutuhkan substansi segar, bukan sekadar gimik baliho di pinggir jalan raya.`,
    featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Diskusi publik mahasiswa mengenai pengawalan transparansi kebijakan daerah.",
    photoSource: "Unsplash / BELOKIRI",
    source: "Kolom Esai & Opini BELOKIRI",
    categoryId: "rubrik-berisik",
    categoryName: "BERISIK",
    categorySlug: "berisik",
    status: "PUBLISHED",
    adminNote: null,
    tags: ["Opini", "Demokrasi", "Pemilih Muda", "Etika Publik"],
    views: 2850,
    publishedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
];

export interface ContributorProfile {
  id: string;
  name: string;
  penName: string | null;
  slug: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
}

/**
 * Get dashboard overview metrics for contributor
 */
export async function getContributorStats(userId: string): Promise<ContributorStats> {
  const userArticles = contributorArticlesStore.filter((a) => a.authorId === userId);

  const draftCount = userArticles.filter((a) => a.status === "DRAFT").length;
  const reviewCount = userArticles.filter((a) => a.status === "REVIEW").length;
  const revisionCount = userArticles.filter((a) => a.status === "REVISION").length;
  const publishedArticles = userArticles.filter((a) => a.status === "PUBLISHED");
  const publishedCount = publishedArticles.length;
  const totalViews = publishedArticles.reduce((acc, curr) => acc + curr.views, 0);

  return {
    draftCount,
    reviewCount,
    revisionCount,
    publishedCount,
    totalViews,
  };
}

/**
 * Get list of articles for contributor with optional status and search filter
 */
export async function getContributorArticles(
  userId: string,
  filter?: {
    status?: "ALL" | "DRAFT" | "REVIEW" | "REVISION" | "PUBLISHED";
    search?: string;
  }
): Promise<ContributorArticleItem[]> {
  let list = contributorArticlesStore.filter((a) => a.authorId === userId);

  if (filter?.status && filter.status !== "ALL") {
    list = list.filter((a) => a.status === filter.status);
  }

  if (filter?.search && filter.search.trim()) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
  }

  // Sort by updatedAt descending
  return [...list].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/**
 * Get single article by ID ensuring author ownership
 */
export async function getContributorArticleById(
  articleId: string,
  userId: string
): Promise<ContributorArticleItem | null> {
  const article = contributorArticlesStore.find(
    (a) => a.id === articleId && a.authorId === userId
  );
  return article || null;
}

/**
 * Save article as DRAFT (Create new or Update existing)
 */
export async function saveArticleDraft(
  userId: string,
  data: CreateArticleInput | UpdateArticleInput,
  articleId?: string
): Promise<ContributorArticleItem> {
  const rubrik = MOCK_RUBRIKS.find(
    (r) => r.slug === data.categoryId || `rubrik-${r.slug}` === data.categoryId
  ) || MOCK_RUBRIKS[0];

  const now = new Date().toISOString();

  if (articleId) {
    const existingIndex = contributorArticlesStore.findIndex(
      (a) => a.id === articleId && a.authorId === userId
    );

    if (existingIndex === -1) {
      throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
    }

    const existing = contributorArticlesStore[existingIndex];

    // Status can remain DRAFT or REVISION
    const updated: ContributorArticleItem = {
      ...existing,
      title: data.title || existing.title,
      slug: data.title ? `${slugify(data.title)}-${existing.id.slice(-4)}` : existing.slug,
      content: data.content || existing.content,
      excerpt: data.excerpt !== undefined ? data.excerpt : existing.excerpt,
      featuredImage: data.featuredImage !== undefined ? data.featuredImage : existing.featuredImage,
      featuredImageCaption: data.featuredImageCaption !== undefined ? data.featuredImageCaption : existing.featuredImageCaption,
      photoSource: data.photoSource !== undefined ? data.photoSource : existing.photoSource,
      source: data.source !== undefined ? data.source : existing.source,
      categoryId: `rubrik-${rubrik.slug}`,
      categoryName: rubrik.name,
      categorySlug: rubrik.slug,
      tags: data.tags || existing.tags,
      updatedAt: now,
    };

    contributorArticlesStore[existingIndex] = updated;
    return updated;
  }

  // Create new draft
  const newId = `art-contrib-${Date.now()}`;
  const newSlug = `${slugify(data.title || "draf-artikel")}-${newId.slice(-4)}`;

  const newArticle: ContributorArticleItem = {
    id: newId,
    authorId: userId,
    title: data.title || "Draf Artikel Baru",
    slug: newSlug,
    content: data.content || "",
    excerpt: data.excerpt || null,
    featuredImage: data.featuredImage || null,
    featuredImageCaption: data.featuredImageCaption || null,
    photoSource: data.photoSource || null,
    source: data.source || null,
    categoryId: `rubrik-${rubrik.slug}`,
    categoryName: rubrik.name,
    categorySlug: rubrik.slug,
    status: "DRAFT",
    adminNote: null,
    tags: data.tags || [],
    views: 0,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  contributorArticlesStore.unshift(newArticle);
  return newArticle;
}

/**
 * Submit article to editorial review
 * Allowed only from DRAFT or REVISION status!
 */
export async function submitArticleToReview(
  articleId: string,
  userId: string
): Promise<ContributorArticleItem> {
  const existingIndex = contributorArticlesStore.findIndex(
    (a) => a.id === articleId && a.authorId === userId
  );

  if (existingIndex === -1) {
    throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
  }

  const existing = contributorArticlesStore[existingIndex];

  if (existing.status !== "DRAFT" && existing.status !== "REVISION") {
    throw new Error(`Artikel dengan status ${existing.status} tidak dapat diajukan ke review`);
  }

  const updated: ContributorArticleItem = {
    ...existing,
    status: "REVIEW",
    updatedAt: new Date().toISOString(),
  };

  contributorArticlesStore[existingIndex] = updated;
  return updated;
}

/**
 * Delete draft article
 * Strict rule: only DRAFT status can be deleted!
 */
export async function deleteArticleDraft(
  articleId: string,
  userId: string
): Promise<boolean> {
  const existingIndex = contributorArticlesStore.findIndex(
    (a) => a.id === articleId && a.authorId === userId
  );

  if (existingIndex === -1) {
    throw new Error("Artikel tidak ditemukan atau Anda tidak memiliki akses");
  }

  const existing = contributorArticlesStore[existingIndex];

  if (existing.status !== "DRAFT") {
    throw new Error("Hanya artikel berstatus Draf yang dapat dihapus");
  }

  contributorArticlesStore.splice(existingIndex, 1);
  return true;
}

/**
 * Get profile of contributor from Prisma database
 */
export async function getContributorProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      return {
        id: user.id,
        name: user.name,
        penName: user.penName,
        slug: user.slug,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      };
    }
  } catch (error) {
    console.error("Error in getContributorProfile:", error);
  }
  return null;
}

/**
 * Update profile of contributor in Prisma database
 */
export async function updateContributorProfile(
  userId: string,
  data: ProfileInput
) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      penName: data.penName || null,
      bio: data.bio || null,
      ...(data.avatarUrl ? { avatarUrl: data.avatarUrl } : {}),
    },
  });

  return {
    id: updated.id,
    name: updated.name,
    penName: updated.penName,
    slug: updated.slug,
    email: updated.email,
    bio: updated.bio,
    avatarUrl: updated.avatarUrl,
  };
}

export { contributorArticlesStore };


