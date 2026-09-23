import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Layers, Sparkles } from "lucide-react";

const RUBRIKS = [
  {
    name: "KABAR",
    slug: "kabar",
    badge: "Aktual",
    question: "Apa yang sedang terjadi?",
    desc: "Peristiwa terkini nasional, daerah, politik, ekonomi, dan hukum.",
  },
  {
    name: "BEDAH",
    slug: "bedah",
    badge: "Analisis",
    question: "Apa yang ada di balik kabar?",
    desc: "Data, latar belakang, konteks mendalam, dan penjelasan komprehensif.",
  },
  {
    name: "SISI",
    slug: "sisi",
    badge: "Perspektif",
    question: "Bagaimana jika dilihat dari sisi lain?",
    desc: "Sudut pandang alternatif yang luput dari sorotan media arus utama.",
  },
  {
    name: "NADI",
    slug: "nadi",
    badge: "Sosial",
    question: "Bagaimana dirasakan masyarakat?",
    desc: "Fenomena sosial, dinamika warga, dan keresahan publik sehari-hari.",
  },
  {
    name: "CERITA",
    slug: "cerita",
    badge: "Human Interest",
    question: "Siapa manusia di baliknya?",
    desc: "Sosok, komunitas, perjuangan, dan pengalaman hidup yang inspiratif.",
  },
  {
    name: "JEJAK",
    slug: "jejak",
    badge: "Kultur",
    question: "Dari mana asal identitas kita?",
    desc: "Budaya, tradisi, seni, sejarah, dan warisan nilai masyarakat.",
  },
  {
    name: "ESOK",
    slug: "esok",
    badge: "Masa Depan",
    question: "Ke mana generasi berikutnya?",
    desc: "Pendidikan, pelajar, mahasiswa, teknologi, dan eksplorasi karier.",
  },
  {
    name: "SUARA",
    slug: "suara",
    badge: "Opini",
    question: "Apa gagasan dan pemikiranmu?",
    desc: "Kolom opini, esai kritis, dan ruang dialog pemikiran kontributor.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] selection:bg-[#f59e0b]/30">
      {/* Top Header / Masthead */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tighter text-stone-900 font-serif">
              NALAR
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-stone-500 font-medium border-l border-stone-200 pl-3">
              Media Berita & Insight
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Masuk / Kontributor
            </Link>
          </div>
        </div>

        {/* Rubrik Bar */}
        <div className="border-t border-stone-100 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6 max-w-6xl mx-auto flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-stone-600">
          {RUBRIKS.map((r) => (
            <span
              key={r.slug}
              className="hover:text-stone-950 transition-colors cursor-pointer shrink-0"
            >
              {r.name}
            </span>
          ))}
        </div>
      </header>

      {/* Hero Brand Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fondasi Arsitektur V5 Siap</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-serif text-stone-900 leading-[1.1] mb-6">
            Melihat lebih dari sekadar kabar.
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-sans mb-8">
            NALAR menghadirkan berita, perspektif alternatif, analisis mendalam,
            dan cerita manusia dengan sudut pandang yang kritis, lugas, dan
            berbeda.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-stone-900 text-white shadow-sm">
              <BookOpen className="w-4 h-4" />
              Sistem Redaksi Terstruktur
            </span>
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-stone-300 bg-white text-stone-800">
              <Layers className="w-4 h-4" />
              PostgreSQL • Supabase • Vercel Ready
            </span>
          </div>
        </div>

        {/* 8 Rubrik Showcase */}
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-serif text-stone-900 tracking-tight">
                8 Rubrik Karakter NALAR
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Bukan hanya kategori topik, melainkan cara kita membedah dan
                memahami sebuah peristiwa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RUBRIKS.map((rubrik) => (
              <div
                key={rubrik.slug}
                className="group p-5 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Rubrik #{rubrik.slug}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {rubrik.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                    {rubrik.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-800 mt-1 italic">
                    “{rubrik.question}”
                  </p>
                  <p className="text-xs text-stone-500 mt-2.5 leading-relaxed">
                    {rubrik.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-600 group-hover:text-stone-900">
                  <span>Jelajahi Arsip</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture & Workflow Brief */}
        <section className="mt-16 p-8 rounded-2xl bg-stone-900 text-stone-100">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Alur Editorial Inti
            </span>
            <h3 className="text-2xl font-bold font-serif mt-2 mb-3">
              Read • Write • Review • Revision • Publish
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">
              Sistem menjamin integritas publikasi: Penulis/kontributor menulis
              draft dan mengajukan kurasi, redaksi menyunting dan meminta
              revisi, dan hanya redaksi yang memiliki otoritas penerbitan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="text-stone-400">Status 1</p>
                <p className="font-bold text-white mt-1">DRAFT</p>
              </div>
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="text-stone-400">Status 2</p>
                <p className="font-bold text-amber-400 mt-1">REVIEW</p>
              </div>
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="text-stone-400">Status 3</p>
                <p className="font-bold text-blue-400 mt-1">REVISION</p>
              </div>
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="text-stone-400">Status 4</p>
                <p className="font-bold text-emerald-400 mt-1">PUBLISHED</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white mt-20 py-8 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-serif font-bold text-stone-800 text-sm mb-1">
            NALAR
          </p>
          <p className="italic mb-4">“Melihat lebih dari sekadar kabar.”</p>
          <p>© {new Date().getFullYear()} NALAR Media. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
