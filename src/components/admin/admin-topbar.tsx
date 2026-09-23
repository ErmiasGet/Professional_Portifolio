"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { AdminThemeToggle } from "@/components/admin/admin-theme-toggle";

export function AdminTopbar({
  adminName,
  unreadMessages,
  onOpenMenu,
}: {
  adminName: string;
  unreadMessages?: number;
  onOpenMenu: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const logout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await apiFetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // Even if the server call fails, drop the session locally.
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <MenuIcon />
        </button>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight sm:hidden">Admin</span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Signed in as <span className="font-medium text-foreground">{adminName}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {typeof unreadMessages === "number" && unreadMessages > 0 && (
          <Link
            href="/admin/messages"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 sm:flex"
          >
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {unreadMessages}
            </span>
            Unread
          </Link>
        )}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="View live site"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">View Site</span>
        </a>
        <AdminThemeToggle />
        <div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initialOf(adminName)}
          </span>
        </div>
        <button
          onClick={logout}
          disabled={busy}
          className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function initialOf(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "A";
}