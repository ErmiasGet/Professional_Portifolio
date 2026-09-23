"use client";

import { BookOpen, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/animations/stagger-group";
import { certifications } from "@/content/certifications";
import { SECTIONS } from "@/content/sections";
import { formatDate } from "@/utils";
import type { Certification } from "@/types";

interface CertificationsProps {
  certifications?: Certification[];
  sectionsContent?: typeof SECTIONS;
  index?: string;
}

export function Certifications({
  certifications: items = certifications,
  sectionsContent = SECTIONS,
  index = "09",
}: CertificationsProps) {
  return (
    <section id="learning" className="relative py-20 sm:py-14 lg:py-14 bg-secondary/30">
      <Container>
        <SectionHeading
          badge={sectionsContent.certifications.badge}
          index={index}
          title={sectionsContent.certifications.title}
          subtitle={sectionsContent.certifications.subtitle}
        />
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {items.map((cert) => (
            <StaggerItem key={cert.id}>
              <div className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-colors duration-300 hover:border-primary/25">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex h-9 items-center gap-2 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <h4 className="mb-1 font-semibold">{cert.name}</h4>
                <p className="text-sm text-primary">{cert.issuer}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(cert.issuedAt)}
                  {cert.credentialId && ` · ID: ${cert.credentialId}`}
                </p>
                <div className="mt-3">
                  <Badge variant="outline" className="text-[10px]">
                    {cert.kind}
                  </Badge>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}