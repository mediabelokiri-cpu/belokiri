import { requireUser } from "@/lib/auth/session";
import ContributorHeader from "@/components/dashboard/ContributorHeader";
import ContributorNav from "@/components/dashboard/ContributorNav";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Meja Warga Belokan | BELOKIRI",
  description: "Kelola naskah, draft liputan, dan pantau kurasi Agen Belokan BELOKIRI.",
};

export default async function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans">
      <ContributorHeader user={user} />
      <ContributorNav />
      <main className="flex-1 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-400 font-medium">
        BELOKIRI Meja Warga Belokan • Menjaga Independensi & Kualitas Naskah Publik
      </footer>
    </div>
  );
}
