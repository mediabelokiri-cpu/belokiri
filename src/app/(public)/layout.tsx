import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9]">
      <OrganizationJsonLd />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
