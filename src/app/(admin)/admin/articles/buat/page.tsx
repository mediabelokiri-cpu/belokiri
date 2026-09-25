import { requireAdmin } from "@/lib/auth/session";
import AdminArticleEditor from "@/components/admin/AdminArticleEditor";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Tulis Artikel Agen Belokan | Meja Agen Belokan BELOKIRI",
  description: "Susun esai tajam, analisis mendalam, atau opini resmi Dewan Agen Belokan BELOKIRI.",
};

export default async function AdminCreateArticlePage() {
  const admin = await requireAdmin();

  let authors: {
    id: string;
    name: string;
    penName: string | null;
    email: string;
    role: string;
    avatarUrl: string | null;
  }[] = [];

  try {
    authors = await prisma.user.findMany({
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
    });
  } catch (err) {
    console.error("Error fetching authors for admin editor:", err);
  }

  return (
    <div className="space-y-6">
      <AdminArticleEditor
        authors={authors}
        currentUserId={admin.id}
      />
    </div>
  );
}
