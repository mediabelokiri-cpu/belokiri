"use client";

import { useState } from "react";
import Image from "next/image";
import {
  QrCode,
  CreditCard,
  Wallet,
  Copy,
  Check,
  Heart,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface DonasiPaymentSectionProps {
  extraData?: {
    qrisImageUrl?: string;
    bankName?: string;
    bankAccountNumber?: string;
    bankAccountName?: string;
    danaNumber?: string;
    danaName?: string;
    targetText?: string;
  };
  whatsappHotline?: string;
}

export default function DonasiPaymentSection({
  extraData,
  whatsappHotline = "0812-3456-7890",
}: DonasiPaymentSectionProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedDana, setCopiedDana] = useState(false);
  const [activeTab, setActiveTab] = useState<"qris" | "bank" | "dana">("qris");

  const bankName = extraData?.bankName || "BCA (Bank Central Asia)";
  const bankAccountNumber = extraData?.bankAccountNumber || "0812-3456-7890";
  const bankAccountName = extraData?.bankAccountName || "Kolektif Media Belokiri";
  const danaNumber = extraData?.danaNumber || "0812-3456-7890";
  const danaName = extraData?.danaName || "Kolektif Media Belokiri";
  const qrisImage = extraData?.qrisImageUrl || "";

  const handleCopyBank = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(bankAccountNumber);
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    }
  };

  const handleCopyDana = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(danaNumber);
      setCopiedDana(true);
      setTimeout(() => setCopiedDana(false), 2500);
    }
  };

  const cleanWaNumber = whatsappHotline.replace(/[^0-9]/g, "");
  const waUrl = whatsappHotline.startsWith("http")
    ? whatsappHotline
    : `https://wa.me/${cleanWaNumber.startsWith("0") ? "62" + cleanWaNumber.slice(1) : cleanWaNumber}?text=${encodeURIComponent(
        "Halo Redaksi Belokiri, saya telah menyalurkan donasi solidaritas warga. Tetap semangat mengudara!"
      )}`;

  return (
    <div className="rounded-3xl bg-zinc-950 text-white border-2 border-red-600 shadow-2xl p-6 sm:p-10 space-y-8">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-500 border border-red-800 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Kanal Solidaritas Warga</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Pilihan Metode Penyaluran Dukungan
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-normal">
            Bebas berapa saja, dari harga secangkir kopi sachet hingga amunisi liputan investigasi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("qris")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "qris"
                ? "bg-red-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QRIS</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "bank"
                ? "bg-red-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transfer Bank</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dana")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "dana"
                ? "bg-red-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Transfer DANA</span>
          </button>
        </div>
      </div>

      {/* Tab 1: QRIS */}
      {activeTab === "qris" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="p-4 rounded-2xl bg-white text-black shadow-xl inline-block border-4 border-red-600">
              {qrisImage ? (
                <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                  <Image
                    src={qrisImage}
                    alt="QRIS Donasi Belokiri"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl p-4 text-center">
                  <QrCode className="w-16 h-16 text-zinc-800 mb-2" />
                  <span className="text-xs font-black text-black uppercase">
                    QRIS SEMUA PEMBAYARAN
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1">
                    BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay
                  </span>
                </div>
              )}
              <div className="mt-3 text-center border-t border-zinc-200 pt-2">
                <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase block">
                  NMID: BELOKIRI KOLEKTIF
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <h4 className="text-lg font-black uppercase text-white tracking-tight">
              Cara Praktis Scan QRIS
            </h4>
            <ol className="text-xs text-zinc-300 space-y-2.5 list-decimal pl-4 font-normal leading-relaxed">
              <li>Buka aplikasi m-Banking (BCA Mobile, Livin Mandiri, BRImo, dll.) atau E-Wallet (GoPay, OVO, Dana, ShopeePay).</li>
              <li>Pilih menu <strong>Pindai / Scan QRIS</strong>.</li>
              <li>Arahkan kamera ke kode QR di samping, atau unggah tangkapan layar barcode ini.</li>
              <li>Masukkan nominal dukungan sukarela sesuai kemampuan dan kerelaan hati Anda.</li>
              <li>Konfirmasi pembayaran dan kirimkan doa/amunisi bagi akal sehat.</li>
            </ol>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                100% donasi masuk langsung ke pos operasional media dan reward penulis warga tanpa potongan perantara komersial.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Transfer Bank */}
      {activeTab === "bank" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-black uppercase tracking-wider text-red-500">
                Rekening Resmi Kolektif
              </span>
              <span className="text-[10px] font-bold uppercase text-zinc-400">
                {bankName}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 uppercase font-bold block mb-1">
                Nomor Rekening:
              </span>
              <div className="flex items-center justify-between bg-black p-3.5 rounded-xl border border-zinc-800">
                <span className="text-lg sm:text-xl font-mono font-black text-white tracking-wider">
                  {bankAccountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyBank}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {copiedBank ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 uppercase font-bold block mb-0.5">
                Atas Nama Pemilik Rekening:
              </span>
              <span className="text-sm font-bold text-white block">
                {bankAccountName}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <h4 className="text-base font-black uppercase text-white">
              Petunjuk Transfer Bank
            </h4>
            <p className="font-normal leading-relaxed">
              Anda dapat melakukan transfer dari bank mana saja melalui ATM, Mobile Banking, atau Internet Banking.
            </p>
            <p className="font-normal leading-relaxed">
              Beri catatan transfer: <strong className="text-white">“Solidaritas Belokiri”</strong> agar memudahkan kami dalam pembukuan transparansi publik.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600 text-zinc-300 hover:text-white text-xs font-black uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Konfirmasi Bukti Transfer via WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Transfer DANA */}
      {activeTab === "dana" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" />
                <span>Akun Resmi DANA</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-950/70 border border-sky-800/60 px-2.5 py-0.5 rounded">
                E-Wallet
              </span>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 uppercase font-bold block mb-1">
                Nomor Akun / Telepon DANA:
              </span>
              <div className="flex items-center justify-between bg-black p-3.5 rounded-xl border border-zinc-800">
                <span className="text-lg sm:text-xl font-mono font-black text-white tracking-wider">
                  {danaNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyDana}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {copiedDana ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-zinc-400 uppercase font-bold block mb-0.5">
                Atas Nama Pemilik Akun:
              </span>
              <span className="text-sm font-bold text-white block">
                {danaName}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <h4 className="text-base font-black uppercase text-white">
              Petunjuk Transfer Saldo DANA
            </h4>
            <ol className="font-normal leading-relaxed space-y-2 list-decimal pl-4">
              <li>Buka aplikasi <strong>DANA</strong> di smartphone Anda.</li>
              <li>Pilih menu <strong>Kirim (Send)</strong> di halaman utama aplikasi.</li>
              <li>Pilih <strong>Kirim ke Nomor Telepon / Teman</strong>.</li>
              <li>Masukkan nomor DANA di samping: <strong className="text-white font-mono">{danaNumber}</strong>.</li>
              <li>Masukkan nominal dukungan dan pastikan nama penerima tertera <strong>{danaName}</strong>.</li>
              <li>Konfirmasi PIN DANA untuk menuntaskan penyaluran dukungan.</li>
            </ol>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500 text-zinc-300 hover:text-white text-xs font-black uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Konfirmasi Bukti Transfer via WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
