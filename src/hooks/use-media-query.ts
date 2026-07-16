"use client";

import { useSyncExternalStore } from "react";

function getMediaQuerySnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function subscribeToMediaQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    () => false
  );
}
