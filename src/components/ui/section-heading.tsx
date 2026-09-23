import { ScrollReveal } from "@/animations/scroll-reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  /** Editorial index shown before the label, e.g. "01 —". */
  index?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  index,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("mb-16", className)}>
      <div className={cn("space-y-5", centered && "text-center")}>
        {badge && (
          <div className={cn("flex items-center gap-3", centered && "justify-center")}>
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50"
              aria-hidden="true"
            />
            <span className="eyebrow text-primary">
              {index && <span className="mr-2 font-semibold text-primary/60">{index}</span>}
              {badge}
            </span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50"
              aria-hidden="true"
            />
          </div>
        )}
        <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {(title ?? "").split(" ").map((word, i) => {
            const words = (title ?? "").split(" ");
            const isAccent = i === words.length - 1;
            return (
              <span key={i}>
                {isAccent ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "text-balance text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl",
              centered && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}