import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Send, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak & Redaksi | NALAR",
  description: "Hubungi dewan redaksi NALAR, kirim siaran pers, atau panduan naskah tulisan.",
};

export default function KontakPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          Hubungi Kami
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-stone-900 tracking-tight">
          Redaksi & Kerja Sama NALAR
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Punya tips liputan, pengaduan berita, siaran pers, atau ingin berkolaborasi?
          Tim redaksi siap mendengar dari Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="rounded-2xl bg-white border border-stone-200 p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-100 pb-3">
            Alamat & Saluran Resmi
          </h2>

          <div className="space-y-4 text-xs text-stone-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">Kantor Redaksi NALAR:</strong>
                <p>Gedung Media Nusantara Lt. 4, Jl. Kebon Sirih No. 45, Jakarta Pusat 10340</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">Surel Redaksi & Liputan:</strong>
                <p>redaksi@nalar.id</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Send className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">Siaran Pers & Kemitraan:</strong>
                <p>kerjasama@nalar.id</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <p>
              Seluruh jurnalis NALAR dibekali kartu pers resmi dan dilarang
              menerima imbalan dalam bentuk apa pun terkait pemberitaan.
            </p>
          </div>
        </div>

        {/* Kontributor Card */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
              Panduan Kontributor
            </span>
            <h3 className="text-xl font-black font-serif text-stone-900">
              Ingin Mengirimkan Tulisan?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Anda tidak perlu mengirimkan naskah dalam lampiran email manual.
              Platform NALAR menyediakan dashboard terintegrasi:
            </p>
            <ul className="text-xs text-stone-700 space-y-2 list-disc pl-4">
              <li>Login dengan akun Google.</li>
              <li>Tulis langsung naskah di editor NALAR.</li>
              <li>Pilih rubrik yang sesuai (Kabar, Bedah, Sisi, Nadi, Cerita, Jejak, Esok, Suara).</li>
              <li>Kirim ke redaksi dan pantau catatan revisi secara transparan.</li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-amber-200">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 shadow transition-colors"
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
