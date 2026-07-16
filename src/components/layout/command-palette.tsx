"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Sun, ExternalLink } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";
import { toggleThemeAction } from "@/lib/theme-store";

interface CommandItem {
  id: string;
  label: string;
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const items: CommandItem[] = [
    ...NAV_LINKS.map((link) => ({
      id: link.href,
      label: link.label,
      href: link.href,
      icon: <ArrowRight className="h-4 w-4" />,
    })),
    {
      id: "theme",
      label: "Toggle Theme",
      action: toggleThemeAction,
      icon: <Sun className="h-4 w-4" />,
    },
    {
      id: "github",
      label: "GitHub Profile",
      href: SITE_CONFIG.github,
      icon: <ExternalLink className="h-4 w-4" />,
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      href: SITE_CONFIG.linkedin,
      icon: <ExternalLink className="h-4 w-4" />,
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePalette]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground sm:flex"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-4 inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={closePalette}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[15%] left-1/2 z-[101] w-full max-w-lg -translate-x-1/2 rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Type a command..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else if (item.href) {
                        if (item.href.startsWith("#")) {
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          window.open(item.href, "_blank");
                        }
                      }
                      closePalette();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                {filteredItems.length === 0 && (
                  <p className="py-4 text-center text-sm text-muted-foreground">No results found.</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
