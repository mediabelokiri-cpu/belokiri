import { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Server,
  Gift,
  Search,
  ArrowRight,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Users,
} from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { formatArticleContent } from "@/lib/security/sanitize";
import DonasiPaymentSection from "@/components/public/DonasiPaymentSection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("donasi");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description:
      page.metaDescription ||
      "Sokong jurnalisme warga dan ruang bicara independen BELOKIRI agar tetap mengudara tanpa pesanan kekuasaan.",
  };
}

export default async function DonasiPage() {
  const [resPage, resSettings] = await Promise.all([
    getCustomPageAction("donasi"),
    getSiteSettingsAction(),
  ]);

  const page = resPage.page;
  const whatsapp =
    page.extraData?.whatsapp ||
    resSettings.settings?.social?.whatsapp ||
    "0812-3456-7890";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16 font-sans">
      {/* 1. Header Section */}
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{page.badge || "DARI WARGA UNTUK WARGA"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title || "PATUNGAN WARGA: JAGA BELOKIRI TETAP MENGUDARA"}
        </h1>

        {page.subtitle && (
          <p className="text-base sm:text-xl font-bold text-red-600 tracking-wide leading-relaxed">
            {page.subtitle}
          </p>
        )}

        <div className="w-20 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* 2. 3 Pilar Transparansi Dana */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
            AKUNTABILITAS & INTEGRITAS
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
            Ke Mana Setiap Rupiah Mengalir?
          </h2>
          <p className="text-xs text-zinc-500 font-normal mt-1">
            Kami tidak punya kantor mewah atau dewan komisaris bergaji fantastis. Seluruh dana dipakai untuk 3 pilar:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black uppercase text-black">
              1. Server & Infrastruktur
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Memastikan website BELOKIRI tetap online 24/7 tanpa gangguan, tahan terhadap serangan siber, dan arsip naskah warga tetap terjaga abadi.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black uppercase text-black">
              2. Reward Penulis Warga
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Mendanai reward buku, kaos merchandise, dan uang apresiasi bagi naskah Warga Belokan yang tembus 500 pembaca dalam 3 hari.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black uppercase text-black">
              3. Amunisi Riset & Liputan
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Operasional tim lapangan untuk menggali fakta di kampung kota, mendokumentasikan suara yang diabaikan, dan menjaga liputan tetap independen.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Kotak Pembayaran Interaktif (QRIS, Bank, Saweria) */}
      <section>
        <DonasiPaymentSection
          extraData={page.extraData}
          whatsappHotline={whatsapp}
        />
      </section>

      {/* 4. Manifesto Transparansi & Sikap Redaksi (Markdown) */}
      {page.content && (
        <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 text-xs font-black uppercase tracking-wider text-red-600">
            <Flame className="w-4 h-4" />
            <span>Manifesto Kemandirian & Transparansi</span>
          </div>

          <div
            className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base
              [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-4 [&_h2]:py-0.5 [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-normal
              [&_blockquote]:my-6 [&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:text-black [&_blockquote]:font-bold [&_blockquote]:text-base sm:[&_blockquote]:text-lg
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
              [&_hr]:my-8 [&_hr]:border-zinc-200"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(page.content),
            }}
          />
        </section>
      )}

      {/* 5. Ajakan Menulis (Alternatif Dukungan Selain Uang) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-zinc-100 border border-zinc-200 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-[10px] sm:text-xs font-black uppercase tracking-wider text-black">
          <Users className="w-3.5 h-3.5 text-red-600" />
          <span>Tidak Sedang Memiliki Dana Lebih?</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
          Dukung dengan Tulisan & Menyebarkan Akal Sehat
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal leading-relaxed">
          Kekuatan Belokiri bukan pada saldo rekening, melainkan pada keberanian warga untuk berbicara. Kirimkan gagasanmu, atau bagikan artikel yang kamu sukai ke teman tongkrongan.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kirim-tulisan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow transition-colors"
          >
            <span>Kirim Tulisan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 border border-zinc-300 text-black text-xs font-black uppercase tracking-wider transition-colors"
          >
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
