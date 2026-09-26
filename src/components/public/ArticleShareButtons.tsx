"use client";

import { useState, useEffect } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface ArticleShareButtonsProps {
  title: string;
  slug: string;
  url?: string;
  compact?: boolean;
}

export default function ArticleShareButtons({
  title,
  slug,
  url,
  compact = false,
}: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(() => {
    const raw = url || `https://www.belokiri.site/artikel/${slug}`;
    return raw.replace("belokiri.id", "belokiri.site");
  });

  // Dynamically sync with actual current browser URL if on client
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href) {
      setShareUrl(window.location.href.replace("belokiri.id", "belokiri.site"));
    }
  }, [slug]);

  const handleCopyLink = async () => {
    const urlToCopy =
      typeof window !== "undefined" && window.location.href
        ? window.location.href.replace("belokiri.id", "belokiri.site")
        : shareUrl;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = urlToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin tautan:", err);
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const btnSize = compact ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl";
  const iconSize = compact ? "w-3.5 h-3.5" : "w-4 h-4";

  // Native Web Share Trigger (Android / iOS)
  const triggerNativeShare = async (): Promise<boolean> => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: shareUrl,
        });
        return true;
      } catch (err: any) {
        if (err.name === "AbortError") {
          return true; // User intentionally dismissed the share dialog
        }
        return false;
      }
    }
    return false;
  };

  // Smart Facebook Share: Web Share API on Mobile, Popup on Desktop
  const handleFacebookShare = async (e: React.MouseEvent) => {
    const isMobile =
      typeof navigator !== "undefined" &&
      (/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      ) ||
        (typeof window !== "undefined" && window.innerWidth < 768));

    if (isMobile) {
      const handled = await triggerNativeShare();
      if (handled) {
        e.preventDefault();
        return;
      }
    }

    // Desktop or mobile fallback when native share isn't supported
    e.preventDefault();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const w = 626;
    const h = 436;
    const left =
      typeof window !== "undefined"
        ? window.screenX + (window.outerWidth - w) / 2
        : 100;
    const top =
      typeof window !== "undefined"
        ? window.screenY + (window.outerHeight - h) / 2
        : 100;
    window.open(
      fbUrl,
      "facebook-share-dialog",
      `width=${w},height=${h},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no`
    );
  };

  // Desktop popup helper for Twitter / X
  const handleTwitterShare = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      e.preventDefault();
      const twUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      const w = 600;
      const h = 400;
      const left = window.screenX + (window.outerWidth - w) / 2;
      const top = window.screenY + (window.outerHeight - h) / 2;
      window.open(
        twUrl,
        "twitter-share-dialog",
        `width=${w},height=${h},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no`
      );
    }
  };

  return (
    <div className="flex items-center gap-1.5 relative">
      <button
        type="button"
        onClick={async () => {
          const shared = await triggerNativeShare();
          if (!shared) {
            handleCopyLink();
          }
        }}
        className="text-xs text-zinc-500 hover:text-red-600 transition-colors font-black uppercase tracking-wider flex items-center gap-1.5 mr-1 cursor-pointer group"
        title="Bagikan Naskah"
        aria-label="Bagikan Naskah"
      >
        <Share2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 transition-colors" />
        <span className="hidden sm:inline">Bagikan:</span>
      </button>

      {/* 1. WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnSize} flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 shadow-2xs hover:scale-105 active:scale-95 transition-all duration-150 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]`}
        title="Bagikan ke WhatsApp"
        aria-label="Bagikan ke WhatsApp"
      >
        <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c.969.54 1.802.835 2.806.835 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.77-5.767-5.77zm3.377 8.21c-.14.393-.815.753-1.127.797-.301.042-.693.061-2.227-.584-1.834-.772-2.998-2.645-3.089-2.766-.091-.122-.738-.982-.738-1.873 0-.89.467-1.328.633-1.506.166-.179.363-.223.484-.223.12 0 .241.002.348.006.113.006.262-.043.411.314.15.357.514 1.25.56 1.341.045.091.076.198.016.319-.061.12-.091.196-.182.302-.091.107-.191.238-.273.32-.091.09-.187.189-.08.373.106.184.471.776 1.01 1.257.694.619 1.28.811 1.463.902.183.091.29.076.397-.046.106-.121.456-.531.578-.713.121-.182.242-.152.408-.091.166.061 1.058.499 1.24.59.182.091.303.136.348.213.045.076.045.441-.095.834zM12 2C6.477 2 2 6.477 2 12c0 1.892.528 3.662 1.445 5.176L2 22l4.966-1.397A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      </a>

      {/* 2. Facebook (Native Share Sheet on Mobile, Popup on Desktop) */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleFacebookShare}
        className={`${btnSize} flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 shadow-2xs hover:scale-105 active:scale-95 transition-all duration-150 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
        title="Bagikan ke Facebook"
        aria-label="Bagikan ke Facebook"
      >
        <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* 3. X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTwitterShare}
        className={`${btnSize} flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 shadow-2xs hover:scale-105 active:scale-95 transition-all duration-150 hover:bg-black hover:text-white hover:border-black`}
        title="Bagikan ke X (Twitter)"
        aria-label="Bagikan ke X (Twitter)"
      >
        <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* 4. Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnSize} flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 shadow-2xs hover:scale-105 active:scale-95 transition-all duration-150 hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]`}
        title="Bagikan ke Telegram"
        aria-label="Bagikan ke Telegram"
      >
        <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
        </svg>
      </a>

      {/* 5. Salin Tautan (Copy URL) */}
      <button
        type="button"
        onClick={handleCopyLink}
        className={`${btnSize} flex items-center justify-center border shadow-2xs hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer ${
          copied
            ? "border-emerald-500 bg-emerald-50 text-emerald-600 ring-2 ring-emerald-500/20"
            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
        }`}
        title={copied ? "Tautan tersalin!" : "Salin tautan artikel"}
        aria-label="Salin tautan artikel"
      >
        {copied ? (
          <Check className={`${iconSize} stroke-[2.5] text-emerald-600`} />
        ) : (
          <Link2 className={`${iconSize} stroke-[2.2]`} />
        )}
      </button>

      {/* Floating Copied Toast Alert */}
      {copied && (
        <div className="absolute -top-10 right-0 z-30 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2 flex items-center gap-1.5 whitespace-nowrap border border-zinc-800">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
          <span>Tautan berhasil disalin!</span>
        </div>
      )}
    </div>
  );
}
