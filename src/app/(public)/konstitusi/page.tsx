import { Metadata } from "next";
import Link from "next/link";
import { Scale, ShieldCheck, BookMarked, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Konstitusi Kecil | BELOKIRI",
  description:
    "Konstitusi Kecil Belokiri.id: Liar Seperlunya, Jenaka Secukupnya. Statuta dasar, kultur internal, etika, dan prinsip kolektif.",
};

export default function KonstitusiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Scale className="w-3.5 h-3.5" />
          <span>Statuta & Piagam Kolektif</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          Konstitusi Kecil Belokiri.id
        </h1>

        <p className="text-lg sm:text-2xl font-black text-red-600 uppercase tracking-wide">
          “Liar Seperlunya, Jenaka Secukupnya”
        </p>

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* Mukadimah */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-6 text-zinc-900 leading-relaxed">
        <div className="border-b-2 border-red-600 pb-3">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
            Mukadimah
          </h2>
        </div>

        <div className="space-y-4 text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
          <p>
            Belokiri.id lahir dari kegelisahan terhadap jagat maya yang semakin bising oleh narasi seragam. Kami percaya bahwa media bukan sekadar alat penyampai informasi, melainkan ruang perebutan makna. Di tengah arus informasi yang dipoles demi kenyamanan, kami memilih berdiri sebagai ruang yang tetap curiga, tetap bertanya, dan tetap berpihak pada realitas yang sering disembunyikan.
          </p>
          <p>
            Kami sadar bahwa hari ini semua orang bisa berbicara, tetapi tidak semua orang benar-benar mendengar. Timeline dipenuhi opini cepat, kemarahan instan, dan keberanian yang sering berhenti sebatas kolom komentar. Di situ, Belokiri.id mencoba mengambil jarak dari kebisingan yang serba tergesa. Kami ingin membangun ruang yang tidak hanya ramai oleh reaksi, tetapi juga hidup oleh refleksi, tempat gagasan bisa diperdebatkan, kegelisahan bisa dirawat, dan tulisan tidak kehilangan keberaniannya hanya demi terlihat aman atau disukai banyak orang.
          </p>
          <p className="font-bold text-black border-l-4 border-black pl-4 py-1">
            Belokiri.id bukan institusi suci, bukan pula ruang paling benar. Ia adalah kolektif yang percaya bahwa tulisan bisa menjadi alat untuk membongkar, mengingat, dan melawan lupa. Karena itu, setiap orang yang masuk ke dalamnya tidak hanya membawa kemampuan menulis, tetapi juga tanggung jawab berpikir.
          </p>
        </div>
      </section>

      {/* BAB I — Tentang Belokiri.id */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b-2 border-black pb-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block">
            Bagian Pertama
          </span>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            BAB I — Tentang Belokiri.id
          </h2>
        </div>

        {/* Pasal 1 */}
        <div className="space-y-2 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 1 — Identitas
          </span>
          <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-normal">
            Belokiri.id adalah media alternatif berbasis kolektif yang bergerak dalam produksi tulisan, opini, satire, dan narasi sosial-politik dengan keberpihakan pada rakyat dan kelompok yang suaranya kerap dipinggirkan.
          </p>
        </div>

        {/* Pasal 2 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 2 — Sikap Dasar
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">1.</span>
              <span>Belokiri.id tidak percaya pada netralitas yang pura-pura.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">2.</span>
              <span>Independensi berarti bebas berpihak tanpa tekanan kekuasaan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">3.</span>
              <span>Kritik adalah bentuk kepedulian, bukan kebencian.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">4.</span>
              <span>Satire adalah alat baca realitas, bukan pelarian dari realitas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">5.</span>
              <span>Humor boleh tajam, tetapi tidak boleh malas berpikir.</span>
            </li>
          </ol>
        </div>

        {/* Pasal 3 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 3 — Tujuan
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">1.</span>
              <span>Membangun ruang berpikir kritis bagi anak muda.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">2.</span>
              <span>Menghasilkan tulisan yang punya posisi dan keberanian.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">3.</span>
              <span>Menjadi ruang belajar kolektif, bukan pabrik konten.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">4.</span>
              <span>Menjaga narasi tetap hidup di tangan publik.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* BAB II — Kultur Internal */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b-2 border-black pb-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block">
            Bagian Kedua
          </span>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            BAB II — Kultur Internal
          </h2>
        </div>

        {/* Pasal 4 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 4 — Cara Kami Berpikir
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">1.</span>
              <span>Tidak semua hal harus disetujui, tetapi semua hal boleh diperdebatkan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">2.</span>
              <span>Ide boleh dibantah, manusia tidak perlu direndahkan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">3.</span>
              <span>Tidak ada senioritas absolut dalam gagasan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">4.</span>
              <span>Yang paling keras bukan berarti paling benar.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">5.</span>
              <span>Keberanian tanpa riset hanyalah kebisingan.</span>
            </li>
          </ol>
        </div>

        {/* Pasal 5 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 5 — Cara Kami Menulis
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">1.</span>
              <span>Tulisan harus punya posisi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">2.</span>
              <span>Hindari jargon kosong dan kemarahan instan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">3.</span>
              <span>Jangan menulis demi terlihat pintar; menulislah agar bisa dipahami.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">4.</span>
              <span>Satire tanpa substansi hanya akan menjadi lelucon lewat.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-black shrink-0">5.</span>
              <span>Setiap tulisan harus bisa dipertanggungjawabkan.</span>
            </li>
          </ol>
        </div>

        {/* Pasal 6 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 6 — Cara Kami Bekerja
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">1.</span>
              <span>Revisi bukan penghinaan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">2.</span>
              <span>Kritik internal adalah bentuk solidaritas intelektual.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">3.</span>
              <span>Tidak ada kultus individu dalam meja Agen Belokan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">4.</span>
              <span>Semua anggota berhak bicara, semua tulisan berhak dikritik.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">5.</span>
              <span>Kesalahan boleh terjadi, manipulasi tidak.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* BAB III — Etika Belokiri.id */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b-2 border-black pb-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block">
            Bagian Ketiga
          </span>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            BAB III — Etika Belokiri.id
          </h2>
        </div>

        {/* Pasal 7 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 7 — Hal yang Dijaga
          </span>
          <ol className="space-y-2 text-sm text-zinc-800 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">1.</span>
              <span>Tidak melakukan plagiarisme dalam bentuk apa pun.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">2.</span>
              <span>Tidak menyebarkan hoaks, disinformasi, dan fitnah.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">3.</span>
              <span>Tidak menggunakan isu rakyat sebagai estetika kosong belaka.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">4.</span>
              <span>Tidak menyerang identitas personal yang tidak relevan dengan kritik substansi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-red-600 shrink-0">5.</span>
              <span>Tidak menjadikan media sebagai alat mencari validasi pribadi semata.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* BAB IV — Tentang Anggota */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b-2 border-black pb-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-red-600 block">
            Bagian Keempat
          </span>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            BAB IV — Tentang Anggota
          </h2>
        </div>

        {/* Pasal 8 */}
        <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
            Pasal 8 — Siapa yang Bisa Masuk
          </span>
          <p className="text-sm text-zinc-700 font-medium">
            Belokiri.id terbuka bagi siapa saja yang:
          </p>
          <ul className="space-y-2 text-sm text-zinc-800 font-normal pl-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-red-600 shrink-0" />
              <span>Mau belajar,</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-red-600 shrink-0" />
              <span>Mau membaca,</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-red-600 shrink-0" />
              <span>Mau menerima kritik,</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-red-600 shrink-0" />
              <span>Dan tidak alergi terhadap kegelisahan.</span>
            </li>
          </ul>
          <p className="text-xs text-zinc-500 font-bold italic pt-2">
            Kami tidak mencari orang paling sempurna. Kami mencari mereka yang masih punya rasa ingin tahu.
          </p>
        </div>
      </section>

      {/* BAB V — Penutup */}
      <section className="bg-black text-white rounded-3xl p-8 sm:p-12 border-t-4 border-red-600 space-y-6 text-center sm:text-left">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Bagian Kelima
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          BAB V — Penutup
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
          <p>
            Belokiri.id sadar bahwa dunia tidak berubah hanya karena satu tulisan. Namun, kami juga tahu bahwa banyak perubahan besar lahir dari orang-orang yang dulu dianggap terlalu berisik, terlalu kritis, atau terlalu liar.
          </p>
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-black text-lg sm:text-xl space-y-1">
            <p className="text-red-500">Karena itu, Belokiri.id memilih tetap ada:</p>
            <p>Untuk menyusup di antara narasi,</p>
            <p>Mengganggu kenyamanan,</p>
            <p>Dan memastikan bahwa kegelisahan tidak mati sendirian.</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/rekrutmen"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            <span>Bergabung Melalui Rekrutmen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/manifesto"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-800 text-white text-xs font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            <span>Baca Manifesto</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
