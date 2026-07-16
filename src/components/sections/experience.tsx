"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { experiences, education } from "@/data/experience";
import { formatDate } from "@/utils";

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="Experience"
          title="My Professional Journey"
          subtitle="A timeline of my career growth and educational background."
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
              <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
              {experiences.map((exp) => (
                <StaggerItem key={exp.id}>
                  <div className="relative flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <GlowCard className="flex-1 p-5">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge variant="primary" className="capitalize">{exp.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold">{exp.role}</h4>
                      <p className="text-sm font-medium text-primary">{exp.company}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.technologies.slice(0, 5).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                      <ul className="mt-3 space-y-1">
                        {exp.achievements.slice(0, 3).map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </div>
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
              <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
              {education.map((edu) => (
                <StaggerItem key={edu.id}>
                  <div className="relative flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <GlowCard className="flex-1 p-5">
                      <span className="text-xs text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                      <h4 className="mt-1 text-base font-semibold">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm font-medium text-primary">{edu.institution}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                      <div className="mt-3 space-y-1">
                        {edu.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground list-none">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {a}
                          </li>
                        ))}
                      </div>
                    </GlowCard>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
