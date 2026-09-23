"use client";

import { cn } from "@/lib/cn";

/**
 * Generative "smart development" backdrop: a neural constellation of nodes
 * wired by connections, with travelling data packets and slowly floating code
 * tokens. Everything is deterministic (seeded math) so SSR and hydration
 * produce identical markup, and motion uses declarative SMIL / CSS so there
 * is no client-side jitter.
 */

const WIDTH = 1600;
const HEIGHT = 1000;
const EDGE_DIST = 215;

function seeded(seed: number): number {
  let h = Math.imul((seed * 1000000) | 0, 0x2c1b3c6d);
  h = Math.imul(h ^ (h >>> 15), 0x297a2d39);
  h ^= h >>> 13;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

interface BgNode {
  x: number;
  y: number;
  r: number;
  hue: "primary" | "accent" | "neutral";
  delay: number;
  halo: boolean;
}

interface BgEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hue: "primary" | "accent";
  opacity: number;
}

const NODE_COUNT = 18;

const nodes: BgNode[] = Array.from({ length: NODE_COUNT }, (_, i) => {
  const s = (n: number) => seeded(i * 7.31 + n * 3.7);
  const hueRoll = s(4);
  return {
    x: 460 + s(1) * (WIDTH - 540),
    y: 46 + s(2) * (HEIGHT - 100),
    r: 2.4 + s(3) * 3.2,
    hue: hueRoll < 0.5 ? "primary" : hueRoll < 0.8 ? "accent" : "neutral",
    delay: s(5) * 2.6,
    halo: i % 2 === 0 && hueRoll < 0.55,
  };
});

const edges: BgEdge[] = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < EDGE_DIST) {
      edges.push({
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y,
        hue: nodes[i].hue === "accent" || nodes[j].hue === "accent" ? "accent" : "primary",
        opacity: (1 - dist / EDGE_DIST) * 0.42 + 0.06,
      });
    }
  }
}

const packets = edges
  .map((edge, k) => ({ ...edge, active: seeded(k + 900) > 0.8, dur: 2.6 + seeded(k + 901) * 2.6 }))
  .filter((edge) => edge.active)
  .slice(0, 6);

const TOKENS = [
  "const",
  "async",
  "</>",
  "=>",
  "{ }",
  "await",
  "next()",
  "import",
  "interface",
  "<SmartKit />",
  "deploy ✓",
  "v1.0.0",
];

interface TokenPos {
  left: string;
  top: string;
  delay: number;
  dur: number;
  opacity: number;
  accent: boolean;
}

const tokenPositions: TokenPos[] = TOKENS.map((_, i) => {
  const s = (n: number) => seeded(i * 17.7 + n * 5.1);
  return {
    left: `${(3 + s(1) * 90).toFixed(1)}%`,
    top: `${(5 + s(2) * 84).toFixed(1)}%`,
    delay: s(3) * 7,
    dur: 7 + s(4) * 7,
    opacity: 0.05 + s(5) * 0.08,
    accent: i % 3 === 2,
  };
});

const NODE_FILL: Record<BgNode["hue"], string> = {
  primary: "hsl(var(--primary) / 0.65)",
  accent: "hsl(var(--accent) / 0.6)",
  neutral: "hsl(var(--muted-foreground) / 0.5)",
};

const NODE_HALO: Record<BgNode["hue"], string> = {
  primary: "hsl(var(--primary) / 0.5)",
  accent: "hsl(var(--accent) / 0.45)",
  neutral: "hsl(var(--muted-foreground) / 0.35)",
};

export function SmartCodeBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        {edges.map((edge, i) => (
          <line
            key={`edge-${i}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={edge.hue === "accent" ? "hsl(var(--accent) / 0.28)" : "hsl(var(--primary) / 0.24)"}
            strokeWidth={1}
            opacity={edge.opacity}
          />
        ))}

        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {node.halo && (
              <circle cx={node.x} cy={node.y} r={node.r} fill="none" stroke={NODE_HALO[node.hue]} strokeWidth={1}>
                <animate
                  attributeName="r"
                  values={`${node.r};${node.r + 14}`}
                  dur="4.5s"
                  repeatCount="indefinite"
                  begin={`${node.delay}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.55;0"
                  dur="4.5s"
                  repeatCount="indefinite"
                  begin={`${node.delay}s`}
                />
              </circle>
            )}
            <circle cx={node.x} cy={node.y} r={node.r} fill={NODE_FILL[node.hue]}>
              <animate
                attributeName="opacity"
                values="0.35;0.95;0.35"
                dur="4s"
                repeatCount="indefinite"
                begin={`${node.delay}s`}
              />
            </circle>
          </g>
        ))}

        {packets.map((packet, i) => (
          <circle key={`packet-${i}`} r={2.5} fill="hsl(var(--accent) / 0.9)">
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.12;0.88;1"
              dur={`${packet.dur}s`}
              repeatCount="indefinite"
              begin={`${i * 0.45}s`}
            />
            <animateMotion
              dur={`${packet.dur}s`}
              repeatCount="indefinite"
              begin={`${i * 0.45}s`}
              path={`M ${packet.x1} ${packet.y1} L ${packet.x2} ${packet.y2}`}
            />
          </circle>
        ))}
      </svg>

      {TOKENS.map((token, i) => {
        const pos = tokenPositions[i];
        return (
          <span
            key={token}
            className="absolute select-none font-mono text-xs font-semibold sm:text-sm"
            style={{
              left: pos.left,
              top: pos.top,
              color: pos.accent ? "hsl(var(--accent) / 0.5)" : "hsl(var(--primary) / 0.45)",
              opacity: pos.opacity,
              animation: `float ${pos.dur}s ease-in-out ${pos.delay}s infinite`,
            }}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
}