"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/utils";

export function BlogPreview() {
  return (
    <section id="blog" className="relative py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          badge="Blog"
          title="Latest Articles"
          subtitle="Thoughts, tutorials, and insights from my development journey."
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {blogPosts.slice(0, 3).map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <GlowCard className="group overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl font-bold text-primary/15">{post.title.split(" ").slice(0, 2).join(" ")}</div>
                      </div>
                    )}
                    {post.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                    <Badge variant="secondary" className="mb-3 w-fit text-xs">{post.category}</Badge>
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg" className="group">
              View All Posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
