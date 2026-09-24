"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function SuratKalengForm() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 500);
  };

  if (sent) {
    return (
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3 text-center">
        <div className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black uppercase text-white tracking-wider">
            Surat Kaleng Terkirim!
          </p>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
            Terima kasih, <span className="text-white font-bold">{nama || "Warga Belokan"}</span>.
            Unek-unekmu telah mendarat di meja redaksi.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setNama("");
            setPesan("");
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
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
          Nama Samaran <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="cth. Anonim Senja"
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
          placeholder="Tumpahkan unek-unek, saran, atau caci makimu di sini..."
          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-xs text-white placeholder-zinc-600 transition-all font-medium resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{loading ? "Melempar Surat..." : "Kirim Surat Kaleng"}</span>
      </button>
    </form>
  );
}
