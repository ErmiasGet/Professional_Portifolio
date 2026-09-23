"use client";

import { useEffect, useRef, useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { ToastViewport } from "@/components/admin/toast-viewport";

export function AdminShell({
  adminName,
  unreadMessages,
  children,
}: {
  adminName: string;
  unreadMessages?: number;
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isMobileOpen]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-card/40 lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar unreadMessages={unreadMessages} />
        </div>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setIsMobileOpen(false)}
          />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-card shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
          >
            <AdminSidebar
              unreadMessages={unreadMessages}
              onNavigate={() => setIsMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          adminName={adminName}
          unreadMessages={unreadMessages}
          onOpenMenu={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <ToastViewport />
    </div>
  );
}