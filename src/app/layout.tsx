import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import PwaInstallPrompt from "@/components/common/PwaInstallPrompt";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BELOKIRI",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/favicon-32x32.png",
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.belokiri.site",
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
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
