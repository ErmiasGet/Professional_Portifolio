import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Testimonials />
      <Process />
      <TechStack />
      <BlogPreview />
      <Contact />
    </>
  );
}
