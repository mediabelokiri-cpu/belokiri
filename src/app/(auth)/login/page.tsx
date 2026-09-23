import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, PenTool, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Masuk Kontributor | NALAR",
  description: "Masuk menggunakan akun Google untuk menulis artikel dan mengirim naskah ke Redaksi NALAR.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col justify-between p-4 sm:p-6">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke NALAR</span>
        </Link>
        <span className="text-xs text-stone-400 font-medium">Portal Kontributor</span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-xs text-center space-y-6">
        <div>
          <span className="text-3xl font-black font-serif text-stone-950 tracking-tight">
            NALAR
          </span>
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mt-1">
            Melihat lebih dari sekadar kabar
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold font-serif text-stone-900">
            Masuk ke Meja Kontributor
          </h1>
          <p className="text-xs text-stone-500 leading-relaxed">
            Tulis draft, kirimkan liputan atau opinimu, dan pantau proses kurasi
            redaksi secara langsung.
          </p>
        </div>

        {/* Benefits bullets */}
        <div className="bg-stone-50 rounded-2xl p-4 text-left space-y-2 text-xs text-stone-600 border border-stone-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Simpan draft artikel kapan saja</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Terima catatan kurasi & revisi transparan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Karya dibaca ribuan audiens muda di seluruh Indonesia</span>
          </div>
        </div>

        {/* Google Sign-in CTA */}
        <div className="pt-2">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all shadow-xs cursor-pointer group"
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
            <span className="group-hover:text-stone-950">Lanjutkan dengan Google</span>
          </button>
          <p className="text-[10px] text-stone-400 mt-3">
            Otentikasi aman via Google OAuth (Auth.js) • Otomatis didaftarkan sebagai Kontributor
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-stone-400">
        © {new Date().getFullYear()} NALAR Media Nusantara. Seluruh hak cipta dilindungi.
      </div>
    </div>
  );
}
