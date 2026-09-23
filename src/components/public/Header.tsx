"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PenSquare, UserCircle, Flame } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <header className="sticky top-0 z-40 shadow-md">
        {/* 1. Top Info Bar (Deep Dark Red / High Contrast) */}
        <div className="border-b border-red-700/80 bg-red-800 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white text-red-700 font-black text-[10px] uppercase tracking-wider shadow-xs">
                <Flame className="w-3 h-3 fill-current text-red-600" />
                <span>Aktual</span>
              </span>
              <span className="text-white/90 font-medium hidden sm:inline-block text-[11px]">
                {today}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-white/90">
              <Link href="/tentang-kami" className="hover:text-white transition-colors">
                Tentang Kami
              </Link>
              <span className="text-red-600">|</span>
              <Link href="/kontak" className="hover:text-white transition-colors">
                Kontak Redaksi
              </Link>
              <span className="text-red-600 hidden md:inline-block">|</span>
              <span className="hidden md:inline-block text-white/80 font-normal italic">
                “Melihat lebih dari sekadar kabar”
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Masthead Bar (Bold Red Box: bg-red-600) */}
        <div className="bg-red-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
            {/* Left: Mobile hamburger & Search Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg text-white hover:bg-red-700 md:hidden cursor-pointer transition-colors"
                aria-label="Buka Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                href="/cari"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-700/70 hover:bg-red-700 border border-red-500/60 text-white transition-colors"
              >
                <Search className="w-4 h-4 text-white/80" />
                <span className="text-xs font-semibold text-white/90">
                  Cari berita & analisis...
                </span>
              </Link>

              <Link
                href="/cari"
                className="p-2 rounded-lg text-white hover:bg-red-700 sm:hidden transition-colors"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {/* Center: Brand Masthead (Crisp White on Red) */}
            <div className="flex flex-col items-center">
              <Link href="/" className="group flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase drop-shadow-xs">
                    NALAR
                  </span>
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-white mt-2 sm:mt-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-bold text-white/95 -mt-1 group-hover:text-white transition-colors">
                  Melihat Lebih dari Sekadar Kabar
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-zinc-100 text-red-600 text-xs font-black uppercase tracking-wider shadow-md transition-all transform active:scale-95"
              >
                <PenSquare className="w-4 h-4 text-red-600" />
                <span>Kirim Tulisan</span>
              </Link>

              <Link
                href="/login"
                className="p-2 rounded-lg text-white hover:bg-red-700 sm:hidden transition-colors"
                aria-label="Masuk Akun"
              >
                <UserCircle className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Rubrik Navigation Bar (Clean contrast under Red masthead) */}
        <div className="border-t border-b border-zinc-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center justify-between overflow-x-auto scrollbar-none py-2 text-xs font-black uppercase tracking-wider text-black">
              <Link
                href="/berita"
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  pathname === "/berita"
                    ? "border-red-600 text-red-600 bg-red-50/60"
                    : "border-transparent hover:border-red-600 hover:text-red-600"
                }`}
              >
                ⚡ TERKINI
              </Link>
              {MOCK_RUBRIKS.map((rubrik) => {
                const isActive = pathname === `/kategori/${rubrik.slug}`;
                return (
                  <Link
                    key={rubrik.slug}
                    href={`/kategori/${rubrik.slug}`}
                    className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                      isActive
                        ? "border-red-600 text-red-600 bg-red-50/60"
                        : "border-transparent hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    {rubrik.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Clean White, Red Accents, Black Typography) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-red-600 tracking-tight">
                    NALAR
                  </span>
                  <span className="w-2 h-2 rounded-full bg-black" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 cursor-pointer"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Rubrik Grid */}
              <div className="py-6">
                <p className="text-[11px] font-black uppercase tracking-wider text-red-600 mb-3">
                  8 Rubrik Karakter
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/berita"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-xs font-black uppercase text-black"
                  >
                    ⚡ TERKINI
                  </Link>
                  {MOCK_RUBRIKS.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/kategori/${r.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-xs font-black uppercase text-black hover:text-red-600 transition-colors"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Static Links */}
              <div className="pt-4 border-t border-zinc-200 space-y-2 text-xs font-bold text-zinc-700">
                <Link
                  href="/tentang-kami"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600"
                >
                  Tentang NALAR
                </Link>
                <Link
                  href="/kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600"
                >
                  Redaksi & Kontak
                </Link>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 border-t border-zinc-200">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-wider uppercase shadow"
              >
                <PenSquare className="w-4 h-4" />
                <span>Masuk & Tulis Artikel</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
