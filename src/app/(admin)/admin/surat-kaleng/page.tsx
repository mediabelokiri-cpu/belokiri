"use client";

import { useState } from "react";
import {
  Inbox,
  Star,
  CheckCircle,
  Trash2,
  Mail,
  MailOpen,
  Calendar,
  AlertCircle,
  MessageSquare,
  Search,
} from "lucide-react";
import { SuratKalengItem } from "@/lib/data/site-settings";

export default function AdminSuratKalengPage() {
  const [letters, setLetters] = useState<SuratKalengItem[]>([
    {
      id: "sk-1",
      namaSamaran: "Anonim Senja Warkop",
      isiSurat:
        "Tolong bahas tuntas soal kenaikan pajak rokok linting dan dampaknya ke warung-warung kopi kecil di kampung. Kami makin terjepit dengan serbuan ritel modern berjejaring.",
      createdAt: "2026-09-24T08:30:00Z",
      isRead: false,
      isStarred: true,
    },
    {
      id: "sk-2",
      namaSamaran: "Buruh Desain Lepas",
      isiSurat:
        "Terima kasih rubrik Ordal-nya tajam sekali. Akhirnya ada media yang berani buka-bukaan soal praktik oligarki pengadaan aplikasi pemerintah yang anggarannya fantastis tapi hasilnya mubazir.",
      createdAt: "2026-09-23T14:15:00Z",
      isRead: true,
      isStarred: false,
    },
    {
      id: "sk-3",
      namaSamaran: "Warga Pinggiran Rel",
      isiSurat:
        "Bahas isu penggusuran lahan sempadan rel di kota satelit dong min, jangan cuma ributin pilkada doang! Suara kami di kampung tidak pernah sampai ke meja bupati.",
      createdAt: "2026-09-22T19:40:00Z",
      isRead: true,
      isStarred: true,
    },
    {
      id: "sk-4",
      namaSamaran: "Mahasiswa Semester Tua",
      isiSurat:
        "Rubrik Sedikit Akademis sangat membantu saya memahami konsep hegemoni Gramsci tanpa harus pusing baca buku tebal berbahasa rumit. Terus menyala agen belokan!",
      createdAt: "2026-09-21T11:20:00Z",
      isRead: false,
      isStarred: false,
    },
  ]);

  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "STARRED">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleRead = (id: string) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isRead: !l.isRead } : l))
    );
  };

  const toggleStar = (id: string) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isStarred: !l.isStarred } : l))
    );
  };

  const deleteLetter = (id: string) => {
    if (confirm("Hapus surat kaleng ini dari arsip?")) {
      setLetters((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const filteredLetters = letters.filter((l) => {
    if (filter === "UNREAD" && l.isRead) return false;
    if (filter === "STARRED" && !l.isStarred) return false;
    if (
      searchTerm &&
      !l.namaSamaran.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !l.isiSurat.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const unreadCount = letters.filter((l) => !l.isRead).length;
  const starredCount = letters.filter((l) => l.isStarred).length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            KOTAK SUARA RAKYAT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-2">
            Kotak Masuk Surat Kaleng Warga
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
            Kritik, saran, ocehan, dan aspirasi anonim dari warga yang dikirimkan melalui form footer.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Belum Dibaca
            </span>
            <span className="text-lg font-black text-red-600">{unreadCount}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Berbintang
            </span>
            <span className="text-lg font-black text-amber-500">{starredCount}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-xs text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Total Surat
            </span>
            <span className="text-lg font-black text-black">{letters.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "ALL", label: `Semua (${letters.length})` },
            { id: "UNREAD", label: `Belum Dibaca (${unreadCount})` },
            { id: "STARRED", label: `Berbintang (${starredCount})` },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filter === item.id
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari pengirim atau isi surat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-medium focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
          />
        </div>
      </div>

      {/* Letters List */}
      <div className="space-y-4">
        {filteredLetters.length === 0 ? (
          <div className="p-12 text-center bg-white border border-zinc-200 rounded-3xl space-y-3">
            <MessageSquare className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-black uppercase text-zinc-700">
              Tidak Ada Surat Kaleng
            </h3>
            <p className="text-xs text-zinc-400">
              Belum ada pesan yang cocok dengan kriteria filter saat ini.
            </p>
          </div>
        ) : (
          filteredLetters.map((letter) => (
            <div
              key={letter.id}
              className={`p-6 rounded-3xl border transition-all ${
                letter.isRead
                  ? "bg-white border-zinc-200"
                  : "bg-red-50/20 border-red-200 ring-1 ring-red-500/20 shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 text-white font-black text-xs uppercase tracking-wider">
                      {letter.namaSamaran}
                    </span>
                    {!letter.isRead && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                        BARU
                      </span>
                    )}
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {new Date(letter.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-800 leading-relaxed font-normal pt-1">
                    &ldquo;{letter.isiSurat}&rdquo;
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => toggleStar(letter.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      letter.isStarred
                        ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                        : "text-zinc-400 hover:text-amber-500 hover:bg-zinc-100"
                    }`}
                    title={letter.isStarred ? "Hapus Bintang" : "Tandai Berbintang"}
                  >
                    <Star className={`w-4 h-4 ${letter.isStarred ? "fill-amber-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => toggleRead(letter.id)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-red-600 hover:bg-zinc-100 transition-colors"
                    title={letter.isRead ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                  >
                    {letter.isRead ? (
                      <MailOpen className="w-4 h-4" />
                    ) : (
                      <Mail className="w-4 h-4 text-red-600" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteLetter(letter.id)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-zinc-100 transition-colors"
                    title="Hapus Surat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
