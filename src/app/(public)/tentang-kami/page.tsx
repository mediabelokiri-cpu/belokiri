import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Compass, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
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
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
          Tentang Kami
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-stone-900 tracking-tight">
          NALAR
        </h1>
        <p className="text-xl sm:text-2xl font-serif text-stone-600 italic">
          “Melihat lebih dari sekadar kabar.”
        </p>
      </div>

      {/* Filosofi Produk */}
      <section className="prose prose-stone prose-lg max-w-none text-stone-700 leading-relaxed">
        <p className="lead text-xl font-serif text-stone-900">
          Berita memberi tahu apa yang terjadi. NALAR membantu melihat lebih jauh.
        </p>
        <p>
          NALAR adalah platform media online yang tidak hanya menyampaikan rentetan
          peristiwa, melainkan membantu pembaca memahami konteks, melihat perspektif
          yang berbeda, dan menemukan cerita manusia serta masyarakat di balik setiap kabar.
        </p>
        <p>
          Kami meyakini bahwa jurnalisme tidak seharusnya hanya mengejar kecepatan
          tanpa kedalaman. Di tengah banjir informasi dan percepatan digital,
          NALAR hadir sebagai ruang jeda yang mengutamakan <strong>fakta, data,
          konteks, observasi lapangan, dan pengalaman manusia</strong>.
        </p>
      </section>

      {/* 3 Karakter Utama Editorial */}
      <section className="p-8 sm:p-10 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
          Tiga Karakter Editorial NALAR
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Tajam & Kritis
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tidak berhenti pada permukaan berita. Kami menjawab apa yang terjadi,
              mengapa terjadi, apa konteksnya, dan siapa yang terdampak.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Berani & Berbeda
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mencari sudut pandang alternatif yang berlandaskan data, fakta,
              dan observasi kuat, tanpa mengejar sensasi murah demi atensi.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Modern & Dekat Muda
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bahasa lugas, modern, mudah dipahami, tidak kaku, dan dekat dengan
              pelajar, mahasiswa, serta generasi masa depan.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Rubrik */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-serif text-stone-900">
          Struktur 8 Rubrik NALAR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_RUBRIKS.map((r) => (
            <div
              key={r.slug}
              className="p-5 rounded-xl bg-white border border-stone-200"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-stone-900 text-lg">
                  {r.name}
                </span>
                <span className="text-[11px] font-semibold text-amber-800 italic">
                  “{r.question}”
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-stone-900 text-stone-100 text-center space-y-4">
        <h3 className="text-xl font-bold font-serif text-white">
          Bergabung Menjadi Kontributor
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
          Suara dan perspektifmu penting bagi publik. Tulis dan kirimkan naskah
          kritis atau human interest-mu ke meja redaksi kami.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
        >
          <span>Daftar / Masuk Kontributor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
