"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedProjectCard, ProjectCard } from "@/components/projects/project-card";
import { SECTIONS } from "@/content/sections";
import type { Project } from "@/types";

interface ProjectsProps {
  /** All projects, including Explore Sheka and the rest, are shown. */
  variant?: "home" | "all";
  projects?: Project[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Projects({ projects = [], sectionsContent = SECTIONS, index = "02" }: ProjectsProps) {
  const firstFeatured = projects.find((p) => p.featured);
  const hero = firstFeatured ?? null;
  const gridProjects = projects.filter((p) => p !== hero);

  return (
    <section id="projects" className="relative py-20 sm:py-14 lg:py-14">
      <Container>
        <SectionHeading
          badge={sectionsContent.projects.badge}
          index={index}
          title={sectionsContent.projects.title}
          subtitle={sectionsContent.projects.subtitle}
        />

        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {hero && (
                <div className="mb-6">
                  <FeaturedProjectCard project={hero} />
                </div>
              )}

              {gridProjects.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {gridProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}

              {!hero && gridProjects.length === 0 && (
                <p className="py-20 text-center text-muted-foreground">
                  No projects to show yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </MotionConfig>
      </Container>
    </section>
  );
}