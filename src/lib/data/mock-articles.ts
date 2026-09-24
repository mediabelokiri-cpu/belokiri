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
    role: "Agen Belokan Senior",
  },
  {
    name: "Dian Paramita",
    penName: null,
    slug: "dian-paramita",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Peneliti data sosial dan pengamat dinamika pendidikan tinggi serta masa depan anak muda.",
    role: "Agen Belokan",
  },
  {
    name: "Reza Mahendra",
    penName: "Reza M.",
    slug: "reza-mahendra",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Pecinta sejarah lokal, sastra Nusantara, dan tradisi seni rakyat di berbagai pelosok Indonesia.",
    role: "Warga Belokan",
  },
  {
    name: "Nadia Safitri",
    penName: null,
    slug: "nadia-safitri",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Menulis seputar sains populer, kecerdasan buatan, teknologi terbuka, dan gerakan mahasiswa.",
    role: "Agen Belokan",
  },
];

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
    source: "Liputan Lapangan Tim Agen Belokan BELOKIRI",
    rubrik: MOCK_RUBRIKS[0], // BERISIK
    author: MOCK_AUTHORS[0],
    tags: ["Transportasi", "Kebijakan Publik", "Perkotaan", "Infrastruktur"],
    views: 4820,
    isEditorPick: true,
    isFeatured: true,
    publishedAt: "2026-03-20T08:30:00Z",
    seoTitle: "Mengurai Benang Kusut Krisis Transportasi Publik | BELOKIRI",
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
      <p>Berdasarkan data yang dihimpun tim BELOKIRI, porsi bantuan operasional dari anggaran negara mengalami pergeseran rasio dibanding dekade sebelumnya, sementara biaya operasional riset dan fasilitas teknologi melonjak tajam.</p>

      <h3>Kecemasan yang Membayangi Bangku Kuliah</h3>
      <p>Bagi mahasiswa dari keluarga kelas pekerja, kuliah kini dibayangi oleh dilema pinjaman pendidikan dan keharusan bekerja paruh waktu ekstra keras, yang pada akhirnya mengorbankan kualitas penyerapan ilmu dan kesehatan mental.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Mahasiswa berdiskusi di perpustakaan kampus di tengah sorotan kenaikan biaya operasional akademik.",
    photoSource: "Unsplash / Kampus Edukasi",
    source: "Data Litbang BELOKIRI & Riset Kemitraan Akademik",
    rubrik: MOCK_RUBRIKS[1], // MEJA WARKOP
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
    source: "Refleksi Agen Belokan BELOKIRI",
    rubrik: MOCK_RUBRIKS[2], // ORDAL
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
    rubrik: MOCK_RUBRIKS[3], // ARSIP PINGGIRAN
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
    source: "Liputan Cerita BELOKIRI di Pesisir Utara Jawa",
    rubrik: MOCK_RUBRIKS[4], // SEDIKIT AKADEMIS
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
    rubrik: MOCK_RUBRIKS[5], // SISA BAHASA
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
    rubrik: MOCK_RUBRIKS[6], // SETARA
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
    source: "Kolom Esai BELOKIRI",
    rubrik: MOCK_RUBRIKS[7], // SERIAL ANABEL
    author: MOCK_AUTHORS[3],
    tags: ["Opini", "Kecerdasan Buatan", "Literasi Digital", "Nalar Kritis"],
    views: 3880,
    isEditorPick: false,
    isFeatured: false,
    publishedAt: "2026-03-20T16:00:00Z",
  },
  {
    id: "art-9",
    title: "Teori Kopi Tubruk: Kenapa Masalah Negara Lebih Cepat Kelar di Meja Warkop?",
    slug: "teori-kopi-tubruk-masalah-negara-kelar-di-warkop",
    excerpt: "Dua cangkir robusta pekat, kepulan kretek, dan empat orang yang tak saling kenal bisa merumuskan solusi krisis subsidi pangan lebih cepat dari rapat lintas kementerian.",
    content: `
      <p class="lead">Warkop bukan sekadar tempat nongkrong murah; ia adalah gedung parlemen tanpa karpet merah, tanpa tunjangan rumah, dan tanpa absensi bodong.</p>
      
      <h3>Demokrasi Tanpa Protokoler</h3>
      <p>Di meja warkop kayu yang sedikit goyang, gelar profesor dan lulusan SMP berdiri setara di depan sepiring gorengan hangat. Ketika berita televisi tabung di sudut ruangan menyiarkan kenaikan harga beras, analisis yang keluar bukan rumus regresi berganda, melainkan hitungan dompet riil seorang supir pikap dan buruh konveksi.</p>
      <p>Tidak ada yang perlu menjaga wibawa institusi. Siapa saja boleh bersuara keras, asal siap ditertawakan kalau argumennya terlalu mengada-ada. Dan ajaibnya, justru di ruang tanpa rasa takut itulah kebenaran kerap muncul telanjang tanpa polesan juru bicara.</p>

      <blockquote>
        "Kalau kebijakan publik tidak bisa dipahami penjaga warkop dalam sepuluh detik, kemungkinan besar kebijakan itu memang cuma akal-akalan birokrasi."
      </blockquote>

      <h3>Seni Mendengar yang Hilang di Senayan</h3>
      <p>Pelajaran terbesar dari meja warkop bukan seberapa banyak teori yang dilontarkan, tetapi kerelaan orang-orang untuk saling mendengarkan setelah saling ledek. Sesuatu yang tampaknya sudah punah dari ruang-ruang pendingin berpelapis marmer kekuasaan.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Secangkir kopi panas dan percakapan lepas di warkop pinggir jalan.",
    photoSource: "Unsplash / Tongkrongan Urban",
    source: "Observasi Lepas Warga Belokan",
    rubrik: MOCK_RUBRIKS[1], // MEJA WARKOP
    author: MOCK_AUTHORS[1],
    tags: ["Warkop", "Kebijakan Publik", "Generasi Z"],
    views: 5210,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-23T10:15:00Z",
  },
  {
    id: "art-10",
    title: "Ordal dan Labirin Kekuasaan: Siapa Menjaga Pintu di Balik Konferensi Pers?",
    slug: "ordal-dan-labirin-kekuasaan-siapa-menjaga-pintu",
    excerpt: "Di balik podium menteri yang berkilau, ada transaksi tak tertulis, lobi lorong sempit, dan jaringan 'orang dalam' yang menentukan nasib ratusan triliun uang rakyat.",
    content: `
      <p class="lead">Konferensi pers adalah panggung teater yang ditata rapi. Tetapi jalannya pertunjukan sesungguhnya ditentukan oleh orang-orang yang tidak pernah berada di depan lampu sorot.</p>
      
      <h3>Anatomi 'Ordal' di Lingkaran Pengambil Keputusan</h3>
      <p>Di birokrasi kita, istilah ordal bukan sekadar titipan lowongan kerja, melainkan jejaring perantara kekuasaan. Mulai dari vendor pengadaan hingga pengamanan konsesi sumber daya alam, semua memiliki pintu masuk khusus yang tidak ada dalam bagan struktur organisasi resmi kementerian.</p>
      
      <blockquote>
        "Kekuasaan formal hanyalah stempel. Tinta dan kertasnya sudah disiapkan tiga hari sebelumnya di ruang makan privat hotel berbintang."
      </blockquote>

      <h3>Membongkar yang Tersembunyi</h3>
      <p>Belokiri menolak memandang politik hanya dari apa yang diucapkan di mikrofon. Kami melacak jejak audit anggaran, afiliasi kepemilikan perseroan, dan irisan keluarga yang saling menyambung dalam pusaran APBD dan APBN.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Gedung pencakar langit ibu kota tempat berlangsungnya lobi dan kesepakatan tertutup.",
    photoSource: "Unsplash / Gedung Pusat",
    source: "Investigasi Meja Agen Belokan BELOKIRI",
    rubrik: MOCK_RUBRIKS[2], // ORDAL
    author: MOCK_AUTHORS[0],
    tags: ["Birokrasi", "Kekuasaan", "Investigasi"],
    views: 7420,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-23T14:30:00Z",
  },
  {
    id: "art-11",
    title: "Beban Ganda yang Tak Masuk APBN: Keringat Tak Berbayar Perempuan Pekerja",
    slug: "beban-ganda-tak-masuk-apbn-keringat-perempuan-pekerja",
    excerpt: "Perempuan bukan catatan kaki. Perekonomian nasional akan lumpuh total dalam 24 jam jika kerja perawatan, pengasuhan, dan domestik perempuan mogok serentak.",
    content: `
      <p class="lead">Pukul empat subuh, saat para pembuat kebijakan masih mendengkur di bawah pendingin ruangan, jutaan ibu di penjuru negeri sudah menyalakan kompor, mencuci seragam, dan memastikan anak-anak siap menyongsong masa depan.</p>
      
      <h3>Kerja Perawatan: Tulang Punggung Ekonomi yang Dianggap 'Nol'</h3>
      <p>Dalam perhitungan Produk Domestik Bruto (PDB), memasak makanan di rumah bernilai nol. Mengasuh balita bernilai nol. Merawat lansia bernilai nol. Tetapi jika perempuan mogok melakukan kerja-kerja ini barang sehari saja, seluruh angkatan kerja laki-laki tidak akan bisa melangkah keluar pintu rumah.</p>
      
      <blockquote>
        "Menuntut kesetaraan bukan meminta keringanan tugas, melainkan merombak tatanan sosial yang mengeksploitasi kasih sayang sebagai tenaga kerja gratis."
      </blockquote>
    `,
    featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Perempuan pekerja mandiri berdiskusi dalam forum komunitas.",
    photoSource: "Unsplash / Potret Perempuan",
    source: "Kolaborasi Rubrik Setara BELOKIRI",
    rubrik: MOCK_RUBRIKS[6], // SETARA
    author: MOCK_AUTHORS[3],
    tags: ["Gender", "Feminisme", "Kebijakan Publik"],
    views: 5670,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-23T16:00:00Z",
  },
  {
    id: "art-12",
    title: "Serial Anabel: Anwar, Bella, dan Rahasia Botol Kecap Kedaluwarsa",
    slug: "serial-anabel-anwar-bella-rahasia-botol-kecap",
    excerpt: "Anwar yakin label kecap manis di warung pecel lele adalah metafora runtuhnya oligarki pangan. Bella cuma mau makan malam dengan tenang.",
    content: `
      <p class="lead">"Bel, lu pernah mikir nggak kenapa tutup botol kecap di warung tenda selalu mampet?" tanya Anwar sambil mengetuk-ngetukkan botol kaca ke meja kayu yang beralas terpal oranye.</p>
      
      <p>Bella melirik tajam tanpa melepaskan sendok bebeknya. "Nwar, gua bayar lele goreng ini pakai duit hasil lembur sampai jam delapan. Kalau lu mau ceramah soal geopolitik kedelai impor sekarang, gua tumpahin kuah soto ini ke jaket lu."</p>
      
      <h3>Teori Konspirasi Bumbu Dapur</h3>
      <p>"Gua serius, Bel! Ini bukan soal kedelai. Ini soal ilusi kelimpahan!" Anwar tetap berapi-api. "Pemerintah bilang swasembada, tapi pabrik kecap ini dimiliki konglomerasi yang saham terbesarnya dipegang perusahaan cangkang di Kepulauan Cayman. Kita ini makan manisnya hasil ekstraksi kapitalisme global!"</p>
      
      <p>Bella menghela napas panjang, merogoh tusuk gigi dari wadah plastik kecil, lalu menusuk lubang tutup botol kecap itu sekali dengan presisi seorang dokter bedah. Kecap hitam kental langsung mengucur deras ke atas piring Anwar.</p>
      
      <p>"Udah keluar kan kecapnya?" kata Bella datar. "Makan. Kebanyakan teori bikin lu kurus, Nwar."</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption: "Suasana santap malam di kedai makan pinggir jalan kota.",
    photoSource: "Unsplash / Kehidupan Kota",
    source: "Cerita Lepas Serial Anabel BELOKIRI",
    rubrik: MOCK_RUBRIKS[7], // SERIAL ANABEL
    author: MOCK_AUTHORS[2],
    tags: ["Serial Anabel", "Warkop", "Generasi Z"],
    views: 6890,
    isEditorPick: true,
    isFeatured: false,
    publishedAt: "2026-03-24T08:00:00Z",
  },
];

