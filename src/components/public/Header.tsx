"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PenSquare, UserCircle, LogOut } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { logoutAction } from "@/actions/auth.actions";

interface SessionUserSummary {
  name: string;
  role: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<SessionUserSummary | null>(null);
  const pathname = usePathname();

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        authenticated?: boolean;
        user?: SessionUserSummary | null;
      };
      setAuthUser(data.authenticated && data.user ? data.user : null);
    } catch {
      // Keep current header auth state if network check fails transiently
    }
  }, []);

  useEffect(() => {
    checkSession();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    window.addEventListener("focus", checkSession);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", checkSession);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkSession, pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 shadow-sm bg-[#4c13ff]">
        {/* 1. Main Masthead Bar (Logo, Search, Kirim Tulisan) */}
        <div>
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Left: Mobile hamburger & Search Button */}
            <div className="flex items-center justify-start gap-1 sm:gap-2.5">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-1 rounded-xl text-white hover:bg-white/15 md:hidden cursor-pointer transition-colors"
                aria-label="Buka Menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <Link
                href="/cari"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-100 text-[#1f1f1f] shadow-sm transition-all transform active:scale-95 focus-visible:outline-3 focus-visible:outline-[#ffc22f] focus-visible:outline-offset-2 forced-colors:border forced-colors:border-[LinkText]"
              >
                <Search className="w-4 h-4 text-[#4c13ff] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-[#1f1f1f]">
                  Cari naskah & gagasan...
                </span>
              </Link>

              <Link
                href="/cari"
                className="p-2 rounded-xl text-white hover:bg-white/15 sm:hidden transition-colors"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {/* Center: Brand Masthead (Pasti Tepat di Tengah Layar HP & Desktop) */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <Link href="/" className="group flex flex-col items-center text-center">
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/logoheaderbakubaca.png"
                    alt="BAKUBACA"
                    width={240}
                    height={46}
                    priority
                    className="h-7 sm:h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-102"
                  />
                </div>
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] sm:tracking-[0.20em] uppercase font-black text-[#ffc22f] mt-1 sm:mt-1.5 text-center leading-none select-none group-hover:text-white transition-colors whitespace-nowrap">
                  Setiap Pikiran Punya Ruang.
                </span>
              </Link>
            </div>

            {/* Right: Avatar (Logged Out) or Logout (Logged In) */}
            <div className="flex items-center justify-end gap-1 sm:gap-2.5">
              {authUser ? (
                <form action={logoutAction}>
                  <button
                    type="submit"
                    aria-label={`Keluar dari akun ${authUser.name}`}
                    title={`Keluar (${authUser.name})`}
                    className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/15 transition-all transform active:scale-95 cursor-pointer focus-visible:outline-3 focus-visible:outline-[#ffc22f] focus-visible:outline-offset-2"
                  >
                    <LogOut className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  aria-label="Masuk Akun"
                  title="Masuk / Daftar Akun"
                  className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/15 transition-all transform active:scale-95 focus-visible:outline-3 focus-visible:outline-[#ffc22f] focus-visible:outline-offset-2"
                >
                  <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 2. Rubrik Navigation Bar */}
        <div className="bg-[#fbfaf8] border-t border-white/15 border-b border-zinc-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav
              aria-label="Navigasi Rubrik Bakubaca"
              className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-black uppercase tracking-wider"
            >
              <Link
                href="/berita"
                aria-current={pathname === "/berita" ? "page" : undefined}
                className={`py-2 px-2.5 sm:px-3 rounded-lg transition-all shrink-0 ${
                  pathname === "/berita"
                    ? "text-[#4c13ff] bg-[#f3efff] font-black"
                    : "text-[#1f1f1f] hover:text-[#4c13ff] hover:bg-[#f3efff]/60"
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
                    aria-current={isActive ? "page" : undefined}
                    className={`py-2 px-2.5 sm:px-3 rounded-lg transition-all shrink-0 ${
                      isActive
                        ? "text-[#4c13ff] bg-[#f3efff] font-black"
                        : "text-[#1f1f1f] hover:text-[#4c13ff] hover:bg-[#f3efff]/60"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#1f1f1f]/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/logourlbarbakubaca.png"
                    alt="BAKUBACA"
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                  <span className="text-base font-black tracking-tight text-[#1f1f1f] uppercase">
                    BAKUBACA
                  </span>
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
                <p className="text-[11px] font-black uppercase tracking-wider text-[#4c13ff] mb-3">
                  5 Rubrik Bakubaca
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/berita"
                    aria-current={pathname === "/berita" ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-lg border text-xs font-black uppercase transition-colors ${
                      pathname === "/berita"
                        ? "bg-[#f3efff] border-[#4c13ff] text-[#4c13ff]"
                        : "bg-zinc-100 border-transparent hover:bg-zinc-200 text-[#1f1f1f]"
                    }`}
                  >
                    ⚡ TERKINI
                  </Link>
                  {MOCK_RUBRIKS.map((r) => {
                    const isActive = pathname === `/kategori/${r.slug}`;
                    return (
                      <Link
                        key={r.slug}
                        href={`/kategori/${r.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-3 rounded-lg border text-xs font-black uppercase transition-colors ${
                          isActive
                            ? "bg-[#f3efff] border-[#4c13ff] text-[#4c13ff]"
                            : "bg-zinc-100 border-transparent hover:bg-zinc-200 text-[#1f1f1f] hover:text-[#4c13ff]"
                        }`}
                      >
                        {r.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Static Links */}
              <div className="pt-4 border-t border-zinc-200 space-y-2 text-xs font-bold text-zinc-700">
                <Link
                  href="/manifesto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-[#4c13ff]"
                >
                  Manifesto BAKUBACA
                </Link>
                <Link
                  href="/kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-[#4c13ff]"
                >
                  Redaksi & Kontak
                </Link>
                <Link
                  href="/donasi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#4c13ff] font-black hover:underline"
                >
                  Patungan Warga (Donasi) 💖
                </Link>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 border-t border-zinc-200">
              <Link
                href="/kirim-tulisan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#4c13ff] hover:bg-[#3d0dd9] text-white text-xs font-black tracking-wider uppercase shadow"
              >
                <PenSquare className="w-4 h-4" />
                <span>Panduan & Kirim Tulisan</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
