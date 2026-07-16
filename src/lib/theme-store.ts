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
  const newDark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", newDark);
  localStorage.setItem("theme", newDark ? "dark" : "light");
  emitThemeChange();
}
