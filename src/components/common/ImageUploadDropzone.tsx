"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Link as LinkIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export default function ImageUploadDropzone({
  value,
  onChange,
  label = "Foto Utama Naskah (Cover)",
  helperText = "Format didukung: JPG, PNG, WebP, AVIF (Maks. 5 MB). Rasio ideal 16:9.",
}: ImageUploadDropzoneProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const uploadFile = async (file: File) => {
    setErrorMsg(null);

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran berkas melebihi 5 MB.");
      return;
    }

    // Validate type
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.type)) {
      setErrorMsg("Format berkas harus JPG, PNG, WebP, atau AVIF.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        onChange(data.url);
        setUrlInput(data.url);
      } else {
        setErrorMsg(data.message || "Gagal mengunggah gambar.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kesalahan jaringan saat mengunggah.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setErrorMsg(null);
      onChange(urlInput.trim());
    }
  };

  const handleRemove = () => {
    onChange("");
    setUrlInput("");
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-xs font-black uppercase tracking-wider text-black">
          {label}
        </label>

        {/* Tab Switcher */}
        {!value && (
          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "upload"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <UploadCloud className="w-3 h-3" />
              <span>Unggah File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "url"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              <span>Tautan URL</span>
            </button>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-red-500 hover:text-red-900"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Preview if Image exists */}
      {value ? (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 group">
          <Image
            src={value}
            alt="Preview Foto Cover"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />

          {/* Overlay controls on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold shadow-md hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ganti Foto</span>
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>

          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold backdrop-blur-xs">
            Foto Terpasang
          </div>
        </div>
      ) : activeTab === "upload" ? (
        /* Drag and Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!isUploading && fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? "border-red-600 bg-red-50/50 scale-[0.99]"
              : "border-zinc-300 hover:border-black bg-zinc-50/60 hover:bg-zinc-50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-2">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-black">
                Mengunggah dan mengoptimalkan gambar...
              </p>
              <p className="text-[10px] text-zinc-400">Mohon tunggu sebentar</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-center justify-center text-zinc-500">
                <UploadCloud className="w-6 h-6 text-red-600" />
              </div>

              <div>
                <p className="text-xs font-bold text-black">
                  Tarik berkas foto ke sini, atau{" "}
                  <span className="text-red-600 underline">telusuri perangkat</span>
                </p>
                <p className="text-[10px] text-zinc-400 mt-1 font-normal">
                  {helperText}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Direct URL Input */
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 text-xs text-zinc-800 px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Pasang
            </button>
          </div>
          <p className="text-[10px] text-zinc-400 font-normal">
            Masukkan tautan gambar langsung dari Unsplash atau sumber web berlisensi.
          </p>
        </div>
      )}
    </div>
  );
}
