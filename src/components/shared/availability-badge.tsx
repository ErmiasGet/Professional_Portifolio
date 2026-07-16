import { cn } from "@/lib/cn";

interface AvailabilityBadgeProps {
  className?: string;
}

export function AvailabilityBadge({ className }: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-4 py-1.5 text-sm font-medium text-success",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      Available for Freelance, Remote &amp; Full-Time
    </div>
  );
}
