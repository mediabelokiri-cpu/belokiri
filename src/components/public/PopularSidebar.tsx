import Link from "next/link";
import { MockArticle } from "@/lib/data/mock-articles";
import { TrendingUp, Flame } from "lucide-react";

interface PopularSidebarProps {
  articles: MockArticle[];
}

export default function PopularSidebar({ articles }: PopularSidebarProps) {
  return (
    <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b-2 border-red-600">
        <Flame className="w-5 h-5 text-red-600 fill-current" />
        <h3 className="text-sm font-black uppercase tracking-wider text-black">
          TERPOPULER DI NALAR
        </h3>
      </div>

      <div className="space-y-4">
        {articles.map((article, idx) => (
          <div key={article.id} className="flex gap-4 items-start group">
            <span className="text-3xl font-black text-red-600/30 group-hover:text-red-600 transition-colors w-8 shrink-0 leading-none">
              0{idx + 1}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/kategori/${article.rubrik.slug}`}
                className="text-[10px] font-black uppercase tracking-wider text-red-600 hover:underline"
              >
                {article.rubrik.name}
              </Link>
              <Link href={`/artikel/${article.slug}`}>
                <h4 className="text-xs sm:text-sm font-bold text-black leading-snug line-clamp-2 mt-0.5 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-400 font-medium">
                <span className="text-zinc-600 font-semibold">{article.author.name}</span>
                <span>•</span>
                <span>{article.views.toLocaleString("id-ID")} kali dibaca</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
