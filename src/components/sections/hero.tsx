"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Code2,
  Palette,
  Database,
  Server,
  Smartphone,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { SocialLinks } from "@/components/shared/social-links";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SITE_CONFIG } from "@/constants";

const floatingIcons = [
  { Icon: Code2, x: "10%", y: "20%", delay: 0 },
  { Icon: Palette, x: "85%", y: "15%", delay: 0.5 },
  { Icon: Database, x: "75%", y: "70%", delay: 1 },
  { Icon: Server, x: "15%", y: "75%", delay: 1.5 },
  { Icon: Smartphone, x: "90%", y: "45%", delay: 2 },
  { Icon: Globe, x: "5%", y: "45%", delay: 0.8 },
];

const roles = ["Software Engineer", "Full Stack Developer", "Software Solution Designer"];
const roleColors = ["text-primary", "text-accent", "text-primary-light"];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground variant="gradient" />
      <AnimatedBackground variant="grid" />

      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10 dark:text-primary/5"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: delay + 1, duration: 0.6 },
            scale: { delay: delay + 1, duration: 0.6 },
            y: { delay: delay + 1, duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
        </motion.div>
      ))}

      <Container className="relative z-10 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <AvailabilityBadge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-lg text-muted-foreground sm:text-xl">
              Hi, I&apos;m
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">{SITE_CONFIG.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
            {roles.map((role, i) => (
              <span
                key={role}
                className={`text-lg font-medium sm:text-xl ${roleColors[i]}`}
              >
                {role}
                {i < roles.length - 1 && (
                  <span className="mx-2 text-muted-foreground">/</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl"
          >
            I design and build scalable, modern, and user-centered software solutions that
            solve real-world problems through clean architecture, efficient development practices,
            and exceptional user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="#contact">
              <Button size="lg" className="group">
                Hire Me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#projects">
              <Button variant="outline" size="lg">
                View Projects
              </Button>
            </Link>
            <a href={SITE_CONFIG.resume} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-12"
          >
            <SocialLinks size="lg" className="justify-center" />
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-6 w-5 rounded-full border-2 border-muted-foreground/30 pt-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
