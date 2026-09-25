"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { MessageSquareText, PenSquare, Sparkles } from "lucide-react";
import {
  getArticleReactionsAction,
  toggleArticleReactionAction,
  ReactionCounts,
} from "@/actions/reaction.actions";

interface ReactionDef {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

const REACTION_CONFIGS: ReactionDef[] = [
  {
    id: "masuk-akal",
    emoji: "☕",
    label: "Masuk Akal",
    description: "Analisis tongkrongan yang ngena & logis",
  },
  {
    id: "sepakat",
    emoji: "✊",
    label: "Sepakat",
    description: "Solidaritas & keberpihakan pada gagasan ini",
  },
  {
    id: "mendidih",
    emoji: "🔥",
    label: "Mendidih",
    description: "Keresahan atas ketimpangan / ketidakadilan",
  },
  {
    id: "jenaka",
    emoji: "🎭",
    label: "Jenaka",
    description: "Satir tajam dengan tawa getir",
  },
  {
    id: "tersentil",
    emoji: "🤯",
    label: "Tersentil",
    description: "Membongkar apa yang selama ini terabaikan",
  },
];

const DEFAULT_COUNTS: ReactionCounts = {
  "masuk-akal": 0,
  sepakat: 0,
  mendidih: 0,
  jenaka: 0,
  tersentil: 0,
};

interface ArticleReactionsProps {
  articleSlug: string;
  initialCounts?: ReactionCounts;
  initialTotal?: number;
}

export default function ArticleReactions({
  articleSlug,
  initialCounts,
  initialTotal = 0,
}: ArticleReactionsProps) {
  const [userSelected, setUserSelected] = useState<string | null>(null);
  const [counts, setCounts] = useState<ReactionCounts>(
    initialCounts || DEFAULT_COUNTS
  );
  const [voterToken, setVoterToken] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Helper to retrieve or create persistent voter token
  const getOrCreateVoterToken = (): string => {
    let token = "";
    try {
      token = localStorage.getItem("belokiri_voter_token") || "";
      if (!token) {
        token =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : "voter_" +
              Math.random().toString(36).substring(2) +
              Date.now().toString(36);
        localStorage.setItem("belokiri_voter_token", token);
      }
    } catch {
      token = "voter_fallback_" + Date.now();
    }
    return token;
  };

  useEffect(() => {
    setMounted(true);
    const token = getOrCreateVoterToken();
    setVoterToken(token);

    let isCancelled = false;

    // Fetch live global counts and this device's specific vote from Supabase
    getArticleReactionsAction(articleSlug, token).then((res) => {
      if (!isCancelled && res.success) {
        setCounts(res.counts);
        setUserSelected(res.userSelected);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [articleSlug]);

  const handleToggleReaction = (reactionId: string) => {
    const token = voterToken || getOrCreateVoterToken();
    if (!voterToken) {
      setVoterToken(token);
    }

    // 1. Optimistic UI update
    const previousSelected = userSelected;
    const previousCounts = { ...counts };

    const nextCounts = { ...counts };
    let nextSelected: string | null = null;

    if (userSelected === reactionId) {
      // Toggle OFF
      nextCounts[reactionId] = Math.max(0, (nextCounts[reactionId] || 1) - 1);
      nextSelected = null;
    } else {
      // If user had previous reaction, decrement old
      if (userSelected && nextCounts[userSelected]) {
        nextCounts[userSelected] = Math.max(0, nextCounts[userSelected] - 1);
      }
      // Increment new
      nextCounts[reactionId] = (nextCounts[reactionId] || 0) + 1;
      nextSelected = reactionId;
    }

    setUserSelected(nextSelected);
    setCounts(nextCounts);

    // 2. Persist to Supabase Database via Server Action
    startTransition(async () => {
      try {
        const res = await toggleArticleReactionAction(
          articleSlug,
          reactionId,
          token
        );
        if (res.success) {
          setCounts(res.counts);
          setUserSelected(res.userSelected);
        } else {
          // Revert to previous state if server rejected
          console.error("Failed to toggle reaction:", res.error);
          setUserSelected(previousSelected);
          setCounts(previousCounts);
        }
      } catch (err) {
        console.error("Network error toggling reaction:", err);
        setUserSelected(previousSelected);
        setCounts(previousCounts);
      }
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

        <span className="text-[11px] font-bold text-zinc-600 bg-white px-3 py-1.5 rounded-full border border-zinc-200 self-start sm:self-auto">
          Total Reaksi:{" "}
          <strong className="text-red-600">
            {mounted ? totalReactions : initialTotal}
          </strong>
        </span>
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
