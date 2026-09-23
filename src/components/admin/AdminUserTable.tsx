"use client";

import { useState, useTransition, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminUserItem } from "@/lib/data/admin";
import { toggleUserStatusAction } from "@/actions/admin.actions";
import {
  Search,
  Users,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  FileText,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface AdminUserTableProps {
  initialUsers: AdminUserItem[];
}

export default function AdminUserTable({ initialUsers }: AdminUserTableProps) {
  const [users, setUsers] = useState<AdminUserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isPending, startTransition] = useTransition();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
      if (statusFilter !== "ALL" && u.status !== statusFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = u.name.toLowerCase().includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        const matchPen = u.penName ? u.penName.toLowerCase().includes(q) : false;
        if (!matchName && !matchEmail && !matchPen) return false;
      }

      return true;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  // Handle Toggle User Status
  const handleToggleStatus = (userId: string, currentStatus: "ACTIVE" | "SUSPENDED", name: string) => {
    const isSuspending = currentStatus === "ACTIVE";
    const promptMsg = isSuspending
      ? `Tangguhkan akun "${name}"? Kontributor ini tidak akan dapat login atau mengirimkan naskah.`
      : `Aktifkan kembali akun "${name}"? Kontributor akan dapat mengakses Meja Kontributor.`;

    if (!confirm(promptMsg)) return;

    startTransition(async () => {
      const res = await toggleUserStatusAction(userId);
      if (res.success && res.data) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, status: res.data!.status } : u
          )
        );
        setFeedback({ type: "success", text: res.message || "Status pengguna berhasil diperbarui" });
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal mengubah status pengguna" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-black uppercase text-[10px] tracking-wider font-black"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kontributor, nama pena, atau email..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-black focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="ALL">Semua Peran</option>
            <option value="USER">Kontributor (USER)</option>
            <option value="ADMIN">Redaksi (ADMIN)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all cursor-pointer"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">Aktif</option>
            <option value="SUSPENDED">Ditangguhkan</option>
          </select>
        </div>
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Users className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-black text-black uppercase tracking-tight">
              Tidak Ada Pengguna Ditemukan
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Periksa ejaan kata kunci pencarian Anda atau sesuaikan filter di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  <th className="py-3.5 px-5">Pengguna & Profil</th>
                  <th className="py-3.5 px-4">Peran (Role)</th>
                  <th className="py-3.5 px-4">Status Akun</th>
                  <th className="py-3.5 px-4 text-center">Jumlah Naskah</th>
                  <th className="py-3.5 px-4">Terdaftar Sejak</th>
                  <th className="py-3.5 px-5 text-right">Moderasi Akun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredUsers.map((user) => {
                  const isAdmin = user.role === "ADMIN";

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-zinc-50/60 transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {user.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-sm shrink-0">
                              {user.name.charAt(0)}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-black">
                                {user.name}
                              </span>
                              {user.penName && user.penName !== user.name && (
                                <span className="text-[10px] text-zinc-400 font-normal">
                                  (Pena: {user.penName})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-normal mt-0.5">
                              <Mail className="w-3 h-3 text-zinc-400" />
                              <span>{user.email}</span>
                            </div>
                            {user.bio && (
                              <p className="text-[11px] text-zinc-500 font-normal line-clamp-1 max-w-sm mt-1">
                                {user.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                            <ShieldCheck className="w-3 h-3 text-red-600" />
                            <span>Redaksi (Admin)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-200">
                            <span>Kontributor</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {user.status === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Aktif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Ditangguhkan</span>
                          </span>
                        )}
                      </td>

                      {/* Articles Count */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span className="font-black text-black">
                          {user.articleCount}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium ml-1">
                          Naskah
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-4 px-4 whitespace-nowrap text-zinc-500 font-normal">
                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        {isAdmin ? (
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                            Akun Terproteksi
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleToggleStatus(user.id, user.status, user.name)
                            }
                            disabled={isPending}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              user.status === "ACTIVE"
                                ? "bg-zinc-100 hover:bg-rose-50 hover:text-rose-700 text-zinc-700 border border-zinc-200"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                            }`}
                          >
                            {user.status === "ACTIVE" ? (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                <span>Tangguhkan</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Aktifkan</span>
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
