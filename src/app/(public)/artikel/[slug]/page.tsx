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
  Share2,
  ChevronRight,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { NewsArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { formatArticleContent } from "@/lib/security/sanitize";
import ReadingProgressBar from "@/components/public/ReadingProgressBar";
import ArticleShareButtons from "@/components/public/ArticleShareButtons";
import ArticleReactions from "@/components/public/ArticleReactions";
import ArticleViewTracker from "@/components/public/ArticleViewTracker";

export const revalidate = 60;

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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";
  const canonicalUrl = `${baseUrl}/artikel/${article.slug}`;
  const ogImageUrl = `${baseUrl}/api/og/${article.slug}`;

  return {
    title: `${article.title} | BELOKIRI`,
    description: article.excerpt,
    keywords: [...article.tags, article.rubrik.name, "BELOKIRI", "Esai", "Analisis"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: "BELOKIRI",
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      section: article.rubrik.name,
      tags: article.tags,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImageUrl],
      creator: "@belokiri_id",
      site: "@belokiri_id",
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";
  const canonicalUrl = `${baseUrl}/artikel/${article.slug}`;

  return (
    <article className="min-h-screen pb-16 sm:pb-24">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Real-time View Tracker */}
      <ArticleViewTracker slug={article.slug} />

      {/* Schema.org JSON-LD Structured Data */}
      <NewsArticleJsonLd
        url={canonicalUrl}
        headline={article.title}
        excerpt={article.excerpt}
        imageUrl={article.featuredImage}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt || article.publishedAt}
        authorName={article.author.name}
        authorUrl={`${baseUrl}/penulis/${article.author.slug}`}
        sectionName={article.rubrik.name}
        tags={article.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: `${baseUrl}` },
          { name: article.rubrik.name, url: `${baseUrl}/kategori/${article.rubrik.slug}` },
          { name: article.title, url: canonicalUrl },
        ]}
      />

      {/* 1. Breadcrumbs */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs text-zinc-500 font-semibold">
          <Link href="/" className="hover:text-black transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link
            href={`/kategori/${article.rubrik.slug}`}
            className="font-black text-red-600 uppercase tracking-wider hover:underline"
          >
            {article.rubrik.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="truncate max-w-[200px] sm:max-w-xs text-zinc-800">
            {article.title}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols on desktop) */}
          <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            {/* Header / Title Section */}
            <header className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                  {article.rubrik.name}
                </span>
                <span className="text-xs text-zinc-500 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  Waktu baca ± {readingTime} menit
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black leading-[1.18] tracking-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal border-l-4 border-red-600 pl-4 py-1 bg-zinc-50 rounded-r-lg">
                {article.excerpt}
              </p>

              {/* Author & Meta Row */}
              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/penulis/${article.author.slug}`}
                  className="flex items-center gap-3 group/author"
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                    <Image
                      src={article.author.avatarUrl}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black group-hover/author:text-red-600 transition-colors">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-zinc-500 font-medium">
                      {article.author.role} • {formatDate(article.publishedAt)} • {article.views.toLocaleString("id-ID")} kali dibaca
                    </p>
                  </div>
                </Link>

                {/* Interactive Social Share */}
                <ArticleShareButtons
                  title={article.title}
                  slug={article.slug}
                  url={canonicalUrl}
                />
              </div>
            </header>

            {/* Featured Image + Caption + Credit */}
            <div className="mb-10">
              <div className="relative aspect-16/10 sm:aspect-21/10 w-full rounded-2xl overflow-hidden bg-zinc-100 shadow-xs">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 px-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 gap-1 font-medium">
                <p className="italic text-zinc-600">{article.featuredImageCaption}</p>
                <p className="text-[11px] text-zinc-400 shrink-0">
                  Foto: {article.photoSource}
                </p>
              </div>
            </div>

            {/* Article Content: Crisp Lato Typography */}
            <div
              className="prose prose-zinc prose-lg max-w-none 
                leading-relaxed text-zinc-900
                [&_p]:mb-6 [&_p]:leading-[1.85] [&_p]:text-[17px] sm:[&_p]:text-[18px] [&_p]:font-normal
                [&_h3]:font-black [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-black [&_h3]:tracking-tight
                [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:bg-zinc-50 [&_blockquote]:p-5 [&_blockquote]:rounded-r-xl [&_blockquote]:font-bold [&_blockquote]:text-black [&_blockquote]:my-8
                [&_.lead]:text-xl [&_.lead]:font-bold [&_.lead]:text-black [&_.lead]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
            />

            {/* Source Attribution */}
            {article.source && (
              <div className="mt-10 p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 font-medium">
                <strong className="text-black font-bold">Sumber & Liputan:</strong>{" "}
                {article.source}
              </div>
            )}

            {/* Tags Cloud */}
            <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-black mr-2">
                Topik Terkait:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-md text-xs font-bold bg-zinc-100 text-zinc-800 hover:bg-red-600 hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Reader Reactions Section */}
            <ArticleReactions articleSlug={article.slug} />

            {/* Author Profile Card */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-200 shrink-0 ring-2 ring-red-600">
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
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                      Penulis BELOKIRI
                    </span>
                    <h4 className="text-base font-black text-black">
                      {article.author.name}
                    </h4>
                  </div>
                  <Link
                    href={`/penulis/${article.author.slug}`}
                    className="text-xs font-black text-red-600 hover:text-black transition-colors uppercase tracking-wider"
                  >
                    Semua Tulisan →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Related & Recent Articles (Tepat di Bawah Card Profile Penulis) */}
            {relatedArticles.length > 0 && (
              <section className="mt-12 pt-8 border-t-2 border-black space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Rekomendasi Bacaan Lanjutan</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                      Tulisan Terkait & Terkini
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5 font-normal">
                      Lanjut membaca esai, analisis warkop, dan perspektif kritis lainnya di BELOKIRI.
                    </p>
                  </div>

                  <Link
                    href={`/kategori/${article.rubrik.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 hover:text-black transition-colors shrink-0"
                  >
                    <span>Rubrik {article.rubrik.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedArticles.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <PopularSidebar articles={popularArticles} />

            {/* Rubrik Spotlight Box */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                Fokus Rubrik
              </span>
              <h4 className="text-xl font-black text-black uppercase">
                {article.rubrik.name}
              </h4>
              <p className="text-xs text-zinc-600 mt-3 leading-relaxed font-normal">
                {article.rubrik.description || article.rubrik.question}
              </p>
              <div className="mt-5 pt-4 border-t border-zinc-100">
                <Link
                  href={`/kategori/${article.rubrik.slug}`}
                  className="text-xs font-black text-black hover:text-red-600 flex items-center justify-between uppercase tracking-wider"
                >
                  <span>Indeks Rubrik {article.rubrik.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
