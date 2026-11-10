"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  FolderTree,
  Users,
  History,
  PenTool,
  Sliders,
  Mail,
  ShieldCheck,
  ChevronRight,
  UserCog,
  UserPlus,
  Compass,
} from "lucide-react";

interface AdminNavProps {
  reviewCount?: number;
}

export default function AdminNav({ reviewCount = 0 }: AdminNavProps) {
  const pathname = usePathname();

  const links = [
    {
      name: "Ringkasan",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Tulis Artikel",
      href: "/admin/articles/buat",
      icon: PenTool,
      active: pathname === "/admin/articles/buat",
    },
    {
      name: "Antrean Review",
      href: "/admin/review",
      icon: Inbox,
      active: pathname.startsWith("/admin/review") || pathname.includes("/review"),
      badge: reviewCount > 0 ? reviewCount : undefined,
    },
    {
      name: "Semua Artikel",
      href: "/admin/articles",
      icon: FileText,
      active:
        pathname === "/admin/articles" ||
        (pathname.startsWith("/admin/articles") &&
          !pathname.includes("/review") &&
          !pathname.includes("/buat") &&
          !pathname.includes("/edit")),
    },
    {
      name: "5 Rubrik",
      href: "/admin/categories",
      icon: FolderTree,
      active: pathname === "/admin/categories",
    },
    {
      name: "Daftar Warga",
      href: "/admin/users",
      icon: Users,
      active: pathname === "/admin/users",
    },
    {
      name: "Pendaftaran Redaksi",
      href: "/admin/rekrutmen",
      icon: UserPlus,
      active: pathname.startsWith("/admin/rekrutmen"),
    },
    {
      name: "Kelola Halaman",
      href: "/admin/pages",
      icon: Compass,
      active: pathname.startsWith("/admin/pages"),
    },
    {
      name: "Kelola Website",
      href: "/admin/settings",
      icon: Sliders,
      active: pathname === "/admin/settings",
    },
    {
      name: "Surat Kaleng",
      href: "/admin/surat-kaleng",
      icon: Mail,
      active: pathname === "/admin/surat-kaleng",
    },
    {
      name: "Profil Admin",
      href: "/admin/profil",
      icon: UserCog,
      active: pathname === "/admin/profil",
    },
    {
      name: "Log Aktivitas",
      href: "/admin/activity",
      icon: History,
      active: pathname === "/admin/activity",
    },
  ];

  return (
    <nav className="bg-white border border-zinc-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 sticky top-20">
      {/* Sidebar Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4c13ff] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Navigasi Redaksi
          </span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
          CMS BAKUBACA
        </span>
      </div>

      {/* Menu Tabs */}
      <div className="flex flex-col space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.active;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer group ${
                isActive
                  ? "bg-[#4c13ff] text-white shadow-md ring-1 ring-[#3d0dd9]"
                  : "bg-[#4c13ff]/5 text-[#1f1f1f] hover:bg-[#4c13ff] hover:text-white border border-[#4c13ff]/15 hover:border-[#4c13ff] shadow-2xs"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-[#ffc22f]"
                      : "text-[#4c13ff] group-hover:text-[#ffc22f]"
                  }`}
                />
                <span className="truncate">{link.name}</span>
              </div>

              {link.badge !== undefined ? (
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#ffc22f] text-[#1f1f1f]"
                      : "bg-[#4c13ff] text-white group-hover:bg-[#ffc22f] group-hover:text-[#1f1f1f]"
                  }`}
                >
                  {link.badge}
                </span>
              ) : (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? "opacity-100 text-[#ffc22f]" : "text-white"
                  }`}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Sidebar Footer info */}
      <div className="pt-3 border-t border-zinc-100 text-center">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          Redaksi BAKUBACA V2.0 • Online
        </p>
      </div>
    </nav>
  );
}
