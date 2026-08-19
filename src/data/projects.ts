import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "beten-homes-rent",
    title: "Beten Homes Rent",
    description:
      "A comprehensive full-stack property rental management platform built for landlords, property managers, and real estate businesses.",
    longDescription:
      "A comprehensive full-stack property rental management platform built for landlords, property managers, and real estate businesses. The platform consists of a Desktop Application (Electron + React + TypeScript), Mobile Application (React Native + Expo), Backend REST API (Node.js + Express), and PostgreSQL Database with Prisma ORM.",
    image: "/images/Beten Homes Rent Dashboard.png",
    technologies: [
      "Electron",
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "Firebase Cloud Messaging",
    ],
    features: [
      "House Management",
      "Room Management",
      "Tenant Management",
      "Rental Contract Management",
      "Payment Recording",
      "Automatic Overdue Payment Detection",
      "Expense Tracking",
      "Financial Reports",
      "PDF Report Generation",
      "Dashboard & Analytics",
      "Role-Based Access Control (Owner, Manager, Accountant)",
      "Secure Authentication",
      "Real-Time Push Notifications",
      "Docker Deployment",
      "Firebase Cloud Messaging Integration",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/Beten_House_Rental_System.git",
    problemStatement:
      "Landlords and property managers need a unified system to manage properties, tenants, contracts, payments, and financial reporting across desktop, mobile, and web platforms.",
    solution:
      "Built a multi-platform rental management system with Electron desktop app, React Native mobile app, and a Node.js REST API backend with PostgreSQL and Prisma ORM, all deployed with Docker and integrated with Firebase Cloud Messaging for real-time notifications.",
    challenges: [
      "Designing a multi-platform architecture that works seamlessly across desktop, mobile, and web",
      "Implementing automatic overdue payment detection with reliable scheduling",
      "Building role-based access control with different permission levels for Owner, Manager, and Accountant",
      "Ensuring data synchronization across Electron desktop and React Native mobile clients",
    ],
    architecture:
      "Multi-platform architecture: Electron + React + TypeScript desktop app, React Native + Expo mobile app, Node.js + Express.js REST API backend, PostgreSQL database with Prisma ORM, Docker containerization, and Firebase Cloud Messaging for push notifications.",
    duration: "1+ months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Multi-platform development with shared backend APIs",
      "Electron desktop application architecture and security",
      "React Native and Expo for cross-platform mobile development",
      "Prisma ORM for type-safe database operations",
      "Docker deployment and containerization",
    ],
    impact:
      "Comprehensive rental management solution handling house management, tenant tracking, contract lifecycle, payment processing, expense tracking, and financial reporting with PDF generation.",
    tags: ["rental", "property-management", "desktop", "mobile", "fullstack"],
    featured: true,
    status: "completed",
  },
  {
    id: "2",
    slug: "diagnoconnect",
    title: "DiagnoConnect",
    description:
      "A multi-tenant healthcare SaaS platform connecting hospitals, clinics, diagnostic centers, doctors, receptionists, and patients into one integrated ecosystem.",
    longDescription:
      "A multi-tenant healthcare SaaS platform connecting hospitals, clinics, diagnostic centers, doctors, receptionists, and patients into one integrated ecosystem. Built with React frontend and Spring Boot backend with PostgreSQL database.",
    image: "/projects/diagnoconnect.svg",
    technologies: [
      "React",
      "Spring Boot",
      "PostgreSQL",
    ],
    features: [
      "Multi-tenant architecture for hospitals, clinics, and diagnostic centers",
      "Doctor and patient management",
      "Diagnostic center integration",
      "Receptionist workflow tools",
      "Appointment scheduling",
      "Patient records management",
      "Lab result tracking",
      "Secure data handling",
    ],
    category: "saas",
    github: "https://github.com/ErmiasGet/Diagnoconnect.git",
    problemStatement:
      "Healthcare facilities need an integrated platform that connects hospitals, clinics, diagnostic centers, and their staff into a unified ecosystem for managing patient care and diagnostics.",
    solution:
      "Developed a multi-tenant SaaS healthcare platform using React for the frontend, Spring Boot for the backend API, and PostgreSQL for data management, enabling seamless collaboration between different healthcare stakeholders.",
    challenges: [
      "Designing a multi-tenant architecture that supports different healthcare facility types",
      "Ensuring HIPAA-compliant data handling and security",
      "Integrating complex workflows for doctors, receptionists, and diagnostic staff",
      "Building scalable APIs for real-time healthcare data access",
    ],
    architecture:
      "React SPA frontend, Spring Boot REST API backend with multi-tenant architecture, PostgreSQL database for healthcare data storage.",
    duration: "5 months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Multi-tenant SaaS architecture design",
      "Healthcare domain knowledge and compliance requirements",
      "Spring Boot backend development at scale",
      "Complex role-based systems in healthcare",
    ],
    impact:
      "Integrated healthcare platform connecting multiple facility types, streamlining patient care workflows and diagnostic processes.",
    tags: ["healthcare", "saas", "multi-tenant", "spring-boot"],
    featured: true,
    status: "completed",
  },
  {
    id: "3",
    slug: "explore-sheka",
    title: "Explore Sheka",
    description:
      "Tourism platform connecting visitors with hotels, travel agencies, guides, transportation, attractions, restaurants, and destinations throughout Sheka.",
    longDescription:
      "A comprehensive tourism platform designed to showcase and connect visitors with the rich tourism offerings of the Sheka region, including hotels, travel agencies, guides, transportation services, attractions, restaurants, and destinations.",
    image: "/images/ExploreSheka Dashboard.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "Hotel listings and booking",
      "Travel agency directory",
      "Tour guide profiles and booking",
      "Transportation service listings",
      "Attraction showcases",
      "Restaurant directory",
      "Destination guides",
      "Search and filtering",
      "User reviews and ratings",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/Explore-Sheka-Discover-Nature-Culture-and-Sustainable-Tourism.git",
    problemStatement:
      "The Sheka region has rich tourism potential but lacks a centralized digital platform to connect visitors with local tourism services and attractions.",
    solution:
      "Built a comprehensive tourism platform using React frontend, Node.js/Express backend, and MongoDB database to showcase and connect visitors with hotels, travel agencies, guides, transportation, attractions, and restaurants in Sheka.",
    challenges: [
      "Aggregating diverse tourism data from multiple service providers",
      "Building an intuitive search and discovery experience for visitors",
      "Designing responsive layouts for various tourism content types",
      "Ensuring data accuracy for listings and service information",
    ],
    architecture:
      "React SPA frontend, Node.js + Express.js REST API backend, MongoDB database for flexible tourism data storage.",
    duration: "4 months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Building platforms for the tourism industry",
      "MongoDB schema design for diverse content types",
      "Full-stack development with the MERN stack",
      "User experience design for discovery-oriented platforms",
    ],
    impact:
      "Centralized tourism platform showcasing the full range of Sheka region's tourism offerings to local and international visitors.",
    tags: ["tourism", "travel", "fullstack", "mern"],
    featured: false,
    status: "completed",
  },
  {
    id: "4",
    slug: "finance-file-management",
    title: "Finance File Management System",
    description:
      "Enterprise document management system developed during internship to improve finance office workflow and document organization.",
    longDescription:
      "An enterprise document management system developed during my internship at Wolkite University ICT Directorate to improve finance office workflow and document organization. The system digitizes and streamlines document handling processes.",
    image: "/projects/finance-files.svg",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
    ],
    features: [
      "Document upload and management",
      "File categorization and tagging",
      "Search and retrieval",
      "Workflow automation",
      "Access control and permissions",
      "Document versioning",
      "Reporting and audit trails",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/finance-file-management.git",
    problemStatement:
      "The finance office at the university struggled with paper-based document management, leading to inefficiencies in workflow, document retrieval, and organization.",
    solution:
      "Developed an enterprise document management system during my internship to digitize finance office workflows, enabling efficient document upload, categorization, search, and retrieval.",
    challenges: [
      "Understanding complex finance office workflows through requirement gathering",
      "Designing an intuitive interface for non-technical finance staff",
      "Implementing proper access control for sensitive financial documents",
      "Ensuring reliable document storage and retrieval",
    ],
    architecture:
      "React frontend, Node.js backend API, PostgreSQL database for document metadata and user management.",
    duration: "4 months",
    role: "Software Developer Intern",
    lessonsLearned: [
      "Enterprise software development in a real organizational context",
      "Requirement gathering and stakeholder collaboration",
      "Document management system design patterns",
      "Building software for non-technical end users",
    ],
    impact:
      "Improved finance office workflow efficiency by digitizing document management processes and reducing manual paper-based operations.",
    tags: ["enterprise", "document-management", "internship", "fullstack"],
    featured: false,
    status: "completed",
  },
  {
    id: "5",
    slug: "attendance-management",
    title: "Attendance Management System",
    description:
      "Fingerprint attendance management system developed using Python",
    longDescription:
      "An attendance management system built using the Frappe Framework that integrates fingerprint biometric hardware for automated attendance tracking and management.",
    image: "/projects/attendance.svg",
    technologies: [
      "Python",
      "Django",
      "MariaDB",
    ],
    features: [
      "Fingerprint biometric integration",
      "Automated attendance tracking",
      "Attendance reports and analytics",
      "Employee management",
      "Leave management",
      "Shift scheduling",
      "Admin dashboard",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/Attendance-Management-System.git",
    problemStatement:
      "Manual attendance tracking was time-consuming, error-prone, and lacked reliable reporting capabilities for organizational management.",
    solution:
      "Built an attendance management system using the Frappe Framework with fingerprint biometric integration for automated, accurate attendance tracking and comprehensive reporting.",
    challenges: [
      "Integrating fingerprint biometric hardware with the software system",
      "Building reliable attendance tracking with real-time data capture",
      "Designing comprehensive reporting for management oversight",
      "Working within the Frappe Framework's conventions and patterns",
    ],
    architecture:
      "Frappe Framework application with Python backend, MariaDB database, and fingerprint hardware integration via biometric SDK.",
    duration: "3 months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Frappe Framework development patterns",
      "Hardware-software integration for biometric systems",
      "Building enterprise attendance solutions",
      "Python backend development with Frappe",
    ],
    impact:
      "Automated attendance tracking system replacing manual processes with biometric verification and comprehensive reporting.",
    tags: ["attendance", "biometric", "frappe", "enterprise"],
    featured: false,
    status: "completed",
  },
  {
    id: "6",
    slug: "graduate-gallery",
    title: "Graduate Gallery",
    description:
      "Graduate showcase platform with profiles, achievements, and galleries.",
    longDescription:
      "A platform designed to showcase graduating students with their profiles, academic achievements, project galleries, and professional portfolios.",
    image: "/projects/graduate-gallery.svg",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
    ],
    features: [
      "Student profile creation",
      "Academic achievement display",
      "Project gallery showcase",
      "Photo and media galleries",
      "Search and discovery",
      "Social sharing",
      "Responsive design",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/GC_GalleryArchive.git",
    problemStatement:
      "Graduating students need a centralized platform to showcase their profiles, achievements, and projects to potential employers and the academic community.",
    solution:
      "Created a graduate showcase platform with React, Node.js, and MongoDB that allows students to build profiles, display achievements, and showcase their work through galleries.",
    challenges: [
      "Designing flexible profile templates for diverse student backgrounds",
      "Building an intuitive gallery system for various media types",
      "Ensuring responsive design across all device sizes",
      "Implementing efficient search and discovery features",
    ],
    architecture:
      "React SPA frontend, Node.js + Express.js REST API backend, MongoDB database for student profiles and gallery content.",
    duration: "<1 months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Building social and showcase platforms",
      "MongoDB flexible schema design for profiles",
      "Media-rich application development",
      "User-generated content management",
    ],
    impact:
      "Provided graduating students with a professional platform to showcase their achievements and projects to the world.",
    tags: ["education", "showcase", "gallery", "fullstack"],
    featured: false,
    status: "completed",
  },
  {
    id: "7",
    slug: "mini-social-media",
    title: "Mini Social Media Platform",
    description:
      "Modern social networking application with authentication, posts, likes, comments, messaging, and user profiles.",
    longDescription:
      "A modern social networking application featuring user authentication, post creation, likes, comments, real-time messaging, and comprehensive user profiles.",
    image: "/projects/social-media.svg",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "User authentication and profiles",
      "Post creation with media uploads",
      "Like and comment system",
      "Real-time messaging",
      "News feed",
      "User search and discovery",
      "Notifications",
      "Responsive design",
    ],
    category: "fullstack",
    github: "https://github.com/ErmiasGet/CodeAlpha_miniSocialMediaApp.git",
    problemStatement:
      "Building a social networking platform from scratch to understand the core features and architecture patterns used in modern social media applications.",
    solution:
      "Developed a full-stack social media platform with React frontend, Node.js/Express backend, and MongoDB database implementing core social features like posts, likes, comments, and messaging.",
    challenges: [
      "Implementing real-time messaging with WebSocket connections",
      "Designing an efficient news feed algorithm",
      "Building a responsive and engaging social UI",
      "Managing complex state for social interactions",
    ],
    architecture:
      "React SPA frontend, Node.js + Express.js REST API with WebSocket support, MongoDB database for social data.",
    duration: "3 months",
    role: "Full Stack Developer",
    lessonsLearned: [
      "Social media feature architecture and patterns",
      "Real-time communication with WebSockets",
      "MongoDB design for social data models",
      "Building engaging social user experiences",
    ],
    impact:
      "Fully functional social media prototype demonstrating core social networking features and real-time communication.",
    tags: ["social", "real-time", "messaging", "fullstack"],
    featured: false,
    status: "completed",
  }
