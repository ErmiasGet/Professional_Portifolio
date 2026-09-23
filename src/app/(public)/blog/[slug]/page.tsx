import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug as getDbBlogPostBySlug, getBlogSlugs as getDbBlogSlugs } from "@/lib/data/public";
import { formatDate } from "@/utils";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_CONFIG } from "@/content/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getDbBlogSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDbBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const ogImage = post.image ? `${SITE_CONFIG.url}${post.image}` : undefined;

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: { canonical: `${SITE_CONFIG.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getDbBlogPostBySlug(slug);

  if (!post) notFound();

  const contentHtml = renderMarkdown(post.content);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <Badge variant="secondary">{post.category}</Badge>
          </div>

          {post.image && (
            <div className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl mb-4">
            {post.title}
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-8" />

          {contentHtml ? (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              The full article is coming soon. The short version is captured in the description
              above.
            </p>
          )}
        </article>
      </Container>
    </main>
  );
}