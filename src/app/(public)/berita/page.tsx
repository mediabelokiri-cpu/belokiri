export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import { getLatestArticles, getAllRubriks } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Arsip Berita & Tulisan Terkini | BELOKIRI",
  description: "Indeks seluruh kabar, analisis, dan perspektif terbaru yang diterbitkan oleh BELOKIRI.",
};

export default async function BeritaPage() {
  const [{ articles, total }, rubriks] = await Promise.all([
    getLatestArticles(20, 1),
    getAllRubriks(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="border-b-2 border-black pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-1.5">
            <Newspaper className="w-4 h-4" />
            <span>Indeks Kronologis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            BERITA & TULISAN TERKINI
          </h1>
          <p className="text-sm text-zinc-600 mt-1 font-normal">
            Menampilkan seluruh tulisan terverifikasi Agen Belokan secara kronologis.
          </p>
        </div>

        <span className="text-xs text-zinc-600 font-bold bg-white px-3 py-1.5 rounded-lg border border-zinc-200">
          Total: <strong className="text-red-600">{total}</strong> artikel
        </span>
      </div>

      {/* Rubrik Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 text-xs font-black uppercase tracking-wider">
        <span className="text-zinc-400 text-[11px] shrink-0 mr-1">
          Filter:
        </span>
        <Link
          href="/berita"
          className="px-4 py-2 rounded-lg bg-red-600 text-white shrink-0 shadow-xs"
        >
          Semua Rubrik
        </Link>
        {rubriks.map((r) => (
          <Link
            key={r.slug}
            href={`/kategori/${r.slug}`}
            className="px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:border-red-600 text-black hover:text-red-600 shrink-0 transition-colors shadow-xs"
          >
            {r.name}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-zinc-200 p-8 shadow-xs">
          <Newspaper className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <h2 className="text-base font-black uppercase text-zinc-800 tracking-tight">
            Belum Ada Artikel yang Diterbitkan
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
            Redaksi BELOKIRI belum menerbitkan naskah di indeks ini. Jadilah penulis pertama yang berkontribusi!
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Kirim Tulisan</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
