import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, PenSquare } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-banner-heading"
      className="w-full bg-white border-b border-zinc-200"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-1 sm:pt-6 sm:pb-0 flex flex-col items-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Editorial Copy & Actions: inline pair (title left + CTA right) on mobile, stacked on sm+, left column on lg+ */}
        <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:mx-0 lg:py-8 flex flex-row sm:flex-col items-center lg:items-start justify-center sm:justify-start gap-3 min-[375px]:gap-4 sm:gap-4 text-left sm:text-center lg:text-left">
          <h1
            id="hero-banner-heading"
            className="text-balance text-[clamp(1.25rem,4.8vw,1.625rem)] sm:text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-black text-[#1f1f1f] tracking-tight leading-[1.08]"
          >
            <span className="block sm:inline">Setiap Pikiran</span>{" "}
            <span className="whitespace-nowrap">Punya Ruang.</span>
          </h1>

          <p className="hidden sm:block text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
            Media warga dan ruang baca independen untuk menyuarakan realitas,
            merekam pengalaman, menelaah kebudayaan, dan merawat ekspresi
            secara terbuka.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 sm:pt-1">
            <Link
              href="/kirim-tulisan"
              className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-[#4c13ff] hover:bg-[#3d0dd9] text-white text-[11px] sm:text-sm font-black uppercase tracking-wider shadow-sm transition-all transform active:scale-95 focus-visible:outline-3 focus-visible:outline-[#1f1f1f] focus-visible:outline-offset-2"
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

        {/* Hero Illustration aligned to bottom border */}
        <div className="lg:col-span-6 lg:self-end w-full max-w-[380px] sm:max-w-md lg:max-w-none mx-auto mt-3 sm:mt-5 lg:mt-0 pointer-events-none">
          <Image
            src="/images/newbannerherosection.png"
            alt="Ilustrasi warga membawa poster Saya Akan Lawan, bersepeda, berorasi dengan megafon, membaca buku, dan berdiskusi bersama di Bakubaca"
            width={1439}
            height={996}
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 448px, 560px"
            className="block w-full h-auto aspect-[1439/996] object-contain select-none"
          />
        </div>
      </div>
    </section>
  );
}
