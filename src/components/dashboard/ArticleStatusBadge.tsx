import { ArticleStatus } from "@/types";
import { Clock, AlertTriangle, CheckCircle, FileEdit } from "lucide-react";

interface ArticleStatusBadgeProps {
  status: ArticleStatus | "DRAFT" | "REVIEW" | "REVISION" | "PUBLISHED";
  showIcon?: boolean;
  size?: "sm" | "md";
}

export default function ArticleStatusBadge({
  status,
  showIcon = true,
  size = "md",
}: ArticleStatusBadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  switch (status) {
    case "DRAFT":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider rounded-md bg-zinc-100 text-zinc-700 border border-zinc-300 ${sizeClasses}`}
        >
          {showIcon && <FileEdit className="w-3.5 h-3.5 text-zinc-500" />}
          <span>Draf</span>
        </span>
      );

    case "REVIEW":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider rounded-md bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses}`}
        >
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
          <span>Menunggu Review</span>
        </span>
      );

    case "REVISION":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider rounded-md bg-red-50 text-red-700 border border-red-300 ${sizeClasses}`}
        >
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
          <span>Perlu Revisi</span>
        </span>
      );

    case "PUBLISHED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 ${sizeClasses}`}
        >
          {showIcon && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
          <span>Diterbitkan</span>
        </span>
      );

    default:
      return null;
  }
}
