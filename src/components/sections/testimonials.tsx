"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { testimonials } from "@/content/testimonials";
import { SECTIONS } from "@/content/sections";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials?: Testimonial[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Testimonials({
  testimonials: items = testimonials,
  sectionsContent = SECTIONS,
  index = "10",
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  if (items.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="relative py-20 sm:py-14 lg:py-14">
      <Container>
        <SectionHeading
          badge={sectionsContent.testimonials.badge}
          index={index}
          title={sectionsContent.testimonials.title}
          subtitle={sectionsContent.testimonials.subtitle}
        />

        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <GlowCard className="p-8 sm:p-10">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-6 bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
                    <Quote className="h-4 w-4 text-primary/60" />
                  </div>
                  <blockquote className="mb-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                    &quot;{items[current].content}&quot;
                  </blockquote>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold">{items[current].name}</p>
                      {items[current].context && (
                        <span className="rounded-full border border-border/70 bg-secondary/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {items[current].context}
                        </span>
                      )}
                      {items[current].project && (
                        <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          {items[current].project}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {items[current].role}
                      {items[current].company && ` at ${items[current].company}`}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Testimonials">
                {items.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
