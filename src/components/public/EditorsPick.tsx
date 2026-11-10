import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { Star } from "lucide-react";

interface EditorsPickProps {
  articles: MockArticle[];
}

export default function EditorsPick({ articles }: EditorsPickProps) {
  if (!articles.length) return null;

  const mainPick = articles[0];
  const sidePicks = articles.slice(1, 5);

  return (
    <section className="rounded-2xl bg-[#1f1f1f] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-zinc-800">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-sm bg-[#4c13ff] text-white">
            <Star className="w-5 h-5 text-[#ffc22f] fill-[#ffc22f]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            PILIHAN REDAKSI
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-medium hidden sm:inline-block">
          Kurasi naskah esai, laporan, dan refleksi terpilih minggu ini
        </span>
      </div>

      {/* Grid: 1 Gambar Besar dengan Judul di Dalam + Artikel Lainnya Hanya Judul */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Main Pick (1 artikel dengan gambar besar, judul ada di dalam gambar) */}
        <div className="lg:col-span-7 flex flex-col">
          <article className="relative w-full rounded-2xl overflow-hidden group min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] flex flex-col justify-end border border-zinc-800 h-full shadow-lg">
            {/* Background Image */}
            <Image
              src={mainPick.featuredImage}
              alt={mainPick.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Content inside image */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end">
              <div className="mb-3">
                <Link
                  href={`/kategori/${mainPick.rubrik.slug}`}
                  className="inline-block px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-[#4c13ff] text-white shadow-md hover:bg-[#ffc22f] hover:text-[#1f1f1f] transition-colors"
                >
                  {mainPick.rubrik.name}
                </Link>
              </div>

              <Link href={`/artikel/${mainPick.slug}`}>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug group-hover:text-[#ffc22f] transition-colors tracking-tight line-clamp-3">
                  {mainPick.title}
                </h3>
              </Link>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/15 text-xs text-zinc-300">
                <span>
                  Oleh: <strong className="text-white font-bold">{mainPick.author.name}</strong>
                </span>
                <span className="font-medium text-zinc-400">{formatDate(mainPick.publishedAt)}</span>
              </div>
            </div>
          </article>
        </div>

        {/* Side Picks (artikel lainnya hanya judul di sampingnya) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6 sm:p-7 shadow-xs h-full">
          <div className="divide-y divide-zinc-800/80 flex-1 flex flex-col justify-between">
            {sidePicks.map((pick, idx) => (
              <article key={pick.id} className="group py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#ffc22f]">
                    0{idx + 2}
                  </span>
                  <Link
                    href={`/kategori/${pick.rubrik.slug}`}
                    className="text-[10px] font-black uppercase tracking-wider text-[#ffc22f] hover:underline"
                  >
                    {pick.rubrik.name}
                  </Link>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    • {formatDate(pick.publishedAt)}
                  </span>
                </div>
                <Link href={`/artikel/${pick.slug}`}>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#ffc22f] transition-colors line-clamp-2">
                    {pick.title}
                  </h4>
                </Link>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                  <span>Oleh</span>
                  <Link
                    href={`/penulis/${pick.author.slug}`}
                    className="text-zinc-300 font-semibold hover:text-[#ffc22f] transition-colors"
                  >
                    {pick.author.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
