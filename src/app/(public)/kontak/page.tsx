import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Send, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak & Redaksi | NALAR",
  description: "Hubungi dewan redaksi NALAR, kirim siaran pers, atau panduan naskah tulisan.",
};

export default function KontakPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Hubungi Kami
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          REDAKSI & KERJA SAMA NALAR
        </h1>
        <p className="text-sm text-zinc-600 max-w-md mx-auto font-normal">
          Punya tips liputan, pengaduan berita, siaran pers, atau ingin berkolaborasi?
          Tim redaksi siap mendengar dari Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3">
            Alamat & Saluran Resmi
          </h2>

          <div className="space-y-5 text-xs text-zinc-600">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Kantor Redaksi NALAR:</strong>
                <p className="font-normal">Gedung Media Nusantara Lt. 4, Jl. Kebon Sirih No. 45, Jakarta Pusat 10340</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Surel Redaksi & Liputan:</strong>
                <p className="font-normal">redaksi@nalar.id</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Siaran Pers & Kemitraan:</strong>
                <p className="font-normal">kerjasama@nalar.id</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="font-normal">
              Seluruh jurnalis NALAR dibekali kartu pers resmi dan dilarang
              menerima imbalan dalam bentuk apa pun terkait pemberitaan.
            </p>
          </div>
        </div>

        {/* Kontributor Card */}
        <div className="rounded-3xl bg-black text-white border-t-4 border-t-red-600 p-8 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-600 px-3 py-1 rounded-sm inline-block shadow-xs">
              Panduan Kontributor
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              Ingin Mengirimkan Tulisan?
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              Anda tidak perlu mengirimkan naskah dalam lampiran email manual.
              Platform NALAR menyediakan dashboard terintegrasi:
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 list-disc pl-4 font-normal">
              <li>Login dengan akun Google.</li>
              <li>Tulis langsung naskah di editor NALAR.</li>
              <li>Pilih rubrik yang sesuai (Kabar, Bedah, Sisi, Nadi, Cerita, Jejak, Esok, Suara).</li>
              <li>Kirim ke redaksi dan pantau catatan revisi secara transparan.</li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-800">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow transition-colors"
            >
              <span>Buka Dashboard Kontributor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
