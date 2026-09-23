import { requireUser } from "@/lib/auth/session";
import { getContributorProfile } from "@/lib/data/contributor";
import ContributorProfileForm from "@/components/dashboard/ContributorProfileForm";

export const metadata = {
  title: "Profil Penulis | Meja Kontributor NALAR",
  description: "Kelola profil penulis, nama pena, dan biodata kontributor NALAR.",
};

export default async function ContributorProfilePage() {
  const user = await requireUser();
  const profile = await getContributorProfile(user.id);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
          Identitas Penulis
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
          Profil Penulis & Biodata
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal">
          Informasi ini akan ditampilkan pada setiap naskah yang Anda terbitkan dan pada halaman profil publik Anda.
        </p>
      </div>

      <ContributorProfileForm
        initialUser={{
          ...user,
          bio: profile?.bio,
          penName: profile?.penName,
          avatarUrl: profile?.avatarUrl || user.avatarUrl,
        }}
      />
    </div>
  );
}
