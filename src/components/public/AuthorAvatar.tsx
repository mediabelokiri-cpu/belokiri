"use client";

import { useState } from "react";
import Image from "next/image";

interface AuthorAvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

export default function AuthorAvatar({
  src,
  alt,
  size = "md",
  className = "",
  priority = false,
}: AuthorAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Compute initials from author name (e.g. "Bara Api" -> "BA")
  const initials = (alt || "BK")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-xs",
    lg: "w-16 h-16 text-sm",
    xl: "w-24 h-24 sm:w-28 sm:h-28 text-xl",
  };

  const pixelSizes = {
    sm: "32px",
    md: "44px",
    lg: "64px",
    xl: "112px",
  };

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center font-black tracking-wider text-white bg-zinc-900 rounded-full select-none shrink-0 ${sizeClasses[size]} ${className}`}
        title={alt}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-zinc-200 shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={pixelSizes[size]}
        priority={priority}
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
