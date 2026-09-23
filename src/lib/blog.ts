import fs from "node:fs/promises";
import path from "node:path";
import type { BlogPost } from "@/types";
import { SITE_CONFIG } from "@/content/site";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogPostPreview = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
  | "image"
  | "category"
  | "tags"
  | "author"
  | "publishedAt"
  | "updatedAt"
  | "readingTime"
  | "featured"
>;

interface Frontmatter {
  [key: string]: string | string[] | boolean | undefined;
}

function parseScalar(value: string): string | string[] | boolean {
  const v = value.trim();
  if (v.startsWith("[")) {
    return v
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  if (v === "true") return true;
  if (v === "false") return false;
  const quoted = v.match(/^(["'])([\s\S]*)\1$/);
  return quoted ? quoted[2] : v;
}

function parseFrontmatter(raw: string): { meta: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };

  const meta: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const keyMatch = line.match(/^([A-Za-z]\w*):\s*(.*)$/);
    if (!keyMatch) continue;
    const key = keyMatch[1];
    if (!keyMatch[2].trim()) continue;
    meta[key] = parseScalar(keyMatch[2]);
  }
  return { meta, body: match[2].trim() };
}

function extractTitleFromBody(body: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function firstParagraph(body: string): string {
  for (const line of body.split(/\n+/)) {
    const text = line.trim();
    if (!text) continue;
    if (/^#/.test(text)) continue;
    if (/^[-*]\s/.test(text)) break;
    const plain = text.replace(/[*_`#]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    if (plain.length >= 40) return plain.slice(0, 280);
  }
  return "";
}

function estimateReadingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function readPostFile(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    const { meta, body } = parseFrontmatter(raw);

    const title =
      (meta.title as string | undefined)?.trim() || extractTitleFromBody(body);
    const description =
      (meta.description as string | undefined)?.trim() ||
      firstParagraph(body) ||
      "A technical article by Ermias Getahun.";

    return {
      slug,
      title,
      description,
      content: body,
      image: meta.image as string | undefined,
      category: (meta.category as string | undefined) || "Engineering",
      tags: (meta.tags as string[] | undefined) || [],
      author: (meta.author as string | undefined) || SITE_CONFIG.name,
      publishedAt: (meta.publishedAt as string | undefined) || SITE_CONFIG.lastUpdated,
      updatedAt: meta.updatedAt as string | undefined,
      readingTime: estimateReadingTime(body),
      featured: (meta.featured as boolean | undefined) ?? false,
    };
  } catch {
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return readPostFile(slug);
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map((e) => e.name.replace(/\.mdx$/, ""))
      .sort();
  } catch {
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getBlogSlugs();
  const posts = (
    await Promise.all(slugs.map((slug) => readPostFile(slug)))
  ).filter((p): p is BlogPost => p !== null);

  return posts.sort((a, b) => {
    const dateDiff = (b.updatedAt ?? b.publishedAt).localeCompare(
      a.updatedAt ?? a.publishedAt
    );
    if (dateDiff !== 0) return dateDiff;
    return a.title.localeCompare(b.title);
  });
}

export function toBlogPostPreview(post: BlogPost): BlogPostPreview {
  const { content, ...preview } = post;
  void content;
  return preview;
}

export function getBlogCategories(
  posts: Pick<BlogPost, "category">[]
): string[] {
  return ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
}