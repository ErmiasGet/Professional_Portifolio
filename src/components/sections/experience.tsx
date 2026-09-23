"use client";

import { Briefcase, GraduationCap, Hammer, CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { experiences, education } from "@/content/experience";
import { SECTIONS } from "@/content/sections";
import { formatDate } from "@/utils";
import type { Experience, Education } from "@/types";

interface ExperienceProps {
  experiences?: Experience[];
  education?: Education[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Experience({
  experiences: items = experiences,
  education: educationItems = education,
  sectionsContent = SECTIONS,
  index = "05",
}: ExperienceProps) {
  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-14 bg-secondary/30">
      <Container>
        <SectionHeading
          badge={sectionsContent.experience.badge}
          index={index}
          title={sectionsContent.experience.title}
          subtitle={sectionsContent.experience.subtitle}
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <ScrollReveal>
              <h3 className="mb-8 flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </h3>
            </ScrollReveal>
            <StaggerGroup className="relative space-y-8" staggerDelay={0.15}>
              <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
              {items.map((exp) => (
                <StaggerItem key={exp.id}>
                  <article className="relative flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge
                          variant="primary"
                          className="capitalize"
                        >
                          {exp.type === "independent" ? "Independent" : exp.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold">{exp.role}</h4>
                      <p className="text-sm font-medium text-primary">{exp.company}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>

                      {exp.systems && exp.systems.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {exp.systems.map((system) => (
                            <div
                              key={system.name}
                              className="rounded-xl border border-border bg-secondary/40 p-3.5"
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="text-sm font-semibold">{system.name}</h5>
                                <Badge
                                  variant={system.contribution === "built" ? "accent" : "outline"}
                                  className="text-[10px]"
                                >
                                  {system.contribution === "built" ? "Built" : "Contributed to"}
                                </Badge>
                              </div>
                              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                {system.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.technologies.slice(0, 6).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <ul className="mt-3 space-y-1.5">
                        {exp.achievements.map((a) => (
                          <li
                            key={a}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div>
            <ScrollReveal>
              <h3 className="mb-8 flex items-center gap-2 text-lg font-semibold">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
            </ScrollReveal>
            <StaggerGroup className="relative space-y-8" staggerDelay={0.15}>
              <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
              {educationItems.map((edu) => (
                <StaggerItem key={edu.id}>
                  <article className="relative flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{edu.field}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold">
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-sm font-medium text-accent">{edu.institution}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {edu.highlights.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <ScrollReveal className="mt-10">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-5">
                <Hammer className="h-8 w-8 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Recent coursework and project work are reflected directly in the systems shown
                  throughout this portfolio — rather than an exhaustive list of every topic studied.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}