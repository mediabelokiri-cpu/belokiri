import { Metadata } from "next";
import Link from "next/link";
import {
  PenSquare,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Coins,
  BookOpen,
  UserCheck,
  FolderGit2,
  Gift,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Menulis di BELOKIRI: Panduan & Kirim Tulisan Warga Belokan",
  description:
    "Belokiri membuka ruang bagi siapa saja yang ingin berbagi gagasan, cerita, pengamatan, keresahan, atau kritik. Jadilah Warga Belokan, kirimkan tulisanmu.",
};

const WRITING_TOPICS = [
  { title: "Esai Populer", desc: "Argumen segar yang membedah fenomena sosial." },
  { title: "Cerita & Pengalaman", desc: "Kisah personal yang punya resonansi luas." },
  { title: "Opini & Kritik", desc: "Sudut pandang berani dan punya posisi jelas." },
  { title: "Catatan Kota & Kampung", desc: "Dinamika ruang hidup, perubahan, dan lingkungan." },
  { title: "Budaya & Keseharian", desc: "Kebiasaan orang-orang di sekitar yang luput dibicarakan." },
  { title: "Politik & Masyarakat", desc: "Kekuasaan, kebijakan, dan dampaknya bagi warga." },
  { title: "Pendidikan & Kampus", desc: "Keresahan bangku kelas, sekolah, dan perguruan tinggi." },
  { title: "Sejarah & Ingatan Lokal", desc: "Peristiwa masa lalu dan arsip narasi rakyat." },
  { title: "Isu Lain yang Mengganjal", desc: "Segala hal yang menurutmu layak dibicarakan." },
];

const REWARDS = [
  {
    icon: Coins,
    title: "Honorarium Tulisan",
    desc: "Apresiasi finansial untuk tulisan yang memenuhi kriteria, standar bobot, dan kategori editorial redaksi.",
  },
  {
    icon: UserCheck,
    title: "Nama & Profil Resmi",
    desc: "Nama pena, foto avatar, dan bio lengkapmu tercantum di setiap artikel yang diterbitkan.",
  },
  {
    icon: FolderGit2,
    title: "Portofolio Publik",
    desc: "Halaman arsip karya digital pribadi yang dapat dibagikan dan dijadikan portofolio kepenulisan profesional.",
  },
  {
    icon: BookOpen,
    title: "Proyek & Kolaborasi Editorial",
    desc: "Kesempatan dilibatkan dalam liputan khusus, proyek riset, dan serial kolaborasi redaksi Belokiri.",
  },
  {
    icon: Gift,
    title: "Apresiasi & Reward Khusus",
    desc: "Reward ekstra bagi tulisan yang memantik diskursus luas, analisis paling bernas, atau respons warga tertinggi.",
  },
];

const PROHIBITIONS = [
  {
    number: "01",
    title: "Plagiarisme",
    desc: "Jangan mengambil tulisan orang lain lalu mengganti nama penulisnya. Internet sudah cukup banyak menampung dosa semacam itu.",
  },
  {
    number: "02",
    title: "Hoaks & Manipulasi Fakta",
    desc: "Tulisan boleh kritis dan kontroversial. Tapi jangan mengarang fakta lalu menyuruh pembaca percaya.",
  },
  {
    number: "03",
    title: "Fitnah & Tuduhan Tanpa Dasar",
    desc: "Kritik terhadap seseorang atau lembaga wajib memiliki landasan, fakta, dan konteks yang jelas.",
  },
  {
    number: "04",
    title: "Ujaran Kebencian & Diskriminasi",
    desc: "Tidak ada ruang untuk tulisan yang menyerang seseorang atau kelompok berbasis SARA, gender, atau identitas.",
  },
  {
    number: "05",
    title: "Ancaman & Ajakan Kekerasan",
    desc: "Dilarang memuat ajakan kekerasan, intimidasi, maupun konten yang membahayakan keselamatan orang lain.",
  },
  {
    number: "06",
    title: "Konten Seksual Eksplisit",
    desc: "Materi bernuansa pornografi atau hal tidak pantas yang tidak layak untuk ruang percakapan publik.",
  },
  {
    number: "07",
    title: "Promosi / Iklan Terselubung",
    desc: "Tulisan yang sebenarnya adalah materi promosi komersial tapi disamarkan sebagai artikel editorial akan kami tolak.",
  },
  {
    number: "08",
    title: "Kepentingan Tersembunyi",
    desc: "Bila tulisan memiliki potensi konflik kepentingan tertentu, wajib disampaikan secara terbuka kepada meja redaksi.",
  },
  {
    number: "09",
    title: "Tanpa Hak Publikasi",
    desc: "Pastikan kamu adalah pemilik orisinal dari naskah tersebut atau memiliki hak resmi untuk mengirimkannya ke Belokiri.",
  },
];

