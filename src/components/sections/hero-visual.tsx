import { Terminal, Circle, GitBranch } from "lucide-react";

const tree = [
  { text: "Next.js", indent: 0, accent: true, branch: "app" },
  { text: "NestJS API", indent: 1, accent: true, branch: "api" },
  { text: "Authentication", indent: 2, branch: "leaf" },
  { text: "RBAC", indent: 2, branch: "leaf" },
  { text: "Hotel & Room Management", indent: 2, branch: "leaf" },
  { text: "Reception & Check-in", indent: 2, branch: "leaf" },
  { text: "Payments & Subscription", indent: 2, branch: "leaf" },
  { text: "Reports", indent: 2, branch: "leaf" },
  { text: "PostgreSQL", indent: 1, accent: true, branch: "api" },
];

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg" aria-hidden="true">
      <div
        className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl"
      />

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card/90 shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/30 px-4 py-3">
          <Circle className="h-2.5 w-2.5 fill-destructive/70 text-destructive/70" />
          <Circle className="h-2.5 w-2.5 fill-warning/70 text-warning/70" />
          <Circle className="h-2.5 w-2.5 fill-success/70 text-success/70" />
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-mono">engida/architecture</span>
          </div>
          <span className="hidden rounded-md border border-border/70 bg-card/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            TypeScript
          </span>
        </div>

        <div className="space-y-1.5 p-5 font-mono text-xs leading-relaxed sm:text-[13px]">
          {tree.map((line) => {
            return (
              <div
                key={line.text}
                className="flex items-center gap-2"
                style={{ paddingLeft: `${line.indent * 1.5}rem` }}
              >
                {line.indent > 0 && (
                  <span
                    className={
                      line.indent === 2
                        ? "select-none text-muted-foreground/40"
                        : "select-none text-primary/50"
                    }
                  >
                    {line.indent === 2 ? "├─" : "└─"}
                  </span>
                )}
                <span
                  className={
                    line.accent ? "font-semibold text-primary" : "text-muted-foreground"
                  }
                >
                  {line.text}
                </span>
                {line.indent === 2 && (
                  <span className="ml-1 h-3.5 w-2 animate-pulse bg-primary/70" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 bg-secondary/25 px-4 py-2.5 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            build passing
          </span>
          <span className="flex items-center gap-1 text-muted-foreground/70">
            <GitBranch className="h-3 w-3" />
            main · saas
          </span>
        </div>
      </div>
    </div>
  );
}