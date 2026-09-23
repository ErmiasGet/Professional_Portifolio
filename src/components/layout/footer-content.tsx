"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/content/site";
import { services as staticServices } from "@/content/services";
import { resolveHref } from "@/lib/navigation";
import type { Availability } from "@/types";

interface FooterContentProps {
  children: ReactNode;
  site?: typeof SITE_CONFIG;
  navLinks?: typeof NAV_LINKS;
  services?: typeof staticServices;
  availability?: Availability;
}

/**
 * Client boundary for the pathname-dependent parts of the Footer (the link
 * columns and the CTA all resolve anchors against the current route). The
 * brand column is passed in as server-rendered `children` to keep client
 * JavaScript minimal.
 */
export function FooterContent({
  children,
  site = SITE_CONFIG,
  navLinks = NAV_LINKS,
  services = staticServices,
  availability = site.availability,
}: FooterContentProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="py-12 text-center lg:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Have an idea, project, or opportunity?
        </h2>
        <p className="mt-2 text-muted-foreground">Let&apos;s build something useful.</p>
        <Link
          href={resolveHref(pathname, "#contact")}
          className="group mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          Start a Conversation
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {children}

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={resolveHref(pathname, link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Services
          </h3>
          <ul className="mt-4 space-y-3">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <Link
                  href={service.cta?.href ?? "/#contact"}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Let&apos;s Work
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="font-medium text-foreground">
              Available for {availability.types.join(" • ")}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              {availability.responseTime}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              {site.location}
            </li>
            <li>
              <Link
                href={resolveHref(pathname, "#contact")}
                className="group mt-2 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-light"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}