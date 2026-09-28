import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("disclaimer");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function DisclaimerPage() {
  const { page } = await getCustomPageAction("disclaimer");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <header className="space-y-3">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          {page.badge || "BATASAN TANGGUNG JAWAB HUKUM"}
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
            [&_h2]:text-base [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mt-6 [&_h2]:mb-2
            [&_h3]:text-sm [&_h3]:font-black [&_h3]:text-black [&_h3]:mt-4 [&_h3]:mb-1
            [&_p]:mb-3 [&_p]:leading-relaxed
            [&_hr]:my-6 [&_hr]:border-zinc-200
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3"
          dangerouslySetInnerHTML={{
            __html: formatArticleContent(page.content),
          }}
        />
      </div>
    </div>
  );
}
