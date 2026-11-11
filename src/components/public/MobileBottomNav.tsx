"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { defaultSiteSettings } from "@/lib/data/site-settings";

function NavHomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[19px] h-[19px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10.2 12 3.5l8.5 6.7V19a1.8 1.8 0 0 1-1.8 1.8H5.3A1.8 1.8 0 0 1 3.5 19v-8.8Z" />
      <path d="M9.5 20.8v-5.3a2.5 2.5 0 0 1 5 0v5.3" />
    </svg>
  );
}

function NavTrendingFlameIcon({
  className = "w-[19px] h-[19px] shrink-0",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.4 2.8c.2 3.1 5.2 5.4 5.2 11.2a5.6 5.6 0 0 1-11.2 0c0-2.5 1.1-4.5 2.3-5.8.15 1.45 1 2.35 1.95 2.35-.25-2.7.45-5.6 1.75-7.75Z" />
      <path d="M12 17.2a2.1 2.1 0 0 0 2.1-2.1c0-1.1-.75-1.9-1.6-2.55-.35.8-.95 1.25-1.45 1.25-.55 0-1.15.55-1.15 1.3A2.1 2.1 0 0 0 12 17.2Z" />
    </svg>
  );
}

function NavWriteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[19px] h-[19px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.5 4.5H6.2A2.7 2.7 0 0 0 3.5 7.2v10.6a2.7 2.7 0 0 0 2.7 2.7h10.6a2.7 2.7 0 0 0 2.7-2.7v-6.3" />
      <path d="M18.3 3.7a2 2 0 0 1 2.8 2.8L12.3 15.3l-3.7.9.9-3.7 8.8-8.8Z" />
    </svg>
  );
}

function NavPatunganIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[19px] h-[19px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.2s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.8c0 5.4-7.5 10-7.5 10Z" />
      <path d="M8.3 9a2 2 0 0 0-1.2 1.6" />
    </svg>
  );
}

function NavBentoMenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[18px] h-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7.4" height="7.4" rx="2.3" />
      <path d="M13.6 9.3V5.3A2.3 2.3 0 0 1 15.9 3h2.8A2.3 2.3 0 0 1 21 5.3v2.8a2.3 2.3 0 0 1-2.3 2.3h-1.2" />
      <path d="M6.5 13.6H5.3A2.3 2.3 0 0 0 3 15.9v2.8A2.3 2.3 0 0 0 5.3 21h2.8a2.3 2.3 0 0 0 2.3-2.3v-4" />
      <rect x="13.6" y="13.6" width="7.4" height="7.4" rx="2.3" />
    </svg>
  );
}

const BOTTOM_LINKS = [
  {
    href: "/",
    label: "Beranda",
    Icon: NavHomeIcon,
  },
  {
    href: "/trending",
    label: "Trending",
    Icon: NavTrendingFlameIcon,
  },
  {
    href: "/kirim-tulisan",
    label: "Kirim",
    Icon: NavWriteIcon,
  },
  {
    href: "/donasi",
    label: "Patungan",
    Icon: NavPatunganIcon,
  },
] as const;

const MENU_DIRECTORY_PREFIXES = [
  "/berita",
  "/kategori",
  "/cari",
  "/manifesto",
  "/tentang-kami",
  "/kabinet-belokiri",
  "/literatur-liberte",
  "/konstitusi",
  "/kontak",
  "/rekrutmen",
  "/pedoman-media-siber",
  "/disclaimer",
  "/kebijakan-privasi",
  "/syarat-ketentuan",
] as const;

const PARTISIPASI_LINKS = [
  { href: "/kirim-tulisan", label: "Kirim Tulisan", desc: "Kirim esai & gagasanmu" },
  { href: "/donasi", label: "Patungan Warga", desc: "Dukung media independen" },
  { href: "/#surat-kaleng", label: "Surat Kaleng Warga", desc: "Suara bebas dari warga" },
  { href: "/rekrutmen", label: "Rekrutmen Redaksi", desc: "Bergabung jadi kontributor" },
] as const;

