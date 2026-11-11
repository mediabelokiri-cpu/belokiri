import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, PenSquare } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-banner-heading"
      className="w-full bg-white border-b border-zinc-200"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto pt-2.5 sm:pt-5 lg:pt-4 pb-0 flex flex-col lg:grid lg:grid-cols-1 items-center">
        {/* Centered Editorial Copy & Actions */}
        <div className="lg:[grid-area:1/1] lg:self-start relative z-10 max-w-xl mx-auto text-center lg:pt-2 xl:pt-6 space-y-2 sm:space-y-4">
          <h1
            id="hero-banner-heading"
            className="text-balance text-[clamp(1.875rem,1.25rem+2.2vw,2.75rem)] font-black text-[#1f1f1f] tracking-tight leading-[1.08]"
          >
            Setiap Pikiran{" "}
            <span className="whitespace-nowrap">Punya Ruang.</span>
          </h1>

          <p className="hidden sm:block text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-lg mx-auto">
            Media warga dan ruang baca independen untuk menyuarakan realitas,
            merekam pengalaman, menelaah kebudayaan, dan merawat ekspresi
            secara terbuka.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
            <Link
              href="/kirim-tulisan"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-[#4c13ff] hover:bg-[#3d0dd9] text-white text-[11px] sm:text-sm font-black uppercase tracking-wider shadow-sm transition-all transform active:scale-95 focus-visible:outline-3 focus-visible:outline-[#1f1f1f] focus-visible:outline-offset-2"
            >
              <PenSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>Kirim Tulisan</span>
            </Link>

            <Link
              href="/donasi"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ffc22f] hover:bg-amber-300 text-[#1f1f1f] text-sm font-black uppercase tracking-wider shadow-sm transition-all transform active:scale-95 focus-visible:outline-3 focus-visible:outline-[#4c13ff] focus-visible:outline-offset-2"
            >
              <HeartHandshake className="w-4 h-4 text-[#1f1f1f]" aria-hidden="true" />
              <span>Patungan Warga</span>
            </Link>
          </div>
        </div>

        {/* Panoramic Doodle Line Art Illustration aligned to max-w-[1600px] below */}
        <div className="lg:[grid-area:1/1] lg:self-end w-full -mt-14 min-[375px]:-mt-16 sm:mt-0 md:-mt-10 lg:mt-0 lg:pt-12 xl:pt-0 pointer-events-none">
          <Image
            src="/images/hero-doodle-warga.png"
            alt="Ilustrasi doodle warga membaca buku, bermusik, berdiskusi santai, dan menyuarakan gagasan bersama di Bakubaca"
            width={1024}
            height={461}
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="block w-full h-auto aspect-[1024/461] object-contain select-none"
          />
        </div>
      </div>
    </section>
  );
}
