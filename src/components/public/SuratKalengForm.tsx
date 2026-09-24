"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitSuratKalengAction } from "@/actions/surat-kaleng.actions";

export default function SuratKalengForm() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesan.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await submitSuratKalengAction({
        namaSamaran: nama.trim() || undefined,
        isiSurat: pesan.trim(),
      });

      if (res.success) {
        setSent(true);
      } else {
        setErrorMessage(res.error || "Gagal mengirim surat. Silakan coba lagi.");
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black uppercase text-white tracking-wider">
            Surat Kaleng Terkirim!
          </p>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
            Terima kasih, <span className="text-white font-bold">{nama || "Warga Belokan"}</span>.
            Unek-unekmu telah tersimpan aman dan mendarat di meja redaksi BELOKIRI.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setNama("");
            setPesan("");
            setErrorMessage(null);
          }}
          className="text-[11px] font-bold text-red-500 hover:text-red-400 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Kirim Surat Lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="font-medium text-[11px]">{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
          Nama Samaran <span className="text-zinc-500 font-normal">(opsional)</span>
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="cth. Anonim Senja Warkop"
          maxLength={60}
          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-xs text-white placeholder-zinc-600 transition-all font-medium"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
          Isi Surat Kaleng <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tumpahkan unek-unek, saran, atau kritikmu di sini..."
          maxLength={3000}
          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-xs text-white placeholder-zinc-600 transition-all font-medium resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !pesan.trim()}
        className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{loading ? "Menyimpan ke Redaksi..." : "Kirim Surat Kaleng"}</span>
      </button>
    </form>
  );
}
