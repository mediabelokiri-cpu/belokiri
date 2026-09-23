import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";

export const metadata: Metadata = {
  title: "Tentang NALAR — Melihat Lebih dari Sekadar Kabar",
  description:
    "Mengenal visi, filosofi jurnalistik, dan karakter editorial NALAR sebagai media berita, analisis, dan cerita manusia.",
};

export default function TentangKamiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
          Tentang Kami
        </span>
        <div className="flex items-center justify-center gap-1.5">
          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight uppercase">
            NALAR
          </h1>
          <span className="w-3.5 h-3.5 rounded-full bg-red-600 mt-2 sm:mt-3" />
        </div>
        <p className="text-xl sm:text-2xl font-black text-zinc-700 uppercase tracking-wide">
          “Melihat lebih dari sekadar kabar”
        </p>
      </div>

      {/* Filosofi Produk */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-zinc-800 leading-relaxed text-base sm:text-lg">
        <p className="text-xl sm:text-2xl font-black text-black border-l-4 border-red-600 pl-4 py-1 leading-snug">
          Berita memberi tahu apa yang terjadi. NALAR membantu melihat lebih jauh.
        </p>
        <p className="font-normal text-zinc-600">
          NALAR adalah platform media online yang tidak hanya menyampaikan rentetan
          peristiwa, melainkan membantu pembaca memahami konteks, melihat perspektif
          yang berbeda, dan menemukan cerita manusia serta masyarakat di balik setiap kabar.
        </p>
        <p className="font-normal text-zinc-600">
          Kami meyakini bahwa jurnalisme tidak seharusnya hanya mengejar kecepatan
          tanpa kedalaman. Di tengah banjir informasi dan percepatan digital,
          NALAR hadir sebagai ruang jeda yang mengutamakan <strong className="text-black font-black">fakta, data,
          konteks, observasi lapangan, dan pengalaman manusia</strong>.
        </p>
      </section>

      {/* 3 Karakter Utama Editorial */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-6">
        <div className="border-b-2 border-black pb-3">
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            Tiga Karakter Editorial NALAR
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="font-black text-lg text-black uppercase">
              Tajam & Kritis
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Tidak berhenti pada permukaan berita. Kami menjawab apa yang terjadi,
              mengapa terjadi, apa konteksnya, dan siapa yang terdampak.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="font-black text-lg text-black uppercase">
              Berani & Berbeda
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Mencari sudut pandang alternatif yang berlandaskan data, fakta,
              dan observasi kuat, tanpa mengejar sensasi murah demi atensi.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="font-black text-lg text-black uppercase">
              Modern & Dekat Muda
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Bahasa lugas, modern, mudah dipahami, tidak kaku, dan dekat dengan
              pelajar, mahasiswa, serta generasi masa depan.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Rubrik */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          Struktur 8 Rubrik NALAR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_RUBRIKS.map((r) => (
            <div
              key={r.slug}
              className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:border-red-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-black text-lg uppercase">
                  {r.name}
                </span>
                <span className="text-[11px] font-bold text-red-600 italic">
                  “{r.question}”
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-normal">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-black text-white text-center space-y-4 border-t-4 border-red-600">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
          Bergabung Menjadi Kontributor
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-normal">
          Suara dan perspektifmu penting bagi publik. Tulis dan kirimkan naskah
          kritis atau human interest-mu ke meja redaksi kami.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
        >
          <span>Daftar / Masuk Kontributor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
