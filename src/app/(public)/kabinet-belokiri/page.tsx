import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { getCustomPageAction } from "@/actions/pages.actions";
import { defaultKabinetMembers } from "@/lib/data/site-settings";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("kabinet-belokiri");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function KabinetBelokiriPage() {
  const [resSettings, resPage] = await Promise.all([
    getSiteSettingsAction(),
    getCustomPageAction("kabinet-belokiri"),
  ]);

  const allMembers =
    resSettings.kabinet && resSettings.kabinet.length > 0
      ? resSettings.kabinet
      : defaultKabinetMembers;

  const page = resPage.page;
  const isCustom = resPage.isCustom;

  const activeMembers = allMembers.filter((m) => m.status === "AKTIF");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14 font-sans">
      {/* Header */}
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          {page.badge || "KABINET BELOKIRI"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title || "KABINET BELOKIRI"}
        </h1>
        {page.subtitle && (
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {page.subtitle}
          </p>
        )}
      </header>

      {/* Custom Content Intro (If customized via Admin) */}
      {isCustom && page.content && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div
            className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base
              [&_h2]:text-lg sm:[&_h2]:text-xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mb-3
              [&_p]:mb-3 [&_p]:leading-relaxed
              [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:bg-zinc-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:font-bold [&_blockquote]:text-black [&_blockquote]:my-4"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(page.content),
            }}
          />
        </div>
      )}

      {/* Grid Personil Kabinet (Sesuai Desain Card Mockup) */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeMembers.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl shadow-xl overflow-hidden bg-red-600 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-zinc-100"
            >
              {/* 1. Foto Personil */}
              <div className="relative w-full aspect-4/3 bg-zinc-800 overflow-hidden">
                <Image
                  src={item.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </div>

              {/* 2. Box Merah Solid (Nama, Jabatan, Deskripsi) */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 text-white bg-red-600">
                <div>
                  {/* Nama */}
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight">
                    {item.name}
                  </h3>

                  {/* Jabatan */}
                  <p className="text-sm sm:text-base font-semibold text-white/95 mt-1 tracking-normal">
                    {item.role}
                  </p>

                  {/* Deskripsi */}
                  {item.desc && (
                    <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed mt-4">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Rekrutmen */}
      <section className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full">
          PANGGILAN SOLIDARITAS
        </span>
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Ingin Mengisi Posisi di Kabinet Belokiri?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
            Kolektif Belokiri selalu membuka pintu bagi agen baru: dari mengurusi kurasi naskah,
            kampanye agitasi visual, hingga menulis dan mengorganisir forum warga.
          </p>
        </div>
        <div>
          <Link
            href="/rekrutmen"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all transform active:scale-95"
          >
            <span>Isi Form Rekrutmen Agen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
