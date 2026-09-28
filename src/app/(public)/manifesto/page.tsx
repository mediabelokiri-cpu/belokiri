import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("manifesto");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function ManifestoPage() {
  const { page } = await getCustomPageAction("manifesto");

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Badge & Title */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5" />
          <span>{page.badge || "Sikap Editorial Belokiri.id"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-lg sm:text-2xl font-black text-red-600 uppercase tracking-wide">
            {page.subtitle}
          </p>
        )}

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* Main Content */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-10 text-zinc-900 leading-relaxed">
        <div
          className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-base sm:text-lg
            [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-4 [&_h2]:py-0.5 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:font-normal
            [&_blockquote]:my-8 [&_blockquote]:p-6 sm:[&_blockquote]:p-8 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:text-black [&_blockquote]:font-black [&_blockquote]:text-lg sm:[&_blockquote]:text-xl [&_blockquote]:leading-snug
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
            [&_hr]:my-10 [&_hr]:border-zinc-200"
          dangerouslySetInnerHTML={{
            __html: formatArticleContent(page.content),
          }}
        />
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-black text-white text-center space-y-4 border-t-4 border-red-600 shadow-xl">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Meja Terbuka
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Punya Kegelisahan yang Sama?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-normal leading-relaxed">
          Kirimkan tulisan, esai tajam, atau liputan warkopmu ke Agen Belokan BELOKIRI.
          Atau bergabunglah bersama kami melalui program Rekrutmen Anggota.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/kirim-tulisan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            <span>Kirim Tulisan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/rekrutmen"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 text-white text-xs font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            <span>Buka Halaman Rekrutmen</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
