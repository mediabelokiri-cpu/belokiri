import { requireUser } from "@/lib/auth/session";
import ArticleEditor from "@/components/editor/ArticleEditor";

export const metadata = {
  title: "Tulis Naskah Baru | Meja Kontributor BELOKIRI",
  description: "Tulis esai, opini, atau analisis mendalam untuk diajukan ke Redaksi BELOKIRI.",
};

export default async function CreateArticlePage() {
  await requireUser();

  return (
    <div className="space-y-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
          Studio Penulisan
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
          Tulis Naskah Baru
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal">
          Susun artikel dengan perspektif kritis dan bernas. Anda dapat menyimpan draf kapan saja sebelum mengirimkannya ke redaksi.
        </p>
      </div>

      <ArticleEditor />
    </div>
  );
}
