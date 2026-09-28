import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Send, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { getCustomPageAction } from "@/actions/pages.actions";
import { defaultSiteSettings } from "@/lib/data/site-settings";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("kontak");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

export default async function KontakPage() {
  const [resSettings, resPage] = await Promise.all([
    getSiteSettingsAction(),
    getCustomPageAction("kontak"),
  ]);

  const social = resSettings.settings?.social || defaultSiteSettings.social;
  const page = resPage.page;

  const address =
    page.extraData?.address ||
    social.address ||
    "Jl. Warkop Tuya No. 45, Jakarta";
  const email =
    page.extraData?.email || social.email || "redaksi@belokiri.id";
  const whatsapp =
    page.extraData?.whatsapp || social.whatsapp;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
          {page.badge || "Hubungi Kami"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-sm text-zinc-600 max-w-md mx-auto font-normal">
            {page.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-black uppercase tracking-tight text-black border-b border-zinc-200 pb-3">
            Alamat & Saluran Resmi
          </h2>

          <div className="space-y-5 text-xs text-zinc-600">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Kantor Agen Belokan BELOKIRI:</strong>
                <p className="font-normal">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Surel Agen Belokan & Liputan:</strong>
                <p className="font-normal">{email}</p>
              </div>
            </div>

            {whatsapp && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-black font-bold block mb-0.5">WhatsApp Hotline Redaksi:</strong>
                  <a
                    href={whatsapp.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-red-600 hover:underline"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-black font-bold block mb-0.5">Siaran Pers & Kemitraan:</strong>
                <p className="font-normal">{email}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="font-normal">
              Belokiri adalah ruang bersama,ruang kolektif berbagi tulisan: opini, gagasan, cerita, dll.
              Belokiri dikelola oleh Agen Belokan.
            </p>
          </div>
        </div>

        {/* Warga Belokan Card */}
        <div className="rounded-3xl bg-black text-white border-t-4 border-t-red-600 p-8 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-600 px-3 py-1 rounded-sm inline-block shadow-xs">
              Panduan Warga Belokan
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              Ingin Mengirimkan Tulisan?
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              Anda tidak perlu mengirimkan naskah dalam lampiran email manual.
              Platform BELOKIRI menyediakan meja penulisan terintegrasi bagi Warga Belokan:
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 list-disc pl-4 font-normal">
              <li>Login dengan akun Google.</li>
              <li>Tulis langsung naskah di editor BELOKIRI.</li>
              <li>Pilih rubrik yang sesuai (Berisik, Meja Warkop, Ordal, Arsip Pinggiran, Sedikit Akademis, Sisa Bahasa, Setara, Serial Anabel).</li>
              <li>Kirim ke Agen Belokan dan pantau catatan kurasi atau revisi secara transparan.</li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-800">
            <Link
              href="/kirim-tulisan"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow transition-colors"
            >
              <span>Panduan & Kirim Tulisan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Markdown Content */}
      {page.content && page.content.trim().length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div
            className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-sm sm:text-base
              [&_h2]:text-lg sm:[&_h2]:text-xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-3 [&_h2]:py-0.5 [&_h2]:mt-6 [&_h2]:mb-3
              [&_h3]:text-sm sm:[&_h3]:text-base [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:mt-5 [&_h3]:mb-2
              [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:font-normal
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mb-4
              [&_hr]:my-6 [&_hr]:border-zinc-200"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(page.content),
            }}
          />
        </div>
      )}
    </div>
  );
}
