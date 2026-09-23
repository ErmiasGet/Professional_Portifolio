import { Boxes, Server, Database, ArrowDown } from "lucide-react";
import type { ArchitectureDiagram as ArchitectureDiagramData } from "@/types";
import { cn } from "@/lib/cn";

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagramData;
  className?: string;
}

export function ArchitectureDiagram({ diagram, className }: ArchitectureDiagramProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6",
        className
      )}
    >
      <div className="flex flex-col items-stretch gap-3">
        <Node icon={<Boxes className="h-4 w-4" />} label="Frontend" value={diagram.frontend} />
        <Connector />
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold sm:justify-start">
            <Server className="h-4 w-4 text-primary" />
            <span>{diagram.api}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {diagram.apiModules.map((module) => (
              <div
                key={module}
                className="rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-medium text-muted-foreground"
              >
                {module}
              </div>
            ))}
          </div>
        </div>
        <Connector />
        <Node
          icon={<Database className="h-4 w-4" />}
          label="Database"
          value={diagram.database}
        />
      </div>
      {diagram.note && (
        <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {diagram.note}
        </p>
      )}
    </div>
  );
}

function Node({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center text-muted-foreground/50" aria-hidden="true">
      <ArrowDown className="h-4 w-4" />
    </div>
  );
}