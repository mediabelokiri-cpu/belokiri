import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | BELOKIRI",
  description: "Pernyataan sangkalan hukum, tanggung jawab tulisan kontributor, dan batasan operasional media BELOKIRI.",
};

export default function DisclaimerPage() {
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
          BATASAN TANGGUNG JAWAB HUKUM
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          DISCLAIMER
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
          Pernyataan sangkalan dan penegasan status konten yang dipublikasikan di situs BELOKIRI.
        </p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            1. Opini Penulis dan Warga Belokan
          </h2>
          <p>
            Seluruh artikel, esai, opini, dan karya sastra yang dimuat di BELOKIRI merupakan cerminan
            dari sudut pandang masing-masing penulis dan kontributor. Gagasan yang tertuang tidak secara
            otomatis merefleksikan sikap institusional atau keputusan politik resmi BELOKIRI secara keseluruhan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            2. Karakter Satir dan Karya Fiksi
          </h2>
          <p>
            Rubrik-rubrik tertentu seperti <strong>SERIAL ANABEL</strong> atau catatan humor di <strong>MEJA WARKOP</strong> dapat
            mengandung unsur fiksi satir, personifikasi komikal, dan hiperbola artistik. Nama karakter, tempat,
            atau insiden yang menyerupai kenyataan digunakan untuk tujuan kritik sosial dan refleksi kultural semata.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            3. Akurasi Informasi & Tautan Pihak Ketiga
          </h2>
          <p>
            BELOKIRI senantiasa berupaya menyajikan analisis yang valid dan berbobot. Namun demikian,
            kami tidak menjamin ketiadaan kekeliruan teknis atau ketidakakuratan data luar yang dikutip.
            Tautan menuju situs pihak ketiga disediakan murni untuk kemudahan referensi pembaca, dan BELOKIRI
            tidak bertanggung jawab atas isi maupun kebijakan situs eksternal tersebut.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            4. Penggunaan Materi dan Lisensi
          </h2>
          <p>
            Materi yang dipublikasikan di situs ini dapat dikutip untuk kepentingan pendidikan, advokasi rakyat,
            dan diskusi publik non-komersial dengan syarat mencantumkan atribusi jelas kepada penulis dan
            menautkan kembali ke BELOKIRI.
          </p>
        </section>
      </div>
    </div>
  );
}
