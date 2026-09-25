"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserPlus,
  Search,
  RefreshCw,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building2,
  HelpCircle,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  getRekrutmenListAction,
  updateRekrutmenStatusAction,
  deleteRekrutmenAction,
  RekrutmenItem,
} from "@/actions/rekrutmen.actions";

export default function AdminRekrutmenPage() {
  const [applications, setApplications] = useState<RekrutmenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "DITERIMA" | "DITOLAK">(
    "ALL"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchApplications = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setErrorMsg(null);

    try {
      const res = await getRekrutmenListAction();
      if (res.success) {
        setApplications(res.data);
      } else {
        setErrorMsg(res.error || "Gagal memuat data pendaftaran calon agen.");
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil berkas pendaftar."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = async (
    id: string,
    status: "PENDING" | "DITERIMA" | "DITOLAK"
  ) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );

    try {
      const res = await updateRekrutmenStatusAction(id, status);
      if (!res.success) {
        alert(res.error || "Gagal mengubah status pendaftar.");
        fetchApplications();
      }
    } catch {
      fetchApplications();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus berkas pendaftaran calon agen "${name}" secara permanen?`)) {
      return;
    }

    // Optimistic update
    setApplications((prev) => prev.filter((app) => app.id !== id));

    try {
      const res = await deleteRekrutmenAction(id);
      if (!res.success) {
        alert(res.error || "Gagal menghapus berkas pendaftar.");
        fetchApplications();
      }
    } catch {
      fetchApplications();
    }
  };

  const filteredApps = applications.filter((app) => {
    if (filter !== "ALL" && app.status !== filter) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = app.namaLengkap.toLowerCase().includes(q);
      const matchAlias = app.namaPena?.toLowerCase().includes(q) || false;
      const matchEmail = app.email.toLowerCase().includes(q);
      const matchWa = app.whatsapp.toLowerCase().includes(q);
      const matchDom = app.domisili.toLowerCase().includes(q);
      const matchInst = app.institusi?.toLowerCase().includes(q) || false;
      const matchAlasan = app.alasanBergabung.toLowerCase().includes(q);

      if (
        !matchName &&
        !matchAlias &&
        !matchEmail &&
        !matchWa &&
        !matchDom &&
        !matchInst &&
        !matchAlasan
      ) {
        return false;
      }
    }

    return true;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const acceptedCount = applications.filter((a) => a.status === "DITERIMA").length;
  const rejectedCount = applications.filter((a) => a.status === "DITOLAK").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            SELEKSI AWAK BELOKIRI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-2">
            Pendaftaran Rekrutmen Agen Belokan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
            Tinjau berkas lamaran, jawaban kuesioner kritis, dan putuskan siapa yang layak bergabung dengan Dewan Belokan.
          </p>
        </div>

        {/* Quick Stats Badges & Refresh */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchApplications(true)}
            disabled={refreshing || loading}
            title="Muat Ulang Berkas Masuk"
            className="p-3 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black transition-all shadow-xs flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin text-red-600" : ""}`}
            />
          </button>
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Menunggu
            </span>
            <span className="text-lg font-black text-amber-600">{pendingCount}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Diterima
            </span>
            <span className="text-lg font-black text-emerald-600">
              {acceptedCount}
            </span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Total Berkas
            </span>
            <span className="text-lg font-black text-black">{totalCount}</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <p className="text-xs sm:text-sm font-bold">{errorMsg}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "ALL", label: `Semua (${totalCount})` },
            { id: "PENDING", label: `Menunggu Review (${pendingCount})` },
            { id: "DITERIMA", label: `Diterima (${acceptedCount})` },
            { id: "DITOLAK", label: `Ditolak (${rejectedCount})` },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as "ALL" | "PENDING" | "DITERIMA" | "DITOLAK")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filter === item.id
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, WA, domisili..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-medium focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-5">
        {loading ? (
          <div className="p-16 text-center bg-white border border-zinc-200 rounded-3xl space-y-3">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              Memuat Berkas Pendaftaran dari Database Supabase...
            </p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-16 text-center bg-white border border-zinc-200 rounded-3xl space-y-3">
            <UserPlus className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-black uppercase text-zinc-700">
              Tidak Ada Berkas Pendaftar
            </h3>
            <p className="text-xs text-zinc-400">
              {totalCount === 0
                ? "Belum ada calon agen yang mengisi formulir rekrutmen."
                : "Tidak ada pendaftar yang cocok dengan filter atau kata kunci saat ini."}
            </p>
          </div>
        ) : (
          filteredApps.map((app) => {
            const rawPhone = app.whatsapp.replace(/\D/g, "");
            const cleanPhone = rawPhone.startsWith("0")
              ? "62" + rawPhone.slice(1)
              : rawPhone;

            return (
              <div
                key={app.id}
                className={`bg-white border rounded-3xl p-6 sm:p-8 space-y-6 transition-all shadow-xs ${
                  app.status === "DITERIMA"
                    ? "border-emerald-300 ring-1 ring-emerald-500/20"
                    : app.status === "DITOLAK"
                    ? "border-zinc-200 opacity-75"
                    : "border-amber-200 ring-1 ring-amber-500/20"
                }`}
              >
                {/* Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-lg font-black uppercase tracking-tight text-black">
                        {app.namaLengkap}
                      </h2>
                      {app.namaPena && (
                        <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-bold text-xs">
                          alias &ldquo;{app.namaPena}&rdquo;
                        </span>
                      )}

                      {/* Status Badge */}
                      {app.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-[10px] font-black uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          <span>Menunggu Seleksi</span>
                        </span>
                      )}
                      {app.status === "DITERIMA" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Diterima Jadi Agen</span>
                        </span>
                      )}
                      {app.status === "DITOLAK" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 text-[10px] font-black uppercase tracking-wider">
                          <XCircle className="w-3 h-3" />
                          <span>Ditolak</span>
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                      Dikirim pada:{" "}
                      {new Date(app.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Quick Decision Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-start">
                    {app.status !== "DITERIMA" && (
                      <button
                        onClick={() => handleUpdateStatus(app.id, "DITERIMA")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer transition-colors"
                        title="Terima Calon Agen"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Terima</span>
                      </button>
                    )}

                    {app.status !== "DITOLAK" && (
                      <button
                        onClick={() => handleUpdateStatus(app.id, "DITOLAK")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider border border-zinc-300 cursor-pointer transition-colors"
                        title="Tolak Calon Agen"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Tolak</span>
                      </button>
                    )}

                    {app.status !== "PENDING" && (
                      <button
                        onClick={() => handleUpdateStatus(app.id, "PENDING")}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-zinc-500 hover:text-black hover:bg-zinc-100 text-xs font-medium cursor-pointer"
                        title="Kembalikan ke Status Menunggu"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(app.id, app.namaLengkap)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Berkas Pendaftar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact & Meta Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                        WhatsApp
                      </span>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-zinc-900 hover:text-emerald-600 flex items-center gap-1"
                      >
                        <span>{app.whatsapp}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-red-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                        Email
                      </span>
                      <a
                        href={`mailto:${app.email}`}
                        className="font-bold text-zinc-900 hover:text-red-600 truncate block"
                      >
                        {app.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                        Domisili
                      </span>
                      <span className="font-bold text-zinc-900">{app.domisili}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                        Institusi / Profesi
                      </span>
                      <span className="font-bold text-zinc-900">
                        {app.institusi || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fokus Bidang Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Fokus Bidang Agen yang Diminati:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {app.fokusBidang.map((fokus) => (
                      <span
                        key={fokus}
                        className="px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold"
                      >
                        {fokus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Answers / Kuesioner Box */}
                <div className="space-y-4 pt-2 border-t border-zinc-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Presiden Favorit / Nyeleneh
                      </span>
                      <p className="text-xs font-black text-black">
                        {app.namaPresiden}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Kepercayaan Bentuk Bumi
                      </span>
                      <p className="text-xs font-black text-black">
                        {app.kepercayaanBumi}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Ayam atau Telur Duluan?
                      </span>
                      <p className="text-xs font-black text-black">
                        {app.ayamAtauTelur}
                      </p>
                    </div>
                  </div>

                  {/* Alasan Bergabung */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                      Alasan Ingin Bergabung dengan Dewan Belokan:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal whitespace-pre-wrap">
                      &ldquo;{app.alasanBergabung}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
