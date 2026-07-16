"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { skills } from "@/data/skills";

const techColors: Record<string, string> = {
  "React.js": "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#339933",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Docker: "#2496ED",
  Git: "#F05032",
  "Spring Boot": "#6DB33F",
  Electron: "#47848F",
  "React Native": "#61DAFB",
  Expo: "#000020",
  Java: "#ED8B00",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  "Express.js": "#000000",
  Prisma: "#2D3748",
  Figma: "#F24E1E",
  Vercel: "#000000",
};

const uniqueSkills = [...new Map(skills.map(s => [s.name, s])).values()];
const topSkills = uniqueSkills.sort((a, b) => b.level - a.level).slice(0, 20);

export function TechStack() {
  return (
    <section id="tech-stack" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="Tech Stack"
          title="Technologies I Love"
          subtitle="The technologies that power my development workflow."
        />
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {topSkills.map((skill, i) => {
              const color = techColors[skill.name] || "hsl(var(--primary))";
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-all hover:shadow-lg cursor-default"
                  style={{ borderColor: `${color}20` }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
