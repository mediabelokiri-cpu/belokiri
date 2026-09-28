import { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("konstitusi");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function KonstitusiPage() {
  const { page } = await getCustomPageAction("konstitusi");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Scale className="w-3.5 h-3.5" />
          <span>{page.badge || "Statuta & Piagam Kolektif"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-lg sm:text-2xl font-black text-red-600 uppercase tracking-wide">
            {page.subtitle}
          </p>
        )}

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* Main Content Area */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
        <div
          className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-base sm:text-lg
            [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-b-2 [&_h2]:border-black [&_h2]:pb-3 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-red-600 [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-normal
            [&_blockquote]:my-6 [&_blockquote]:p-5 sm:[&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:text-black [&_blockquote]:font-bold [&_blockquote]:text-base sm:[&_blockquote]:text-lg
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
            [&_hr]:my-8 [&_hr]:border-zinc-200"
          dangerouslySetInnerHTML={{
            __html: formatArticleContent(page.content),
          }}
        />
      </div>
    </div>
  );
}
