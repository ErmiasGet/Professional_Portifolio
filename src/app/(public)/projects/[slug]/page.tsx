import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  User,
  Clock,
  CheckCircle,
  Target,
  Layers,
  Database,
  ShieldCheck,
  Lightbulb,
  Flag,
  Wrench,
  Users,
  Lock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { GithubIcon } from "@/components/shared/social-icons";
import { getProjectBySlug as getDbProjectBySlug, getAllProjectSlugs as getDbAllProjectSlugs } from "@/lib/data/public";
import { PROJECT_FILTERS, SITE_CONFIG } from "@/content/site";
import type { Project } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getDbAllProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.description,
    alternates: { canonical: `${SITE_CONFIG.url}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.description,
      type: "article",
      url: `${SITE_CONFIG.url}/projects/${project.slug}`,
      images: [{ url: `${SITE_CONFIG.url}${project.image}` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, allSlugs] = await Promise.all([
    getDbProjectBySlug(slug),
    getDbAllProjectSlugs(),
  ]);

  if (!project) notFound();

  const index = allSlugs.indexOf(project.slug);
  const nextSlug = index >= 0 ? allSlugs[(index + 1) % allSlugs.length] : undefined;
  const next = nextSlug ? await getDbProjectBySlug(nextSlug) : undefined;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <article className="mx-auto max-w-4xl">
          <CaseStudyHero project={project} />

          {project.caseStudyComplete ? (
            <CaseStudyBody project={project} />
          ) : (
            <LegacyBody project={project} />
          )}

          <NextProject next={next} />
        </article>
      </Container>
    </main>
  );
}

function CaseStudyHero({ project }: { project: Project }) {
  const stack = (project.featuredTechnologies ?? project.technologies).slice(0, 6);

  return (
    <header>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{PROJECT_FILTERS[project.category] || project.category}</Badge>
        <ProjectStatusBadge status={project.status} />
      </div>

      <h1 className="text-balance mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {project.title}
      </h1>
      <p className="mt-3 text-lg font-medium text-primary sm:text-xl">{project.tagline}</p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {project.longDescription}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span className="text-foreground">{project.role}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {project.duration}
        </span>
      </div>

      {stack.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-1.5" aria-label="Technology stack">
          {stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30">
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        )}
        {project.github && project.repoStatus === "public" ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-primary px-6 text-base font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              <GithubIcon className="h-4 w-4" />
              View Code
            </span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Private Repository
          </span>
        )}
      </div>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/15 to-accent/15">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-top"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(60rem circle at 50% 0%, hsl(var(--primary) / 0.1), transparent 60%)",
          }}
        />
      </div>
    </header>
  );
}

function Section({
  icon,
  title,
  children,
  accent,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className={accent ? "border-primary/20 bg-primary/5" : "border-border"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function BulletList({ items, dotClass = "bg-primary" }: { items: string[]; dotClass?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ActionLinks({ project }: { project: Project }) {
  return (
    <Section accent icon={<ArrowUpRight className="h-5 w-5" />} title="Live Demo & Source Code">
      <div className="flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30">
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        )}
        {project.github && project.repoStatus === "public" ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-primary px-6 text-base font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              <GithubIcon className="h-4 w-4" />
              View on GitHub
            </span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Private Repository
          </span>
        )}
      </div>
    </Section>
  );
}

function CaseStudyBody({ project }: { project: Project }) {
  return (
    <>
      <Separator className="my-12" />

      <div className="space-y-6">
        {project.overview && (
          <Section icon={<Layers className="h-5 w-5" />} title="Project Overview">
            <p className="text-muted-foreground">{project.overview}</p>
          </Section>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Section icon={<Flag className="h-5 w-5" />} title="The Problem">
            <p className="text-muted-foreground">{project.problemStatement}</p>
          </Section>
          <Section icon={<Lightbulb className="h-5 w-5" />} title="The Solution">
            <p className="text-muted-foreground">{project.solution}</p>
          </Section>
        </div>

        <Section icon={<Layers className="h-5 w-5" />} title="Key Features">
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-4 w-4 text-success" />
                </span>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<User className="h-5 w-5" />} title="My Role">
          <p className="text-muted-foreground">{project.myRole}</p>
          {project.keyAchievements && project.keyAchievements.length > 0 && (
            <ul className="mt-4 space-y-2">
              {project.keyAchievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {achievement}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {project.targetUsers && project.targetUsers.length > 0 && (
          <Section icon={<Users className="h-5 w-5" />} title="Who It's For">
            <BulletList items={project.targetUsers} />
          </Section>
        )}

        {project.goals && project.goals.length > 0 && (
          <Section icon={<Target className="h-5 w-5" />} title="Goals">
            <BulletList items={project.goals} />
          </Section>
        )}

        {project.userRoles && project.userRoles.length > 0 && (
          <Section icon={<Users className="h-5 w-5" />} title="User & System Workflow">
            <div className="grid gap-4 sm:grid-cols-3">
              {project.userRoles.map((role) => (
                <div key={role.name} className="rounded-xl border border-border bg-background p-4">
                  <h4 className="mb-2 text-sm font-semibold">{role.name}</h4>
                  <ul className="space-y-1.5">
                    {role.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {project.architectureDiagram && (
          <Section icon={<Layers className="h-5 w-5" />} title="Architecture">
            <div className="space-y-4">
              {project.architecture && <p className="text-muted-foreground">{project.architecture}</p>}
              <ArchitectureDiagram diagram={project.architectureDiagram} />
            </div>
          </Section>
        )}

        {(project.database || project.auth) && (
          <div className="grid gap-6 sm:grid-cols-2">
            {project.database && (
              <Section icon={<Database className="h-5 w-5" />} title="Database Design">
                <p className="text-muted-foreground">{project.database}</p>
              </Section>
            )}
            {project.auth && (
              <Section icon={<ShieldCheck className="h-5 w-5" />} title="Authentication & Authorization">
                <p className="text-muted-foreground">{project.auth}</p>
              </Section>
            )}
          </div>
        )}

        <Section icon={<Layers className="h-5 w-5" />} title="Technology Stack">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </Section>

        <Section icon={<Layers className="h-5 w-5" />} title="UI & Screenshots">
          <ProjectGallery project={project} />
        </Section>

        <div className="grid gap-6 sm:grid-cols-2">
          <Section icon={<Flag className="h-5 w-5" />} title="Technical Challenges">
            <BulletList items={project.challenges} />
          </Section>
          {project.solutions && project.solutions.length > 0 && (
            <Section icon={<Wrench className="h-5 w-5" />} title="How I Solved Them">
              <BulletList items={project.solutions} />
            </Section>
          )}
        </div>

        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
          <Section icon={<Lightbulb className="h-5 w-5" />} title="Implementation Decisions">
            <div className="space-y-4">
              {project.technicalDecisions.map((decision) => (
                <div key={decision.title} className="rounded-xl border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold">{decision.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{decision.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {project.responsive && (
          <Section icon={<Layers className="h-5 w-5" />} title="Responsive Design">
            <p className="text-muted-foreground">{project.responsive}</p>
          </Section>
        )}

        {project.statusNote && (
          <Section accent icon={<Flag className="h-5 w-5" />} title="Current Status & Results">
            <div className="space-y-3">
              <ProjectStatusBadge status={project.status} />
              <p className="text-sm text-muted-foreground">{project.statusNote}</p>
              {project.impact && (
                <p className="text-sm font-medium text-muted-foreground">{project.impact}</p>
              )}
            </div>
          </Section>
        )}

        {project.lessonsLearned.length > 0 && (
          <Section icon={<Lightbulb className="h-5 w-5" />} title="Lessons Learned">
            <BulletList items={project.lessonsLearned} />
          </Section>
        )}

        <ActionLinks project={project} />
      </div>
    </>
  );
}

function LegacyBody({ project }: { project: Project }) {
  return (
    <>
      <Separator className="my-12" />
      <div className="space-y-6">
        <Section icon={<Flag className="h-5 w-5" />} title="The Problem">
          <p className="text-muted-foreground">{project.problemStatement}</p>
        </Section>
        <Section icon={<Lightbulb className="h-5 w-5" />} title="The Solution">
          <p className="text-muted-foreground">{project.solution}</p>
        </Section>
        <Section icon={<Layers className="h-5 w-5" />} title="Key Features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </Section>
        {project.architectureDiagram && (
          <Section icon={<Layers className="h-5 w-5" />} title="Architecture">
            <ArchitectureDiagram diagram={project.architectureDiagram} />
          </Section>
        )}
        <Section icon={<Flag className="h-5 w-5" />} title="Challenges">
          <BulletList items={project.challenges} dotClass="bg-warning" />
        </Section>
        {project.lessonsLearned.length > 0 && (
          <Section icon={<Lightbulb className="h-5 w-5" />} title="Lessons Learned">
            <BulletList items={project.lessonsLearned} />
          </Section>
        )}
        {project.impact && (
          <Section accent icon={<Target className="h-5 w-5" />} title="Impact">
            <p className="font-medium text-muted-foreground">{project.impact}</p>
          </Section>
        )}
        <Section icon={<Layers className="h-5 w-5" />} title="Technologies Used">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function NextProject({ next }: { next?: Project }) {
  if (!next) return null;

  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group mt-16 block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 card-glow hover:border-primary/30"
    >
      <div className="flex items-stretch gap-0 sm:gap-2">
        <div className="relative hidden w-1/3 max-w-[280px] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15 sm:block">
          <Image
            src={next.image}
            alt={`${next.title} case study`}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Next Project
          </p>
          <p className="text-lg font-bold sm:text-xl">{next.title}</p>
          <p className="text-sm text-muted-foreground">{next.role}</p>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Open Case Study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}