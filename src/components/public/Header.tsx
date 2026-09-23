"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PenSquare, UserCircle } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 shadow-xs bg-white border-b border-zinc-200">
        {/* 1. Main Masthead Bar (Logo, Search, Kirim Tulisan) */}
        <div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
            {/* Left: Mobile hamburger & Search Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg text-zinc-800 hover:bg-zinc-100 md:hidden cursor-pointer transition-colors"
                aria-label="Buka Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                href="/cari"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 text-zinc-700 transition-colors"
              >
                <Search className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-semibold text-zinc-600">
                  Cari berita & analisis...
                </span>
              </Link>

              <Link
                href="/cari"
                className="p-2 rounded-lg text-zinc-800 hover:bg-zinc-100 sm:hidden transition-colors"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {/* Center: Brand Masthead */}
            <div className="flex flex-col items-center">
              <Link href="/" className="group flex flex-col items-center">
                <div className="relative">
                  <Image
                    src="/images/logo-belokiri-red.png"
                    alt="BELOKIRI"
                    width={240}
                    height={46}
                    priority
                    className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-102"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-black text-zinc-600 mt-1.5 group-hover:text-red-600 transition-colors">
                  Liar Seperlunya, Jenaka Secukupnya
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all transform active:scale-95"
              >
                <PenSquare className="w-4 h-4 text-white" />
                <span>Kirim Tulisan</span>
              </Link>

              <Link
                href="/login"
                className="p-2 rounded-lg text-zinc-800 hover:text-red-600 hover:bg-zinc-100 sm:hidden transition-colors"
                aria-label="Masuk Akun"
              >
                <UserCircle className="w-6 h-6 text-zinc-700" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Rubrik Navigation Bar (White Background, Red Menu Text) */}
        <div className="bg-white border-t border-zinc-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-black uppercase tracking-wider">
              <Link
                href="/berita"
                className={`py-2 px-2 sm:px-3 border-b-2 transition-all shrink-0 rounded-t-sm ${
                  pathname === "/berita"
                    ? "border-red-600 text-red-700 bg-red-50/80 font-black"
                    : "border-transparent text-red-600 hover:text-red-700 hover:bg-red-50/50"
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
                    className={`py-2 px-2 sm:px-3 border-b-2 transition-all shrink-0 rounded-t-sm ${
                      isActive
                        ? "border-red-600 text-red-700 bg-red-50/80 font-black"
                        : "border-transparent text-red-600 hover:text-red-700 hover:bg-red-50/50"
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
                <div className="flex items-center">
                  <Image
                    src="/images/logo-belokiri-red.png"
                    alt="BELOKIRI"
                    width={140}
                    height={27}
                    className="h-7 w-auto object-contain"
                  />
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
                  Tentang BELOKIRI
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
