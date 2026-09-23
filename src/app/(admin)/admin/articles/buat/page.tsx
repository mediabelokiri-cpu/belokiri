import { requireAdmin } from "@/lib/auth/session";
import AdminArticleEditor from "@/components/admin/AdminArticleEditor";

export const metadata = {
  title: "Tulis Artikel Redaksi | Meja Redaksi NALAR",
  description: "Susun liputan investigasi, analisis mendalam, atau opini resmi Dewan Redaksi NALAR.",
};

export default async function AdminCreateArticlePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <AdminArticleEditor />
    </div>
  );
}
