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
      name: "8 Rubrik",
      href: "/admin/categories",
      icon: FolderTree,
      active: pathname === "/admin/categories",
    },
    {
      name: "Warga Belokan",
      href: "/admin/users",
      icon: Users,
      active: pathname === "/admin/users",
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
      name: "Log Aktivitas",
      href: "/admin/activity",
      icon: History,
      active: pathname === "/admin/activity",
    },
  ];

  return (
    <nav className="bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  link.active
                    ? "bg-white text-black shadow-xs border border-zinc-200 border-b-2 border-b-red-600"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    link.active ? "text-red-600" : "text-zinc-400"
                  }`}
                />
                <span>{link.name}</span>
                {link.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
