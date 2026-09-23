import { z } from "zod";

export const CreateArticleSchema = z.object({
  title: z
    .string()
    .min(5, "Judul artikel minimal 5 karakter")
    .max(150, "Judul artikel maksimal 150 karakter"),
  categoryId: z.string().min(1, "Rubrik wajib dipilih"),
  featuredImage: z.string().url("Format URL gambar tidak valid").optional().or(z.literal("")),
  featuredImageCaption: z.string().max(255).optional(),
  content: z.string().min(20, "Isi artikel minimal 20 karakter"),
  excerpt: z.string().max(300, "Ringkasan artikel maksimal 300 karakter").optional(),
  source: z.string().max(200).optional(),
  photoSource: z.string().max(200).optional(),
  tags: z.array(z.string()).default([]),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

export const RequestRevisionSchema = z.object({
  articleId: z.string().min(1, "ID artikel wajib disertakan"),
  adminNote: z
    .string()
    .min(10, "Catatan revisi wajib diisi dengan jelas (minimal 10 karakter)"),
});

export const PublishArticleSchema = z.object({
  articleId: z.string().min(1, "ID artikel wajib disertakan"),
  seoTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  isEditorPick: z.boolean().optional().default(false),
});

export type CreateArticleInput = z.infer<typeof CreateArticleSchema>;
export type UpdateArticleInput = z.infer<typeof UpdateArticleSchema>;
export type RequestRevisionInput = z.infer<typeof RequestRevisionSchema>;
export type PublishArticleInput = z.infer<typeof PublishArticleSchema>;
