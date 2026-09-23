import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { getAllArticlesForAdmin } from "@/lib/data/admin";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import {
  FolderTree,
  FileText,
  ExternalLink,
  ArrowRight,
  HelpCircle,
  Compass,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "8 Rubrik & Pedoman Redaksi | NALAR",
};

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const allArticles = await getAllArticlesForAdmin();

  // Calculate article count per rubrik
  const rubrikCounts = MOCK_RUBRIKS.map((rubrik) => {
    const articles = allArticles.filter((a) => a.categorySlug === rubrik.slug);
    const publishedCount = articles.filter((a) => a.status === "PUBLISHED").length;
    const reviewCount = articles.filter((a) => a.status === "REVIEW").length;
    return {
      ...rubrik,
      totalCount: articles.length,
      publishedCount,
      reviewCount,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              8 Rubrik Resmi NALAR
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-600 text-white">
              8 Rubrik
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Struktur taksonomi editorial NALAR. Setiap rubrik dipandu oleh satu pertanyaan filosofis untuk menyajikan kedalaman nalar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Semua Artikel</span>
          </Link>
        </div>
      </div>

      {/* Rubriks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {rubrikCounts.map((rubrik, idx) => (
          <div
            key={rubrik.slug}
            className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs flex flex-col justify-between hover:border-black/30 hover:shadow-sm transition-all group"
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${rubrik.badgeColor}`}
                >
                  Rubrik #{idx + 1} • {rubrik.name}
                </span>

                {rubrik.reviewCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                    {rubrik.reviewCount} butuh review
                  </span>
                )}
              </div>

              {/* Guiding Question */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3.5">
                <div className="flex items-start gap-2 text-zinc-400">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-600" />
                  <p className="text-xs font-bold text-zinc-900 italic leading-snug">
                    &ldquo;{rubrik.question}&rdquo;
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {rubrik.description}
              </p>
            </div>

            {/* Bottom Meta & Link */}
            <div className="pt-6 mt-6 border-t border-zinc-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Terbit di Web:</span>
                <span className="font-black text-black">
                  {rubrik.publishedCount} artikel
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href={`/admin/articles?rubrik=${rubrik.slug}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-black uppercase tracking-wider transition-colors"
                >
                  <span>Kelola</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <Link
                  href={`/rubrik/${rubrik.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 hover:border-black text-zinc-700 hover:text-black text-[11px] font-black uppercase tracking-wider transition-colors"
                >
                  <span>Publik</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Standard Guidance */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-black uppercase tracking-tight">
              Panduan Kurasi Rubrik NALAR (Masterplan V4 & V5)
            </h2>
            <p className="text-xs text-zinc-500 font-normal">
              Standar baku dewan redaksi saat menempatkan atau menyetujui naskah kiriman kontributor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-700">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
            <div className="flex items-center gap-2 font-black text-black uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Kesesuaian Pertanyaan Filosofis</span>
            </div>
            <p className="text-zinc-600 leading-relaxed font-normal">
              Pastikan inti naskah menjawab pertanyaan utama rubrik bersangkutan. Hindari artikel opini di rubrik KABAR, atau investigasi faktual di rubrik SUARA.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
            <div className="flex items-center gap-2 font-black text-black uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Verifikasi Fakta & Hak Cipta Gambar</span>
            </div>
            <p className="text-zinc-600 leading-relaxed font-normal">
              Seluruh data numerik, kutipan narasumber, dan atribusi foto wajib dicantumkan sumber resminya secara jelas sebelum disetujui terbit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
