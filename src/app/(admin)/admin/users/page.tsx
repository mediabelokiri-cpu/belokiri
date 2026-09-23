import { requireAdmin } from "@/lib/auth/session";
import { getAdminUsersList } from "@/lib/data/admin";
import AdminUserTable from "@/components/admin/AdminUserTable";
import { Users } from "lucide-react";

export const metadata = {
  title: "Direktori Kontributor & Redaksi | Meja Redaksi BELOKIRI",
};

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await getAdminUsersList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Direktori Kontributor & Redaksi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-zinc-900 text-white">
              {users.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Pantau seluruh kontributor terdaftar, status keaktifan akun, serta moderasi akses penulisan naskah.
          </p>
        </div>
      </div>

      {/* Interactive Table */}
      <AdminUserTable initialUsers={users} />
    </div>
  );
}
