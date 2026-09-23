"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import type { Project } from "@/types";

interface GalleryItem {
  src: string;
  caption: string;
}

export function ProjectGallery({ project }: { project: Project }) {
  const items = useMemo<GalleryItem[]>(() => {
    const sources =
      project.screenshots && project.screenshots.length > 0
        ? project.screenshots
        : [project.image];
    return sources.map((src) => ({
      src,
      caption: `${project.title} — ${project.tagline}`,
    }));
  }, [project]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((current) => (current + dir + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step, close]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => openAt(i)}
            className="group/thumb relative aspect-video overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open ${item.caption}`}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover object-top transition-transform duration-500 group-hover/thumb:scale-[1.03]"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/45 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900">
                <Maximize2 className="h-3 w-3" />
                View
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot gallery`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="flex h-full w-full max-w-6xl flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="font-semibold text-zinc-100">
                    {index + 1} / {items.length}
                  </span>
                  <span className="hidden truncate sm:inline">{project.title}</span>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-zinc-100 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="absolute left-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-zinc-100 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-left-14"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="absolute right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-zinc-100 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-right-14"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={items[index].src}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-full max-h-[78vh] w-full max-w-5xl"
                  >
                    <Image
                      src={items[index].src}
                      alt={items[index].caption}
                      fill
                      sizes="(max-width: 768px) 100vw, calc(100vw - 4rem)"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="pb-2 pt-4 text-center text-sm text-zinc-400">
                {items[index].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}