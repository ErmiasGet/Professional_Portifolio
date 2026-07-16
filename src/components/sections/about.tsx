"use client";

import {
  Target,
  Eye,
  Rocket,
  Code2,
  Heart,
  Lightbulb,
  Users,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";

const timelineItems = [
  {
    year: "2017",
    title: "Preparatory Education",
    description: "Completed preparatory education at Masha Preparatory School with strong academic performance.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    year: "2022",
    title: "Started B.Sc. in Software Engineering",
    description: "Began studying Software Engineering at Wolkite University, diving deep into OOP, algorithms, databases, and web development.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    year: "2023",
    title: "Independent Full Stack Developer",
    description: "Started building professional software systems including rental platforms, healthcare SaaS, and tourism platforms.",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    year: "2025",
    title: "Software Developer Intern",
    description: "Internship at Wolkite University ICT Directorate, developing enterprise software solutions.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    year: "2026",
    title: "Graduating with B.Sc.",
    description: "Completing Software Engineering degree with extensive hands-on experience in full-stack development.",
    icon: <Users className="h-5 w-5" />,
  },
];

const values = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code that stands the test of time.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation",
    description: "Staying current with latest technologies and finding creative solutions to complex problems.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "User-Centric",
    description: "Building with empathy, always prioritizing user experience and accessibility.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Attention to Detail",
    description: "Pixel-perfect implementations with meticulous attention to design and interactions.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="About Me"
          title="Passionate About Building Digital Experiences"
          subtitle="A dedicated software engineer with a love for creating elegant solutions to complex problems."
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal variant="fade-left">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I am a passionate <strong className="text-foreground">Software Engineer</strong> with strong
                experience designing and developing scalable software systems, enterprise applications,
                and modern web solutions based in Addis Ababa, Ethiopia.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I specialize in building responsive frontend applications, secure backend APIs, modern
                databases, desktop applications with Electron, and cross-platform mobile applications
                using React Native and Expo. I enjoy solving complex business problems through software
                engineering while following SDLC, Requirement Engineering, Agile methodologies, and
                clean software architecture.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My goal is to create digital solutions that are scalable, maintainable, secure,
                and user-friendly. My interests include Full Stack Development, Frontend Engineering,
                Backend Engineering, SaaS Development, Software Architecture, Cloud Deployment,
                Database Design, Requirement Engineering, UI/UX Implementation, Artificial Intelligence,
                and Enterprise Software Development.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">Ermias Getahun</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">abe.jere.jesus@gmail.com</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Addis Ababa, Ethiopia</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="font-medium text-success">Open to opportunities</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right">
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-lg font-semibold">My Journey</h3>
                <div className="relative space-y-8">
                  <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
                  {timelineItems.map((item) => (
                    <div key={item.year} className="relative flex gap-4">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary">{item.year}</span>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-20">
          <ScrollReveal>
            <h3 className="mb-8 text-center text-lg font-semibold">Core Values</h3>
          </ScrollReveal>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <GlowCard className="p-6 text-center h-full">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    {value.icon}
                  </div>
                  <h4 className="mb-2 font-semibold">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
