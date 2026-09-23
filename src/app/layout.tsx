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
    default: "BELOKIRI — Liar Seperlunya, Jenaka Secukupnya",
    template: "%s | BELOKIRI",
  },
  description:
    "Media esai populer, opini tajam, analisis warkop, dan arsip kebudayaan. Liar Seperlunya, Jenaka Secukupnya.",
  keywords: [
    "BELOKIRI",
    "Berisik",
    "Meja Warkop",
    "Ordal",
    "Arsip Pinggiran",
    "Sedikit Akademis",
    "Sisa Bahasa",
    "Setara",
    "Serial Anabel",
    "Esai Populer",
  ],
  authors: [{ name: "Agen Belokan BELOKIRI" }],
  creator: "BELOKIRI",
  icons: {
    icon: "/images/logo-belokiri-icon.png",
    apple: "/images/logo-belokiri-icon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "BELOKIRI",
    title: "BELOKIRI — Liar Seperlunya, Jenaka Secukupnya",
    description:
      "Liar Seperlunya, Jenaka Secukupnya. Media esai populer, analisis santai, dan percakapan kritis yang disajikan dengan tajam dan jenaka.",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
