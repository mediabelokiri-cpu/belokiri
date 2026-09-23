import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock, Flame } from "lucide-react";

interface HeroArticleProps {
  articles: MockArticle[];
}

export default function HeroArticle({ articles }: HeroArticleProps) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full items-stretch">
        {/* ======================================================== */}
        {/* 1. MAIN HEADLINE ARTICLE (OVERLAY FULL IMAGE - 7 COLS)   */}
        {/* ======================================================== */}
        <article className="lg:col-span-7 group relative rounded-2xl overflow-hidden shadow-md border border-zinc-800 bg-black min-h-[400px] sm:min-h-[460px] lg:h-[500px] flex flex-col justify-between">
          {/* Background Image */}
          <Image
            src={mainArticle.featuredImage}
            alt={mainArticle.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
          />

          {/* Vignette / Dark Gradient Overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

          {/* Top Badges */}
          <div className="relative z-10 p-5 sm:p-7 flex items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg">
              {mainArticle.rubrik.name}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-black bg-white px-3 py-1 rounded-sm shadow-lg">
              <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
              <span>Headline Utama</span>
            </span>
          </div>

          {/* Bottom Title & Metadata (Inside Image - No Excerpt) */}
          <div className="relative z-10 p-5 sm:p-8 space-y-4">
            <Link href={`/artikel/${mainArticle.slug}`} className="block">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-red-400 transition-colors tracking-tight drop-shadow-md">
                {mainArticle.title}
              </h1>
            </Link>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <Link
                href={`/penulis/${mainArticle.author.slug}`}
                className="flex items-center gap-3 group/author"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-white/60">
                  <Image
                    src={mainArticle.author.avatarUrl}
                    alt={mainArticle.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-black text-white group-hover/author:text-red-300 transition-colors">
                    {mainArticle.author.name}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span>{formatDate(mainArticle.publishedAt)}</span>
                  </div>
                </div>
              </Link>

              <Link
                href={`/artikel/${mainArticle.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md transform active:scale-95"
              >
                <span>BACA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* 2 & 3. TWO SECONDARY HEADLINES (MATCHING HEIGHT - 5 COLS) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 lg:gap-6 justify-between lg:h-[500px]">
          {sideArticles.map((article, index) => (
            <article
              key={article.id}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-zinc-800 bg-black h-[220px] sm:h-[240px] lg:h-[238px] flex flex-col justify-between"
            >
              {/* Background Image */}
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Top Badge */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow">
                    {article.rubrik.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-white/90 text-black shadow">
                    Fokus 0{index + 2}
                  </span>
                </div>
              </div>

              {/* Bottom Title & Metadata (Inside Image - No Excerpt) */}
              <div className="relative z-10 p-4 sm:p-5 space-y-2">
                <Link href={`/artikel/${article.slug}`} className="block">
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors tracking-tight drop-shadow-sm">
                    {article.title}
                  </h3>
                </Link>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
                  <span className="truncate max-w-[150px] font-bold text-white">
                    {article.author.name}
                  </span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
