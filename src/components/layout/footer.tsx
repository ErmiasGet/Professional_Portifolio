"use client";

import Link from "next/link";
import { Heart, ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";
import { SocialLinks } from "@/components/shared/social-links";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="group flex items-center gap-2 mb-4">
                <Logo size={36} />
                <span className="text-lg font-bold">{SITE_CONFIG.name}</span>
              </Link>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Software Engineer | Full Stack Developer.
                Available for freelance, remote &amp; full-time opportunities.
              </p>
              <SocialLinks className="mt-6" />
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Navigation
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="transition-colors hover:text-foreground">
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>{SITE_CONFIG.location}</li>
                <li className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
                  Available for work
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              Built with <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" /> using Next.js
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
