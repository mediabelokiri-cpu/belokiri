import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import SuratKalengForm from "./SuratKalengForm";

export default function Footer() {
  return (
    <footer className="border-t-4 border-red-600 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-belokiri-white.png"
                alt="BELOKIRI"
                width={190}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-white text-sm font-bold uppercase tracking-wider">
              “Liar seperlunya, jenaka secukupnya”
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-normal">
              BELOKIRI adalah media esai populer, analisis santai, arsip sejarah rakyat,
              dan percakapan kritis yang disajikan dengan tajam dan jenaka.
              Menanggapi dunia yang berisik tanpa harus kehilangan akal sehat.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {/* WhatsApp */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp BELOKIRI"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.18-.175.2-.35.225-.651.075-.3-.15-1.267-.467-2.414-1.49-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.23-.243-.586-.49-.506-.674-.515-.175-.009-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.502 0 1.477 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.634.719.229 1.374.197 1.892.12.577-.087 1.78-.727 2.03-1.428.25-.701.25-1.302.175-1.428-.075-.126-.275-.201-.576-.351zM12.043 21.688c-1.767 0-3.498-.466-5.021-1.348l-.36-.208-3.733.979.996-3.639-.228-.363c-.967-1.54-1.477-3.327-1.477-5.16 0-5.385 4.382-9.767 9.823-9.767 2.626 0 5.094 1.023 6.95 2.88 1.856 1.857 2.878 4.326 2.876 6.954 0 5.386-4.381 9.772-9.822 9.772zm7.986-17.755C17.896 1.795 15.079.697 12.043.697 5.81.697.747 5.76.744 11.996c0 1.992.519 3.937 1.506 5.647L.31 23.303l5.818-1.526c1.644.896 3.49 1.369 5.372 1.369h.005c6.231 0 11.296-5.064 11.299-11.3 0-3.021-1.176-5.86-3.32-8.005z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/belokiri.id"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook BELOKIRI"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/belokiri.id"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @belokiri.id"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@belokiri.id"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok @belokiri.id"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:redaksi@belokiri.id"
                title="Email Redaksi BELOKIRI"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Surat Kaleng Warga Col */}
          <div className="lg:col-span-4 space-y-3">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1 pb-1 border-b border-zinc-800">
                SURAT KALENG WARGA
              </h4>
              <p className="text-[11px] text-zinc-400 font-normal leading-relaxed mt-2">
                Tinggalkan Kritik, saran, ocehan atau bahkan caci maki.
              </p>
            </div>
            <SuratKalengForm />
          </div>

          {/* Kanal & Gerakan */}
          <div className="lg:col-span-2">
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
                  Konstitusi Belokiri
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-red-500 transition-colors">
                  Agen Belokan & Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Sindikasi & Arsip */}
          <div className="lg:col-span-2">
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
