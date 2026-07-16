"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  Send,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { subscribeTheme, getThemeSnapshot, getServerSnapshot, toggleThemeAction } from "@/lib/theme-store";
import { GithubIcon, LinkedinIcon, XIcon, TelegramIcon } from "@/components/shared/social-icons";
import { Logo } from "@/components/shared/logo";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useMediaQuery } from "@/hooks";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialIcons: Record<string, React.ReactNode> = {
    github: <GithubIcon />,
    linkedin: <LinkedinIcon />,
    twitter: <XIcon />,
    send: <TelegramIcon />,
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass shadow-sm"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between sm:h-18">
            <Link href="/" className="group flex items-center gap-2">
              <Logo size={36} />
              <span className="hidden text-lg font-bold sm:block">
                {SITE_CONFIG.name.split(" ")[0]}
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex">
                {SOCIAL_LINKS.slice(0, 3).map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label={social.platform}
                  >
                    {socialIcons[social.icon] || <Send className="h-4 w-4" />}
                  </a>
                ))}
              </div>

              <button
                onClick={toggleThemeAction}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <Link href="#contact" className="hidden sm:block">
                <Button size="sm">Hire Me</Button>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-border"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex gap-2 px-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={social.platform}
                    >
                      {socialIcons[social.icon] || <Send className="h-4 w-4" />}
                    </a>
                  ))}
                </div>
                <div className="px-4 pt-2">
                  <Link href="#contact" onClick={() => setIsOpen(false)} className="w-full">
                    <Button className="w-full">Hire Me</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
