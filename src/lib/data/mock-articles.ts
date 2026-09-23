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

export const MOCK_AUTHORS = [
  {
    name: "Arya Wicaksono",
    penName: "Arya W.",
    slug: "arya-wicaksono",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Jurnalis investigasi dan peminat isu kebijakan publik, lingkungan hidup, dan tata kelola perkotaan.",
    role: "Redaktur Senior",
  },
  {
    name: "Dian Paramita",
    penName: null,
    slug: "dian-paramita",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Peneliti data sosial dan pengamat dinamika pendidikan tinggi serta masa depan anak muda.",
    role: "Penulis Redaksi",
  },
  {
    name: "Reza Mahendra",
    penName: "Reza M.",
    slug: "reza-mahendra",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Pecinta sejarah lokal, sastra Nusantara, dan tradisi seni rakyat di berbagai pelosok Indonesia.",
    role: "Kontributor Khusus",
  },
  {
    name: "Nadia Safitri",
    penName: null,
    slug: "nadia-safitri",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Menulis seputar sains populer, kecerdasan buatan, teknologi terbuka, dan gerakan mahasiswa.",
    role: "Editor Rubrik Esok",
  },
];

export const MOCK_RUBRIKS = [
  {
    name: "KABAR",
    slug: "kabar",
    question: "Apa yang sedang terjadi?",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Berita aktual dan peristiwa terkini seputar nasional, daerah, politik, ekonomi, hukum, dan isu publik.",
  },
  {
    name: "BEDAH",
    slug: "bedah",
    question: "Apa yang sebenarnya ada di balik kabar tersebut?",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Analisis mendalam, data, konteks, dan penjelasan di balik peristiwa penting.",
  },
  {
    name: "SISI",
    slug: "sisi",
    question: "Bagaimana jika kita melihatnya dari sisi yang berbeda?",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Perspektif berbeda dan sudut pandang alternatif dari isu yang sedang ramai diperbincangkan.",
  },
  {
    name: "NADI",
    slug: "nadi",
    question: "Bagaimana sebuah isu dirasakan oleh masyarakat?",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Kehidupan masyarakat, fenomena sosial, dan keresahan publik dalam realitas sehari-hari.",
  },
  {
    name: "CERITA",
    slug: "cerita",
    question: "Siapa manusia di balik sebuah peristiwa?",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Human interest, sosok inspiratif, komunitas, dan kisah perjalanan hidup.",
  },
  {
    name: "JEJAK",
    slug: "jejak",
    question: "Dari mana kita berasal dan apa yang membentuk kita?",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    description: "Budaya, seni, tradisi lokal, sejarah peradaban, dan warisan identitas Nusantara.",
  },
  {
    name: "ESOK",
    slug: "esok",
    question: "Ke mana generasi berikutnya bergerak?",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    description: "Pendidikan, mahasiswa, pelajar, inovasi teknologi, kreativitas, dan masa depan anak muda.",
  },
  {
    name: "SUARA",
    slug: "suara",
    question: "Apa gagasan dan pemikiran terbukamu?",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    description: "Kolom opini, esai kritis, gagasan terbuka, dan ruang pertukaran ide kontributor.",
  },
];

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: "art-1",
    title: "Mengurai Benang Kusut Krisis Transportasi Publik: Antara Janji Integrasi dan Realitas Tiket",
    slug: "mengurai-benang-kusut-krisis-transportasi-publik",
    excerpt: "Di balik klaim integrasi antarmoda perkotaan yang gencar disosialisasikan, para komuter harian masih harus berjibaku dengan tarif tersembunyi dan disparitas jadwal.",
    content: `
      <p class="lead">Setiap pukul enam pagi di salah satu stasiun penyangga ibu kota, gelombang ribuan pekerja berdiri dalam antrean yang nyaris tak bergerak. Bagi mereka, transportasi publik bukan sekadar moda mobilitas harian, melainkan pertarungan stamina sebelum jam kerja bahkan dimulai.</p>
      
      <h3>Janji Integrasi yang Masih Berjarak</h3>
      <p>Dalam dua tahun terakhir, narasi integrasi antarmoda transportasi kerap diglorifikasi sebagai lompatan besar tata kota modern. Namun, apabila kita menengok fakta lapangan lebih dekat, terdapat jurang yang cukup lebar antara rencana di atas kertas dan pengalaman empiris masyarakat komuter.</p>
      <p>Masalah mendasar terletak pada integrasi tarif dan waktu tunggu. Seorang pekerja asal Depok yang berkantor di kawasan Jakarta Pusat rata-rata harus mengganti tiga moda transportasi berbeda, dengan akumulasi pengeluaran harian yang menyerap hingga 25 persen dari upah minimum per bulan.</p>
      
      <blockquote>
        "Integrasi tanpa keterjangkauan tarif dan ketepatan waktu hanyalah fatamorgana estetika perkotaan." — Pengamat Kebijakan Transportasi
      </blockquote>

      <h3>Tantangan di Luar Pusat Kota</h3>
      <p>Disparitas ini kian terasa ketika kita melangkah keluar dari koridor utama pusat bisnis. Jaringan transportasi pengumpan (feeder) masih sangat terbatas, memaksa mayoritas warga kembali bergantung pada kendaraan roda dua pribadi.</p>
      <p>Untuk benar-benar mewujudkan sistem transportasi yang adil, pemerintah daerah dan operator harus berani menempatkan kenyamanan komuter lapis bawah sebagai tolok ukur utama keberhasilan, bukan semata seremoni peluncuran rute baru.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Ratusan penumpang bersiap menaiki kereta komuter di stasiun transit saat jam sibuk pagi.",
    photoSource: "Unsplash / Transportasi Dokumenter",
    source: "Liputan Lapangan Tim Redaksi NALAR",
    rubrik: MOCK_RUBRIKS[0], // KABAR
    author: MOCK_AUTHORS[0],
    tags: ["Transportasi", "Kebijakan Publik", "Perkotaan", "Infrastruktur"],
    views: 4820,
    isEditorPick: true,
    isFeatured: true,
    publishedAt: "2026-03-20T08:30:00Z",
    seoTitle: "Mengurai Benang Kusut Krisis Transportasi Publik | NALAR",
    metaDescription: "Analisis tajam seputar integrasi antarmoda perkotaan dan beban riil masyarakat komuter.",
  },
  {
    id: "art-2",
    title: "Bedah Biaya Pendidikan Tinggi: Mengapa Kuliah Terasa Semakin Mewah bagi Generasi Z?",
    slug: "bedah-biaya-pendidikan-tinggi-kenapa-kuliah-semakin-mewah",
    excerpt: "Membedah struktur alokasi anggaran perguruan tinggi negeri berbadan hukum dan dampaknya terhadap lonjakan iuran serta kecemasan masa depan mahasiswa.",
    content: `
      <p class="lead">Gelar sarjana yang dulu digadang-gadang sebagai eskalator mobilitas sosial kini semakin terasa seperti barang mewah yang hanya mampu ditebus segelintir kelompok ekonomi mapan.</p>
      
      <h3>Anatomi Anggaran PTN-BH</h3>
      <p>Pergeseran status perguruan tinggi menjadi badan hukum menuntut kampus mencari sumber pendanaan mandiri. Sayangnya, diversifikasi pendapatan kampus kerap berujung pada penyesuaian Uang Kuliah Tunggal (UKT) golongan atas yang merembet ke segmen menengah.</p>
      <p>Berdasarkan data yang dihimpun NALAR, porsi bantuan operasional dari anggaran negara mengalami pergeseran rasio dibanding dekade sebelumnya, sementara biaya operasional riset dan fasilitas teknologi melonjak tajam.</p>

      <h3>Kecemasan yang Membayangi Bangku Kuliah</h3>
      <p>Bagi mahasiswa dari keluarga kelas pekerja, kuliah kini dibayangi oleh dilema pinjaman pendidikan dan keharusan bekerja paruh waktu ekstra keras, yang pada akhirnya mengorbankan kualitas penyerapan ilmu dan kesehatan mental.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Mahasiswa berdiskusi di perpustakaan kampus di tengah sorotan kenaikan biaya operasional akademik.",
    photoSource: "Unsplash / Kampus Edukasi",
    source: "Data Litbang NALAR & Riset Kemitraan Akademik",
    rubrik: MOCK_RUBRIKS[1], // BEDAH
    author: MOCK_AUTHORS[1],
    tags: ["Pendidikan", "Ekonomi Kampus", "Generasi Z", "Mahasiswa"],
    views: 6150,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-21T10:15:00Z",
  },
  {
    id: "art-3",
    title: "Melawan Jebakan Kecepatan: Mengapa Perlambatan Bukan Tanda Kekalahan",
    slug: "melawan-jebakan-kecepatan-mengapa-perlambatan-bukan-kekalahan",
    excerpt: "Dalam budaya serba instan yang mendewakan produktivitas tiada henti, mengambil jeda justru menjadi tindakan perlawanan paling radikal untuk memulihkan nalar.",
    content: `
      <p class="lead">Kita hidup di era di mana setiap detik dituntut untuk menghasilkan output terukur. Mulai dari linimasa media sosial hingga meja kantor, kecepatan disamakan dengan kesuksesan.</p>
      
      <h3>Ilusi Akselerasi Konstan</h3>
      <p>Ketika algoritma memaksa kita mengonsumsi kabar dalam potongan 15 detik, kemampuan kita untuk menimbang konteks, mengendapkan makna, dan berefleksi perlahan-lahan tergerus.</p>
      <p>Melihat peristiwa dari sisi yang berbeda membutuhkan keheningan dan kerelaan untuk tidak langsung bereaksi. Menolak tergesa-gesa bukanlah bentuk ketertinggalan, melainkan cara kita menyelamatkan akal sehat.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Seseorang menikmati momen hening di ruang baca yang tenang.",
    photoSource: "Unsplash / Gaya Hidup",
    source: "Refleksi Redaksi NALAR",
    rubrik: MOCK_RUBRIKS[2], // SISI
    author: MOCK_AUTHORS[0],
    tags: ["Perspektif", "Kesehatan Mental", "Filsafat Hidup", "Kritik Budaya"],
    views: 3200,
    isEditorPick: false,
    isFeatured: false,
    publishedAt: "2026-03-22T04:00:00Z",
  },
  {
    id: "art-4",
    title: "Catatan di Balik Timbangan Warung: Bagaimana Ibu-Ibu Mengarungi Badai Sembako",
    slug: "catatan-di-balik-timbangan-warung-mengarungi-badai-sembako",
    excerpt: "Di warung-warung kelontong sempit pinggiran kota, fluktuasi harga pangan bukan sekadar angka statistik BPS, melainkan strategi bertahan hidup paling nyata.",
    content: `
      <p class="lead">Bagi Bu Sumarni (52), setiap kenaikan seribu rupiah pada harga minyak goreng atau cabai rawit adalah teka-teki matematika rumit yang harus diselesaikan sebelum azan subuh berkumandang.</p>
      
      <h3>Strategi di Ujung Talenan</h3>
      <p>Di warungnya yang berukuran 3x4 meter di perkampungan padat, ia harus pandai menyiasati menu tanpa mengecewakan para pelanggan setia yang juga sesama buruh harian.</p>
      <p>Denyut keresahan ini jarang tercermin dalam grafik ekonomi makro, namun di sinilah sesungguhnya ketahanan ekonomi sebuah bangsa diuji setiap hari.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Aktivitas transaksi di pasar tradisional dengan jejeran komoditas bahan pokok.",
    photoSource: "Unsplash / Pasar Tradisional",
    source: "Wawancara Langsung di Kawasan Cipinang",
    rubrik: MOCK_RUBRIKS[3], // NADI
    author: MOCK_AUTHORS[1],
    tags: ["Masyarakat", "Ekonomi Kerakyatan", "Keseharian", "Pangan"],
    views: 4120,
    isEditorPick: false,
    isFeatured: false,
    publishedAt: "2026-03-22T13:45:00Z",
  },
  {
    id: "art-5",
    title: "Pak Slamet dan Perahu Pustaka: Membelah Muara Demi Menyalakan Lentera Literasi",
    slug: "pak-slamet-dan-perahu-pustaka-lentera-literasi-pesisir",
    excerpt: "Dengan perahu motor tua warisan ayahnya, pria berusia 58 tahun ini rutin berlayar menyusuri perkampungan nelayan terpencil untuk mengantarkan buku bacaan gratis bagi anak-anak.",
    content: `
      <p class="lead">Ketika perahu bermesin tempel itu mulai mendekati dermaga kayu desa muara, sorak anak-anak kecil berseragam kusam menyambutnya riuh. Di lambung perahu itu tertulis rapi: 'Perahu Pustaka Samudra'.</p>
      
      <h3>Dedikasi Tanpa Pamrih</h3>
      <p>Pak Slamet bukanlah pejabat pendidikan atau akademisi bergelar tinggi. Ia hanya seorang nelayan yang meyakini bahwa anak-anak nelayan di kampungnya berhak bermimpi melampaui garis cakrawala laut mereka.</p>
      <p>Lebih dari 1.500 buku bekas ia kumpulkan secara swadaya selama tujuh tahun terakhir, menjadi jembatan jendela dunia bagi generasi pelaut masa depan.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Anak-anak pesisir berkumpul membaca buku di dermaga kayu.",
    photoSource: "Unsplash / Human Interest",
    source: "Liputan Cerita NALAR di Pesisir Utara Jawa",
    rubrik: MOCK_RUBRIKS[4], // CERITA
    author: MOCK_AUTHORS[2],
    tags: ["Human Interest", "Literasi", "Pendidikan Anak", "Kisah Nyata"],
    views: 5740,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-21T07:20:00Z",
  },
  {
    id: "art-6",
    title: "Aksara yang Tak Pernah Pudar: Merawat Jejak Manuskrip Lontar di Kaki Gunung Slamet",
    slug: "aksara-yang-tak-pernah-pudar-merawat-lontar-lereng-slamet",
    excerpt: "Di tengah gempuran digitalisasi, sekelompok pemuda desa mendedikasikan waktu mereka untuk mengonservasi ribuan lembar daun lontar kuno yang menyimpan kearifan obat dan ekologi Nusantara.",
    content: `
      <p class="lead">Di sebuah pendopo sederhana yang harum oleh aroma cengkih dan minyak kemiri, lembar-lembar daun lontar berusia ratusan tahun dibersihkan dengan kuas lembut helai demi helai.</p>
      
      <h3>Kearifan Ekologi yang Tersembunyi</h3>
      <p>Manuskrip kuno ini bukan benda mati pemuja masa lalu. Di dalamnya tersimpan catatan teliti mengenai sistem pranata mangsa, mitigasi banjir tradisional, dan formula obat-obatan herbal lokal yang masih sangat relevan dengan krisis iklim saat ini.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Koleksi manuskrip dan lembaran arsip sejarah Nusantara.",
    photoSource: "Unsplash / Warisan Budaya",
    source: "Dokumentasi Komunitas Manuskrip Lestari",
    rubrik: MOCK_RUBRIKS[5], // JEJAK
    author: MOCK_AUTHORS[2],
    tags: ["Budaya", "Sejarah", "Manuskrip", "Kearifan Lokal"],
    views: 2950,
    isEditorPick: false,
    isFeatured: false,
    publishedAt: "2026-03-19T11:00:00Z",
  },
  {
    id: "art-7",
    title: "Membangun AI dari Garasi Kampus: Inovasi Mahasiswa Daerah Menembus Panggung Global",
    slug: "membangun-ai-dari-garasi-kampus-inovasi-mahasiswa-daerah",
    excerpt: "Tanpa server bernilai miliaran, tim mahasiswa teknik ini mengembangkan model pengenalan penyakit tanaman padi berbasis edge computing yang kini diadopsi ratusan petani lokal.",
    content: `
      <p class="lead">Dengan laptop rakitan bekas dan ruangan sempit berukuran 4x3 meter, tiga mahasiswa jurusan teknik informatika membuktikan bahwa keterbatasan infrastruktur bukanlah penghalang untuk melahirkan inovasi yang berdampak nyata.</p>
      
      <h3>Teknologi yang Membumi</h3>
      <p>Mereka menciptakan aplikasi deteksi hama yang dapat bekerja 100% luring (offline) tanpa kuota internet di tengah sawah. Model kecerdasan buatan dikompresi sedemikian rupa agar dapat berjalan mulus di ponsel pintar terjangkau milik para petani.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Tim mahasiswa teknologi sedang melakukan uji coba kode kecerdasan buatan.",
    photoSource: "Unsplash / Inovasi Muda",
    source: "Wawancara Tim Riset Mahasiswa",
    rubrik: MOCK_RUBRIKS[6], // ESOK
    author: MOCK_AUTHORS[3],
    tags: ["Teknologi", "Mahasiswa", "Kecerdasan Buatan", "Inovasi Pertanian"],
    views: 7420,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-22T09:10:00Z",
  },
  {
    id: "art-8",
    title: "Merawat Daya Kritis di Tengah Banjir Halusinasi Kecerdasan Buatan",
    slug: "merawat-daya-kritis-di-tengah-banjir-halusinasi-ai",
    excerpt: "Ketika mesin semakin pintar merangkai kalimat meyakinkan yang belum tentu benar, tugas manusia bukan lagi sekadar menghafal informasi, melainkan mempertanyakan dasar fakta.",
    content: `
      <p class="lead">Di era generative AI, memproduksi 10.000 kata membutuhkan waktu kurang dari 30 detik. Namun, berapa banyak dari kata-kata tersebut yang lahir dari kesadaran mendalam dan verifikasi faktual?</p>
      
      <h3>Bahaya Kepasifan Berpikir</h3>
      <p>Kecerdasan buatan dirancang untuk menyenangkan kita dengan probabilitas bahasa, bukan kebenaran hakiki. Jika kita menerima setiap jawaban mesin tanpa menguji sumbernya, kita sedang merelakan kapasitas terpenting manusia: daya nalar.</p>
      <p>Membaca kritis, memverifikasi silang, dan berani bersikap skeptis secara etis adalah benteng terakhir integritas intelektual kita di abad ke-21.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Gambaran reflektif mengenai relasi antara pemikiran manusia dan arus teknologi digital.",
    photoSource: "Unsplash / Esai Visual",
    source: "Kolom Opini NALAR",
    rubrik: MOCK_RUBRIKS[7], // SUARA
    author: MOCK_AUTHORS[3],
    tags: ["Opini", "Kecerdasan Buatan", "Literasi Digital", "Nalar Kritis"],
    views: 3880,
    isEditorPick: false,
    isFeatured: false,
    publishedAt: "2026-03-20T16:00:00Z",
  },
];
