import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description:
      "Complete web applications from frontend to backend and database, built as one coherent system.",
    icon: "layers",
    features: [
      "React & Next.js frontends",
      "Node.js, Express & NestJS backends",
      "Database design and integration",
      "Authentication and authorization",
    ],
    technologies: ["React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "MongoDB"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=fullstack" },
  },
  {
    id: "saas",
    title: "SaaS Development",
    description:
      "Multi-tenant platforms with dashboards, authentication, RBAC, subscriptions and business workflows.",
    icon: "cloud",
    features: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Subscription and plan handling",
      "Admin and business dashboards",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "RBAC", "Multi-Tenancy"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=saas" },
  },
  {
    id: "business-software",
    title: "Business Software",
    description:
      "Custom systems for businesses that want to replace manual processes with structured digital workflows.",
    icon: "building",
    features: [
      "Management and records systems",
      "Payments, contracts and reporting",
      "Workflow digitization",
      "Reporting and dashboards",
    ],
    technologies: ["React", "Spring Boot", "Express.js", "PostgreSQL"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=business-software" },
  },
  {
    id: "api-backend",
    title: "API & Backend Development",
    description:
      "REST APIs, authentication, authorization, database integration and backend services.",
    icon: "server",
    features: [
      "REST API design and implementation",
      "JWT authentication & RBAC",
      "PostgreSQL, MongoDB & Prisma",
      "Third-party service integration",
    ],
    technologies: ["Node.js", "NestJS", "Express.js", "PostgreSQL", "MongoDB", "Prisma"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=api-backend" },
  },
  {
    id: "responsive-web",
    title: "Responsive Web Applications",
    description:
      "Modern interfaces that work reliably across desktop, tablet and mobile.",
    icon: "monitor",
    features: [
      "Mobile-first responsive UI",
      "Accessible, semantic markup",
      "Performance-focused implementation",
      "Design-system based components",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=responsive-web" },
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Applications",
    description:
      "Applications that share one backend across web, desktop and mobile clients.",
    icon: "boxes",
    features: [
      "Electron desktop applications",
      "React Native & Expo mobile apps",
      "Shared backend APIs",
      "Notifications and offline considerations",
    ],
    technologies: ["Electron", "React Native", "Expo", "Node.js"],
    cta: { label: "Discuss Your Project", href: "/#contact?service=cross-platform" },
  },
];