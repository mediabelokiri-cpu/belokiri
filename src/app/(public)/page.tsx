import Link from "next/link";
import {
  getHeroArticles,
  getLatestArticles,
  getEditorsPick,
  getPopularArticles,
  getAllRubriks,
} from "@/lib/data/articles";
import HeroArticle from "@/components/public/HeroArticle";
import ArticleCard from "@/components/public/ArticleCard";
import EditorsPick from "@/components/public/EditorsPick";
import PopularSidebar from "@/components/public/PopularSidebar";
import { ArrowRight, Sparkles } from "lucide-react";

export default async function HomePage() {
  const [heroArticles, { articles: latestArticles }, editorsPicks, popularArticles, rubriks] =
    await Promise.all([
      getHeroArticles(3),
      getLatestArticles(6, 1),
      getEditorsPick(4),
      getPopularArticles(5),
      getAllRubriks(),
    ]);

  return (
    <div className="w-full pb-16 space-y-12 sm:space-y-16">
      {/* ======================================================== */}
      {/* 1. HERO HEADLINE SECTION (FULL LEBAR KIRI & KANAN)      */}
      {/* ======================================================== */}
      {heroArticles.length > 0 && (
        <section className="w-full border-b border-zinc-200 bg-white/70 py-6 sm:py-8">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
            <HeroArticle articles={heroArticles} />
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* MAIN CONTAINER: TERKINI, POPULER, REDAKSI, RUBRIK        */}
      {/* ======================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* 2. Main Content: Latest Articles (65%) + Popular Sidebar (35%) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Latest Articles Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <h2 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                KABAR & TULISAN TERKINI
              </h2>
              <Link
                href="/berita"
                className="text-xs font-black uppercase text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <span>Semua Berita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Popular Sidebar & Editorial Mission */}
          <div className="lg:col-span-4 space-y-6">
            <PopularSidebar articles={popularArticles} />

            {/* Editorial Mission Card (White card, red accent line) */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />
              <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-wider mb-2 pt-1">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Prinsip Editorial</span>
              </div>
              <h4 className="font-black text-black text-lg mb-2 tracking-tight">
                Melihat Lebih dari Sekadar Kabar
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                NALAR tidak hanya menyajikan apa yang sedang terjadi, melainkan
                mengupas konteks sosial, menimbang data, dan menemukan cerita
                manusia di balik setiap peristiwa.
              </p>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-black">
                <Link
                  href="/tentang-kami"
                  className="text-red-600 hover:text-black flex items-center gap-1 transition-colors uppercase tracking-wider"
                >
                  <span>Kenali Karakter NALAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Editor's Pick Curated Banner (Solid Black & Red) */}
        <section>
          <EditorsPick articles={editorsPicks} />
        </section>

        {/* 4. Rubrik Explorer Matrix */}
        <section className="pt-8 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">
                JELAJAHI SUDUT PANDANG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1 uppercase">
                8 RUBRIK KARAKTER NALAR
              </h2>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm font-medium">
              Bukan sekadar kategori tema, melainkan metode berbeda dalam
              membedah setiap isu publik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rubriks.map((rubrik) => (
              <Link
                key={rubrik.slug}
                href={`/kategori/${rubrik.slug}`}
                className="group p-5 rounded-xl bg-white border border-zinc-200 shadow-xs hover:border-red-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">
                    Rubrik
                  </span>
                  <h3 className="text-xl font-black text-black group-hover:text-red-600 transition-colors uppercase">
                    {rubrik.name}
                  </h3>
                  <p className="text-xs font-bold text-red-700 mt-1 italic">
                    “{rubrik.question}”
                  </p>
                  <p className="text-xs text-zinc-600 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                    {rubrik.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center text-xs font-black text-black group-hover:text-red-600 uppercase tracking-wider">
                  <span>Buka Rubrik</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Contributor Callout */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            RUANG KONTRIBUTOR
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1 mb-3 uppercase">
            Punya Gagasan atau Cerita yang Perlu Didengar?
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto mb-6 font-normal">
            NALAR membuka ruang seluas-luasnya bagi mahasiswa, pelajar, peneliti,
            dan masyarakat umum untuk menyumbangkan tulisan, opini kritis, atau
            kisah inspiratif dari daerah Anda.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all transform active:scale-95"
          >
            <span>Masuk & Mulai Menulis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
