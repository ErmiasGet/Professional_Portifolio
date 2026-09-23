"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sun,
  Home,
  User,
  FolderGit2,
  Briefcase,
  Wrench,
  BookOpen,
  MessageSquare,
  FileText,
  ExternalLink,
  X,
  Send,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import {
  subscribeCommandPalette,
  getCommandPaletteSnapshot,
  getCommandPaletteServerSnapshot,
  closeCommandPalette,
  toggleCommandPalette,
} from "@/lib/command-palette-store";
import { toggleThemeAction } from "@/lib/theme-store";
import { NAV_LINKS, SITE_CONFIG } from "@/content/site";
import { projects } from "@/content/projects";
import type { BlogPostPreview } from "@/lib/blog";
import { cn } from "@/lib/cn";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  external?: boolean;
  searchText?: string;
  action?: () => void;
  icon: React.ReactNode;
}

interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

const navIcons: Record<string, React.ReactNode> = {
  "#home": <Home className="h-4 w-4" />,
  "#about": <User className="h-4 w-4" />,
  "#projects": <FolderGit2 className="h-4 w-4" />,
  "#experience": <Briefcase className="h-4 w-4" />,
  "#skills": <Wrench className="h-4 w-4" />,
  "#blog": <BookOpen className="h-4 w-4" />,
  "#contact": <MessageSquare className="h-4 w-4" />,
};

export function CommandPalette({ blogPosts }: { blogPosts: BlogPostPreview[] }) {
  const isOpen = useSyncExternalStore(
    subscribeCommandPalette,
    getCommandPaletteSnapshot,
    getCommandPaletteServerSnapshot
  );
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const copyEmail = useCallback(() => {
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SITE_CONFIG.email).catch(() => {
        // clipboard unavailable — still show the copied feedback
      });
    }
  }, []);

  const groups = useMemo<CommandGroup[]>(() => {
    const sectionItems: CommandItem[] = NAV_LINKS.map((link) => ({
      id: link.href,
      label: link.label,
      description: "Jump to section",
      href: link.href,
      searchText: link.label,
      icon: navIcons[link.href] || <ArrowRight className="h-4 w-4" />,
    }));

    const projectItems: CommandItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      description: project.tagline,
      href: `/projects/${project.slug}`,
      searchText: [
        project.title,
        project.tagline,
        project.description,
        project.category,
        ...project.technologies,
        ...project.tags,
      ].join(" "),
      icon: <FolderGit2 className="h-4 w-4" />,
    }));

    const postItems: CommandItem[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      description: post.category,
      href: `/blog/${post.slug}`,
      searchText: [post.title, post.description, post.category, ...post.tags].join(" "),
      icon: <FileText className="h-4 w-4" />,
    }));

    return [
      { id: "sections", label: "Jump to Section", items: sectionItems },
      { id: "projects", label: "Projects", items: projectItems },
      { id: "blog", label: "Blog Posts", items: postItems },
      {
        id: "actions",
        label: "Quick Actions",
        items: [
          {
            id: "copy-email",
            label: "Copy Email Address",
            description: SITE_CONFIG.email,
            action: copyEmail,
            icon: <Copy className="h-4 w-4" />,
          },
          {
            id: "theme",
            label: "Toggle Theme",
            action: toggleThemeAction,
            icon: <Sun className="h-4 w-4" />,
          },
          {
            id: "resume",
            label: "Download Resume / CV",
            href: SITE_CONFIG.resume,
            external: true,
            icon: <FileText className="h-4 w-4" />,
          },
        ],
      },
      {
        id: "explore",
        label: "Explore",
        items: [
          {
            id: "projects-index",
            label: "View All Projects",
            href: "/projects",
            searchText: "projects index all cases",
            icon: <FolderGit2 className="h-4 w-4" />,
          },
          {
            id: "blog-index",
            label: "View All Articles",
            href: "/blog",
            searchText: "blog articles index all posts",
            icon: <BookOpen className="h-4 w-4" />,
          },
          {
            id: "github",
            label: "GitHub Profile",
            description: SITE_CONFIG.social.github,
            href: SITE_CONFIG.social.github,
            external: true,
            searchText: "github code source",
            icon: <ExternalLink className="h-4 w-4" />,
          },
          {
            id: "linkedin",
            label: "LinkedIn Profile",
            description: SITE_CONFIG.social.linkedin,
            href: SITE_CONFIG.social.linkedin,
            external: true,
            searchText: "linkedin network career",
            icon: <ExternalLink className="h-4 w-4" />,
          },
          {
            id: "telegram",
            label: "Telegram",
            description: SITE_CONFIG.social.telegram,
            href: SITE_CONFIG.social.telegram,
            external: true,
            searchText: "telegram chat contact",
            icon: <Send className="h-4 w-4" />,
          },
          {
            id: "twitter",
            label: "X / Twitter",
            description: SITE_CONFIG.social.twitter,
            href: SITE_CONFIG.social.twitter,
            external: true,
            searchText: "twitter x social",
            icon: <X className="h-4 w-4" />,
          },
        ],
      },
    ];
  }, [blogPosts, copyEmail]);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (item: CommandItem) =>
      !q ||
      item.label.toLowerCase().includes(q) ||
      (item.description ?? "").toLowerCase().includes(q) ||
      (item.searchText ?? "").toLowerCase().includes(q);

    return groups
      .map((group) => ({ ...group, items: group.items.filter(matches) }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const flatItems = useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups]
  );

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setActiveIndex(0);
      inputRef.current?.focus();
    }, 50);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = (item: CommandItem) => {
    if (item.action) {
      item.action();
      closeCommandPalette();
      return;
    }

    if (!item.href) {
      closeCommandPalette();
      return;
    }

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.href.startsWith("#")) {
      if (pathname === "/") {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${item.href}`);
      }
    } else {
      router.push(item.href);
      window.setTimeout(() => window.scrollTo({ top: 0 }), 0);
    }
    closeCommandPalette();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + flatItems.length) % Math.max(flatItems.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex] ?? flatItems[0];
      if (item) navigate(item);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={closeCommandPalette}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[15%] left-1/2 z-[101] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-palette-list"
                  placeholder="Search sections, projects, posts &amp; actions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <div
                ref={listRef}
                id="command-palette-list"
                role="listbox"
                aria-label="Commands"
                className="max-h-[380px] overflow-y-auto p-2"
              >
                {(() => {
                  let rowIndex = 0;
                  return filteredGroups.map((group) => (
                    <div key={group.id} role="presentation">
                      <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                        {group.label}
                      </p>
                      {group.items.map((item) => {
                        const index = rowIndex;
                        rowIndex += 1;
                        const isCopied = item.id === "copy-email" && copiedEmail;
                        return (
                          <button
                            key={`${group.id}-${item.id}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            data-index={index}
                            onClick={() => navigate(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                              index === activeIndex
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                                index === activeIndex
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary/50",
                                isCopied && "text-success"
                              )}
                            >
                              {isCopied ? <Check className="h-4 w-4" /> : item.icon}
                            </span>
                            <span className="flex-1 truncate">{item.label}</span>
                            {isCopied ? (
                              <span className="text-xs font-medium text-success">Copied!</span>
                            ) : (
                              item.description && (
                                <span className="hidden max-w-[200px] truncate text-xs text-muted-foreground/70 sm:block">
                                  {item.description}
                                </span>
                              )
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()}
                {flatItems.length === 0 && (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No results found.
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}