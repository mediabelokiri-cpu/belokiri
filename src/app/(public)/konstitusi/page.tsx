import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Konstitusi & Statuta | BELOKIRI",
  description:
    "Konstitusi dasar, prinsip independensi, kode etik internal, dan piagam perlindungan kontributor Belokiri.id.",
};

const STATUTE_ARTICLES = [
  {
    number: "Pasal 1",
    title: "Asas, Identitas, & Karakter Dasar",
    content:
      "Belokiri.id adalah media independen berbasis esai populer, analisis kritis, dan jurnalisme warga yang berpegang pada semboyan 'Liar Seperlunya, Jenaka Secukupnya'. Belokiri tidak berpihak pada kekuasaan atau oligarki, melainkan berpijak pada realitas rakyat yang kerap diabaikan narasi arus utama.",
  },
  {
    number: "Pasal 2",
    title: "Independensi Redaksi & Penolakan Intervensi",
    content:
      "Ruang redaksi memiliki otonomi mutlak dalam kurasi naskah. Tidak ada pihak luar, penyandang dana komersial, partai politik, maupun sponsor yang berhak mendikte, menyensor, atau mengubah kesimpulan tulisan yang telah lolos standar kurasi editorial.",
  },
  {
    number: "Pasal 3",
    title: "Hak Moral & Kepemilikan Intelektual Penulis",
    content:
      "Hak cipta dan hak moral naskah sepenuhnya tetap melekat pada diri kontributor/penulis. Belokiri.id bertindak sebagai penyalur, penerbit, dan kurator naskah. Penulis berhak menerbitkan ulang naskahnya ke dalam buku kumpulan tulisan dengan tetap mencantumkan atribusi bahwa karya pernah tayang di Belokiri.id.",
  },
  {
    number: "Pasal 4",
    title: "Etika Verifikasi, Hak Jawab, & Transparansi Ralat",
    content:
      "Setiap tulisan yang mengandung fakta empiris wajib dapat dipertanggungjawabkan rujukannya. Apabila ditemukan kekeliruan data atau salah kutip, redaksi wajib mempublikasikan ralat secara terbuka, transparan, dan memberi ruang hak jawab yang adil bagi pihak yang dirugikan.",
  },
  {
    number: "Pasal 5",
    title: "Kolektivitas & Perlindungan Komunitas",
    content:
      "Ekosistem Belokiri.id adalah laboratorium bersama. Kami menentang segala bentuk pelecehan, intimidasi, kekerasan berbasis gender, dan plagiarisme naskah. Setiap anggota wajib menjaga integritas dan saling mendukung perkembangan intelektual sesama kawan tongkrongan.",
  },
];

export default function KonstitusiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Scale className="w-3.5 h-3.5" />
          <span>Statuta & Panduan Etik</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          Konstitusi Belokiri
        </h1>

        <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
          Prinsip dasar tata kelola, independensi ruang redaksi, dan piagam perlindungan penulis.
        </p>

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Overview Card */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              Piagam Landasan Bersama
            </h2>
            <p className="text-xs text-zinc-500 font-bold">
              Berlaku sejak pendirian Belokiri.id dan terbuka untuk dievaluasi oleh Dewan Pembaca
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed pt-2">
          Konstitusi ini dirumuskan bukan untuk menciptakan birokrasi yang kaku, melainkan sebagai benteng penjaga agar semangat awal Belokiri — keberanian, independensi, kecerdasan humor, dan kejujuran — tidak goyah oleh rayuan kenyamanan atau tekanan modal.
        </p>

        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 font-medium">
          💡 Catatan: Ketentuan dan statuta ini dapat diperbarui sewaktu-waktu oleh Tim Redaksi melalui panel admin.
        </div>
      </section>

      {/* Pasal-Pasal */}
      <section className="space-y-6">
        <div className="border-b-2 border-black pb-3">
          <h2 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span>Pasal-Pasal Pokok</span>
          </h2>
        </div>

        <div className="space-y-4">
          {STATUTE_ARTICLES.map((article) => (
            <div
              key={article.number}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-red-600">
                  {article.number}
                </span>
                <span className="text-xs font-bold text-zinc-400">Statuta Redaksi</span>
              </div>
              <h3 className="text-lg font-black text-black">
                {article.title}
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed font-normal">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="p-8 rounded-3xl bg-zinc-100 border border-zinc-200 text-center space-y-3">
        <h3 className="text-base font-black text-black uppercase tracking-wider">
          Punya Masukan atau Pertanyaan Terkait Etika?
        </h3>
        <p className="text-xs text-zinc-600 max-w-md mx-auto font-normal">
          Surel pengaduan etika dan transparansi dibuka melalui surel resmi redaksi:
        </p>
        <p className="text-sm font-bold text-red-600">
          redaksi@belokiri.id
        </p>
      </section>
    </div>
  );
}
