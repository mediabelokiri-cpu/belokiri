import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    "Susunan struktur organisasi dan dewan agen BELOKIRI: Ketua RT, Bendahara RT, Pimpinan Redaksi, Agen Agitasi & Propaganda, Agen Program, hingga Agen Penjaga 8 Rubrik lengkap dengan foto profil.",
};

export default function KabinetBelokiriPage() {
  const pimpinan = [
    {
      name: "Mbah Broto",
      alias: "Pak RT Warkop",
      role: "Ketua RT Belokan",
      title: "Pamong Warga & Kepala Lingkungan Gagasan",
      desc: "Menjaga keharmonisan pertikaian intelektual warga belokan, mengesahkan maklumat darurat, dan memastikan ronda malam akal sehat tetap berjalan.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      icon: UserCheck,
      color: "bg-red-50 border-red-200 text-red-600",
    },
    {
      name: "Ibu Ratna Susanti",
      alias: "Juru Kunci Dapur",
      role: "Bendahara RT Belokan",
      title: "Juru Kunci Kas & Logistik Kopi",
      desc: "Mengelola iuran sukarela, subsidi kopi warkop sachet, transparansi kas recehan, dan menjamin dapur redaksi tidak pernah kehabisan gula.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      icon: Scale,
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      name: "Arya Wicaksono",
      alias: "Pena Belokan",
      role: "Pimpinan Redaksi",
      title: "Kurator Utama & Penjaga Ketajaman",
      desc: "Menentukan arah kurasi naskah, mencoret kalimat basa-basi birokratis, menolak intervensi kepentingan kekuasaan, dan bertanggung jawab penuh.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      icon: PenTool,
      color: "bg-zinc-100 border-zinc-300 text-black",
    },
    {
      name: "Gilang Perkasa",
      alias: "Si Pamflet",
      role: "Agen Agitasi & Propaganda",
      title: "Pemicu Percakapan & Pamflet Digital",
      desc: "Mengemas narasi perlawanan menjadi visual jenaka nan tajam, mengguncang kenyamanan linimasa, dan membakar semangat pembangkangan kritis warga.",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      icon: Megaphone,
      color: "bg-red-50 border-red-200 text-red-600",
    },
    {
      name: "Dian Paramita",
      alias: "Mbak Lapangan",
      role: "Agen Program",
      title: "Penggerak Meja Warkop & Aksi Warga",
      desc: "Mengorganisir lapak baca mandiri Literatur Liberte, bedah opini akar rumput di warung kopi pinggiran, serta menjalin aliansi antar-komunitas.",
      photo: "https://images.unsplash.com/photo-1534751516642-a171ed28a0e5?auto=format&fit=crop&w=400&q=80",
      icon: Calendar,
      color: "bg-zinc-100 border-zinc-300 text-zinc-800",
    },
  ];

  const rubrikAgents = [
    {
      name: "Fajar Nugroho",
      alias: "Penggedor Pintu",
      rubrik: "BERISIK",
      focus: "Esai Populer Politik, Ekonomi & Sosial Kritis",
      desc: "Menyaring artikel-artikel bervolume tinggi yang membongkar kemunafikan kebijakan dan ketimpangan struktural.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      icon: Megaphone,
    },
    {
      name: "Reza Mahendra",
      alias: "Juru Seduh",
      rubrik: "MEJA WARKOP",
      focus: "Analisis Budaya & Percakapan Tongkrongan",
      desc: "Mencatat dialektika meja warung kopi: obrolan santai, satire pinggir jalan, dan keresahan rakyat sehari-hari.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      icon: Coffee,
    },
    {
      name: "Bayu Kusuma",
      alias: "Mata Elang",
      rubrik: "ORDAL",
      focus: "Membongkar Dinamika Kuasa, Kebijakan & Elite",
      desc: "Mengendus manuver orang dalam, relasi oligarki, dan kroni kekuasaan di balik panggung seremonial.",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      icon: Eye,
    },
    {
      name: "Hendra Wijaya",
      alias: "Pencatat Sunyi",
      rubrik: "ARSIP PINGGIRAN",
      focus: "Sejarah Rakyat, Kaum Buruh & Marjinal",
      desc: "Menggali memori kolektif yang sengaja ditenggelamkan historiografi resmi penguasa.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      icon: Archive,
    },
    {
      name: "Dr. Danang Prabowo",
      alias: "Filsuf Kopi",
      rubrik: "SEDIKIT AKADEMIS",
      focus: "Filsafat & Teori Kritis Tanpa Jargon Rumit",
      desc: "Membumikan gagasan para filsuf dan pemikir kiri agar bisa dipahami sambil menyeruput kopi hitam.",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      icon: BookOpen,
    },
    {
      name: "Larasati Dewi",
      alias: "Pena Renjana",
      rubrik: "SISA BAHASA",
      focus: "Puisi, Prosa, Fragmen & Sastra Emosional",
      desc: "Merawat kepekaan rasa dan estetika kata ketika kalimat berita kehilangan daya gugahnya.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      icon: Feather,
    },
    {
      name: "Anisa Nurul",
      alias: "Suara Merdeka",
      rubrik: "SETARA",
      focus: "Isu Perempuan, Gender & Keadilan Sosial",
      desc: "Mengawal ruang aman, keadilan gender, dan perjuangan kelompok rentan yang kerap dikesampingkan.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      icon: Scale,
    },
    {
      name: "Joko Parodi",
      alias: "Pawang Satir",
      rubrik: "SERIAL ANABEL",
      focus: "Serial Fiksi Satir & Parodi Mingguan",
      desc: "Menertawakan realitas politik yang lebih absurd daripada fiksi melalui serial cerita berkala.",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
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
            1. Struktur Kabinet Belokan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pimpinan.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-zinc-400 hover:shadow-md transition-all space-y-5"
              >
                <div className="space-y-4">
                  {/* Photo & Role Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-zinc-200 shrink-0 shadow-xs">
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${item.color}`}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.role}</span>
                      </span>
                      <h3 className="text-base font-black uppercase text-black tracking-tight leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight">
                        alias &ldquo;{item.alias}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h4 className="text-xs font-black uppercase text-zinc-800 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-600 font-normal leading-relaxed mt-1.5">
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
                className="bg-zinc-50 border border-zinc-200 hover:border-red-600 rounded-3xl p-5 transition-all group flex flex-col justify-between space-y-4 hover:shadow-md hover:bg-white"
              >
                <div className="space-y-3">
                  {/* Photo & Badge */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-zinc-200 group-hover:border-red-600 transition-colors shrink-0 shadow-xs">
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="52px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 mb-1">
                        <Icon className="w-2.5 h-2.5 text-red-600" />
                        <span>AGEN RUBRIK</span>
                      </span>
                      <h3 className="text-xs font-black uppercase text-black group-hover:text-red-600 transition-colors truncate">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase truncate">
                        &ldquo;{item.alias}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-zinc-900 tracking-tight group-hover:text-red-600 transition-colors">
                      Rubrik {item.rubrik}
                    </h4>
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-tight mt-0.5 leading-snug">
                      {item.focus}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center justify-between">
                  <Link
                    href={`/kategori/${item.rubrik.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>Jelajahi Rubrik</span>
                    <ArrowRight className="w-3 h-3" />
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
