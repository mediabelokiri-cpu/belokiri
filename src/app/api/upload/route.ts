import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { rateLimitUpload, getClientIp } from "@/lib/security/rate-limit";
import path from "path";
import fs from "fs";

// Allowed MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const clientIp = getClientIp(request.headers);
    const rateCheck = rateLimitUpload(clientIp);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Batas pengunggahan tercapai. Silakan coba kembali dalam ${rateCheck.resetSeconds} detik.`,
        },
        { status: 429 }
      );
    }

    // 2. Authenticate user or admin
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan masuk terlebih dahulu." },
        { status: 401 }
      );
    }

    // 3. Parse FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Berkas gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    // 4. Validate MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format berkas tidak didukung. Harap gunakan format JPG, PNG, WebP, GIF, atau AVIF.",
        },
        { status: 400 }
      );
    }

    // 5. Validate file size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "Ukuran berkas melebihi batas maksimum 5 MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Supabase Storage Upload (Primary Production CDN Storage)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      try {
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueFileName = `${Date.now()}-${cleanName}`;
        const uploadEndpoint = `${supabaseUrl}/storage/v1/object/media/${uniqueFileName}`;

        const uploadRes = await fetch(uploadEndpoint, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": file.type,
          },
          body: buffer,
        });

        if (uploadRes.ok) {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/media/${uniqueFileName}`;
          return NextResponse.json({
            success: true,
            url: publicUrl,
            name: file.name,
            size: file.size,
            provider: "supabase",
          });
        } else {
          const errData = await uploadRes.json().catch(() => ({}));
          console.warn("Supabase storage upload error response:", errData);
        }
      } catch (supabaseErr) {
        console.warn("Supabase storage upload failed:", supabaseErr);
      }
    }

    // 7. Cloudinary Upload if configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret && !cloudName.includes("your-cloud")) {
      try {
        const uploadFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type });
        uploadFormData.append("file", blob, file.name);
        uploadFormData.append("folder", "belokiri/articles");

        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "belokiri_preset";
        uploadFormData.append("upload_preset", uploadPreset);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (cloudRes.ok) {
          const cloudData = await cloudRes.json();
          return NextResponse.json({
            success: true,
            url: cloudData.secure_url || cloudData.url,
            name: file.name,
            size: file.size,
            provider: "cloudinary",
          });
        }
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudErr);
      }
    }

    // 8. Local Storage Fallback (only on local development environments)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFileName = `${Date.now()}-${cleanName}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      await fs.promises.writeFile(filePath, buffer);
      const publicUrl = `/uploads/${uniqueFileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        name: file.name,
        size: file.size,
        provider: "local",
      });
    } catch (fsErr: any) {
      console.error("Local filesystem write failed (read-only environment):", fsErr);
      return NextResponse.json(
        {
          success: false,
          message: "Gagal menyimpan berkas ke serverless storage. Pastikan Supabase Storage terkonfigurasi.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal mengunggah gambar." },
      { status: 500 }
    );
  }
}

