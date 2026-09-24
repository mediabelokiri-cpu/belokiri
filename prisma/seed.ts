import { PrismaClient, Role, UserStatus, ArticleStatus } from "@prisma/client";
import { hashPassword } from "../src/lib/security/password";

const prisma = new PrismaClient();

// 1. 8 Rubrik Resmi BELOKIRI
const RUBRIKS = [
  {
    name: "BERISIK",
    slug: "berisik",
    description:
      "Ruang untuk esai populer yang membicarakan politik, ekonomi, sosial, budaya, isu aktual, dan segala kegaduhan yang sedang beredar. Berisik tidak punya kewajiban untuk selalu tenang, netral, atau terdengar akademis. Di sini, gagasan boleh tajam, pendapat boleh nyeleneh, dan keresahan boleh disuarakan tanpa harus mengenakan jas intelektual. Sebab dunia memang sudah terlalu berisik untuk ditanggapi dengan bisik-bisik.",
  },
  {
    name: "MEJA WARKOP",
    slug: "meja-warkop",
    description:
      "Semua orang punya teori setelah dua gelas kopi. Meja Warkop adalah ruang untuk analisis, percakapan liar, pembacaan fenomena, dan segala macam kesimpulan yang lahir dari tongkrongan. Tidak selalu benar, tidak selalu serius, tetapi selalu berusaha melihat sesuatu dari sudut yang jarang dilirik. Karena kadang, pembicaraan paling ngawur justru membuka pertanyaan yang paling masuk akal.",
  },
  {
    name: "ORDAL",
    slug: "ordal",
    description:
      "Politik punya banyak pintu, dan sebagian di antaranya cuma bisa dibuka dari dalam. Ordal membicarakan gosip politik, pemerintahan, kekuasaan, elite, birokrasi, dan segala cerita yang beredar di balik meja-meja resmi. Bukan sekadar mencari siapa dekat dengan siapa, tetapi membaca bagaimana kekuasaan bekerja melalui hubungan, kepentingan, dan bisik-bisik yang jarang masuk konferensi pers. Sedikit gosip, sedikit curiga, sisanya kita bongkar.",
  },
  {
    name: "ARSIP PINGGIRAN",
    slug: "arsip-pinggiran",
    description:
      "Sejarah tidak selalu tinggal di buku pelajaran. Arsip Pinggiran menyimpan cerita tentang sejarah, gerakan rakyat, kehidupan urban dan pedesaan, komunitas, serta mereka yang sering hanya menjadi catatan kaki dalam cerita besar. Di sini, pinggiran bukan sekadar tempat, melainkan sudut pandang. Sebab sebuah bangsa tidak hanya dibentuk oleh mereka yang berdiri di podium, tetapi juga oleh mereka yang berdiri di jalan.",
  },
  {
    name: "SEDIKIT AKADEMIS",
    slug: "sedikit-akademis",
    description:
      "Teori, filsafat, buku, dan gagasan-gagasan serius—tetapi tidak harus dibungkus bahasa yang membuat orang ingin tidur. Sedikit Akademis mencoba membawa pemikiran besar keluar dari ruang seminar dan menaruhnya di meja yang lebih dekat dengan kehidupan sehari-hari. Kami tidak berjanji selalu pintar, hanya berusaha agar berpikir tidak berhenti sebagai hobi orang yang punya rak buku terlalu banyak.",
  },
  {
    name: "SISA BAHASA",
    slug: "sisa-bahasa",
    description:
      "Ada hal-hal yang terlalu rumit untuk dijelaskan lewat berita dan terlalu manusiawi untuk diselesaikan dengan teori. Sisa Bahasa adalah ruang untuk puisi, cerpen, prosa, fragmen, dan segala bentuk sastra yang lahir dari sisa-sisa pengalaman manusia. Tentang cinta, kehilangan, kemarahan, kesepian, kota, tubuh, dan kekacauan kecil yang sering tidak punya nama. Sebab setelah semua teori selesai bicara, kadang yang tersisa hanyalah bahasa.",
  },
  {
    name: "SETARA",
    slug: "setara",
    description:
      "Perempuan bukan catatan kaki, dan kesetaraan bukan hadiah dari mereka yang berkuasa. Setara adalah ruang untuk membicarakan perempuan, feminisme, tubuh, gender, patriarki, dan berbagai bentuk perjuangan melawan ketimpangan. Dari gerakan kolektif sampai pengalaman sehari-hari, dari politik tubuh sampai perkara yang dianggap “sepele”. Karena dunia yang adil bukan dunia tempat semua orang dibuat sama, melainkan tempat tidak ada yang dipaksa merasa lebih rendah.",
  },
  {
    name: "SERIAL ANABEL",
    slug: "serial-anabel",
    description:
      "Anwar dan Bella adalah dua orang yang kebetulan sering berada di tempat yang sama ketika dunia sedang berulah. Serial Anabel adalah kumpulan cerpen dan prosa yang terbit setiap minggu, mengangkat isu, kejadian, dan keresahan aktual melalui percakapan, pertemuan, dan kekacauan kecil dua tokohnya. Setiap cerita berdiri sendiri dan tidak bersambung, tetapi Anwar dan Bella tetap menjadi dua orang yang membawa pembaca melihat dunia dari meja warkop, jalanan, kampus, sampai sudut-sudut kehidupan yang sering luput dari perhatian.",
  },
];

