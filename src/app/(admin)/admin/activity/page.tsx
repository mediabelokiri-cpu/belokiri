import { requireAdmin } from "@/lib/auth/session";
import { getActivityLogs, ActivityLogItem } from "@/lib/data/admin";
import {
  History,
  FileCheck2,
  AlertTriangle,
  Send,
  RotateCcw,
  UserX,
  UserCheck,
  FileText,
  Clock,
  Shield,
  User,
} from "lucide-react";

export const metadata = {
  title: "Log Audit Aktivitas Editorial | BELOKIRI",
};

function getActionBadge(action: ActivityLogItem["action"]) {
  switch (action) {
    case "PUBLISH_ARTICLE":
      return {
        label: "Persetujuan Terbit",
        icon: FileCheck2,
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    case "REQUEST_REVISION":
      return {
        label: "Permintaan Revisi",
        icon: AlertTriangle,
        className: "bg-rose-100 text-rose-800 border-rose-200",
      };
    case "SUBMIT_ARTICLE":
      return {
        label: "Naskah Masuk",
        icon: Send,
        className: "bg-blue-100 text-blue-800 border-blue-200",
      };
    case "UNPUBLISH_ARTICLE":
      return {
        label: "Tarik dari Tayang",
        icon: RotateCcw,
        className: "bg-amber-100 text-amber-800 border-amber-200",
      };
    case "SUSPEND_USER":
      return {
        label: "Akun Ditangguhkan",
        icon: UserX,
        className: "bg-red-100 text-red-800 border-red-200",
      };
    case "ACTIVATE_USER":
      return {
        label: "Akun Diaktifkan",
        icon: UserCheck,
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    default:
      return {
        label: "Pembaruan Konten",
        icon: FileText,
        className: "bg-zinc-100 text-zinc-700 border-zinc-200",
      };
  }
}

export default async function AdminActivityPage() {
  await requireAdmin();
  const logs = await getActivityLogs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Log Audit Aktivitas Editorial
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-zinc-900 text-white">
              {logs.length} Kejadian
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Catatan kronologis seluruh interaksi naskah, moderasi akun pengguna, dan persetujuan kurasi tim dewan Agen Belokan.
          </p>
        </div>
      </div>

      {/* Logs Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <History className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-black text-black uppercase tracking-tight">
              Belum Ada Log Aktivitas
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Aktivitas kurasi, persetujuan naskah, dan moderasi akun akan tercatat secara otomatis di sini.
            </p>
          </div>
        ) : (
          logs.map((log) => {
            const badge = getActionBadge(log.action);
            const Icon = badge.icon;
            const isAgenBelokan = log.userRole === "ADMIN";

            return (
              <div
                key={log.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-zinc-50/60 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${badge.className}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${badge.className}`}
                      >
                        {badge.label}
                      </span>

                      <div className="flex items-center gap-1 text-xs">
                        {isAgenBelokan ? (
                          <span className="inline-flex items-center gap-1 font-black text-black">
                            <Shield className="w-3 h-3 text-red-600" />
                            <span>{log.userName}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-zinc-800">
                            <User className="w-3 h-3 text-zinc-400" />
                            <span>{log.userName}</span>
                          </span>
                        )}
                        <span className="text-zinc-400">•</span>
                        <span className="text-[10px] uppercase font-bold text-zinc-400">
                          {log.targetType}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-black text-black">
                      {log.targetTitle}
                    </p>

                    {log.note && (
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-700 italic">
                        &ldquo;{log.note}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="shrink-0 sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1 text-[11px] text-zinc-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(log.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-mono">
                    ID: {log.id}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
