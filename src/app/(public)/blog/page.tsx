import type { Metadata } from "next";
import { getBlogCategories, toBlogPostPreview } from "@/lib/blog";
import { getBlogPosts } from "@/lib/data/public";
import { BlogIndex } from "@/components/blog/blog-index";
import { SITE_CONFIG } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog | Technical Articles & Insights",
  description:
    "Notes and deep-dives from the systems I build — architecture, multi-tenant SaaS, RBAC, REST APIs, and practical engineering lessons.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
};

export default async function BlogPage() {
  const posts = (await getBlogPosts()).map(toBlogPostPreview);
  const categories = getBlogCategories(posts);

  return <BlogIndex posts={posts} categories={categories} />;
}