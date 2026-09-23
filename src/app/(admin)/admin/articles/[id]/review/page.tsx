import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getArticleForReview } from "@/lib/data/admin";
import EditorialWorkbench from "@/components/admin/EditorialWorkbench";

export const metadata = {
  title: "Meja Uji Kurasi Agen Belokan | BELOKIRI",
};

interface ArticleReviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminArticleReviewPage({
  params,
}: ArticleReviewPageProps) {
  await requireAdmin();
  const { id } = await params;

  const article = await getArticleForReview(id);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <EditorialWorkbench article={article} />
    </div>
  );
}
