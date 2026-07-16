"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { getBlogPostsByCategory } from "@/data/blog";
import { BLOG_CATEGORIES } from "@/constants";
import { formatDate } from "@/utils";
import { cn } from "@/lib/cn";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = getBlogPostsByCategory(activeCategory).filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <SectionHeading
          badge="Blog"
          title="Technical Articles & Insights"
          subtitle="Thoughts, tutorials, and insights from my development journey."
        />

        <div className="mx-auto max-w-2xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                No articles found matching your search.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <GlowCard className="group overflow-hidden h-full flex flex-col">
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-2xl font-bold text-primary/15">
                            {post.title.split(" ").slice(0, 2).join(" ")}
                          </div>
                        </div>
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
                        <Badge variant="secondary" className="mb-3 w-fit text-xs">
                          {post.category}
                        </Badge>
                        <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                          {post.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </main>
  );
}
