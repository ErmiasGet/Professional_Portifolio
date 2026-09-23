"use client";

import { Building2, Cloud, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { capabilityGroups, SECTIONS } from "@/content/sections";
import type { CapabilityGroup } from "@/types";

const groupIcons: Record<string, LucideIcon> = {
  building2: Building2,
  cloud: Cloud,
  "monitor-smartphone": MonitorSmartphone,
};

interface WhatICanBuildProps {
  groups?: CapabilityGroup[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function WhatICanBuild({
  groups = capabilityGroups,
  sectionsContent = SECTIONS,
  index = "04",
}: WhatICanBuildProps) {
  return (
    <section id="capabilities" className="relative py-20 sm:py-14 lg:py-14">
      <Container>
        <SectionHeading
          badge={sectionsContent.whatICanBuild.badge}
          index={index}
          title={sectionsContent.whatICanBuild.title}
          subtitle={sectionsContent.whatICanBuild.subtitle}
        />

        <StaggerGroup className="grid gap-6 lg:grid-cols-3" staggerDelay={0.1}>
          {groups.map((group) => {
            const Icon = groupIcons[group.icon] ?? MonitorSmartphone;
            return (
              <StaggerItem key={group.title}>
                <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/25 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {item}
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