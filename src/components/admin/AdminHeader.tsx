import Link from "next/link";
import Image from "next/image";
import { UserSessionData } from "@/types";
import { ExternalLink, LogOut, ShieldCheck, Plus } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";

interface AdminHeaderProps {
  user: UserSessionData;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="border-b border-[#3d0dd9] bg-[#4c13ff] text-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand + Admin Badge */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center group">
              <Image
                src="/images/logoheaderbakubaca.png"
                alt="BAKUBACA"
                width={150}
                height={32}
                className="h-7 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/20">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-white bg-[#1f1f1f] px-2.5 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffc22f]" />
                <span>Meja Redaksi</span>
              </span>
            </div>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Write Article Button */}
            <Link
              href="/admin/articles/buat"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ffc22f] hover:bg-amber-300 text-[#1f1f1f] text-xs font-black uppercase tracking-wider transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis Artikel</span>
            </Link>

            {/* Visit Public Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:text-[#ffc22f] transition-colors px-2 py-1.5 rounded-lg hover:bg-white/10"
              title="Buka Website Publik"
            >
              <span>Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#ffc22f]" />
            </Link>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2.5 pl-3 sm:border-l border-white/20">
              <Link
                href="/admin/profil"
                className="flex items-center gap-2.5 transition-opacity p-1 rounded-xl hover:bg-white/10 group"
                title="Kelola Profil Admin"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/40 bg-[#1f1f1f] shrink-0">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-xs text-[#ffc22f]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="hidden lg:block text-left">
                  <p className="text-xs font-black text-white leading-tight group-hover:text-[#ffc22f] transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-[#ffc22f] font-bold uppercase tracking-wider">
                    Tim Redaksi
                  </p>
                </div>
              </Link>

              {/* Logout Button */}
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2 rounded-lg text-white/80 hover:text-rose-200 hover:bg-white/15 transition-colors cursor-pointer"
                  title="Keluar dari Panel Redaksi"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
