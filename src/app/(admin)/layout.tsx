import { requireAdmin } from "@/lib/auth/session";
import { getReviewQueue } from "@/lib/data/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "Meja Agen Belokan & CMS | BELOKIRI",
  description: "Panel kurasi, publikasi naskah, dan manajemen editorial Agen Belokan BELOKIRI.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  const queue = await getReviewQueue();

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans">
      <AdminHeader user={admin} />
      <AdminNav reviewCount={queue.length} />
      <main className="flex-1 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-400 font-medium">
        BELOKIRI Meja Agen Belokan • Liar Seperlunya, Jenaka Secukupnya
      </footer>
    </div>
  );
}
