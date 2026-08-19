import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-beten-homes-rent",
    title: "Building Beten Homes Rent: A Multi-Platform Rental Management System",
    description:
      "A deep dive into building a comprehensive property rental management platform with Electron desktop app, React Native mobile app, and Node.js backend.",
    content: "",
    image: "/blog/beten-homes-rent.svg",
    category: "Full Stack",
    tags: ["electron", "react-native", "nodejs", "postgresql", "fullstack"],
    author: "Ermias Getahun",
    publishedAt: "2025-06-15",
    readingTime: 15,
    featured: true,
  },
  {
    id: "2",
    slug: "multi-platform-architecture",
    title: "Multi-Platform Architecture: Desktop, Mobile, and Web from One Codebase",
    description:
      "How to architect a software system that serves desktop, mobile, and web clients with a shared backend API.",
    content: "",
    image: "/blog/multi-platform-architecture.svg",
    category: "Full Stack",
    tags: ["architecture", "electron", "react-native", "nodejs"],
    author: "Ermias Getahun",
    publishedAt: "2025-05-20",
    readingTime: 12,
    featured: true,
  },
  {
    id: "3",
    slug: "spring-boot-react-healthcare",
    title: "Building a Healthcare SaaS Platform with Spring Boot and React",
    description:
      "Developing DiagnoConnect: A multi-tenant healthcare platform connecting hospitals, clinics, and diagnostic centers.",
    content: "",
    image: "/blog/spring-boot-react-healthcare.svg",
    category: "Full Stack",
    tags: ["spring-boot", "react", "postgresql", "saas", "healthcare"],
    author: "Ermias Getahun",
    publishedAt: "2025-04-10",
    readingTime: 14,
    featured: false,
  },
  {
    id: "4",
    slug: "prisma-orm-postgresql-guide",
    title: "Prisma ORM with PostgreSQL: A Practical Guide",
    description:
      "A hands-on guide to using Prisma ORM with PostgreSQL for type-safe database operations in Node.js applications.",
    content: "",
    image: "/blog/prisma-orm-postgresql-guide.svg",
    category: "Backend",
    tags: ["prisma", "postgresql", "nodejs", "database"],
    author: "Ermias Getahun",
    publishedAt: "2025-03-15",
    readingTime: 10,
    featured: false,
  },
  {
    id: "5",
    slug: "react-native-expo-mobile-apps",
    title: "Building Cross-Platform Mobile Apps with React Native and Expo",
    description:
      "A comprehensive guide to building production-ready mobile applications using React Native and the Expo managed workflow.",
    content: "",
    image: "/blog/react-native-expo-mobile-apps.svg",
    category: "Mobile",
    tags: ["react-native", "expo", "mobile", "cross-platform"],
    author: "Ermias Getahun",
    publishedAt: "2025-02-20",
    readingTime: 12,
    featured: true,
  },
  {
    id: "6",
    slug: "requirement-engineering-best-practices",
    title: "Requirement Engineering Best Practices for Software Developers",
    description:
      "Essential requirement engineering techniques every software developer should know to build solutions that truly meet business needs.",
    content: "",
    image: "/blog/requirement-engineering-best-practices.svg",
    category: "Engineering",
    tags: ["requirement-engineering", "agile", "software-engineering", "career"],
    author: "Ermias Getahun",
    publishedAt: "2025-01-10",
    readingTime: 11,
    featured: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}
