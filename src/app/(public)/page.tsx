import Link from "next/link";
import {
  getHeroArticle,
  getLatestArticles,
  getEditorsPick,
  getPopularArticles,
  getAllRubriks,
} from "@/lib/data/articles";
import HeroArticle from "@/components/public/HeroArticle";
import ArticleCard from "@/components/public/ArticleCard";
import EditorsPick from "@/components/public/EditorsPick";
import PopularSidebar from "@/components/public/PopularSidebar";
import { ArrowRight, Sparkles, BookOpen, Layers } from "lucide-react";

export default async function HomePage() {
  const [heroArticle, { articles: latestArticles }, editorsPicks, popularArticles, rubriks] =
    await Promise.all([
      getHeroArticle(),
      getLatestArticles(6, 1),
      getEditorsPick(4),
      getPopularArticles(5),
      getAllRubriks(),
    ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* 1. Hero Headline Section */}
      {heroArticle && (
        <section>
          <HeroArticle article={heroArticle} />
        </section>
      )}

      {/* 2. Main Content: Latest Articles (70%) + Popular Sidebar (30%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Latest Articles Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-serif text-stone-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Kabar & Tulisan Terkini
            </h2>
            <Link
              href="/berita"
              className="text-xs font-semibold text-stone-600 hover:text-amber-800 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Popular Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <PopularSidebar articles={popularArticles} />

          {/* Editorial Mission Box */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/70 p-6">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Prinsip Editorial</span>
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base mb-2">
              Melihat Lebih dari Sekadar Kabar
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              NALAR tidak hanya menyajikan apa yang sedang terjadi, melainkan
              mengupas konteks sosial, menimbang data, dan menemukan cerita
              manusia di balik setiap peristiwa.
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold">
              <Link
                href="/tentang-kami"
                className="text-amber-900 hover:underline flex items-center gap-1"
              >
                <span>Kenali Karakter NALAR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Editor's Pick Curated Banner */}
      <section>
        <EditorsPick articles={editorsPicks} />
      </section>

      {/* 4. Rubrik Explorer Matrix */}
      <section className="pt-6 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Jelajahi Sudut Pandang
            </span>
            <h2 className="text-2xl font-black font-serif text-stone-900 tracking-tight mt-1">
              8 Rubrik Karakter NALAR
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Bukan sekadar pengelompokan tema, melainkan metode berbeda dalam
            membedah setiap isu publik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rubriks.map((rubrik) => (
            <Link
              key={rubrik.slug}
              href={`/kategori/${rubrik.slug}`}
              className="group p-5 rounded-xl bg-white border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Rubrik
                </span>
                <h3 className="text-xl font-black font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                  {rubrik.name}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mt-1 italic">
                  “{rubrik.question}”
                </p>
                <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {rubrik.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-600 group-hover:text-amber-800">
                <span>Buka Rubrik</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Contributor Callout */}
      <section className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 tracking-tight mb-3">
          Punya Gagasan atau Cerita yang Perlu Didengar?
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed max-w-xl mx-auto mb-6">
          NALAR membuka ruang seluas-luasnya bagi mahasiswa, pelajar, peneliti,
          dan masyarakat umum untuk menyumbangkan tulisan, opini kritis, atau
          kisah inspiratif dari daerah Anda.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 shadow transition-all"
        >
          <span>Masuk & Mulai Menulis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
