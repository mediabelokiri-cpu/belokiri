import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getContributorArticleById } from "@/lib/data/contributor";
import ArticleEditor from "@/components/editor/ArticleEditor";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EditArticlePageProps) {
  const { id } = await params;
  return {
    title: `Sunting Naskah (${id}) | Meja Kontributor BELOKIRI`,
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const user = await requireUser();
  const { id } = await params;

  const article = await getContributorArticleById(id, user.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
          Penyuntingan Naskah
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
          Sunting Naskah
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal">
          Perbarui konten naskah, lengkapi atribut, dan simpan atau ajukan kembali ke redaksi.
        </p>
      </div>

      <ArticleEditor initialData={article} />
    </div>
  );
}
