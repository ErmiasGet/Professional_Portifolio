"use client";

let listeners: Array<() => void> = [];

export function emitThemeChange() {
  for (const listener of listeners) listener();
}

export function subscribeTheme(callback: () => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

export function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getServerSnapshot() {
  return "light" as const;
}

export function toggleThemeAction() {
  const isDark = !document.documentElement.classList.contains("dark");
  const html = document.documentElement;
  html.classList.add("theme-smooth");
  html.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  emitThemeChange();
  window.setTimeout(() => html.classList.remove("theme-smooth"), 320);
}
