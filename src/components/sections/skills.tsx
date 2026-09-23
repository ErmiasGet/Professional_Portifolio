"use client";

import { Bolt, TrendingUp, Rocket, Dot } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { skillGroups } from "@/content/skills";
import { SECTIONS } from "@/content/sections";
import type { SkillGroup } from "@/types";

const hotLabels = {
  core: { icon: Bolt, accent: "border-primary/30 bg-primary/10 text-primary" },
  strong: { icon: Rocket, accent: "border-accent/30 bg-accent/10 text-accent" },
  working: { icon: TrendingUp, accent: "border-border bg-secondary/50 text-muted-foreground" },
};

interface SkillsProps {
  skillGroups?: SkillGroup[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Skills({
  skillGroups: groups = skillGroups,
  sectionsContent = SECTIONS,
  index = "03",
}: SkillsProps) {
  return (
    <section id="skills" className="relative py-20 sm:py-14 lg:py-14 bg-secondary/30">
      <Container>
        <SectionHeading
          badge={sectionsContent.skills.badge}
          index={index}
          title={sectionsContent.skills.title}
          subtitle={sectionsContent.skills.subtitle}
        />

        <StaggerGroup className="grid gap-6 lg:grid-cols-3" staggerDelay={0.1}>
          {groups.map((group) => {
            const label = hotLabels[group.proficiency];
            return (
              <StaggerItem key={group.proficiency}>
                <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition-colors duration-300 hover:border-primary/25">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{group.label}</h3>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${label.accent}`}
                    >
                      <label.icon className="h-3.5 w-3.5" />
                      {group.proficiency === "core"
                        ? "Core"
                        : group.proficiency === "strong"
                          ? "Strong"
                          : "Working"}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/40 px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <Dot className="h-3.5 w-3.5 text-primary/70" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}