export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  category: ProjectCategory;
  github?: string;
  liveUrl?: string;
  problemStatement: string;
  solution: string;
  challenges: string[];
  architecture: string;
  duration: string;
  role: string;
  lessonsLearned: string[];
  impact: string;
  tags: string[];
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
}

export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "saas"
  | "ecommerce"
  | "dashboard"
  | "desktop"
  | "other";

export interface BlogPost {
  id: string;
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

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  category: SkillCategory;
  yearsOfExperience?: number;
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
  price?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  achievements: string[];
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  courses: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  project?: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
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
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}
