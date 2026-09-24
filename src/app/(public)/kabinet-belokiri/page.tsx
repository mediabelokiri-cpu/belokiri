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
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { defaultKabinetMembers } from "@/lib/data/site-settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kabinet Belokiri | Struktur Dewan & Agen Belokan",
  description:
    "Susunan struktur organisasi dan dewan agen BELOKIRI: Ketua RT, Bendahara RT, Pimpinan Redaksi, Agen Agitasi & Propaganda, Agen Program, hingga Agen Penjaga 8 Rubrik lengkap dengan foto profil.",
};

function getPimpinanMeta(role: string) {
  const r = role.toLowerCase();
  if (r.includes("ketua rt")) {
    return { icon: UserCheck, color: "bg-red-50 border-red-200 text-red-600" };
  }
  if (r.includes("bendahara")) {
    return { icon: Scale, color: "bg-amber-50 border-amber-200 text-amber-700" };
  }
  if (r.includes("pemred") || r.includes("redaksi")) {
    return { icon: PenTool, color: "bg-zinc-100 border-zinc-300 text-black" };
  }
  if (r.includes("propaganda") || r.includes("agitasi")) {
    return { icon: Megaphone, color: "bg-red-50 border-red-200 text-red-600" };
  }
  if (r.includes("program")) {
    return { icon: Calendar, color: "bg-zinc-100 border-zinc-300 text-zinc-800" };
  }
  return { icon: Users, color: "bg-zinc-100 border-zinc-300 text-black" };
}

function getRubrikIcon(rubrik?: string) {
  const r = (rubrik || "").toLowerCase();
  if (r.includes("berisik")) return Megaphone;
  if (r.includes("warkop")) return Coffee;
  if (r.includes("ordal")) return Eye;
  if (r.includes("arsip")) return Archive;
  if (r.includes("akademis")) return BookOpen;
  if (r.includes("bahasa")) return Feather;
  if (r.includes("setara")) return Scale;
  if (r.includes("anabel")) return Sparkles;
  return PenTool;
}

export default async function KabinetBelokiriPage() {
  const res = await getSiteSettingsAction();
  const allMembers =
    res.kabinet && res.kabinet.length > 0 ? res.kabinet : defaultKabinetMembers;

  const activeMembers = allMembers.filter((m) => m.status === "AKTIF");
  const pimpinan = activeMembers.filter((m) => m.category === "PIMPINAN");
  const rubrikAgents = activeMembers.filter((m) => m.category === "AGEN_RUBRIK");

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
            const meta = getPimpinanMeta(item.role);
            const Icon = meta.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-zinc-400 hover:shadow-md transition-all space-y-5"
              >
                <div className="space-y-4">
                  {/* Photo & Role Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-zinc-200 shrink-0 shadow-xs bg-zinc-100">
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
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${meta.color}`}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.role}</span>
                      </span>
                      <h3 className="text-base font-black uppercase text-black tracking-tight leading-snug">
                        {item.name}
                      </h3>
                      {item.alias && (
                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight">
                          alias &ldquo;{item.alias}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    {item.title && (
                      <h4 className="text-xs font-black uppercase text-zinc-800 tracking-tight">
                        {item.title}
                      </h4>
                    )}
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
            const Icon = getRubrikIcon(item.rubrik);
            const rubrikSlug = item.rubrik
              ? item.rubrik.toLowerCase().replace(/\s+/g, "-")
              : "berisik";

            return (
              <div
                key={item.id}
                className="bg-zinc-50 border border-zinc-200 hover:border-red-600 rounded-3xl p-5 transition-all group flex flex-col justify-between space-y-4 hover:shadow-md hover:bg-white"
              >
                <div className="space-y-3">
                  {/* Photo & Badge */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-zinc-200 group-hover:border-red-600 transition-colors shrink-0 shadow-xs bg-zinc-100">
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
                      {item.alias && (
                        <p className="text-[10px] text-zinc-400 font-bold uppercase truncate">
                          &ldquo;{item.alias}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {item.rubrik && (
                      <h4 className="text-xs font-black uppercase text-zinc-900 tracking-tight group-hover:text-red-600 transition-colors">
                        Rubrik {item.rubrik}
                      </h4>
                    )}
                    {item.focus && (
                      <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-tight mt-0.5 leading-snug">
                        {item.focus}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center justify-between">
                  <Link
                    href={`/kategori/${rubrikSlug}`}
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
