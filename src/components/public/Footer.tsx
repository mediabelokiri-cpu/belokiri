import Link from "next/link";
import Image from "next/image";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-red-600 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-belokiri-white.png"
                alt="BELOKIRI"
                width={190}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-red-500 text-sm font-bold uppercase tracking-wider">
              “Liar seperlunya, jenaka secukupnya”
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-normal">
              BELOKIRI adalah media esai populer, analisis santai, arsip sejarah rakyat,
              dan percakapan kritis yang disajikan dengan tajam dan jenaka.
              Menanggapi dunia yang berisik tanpa harus kehilangan akal sehat.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                <span>Kirim Tulisan</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rekrutmen"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                <span>Rekrutmen</span>
              </Link>
            </div>
          </div>

          {/* Rubriks Col */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-800">
              8 Rubrik BELOKIRI
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {MOCK_RUBRIKS.map((rubrik) => (
                <li key={rubrik.slug}>
                  <Link
                    href={`/kategori/${rubrik.slug}`}
                    className="text-zinc-300 hover:text-red-500 transition-colors block py-0.5"
                  >
                    {rubrik.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kanal & Gerakan */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-800">
              Kanal & Gerakan
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300 font-medium">
              <li>
                <Link href="/manifesto" className="hover:text-red-500 transition-colors font-bold text-white">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link href="/rekrutmen" className="hover:text-red-500 transition-colors">
                  Rekrutmen Anggota
                </Link>
              </li>
              <li>
                <Link href="/literatur-liberte" className="hover:text-red-500 transition-colors">
                  Literatur Liberte
                </Link>
              </li>
              <li>
                <Link href="/konstitusi" className="hover:text-red-500 transition-colors">
                  Konstitusi Redaksi
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-red-500 transition-colors">
                  Redaksi & Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Sindikasi & Arsip */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-800">
              Sindikasi & Arsip
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300 font-medium">
              <li>
                <Link href="/berita" className="hover:text-red-500 transition-colors">
                  Indeks Semua Tulisan
                </Link>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  target="_blank"
                  className="hover:text-red-500 transition-colors inline-flex items-center gap-1"
                >
                  <span>RSS Feed 2.0</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/feed.json"
                  target="_blank"
                  className="hover:text-red-500 transition-colors inline-flex items-center gap-1"
                >
                  <span>JSON Feed</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  target="_blank"
                  className="hover:text-red-500 transition-colors inline-flex items-center gap-1"
                >
                  <span>Peta Situs (Sitemap)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} BELOKIRI. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="text-zinc-400">Liar Seperlunya, Jenaka Secukupnya</p>
        </div>
      </div>
    </footer>
  );
}
