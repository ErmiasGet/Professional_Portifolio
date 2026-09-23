import type { ContentType } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "tags";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  help?: string;
  rows?: number;
  /** Convert the stored row value into the editor shape (e.g. objects -> tokens). */
  decode?: (value: unknown) => unknown;
  /** Convert the editor value back into the stored shape (e.g. tokens -> objects). */
  encode?: (value: unknown) => unknown;
}

export interface ContentTypeConfig {
  type: ContentType;
  label: string;
  description: string;
  /** dot-path within `data` used for the list's primary display name */
  titleField: string;
  /** dot-path used to derive a slug when the user leaves it empty */
  slugSource?: string;
  fields: FieldDef[];
}

const PROJECT_STATUSES = [
  { value: "production", label: "Production" },
  { value: "live", label: "Live" },
  { value: "in-development", label: "In Development" },
  { value: "completed", label: "Completed" },
  { value: "prototype", label: "Prototype" },
  { value: "archived", label: "Archived" },
];

const PROJECT_CATEGORIES = [
  { value: "saas", label: "SaaS" },
  { value: "business", label: "Business" },
  { value: "healthcare", label: "Healthcare" },
  { value: "web", label: "Web" },
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
  { value: "fullstack", label: "Full Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "other", label: "Other" },
];

const EXPERIENCE_TYPES = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "independent", label: "Independent" },
];

const SKILL_PROFICIENCIES = [
  { value: "core", label: "Core" },
  { value: "strong", label: "Strong" },
  { value: "working", label: "Working Knowledge" },
];

const SERVICE_ICONS = [
  { value: "layers", label: "Layers" },
  { value: "cloud", label: "Cloud" },
  { value: "building", label: "Building" },
  { value: "server", label: "Server" },
  { value: "monitor", label: "Monitor" },
  { value: "boxes", label: "Boxes" },
  { value: "graduation-cap", label: "Graduation Cap" },
];

const CERT_KINDS = [
  { value: "Course", label: "Course" },
  { value: "Certification", label: "Certification" },
];

const decodeSkillTokens = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return (value as { name?: string; category?: string; featured?: boolean }[]).map((skill) =>
    [skill.name ?? "", skill.category ?? "", skill.featured ? "true" : null]
      .filter(Boolean)
      .join(" | ")
  );
};

const encodeSkillTokens = (value: unknown): { name: string; category: string; featured?: boolean }[] => {
  if (!Array.isArray(value)) return [];
  return (value as string[])
    .map((token) => {
      const [name = "", category = "", featuredRaw] = token.split("|").map((s) => s.trim());
      if (!name) return null;
      const skill: { name: string; category: string; featured?: boolean } = { name, category };
      if (featuredRaw === "true") skill.featured = true;
      return skill;
    })
    .filter((skill): skill is { name: string; category: string; featured?: boolean } => skill !== null);
};

