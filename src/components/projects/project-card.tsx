import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { GithubIcon } from "@/components/shared/social-icons";
import { PROJECT_FILTERS } from "@/content/site";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";

function categoryLabel(project: Project) {
  return PROJECT_FILTERS[project.category] || project.category;
}

function TechPills({ project }: { project: Project }) {
  const techs = (project.featuredTechnologies ?? project.technologies).slice(0, 5);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="Technologies">
      {techs.map((tech) => (
        <span
          key={tech}
          className="inline-flex items-center rounded-full border border-border/70 bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ImageOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-zinc-950/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 md:translate-y-3 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-xl">
          View Case Study
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </>
  );
}

function SecondaryLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Live Demo
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      {project.github && project.repoStatus === "public" ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
          <Lock className="h-3.5 w-3.5" />
          Private Repository
        </span>
      )}
    </div>
  );
}

function CaseStudyLink({ project, large }: { project: Project; large?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30",
        large ? "h-11 px-6 text-sm" : "h-9 px-4 text-sm"
      )}
    >
      View Case Study
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 card-glow hover:-translate-y-1 hover:border-primary/40 lg:grid lg:grid-cols-5">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15 lg:col-span-3 lg:aspect-auto lg:min-h-[420px]"
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/25 via-transparent to-transparent" />
        <ImageOverlay />

        <div className="absolute right-4 top-4">
          <Badge variant="default" className="bg-white/95 text-zinc-900 backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            Featured Project
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4">
          <ProjectStatusBadge status={project.status} className="bg-card/85 backdrop-blur" />
        </div>
      </Link>

      <div className="flex flex-col p-6 sm:p-8 lg:col-span-2 lg:justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{categoryLabel(project)}</Badge>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        {project.highlights?.[0] && (
          <p className="mt-3 inline-flex items-start gap-1.5 text-sm font-medium text-foreground/90">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            {project.highlights[0]}
          </p>
        )}

        <TechPills project={project} />

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-muted-foreground">
              <span className="font-semibold text-foreground">Role</span>
              <span className="mx-1.5 text-muted-foreground/40">·</span>
              {project.role}
            </p>
            <CaseStudyLink project={project} large />
          </div>
          <SecondaryLinks project={project} className="mt-3" />
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 card-glow hover:-translate-y-1 hover:border-primary/40">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15"
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent" />
        <ImageOverlay />

        <div className="absolute bottom-4 left-4">
          <ProjectStatusBadge status={project.status} className="bg-card/85 backdrop-blur" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{categoryLabel(project)}</Badge>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.highlights?.[0] && (
          <p className="mt-2.5 inline-flex items-start gap-1.5 text-xs font-medium text-foreground/85">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            {project.highlights[0]}
          </p>
        )}

        <TechPills project={project} />

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <p className="text-xs font-medium text-muted-foreground">
              <span className="font-semibold text-foreground">Role</span>
              <span className="mx-1.5 text-muted-foreground/40">·</span>
              {project.role}
            </p>
            <CaseStudyLink project={project} />
          </div>
          <SecondaryLinks project={project} className="mt-3" />
        </div>
      </div>
    </article>
  );
}