import { Hero } from "@/components/sections/hero";
import { Credibility } from "@/components/sections/credibility";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { WhatICanBuild } from "@/components/sections/what-i-can-build";
import { Experience } from "@/components/sections/experience";
import { EngineeringApproach } from "@/components/sections/engineering-approach";
import { Services } from "@/components/sections/services";
import { TechnicalChallenges } from "@/components/sections/technical-challenges";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import {
  getProfile,
  getSocialLinks,
  getSiteConfig,
  getCredibilityItems,
  getSectionContent,
  getProjects,
  getSkillGroups,
  getCapabilityGroups,
  getExperiences,
  getEducation,
  getEngineeringSteps,
  getServices,
  getTechnicalChallenges,
  getCertifications,
  getTestimonials,
  getContactPurposes,
  getSectionVisibility,
} from "@/lib/data/public";

export default async function Home() {
  const [
    profile,
    socials,
    siteConfig,
    credibilityItems,
    sectionsContent,
    projects,
    skillGroups,
    capabilityGroups,
    experiences,
    education,
    engineeringSteps,
    services,
    technicalChallenges,
    certifications,
    testimonials,
    purposes,
    visibility,
  ] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSiteConfig(),
    getCredibilityItems(),
    getSectionContent(),
    getProjects(),
    getSkillGroups(),
    getCapabilityGroups(),
    getExperiences(),
    getEducation(),
    getEngineeringSteps(),
    getServices(),
    getTechnicalChallenges(),
    getCertifications(),
    getTestimonials(),
    getContactPurposes(),
    getSectionVisibility(),
  ]);

  const NUMBERED_ORDER = [
    "about",
    "projects",
    "skills",
    "whatICanBuild",
    "experience",
    "engineeringApproach",
    "services",
    "technicalChallenges",
    "certifications",
    "testimonials",
    "blog",
    "contact",
  ];
  const sectionIndex = (key: string) => {
    let n = 0;
    for (const k of NUMBERED_ORDER) {
      if (visibility[k]) n++;
      if (k === key) break;
    }
    return String(n).padStart(2, "0");
  };

  return (
    <>
      {visibility.hero && (
        <Hero profile={profile} socials={socials} availability={siteConfig.availability} />
      )}
      {visibility.credibility && <Credibility items={credibilityItems} />}
      {visibility.about && (
        <About
          profile={profile}
          sectionsContent={sectionsContent}
          index={sectionIndex("about")}
        />
      )}
      {visibility.projects && (
        <Projects
          projects={projects}
          sectionsContent={sectionsContent}
          index={sectionIndex("projects")}
        />
      )}
      {visibility.skills && (
        <Skills skillGroups={skillGroups} sectionsContent={sectionsContent} index={sectionIndex("skills")} />
      )}
      {visibility.whatICanBuild && (
        <WhatICanBuild
          groups={capabilityGroups}
          sectionsContent={sectionsContent}
          index={sectionIndex("whatICanBuild")}
        />
      )}
      {visibility.experience && (
        <Experience
          experiences={experiences}
          education={education}
          sectionsContent={sectionsContent}
          index={sectionIndex("experience")}
        />
      )}
      {visibility.engineeringApproach && (
        <EngineeringApproach
          steps={engineeringSteps}
          sectionsContent={sectionsContent}
          index={sectionIndex("engineeringApproach")}
        />
      )}
      {visibility.services && (
        <Services services={services} sectionsContent={sectionsContent} index={sectionIndex("services")} />
      )}
      {visibility.technicalChallenges && (
        <TechnicalChallenges
          challenges={technicalChallenges}
          sectionsContent={sectionsContent}
          index={sectionIndex("technicalChallenges")}
        />
      )}
      {visibility.certifications && (
        <Certifications
          certifications={certifications}
          sectionsContent={sectionsContent}
          index={sectionIndex("certifications")}
        />
      )}
      {visibility.testimonials && (
        <Testimonials
          testimonials={testimonials}
          sectionsContent={sectionsContent}
          index={sectionIndex("testimonials")}
        />
      )}
      {visibility.blog && <BlogPreview index={sectionIndex("blog")} />}
      {visibility.contact && (
        <Contact
          site={siteConfig}
          purposes={purposes}
          services={services}
          availability={siteConfig.availability}
          sectionsContent={sectionsContent}
          index={sectionIndex("contact")}
        />
      )}
    </>
  );
}