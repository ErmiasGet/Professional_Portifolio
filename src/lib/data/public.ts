import { getPublishedByType, getContentBySlug, getAnyBySlug } from "@/db/content";
import { getAllSettings } from "@/db/settings";
import { ensureSchema } from "@/db/migrate";
import { isDatabaseReachable } from "@/db/client";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS, PROJECT_FILTERS, CONTACT_PURPOSES, CREDIBILITY_ITEMS } from "@/content/site";
import { PROFILE } from "@/content/profile";
import { projects, getProjectBySlug as staticGetProject, getAllProjectSlugs as staticSlugs, getProjectCategories as staticCategories } from "@/content/projects";
import { experiences, education as staticEducation } from "@/content/experience";
import { skillGroups as staticSkillGroups } from "@/content/skills";
import { services as staticServices } from "@/content/services";
import { certifications as staticCertifications } from "@/content/certifications";
import { testimonials as staticTestimonials } from "@/content/testimonials";
import { getAllBlogPosts as staticBlogPosts, getBlogPostBySlug as staticBlogBySlug, getBlogSlugs as staticBlogSlugs } from "@/lib/blog";
import { SECTIONS, capabilityGroups as staticCapabilityGroups, engineeringSteps as staticEngineeringSteps, technicalChallenges as staticTechnicalChallenges } from "@/content/sections";
import type { Project, Experience, Education, SkillGroup, Service, Certification, Testimonial, BlogPost, SectionHeadingContent } from "@/types";
import type { ContentRow } from "./types";

/**
 * Public data layer: PostgreSQL first, static content fallback.
 * When the DB is configured and reachable, rows come from the database.
 * Otherwise (or when the DB has no rows for an entity yet) the original
 * static content is returned, so nothing breaks before or without a DB.
 */

let cachedReachability: boolean | undefined;

async function dbAvailable(): Promise<boolean> {
  if (cachedReachability !== undefined) return cachedReachability;
  cachedReachability = await isDatabaseReachable();
  return cachedReachability;
}

export function resetDataCache(): void {
  cachedReachability = undefined;
}

async function publishedRows(
  type: "project" | "experience" | "education" | "skill_group" | "service" | "certification" | "testimonial" | "blog_post"
): Promise<ContentRow[] | null> {
  if (!(await dbAvailable())) return null;
  const ready = await ensureSchema();
  if (!ready) return null;
  return getPublishedByType(type);
}

function toProject(row: ContentRow): Project {
  return { ...(row.data as Partial<Project>), slug: row.slug ?? "", title: row.title ?? (row.data?.title as string) ?? "" } as Project;
}

function toExperience(row: ContentRow): Experience {
  return { ...(row.data as Partial<Experience>), id: row.slug ?? row.id } as Experience;
}

function toEducation(row: ContentRow): Education {
  return { ...(row.data as Partial<Education>), id: row.id } as Education;
}

function toSkillGroup(row: ContentRow): SkillGroup {
  return row.data as unknown as SkillGroup;
}

function toService(row: ContentRow): Service {
  return { ...(row.data as Partial<Service>), id: row.slug ?? row.id } as Service;
}

function toCertification(row: ContentRow): Certification {
  return { ...(row.data as Partial<Certification>), id: row.id } as Certification;
}

function toTestimonial(row: ContentRow): Testimonial {
  return { ...(row.data as Partial<Testimonial>), id: row.id } as Testimonial;
}

function toBlogPost(row: ContentRow): BlogPost {
  const data = row.data as Partial<BlogPost>;
  return {
    slug: row.slug ?? "",
    title: row.title ?? data.title ?? "",
    description: data.description ?? "",
    content: data.content ?? "",
    image: data.image,
    category: data.category ?? row.category ?? "Engineering",
    tags: data.tags ?? [],
    author: data.author ?? SITE_CONFIG.name,
    publishedAt: row.publishedAt ?? data.publishedAt ?? SITE_CONFIG.lastUpdated,
    updatedAt: data.updatedAt,
    readingTime: data.readingTime ?? 1,
    featured: row.featured,
  };
}

// ---- Projects ------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  const rows = await publishedRows("project");
  if (rows && rows.length > 0) return rows.map(toProject);
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (await dbAvailable()) {
    const row = await getContentBySlug("project", slug);
    if (row) return toProject(row);
    const draft = await getAnyBySlug("project", slug);
    if (draft) return undefined; // draft never public
  }
  const found = staticGetProject(slug);
  if (found) {
    const rows = await publishedRows("project");
    if (rows && rows.length > 0 && !rows.find((r) => r.slug === slug)) return undefined;
  }
  return staticGetProject(slug);
}

