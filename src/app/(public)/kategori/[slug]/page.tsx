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
      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-400">Rubrik</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-bold text-stone-900 uppercase">{rubrik.name}</span>
      </div>

      {/* Rubrik Hero Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Rubrik Resmi NALAR</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-serif text-stone-950 tracking-tight">
            {rubrik.name}
          </h1>

          <p className="text-lg sm:text-xl font-serif text-amber-800 italic mt-2">
            “{rubrik.question}”
          </p>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            {rubrik.description}
          </p>

          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
            Menampilkan <strong>{total}</strong> tulisan terbit di rubrik ini
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
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200">
          <p className="text-stone-500 text-sm">
            Belum ada artikel yang diterbitkan pada rubrik ini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-stone-900 hover:text-amber-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      )}
    </div>
  );
}
