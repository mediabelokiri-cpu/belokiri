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
    <section className="rounded-2xl bg-stone-900 text-stone-100 p-6 sm:p-8 lg:p-10 shadow-lg">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white">
            Pilihan Redaksi
          </h2>
        </div>
        <span className="text-xs text-stone-400 font-medium hidden sm:inline-block">
          Kurasi artikel mendalam dan berbobot minggu ini
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Pick (Large) */}
        <div className="lg:col-span-7 group flex flex-col justify-between">
          <div>
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-stone-800 mb-4">
              <Image
                src={mainPick.featuredImage}
                alt={mainPick.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950">
                  {mainPick.rubrik.name}
                </span>
              </div>
            </div>

            <Link href={`/artikel/${mainPick.slug}`}>
              <h3 className="text-xl sm:text-2xl font-black font-serif leading-snug group-hover:text-amber-400 transition-colors">
                {mainPick.title}
              </h3>
            </Link>

            <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
              {mainPick.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-800 text-xs text-stone-400">
            <span>Oleh: <strong className="text-stone-200">{mainPick.author.name}</strong></span>
            <span>{formatDate(mainPick.publishedAt)}</span>
          </div>
        </div>

        {/* Side Picks List */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-stone-800">
          {sidePicks.map((pick) => (
            <div key={pick.id} className="py-4 first:pt-0 last:pb-0 group">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {pick.rubrik.name}
              </span>
              <Link href={`/artikel/${pick.slug}`}>
                <h4 className="text-sm font-bold font-serif leading-snug mt-1 group-hover:text-amber-400 transition-colors">
                  {pick.title}
                </h4>
              </Link>
              <p className="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                {pick.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-500">
                <span>{pick.author.name}</span>
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
