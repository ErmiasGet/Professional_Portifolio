import type { Experience, Education, Certification, Testimonial } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Wolkite University ICT Directorate",
    role: "Software Developer Intern",
    description:
      "Enterprise software development during internship, working on real-world projects to improve university operations and workflows.",
    startDate: "2025-01",
    endDate: "2025-06",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Git",
    ],
    achievements: [
      "Developed enterprise software solutions for university departments",
      "Gathered and analyzed requirements from stakeholders",
      "Built React frontend applications with modern best practices",
      "Conducted software testing and debugging",
      "Optimized application performance and deployment processes",
      "Created comprehensive technical documentation",
      "Collaborated with cross-functional teams on system design",
    ],
    type: "internship",
  },
  {
    id: "2",
    company: "Independent",
    role: "Full Stack Developer",
    description:
      "Building professional software systems including property rental platforms, healthcare SaaS, tourism platforms, and web applications.",
    startDate: "2023-01",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "PostgreSQL",
      "MongoDB",
      "Electron",
      "React Native",
      "Expo",
      "Docker",
      "Prisma ORM",
    ],
    achievements: [
      "Built Beten Homes Rent - full-stack property rental management platform with desktop, mobile, and backend",
      "Developed DiagnoConnect - multi-tenant healthcare SaaS platform with Spring Boot and PostgreSQL",
      "Created Explore Sheka - tourism platform connecting visitors with local services",
      "Built mini social media platform with real-time messaging",
      "Developed graduate showcase platform with profiles and galleries",
      "Continuously expanding technical skills through real-world project development",
    ],
    type: "freelance",
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Wolkite University",
    degree: "Bachelor of Science",
    field: "Software Engineering",
    startDate: "2022",
    endDate: "2026",
    description:
      "Studied software engineering with comprehensive coursework covering the full software development lifecycle and modern technologies.",
    achievements: [],
    courses: [
      "Software Engineering",
      "Object-Oriented Programming",
      "Algorithms",
      "Data Structures",
      "Database Systems",
      "Computer Networks",
      "Operating Systems",
      "Artificial Intelligence",
      "Requirement Engineering",
      "Software Testing",
      "Web Development",
      "Mobile Development",
      "System Design",
      "Agile Development",
    ],
  },
  {
    id: "2",
    institution: "Masha Preparatory School",
    degree: "Preparatory Education",
    field: "General Studies",
    startDate: "2017",
    endDate: "2021",
    description:
      "Completed preparatory education with strong academic performance while developing an interest in computer science and software development.",
    achievements: [],
    courses: [],
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    name: "Software Engineering",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "2",
    name: "React Development",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "3",
    name: "Next.js",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "4",
    name: "Node.js",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "5",
    name: "Spring Boot",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "6",
    name: "TypeScript",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "7",
    name: "PostgreSQL",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "8",
    name: "MongoDB",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "9",
    name: "Docker",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "10",
    name: "React Native",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "11",
    name: "Electron",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "12",
    name: "Prisma ORM",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "13",
    name: "Software Architecture",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "14",
    name: "Agile Development",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "15",
    name: "System Design",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "16",
    name: "Software Testing",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "17",
    name: "JavaScript",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "18",
    name: "REST APIs",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "19",
    name: "Git & GitHub",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "University Supervisor",
    role: "ICT Director",
    company: "Wolkite University",
    content:
      "Ermias demonstrated excellent software development skills during his internship. His ability to gather requirements, design solutions, and deliver enterprise software was impressive for his level of experience.",
    rating: 5,
    project: "Finance File Management System",
  },
  {
    id: "2",
    name: "Project Collaborator",
    role: "Team Lead",
    company: "Wolkite University",
    content:
      "Working with Ermias on the DiagnoConnect healthcare platform was a great experience. He showed strong full-stack development skills and a deep understanding of complex system architecture.",
    rating: 5,
    project: "DiagnoConnect Healthcare Platform",
  },
  {
    id: "3",
    name: "Client",
    role: "Property Manager",
    company: "Beten Homes",
    content:
      "Ermias built an outstanding rental management platform that handles all our property management needs. The desktop application, mobile app, and backend system work seamlessly together.",
    rating: 5,
    project: "Beten Homes Rent",
  },
  {
    id: "4",
    name: "Tourism stakeholder",
    role: "Project Coordinator",
    company: "Explore Sheka Initiative",
    content:
      "The tourism platform Ermias developed beautifully showcases Sheka's attractions and connects visitors with local services. His understanding of the project requirements and attention to detail was remarkable.",
    rating: 5,
    project: "Explore Sheka Tourism Platform",
  },
];
