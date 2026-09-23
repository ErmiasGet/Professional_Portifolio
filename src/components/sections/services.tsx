"use client";

import { Monitor, Layers, Cloud, Server, Building2, Boxes } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { services } from "@/content/services";
import { SECTIONS } from "@/content/sections";
import type { Service } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  building: <Building2 className="h-6 w-6" />,
  boxes: <Boxes className="h-6 w-6" />,
};

interface ServicesProps {
  services?: Service[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Services({
  services: items = services,
  sectionsContent = SECTIONS,
  index = "07",
}: ServicesProps) {
  return (
    <section id="services" className="relative py-20 sm:py-14 lg:py-14 bg-secondary/30">
      <Container>
        <SectionHeading
          badge={sectionsContent.services.badge}
          index={index}
          title={sectionsContent.services.title}
          subtitle={sectionsContent.services.subtitle}
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {items.map((service) => (
            <StaggerItem key={service.id}>
              <div className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 card-glow hover:border-primary/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  {iconMap[service.icon] || <Monitor className="h-5 w-5" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.technologies && service.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={service.cta?.href ?? "/#contact"}
                  className="group/cta mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Discuss this service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 text-center">
          <Link href="/#contact">
            <Button variant="outline" size="lg" className="group">
              {items[0]?.cta?.label ?? "Discuss Your Project"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}