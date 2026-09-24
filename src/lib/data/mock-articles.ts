export interface MockArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageCaption: string;
  photoSource: string;
  source: string;
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
    name: "BERISIK",
    slug: "berisik",
    question: "Dunia memang sudah terlalu berisik untuk ditanggapi dengan bisik-bisik.",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
    description:
      "Ruang untuk esai populer yang membicarakan politik, ekonomi, sosial, budaya, isu aktual, dan segala kegaduhan yang sedang beredar. Berisik tidak punya kewajiban untuk selalu tenang, netral, atau terdengar akademis. Di sini, gagasan boleh tajam, pendapat boleh nyeleneh, dan keresahan boleh disuarakan tanpa harus mengenakan jas intelektual. Sebab dunia memang sudah terlalu berisik untuk ditanggapi dengan bisik-bisik.",
  },
  {
    name: "MEJA WARKOP",
    slug: "meja-warkop",
    question: "Semua orang punya teori setelah dua gelas kopi.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description:
      "Semua orang punya teori setelah dua gelas kopi. Meja Warkop adalah ruang untuk analisis, percakapan liar, pembacaan fenomena, dan segala macam kesimpulan yang lahir dari tongkrongan. Tidak selalu benar, tidak selalu serius, tetapi selalu berusaha melihat sesuatu dari sudut yang jarang dilirik. Karena kadang, pembicaraan paling ngawur justru membuka pertanyaan yang paling masuk akal.",
  },
  {
    name: "ORDAL",
    slug: "ordal",
    question: "Sedikit gosip, sedikit curiga, sisanya kita bongkar.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    description:
      "Politik punya banyak pintu, dan sebagian di antaranya cuma bisa dibuka dari dalam. Ordal membicarakan gosip politik, pemerintahan, kekuasaan, elite, birokrasi, dan segala cerita yang beredar di balik meja-meja resmi. Bukan sekadar mencari siapa dekat dengan siapa, tetapi membaca bagaimana kekuasaan bekerja melalui hubungan, kepentingan, dan bisik-bisik yang jarang masuk konferensi pers. Sedikit gosip, sedikit curiga, sisanya kita bongkar.",
  },
  {
    name: "ARSIP PINGGIRAN",
    slug: "arsip-pinggiran",
    question:
      "Sebuah bangsa tidak hanya dibentuk oleh mereka yang berdiri di podium, tetapi juga oleh mereka yang berdiri di jalan.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    description:
      "Sejarah tidak selalu tinggal di buku pelajaran. Arsip Pinggiran menyimpan cerita tentang sejarah, gerakan rakyat, kehidupan urban dan pedesaan, komunitas, serta mereka yang sering hanya menjadi catatan kaki dalam cerita besar. Di sini, pinggiran bukan sekadar tempat, melainkan sudut pandang. Sebab sebuah bangsa tidak hanya dibentuk oleh mereka yang berdiri di podium, tetapi juga oleh mereka yang berdiri di jalan.",
  },
  {
    name: "SEDIKIT AKADEMIS",
    slug: "sedikit-akademis",
    question:
      "Berpikir tidak berhenti sebagai hobi orang yang punya rak buku terlalu banyak.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description:
      "Teori, filsafat, buku, dan gagasan-gagasan serius—tetapi tidak harus dibungkus bahasa yang membuat orang ingin tidur. Sedikit Akademis mencoba membawa pemikiran besar keluar dari ruang seminar dan menaruhnya di meja yang lebih dekat dengan kehidupan sehari-hari. Kami tidak berjanji selalu pintar, hanya berusaha agar berpikir tidak berhenti sebagai hobi orang yang punya rak buku terlalu banyak.",
  },
  {
    name: "SISA BAHASA",
    slug: "sisa-bahasa",
    question:
      "Setelah semua teori selesai bicara, kadang yang tersisa hanyalah bahasa.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description:
      "Ada hal-hal yang terlalu rumit untuk dijelaskan lewat berita dan terlalu manusiawi untuk diselesaikan dengan teori. Sisa Bahasa adalah ruang untuk puisi, cerpen, prosa, fragmen, dan segala bentuk sastra yang lahir dari sisa-sisa pengalaman manusia. Tentang cinta, kehilangan, kemarahan, kesepian, kota, tubuh, dan kekacauan kecil yang sering tidak punya nama. Sebab setelah semua teori selesai bicara, kadang yang tersisa hanyalah bahasa.",
  },
  {
    name: "SETARA",
    slug: "setara",
    question:
      "Perempuan bukan catatan kaki, dan kesetaraan bukan hadiah dari mereka yang berkuasa.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    description:
      "Perempuan bukan catatan kaki, dan kesetaraan bukan hadiah dari mereka yang berkuasa. Setara adalah ruang untuk membicarakan perempuan, feminisme, tubuh, gender, patriarki, dan berbagai bentuk perjuangan melawan ketimpangan. Dari gerakan kolektif sampai pengalaman sehari-hari, dari politik tubuh sampai perkara yang dianggap “sepele”. Karena dunia yang adil bukan dunia tempat semua orang dibuat sama, melainkan tempat tidak ada yang dipaksa merasa lebih rendah.",
  },
  {
    name: "SERIAL ANABEL",
    slug: "serial-anabel",
    question:
      "Melihat dunia dari meja warkop, jalanan, kampus, sampai sudut-sudut kehidupan yang luput dari perhatian.",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Anwar dan Bella adalah dua orang yang kebetulan sering berada di tempat yang sama ketika dunia sedang berulah. Serial Anabel adalah kumpulan cerpen dan prosa yang terbit setiap minggu, mengangkat isu, kejadian, dan keresahan aktual melalui percakapan, pertemuan, dan kekacauan kecil dua tokohnya. Setiap cerita berdiri sendiri dan tidak bersambung, tetapi Anwar dan Bella tetap menjadi dua orang yang membawa pembaca melihat dunia dari meja warkop, jalanan, kampus, sampai sudut-sudut kehidupan yang sering luput dari perhatian.",
  },
];


export const MOCK_ARTICLES: MockArticle[] = [];
