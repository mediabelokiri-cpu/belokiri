import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Megaphone,
  Calendar,
  PenTool,
  Coffee,
  Eye,
  Archive,
  BookOpen,
  Feather,
  Scale,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kabinet Belokiri | Struktur Dewan & Agen Belokan",
  description:
    "Susunan struktur organisasi dan dewan agen BELOKIRI: Ketua RT, Bendahara RT, Pimpinan Redaksi, Agen Agitasi & Propaganda, Agen Program, hingga Agen Penjaga 8 Rubrik.",
};

export default function KabinetBelokiriPage() {
  const pimpinan = [
    {
      role: "Ketua RT Belokan",
      title: "Pamong Warga & Kepala Lingkungan Gagasan",
      desc: "Menjaga keharmonisan pertikaian intelektual warga belokan, mengesahkan maklumat darurat, dan memastikan ronda malam akal sehat tetap berjalan.",
      icon: UserCheck,
      color: "bg-red-50 border-red-200 text-red-600",
    },
    {
      role: "Bendahara RT Belokan",
      title: "Juru Kunci Kas & Dapur Logistik",
      desc: "Mengelola iuran sukarela, subsidi kopi warkop sachet, transparansi kas recehan, dan menjamin dapur redaksi tidak pernah kehabisan gula dan rokok.",
      icon: Scale,
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      role: "Pimpinan Redaksi",
      title: "Kurator Utama & Penjaga Ketajaman Sudut Pandang",
      desc: "Menentukan arah kurasi naskah, mencoret kalimat basa-basi birokratis, menolak intervensi kepentingan kekuasaan, dan berani menanggung risiko tulisan.",
      icon: PenTool,
      color: "bg-zinc-100 border-zinc-300 text-black",
    },
    {
      role: "Agen Agitasi & Propaganda",
      title: "Pemicu Percakapan & Penyebar Pamflet Digital",
      desc: "Mengemas narasi perlawanan menjadi visual jenaka nan tajam, mengguncang kenyamanan linimasa, dan membakar semangat pembangkangan kritis warga.",
      icon: Megaphone,
      color: "bg-red-50 border-red-200 text-red-600",
    },
    {
      role: "Agen Program",
      title: "Penggerak Meja Warkop & Aksi Lapangan",
      desc: "Mengorganisir lapak baca mandiri Literatur Liberte, bedah opini akar rumput di warung-warung kopi pinggiran, serta menjalin aliansi antar-komunitas.",
      icon: Calendar,
      color: "bg-zinc-100 border-zinc-300 text-zinc-800",
    },
  ];

  const rubrikAgents = [
    {
      rubrik: "BERISIK",
      focus: "Esai Populer Politik, Ekonomi & Sosial Kritis",
      desc: "Menyaring artikel-artikel bervolume tinggi yang membongkar kemunafikan kebijakan dan ketimpangan struktural.",
      icon: Megaphone,
    },
    {
      rubrik: "MEJA WARKOP",
      focus: "Analisis Budaya & Percakapan Tongkrongan",
      desc: "Mencatat dialektika meja warung kopi: obrolan santai, satire pinggir jalan, dan keresahan rakyat sehari-hari.",
      icon: Coffee,
    },
    {
      rubrik: "ORDAL",
      focus: "Membongkar Dinamika Kuasa, Kebijakan & Elite",
      desc: "Mengendus manuver orang dalam, relasi oligarki, dan kroni kekuasaan di balik panggung seremonial.",
      icon: Eye,
    },
    {
      rubrik: "ARSIP PINGGIRAN",
      focus: "Sejarah Rakyat, Kaum Buruh & Marjinal",
      desc: "Menggali memori kolektif yang sengaja ditenggelamkan historiografi resmi penguasa.",
      icon: Archive,
    },
    {
      rubrik: "SEDIKIT AKADEMIS",
      focus: "Filsafat & Teori Kritis Tanpa Jargon Rumit",
      desc: "Membumikan gagasan para filsuf dan pemikir kiri agar bisa dipahami sambil menyeruput kopi hitam.",
      icon: BookOpen,
    },
    {
      rubrik: "SISA BAHASA",
      focus: "Puisi, Prosa, Fragmen & Sastra Emosional",
      desc: "Merawat kepekaan rasa dan estetika kata ketika kalimat berita kehilangan daya gugahnya.",
      icon: Feather,
    },
    {
      rubrik: "SETARA",
      focus: "Isu Perempuan, Gender & Keadilan Sosial",
      desc: "Mengawal ruang aman, keadilan gender, dan perjuangan kelompok rentan yang kerap dikesampingkan.",
      icon: Scale,
    },
    {
      rubrik: "SERIAL ANABEL",
      focus: "Serial Fiksi Satir & Parodi Mingguan",
      desc: "Menertawakan realitas politik yang lebih absurd daripada fiksi melalui serial cerita berkala.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 font-sans">
      {/* Header */}
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          STRUKTUR DEWAN & AGEN BELOKAN
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          KABINET BELOKIRI
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
          Di BELOKIRI, kami tidak mengenal hierarki feodal kantor media komersial. Kami bekerja
          layaknya rukun tetangga independen: tempat gagasan diuji, kas dipertanggungjawabkan,
          dan setiap agen memegang tanggung jawab penuh atas rubriknya.
        </p>
      </header>

      {/* 1. Jajaran Inti Pimpinan RT & Komando Redaksi */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-red-600">
          <Users className="w-5 h-5 text-red-600" />
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
            1. Pucuk Pimpinan RT & Komando Gerakan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pimpinan.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-zinc-400 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-wider ${item.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.role}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase text-black tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-normal leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <span>Status: Aktif Membina</span>
                  <span className="text-red-600">Dewan Belokan</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Agen-Agen Penjaga Setiap Rubrik */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
          <ShieldCheck className="w-5 h-5 text-red-600" />
          <div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
              2. Agen-Agen Penjaga Setiap Rubrik
            </h2>
            <p className="text-xs text-zinc-500 font-normal">
              Kurator garis depan yang membedah, mengedit, dan menerbitkan naskah warga di masing-masing kanal:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rubrikAgents.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.rubrik}
                className="bg-zinc-50 border border-zinc-200 hover:border-red-600 rounded-2xl p-5 transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                      AGEN
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase text-black tracking-tight group-hover:text-red-600 transition-colors">
                      Rubrik {item.rubrik}
                    </h3>
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-tight mt-0.5">
                      {item.focus}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  <Link href={`/kategori/${item.rubrik.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                    Periksa Rubrik →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Call to Action Rekrutmen */}
      <section className="bg-red-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-red-600 bg-white px-3 py-1 rounded-full">
          PANGGILAN DINI HARI
        </span>
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Ingin Mengisi Posisi Agen Belokan?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 font-normal leading-relaxed">
            Dewan Belokan selalu membuka pintu bagi agen baru: dari mengurusi rubrik,
            kampanye propaganda, hingga menulis untuk keabadian.
          </p>
        </div>
        <div>
          <Link
            href="/rekrutmen/form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-red-600 hover:bg-black hover:text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all transform active:scale-95"
          >
            <span>Isi Form Rekrutmen Agen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
