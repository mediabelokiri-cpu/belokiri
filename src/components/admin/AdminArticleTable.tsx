"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminArticleItem } from "@/lib/data/admin";
import { MOCK_RUBRIKS } from "@/lib/data/mock-articles";
import ArticleStatusBadge from "@/components/dashboard/ArticleStatusBadge";
import {
  toggleEditorPickAction,
  unpublishArticleAction,
  deleteArticleByAdminAction,
} from "@/actions/admin.actions";
import {
  Search,
  Filter,
  Star,
  ExternalLink,
  RotateCcw,
  Trash2,
  Eye,
  FileCheck2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  Edit,
} from "lucide-react";

interface AdminArticleTableProps {
  initialArticles: AdminArticleItem[];
}

export default function AdminArticleTable({ initialArticles }: AdminArticleTableProps) {
  const [articles, setArticles] = useState<AdminArticleItem[]>(initialArticles);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [rubrikFilter, setRubrikFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Status filter
      if (statusFilter !== "ALL" && art.status !== statusFilter) {
        return false;
      }
      // Rubrik filter
      if (rubrikFilter !== "ALL" && art.categorySlug !== rubrikFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchAuthor = art.authorName.toLowerCase().includes(q);
        const matchRubrik = art.categoryName.toLowerCase().includes(q);
        if (!matchTitle && !matchAuthor && !matchRubrik) return false;
      }
      return true;
    });
  }, [articles, statusFilter, rubrikFilter, searchQuery]);

  // Handle Toggle Editor Pick
  const handleToggleEditorPick = (articleId: string) => {
    startTransition(async () => {
      const res = await toggleEditorPickAction(articleId);
      if (res.success && res.data) {
        setArticles((prev) =>
          prev.map((a) =>
            a.id === articleId ? { ...a, isEditorPick: res.data!.isEditorPick } : a
          )
        );
        setFeedback({ type: "success", text: res.message || "Status Pilihan Agen Belokan diperbarui" });
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal memperbarui status Pilihan Agen Belokan" });
      }
    });
  };

  // Handle Unpublish
  const handleUnpublish = (articleId: string, title: string) => {
    if (
      !confirm(
        `Tarik artikel "${title}" dari tayang publik? Status akan kembali menjadi Draf.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await unpublishArticleAction(articleId);
      if (res.success) {
        setArticles((prev) =>
          prev.map((a) => (a.id === articleId ? { ...a, status: "DRAFT" } : a))
        );
        setFeedback({ type: "success", text: res.message || "Artikel ditarik dari tayang" });
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal menarik artikel" });
      }
    });
  };

  // Handle Delete
  const handleDelete = (articleId: string, title: string) => {
    if (
      !confirm(
        `PERINGATAN: Hapus artikel "${title}" secara permanen dari basis data? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await deleteArticleByAdminAction(articleId);
      if (res.success) {
        setArticles((prev) => prev.filter((a) => a.id !== articleId));
        setFeedback({ type: "success", text: res.message || "Artikel berhasil dihapus permanen" });
      } else {
        setFeedback({ type: "error", text: res.message || "Gagal menghapus artikel" });
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
      <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
        {/* Top Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-100">
          {[
            { id: "ALL", label: "Semua Artikel", count: articles.length },
            {
              id: "REVIEW",
              label: "Perlu Kurasi",
              count: articles.filter((a) => a.status === "REVIEW").length,
              badgeColor: "bg-amber-100 text-amber-800",
            },
            {
              id: "PUBLISHED",
              label: "Sudah Terbit",
              count: articles.filter((a) => a.status === "PUBLISHED").length,
              badgeColor: "bg-emerald-100 text-emerald-800",
            },
            {
              id: "REVISION",
              label: "Perlu Revisi",
              count: articles.filter((a) => a.status === "REVISION").length,
              badgeColor: "bg-rose-100 text-rose-800",
            },
            {
              id: "DRAFT",
              label: "Draf",
              count: articles.filter((a) => a.status === "DRAFT").length,
              badgeColor: "bg-zinc-100 text-zinc-700",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-black text-white shadow-xs"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-black"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  statusFilter === tab.id
                    ? "bg-zinc-800 text-zinc-300"
                    : tab.badgeColor || "bg-zinc-200 text-zinc-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Rubrik Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, penulis, atau kata kunci artikel..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-black focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={rubrikFilter}
              onChange={(e) => setRubrikFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all cursor-pointer"
            >
              <option value="ALL">Semua 8 Rubrik</option>
              {MOCK_RUBRIKS.map((rubrik) => (
                <option key={rubrik.slug} value={rubrik.slug}>
                  Rubrik {rubrik.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <FileText className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-black text-black uppercase tracking-tight">
              Tidak Ada Artikel yang Cocok
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Coba sesuaikan kata kunci pencarian atau ubah filter status dan rubrik di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  <th className="py-3.5 px-5">Artikel & Konten</th>
                  <th className="py-3.5 px-4">Rubrik</th>
                  <th className="py-3.5 px-4">Penulis</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Statistik</th>
                  <th className="py-3.5 px-5 text-right">Aksi Agen Belokan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {filteredArticles.map((article) => {
                  const wordCount = article.content.trim().split(/\s+/).length;

                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-zinc-50/60 transition-colors group"
                    >
                      {/* Title & Preview */}
                      <td className="py-4 px-5 max-w-md">
                        <div className="flex items-start gap-3">
                          {article.featuredImage ? (
                            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 relative border border-zinc-200 bg-zinc-100">
                              <Image
                                src={article.featuredImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-12 rounded-lg shrink-0 border border-zinc-200 bg-zinc-100 flex items-center justify-center text-zinc-400">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {article.isEditorPick && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                  <span>Pilihan Agen Belokan</span>
                                </span>
                              )}
                              <span className="text-[10px] text-zinc-400 font-medium">
                                {wordCount} kata
                              </span>
                            </div>

                            <Link
                              href={`/admin/articles/${article.id}/review`}
                              className="font-black text-black hover:text-red-600 transition-colors line-clamp-2 leading-snug block"
                            >
                              {article.title}
                            </Link>

                            <p className="text-[11px] text-zinc-400 truncate font-normal">
                              ID: {article.id} • Pembaruan:{" "}
                              {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rubrik */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-700">
                          {article.categoryName}
                        </span>
                      </td>

                      {/* Penulis */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {article.authorAvatarUrl ? (
                            <Image
                              src={article.authorAvatarUrl}
                              alt={article.authorName}
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full object-cover border border-zinc-200"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[10px] font-bold">
                              {article.authorName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-black leading-none">
                              {article.authorName}
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">
                              {article.authorEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <ArticleStatusBadge status={article.status} size="sm" />
                      </td>

                      {/* Views / Metrics */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="font-black text-black">
                          {article.views.toLocaleString("id-ID")}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Pembaca
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Review / Workbench */}
                          <Link
                            href={`/admin/articles/${article.id}/review`}
                            className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              article.status === "REVIEW"
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-xs"
                                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                            }`}
                            title={
                              article.status === "REVIEW"
                                ? "Telaah Naskah"
                                : "Buka Meja Agen Belokan"
                            }
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {article.status === "REVIEW" ? "Kurasi" : "Uji"}
                            </span>
                          </Link>

                          {/* Edit Article */}
                          <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="p-2 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
                            title="Sunting Naskah"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Toggle Editor's Pick (if published) */}
                          {article.status === "PUBLISHED" && (
                            <button
                              onClick={() => handleToggleEditorPick(article.id)}
                              disabled={isPending}
                              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                article.isEditorPick
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  : "text-zinc-400 hover:text-amber-600 hover:bg-zinc-100"
                              }`}
                              title={
                                article.isEditorPick
                                  ? "Cabut Pilihan Agen Belokan"
                                  : "Jadikan Pilihan Agen Belokan"
                              }
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  article.isEditorPick ? "fill-amber-500" : ""
                                }`}
                              />
                            </button>
                          )}

                          {/* View Live Article (if published) */}
                          {article.status === "PUBLISHED" && (
                            <Link
                              href={`/artikel/${article.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
                              title="Buka Halaman Publik"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}

                          {/* Unpublish */}
                          {article.status === "PUBLISHED" && (
                            <button
                              onClick={() => handleUnpublish(article.id, article.title)}
                              disabled={isPending}
                              className="p-2 rounded-lg text-zinc-500 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                              title="Tarik dari Tayang (Jadikan Draf)"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete Permanently */}
                          <button
                            onClick={() => handleDelete(article.id, article.title)}
                            disabled={isPending}
                            className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Permanen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
