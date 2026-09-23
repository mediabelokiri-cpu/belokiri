import { requireAdmin } from "@/lib/auth/session";
import AdminArticleEditor from "@/components/admin/AdminArticleEditor";

export const metadata = {
  title: "Tulis Artikel Agen Belokan | Meja Agen Belokan BELOKIRI",
  description: "Susun esai tajam, analisis mendalam, atau opini resmi Dewan Agen Belokan BELOKIRI.",
};

export default async function AdminCreateArticlePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <AdminArticleEditor />
    </div>
  );
}