//   {
//     id: "8",
//     slug: "personal-portfolio",
//     title: "Personal Portfolio",
//     description:
//       "Modern responsive portfolio showcasing professional journey, experience, projects, and technical expertise.",
//     longDescription:
//       "A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light mode, animated sections, blog support, SEO optimization, and a command palette.",
//     image: "/projects/portfolio.svg",
//     technologies: [
//       "Next.js",
//       "TypeScript",
//       "Tailwind CSS",
//       "Framer Motion",
//       "React",
//     ],
//     features: [
//       "Dark and light mode",
//       "Smooth animations and transitions",
//       "Responsive design",
//       "SEO optimized",
//       "Command palette navigation",
//       "Blog system",
//       "Project case studies",
//       "Contact form",
//     ],
//     category: "frontend",
//     github: "https://github.com/ErmiasGet/portfolio",
//     liveUrl: "https://ermias-getahun.vercel.app",
//     problemStatement:
//       "Need a professional online presence that showcases technical skills, projects, and experience to attract potential clients and employers.",
//     solution:
//       "Built a premium portfolio with Next.js App Router, TypeScript for type safety, Tailwind CSS for styling, and Framer Motion for animations, deployed on Vercel.",
//     challenges: [
//       "Achieving high Lighthouse scores while maintaining rich animations",
//       "Building a flexible and performant dark/light mode system",
//       "Implementing smooth page transitions and scroll animations",
//       "Optimizing SEO across all pages",
//     ],
//     architecture:
//       "Next.js App Router with static generation, Tailwind CSS for styling, Framer Motion for animations, deployed on Vercel.",
//     duration: "2 months",
//     role: "Designer & Developer",
//     lessonsLearned: [
//       "Next.js App Router architecture and best practices",
//       "Performance optimization with Framer Motion",
//       "SEO optimization for single-page portfolio sites",
//       "Design system creation with Tailwind CSS",
//     ],
//     impact:
//       "Professional online presence showcasing full technical portfolio, projects, and experience.",
//     tags: ["portfolio", "animation", "frontend", "nextjs"],
//     featured: true,
//     status: "completed",
//   },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
