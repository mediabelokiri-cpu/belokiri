import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import AdminProfileForm from "@/components/admin/AdminProfileForm";

export const metadata: Metadata = {
  title: "Profil Admin & Agen Belokan | BELOKIRI",
  description: "Kelola nama, foto profil, dan kredensial akun Administrator Agen Belokan BELOKIRI.",
};

export default async function AdminProfilePage() {
  const sessionAdmin = await requireAdmin();

  // Fetch full details from database
  const user = await prisma.user.findUnique({
    where: { id: sessionAdmin.id },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
          Meja Redaksi
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
          Profil Akun Admin
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal">
          Kelola nama tampilan, identitas redaksi, dan foto profil administrator BELOKIRI.
        </p>
      </div>

      <AdminProfileForm
        admin={{
          ...sessionAdmin,
          name: user?.name || sessionAdmin.name,
          penName: user?.penName ?? sessionAdmin.penName,
          avatarUrl: user?.avatarUrl || sessionAdmin.avatarUrl,
          bio: user?.bio ?? null,
        }}
      />
    </div>
  );
}
