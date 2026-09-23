import Link from "next/link";
import Image from "next/image";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-red-600 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-nalar-white.png"
                alt="NALAR"
                width={170}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-red-500 text-sm font-bold uppercase tracking-wider">
              “Melihat lebih dari sekadar kabar”
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-normal">
              NALAR adalah media independen yang menyajikan jurnalisme berkedalaman,
              analisis berimbang, dan perspektif kritis. Kami mengajak pembaca
              untuk tidak hanya mengetahui apa yang terjadi, melainkan memahami
              konteks di baliknya.
            </p>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                <span>Kirim Tulisan ke Redaksi</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Rubriks Col */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-800">
              8 Rubrik NALAR
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-xs font-bold">
              {MOCK_RUBRIKS.map((rubrik) => (
                <li key={rubrik.slug}>
                  <Link
                    href={`/kategori/${rubrik.slug}`}
                    className="text-zinc-300 hover:text-red-500 transition-colors"
                  >
                    {rubrik.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information & Legal Col */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-800">
              Informasi & Etika
            </h4>
            <ul className="space-y-3 text-xs text-zinc-300 font-medium">
              <li>
                <Link href="/tentang-kami" className="hover:text-red-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-red-500 transition-colors">
                  Redaksi & Kontak
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-red-500 transition-colors">
                  Indeks Berita
                </Link>
              </li>
              <li>
                <span className="text-zinc-600 cursor-default">
                  Pedoman Media Siber
                </span>
              </li>
              <li>
                <span className="text-zinc-600 cursor-default">
                  Kebijakan Privasi
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} NALAR Media Nusantara. Hak cipta dilindungi undang-undang.</p>
          <p className="text-zinc-400">Next.js • Supabase • Vercel Architecture</p>
        </div>
      </div>
    </footer>
  );
}