// 2. Akun Inti: Dewan Agen Belokan & Warga Belokan
const DEFAULT_PASSWORD_HASH = hashPassword("Brip@l007");

const USERS = [
  {
    email: "admin@belokiri.id",
    name: "Admin Belokiri",
    penName: "Admin Utama",
    slug: "admin-belokiri",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Administrator Utama BELOKIRI. Memegang kendali penuh atas manajemen konten, kurasi naskah, dan tata kelola platform.",
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "agen@belokiri.id",
    name: "Agen Belokan BELOKIRI",
    penName: "Dewan Agen Belokan",
    slug: "agen-belokan-belokiri",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Dewan Agen Belokan dan Tim Kurasi Naskah BELOKIRI. Memastikan setiap tulisan liar seperlunya, jenaka secukupnya.",
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "warga@belokiri.id",
    name: "Budi Santoso",
    penName: "Budi S.",
    slug: "budi-santoso",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    bio: "Warga Belokan aktif, penikmat kopi tubruk warkop, dan pemerhati dinamika sosial jalanan serta kebijakan publik.",
    role: Role.USER,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "arya@belokiri.id",
    name: "Arya Wicaksono",
    penName: "Arya W.",
    slug: "arya-wicaksono",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Jurnalis investigasi dan peminat isu kebijakan publik, lingkungan hidup, dan tata kelola perkotaan.",
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "dian@belokiri.id",
    name: "Dian Paramita",
    penName: null,
    slug: "dian-paramita",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Peneliti data sosial dan pengamat dinamika pendidikan tinggi serta masa depan anak muda.",
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "reza@belokiri.id",
    name: "Reza Mahendra",
    penName: "Reza M.",
    slug: "reza-mahendra",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Pecinta sejarah lokal, sastra Nusantara, dan tradisi seni rakyat di berbagai pelosok Indonesia.",
    role: Role.USER,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    email: "nadia@belokiri.id",
    name: "Nadia Safitri",
    penName: null,
    slug: "nadia-safitri",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Menulis seputar sains populer, kecerdasan buatan, teknologi terbuka, dan gerakan mahasiswa.",
    role: Role.USER,
    status: UserStatus.ACTIVE,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
];

// 3. Tags Awal
const TAGS = [
  "Transportasi",
  "Kebijakan Publik",
  "Perkotaan",
  "Pendidikan",
  "Ekonomi Kampus",
  "Mahasiswa",
  "Generasi Z",
  "Birokrasi",
  "Kekuasaan",
  "Sejarah Rakyat",
  "Arsip",
  "Filsafat",
  "Teori",
  "Sastra",
  "Puisi",
  "Gender",
  "Feminisme",
  "Serial Anabel",
  "Warkop",
  "Investigasi",
];

// 4. Starter Articles untuk 8 Rubrik
const ARTICLES = [
  {
    title:
      "Mengurai Benang Kusut Krisis Transportasi Publik: Antara Janji Integrasi dan Realitas Tiket",
    slug: "mengurai-benang-kusut-krisis-transportasi-publik",
    excerpt:
      "Di balik klaim integrasi antarmoda perkotaan yang gencar disosialisasikan, para komuter harian masih harus berjibaku dengan tarif tersembunyi dan disparitas jadwal.",
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
    featuredImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Ratusan penumpang bersiap menaiki kereta komuter di stasiun transit saat jam sibuk pagi.",
    photoSource: "Unsplash / Transportasi Dokumenter",
    source: "Liputan Lapangan Tim Agen Belokan BELOKIRI",
    categorySlug: "berisik",
    authorEmail: "arya@belokiri.id",
    tags: ["Transportasi", "Kebijakan Publik", "Perkotaan"],
    views: 4820,
    isEditorPick: true,
  },
  {
    title:
      "Teori Kopi Tubruk: Kenapa Masalah Negara Lebih Cepat Kelar di Meja Warkop?",
    slug: "teori-kopi-tubruk-masalah-negara-kelar-di-warkop",
    excerpt:
      "Dua cangkir robusta pekat, kepulan kretek, dan empat orang yang tak saling kenal bisa merumuskan solusi krisis subsidi pangan lebih cepat dari rapat lintas kementerian.",
    content: `
      <p class="lead">Warkop bukan tempat nongkrong biasa; ia adalah gedung parlemen tanpa karpet merah, tanpa tunjangan rumah, dan tanpa absensi bodong.</p>
      
      <h3>Demokrasi Tanpa Protokoler</h3>
      <p>Di meja warkop kayu yang sedikit goyang, gelar profesor dan lulusan SMP berdiri setara di depan gorengan hangat. Ketika berita televisi tabung di sudut ruangan menyiarkan kenaikan harga beras, analisis yang keluar bukan rumus regresi berganda, melainkan hitungan dompet riil seorang supir pikap dan buruh konveksi.</p>
      <p>Tidak ada yang perlu menjaga wibawa institusi. Siapa saja boleh bersuara keras, asal siap ditertawakan kalau argumennya terlalu mengada-ada. Dan ajaibnya, justru di ruang tanpa rasa takut itulah kebenaran kerap muncul telanjang tanpa polesan juru bicara.</p>

      <blockquote>
        "Kalau kebijakan publik tidak bisa dipahami penjaga warkop dalam sepuluh detik, kemungkinan besar kebijakan itu memang cuma akal-akalan birokrasi."
      </blockquote>

      <h3>Seni Mendengar yang Hilang di Senayan</h3>
      <p>Pelajaran terbesar dari meja warkop bukan seberapa banyak teori yang dilontarkan, tetapi kerelaan orang-orang untuk saling mendengarkan setelah saling ledek. Sesuatu yang tampaknya sudah punah dari ruang-ruang pendingin berpelapis marmer kekuasaan.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Secangkir kopi panas dan percakapan lepas di warkop pinggir jalan.",
    photoSource: "Unsplash / Tongkrongan Urban",
    source: "Observasi Lepas Warga Belokan",
    categorySlug: "meja-warkop",
    authorEmail: "warga@belokiri.id",
    tags: ["Warkop", "Kebijakan Publik", "Generasi Z"],
    views: 5210,
    isEditorPick: true,
  },
  {
    title:
      "Ordal dan Labirin Kekuasaan: Siapa Menjaga Pintu di Balik Konferensi Pers?",
    slug: "ordal-dan-labirin-kekuasaan-siapa-menjaga-pintu",
    excerpt:
      "Di balik podium menteri yang berkilau, ada transaksi tak tertulis, lobi lorong sempit, dan jaringan 'orang dalam' yang menentukan nasib ratusan triliun uang rakyat.",
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
    featuredImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Gedung pencakar langit ibu kota tempat berlangsungnya lobi dan kesepakatan tertutup.",
    photoSource: "Unsplash / Gedung Pusat",
    source: "Investigasi Meja Agen Belokan BELOKIRI",
    categorySlug: "ordal",
    authorEmail: "agen@belokiri.id",
    tags: ["Birokrasi", "Kekuasaan", "Investigasi"],
    views: 7420,
    isEditorPick: true,
  },
  {
    title:
      "Mereka yang Tak Masuk Buku Sejarah: Catatan Kaki Perlawanan Buruh Pelabuhan 1980-an",
    slug: "mereka-yang-tak-masuk-buku-sejarah-buruh-pelabuhan",
    excerpt:
      "Sebuah bangsa tidak hanya dibentuk oleh pidato di istana, tetapi oleh keringat dingin dan serikat sunyi buruh bongkar muat di dermaga Tanjung Priok.",
    content: `
      <p class="lead">Buku sejarah sekolah selalu penuh dengan nama jenderal, menteri, dan perunding meja bundar. Namun mereka lupa mencatat siapa yang memanggul karung beras ketika pemogokan massal melumpuhkan logistik kolonial dan rezim otoriter.</p>
      
      <h3>Keringat di Atas Kayu Dermaga</h3>
      <p>Melalui wawancara lisan dengan para pensiunan buruh pelabuhan di pesisir utara Jakarta, arsip ini menelusuri bagaimana solidaritas serikat bawah tanah dibangun tanpa teknologi ponsel, hanya mengandalkan kode peluit kapal dan selebaran stensilan.</p>
      
      <blockquote>
        "Kami tidak punya ambisi masuk monumen. Kami cuma mau pulang bawa beras utuh untuk anak bini tanpa dipotong mandor."
      </blockquote>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Aktivitas dermaga logistik dan kontainer peti kemas pelabuhan.",
    photoSource: "Unsplash / Arsip Dokumentasi",
    source: "Riset Arsip Sejarah Lisan BELOKIRI",
    categorySlug: "arsip-pinggiran",
    authorEmail: "reza@belokiri.id",
    tags: ["Sejarah Rakyat", "Arsip", "Kebijakan Publik"],
    views: 3890,
    isEditorPick: false,
  },
  {
    title:
      "Gramsci Masuk Angin: Menurunkan Teori Hegemoni ke Atas Aspal Jalanan",
    slug: "gramsci-masuk-angin-teori-hegemoni-di-aspal-jalanan",
    excerpt:
      "Filsafat bukan milik kaum bergaji dollar di menara gading. Bagaimana konsep hegemoni bekerja membujuk kita agar mencintai penindas kita sendiri setiap hari?",
    content: `
      <p class="lead">Antonio Gramsci mendekam bertahun-tahun di penjara Fasis Mussolini sambil menulis catatan di buku bergaris lusuh. Apa hubungannya dengan kita yang terjebak cicilan motor dan godaan diskon paylater?</p>
      
      <h3>Konsensus yang Diproduksi Secara Halus</h3>
      <p>Hegemoni bukan pemaksaan dengan laras senapan. Hegemoni adalah ketika kita secara sukarela mengamini bahwa kemiskinan kita adalah kesalahan pribadi karena kurang 'mindset berkembang', bukan karena upah murah dan perampasan ruang hidup.</p>
      
      <p>Sedikit Akademis mengajak kita menertawakan istilah-istilah rumit jurnal internasional dan menerapkannya langsung pada cara kerja iklan baliho, sinetron prime time, dan pidato pejabat yang selalu menyuruh rakyat bersabar.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Tumpukan buku-buku pemikiran kritis di ruang baca alternatif.",
    photoSource: "Unsplash / Buku Studi",
    source: "Kajian Sedikit Akademis BELOKIRI",
    categorySlug: "sedikit-akademis",
    authorEmail: "dian@belokiri.id",
    tags: ["Filsafat", "Teori", "Pendidikan"],
    views: 4120,
    isEditorPick: false,
  },
  {
    title:
      "Kamus Sunyi Kota Hujan: Tiga Fragmen Prosa tentang Ketiadaan",
    slug: "kamus-sunyi-kota-hujan-tiga-fragmen-prosa",
    excerpt:
      "Setelah semua teori selesai bicara dan amarah politik mereda di tenggorokan, yang tersisa hanyalah bahasa yang gemetar di bawah halte basah.",
    content: `
      <p class="lead">Ada jarak yang tak bisa dijembatani oleh pesan instan. Dan ada hujan yang turun bukan untuk menyirami tanaman, melainkan untuk mengingatkan betapa sepinya sebuah kota yang terlalu padat.</p>
      
      <h3>Fragmen I: Halte Pukul Sepuluh</h3>
      <p>Lampu neon berkedip seperti detak jantung yang lelah. Orang-orang berdiri berdempetan, tetapi tidak ada mata yang saling memandang. Kita belajar menjadi orang asing yang paling sopan di hadapan dingin.</p>
      
      <h3>Fragmen II: Secangkir Teh yang Dingin</h3>
      <p>Kata-kata yang tidak sempat diucapkan akhirnya mengendap di dasar cangkir, menjadi serbuk pahit yang tidak pernah diaduk lagi.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Hujan sore hari di sudut jalan perkotaan yang remang.",
    photoSource: "Unsplash / Fotografi Urban",
    source: "Karya Sastra Warga Belokan",
    categorySlug: "sisa-bahasa",
    authorEmail: "reza@belokiri.id",
    tags: ["Sastra", "Puisi"],
    views: 2980,
    isEditorPick: false,
  },
  {
    title:
      "Beban Ganda yang Tak Masuk APBN: Menghitung Keringat Tak Berbayar Perempuan Kelas Pekerja",
    slug: "beban-ganda-tak-masuk-apbn-keringat-perempuan-pekerja",
    excerpt:
      "Perempuan bukan catatan kaki. Perekonomian nasional akan lumpuh total dalam 24 jam jika kerja perawatan, pengasuhan, dan domestik perempuan mogok serentak.",
    content: `
      <p class="lead">Pukul empat subuh, saat para pembuat kebijakan masih mendengkur di bawah pendingin ruangan, jutaan ibu di penjuru negeri sudah menyalakan kompor, mencuci seragam, dan memastikan anak-anak siap menyongsong masa depan.</p>
      
      <h3>Kerja Perawatan: Tulang Punggung Ekonomi yang Dianggap 'Nol'</h3>
      <p>Dalam perhitungan Produk Domestik Bruto (PDB), memasak makanan di rumah bernilai nol. Mengasuh balita bernilai nol. Merawat lansia bernilai nol. Tetapi jika perempuan mogok melakukan kerja-kerja ini barang sehari saja, seluruh angkatan kerja laki-laki tidak akan bisa melangkah keluar pintu rumah.</p>
      
      <blockquote>
        "Menuntut kesetaraan bukan meminta keringanan tugas, melainkan merombak tatanan sosial yang mengeksploitasi kasih sayang sebagai tenaga kerja gratis."
      </blockquote>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Perempuan pekerja mandiri berdiskusi dalam forum komunitas.",
    photoSource: "Unsplash / Potret Perempuan",
    source: "Kolaborasi Rubrik Setara BELOKIRI",
    categorySlug: "setara",
    authorEmail: "nadia@belokiri.id",
    tags: ["Gender", "Feminisme", "Kebijakan Publik"],
    views: 5670,
    isEditorPick: true,
  },
  {
    title:
      "Serial Anabel: Anwar, Bella, dan Rahasia Botol Kecap Kedaluwarsa",
    slug: "serial-anabel-anwar-bella-rahasia-botol-kecap",
    excerpt:
      "Anwar yakin label kecap manis di warung pecel lele adalah metafora runtuhnya oligarki pangan. Bella cuma mau makan malam dengan tenang.",
    content: `
      <p class="lead">"Bel, lu pernah mikir nggak kenapa tutup botol kecap di warung tenda selalu mampet?" tanya Anwar sambil mengetuk-ngetukkan botol kaca ke meja kayu yang beralas terpal oranye.</p>
      
      <p>Bella melirik tajam tanpa melepaskan sendok bebeknya. "Nwar, gua bayar lele goreng ini pakai duit hasil lembur sampai jam delapan. Kalau lu mau ceramah soal geopolitik kedelai impor sekarang, gua tumpahin kuah soto ini ke jaket lu."</p>
      
      <h3>Teori Konspirasi Bumbu Dapur</h3>
      <p>"Gua serius, Bel! Ini bukan soal kedelai. Ini soal ilusi kelimpahan!" Anwar tetap berapi-api. "Pemerintah bilang swasembada, tapi pabrik kecap ini dimiliki konglomerasi yang saham terbesarnya dipegang perusahaan cangkang di Kepulauan Cayman. Kita ini makan manisnya hasil ekstraksi kapitalisme global!"</p>
      
      <p>Bella menghela napas panjang, merogoh tusuk gigi dari wadah plastik kecil, lalu menusuk lubang tutup botol kecap itu sekali dengan presisi seorang dokter bedah. Kecap hitam kental langsung mengucur deras ke atas piring Anwar.</p>
      
      <p>"Udah keluar kan kecapnya?" kata Bella datar. "Makan. Kebanyakan teori bikin lu kurus, Nwar."</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    featuredImageCaption:
      "Suasana santap malam di kedai makan pinggir jalan kota.",
    photoSource: "Unsplash / Kehidupan Kota",
    source: "Cerita Lepas Serial Anabel BELOKIRI",
    categorySlug: "serial-anabel",
    authorEmail: "warga@belokiri.id",
    tags: ["Serial Anabel", "Warkop", "Generasi Z"],
    views: 6890,
    isEditorPick: true,
  },
];

async function main() {
  console.log("🌱 ========================================================");
  console.log("🌱 MEMULAI SEEDING DATABASE BELOKIRI.ID");
  console.log("🌱 Tagline: Liar Seperlunya, Jenaka Secukupnya");
  console.log("🌱 ========================================================");

  // 1. Seed 8 Rubrik
  console.log("\n📁 [1/4] Mendaftarkan 8 Rubrik Resmi BELOKIRI...");
  const categoryMap = new Map<string, string>();

  for (const rubrik of RUBRIKS) {
    const category = await prisma.category.upsert({
      where: { slug: rubrik.slug },
      update: {
        name: rubrik.name,
        description: rubrik.description,
        status: true,
      },
      create: {
        name: rubrik.name,
        slug: rubrik.slug,
        description: rubrik.description,
        status: true,
      },
    });
    categoryMap.set(rubrik.slug, category.id);
    console.log(`   ✅ Rubrik: [${category.name}] (/kategori/${category.slug})`);
  }

  // 2. Seed Users
  console.log("\n👥 [2/4] Mendaftarkan Akun Dewan Agen Belokan & Warga Belokan...");
  const userMap = new Map<string, string>();

  for (const user of USERS) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        penName: user.penName,
        slug: user.slug,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        role: user.role,
        status: user.status,
        passwordHash: user.passwordHash,
      },
      create: {
        email: user.email,
        name: user.name,
        penName: user.penName,
        slug: user.slug,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        role: user.role,
        status: user.status,
        passwordHash: user.passwordHash,
      },
    });
    userMap.set(user.email, createdUser.id);
    console.log(
      `   ✅ Akun: ${createdUser.name} (${createdUser.email}) — Peran: [${createdUser.role}]`
    );
  }

  // 3. Seed Tags
  console.log("\n🏷️  [3/4] Mendaftarkan Tags Topik Populer...");
  const tagMap = new Map<string, string>();

  for (const tagName of TAGS) {
    const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const createdTag = await prisma.tag.upsert({
      where: { slug: tagSlug },
      update: { name: tagName },
      create: { name: tagName, slug: tagSlug },
    });
    tagMap.set(tagName, createdTag.id);
  }
  console.log(`   ✅ Total ${TAGS.length} tags topik terdaftar.`);

  // 4. Seed Starter Articles
  console.log("\n📰 [4/4] Mendaftarkan Naskah Starter untuk 8 Rubrik...");
  for (const article of ARTICLES) {
    const categoryId = categoryMap.get(article.categorySlug);
    const authorId = userMap.get(article.authorEmail);

    if (!categoryId || !authorId) {
      console.warn(
        `   ⚠️ Lewati artikel ${article.title}: categoryId atau authorId tidak ditemukan.`
      );
      continue;
    }

    const createdArticle = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        featuredImageCaption: article.featuredImageCaption,
        photoSource: article.photoSource,
        source: article.source,
        categoryId,
        authorId,
        status: ArticleStatus.PUBLISHED,
        isEditorPick: article.isEditorPick,
        views: article.views,
        publishedAt: new Date(),
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        featuredImageCaption: article.featuredImageCaption,
        photoSource: article.photoSource,
        source: article.source,
        categoryId,
        authorId,
        status: ArticleStatus.PUBLISHED,
        isEditorPick: article.isEditorPick,
        views: article.views,
        publishedAt: new Date(),
      },
    });

    // Link Tags
    for (const tagName of article.tags) {
      const tagId = tagMap.get(tagName);
      if (tagId) {
        await prisma.articleTag.upsert({
          where: {
            articleId_tagId: {
              articleId: createdArticle.id,
              tagId,
            },
          },
          update: {},
          create: {
            articleId: createdArticle.id,
            tagId,
          },
        });
      }
    }

    console.log(
      `   ✅ [${article.categorySlug.toUpperCase()}] ${createdArticle.title.slice(0, 50)}...`
    );
  }

  console.log("\n✨ ========================================================");
  console.log("✨ SEEDING BELOKIRI.ID SELESAI DENGAN SUKSES!");
  console.log("✨ 8 Rubrik, 6 Akun, dan 8 Artikel Siap Digunakan di Database.");
  console.log("✨ ========================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
