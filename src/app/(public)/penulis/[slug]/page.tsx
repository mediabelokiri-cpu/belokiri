import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthorBySlug } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { UserCheck, BookOpen, ChevronRight } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);

  if (!data) {
    return { title: "Penulis Tidak Ditemukan" };
  }

  return {
    title: `${data.author.name} — Profil Penulis | NALAR`,
    description: data.author.bio,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);

  if (!data) {
    notFound();
  }

  const { author, articles, totalArticles } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-400">Penulis</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-bold text-stone-900">{author.name}</span>
      </div>

      {/* Author Bio Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-8 sm:p-10 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-stone-100 ring-4 ring-stone-100 shrink-0">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                {author.role}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mt-1">
                {author.name}
              </h1>
              {author.penName && (
                <p className="text-xs text-stone-500 font-medium italic">
                  Nama pena: {author.penName}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-600 bg-stone-50 px-3.5 py-1.5 rounded-lg border border-stone-200">
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>
                <strong>{totalArticles}</strong> artikel terbit
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Author Articles Feed */}
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 mb-6">
          Seluruh Tulisan Terbit oleh {author.name}
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-sm">
            Penulis ini belum memiliki artikel yang diterbitkan.
          </div>
        )}
      </div>
    </div>
  );
}
