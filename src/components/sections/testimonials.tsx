"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { testimonials } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="Testimonials"
          title="What Clients Say"
          subtitle="Feedback from people who have experienced my work."
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
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    &quot;{testimonials[current].content}&quot;
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonials[current].name}</p>
                    <p className="text-sm text-primary">
                      {testimonials[current].role} at {testimonials[current].company}
                    </p>
                    {testimonials[current].project && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Project: {testimonials[current].project}
                      </p>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === current ? "w-8 bg-primary" : "w-2 bg-border"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
