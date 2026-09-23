import type {
  CapabilityGroup,
  EngineeringStep,
  SectionHeadingContent,
  TechnicalChallenge,
} from "@/types";

/**
 * Section copy for the homepage. Headings and sub-text live here so they can
 * be edited without touching the components.
 */
export const SECTIONS: Record<string, SectionHeadingContent> = {
  hero: { badge: "", title: "", subtitle: "" },
  credibility: { badge: "", title: "", subtitle: "" },
  projects: {
    badge: "Projects",
    title: "Systems I Build",
    subtitle: "A selection of the software products I've designed and built from multi-tenant SaaS platforms and business systems to healthcare and web applications.",
  },
  services: {
    badge: "Capabilities",
    title: "What I Can Do for You",
    subtitle: "Focused services that cover the full product journey from idea to a working, deployed system.",
  },
  whatICanBuild: {
    badge: "What I Can Build",
    title: "Practical Development Capability",
    subtitle: "The kinds of software I design and build systems that replace manual work with structured digital products.",
  },
  about: {
    badge: "About",
    title: "Who I Am",
    subtitle: "A quick look at my background, what I focus on, and the kind of work I want to do next.",
  },
  experience: {
    badge: "Experience",
    title: "Where I've Worked",
    subtitle: "The roles and projects that shaped how I build software.",
  },
  skills: {
    badge: "Skills",
    title: "My Technical Toolkit",
    subtitle: "The technologies and engineering practices I use to build and ship software.",
  },
  engineeringApproach: {
    badge: "How I Build",
    title: "My Engineering Approach",
    subtitle: "The process I follow to take a product from a real problem to a working system.",
  },
  technicalChallenges: {
    badge: "Problem Solving",
    title: "Technical Challenges I've Solved",
    subtitle: "Real problems from my projects and the engineering decisions that fixed them.",
  },
  certifications: {
    badge: "Learning",
    title: "Courses & Learning",
    subtitle: "Formal courses and certifications I've completed to keep sharpening my skills.",
  },
  testimonials: {
    badge: "Testimonials",
    title: "What People Say",
    subtitle: "Feedback from supervisors, teammates and clients I've worked with.",
  },
  blog: {
    badge: "Blog",
    title: "Latest Articles",
    subtitle: "Notes and deep-dives from the systems I build.",
  },
  contact: {
    badge: "Contact",
    title: "Let's Work Together",
    subtitle: "Have a project in mind, or want to chat about a role? Tell me about it and I'll get back to you.",
  },
};

/**
 * "What I Can Build" capability groups.
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Management Systems",
    icon: "building2",
    items: [
      "Property",
      "Finance",
      "Inventory",
      "Healthcare",
      "Accommodation",
      "Document Management",
    ],
  },
  {
    title: "SaaS Platforms",
    icon: "cloud",
    items: ["Multi-tenant", "Subscriptions", "Dashboards", "RBAC", "Reports"],
  },
  {
    title: "Applications",
    icon: "monitor-smartphone",
    items: ["Web", "Mobile", "Desktop", "API"],
  },
];

/**
 * "My Engineering Approach" process steps.
 */
export const engineeringSteps: EngineeringStep[] = [
  {
    icon: "search",
    title: "Understand",
    description:
      "Map out the actual problem, who it affects, and what a working solution has to accomplish. Before writing code, the goal needs to be concrete.",
  },
  {
    icon: "clipboard-list",
    title: "Plan",
    description:
      "Define scope, user roles, data structure and the architecture — what the system must do and how the pieces will fit together.",
  },
  {
    icon: "code2",
    title: "Build",
    description:
      "Develop the product end to end: interface, API, database and business logic, using typed languages and consistent patterns.",
  },
  {
    icon: "flask-conical",
    title: "Test",
    description:
      "Verify workflows the way real users will use them — catching edge cases and making sure the system behaves consistently.",
  },
  {
    icon: "rocket",
    title: "Deploy",
    description:
      "Ship to production with a repeatable setup and monitoring, so launching is not a one-time risk but a routine step.",
  },
  {
    icon: "line-chart",
    title: "Improve",
    description:
      "Iterate based on feedback and usage, fixing what breaks and sharpening what users rely on every day.",
  },
];

/**
 * Technical challenges by project. Engida is framed around its hospitality
 * domain (hotels, rooms, reception, check-in/check-out).
 */
export const technicalChallenges: TechnicalChallenge[] = [
  {
    project: "Engida — Accommodation Management",
    items: [
      {
        problem:
          "Guests arriving at reception or booking ahead did not always specify a room type, so staff had to check availability room by room — slow and inconsistent.",
        solution:
          "Added one-tap room-type selection (Standard, Deluxe, Suite, Family Room) with quick chips in the search flow, so the system could surface matching available rooms on the spot.",
      },
      {
        problem:
          "Moving a guest from reservation to check-in to check-out is a multi-stage workflow — reserve, assign a room, check in, then check out — and keeping history across every transition was complex.",
        solution:
          "Modeled the flow as a per-day room state and stored every transition as immutable history, so no stay could be lost and no room double-booked.",
      },
      {
        problem:
          "Reception staff kept jumping between five different pages to manage one guest stay, which caused errors and slow work.",
        solution:
          "Built a single reception dashboard covering room status, guest registration and check-in/check-out actions, with a filterable rooms grid and modals for every action.",
      },
    ],
  },
  {
    project: "Beten Homes — Rent Management",
    items: [
      {
        problem:
          "One person can join more than one rent request, and joining with an impossible timeline would corrupt the process.",
        solution:
          "Hardened the join flow with date-based validation that checks the requested timeframe against already-joined requests before accepting the person.",
      },
      {
        problem:
          "Only the owner should approve a rental request, but tenants could not see the state of their request.",
        solution:
          "Introduced role-based visibility — the tenant always sees a clear Waiting for Approval status, while the owner gets the Approve / Reject action with a written timeline.",
      },
      {
        problem:
          "Owners needed to show real rooms, but plain text listings did not represent the property well.",
        solution:
          "Added real photo uploads, gallery cards and a summary view that renders the uploaded files, so both sides see the actual room before deciding.",
      },
    ],
  },
  {
    project: "Finance File Management",
    items: [
      {
        problem:
          "Staff were seeing files they had no business opening, because the boundary between roles was not enforced.",
        solution:
          "Restricted file visibility by role: each staff member only sees their own documents, admins see everything, and the interface shows a clear You can only view this page notice.",
      },
      {
        problem:
          "Legacy Excel and paper records had to become a reliable database without losing accuracy.",
        solution:
          "Seeded the system module by module, verifying imported records against the original source files before moving on.",
      },
      {
        problem:
          "Users got lost moving between several pages and services in one system.",
        solution:
          "Redesigned the navigation into a single clear structure organized around real workflows, cutting the number of steps to reach a feature.",
      },
    ],
  },
];