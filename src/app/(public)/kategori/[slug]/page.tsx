import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesByRubrik } from "@/lib/data/articles";
import ArticleCard from "@/components/public/ArticleCard";
import { ChevronRight, Layers, ArrowLeft } from "lucide-react";

interface RubrikPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RubrikPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { rubrik } = await getArticlesByRubrik(slug);

  if (!rubrik) {
    return { title: "Rubrik Tidak Ditemukan" };
  }

  return {
    title: `Rubrik ${rubrik.name} — ${rubrik.question} | NALAR`,
    description: rubrik.description,
  };
}

export default async function RubrikPage({ params }: RubrikPageProps) {
  const { slug } = await params;
  const { rubrik, articles, total } = await getArticlesByRubrik(slug);

  if (!rubrik) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 font-semibold">
        <Link href="/" className="hover:text-black transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-400">Rubrik</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="font-black text-red-600 uppercase">{rubrik.name}</span>
      </div>

      {/* Rubrik Hero Banner */}
      <div className="rounded-2xl bg-white border border-zinc-200 border-t-4 border-t-red-600 p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-100 text-zinc-800 text-xs font-black uppercase tracking-wider mb-4 border border-zinc-200">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>Rubrik Resmi NALAR</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight uppercase">
            {rubrik.name}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-red-700 italic mt-2">
            “{rubrik.question}”
          </p>

          <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {rubrik.description}
          </p>

          <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
            Menampilkan <strong className="text-black font-bold">{total}</strong> tulisan terbit di rubrik ini
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200">
          <p className="text-zinc-500 text-sm font-medium">
            Belum ada artikel yang diterbitkan pada rubrik ini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-xs font-black text-red-600 hover:underline uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      )}
    </div>
  );
}
