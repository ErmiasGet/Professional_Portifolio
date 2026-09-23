"use client";

import { cn } from "@/lib/cn";

interface AnimatedBackgroundProps {
  className?: string;
  variant?: "gradient" | "dots" | "grid" | "mesh";
}

export function AnimatedBackground({ className, variant = "gradient" }: AnimatedBackgroundProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {variant === "gradient" && (
        <>
          <div className="absolute -top-1/4 right-[-15%] h-[34rem] w-[34rem] rounded-full bg-primary/[0.05] blur-3xl dark:bg-primary/[0.06]" />
          <div className="absolute -bottom-1/3 left-[-12%] h-[32rem] w-[32rem] rounded-full bg-accent/[0.05] blur-3xl dark:bg-accent/[0.05]" />
          <div className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-3xl dark:bg-primary/[0.03]" />
        </>
      )}
      {variant === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      {variant === "grid" && (
        <div className="absolute inset-0 grid-pattern opacity-50" />
      )}
      {variant === "mesh" && (
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
}
