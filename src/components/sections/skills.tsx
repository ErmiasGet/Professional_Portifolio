"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { skills, getSkillsByCategory } from "@/data/skills";
import { SKILL_CATEGORIES } from "@/constants";
import { cn } from "@/lib/cn";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  desktop: "Desktop",
  mobile: "Mobile",
  devops: "DevOps",
  languages: "Languages",
  tools: "Tools",
  engineering: "Software Engineering",
};

const INITIAL_VISIBLE = 10;

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredSkills =
    activeCategory === "all" ? skills : getSkillsByCategory(activeCategory);

  const visibleSkills = showAll
    ? filteredSkills
    : filteredSkills.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredSkills.length > INITIAL_VISIBLE;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="Skills"
          title="My Technical Toolkit"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all capitalize",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
              {visibleSkills.map((skill) => (
                <StaggerItem key={`${skill.name}-${skill.category}`}>
                  <GlowCard className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{skill.name}</h4>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                    {skill.yearsOfExperience && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {skill.yearsOfExperience}+ years experience
                      </p>
                    )}
                  </GlowCard>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {hasMore && (
              <ScrollReveal className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group"
                >
                  {showAll ? (
                    <>
                      View Less <ChevronUp className="h-4 w-4 ml-1 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      View All Skills ({filteredSkills.length - INITIAL_VISIBLE} more)
                      <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </Button>
              </ScrollReveal>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
