import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Coffee } from "lucide-react";

interface TerasBentoGridProps {
  articles: MockArticle[];
  headingLevel?: "h2" | "h3";
}

interface PhotoTerasCardProps {
  article: MockArticle;
  orderLabel: string;
  headingLevel: "h2" | "h3";
  className?: string;
  priority?: boolean;
}

function PhotoTerasCard({
  article,
  orderLabel,
  headingLevel,
  className = "",
  priority = false,
}: PhotoTerasCardProps) {
  const CardHeadingTag = headingLevel;

  return (
    <article
      className={`group isolate relative @container rounded-2xl overflow-hidden bg-zinc-700 border border-zinc-300 hover:border-[#4c13ff] shadow-xs hover:shadow-xl min-h-[280px] sm:min-h-[300px] flex flex-col justify-between transition-all has-[a.teras-card-link:focus-visible]:outline-3 has-[a.teras-card-link:focus-visible]:outline-[#4c13ff] has-[a.teras-card-link:focus-visible]:outline-offset-2 ${className}`}
    >
      {/* Decorative preview cover */}
      <Image
        src={article.featuredImage}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="-z-10 pointer-events-none object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark scrim ensuring >= 4.5:1 contrast for foreground typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#1f1f1f]/95 via-[#1f1f1f]/70 to-[#1f1f1f]/35"
      />

      {/* Top metadata */}
      <div className="p-5 @md:p-6 pb-0 flex items-center justify-between gap-2 forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]">
        <Link
          href={`/kategori/${article.rubrik.slug}`}
          className="relative z-10 inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-[#1f1f1f]/85 text-[#ffc22f] border border-white/20 hover:bg-[#ffc22f] hover:text-[#1f1f1f] transition-colors"
        >
          {article.rubrik.name}
        </Link>
        <span className="text-[11px] font-mono font-black text-white/90 bg-[#1f1f1f]/65 px-2 py-0.5 rounded pointer-events-none">
          {orderLabel}
        </span>
      </div>

      {/* Bottom editorial copy & stretched heading link */}
      <div className="p-5 @md:p-6 pt-8 flex flex-col justify-end forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]">
        <CardHeadingTag className="text-lg @sm:text-xl @lg:text-2xl font-black text-white leading-snug tracking-tight line-clamp-3 group-hover:text-[#ffc22f] transition-colors">
          <Link
            href={`/artikel/${article.slug}`}
            className="teras-card-link after:content-[''] after:absolute after:inset-0 focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </CardHeadingTag>

        {article.excerpt && (
          <p className="mt-2.5 text-xs @md:text-sm text-zinc-200 leading-relaxed line-clamp-3 font-normal pointer-events-none">
            {article.excerpt}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between gap-3 text-xs text-zinc-200 font-medium">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-zinc-300 shrink-0 pointer-events-none">Oleh</span>
            <Link
              href={`/penulis/${article.author.slug}`}
              className="relative z-10 py-0.5 font-bold text-white hover:text-[#ffc22f] truncate transition-colors"
            >
              {article.author.name}
            </Link>
          </div>
          <span className="text-[11px] text-zinc-300 shrink-0 pointer-events-none">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}

interface IndigoTerasCardProps {
  article: MockArticle;
  orderLabel: string;
  headingLevel: "h2" | "h3";
}

function IndigoTerasCard({
  article,
  orderLabel,
  headingLevel,
}: IndigoTerasCardProps) {
  const CardHeadingTag = headingLevel;

  return (
    <article className="group relative @container rounded-2xl overflow-hidden bg-[#4c13ff] text-white border border-[#3d0dd9] hover:bg-[#430fe8] shadow-md hover:shadow-xl min-h-[225px] lg:min-h-[245px] p-5 flex flex-col justify-between transition-all has-[a.teras-card-link:focus-visible]:outline-3 has-[a.teras-card-link:focus-visible]:outline-[#ffc22f] has-[a.teras-card-link:focus-visible]:outline-offset-2">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xl sm:text-2xl font-black font-mono text-[#ffc22f] leading-none tracking-tight select-none">
          {orderLabel}
        </span>
        <Link
          href={`/kategori/${article.rubrik.slug}`}
          className="relative z-10 inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-[#1f1f1f]/35 text-[#ffc22f] border border-white/20 hover:bg-[#ffc22f] hover:text-[#1f1f1f] transition-colors"
        >
          {article.rubrik.name}
        </Link>
      </div>

      {/* Headline & excerpt */}
      <div className="my-3.5 space-y-2">
        <CardHeadingTag className="text-base @sm:text-lg font-black text-white leading-snug tracking-tight line-clamp-3 group-hover:text-[#ffc22f] transition-colors">
          <Link
            href={`/artikel/${article.slug}`}
            className="teras-card-link after:content-[''] after:absolute after:inset-0 focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </CardHeadingTag>

        {article.excerpt && (
          <p className="text-xs text-white/90 leading-relaxed line-clamp-2 font-normal pointer-events-none">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Footer meta + visual arrow cue */}
      <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3 text-xs text-white/90 font-medium">
        <div className="min-w-0 truncate">
          <Link
            href={`/penulis/${article.author.slug}`}
            className="relative z-10 py-0.5 inline-block font-bold text-white hover:text-[#ffc22f] transition-colors"
          >
            {article.author.name}
          </Link>
          <span className="mx-1.5 text-white/60 pointer-events-none">•</span>
          <span className="text-[11px] text-white/85 pointer-events-none">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <ArrowRight
          aria-hidden="true"
          className="w-4 h-4 text-[#ffc22f] shrink-0 group-hover:translate-x-1 transition-transform pointer-events-none"
        />
      </div>
    </article>
  );
}

export function TerasBentoGrid({
  articles,
  headingLevel = "h3",
}: TerasBentoGridProps) {
  if (!articles.length) return null;

  // Group by 5 cards so desktop renders: 1 tall photo card (left) + 2x2 solid #4c13ff cards (right)
  const chunks: MockArticle[][] = [];
  for (let i = 0; i < articles.length; i += 5) {
    chunks.push(articles.slice(i, i + 5));
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {chunks.map((group, groupIndex) => {
        const isFullFiveBento = group.length === 5;
        const baseOrder = groupIndex * 5;

        if (!isFullFiveBento) {
          return (
            <div
              key={group[0]?.id ?? groupIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
            >
              {group.map((article, idx) => {
                const orderLabel = String(baseOrder + idx + 1).padStart(2, "0");
                if (idx === 0) {
                  return (
                    <PhotoTerasCard
                      key={article.id}
                      article={article}
                      orderLabel={orderLabel}
                      headingLevel={headingLevel}
                      priority={groupIndex === 0}
                    />
                  );
                }
                return (
                  <IndigoTerasCard
                    key={article.id}
                    article={article}
                    orderLabel={orderLabel}
                    headingLevel={headingLevel}
                  />
                );
              })}
            </div>
          );
        }

        const [leadArticle, ...gridArticles] = group;
        return (
          <div
            key={leadArticle.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 lg:gap-6 items-stretch"
          >
            {/* Card 01: Tall full-height photo card spanning 2 rows on left (desktop) */}
            <PhotoTerasCard
              article={leadArticle}
              orderLabel={String(baseOrder + 1).padStart(2, "0")}
              headingLevel={headingLevel}
              priority={groupIndex === 0}
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:h-full"
            />

            {/* Cards 02-05: 2x2 grid of solid #4c13ff cards on right */}
            {gridArticles.map((article, idx) => (
              <IndigoTerasCard
                key={article.id}
                article={article}
                orderLabel={String(baseOrder + idx + 2).padStart(2, "0")}
                headingLevel={headingLevel}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface MejaWarkopSectionProps {
  articles: MockArticle[];
}

export default function MejaWarkopSection({ articles }: MejaWarkopSectionProps) {
  if (!articles.length) return null;

  const terasCards = articles.slice(0, 5);

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#1f1f1f]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-sm bg-[#4c13ff] text-white">
            <Coffee className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1f1f1f]">
            TERAS
          </h2>
          <span className="hidden sm:inline-block text-zinc-300">|</span>
          <p className="text-xs text-zinc-500 italic font-medium hidden sm:block">
            &ldquo;Ruang Temu Gagasan — Filsafat, Literasi &amp; Refleksi.&rdquo;
          </p>
        </div>

        <Link
          href="/kategori/teras"
          className="text-xs font-black uppercase text-zinc-600 hover:text-[#4c13ff] flex items-center gap-1 transition-colors group"
        >
          <span>Semua di Teras</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <TerasBentoGrid articles={terasCards} headingLevel="h3" />
    </section>
  );
}
