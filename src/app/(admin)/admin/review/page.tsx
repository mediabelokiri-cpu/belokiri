import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth/session";
import { getReviewQueue } from "@/lib/data/admin";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  Inbox,
  ArrowRight,
  Clock,
  User,
  Calendar,
  Sparkles,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "Antrean Kurasi Naskah | Meja Redaksi BELOKIRI",
};

export default async function AdminReviewQueuePage() {
  await requireAdmin();
  const queue = await getReviewQueue();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Antrean Kurasi Naskah
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-600 text-white">
              {queue.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Telaah naskah masuk dari kontributor, uji kepatuhan fakta dan kode etik, serta putuskan persetujuan tayang.
          </p>
        </div>
      </div>

      {/* Queue List */}
      {queue.length === 0 ? (
        <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center space-y-3 shadow-xs">
          <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
          <h2 className="text-base font-black text-black uppercase tracking-tight">
            Antrean Kurasi Sedang Kosong
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Seluruh naskah yang dikirimkan oleh kontributor telah diperiksa dan diputuskan oleh tim redaksi.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors"
            >
              <span>Lihat Semua Artikel Terdaftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
          {queue.map((article, index) => {
            const wordCount = article.content.trim().split(/\s+/).length;
            const readingTime = Math.max(1, Math.ceil(wordCount / 180));

            return (
              <div
                key={article.id}
                className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-zinc-50/70 transition-colors"
              >
                <div className="space-y-3 flex-1 min-w-0">
                  {/* Badges & Meta */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-black text-white">
                      Antrean #{index + 1}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700">
                      Rubrik {article.categoryName}
                    </span>
                    <ArticleStatusBadge status={article.status} size="sm" />
                    <span className="text-xs text-zinc-400 font-medium">
                      {wordCount} kata • ±{readingTime} menit baca
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-black text-black hover:text-red-600 transition-colors leading-snug">
                    <Link href={`/admin/articles/${article.id}/review`}>
                      {article.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-2 font-normal">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Author Card Info */}
                  <div className="flex items-center gap-3 pt-1 text-xs text-zinc-500">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
                      {article.authorAvatarUrl ? (
                        <Image
                          src={article.authorAvatarUrl}
                          alt={article.authorName}
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-zinc-600">
                          {article.authorName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-black">{article.authorName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      Diajukan:{" "}
                      {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center gap-3">
                  <Link
                    href={`/admin/articles/${article.id}/review`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm transform active:scale-95"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Periksa Naskah</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
