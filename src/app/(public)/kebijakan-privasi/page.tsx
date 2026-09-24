import { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | BELOKIRI",
  description: "Kebijakan perlindungan data dan privasi pengguna situs BELOKIRI.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 font-sans">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <header className="space-y-3">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          PERLINDUNGAN DATA PENGGUNA
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          KEBIJAKAN PRIVASI
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
          Kami menolak pengawasan massal korporat dan menghargai kerahasiaan setiap pembaca serta kontributor BELOKIRI.
        </p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            1. Kerahasiaan Surat Kaleng Warga
          </h2>
          <p>
            Formulir <strong>Surat Kaleng Warga</strong> dirancang untuk menampung kritik dan masukan tanpa melacak
            identitas asli pembaca. Kami tidak mencatat alamat IP pribadi atau data geolokasi pengguna untuk tujuan komersial.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            2. Data Formulir Rekrutmen & Akun Kontributor
          </h2>
          <p>
            Informasi kontak yang Anda cantumkan dalam Formulir Rekrutmen Agen Belokan (seperti email dan nomor WhatsApp)
            hanya digunakan untuk keperluan komunikasi editorial internal dan verifikasi keanggotaan. BELOKIRI tidak
            akan pernah menjual atau menyewakan data Anda kepada pihak ketiga, broker data, atau entitas pengiklan mana pun.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            3. Penggunaan Cookie & Analitik Ringan
          </h2>
          <p>
            BELOKIRI hanya memanfaatkan penyimpanan lokal atau cookie esensial yang diperlukan untuk fungsi login akun
            dan keamanan sesi pengguna. Kami tidak menyematkan pelacak perilaku lintas situs (third-party tracking pixels)
            yang mengintai aktivitas penjelajahan Anda.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            4. Hak Penghapusan Data
          </h2>
          <p>
            Kontributor atau pelamar agen berhak meminta penghapusan riwayat akun dan data pribadinya dari basis data
            BELOKIRI kapan saja dengan mengirimkan permohonan ke surel resmi kami: <strong>redaksi@belokiri.id</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
