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
  const companionArticles = articles.slice(1, 4);

  return (
    <section className="space-y-6">
      {/* Header Section: Strictly BELOKIRI Aesthetic (Hitam, Putih, Merah) */}
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

      {/* Grid Meja Warkop: Asymmetric News Zine (1 Kolom Besar Kiri + 3 Baris Horizontal Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Sisi Kiri: 1 Artikel Utama Vertikal */}
        {leadArticle && (
          <div className="lg:col-span-6 flex flex-col">
            <article className="group flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-black hover:shadow-md transition-all h-full">
              <div>
                {/* Featured Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={leadArticle.featuredImage}
                    alt={leadArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                      {leadArticle.rubrik.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    POLEMIK TONGKRONGAN • {formatDate(leadArticle.publishedAt)}
                  </div>

                  <Link href={`/artikel/${leadArticle.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-black text-black leading-snug group-hover:text-red-600 transition-colors tracking-tight">
                      {leadArticle.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {leadArticle.excerpt}
                  </p>

                  <div className="mt-4 p-3.5 rounded-xl bg-zinc-50 border-l-2 border-red-600 text-xs text-zinc-700 italic font-medium">
                    &ldquo;Kalau kebijakan publik tidak bisa dipahami penjaga warkop dalam sepuluh detik, kemungkinan besar kebijakan itu cuma akal-akalan birokrasi.&rdquo;
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="px-6 pb-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <Link
                  href={`/penulis/${leadArticle.author.slug}`}
                  className="font-bold text-zinc-900 hover:text-red-600 transition-colors"
                >
                  {leadArticle.author.name}
                </Link>
                <Link
                  href={`/artikel/${leadArticle.slug}`}
                  className="font-bold text-red-600 hover:text-black flex items-center gap-1 uppercase text-[11px] tracking-wider transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* Sisi Kanan: 3 Baris Artikel Horizontal dengan Thumbnail */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs h-full">
          <div className="divide-y divide-zinc-100 flex-1 flex flex-col justify-between">
            {companionArticles.map((article, idx) => (
              <article
                key={article.id}
                className="group py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-36 aspect-16/10 sm:aspect-4/3 shrink-0 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-bold bg-black/80 text-white">
                    0{idx + 2}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                        {article.rubrik.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">
                        • {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <Link href={`/artikel/${article.slug}`}>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </Link>

                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2 font-normal leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-2 text-[11px] text-zinc-500 font-medium">
                    <span>Oleh: </span>
                    <Link
                      href={`/penulis/${article.author.slug}`}
                      className="font-bold text-zinc-800 hover:text-red-600 transition-colors"
                    >
                      {article.author.name}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
