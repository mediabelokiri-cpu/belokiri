"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

export default function FormRekrutmenPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    namaPena: "",
    email: "",
    whatsapp: "",
    domisili: "",
    institusi: "",
    minatRubrik: "BERISIK",
    alasan: "",
    judulNaskah: "",
    tautanNaskah: "",
    isiNaskah: "",
    setujuPernyataan: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center font-sans">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              BERKAS BERHASIL DITERIMA
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Formulir Agen Belokan Terkirim!
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Terima kasih, <strong className="text-black font-bold">{formData.namaLengkap}</strong>.
            Gagasan dan naskah perdanamu untuk rubrik{" "}
            <span className="font-mono font-bold text-red-600">[{formData.minatRubrik}]</span> telah
            masuk ke antrean kurasi Tim Dewan Belokan.
          </p>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 leading-relaxed text-left space-y-1">
            <p className="font-bold text-zinc-700">Tahapan Selanjutnya:</p>
            <p>1. Kurasi kelayakan sudut pandang dan orisinalitas naskah (3–5 hari kerja).</p>
            <p>2. Konfirmasi & undangan perbincangan awal via surel: <strong>{formData.email}</strong> atau WhatsApp.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/rekrutmen"
              className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider transition-colors"
            >
              Baca Panduan Rekrutmen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 font-sans">
      {/* Navigation Back */}
      <Link
        href="/rekrutmen"
        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-500 hover:text-red-600 transition-colors tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Panduan Rekrutmen</span>
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          FORMULIR SELEKSI ANGGOTA
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          Formulir Rekrutmen Agen Belokan
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
          Silakan isi formulir di bawah ini dengan jujur dan apa adanya. Kami lebih menghargai
          ketajaman sudut pandang dan keberanian berpikir daripada sekadar kalimat yang aman.
        </p>
      </header>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
      >
        {/* Section 1: Data Diri */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <h2 className="text-base font-black uppercase tracking-tight text-black">
              1. Identitas Calon Agen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Nama Lengkap <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaLengkap}
                onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                placeholder="cth. Arya Wicaksono"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Nama Pena / Alias <span className="text-zinc-400 font-normal lowercase">(opsional)</span>
              </label>
              <input
                type="text"
                value={formData.namaPena}
                onChange={(e) => setFormData({ ...formData, namaPena: e.target.value })}
                placeholder="cth. Arya W."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Alamat Surel (Email) <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Nomor WhatsApp / HP <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="0812xxxxxxxx"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Kota / Domisili <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.domisili}
                onChange={(e) => setFormData({ ...formData, domisili: e.target.value })}
                placeholder="cth. Makassar, Yogyakarta, Jakarta"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                Kampus / Komunitas / Profesi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.institusi}
                onChange={(e) => setFormData({ ...formData, institusi: e.target.value })}
                placeholder="cth. Mahasiswa Unhas / Peneliti Lepas"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Peminatan Rubrik */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <h2 className="text-base font-black uppercase tracking-tight text-black">
              2. Fokus Bidang & Rubrik Minat
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
              Pilih Rubrik yang Paling Cocok dengan Karaktermu <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.minatRubrik}
              onChange={(e) => setFormData({ ...formData, minatRubrik: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-semibold transition-all bg-white"
            >
              <option value="BERISIK">BERISIK — Esai Populer Politik, Ekonomi & Sosial Kritis</option>
              <option value="MEJA WARKOP">MEJA WARKOP — Analisis Budaya & Percakapan Tongkrongan Warga</option>
              <option value="ORDAL">ORDAL — Membongkar Dinamika Kuasa, Kebijakan & Elite</option>
              <option value="ARSIP PINGGIRAN">ARSIP PINGGIRAN — Sejarah Rakyat, Gerakan Buruh & Kaum Tani</option>
              <option value="SEDIKIT AKADEMIS">SEDIKIT AKADEMIS — Filsafat & Pemikiran Tanpa Bahasa Rumit</option>
              <option value="SISA BAHASA">SISA BAHASA — Puisi, Prosa, Fragmen & Sastra Emosional</option>
              <option value="SETARA">SETARA — Isu Perempuan, Gender & Keadilan Sosial</option>
              <option value="SERIAL ANABEL">SERIAL ANABEL — Serial Fiksi & Cerita Satir Mingguan</option>
              <option value="VISUAL / ILUSTRASI">DIVISI VISUAL — Ilustrator, Kartunis & Desain Opini</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Mengapa Tertarik Bergabung Bersama BELOKIRI? <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.alasan}
              onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
              placeholder="Ceritakan kegelisahanmu terhadap lanskap informasi saat ini dan apa yang ingin kamu suarakan..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Section 3: Lampiran Contoh Tulisan / Naskah */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <h2 className="text-base font-black uppercase tracking-tight text-black">
              3. Contoh Naskah / Tulisan Perdana
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Judul Contoh Naskah / Tulisan <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.judulNaskah}
              onChange={(e) => setFormData({ ...formData, judulNaskah: e.target.value })}
              placeholder="cth. Menertawakan Janji Manis Swasembada"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Isi Naskah Lengkap (Minimal 500 kata) <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={8}
              value={formData.isiNaskah}
              onChange={(e) => setFormData({ ...formData, isiNaskah: e.target.value })}
              placeholder="Tempelkan draf tulisan, opini warkop, atau catatan lapanganmu di sini..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all font-mono leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Tautan Dokumen / Portofolio Eksternal{" "}
              <span className="text-zinc-400 font-normal lowercase">(opsional, cth. Google Docs / Medium / Blog)</span>
            </label>
            <input
              type="url"
              value={formData.tautanNaskah}
              onChange={(e) => setFormData({ ...formData, tautanNaskah: e.target.value })}
              placeholder="https://docs.google.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Section 4: Persetujuan */}
        <div className="pt-2 border-t border-zinc-200">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={formData.setujuPernyataan}
              onChange={(e) => setFormData({ ...formData, setujuPernyataan: e.target.checked })}
              className="mt-1 w-4 h-4 text-red-600 border-zinc-300 rounded focus:ring-red-500 accent-red-600"
            />
            <span className="text-xs text-zinc-600 font-medium leading-relaxed">
              Saya menyatakan bahwa naskah yang dikirimkan adalah karya asli pemikiran saya sendiri, bukan hasil
              plagiasi, dan siap berdiskusi secara terbuka dalam ekosistem independen Belokiri.id.
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? "Mengirim Berkas..." : "Kirim Formulir Agen Belokan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
