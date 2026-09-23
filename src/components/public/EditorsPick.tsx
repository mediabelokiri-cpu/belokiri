import Link from "next/link";
import Image from "next/image";
import { MockArticle } from "@/lib/data/mock-articles";
import { formatDate } from "@/lib/utils";
import { Award, ArrowRight } from "lucide-react";

interface EditorsPickProps {
  articles: MockArticle[];
}

export default function EditorsPick({ articles }: EditorsPickProps) {
  if (!articles.length) return null;

  const mainPick = articles[0];
  const sidePicks = articles.slice(1, 4);

  return (
    <section className="rounded-2xl bg-black text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-zinc-800">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-sm bg-red-600 text-white">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            PILIHAN AGEN BELOKAN
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-medium hidden sm:inline-block">
          Kurasi artikel analisis & investigasi berbobot minggu ini
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Pick (Large) */}
        <div className="lg:col-span-7 group flex flex-col justify-between">
          <div>
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-zinc-900 mb-5">
              <Image
                src={mainPick.featuredImage}
                alt={mainPick.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                  {mainPick.rubrik.name}
                </span>
              </div>
            </div>

            <Link href={`/artikel/${mainPick.slug}`}>
              <h3 className="text-xl sm:text-3xl font-black leading-snug group-hover:text-red-500 transition-colors tracking-tight">
                {mainPick.title}
              </h3>
            </Link>

            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3 font-normal">
              {mainPick.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-800 text-xs text-zinc-400">
            <span>
              Oleh: <strong className="text-white font-bold">{mainPick.author.name}</strong>
            </span>
            <span className="font-medium">{formatDate(mainPick.publishedAt)}</span>
          </div>
        </div>

        {/* Side Picks List */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-zinc-800">
          {sidePicks.map((pick) => (
            <div key={pick.id} className="py-4 first:pt-0 last:pb-0 group">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
                {pick.rubrik.name}
              </span>
              <Link href={`/artikel/${pick.slug}`}>
                <h4 className="text-sm sm:text-base font-black leading-snug mt-1 group-hover:text-red-400 transition-colors">
                  {pick.title}
                </h4>
              </Link>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                {pick.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500 font-medium">
                <span className="text-zinc-300 font-bold">{pick.author.name}</span>
                <span>•</span>
                <span>{formatDate(pick.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
