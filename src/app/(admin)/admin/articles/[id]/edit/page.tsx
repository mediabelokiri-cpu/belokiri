import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getArticleForReview } from "@/lib/data/admin";
import AdminArticleEditor from "@/components/admin/AdminArticleEditor";

export const metadata = {
  title: "Sunting Artikel Agen Belokan | Meja Agen Belokan BELOKIRI",
};

interface AdminEditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditArticlePage({
  params,
}: AdminEditArticlePageProps) {
  await requireAdmin();
  const { id } = await params;

  const article = await getArticleForReview(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminArticleEditor initialData={article} />
    </div>
  );
}
