import type { Project } from "@/types";

/**
 * Project case studies. Ordered by importance; featured ones surface in the
 * homepage grid. Update fields here to change what the site displays.
 *
 * Statuses: "production" | "live" | "in-development" | "completed" |
 *           "prototype" | "archived"
 */
export const projects: Project[] = [
  {
    slug: "engida",
    title: "Engida",
    tagline: "Multi-tenant accommodation management SaaS.",
    description:
      "A multi-tenant accommodation management SaaS designed to simplify hotel and guest-house operations.",
    longDescription:
      "Engida is a multi-tenant accommodation management SaaS for hospitality businesses. It gives each business an isolated workspace to manage hotels, rooms, reception and check-in/check-out, payments, subscriptions and reports, while the platform owner manages the tenants from a system-level dashboard. Access is controlled through role-based permissions for each type of user.",
    image: "/projects/Engida_showcase.png",
    featuredTechnologies: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
      "JWT Authentication",
      "RBAC",
      "Multi-Tenancy",
    ],
    highlights: ["Role-based dashboards for owners, managers and receptionists."],
    features: [
      "Multi-tenant architecture with isolated business workspaces",
      "Role-based access control (Super Admin, Business Owner, Receptionist)",
      "Hotel management",
      "Room management",
      "Reception and front-desk workflows",
      "Check-in / check-out",
      "Payment recording and tracking",
      "Subscription management per business",
      "Business dashboards and reporting",
      "Authentication and authorization",
    ],
    category: "saas",
    repoStatus: "private",
    status: "in-development",
    statusNote: "Active development — core tenant, hotel, room, reception and payment workflows implemented.",
    problemStatement:
      "Small and mid-sized accommodation businesses often manage bookings, rooms, guests and payments with paper records or disconnected spreadsheets. This makes day-to-day reception work slow, reporting difficult and data easy to lose. Existing property systems are usually built for a single business and cannot serve many independent businesses from one platform.",
    solution:
      "Engida is a multi-tenant SaaS where each accommodation business works inside its own isolated tenant. Businesses manage hotels, rooms, reception, check-in/check-out, payments and subscriptions, while the platform owner manages tenants from a higher-level view. Role-based access gives every user only the permissions their job requires.",
    myRole:
      "Full-Stack Developer — designed the multi-tenant data model and RBAC model, built the NestJS API and the Next.js frontend, and implemented the hotel, room, reception, payment and subscription workflows.",
    overview:
      "A multi-tenant SaaS that centralizes the daily operations of accommodation businesses rooms, reception, guests, payments and reporting in one platform while keeping each business's data separate.",
    targetUsers: [
      "Accommodation business owners and managers",
      "Hotel and guest-house reception staff",
      "Multi-property hospitality operators",
      "The SaaS platform owner / system administrator",
    ],
    goals: [
      "Give each business an isolated, secure workspace",
      "Replace manual and spreadsheet-based reception work",
      "Provide clear role-based permissions for staff",
      "Make payments, subscriptions and reporting easy to follow",
      "Build a foundation that can serve many businesses from one deployment",
    ],
    userRoles: [
      {
        name: "Super Admin / System Owner",
        responsibilities: [
          "Manage businesses (tenants) on the platform",
          "Monitor subscriptions and platform-level activity",
          "Oversee platform configuration and access",
        ],
      },
      {
        name: "Business Owner",
        responsibilities: [
          "Manage hotels, rooms and staff",
          "Review payment and revenue reports",
          "Manage the business subscription",
        ],
      },
      {
        name: "Receptionist",
        responsibilities: [
          "Handle reception and guest registration",
          "Perform check-in and check-out",
          "Record payments and room activity",
        ],
      },
    ],
    architecture:
      "Next.js frontend communicating with a NestJS REST API over authenticated requests. The API holds the business logic in dedicated modules, enforces role-based access, and persists data in PostgreSQL. Tenant context is resolved per request so every business only ever sees its own data.",
    architectureDiagram: {
      frontend: "Next.js",
      api: "NestJS API",
      apiModules: [
        "Authentication",
        "RBAC",
        "Hotel Management",
        "Room Management",
        "Reception",
        "Payments",
        "Subscription",
        "Reports",
      ],
      database: "PostgreSQL",
      note: "Multi-tenant request scoping and role-based guards sit between the API modules and the database.",
    },
    database:
      "PostgreSQL, designed around tenant ownership so records belong to a business and cannot be read across tenants. Core entities include businesses, users, roles, hotels, rooms, guests, stays and payments.",
    auth:
      "JWT-based authentication with role-based access control. Permissions are checked on the API for every protected action, and the frontend reflects the same roles so users only see what they are allowed to use.",
    technicalDecisions: [
      {
        title: "Multi-tenancy at the data layer",
        description:
          "Every business record carries its tenant identifier, and the API resolves the tenant from the authenticated user so one business can never access another business's data.",
      },
      {
        title: "RBAC instead of hard-coded roles in the UI",
        description:
          "Permissions are enforced on the backend, not only hidden in the interface, so access stays correct even if a user tries to call an endpoint directly.",
      },
      {
        title: "Module-based API structure",
        description:
          "The NestJS API is organized into feature modules (hotels, rooms, reception, payments, subscriptions, reports), which keeps business logic separated and easier to extend.",
      },
    ],
    challenges: [
      "Keeping tenant data strictly isolated as the number of modules grows",
      "Designing permissions that fit three very different types of users",
      "Modeling rooms, stays and payments so reporting stays accurate",
      "Keeping the frontend experience simple for non-technical reception staff",
    ],
    solutions: [
      "Tenant scoping enforced in the API layer so isolation is not left to each feature",
      "A central RBAC model shared by the API and reflected in the UI",
      "A consistent booking/stay/payment data model used by reception and reporting",
      "Focused, task-based screens for reception rather than a dense admin interface",
    ],
    screenshots: ["/projects/Engida_showcase.png"],
    responsive:
      "Built mobile-first with Tailwind CSS. Reception and dashboard screens are usable on phones and tablets, and the layout expands cleanly to desktop workstations.",
    impact:
      "A working multi-business platform that replaces manual accommodation operations with structured, permission-aware digital workflows.",
    lessonsLearned: [
      "Designing multi-tenant systems where isolation is a first-class concern",
      "Applying RBAC consistently across frontend and backend",
      "Structuring a NestJS API into maintainable feature modules",
      "Turning real reception workflows into simple, usable screens",
    ],
    tags: ["saas", "multi-tenant", "accommodation", "nestjs", "nextjs", "rbac"],
    duration: "Ongoing",
    role: "Full-Stack Developer",
    featured: true,
    caseStudyComplete: true,
  },
  {
    slug: "beten-homes-rent",
    title: "Beten Homes Rent",
    tagline: "Property Rental Management Platform",
    description:
      "Cross-platform property rental management system for landlords and property managers, with desktop and mobile apps over a shared backend.",
    longDescription:
      "Beten Homes Rent is a rental management platform for landlords and property managers. It consists of an Electron desktop application, a React Native (Expo) mobile application and a Node.js/Express REST API backed by PostgreSQL and Prisma. It handles properties, units, tenants, contracts, payments, overdue tracking, expenses, reports and notifications across all clients.",
    image: "/images/beten-homes-rent-dashboard.webp",
    featuredTechnologies: ["Electron", "React Native", "Node.js", "PostgreSQL"],
    technologies: [
      "Electron",
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "Firebase Cloud Messaging",
    ],
    features: [
      "House and unit management",
      "Tenant management",
      "Rental contract management",
      "Payment recording",
      "Automatic overdue payment detection",
      "Expense tracking",
      "Financial reports with PDF export",
      "Dashboard and analytics",
      "Role-based access control (Owner, Manager, Accountant)",
      "Secure authentication",
      "Push notifications",
      "Docker deployment",
    ],
    category: "business",
    github: "https://github.com/ErmiasGet/Beten_House_Rental_System.git",
    repoStatus: "public",
    status: "completed",
    statusNote: "Working system across desktop, mobile and API.",
    problemStatement:
      "Landlords and property managers need one place to manage properties, tenants, contracts, payments and expenses. Managing these across separate tools makes it easy to miss overdue payments and hard to produce reliable financial reports.",
    solution:
      "A shared backend REST API serves an Electron desktop app and a React Native mobile app, so property data, contracts and payments stay consistent everywhere. Overdue payments are detected automatically and both desktop and mobile users receive notifications.",
    myRole:
      "Full-Stack Developer — built the Express/Prisma API, the Electron desktop client and contributed to the React Native mobile client, including contracts, payments, overdue detection and reporting.",
    overview:
      "A multi-platform rental management product where a single backend powers desktop and mobile clients for day-to-day property operations and financial reporting.",
    targetUsers: [
      "Landlords managing rental properties",
      "Property managers and agents",
      "Accountants handling rent and expenses",
    ],
    goals: [
      "Centralize properties, tenants, contracts and payments",
      "Reduce missed and overdue rent payments",
      "Provide reliable financial reporting",
      "Support both desktop office work and mobile use",
    ],
    userRoles: [
      {
        name: "Owner",
        responsibilities: ["Full access to properties, contracts, finances and reports"],
      },
      {
        name: "Manager",
        responsibilities: ["Manage properties, tenants and contracts", "Record payments"],
      },
      {
        name: "Accountant",
        responsibilities: ["Track payments and expenses", "Generate financial reports"],
      },
    ],
    architecture:
      "A Node.js + Express REST API with Prisma ORM over PostgreSQL is the single source of truth. An Electron + React + TypeScript desktop application and a React Native + Expo mobile application consume the same API, so every client stays in sync.",
    architectureDiagram: {
      frontend: "Electron Desktop • React Native (Expo) Mobile",
      api: "Node.js + Express REST API",
      apiModules: [
        "Authentication",
        "Properties & Units",
        "Tenants",
        "Contracts",
        "Payments & Overdue",
        "Expenses",
        "Reports",
        "Notifications",
      ],
      database: "PostgreSQL (Prisma ORM)",
      note: "One shared API keeps desktop and mobile clients consistent. Docker is used for deployment and Firebase Cloud Messaging for notifications.",
    },
    database:
      "PostgreSQL accessed through Prisma ORM. Entities include properties, units, tenants, contracts, payments, expenses and users, with relations that keep contract and payment history tied to each tenant.",
    auth:
      "Authenticated API access with role-based permissions for Owner, Manager and Accountant so financial and management actions are limited to the right users.",
    technicalDecisions: [
      {
        title: "One API for every platform",
        description:
          "Desktop and mobile clients share a single backend, so business rules for contracts and payments are implemented once instead of once per platform.",
      },
      {
        title: "Prisma for type-safe data access",
        description:
          "Prisma keeps database queries typed and the schema explicit, which reduces runtime errors in payment and contract logic.",
      },
      {
        title: "Automatic overdue detection",
        description:
          "Overdue status is derived from contract and payment dates rather than tracked by hand, so reports stay accurate without manual updates.",
      },
    ],
    challenges: [
      "Keeping data consistent across desktop and mobile clients",
      "Implementing reliable automatic overdue payment detection",
      "Applying different permissions for Owner, Manager and Accountant",
      "Packaging and deploying the desktop application",
    ],
    solutions: [
      "A shared REST API as the single source of truth for all clients",
      "Date-driven overdue logic used by both notifications and reports",
      "Backend-enforced role permissions shared by every client",
      "Docker-based deployment with a repeatable build process",
    ],
    screenshots: ["/images/beten-homes-rent-dashboard.webp"],
    responsive:
      "The desktop application is designed for larger screens while the React Native client provides the same core workflows on phones for on-site use.",
    impact:
      "A complete rental management product covering properties, tenants, contracts, payments, expenses and reporting in one system.",
    lessonsLearned: [
      "Building cross-platform products over a shared API",
      "Electron desktop application architecture",
      "React Native and Expo for mobile delivery",
      "Type-safe database work with Prisma",
      "Containerized deployment with Docker",
    ],
    tags: ["property-management", "desktop", "mobile", "fullstack", "postgresql"],
    duration: "1+ months",
    role: "Full-Stack Developer",
    featured: true,
    caseStudyComplete: true,
  },
  {
    slug: "e-immunize-ethiopia",
    title: "E-Immunize Ethiopia",
    tagline: "Newborn Immunization Registration & Reminder Platform",
    description:
      "Digital newborn immunization registration and reminder platform.",
    longDescription:
      "E-Immunize Ethiopia is a newborn immunization registration and reminder platform for health facilities. Health workers register newborns, the system generates a vaccination schedule, and outstanding or missed doses are tracked and followed up with reminders. It is designed around the facility → district → regional → national hierarchy used by the health system, with dashboards, reporting and audit trails.",
    image: "/projects/e-immunize.png",
    featuredTechnologies: ["React", "Node.js", "MongoDB", "TypeScript"],
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
    ],
    highlights: ["Reminders and coverage reporting across the health-system hierarchy."],
    features: [
      "Newborn registration by health workers",
      "Automatic vaccination schedule generation",
      "UCI (Universal Child Immunization) tracking and search",
      "QR code support for child records",
      "Health worker workflows",
      "Facility → district → regional → national hierarchy",
      "Missed-dose monitoring and follow-up",
      "SMS and voice reminders",
      "Role-based dashboards and reporting",
      "Offline synchronization concept for weak connectivity",
      "Audit trail of key actions",
    ],
    category: "healthcare",
    repoStatus: "private",
    status: "in-development",
    statusNote: "Registration, schedule generation, search and reporting workflows implemented.",
    problemStatement:
      "Immunization records in many facilities are still paper-based, which makes it hard to know which newborns are due for a vaccine, who has missed a dose, and how coverage looks above the facility level. Lost cards and manual registers also make follow-up difficult, especially where connectivity is unreliable.",
    solution:
      "A health-worker-focused platform that registers newborns, generates each child's vaccination schedule and tracks doses over time. Records and reports roll up through the facility, district, regional and national levels, while QR codes, search and reminders make it easier to find and follow up with children who miss doses.",
    myRole:
      "UI/UX and Backend contributor — designed and implemented health worker screens, the registration and schedule flows, and backend APIs for records, search, dose tracking and reporting.",
    overview:
      "A real-world healthcare information system that digitizes newborn immunization registration, scheduling and follow-up for health facilities and the levels above them.",
    targetUsers: [
      "Health workers at health posts and facilities",
      "Facility and district immunization coordinators",
      "Regional and national health program staff",
    ],
    goals: [
      "Register newborns digitally instead of on paper",
      "Generate accurate vaccination schedules automatically",
      "Detect and follow up on missed doses",
      "Give each level of the health system useful reporting",
      "Keep working where connectivity is limited",
    ],
    userRoles: [
      {
        name: "Health Worker",
        responsibilities: [
          "Register newborns",
          "View and update vaccination schedules",
          "Record administered and missed doses",
        ],
      },
      {
        name: "Facility / District Coordinator",
        responsibilities: [
          "Monitor immunization coverage",
          "Review missed-dose lists",
          "Generate reports for their area",
        ],
      },
      {
        name: "Regional / National Staff",
        responsibilities: ["Review aggregated dashboards and coverage reporting"],
      },
    ],
    architecture:
      "A React + Vite + TypeScript frontend uses a Node.js + Express REST API with MongoDB. Records are organized by facility and roll up through the district, regional and national hierarchy for reporting. Offline behavior is handled conceptually by allowing local capture and later synchronization.",
    architectureDiagram: {
      frontend: "React + Vite + TypeScript",
      api: "Node.js + Express REST API",
      apiModules: [
        "Authentication",
        "Newborn Registration",
        "Vaccination Schedule",
        "UCI / Search",
        "QR & Records",
        "Reminders (SMS / Voice)",
        "Reporting & Dashboards",
        "Audit",
      ],
      database: "MongoDB",
      note: "Designed around the facility → district → regional → national hierarchy, with an offline-first sync concept for areas with weak connectivity.",
    },
    database:
      "MongoDB, chosen for flexible record shapes across facilities and levels. Data is organized so records can be filtered and rolled up by facility, district, region and national level.",
    auth:
      "Authenticated, role-aware access where health workers capture records and coordinators view reporting for their level of the hierarchy.",
    technicalDecisions: [
      {
        title: "Schedule generation from birth date",
        description:
          "Rather than storing a fixed list per child, schedules are derived from the child's birth date and the immunization schedule so due and overdue doses are always up to date.",
      },
      {
        title: "Records modeled around the health hierarchy",
        description:
          "Facility, district, regional and national levels are first-class in the data model, which makes reporting at each level straightforward.",
      },
      {
        title: "Offline-first direction",
        description:
          "Because connectivity can be unreliable, the design allows records to be captured locally and synchronized when a connection is available.",
      },
    ],
    challenges: [
      "Modeling immunization scheduling correctly across age groups",
      "Supporting reporting at several levels of the health hierarchy",
      "Handling limited connectivity",
      "Making data entry fast and clear for busy health workers",
      "Keeping an auditable record of important actions",
    ],
    solutions: [
      "Date-driven schedule generation instead of manual due-date tracking",
      "Hierarchy-aware data and reporting queries",
      "An offline capture and synchronization approach",
      "Task-focused UI/UX built around health worker workflows",
      "Audit records for key changes",
    ],
    screenshots: [],
    responsive:
      "Built with a responsive React interface so health workers can register and review records on the devices available to them, including tablets and phones.",
    impact:
      "A serious healthcare information system that turns newborn immunization from paper tracking into structured, searchable and reportable digital records.",
    lessonsLearned: [
      "Designing healthcare workflows for non-technical users",
      "Deriving schedules from data instead of hard-coding them",
      "Modeling multi-level organizational reporting",
      "Planning for offline use and later synchronization",
    ],
    tags: ["healthcare", "immunization", "react", "nodejs", "mongodb", "public-health"],
    duration: "Ongoing",
    role: "UI/UX & Backend Contributor",
    featured: true,
    caseStudyComplete: true,
  },
  {
    slug: "explore-sheka",
    title: "Explore Sheka",
    tagline: "Regional Tourism Discovery Platform",
    description:
      "Tourism platform connecting visitors with hotels, guides, agencies, transportation, attractions and restaurants in Sheka.",
    longDescription:
      "A tourism platform designed to showcase and connect visitors with the Sheka region's tourism offerings, including hotels, travel agencies, guides, transportation, attractions, restaurants and destinations.",
    image: "/images/explore-sheka-dashboard.webp",
    featuredTechnologies: ["React", "Node.js", "Express.js", "MongoDB"],
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Hotel listings",
      "Travel agency directory",
      "Tour guide profiles",
      "Transportation listings",
      "Attraction showcases",
      "Restaurant directory",
      "Search and filtering",
    ],
    category: "web",
    github:
      "https://github.com/ErmiasGet/Explore-Sheka-Discover-Nature-Culture-and-Sustainable-Tourism.git",
    repoStatus: "public",
    status: "completed",
    problemStatement:
      "The Sheka region has strong tourism potential but no centralized digital platform connecting visitors with local services.",
    solution:
      "A discovery platform built with React, Node.js/Express and MongoDB that brings local tourism services together in one searchable place.",
    myRole: "Full-Stack Developer — built the React frontend, Express API and MongoDB data models.",
    overview: "A tourism discovery platform for the Sheka region.",
    targetUsers: ["Tourists and visitors", "Local tourism service providers"],
    goals: ["Centralize local tourism information", "Make discovery simple", "Support local providers"],
    architecture:
      "React SPA with a Node.js + Express REST API and MongoDB for flexible content types.",
    architectureDiagram: {
      frontend: "React",
      api: "Node.js + Express REST API",
      apiModules: ["Hotels", "Agencies", "Guides", "Transport", "Attractions", "Restaurants", "Search"],
      database: "MongoDB",
    },
    database: "MongoDB for flexible tourism listing content.",
    auth: "Authenticated access for managing listings.",
    challenges: [
      "Aggregating diverse tourism data",
      "Building an intuitive discovery experience",
      "Designing flexible content layouts",
    ],
    solutions: [
      "A flexible MongoDB content model",
      "Search and filtering across categories",
      "Responsive layouts for varied content",
    ],
    screenshots: ["/images/explore-sheka-dashboard.webp"],
    responsive: "Responsive discovery interface for mobile and desktop visitors.",
    impact: "A single platform showcasing the region's tourism offerings.",
    lessonsLearned: ["MERN full-stack development", "MongoDB schema design", "Discovery UX"],
    tags: ["tourism", "mern", "web"],
    duration: "4 months",
    role: "Full-Stack Developer",
    featured: false,
    caseStudyComplete: false,
  },
  {
    slug: "diagnoconnect",
    title: "DiagnoConnect",
    tagline: "Healthcare Coordination SaaS (Concept / Prototype)",
    description:
      "Multi-tenant healthcare coordination platform concept connecting hospitals, clinics, diagnostic centers and their staff into one ecosystem.",
    longDescription:
      "DiagnoConnect is a healthcare coordination SaaS concept. It aims to connect hospitals, clinics, diagnostic centers, doctors and reception staff into a single multi-tenant ecosystem for patient registration, diagnostic coordination and institutional dashboards. It explores how multi-tenancy and role-based workflows apply to healthcare organizations.",
    image: "/projects/diagnoconnect.svg",
    featuredTechnologies: ["React", "Spring Boot", "PostgreSQL", "RBAC"],
    technologies: ["React", "Spring Boot", "PostgreSQL", "Multi-Tenancy", "RBAC"],
    features: [
      "Multi-tenant architecture for healthcare institutions",
      "Patient registration",
      "Doctor workflows",
      "Diagnostic coordination between institutions",
      "Reception and front-desk workflows",
      "Appointment scheduling",
      "Institutional dashboards",
      "Role-based access",
    ],
    category: "healthcare",
    github: "https://github.com/ErmiasGet/Diagnoconnect.git",
    repoStatus: "public",
    status: "prototype",
    statusNote: "Concept / Prototype — architecture and core workflows explored, not a production system.",
    problemStatement:
      "Hospitals, clinics and diagnostic centers often operate separately, so patients, referrals and diagnostic requests move between institutions with little coordination. Staff at each institution also need very different levels of access to the same system.",
    solution:
      "A multi-tenant healthcare SaaS concept where each institution has its own space, patients are registered centrally, doctors and reception staff follow role-specific workflows, and diagnostic coordination happens between connected institutions.",
    myRole: "Full-Stack Developer — explored the multi-tenant architecture and role-based healthcare workflows.",
    overview:
      "A concept prototype exploring multi-tenant healthcare coordination across institutions with role-based workflows.",
    targetUsers: [
      "Hospitals, clinics and diagnostic centers",
      "Doctors and diagnostic staff",
      "Reception and administrative staff",
    ],
    goals: [
      "Connect institutions in one platform",
      "Support registration and diagnostic coordination",
      "Give each role the right level of access",
      "Provide institutional dashboards",
    ],
    userRoles: [
      {
        name: "Institution Admin",
        responsibilities: ["Manage the institution's users and settings"],
      },
      {
        name: "Doctor",
        responsibilities: ["Review patients and request or review diagnostics"],
      },
      {
        name: "Receptionist",
        responsibilities: ["Register patients and manage appointments"],
      },
    ],
    architecture:
      "React frontend with a Spring Boot REST API and PostgreSQL, structured around tenants (institutions) with role-based access for staff.",
    architectureDiagram: {
      frontend: "React",
      api: "Spring Boot API",
      apiModules: [
        "Authentication",
        "RBAC",
        "Institutions",
        "Patients",
        "Doctors",
        "Diagnostics",
        "Appointments",
        "Dashboards",
      ],
      database: "PostgreSQL",
      note: "Concept architecture — multi-tenant coordination between healthcare institutions.",
    },
    database:
      "PostgreSQL with institution-scoped records so each tenant's patients and activity remain separate.",
    auth: "Role-based access for institutional admins, doctors and reception staff.",
    technicalDecisions: [
      {
        title: "Institution as the tenant boundary",
        description:
          "Each institution is modeled as a tenant so data and users stay scoped to the organization they belong to.",
      },
      {
        title: "Role-specific workspaces",
        description:
          "Doctors and reception staff get purpose-built views instead of one shared admin panel.",
      },
    ],
    challenges: [
      "Designing multi-tenant isolation for healthcare organizations",
      "Coordinating workflows between separate institutions",
      "Giving each role the correct permissions",
    ],
    solutions: [
      "Tenant-scoped data modeling",
      "Role-based workflows for each staff type",
      "Institution-level dashboards for oversight",
    ],
    screenshots: [],
    responsive: "Responsive React interface intended for both desk and mobile use by staff.",
    impact:
      "A design exploration of how multi-tenant SaaS and RBAC can be applied to healthcare coordination.",
    lessonsLearned: [
      "Multi-tenant SaaS architecture",
      "Role-based systems in healthcare",
      "Spring Boot API design",
    ],
    tags: ["healthcare", "saas", "multi-tenant", "concept"],
    duration: "Concept",
    role: "Full-Stack Developer",
    featured: true,
    caseStudyComplete: true,
  },
  {
    slug: "finance-file-management",
    title: "Finance File Management System",
    tagline: "University Finance Document Management (Internship)",
    description:
      "Enterprise document management system built during my internship to digitize finance office document workflows.",
    longDescription:
      "A document management system built during my internship at the Wolkite University ICT Directorate to improve the finance office's document workflow. It replaces paper-based filing with digital document management, search, access control and an Amharic-friendly interface, deployed on a local server.",
    image: "/projects/finance-files.svg",
    featuredTechnologies: ["React", "Spring Boot", "PostgreSQL", "REST APIs"],
    technologies: ["React", "Spring Boot", "PostgreSQL", "QR Code", "REST APIs"],
    features: [
      "Document upload and management",
      "File categorization and search",
      "Access control and permissions",
      "QR code support for documents",
      "Amharic interface",
      "Reporting and audit trails",
      "Local server deployment",
    ],
    category: "business",
    github: "https://github.com/ErmiasGet/finance-file-management.git",
    repoStatus: "public",
    status: "completed",
    problemStatement:
      "The finance office managed documents on paper, which made filing, retrieval and reporting slow and difficult to control.",
    solution:
      "A digital document management system with structured categories, search, access control, QR support and an interface accessible in Amharic, deployed on a local server.",
    myRole:
      "Software Developer Intern — gathered requirements with finance staff, implemented the React interface and Spring Boot API, and supported testing and deployment.",
    overview:
      "An internship project that digitized finance office document handling, from filing and search to access control and reporting.",
    targetUsers: ["Finance office staff", "Department administrators"],
    goals: [
      "Replace paper filing with structured digital records",
      "Make documents easy to find",
      "Control who can access sensitive documents",
      "Support Amharic-speaking users",
    ],
    userRoles: [
      { name: "Finance Staff", responsibilities: ["Upload, categorize and retrieve documents"] },
      { name: "Administrator", responsibilities: ["Manage users, permissions and reporting"] },
    ],
    architecture:
      "React frontend with a Spring Boot REST API and PostgreSQL, with QR code support and local server deployment.",
    architectureDiagram: {
      frontend: "React",
      api: "Spring Boot API",
      apiModules: ["Authentication", "Documents", "Categories", "Search", "Access Control", "QR", "Reporting"],
      database: "PostgreSQL",
      note: "Deployed on a local server for the finance office.",
    },
    database: "PostgreSQL storing document metadata, categories, users and audit information.",
    auth: "Authenticated access with role-based document permissions.",
    challenges: [
      "Understanding real finance office workflows through requirement gathering",
      "Designing an interface for non-technical staff",
      "Controlling access to sensitive financial documents",
    ],
    solutions: [
      "Requirement sessions with finance staff before implementation",
      "A simple, task-oriented interface with an Amharic option",
      "Role-based document permissions and audit trails",
    ],
    screenshots: [],
    responsive: "Desk-oriented layout for office use, built with a responsive React interface.",
    impact:
      "Digitized finance document management and reduced reliance on paper filing.",
    lessonsLearned: [
      "Enterprise software in a real organizational context",
      "Requirement gathering and stakeholder collaboration",
      "Building software for non-technical users",
    ],
    tags: ["internship", "document-management", "spring-boot", "enterprise"],
    duration: "Internship",
    role: "Software Developer Intern",
    featured: false,
    caseStudyComplete: false,
  },
  {
    slug: "attendance-management",
    title: "Attendance Management System",
    tagline: "Biometric Attendance on ERPNext / Frappe",
    description:
      "Attendance management system built on ERPNext / Frappe with fingerprint biometric integration.",
    longDescription:
      "An attendance management system built on the ERPNext / Frappe platform that integrates fingerprint biometric hardware for automated attendance capture and reporting.",
    image: "/projects/attendance.svg",
    featuredTechnologies: ["ERPNext", "Frappe", "Python", "MariaDB"],
    technologies: ["ERPNext", "Frappe", "Python", "MariaDB", "Biometric SDK"],
    features: [
      "Fingerprint biometric integration",
      "Automated attendance capture",
      "Attendance reports",
      "Employee management",
      "Leave management",
      "Admin dashboard",
    ],
    category: "business",
    github: "https://github.com/ErmiasGet/Attendance-Management-System.git",
    repoStatus: "public",
    status: "completed",
    problemStatement:
      "Manual attendance tracking was slow, error-prone and made reliable reporting difficult.",
    solution:
      "An attendance system built on ERPNext / Frappe with fingerprint biometric integration for accurate, automated attendance capture and reporting.",
    myRole: "Software Developer Intern — worked on the Frappe/ERPNext customization and biometric integration.",
    overview: "An enterprise attendance solution using ERPNext / Frappe and biometric fingerprint hardware.",
    targetUsers: ["HR and administrative staff", "Employees"],
    goals: ["Automate attendance capture", "Improve reporting accuracy", "Reduce manual entry"],
    architecture:
      "ERPNext / Frappe application with Python customization, MariaDB storage and biometric hardware integration.",
    architectureDiagram: {
      frontend: "ERPNext / Frappe UI",
      api: "Frappe Application Logic",
      apiModules: ["Employees", "Attendance", "Biometric Integration", "Leave", "Reports"],
      database: "MariaDB",
      note: "Fingerprint hardware integrated through its SDK.",
    },
    database: "MariaDB through the Frappe framework.",
    auth: "Role-based access built into ERPNext / Frappe.",
    challenges: [
      "Integrating fingerprint hardware with the software",
      "Capturing attendance reliably in real time",
      "Working within Frappe's conventions",
    ],
    solutions: [
      "Biometric SDK integration into Frappe",
      "Automated capture replacing manual entry",
      "Custom reports for management oversight",
    ],
    screenshots: [],
    responsive: "Admin screens follow ERPNext's responsive web interface.",
    impact: "Automated attendance tracking with biometric verification and reporting.",
    lessonsLearned: [
      "Frappe / ERPNext customization",
      "Hardware and software integration",
      "Enterprise attendance workflows",
    ],
    tags: ["attendance", "biometric", "frappe", "erpnext"],
    duration: "Internship",
    role: "Software Developer Intern",
    featured: false,
    caseStudyComplete: false,
  },
  {
    slug: "graduate-gallery",
    title: "Graduate Gallery",
    tagline: "Graduate Showcase Platform",
    description:
      "Platform for graduating students to showcase profiles, achievements and project galleries.",
    longDescription:
      "A platform where graduating students build profiles and showcase their academic achievements and projects through galleries.",
    image: "/projects/graduate-gallery.svg",
    featuredTechnologies: ["React", "Node.js", "MongoDB"],
    technologies: ["React", "Node.js", "MongoDB"],
    features: [
      "Student profiles",
      "Achievement display",
      "Project and media galleries",
      "Search and discovery",
      "Responsive design",
    ],
    category: "web",
    github: "https://github.com/ErmiasGet/GC_GalleryArchive.git",
    repoStatus: "public",
    status: "completed",
    problemStatement:
      "Graduating students needed a shared place to present their profiles, achievements and projects.",
    solution:
      "A React, Node.js and MongoDB platform where students create profiles and showcase work in galleries.",
    myRole: "Full-Stack Developer — implemented the frontend, API and data models.",
    overview: "A showcase platform for graduating students.",
    targetUsers: ["Graduating students", "Academic staff", "Recruiters"],
    goals: ["Let students present their work", "Make profiles easy to browse", "Support media galleries"],
    architecture: "React SPA with a Node.js + Express API and MongoDB.",
    architectureDiagram: {
      frontend: "React",
      api: "Node.js + Express REST API",
      apiModules: ["Profiles", "Achievements", "Galleries", "Search"],
      database: "MongoDB",
    },
    database: "MongoDB for profiles and gallery content.",
    auth: "Authenticated profile management.",
    challenges: ["Flexible profile templates", "Media-rich galleries", "Responsive layout"],
    solutions: ["Flexible MongoDB schemas", "A reusable gallery component", "Mobile-first responsive design"],
    screenshots: [],
    responsive: "Responsive gallery and profile layouts.",
    impact: "Gave graduating students a professional platform to present their work.",
    lessonsLearned: ["User-generated content", "MongoDB flexible schemas", "Media-rich UI"],
    tags: ["education", "showcase", "web"],
    duration: "<1 month",
    role: "Full-Stack Developer",
    featured: false,
    caseStudyComplete: false,
  },
  {
    slug: "mini-social-media",
    title: "Mini Social Media Platform",
    tagline: "Full-Stack Social Networking App",
    description:
      "Social networking application with authentication, posts, likes, comments, messaging and user profiles.",
    longDescription:
      "A social networking application built to understand core social features and architecture: authentication, posts, likes, comments, real-time messaging and profiles.",
    image: "/projects/social-media.svg",
    featuredTechnologies: ["React", "Node.js", "Express.js", "MongoDB"],
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "User authentication and profiles",
      "Post creation",
      "Likes and comments",
      "Real-time messaging",
      "News feed",
      "User search",
      "Notifications",
    ],
    category: "web",
    github: "https://github.com/ErmiasGet/CodeAlpha_miniSocialMediaApp.git",
    repoStatus: "public",
    status: "completed",
    problemStatement:
      "Building a social platform from scratch to understand the architecture behind social features.",
    solution:
      "A full-stack React, Express and MongoDB application implementing posts, likes, comments and real-time messaging.",
    myRole: "Full-Stack Developer — built the frontend, API and real-time messaging.",
    overview: "A social networking prototype covering the core social feature set.",
    targetUsers: ["End users of a social platform"],
    goals: ["Implement core social features", "Support real-time messaging", "Practice full-stack architecture"],
    architecture: "React SPA with a Node.js + Express REST API with WebSocket support and MongoDB.",
    architectureDiagram: {
      frontend: "React",
      api: "Node.js + Express + WebSockets",
      apiModules: ["Auth", "Posts", "Likes & Comments", "Messaging", "Feed", "Notifications"],
      database: "MongoDB",
    },
    database: "MongoDB for social data.",
    auth: "JWT-based authentication.",
    challenges: ["Real-time messaging", "Feed design", "Managing social state"],
    solutions: ["WebSocket messaging", "A feed query strategy", "Clear client state handling"],
    screenshots: [],
    responsive: "Responsive social interface.",
    impact: "A working social networking prototype.",
    lessonsLearned: ["WebSocket communication", "Social data modeling", "Full-stack feature development"],
    tags: ["social", "real-time", "mern"],
    duration: "3 months",
    role: "Full-Stack Developer",
    featured: false,
    caseStudyComplete: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectCategories(): string[] {
  return ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
}