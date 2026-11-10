"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MailOpen,
  MessageSquareQuote,
  RefreshCw,
  Star,
} from "lucide-react";
import SuratKalengForm from "@/components/public/SuratKalengForm";
import type { PublicSuratKalengItem } from "@/lib/data/site-settings";

interface SuratKalengSectionProps {
  initialMessages: PublicSuratKalengItem[];
}

const POLL_INTERVAL_MS = 4000;
const CHANNEL_NAME = "bakubaca_surat_kaleng_live";

function formatAbsoluteWib(isoString: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(isoString));
  } catch {
    return "";
  }
}

function formatRelativeTimeId(isoString: string, nowMs: number): string {
  const diffSec = Math.max(
    0,
    Math.floor((nowMs - new Date(isoString).getTime()) / 1000)
  );
  if (diffSec < 15) return "Baru saja";
  if (diffSec < 60) return `${diffSec} detik lalu`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  return formatAbsoluteWib(isoString);
}

function areListsEquivalent(
  a: PublicSuratKalengItem[],
  b: PublicSuratKalengItem[]
): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (
      a[i].id !== b[i].id ||
      a[i].isStarred !== b[i].isStarred ||
      a[i].isiSurat !== b[i].isiSurat ||
      a[i].namaSamaran !== b[i].namaSamaran
    ) {
      return false;
    }
  }
  return true;
}

function getInitialChar(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "W";
}

