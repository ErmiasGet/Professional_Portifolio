import { cn } from "@/lib/cn";
import { AVAILABILITY_TONE_CLASSES, getAvailability } from "@/lib/availability";
import type { Availability } from "@/types";

interface AvailabilityBadgeProps {
  className?: string;
  availability?: Availability;
}

export function AvailabilityBadge({ className, availability }: AvailabilityBadgeProps) {
  const resolved = getAvailability(availability);
  const tone = AVAILABILITY_TONE_CLASSES[resolved.tone];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
        tone.border,
        tone.bg,
        tone.text,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            tone.dot
          )}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", tone.dot)} />
      </span>
      {resolved.label}
    </div>
  );
}