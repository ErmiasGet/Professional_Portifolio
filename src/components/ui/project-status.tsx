import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/cn";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  production: "Production",
  live: "Live",
  "in-development": "Active Development",
  completed: "Completed",
  prototype: "Prototype",
  archived: "Archived",
};

const STATUS_VARIANTS: Record<
  ProjectStatus,
  "success" | "primary" | "warning" | "outline"
> = {
  production: "success",
  live: "primary",
  "in-development": "warning",
  completed: "success",
  prototype: "outline",
  archived: "outline",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  production: "bg-success",
  live: "bg-primary",
  "in-development": "bg-warning",
  completed: "bg-success",
  prototype: "bg-muted-foreground",
  archived: "bg-muted-foreground",
};

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANTS[status]} className={cn("gap-1.5", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </Badge>
  );
}