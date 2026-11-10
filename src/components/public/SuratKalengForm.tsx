"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitSuratKalengAction } from "@/actions/surat-kaleng.actions";
import type { PublicSuratKalengItem } from "@/lib/data/site-settings";

interface SuratKalengFormProps {
  headingId?: string;
  onSubmitted?: (item: PublicSuratKalengItem) => void;
}

export default function SuratKalengForm({
  headingId,
  onSubmitted,
}: SuratKalengFormProps) {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const [namaEdited, setNamaEdited] = useState(false);
  const [pesanEdited, setPesanEdited] = useState(false);
  const [namaError, setNamaError] = useState<string | null>(null);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sentInfo, setSentInfo] = useState<{ nama: string } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const namaInputRef = useRef<HTMLInputElement>(null);
  const pesanTextareaRef = useRef<HTMLTextAreaElement>(null);

  const validateNama = (value: string): string | null => {
    if (value.trim().length > 60) {
      return "Nama samaran maksimal 60 karakter.";
    }
    return null;
  };

  const validatePesan = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Tulis isi surat kaleng terlebih dahulu sebelum mengirim.";
    }
    if (trimmed.length < 3) {
      return "Isi surat kaleng minimal 3 karakter.";
    }
    if (trimmed.length > 3000) {
      return "Isi surat kaleng maksimal 3.000 karakter.";
    }
    return null;
  };

  const submitLetter = async () => {
    const nextNamaError = validateNama(nama);
    const nextPesanError = validatePesan(pesan);

    setNamaError(nextNamaError);
    setPesanError(nextPesanError);
    setSubmitError(null);

    if (nextNamaError) {
      namaInputRef.current?.focus();
      return;
    }

    if (nextPesanError) {
      pesanTextareaRef.current?.focus();
      return;
    }

    setLoading(true);
    setSentInfo(null);

    try {
      const res = await submitSuratKalengAction({
        namaSamaran: nama.trim() || undefined,
        isiSurat: pesan.trim(),
      });

      if (res.success && res.item) {
        onSubmitted?.(res.item);
        setSentInfo({ nama: res.item.namaSamaran });
        setNama("");
        setPesan("");
        setNamaEdited(false);
        setPesanEdited(false);
        setNamaError(null);
        setPesanError(null);
      } else if (res.success) {
        setSentInfo({ nama: nama.trim() || "Warga Anonim" });
        setNama("");
        setPesan("");
        setNamaEdited(false);
        setPesanEdited(false);
        setNamaError(null);
        setPesanError(null);
      } else {
        setSubmitError(res.error || "Gagal mengirim surat. Silakan coba lagi.");
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    await submitLetter();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!loading) {
        formRef.current?.requestSubmit();
      }
    }
  };

  const namaDescribedBy = namaError
    ? "sk-nama-hint sk-nama-error"
    : "sk-nama-hint";
  const pesanDescribedBy = pesanError
    ? "sk-isi-hint sk-isi-error"
    : "sk-isi-hint";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={headingId}
      className="space-y-5"
    >
      {/* Persistent polite status region so screen readers reliably announce submission confirmation */}
      <div role="status" aria-live="polite" className="min-h-0">
        {sentInfo && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-700/30 text-emerald-950 text-xs flex items-start gap-2.5 shadow-2xs">
            <CheckCircle2
              className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <p className="font-black uppercase tracking-wider text-emerald-900">
                Surat Kaleng Terkirim!
              </p>
              <p className="text-emerald-900/90 leading-relaxed">
                Terima kasih, <strong className="font-bold">{sentInfo.nama}</strong>.
                Pesanmu kini tampil secara real-time di dinding Warga &amp; meja redaksi BAKUBACA.
              </p>
            </div>
          </div>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-rose-50 border border-rose-700/40 text-rose-950 text-xs flex items-start gap-2.5"
        >
          <AlertCircle
            className="w-4 h-4 shrink-0 mt-0.5 text-rose-700"
            aria-hidden="true"
          />
          <span className="font-semibold leading-relaxed">
            Kesalahan: {submitError}
          </span>
        </div>
      )}

      {/* Field 1: Nama Samaran */}
      <div className="space-y-1.5">
        <label
          htmlFor="sk-nama"
          className="block text-xs font-black uppercase tracking-wider text-[#1f1f1f]"
        >
          Nama Samaran{" "}
          <span className="text-zinc-600 font-medium normal-case tracking-normal">
            (opsional)
          </span>
        </label>
        <p id="sk-nama-hint" className="text-xs text-zinc-600 leading-snug">
          Kosongkan bila ingin tampil sebagai Warga Anonim (maks. 60 karakter).
        </p>
        <input
          ref={namaInputRef}
          id="sk-nama"
          name="namaSamaran"
          type="text"
          value={nama}
          autoComplete="nickname"
          enterKeyHint="next"
          maxLength={60}
          aria-invalid={namaError ? "true" : "false"}
          aria-describedby={namaDescribedBy}
          onChange={(e) => {
            const val = e.target.value;
            setNama(val);
            setNamaEdited(true);
            if (sentInfo) setSentInfo(null);
            if (namaError && !validateNama(val)) {
              setNamaError(null);
            }
          }}
          onBlur={() => {
            if (namaEdited) {
              setNamaError(validateNama(nama));
            }
          }}
          placeholder="cth. Anonim Teras Kota"
          className={`w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-white border text-base text-[#1f1f1f] placeholder:text-zinc-500 transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#4c13ff] focus-visible:outline-offset-2 ${
            namaError
              ? "border-rose-700 bg-rose-50/40"
              : "border-zinc-500 focus:border-[#4c13ff]"
          }`}
        />
        {namaError && (
          <p
            id="sk-nama-error"
            className="text-xs font-semibold text-rose-800 flex items-start gap-1.5 pt-0.5"
          >
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5 text-rose-700"
              aria-hidden="true"
            />
            <span>Kesalahan: {namaError}</span>
          </p>
        )}
      </div>

      {/* Field 2: Isi Surat Kaleng */}
      <div className="space-y-1.5">
        <label
          htmlFor="sk-isi"
          className="block text-xs font-black uppercase tracking-wider text-[#1f1f1f]"
        >
          Isi Surat Kaleng{" "}
          <span aria-hidden="true" className="text-rose-700">
            *
          </span>
        </label>
        <div
          id="sk-isi-hint"
          className="flex items-center justify-between gap-2 text-xs text-zinc-600 leading-snug"
        >
          <span>Minimal 3 karakter, langsung tampil di dinding Warga.</span>
          <span className="font-mono text-zinc-600 tabular-nums shrink-0">
            {pesan.length}/3000
          </span>
        </div>
        <textarea
          ref={pesanTextareaRef}
          id="sk-isi"
          name="isiSurat"
          required
          minLength={3}
          maxLength={3000}
          rows={4}
          enterKeyHint="send"
          value={pesan}
          aria-invalid={pesanError ? "true" : "false"}
          aria-describedby={pesanDescribedBy}
          onChange={(e) => {
            const val = e.target.value;
            setPesan(val);
            setPesanEdited(true);
            if (sentInfo) setSentInfo(null);
            if (pesanError && !validatePesan(val)) {
              setPesanError(null);
            }
          }}
          onBlur={() => {
            if (pesanEdited) {
              setPesanError(validatePesan(pesan));
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Tumpahkan kritik, saran, keresahan, atau gagasanmu di sini..."
          className={`w-full min-h-[120px] px-3.5 py-3 rounded-xl bg-white border text-base text-[#1f1f1f] placeholder:text-zinc-500 transition-colors font-medium resize-y leading-relaxed focus-visible:outline-2 focus-visible:outline-[#4c13ff] focus-visible:outline-offset-2 ${
            pesanError
              ? "border-rose-700 bg-rose-50/40"
              : "border-zinc-500 focus:border-[#4c13ff]"
          }`}
        />
        {pesanError && (
          <p
            id="sk-isi-error"
            className="text-xs font-semibold text-rose-800 flex items-start gap-1.5 pt-0.5"
          >
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5 text-rose-700"
              aria-hidden="true"
            />
            <span>Kesalahan: {pesanError}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-12 py-3 px-4 rounded-xl bg-[#4c13ff] hover:bg-[#3d0dd9] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] disabled:opacity-60 cursor-pointer focus-visible:outline-3 focus-visible:outline-[#1f1f1f] focus-visible:outline-offset-2 forced-colors:border forced-colors:border-[ButtonText]"
      >
        {loading ? (
          <Loader2
            className="w-4 h-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
        <span>{loading ? "Mengirim ke Dinding Warga..." : "Kirim Surat Kaleng"}</span>
      </button>
    </form>
  );
}