const EDITORIAL_LINKS = [
  { href: "/tentang-kami", label: "Tentang Bakubaca" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/kabinet-belokiri", label: "Kabinet Redaksi" },
  { href: "/literatur-liberte", label: "Literatur Liberte" },
  { href: "/konstitusi", label: "Konstitusi Bakubaca" },
  { href: "/kontak", label: "Redaksi & Kontak" },
] as const;

const LEGAL_LINKS = [
  { href: "/pedoman-media-siber", label: "Pedoman Media Siber" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
] as const;

function isMenuDirectoryPath(pathname: string): boolean {
  return MENU_DIRECTORY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function MobileBottomNav({
  copyrightText,
}: {
  copyrightText?: string;
}) {
  const pathname = usePathname();
  const displayCopyright =
    copyrightText || defaultSiteSettings.identity.copyrightText;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setPendingHref(null);
  }

  useEffect(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [pathname]);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
    setMenuOpen(false);
  };

  const handleToggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleLinkTap = (href: string) => {
    const targetPath = href.split("#")[0] || "/";
    if (menuOpen) {
      closeMenu();
    }
    if (targetPath !== pathname) {
      setPendingHref(targetPath);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const clickedOutsideSheet =
      e.clientY < rect.top ||
      e.clientY > rect.bottom ||
      e.clientX < rect.left ||
      e.clientX > rect.right;
    if (clickedOutsideSheet) {
      closeMenu();
    }
  };

  const menuIsActive =
    menuOpen || (!pendingHref && isMenuDirectoryPath(pathname));

  return (
    <>
      <nav
        aria-label="Menu Cepat Bawah"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/85 shadow-[0_-4px_24px_-8px_rgba(31,31,31,0.08)] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]"
      >
        <ul className="grid grid-cols-5 items-center max-w-lg mx-auto px-2 pt-1.5">
          {BOTTOM_LINKS.map((item) => {
            const Icon = item.Icon;
            const isActive =
              !menuOpen &&
              (pendingHref ? pendingHref === item.href : pathname === item.href);

            return (
              <li key={item.href} className="flex justify-center">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => handleLinkTap(item.href)}
                  className="group w-full min-h-[50px] py-0.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl focus-visible:outline-none"
                >
                  <span
                    className={`inline-flex items-center justify-center w-13 h-7.5 rounded-full transition-all duration-150 group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-[#4c13ff] group-focus-visible:ring-offset-1 ${
                      isActive
                        ? "bg-[#4c13ff] text-white shadow-[0_3px_10px_-3px_rgba(76,19,255,0.55)] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
                        : "bg-transparent text-zinc-600 group-hover:bg-zinc-100 group-hover:text-[#1f1f1f] group-active:bg-[#4c13ff] group-active:text-white"
                    }`}
                  >
                    <Icon />
                  </span>
                  <span
                    className={`text-[11px] leading-none tracking-[-0.01em] text-center transition-colors ${
                      isActive
                        ? "font-extrabold text-[#4c13ff]"
                        : "font-semibold text-zinc-600 group-hover:text-[#1f1f1f] group-active:text-[#4c13ff]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Menu Halaman Trigger */}
          <li className="flex justify-center">
            <button
              type="button"
              onClick={handleToggleMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-pages-menu"
              className="group w-full min-h-[50px] py-0.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl cursor-pointer focus-visible:outline-none"
            >
              <span
                className={`inline-flex items-center justify-center w-13 h-7.5 rounded-full transition-all duration-150 group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-[#4c13ff] group-focus-visible:ring-offset-1 ${
                  menuIsActive
                    ? "bg-[#4c13ff] text-white shadow-[0_3px_10px_-3px_rgba(76,19,255,0.55)] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]"
                    : "bg-transparent text-zinc-600 group-hover:bg-zinc-100 group-hover:text-[#1f1f1f] group-active:bg-[#4c13ff] group-active:text-white"
                }`}
              >
                <NavBentoMenuIcon />
              </span>
              <span
                className={`text-[11px] leading-none tracking-[-0.01em] text-center transition-colors ${
                  menuIsActive
                    ? "font-extrabold text-[#4c13ff]"
                    : "font-semibold text-zinc-600 group-hover:text-[#1f1f1f] group-active:text-[#4c13ff]"
                }`}
              >
                Menu
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom Sheet Menu Halaman */}
      <dialog
        ref={dialogRef}
        id="mobile-pages-menu"
        aria-labelledby="mobile-pages-menu-title"
        onClose={() => setMenuOpen(false)}
        onClick={handleBackdropClick}
        className="md:hidden fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none max-h-[82dvh] rounded-t-3xl bg-white text-[#1f1f1f] border-t border-zinc-200 p-0 overflow-hidden shadow-[0_-12px_40px_-8px_rgba(15,15,20,0.22)] backdrop:bg-[#1f1f1f]/60 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex flex-col max-h-[82dvh]">
          {/* Drag Indicator & Sheet Header */}
          <div className="pt-2.5 px-5 pb-3.5 border-b border-zinc-100 bg-white shrink-0">
            <div
              className="w-10 h-1 rounded-full bg-zinc-300 mx-auto mb-3"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Image
                  src="/images/logourlbarbakubaca.png"
                  alt="BAKUBACA"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <h2
                    id="mobile-pages-menu-title"
                    className="text-sm font-black tracking-tight text-[#1f1f1f] uppercase leading-tight"
                  >
                    Menu Halaman
                  </h2>
                  <p className="text-[11px] text-zinc-500 font-medium truncate">
                    Semua kanal, rubrik &amp; arsip Bakubaca
                  </p>
                </div>
              </div>

              <button
                type="button"
                autoFocus
                onClick={closeMenu}
                aria-label="Tutup Menu Halaman"
                className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 inline-flex items-center justify-center shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#4c13ff]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Directory Body */}
          <div className="overflow-y-auto overscroll-contain px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] space-y-6">
            {/* Search Shortcut */}
            <Link
              href="/cari"
              aria-current={pathname === "/cari" ? "page" : undefined}
              onClick={() => handleLinkTap("/cari")}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition-colors ${
                pathname === "/cari"
                  ? "bg-[#f3efff] border-[#4c13ff] text-[#4c13ff]"
                  : "bg-[#fbfaf8] border-zinc-200 hover:border-[#4c13ff]/50 text-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2.5 text-xs font-bold">
                <Search
                  className="w-4 h-4 text-[#4c13ff] shrink-0"
                  aria-hidden="true"
                />
                <span>Cari naskah, penulis, atau gagasan...</span>
              </span>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60" aria-hidden="true" />
            </Link>

            {/* Kanal & Rubrik */}
            <section aria-labelledby="menu-section-kanal" className="space-y-2.5">
              <h3
                id="menu-section-kanal"
                className="text-[11px] font-black uppercase tracking-wider text-zinc-500"
              >
                Kanal &amp; Rubrik
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => handleLinkTap("/")}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors ${
                    pathname === "/"
                      ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                      : "bg-[#fbfaf8] border-zinc-200/80 text-[#1f1f1f] hover:border-[#4c13ff]/50"
                  }`}
                >
                  <span>Beranda</span>
                </Link>
                <Link
                  href="/trending"
                  aria-current={pathname === "/trending" ? "page" : undefined}
                  onClick={() => handleLinkTap("/trending")}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    pathname === "/trending"
                      ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                      : "bg-[#fbfaf8] border-zinc-200/80 text-[#1f1f1f] hover:border-[#4c13ff]/50"
                  }`}
                >
                  <NavTrendingFlameIcon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      pathname === "/trending" ? "text-white" : "text-[#4c13ff]"
                    }`}
                  />
                  <span>Sedang Trending</span>
                </Link>
                <Link
                  href="/berita"
                  aria-current={pathname === "/berita" ? "page" : undefined}
                  onClick={() => handleLinkTap("/berita")}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
                    pathname === "/berita"
                      ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                      : "bg-[#fbfaf8] border-zinc-200/80 text-[#1f1f1f] hover:border-[#4c13ff]/50"
                  }`}
                >
                  Tulisan Terkini
                </Link>
                {MOCK_RUBRIKS.map((r) => {
                  const href = `/kategori/${r.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={r.slug}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => handleLinkTap(href)}
                      className={`px-3.5 py-2.5 rounded-xl border transition-colors ${
                        active
                          ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                          : "bg-[#fbfaf8] border-zinc-200/80 text-[#1f1f1f] hover:border-[#4c13ff]/50"
                      }`}
                    >
                      <span className="block text-xs font-black uppercase tracking-wide leading-tight">
                        {r.name}
                      </span>
                      <span
                        className={`block text-[10px] font-medium truncate mt-0.5 ${
                          active ? "text-white/80" : "text-zinc-500"
                        }`}
                      >
                        {r.question}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Partisipasi Warga */}
            <section
              aria-labelledby="menu-section-partisipasi"
              className="space-y-2.5"
            >
              <h3
                id="menu-section-partisipasi"
                className="text-[11px] font-black uppercase tracking-wider text-zinc-500"
              >
                Partisipasi &amp; Gerakan
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {PARTISIPASI_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => handleLinkTap(item.href)}
                      className={`px-3.5 py-2.5 rounded-xl border transition-colors ${
                        active
                          ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                          : "bg-white border-zinc-200 text-[#1f1f1f] hover:border-[#4c13ff]/50"
                      }`}
                    >
                      <span className="block text-xs font-bold leading-tight">
                        {item.label}
                      </span>
                      <span
                        className={`block text-[10px] mt-0.5 ${
                          active ? "text-white/80" : "text-zinc-500"
                        }`}
                      >
                        {item.desc}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Editorial & Profil */}
            <section
              aria-labelledby="menu-section-redaksi"
              className="space-y-2.5"
            >
              <h3
                id="menu-section-redaksi"
                className="text-[11px] font-black uppercase tracking-wider text-zinc-500"
              >
                Redaksi &amp; Profil
              </h3>
              <ul className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200/80 bg-white overflow-hidden">
                {EDITORIAL_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => handleLinkTap(item.href)}
                        className={`flex items-center justify-between px-4 py-3 text-xs font-bold transition-colors ${
                          active
                            ? "bg-[#f3efff] text-[#4c13ff]"
                            : "text-[#1f1f1f] hover:bg-zinc-50"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Kebijakan & Legal */}
            <section
              aria-labelledby="menu-section-legal"
              className="pt-2 border-t border-zinc-100"
            >
              <h3
                id="menu-section-legal"
                className="text-[11px] font-black uppercase tracking-wider text-zinc-500 mb-2"
              >
                Pedoman &amp; Kebijakan
              </h3>
              <div className="flex flex-wrap gap-2">
                {LEGAL_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => handleLinkTap(item.href)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                        active
                          ? "bg-[#4c13ff] border-[#4c13ff] text-white"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-[#4c13ff] hover:text-[#4c13ff]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Copyright */}
            <div className="pt-4 border-t border-zinc-100 text-center">
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                {displayCopyright}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
