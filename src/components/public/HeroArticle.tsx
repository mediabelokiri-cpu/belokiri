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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 w-full">
        {/* ======================================================== */}
        {/* 1. MAIN HEADLINE ARTICLE (Takes 7 Cols on Desktop)       */}
        {/* ======================================================== */}
        <article className="lg:col-span-7 group flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all overflow-hidden">
          <div className="relative aspect-16/10 sm:aspect-21/10 lg:aspect-16/9 w-full overflow-hidden bg-zinc-200">
            <Image
              src={mainArticle.featuredImage}
              alt={mainArticle.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                {mainArticle.rubrik.name}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-black bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-md">
                <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
                <span>Headline Utama</span>
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <Link href={`/artikel/${mainArticle.slug}`}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight group-hover:text-red-600 transition-colors tracking-tight">
                  {mainArticle.title}
                </h1>
              </Link>
              <p className="mt-3.5 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal line-clamp-3">
                {mainArticle.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
              <Link
                href={`/penulis/${mainArticle.author.slug}`}
                className="flex items-center gap-3 group/author"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-100">
                  <Image
                    src={mainArticle.author.avatarUrl}
                    alt={mainArticle.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-black text-black group-hover/author:text-red-600 transition-colors">
                    {mainArticle.author.name}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(mainArticle.publishedAt)}</span>
                  </div>
                </div>
              </Link>

              <Link
                href={`/artikel/${mainArticle.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>BACA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* 2 & 3. TWO SECONDARY HEADLINES (Takes 5 Cols on Desktop) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
          {sideArticles.map((article, index) => (
            <article
              key={article.id}
              className="group flex-1 flex flex-col sm:flex-row lg:flex-row gap-4 p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all overflow-hidden justify-between"
            >
              <div className="relative w-full sm:w-48 lg:w-48 aspect-16/10 sm:aspect-square lg:aspect-4/3 shrink-0 rounded-xl overflow-hidden bg-zinc-200">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                    {article.rubrik.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-red-600 mb-1">
                    <span>Fokus 0{index + 2}</span>
                  </div>
                  <Link href={`/artikel/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-black text-black leading-snug line-clamp-3 group-hover:text-red-600 transition-colors tracking-tight">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-normal line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                  <span className="truncate max-w-[120px] font-bold text-zinc-800">
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
