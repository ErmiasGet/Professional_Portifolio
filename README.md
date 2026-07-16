<div align="center">

# Ermias Getahun — Professional Portfolio

A modern, responsive portfolio website showcasing my journey as a Software Engineer & Full Stack Developer.

**[Live Demo](https://ermias-getahun.vercel.app)**

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

### Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (navbar + footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Design tokens & global styles
│   ├── blog/               # Blog pages
│   └── projects/           # Project case study pages
├── components/
│   ├── layout/             # Navbar, footer, scroll progress
│   ├── sections/           # Hero, about, projects, skills, etc.
│   ├── shared/             # Logo, social links, availability badge
│   └── ui/                 # Reusable UI primitives
├── data/                   # Static data (projects, skills, blog, experience)
├── animations/             # Scroll reveal & stagger animations
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities (cn, theme store)
├── constants/              # Site config, nav links, social links
└── types/                  # TypeScript interfaces
public/
├── favicon.svg             # Browser tab icon
├── og-image.svg            # Social sharing preview
├── images/                 # Project screenshots
└── projects/               # Project card illustrations
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run typecheck` | Run TypeScript type checking |

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

- **Website:** [ermias-getahun.vercel.app](https://ermias-getahun.vercel.app)
- **GitHub:** [ErmiasGet](https://github.com/ErmiasGet)
- **LinkedIn:** [ermias-getahun](https://www.linkedin.com/in/ermias-getahun-919623279/)
- **Email:** abe.jere.jesus@gmail.com
- **Location:** Addis Ababa, Ethiopia

---

<div align="center">

Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

</div>