export async function getProjectCategories(): Promise<string[]> {
  if (await dbAvailable()) {
    const rows = await publishedRows("project");
    if (rows && rows.length > 0) {
      return ["all", ...Array.from(new Set(rows.map((r) => r.category).filter(Boolean) as string[]))];
    }
  }
  return staticCategories();
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (await dbAvailable()) {
    const rows = await publishedRows("project");
    if (rows && rows.length > 0) return rows.map((r) => r.slug).filter(Boolean) as string[];
  }
  return staticSlugs();
}

// ---- Experience / Education -------------------------------------------------

export async function getExperiences(): Promise<Experience[]> {
  const rows = await publishedRows("experience");
  if (rows && rows.length > 0) return rows.map(toExperience);
  return experiences;
}

export async function getEducation(): Promise<Education[]> {
  const rows = await publishedRows("education");
  if (rows && rows.length > 0) return rows.map(toEducation);
  return staticEducation;
}

// ---- Skills ----------------------------------------------------------------

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const rows = await publishedRows("skill_group");
  if (rows && rows.length > 0) {
    const order = ["core", "strong", "working"];
    return rows.map(toSkillGroup).sort((a, b) => order.indexOf(a.proficiency) - order.indexOf(b.proficiency));
  }
  return staticSkillGroups;
}

// ---- Services --------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  const rows = await publishedRows("service");
  if (rows && rows.length > 0) return rows.map(toService);
  return staticServices;
}

// ---- Certifications --------------------------------------------------------

export async function getCertifications(): Promise<Certification[]> {
  const rows = await publishedRows("certification");
  if (rows && rows.length > 0) return rows.map(toCertification);
  return staticCertifications;
}

// ---- Testimonials ----------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await publishedRows("testimonial");
  if (rows && rows.length > 0) return rows.map(toTestimonial);
  return staticTestimonials;
}

// ---- Blog ------------------------------------------------------------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await publishedRows("blog_post");
  if (rows && rows.length > 0) return rows.map(toBlogPost);
  return staticBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (await dbAvailable()) {
    const row = await getContentBySlug("blog_post", slug);
    if (row) return toBlogPost(row);
    const draft = await getAnyBySlug("blog_post", slug);
    if (draft) return null;
  }
  return staticBlogBySlug(slug);
}

export async function getBlogSlugs(): Promise<string[]> {
  if (await dbAvailable()) {
    const rows = await publishedRows("blog_post");
    if (rows && rows.length > 0) return rows.map((r) => r.slug).filter(Boolean) as string[];
  }
  return staticBlogSlugs();
}

// ---- Site configuration ------------------------------------------------------

export async function getSiteConfig(): Promise<typeof SITE_CONFIG> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    if (all?.site && typeof all.site === "object") {
      const site = all.site as Record<string, unknown>;
      const social = (all.social as Record<string, unknown> | undefined) ?? {};
      const avail = (all.availability as Record<string, unknown> | undefined) ?? {};
      return {
        name: (site.name as string) ?? SITE_CONFIG.name,
        firstName: (site.firstName as string) ?? SITE_CONFIG.firstName,
        role: (site.role as string) ?? SITE_CONFIG.role,
        title: (site.title as string) ?? SITE_CONFIG.title,
        description: (site.description as string) ?? SITE_CONFIG.description,
        tagline: (site.tagline as string) ?? SITE_CONFIG.tagline,
        url: (site.url as string) ?? SITE_CONFIG.url,
        image: (site.image as string) ?? SITE_CONFIG.image,
        keywords: (site.keywords as string[]) ?? SITE_CONFIG.keywords,
        lastUpdated: (site.lastUpdated as string) ?? SITE_CONFIG.lastUpdated,
        email: (site.email as string) ?? SITE_CONFIG.email,
        phone: (site.phone as string) ?? SITE_CONFIG.phone,
        location: (site.location as string) ?? SITE_CONFIG.location,
        resume: (all.resume as { url?: string } | undefined)?.url ?? SITE_CONFIG.resume,
        social: {
          github: (social.github as string) ?? SITE_CONFIG.social.github,
          linkedin: (social.linkedin as string) ?? SITE_CONFIG.social.linkedin,
          telegram: (social.telegram as string) ?? SITE_CONFIG.social.telegram,
          whatsapp: (social.whatsapp as string) ?? SITE_CONFIG.social.whatsapp,
          twitter: (social.twitter as string) ?? SITE_CONFIG.social.twitter,
        },
        availability: {
          status: (avail.status as "available" | "busy" | "unavailable") ?? SITE_CONFIG.availability.status,
          label: (avail.label as string | undefined) ?? SITE_CONFIG.availability.label,
          types: (avail.types as string[]) ?? SITE_CONFIG.availability.types,
          responseTime: (avail.responseTime as string) ?? SITE_CONFIG.availability.responseTime,
        },
      };
    }
  }
  return SITE_CONFIG;
}

