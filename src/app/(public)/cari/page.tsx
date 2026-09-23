import { Metadata } from "next";
import Link from "next/link";
import { searchArticles } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { Search, FileSearch, ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Pencarian: "${q}" | BELOKIRI` : "Pencarian Tulisan & Analisis | BELOKIRI",
    description: "Cari artikel, esai, dan perspektif mendalam di BELOKIRI.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const { articles, count } = await searchArticles(query);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
          PENCARIAN ARTIKEL & ANALISIS
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-normal">
          Temukan kabar, investigasi data, atau esai opini berdasarkan kata kunci,
          topik, atau nama penulis.
        </p>

        <form action="/cari" method="GET" className="relative mt-4">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Ketik topik, judul, atau kata kunci..."
            className="w-full px-5 py-3.5 pl-12 rounded-xl bg-white border border-zinc-300 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm shadow-xs font-medium"
            autoFocus={!query}
          />
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Result Meta */}
      {query && (
        <div className="border-b border-zinc-200 pb-4 flex items-center justify-between text-xs text-zinc-600 font-medium">
          <div>
            Menampilkan hasil untuk:{" "}
            <strong className="text-black font-black">“{query}”</strong>
          </div>
          <div>
            Ditemukan <strong className="text-red-600 font-black">{count}</strong> artikel
          </div>
        </div>
      )}

      {/* Results Grid or Empty State */}
      {query ? (
        articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 text-center rounded-2xl bg-white border border-zinc-200 shadow-xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <FileSearch className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-base font-black text-black uppercase">
              Tidak Ada Hasil yang Cocok
            </h3>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-normal">
              Kami tidak dapat menemukan artikel yang memuat kata kunci “{query}”.
              Coba gunakan istilah lain yang lebih umum atau periksa ejaan.
            </p>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 mt-6 text-xs font-black uppercase tracking-wider text-red-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Jelajahi Seluruh Berita</span>
            </Link>
          </div>
        )
      ) : (
        <div className="p-12 text-center text-xs text-zinc-400 font-medium">
          Masukkan kata kunci pencarian di atas untuk memulai.
        </div>
      )}
    </div>
  );
}
