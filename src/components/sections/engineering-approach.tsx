"use client";

import {
  Search,
  ClipboardList,
  Code2,
  FlaskConical,
  Rocket,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { engineeringSteps, SECTIONS } from "@/content/sections";
import type { EngineeringStep } from "@/types";

const stepIcons: Record<string, LucideIcon> = {
  search: Search,
  "clipboard-list": ClipboardList,
  code2: Code2,
  "flask-conical": FlaskConical,
  rocket: Rocket,
  "line-chart": LineChart,
};

interface EngineeringApproachProps {
  steps?: EngineeringStep[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function EngineeringApproach({
  steps = engineeringSteps,
  sectionsContent = SECTIONS,
  index = "06",
}: EngineeringApproachProps) {
  return (
    <section id="approach" className="relative py-20 sm:py-24 lg:py-14">
      <Container>
        <SectionHeading
          badge={sectionsContent.engineeringApproach.badge}
          index={index}
          title={sectionsContent.engineeringApproach.title}
          subtitle={sectionsContent.engineeringApproach.subtitle}
        />

        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {steps.map((step, i) => {
            const Icon = stepIcons[step.icon] ?? Rocket;
            return (
              <StaggerItem key={step.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/25">
                  <span
                    className="pointer-events-none absolute -right-3 -top-6 select-none text-7xl font-bold text-primary/5 transition-colors group-hover:text-primary/10"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}