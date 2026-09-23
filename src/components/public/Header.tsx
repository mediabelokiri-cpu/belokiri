"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, PenTool, UserCircle } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <header className="border-b border-stone-200 bg-white sticky top-0 z-40">
        {/* Top Info Bar (Desktop only) */}
        <div className="border-b border-stone-100 hidden md:block bg-stone-50/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span>{today}</span>
            <div className="flex items-center gap-4">
              <Link href="/tentang-kami" className="hover:text-stone-900 transition-colors">
                Tentang NALAR
              </Link>
              <Link href="/kontak" className="hover:text-stone-900 transition-colors">
                Redaksi & Kontak
              </Link>
              <span className="text-stone-300">|</span>
              <span className="italic text-stone-600">“Melihat lebih dari sekadar kabar”</span>
            </div>
          </div>
        </div>

        {/* Main Masthead Bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile hamburger & Search */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-stone-700 hover:bg-stone-100 md:hidden cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/cari"
              className="flex items-center gap-2 p-2 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              title="Cari Berita & Analisis"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline-block text-xs font-medium text-stone-500">
                Cari...
              </span>
            </Link>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center">
            <Link href="/" className="group flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black tracking-tighter text-stone-950 font-serif leading-none">
                NALAR
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-amber-700 mt-1">
                Konteks • Analisis • Perspektif
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 text-stone-800 text-xs font-semibold hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-sm"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Kirim Tulisan</span>
            </Link>

            <Link
              href="/login"
              className="p-2 rounded-full text-stone-700 hover:bg-stone-100 sm:hidden"
              aria-label="Masuk Akun"
            >
              <UserCircle className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Desktop Rubrik Navigation Bar */}
        <div className="border-t border-stone-200 bg-white shadow-xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center justify-between overflow-x-auto scrollbar-none py-2.5 text-xs font-bold uppercase tracking-wider text-stone-700">
              <Link
                href="/berita"
                className="hover:text-amber-800 transition-colors shrink-0 pr-4 border-r border-stone-200"
              >
                Terbaru
              </Link>
              {MOCK_RUBRIKS.map((rubrik) => (
                <Link
                  key={rubrik.slug}
                  href={`/kategori/${rubrik.slug}`}
                  className="hover:text-amber-800 transition-colors shrink-0 px-2.5 py-1 rounded hover:bg-stone-100/80"
                >
                  {rubrik.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-200">
                <div>
                  <span className="text-2xl font-black font-serif text-stone-950">
                    NALAR
                  </span>
                  <p className="text-[10px] text-stone-500 font-medium">
                    Melihat lebih dari sekadar kabar
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-stone-500 hover:bg-stone-100"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Rubrik List */}
              <div className="py-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                  Rubrik NALAR
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/berita"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-bold uppercase text-stone-800"
                  >
                    ⚡ Terkini
                  </Link>
                  {MOCK_RUBRIKS.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/kategori/${r.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-bold uppercase text-stone-800"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Info Pages */}
              <div className="pt-4 border-t border-stone-200 space-y-2 text-sm font-medium text-stone-600">
                <Link
                  href="/tentang-kami"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-stone-900"
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-stone-900"
                >
                  Kontak Redaksi
                </Link>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-stone-200">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-white text-xs font-bold tracking-wider uppercase hover:bg-stone-800 shadow"
              >
                <PenTool className="w-4 h-4" />
                <span>Masuk / Kirim Tulisan</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
