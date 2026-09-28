/**
 * Custom Static/Content Pages Data & Types for BELOKIRI
 * Powers the 11 footer pages:
 * Group 1: KANAL & GERAKAN (Manifesto, Menulis, Rekrutmen, Literatur Liberte, Konstitusi, Kontak)
 * Group 2: SINDIKASI & ARSIP (Kabinet, Pedoman Media Siber, Disclaimer, Kebijakan Privasi, Syarat & Ketentuan)
 */

export interface CustomPageContent {
  slug: string;
  group: "kanal-gerakan" | "sindikasi-arsip";
  groupLabel: string;
  name: string;
  path: string;
  title: string;
  subtitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  extraData?: Record<string, any>;
  updatedAt?: string;
}

export const DEFAULT_CUSTOM_PAGES: Record<string, CustomPageContent> = {
  // 1. MANIFESTO
  manifesto: {
    slug: "manifesto",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Manifesto",
    path: "/manifesto",
    title: "Manifesto Belokiri",
    subtitle: "“Liar Seperlunya, Jenaka Secukupnya”",
    badge: "Sikap Editorial Belokiri.id",
    metaTitle: "Manifesto BELOKIRI: Liar Seperlunya, Jenaka Secukupnya",
    metaDescription:
      "Manifesto Belokiri.id: Di tengah dunia yang terlalu berisik, kami memilih menyusup di antara narasi yang sudah terlalu mapan.",
    content: `## Menyusup di Antara Narasi

Di tengah derasnya arus informasi hari ini, media kerap hadir bukan lagi sebagai penyampai kebenaran, melainkan sebagai perancang kenyamanan. Realitas dipoles, konflik dipermak, dan kegelisahan publik sering kali diredam dalam kemasan yang lebih “ramah konsumsi”. Di titik inilah **Belokiri.id** mengambil posisi — bukan untuk ikut meramaikan, tetapi untuk menyusup di antara narasi yang sudah terlalu mapan.

Belokiri.id lahir dari kesadaran bahwa tidak semua hal layak ditenangkan. Ada realitas yang justru harus diguncang, dipertanyakan, bahkan ditertawakan. Dalam konteks sosial, ekonomi, dan politik yang penuh paradoks, pendekatan yang lurus dan datar sering kali gagal menjangkau esensi persoalan. Karena itu, Belokiri.id memilih jalan yang berbeda: *liar dalam kesunyian dan berani untuk tidak selalu terdengar “baik-baik saja”.*

> “Independensi bagi kami bukan berarti netral tanpa arah, melainkan kebebasan untuk berpihak tanpa tekanan. Ketika ketidakadilan terjadi, diam bukanlah pilihan.”

---

## Liar Sebagai Sikap

Liar bagi kami bukan sekadar gaya, melainkan sikap. Ia adalah cara untuk membuka lapisan kemunafikan tanpa harus berkhotbah. Dalam dunia yang semakin penuh kepura-puraan, liar menjadi bahasa yang justru terasa paling jujur. Belokiri.id percaya bahwa tawa yang getir sering kali lebih membekas daripada seribu kalimat yang terlalu hati-hati.

Namun, di balik nada yang tajam, terdapat sikap yang jelas: **keberpihakan**. Belokiri.id tidak berdiri di ruang hampa. Kami berpijak pada realitas rakyat, pada mereka yang suaranya kerap tenggelam di tengah hiruk pikuk kepentingan. Independensi bagi kami bukan berarti netral tanpa arah, melainkan kebebasan untuk berpihak tanpa tekanan. Ketika ketidakadilan terjadi, diam bukanlah pilihan, dan netralitas sering kali hanya menjadi topeng bagi ketakutan.

---

## Sebab Kesadaran, Perubahan Menemukan Jalannya

Sebagai media, Belokiri.id tidak melihat tulisan sebagai sekadar produk. Tulisan adalah alat. Ia bisa menjadi ruang refleksi, tetapi juga bisa menjadi bentuk perlawanan. Setiap narasi yang kami hadirkan adalah upaya untuk membongkar, bukan menenangkan; untuk memantik kesadaran, bukan sekadar mengisi waktu luang.

Tentu, pendekatan ini bukan tanpa risiko. Belokiri.id sadar bahwa tidak semua orang akan merasa nyaman. Namun, sejak awal, kenyamanan memang bukan tujuan. Kami lebih percaya pada pentingnya kegelisahan yang jujur daripada ketenangan yang semu. Sebab dari kegelisahan itulah kesadaran lahir, dan dari kesadaran, perubahan menemukan jalannya.

---

## Ruang Bagi Mereka yang Sama Liarnya

Pada akhirnya, Belokiri.id bukan sekadar media yang ingin dibaca. Ia adalah ruang bagi mereka yang masih mau berpikir, yang tidak puas dengan jawaban sederhana, dan yang percaya bahwa narasi bisa, dan harus diperebutkan. Dalam dunia yang semakin bising oleh suara yang seragam, Belokiri.id memilih untuk tetap berbeda: **menyusup, mengganggu, dan jika perlu, membongkar**.

Karena ketika narasi dikuasai, satu-satunya cara untuk melawan adalah dengan masuk ke dalamnya, diam-diam, tajam, dan tak terduga.`,
  },

  // 2. MENULIS DI BELOKIRI
  "kirim-tulisan": {
    slug: "kirim-tulisan",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Menulis di Belokiri",
    path: "/kirim-tulisan",
    title: "Menulis di BELOKIRI",
    subtitle: "“Karena tidak semua yang mengganjal harus dibicarakan di grup WhatsApp.”",
    badge: "Ruang Kontributor • Warga Belokan",
    metaTitle: "Menulis di BELOKIRI: Panduan & Kirim Tulisan Warga Belokan",
    metaDescription:
      "Belokiri membuka ruang bagi siapa saja yang ingin berbagi gagasan, cerita, pengamatan, keresahan, atau kritik. Jadilah Warga Belokan, kirimkan tulisanmu.",
    content: `Ada hal-hal yang kadang terlalu kecil untuk diberitakan, terlalu penting untuk dilupakan, dan terlalu mengganggu kalau cuma disimpan di kepala.

Bisa jadi itu tentang kampungmu. Tentang politik yang bikin geleng-geleng kepala. Tentang sekolah, jalan rusak, kopi di warkop, kebiasaan orang-orang di sekitar kita, budaya, kota yang berubah, atau kejadian sederhana yang ternyata menyimpan cerita lebih besar.

> **Tulis Saja.** Belokiri membuka ruang bagi siapa saja yang ingin berbagi gagasan, cerita, pengamatan, keresahan, kritik, atau sekadar sudut pandang yang mungkin belum banyak dibicarakan.

Kami tidak mencari tulisan yang sok pintar. Kami mencari tulisan yang **punya sesuatu untuk dikatakan.**

Kamu tidak harus menjadi wartawan. Tidak harus mahasiswa. Tidak harus punya gelar yang panjangnya mengalahkan judul skripsi. Yang penting, kamu punya cara melihat sesuatu dan keberanian untuk menuangkannya menjadi tulisan.

Di Belokiri, para kontributor disebut **Warga Belokan**. Mereka datang dari berbagai latar, membawa cerita dan kegelisahan masing-masing. Sebab kami percaya, percakapan yang menarik tidak selalu lahir dari ruang redaksi. Kadang ia lahir dari teras rumah, bangku warkop, perjalanan pulang, ruang kelas, pasar, sekretariat, atau dari seseorang yang tiba-tiba berpikir: *“Kok begini terus, ya?”*

---

## REWARD BAGI WARGA BELOKAN

### Tulisanmu dibaca 500 orang dalam 3 hari? Ada hadiahnya.

Kami tahu, menulis itu kadang lebih melelahkan daripada membaca komentar orang yang tidak membaca tulisan kita. Makanya, Belokiri ingin memberi apresiasi buat **Warga Belokan** yang tulisannya berhasil mengundang banyak pembaca.

Jika tulisanmu mencapai **500 pembaca dalam waktu 3 hari sejak dipublikasikan di Belokiri**, kamu berhak mendapatkan reward berupa:
- 📚 **Buku Pilihan Redaksi**
- 🥤 **Tumbler Eksklusif Belokiri**
- 👕 **Kaos Kaos Belokiri**

Tidak perlu jadi penulis terkenal. Tidak perlu punya ribuan followers. Cukup bikin tulisan yang membuat orang berhenti scroll, lalu berpikir: *“Eh, ini menarik juga.”*

Karena kalau mantan saja bisa bikin orang kepo berhari-hari, masa tulisanmu nggak bisa bikin 500 orang penasaran? **Tulis. Kirim. Bikin ramai.**

---

## MEKANISME PEMILIHAN REWARD

Setiap tulisan Warga Belokan yang berhasil mencapai **500 pembaca dalam waktu 3 hari sejak dipublikasikan** berhak mendapatkan **1 (satu) reward**.

Warga Belokan yang berhasil mencapai target dapat **memilih sendiri satu jenis reward** yang diinginkan (Buku, Tumbler, atau Kaos Belokiri). Pilihan reward dilakukan setelah tulisan dinyatakan memenuhi target oleh meja redaksi.

**Catatan & Ketentuan:**
1. 500 pembaca harus tercapai dalam **maksimal 3 × 24 jam** sejak tulisan dipublikasikan.
2. Jumlah pembaca mengacu pada **data pembaca yang tercatat pada sistem Belokiri**.
3. Satu tulisan hanya mendapatkan **satu reward**.
4. Reward diberikan kepada **penulis yang terdaftar sebagai Warga Belokan** dan mengirimkan tulisan tersebut.
5. Jenis, desain, ukuran, atau pilihan produk reward mengikuti **stok yang tersedia**.
6. Jika reward pilihan sedang tidak tersedia, Warga Belokan dapat memilih reward lain yang tersedia.
7. Keputusan redaksi terkait validasi pencapaian pembaca dan pemberian reward bersifat final.

> “Tulisannya ramai, hadiahnya menyusul. 😎”`,
  },

  // 3. REKRUTMEN ANGGOTA
  rekrutmen: {
    slug: "rekrutmen",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Rekrutmen Anggota",
    path: "/rekrutmen",
    title: "Rekrutmen Belokiri",
    subtitle:
      "Membangun ruang belajar, ruang berpikir, dan ruang bertumbuh bagi mereka yang mau mempertanyakan keadaan.",
    badge: "Panggilan Terbuka",
    metaTitle: "Rekrutmen Anggota & Penulis | BELOKIRI",
    metaDescription:
      "Belokiri.id membuka ruang bagi mahasiswa dan anak muda yang merasa dunia hari ini terlalu ramai oleh kepalsuan, tetapi terlalu sepi oleh keberanian.",
    extraData: {
      isOpen: true,
      formUrl: "/rekrutmen/form",
    },
    content: `Belokiri.id membuka ruang bagi mahasiswa dan anak muda yang merasa dunia hari ini terlalu ramai oleh kepalsuan, tetapi terlalu sepi oleh keberanian.

Kami mencari mereka yang masih punya kegelisahan, yang tidak mudah puas dengan narasi resmi, dan yang percaya bahwa tulisan bisa menjadi lebih dari sekadar konten. Di tengah budaya media yang makin sibuk mengejar algoritma dan sensasi instan, Belokiri.id justru ingin membangun ruang belajar, ruang berpikir, dan ruang bertumbuh bagi orang-orang yang mau mempertanyakan keadaan.

Rekrutmen ini bukan ajang mencari penulis yang paling rapi atau paling akademis. Kami lebih tertarik pada cara seseorang memandang realitas: apakah ia cukup peka melihat ketimpangan di sekitarnya, cukup kritis membaca kepentingan di balik informasi, dan cukup jujur untuk menulis tanpa terus-menerus menyenangkan semua orang.

---

## Laboratorium Kegelisahan & Produksi Narasi

Sebagai bagian dari Belokiri.id, anggota tidak hanya akan belajar menulis, tetapi juga belajar membedah isu, memahami framing media, melakukan riset, hingga mengolah kegelisahan menjadi karya yang punya posisi.

Kami ingin membangun ekosistem yang cair namun bertanggung jawab: tempat ide bisa diperdebatkan, tulisan bisa dipatahkan lalu dibangun ulang, dan kritik tidak dianggap ancaman. Karena media alternatif tidak lahir dari kenyamanan, melainkan dari keberanian untuk tetap berpikir ketika banyak orang memilih diam.

Belokiri.id adalah ruang bagi mereka yang sama liarnya, liar dalam cara melihat dunia, tetapi tetap sadar bahwa setiap tulisan membawa konsekuensi. Jika kamu merasa terlalu sering gelisah melihat keadaan, terlalu sering mempertanyakan hal-hal yang dianggap normal, atau terlalu sering merasa “tidak cocok” dengan cara media bekerja hari ini, mungkin kamu memang sedang mencari ruang yang sama.

> “Di sini, kita tidak sedang membangun tempat yang sempurna. Kita hanya sedang mencoba memastikan bahwa narasi tidak sepenuhnya dimiliki mereka yang berkuasa.”`,
  },

  // 4. LITERATUR LIBERTE
  "literatur-liberte": {
    slug: "literatur-liberte",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Literatur Liberte",
    path: "/literatur-liberte",
    title: "Literatur Liberte",
    subtitle:
      "Silabus Penempaan Menulis, Riset Data, & Produksi Narasi Kritis Belokiri.id",
    badge: "Kurikulum & Kaderisasi Intelektual",
    metaTitle: "Literatur Liberte | BELOKIRI",
    metaDescription:
      "Silabus penempaan menulis, riset data, dan produksi narasi kritis Belokiri.id: Dari cara pandang, keterampilan, hingga karya nyata.",
    content: `## Penempaan Narasi Kritis

Literatur Liberte adalah wadah penempaan dan silabus terstruktur bagi seluruh agen serta penulis Belokiri.id. Kami meyakini bahwa kemampuan menulis yang berani harus ditopang oleh fondasi riset yang kokoh, pembedahan data yang teliti, dan kepekaan sosial yang mendalam.

---

### Modul 01 — Literatur Kerakyatan: Suara dari Bawah
Membentuk perspektif bahwa tulisan bukan sekadar estetika kata-kata, melainkan instrumen keberpihakan kepada mereka yang suaranya dipinggirkan. Membedah narasi kerakyatan, rujukan sastra perjuangan, dan observasi realitas warkop serta kampung.

### Modul 02 — Jurnalisme Perjuangan: Pers sebagai Alat Perlawanan
Menjadikan media sebagai instrumen kontrol sosial dan pengawas kekuasaan. Membedah jurnalisme advokasi vs ilusi 'netralitas' semu, anatomi framing media oligarki, dan tanggung jawab etis jurnalisme siber alternatif.

### Modul 03 — Riset & Investigasi Data: Keberanian yang Punya Bukti
Kritik tanpa data hanyalah kebisingan. Modul ini melatih pelacakan anggaran publik, investigasi dokumen kebijakan, pengolahan data terbuka, dan verifikasi silang narasumber.

### Modul 04 — Retorika Satir & Esai Populer: Menembus Kebisingan Timeline
Menyampaikan hal serius tanpa wajah kaku. Mengembangkan gaya penulisan yang jenaka secukupnya, tajam seperlunya, analogi segar, dan argumen yang memantik refleksi publik.

### Modul 05 — Produksi & Verifikasi Meja Redaksi
Memahami dapur redaksi Belokiri: proses kurasi naskah, standardisasi fact-checking, penyuntingan bahasa, dan etika hak jawab sesuai Pedoman Pemberitaan Media Siber.

---

> “Belajar menulis di Belokiri bukan sekadar merangkai kata, melainkan mengasah nurani dan keberanian untuk mengatakan apa yang sebenarnya terjadi.”`,
  },

  // 5. KONSTITUSI BELOKIRI
  konstitusi: {
    slug: "konstitusi",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Konstitusi Belokiri",
    path: "/konstitusi",
    title: "Konstitusi Kecil Belokiri.id",
    subtitle: "“Liar Seperlunya, Jenaka Secukupnya”",
    badge: "Statuta & Piagam Kolektif",
    metaTitle: "Konstitusi Kecil | BELOKIRI",
    metaDescription:
      "Konstitusi Kecil Belokiri.id: Liar Seperlunya, Jenaka Secukupnya. Statuta dasar, kultur internal, etika, dan prinsip kolektif.",
    content: `## Mukadimah

Belokiri.id lahir dari kegelisahan terhadap jagat maya yang semakin bising oleh narasi seragam. Kami percaya bahwa media bukan sekadar alat penyampai informasi, melainkan ruang perebutan makna. Di tengah arus informasi yang dipoles demi kenyamanan, kami memilih berdiri sebagai ruang yang tetap curiga, tetap bertanya, dan tetap berpihak pada realitas yang sering disembunyikan.

Kami sadar bahwa hari ini semua orang bisa berbicara, tetapi tidak semua orang benar-benar mendengar. Timeline dipenuhi opini cepat, kemarahan instan, dan keberanian yang sering berhenti sebatas kolom komentar. Di situ, Belokiri.id mencoba mengambil jarak dari kebisingan yang serba tergesa.

> **Belokiri.id bukan institusi suci, bukan pula ruang paling benar.** Ia adalah kolektif yang percaya bahwa tulisan bisa menjadi alat untuk membongkar, mengingat, dan melawan lupa. Setiap orang yang masuk ke dalamnya tidak hanya membawa kemampuan menulis, tetapi juga tanggung jawab berpikir.

---

## BAB I — Tentang Belokiri.id

### Pasal 1 — Identitas
Belokiri.id adalah media alternatif berbasis kolektif yang bergerak dalam produksi tulisan, opini, satire, dan narasi sosial-politik dengan keberpihakan pada rakyat dan kelompok yang suaranya kerap dipinggirkan.

### Pasal 2 — Sikap Dasar
1. Belokiri.id tidak percaya pada netralitas yang pura-pura.
2. Independensi berarti bebas berpihak tanpa tekanan kekuasaan.
3. Kritik adalah bentuk kepedulian, bukan kebencian.
4. Satire adalah alat baca realitas, bukan pelarian dari realitas.
5. Humor boleh tajam, tetapi tidak boleh malas berpikir.

### Pasal 3 — Tujuan
1. Membangun ruang berpikir kritis bagi anak muda.
2. Menghasilkan tulisan yang punya posisi dan keberanian.
3. Menjadi ruang belajar kolektif, bukan pabrik konten.
4. Menjaga narasi tetap hidup di tangan publik.

---

## BAB II — Kultur Internal

### Pasal 4 — Cara Kami Berpikir
1. Tidak semua hal harus disetujui, tetapi semua hal boleh diperdebatkan.
2. Ide boleh dibantah, manusia tidak perlu direndahkan.
3. Tidak ada senioritas absolut dalam gagasan.
4. Yang paling keras bukan berarti paling benar.
5. Keberanian tanpa riset hanyalah kebisingan.

### Pasal 5 — Cara Kami Menulis
1. Tulisan harus punya posisi.
2. Gaya boleh santai, satire boleh liar, tetapi argumen harus jelas.
3. Kami tidak menulis untuk menyenangkan semua orang.
4. Jangan menyalin ide orang lain tanpa atribusi yang jujur.
5. Tulisan yang baik adalah tulisan yang selesai dan berani diterbitkan.

---

## BAB III — Etika & Batasan

### Pasal 6 — Hal yang Dilarang
1. Plagiarisme dalam bentuk apa pun.
2. Manipulasi data, pemalsuan narasumber, dan penyebaran hoaks.
3. Ujaran kebencian berbasis SARA dan diskriminasi kelompok rentan.
4. Iklan terselubung yang mengkhianati kepercayaan pembaca.`,
  },

  // DONASI SOLIDARITAS
  donasi: {
    slug: "donasi",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Donasi Solidaritas",
    path: "/donasi",
    title: "PATUNGAN WARGA: JAGA BELOKIRI TETAP MENGUDARA",
    subtitle: "“Dari Warga, Oleh Warga, untuk Akal Sehat yang Tak Boleh Dibungkam”",
    badge: "Solidaritas Warga Belokan",
    metaTitle: "Donasi Solidaritas: Dari Warga untuk Warga | BELOKIRI",
    metaDescription:
      "Sokong jurnalisme warga independen BELOKIRI agar tetap bebas dari pesanan oligarki, tanpa cukong, dan tanpa iklan sampah.",
    extraData: {
      qrisImageUrl: "",
      bankName: "BCA (Bank Central Asia)",
      bankAccountNumber: "0812-3456-7890",
      bankAccountName: "Kolektif Media Belokiri",
      saweriaUrl: "https://saweria.co/belokiri",
      trakteerUrl: "https://trakteer.id/belokiri",
      targetText: "Rp 5.000.000 / Bulan (Server, Apresiasi Warga & Riset)",
    },
    content: `## Mengapa Kami Membuka Patungan Warga?

Menjaga media tetap jujur, tajam, dan tidak berkompromi dengan kekuasaan itu berisiko — dan jelas butuh amunisi.

Banyak media hari ini terpaksa menjadi perpanjangan tangan korporasi, memoles citra penguasa bermasalah, atau membombardir layar ponsel pembaca dengan iklan judi online dan clickbait sampah hanya agar operasional mereka tetap berjalan.

**BELOKIRI menolak jalan itu.**

Kami memilih jalan sunyi yang merdeka:
- **Bebas Intervensi Oligarki:** Tulisan dan liputan kami tidak bisa dibeli untuk mengaburkan fakta atau menghapus kritik.
- **Bebas Polusi Iklan Bodong:** Kami menghargai akal sehat dan kenyamanan baca Anda tanpa disesaki banner clickbait.
- **Kolektif Akar Rumput:** Menjamin ruang terbuka bagi siapa saja untuk bersuara dan mendapatkan reward apresiasi nyata.

---

## Tiga Pilar Alokasi Dana Solidaritas

Setiap rupiah dan cangkir kopi yang disisihkan oleh Warga Belokan dialokasikan secara transparan untuk tiga pilar utama:

1. **Infrastruktur & Server Digital**  
   Menjamin platform web BELOKIRI tetap online stabil, cepat diakses dari pelosok daerah, aman dari serangan siber (DDoS), dan menjaga arsip naskah warga tetap abadi.

2. **Apresiasi & Reward Naskah Warga Belokan**  
   Mendukung penuh program reward (kaos, buku, tumbler, dan uang saku) bagi kontributor warga yang tulisannya berhasil menembus 500 pembaca dalam 3 hari.

3. **Amunisi Riset & Liputan Lapangan**  
   Mendanai awak Agen Belokan untuk turun langsung ke warkop-warkop, kampung kota, dan gelanggang konflik agraria/sosial demi membongkar cerita yang luput dari media besar.

---

> “Satu cangkir kopi yang kamu sisihkan hari ini adalah amunisi agar kami bisa terus berisik membela akal sehat esok hari. Terima kasih telah menjaga Belokiri tetap bernafas.”`,
  },

  // 6. AGEN BELOKAN & KONTAK
  kontak: {
    slug: "kontak",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Agen Belokan & Kontak",
    path: "/kontak",
    title: "AGEN BELOKAN & KERJA SAMA BELOKIRI",
    subtitle:
      "Punya tips liputan, pengaduan berita, siaran pers, atau ingin berkolaborasi? Tim Agen Belokan siap mendengar dari Anda.",
    badge: "Hubungi Kami",
    metaTitle: "Kontak & Agen Belokan | BELOKIRI",
    metaDescription:
      "Hubungi Agen Belokan BELOKIRI, kirim siaran pers, atau panduan naskah tulisan bagi Warga Belokan.",
    extraData: {
      office: "Gedung Media Belokiri, Meja Redaksi Lantai 2",
      address: "Jl. Warkop Tuya No. 45, Jakarta",
      email: "redaksi@belokiri.id",
      whatsapp: "0812-3456-7890",
      hours: "Senin – Jumat: 09.00 – 21.00 WIB",
    },
    content: `## Saluran Komunikasi Redaksi

BELOKIRI terbuka untuk segala bentuk korespondensi, kritik, pers release, pengaduan hak jawab, hingga ajakan kolaborasi program dari seluruh lapisan masyarakat.

### Alamat & Markas Redaksi
Meja Agen Belokan berpusat di ruang diskusi kolektif:
- **Alamat:** Gedung Media Belokiri Lt. 2, Jl. Warkop Tuya No. 45, Jakarta
- **Surel Utama:** \`redaksi@belokiri.id\`
- **Surel Bisnis & Kerja Sama:** \`kerjasama@belokiri.id\`
- **WhatsApp Layanan Warga:** 0812-3456-7890

---

### Tips Liputan & Whistleblower
Jika Anda memiliki data investigasi, dokumen kebijakan bermasalah, atau informasi lapangan yang layak dibongkar ke ruang publik, kirimkan melalui surel terenkripsi atau formulir Surat Kaleng Warga dengan jaminan kerahasiaan identitas sumber.`,
  },

  // 7. KABINET BELOKIRI
  "kabinet-belokiri": {
    slug: "kabinet-belokiri",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Kabinet Belokiri",
    path: "/kabinet-belokiri",
    title: "KABINET BELOKIRI",
    subtitle:
      "Susunan struktur organisasi dan dewan agen BELOKIRI: Ketua RT, Bendahara RT, Pimpinan Redaksi, hingga Penjaga 8 Rubrik.",
    badge: "Struktur Dewan & Redaksi",
    metaTitle: "Kabinet Belokiri | Struktur Dewan & Agen Belokan",
    metaDescription:
      "Susunan struktur organisasi dan dewan agen BELOKIRI: Ketua RT, Bendahara RT, Pimpinan Redaksi, Agen Agitasi & Propaganda, hingga Penjaga 8 Rubrik.",
    content: `## Dewan Pengurus & Meja Kerja Agen Belokan

Kabinet Belokiri adalah kolektif kerja yang menggerakkan operasional harian media, kurasi naskah warga, pengorganisasian program literasi, hingga perumusan arah agitasi dan propaganda editorial.

Struktur ini dirancang cair, egaliter, namun tetap berdisiplin tinggi demi menjaga kualitas naskah dan kemandirian pers kerakyatan.

---

> Struktur personil, peran spesifik, foto avatar, dan kutipan dewan kabinet dapat dikelola secara interaktif melalui panel admin **Kelola Website > Tab Kabinet**.`,
  },

  // 8. PEDOMAN MEDIA SIBER
  "pedoman-media-siber": {
    slug: "pedoman-media-siber",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Pedoman Media Siber",
    path: "/pedoman-media-siber",
    title: "PEDOMAN MEDIA SIBER",
    subtitle:
      "Sebagai media independen yang bernapas di ruang digital, BELOKIRI menjunjung tinggi prinsip keterbukaan, akuntabilitas publik, dan etika pers yang berpihak pada akal sehat.",
    badge: "Standar Editorial & Pers Alternatif",
    metaTitle: "Pedoman Media Siber | BELOKIRI",
    metaDescription:
      "Pedoman pemberitaan media siber BELOKIRI yang berpegang pada independensi, verifikasi fakta, dan etika pers rakyat.",
    content: `## 01. Ruang Lingkup
Media Siber BELOKIRI adalah media publikasi alternatif daring yang menyajikan esai, jurnalisme warga, arsip sejarah rakyat, dan analisis kritis. Pedoman ini mengikat seluruh pengelola, Dewan Belokan, agen rubrik, dan kontributor.

---

## 02. Verifikasi dan Keberimbangan Berita
Setiap informasi yang mengandung tuduhan atau fakta lapangan wajib diverifikasi dengan iktikad baik. Dalam artikel opini dan esai kritis, penulis wajib menyertakan rujukan yang dapat dipertanggungjawabkan serta argumentasi yang berdasar.

---

## 03. Isi Buatan Pengguna (User Generated Content)
BELOKIRI menyediakan ruang bagi Warga Belokan untuk mengirimkan tulisan dan surat kaleng. Naskah yang dimuat melalui kurasi editorial tidak boleh memuat ujaran kebencian berbasis SARA, pornografi anak, atau fitnah tanpa dasar faktual.

---

## 04. Ralat, Koreksi, dan Hak Jawab
Ralat, koreksi, dan hak jawab wajib ditautkan pada berita atau artikel yang diralat. Pihak yang merasa dirugikan oleh tulisan di BELOKIRI berhak mengajukan bantahan dan klarifikasi yang akan dipublikasikan secara setara dan proporsional.

---

## 05. Pencabutan Berita
Artikel yang sudah dipublikasikan tidak dapat dicabut semata-mata karena tekanan pihak luar atau pemilik kuasa, kecuali terkait persoalan SARA mendesak, masa depan anak di bawah umur, atau atas rekomendasi hukum yang sah.

---

## 06. Hak Cipta dan Praktik Sitasi
BELOKIRI menghargai hak cipta setiap penulis, fotografer, dan ilustrator. Plagiarisme dalam bentuk apa pun adalah pelanggaran berat di BELOKIRI dan berakibat pemutusan hubungan kontributor secara permanen.

---

> **Pengaduan Etika & Hak Jawab:** Kirimkan surat permohonan hak jawab, klarifikasi, atau laporan kode etik ke: **redaksi@belokiri.id** atau pos Meja Redaksi BELOKIRI.`,
  },

  // 9. DISCLAIMER
  disclaimer: {
    slug: "disclaimer",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Disclaimer",
    path: "/disclaimer",
    title: "DISCLAIMER",
    subtitle:
      "Pernyataan sangkalan dan penegasan status konten yang dipublikasikan di situs BELOKIRI.",
    badge: "Batasan Tanggung Jawab Hukum",
    metaTitle: "Disclaimer | BELOKIRI",
    metaDescription:
      "Pernyataan sangkalan hukum, tanggung jawab tulisan kontributor, dan batasan operasional media BELOKIRI.",
    content: `## 1. Opini Penulis dan Warga Belokan
Seluruh artikel, esai, opini, dan karya sastra yang dimuat di BELOKIRI merupakan cerminan dari sudut pandang masing-masing penulis dan kontributor. Gagasan yang tertuang tidak secara otomatis merefleksikan sikap institusional atau keputusan politik resmi BELOKIRI secara keseluruhan.

---

## 2. Karakter Satir dan Karya Fiksi
Rubrik-rubrik tertentu seperti **SERIAL ANABEL** atau catatan humor di **MEJA WARKOP** dapat mengandung unsur fiksi satir, personifikasi komikal, dan hiperbola artistik. Nama karakter, tempat, atau insiden yang menyerupai kenyataan digunakan untuk tujuan kritik sosial dan refleksi kultural semata.

---

## 3. Akurasi Informasi & Tautan Pihak Ketiga
Meskipun redaksi berupaya melakukan verifikasi terhadap data primer, BELOKIRI tidak bertanggung jawab penuh atas segala kerugian materiil maupun non-materiil yang timbul akibat ketergantungan sepihak pada informasi di situs ini atau tautan eksternal pihak ketiga yang disematkan.

---

## 4. Hak Cipta & Pengutipan Karya
Seluruh materi orisinal yang diterbitkan di BELOKIRI dilindungi oleh undang-undang hak cipta. Pengutipan diperkenankan untuk keperluan pendidikan, kajian akademis, dan ulasan non-komersial dengan wajib mencantumkan nama penulis dan tautan sumber artikel BELOKIRI.

---

## 5. Perubahan dan Pembaruan Konten
Redaksi BELOKIRI berhak memperbarui, memperbaiki kesalahan ketik, menambahkan catatan ralat (errata), atau menyesuaikan format artikel demi kenyamanan pembaca tanpa pemberitahuan sebelumnya.`,
  },

  // 10. KEBIJAKAN PRIVASI
  "kebijakan-privasi": {
    slug: "kebijakan-privasi",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Kebijakan Privasi",
    path: "/kebijakan-privasi",
    title: "KEBIJAKAN PRIVASI",
    subtitle:
      "Kami menolak pengawasan massal korporat dan menghargai kerahasiaan setiap pembaca serta kontributor BELOKIRI.",
    badge: "Perlindungan Data Pengguna",
    metaTitle: "Kebijakan Privasi | BELOKIRI",
    metaDescription:
      "Kebijakan perlindungan data dan privasi pengguna situs BELOKIRI.",
    content: `## 1. Kerahasiaan Surat Kaleng Warga
Formulir **Surat Kaleng Warga** dirancang untuk menampung kritik dan masukan tanpa melacak identitas asli pembaca. Kami tidak mencatat alamat IP pribadi atau data geolokasi pengguna untuk tujuan komersial atau pengawasan.

---

## 2. Data Formulir Rekrutmen & Akun Kontributor
Informasi kontak yang Anda cantumkan dalam Formulir Rekrutmen Agen Belokan (seperti email dan nomor WhatsApp) hanya digunakan untuk keperluan komunikasi editorial internal dan verifikasi keanggotaan. BELOKIRI tidak akan pernah menjual atau menyewakan data Anda kepada pihak ketiga, broker data, atau entitas pengiklan mana pun.

---

## 3. Penggunaan Cookie & Analitik Ringan
BELOKIRI hanya memanfaatkan penyimpanan lokal atau cookie esensial yang diperlukan untuk fungsi login akun dan keamanan sesi pengguna. Kami tidak menyematkan pelacak perilaku lintas situs (third-party tracking pixels) yang mengintai aktivitas penjelajahan Anda.

---

## 4. Hak Penghapusan Data
Kontributor atau pelamar agen berhak meminta penghapusan riwayat akun dan data pribadinya dari basis data BELOKIRI kapan saja dengan mengirimkan permohonan ke surel resmi kami: **redaksi@belokiri.id**.`,
  },

  // 11. SYARAT & KETENTUAN
  "syarat-ketentuan": {
    slug: "syarat-ketentuan",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Syarat & Ketentuan",
    path: "/syarat-ketentuan",
    title: "SYARAT & KETENTUAN",
    subtitle:
      "Ketentuan interaksi, pengiriman naskah, dan komitmen etis bagi seluruh Warga Belokan.",
    badge: "Ketentuan Penggunaan Situs",
    metaTitle: "Syarat & Ketentuan | BELOKIRI",
    metaDescription:
      "Syarat dan ketentuan pemanfaatan situs serta pengiriman tulisan di BELOKIRI.",
    content: `## 1. Integritas Tulisan & Larangan Plagiarisme
Setiap naskah yang dikirimkan oleh Warga Belokan harus merupakan karya asli (orisinal) dan bukan hasil plagiasi tulisan orang lain. Kontributor bertanggung jawab secara moral dan hukum atas keaslian pemikiran dan data yang disajikan.

---

## 2. Hak Editorial Dewan Belokan
Redaksi berhak menyunting judul, tata bahasa, dan memadatkan naskah tanpa mengubah substansi gagasan penulis demi menjaga keterbacaan serta ketajaman artikel. Redaksi juga memiliki hak penuh untuk menolak naskah yang dinilai melanggar prinsip dasar kemanusiaan atau pedoman media siber.

---

## 3. Etika Kolom Komentar & Surat Kaleng
Kami menyukai kritik pedas dan caci maki jenaka, namun tidak mentolerir pelecehan seksual verbal, ancaman kekerasan fisik terhadap individu rentan, maupun doxxing (penyebaran data pribadi tanpa izin).

---

## 4. Perubahan Ketentuan
Syarat dan ketentuan ini dapat disesuaikan sewaktu-waktu seiring dinamika perkembangan komunitas BELOKIRI. Pembaruan akan selalu diumumkan secara terbuka di halaman ini.`,
  },
};

export function getDefaultCustomPage(slug: string): CustomPageContent {
  const page = DEFAULT_CUSTOM_PAGES[slug];
  if (!page) {
    return {
      slug,
      group: "kanal-gerakan",
      groupLabel: "KANAL & GERAKAN",
      name: slug,
      path: `/${slug}`,
      title: slug.toUpperCase(),
      subtitle: "",
      badge: "Halaman Belokiri",
      metaTitle: `${slug.toUpperCase()} | BELOKIRI`,
      metaDescription: `Halaman ${slug} resmi BELOKIRI.`,
      content: "",
    };
  }
  return page;
}
