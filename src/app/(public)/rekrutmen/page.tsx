import { Metadata } from "next";
import Link from "next/link";
import { Users, Send, ArrowRight, Clock, AlertCircle } from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("rekrutmen");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function RekrutmenPage() {
  const { page } = await getCustomPageAction("rekrutmen");
  const isOpen = page.extraData?.isOpen !== false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Users className="w-3.5 h-3.5" />
          <span>{page.badge || "Panggilan Terbuka"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
            {page.subtitle}
          </p>
        )}

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Main Narrative Content */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
        <div
          className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-base sm:text-lg
            [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-4 [&_h2]:py-0.5 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-normal
            [&_blockquote]:my-6 [&_blockquote]:p-5 sm:[&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:text-black [&_blockquote]:font-bold [&_blockquote]:text-base sm:[&_blockquote]:text-lg
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
            [&_hr]:my-8 [&_hr]:border-zinc-200"
          dangerouslySetInnerHTML={{
            __html: formatArticleContent(page.content),
          }}
        />

        {/* Dynamic Registration Status Banner & CTA */}
        <div className="pt-6 border-t border-zinc-200">
          {isOpen ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-black text-white text-center space-y-4 shadow-lg border-t-4 border-red-600">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Pendaftaran Sedang Dibuka
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Siap Menjadi Agen Belokan?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                Isi formulir pendaftaran, lampirkan gagasan tulisan, dan bergabunglah bersama redaksi Belokiri.
              </p>
              <div className="pt-2">
                <Link
                  href="/rekrutmen/form"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-md active:scale-95 group cursor-pointer"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>Isi Formulir Pendaftaran Agen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-100 border border-zinc-300 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-black uppercase tracking-tight">
                Pendaftaran Sedang Ditutup
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
                Pendaftaran calon agen saat ini belum dibuka kembali. Pantau terus akun media sosial resmi BELOKIRI untuk pengumuman batch berikutnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
