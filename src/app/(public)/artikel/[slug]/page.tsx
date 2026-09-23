import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getArticleBySlug,
  getRelatedArticles,
  getPopularArticles,
} from "@/lib/data/articles";
import { formatDate, estimateReadingTime } from "@/lib/utils";
import ArticleCard from "@/components/public/ArticleCard";
import PopularSidebar from "@/components/public/PopularSidebar";
import {
  Clock,
  User,
  Share2,
  Bookmark,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: `${article.title} | NALAR`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [relatedArticles, popularArticles] = await Promise.all([
    getRelatedArticles(article.slug, article.rubrik.slug, 3),
    getPopularArticles(5),
  ]);

  const readingTime = estimateReadingTime(article.content);

  return (
    <article className="min-h-screen pb-16 sm:pb-24">
      {/* 1. Breadcrumbs & Rubrik Header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link
            href={`/kategori/${article.rubrik.slug}`}
            className="font-bold text-amber-800 uppercase tracking-wider hover:underline"
          >
            {article.rubrik.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="truncate max-w-[200px] sm:max-w-xs text-stone-700">
            {article.title}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body Column (8 cols on desktop) */}
          <div className="lg:col-span-8">
            {/* Header / Title Section */}
            <header className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-900 text-white">
                  Rubrik {article.rubrik.name}
                </span>
                <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Waktu baca ± {readingTime} menit
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-stone-950 leading-[1.18] tracking-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans font-normal border-l-4 border-amber-500 pl-4 py-1">
                {article.excerpt}
              </p>

              {/* Author & Meta Row */}
              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/penulis/${article.author.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-stone-200 ring-2 ring-stone-100">
                    <Image
                      src={article.author.avatarUrl}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {article.author.role} • {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>

                {/* Social Share / Utility */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 font-medium">Bagikan:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${article.title} - ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/artikel/${article.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-stone-200 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors text-xs font-semibold"
                    title="Bagikan ke WhatsApp"
                  >
                    WA
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `${article.title}`
                    )}&url=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/artikel/${article.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors text-xs font-semibold"
                    title="Bagikan ke X / Twitter"
                  >
                    𝕏
                  </a>
                </div>
              </div>
            </header>

            {/* Featured Image + Caption + Credit */}
            <div className="mb-10">
              <div className="relative aspect-16/10 sm:aspect-21/10 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-1">
                <p className="italic">{article.featuredImageCaption}</p>
                <p className="text-[11px] text-stone-400 shrink-0">
                  Foto: {article.photoSource}
                </p>
              </div>
            </div>

            {/* Article Content: Optimized Reading Experience */}
            <div
              className="prose prose-stone prose-lg max-w-none 
                leading-relaxed text-stone-800
                [&_p]:mb-6 [&_p]:leading-[1.8] [&_p]:text-[17px] sm:[&_p]:text-[18px]
                [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-stone-900
                [&_blockquote]:border-l-4 [&_blockquote]:border-amber-600 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-stone-700 [&_blockquote]:my-8
                [&_.lead]:text-xl [&_.lead]:font-serif [&_.lead]:text-stone-900 [&_.lead]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Source & Reporting Attribution */}
            {article.source && (
              <div className="mt-10 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-900">Sumber & Liputan:</strong>{" "}
                {article.source}
              </div>
            )}

            {/* Tags Cloud */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mr-2">
                Topik Terkait:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Profile Box */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-200 shrink-0">
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                      Tentang Penulis
                    </span>
                    <h4 className="text-base font-bold font-serif text-stone-900">
                      {article.author.name}
                    </h4>
                  </div>
                  <Link
                    href={`/penulis/${article.author.slug}`}
                    className="text-xs font-bold text-stone-900 hover:text-amber-800 transition-colors"
                  >
                    Semua Tulisan →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Related Articles in Same Rubrik */}
            {relatedArticles.length > 0 && (
              <section className="mt-14 pt-8 border-t border-stone-200">
                <h3 className="text-xl font-bold font-serif text-stone-900 mb-6">
                  Tulisan Terkait di Rubrik {article.rubrik.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Column (4 cols on desktop) */}
          <aside className="lg:col-span-4 space-y-8">
            <PopularSidebar articles={popularArticles} />

            {/* Rubrik Mission Box */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                Fokus Rubrik
              </span>
              <h4 className="text-lg font-black font-serif text-stone-900">
                {article.rubrik.name}
              </h4>
              <p className="text-xs font-semibold text-amber-800 mt-1 italic">
                “{article.rubrik.question}”
              </p>
              <p className="text-xs text-stone-500 mt-3 leading-relaxed">
                {article.rubrik.description}
              </p>
              <div className="mt-4 pt-4 border-t border-stone-100">
                <Link
                  href={`/kategori/${article.rubrik.slug}`}
                  className="text-xs font-bold text-stone-900 hover:text-amber-800 flex items-center justify-between"
                >
                  <span>Lihat Indeks Rubrik {article.rubrik.name}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
