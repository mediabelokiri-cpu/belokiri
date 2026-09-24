import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  article: MockArticle;
  variant?: "grid" | "horizontal" | "compact";
  priority?: boolean;
  showExcerpt?: boolean;
}

export default function ArticleCard({
  article,
  variant = "grid",
  priority = false,
  showExcerpt = true,
}: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="group flex gap-4 items-start py-4 border-b border-zinc-200 last:border-0">
        <div className="relative w-28 sm:w-36 aspect-4/3 shrink-0 rounded-xl overflow-hidden bg-zinc-200">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            sizes="150px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <Link
              href={`/kategori/${article.rubrik.slug}`}
              className="text-[10px] font-black uppercase tracking-wider text-red-600 hover:underline"
            >
              {article.rubrik.name}
            </Link>
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="text-sm font-bold text-black leading-snug line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">
                {article.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-400 font-medium">
            <span className="font-semibold text-zinc-700">{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group py-3 border-b border-zinc-200 last:border-0">
        <Link
          href={`/kategori/${article.rubrik.slug}`}
          className="text-[10px] font-black uppercase tracking-wider text-red-600"
        >
          {article.rubrik.name}
        </Link>
        <Link href={`/artikel/${article.slug}`}>
          <h4 className="text-xs sm:text-sm font-bold text-black leading-snug line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">
            {article.title}
          </h4>
        </Link>
        <span className="text-[10px] text-zinc-400 mt-1 block">
          {formatDate(article.publishedAt)}
        </span>
      </article>
    );
  }

  // Default: Grid Card
  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-400 hover:shadow-md transition-all">
      <div>
        {/* Card Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-200">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-104 transition-transform duration-400"
          />
          <div className="absolute top-3 left-3">
            <Link
              href={`/kategori/${article.rubrik.slug}`}
              className="px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs hover:bg-black transition-colors"
            >
              {article.rubrik.name}
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <Link href={`/artikel/${article.slug}`}>
            <h2 className="text-base sm:text-lg font-black text-black leading-snug line-clamp-2 group-hover:text-red-600 transition-colors tracking-tight">
              {article.title}
            </h2>
          </Link>
          {showExcerpt && (
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-2 font-normal">
              {article.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
        <Link
          href={`/penulis/${article.author.slug}`}
          className="font-bold text-zinc-800 hover:text-red-600 transition-colors"
        >
          {article.author.name}
        </Link>
        <div className="flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
