"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { technicalChallenges, SECTIONS } from "@/content/sections";
import type { TechnicalChallenge } from "@/types";

interface TechnicalChallengesProps {
  challenges?: TechnicalChallenge[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function TechnicalChallenges({
  challenges = technicalChallenges,
  sectionsContent = SECTIONS,
  index = "08",
}: TechnicalChallengesProps) {
  return (
    <section id="challenges" className="relative py-20 sm:py-14 lg:py-14">
      <Container>
        <SectionHeading
          badge={sectionsContent.technicalChallenges.badge}
          index={index}
          title={sectionsContent.technicalChallenges.title}
          subtitle={sectionsContent.technicalChallenges.subtitle}
        />

        <StaggerGroup className="space-y-10" staggerDelay={0.12}>
          {challenges.map(({ project, items }, idx) => (
            <StaggerItem key={project}>
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
                <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-sm font-bold text-primary">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {project}
                </h3>
                <div className="grid gap-4 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col rounded-xl border border-border/70 bg-secondary/40 p-5"
                    >
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-primary">
                        Challenge {i + 1}
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{item.problem}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}