export const CONTENT_CONFIG: Record<ContentType, ContentTypeConfig> = {
  project: {
    type: "project",
    label: "Projects",
    description: "Case studies shown across the homepage and /projects.",
    titleField: "title",
    slugSource: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "description", label: "Short description", type: "textarea", rows: 2 },
      { key: "longDescription", label: "Long description", type: "textarea", rows: 4 },
      { key: "image", label: "Cover image path", type: "text", placeholder: "/projects/example.png" },
      { key: "category", label: "Category", type: "select", options: PROJECT_CATEGORIES },
      { key: "status", label: "Status", type: "select", options: PROJECT_STATUSES },
      { key: "repoStatus", label: "Repository", type: "select", options: [{ value: "public", label: "Public" }, { value: "private", label: "Private" }] },
      { key: "github", label: "GitHub URL", type: "text", placeholder: "https://github.com/user/repo" },
      { key: "liveUrl", label: "Live URL", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
      { key: "role", label: "My role", type: "text" },
      { key: "statusNote", label: "Status note", type: "textarea", rows: 2 },
      { key: "featuredTechnologies", label: "Featured technologies (3-5)", type: "tags" },
      { key: "technologies", label: "Technologies", type: "tags" },
      { key: "features", label: "Key features", type: "tags" },
      { key: "highlights", label: "Highlights", type: "tags" },
      { key: "challenges", label: "Challenges", type: "tags" },
      { key: "solutions", label: "Solutions", type: "tags" },
      { key: "screenshots", label: "Screenshot paths", type: "tags" },
      { key: "problemStatement", label: "Problem statement", type: "textarea", rows: 3 },
      { key: "solution", label: "Solution", type: "textarea", rows: 3 },
      { key: "myRole", label: "Role detail", type: "textarea", rows: 3 },
      { key: "overview", label: "Overview", type: "textarea", rows: 3 },
      { key: "targetUsers", label: "Who it's for", type: "tags" },
      { key: "goals", label: "Goals", type: "tags" },
      { key: "keyAchievements", label: "Key achievements", type: "tags" },
      { key: "lessonsLearned", label: "Lessons learned", type: "tags" },
      { key: "impact", label: "Impact", type: "textarea", rows: 2 },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  experience: {
    type: "experience",
    label: "Experience",
    description: "Work experience shown in the Experience section.",
    titleField: "role",
    slugSource: "company",
    fields: [
      { key: "company", label: "Company", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "startDate", label: "Start date", type: "text", placeholder: "2025-01" },
      { key: "endDate", label: "End date", type: "text", placeholder: "2025-06" },
      { key: "current", label: "Current role", type: "boolean" },
      { key: "location", label: "Location", type: "text" },
      { key: "type", label: "Type", type: "select", options: EXPERIENCE_TYPES },
      { key: "technologies", label: "Technologies", type: "tags" },
      { key: "achievements", label: "Achievements", type: "tags" },
    ],
  },
  education: {
    type: "education",
    label: "Education",
    description: "Education entries shown in the Experience section.",
    titleField: "institution",
    slugSource: "institution",
    fields: [
      { key: "institution", label: "Institution", type: "text" },
      { key: "degree", label: "Degree", type: "text", placeholder: "B.Sc." },
      { key: "field", label: "Field", type: "text", placeholder: "Software Engineering" },
      { key: "startDate", label: "Start date", type: "text", placeholder: "2022" },
      { key: "endDate", label: "End date", type: "text", placeholder: "2026" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "highlights", label: "Highlights", type: "tags" },
    ],
  },
  skill_group: {
    type: "skill_group",
    label: "Skill Groups",
    description: "Skill groups with proficiency (Core / Strong / Working).",
    titleField: "label",
    slugSource: "label",
    fields: [
      { key: "label", label: "Group label", type: "text" },
      { key: "proficiency", label: "Proficiency", type: "select", options: SKILL_PROFICIENCIES },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "skills", label: "Skills (name | category | featured)", type: "tags", help: "Use format: React | frontend | true", decode: decodeSkillTokens, encode: encodeSkillTokens },
    ],
  },
  service: {
    type: "service",
    label: "Services",
    description: "Services cards in the Services section.",
    titleField: "title",
    slugSource: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "icon", label: "Icon", type: "select", options: SERVICE_ICONS },
      { key: "features", label: "Features", type: "tags" },
      { key: "technologies", label: "Technologies", type: "tags" },
    ],
  },
  certification: {
    type: "certification",
    label: "Certifications",
    description: "Courses and certifications in the Learning section.",
    titleField: "name",
    slugSource: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "issuer", label: "Issuer", type: "text" },
      { key: "issuedAt", label: "Issued date", type: "text", placeholder: "2026-06" },
      { key: "expiresAt", label: "Expires date", type: "text", placeholder: "2028-06" },
      { key: "kind", label: "Kind", type: "select", options: CERT_KINDS },
      { key: "credentialUrl", label: "Credential URL", type: "text" },
      { key: "credentialId", label: "Credential ID", type: "text" },
    ],
  },
  testimonial: {
    type: "testimonial",
    label: "Testimonials",
    description: "Testimonials from supervisors, teammates and clients.",
    titleField: "name",
    slugSource: "name",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "content", label: "Content", type: "textarea", rows: 4 },
      { key: "context", label: "Context", type: "text" },
      { key: "project", label: "Project", type: "text" },
      { key: "image", label: "Image path", type: "text" },
    ],
  },
  blog_post: {
    type: "blog_post",
    label: "Blog Posts",
    description: "Blog articles rendered as Markdown. Drafts stay private.",
    titleField: "title",
    slugSource: "title",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "image", label: "Cover image path", type: "text" },
      { key: "category", label: "Category", type: "text", placeholder: "Engineering" },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "author", label: "Author", type: "text" },
      { key: "content", label: "Content (Markdown)", type: "textarea", rows: 20 },
    ],
  },
};

export const CONTENT_TYPES: ContentType[] = [
  "project",
  "experience",
  "education",
  "skill_group",
  "service",
  "certification",
  "testimonial",
  "blog_post",
];