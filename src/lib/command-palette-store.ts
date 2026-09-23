"use client";

let listeners: Array<() => void> = [];
let isOpen = false;

function emitChange() {
  for (const listener of listeners) listener();
}

export function subscribeCommandPalette(callback: () => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

export function getCommandPaletteSnapshot() {
  return isOpen;
}

export function getCommandPaletteServerSnapshot() {
  return false;
}

export function openCommandPalette() {
  isOpen = true;
  emitChange();
}

export function closeCommandPalette() {
  isOpen = false;
  emitChange();
}

export function toggleCommandPalette() {
  isOpen = !isOpen;
  emitChange();
}