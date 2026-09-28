import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  Search,
  Layers,
  FileCheck2,
  ShieldAlert,
  ArrowRight,
  Flame,
} from "lucide-react";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("literatur-liberte");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

const SYLLABUS_MODULES = [
  {
    number: "01",
    tagline: "Suara dari Bawah: Menulis sebagai Keberpihakan",
    title: "Literatur Kerakyatan",
    icon: Compass,
    stage: "MINDSET",
    stageColor: "bg-red-600 text-white",
    arah: "Membentuk perspektif—bahwa tulisan bukan sekadar estetika, tapi alat keberpihakan.",
    bahasan: [
      "Apa itu literatur kerakyatan (narasi dari, oleh, dan untuk rakyat)",
      "Sejarah singkat (misalnya karya-karya Pramoedya Ananta Toer sebagai rujukan)",
      "Kritik terhadap literasi elitis yang menjauh dari denyut warga",
      "Bagaimana menangkap realitas sosial menjadi tulisan yang hidup",
    ],
    latihan: "Observasi lingkungan sekitar → tulis narasi pendek (human story)",
    output: ["Kepekaan sosial", "Kemampuan 'melihat yang tak terlihat'"],
  },
  {
    number: "02",
    tagline: "Pers sebagai Alat Perlawanan",
    title: "Jurnalisme Perjuangan",
    icon: Flame,
    stage: "MINDSET",
    stageColor: "bg-red-600 text-white",
    arah: "Menjadikan media sebagai alat perubahan, bukan sekadar penyampai informasi.",
    bahasan: [
      "Jurnalisme advokasi vs jurnalisme 'netral' semu",
      "Media sebagai instrumen kontrol kekuasaan dan oligarki",
      "Risiko & tanggung jawab etik (framing, propaganda, disinformasi)",
      "Studi kasus media alternatif independen",
    ],
    latihan: "Bedah berita arus utama → identifikasi framing & kepentingan di baliknya",
    output: ["Cara berpikir kritis terhadap media", "Kesadaran posisi ideologis penulis"],
  },
  {
    number: "03",
    tagline: "Membongkar Realitas dengan Data",
    title: "Riset & Investigasi Data",
    icon: Search,
    stage: "SKILL",
    stageColor: "bg-black text-white",
    arah: "Memastikan tulisan tidak cuma 'keras bersuara', tetapi juga 'kuat berbasis fakta'.",
    bahasan: [
      "Cara mencari sumber kredibel (jurnal, laporan investigasi, data resmi)",
      "Teknik mengutip, membedah konteks angka, dan parafrase akurat",
      "Fact-checking sederhana namun disiplin",
      "Menghindari hoaks, misinformasi, dan bias konfirmasi",
    ],
    latihan: "Menyusun kerangka argumen berbasis minimal 2–3 referensi data valid",
    output: ["Kedalaman bobot tulisan", "Ketelitian dan disiplin berpikir"],
  },
  {
    number: "04",
    tagline: "Membedah Realitas, Membangun Narasi",
    title: "Analisis Isu & Framing Narasi",
    icon: Layers,
    stage: "SKILL",
    stageColor: "bg-black text-white",
    arah: "Elemen kunci yang membuat tulisan memiliki daya guncang dan memantik diskursus.",
    bahasan: [
      "Cara membedah anatomi isu: siapa aktor, apa kepentingan, siapa yang terdampak",
      "Framing: bagaimana satu fakta yang sama bisa dibaca dari sudut berlawanan",
      "Narasi besar kekuasaan vs narasi tandingan dari bawah",
    ],
    latihan: "Ambil satu isu viral → susun 2 framing bacaan yang berbeda",
    output: ["Ketajaman daya analisis", "Kreativitas dalam menyusun narasi tandingan"],
  },
  {
    number: "05",
    tagline: "Dari Draf ke Dampak: Ruang Agen Belokan & Produksi Konten",
    title: "Produksi Konten Media & Editing",
    icon: FileCheck2,
    stage: "PRODUKSI",
    stageColor: "bg-zinc-800 text-white",
    arah: "Mempersiapkan penulis untuk siap bekerja dalam ritme kerja Agen Belokan profesional.",
    bahasan: [
      "Workflow media digital: ide awal → penulisan → kurasi & revisi → publikasi",
      "Teknik editing naskah: memotong yang bertele-tele, merapikan kalimat, mempertajam punchline",
      "Merumuskan headline yang menggigit tanpa terjebak clickbait murahan",
      "Adaptasi naskah ke berbagai format (artikel web, carousel media sosial)",
    ],
    latihan: "Peer review & editing naskah kawan sejawat",
    output: ["Ketahanan terhadap proses revisi", "Sense editorial yang matang"],
  },
  {
    number: "06",
    tagline: "Etika, Risiko, dan Tanggung Jawab Kata",
    title: "Etika Penulis & Tanggung Jawab Publik",
    icon: ShieldAlert,
    stage: "PRODUKSI",
    stageColor: "bg-zinc-800 text-white",
    arah: "Menjaga martabat, integritas, dan keberlanjutan media alternatif.",
    bahasan: [
      "Anti-plagiarisme dan integritas intelektual",
      "Membedakan antara kritik tajam berdasar fakta vs fitnah / pencemaran",
      "Sensitivitas isu kemanusiaan, kelompok rentan, dan keadilan gender",
      "Konsekuensi hukum dan sosial sebuah tulisan di ruang publik digital",
    ],
    latihan: "Diskusi dan pemecahan kasus dilematis dalam penulisan media",
    output: ["Kedewasaan berpikir", "Kesadaran etis dan integritas moral"],
  },
];

export default async function LiteraturLibertePage() {
  const { page, isCustom } = await getCustomPageAction("literatur-liberte");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{page.badge || "Silabus & Panduan Penempaan"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
            {page.subtitle}
          </p>
        )}

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Dynamic Content (If customized via Admin) */}
      {isCustom ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
          <div
            className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-base sm:text-lg
              [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-4 [&_h2]:py-0.5 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-normal
              [&_blockquote]:my-6 [&_blockquote]:p-5 sm:[&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:text-black [&_blockquote]:font-bold [&_blockquote]:text-base sm:[&_blockquote]:text-lg
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
              [&_hr]:my-8 [&_hr]:border-zinc-200"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(page.content),
            }}
          />
        </div>
      ) : (
        <>
          {/* Default Modules Grid */}
          <div className="space-y-6">
            {SYLLABUS_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.number}
                  className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 hover:border-red-600/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
                      MODUL {mod.number}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${mod.stageColor}`}
                    >
                      {mod.stage}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-red-600 mt-0.5">
                      {mod.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {mod.arah}
                  </p>

                  <div className="pt-2 border-t border-zinc-100 space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block">
                      Pokok Bahasan:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      {mod.bahasan.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Bottom CTA */}
      <section className="bg-black text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 border-t-4 border-red-600">
        <h3 className="text-2xl font-black uppercase tracking-tight text-white">
          Siap Mengasah Tulisanmu?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-normal">
          Daftarkan dirimu dalam proses Rekrutmen Belokiri.id atau langsung kirimkan draf tulisan pertamamu.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/rekrutmen"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
          >
            <span>Daftar Rekrutmen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/kirim-tulisan"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-800 text-white text-xs font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            <span>Kirim Naskah ke Agen Belokan</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
