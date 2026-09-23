import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import {
  getAdminDashboardStats,
  getReviewQueue,
  getActivityLogs,
} from "@/lib/data/admin";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  Inbox,
  CheckCircle,
  AlertTriangle,
  FileText,
  Eye,
  ArrowRight,
  ShieldCheck,
  Calendar,
  User,
  History,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const stats = await getAdminDashboardStats();
  const reviewQueue = await getReviewQueue();
  const recentLogs = await getActivityLogs();

  return (
    <div className="space-y-8">
      {/* 1. Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
            Peran: Dewan Redaksi / Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
            Meja Redaksi NALAR
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl font-normal">
            Selamat bekerja, {admin.name}. Kurasi naskah masuk dengan tajam, berikan
            catatan revisi yang mendidik, dan pastikan setiap tulisan melihat lebih dari sekadar kabar.
          </p>
        </div>

        <Link
          href="/admin/review"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          <Inbox className="w-4 h-4" />
          <span>Buka Antrean Review ({stats.reviewQueueCount})</span>
        </Link>
      </div>

      {/* 2. KPI Editorial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Antrean Kurasi */}
        <Link
          href="/admin/review"
          className={`p-5 rounded-2xl bg-white border transition-all shadow-xs group ${
            stats.reviewQueueCount > 0
              ? "border-red-500 hover:border-red-600 ring-2 ring-red-500/10"
              : "border-zinc-200 hover:border-zinc-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-red-700">
              Antrean Review
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-600">
              {stats.reviewQueueCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">naskah</span>
          </div>
          <p className="text-[11px] text-red-600 font-bold mt-2">
            {stats.reviewQueueCount > 0 ? "Memerlukan tindakan editor" : "Antrean bersih"}
          </p>
        </Link>

        {/* Artikel Tayang */}
        <Link
          href="/admin/articles?status=PUBLISHED"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Artikel Tayang
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">
              {stats.publishedCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">live di web</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Terbaca oleh publik
          </p>
        </Link>

        {/* Perlu Revisi */}
        <Link
          href="/admin/articles?status=REVISION"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700">
              Perlu Revisi
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">
              {stats.revisionCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">naskah</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Di meja kontributor
          </p>
        </Link>

        {/* Draf Tersimpan */}
        <Link
          href="/admin/articles?status=DRAFT"
          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-600">
              Draf Tersimpan
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-black">
              {stats.draftCount}
            </span>
            <span className="text-xs text-zinc-400 font-medium">draf</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Belum diserahkan
          </p>
        </Link>

        {/* Total Pembaca */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-700">
              Total Pembaca
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-black">
              {stats.totalViews.toLocaleString("id-ID")}
            </span>
            <span className="text-xs text-zinc-400 font-medium">views</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Akumulasi seluruh rubrik
          </p>
        </div>
      </div>

      {/* 3. Urgent Review Queue Section */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            <div>
              <h2 className="text-base font-black text-black uppercase tracking-tight">
                Antrean Naskah Masuk Menunggu Tindakan
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5 font-normal">
                Naskah yang diajukan kontributor dan siap diperiksa serta diputuskan
              </p>
            </div>
          </div>

          <Link
            href="/admin/review"
            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            <span>Buka Semua Antrean</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {reviewQueue.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-black uppercase text-zinc-700">
              Semua Naskah Masuk Sudah Ditinjau!
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Tidak ada naskah yang mengantre saat ini. Kontributor sedang mengerjakan draf dan revisi mereka.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {reviewQueue.slice(0, 4).map((article) => (
              <div
                key={article.id}
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                      {article.categoryName}
                    </span>
                    <ArticleStatusBadge status={article.status} size="sm" />
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-bold">
                      <User className="w-3 h-3 text-zinc-400" />
                      {article.authorName}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      Diajukan:{" "}
                      {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-black hover:text-red-600 transition-colors line-clamp-1">
                    <Link href={`/admin/articles/${article.id}/review`}>
                      {article.title}
                    </Link>
                  </h3>

                  {article.excerpt && (
                    <p className="text-xs text-zinc-500 line-clamp-1 font-normal">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Direct Action Button */}
                <div className="shrink-0 pt-2 lg:pt-0">
                  <Link
                    href={`/admin/articles/${article.id}/review`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>Periksa Naskah</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Recent Editorial Activity Timeline */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-500" />
            <h3 className="text-sm font-black text-black uppercase tracking-tight">
              Rekam Jejak Aktivitas Editorial Terkini
            </h3>
          </div>
          <Link
            href="/admin/activity"
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Lihat Semua Log
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {recentLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-black">
                  <span className="text-zinc-600 font-normal">{log.userName}</span>{" "}
                  {log.action === "PUBLISH_ARTICLE" && (
                    <span className="text-emerald-700 font-black">menerbitkan</span>
                  )}
                  {log.action === "REQUEST_REVISION" && (
                    <span className="text-red-600 font-black">meminta revisi</span>
                  )}
                  {log.action === "SUBMIT_ARTICLE" && (
                    <span className="text-amber-700 font-black">mengajukan naskah</span>
                  )}
                  {log.action === "UNPUBLISH_ARTICLE" && (
                    <span className="text-zinc-700 font-black">menarik naskah</span>
                  )}{" "}
                  artikel: <span className="font-bold">“{log.targetTitle}”</span>
                </p>
                {log.note && (
                  <p className="text-[11px] text-zinc-500 italic bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                    “{log.note}”
                  </p>
                )}
              </div>
              <span className="text-[11px] text-zinc-400 shrink-0">
                {new Date(log.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
