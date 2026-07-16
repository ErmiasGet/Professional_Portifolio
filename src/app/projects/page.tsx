import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects | Ermias Getahun",
  description: "Explore the software engineering portfolio of Ermias Getahun - full-stack web applications, SaaS platforms, desktop apps, and mobile applications.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24">
      <Projects />
    </main>
  );
}