export async function getNavLinks(): Promise<typeof NAV_LINKS> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const nav = all?.nav as { links?: typeof NAV_LINKS } | undefined;
    if (nav?.links?.length) return nav.links;
  }
  return NAV_LINKS;
}

export async function getSocialLinks(): Promise<typeof SOCIAL_LINKS> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const social = all?.social as { links?: typeof SOCIAL_LINKS } | undefined;
    if (social?.links?.length) return social.links;
  }
  return SOCIAL_LINKS;
}

export async function getProfile(): Promise<typeof PROFILE> {
  const site = await getSiteConfig();
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const profile = all?.profile as Partial<typeof PROFILE> | undefined;
    if (profile) {
      return {
        ...PROFILE,
        ...profile,
        name: site.name,
        firstName: site.firstName,
        email: site.email,
        phone: site.phone,
        location: site.location,
        resumeUrl: site.resume,
        availability: site.availability,
      } as typeof PROFILE;
    }
  }
  return PROFILE;
}

export async function getSectionContent(): Promise<typeof SECTIONS> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const stored = all?.sections as Record<string, unknown> | undefined;
    if (stored) {
      const merged: typeof SECTIONS = { ...SECTIONS };
      for (const key of Object.keys(SECTIONS)) {
        const value = stored[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          merged[key] = { ...merged[key], ...(value as SectionHeadingContent) };
        }
      }
      return merged;
    }
  }
  return SECTIONS;
}

export async function getProjectFilters(): Promise<typeof PROJECT_FILTERS> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const sections = all?.sections as { projectFilters?: typeof PROJECT_FILTERS } | undefined;
    if (sections?.projectFilters) return sections.projectFilters;
  }
  return PROJECT_FILTERS;
}

export async function getContactPurposes(): Promise<readonly string[]> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const sections = all?.sections as { contactPurposes?: string[] } | undefined;
    if (sections?.contactPurposes?.length) return sections.contactPurposes;
  }
  return CONTACT_PURPOSES;
}

export async function getCredibilityItems(): Promise<typeof CREDIBILITY_ITEMS> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const footer = all?.footer as { credibility?: typeof CREDIBILITY_ITEMS } | undefined;
    if (footer?.credibility?.length) return footer.credibility;
  }
  return CREDIBILITY_ITEMS;
}

export async function getSectionVisibility(): Promise<Record<string, boolean>> {
  const defaults: Record<string, boolean> = {};
  for (const key of Object.keys(SECTIONS)) defaults[key] = true;
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const stored = all?.visibility as Record<string, boolean> | undefined;
    if (stored) return { ...defaults, ...stored };
  }
  return defaults;
}

export async function getCapabilityGroups(): Promise<typeof staticCapabilityGroups> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const sections = all?.sections as { capabilityGroups?: typeof staticCapabilityGroups } | undefined;
    if (sections?.capabilityGroups?.length) return sections.capabilityGroups;
  }
  return staticCapabilityGroups;
}

export async function getEngineeringSteps(): Promise<typeof staticEngineeringSteps> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const sections = all?.sections as { engineeringSteps?: typeof staticEngineeringSteps } | undefined;
    if (sections?.engineeringSteps?.length) return sections.engineeringSteps;
  }
  return staticEngineeringSteps;
}

export async function getTechnicalChallenges(): Promise<typeof staticTechnicalChallenges> {
  if (await dbAvailable()) {
    const all = await getAllSettings();
    const sections = all?.sections as {
      technicalChallenges?: typeof staticTechnicalChallenges;
      technicalChallengesList?: typeof staticTechnicalChallenges;
    } | undefined;
    const list = sections?.technicalChallengesList ?? sections?.technicalChallenges;
    if (list?.length) return list;
  }
  return staticTechnicalChallenges;
}