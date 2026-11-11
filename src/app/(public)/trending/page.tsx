export const revalidate = 60;

import { Metadata } from "next";
import Link from "next/link";
import { getPopularArticles, getAllRubriks } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Tulisan Trending & Terpopuler | BAKUBACA",
  description:
    "Kumpulan esai, kritik, dan gagasan yang paling banyak dibaca dan ramai dibicarakan di BAKUBACA.",
};

export default async function TrendingPage() {
  const [articles, rubriks] = await Promise.all([
    getPopularArticles(24),
    getAllRubriks(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="border-b-2 border-[#1f1f1f] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#4c13ff] mb-1.5">
            <Flame className="w-4 h-4" aria-hidden="true" />
            <span>Paling Banyak Dibaca</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1f1f1f] tracking-tight uppercase">
            SEDANG TRENDING
          </h1>
          <p className="text-sm text-zinc-600 mt-1 font-normal">
            Naskah pilihan Warga dan Redaksi yang paling menyedot perhatian pembaca Bakubaca.
          </p>
        </div>

        <span className="text-xs text-zinc-600 font-bold bg-white px-3 py-1.5 rounded-lg border border-zinc-200">
          Menampilkan <strong className="text-[#4c13ff]">{articles.length}</strong> tulisan populer
        </span>
      </div>

      {/* Rubrik Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 text-xs font-black uppercase tracking-wider">
        <span className="text-zinc-500 text-[11px] shrink-0 mr-1">
          Jelajahi:
        </span>
        <Link
          href="/trending"
          aria-current="page"
          className="px-4 py-2 rounded-full bg-[#4c13ff] text-white shrink-0 shadow-xs"
        >
          Trending
        </Link>
        <Link
          href="/berita"
          className="px-4 py-2 rounded-full bg-white border border-zinc-200 hover:border-[#4c13ff] text-[#1f1f1f] hover:text-[#4c13ff] shrink-0 transition-colors shadow-xs"
        >
          Terkini
        </Link>
        {rubriks.map((r) => (
          <Link
            key={r.slug}
            href={`/kategori/${r.slug}`}
            className="px-4 py-2 rounded-full bg-white border border-zinc-200 hover:border-[#4c13ff] text-[#1f1f1f] hover:text-[#4c13ff] shrink-0 transition-colors shadow-xs"
          >
            {r.name}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-zinc-200 p-8 shadow-xs">
          <Flame className="w-10 h-10 text-zinc-300 mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-base font-black uppercase text-zinc-800 tracking-tight">
            Belum Ada Artikel Trending
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
            Tulisan terpopuler akan tampil otomatis seiring jumlah pembaca bertambah.
          </p>
          <div className="pt-4">
            <Link
              href="/kirim-tulisan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4c13ff] hover:bg-[#3d0dd9] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
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
