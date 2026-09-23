"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PenSquare, UserCheck } from "lucide-react";

export default function ContributorNav() {
  const pathname = usePathname();

  const links = [
    {
      name: "Ringkasan",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "Artikel Saya",
      href: "/dashboard/artikel",
      icon: FileText,
      active: pathname === "/dashboard/artikel" || pathname.startsWith("/dashboard/artikel/"),
    },
    {
      name: "Tulis Naskah",
      href: "/dashboard/artikel/buat",
      icon: PenSquare,
      active: pathname === "/dashboard/artikel/buat",
    },
    {
      name: "Profil Penulis",
      href: "/dashboard/profil",
      icon: UserCheck,
      active: pathname === "/dashboard/profil",
    },
  ];

  return (
    <nav className="bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
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
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
