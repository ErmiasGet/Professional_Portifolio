import { upsertContentBySlug } from "../../db/content";
import { setSetting } from "../../db/settings";
import { ensureSchema } from "../../db/migrate";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS, CREDIBILITY_ITEMS, PROJECT_FILTERS, CONTACT_PURPOSES } from "@/content/site";
import { PROFILE } from "@/content/profile";
import { SECTIONS, capabilityGroups, engineeringSteps, technicalChallenges } from "@/content/sections";
import { projects, getProjectCategories } from "@/content/projects";
import { experiences, education } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { services } from "@/content/services";
import { certifications } from "@/content/certifications";
import { testimonials } from "@/content/testimonials";
import { getAllBlogPosts } from "@/lib/blog";

/**
 * One-time (idempotent) migration of the existing static content into
 * PostgreSQL. Safe to re-run: every row is upserted on (type, slug).
 */
export async function seedStaticContent(): Promise<{ seeded: number }> {
  const ready = await ensureSchema();
  if (!ready) throw new Error("Database is not configured.");

  let seeded = 0;

  for (const [index, project] of projects.entries()) {
    const { slug, title, category, status, featured, ...data } = project;
    await upsertContentBySlug({
      type: "project",
      slug,
      title,
      category,
      status: "published",
      featured,
      orderIndex: index,
      publishedAt: data.updatedAt ?? SITE_CONFIG.lastUpdated,
      data: { ...data, category, status },
    });
    seeded++;
  }

  for (const [index, exp] of experiences.entries()) {
    const { id, company, role, type, current, ...data } = exp;
    await upsertContentBySlug({
      type: "experience",
      slug: id,
      title: `${role} @ ${company}`,
      category: type,
      status: "published",
      featured: false,
      orderIndex: index,
      data: { ...data, company, role, type, current: Boolean(current) },
    });
    seeded++;
  }

  for (const [index, edu] of education.entries()) {
    const { id, institution, field, degree, ...data } = edu;
    await upsertContentBySlug({
      type: "education",
      slug: id,
      title: `${degree} ${field}`,
      category: field,
      status: "published",
      featured: false,
      orderIndex: index,
      data: { ...data, institution, field, degree },
    });
    seeded++;
  }

  for (const [index, group] of skillGroups.entries()) {
    const { proficiency, label, description, skills } = group;
    await upsertContentBySlug({
      type: "skill_group",
      slug: proficiency,
      title: label,
      category: proficiency,
      status: "published",
      featured: false,
      orderIndex: index,
      data: { proficiency, label, description, skills },
    });
    seeded++;
  }

  for (const [index, service] of services.entries()) {
    const { id, title, icon, features, technologies, cta, description } = service;
    await upsertContentBySlug({
      type: "service",
      slug: id,
      title,
      category: "service",
      status: "published",
      featured: false,
      orderIndex: index,
      data: { title, description, icon, features, technologies, cta },
    });
    seeded++;
  }

  for (const [index, cert] of certifications.entries()) {
    const { id, name, issuer, issuedAt, expiresAt, kind, credentialUrl, credentialId } = cert;
    await upsertContentBySlug({
      type: "certification",
      slug: id,
      title: name,
      category: kind,
      status: "published",
      featured: false,
      orderIndex: index,
      data: { name, issuer, issuedAt, expiresAt, kind, credentialUrl, credentialId },
    });
    seeded++;
  }

  for (const [index, t] of testimonials.entries()) {
    const { id, name, role, company, content, context, project, image, featured } = t;
    await upsertContentBySlug({
      type: "testimonial",
      slug: id,
      title: name,
      category: company,
      status: "published",
      featured: Boolean(featured),
      orderIndex: index,
      data: { name, role, company, content, context, project, image },
    });
    seeded++;
  }

  const blogPosts = await getAllBlogPosts();
  for (const [index, post] of blogPosts.entries()) {
    const { slug, title, description, content, image, category, tags, author, publishedAt, updatedAt, readingTime, featured } = post;
    await upsertContentBySlug({
      type: "blog_post",
      slug,
      title,
      category,
      status: "published",
      featured,
      orderIndex: index,
      publishedAt: updatedAt ?? publishedAt,
      data: {
        title,
        description,
        content,
        image,
        category,
        tags,
        author,
        publishedAt,
        updatedAt,
        readingTime,
      },
    });
    seeded++;
  }

  // Settings (logical groups: site, profile, seo, social, availability,
  // resume, nav, footer, sections — never a single monolithic blob).
  await setSetting("site", {
    name: SITE_CONFIG.name,
    firstName: SITE_CONFIG.firstName,
    role: SITE_CONFIG.role,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    tagline: SITE_CONFIG.tagline,
    url: SITE_CONFIG.url,
    image: SITE_CONFIG.image,
    keywords: SITE_CONFIG.keywords,
    lastUpdated: SITE_CONFIG.lastUpdated,
    email: SITE_CONFIG.email,
    phone: SITE_CONFIG.phone,
    location: SITE_CONFIG.location,
  });
  await setSetting("profile", {
    headline: PROFILE.headline,
    heroIntro: PROFILE.heroIntro,
    heroSubtitle: PROFILE.heroSubtitle,
    currentRole: PROFILE.currentRole,
    education: PROFILE.education,
    credentials: PROFILE.credentials,
    biography: PROFILE.biography,
    focusAreas: PROFILE.focusAreas,
    openTo: PROFILE.openTo,
    careerFocus: PROFILE.careerFocus,
    skillsSummary: PROFILE.skillsSummary,
  });
  await setSetting("seo", {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    image: SITE_CONFIG.image,
  });
  await setSetting("social", {
    github: SITE_CONFIG.social.github,
    linkedin: SITE_CONFIG.social.linkedin,
    telegram: SITE_CONFIG.social.telegram,
    whatsapp: SITE_CONFIG.social.whatsapp,
    twitter: SITE_CONFIG.social.twitter,
    links: SOCIAL_LINKS,
  });
  await setSetting("availability", {
    status: SITE_CONFIG.availability.status,
    label: SITE_CONFIG.availability.label,
    types: SITE_CONFIG.availability.types,
    responseTime: SITE_CONFIG.availability.responseTime,
  });
  await setSetting("resume", { url: SITE_CONFIG.resume });
  await setSetting("nav", { links: NAV_LINKS });
  await setSetting("footer", { credibility: CREDIBILITY_ITEMS });
  await setSetting("sections", {
    ...SECTIONS,
    capabilityGroups,
    engineeringSteps,
    technicalChallengesList: technicalChallenges,
    projectFilters: PROJECT_FILTERS,
    contactPurposes: CONTACT_PURPOSES,
    projectCategories: getProjectCategories(),
  });

  return { seeded };
}