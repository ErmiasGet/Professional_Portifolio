"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SOCIAL_LINKS } from "@/content/site";
import { Container } from "@/components/ui/container";
import { NAVBAR_DRAWER_TOP_CLASS, resolveHref } from "@/lib/navigation";
import { SOCIAL_ICONS } from "@/components/shared/social-icons";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
  isHome: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  navLinks?: typeof NAV_LINKS;
  socialLinks?: typeof SOCIAL_LINKS;
}

export function MobileNav({
  open,
  onClose,
  activeSection,
  isHome,
  triggerRef,
  navLinks = NAV_LINKS,
  socialLinks = SOCIAL_LINKS,
}: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const closeAndRestoreFocus = () => {
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          tabIndex={-1}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "fixed inset-x-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl outline-none lg:hidden",
            NAVBAR_DRAWER_TOP_CLASS
          )}
        >
          <Container className="py-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </p>
              <button
                type="button"
                onClick={closeAndRestoreFocus}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = isHome && activeSection === id;
                  return (
                    <li key={link.href}>
                      <Link
                        href={resolveHref(pathname, link.href)}
                        onClick={closeAndRestoreFocus}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition-colors",
                            isActive ? "bg-primary" : "bg-border"
                          )}
                          aria-hidden="true"
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="my-4 h-px w-full bg-border" aria-hidden="true" />

            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <div className="flex gap-2 px-4">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>

            <div className="px-4 pt-4">
              <Link
                href={resolveHref(pathname, "#contact")}
                onClick={closeAndRestoreFocus}
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light active:scale-[0.98]"
              >
                Hire Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}