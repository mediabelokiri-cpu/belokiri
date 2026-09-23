"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to server-side telemetry/console without exposing details to user
    console.error("Runtime server error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Terjadi kesalahan pada server.
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-sm">
        Sistem kami sedang mengalami kendala sesaat. Coba lagi beberapa saat
        atau kembali ke beranda.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card font-medium hover:bg-accent text-sm transition-colors cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          Coba Lagi
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 text-sm transition-opacity"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
