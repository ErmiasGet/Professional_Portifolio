import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "@/components/shared/social-icons";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";


interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Ermias Getahun`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video mb-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            ) : (
              <div className="text-6xl font-bold text-primary/15">
                {project.title.split(" ").map((w) => w[0]).join("").slice(0, 4)}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">{project.category}</Badge>
            <Badge variant="secondary">{project.status}</Badge>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {project.role}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {project.duration}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <GithubIcon />
                  View Code
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.problemStatement}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.solution}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.architecture}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lessons Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {project.impact && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-medium">{project.impact}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
