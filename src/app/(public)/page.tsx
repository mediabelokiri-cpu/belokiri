import Link from "next/link";
import Image from "next/image";
import {
  getHeroArticles,
  getLatestArticles,
  getArticlesByRubrik,
  getEditorsPick,
  getPopularArticles,
  getAllRubriks,
} from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";
import HeroArticle from "@/components/public/HeroArticle";
import EditorsPick from "@/components/public/EditorsPick";
import { ArrowRight, Clock } from "lucide-react";

export default async function HomePage() {
  const [
    heroArticles,
    { articles: latestArticles },
    { articles: berisikArticles },
    editorsPicks,
    popularArticles,
    rubriks,
  ] = await Promise.all([
    getHeroArticles(3),
    getLatestArticles(8, 1),
    getArticlesByRubrik("berisik", 6),
    getEditorsPick(5),
    getPopularArticles(5),
    getAllRubriks(),
  ]);

  // Use the remaining articles for secondary focus in Hero
  const secondaryArticles = latestArticles.slice(3, 5);

  const featuredBerisik = berisikArticles[0];
  const otherBerisik = berisikArticles.slice(1, 5);

  return (
    <div className="w-full">
      {/* ======================================================== */}
      {/* 1. HERO 3-KOLOM (SLIDER + FOKUS + TERPOPULER)            */}
      {/* ======================================================== */}
      {heroArticles.length > 0 && (
        <section className="w-full bg-white py-6 sm:py-8 border-b border-zinc-200 shadow-xs">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
            <HeroArticle
              headlineArticles={heroArticles}
              secondaryArticles={secondaryArticles}
              popularArticles={popularArticles}
            />
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* MAIN CONTAINER: BERISIK, AGEN BELOKAN, 8 RUBRIK          */}
      {/* ======================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* 2. Main Content: BERISIK (1 image card + title list) + Rubrik Focus */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* BERISIK Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <h2 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                BERISIK
              </h2>
              <Link
                href="/kategori/berisik"
                className="text-xs font-black uppercase text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <span>Semua Berisik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {featuredBerisik ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* 1 Display Artikel dengan Gambar */}
                <div className="md:col-span-7 flex flex-col">
                  <article className="group flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-400 hover:shadow-md transition-all h-full">
                    <div>
                      {/* Card Image */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-200">
                        <Image
                          src={featuredBerisik.featuredImage}
                          alt={featuredBerisik.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                            {featuredBerisik.rubrik.name}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        <Link href={`/artikel/${featuredBerisik.slug}`}>
                          <h3 className="text-lg sm:text-xl font-black text-black leading-snug line-clamp-3 group-hover:text-red-600 transition-colors tracking-tight">
                            {featuredBerisik.title}
                          </h3>
                        </Link>
                        <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 font-normal">
                          {featuredBerisik.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                      <Link
                        href={`/penulis/${featuredBerisik.author.slug}`}
                        className="font-bold text-zinc-800 hover:text-red-600 transition-colors"
                      >
                        {featuredBerisik.author.name}
                      </Link>
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{formatDate(featuredBerisik.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Artikel Lainnya Hanya Judul */}
                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 p-5 shadow-xs">
                  <div className="divide-y divide-zinc-100 flex-1 flex flex-col justify-between">
                    {otherBerisik.map((article, idx) => (
                      <article
                        key={article.id}
                        className="group py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-red-600">
                            0{idx + 2}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-400">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <Link href={`/artikel/${article.slug}`}>
                          <h4 className="text-sm font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                        </Link>
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                          <span>Oleh</span>
                          <Link
                            href={`/penulis/${article.author.slug}`}
                            className="text-zinc-600 font-semibold hover:text-red-600 transition-colors"
                          >
                            {article.author.name}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Editorial Sidebar: Rubrik Focus (Prinsip Editorial card removed) */}
          <div className="lg:col-span-4">
            {/* Rubrik Spotlight Box */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Pilihan Rubrik Khusus
                </h4>
                <Link
                  href="/kategori"
                  className="text-[11px] font-bold text-red-600 hover:underline"
                >
                  Semua Rubrik
                </Link>
              </div>
              <div className="space-y-3">
                {rubriks.slice(0, 5).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/kategori/${r.slug}`}
                    className="block p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-black group-hover:text-red-600 transition-colors">
                        {r.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-red-600 transition-all" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 italic line-clamp-1 font-medium">
                      “{r.question}”
                    </p>
                  </Link>
                ))}
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
                8 RUBRIK KARAKTER BELOKIRI
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
      </div>

      {/* ======================================================== */}
      {/* 5. RUANG WARGA BELOKAN (FULL-WIDTH SECTION DI ATAS FOOTER) */}
      {/* ======================================================== */}
      <section className="w-full bg-red-600 text-white py-16 sm:py-20 border-t-2 border-red-700 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-100 bg-red-700/70 border border-red-500/50 px-3.5 py-1 rounded-full mb-4">
            RUANG WARGA BELOKAN
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mb-4 leading-tight">
            Punya Gagasan atau Cerita yang Perlu Didengar?
          </h2>
          <p className="text-sm sm:text-base text-red-100/90 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            BELOKIRI membuka ruang seluas-luasnya bagi mahasiswa, pelajar, peneliti,
            dan masyarakat umum untuk menyumbangkan tulisan, esai kritis, atau
            pandangan nyeleneh yang jujur.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-black hover:bg-zinc-900 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform active:scale-95 border border-zinc-800 hover:border-zinc-700"
          >
            <span>Masuk & Mulai Menulis</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </Link>
        </div>
      </section>
    </div>
  );
}
