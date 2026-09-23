export type ContentType =
  | "project"
  | "experience"
  | "education"
  | "skill_group"
  | "service"
  | "certification"
  | "testimonial"
  | "blog_post";

export type ContentStatus = "draft" | "published";

export interface ContentRow<TData = Record<string, unknown>> {
  id: string;
  type: ContentType;
  slug: string | null;
  title: string | null;
  category: string | null;
  status: ContentStatus;
  featured: boolean;
  orderIndex: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  data: TData;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  project: "Project",
  experience: "Experience",
  education: "Education",
  skill_group: "Skill Group",
  service: "Service",
  certification: "Certification",
  testimonial: "Testimonial",
  blog_post: "Blog Post",
};

export const CONTENT_TYPE_LIST: ContentType[] = [
  "project",
  "experience",
  "education",
  "skill_group",
  "service",
  "certification",
  "testimonial",
  "blog_post",
];