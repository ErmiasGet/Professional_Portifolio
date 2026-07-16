import { Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { SOCIAL_LINKS } from "@/constants";
import { GithubIcon, LinkedinIcon, XIcon, TelegramIcon } from "./social-icons";

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  twitter: <XIcon />,
  send: <TelegramIcon />,
};

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map((social) => (
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
          {iconMap[social.icon] || <Send className="h-4 w-4" />}
        </a>
      ))}
    </div>
  );
}