export default function SuratKalengSection({
  initialMessages,
}: SuratKalengSectionProps) {
  const [messages, setMessages] =
    useState<PublicSuratKalengItem[]>(initialMessages);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [mounted, setMounted] = useState(false);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const knownIdsRef = useRef<Set<string>>(
    new Set(initialMessages.map((item) => item.id))
  );
  const hasInitialSyncCompletedRef = useRef(false);
  const inFlightRef = useRef(false);
  const messagesRef = useRef<PublicSuratKalengItem[]>(initialMessages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const markRecentIds = useCallback((ids: string[]) => {
    if (!ids.length) return;
    setRecentIds((prev) => Array.from(new Set([...ids, ...prev])).slice(0, 12));
  }, []);

  const syncLatest = useCallback(
    async (isManual = false) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      if (isManual) setRefreshing(true);

      try {
        const res = await fetch("/api/surat-kaleng?limit=30", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = (await res.json()) as {
          success?: boolean;
          items?: PublicSuratKalengItem[];
        };

        if (data.success && Array.isArray(data.items)) {
          const incoming = data.items;
          const newlyDiscovered = incoming.filter(
            (item) => !knownIdsRef.current.has(item.id)
          );

          incoming.forEach((item) => knownIdsRef.current.add(item.id));

          if (hasInitialSyncCompletedRef.current && newlyDiscovered.length > 0) {
            markRecentIds(newlyDiscovered.map((item) => item.id));
            setAnnouncement(
              newlyDiscovered.length === 1
                ? `1 surat kaleng baru masuk dari ${newlyDiscovered[0].namaSamaran}.`
                : `${newlyDiscovered.length} surat kaleng baru masuk ke dinding warga.`
            );
          }

          hasInitialSyncCompletedRef.current = true;

          if (!areListsEquivalent(messagesRef.current, incoming)) {
            setMessages(incoming);
          }
        }
      } catch {
        // Keep previously loaded messages visible until next sync attempt
      } finally {
        inFlightRef.current = false;
        if (isManual) setRefreshing(false);
      }
    },
    [markRecentIds]
  );

  // Initial mount + visibility-aware real-time polling + relative time ticker
  useEffect(() => {
    setMounted(true);
    setNowMs(Date.now());
    syncLatest(false);

    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (pollTimer) return;
      pollTimer = setInterval(() => {
        if (document.visibilityState === "visible") {
          syncLatest(false);
        }
      }, POLL_INTERVAL_MS);
    };

    const stopPolling = () => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setNowMs(Date.now());
        syncLatest(false);
        startPolling();
      } else {
        stopPolling();
      }
    };

    const handleFocus = () => {
      setNowMs(Date.now());
      syncLatest(false);
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    const timeTicker = setInterval(() => {
      if (document.visibilityState === "visible") {
        setNowMs(Date.now());
      }
    }, 15000);

    return () => {
      stopPolling();
      clearInterval(timeTicker);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [syncLatest]);

  // Cross-tab instant synchronization via BroadcastChannel
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event: MessageEvent<{ type?: string; item?: PublicSuratKalengItem }>) => {
      const payload = event.data;
      if (payload?.type === "NEW_LETTER" && payload.item) {
        const incomingItem = payload.item;
        knownIdsRef.current.add(incomingItem.id);
        markRecentIds([incomingItem.id]);
        setMessages((prev) => {
          if (prev.some((existing) => existing.id === incomingItem.id)) {
            return prev;
          }
          return [incomingItem, ...prev].slice(0, 30);
        });
        setAnnouncement(
          `1 surat kaleng baru masuk dari ${incomingItem.namaSamaran}.`
        );
      }
    };

    return () => {
      channel.close();
    };
  }, [markRecentIds]);

  const handleSubmitted = useCallback(
    (newItem: PublicSuratKalengItem) => {
      knownIdsRef.current.add(newItem.id);
      markRecentIds([newItem.id]);
      setMessages((prev) => {
        const filtered = prev.filter((item) => item.id !== newItem.id);
        return [newItem, ...filtered].slice(0, 30);
      });
      setNowMs(Date.now());
      setAnnouncement(`Surat kalengmu atas nama ${newItem.namaSamaran} telah tampil.`);

      if (typeof BroadcastChannel !== "undefined") {
        try {
          const channel = new BroadcastChannel(CHANNEL_NAME);
          channel.postMessage({ type: "NEW_LETTER", item: newItem });
          channel.close();
        } catch {
          // Ignore BroadcastChannel restriction errors cleanly
        }
      }
    },
    [markRecentIds]
  );

  const recentSet = useMemo(() => new Set(recentIds), [recentIds]);

  return (
    <section
      id="surat-kaleng"
      aria-labelledby="surat-kaleng-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-0 mb-10 sm:mb-12"
    >
      <div className="rounded-3xl bg-white shadow-lg overflow-hidden forced-colors:border forced-colors:border-[CanvasText]">
        {/* Top Section Banner */}
        <div className="p-6 sm:p-8 border-b border-zinc-100 bg-white flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-sm bg-[#4c13ff] text-white shrink-0">
                <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
              </div>
              <h2
                id="surat-kaleng-heading"
                className="text-2xl sm:text-3xl font-black text-[#1f1f1f] tracking-tight uppercase leading-tight"
              >
                SURAT KALENG WARGA
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Tinggalkan kritik, saran, gagasan, atau keresahan langsung ke meja redaksi.
              Setiap suara Warga yang masuk langsung tampil di dinding publik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Count pill */}
            <div className="px-3 py-2 rounded-xl bg-zinc-100 text-xs font-black uppercase tracking-wider text-[#1f1f1f] tabular-nums">
              {messages.length} Pesan
            </div>

            {/* Manual sync trigger */}
            <button
              type="button"
              onClick={() => syncLatest(true)}
              disabled={refreshing}
              aria-label="Muat ulang pesan surat kaleng terbaru"
              className="min-h-10 min-w-10 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-[#1f1f1f] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#4c13ff] focus-visible:outline-offset-2"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  refreshing ? "animate-spin motion-reduce:animate-none text-[#4c13ff]" : ""
                }`}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Segarkan</span>
            </button>
          </div>
        </div>

        {/* Polite single live region for new arrival announcements */}
        <div role="status" aria-live="polite" className="sr-only">
          {announcement}
        </div>

        {/* Two-Column Body: Submission Form (Left) + Real-Time Wall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-white">
            <div className="mb-5 pb-3 border-b border-zinc-100">
              <h3
                id="surat-kaleng-form-heading"
                className="text-sm font-black uppercase tracking-wider text-[#1f1f1f]"
              >
                Tulis &amp; Kirim Surat Kaleng
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Bisa pakai nama samaran atau tetap tampil sebagai Warga Anonim.
              </p>
            </div>
            <SuratKalengForm
              headingId="surat-kaleng-form-heading"
              onSubmitted={handleSubmitted}
            />
          </div>

          {/* Right Column: Real-Time Message Wall */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-zinc-50 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-200/70">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1f1f1f]">
                Dinding Suara Warga
              </h3>
              <span className="text-xs font-medium text-zinc-600">
                Pembaruan otomatis aktif
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center rounded-2xl bg-white p-8 sm:p-10 min-h-[300px] shadow-xs forced-colors:border forced-colors:border-[CanvasText]">
                <div className="w-12 h-12 rounded-2xl bg-[#f3efff] text-[#4c13ff] flex items-center justify-center mb-3">
                  <MailOpen className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-tight text-[#1f1f1f]">
                  Belum Ada Surat Kaleng Masuk
                </h4>
                <p className="text-xs text-zinc-600 max-w-sm mt-1.5 leading-relaxed">
                  Jadilah Warga pertama yang menuliskan kritik, saran, atau refleksi di kolom sebelah kiri. Pesanmu akan langsung muncul di sini.
                </p>
              </div>
            ) : (
              <div className="max-h-[460px] lg:max-h-[520px] overflow-y-auto overscroll-contain [scrollbar-gutter:stable] pr-1.5">
                <ul className="space-y-3">
                  {messages.map((msg) => {
                    const isNew = recentSet.has(msg.id);
                    return (
                      <li key={msg.id}>
                        <article
                          className={`rounded-2xl p-4 sm:p-5 transition-colors shadow-xs forced-colors:border forced-colors:border-[CanvasText] ${
                            isNew
                              ? "ring-2 ring-[#4c13ff]/25 bg-[#f5f2ff]"
                              : msg.isStarred
                              ? "bg-amber-50/75"
                              : "bg-white hover:bg-zinc-50/90"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                aria-hidden="true"
                                className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-black text-xs uppercase ${
                                  isNew
                                    ? "bg-[#4c13ff] text-white"
                                    : msg.isStarred
                                    ? "bg-[#ffc22f] text-[#1f1f1f]"
                                    : "bg-[#1f1f1f] text-[#ffc22f]"
                                }`}
                              >
                                {getInitialChar(msg.namaSamaran)}
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-black text-[#1f1f1f] leading-snug break-words">
                                  {msg.namaSamaran}
                                </p>
                                <time
                                  dateTime={msg.createdAt}
                                  title={formatAbsoluteWib(msg.createdAt)}
                                  className="block text-xs text-zinc-600 font-medium"
                                >
                                  {mounted
                                    ? formatRelativeTimeId(msg.createdAt, nowMs)
                                    : formatAbsoluteWib(msg.createdAt)}
                                </time>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                              {isNew && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#4c13ff] text-white text-[10px] font-black uppercase tracking-wider">
                                  Baru Masuk
                                </span>
                              )}
                              {msg.isStarred && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#ffc22f] text-[#1f1f1f] text-[10px] font-black uppercase tracking-wider">
                                  <Star
                                    className="w-3 h-3 fill-[#1f1f1f]"
                                    aria-hidden="true"
                                  />
                                  <span>Pilihan Redaksi</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-[#1f1f1f] leading-relaxed whitespace-pre-wrap break-words font-normal">
                            &ldquo;{msg.isiSurat}&rdquo;
                          </p>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
