import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPaletteLoader } from "@/components/layout/command-palette-loader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import {
  getSiteConfig,
  getNavLinks,
  getSocialLinks,
  getServices,
  getSectionVisibility,
} from "@/lib/data/public";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteConfig, navLinks, socialLinks, services, visibility] = await Promise.all([
    getSiteConfig(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
    getSectionVisibility(),
  ]);

  const visibleNavLinks = navLinks.filter((link) => {
    const id = link.href.replace("#", "");
    if (!id || id === "home") return true;
    return visibility[id] !== false;
  });

  return (
    <>
      <ScrollProgress />
      <Navbar site={siteConfig} navLinks={visibleNavLinks} socialLinks={socialLinks} />
      <CommandPaletteLoader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        site={siteConfig}
        navLinks={visibleNavLinks}
        socialLinks={socialLinks}
        services={services}
        availability={siteConfig.availability}
      />
    </>
  );
}