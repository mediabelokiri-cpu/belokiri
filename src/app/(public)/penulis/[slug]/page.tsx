import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthorBySlug } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { BookOpen, ChevronRight } from "lucide-react";

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
    title: `${data.author.name} — Profil Penulis | BELOKIRI`,
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
      <div className="flex items-center gap-2 text-xs text-zinc-500 font-semibold">
        <Link href="/" className="hover:text-black transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-400">Penulis</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="font-black text-black">{author.name}</span>
      </div>

      {/* Author Bio Banner */}
      <div className="rounded-3xl bg-white border border-zinc-200 p-8 sm:p-10 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-zinc-200 ring-4 ring-red-600 shrink-0">
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
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-600 px-3 py-1 rounded-sm shadow-xs">
                {author.role}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-black mt-2 tracking-tight">
                {author.name}
              </h1>
              {author.penName && (
                <p className="text-xs text-zinc-500 font-medium italic">
                  Nama pena: {author.penName}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-700 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200 font-bold">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>
                <strong className="text-black">{totalArticles}</strong> artikel terbit
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl font-normal">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Author Articles Feed */}
      <div>
        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          Seluruh Tulisan Terbit oleh {author.name}
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200 text-zinc-500 text-sm font-medium">
            Penulis ini belum memiliki artikel yang diterbitkan.
          </div>
        )}
      </div>
    </div>
  );
}
