import Link from "next/link";
import { MockArticle } from "@/lib/data/mock-articles";
import { TrendingUp } from "lucide-react";

interface PopularSidebarProps {
  articles: MockArticle[];
}

export default function PopularSidebar({ articles }: PopularSidebarProps) {
  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-xs">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-stone-100">
        <TrendingUp className="w-4 h-4 text-amber-600" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-serif">
          Terpopuler di NALAR
        </h3>
      </div>

      <div className="space-y-4">
        {articles.map((article, idx) => (
          <div key={article.id} className="flex gap-4 items-start group">
            <span className="text-2xl font-black font-serif text-stone-300 group-hover:text-amber-600 transition-colors w-6 shrink-0 leading-none">
              0{idx + 1}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/kategori/${article.rubrik.slug}`}
                className="text-[10px] font-bold uppercase tracking-wider text-amber-800 hover:underline"
              >
                {article.rubrik.name}
              </Link>
              <Link href={`/artikel/${article.slug}`}>
                <h4 className="text-xs sm:text-sm font-bold font-serif text-stone-900 leading-snug line-clamp-2 mt-0.5 group-hover:text-amber-800 transition-colors">
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{article.views.toLocaleString("id-ID")} pembaca</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
