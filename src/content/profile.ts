import { SITE_CONFIG } from "./site";

/**
 * Personal profile shown across the hero, about and contact sections.
 * Edit these values instead of touching the UI components.
 */
export const PROFILE = {
  name: SITE_CONFIG.name,
  firstName: SITE_CONFIG.firstName,
  headline: {
    before: "Software Engineer Building ",
    highlight: "Production-Ready",
    after: " Web & SaaS Applications",
  },
  heroIntro: "Hello, I'm",
  heroSubtitle:
    "I build full-stack applications and business systems — from modern web platforms to multi-tenant SaaS — using React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL, MongoDB and more.",
  currentRole: "Software Engineer & Full-Stack Developer",
  tagline: SITE_CONFIG.tagline,
  location: SITE_CONFIG.location,
  email: SITE_CONFIG.email,
  phone: SITE_CONFIG.phone,
  education: "B.Sc. Software Engineering, Wolkite University",
  resumeUrl: SITE_CONFIG.resume,
  credentials: [
    "B.Sc. Software Engineering Graduate",
    "Full-Stack Developer",
    "SaaS & Business Systems",
  ],
  biography: [
    "I'm a Software Engineering graduate from Wolkite University with hands-on experience building corporate software during an internship at the university's ICT directorate. That experience taught me how to gather real requirements, work with teams using Git, and deliver software people actually use.",
    "Since then I've focused on building production-minded, full-stack projects: a multi-tenant accommodation management SaaS (Engida), a cross-platform property rental management system (Beten Homes Rent), and a newborn immunization registration and reminder platform (E-Immunize) that addresses public health needs in Ethiopia.",
    "I'm now looking for full-time, freelance or contract opportunities as a Full-Stack Developer where I can keep building useful, reliable software.",
  ],
  focusAreas: [
    "Web Application Development",
    "SaaS & Multi-Tenant Platforms",
    "API & Backend Development",
    "Business & Management Systems",
    "UI/UX Implementation",
  ],
  openTo: [
    "Full-time Software Engineer roles",
    "Full-Stack Developer roles",
    "Freelance & contract projects",
    "Frontend or backend specializations",
  ],
  careerFocus: [
    "Mission-driven companies building in FinTech, Healthcare or Education",
    "Teams that value user-focused, production-ready software",
    "Companies with strong engineering standards and mentorship",
    "Roles that grow technical leadership and software architecture skills",
  ],
  skillsSummary:
    "I'm my strongest in the React/TypeScript ecosystem and API development with Node.js and NestJS, with experience across relational and document databases, desktop and mobile clients, and business and healthcare systems.",
  availability: SITE_CONFIG.availability,
};