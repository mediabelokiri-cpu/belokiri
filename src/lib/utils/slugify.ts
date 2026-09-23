export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-word
    .replace(/\-\-+/g, "-") // Ganti multiple - dengan satu -
    .replace(/^-+/, "") // Trim - dari awal
    .replace(/-+$/, ""); // Trim - dari akhir
}
