import { Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { SOCIAL_LINKS } from "@/content/site";
import { SOCIAL_ICONS } from "./social-icons";

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  links?: typeof SOCIAL_LINKS;
}

export function SocialLinks({ className, size = "md", links = SOCIAL_LINKS }: SocialLinksProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon] ?? Send;
        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/20",
              sizeClasses[size]
            )}
            aria-label={social.platform}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
