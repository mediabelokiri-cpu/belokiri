import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import MobileBottomNav from "@/components/public/MobileBottomNav";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { getSiteSettingsAction } from "@/actions/settings.actions";
import { defaultSiteSettings } from "@/lib/data/site-settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getSiteSettingsAction();
  const settings = res.settings || defaultSiteSettings;

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf8]">
      <OrganizationJsonLd />
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer initialSettings={settings} />
      <MobileBottomNav copyrightText={settings.identity?.copyrightText} />
    </div>
  );
}
