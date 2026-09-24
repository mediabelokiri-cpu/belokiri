import { Metadata } from "next";
import Link from "next/link";
import { Users, Send, CheckCircle2, Mail, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Rekrutmen Anggota & Penulis | BELOKIRI",
  description:
    "Belokiri.id membuka ruang bagi mahasiswa dan anak muda yang merasa dunia hari ini terlalu ramai oleh kepalsuan, tetapi terlalu sepi oleh keberanian.",
};

export default function RekrutmenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 font-sans">
      {/* Top Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest">
          <Users className="w-3.5 h-3.5" />
          <span>Panggilan Terbuka</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          Rekrutmen Belokiri
        </h1>

        <p className="text-base sm:text-lg font-bold text-zinc-600 max-w-xl mx-auto">
          Membangun ruang belajar, ruang berpikir, dan ruang bertumbuh bagi mereka yang mau mempertanyakan keadaan.
        </p>

        <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
      </header>

      {/* Main Narrative Content */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-zinc-900 leading-relaxed">
        <div className="space-y-5 text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
          <p className="text-xl sm:text-2xl font-black text-black border-l-4 border-red-600 pl-4 py-1 leading-snug">
            Belokiri.id membuka ruang bagi mahasiswa dan anak muda yang merasa dunia hari ini terlalu ramai oleh kepalsuan, tetapi terlalu sepi oleh keberanian.
          </p>
          <p>
            Kami mencari mereka yang masih punya kegelisahan, yang tidak mudah puas dengan narasi resmi, dan yang percaya bahwa tulisan bisa menjadi lebih dari sekadar konten. Di tengah budaya media yang makin sibuk mengejar algoritma dan sensasi instan, Belokiri.id justru ingin membangun ruang belajar, ruang berpikir, dan ruang bertumbuh bagi orang-orang yang mau mempertanyakan keadaan.
          </p>
          <p>
            Rekrutmen ini bukan ajang mencari penulis yang paling rapi atau paling akademis. Kami lebih tertarik pada cara seseorang memandang realitas: apakah ia cukup peka melihat ketimpangan di sekitarnya, cukup kritis membaca kepentingan di balik informasi, dan cukup jujur untuk menulis tanpa terus-menerus menyenangkan semua orang. Sebab bagi kami, tulisan yang hidup lahir dari keberanian berpikir, bukan dari kalimat yang aman. Belokiri.id percaya bahwa anak muda tidak seharusnya hanya menjadi konsumen narasi, tetapi juga pembuat arah percakapan.
          </p>
        </div>

        {/* Highlight Card: Laboratorium Kegelisahan */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>Laboratorium Kegelisahan & Produksi Narasi</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-zinc-700 font-normal leading-relaxed">
            <p>
              Sebagai bagian dari Belokiri.id, anggota tidak hanya akan belajar menulis, tetapi juga belajar membedah isu, memahami framing media, melakukan riset, hingga mengolah kegelisahan menjadi karya yang punya posisi. Kami ingin membangun ekosistem yang cair namun bertanggung jawab: tempat ide bisa diperdebatkan, tulisan bisa dipatahkan lalu dibangun ulang, dan kritik tidak dianggap ancaman. Karena media alternatif tidak lahir dari kenyamanan, melainkan dari keberanian untuk tetap berpikir ketika banyak orang memilih diam.
            </p>
            <p>
              Belokiri.id adalah ruang bagi mereka yang sama liarnya, liar dalam cara melihat dunia, tetapi tetap sadar bahwa setiap tulisan membawa konsekuensi. Jika kamu merasa terlalu sering gelisah melihat keadaan, terlalu sering mempertanyakan hal-hal yang dianggap normal, atau terlalu sering merasa “tidak cocok” dengan cara media bekerja hari ini, mungkin kamu memang sedang mencari ruang yang sama. Di sini, kita tidak sedang membangun tempat yang sempurna. Kita hanya sedang mencoba memastikan bahwa narasi tidak sepenuhnya dimiliki mereka yang berkuasa.
            </p>
          </div>
        </div>

        {/* Nilai Yang Dicari */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center gap-2 font-black text-sm text-black uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Sensitivitas Realitas</span>
            </div>
            <p className="text-xs text-zinc-600 font-normal">Peka menangkap isu rakyat, ketimpangan sosial, dan kegaduhan yang nyata.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center gap-2 font-black text-sm text-black uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Keberanian Posisi</span>
            </div>
            <p className="text-xs text-zinc-600 font-normal">Menulis dengan sikap dan keberpihakan, bukan sekadar kalimat aman pencitraan.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center gap-2 font-black text-sm text-black uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Keterbukaan Belajar</span>
            </div>
            <p className="text-xs text-zinc-600 font-normal">Siap berdiskusi, dibedah gagasannya, dan mengasah ketajaman analisis bersama.</p>
          </div>
        </div>
      </div>

      {/* Cara Mendaftar & Kontak (Red Theme CTA) */}
      <section className="bg-red-600 text-white rounded-3xl p-8 sm:p-12 border-t-4 border-red-700 shadow-xl space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-100 bg-red-700/80 px-3.5 py-1 rounded-full mb-1">
            PROSEDUR PENGIRIMAN BERKAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            Bagaimana Cara Bergabung?
          </h2>
          <p className="text-xs sm:text-sm text-red-100/90 font-normal max-w-2xl leading-relaxed">
            Kirimkan perkenalan singkat dirimu, alasan tertarik bergabung dengan Belokiri.id, serta 1 contoh tulisan (esai, opini warkop, catatan lapangan, atau kritik isu terkini minimal 500 kata).
          </p>
        </div>

        {/* Primary CTA: Tombol Putih "ISI FORM AGEN" */}
        <div className="p-6 sm:p-8 rounded-2xl bg-red-700/60 border border-red-500/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-200">
              Jalur Pendaftaran Resmi Online
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Formulir Pendaftaran Agen Belokan
            </h3>
            <p className="text-xs sm:text-sm text-red-100 font-normal max-w-md">
              Isi biodata calon agen dan lampirkan draf naskah tulisanmu langsung ke sistem seleksi redaksi.
            </p>
          </div>
          <Link
            href="/rekrutmen/form"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-zinc-100 text-red-600 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform active:scale-95 shrink-0"
          >
            <span>Isi Form Agen</span>
            <ArrowRight className="w-4 h-4 text-red-600" />
          </Link>
        </div>

        {/* Secondary Options: Email & Warga Belokan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-red-700/40 border border-red-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-red-200 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Kirim Melalui Surel</span>
            </div>
            <p className="text-sm font-bold text-white">rekrutmen@belokiri.id</p>
            <p className="text-xs text-red-200 font-normal">
              Subjek: <code className="bg-red-800/60 px-1.5 py-0.5 rounded text-[11px]">[REKRUTMEN-BELOKIRI] Nama - Kota</code>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-700/40 border border-red-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-red-200 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Atau Tulis Lepas di Portal</span>
            </div>
            <p className="text-xs text-red-100 font-normal">
              Kamu juga bisa langsung mendaftar sebagai Warga Belokan untuk mengirimkan naskah lepas.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:underline pt-1"
            >
              <span>Masuk ke Meja Warga Belokan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
