import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface MejaWarkopSectionProps {
  articles: MockArticle[];
}

export default function MejaWarkopSection({ articles }: MejaWarkopSectionProps) {
  if (!articles.length) return null;

  const leadArticle = articles[0];
  const companionArticles = articles.slice(1, 5);

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
            MEJA WARKOP
          </h2>
          <span className="hidden sm:inline-block text-zinc-300">|</span>
          <p className="text-xs text-zinc-500 italic font-medium hidden sm:block">
            &ldquo;Semua orang punya teori setelah dua gelas kopi.&rdquo;
          </p>
        </div>

        <Link
          href="/kategori/meja-warkop"
          className="text-xs font-black uppercase text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors group"
        >
          <span>Semua Obrolan</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Meja Warkop: 1 Display Gambar (Judul di Dalam Gambar Tanpa Deskripsi) + Artikel Lainnya Hanya Judul Tanpa Deskripsi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Sisi Kiri: 1 Artikel dengan Display Gambar (Judul di Dalam Gambar, Tanpa Deskripsi) */}
        {leadArticle && (
          <div className="lg:col-span-7 flex flex-col">
            <article className="relative w-full rounded-2xl overflow-hidden group min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] flex flex-col justify-end border border-zinc-200 h-full shadow-xs hover:border-black hover:shadow-md transition-all">
              {/* Background Image */}
              <Image
                src={leadArticle.featuredImage}
                alt={leadArticle.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay agar teks judul di dalam gambar terbaca tajam */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Konten di dalam Gambar: Badge, Judul, & Meta (Tanpa Deskripsi) */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end">
                <div className="mb-3">
                  <Link
                    href={`/kategori/${leadArticle.rubrik.slug}`}
                    className="inline-block px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs hover:bg-black transition-colors"
                  >
                    {leadArticle.rubrik.name}
                  </Link>
                </div>

                <Link href={`/artikel/${leadArticle.slug}`}>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug group-hover:text-red-400 transition-colors tracking-tight line-clamp-3">
                    {leadArticle.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/20 text-xs text-zinc-300 font-medium">
                  <span>
                    Oleh: <strong className="text-white font-bold">{leadArticle.author.name}</strong>
                  </span>
                  <span className="text-zinc-400">{formatDate(leadArticle.publishedAt)}</span>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Sisi Kanan: Artikel Lainnya Hanya Judul Tanpa Deskripsi */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs h-full">
          <div className="divide-y divide-zinc-100 flex-1 flex flex-col justify-between">
            {companionArticles.map((article, idx) => (
              <article
                key={article.id}
                className="group py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold text-red-600">
                    0{idx + 2}
                  </span>
                  <Link
                    href={`/kategori/${article.rubrik.slug}`}
                    className="text-[10px] font-black uppercase tracking-wider text-red-600 hover:underline"
                  >
                    {article.rubrik.name}
                  </Link>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    • {formatDate(article.publishedAt)}
                  </span>
                </div>

                <Link href={`/artikel/${article.slug}`}>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </Link>

                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
                  <span>Oleh</span>
                  <Link
                    href={`/penulis/${article.author.slug}`}
                    className="text-zinc-700 font-semibold hover:text-red-600 transition-colors"
                  >
                    {article.author.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
