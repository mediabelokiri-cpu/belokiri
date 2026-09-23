import Link from "next/link";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black font-serif text-white tracking-tight">
                NALAR
              </span>
            </Link>
            <p className="text-amber-400 text-sm font-medium italic">
              “Melihat lebih dari sekadar kabar.”
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              NALAR adalah media independen yang menyajikan jurnalisme berkedalaman,
              analisis berimbang, dan perspektif kritis. Kami mengajak pembaca
              untuk tidak hanya mengetahui apa yang terjadi, melainkan memahami
              konteks di baliknya.
            </p>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
              >
                <span>Kirim Tulisan ke Redaksi</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Rubriks Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Rubrik NALAR
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {MOCK_RUBRIKS.map((rubrik) => (
                <li key={rubrik.slug}>
                  <Link
                    href={`/kategori/${rubrik.slug}`}
                    className="text-stone-300 hover:text-white transition-colors"
                  >
                    {rubrik.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information & Legal Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Informasi & Etika
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Redaksi & Kontak
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-white transition-colors">
                  Indeks Berita
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">
                  Pedoman Media Siber
                </span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">
                  Kebijakan Privasi
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} NALAR Media Nusantara. Hak cipta dilindungi undang-undang.</p>
          <p>Dibangun dengan arsitektur modular Next.js • Supabase • Vercel</p>
        </div>
      </div>
    </footer>
  );
}
