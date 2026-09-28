import { Metadata } from "next";
import Link from "next/link";
import {
  PenSquare,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  Gift,
  CheckCircle2,
  Clock,
  Award,
  CupSoda,
  Shirt,
  Flame,
} from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getCustomPageAction } from "@/actions/pages.actions";
import { formatArticleContent } from "@/lib/security/sanitize";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCustomPageAction("kirim-tulisan");
  return {
    title: page.metaTitle || `${page.title} | BELOKIRI`,
    description: page.metaDescription,
  };
}

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

function TumblerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v3" />
      <rect x="6" y="5" width="12" height="2.5" rx="1" />
      <path d="M7 7.5L8.5 20.2c.1.9.9 1.8 1.9 1.8h3.2c1 0 1.8-.9 1.9-1.8L17 7.5" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8.3" y1="15" x2="15.7" y2="15" />
    </svg>
  );
}

const REWARD_ITEMS = [
  {
    title: "Buku",
    subtitle: "Buku Pilihan Redaksi",
    desc: "Buku bermutu pilihan redaksi yang memperkaya perspektif dan wawasan membaca.",
    icon: BookOpen,
  },
  {
    title: "Tumbler",
    subtitle: "Merchandise Eksklusif",
    desc: "Tumbler eksklusif Belokiri untuk menemani ngopi, nulis, dan diskusi harianmu.",
    icon: TumblerIcon,
  },
  {
    title: "Kaos Belokiri",
    subtitle: "Kaos Warga Belokan",
    desc: "Kaos sablon orisinal edisi Warga Belokan yang berkarakter dan berani bersikap.",
    icon: Shirt,
  },
];

