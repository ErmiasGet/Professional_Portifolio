import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline" | "success" | "warning" | "destructive";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-secondary text-secondary-foreground": variant === "default" || variant === "secondary",
          "bg-primary/10 text-primary dark:bg-primary/20": variant === "primary",
          "bg-accent/10 text-accent dark:bg-accent/20": variant === "accent",
          "border border-border text-muted-foreground": variant === "outline",
          "bg-success/10 text-success": variant === "success",
          "bg-warning/10 text-warning": variant === "warning",
          "bg-destructive/10 text-destructive": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, type BadgeProps };
