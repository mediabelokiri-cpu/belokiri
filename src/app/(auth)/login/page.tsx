import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { loginAsDemoContributor, loginAsDemoAdmin, loginWithGoogleAction } from "@/actions/auth.actions";

export const metadata: Metadata = {
  title: "Masuk Warga Belokan | BELOKIRI",
  description: "Masuk menggunakan akun Google untuk menulis artikel dan mengirim naskah ke Agen Belokan BELOKIRI.",
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

  return (
    <div className="min-h-screen bg-[#fbfbfb] flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-zinc-700 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Kembali ke BELOKIRI</span>
        </Link>
        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
          Portal Warga Belokan
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-xs text-center space-y-6">
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
            Masuk ke Meja Warga Belokan
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed font-normal">
            Tulis draft, kirimkan liputan atau opinimu, dan pantau proses kurasi
            Agen Belokan secara langsung.
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

        {/* Benefits bullets */}
        <div className="bg-zinc-50 rounded-2xl p-4 text-left space-y-2.5 text-xs text-zinc-700 border border-zinc-200">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Simpan draft artikel kapan saja</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Terima catatan kurasi & revisi transparan</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Karya dibaca ribuan audiens muda di seluruh Indonesia</span>
          </div>
        </div>

        {/* Login CTAs */}
        <div className="pt-2 space-y-3">
          {/* Google Sign-in */}
          <form
            action={async () => {
              "use server";
              await loginWithGoogleAction(params.callbackUrl || "/dashboard");
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border-2 border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>
          </form>

          {/* Instant Demo Access */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <form
              action={async () => {
                "use server";
                await loginAsDemoContributor(params.callbackUrl || "/dashboard");
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-200" />
                <span>Demo Warga Belokan</span>
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await loginAsDemoAdmin(params.callbackUrl || "/admin");
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Demo Agen Belokan</span>
              </button>
            </form>
          </div>

          <p className="text-[10px] text-zinc-400 pt-1 font-medium">
            Otentikasi aman via Google OAuth • Meja Warga Belokan & Agen Belokan Terintegrasi
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-zinc-400 font-medium">
        © {new Date().getFullYear()} BELOKIRI. Seluruh hak cipta dilindungi.
      </div>
    </div>
  );
}
