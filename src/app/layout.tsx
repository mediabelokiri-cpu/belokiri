import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
