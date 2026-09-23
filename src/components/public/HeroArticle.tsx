import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock, Flame } from "lucide-react";

interface HeroArticleProps {
  article: MockArticle;
}

export default function HeroArticle({ article }: HeroArticleProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image Container (7 cols) */}
        <div className="relative aspect-16/9 sm:aspect-21/9 lg:aspect-auto lg:col-span-7 overflow-hidden bg-zinc-200">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
          
          {/* Mobile Badge */}
          <div className="absolute bottom-4 left-4 lg:hidden flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow">
              {article.rubrik.name}
            </span>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider drop-shadow">
              Headline
            </span>
          </div>
        </div>

        {/* Text Container (5 cols) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between bg-white">
          <div>
            {/* Desktop Tags */}
            <div className="hidden lg:flex items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                {article.rubrik.name}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-black bg-zinc-100 px-2.5 py-1 rounded-sm border border-zinc-200">
                <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
                <span>Headline Utama</span>
              </span>
            </div>

            {/* Title */}
            <Link href={`/artikel/${article.slug}`}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight group-hover:text-red-600 transition-colors tracking-tight">
                {article.title}
              </h1>
            </Link>

            {/* Excerpt */}
            <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          {/* Author and Date Bar */}
          <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
            <Link
              href={`/penulis/${article.author.slug}`}
              className="flex items-center gap-3 group/author"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-100">
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-black text-black group-hover/author:text-red-600 transition-colors">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </Link>

            <Link
              href={`/artikel/${article.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-black hover:text-white text-xs font-black text-black transition-colors"
            >
              <span>BACA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
