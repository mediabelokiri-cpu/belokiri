"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Share2, PlusSquare, Smartphone, CheckCircle2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("PWA Service Worker registration:", err);
      });
    }

    // 2. Check if already installed / standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // 4. Check if dismissed recently (session-based)
    const hasDismissed = sessionStorage.getItem("belokiri_pwa_dismissed");

    // 5. Handle Android / Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If on iOS and not standalone, show prompt after 2 seconds
    if (isIosDevice && !hasDismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Fallback: If on mobile Android but event already fired or delayed, display after 2.5s
    const isMobile = /android|iphone|ipad|ipod|mobile/.test(userAgent);
    if (isMobile && !hasDismissed) {
      const fallbackTimer = setTimeout(() => {
        setShowPrompt((prev) => prev || true);
      }, 2500);
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) {
      // In case browser prompt is not ready, guide user
      setShowIosGuide(true);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowPrompt(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error("Installation prompt error:", err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    sessionStorage.setItem("belokiri_pwa_dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <>
      {/* FLOATING INSTALL RECOMMENDATION POPUP */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-white border-2 border-red-600 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Top Red Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-black" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="Tutup rekomendasi"
            className="absolute top-3 right-3 p-1.5 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            {/* App Icon */}
            <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-white p-1">
              <Image
                src="/icons/icon-192x192.png"
                alt="BELOKIRI App Icon"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-100 text-red-700">
                  <Smartphone className="w-2.5 h-2.5" />
                  Aplikasi Mobile
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">• Ringan & Cepat</span>
              </div>

              <h4 className="text-sm font-black text-black leading-tight">
                Pasang Aplikasi BELOKIRI
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                Baca naskah & esai lebih nyaman langsung dari layar utama HP Anda tanpa harus membuka browser.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install di HP Sekarang</span>
            </button>

            <button
              onClick={handleDismiss}
              className="py-2.5 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 text-xs font-bold transition-all cursor-pointer"
            >
              Nanti
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PANDUAN UNTUK IPHONE / IPAD / SAFARI ATAU MANUAL INSTALL */}
      {showIosGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative border border-zinc-200">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-white p-1">
              <Image
                src="/icons/icon-192x192.png"
                alt="BELOKIRI"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-black">
                Pasang di Layar Utama HP
              </h3>
              <p className="text-xs text-zinc-500">
                Ikuti langkah mudah ini untuk menambahkan BELOKIRI ke layar ponsel Anda:
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-4 text-left space-y-3 border border-zinc-200 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  Ketuk tombol <strong className="text-black">Bagikan (Share)</strong>{" "}
                  <Share2 className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" /> di bilah navigasi browser Anda.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  Gulir ke bawah dan pilih{" "}
                  <strong className="text-black">"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>{" "}
                  <PlusSquare className="w-3.5 h-3.5 inline text-zinc-800 mx-0.5" />.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  Ketuk <strong className="text-black">"Tambah" (Add)</strong> di pojok kanan atas. Selesai!
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
