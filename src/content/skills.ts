import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    proficiency: "core",
    label: "Core",
    description: "Technologies I use most frequently across full-stack projects.",
    skills: [
      { name: "JavaScript", category: "languages", featured: true },
      { name: "TypeScript", category: "languages", featured: true },
      { name: "React", category: "frontend", featured: true },
      { name: "Next.js", category: "frontend", featured: true },
      { name: "Node.js", category: "backend", featured: true },
      { name: "NestJS", category: "backend", featured: true },
    ],
  },
  {
    proficiency: "strong",
    label: "Strong",
    description: "Technologies I have substantial project experience with.",
    skills: [
      { name: "Express.js", category: "backend" },
      { name: "REST API Design", category: "engineering" },
      { name: "PostgreSQL", category: "database" },
      { name: "MongoDB", category: "database" },
      { name: "Prisma ORM", category: "database" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "React Native", category: "mobile" },
      { name: "Expo", category: "mobile" },
      { name: "Electron", category: "desktop" },
      { name: "JWT Authentication", category: "backend" },
      { name: "RBAC", category: "engineering" },
      { name: "Redux Toolkit", category: "frontend" },
    ],
  },
  {
    proficiency: "working",
    label: "Working Knowledge",
    description: "Technologies I have used and continue to develop.",
    skills: [
      { name: "Spring Boot", category: "backend" },
      { name: "MySQL", category: "database" },
      { name: "Mongoose", category: "database" },
      { name: "Bootstrap", category: "frontend" },
      { name: "Docker", category: "devops" },
      { name: "Database Design", category: "engineering" },
      { name: "System Design", category: "engineering" },
      { name: "Requirements Engineering", category: "engineering" },
      { name: "Testing", category: "engineering" },
      { name: "Git", category: "tools" },
      { name: "GitHub", category: "tools" },
      { name: "Postman", category: "tools" },
      { name: "Figma", category: "tools" },
      { name: "Deployment", category: "devops" },
    ],
  },
];

export const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, proficiency: group.proficiency }))
);