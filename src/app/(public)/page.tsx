export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import {
  getHeroArticles,
  getLatestArticles,
  getArticlesByRubrik,
  getEditorsPick,
  getPopularArticles,
  getAllRubriks,
} from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";
import HeroArticle from "@/components/public/HeroArticle";
import ArticleCard from "@/components/public/ArticleCard";
import EditorsPick from "@/components/public/EditorsPick";
import MejaWarkopSection from "@/components/public/MejaWarkopSection";
import { ArrowRight, Clock, Megaphone, PenLine, HeartHandshake } from "lucide-react";
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { defaultSiteSettings } from "@/lib/data/site-settings";

export default async function HomePage() {
  const [
    heroArticles,
    { articles: latestArticles },
    { articles: berisikArticles },
    { articles: warkopArticles },
    editorsPicks,
    popularArticles,
    rubriks,
    siteSettingsRes,
  ] = await Promise.all([
    getHeroArticles(3),
    getLatestArticles(8, 1),
    getArticlesByRubrik("berisik", 6),
    getArticlesByRubrik("meja-warkop", 5),
    getEditorsPick(5),
    getPopularArticles(5),
    getAllRubriks(),
    getSiteSettingsAction(),
  ]);

  const cta = siteSettingsRes?.settings?.cta || defaultSiteSettings.cta;

  // Use the remaining articles for secondary focus in Hero
  const secondaryArticles = latestArticles.slice(3, 5);

  const featuredBerisik = berisikArticles[0];
  const otherBerisik = berisikArticles.slice(1, 5);

  return (
    <div className="w-full">
      {/* ======================================================== */}
      {/* 1. HERO 3-KOLOM (SLIDER + FOKUS + TERPOPULER)            */}
      {/* ======================================================== */}
      {heroArticles.length > 0 && (
        <section className="w-full bg-white py-6 sm:py-8 border-b border-zinc-200 shadow-xs">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
            <HeroArticle
              headlineArticles={heroArticles}
              secondaryArticles={secondaryArticles}
              popularArticles={popularArticles}
            />
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* MAIN CONTAINER: BERISIK, AGEN BELOKAN, 8 RUBRIK          */}
      {/* ======================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* 2. Main Content: BERISIK (1 image card + title list) + Rubrik Focus */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* BERISIK Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-sm bg-red-600 text-white">
                  <Megaphone className="w-4 h-4 fill-white" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-black">
                  BERISIK
                </h2>
              </div>
              <Link
                href="/kategori/berisik"
                className="text-xs font-black uppercase text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <span>Semua Berisik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {featuredBerisik ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* 1 Display Artikel dengan Gambar */}
                <div className="md:col-span-7 flex flex-col">
                  <article className="group flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-400 hover:shadow-md transition-all h-full">
                    <div>
                      {/* Card Image */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-200">
                        <Image
                          src={featuredBerisik.featuredImage}
                          alt={featuredBerisik.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                            {featuredBerisik.rubrik.name}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        <Link href={`/artikel/${featuredBerisik.slug}`}>
                          <h3 className="text-lg sm:text-xl font-black text-black leading-snug line-clamp-3 group-hover:text-red-600 transition-colors tracking-tight">
                            {featuredBerisik.title}
                          </h3>
                        </Link>
                        <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 font-normal">
                          {featuredBerisik.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                      <Link
                        href={`/penulis/${featuredBerisik.author.slug}`}
                        className="font-bold text-zinc-800 hover:text-red-600 transition-colors"
                      >
                        {featuredBerisik.author.name}
                      </Link>
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{formatDate(featuredBerisik.publishedAt)}</span>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Artikel Lainnya Hanya Judul */}
                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-white border border-zinc-200 p-5 shadow-xs">
                  <div className="divide-y divide-zinc-100 flex-1 flex flex-col justify-between">
                    {otherBerisik.map((article, idx) => (
                      <article
                        key={article.id}
                        className="group py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-red-600">
                            0{idx + 2}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-400">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <Link href={`/artikel/${article.slug}`}>
                          <h4 className="text-sm font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                        </Link>
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                          <span>Oleh</span>
                          <Link
                            href={`/penulis/${article.author.slug}`}
                            className="text-zinc-600 font-semibold hover:text-red-600 transition-colors"
                          >
                            {article.author.name}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Editorial Sidebar: Rubrik Focus (Prinsip Editorial card removed) */}
          <div className="lg:col-span-4">
            {/* Rubrik Spotlight Box */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Pilihan Rubrik Khusus
                </h4>
                <Link
                  href="/kategori"
                  className="text-[11px] font-bold text-red-600 hover:underline"
                >
                  Semua Rubrik
                </Link>
              </div>
              <div className="space-y-3">
                {rubriks.slice(0, 5).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/kategori/${r.slug}`}
                    className="block p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-black group-hover:text-red-600 transition-colors">
                        {r.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-red-600 transition-all" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 italic line-clamp-1 font-medium">
                      “{r.question}”
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Editor's Pick Curated Banner (Solid Black & Red) */}
        <section>
          <EditorsPick articles={editorsPicks} />
        </section>

        {/* 4. MEJA WARKOP Rubrik Section (Distinct Horizontal Lead + 3-Column Strip) */}
        {warkopArticles.length > 0 && (
          <section className="pt-4">
            <MejaWarkopSection articles={warkopArticles} />
          </section>
        )}

        {/* 5. Semua Artikel Masuk (Urut Tanggal Publish) */}
        <section className="pt-8 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600 block mb-1.5">
                PUBLIKASI TERKINI
              </span>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-sm bg-red-600 text-white">
                  <PenLine className="w-4 h-4" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
                  TULISAN TERBARU
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs text-zinc-500 max-w-sm font-medium hidden sm:block">
                Arsip esai, laporan analisis, dan percakapan kritis paling mutakhir dari seluruh rubrik BELOKIRI.
              </p>
              <Link
                href="/berita"
                className="text-xs font-black uppercase text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Semua Tulisan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {latestArticles.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-zinc-200 p-8 shadow-xs">
              <PenLine className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-base font-black uppercase text-zinc-800 tracking-tight">
                Belum Ada Naskah yang Diterbitkan
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                Redaksi BELOKIRI siap menerima dan menerbitkan tulisan-tulisan orisinal pertama dari Warga dan Agen Belokan.
              </p>
              <div className="pt-4">
                <Link
                  href="/kirim-tulisan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>Kirim Tulisan Pertama</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latestArticles.slice(0, 8).map((article) => (
                <ArticleCard key={article.id} article={article} showExcerpt={false} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ======================================================== */}
      {/* 5B. BANNER CTA DONASI: DARI WARGA UNTUK WARGA            */}
      {/* ======================================================== */}
      {cta.donasiBanner?.enabled !== false && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 my-14">
          <div className="relative rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 border-2 border-red-600 shadow-2xl overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-500 bg-red-950/80 border border-red-800/80 px-3.5 py-1.5 rounded-full">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{cta.donasiBanner?.badgeText || "DARI WARGA UNTUK WARGA"}</span>
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                  {cta.donasiBanner?.title || "PATUNGAN SOLIDARITAS: JAGA BELOKIRI TETAP MENGUDARA"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {cta.donasiBanner?.description ||
                    "Belokiri tidak disokong cukong dan tidak jualan iklan sampah. Kami hidup dari kemandirian dan sokongan Warga Belokan. Sisihkan secangkir kopi untuk menjaga akal sehat tetap bersuara."}
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={cta.donasiBanner?.buttonUrl || "/donasi"}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform active:scale-95 text-center"
                >
                  <span>{cta.donasiBanner?.buttonText || "Donasi Solidaritas"}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 6. RUANG WARGA & AGEN BELOKAN (DUA KOLOM DI ATAS FOOTER) */}
      {/* ======================================================== */}
      <section className="w-full bg-red-600 text-white py-16 sm:py-20 border-t-2 border-red-700 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:divide-x md:divide-red-500/50">
            {/* Kolom 1: RUANG WARGA BELOKAN (Kirim Tulisan) */}
            <div className="flex flex-col justify-between items-start text-left md:pr-8">
              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-100 bg-red-700/70 border border-red-500/50 px-3.5 py-1 rounded-full mb-4">
                  RUANG WARGA BELOKAN
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase mb-3 leading-tight">
                  {cta.ruangWarga?.title || "Punya Gagasan atau Cerita yang Perlu Didengar?"}
                </h3>
                <p className="text-sm text-red-100/90 leading-relaxed mb-8 font-normal">
                  {cta.ruangWarga?.description ||
                    "BELOKIRI membuka ruang seluas-luasnya bagi mahasiswa, pelajar, peneliti, dan masyarakat umum untuk menyumbangkan tulisan, esai kritis, atau pandangan nyeleneh yang jujur."}
                </p>
              </div>
              <Link
                href={cta.ruangWarga?.buttonUrl || "/kirim-tulisan"}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-red-600 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform active:scale-95"
              >
                <span>{cta.ruangWarga?.buttonText || "Kirim Tulisan"}</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </Link>
            </div>

            {/* Kolom 2: RUANG AGEN BELOKAN (Rekrutmen Belokiri) */}
            <div className="flex flex-col justify-between items-start text-left pt-8 md:pt-0 md:pl-8 border-t md:border-t-0 border-red-500/50">
              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-100 bg-red-700/70 border border-red-500/50 px-3.5 py-1 rounded-full mb-4">
                  RUANG AGEN BELOKAN
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase mb-3 leading-tight">
                  {cta.ruangAgen?.title || "Tertarik Menjadi Bagian Awak BELOKIRI?"}
                </h3>
                <p className="text-sm text-red-100/90 leading-relaxed mb-8 font-normal">
                  {cta.ruangAgen?.description ||
                    "Kami membuka kesempatan bagi jurnalis investigasi, penulis esai, editor, dan kreator independen yang berani menyusup di antara narasi mapan demi menyuarakan realitas rakyat."}
                </p>
              </div>
              <Link
                href={cta.ruangAgen?.buttonUrl || "/rekrutmen"}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-red-600 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform active:scale-95"
              >
                <span>{cta.ruangAgen?.buttonText || "Gabung Jadi Agen"}</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
