"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]":
              variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border":
              variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground":
              variant === "outline",
            "text-foreground hover:bg-secondary":
              variant === "ghost",
            "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30":
              variant === "accent",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90":
              variant === "destructive",
          },
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
