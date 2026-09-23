import { SITE_CONFIG } from "@/content/site";
import type { Availability, AvailabilityStatus } from "@/types";

export type AvailabilityTone = "success" | "warning" | "muted";

export interface AvailabilityInfo {
  status: AvailabilityStatus;
  label: string;
  types: string[];
  responseTime: string;
  tone: AvailabilityTone;
}

export function getAvailability(
  availability: Availability = SITE_CONFIG.availability
): AvailabilityInfo {
  const label =
    availability.label ??
    (availability.status === "available"
      ? `Available for ${availability.types.join(" • ")}`
      : availability.status === "busy"
        ? "Busy with current projects"
        : "Not currently taking on new work");

  const tone: AvailabilityTone =
    availability.status === "available"
      ? "success"
      : availability.status === "busy"
        ? "warning"
        : "muted";

  return {
    status: availability.status,
    label,
    types: availability.types,
    responseTime: availability.responseTime,
    tone,
  };
}

export const AVAILABILITY_TONE_CLASSES: Record<
  AvailabilityTone,
  { dot: string; text: string; border: string; bg: string }
> = {
  success: {
    dot: "bg-success",
    text: "text-success",
    border: "border-success/20",
    bg: "bg-success/10",
  },
  warning: {
    dot: "bg-warning",
    text: "text-warning",
    border: "border-warning/20",
    bg: "bg-warning/10",
  },
  muted: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    border: "border-border",
    bg: "bg-muted/10",
  },
};