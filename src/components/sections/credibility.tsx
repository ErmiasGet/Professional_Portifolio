"use client";

import { GraduationCap, Layers, Cloud, Monitor } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { CREDIBILITY_ITEMS } from "@/content/site";

const iconMap: Record<string, React.ReactNode> = {
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  cloud: <Cloud className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
};

interface CredibilityProps {
  items?: typeof CREDIBILITY_ITEMS;
}

export function Credibility({ items = CREDIBILITY_ITEMS }: CredibilityProps) {
  return (
    <section
      id="credibility"
      aria-label="Professional background"
      className="relative border-y border-border/70 bg-secondary/20 py-12 sm:py-14"
    >
      <Container>
        <StaggerGroup
          className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {items.map((item, i) => (
            <StaggerItem
              key={item.id}
              className={i > 0 ? "lg:pl-8 lg:border-l lg:border-border/70" : ""}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary">
                  {iconMap[item.icon] || <Layers className="h-5 w-5" />}
                </span>
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}