export interface ArchitectureDiagram {
  frontend: string;
  api: string;
  apiModules: string[];
  database: string;
  note?: string;
}

export interface TechnicalDecision {
  title: string;
  description: string;
}

export type ProjectStatus =
  | "production"
  | "live"
  | "in-development"
  | "completed"
  | "prototype"
  | "archived";

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  /** Short one-to-two sentence value proposition used on the homepage card. */
  description: string;
  /** Longer project introduction used at the top of the case study. */
  longDescription: string;
  image: string;
  /** The only technologies shown on the homepage card (3-5). Falls back to
   * the first items of `technologies` when omitted. */
  featuredTechnologies?: string[];
  /** Complete technology stack shown inside the case study. */
  technologies: string[];
  features: string[];
  category: ProjectCategory;
  github?: string;
  liveUrl?: string;
  links?: ProjectLinks;
  repoStatus: "public" | "private";
  status: ProjectStatus;
  statusNote?: string;
  startedAt?: string;
  updatedAt?: string;
  problemStatement: string;
  solution: string;
  myRole: string;
  keyAchievements?: string[];
  overview?: string;
  targetUsers?: string[];
  goals?: string[];
  userRoles?: ProjectRole[];
  architecture?: string;
  architectureDiagram?: ArchitectureDiagram;
  database?: string;
  auth?: string;
  technicalDecisions?: TechnicalDecision[];
  challenges: string[];
  solutions?: string[];
  screenshots?: string[];
  /** One-line talking points for the homepage card. */
  highlights?: string[];
  responsive?: string;
  lessonsLearned: string[];
  impact: string;
  tags: string[];
  duration: string;
  role: string;
  featured: boolean;
  caseStudyComplete?: boolean;
}

export interface ProjectRole {
  name: string;
  responsibilities: string[];
}

export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "saas"
  | "desktop"
  | "mobile"
  | "healthcare"
  | "business"
  | "web"
  | "other";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
}

export type SkillProficiency = "core" | "strong" | "working";

export interface SkillGroup {
  proficiency: SkillProficiency;
  label: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  featured?: boolean;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "desktop"
  | "mobile"
  | "devops"
  | "languages"
  | "tools"
  | "engineering"
  | "other";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies?: string[];
  cta?: { label: string; href: string };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  technologies: string[];
  achievements: string[];
  systems?: { name: string; description: string; contribution: "built" | "contributed" }[];
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance" | "independent";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  kind: "Course" | "Certification";
  credentialUrl?: string;
  credentialId?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  context?: string;
  project?: string;
  image?: string;
  featured?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  purpose?: string;
  website?: string;
}

export interface CredibilityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type AvailabilityStatus = "available" | "busy" | "unavailable";

export interface Availability {
  status: AvailabilityStatus;
  label?: string;
  types: string[];
  responseTime: string;
}

export interface CapabilityGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface EngineeringStep {
  icon: string;
  title: string;
  description: string;
}

export interface TechnicalChallenge {
  project: string;
  items: { problem: string; solution: string }[];
}

export interface SectionHeadingContent {
  badge: string;
  title: string;
  subtitle: string;
}