import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";

interface HeroArticleProps {
  article: MockArticle;
}

export default function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image Container (7 cols on desktop) */}
        <div className="relative aspect-16/9 sm:aspect-21/9 lg:aspect-auto lg:col-span-7 overflow-hidden bg-stone-100">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-3 left-3 lg:hidden">
            <span className="px-2.5 py-1 rounded bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
              {article.rubrik.name}
            </span>
          </div>
        </div>

        {/* Text Details (5 cols on desktop) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Rubrik Badge + Headline label */}
            <div className="hidden lg:flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-stone-900 text-white">
                {article.rubrik.name}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                ★ Headline Utama
              </span>
            </div>

            {/* Title */}
            <Link href={`/artikel/${article.slug}`}>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950 leading-snug group-hover:text-amber-700 transition-colors">
                {article.title}
              </h1>
            </Link>

            {/* Excerpt */}
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          {/* Author and Date metadata */}
          <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
            <Link
              href={`/penulis/${article.author.slug}`}
              className="flex items-center gap-2.5 group/author"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-stone-200">
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 group-hover/author:text-amber-800 transition-colors">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </Link>

            <Link
              href={`/artikel/${article.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-700 transition-colors"
            >
              <span>Baca</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
