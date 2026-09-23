"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import {
  subscribeToasts,
  getToastsSnapshot,
  getToastsServerSnapshot,
  dismissToast,
} from "@/lib/admin/toast-store";
import { cn } from "@/lib/cn";

export function ToastViewport() {
  const toasts = useSyncExternalStore(
    subscribeToasts,
    getToastsSnapshot,
    getToastsServerSnapshot
  );

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.kind === "success"
            ? CheckCircle2
            : toast.kind === "error"
              ? XCircle
              : Info;
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border bg-card p-3.5 shadow-lg",
              toast.kind === "success" && "border-success/30",
              toast.kind === "error" && "border-destructive/30",
              toast.kind === "info" && "border-border"
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                toast.kind === "success" && "text-success",
                toast.kind === "error" && "text-destructive",
                toast.kind === "info" && "text-primary"
              )}
            />
            <p className="flex-1 text-sm leading-snug">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}