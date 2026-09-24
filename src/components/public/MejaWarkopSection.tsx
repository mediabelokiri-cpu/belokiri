import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { Coffee, ArrowRight, Clock } from "lucide-react";

interface MejaWarkopSectionProps {
  articles: MockArticle[];
}

export default function MejaWarkopSection({ articles }: MejaWarkopSectionProps) {
  if (!articles.length) return null;

  const leadArticle = articles[0];
  const companionArticles = articles.slice(1, 4);

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
              MEJA WARKOP
            </h2>
            <p className="text-xs text-zinc-500 italic font-medium hidden sm:block">
              “Semua orang punya teori setelah dua gelas kopi.”
            </p>
          </div>
        </div>

        <Link
          href="/kategori/meja-warkop"
          className="text-xs font-black uppercase text-zinc-600 hover:text-amber-800 flex items-center gap-1.5 transition-colors group"
        >
          <span>Semua Obrolan Warkop</span>
          <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Meja Warkop: 1 Banner Split Horizontal + 3 Kolom Kartu di Bawahnya */}
      <div className="space-y-6">
        {/* 1. Obrolan Utama (Featured Horizontal Card) */}
        {leadArticle && (
          <article className="group rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Image Side */}
              <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-zinc-100">
                <Image
                  src={leadArticle.featuredImage}
                  alt={leadArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/85 backdrop-blur-md text-amber-400 border border-amber-400/30 shadow-md">
                    <Coffee className="w-3 h-3 text-amber-400" />
                    <span>Obrolan Utama</span>
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-amber-50/25">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2.5">
                    <span>Catatan Meja Warkop</span>
                    <span>•</span>
                    <span className="text-zinc-500">{formatDate(leadArticle.publishedAt)}</span>
                  </div>

                  <Link href={`/artikel/${leadArticle.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-950 leading-tight group-hover:text-amber-800 transition-colors tracking-tight">
                      {leadArticle.title}
                    </h3>
                  </Link>

                  <div className="relative mt-4 pl-4 border-l-2 border-amber-400">
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal italic">
                      &ldquo;{leadArticle.excerpt}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative bg-zinc-200 border border-amber-300">
                      <Image
                        src={leadArticle.author.avatarUrl}
                        alt={leadArticle.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/penulis/${leadArticle.author.slug}`}
                        className="font-bold text-zinc-900 hover:text-amber-800 transition-colors block leading-tight"
                      >
                        {leadArticle.author.name}
                      </Link>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {leadArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/artikel/${leadArticle.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-black uppercase text-[11px] tracking-wider transition-colors"
                  >
                    <span>Baca Obrolan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* 2. Companion Stories (3 Kolom Kartu Meja Warkop) */}
        {companionArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companionArticles.map((article) => (
              <article
                key={article.id}
                className="group rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black font-mono shadow-xs">
                        MEJA WARKOP
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <Link href={`/artikel/${article.slug}`}>
                      <h4 className="text-base font-black text-zinc-950 leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors tracking-tight">
                        {article.title}
                      </h4>
                    </Link>
                    <p className="mt-2 text-xs text-zinc-600 line-clamp-2 leading-relaxed font-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Meta */}
                <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <Link
                    href={`/penulis/${article.author.slug}`}
                    className="font-bold text-zinc-800 hover:text-amber-800 transition-colors"
                  >
                    {article.author.name}
                  </Link>
                  <div className="flex items-center gap-1 font-medium text-zinc-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
