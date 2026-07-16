import type { NavLink, SocialLink, StatItem } from "@/types";

export const SITE_CONFIG = {
  name: "Ermias Getahun",
  title: "Ermias Getahun | Software Engineer | Full Stack Developer",
  description:
    "Professional Software Engineer specializing in Full Stack Web Development, React, Next.js, Node.js, Spring Boot, Electron, React Native, PostgreSQL, MongoDB, Docker, and scalable software solutions.",
  url: "https://ermias-getahun.vercel.app",
  image: "/og-image.svg",
  email: "abe.jere.jesus@gmail.com",
  phone: "+251 979 766 449",
  location: "Addis Ababa, Ethiopia",
  author: "Ermias Getahun",
  github: "https://github.com/ErmiasGet",
  linkedin: "https://www.linkedin.com/in/ermias-getahun-919623279/",
  telegram: "https://t.me/Jeremiah995",
  whatsapp: "https://wa.me/251979766449",
  twitter: "https://x.com/GetahunJeremiah",
  resume: "https://drive.google.com/uc?export=download&id=1yMODrTrv48GG16kBa_feM41nHdRq3U8r",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", url: SITE_CONFIG.github, icon: "github" },
  { platform: "LinkedIn", url: SITE_CONFIG.linkedin, icon: "linkedin" },
  { platform: "X", url: SITE_CONFIG.twitter, icon: "twitter" },
  { platform: "Telegram", url: SITE_CONFIG.telegram, icon: "send" },
];

export const STATS: StatItem[] = [
  { label: "Years of Learning", value: 5, suffix: "+", icon: "calendar" },
  { label: "Professional Projects", value: 20, suffix: "+", icon: "folder-open" },
  { label: "Major Software Systems", value: 12, suffix: "+", icon: "cpu" },
  { label: "Technologies Worked With", value: 25, suffix: "+", icon: "git-branch" },
  { label: "Web Applications", value: 15, suffix: "+", icon: "heart" },
  { label: "Continuous Learning", value: 100, suffix: "%", icon: "coffee" },
];

export const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "desktop",
  "mobile",
  "devops",
  "languages",
  "tools",
  "engineering",
] as const;

export const PROJECT_CATEGORIES = [
  "all",
  "fullstack",
  "frontend",
  "backend",
  "saas",
  "mobile",
  "desktop",
  "other",
] as const;

export const BLOG_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "Engineering",
  "Career",
] as const;
