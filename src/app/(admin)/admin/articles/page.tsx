import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { getAllArticlesForAdmin } from "@/lib/data/admin";
import AdminArticleTable from "@/components/admin/AdminArticleTable";
import { FileText, Inbox, Plus } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Manajemen Seluruh Artikel | Agen Belokan BELOKIRI",
};

interface AdminArticlesPageProps {
  searchParams: Promise<{
    status?: "ALL" | "REVIEW" | "PUBLISHED" | "REVISION" | "DRAFT";
    rubrik?: string;
    q?: string;
  }>;
}

export default async function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  await requireAdmin();
  const params = await searchParams;

  const articles = await getAllArticlesForAdmin({
    status: params.status,
    categorySlug: params.rubrik,
    search: params.q,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Manajemen Seluruh Artikel
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-zinc-900 text-white">
              {articles.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Kelola arsip konten, kurasi Pilihan Agen Belokan, tarik naskah tayang, atau hapus konten yang melanggar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/articles/buat"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Naskah Baru</span>
          </Link>

          <Link
            href="/admin/review"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs"
          >
            <Inbox className="w-4 h-4" />
            <span>Antrean Kurasi</span>
          </Link>
        </div>
      </div>

      {/* Interactive Table with Filters */}
      <AdminArticleTable initialArticles={articles} />
    </div>
  );
}
