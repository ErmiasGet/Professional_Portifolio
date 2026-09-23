"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/animations/scroll-reveal";
import { SITE_CONFIG, CONTACT_PURPOSES } from "@/content/site";
import { services as staticServices } from "@/content/services";
import { SECTIONS } from "@/content/sections";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import { AVAILABILITY_TONE_CLASSES, getAvailability } from "@/lib/availability";
import { cn } from "@/lib/cn";
import type { Service, Availability } from "@/types";

function ContactForm({
  purposes,
  services,
}: {
  purposes: readonly string[];
  services: Service[];
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const servicePurposes = services.map((service) => service.title);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const rawService = searchParams.get("service");
    const rawPurpose = searchParams.get("purpose");

    let resolved = "";
    if ((purposes as readonly string[]).includes(rawPurpose ?? "")) {
      resolved = rawPurpose ?? "";
    } else if (rawService) {
      const match = services.find((service) => service.id === rawService);
      if (match) resolved = match.title;
    }

    if (resolved) {
      setValue("purpose", resolved, { shouldValidate: true });
    }

    if (rawPurpose || rawService) {
      router.replace("/#contact", { scroll: false });
    }
  }, [searchParams, router, setValue, purposes, services]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let message = "Something went wrong. Please try again later.";
        try {
          const body = (await res.json()) as { error?: string };
          if (body.error) message = body.error;
        } catch {
          // fall back to the default message
        }
        throw new Error(message);
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlowCard className="p-6 sm:p-8">
      {isSubmitted ? (
        <div className="flex min-h-[26rem] flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="mb-4 h-12 w-12 text-success" />
          <h3 className="mb-2 text-lg font-semibold">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-1 w-1 overflow-hidden">
            <label htmlFor="website">
              Leave this field empty
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Name"
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Input
            label="Subject"
            placeholder="Project discussion"
            error={errors.subject?.message}
            {...register("subject")}
          />
          <div className="space-y-2">
            <label htmlFor="purpose" className="text-sm font-medium text-foreground">
              What&apos;s this about? <span className="text-muted-foreground">(optional)</span>
            </label>
            <select
              id="purpose"
              className="flex h-11 w-full cursor-pointer rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground shadow-[var(--s-shadow-xs)] transition-colors hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
              {...register("purpose")}
            >
              <option value="" disabled>
                Select a purpose
              </option>
              <optgroup label="General">
                {purposes.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Services">
                {servicePurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <Textarea
            label="Message"
            placeholder="Tell me about your project..."
            error={errors.message?.message}
            {...register("message")}
          />
          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {submitError}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </GlowCard>
  );
}

function ContactFormFallback() {
  return (
    <GlowCard className="p-6 sm:p-8">
      <div className="flex min-h-[26rem] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    </GlowCard>
  );
}

interface ContactProps {
  site?: typeof SITE_CONFIG;
  purposes?: readonly string[];
  services?: Service[];
  availability?: Availability;
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Contact({
  site = SITE_CONFIG,
  purposes = CONTACT_PURPOSES,
  services = staticServices,
  availability,
  sectionsContent = SECTIONS,
  index = "12",
}: ContactProps) {
  const availabilityInfo = getAvailability(availability);
  const availabilityTone = AVAILABILITY_TONE_CLASSES[availabilityInfo.tone];

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: site.location, href: null },
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: site.phone, href: `tel:${site.phone}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-14 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl dark:bg-primary/[0.05]"
      />
      <Container className="relative">
        <SectionHeading
          badge={sectionsContent.contact.badge}
          index={index}
          title={sectionsContent.contact.title}
          subtitle={sectionsContent.contact.subtitle}
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal variant="fade-left" className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground">
                I&apos;m open to full-time roles, remote work, freelance projects, and collaborations.
                Whether you need a business system, SaaS platform, or a modern web application, tell
                me what you&apos;re building and I&apos;ll get back to you.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-sm font-medium hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={cn(
                        "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                        availabilityTone.dot
                      )}
                    />
                    <span
                      className={cn(
                        "relative inline-flex h-2 w-2 rounded-full",
                        availabilityTone.dot
                      )}
                    />
                  </span>
                  <span className={cn("text-sm font-medium", availabilityTone.text)}>
                    {availabilityInfo.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Typically respond within {availabilityInfo.responseTime.toLowerCase()}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" className="lg:col-span-3">
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm purposes={purposes} services={services} />
            </Suspense>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}