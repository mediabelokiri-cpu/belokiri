import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ExternalLink, Library, Bookmark, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Literatur Liberte | BELOKIRI",
  description:
    "Ruang kurasi pustaka, kajian teks kritis, bedah buku perlawanan, dan arsip gagasan alternatif Belokiri.id.",
};

interface BookItem {
  id: string;
  title: string;
  author: string;
  year: string;
  category: string;
  excerpt: string;
  tag: string;
}

const DUMMY_BOOKS: BookItem[] = [
  {
    id: "lib-1",
    title: "Membayangkan Komunitas: Refleksi Asal-Usul dan Penyebaran Nasionalisme",
    author: "Benedict Anderson",
    year: "1983",
    category: "Politik & Teori Sosial",
    excerpt: "Sebuah bacaan fundamental yang membongkar bagaimana cetak, bahasa vernakular, dan media massa membidani kelahiran rasa kebangsaan modern.",
    tag: "Klasik Wajib",
  },
  {
    id: "lib-2",
    title: "Pendidikan Kaum Tertindas (Pedagogy of the Oppressed)",
    author: "Paulo Freire",
    year: "1968",
    category: "Pendidikan Kritis",
    excerpt: "Mengkritik model 'bank' dalam pendidikan dan menawarkan praksis dialogis pembebasan kesadaran bagi mereka yang dibungkam.",
    tag: "Praksis",
  },
  {
    id: "lib-3",
    title: "Produksi Narasi & Manufaktur Persetujuan (Manufacturing Consent)",
    author: "Edward S. Herman & Noam Chomsky",
    year: "1988",
    category: "Kritik Media & Kekuasaan",
    excerpt: "Model propaganda lima lapis penyaring informasi yang menjelaskan bagaimana media korporasi menyaring kebenaran demi stabilitas elite.",
    tag: "Media Watch",
  },
  {
    id: "lib-4",
    title: "Catatan Pinggiran: Fragmen Sejarah yang Dihapus dari Buku Sekolah",
    author: "Kolektif Belokiri",
    year: "2025",
    category: "Arsip Alternatif",
    excerpt: "Kumpulan esai riset tentang pemogokan buruh kereta api, gerakan tani mandiri, dan kidung perlawanan tradisi lisan pesisir.",
    tag: "Arsip Redaksi",
  },
];

export default function LiteraturLibertePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Library className="w-3.5 h-3.5" />
          <span>Ruang Pustaka & Kajian</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          Literatur Liberte
        </h1>

        <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
          Membongkar rak buku, menelusuri gagasan yang tak lekang, dan menolak kepikunan sejarah.
        </p>

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Intro Note */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
        <p className="text-lg font-black text-black border-l-4 border-red-600 pl-4 py-0.5">
          Tentang Ruang Literatur Liberte
        </p>
        <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
          <strong>Literatur Liberte</strong> adalah etalase kurasi bacaan, resensi buku kritis, serta naskah-naskah lepas yang kami rekomendasikan untuk siapa saja yang ingin melangkah lebih jauh dari sekadar membaca kabar kilat. Di sini kami mengumpulkan teks-teks pemantik yang menolak tunduk pada kemalasan berpikir.
        </p>
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 font-medium">
          💡 Catatan: Halaman ini dapat dikurasi dan disunting langsung oleh Tim Redaksi melalui Meja Admin BELOKIRI.
        </div>
      </section>

      {/* Book Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <h2 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-600" />
            <span>Koleksi Rekomendasi Terkini</span>
          </h2>
          <span className="text-xs font-bold text-zinc-500">{DUMMY_BOOKS.length} Judul Terpilih</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DUMMY_BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs hover:border-red-600 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700">
                    {book.category}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                    {book.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-black leading-snug group-hover:text-red-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 mt-1">
                    {book.author} • {book.year}
                  </p>
                </div>

                <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                  {book.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-400">Arsip BELOKIRI</span>
                <span className="text-red-600 group-hover:underline inline-flex items-center gap-1">
                  <span>Lihat Catatan Resensi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestion CTA */}
      <section className="bg-black text-white rounded-3xl p-8 text-center space-y-4 border-t-4 border-red-600">
        <h3 className="text-xl font-black uppercase tracking-tight text-white">
          Punya Rekomendasi Buku atau Naskah Penting?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-normal">
          Tulis resensi bukumu dan kirimkan ke rubrik <strong>SEDIKIT AKADEMIS</strong> atau kontak tim redaksi untuk kurasi pustaka.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
        >
          <span>Kirim Resensi Buku</span>
        </Link>
      </section>
    </div>
  );
}
