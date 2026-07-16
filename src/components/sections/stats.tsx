"use client";

import {
  FolderOpen,
  Cpu,
  GitBranch,
  Heart,
  Calendar,
  Coffee,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { useCountUp } from "@/hooks";
import { STATS } from "@/constants";

const iconMap: Record<string, React.ReactNode> = {
  "folder-open": <FolderOpen className="h-6 w-6" />,
  cpu: <Cpu className="h-6 w-6" />,
  "git-branch": <GitBranch className="h-6 w-6" />,
  heart: <Heart className="h-6 w-6" />,
  calendar: <Calendar className="h-6 w-6" />,
  coffee: <Coffee className="h-6 w-6" />,
};

function StatCard({ label, value, suffix, icon }: { label: string; value: number; suffix?: string; icon: string }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <StaggerItem>
      <GlowCard className="p-6 text-center">
        <div ref={ref} className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
            {iconMap[icon] || <FolderOpen className="h-6 w-6" />}
          </div>
          <div className="text-3xl font-bold sm:text-4xl">
            {count}
            {suffix && <span className="text-primary">{suffix}</span>}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </GlowCard>
    </StaggerItem>
  );
}

export function Stats() {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <SectionHeading
          badge="By the Numbers"
          title="Snapshot of My Journey"
          subtitle="A quick overview of my professional milestones and achievements."
        />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
