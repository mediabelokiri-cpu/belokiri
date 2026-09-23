import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  PenTool,
  Search,
  Layers,
  FileCheck2,
  ShieldAlert,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Literatur Liberte | BELOKIRI",
  description:
    "Silabus penempaan menulis, riset data, dan produksi narasi kritis Belokiri.id: Dari cara pandang, keterampilan, hingga karya nyata.",
};

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
    tagline: "Merumuskan Gagasan, Menajamkan Tulisan",
    title: "Menulis Opini & Esai Kritis",
    icon: PenTool,
    stage: "SKILL",
    stageColor: "bg-black text-white",
    arah: "Keterampilan inti yang langsung dipakai untuk menulis di Belokiri.id.",
    bahasan: [
      "Mencari angle (sudut pandang yang segar dan tidak biasa)",
      "Struktur opini yang solid: hook pemantik – argumen bernas – penutup kuat",
      "Menghindari tulisan normatif, klise, dan basa-basi",
      "Gaya menulis tajam, jenaka, tetapi tetap enak dibaca (readable)",
    ],
    latihan: "Menulis 1 naskah opini dari isu aktual yang sedang berisik",
    output: ["Kualitas dan kekuatan argumen", "Kejelasan posisi tulisan"],
  },
  {
    number: "04",
    tagline: "Data Bukan Hiasan: Riset sebagai Senjata",
    title: "Riset & Verifikasi Data",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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
  {
    number: "08",
    tagline: "Manifesto: Menulis untuk Diterbitkan",
    title: "Project Akhir: Produksi Karya",
    icon: Award,
    stage: "PRODUKSI",
    stageColor: "bg-zinc-800 text-white",
    arah: "Inti penempaan Belokiri: bukan berhenti pada teori, melainkan pembuktian karya.",
    bahasan: [
      "Menulis 1 karya utuh (esai reflektif, opini warkop, atau reportase ringan)",
      "Alur penuh: pitching ide ke dewan Agen Belokan → drafting naskah → proses editing → terbit resmi",
      "Presentasi / pitching sudut pandang tulisan di hadapan forum Agen Belokan",
    ],
    latihan: "Eksekusi satu naskah lengkap siap tayang di Belokiri.id",
    output: ["Keberanian posisi ideologis", "Kekuatan struktur & kedalaman tulisan", "Konsistensi mengikuti proses kerja Agen Belokan"],
  },
];

export default function LiteraturLibertePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Silabus & Panduan Penempaan</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          Literatur Liberte
        </h1>

        <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
          Membentuk perspektif, mengasah keahlian berpikir kritis, dan memproduksi narasi yang berpihak.
        </p>

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Alur Besar Mindset -> Skill -> Produksi */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
          Pola Besar Penempaan
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-red-600 block">
              Fase 1: Modul 01 – 02
            </span>
            <p className="text-base font-black text-black uppercase">MINDSET</p>
            <p className="text-xs text-zinc-600 font-normal">
              Keberpihakan rakyat & pers sebagai alat perjuangan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-700 block">
              Fase 2: Modul 03 – 05
            </span>
            <p className="text-base font-black text-black uppercase">SKILL</p>
            <p className="text-xs text-zinc-600 font-normal">
              Esai kritis, riset data, dan ketajaman framing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 text-white border border-black space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-red-400 block">
              Fase 3: Modul 06 – 08
            </span>
            <p className="text-base font-black text-white uppercase">PRODUKSI</p>
            <p className="text-xs text-zinc-300 font-normal">
              Dapur Agen Belokan, etika publik, hingga naskah terbit.
            </p>
          </div>
        </div>
      </section>

      {/* Sesi Pembuka (Orientasi) */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 sm:p-10 border-l-8 border-red-600 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          <span>Sesi Pembuka</span>
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          “Liberte: Mengapa Kita Menulis?”
        </h2>
        <p className="text-sm text-zinc-300 font-normal leading-relaxed">
          Sesi orientasi dan penanaman nilai dasar. Menjawab pertanyaan paling mendasar sebelum menyentuh papan ketik: untuk siapa kita bersuara, kegelisahan apa yang ingin kita suarakan, dan mengapa kata-kata kita harus berani menolak kenyamanan semu.
        </p>
      </section>

      {/* 8 Modul Lengkap */}
      <section className="space-y-6">
        <div className="border-b-2 border-black pb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-black uppercase tracking-tight">
            8 Modul Penempaan Literatur Liberte
          </h2>
          <span className="text-xs font-bold text-zinc-500">Silabus Resmi Belokiri.id</span>
        </div>

        <div className="space-y-6">
          {SYLLABUS_MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.number}
                className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-red-600 transition-all space-y-6"
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                      {m.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                        {m.title}
                      </h3>
                      <p className="text-xs font-bold text-zinc-500 italic">
                        “{m.tagline}”
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 self-start sm:self-center ${m.stageColor}`}
                  >
                    {m.stage}
                  </span>
                </div>

                {/* Arah & Tujuan */}
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
                    Arah & Tujuan:
                  </span>
                  <p className="text-sm font-medium text-zinc-900 leading-relaxed">
                    {m.arah}
                  </p>
                </div>

                {/* Bahasan Materi */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                    Pokok Bahasan Materi:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-700 font-normal">
                    {m.bahasan.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Latihan & Output Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 block">
                      Praksis & Latihan:
                    </span>
                    <p className="text-xs font-bold text-black leading-relaxed">
                      {m.latihan}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 block">
                      Output yang Dilihat:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {m.output.map((out, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-800 bg-white px-2 py-0.5 rounded-md border border-zinc-200"
                        >
                          <CheckCircle2 className="w-3 h-3 text-red-600 shrink-0" />
                          <span>{out}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sesi Penutup */}
      <section className="bg-zinc-100 border border-zinc-200 rounded-3xl p-6 sm:p-10 space-y-3 text-center sm:text-left">
        <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-red-600">
          <span>Puncak Penempaan</span>
        </span>
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          “Dari Peserta ke Penulis”
        </h2>
        <p className="text-sm text-zinc-600 font-normal leading-relaxed">
          Pengumuman kelulusan naskah, evaluasi menyeluruh, dan transisi resmi menjadi bagian dari kolektif Agen Belokan dan Warga Belokan tetap Belokiri.id. Karya yang lolos kurasi akan resmi diterbitkan ke hadapan publik pembaca luas.
        </p>
      </section>

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
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-800 text-white text-xs font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            <span>Kirim Naskah ke Agen Belokan</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
