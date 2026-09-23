import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RUBRIKS = [
  {
    name: "KABAR",
    slug: "kabar",
    description: "Berita aktual dan peristiwa terkini seputar nasional, daerah, politik, ekonomi, hukum, dan isu publik. Menjawab: Apa yang sedang terjadi?",
  },
  {
    name: "BEDAH",
    slug: "bedah",
    description: "Analisis mendalam, data, konteks, dan explainer di balik suatu peristiwa. Menjawab: Apa yang sebenarnya ada di balik kabar tersebut?",
  },
  {
    name: "SISI",
    slug: "sisi",
    description: "Perspektif berbeda dan sudut pandang alternatif dari isu yang sedang ramai. Menjawab: Bagaimana jika kita melihatnya dari sisi yang berbeda?",
  },
  {
    name: "NADI",
    slug: "nadi",
    description: "Dinamika kehidupan masyarakat, fenomena sosial, dan keresahan publik. Menjawab: Bagaimana sebuah isu dirasakan oleh masyarakat?",
  },
  {
    name: "CERITA",
    slug: "cerita",
    description: "Human interest, sosok inspiratif, komunitas, dan kisah perjuangan hidup. Menjawab: Siapa manusia di balik sebuah peristiwa?",
  },
  {
    name: "JEJAK",
    slug: "jejak",
    description: "Budaya, seni, tradisi, sejarah, dan warisan identitas masyarakat. Menjawab: Dari mana kita berasal dan apa yang membentuk kita?",
  },
  {
    name: "ESOK",
    slug: "esok",
    description: "Pendidikan, pelajar, mahasiswa, teknologi, kreativitas, dan masa depan generasi muda. Menjawab: Ke mana generasi berikutnya bergerak?",
  },
  {
    name: "SUARA",
    slug: "suara",
    description: "Kolom opini, esai kritis, gagasan, dan perspektif terbuka kontributor. Ruang pertukaran ide pembaca.",
  },
];

async function main() {
  console.log("🌱 Memulai seeding 8 Rubrik Resmi NALAR...");

  for (const rubrik of RUBRIKS) {
    const category = await prisma.category.upsert({
      where: { slug: rubrik.slug },
      update: {
        name: rubrik.name,
        description: rubrik.description,
      },
      create: {
        name: rubrik.name,
        slug: rubrik.slug,
        description: rubrik.description,
        status: true,
      },
    });
    console.log(`✅ Rubrik terdaftar: ${category.name} (/kategori/${category.slug})`);
  }

  console.log("✨ Seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
