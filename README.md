<div align="center">

# Ermias Getahun — Professional Portfolio

A modern, responsive portfolio website showcasing my journey as a Software Engineer & Full Stack Developer.

**[Live Demo](https://ermias-getahun-portifolio.vercel.app)**

</div>

---

## Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

</div>

## Key Features

- **Dark / Light Mode** — Seamless theme switching with system preference detection
- **Smooth Animations** — Scroll reveal, stagger effects, and micro-interactions powered by Framer Motion
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, sitemap, and robots.txt
- **Project Case Studies** — Detailed breakdowns with problem, solution, architecture, and lessons learned
- **Blog System** — MDX-ready blog with syntax highlighting and GFM support
- **Contact Form** — Validated with React Hook Form and Zod
- **Command Palette** — Keyboard-navigable navigation (Ctrl+K)
- **Scroll Progress** — Visual indicator of page scroll position
- **Performance Focused** — Static generation, image optimization, and minimal bundle size
- **Admin Content Management** — Password-protected admin UI that edits site content through a PostgreSQL-backed data layer (with static-content fallback)

## Admin Content Management

The site ships with an admin system that makes the public portfolio content
editable without touching code:

- **Route:** `/admin/login` (sign in) → `/admin` (dashboard), `/admin/content`
  (projects, blog posts, testimonials, etc.), `/admin/settings` (branding,
  profile, SEO, social links, availability, navigation, footer and section copy).
- **Guarded by** HTTP basic auth credentials set via the `ADMIN_EMAIL` /
  `ADMIN_PASSWORD` environment variables, plus a same-origin check.
- **Data layer:** Public pages read from PostgreSQL through
  `src/lib/data/public.ts`. When the database is unreachable they fall back to
  the static content in `src/content/`, so the site always renders.
- **Revalidation:** Admin saves call `revalidatePath`, so edits appear on the
  public site immediately.

### Setup

1. **Create a PostgreSQL database** (Neon, Supabase, RDS, or local) and set
   `DATABASE_URL` in `.env.local` (see `.env.example`).
2. **Run the migrations and seed:**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

   `db:seed` copies the static `src/content/` data into the database and creates
   the initial admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
3. Start the app and open `/admin`. You can now edit projects, blog posts,
   testimonials, and all site settings from the UI.

> If `DATABASE_URL` is unset the admin UI hides, and the public site renders
> purely from `src/content/`.

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
git clone https://github.com/ErmiasGet/Professional_Portifolio.git
cd Professional_Portifolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key used to deliver contact-form emails |
| `CONTACT_TO_EMAIL` | Recipient of contact messages (falls back to `CONTACT_EMAIL`) |
| `CONTACT_FROM_EMAIL` | Sender address when your domain is verified in Resend |
| `CONTACT_EMAIL` | Legacy recipient key, used when `CONTACT_TO_EMAIL` is unset |
| `DATABASE_URL` | PostgreSQL connection string for the admin/content data layer |
| `ADMIN_EMAIL` | Admin email (basic-auth username) — used for the initial account |
| `ADMIN_PASSWORD` | Admin password (basic-auth password) — min 8 characters |
| `ADMIN_NAME` | Display name for the initial admin account |

### Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/           # Public pages: home, projects, blog
│   ├── admin/              # Admin dashboard UI
│   ├── api/admin/          # Admin content + settings routes (revalidate on save)
│   ├── api/contact/        # Contact form route (Resend, rate-limited)
│   ├── layout.tsx          # Root layout (navbar + footer)
│   ├── page.tsx            # Home page
│   └── globals.css         # Design tokens & global styles
├── content/                # Static site content (fallback + seed source)
│   ├── site.ts             # Site config, nav, social links, filters
│   ├── profile.ts          # Hero, biography, availability summary
│   ├── projects.ts         # Project case studies
│   ├── skills.ts           # Skill groups
│   ├── experience.ts       # Work experience + education
│   ├── services.ts         # Services
│   ├── certifications.ts   # Courses & certifications
│   ├── testimonials.ts     # Testimonials
│   ├── sections.ts         # Section headings + capability/approach copy
│   └── blog/               # Blog articles as MDX files (frontmatter-driven)
├── db/                     # PostgreSQL queries, schema, migrations, seed
├── components/
│   ├── admin/              # Admin UI (dashboard, forms, settings editor)
│   ├── layout/             # Navbar, footer, command palette, scroll progress
│   ├── sections/           # Hero, about, projects, skills, etc.
│   ├── shared/             # Logo, social links, availability badge
│   └── ui/                 # Reusable UI primitives
├── animations/             # Scroll reveal & stagger animations
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities (cn, blog, markdown, data, auth, validation)
└── types/                  # TypeScript interfaces
public/
├── favicon.svg             # Browser tab icon
├── og-image.svg            # Social sharing preview
├── images/                 # Project screenshots
└── projects/               # Project card illustrations
```

Content for the site is served from PostgreSQL (via `src/lib/data/public.ts`)
when the database is available; otherwise the plain TypeScript data and
frontmatter MDX files in `src/content/` are used as the fallback. That static
content also seeds a fresh database via `npm run db:seed`, so the admin UI and
the public site always agree.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:migrate` | Apply SQL migrations to the PostgreSQL database |
| `npm run db:seed` | Seed DB content from `src/content/` and create the admin account |

## Deployment

This project is optimized for **[Vercel](https://vercel.com)**:

1. Push to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

Or deploy manually:

```bash
npm run build
```

The `.next` output is ready for any Node.js hosting platform.

## Author

**Ermias Getahun** — Software Engineer | Full Stack Developer

- **Website:** [ermias-getahun-portifolio.vercel.app](https://ermias-getahun-portifolio.vercel.app)
- **GitHub:** [ErmiasGet](https://github.com/ErmiasGet)
- **LinkedIn:** [ermias-getahun](https://www.linkedin.com/in/ermias-getahun-919623279/)
- **Email:** abe.jere.jesus@gmail.com
- **Location:** Addis Ababa, Ethiopia

---

<div align="center">

Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

</div>
