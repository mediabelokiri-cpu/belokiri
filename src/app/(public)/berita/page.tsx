import { Metadata } from "next";
import Link from "next/link";
import { getLatestArticles, getAllRubriks } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { Sparkles, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Arsip Berita & Tulisan Terkini | NALAR",
  description: "Indeks seluruh kabar, analisis, dan perspektif terbaru yang diterbitkan oleh NALAR.",
};

export default async function BeritaPage() {
  const [{ articles, total }, rubriks] = await Promise.all([
    getLatestArticles(20, 1),
    getAllRubriks(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Newspaper className="w-4 h-4" />
            <span>Indeks Kronologis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-serif text-stone-900 tracking-tight">
            Berita & Tulisan Terkini
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Menampilkan seluruh tulisan terverifikasi redaksi secara kronologis.
          </p>
        </div>

        <span className="text-xs text-stone-500 font-medium">
          Total: <strong>{total}</strong> artikel
        </span>
      </div>

      {/* Rubrik Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 text-xs font-semibold">
        <span className="text-stone-400 uppercase tracking-wider text-[11px] shrink-0 mr-2">
          Filter:
        </span>
        <Link
          href="/berita"
          className="px-3.5 py-1.5 rounded-full bg-stone-900 text-white shrink-0 shadow-xs"
        >
          Semua Rubrik
        </Link>
        {rubriks.map((r) => (
          <Link
            key={r.slug}
            href={`/kategori/${r.slug}`}
            className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 shrink-0 transition-colors"
          >
            {r.name}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
