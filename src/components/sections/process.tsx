"use client";

import {
  Search,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  Settings,
  Lightbulb,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";

const steps = [
  { icon: <Search className="h-5 w-5" />, title: "Discovery", description: "Understanding your goals, requirements, and target audience to create a clear project roadmap." },
  { icon: <Target className="h-5 w-5" />, title: "Planning", description: "Defining project scope, timelines, milestones, and technical architecture." },
  { icon: <PenTool className="h-5 w-5" />, title: "Design", description: "Creating wireframes, mockups, and interactive prototypes with modern design principles." },
  { icon: <Code2 className="h-5 w-5" />, title: "Development", description: "Building clean, scalable, and performant code following best practices." },
  { icon: <TestTube className="h-5 w-5" />, title: "Testing", description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing." },
  { icon: <Rocket className="h-5 w-5" />, title: "Deployment", description: "Deploying to production with CI/CD pipelines and monitoring setup." },
  { icon: <Settings className="h-5 w-5" />, title: "Maintenance", description: "Ongoing support, updates, performance optimization, and feature enhancements." },
  { icon: <Lightbulb className="h-5 w-5" />, title: "Iteration", description: "Continuous improvement based on user feedback, analytics, and evolving requirements." },
];

export function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          badge="Process"
          title="How I Work"
          subtitle="A proven development process that ensures quality and efficiency."
        />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <GlowCard className="group relative p-6 h-full">
                <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  {step.icon}
                </div>
                <h4 className="mb-2 font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
