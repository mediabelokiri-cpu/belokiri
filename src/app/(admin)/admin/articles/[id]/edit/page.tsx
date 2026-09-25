import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getArticleForReview } from "@/lib/data/admin";
import AdminArticleEditor from "@/components/admin/AdminArticleEditor";
import { prisma } from "@/lib/db/prisma";

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
  const admin = await requireAdmin();
  const { id } = await params;

  const [article, authors] = await Promise.all([
    getArticleForReview(id),
    prisma.user
      .findMany({
        where: { status: "ACTIVE" },
        select: {
          id: true,
          name: true,
          penName: true,
          email: true,
          role: true,
          avatarUrl: true,
        },
        orderBy: [
          { role: "asc" },
          { name: "asc" },
        ],
      })
      .catch((err) => {
        console.error("Error fetching authors for edit page:", err);
        return [];
      }),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminArticleEditor
        initialData={article}
        authors={authors}
        currentUserId={admin.id}
      />
    </div>
  );
}
