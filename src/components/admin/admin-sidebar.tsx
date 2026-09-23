"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  Sparkles,
  GraduationCap,
  Award,
  Layers,
  Newspaper,
  MessageSquareQuote,
  Mail,
  Settings,
  User,
  Inbox,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: "dashboard" | "projects" | "experience" | "skills" | "education" | "certifications" | "services" | "blog" | "testimonials" | "messages" | "settings" | "profile" | "audit";
  badge?: "messages";
}

export const ADMIN_NAV: { group: string; items: AdminNavItem[] }[] = [
  {
    group: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" }],
  },
  {
    group: "Content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: "projects" },
      { href: "/admin/experience", label: "Experience", icon: "experience" },
      { href: "/admin/education", label: "Education", icon: "education" },
      { href: "/admin/skills", label: "Skill Groups", icon: "skills" },
      { href: "/admin/services", label: "Services", icon: "services" },
      { href: "/admin/certifications", label: "Certifications", icon: "certifications" },
      { href: "/admin/blog", label: "Blog Posts", icon: "blog" },
      { href: "/admin/testimonials", label: "Testimonials", icon: "testimonials" },
    ],
  },
  {
    group: "Communication",
    items: [
      { href: "/admin/messages", label: "Messages", icon: "messages", badge: "messages" },
    ],
  },
  {
    group: "Website",
    items: [{ href: "/admin/settings", label: "Site Settings", icon: "settings" }],
  },
  {
    group: "Account",
    items: [
      { href: "/admin/profile", label: "Profile", icon: "profile" },
      { href: "/admin/audit", label: "Audit Log", icon: "audit" },
    ],
  },
];

const ICONS: Record<AdminNavItem["icon"], React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  projects: FolderKanban,
  experience: BriefcaseBusiness,
  skills: Sparkles,
  education: GraduationCap,
  certifications: Award,
  services: Layers,
  blog: Newspaper,
  testimonials: MessageSquareQuote,
  messages: Inbox,
  settings: Settings,
  profile: User,
  audit: ScrollText,
};

export function AdminSidebar({
  unreadMessages,
  onNavigate,
}: {
  unreadMessages?: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
      <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-2" onClick={onNavigate}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
          E
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight">Ermias Admin</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Portfolio Manager
          </span>
        </span>
      </Link>

      <nav className="flex flex-col gap-6" aria-label="Admin navigation">
        {ADMIN_NAV.map(({ group, items }) => (
          <div key={group} className="flex flex-col gap-1">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {group}
            </p>
            {items.map((item) => {
              const active = isActive(item.href);
              const Icon = ICONS[item.icon];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge === "messages" && (unreadMessages ?? 0) > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                      {unreadMessages}
                    </span>
                  )}
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          onClick={onNavigate}
        >
          <Mail className="h-4 w-4 shrink-0" />
          View Live Site
        </Link>
      </div>
    </div>
  );
}