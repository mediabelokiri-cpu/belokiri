"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquareText, PenSquare, Sparkles } from "lucide-react";

interface ReactionDef {
  id: string;
  emoji: string;
  label: string;
  description: string;
  defaultCount: number;
}

const REACTION_CONFIGS: ReactionDef[] = [
  {
    id: "masuk-akal",
    emoji: "☕",
    label: "Masuk Akal",
    description: "Analisis tongkrongan yang ngena & logis",
    defaultCount: 0,
  },
  {
    id: "sepakat",
    emoji: "✊",
    label: "Sepakat",
    description: "Solidaritas & keberpihakan pada gagasan ini",
    defaultCount: 0,
  },
  {
    id: "mendidih",
    emoji: "🔥",
    label: "Mendidih",
    description: "Keresahan atas ketimpangan / ketidakadilan",
    defaultCount: 0,
  },
  {
    id: "jenaka",
    emoji: "🎭",
    label: "Jenaka",
    description: "Satir tajam dengan tawa getir",
    defaultCount: 0,
  },
  {
    id: "tersentil",
    emoji: "🤯",
    label: "Tersentil",
    description: "Membongkar apa yang selama ini terabaikan",
    defaultCount: 0,
  },
];

interface ArticleReactionsProps {
  articleSlug: string;
}

export default function ArticleReactions({
  articleSlug,
}: ArticleReactionsProps) {
  const [userSelected, setUserSelected] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialCounts: Record<string, number> = {};
    REACTION_CONFIGS.forEach((r) => {
      initialCounts[r.id] = 0;
    });

    const storageKey = `belokiri_reaction_${articleSlug}`;
    const countsKey = `belokiri_reaction_counts_${articleSlug}`;

    const savedCounts = localStorage.getItem(countsKey);
    if (savedCounts) {
      try {
        const parsed = JSON.parse(savedCounts);
        Object.assign(initialCounts, parsed);
      } catch {
        // Ignore parse error
      }
    }

    const saved = localStorage.getItem(storageKey);
    if (saved && initialCounts[saved] !== undefined) {
      setUserSelected(saved);
      if (initialCounts[saved] === 0) {
        initialCounts[saved] = 1;
      }
    }

    setCounts(initialCounts);
  }, [articleSlug]);

  const handleToggleReaction = (reactionId: string) => {
    const storageKey = `belokiri_reaction_${articleSlug}`;
    const countsKey = `belokiri_reaction_counts_${articleSlug}`;

    setCounts((prev) => {
      const next = { ...prev };

      // If user clicks the currently selected reaction, unselect it
      if (userSelected === reactionId) {
        next[reactionId] = Math.max(0, (next[reactionId] || 1) - 1);
        setUserSelected(null);
        localStorage.removeItem(storageKey);
      } else {
        // If user already had a different reaction, decrement previous
        if (userSelected && next[userSelected]) {
          next[userSelected] = Math.max(0, next[userSelected] - 1);
        }
        // Increment newly selected
        next[reactionId] = (next[reactionId] || 0) + 1;
        setUserSelected(reactionId);
        localStorage.setItem(storageKey, reactionId);
      }

      localStorage.setItem(countsKey, JSON.stringify(next));
      return next;
    });
  };

  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-zinc-50 border-2 border-zinc-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-sm font-black text-black uppercase tracking-wider">
              Reaksi Warga Pembaca
            </h3>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-normal">
            Bagaimana kesan naskah ini menurutmu? Pilih reaksi paling mewakili:
          </p>
        </div>

        {mounted && (
          <span className="text-[11px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-full border border-zinc-200 self-start sm:self-auto">
            Total Reaksi: <strong className="text-red-600">{totalReactions}</strong>
          </span>
        )}
      </div>

      {/* Reaction Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {REACTION_CONFIGS.map((reaction) => {
          const isSelected = userSelected === reaction.id;
          const count = counts[reaction.id] ?? 0;

          return (
            <button
              key={reaction.id}
              type="button"
              onClick={() => handleToggleReaction(reaction.id)}
              className={`p-3.5 rounded-2xl border transition-all text-center group cursor-pointer flex flex-col items-center justify-between min-h-[90px] select-none ${
                isSelected
                  ? "bg-red-50 border-red-600 shadow-xs scale-102 ring-2 ring-red-600/30"
                  : "bg-white border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/80 active:scale-98"
              }`}
              title={reaction.description}
            >
              <span className="text-2xl transition-transform group-hover:scale-120 duration-150 block mb-1">
                {reaction.emoji}
              </span>
              <span
                className={`text-xs font-black uppercase tracking-tight block ${
                  isSelected ? "text-red-700" : "text-zinc-800"
                }`}
              >
                {reaction.label}
              </span>
              <span
                className={`text-[11px] font-mono mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isSelected
                    ? "bg-red-600 text-white"
                    : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Call to Action: Punya Narasi Tandingan? */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-4 rounded-2xl border border-zinc-200/80">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black text-black uppercase tracking-tight">
              Punya Sudut Pandang Berbeda atau Narasi Tandingan?
            </p>
            <p className="text-[11px] text-zinc-500 font-normal">
              Jangan cuma diam. Tuliskan analisis atau opinimu di Meja Warga Belokan.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/artikel/buat"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-black hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-xs"
        >
          <PenSquare className="w-3.5 h-3.5" />
          <span>Tulis Naskah</span>
        </Link>
      </div>
    </div>
  );
}
