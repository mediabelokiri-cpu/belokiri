/**
 * Custom Static/Content Pages Data & Types for BAKUBACA
 * Powers the 11 footer pages:
 * Group 1: KANAL & GERAKAN (Manifesto, Menulis, Rekrutmen, Literatur Liberte, Konstitusi, Kontak)
 * Group 2: SINDIKASI & ARSIP (Kabinet Redaksi, Pedoman Media Siber, Disclaimer, Kebijakan Privasi, Syarat & Ketentuan)
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
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Manifesto",
    path: "/manifesto",
    title: "Manifesto Bakubaca",
    subtitle: "“Setiap Pikiran Punya Ruang.”",
    badge: "Sikap Editorial BAKUBACA",
    metaTitle: "Manifesto BAKUBACA: Setiap Pikiran Punya Ruang.",
    metaDescription:
      "Manifesto Bakubaca: Ruang bersama bagi Warga untuk menyuarakan realitas, merekam pengalaman, bertukar gagasan, membaca kebudayaan, dan merayakan ekspresi.",
    content: `## Rumah Bersama Bagi Setiap Pikiran

Di tengah derasnya arus informasi yang serba tergesa, banyak gagasan bernas justru tersingkir karena dianggap terlalu panjang, terlalu kritis, atau tidak cocok dengan selera algoritma. Di titik inilah **BAKUBACA** hadir — bukan sekadar portal bacaan, melainkan ruang temu di mana **setiap pikiran punya ruang**.

**Bakubaca** lahir dari keyakinan sederhana bahwa menulis dan membaca adalah hak setiap **Warga**. Pengetahuan tidak semestinya terkunci di ruang-ruang elitis atau dikemas seragam demi kenyamanan pihak berkuasa. Keresahan atas realitas publik, ingatan tentang sejarah kampung, refleksi filsafat di serambi rumah, pembacaan atas karya budaya, hingga sebait puisi tengah malam — semuanya berhak duduk setara di meja yang sama.

> “Independensi bagi kami bukan berarti dingin tanpa sikap, melainkan kebebasan setiap Warga untuk berpikir jernih, bersuara jujur, dan membaca kenyataan tanpa tekanan.”

---

## Lima Ruang Penggerak Gagasan

Agar percakapan tetap tajam sekaligus terbuka, Bakubaca menata rumah pikirannya melalui lima rubrik utama yang saling melengkapi:

1. **BISING — Menyuarakan Realitas:** Ruang untuk kritik, opini, keresahan sosial, politik, demokrasi, dan berbagai persoalan publik.
2. **JEJAK — Merekam Pengalaman:** Ruang untuk sejarah, perjalanan, pengalaman personal, dokumentasi sosial, dan ingatan kolektif.
3. **TERAS — Ruang Temu Gagasan:** Ruang untuk filsafat, pendidikan, pengetahuan, literasi, refleksi, dan gagasan intelektual.
4. **GURAT — Membaca Kebudayaan:** Ruang untuk seni, budaya, film, musik, buku, dan berbagai fenomena kebudayaan.
5. **FRAGMEN — Merayakan Ekspresi:** Ruang untuk puisi, cerpen, prosa, catatan personal, dan berbagai bentuk ekspresi kreatif.

---

## Warga Adalah Denyut Nadi Bakubaca

Di Bakubaca, tidak ada sekat kaku antara pembaca dan penulis. Keduanya kami sapa dengan satu panggilan yang sama: **Warga**. Setiap Warga berhak membaca, merespons, mengkritik, sekaligus menulis gagasan terbaiknya sendiri.

Tim **Redaksi** bekerja sebagai fasilitator dan penyunting kolektif — bukan penjaga gerbang yang membungkam suara berbeda, melainkan teman diskusi yang membantu setiap naskah Warga lahir dengan argumen yang kuat, data yang dapat dipertanggungjawabkan, dan bahasa yang enak dibaca.

---

## Sebab Berpikir Bersama Menyalakan Perubahan

Bakubaca percaya bahwa kegelisahan yang dirawat lewat tulisan akan selalu menemukan pembacanya. Dari satu esai Warga ke esai Warga lainnya, dari obrolan di **Teras** hingga catatan di **Fragmen**, kita merawat akal sehat bersama agar publik tetap merdeka dalam berpikir dan berekspresi.`,
  },

  // 2. MENULIS DI BAKUBACA
  "kirim-tulisan": {
    slug: "kirim-tulisan",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Menulis di Bakubaca",
    path: "/kirim-tulisan",
    title: "Menulis di BAKUBACA",
    subtitle: "“Karena setiap Warga berhak bersuara dan setiap pikiran punya ruang.”",
    badge: "Ruang Kontributor • Warga Bakubaca",
    metaTitle: "Menulis di BAKUBACA: Panduan & Kirim Tulisan Warga",
    metaDescription:
      "Bakubaca membuka ruang bagi setiap Warga untuk mengirim esai, kritik publik, dokumentasi sejarah, refleksi gagasan, ulasan budaya, hingga karya sastra.",
    content: `Ada hal-hal yang terlalu penting untuk sekadar lewat di linimasa media sosial, terlalu bermakna untuk menguap di obrolan sesaat, dan terlalu jujur jika hanya disimpan di kepala.

Entah itu keresahan tentang kebijakan di kotamu (**Bising**), kisah warga dan sejarah lokal yang nyaris dilupakan (**Jejak**), permenungan dari buku dan ruang belajar (**Teras**), pembacaan atas film, musik, atau pameran (**Gurat**), hingga cerpen dan puisi personal (**Fragmen**) — **tulis saja di Bakubaca.**

> **Setiap Pikiran Punya Ruang.** Bakubaca mengundang setiap **Warga** dari latar belakang apa pun — pelajar, mahasiswa, pekerja, peneliti, pegiat komunitas, seniman, hingga pembaca setia — untuk meramaikan ruang gagasan bersama.

Kamu tidak harus punya nama besar atau gelar akademik berderet. Yang terpenting adalah ketulusan mengamati realitas, keberanian menyusun argumen, serta kejujuran bertutur.

---

## APRESIASI UNTUK WARGA

### Tulisanmu dibaca 500 Warga dalam 3 hari? Ada apresiasinya.

Menulis butuh waktu, tenaga, dan keberanian berpikir. Sebagai bentuk terima kasih, **BAKUBACA** menyediakan apresiasi khusus bagi **Warga** yang tulisannya berhasil menjangkau luas pembaca.

Jika naskahmu berhasil mencapai **500 pembaca dalam waktu 3 hari sejak terbit di Bakubaca**, kamu berhak memilih satu apresiasi berikut:
- 📚 **Buku Pilihan Redaksi**
- 🥤 **Tumbler Eksklusif Bakubaca**
- 👕 **Kaos Resmi Bakubaca**

Cukup hadirkan tulisan yang bernas, menyentuh, atau memantik diskusi sehat antar-Warga hingga membuat orang berhenti menggulir layar dan ikut membacanya sampai tuntas.

---

## MEKANISME PENERIMAAN APRESIASI

Setiap naskah Warga yang mencapai **500 pembaca dalam 3 hari sejak waktu terbit** berhak menerima **1 (satu) bentuk apresiasi** sesuai ketersediaan stok.

**Catatan & Ketentuan:**
1. Batas pencapaian 500 pembaca dihitung maksimal **3 × 24 jam** sejak artikel diterbitkan oleh Redaksi.
2. Jumlah pembaca merujuk pada **statistik resmi sistem BAKUBACA**.
3. Satu naskah terbit hanya berhak atas **satu apresiasi**.
4. Apresiasi diberikan kepada **penulis yang terdaftar sebagai Warga Bakubaca** melalui akun penulis masing-masing.
5. Pilihan buku, warna tumbler, maupun ukuran kaos mengikuti **ketersediaan persediaan Redaksi**.
6. Validasi akhir pencapaian dilakukan secara transparan oleh meja **Redaksi BAKUBACA**.

> “Tulis pikiranmu, bagikan perspektifmu, biar Warga lain ikut membaca.”`,
  },

  // 3. REKRUTMEN ANGGOTA
  rekrutmen: {
    slug: "rekrutmen",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Rekrutmen Redaksi",
    path: "/rekrutmen",
    title: "Rekrutmen Tim Redaksi Bakubaca",
    subtitle:
      "Membangun ruang belajar, ruang sunting, dan ekosistem literasi kolektif bersama Warga.",
    badge: "Panggilan Terbuka • Tim Redaksi",
    metaTitle: "Rekrutmen Tim Redaksi & Penggerak Literasi | BAKUBACA",
    metaDescription:
      "Bakubaca membuka ruang kolaborasi bagi anak muda, penulis, editor, dan penggerak budaya yang ingin merawat ruang pikir publik yang independen.",
    extraData: {
      isOpen: true,
      formUrl: "/rekrutmen/form",
    },
    content: `**BAKUBACA** membuka panggilan terbuka bagi anak muda, mahasiswa, penulis, penyunting, periset, maupun kreator visual yang percaya bahwa pikiran publik perlu dirawat di luar tekanan algoritma instan.

Rekrutmen ini bukanlah seleksi mencari sosok yang serba tahu atau paling akademis. Kami justru mencari rekan kerja kolektif di **Tim Redaksi** yang peka membaca situasi sekitar, sabar berdiskusi, menghargai keberagaman perspektif **Warga**, dan tekun menjaga kualitas naskah di lima rubrik kami: **Bising**, **Jejak**, **Teras**, **Gurat**, dan **Fragmen**.

---

## Ekosistem Kerja & Belajar Kolektif

Di meja Redaksi Bakubaca, kita tidak hanya menyunting huruf dan ejaan. Bersama-sama kita mendiskusikan isu sosial, melatih ketajaman riset dan wawancara lapangan, merancang tema rubrik, hingga mendampingi Warga baru agar naskah pertamanya terbit dengan penuh percaya diri.

> “Di Bakubaca, kita tidak mencari suara yang seragam. Kita menjaga agar ruang bagi setiap pikiran tetap terbuka, kritis, dan manusiawi.”`,
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
      "Silabus Belajar Menulis, Riset Data, & Produksi Gagasan untuk Warga dan Redaksi Bakubaca",
    badge: "Kurikulum & Pengembangan Literasi",
    metaTitle: "Literatur Liberte | BAKUBACA",
    metaDescription:
      "Silabus pengembangan kemampuan menulis, riset lapangan, pembacaan kebudayaan, dan penyuntingan naskah di BAKUBACA.",
    content: `## Ruang Belajar Berpikir dan Menulis

**Literatur Liberte** adalah modul belajar terbuka bagi tim **Redaksi** maupun para **Warga Bakubaca**. Kami percaya bahwa keberanian bersuara akan jauh lebih berdampak apabila ditopang kebiasaan membaca yang luas, riset yang teliti, dan kemampuan menyusun gagasan dengan jernih.

---

### Modul 01 — Menyuarakan Realitas (BISING)
Membedah bagaimana kritik publik, opini demokrasi, dan persoalan sosial sehari-hari dirangkai menjadi esai argumentatif yang tajam, berbasis data, namun tetap akrab dibaca Warga lintas kalangan.

### Modul 02 — Merekam Pengalaman (JEJAK)
Melatih kepekaan dokumentasi sejarah lokal, kisah perjalanan, wawancara lisan, dan catatan komunitas agar pengalaman warga tidak terhapus dari ingatan kolektif.

### Modul 03 — Merawat Ruang Temu Gagasan (TERAS)
Menurunkan teori filsafat, wacana pendidikan, dan pemikiran intelektual dari menara gading ke percakapan sehari-hari tanpa mengorbankan kedalaman refleksi.

### Modul 04 — Membaca Kebudayaan (GURAT)
Mengasah pisau analisis terhadap karya film, musik, buku, seni rupa, serta fenomena budaya populer sebagai cermin kondisi zaman.

### Modul 05 — Merayakan Ekspresi & Etika Penyuntingan (FRAGMEN)
Mengolah puisi, cerpen, prosa, dan catatan personal, sekaligus memahami kerja kurasi meja **Redaksi BAKUBACA** sesuai kaidah verifikasi, sitasi jujur, dan Pedoman Media Siber.

---

> “Menulis di Bakubaca adalah latihan mendengarkan lebih tajam sebelum merangkai kata bagi sesama Warga.”`,
  },

  // 5. KONSTITUSI BAKUBACA
  konstitusi: {
    slug: "konstitusi",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Konstitusi Bakubaca",
    path: "/konstitusi",
    title: "Konstitusi Kecil Bakubaca",
    subtitle: "“Setiap Pikiran Punya Ruang.”",
    badge: "Statuta & Piagam Kolektif",
    metaTitle: "Konstitusi Kecil | BAKUBACA",
    metaDescription:
      "Konstitusi Kecil BAKUBACA: Setiap Pikiran Punya Ruang. Statuta dasar, prinsip kemandirian, kultur Warga, dan etika Redaksi.",
    content: `## Mukadimah

**BAKUBACA** lahir dari keinginan merawat percakapan publik yang sehat, kritis, jujur, dan berpihak pada kemanusiaan. Di tengah arus konten cepat yang gemar memelihara kegaduhan kosong, Bakubaca memilih menyediakan ruang temu bagi tulisan-tulisan yang dipikirkan dengan sungguh-sungguh.

> **Bakubaca bukanlah mimbar kebenaran tunggal.** Ia adalah ruang bersama di mana setiap Warga berhak menyumbangkan sudut pandang, menguji gagasan, serta saling belajar tanpa takut direndahkan.

---

## BAB I — Tentang BAKUBACA

### Pasal 1 — Identitas
BAKUBACA adalah media gagasan independen berbasis kolektif yang menghadirkan tulisan esai, kritik publik, dokumentasi sejarah, refleksi gagasan, pembacaan kebudayaan, dan karya ekspresi sastra dari serta untuk **Warga**.

### Pasal 2 — Prinsip Dasar
1. Setiap pikiran yang disampaikan secara jujur dan bertanggung jawab berhak mendapat ruang.
2. Kemandirian berarti bebas dari intervensi pemodal, penguasa, maupun agenda iklan terselubung.
3. Kritik ditujukan untuk membenahi keadaan dan menguji gagasan, bukan merendahkan martabat manusia.
4. Pengalaman Warga biasa sama berharganya dengan analisis para pakar.

### Pasal 3 — Lima Rubrik Utama
Seluruh terbitan Bakubaca berlabuh pada lima ruang: **Bising**, **Jejak**, **Teras**, **Gurat**, dan **Fragmen**.

---

## BAB II — Kultur Warga & Redaksi

### Pasal 4 — Cara Kami Berdiskusi
1. Pembaca dan penulis adalah sesama **Warga** yang setara dalam hak berpendapat.
2. Tidak ada senioritas mutlak; argumen diuji lewat kekuatan nalar dan rujukan, bukan status sosial.
3. Tim **Redaksi** bertindak sebagai kurator dan penyunting yang terbuka terhadap dialog dengan penulis.

### Pasal 5 — Cara Kami Menulis
1. Tulisan harus jernih dalam posisi serta menghormati konteks fakta.
2. Gaya penulisan boleh kritis, reflektif, liris, atau akrab, selama dapat dipertanggungjawabkan.
3. Sumber data dan kutipan karya orang lain wajib dicantumkan secara jujur.

---

## BAB III — Etika & Batasan

### Pasal 6 — Hal yang Dilarang
1. Plagiarisme atau pengakuan karya pihak lain dalam bentuk apa pun.
2. Pemalsuan fakta, manipulasi kutipan narasumber, dan penyebaran kabar bohong.
3. Ujaran kebencian berbasis SARA, perundungan, serta pelecehan terhadap kelompok rentan.
4. Artikel berbayar terselubung yang mengkhianati kepercayaan Warga.`,
  },

  // 6. PATUNGAN WARGA / DONASI
  donasi: {
    slug: "donasi",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Patungan Warga",
    path: "/donasi",
    title: "PATUNGAN WARGA: JAGA BAKUBACA TETAP MENGUDARA",
    subtitle: "“Dari Warga, Oleh Warga, Agar Setiap Pikiran Tetap Punya Ruang.”",
    badge: "Solidaritas Warga Bakubaca",
    metaTitle: "Patungan Warga: Sokong Kemandirian | BAKUBACA",
    metaDescription:
      "Dukung kemandirian BAKUBACA lewat Patungan Warga agar tetap merdeka dari kendali oligarki dan nyaman dibaca tanpa iklan pengganggu.",
    extraData: {
      qrisImageUrl: "",
      bankName: "BCA (Bank Central Asia)",
      bankAccountNumber: "0812-3456-7890",
      bankAccountName: "Kolektif Media Bakubaca",
      danaNumber: "0812-3456-7890",
      danaName: "Kolektif Media Bakubaca",
      targetText: "Rp 5.000.000 / Bulan (Server, Apresiasi Warga & Riset)",
    },
    content: `## Mengapa Kami Membuka Patungan Warga?

Menjaga ruang baca agar tetap jernih, mandiri, dan jujur bersuara bukanlah kerja yang ringan. Banyak media akhirnya berkompromi dengan kepentingan komersial ekstrem atau menjejali layar pembaca dengan iklan judi daring dan tautan jebakan hanya untuk membiayai server bulanan.

**BAKUBACA memilih jalan berbeda.**

Kami meyakini kemandirian editorial hanya mungkin bertahan bila disokong bersama oleh para **Warga**:
- **Merdeka dari Tekanan Pemodal:** Redaksi bebas menayangkan kritik sosial dan refleksi Warga tanpa titipan kepentingan.
- **Nyaman untuk Pembaca:** Situs Bakubaca dijaga tetap bersih dari iklan pop-up yang merusak kenyamanan membaca.
- **Hidup Bersama Komunitas:** Menopang penghargaan rutin bagi kontributor Warga serta program literasi kolektif.

---

## Tiga Pilar Alokasi Patungan Warga

Setiap dukungan dari Warga disalurkan secara terbuka untuk menjaga denyut Bakubaca:

1. **Infrastruktur Server & Keamanan Digital**  
   Memastikan situs BAKUBACA tetap cepat, aman, stabil diakses dari daerah mana pun, serta merawat arsip tulisan Warga jangka panjang.

2. **Program Apresiasi Naskah Warga**  
   Mendanai pengiriman buku pilihan Redaksi, kaos, dan tumbler apresiasi bagi para penulis Warga yang karyanya dibaca luas oleh publik.

3. **Riset Lapangan & Kegiatan Literasi Terbuka**  
   Mendukung liputan sosial di rubrik **Bising** dan **Jejak**, serta diskusi literasi komunitas di rubrik **Teras**, **Gurat**, dan **Fragmen**.

---

> “Satu cangkir kopi yang kamu sisihkan hari ini ikut menjaga agar besok setiap pikiran masih punya ruang untuk tumbuh dan terbaca.”`,
  },

  // 7. REDAKSI & KONTAK
  kontak: {
    slug: "kontak",
    group: "kanal-gerakan",
    groupLabel: "KANAL & GERAKAN",
    name: "Redaksi & Kontak",
    path: "/kontak",
    title: "REDAKSI & KERJA SAMA BAKUBACA",
    subtitle:
      "Punya pertanyaan seputar pengiriman naskah, hak jawab, kolaborasi literasi, atau aduan? Tim Redaksi Bakubaca siap mendengarkan Warga.",
    badge: "Hubungi Redaksi",
    metaTitle: "Kontak & Meja Redaksi | BAKUBACA",
    metaDescription:
      "Hubungi Tim Redaksi BAKUBACA untuk konsultasi naskah Warga, hak jawab, korespondensi, maupun kerja sama literasi.",
    extraData: {
      office: "Ruang Redaksi Bakubaca",
      address: "Majene, Sulawesi Barat",
      email: "redaksi@belokiri.id",
      whatsapp: "0812-3456-7890",
      hours: "Senin – Jumat: 09.00 – 21.00 WITA",
    },
    content: `## Saluran Komunikasi Redaksi

**BAKUBACA** terbuka bagi setiap **Warga** untuk berkorespondensi — mulai dari konsultasi naskah, permohonan hak jawab dan ralat, rilis kegiatan budaya/komunitas, hingga kerja sama acara literasi.

### Meja Redaksi Bakubaca
Korespondensi resmi dapat diarahkan melalui kanal berikut:
- **Alamat Redaksi:** Majene, Sulawesi Barat
- **Surel Utama Redaksi:** \`redaksi@belokiri.id\`
- **Surel Kerja Sama & Komunitas:** \`kerjasama@belokiri.id\`
- **WhatsApp Layanan Warga:** 0812-3456-7890

---

### Masukan Anonim & Tips Informasi
Jika Anda memiliki informasi kepentingan publik atau masukan kritis bagi pengembangan **Bakubaca** yang ingin disampaikan secara tertutup, gunakan fitur **Surat Kaleng Warga** dengan kerahasiaan pengirim yang dijaga penuh oleh Redaksi.`,
  },

  // 8. KABINET REDAKSI (route tetap /kabinet-belokiri pada Fase 1)
  "kabinet-belokiri": {
    slug: "kabinet-belokiri",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Kabinet Redaksi",
    path: "/kabinet-belokiri",
    title: "KABINET REDAKSI BAKUBACA",
    subtitle:
      "Susunan pengurus, penyunting rubrik, dan penggerak utama di balik meja Redaksi BAKUBACA.",
    badge: "Struktur & Tim Redaksi",
    metaTitle: "Kabinet Redaksi | BAKUBACA",
    metaDescription:
      "Profil Dewan Redaksi dan penanggung jawab lima rubrik BAKUBACA.",
    content: `## Dewan Pengurus & Meja Kerja Redaksi

**Kabinet Redaksi BAKUBACA** merupakan kolektif penggerak yang mengurus penyuntingan naskah Warga, kurasi kelima rubrik (**Bising**, **Jejak**, **Teras**, **Gurat**, **Fragmen**), pengelolaan visual, hingga penguatan komunitas pembaca.

Struktur ini dibangun secara egaliter dan kolaboratif demi memastikan Bakubaca senantiasa menjadi ruang yang hangat namun tetap kritis.

---

> Susunan anggota, peran rubrik, foto profil, dan keterangan tim dapat diperbarui langsung melalui panel admin **Kelola Website > Tab Kabinet**.`,
  },

  // 9. PEDOMAN MEDIA SIBER
  "pedoman-media-siber": {
    slug: "pedoman-media-siber",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Pedoman Media Siber",
    path: "/pedoman-media-siber",
    title: "PEDOMAN MEDIA SIBER",
    subtitle:
      "Sebagai media gagasan yang tumbuh di ruang digital, BAKUBACA berpegang pada keterbukaan informasi, verifikasi jujur, dan etika jurnalistik yang bertanggung jawab.",
    badge: "Standar Editorial & Etika Publikasi",
    metaTitle: "Pedoman Media Siber | BAKUBACA",
    metaDescription:
      "Pedoman pemberitaan media siber BAKUBACA yang menjunjung integritas data, hak jawab, dan keterlibatan Warga.",
    content: `## 01. Ruang Lingkup
Media Siber **BAKUBACA** adalah ruang publikasi independen yang menyajikan esai sosial-politik, arsip sejarah warga, refleksi pengetahuan, tinjauan budaya, dan karya ekspresi sastra. Pedoman ini mengikat seluruh jajaran **Tim Redaksi** maupun kontributor **Warga**.

---

## 02. Verifikasi dan Keberimbangan
Setiap tulisan yang memuat fakta lapangan, kutipan data, maupun kritik kebijakan wajib disusun dengan iktikad baik, rujukan yang jelas, serta argumentasi yang dapat dipertanggungjawabkan kepada publik.

---

## 03. Karya Kontributor (User Generated Content)
**BAKUBACA** membuka ruang kirim naskah dan Surat Kaleng bagi seluruh **Warga**. Melalui proses sunting Redaksi, naskah terbit dilarang memuat fitnah tanpa dasar, ujaran kebencian berbasis SARA, pelanggaran privasi anak di bawah umur, maupun serangan pribadi non-substantif.

---

## 04. Ralat, Koreksi, dan Hak Jawab
Ralat, koreksi redaksional, dan hak jawab dari pihak terkait akan ditautkan secara jelas pada artikel bersangkutan secara setara, transparan, dan proporsional.

---

## 05. Pencabutan Tulisan
Tulisan yang telah terbit di Bakubaca tidak dapat dicabut akibat tekanan kekuasaan maupun komersial sepihak, kecuali menyangkut pelanggaran berat hukum yang sah, keselamatan individu rentan, atau kesalahan faktual mendasar atas pertimbangan Dewan Redaksi.

---

## 06. Hak Cipta & Sitasi
**BAKUBACA** menghormati hak cipta setiap penulis, fotografer, dan ilustrator. Tindakan plagiarisme berakibat penolakan permanen oleh Tim Redaksi.

---

> **Layanan Etika & Hak Jawab:** Kirimkan permohonan klarifikasi atau koreksi ke **redaksi@belokiri.id**.`,
  },

  // 10. DISCLAIMER
  disclaimer: {
    slug: "disclaimer",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Disclaimer",
    path: "/disclaimer",
    title: "DISCLAIMER",
    subtitle:
      "Pernyataan sangkalan serta kejelasan status tanggung jawab tulisan yang terbit di situs BAKUBACA.",
    badge: "Batasan Tanggung Jawab Publikasi",
    metaTitle: "Disclaimer | BAKUBACA",
    metaDescription:
      "Penjelasan hukum mengenai tanggung jawab opini Warga, karya fiksi, dan tautan eksternal pada situs BAKUBACA.",
    content: `## 1. Opini Pribadi Warga
Seluruh esai, opini, ulasan budaya, dan catatan refleksi yang ditulis oleh kontributor **Warga** di **BAKUBACA** merupakan pandangan pribadi penulisnya masing-masing, dan tidak selalu mewakili posisi resmi kolektif Redaksi secara keseluruhan.

---

## 2. Karya Kreatif & Fiksi
Naskah di rubrik **FRAGMEN** maupun catatan refleksi personal di rubrik **TERAS** dapat memuat karya fiksi seperti cerpen, puisi, prosa liris, serta metafora sastra. Kesamaan nama tokoh atau situasi dalam karya fiksi bersifat kebetulan artistik.

---

## 3. Akurasi Informasi & Tautan Eksternal
Meski **Tim Redaksi BAKUBACA** melakukan penyuntingan dan pemeriksaan akurasi secara berkala, Bakubaca tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penafsiran sepihak atau perubahan konten pada tautan eksternal pihak ketiga.

---

## 4. Hak Cipta & Kutipan
Hak cipta naskah tetap melekat pada penulis dengan hak publikasi digital di **BAKUBACA**. Pengutipan untuk studi, diskusi publik, maupun tujuan non-komersial diperkenankan selama mencantumkan nama penulis dan tautan asal artikel Bakubaca.

---

## 5. Pembaruan & Penyuntingan Naskah
**Redaksi BAKUBACA** berhak memperbaiki salah tik, merapikan tipografi, atau menambahkan catatan klarifikasi demi kenyamanan baca Warga.`,
  },

  // 11. KEBIJAKAN PRIVASI
  "kebijakan-privasi": {
    slug: "kebijakan-privasi",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Kebijakan Privasi",
    path: "/kebijakan-privasi",
    title: "KEBIJAKAN PRIVASI",
    subtitle:
      "Bakubaca menghargai privasi setiap Warga serta menolak praktik pelacakan dan perdagangan data pribadi.",
    badge: "Perlindungan Data Warga",
    metaTitle: "Kebijakan Privasi | BAKUBACA",
    metaDescription:
      "Komitmen BAKUBACA dalam menjaga keamanan akun penulis Warga, kerahasiaan Surat Kaleng, dan data formulir redaksi.",
    content: `## 1. Kerahasiaan Surat Kaleng Warga
Fitur **Surat Kaleng Warga** dirancang untuk menampung suara, kritik, dan informasi pembaca tanpa memaksa pencantuman identitas asli. Nama samaran digunakan semata untuk pengarsipan meja Redaksi.

---

## 2. Data Akun Warga & Pendaftaran Redaksi
Data profil penulis (nama, email, biografi) dan informasi formulir rekrutmen **Tim Redaksi** hanya dimanfaatkan untuk komunikasi penyuntingan naskah serta koordinasi internal. **BAKUBACA** tidak pernah menjual, menyewakan, atau membagikan data Warga kepada broker data maupun pihak ketiga pengiklan.

---

## 3. Cookie Sesi & Penyimpanan Lokal
Situs **BAKUBACA** hanya menyimpan cookie sesi autentikasi akun dan preferensi ringan di browser Anda agar fitur kirim tulisan dan interaksi pembaca bekerja dengan aman tanpa pelacak lintas situs komersial.

---

## 4. Hak Penghapusan Data
Setiap Warga berhak meminta pembaruan atau penghapusan data akun dari basis data **BAKUBACA** dengan menghubungi **redaksi@belokiri.id**.`,
  },

  // 12. SYARAT & KETENTUAN
  "syarat-ketentuan": {
    slug: "syarat-ketentuan",
    group: "sindikasi-arsip",
    groupLabel: "SINDIKASI & ARSIP",
    name: "Syarat & Ketentuan",
    path: "/syarat-ketentuan",
    title: "SYARAT & KETENTUAN",
    subtitle:
      "Ketentuan penggunaan platform, pengiriman naskah, dan etika berinteraksi antar-Warga di BAKUBACA.",
    badge: "Ketentuan Penggunaan Situs",
    metaTitle: "Syarat & Ketentuan | BAKUBACA",
    metaDescription:
      "Syarat pengiriman karya Warga, hak penyuntingan Redaksi, dan etika bersama di platform BAKUBACA.",
    content: `## 1. Keaslian Naskah Warga
Setiap tulisan yang dikirimkan oleh **Warga** melalui meja penulis **BAKUBACA** harus merupakan karya orisinal dan tidak melanggar hak cipta pihak lain. Penulis bertanggung jawab penuh atas keaslian gagasan serta kutipan rujukan yang digunakan.

---

## 2. Hak Penyuntingan Redaksi
**Tim Redaksi BAKUBACA** berhak menyunting judul, merapikan EYD/tata bahasa, atau meminta revisi kepada penulis demi menjaga kejelasan argumen tanpa mengubah maksud pokok penulis. Redaksi berhak menolak naskah yang melanggar Pedoman Media Siber maupun Konstitusi Kecil Bakubaca.

---

## 3. Etika Ruang Bersama
Kami merayakan kritik tajam dan perbedaan pemikiran di ruang **Bakubaca**, namun melarang keras ancaman kekerasan, ujaran kebencian berbasis SARA, pelecehan verbal, serta penyebaran informasi pribadi orang lain tanpa izin (doxxing).

---

## 4. Penyesuaian Ketentuan
Ketentuan ini dapat diperbarui sewaktu-waktu seiring bertumbuhnya komunitas **BAKUBACA**, dan perubahan akan selalu ditayangkan terbuka pada halaman ini.`,
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
      badge: "Halaman Bakubaca",
      metaTitle: `${slug.toUpperCase()} | BAKUBACA`,
      metaDescription: `Halaman ${slug} resmi BAKUBACA — Setiap Pikiran Punya Ruang.`,
      content: "",
    };
  }
  return page;
}
