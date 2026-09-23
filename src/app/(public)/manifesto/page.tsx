import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Manifesto BELOKIRI: Liar Seperlunya, Jenaka Secukupnya",
  description:
    "Manifesto Belokiri.id: Di tengah dunia yang terlalu berisik, kami memilih menyusup di antara narasi yang sudah terlalu mapan.",
};

export default function ManifestoPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Badge & Title */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5" />
          <span>Sikap Editorial Belokiri.id</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          Manifesto Belokiri
        </h1>

        <p className="text-lg sm:text-2xl font-black text-red-600 uppercase tracking-wide">
          “Liar Seperlunya, Jenaka Secukupnya”
        </p>

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* Main Manifesto Prose */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-10 text-zinc-900 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight border-l-4 border-red-600 pl-4 py-0.5">
            Menyusup di Antara Narasi
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            <p>
              Di tengah derasnya arus informasi hari ini, media kerap hadir bukan lagi sebagai penyampai kebenaran, melainkan sebagai perancang kenyamanan. Realitas dipoles, konflik dipermak, dan kegelisahan publik sering kali diredam dalam kemasan yang lebih “ramah konsumsi”. Di titik inilah <strong>Belokiri.id</strong> mengambil posisi — bukan untuk ikut meramaikan, tetapi untuk menyusup di antara narasi yang sudah terlalu mapan.
            </p>
            <p>
              Belokiri.id lahir dari kesadaran bahwa tidak semua hal layak ditenangkan. Ada realitas yang justru harus diguncang, dipertanyakan, bahkan ditertawakan. Dalam konteks sosial, ekonomi, dan politik yang penuh paradoks, pendekatan yang lurus dan datar sering kali gagal menjangkau esensi persoalan. Karena itu, Belokiri.id memilih jalan yang berbeda: <em>liar dalam kesunyian dan berani untuk tidak selalu terdengar “baik-baik saja”.</em>
            </p>
          </div>
        </section>

        {/* Pull Quote */}
        <div className="my-8 p-6 sm:p-8 rounded-2xl bg-zinc-50 border-l-4 border-black text-black font-black text-lg sm:text-xl leading-snug">
          “Independensi bagi kami bukan berarti netral tanpa arah, melainkan kebebasan untuk berpihak tanpa tekanan. Ketika ketidakadilan terjadi, diam bukanlah pilihan.”
        </div>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight border-l-4 border-red-600 pl-4 py-0.5">
            Liar Sebagai Sikap
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            <p>
              Liar bagi kami bukan sekadar gaya, melainkan sikap. Ia adalah cara untuk membuka lapisan kemunafikan tanpa harus berkhotbah. Dalam dunia yang semakin penuh kepura-puraan, liar menjadi bahasa yang justru terasa paling jujur. Belokiri.id percaya bahwa tawa yang getir sering kali lebih membekas daripada seribu kalimat yang terlalu hati-hati.
            </p>
            <p>
              Namun, di balik nada yang tajam, terdapat sikap yang jelas: <strong>keberpihakan</strong>. Belokiri.id tidak berdiri di ruang hampa. Kami berpijak pada realitas rakyat, pada mereka yang suaranya kerap tenggelam di tengah hiruk pikuk kepentingan. Independensi bagi kami bukan berarti netral tanpa arah, melainkan kebebasan untuk berpihak tanpa tekanan. Ketika ketidakadilan terjadi, diam bukanlah pilihan, dan netralitas sering kali hanya menjadi topeng bagi ketakutan.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight border-l-4 border-red-600 pl-4 py-0.5">
            Sebab Kesadaran, Perubahan Menemukan Jalannya
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            <p>
              Sebagai media, Belokiri.id tidak melihat tulisan sebagai sekadar produk. Tulisan adalah alat. Ia bisa menjadi ruang refleksi, tetapi juga bisa menjadi bentuk perlawanan. Setiap narasi yang kami hadirkan adalah upaya untuk membongkar, bukan menenangkan; untuk memantik kesadaran, bukan sekadar mengisi waktu luang.
            </p>
            <p>
              Tentu, pendekatan ini bukan tanpa risiko. Belokiri.id sadar bahwa tidak semua orang akan merasa nyaman. Namun, sejak awal, kenyamanan memang bukan tujuan. Kami lebih percaya pada pentingnya kegelisahan yang jujur daripada ketenangan yang semu. Sebab dari kegelisahan itulah kesadaran lahir, dan dari kesadaran, perubahan menemukan jalannya.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight border-l-4 border-red-600 pl-4 py-0.5">
            Ruang Bagi Mereka yang Sama Liarnya
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            <p>
              Pada akhirnya, Belokiri.id bukan sekadar media yang ingin dibaca. Ia adalah ruang bagi mereka yang masih mau berpikir, yang tidak puas dengan jawaban sederhana, dan yang percaya bahwa narasi bisa, dan harus diperebutkan. Dalam dunia yang semakin bising oleh suara yang seragam, Belokiri.id memilih untuk tetap berbeda: <strong>menyusup, mengganggu, dan jika perlu, membongkar</strong>.
            </p>
            <p className="font-bold text-black text-lg sm:text-xl pt-2">
              Karena ketika narasi dikuasai, satu-satunya cara untuk melawan adalah dengan masuk ke dalamnya, diam-diam, tajam, dan tak terduga.
            </p>
          </div>
        </section>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-black text-white text-center space-y-4 border-t-4 border-red-600">
        <span className="text-xs font-black uppercase tracking-widest text-red-500">
          Meja Terbuka
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Punya Kegelisahan yang Sama?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-normal leading-relaxed">
          Kirimkan tulisan, esai tajam, atau liputan warkopmu ke redaksi BELOKIRI.
          Atau bergabunglah bersama kami melalui program Rekrutmen Anggota.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            <span>Kirim Tulisan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/rekrutmen"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 text-white text-xs font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            <span>Buka Halaman Rekrutmen</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
