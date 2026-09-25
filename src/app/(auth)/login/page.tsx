import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertCircle } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Masuk & Registrasi Warga Belokan | BELOKIRI",
  description: "Masuk ke Meja Warga atau Panel Redaksi Agen Belokan BELOKIRI untuk menulis dan mengelola naskah.",
};

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const isSuspended = params.error === "suspended";
  const isRateLimited = params.error === "ratelimit";
  const isGoogleNotConfigured = params.error === "google_not_configured";

  return (
    <div className="min-h-screen bg-[#fbfbfb] flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-zinc-700 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
          Portal Autentikasi BELOKIRI
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo-belokiri-red.png"
            alt="BELOKIRI"
            width={210}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-2">
            Liar seperlunya, jenaka secukupnya
          </p>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-black text-black uppercase tracking-tight">
            Portal Warga Belokan
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed font-normal">
            Masuk ke ruang gagasan warga Belokan & menulislah untuk keabadian.
          </p>
        </div>

        {isSuspended && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-left flex items-start gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>Akun Anda sedang ditangguhkan. Hubungi tim Agen Belokan BELOKIRI untuk informasi lebih lanjut.</p>
          </div>
        )}

        {isRateLimited && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>Terlalu banyak percobaan masuk secara beruntun. Mohon tunggu 1 menit demi keamanan sistem.</p>
          </div>
        )}

        {isGoogleNotConfigured && (
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-left flex items-start gap-2 text-xs text-zinc-700">
            <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            <p>Integrasi Google OAuth sedang disiapkan. Silakan gunakan Username/Email dan Password untuk masuk.</p>
          </div>
        )}

        {/* Auth Form (Login / Register Tabs) */}
        <AuthForm callbackUrl={params.callbackUrl} />
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-zinc-400 font-medium pb-2">
        © {new Date().getFullYear()} BELOKIRI. Seluruh hak cipta milik Tuhan YME. | Liar Seperlunya, Jenaka Secukupnya
      </div>
    </div>
  );
}
