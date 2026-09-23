import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-3">
        Halaman yang kamu cari tidak ditemukan.
      </h2>
      <p className="text-muted-foreground max-w-md mb-8 text-sm">
        Tautan mungkin rusak, artikel telah dipindahkan, atau alamat URL yang
        kamu tuju salah.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
