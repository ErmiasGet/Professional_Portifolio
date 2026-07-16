import { ScrollReveal } from "@/animations/scroll-reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("mb-16", className)}>
      <div className={cn("space-y-4", centered && "text-center")}>
        {badge && (
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title.split(" ").map((word, i) => {
            const isAccent = word === title.split(" ").slice(-1)[0];
            return (
              <span key={i}>
                {isAccent ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
                {i < title.split(" ").length - 1 && " "}
              </span>
            );
          })}
        </h2>
        {subtitle && (
          <p className={cn("text-muted-foreground text-lg max-w-2xl", centered && "mx-auto")}>
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
