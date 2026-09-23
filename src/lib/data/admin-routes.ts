import type { ContentType } from "@/lib/data/types";

/**
 * Friendly admin route slug -> content type used by the generic
 * `/admin/[entity]` pages. Keep labels in sync with CONTENT_CONFIG.
 */
export const ADMIN_ENTITY_ROUTES: Record<string, ContentType> = {
  projects: "project",
  experience: "experience",
  skills: "skill_group",
  education: "education",
  certifications: "certification",
  services: "service",
  blog: "blog_post",
  testimonials: "testimonial",
};

export const ADMIN_ENTITY_SLUGS: Record<ContentType, string> = {
  project: "projects",
  experience: "experience",
  education: "education",
  skill_group: "skills",
  service: "services",
  certification: "certifications",
  testimonial: "testimonials",
  blog_post: "blog",
};

export function contentTypeFromRoute(route: string): ContentType | null {
  return ADMIN_ENTITY_ROUTES[route] ?? null;
}

export function routeForContentType(type: ContentType): string {
  return ADMIN_ENTITY_SLUGS[type];
}

/** Public preview path for an entity (used by Preview actions). */
export function publicPreviewPath(type: ContentType, slug: string | null): string | null {
  if (!slug) return null;
  if (type === "project") return `/projects/${slug}`;
  if (type === "blog_post") return `/blog/${slug}`;
  return null;
}