"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import {
  ArrowRight,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface HeroArticleProps {
  headlineArticles: MockArticle[];
  secondaryArticles: MockArticle[];
  popularArticles: MockArticle[];
}

export default function HeroArticle({
  headlineArticles,
  secondaryArticles,
  popularArticles,
}: HeroArticleProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.min(3, headlineArticles.length);

  // Auto slide timer
  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const activeArticle = headlineArticles[currentSlide] || headlineArticles[0];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 w-full items-stretch">
        {/* ======================================================== */}
        {/* KOLOM 1: SLIDER HEADLINE UTAMA (6 COLS / LEBIH BESAR)    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 relative group rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-black min-h-[420px] sm:min-h-[480px] lg:h-[520px] flex flex-col justify-between">
          {activeArticle && (
            <>
              {/* Background Image with smooth transition */}
              <div className="absolute inset-0 z-0">
                <Image
                  key={activeArticle.id}
                  src={activeArticle.featuredImage}
                  alt={activeArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />
              </div>

              {/* Top Row: Badges & Slide Controls */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg">
                    {activeArticle.rubrik.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-black bg-white px-2.5 py-1 rounded-sm shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
                    <span>Headline {currentSlide + 1}/{totalSlides}</span>
                  </span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors cursor-pointer border border-white/20"
                    aria-label="Slide Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors cursor-pointer border border-white/20"
                    aria-label="Slide Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom: Title & Metadata & Dots */}
              <div className="relative z-10 p-5 sm:p-7 space-y-4">
                <Link href={`/artikel/${activeArticle.slug}`} className="block">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-red-400 transition-colors tracking-tight drop-shadow-md">
                    {activeArticle.title}
                  </h1>
                </Link>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                  <Link
                    href={`/penulis/${activeArticle.author.slug}`}
                    className="flex items-center gap-2.5 group/author"
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-white/60 shrink-0">
                      <Image
                        src={activeArticle.author.avatarUrl}
                        alt={activeArticle.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white group-hover/author:text-red-300 transition-colors">
                        {activeArticle.author.name}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium">
                        <Clock className="w-3 h-3 text-red-400" />
                        <span>{formatDate(activeArticle.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-3">
                    {/* Slide Dots Indicator */}
                    <div className="flex items-center gap-1.5 mr-2">
                      {headlineArticles.slice(0, 3).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            currentSlide === idx
                              ? "w-6 bg-red-600"
                              : "w-2 bg-white/40 hover:bg-white/70"
                          }`}
                          aria-label={`Ke slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <Link
                      href={`/artikel/${activeArticle.slug}`}
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md transform active:scale-95"
                    >
                      <span>BACA</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ======================================================== */}
        {/* KOLOM 2: 2 ARTIKEL FOKUS AGEN BELOKAN (3 COLS)           */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 justify-between lg:h-[520px]">
          {secondaryArticles.slice(0, 2).map((article, index) => (
            <article
              key={article.id}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-zinc-200 hover:border-red-600/80 bg-black h-[220px] sm:h-[240px] lg:h-[248px] flex flex-col justify-between transition-all"
            >
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Top Badge */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow">
                  {article.rubrik.name}
                </span>
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider bg-white/90 text-black shadow">
                  Fokus 0{index + 1}
                </span>
              </div>

              {/* Bottom Title & Author */}
              <div className="relative z-10 p-4 space-y-2">
                <Link href={`/artikel/${article.slug}`} className="block">
                  <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors tracking-tight drop-shadow-sm">
                    {article.title}
                  </h3>
                </Link>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
                  <span className="truncate max-w-[120px] font-bold text-white">
                    {article.author.name}
                  </span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ======================================================== */}
        {/* KOLOM 3: TERPOPULER DI BELOKIRI (RED CARD - 3 ARTIKEL)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 rounded-2xl bg-red-600 text-white border border-red-700 p-6 flex flex-col justify-between shadow-xl lg:h-[520px]">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/20">
              <Flame className="w-4 h-4 text-white fill-current" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                TERPOPULER DI BELOKIRI
              </h3>
            </div>

            <div className="divide-y divide-white/15">
              {popularArticles.slice(0, 3).map((article, idx) => (
                <div key={article.id} className="py-4 first:pt-1 last:pb-1 flex gap-3.5 items-start group">
                  <span className="text-3xl font-black text-white transition-colors w-7 shrink-0 leading-none">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/kategori/${article.rubrik.slug}`}
                      className="text-[10px] font-black uppercase tracking-wider text-red-100 bg-red-700/80 px-2 py-0.5 rounded inline-block hover:bg-red-800 transition-colors"
                    >
                      {article.rubrik.name}
                    </Link>
                    <Link href={`/artikel/${article.slug}`}>
                      <h4 className="text-sm font-black text-white leading-snug line-clamp-2 mt-1.5 group-hover:text-red-100 transition-colors tracking-tight">
                        {article.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-1.5 text-[11px] text-red-100/80 mt-1.5 font-medium">
                      <span className="truncate max-w-[120px] font-bold text-white">{article.author.name}</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString("id-ID")} pembaca</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/20 text-center">
            <Link
              href="/berita"
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-red-600 text-xs font-black uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Lihat Indeks Terkini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
