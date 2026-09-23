import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  article: MockArticle;
  variant?: "grid" | "horizontal" | "compact";
  priority?: boolean;
}

export default function ArticleCard({
  article,
  variant = "grid",
  priority = false,
}: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="group flex gap-4 items-start py-4 border-b border-stone-100 last:border-0">
        <div className="relative w-28 sm:w-36 aspect-4/3 shrink-0 rounded-lg overflow-hidden bg-stone-100">
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
              className="text-[10px] font-bold uppercase tracking-wider text-amber-800 hover:underline"
            >
              {article.rubrik.name}
            </Link>
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="text-sm font-bold font-serif text-stone-900 leading-snug line-clamp-2 mt-1 group-hover:text-amber-800 transition-colors">
                {article.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
            <span>{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group py-3 border-b border-stone-100 last:border-0">
        <Link
          href={`/kategori/${article.rubrik.slug}`}
          className="text-[10px] font-bold uppercase tracking-wider text-amber-700"
        >
          {article.rubrik.name}
        </Link>
        <Link href={`/artikel/${article.slug}`}>
          <h4 className="text-xs sm:text-sm font-bold font-serif text-stone-900 leading-snug line-clamp-2 mt-1 group-hover:text-amber-800 transition-colors">
            {article.title}
          </h4>
        </Link>
        <span className="text-[10px] text-stone-400 mt-1 block">
          {formatDate(article.publishedAt)}
        </span>
      </article>
    );
  }

  // Default: Grid Card
  return (
    <article className="group flex flex-col justify-between rounded-xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 hover:shadow-md transition-all">
      <div>
        {/* Card Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-400"
          />
          <div className="absolute top-3 left-3">
            <Link
              href={`/kategori/${article.rubrik.slug}`}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-900 border border-stone-200/50 hover:bg-stone-900 hover:text-white transition-colors"
            >
              {article.rubrik.name}
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <Link href={`/artikel/${article.slug}`}>
            <h2 className="text-lg font-bold font-serif text-stone-950 leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
        <Link
          href={`/penulis/${article.author.slug}`}
          className="font-medium text-stone-700 hover:text-stone-950 transition-colors"
        >
          {article.author.name}
        </Link>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
