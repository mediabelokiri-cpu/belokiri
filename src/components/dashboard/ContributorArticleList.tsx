"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ContributorArticleItem } from "@/lib/data/contributor";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  Search,
  PenSquare,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Eye,
  Calendar,
  Layers,
  X,
} from "lucide-react";
import { deleteDraftAction } from "@/actions/contributor.actions";

interface ContributorArticleListProps {
  initialArticles: ContributorArticleItem[];
  initialStatusFilter?: string;
}

export default function ContributorArticleList({
  initialArticles,
  initialStatusFilter = "ALL",
}: ContributorArticleListProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Filter logic
  const filtered = articles.filter((art) => {
    const matchesStatus =
      statusFilter === "ALL" || art.status === statusFilter;
    const matchesQuery =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesQuery;
  });

  const handleDelete = (articleId: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus draf "${title}"?`)) {
      startTransition(async () => {
        const res = await deleteDraftAction(articleId);
        if (res.success) {
          setArticles((prev) => prev.filter((a) => a.id !== articleId));
        } else {
          setDeleteError(res.message);
        }
      });
    }
  };

  const tabs = [
    { key: "ALL", label: "Semua" },
    { key: "DRAFT", label: "Draf" },
    { key: "REVIEW", label: "Menunggu Review" },
    { key: "REVISION", label: "Perlu Revisi" },
    { key: "PUBLISHED", label: "Diterbitkan" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar Filter & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab) => {
            const count =
              tab.key === "ALL"
                ? articles.length
                : articles.filter((a) => a.status === tab.key).length;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === tab.key
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    statusFilter === tab.key
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari naskah Anda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-red-600 bg-zinc-50"
          />
        </div>
      </div>

      {deleteError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
          {deleteError}
        </div>
      )}

      {/* Articles List / Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center space-y-3">
          <Layers className="w-8 h-8 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-black uppercase text-zinc-700">
            Tidak Ada Naskah yang Sesuai
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Tidak ditemukan naskah dengan kriteria pencarian atau status yang dipilih.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs divide-y divide-zinc-100 overflow-hidden">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-zinc-50/70 transition-colors"
            >
              {/* Left Column: Metadata & Title */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                    {article.categoryName}
                  </span>
                  <ArticleStatusBadge status={article.status} size="sm" />
                  <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                    <Calendar className="w-3 h-3" />
                    Diperbarui:{" "}
                    {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {article.status === "PUBLISHED" && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString("id-ID")} kali dibaca
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-black hover:text-red-600 transition-colors leading-snug">
                  {article.status === "PUBLISHED" ? (
                    <Link href={`/artikel/${article.slug}`} target="_blank">
                      {article.title}
                    </Link>
                  ) : (
                    <Link href={`/dashboard/artikel/${article.id}/edit`}>
                      {article.title}
                    </Link>
                  )}
                </h3>

                {article.excerpt && (
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                    {article.excerpt}
                  </p>
                )}

                {/* If revision note exists, show preview button */}
                {article.status === "REVISION" && article.adminNote && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedNote(article.adminNote)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Lihat Catatan Redaksi</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                {article.status === "DRAFT" && (
                  <>
                    <Link
                      href={`/dashboard/artikel/${article.id}/edit`}
                      className="px-3.5 py-2 rounded-lg border border-zinc-200 hover:border-black bg-white hover:bg-zinc-50 text-black text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                    >
                      <PenSquare className="w-3.5 h-3.5" />
                      <span>Edit Draf</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(article.id, article.title)}
                      disabled={isPending}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Draf"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}

                {article.status === "REVIEW" && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                      Terkunci saat proses kurasi
                    </span>
                    <Link
                      href={`/dashboard/artikel/${article.id}/edit`}
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-bold transition-colors"
                    >
                      Lihat Naskah
                    </Link>
                  </div>
                )}

                {article.status === "REVISION" && (
                  <Link
                    href={`/dashboard/artikel/${article.id}/edit`}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <PenSquare className="w-3.5 h-3.5" />
                    <span>Perbaiki Naskah</span>
                  </Link>
                )}

                {article.status === "PUBLISHED" && (
                  <Link
                    href={`/artikel/${article.slug}`}
                    target="_blank"
                    className="px-3.5 py-2 rounded-lg border border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Lihat Tayang</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revision Note Modal Dialog */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-red-600 font-black text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5" />
                <span>Catatan Kurasi Meja Redaksi</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-xs sm:text-sm text-red-900 leading-relaxed font-medium">
              {selectedNote}
            </div>

            <div className="text-[11px] text-zinc-500 font-normal">
              Silakan sesuaikan isi naskah Anda berdasarkan masukan redaksi di atas, lalu ajukan kembali (*resubmit*) naskah Anda.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Mengerti & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
