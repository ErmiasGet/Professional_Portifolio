import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/content/site";

const baseUrl = SITE_CONFIG.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt ?? SITE_CONFIG.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(SITE_CONFIG.lastUpdated),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(SITE_CONFIG.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(SITE_CONFIG.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectPages,
    ...blogPages,
  ];
}