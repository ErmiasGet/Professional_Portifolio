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
      "Created Explore Sheka - tourism platform connecting visitors with local services",
      "Built mini social media platform with real-time messaging",
      "Developed graduate showcase platform with profiles and galleries",
      "Continuously expanding technical skills through real-world project development",
            "Developed DiagnoConnect - multi-tenant healthcare SaaS platform with Spring Boot and PostgreSQL",
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
      "Data Structures and Algorithms",
      "Database Systems",
      "Operating Systems",
      "Artificial Intelligence",
      "Requirement Engineering",
      "Software Testing",
      "Web Development",
      "Mobile App Development",
      "System Design",
      "Agile Development",
      "Fundamentals of Programming",
      "Software Project Management",
      "Fundamentals of Networking",
      "Software and Information Security",
      "Machine Learning",
      "Cloud Computing",
      "Software Architecture",
      "Human-Computer Interaction",
      "Software Quality Assurance",
      "Software Maintenance and Evolution",
      "Web Services and APIs",
      "Software Development Methodologies",
      "Software Engineering Ethics",
      "Software Metrics and Performance Analysis",
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
    date: "2026-6",
  },
  {
    id: "2",
    name: "Introduction to Web Development",
    issuer: "Professional Learning & Development",
    date: "2024-08",
  },
  {
    id: "3",
    name: "Oracle Database Administration",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  },
  {
    id: "4",
    name: "Introduction to AI",
    issuer: "Professional Learning & Development",
    date: "2025-05",
  },
  {
    id: "5",
    name: "Javascript",
    issuer: "Professional Learning & Development",
    date: "2024-10",
  },
  {
    id: "6",
    name: "5 Days Programming Bootcamp",
    issuer: "Professional Learning & Development",
    date: "2024-01",
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mr. Korabeza A.",
    role: "WKU ICT Director",
    company: "Wolkite University",
    content:
      "Ermias demonstrated excellent software development skills during his internship. His ability to gather requirements, design solutions, and deliver enterprise software was impressive for his level of experience.",
    rating: 5,
    project: "Finance File Management System",
  },
   {
    id: "2",
    name: "Client",
    role: "Property Manager",
    company: "Beten Homes",
    content:
      "Ermias built an outstanding rental management platform that handles all our property management needs. The desktop application, mobile app, and backend system work seamlessly together.",
    rating: 5,
    project: "Beten Homes Rent",
  },
  {
    id: "3",
    name: "Nebiyu J.",
    role: "CEO",
    company: "Neba ARTS",
    content:
      "Ermias did an amazing job creating my architecture portfolio website. He understood my vision and built a modern platform that beautifully showcases my designs and projects. His creativity, professionalism, and attention to detail made the entire process smooth and enjoyable. I highly recommend his work.",
    rating: 5,
    project: "Neba ARTS",
  },
  {
    id: "4",
    name: "Mr. Siraj A.",
    role: "Team Lead",
    company: "Wolkite University",
    content:
      "Working with Ermias on the Finance File Management System was a great experience. He showed strong full-stack development skills and a deep understanding of complex system architecture.",
    rating: 5,
    project: "Finance File Management System",
  }
];
