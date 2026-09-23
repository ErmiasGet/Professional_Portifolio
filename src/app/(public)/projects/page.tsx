import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";
import { getProjects, getSectionContent } from "@/lib/data/public";
import { SITE_CONFIG } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects | Software Systems & SaaS Platforms",
  description:
    "A selection of the software systems I've designed and built — multi-tenant SaaS platforms, business management systems, and web applications.",
  alternates: { canonical: `${SITE_CONFIG.url}/projects` },
};

export default async function ProjectsPage() {
  const [projects, sectionsContent] = await Promise.all([
    getProjects(),
    getSectionContent(),
  ]);

  return (
    <main className="min-h-screen pt-24">
      <Projects variant="all" projects={projects} sectionsContent={sectionsContent} />
    </main>
  );
}