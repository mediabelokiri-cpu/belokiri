"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  User,
  HelpCircle,
  CheckSquare,
  Globe2,
  Egg,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { submitRekrutmenAction } from "@/actions/rekrutmen.actions";

const FOKUS_OPTIONS = [
  "Mengurusi Rubrik",
  "Kampanye & Propaganda",
  "Menulis untuk Keabadian",
  "Terserah Nanti Saja",
];

export default function FormRekrutmenPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // IDENTITAS CALON AGEN
    namaLengkap: "",
    namaPena: "",
    whatsapp: "",
    email: "",
    domisili: "",
    institusi: "",

    // PERTANYAAN TAMBAHAN
    namaPresiden: "",
    kepercayaanBumi: "Bumi Bulat",
    ayamAtauTelur: "Ayam",
    alasanBergabung: "",

    // FOKUS BIDANG AGEN (pilihan jawaban, centang)
    fokusBidang: [] as string[],
  });

  const handleCheckboxToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.fokusBidang.includes(option);
      return {
        ...prev,
        fokusBidang: exists
          ? prev.fokusBidang.filter((item) => item !== option)
          : [...prev.fokusBidang, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fokusBidang.length === 0) {
      alert("Pilih minimal satu Fokus Bidang Agen!");
      return;
    }
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await submitRekrutmenAction(formData);
      if (res.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMsg(
          res.error || "Gagal mengirim formulir pendaftaran. Silakan coba lagi."
        );
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengirim formulir."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 font-sans">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              BERKAS TELAH DITERIMA
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Formulir Agen Belokan Terkirim!
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Terima kasih, <strong className="text-black font-bold">{formData.namaLengkap}</strong>
            {formData.namaPena ? ` (alias "${formData.namaPena}")` : ""}. Jawaban dan profilmu
            sudah diamankan oleh Dewan Belokan.
          </p>

          {/* Submission Recap */}
          <div className="text-left bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-4 text-xs">
            <h3 className="font-black uppercase tracking-wider text-black text-xs border-b border-zinc-200 pb-2">
              Ringkasan Data Formulir
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600">
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">No. WhatsApp</span>
                <span className="font-bold text-zinc-900">{formData.whatsapp}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Alamat Email</span>
                <span className="font-bold text-zinc-900">{formData.email}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Domisili</span>
                <span className="font-bold text-zinc-900">{formData.domisili}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Kampus / Komunitas / Profesi</span>
                <span className="font-bold text-zinc-900">{formData.institusi}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200 space-y-2">
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Nama Presidenmu</span>
                <span className="font-bold text-zinc-900">{formData.namaPresiden}</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Bumi Bulat / Datar</span>
                  <span className="font-bold text-red-600">{formData.kepercayaanBumi}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Ayam / Telur Duluan</span>
                  <span className="font-bold text-red-600">{formData.ayamAtauTelur}</span>
                </div>
              </div>
              <div>
                <span className="text-zinc-400 block font-semibold uppercase text-[10px]">Fokus Bidang Pilihan</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {formData.fokusBidang.map((fokus) => (
                    <span
                      key={fokus}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-900 text-white font-bold text-[11px]"
                    >
                      {fokus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
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
              Halaman Rekrutmen
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
          ketajaman sudut pandang dan keberanian bersikap daripada basa-basi birokratis.
        </p>
      </header>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-10"
      >
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-xs sm:text-sm font-bold">{errorMsg}</p>
          </div>
        )}
        {/* =========================================================================
            SECTION 1: IDENTITAS CALON AGEN
        ========================================================================= */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
            <User className="w-5 h-5 text-red-600" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-black">
              Identitas Calon Agen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
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
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                Nama Pena / Samaran <span className="text-zinc-400 font-normal lowercase">(opsional)</span>
              </label>
              <input
                type="text"
                value={formData.namaPena}
                onChange={(e) => setFormData({ ...formData, namaPena: e.target.value })}
                placeholder="cth. Si Anak Pinggiran"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                No. What&apos;s App <span className="text-red-600">*</span>
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

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                Alamat Email <span className="text-red-600">*</span>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                Domisili <span className="text-red-600">*</span>
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
              <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                Kampus / Komunitas / Profesi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.institusi}
                onChange={(e) => setFormData({ ...formData, institusi: e.target.value })}
                placeholder="cth. Mahasiswa Unhas / Buruh Kreatif"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: PERTANYAAN TAMBAHAN
        ========================================================================= */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
            <HelpCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-black">
              Pertanyaan Tambahan
            </h2>
          </div>

          {/* Q1: Siapa Nama Presidenmu? */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
              Siapa Nama Presidenmu? <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.namaPresiden}
              onChange={(e) => setFormData({ ...formData, namaPresiden: e.target.value })}
              placeholder="Tuliskan nama siapa pun yang kamu anggap presidenmu..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all"
            />
          </div>

          {/* Q2: Lebih Percaya Mana: Bumi Bulat atau Bumi Datar? */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">
              Lebih Percaya Mana: Bumi Bulat atau Bumi Datar? <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Bumi Bulat", desc: "Sesuai sains & gravitasi konvensional" },
                { label: "Bumi Datar", desc: "Piringan beratap kubah langit" },
              ].map((item) => {
                const isSelected = formData.kepercayaanBumi === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, kepercayaanBumi: item.label })}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 text-red-950 ring-1 ring-red-600"
                        : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Globe2 className={`w-4 h-4 ${isSelected ? "text-red-600" : "text-zinc-400"}`} />
                        <span className="text-sm font-black uppercase tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-normal pl-6">{item.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q3: Ayam atau Telur yang Ada Lebih Dulu? */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">
              Ayam atau Telur yang Ada Lebih Dulu? <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Ayam", desc: "Harus ada ayam dulu untuk bertelur" },
                { label: "Telur", desc: "Hewan bertelur ada jutaan tahun sebelum ayam" },
              ].map((item) => {
                const isSelected = formData.ayamAtauTelur === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, ayamAtauTelur: item.label })}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 text-red-950 ring-1 ring-red-600"
                        : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Egg className={`w-4 h-4 ${isSelected ? "text-red-600" : "text-zinc-400"}`} />
                        <span className="text-sm font-black uppercase tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-normal pl-6">{item.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q4: Jelaskan dengan Singkat Mengapa Kamu Mau Bergabung */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
              Jelaskan dengan Singkat Mengapa Kamu Mau Bergabung <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.alasanBergabung}
              onChange={(e) => setFormData({ ...formData, alasanBergabung: e.target.value })}
              placeholder="Ceritakan alasan, kegelisahan, atau motif di balik niatmu bergabung jadi Agen Belokan..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm font-medium transition-all leading-relaxed"
            />
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: FOKUS BIDANG AGEN (pilihan jawaban, centang)
        ========================================================================= */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
            <CheckSquare className="w-5 h-5 text-red-600" />
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-black">
                Fokus Bidang Agen
              </h2>
              <p className="text-xs text-zinc-500 font-normal">
                Pilihan jawaban (bisa centang lebih dari satu):
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {FOKUS_OPTIONS.map((option) => {
              const isChecked = formData.fokusBidang.includes(option);
              return (
                <label
                  key={option}
                  onClick={() => handleCheckboxToggle(option)}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer select-none transition-all ${
                    isChecked
                      ? "border-red-600 bg-red-50/40 text-black ring-1 ring-red-600 shadow-xs"
                      : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isChecked
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-zinc-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-tight">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-zinc-200">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{loading ? "Menyimpan ke Redaksi..." : "Kirim Formulir Agen Belokan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
