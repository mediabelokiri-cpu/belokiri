import { Metadata } from "next";
import Link from "next/link";
import { Shield, BookOpen, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pedoman Media Siber | BELOKIRI",
  description: "Pedoman pemberitaan media siber BELOKIRI yang berpegang pada independensi, verifikasi fakta, dan etika pers rakyat.",
};

export default function PedomanMediaSiberPage() {
  const points = [
    {
      num: "01",
      title: "Ruang Lingkup",
      desc: "Media Siber BELOKIRI adalah media publikasi alternatif daring yang menyajikan esai, jurnalisme warga, arsip sejarah rakyat, dan analisis kritis. Pedoman ini mengikat seluruh pengelola, Dewan Belokan, agen rubrik, dan kontributor.",
    },
    {
      num: "02",
      title: "Verifikasi dan Keberimbangan Berita",
      desc: "Setiap informasi yang mengandung tuduhan atau fakta lapangan wajib diverifikasi dengan iktikad baik. Dalam artikel opini dan esai kritis, penulis wajib menyertakan rujukan yang dapat dipertanggungjawabkan serta argumentasi yang berdasar.",
    },
    {
      num: "03",
      title: "Isi Buatan Pengguna (User Generated Content)",
      desc: "BELOKIRI menyediakan ruang bagi Warga Belokan untuk mengirimkan tulisan dan surat kaleng. Naskah yang dimuat melalui kurasi editorial tidak boleh memuat ujaran kebencian berbasis SARA, pornografi anak, atau fitnah tanpa dasar faktual.",
    },
    {
      num: "04",
      title: "Ralat, Koreksi, dan Hak Jawab",
      desc: "Ralat, koreksi, dan hak jawab wajib ditautkan pada berita atau artikel yang diralat. Pihak yang merasa dirugikan oleh tulisan di BELOKIRI berhak mengajukan bantahan dan klarifikasi yang akan dipublikasikan secara setara dan proporsional.",
    },
    {
      num: "05",
      title: "Pencabutan Berita",
      desc: "Artikel yang sudah dipublikasikan tidak dapat dicabut semata-mata karena tekanan pihak luar atau pemilik kuasa, kecuali terkait persoalan SARA mendesak, masa depan anak di bawah umur, atau atas rekomendasi hukum yang sah.",
    },
    {
      num: "06",
      title: "Hak Cipta dan Praktik Sitasi",
      desc: "BELOKIRI menghargai hak cipta setiap penulis, fotografer, dan ilustrator. Plagiarisme dalam bentuk apa pun adalah pelanggaran berat di BELOKIRI dan berakibat pemutusan hubungan kontributor secara permanen.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <header className="space-y-3">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          STANDAR EDITORIAL & PERS ALTERNATIF
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          PEDOMAN MEDIA SIBER
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
          Sebagai media independen yang bernapas di ruang digital, BELOKIRI menjunjung tinggi
          prinsip keterbukaan, akuntabilitas publik, dan etika pers yang berpihak pada akal sehat.
        </p>
      </header>

      <div className="space-y-6">
        {points.map((p) => (
          <div
            key={p.num}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded-md bg-red-600 text-white">
                {p.num}
              </span>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-black">
                {p.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-2">
        <p className="font-bold text-black uppercase tracking-wider">
          Pengaduan Etika & Hak Jawab:
        </p>
        <p>
          Kirimkan surat permohonan hak jawab, klarifikasi, atau laporan pelanggaran kode etik ke:{" "}
          <strong className="text-red-600">redaksi@belokiri.id</strong> atau via pos ke Meja Redaksi BELOKIRI.
        </p>
      </div>
    </div>
  );
}
