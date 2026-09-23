import type { Education, Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "internship-ict",
    company: "Wolkite University ICT Directorate",
    role: "Software Developer Intern",
    description:
      "Worked with the university ICT directorate on internal software, from gathering requirements with real users to building, testing and documenting the systems.",
    startDate: "2025-01",
    endDate: "2025-06",
    technologies: [
      "React",
      "Spring Boot",
      "PostgreSQL",
      "Frappe",
      "ERPNext",
      "Python",
      "Git",
    ],
    achievements: [
      "Gathered and analyzed requirements from finance and administrative staff",
      "Implemented frontend interfaces and UI/UX based on real user workflows",
      "Built and integrated database and API functionality",
      "Conducted testing, debugging and documentation",
      "Collaborated with the team using Git",
    ],
    systems: [
      {
        name: "Finance File Management System",
        description:
          "Document management system with React, Spring Boot, PostgreSQL, QR support and an Amharic interface, deployed on a local server.",
        contribution: "built",
      },
      {
        name: "Attendance Management System",
        description:
          "Attendance system on ERPNext / Frappe with fingerprint biometric integration.",
        contribution: "contributed",
      },
    ],
    type: "internship",
  },
  {
    id: "independent",
    company: "Independent",
    role: "Full-Stack Developer",
    description:
      "Designing and building full-stack web, SaaS and business systems, including frontend, backend, database design and deployment.",
    startDate: "2023-01",
    current: true,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Electron",
      "React Native",
      "Expo",
      "Docker",
    ],
    achievements: [
      "Building Engida — a multi-tenant accommodation management SaaS with Next.js, NestJS and PostgreSQL",
      "Built Beten Homes Rent — a property rental management platform with desktop, mobile and API clients",
      "Contributed to E-Immunize Ethiopia — a newborn immunization registration and reminder platform",
      "Explored DiagnoConnect — a multi-tenant healthcare coordination SaaS concept",
      "Built additional web applications using the MERN stack",
    ],
    type: "independent",
  },
];

export const education: Education[] = [
  {
    id: "degree-wolkite",
    institution: "Wolkite University",
    degree: "B.Sc.",
    field: "Software Engineering",
    startDate: "2022",
    endDate: "2026",
    description:
      "Studied software engineering across the full software development lifecycle, from requirements engineering and system design to implementation, testing and deployment.",
    highlights: [
      "Software Engineering & System Design",
      "Data Structures & Algorithms",
      "Database Systems",
      "Object-Oriented Programming",
      "Requirements Engineering",
      "Software Testing & Quality Assurance",
      "Web Development & Web Services / APIs",
      "Software Architecture",
    ],
  },
];