export default function KirimTulisanPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: baseUrl },
          { name: "Menulis di Belokiri", url: `${baseUrl}/kirim-tulisan` },
        ]}
      />

      {/* Header / Hero */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <PenSquare className="w-3.5 h-3.5" />
          <span>Ruang Kontributor • Warga Belokan</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          Menulis di BELOKIRI
        </h1>

        <p className="text-base sm:text-xl font-black text-red-600 uppercase tracking-wide max-w-2xl mx-auto">
          &ldquo;Karena tidak semua yang mengganjal harus dibicarakan di grup WhatsApp.&rdquo;
        </p>

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {/* Main Intro Prose */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
          <p>
            Ada hal-hal yang kadang terlalu kecil untuk diberitakan, terlalu penting untuk dilupakan, dan terlalu mengganggu kalau cuma disimpan di kepala.
          </p>
          <p>
            Bisa jadi itu tentang kampungmu. Tentang politik yang bikin geleng-geleng kepala. Tentang sekolah, jalan rusak, kopi di warkop, kebiasaan orang-orang di sekitar kita, budaya, kota yang berubah, atau kejadian sederhana yang ternyata menyimpan cerita lebih besar.
          </p>
        </div>

        {/* Callout: Tulis Saja */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white space-y-2 border-l-4 border-red-600 shadow-xs">
          <span className="text-xs font-black uppercase tracking-widest text-red-500">
            Sikap Kami
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Tulis Saja.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Belokiri membuka ruang bagi siapa saja yang ingin berbagi gagasan, cerita, pengamatan, keresahan, kritik, atau sekadar sudut pandang yang mungkin belum banyak dibicarakan.
          </p>
        </div>

        <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
          <p>
            Kami tidak mencari tulisan yang sok pintar. Kami mencari tulisan yang{" "}
            <strong className="text-black font-black bg-yellow-100 px-1.5 py-0.5 rounded">
              punya sesuatu untuk dikatakan.
            </strong>
          </p>
          <p>
            Kamu tidak harus menjadi wartawan. Tidak harus mahasiswa. Tidak harus punya gelar yang panjangnya mengalahkan judul skripsi. Yang penting, kamu punya cara melihat sesuatu dan keberanian untuk menuangkannya menjadi tulisan.
          </p>
          <p>
            Di Belokiri, para kontributor disebut <strong>Warga Belokan</strong>. Mereka datang dari berbagai latar, membawa cerita dan kegelisahan masing-masing. Sebab kami percaya, percakapan yang menarik tidak selalu lahir dari ruang redaksi. Kadang ia lahir dari teras rumah, bangku warkop, perjalanan pulang, ruang kelas, pasar, sekretariat, atau dari seseorang yang tiba-tiba berpikir:
          </p>
        </div>

        {/* Pull Quote */}
        <div className="p-6 rounded-2xl bg-red-50 border-l-4 border-red-600 text-red-950 font-black text-lg sm:text-xl italic">
          &ldquo;Kok begini terus, ya?&rdquo;
          <span className="block not-italic font-bold text-xs sm:text-sm text-zinc-600 mt-1">
            Nah, pertanyaan semacam itu boleh dibawa dan dituliskan ke sini.
          </span>
        </div>
      </div>

      {/* Section 1: Apa yang Bisa Ditulis? */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            Kategori & Ragam Naskah
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mt-1">
            Apa yang Bisa Ditulis?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
            Bebas mengeksplorasi berbagai bentuk naskah, mulai dari opini tongkrongan hingga catatan sosial mendalam:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {WRITING_TOPICS.map((topic, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-red-600/50 hover:bg-red-50/20 transition-all space-y-1"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <h3 className="text-xs font-black text-black uppercase tracking-tight">
                  {topic.title}
                </h3>
              </div>
              <p className="text-[11px] text-zinc-600 font-normal leading-relaxed pl-6">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-zinc-100 border border-zinc-200 text-center space-y-1">
          <p className="text-xs sm:text-sm text-zinc-700 font-normal">
            Tidak harus selalu berat. Belokiri juga percaya bahwa sesuatu yang serius tidak harus ditulis dengan muka serius.
          </p>
          <p className="text-xs sm:text-sm font-black text-black uppercase tracking-wider">
            Liar seperlunya. Jenaka secukupnya.
          </p>
        </div>
      </section>

      {/* Section 2: Reward Bagi Warga Belokan */}
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            Apresiasi Redaksi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mt-1">
            Reward Bagi Warga Belokan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal leading-relaxed">
            Menulis memang tidak selalu membuat rekening gemuk. Tapi setidaknya, tulisanmu jangan sampai cuma dibaca sendiri. Setiap tulisan yang diterbitkan di Belokiri akan mendapatkan apresiasi sebagai bagian dari <strong>Warga Belokan</strong>:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REWARDS.map((reward, i) => {
            const Icon = reward.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4 hover:border-zinc-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-black uppercase tracking-tight">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {reward.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 font-normal leading-relaxed">
          * Besaran dan bentuk reward dapat berbeda sesuai jenis tulisan, program, atau kebijakan editorial yang sedang berjalan.
        </div>

        <div className="p-5 rounded-2xl bg-red-600 text-white text-center font-bold text-xs sm:text-sm leading-relaxed">
          Jadi, jangan menulis hanya karena ingin dibayar. Tapi kalau bisa{" "}
          <span className="underline decoration-white decoration-2 font-black">
            dibayar sambil tetap ngomongin sesuatu yang penting
          </span>
          , kenapa tidak?
        </div>
      </section>

      {/* Section 3: Hal-Hal yang Dilarang */}
      <section className="bg-white border-2 border-red-600/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              Integritas & Etika
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Hal-Hal yang Dilarang
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal leading-relaxed">
              Kebebasan menulis bukan berarti bebas menulis apa saja tanpa konsekuensi. Belokiri terbuka terhadap kritik, perbedaan pendapat, satire, bahkan tulisan yang bikin meja redaksi sedikit panas. Tapi ada beberapa hal yang <strong>tidak kami terima</strong>:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROHIBITIONS.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  {item.number}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  DILARANG
                </span>
              </div>
              <h3 className="text-xs font-black text-black uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-600 font-normal leading-relaxed">
          Pada akhirnya, redaksi berhak menolak, menyunting, atau meminta perbaikan terhadap tulisan yang tidak sesuai dengan standar editorial Belokiri. Karena menjadi <strong>Warga Belokan</strong> bukan cuma soal punya tulisan, tapi juga soal bertanggung jawab atas apa yang kita tuliskan.
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-black text-white text-center space-y-6 border-t-4 border-red-600 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-500">
            Meja Naskah Terbuka
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Jadi, Punya Tulisan?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto font-normal leading-relaxed">
          Kirimkan. Tulisanmu akan dibaca dan dipertimbangkan oleh redaksi Belokiri. Tidak semua tulisan akan diterbitkan, tetapi setiap tulisan punya kesempatan untuk menjadi bagian dari percakapan.
        </p>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto italic">
          Kalau tulisanmu punya gagasan, punya cerita, dan punya alasan untuk dibaca orang lain—barangkali Belokiri adalah tempatnya.
        </p>

        <div className="pt-2 space-y-4">
          <p className="text-base sm:text-lg font-black uppercase tracking-wider text-red-500">
            Jadilah Warga Belokan. Kirim tulisanmu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg transform active:scale-95 group cursor-pointer"
            >
              <PenSquare className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Masuk / Daftar Akun Warga Belokan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[11px] text-zinc-400 font-normal">
            Cukup masuk dengan akun Google untuk langsung membuka meja editor draf naskah.
          </p>
        </div>
      </section>
    </article>
  );
}
