"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Menu, Moon, Search, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { subscribeTheme, getThemeSnapshot, getServerSnapshot, toggleThemeAction } from "@/lib/theme-store";
import { openCommandPalette } from "@/lib/command-palette-store";
import { Logo } from "@/components/shared/logo";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/content/site";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NAVBAR_HEIGHT_CLASS, resolveHref } from "@/lib/navigation";
import { SOCIAL_ICONS } from "@/components/shared/social-icons";
import { useMediaQuery } from "@/hooks";

interface NavbarProps {
  site?: typeof SITE_CONFIG;
  navLinks?: typeof NAV_LINKS;
  socialLinks?: typeof SOCIAL_LINKS;
}

export function Navbar({
  site = SITE_CONFIG,
  navLinks = NAV_LINKS,
  socialLinks = SOCIAL_LINKS,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the drawer automatically when the viewport crosses into desktop.
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);
  if (isMobile !== prevIsMobile) {
    setPrevIsMobile(isMobile);
    if (!isMobile) setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, navLinks]);

  const brandSocials = socialLinks.filter((social) =>
    ["github", "linkedin"].includes(social.icon)
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          `fixed top-0 left-0 right-0 z-50 transition-all duration-300`,
          NAVBAR_HEIGHT_CLASS,
          isScrolled
            ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="h-full">
          <nav className="flex h-full items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label={`${site.name} — Home`}
            >
              <Logo size={36} />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight sm:text-base">
                  {site.name}
                </span>
                <span className="hidden text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:block">
                  {site.role.split(" | ")[0]}
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = isHome && activeSection === id;
                return (
                  <Link
                    key={link.href}
                    href={resolveHref(pathname, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-primary to-accent transition-transform duration-200",
                        isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="hidden items-center gap-1 lg:flex">
                {brandSocials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={social.platform}
                    >
                      {Icon && <Icon />}
                    </a>
                  );
                })}
              </div>

              <button
                onClick={openCommandPalette}
                className="flex h-9 items-center justify-center rounded-lg px-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Open command palette (Ctrl+K)"
              >
                <Search className="h-4 w-4" />
                <span className="ml-1.5 hidden text-[10px] font-medium text-muted-foreground/70 lg:inline">
                  ⌘K
                </span>
              </button>

              <button
                onClick={toggleThemeAction}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <Link
                href={resolveHref(pathname, "#contact")}
                className="group hidden h-9 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] md:inline-flex"
              >
                Hire Me
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-panel"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <MobileNav
        open={isOpen}
        onClose={() => setIsOpen(false)}
        activeSection={activeSection}
        isHome={isHome}
        triggerRef={triggerRef}
        navLinks={navLinks}
        socialLinks={socialLinks}
      />
    </>
  );
}