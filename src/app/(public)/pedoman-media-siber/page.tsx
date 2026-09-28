import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("pedoman-media-siber");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function PedomanMediaSiberPage() {
  const { page } = await getCustomPageAction("pedoman-media-siber");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <header className="space-y-3">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          {page.badge || "STANDAR EDITORIAL & PERS ALTERNATIF"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {page.subtitle}
          </p>
        )}
      </header>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div
          className="prose prose-zinc max-w-none text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal
            [&_h2]:text-base sm:[&_h2]:text-lg [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-3
            [&_h3]:text-sm sm:[&_h3]:text-base [&_h3]:font-black [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-3 [&_p]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-zinc-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:font-bold [&_blockquote]:text-black [&_blockquote]:my-6
            [&_hr]:my-6 [&_hr]:border-zinc-200
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-3
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mb-3"
          dangerouslySetInnerHTML={{
            __html: formatArticleContent(page.content),
          }}
        />
      </div>

      <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-2">
        <p className="font-bold text-black uppercase tracking-wider">
          Pengaduan Etika & Hak Jawab:
        </p>
        <p>
          Kirimkan surat permohonan hak jawab, klarifikasi, atau laporan pelanggaran kode etik ke:{" "}
          <strong className="text-red-600">redaksi@belokiri.id</strong> atau via pos ke Meja Redaksi BELOKIRI.
        </p>
      </div>
    </div>
  );
}
