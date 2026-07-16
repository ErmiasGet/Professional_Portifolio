import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  text?: string;
}

export function Logo({ className, size = 36, showText = false, text }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
        <path
          d="M15 19h19v5H20v4.5h11v5H20v5.5h14v5H15V19z"
          fill="white"
        />
        <path
          d="M38 19h10.5c3.5 0 6 2.5 6 6 0 2-.9 3.7-2.4 4.8L56 40h-6l-3-8.5h-1v9h-5V19h-3zm2.5 4.5v9h8c2.5 0 3.8-1.5 3.8-3.5 0-2.2-1.3-3.8-3.8-3.8h-8z"
          fill="white"
        />
      </svg>
      {showText && text && (
        <span className="text-lg font-bold">{text}</span>
      )}
    </div>
  );
}
