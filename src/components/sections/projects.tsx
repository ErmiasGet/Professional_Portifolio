"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ImageIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/social-icons";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { projects, getProjectsByCategory } from "@/data/projects";
import { PROJECT_CATEGORIES } from "@/constants";
import { cn } from "@/lib/cn";

const categoryLabels: Record<string, string> = {
  all: "All",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  saas: "SaaS",
  mobile: "Mobile",
  desktop: "Desktop",
  other: "Other",
};

const INITIAL_VISIBLE = 3;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "all" ? projects : getProjectsByCategory(activeCategory);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredProjects.length > INITIAL_VISIBLE;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  return (
    <section id="projects" className="relative py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          badge="Projects"
          title="Featured Work"
          subtitle="A selection of projects that showcase my skills and expertise."
        />

        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
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
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {visibleProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <GlowCard className="group overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-primary/20">
                            {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="primary">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Link href={`/projects/${project.slug}`}>
                          <Button size="sm" variant="ghost" className="group/btn">
                            View Case Study
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <GithubIcon />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
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
                      View All Projects ({filteredProjects.length - INITIAL_VISIBLE} more)
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
