import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { getContributorArticles } from "@/lib/data/contributor";
import ContributorArticleList from "@/components/dashboard/ContributorArticleList";
import { PenSquare } from "lucide-react";

interface ContributorArticlesPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContributorArticlesPage({
  searchParams,
}: ContributorArticlesPageProps) {
  const user = await requireUser();
  const params = await searchParams;
  const articles = await getContributorArticles(user.id);

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
            Artikel & Naskah Saya
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Kelola seluruh tulisan Anda dari tahap draf hingga tayang di BELOKIRI.
          </p>
        </div>

        <Link
          href="/dashboard/artikel/buat"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs shrink-0"
        >
          <PenSquare className="w-4 h-4" />
          <span>Tulis Naskah Baru</span>
        </Link>
      </div>

      {/* Interactive List Component */}
      <ContributorArticleList
        initialArticles={articles}
        initialStatusFilter={params.status || "ALL"}
      />
    </div>
  );
}
