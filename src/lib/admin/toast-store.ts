"use client";

let listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];
let idCounter = 0;

const EMPTY_TOASTS: Toast[] = [];

export interface Toast {
  id: number;
  kind: "success" | "error" | "info";
  message: string;
}

function emit() {
  for (const listener of listeners) listener(toasts);
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function showToast(message: string, kind: Toast["kind"] = "success") {
  const id = ++idCounter;
  toasts = [...toasts, { id, kind, message }];
  emit();
  window.setTimeout(() => dismiss(id), 4200);
}

export function subscribeToasts(callback: (toasts: Toast[]) => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

export function getToastsSnapshot(): Toast[] {
  return toasts;
}

export function getToastsServerSnapshot(): Toast[] {
  return EMPTY_TOASTS;
}

export function dismissToast(id: number) {
  dismiss(id);
}