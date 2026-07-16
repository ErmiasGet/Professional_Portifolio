import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withContainer?: boolean;
}

export function Section({ children, className, id, withContainer = true }: SectionProps) {
  const content = withContainer ? <Container>{children}</Container> : children;
  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-32", className)}>
      {content}
    </section>
  );
}
