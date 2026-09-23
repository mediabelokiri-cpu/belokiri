import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80),
  penName: z.string().max(80).optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  avatarUrl: z.string().url("URL avatar tidak valid").optional().nullable().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
