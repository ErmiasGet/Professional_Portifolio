import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/content/projects";
import { PROJECT_FILTERS } from "@/content/site";

export const alt = "Ermias Getahun — Project Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function BrandMark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#8B5CF6",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 800,
        letterSpacing: 1,
      }}
    >
      EG
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: "#E8E6FF",
        backgroundColor: "rgba(139, 92, 246, 0.16)",
        border: "1px solid rgba(139, 92, 246, 0.45)",
      }}
    >
      {label}
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project ? project.title : "Project Case Study";
  const category = project
    ? (PROJECT_FILTERS[project.category] ?? project.category)
    : "Engineering";
  const description = project
    ? project.description
    : "Deep dive into a system Ermias Getahun designed and built.";
  const tech = project
    ? (project.featuredTechnologies ?? project.technologies).slice(0, 4)
    : ["React", "Next.js", "TypeScript", "Node.js"];

  const truncatedTitle =
    title.length > 44 ? `${title.slice(0, 44)}…` : title;
  const truncatedDescription =
    description.length > 150
      ? `${description.slice(0, 150)}…`
      : description;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: FONT,
          backgroundColor: "#0B1220",
          color: "#F8FAFC",
          padding: "72px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              "radial-gradient(52rem 30rem at 88% -10%, rgba(139, 92, 246, 0.38), transparent 62%), radial-gradient(44rem 26rem at -10% 112%, rgba(45, 212, 191, 0.3), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.35,
            backgroundImage:
              "radial-gradient(rgba(148, 163, 184, 0.22) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            zIndex: 1,
            background: "linear-gradient(90deg, #8B5CF6, #2DD4BF)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 1 }}>
          <BrandMark />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Ermias Getahun
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#94A3B8",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
              }}
            >
              Project Case Study
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
          <Pill label={category} />
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              maxWidth: 960,
            }}
          >
            {truncatedTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.45,
              color: "#C7CEDB",
              maxWidth: 900,
            }}
          >
            {truncatedDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {tech.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#CBD5E1",
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(148, 163, 184, 0.28)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              fontWeight: 700,
              color: "#2DD4BF",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#2DD4BF",
              }}
            />
            Case Study
          </div>
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}