import type {
  Availability,
  CredibilityItem,
  NavLink,
  SocialLink,
} from "@/types";

/**
 * Availability for the Contact section. Typed as `Availability` (not the
 * narrowed literal) so runtime + DB merges can widen `status`/add `label`
 * without breaking consumers of `SITE_CONFIG.availability`.
 */
const availabilityConfig: Availability = {
  status: "available",
  types: ["Remote", "Freelance", "Full-Time"],
  responseTime: "Within 24 hours",
};

/**
 * Central site configuration.
 *
 * This is the single source of truth for branding, contact information,
 * social links, the resume URL and availability. Update values here and the
 * whole site reflects the change — no UI component needs editing.
 */
export const SITE_CONFIG = {
  name: "Ermias Getahun",
  firstName: "Ermias",
  role: "Software Engineer | Full-Stack Developer",
  title: "Ermias Getahun | Software Engineer & Full-Stack Developer",
  description:
    "Software Engineer and Full-Stack Developer building modern web applications, SaaS platforms and business systems with React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL and MongoDB.",
  tagline: "Building Web Applications, SaaS Platforms & Business Systems",
  url: "https://ermias-getahun-portifolio.vercel.app",
  image: "/og-image.svg",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "SaaS Developer",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Business Systems",
    "Ermias Getahun",
    "Ethiopia",
  ],
  /**
   * Date the site content was last updated. Used for sitemap lastModified
   * values so they stay stable instead of regenerating on every request.
   */
  lastUpdated: "2026-09-19",
  email: "abe.jere.jesus@gmail.com",
  phone: "+251 979 766 449",
  location: "Addis Ababa, Ethiopia",
  resume:
    "https://drive.google.com/uc?export=download&id=1yMODrTrv48GG16kBa_feM41nHdRq3U8r",
  social: {
    github: "https://github.com/ErmiasGet",
    linkedin: "https://www.linkedin.com/in/ermias-getahun-919623279/",
    telegram: "https://t.me/Jeremiah995",
    whatsapp: "https://wa.me/251979766449",
    twitter: "https://x.com/GetahunJeremiah",
  },
  availability: availabilityConfig,
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", url: SITE_CONFIG.social.github, icon: "github" },
  { platform: "LinkedIn", url: SITE_CONFIG.social.linkedin, icon: "linkedin" },
  { platform: "X", url: SITE_CONFIG.social.twitter, icon: "twitter" },
  { platform: "Telegram", url: SITE_CONFIG.social.telegram, icon: "send" },
];

export const CREDIBILITY_ITEMS: CredibilityItem[] = [
  {
    id: "degree",
    title: "B.Sc. Software Engineering",
    description: "Wolkite University — full software development lifecycle education.",
    icon: "graduation-cap",
  },
  {
    id: "stack",
    title: "Full-Stack Development",
    description: "Frontend, backend, database and API development across the stack.",
    icon: "layers",
  },
  {
    id: "saas",
    title: "SaaS & Business Systems",
    description: "Multi-tenant platforms, dashboards, RBAC and business workflows.",
    icon: "cloud",
  },
  {
    id: "platforms",
    title: "Web • Mobile • Desktop",
    description: "Building applications that work reliably across every platform.",
    icon: "monitor",
  },
];

export const PROJECT_FILTERS: Record<string, string> = {
  all: "All",
  saas: "SaaS",
  business: "Management Systems",
  healthcare: "Healthcare",
  web: "Web Applications",
  desktop: "Desktop",
  mobile: "Mobile",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  other: "Other",
};

export const CONTACT_PURPOSES = [
  "Full-time opportunity",
  "Freelance project",
  "Contract work",
  "Collaboration",
  "Technical discussion",
] as const;