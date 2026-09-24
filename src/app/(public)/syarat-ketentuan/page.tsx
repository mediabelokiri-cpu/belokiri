import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | BELOKIRI",
  description: "Syarat dan ketentuan pemanfaatan situs serta pengiriman tulisan di BELOKIRI.",
};

export default function SyaratKetentuanPage() {
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
          KETENTUAN PENGGUNAAN SITUS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          SYARAT & KETENTUAN
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
          Ketentuan interaksi, pengiriman naskah, dan komitmen etis bagi seluruh Warga Belokan.
        </p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            1. Integritas Tulisan & Larangan Plagiarisme
          </h2>
          <p>
            Setiap naskah yang dikirimkan oleh Warga Belokan harus merupakan karya asli (orisinal)
            dan bukan hasil plagiasi tulisan orang lain. Kontributor bertanggung jawab secara moral
            dan hukum atas keaslian pemikiran dan data yang disajikan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            2. Hak Editorial Dewan Belokan
          </h2>
          <p>
            Redaksi berhak menyunting judul, tata bahasa, dan memadatkan naskah tanpa mengubah substansi
            gagasan penulis demi menjaga keterbacaan serta ketajaman artikel. Redaksi juga memiliki hak penuh
            untuk menolak naskah yang dinilai melanggar prinsip dasar kemanusiaan atau pedoman media siber.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            3. Etika Kolom Komentar & Surat Kaleng
          </h2>
          <p>
            Kami menyukai kritik pedas dan caci maki jenaka, namun tidak mentolerir pelecehan seksual verbal,
            ancaman kekerasan fisik terhadap individu rentan, maupun doxxing (penyebaran data pribadi tanpa izin).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            4. Perubahan Ketentuan
          </h2>
          <p>
            Syarat dan ketentuan ini dapat disesuaikan sewaktu-waktu seiring dinamika perkembangan komunitas
            BELOKIRI. Pembaruan akan selalu diumumkan secara terbuka di halaman ini.
          </p>
        </section>
      </div>
    </div>
  );
}
