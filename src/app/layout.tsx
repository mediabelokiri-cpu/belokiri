import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NALAR — Melihat Lebih dari Sekadar Kabar",
    template: "%s | NALAR",
  },
  description:
    "Media berita, perspektif alternatif, analisis mendalam, dan cerita manusia dengan sudut pandang yang berbeda.",
  keywords: [
    "NALAR",
    "Berita",
    "Analisis",
    "Perspektif",
    "Media Online",
    "Kabar",
    "Jurnalistik",
  ],
  authors: [{ name: "Redaksi NALAR" }],
  creator: "NALAR",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "NALAR",
    title: "NALAR — Melihat Lebih dari Sekadar Kabar",
    description:
      "Media berita, perspektif alternatif, analisis mendalam, dan cerita manusia dengan sudut pandang yang berbeda.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#f4f4f5] text-[#09090b]">
        {children}
      </body>
    </html>
  );
}
