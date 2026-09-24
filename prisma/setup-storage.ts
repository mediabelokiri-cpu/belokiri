import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const buckets = await prisma.$queryRawUnsafe(`SELECT * FROM storage.buckets;`);
    console.log("Existing buckets:", buckets);

    // Create 'media' bucket if it doesn't exist
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('media', 'media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])
      ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 10485760;
    `);

    // Add RLS policy so anon/authenticated can upload to 'media' bucket
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Media Bucket'
        ) THEN
          CREATE POLICY "Public Access to Media Bucket" ON storage.objects
          FOR SELECT USING (bucket_id = 'media');
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE policyname = 'Allow Upload to Media Bucket'
        ) THEN
          CREATE POLICY "Allow Upload to Media Bucket" ON storage.objects
          FOR INSERT WITH CHECK (bucket_id = 'media');
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE policyname = 'Allow Update to Media Bucket'
        ) THEN
          CREATE POLICY "Allow Update to Media Bucket" ON storage.objects
          FOR UPDATE USING (bucket_id = 'media');
        END IF;
      END $$;
    `);

    console.log("Bucket 'media' created and policies configured successfully!");
    const updated = await prisma.$queryRawUnsafe(`SELECT id, name, public FROM storage.buckets;`);
    console.log("Updated buckets:", updated);
  } catch (err) {
    console.error("Error configuring storage:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
