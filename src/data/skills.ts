import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", level: 90, category: "frontend", yearsOfExperience: 3 },
  { name: "Next.js", level: 85, category: "frontend", yearsOfExperience: 2 },
  { name: "JavaScript", level: 90, category: "frontend", yearsOfExperience: 4 },
  { name: "TypeScript", level: 82, category: "frontend", yearsOfExperience: 2 },
  { name: "HTML5", level: 95, category: "frontend", yearsOfExperience: 5 },
  { name: "CSS3", level: 90, category: "frontend", yearsOfExperience: 5 },
  { name: "Tailwind CSS", level: 88, category: "frontend", yearsOfExperience: 3 },
  { name: "Bootstrap", level: 85, category: "frontend", yearsOfExperience: 3 },
  { name: "Framer Motion", level: 75, category: "frontend", yearsOfExperience: 1 },
  { name: "Responsive Design", level: 92, category: "frontend", yearsOfExperience: 4 },

  // Backend
  { name: "Node.js", level: 85, category: "backend", yearsOfExperience: 3 },
  { name: "Express.js", level: 82, category: "backend", yearsOfExperience: 3 },
  { name: "Spring Boot", level: 75, category: "backend", yearsOfExperience: 2 },
  { name: "REST APIs", level: 88, category: "backend", yearsOfExperience: 3 },
  { name: "JWT Authentication", level: 80, category: "backend", yearsOfExperience: 2 },
  { name: "Prisma ORM", level: 78, category: "backend", yearsOfExperience: 2 },
  { name: "Firebase Cloud Messaging", level: 72, category: "backend", yearsOfExperience: 1 },

  // Database
  { name: "PostgreSQL", level: 80, category: "database", yearsOfExperience: 2 },
  { name: "MongoDB", level: 82, category: "database", yearsOfExperience: 3 },
  { name: "MySQL", level: 75, category: "database", yearsOfExperience: 2 },
  { name: "SQL", level: 80, category: "database", yearsOfExperience: 3 },

  // Desktop Development
  { name: "Electron", level: 75, category: "desktop", yearsOfExperience: 1 },
  { name: "Electron Builder", level: 70, category: "desktop", yearsOfExperience: 1 },
  { name: "Desktop App Development", level: 72, category: "desktop", yearsOfExperience: 1 },

  // Mobile Development
  { name: "React Native", level: 75, category: "mobile", yearsOfExperience: 1 },
  { name: "Expo", level: 72, category: "mobile", yearsOfExperience: 1 },
  { name: "Cross-Platform Development", level: 74, category: "mobile", yearsOfExperience: 1 },

  // DevOps & Deployment
  { name: "Docker", level: 72, category: "devops", yearsOfExperience: 1 },
  { name: "Vercel", level: 85, category: "devops", yearsOfExperience: 2 },
  { name: "Render", level: 75, category: "devops", yearsOfExperience: 1 },
  { name: "Netlify", level: 70, category: "devops", yearsOfExperience: 1 },

  // Programming Languages
  { name: "JavaScript", level: 90, category: "languages", yearsOfExperience: 4 },
  { name: "TypeScript", level: 82, category: "languages", yearsOfExperience: 2 },
  { name: "Java", level: 75, category: "languages", yearsOfExperience: 3 },
  { name: "Python", level: 72, category: "languages", yearsOfExperience: 2 },
  { name: "C++", level: 75, category: "languages", yearsOfExperience: 4 },

  // Tools
  { name: "Git", level: 88, category: "tools", yearsOfExperience: 4 },
  { name: "GitHub", level: 88, category: "tools", yearsOfExperience: 4 },
  { name: "VS Code", level: 92, category: "tools", yearsOfExperience: 5 },
  { name: "Postman", level: 85, category: "tools", yearsOfExperience: 3 },
  { name: "Figma", level: 75, category: "tools", yearsOfExperience: 2 },
  { name: "Cloudinary", level: 72, category: "tools", yearsOfExperience: 1 },

  // Software Engineering
  { name: "SDLC", level: 80, category: "engineering", yearsOfExperience: 3 },
  { name: "Requirement Engineering", level: 78, category: "engineering", yearsOfExperience: 3 },
  { name: "Agile", level: 78, category: "engineering", yearsOfExperience: 2 },
  { name: "System Design", level: 72, category: "engineering", yearsOfExperience: 2 },
  { name: "Object-Oriented Programming", level: 82, category: "engineering", yearsOfExperience: 3 },
  { name: "Software Testing", level: 75, category: "engineering", yearsOfExperience: 2 },
  { name: "Problem Solving", level: 85, category: "engineering", yearsOfExperience: 5 },
];

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((s) => s.category === category);
}
