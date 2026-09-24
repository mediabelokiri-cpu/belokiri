"use client";

import { useState } from "react";
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

  const articleUrl =
    url ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/artikel/${slug}`
      : `https://www.belokiri.site/artikel/${slug}`);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(articleUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = articleUrl;
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
  const encodedUrl = encodeURIComponent(articleUrl);

  const shareLinks = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`,
      className:
        "hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
      title: "Bagikan ke WhatsApp",
    },
    {
      name: "𝕏 Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      className: "hover:bg-black hover:text-white hover:border-black",
      title: "Bagikan ke 𝕏 (Twitter)",
    },
  ];

  return (
    <div className="flex items-center gap-2 relative">
      <span className="text-xs text-zinc-500 font-black uppercase tracking-wider flex items-center gap-1.5 mr-0.5">
        <Share2 className="w-3.5 h-3.5 text-zinc-400" />
        <span>Bagikan:</span>
      </span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-800 transition-all text-xs font-black uppercase tracking-wider shadow-2xs cursor-pointer ${link.className}`}
          title={link.title}
        >
          {link.name}
        </a>
      ))}

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-black uppercase tracking-wider shadow-2xs cursor-pointer ${
          copied
            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
            : "border-zinc-200 bg-white text-zinc-800 hover:border-black hover:bg-zinc-50"
        }`}
        title="Salin tautan artikel"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Salin</span>
          </>
        )}
      </button>

      {/* Floating Copied Toast Alert */}
      {copied && (
        <div className="absolute -top-10 right-0 z-20 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2 flex items-center gap-1.5 whitespace-nowrap">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tautan berhasil disalin ke papan klip!</span>
        </div>
      )}
    </div>
  );
}