const REWARD_RULES = [
  {
    text: (
      <>
        500 pembaca harus tercapai dalam{" "}
        <strong className="text-black font-black">maksimal 3 × 24 jam</strong> sejak tulisan dipublikasikan.
      </>
    ),
  },
  {
    text: (
      <>
        Jumlah pembaca mengacu pada{" "}
        <strong className="text-black font-black">data pembaca yang tercatat pada sistem Belokiri</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        Satu tulisan hanya mendapatkan{" "}
        <strong className="text-black font-black">satu reward</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        Reward diberikan kepada{" "}
        <strong className="text-black font-black">penulis yang terdaftar sebagai Warga Belokan</strong> dan mengirimkan tulisan tersebut.
      </>
    ),
  },
  {
    text: (
      <>
        Jenis, desain, ukuran, atau pilihan produk reward mengikuti{" "}
        <strong className="text-black font-black">stok yang tersedia</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        Jika reward pilihan sedang tidak tersedia, Warga Belokan dapat memilih reward lain yang tersedia.
      </>
    ),
  },
  {
    text: (
      <>
        Keputusan redaksi terkait validasi pencapaian pembaca dan pemberian reward bersifat final.
      </>
    ),
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

export default async function KirimTulisanPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site";
  const { page, isCustom } = await getCustomPageAction("kirim-tulisan");

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
          <span>{page.badge || "Ruang Kontributor • Warga Belokan"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-base sm:text-xl font-black text-red-600 uppercase tracking-wide max-w-2xl mx-auto">
            {page.subtitle}
          </p>
        )}

        <div className="w-24 h-1 bg-black mx-auto mt-4" />
      </header>

      {isCustom ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
          <div
            className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-base sm:text-lg
              [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:border-l-4 [&_h2]:border-red-600 [&_h2]:pl-4 [&_h2]:py-0.5 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-black [&_h3]:uppercase [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:font-normal
              [&_blockquote]:my-6 [&_blockquote]:p-5 sm:[&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-zinc-50 [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:text-black [&_blockquote]:font-bold [&_blockquote]:text-base sm:[&_blockquote]:text-lg
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
      <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" />
            <span>Apresiasi Warga Belokan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black uppercase tracking-tight">
            Reward Bagi Warga Belokan
          </h2>
          <h3 className="text-lg sm:text-xl font-black text-red-600 tracking-tight">
            Tulisanmu dibaca 500 orang dalam 3 hari? Ada hadiahnya.
          </h3>
        </div>

        <div className="space-y-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
          <p>
            Kami tahu, menulis itu kadang lebih melelahkan daripada membaca komentar orang yang tidak membaca tulisan kita.
          </p>
          <p>
            Makanya, Belokiri ingin memberi apresiasi buat{" "}
            <strong className="text-black font-black">Warga Belokan</strong> yang tulisannya berhasil mengundang banyak pembaca.
          </p>
          <p>
            Jika tulisanmu mencapai{" "}
            <strong className="text-black font-black bg-yellow-100 px-2 py-0.5 rounded">
              500 pembaca dalam waktu 3 hari sejak dipublikasikan di Belokiri
            </strong>
            , kamu berhak mendapatkan reward berupa:
          </p>
        </div>

        {/* Reward Items Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REWARD_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-black hover:bg-white hover:shadow-lg transition-all space-y-4 group relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded uppercase tracking-wider">
                      Opsi 0{i + 1}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      Klaim 1 Reward
                    </span>
                  </div>

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border-2 border-zinc-200 text-zinc-900 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-7 h-7 stroke-[1.8]" />
                  </div>

                  <div className="space-y-1 text-center">
                    <h4 className="text-lg font-black text-black uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-black text-red-600 uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-zinc-600 font-normal leading-relaxed pt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200/60 text-center">
                  <span className="text-[11px] font-bold text-zinc-400 group-hover:text-black transition-colors">
                    Tersedia untuk Warga Belokan
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Humorous Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white space-y-4 border-l-4 border-yellow-400">
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Tidak perlu jadi penulis terkenal. Tidak perlu punya ribuan followers.
          </p>
          <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
            Cukup bikin tulisan yang membuat orang berhenti scroll, lalu berpikir:
          </p>
          <div className="text-2xl sm:text-3xl font-black text-yellow-400 tracking-tight italic">
            &ldquo;Eh, ini menarik juga.&rdquo;
          </div>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Karena kalau mantan saja bisa bikin orang kepo berhari-hari, masa tulisanmu nggak bisa bikin 500 orang penasaran?
          </p>
          <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-base sm:text-lg font-black text-red-500 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Tulis. Kirim. Bikin ramai.</span>
            </span>
            <span className="text-xs sm:text-sm text-zinc-400 font-medium">
              Siapa tahu tulisanmu berikutnya yang tembus{" "}
              <strong className="text-white font-bold">500 pembaca dalam 3 hari.</strong>
            </span>
          </div>
        </div>

        {/* Section Mekanisme Pemilihan Reward */}
        <div className="pt-8 border-t border-zinc-200 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-black uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span>Mekanisme Reward</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Mekanisme Pemilihan Reward
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed">
              Setiap tulisan Warga Belokan yang berhasil mencapai{" "}
              <strong className="text-black font-black">
                500 pembaca dalam waktu 3 hari sejak dipublikasikan
              </strong>{" "}
              berhak mendapatkan <strong className="text-red-600 font-black">1 (satu) reward</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
            <h4 className="text-base font-black text-black uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Pilih Hadiahmu</span>
            </h4>
            <p className="text-sm text-zinc-700 leading-relaxed font-normal">
              Warga Belokan yang berhasil mencapai target dapat{" "}
              <strong className="text-black font-bold">memilih sendiri satu jenis reward</strong> yang diinginkan:
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-900 shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                <span>Buku Pilihan</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-900 shadow-2xs">
                <TumblerIcon className="w-3.5 h-3.5 text-red-600" />
                <span>Tumbler Eksklusif</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-900 shadow-2xs">
                <Shirt className="w-3.5 h-3.5 text-red-600" />
                <span>Kaos Belokiri</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal pt-2">
              Pilihan reward dilakukan setelah tulisan dinyatakan memenuhi target oleh meja redaksi.
            </p>
          </div>

          {/* Catatan Ketentuan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>Catatan:</span>
            </h4>
            <ul className="space-y-2.5">
              {REWARD_RULES.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{rule.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Closing Punchline Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white text-center shadow-sm">
            <p className="text-base sm:text-lg font-black tracking-tight">
              &ldquo;Tulisannya ramai, hadiahnya menyusul.&rdquo; 😎
            </p>
          </div>
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
        </>
      )}

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
