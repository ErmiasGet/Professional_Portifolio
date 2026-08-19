"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { SITE_CONFIG } from "@/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: <Mail className="h-5 w-5" />, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: <MapPin className="h-5 w-5" />, label: "Location", value: SITE_CONFIG.location, href: null },
  { icon: <Phone className="h-5 w-5" />, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
];

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          badge="Contact"
          title="Let&apos;s Work Together"
          subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal variant="fade-left" className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground">
                I&apos;m always excited to collaborate on innovative software projects, startup ideas,
                freelance opportunities, and full-time roles. Whether you need a modern website,
                enterprise application, SaaS platform, desktop application, or mobile application,
                I&apos;d love to help bring your ideas to life.
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

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="text-sm font-medium text-success">Available for Freelance, Remote &amp; Full-Time</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Typically respond within 24 hours</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" className="lg:col-span-3">
            <GlowCard className="p-6 sm:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-4 h-12 w-12 text-success" />
                  <h3 className="mb-2 text-lg font-semibold">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  <Textarea
                    label="Message"
                    placeholder="Tell me about your project..."
                    error={errors.message?.message}
                    {...register("message")}
                  />
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
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
