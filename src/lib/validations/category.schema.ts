import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Nama rubrik minimal 2 karakter").max(50),
  slug: z.string().min(2).max(60).regex(/^[a-z0-9-]+$/, "Slug harus lowercase dan kebab-case"),
  description: z.string().max(500).optional(),
  status: z.boolean().default(true),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
