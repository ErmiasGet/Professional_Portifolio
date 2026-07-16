import { cn } from "@/lib/cn";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div className={cn("relative h-px w-full overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
