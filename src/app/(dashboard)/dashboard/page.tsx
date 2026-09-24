import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { getContributorStats, getContributorArticles } from "@/lib/data/contributor";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  FileEdit,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  PenSquare,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContributorDashboardPage() {
  const user = await requireUser();
  const stats = await getContributorStats(user.id);
  const recentArticles = await getContributorArticles(user.id);

  return (
    <div className="space-y-8">
      {/* 1. Header Greeting & Quick CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
            Status Akun: Aktif
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
            Selamat Datang, {user.penName || user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl font-normal">
            Pantau kurasi Agen Belokan, kelola draf naskah, dan terus hadirkan
            tulisan yang liar seperlunya, jenaka secukupnya.
          </p>
        </div>

        <Link
          href="/dashboard/artikel/buat"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          <PenSquare className="w-4 h-4" />
          <span>Tulis Gagasan Baru</span>
        </Link>
      </div>

      {/* 2. KPI Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Draf */}
        <Link
          href="/dashboard/artikel?status=DRAFT"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
              Draf Naskah
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:scale-105 transition-transform">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-black">
              {stats.draftCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">tersimpan</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Masih dalam tahap penulisan
          </p>
        </Link>

        {/* Sedang Direview */}
        <Link
          href="/dashboard/artikel?status=REVIEW"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700">
              Sedang Direview
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">
              {stats.reviewCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">naskah</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Menunggu kurasi meja Agen Belokan
          </p>
        </Link>

        {/* Perlu Revisi */}
        <Link
          href="/dashboard/artikel?status=REVISION"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-red-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-red-600">
              Perlu Revisi
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-600">
              {stats.revisionCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">catatan</span>
          </div>
          <p className="text-[11px] text-red-600 font-bold mt-2">
            {stats.revisionCount > 0 ? "Ada catatan dari editor" : "Belum ada revisi"}
          </p>
        </Link>

        {/* Diterbitkan */}
        <Link
          href="/dashboard/artikel?status=PUBLISHED"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Diterbitkan
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">
              {stats.publishedCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">karya live</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-2">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>{stats.totalViews.toLocaleString("id-ID")} total dibaca</span>
          </div>
        </Link>
      </div>

      {/* 3. Action Alert for Revisions if any */}
      {stats.revisionCount > 0 && (
        <div className="p-4 sm:p-5 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-black text-red-800 uppercase tracking-tight">
                Anda Memiliki {stats.revisionCount} Naskah yang Membutuhkan Revisi
              </h3>
              <p className="text-xs text-red-700 mt-0.5">
                Agen Belokan telah memberikan catatan masukan. Buka naskah terkait untuk melihat detail dan memperbaikinya.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/artikel?status=REVISION"
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0"
          >
            Buka Naskah Revisi
          </Link>
        </div>
      )}

      {/* 4. Recent Submissions Section */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-black uppercase tracking-tight">
              Aktivitas Naskah Terbaru
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 font-normal">
              Daftar naskah terakhir yang Anda buat atau perbarui
            </p>
          </div>

          <Link
            href="/dashboard/artikel"
            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-black uppercase text-zinc-600">
              Belum Ada Naskah yang Dibuat
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Mulailah menulis gagasan atau liputan investigasimu sekarang dan
              ajukan ke meja Agen Belokan BELOKIRI.
            </p>
            <Link
              href="/dashboard/artikel/buat"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors mt-2"
            >
              <span>Tulis Artikel Pertama</span>
              <PenSquare className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {recentArticles.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                      {article.categoryName}
                    </span>
                    <ArticleStatusBadge status={article.status} size="sm" />
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-black hover:text-red-600 transition-colors line-clamp-1">
                    <Link href={`/dashboard/artikel/${article.id}/edit`}>
                      {article.title}
                    </Link>
                  </h3>

                  {article.excerpt && (
                    <p className="text-xs text-zinc-500 line-clamp-1 font-normal">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {article.status === "PUBLISHED" ? (
                    <Link
                      href={`/artikel/${article.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition-colors"
                    >
                      Buka Tayang
                    </Link>
                  ) : (
                    <Link
                      href={`/dashboard/artikel/${article.id}/edit`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                        article.status === "REVISION"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {article.status === "REVISION" ? "Perbaiki Naskah" : "Edit Naskah"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
