import Link from "next/link";
import Image from "next/image";
import { UserSessionData } from "@/types";
import { ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";

interface AdminHeaderProps {
  user: UserSessionData;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand + Admin Badge */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center group">
              <Image
                src="/images/logo-nalar-red.png"
                alt="NALAR"
                width={120}
                height={25}
                className="h-7 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-zinc-200">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-white bg-black px-2.5 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>Meja Redaksi</span>
              </span>
            </div>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Visit Public Site */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-black transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-50"
              title="Buka Website Publik"
            >
              <span>Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2.5 pl-3 sm:border-l border-zinc-200">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-300 bg-zinc-100 shrink-0">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-xs text-zinc-600">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="hidden lg:block text-left">
                <p className="text-xs font-black text-black leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                  Dewan Editor
                </p>
              </div>

              {/* Logout Button */}
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
