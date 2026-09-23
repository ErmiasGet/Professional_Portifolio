"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MessageCircle, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { SocialLinks } from "@/components/shared/social-links";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SmartCodeBackground } from "@/components/ui/smart-code-background";
import { HeroVisual } from "./hero-visual";
import { PROFILE } from "@/content/profile";
import { SOCIAL_LINKS } from "@/content/site";
import type { Availability } from "@/types";

interface HeroProps {
  profile?: typeof PROFILE;
  socials?: typeof SOCIAL_LINKS;
  availability?: Availability;
}

export function Hero({
  profile = PROFILE,
  socials = SOCIAL_LINKS,
  availability = profile.availability,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const credentials = profile.credentials;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.9 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.9 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const visualX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const visualY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <AnimatedBackground variant="gradient" />
        <SmartCodeBackground />
        <AnimatedBackground variant="grid" />
      </motion.div>

      <Container className="relative z-10 pt-28 pb-16 sm:pt-32 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <AvailabilityBadge availability={availability} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground/75 sm:text-sm"
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent align-middle"
                aria-hidden="true"
              />
              Hello, I&apos;m{" "}
              <span className="font-semibold normal-case tracking-normal text-foreground">{profile.name}</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl xl:text-[3.5rem] xl:leading-[1.06]"
            >
              {profile.headline.before}
              <span className="gradient-text">{profile.headline.highlight}</span>
              {profile.headline.after}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
            >
              {profile.heroSubtitle}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start"
              aria-label="Credentials"
            >
              {credentials.map((credential, i) => (
                <li
                  key={credential}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  {i === 0 && <GraduationCap className="h-3.5 w-3.5 text-primary" />}
                  {credential}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <Link href="#projects">
                <Button size="lg" className="group w-full sm:w-auto">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </a>
              <Link href="#contact" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Let&apos;s Work Together
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-10"
            >
              <SocialLinks className="justify-center lg:justify-start" links={socials} />
            </motion.div>
          </div>

          <motion.div
            style={{
              x: visualX,
              y: visualY,
              rotateX,
              rotateY,
              transformPerspective: 900,
            }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroVisual />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}