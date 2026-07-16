"use client";

import { Award, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { certifications } from "@/data/experience";
import { formatDate } from "@/utils";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          badge="Certifications"
          title="Professional Learning &amp; Development"
          subtitle="Continuous skill development across modern technologies and engineering practices."
        />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {certifications.map((cert) => (
            <StaggerItem key={cert.id}>
              <GlowCard className="group p-5 h-full">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    <Award className="h-5 w-5" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <h4 className="mb-1 font-semibold">{cert.name}</h4>
                <p className="text-sm text-primary">{cert.issuer}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Issued {formatDate(cert.date)}
                  {cert.expiryDate && ` - Expires ${formatDate(cert.expiryDate)}`}
                </p>
                {cert.credentialId && (
                  <p className="mt-1 text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                )}
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
