"use client";

import { GraduationCap, LayoutGrid, MapPin, Mail, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { SECTIONS } from "@/content/sections";
import { PROFILE } from "@/content/profile";

interface AboutProps {
  profile?: typeof PROFILE;
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function About({ profile = PROFILE, sectionsContent = SECTIONS, index = "01" }: AboutProps) {
  const infoItems = [
    { icon: <MapPin className="h-4 w-4" />, label: "Location", value: profile.location },
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <GraduationCap className="h-4 w-4" />,
      label: "Education",
      value: profile.education,
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-13 lg:py-13 bg-secondary/30">
      <Container>
        <SectionHeading
          badge={sectionsContent.about.badge}
          index={index}
          title={sectionsContent.about.title}
          subtitle={sectionsContent.about.subtitle}
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal variant="fade-left" className="lg:col-span-3">
            <div className="space-y-5">
              <p className="text-lg leading-relaxed text-foreground/80">
                {profile.biography[0]}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {profile.biography[1]}
              </p>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  What I&apos;m interested in
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Details</h3>
                <ul className="space-y-4">
                  {infoItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Open to
                </h3>
                <ul className="space-y-2.5">
                  {profile.openTo.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-light hover:underline"
                >
                  Let&apos;s talk about how I can help
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}