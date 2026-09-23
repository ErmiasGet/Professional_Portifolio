import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/blog";
import { SITE_CONFIG } from "@/content/site";

export const alt = "Ermias Getahun — Blog Article";
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
        color: "#CCFBF1",
        backgroundColor: "rgba(45, 212, 191, 0.14)",
        border: "1px solid rgba(45, 212, 191, 0.42)",
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
  const post = await getBlogPostBySlug(slug);

  const title = post?.title ?? "Blog Article";
  const category = post?.category ?? "Engineering";
  const description =
    post?.description ?? "A technical article by Ermias Getahun.";
  const readingTime = post?.readingTime ?? 6;
  const date = post?.publishedAt
    ? new Date(`${post.publishedAt}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Ongoing";

  const truncatedTitle =
    title.length > 54 ? `${title.slice(0, 54)}…` : title;
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
              "radial-gradient(52rem 30rem at 90% -10%, rgba(45, 212, 191, 0.32), transparent 62%), radial-gradient(46rem 28rem at -10% 112%, rgba(139, 92, 246, 0.34), transparent 60%)",
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
            background: "linear-gradient(90deg, #2DD4BF, #8B5CF6)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
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
                {SITE_CONFIG.name}
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
                Blog Article
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 20,
              fontWeight: 600,
              color: "#C7CEDB",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: "#2DD4BF",
                }}
              />
              {readingTime} min read
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: "#8B5CF6",
                }}
              />
              {date}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Pill label={category} />
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              maxWidth: 980,
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
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor: "rgba(139, 92, 246, 0.85)",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginLeft: 18,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#F8FAFC",
              }}
            >
              {post?.author ?? SITE_CONFIG.name}
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: "#94A3B8",
              }}
            >
              Full Stack Engineer · Next.js Specialist
            </div>
          </div>
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}