"use client";

import { useState } from "react";
import {
  Monitor,
  Layers,
  Cloud,
  BarChart3,
  Zap,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  "message-square": <MessageSquare className="h-6 w-6" />,
};

const INITIAL_VISIBLE = 3;

export function Services() {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? services : services.slice(0, INITIAL_VISIBLE);
  const hasMore = services.length > INITIAL_VISIBLE;

  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          badge="Services"
          title="What I Can Do for You"
          subtitle="Professional services tailored to bring your digital vision to life."
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {visibleServices.map((service) => (
            <StaggerItem key={service.id}>
              <GlowCard className="group p-6 h-full flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-primary/20">
                  {iconMap[service.icon] || <Monitor className="h-6 w-6" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
                  View All Services ({services.length - INITIAL_VISIBLE} more)
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </Button>
          </ScrollReveal>
        )}

        <ScrollReveal className="mt-12 text-center">
          <p className="text-muted-foreground">
            Have a project in mind?{" "}
            <a href="#contact" className="text-primary hover:underline font-medium">
              Let&apos;s discuss it
            </a>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
