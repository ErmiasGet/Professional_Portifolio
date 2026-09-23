import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/content/site";
import { services as staticServices } from "@/content/services";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { FooterContent } from "@/components/layout/footer-content";
import { BackToTop } from "@/components/layout/back-to-top";
import type { Availability } from "@/types";

interface FooterProps {
  site?: typeof SITE_CONFIG;
  navLinks?: typeof NAV_LINKS;
  socialLinks?: typeof SOCIAL_LINKS;
  services?: typeof staticServices;
  availability?: Availability;
}

/**
 * Server-rendered Footer. Only the pathname-dependent link columns and the
 * back-to-top button are client components; the rest is static HTML, so the
 * copyright year cannot cause a hydration mismatch.
 */
export function Footer({
  site = SITE_CONFIG,
  navLinks = NAV_LINKS,
  socialLinks = SOCIAL_LINKS,
  services = staticServices,
  availability = site.availability,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70 bg-surface/60">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <FooterContent site={site} navLinks={navLinks} services={services} availability={availability}>
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group flex items-center gap-2.5">
              <Logo size={36} />
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight">{site.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{site.role}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <SocialLinks className="mt-6" size="sm" links={socialLinks} />
            <AvailabilityBadge className="mt-6" availability={availability} />
          </div>
        </FooterContent>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}