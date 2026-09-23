"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { apiFetch, errorMessage } from "@/lib/admin/api";
import { showToast } from "@/lib/admin/toast-store";
import { cn } from "@/lib/cn";

interface SettingsData {
  site: Record<string, unknown>;
  profile: Record<string, unknown>;
  seo: Record<string, unknown>;
  social: Record<string, unknown>;
  availability: Record<string, unknown>;
  resume: Record<string, unknown>;
  nav: Record<string, unknown>;
  footer: Record<string, unknown>;
  sections: Record<string, unknown>;
  visibility: Record<string, boolean>;
}

type TabKey =
  | "site"
  | "profile"
  | "seo"
  | "social"
  | "availability"
  | "resume"
  | "nav"
  | "footer"
  | "sections"
  | "visibility";

const TABS: { key: TabKey; label: string }[] = [
  { key: "site", label: "Site" },
  { key: "profile", label: "Profile" },
  { key: "seo", label: "SEO" },
  { key: "social", label: "Social" },
  { key: "availability", label: "Availability" },
  { key: "resume", label: "Resume" },
  { key: "nav", label: "Navigation" },
  { key: "footer", label: "Footer" },
  { key: "sections", label: "Sections" },
  { key: "visibility", label: "Visibility" },
];

export function SettingsEditor() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("site");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ settings: SettingsData }>("/api/admin/settings")
      .then((res) => {
        if (cancelled) return;
        setData(res.settings);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(errorMessage(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}
      </p>
    );
  }

  if (!data) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-secondary/50" />
        ))}
      </div>
    );
  }

  const save = async () => {
    setBusy(true);
    try {
      await apiFetch("/api/admin/settings", { method: "PUT", body: JSON.stringify(data) });
      showToast("Settings saved.");
    } catch (err) {
      showToast(errorMessage(err), "error");
    } finally {
      setBusy(false);
    }
  };

  const setObjectValue = (tab: TabKey, key: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [tab]: { ...(prev[tab] as Record<string, unknown>), [key]: value },
      };
    });
  };

  const setArrayValue = (tab: TabKey, entries: { key: string; value: unknown }[]) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...(prev[tab] as Record<string, unknown>) };
      for (const { key, value } of entries) next[key] = value;
      return { ...prev, [tab]: next };
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Branding, profile, SEO, social links, availability, navigation, footer, section copy and
            section visibility.
          </p>
        </div>
        <button
          onClick={save}
          disabled={busy}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-light disabled:opacity-60"
        >
          {busy ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save changes
        </button>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <ActivePanel
          tab={activeTab}
          value={data[activeTab] as Record<string, unknown>}
          onChange={(key, value) => setObjectValue(activeTab, key, value)}
          onArrayChange={(entries) => setArrayValue(activeTab, entries)}
          onNestedChange={(section, key, value) => {
            setData((prev) => {
              if (!prev) return prev;
              const tabObj = { ...(prev[activeTab] as Record<string, unknown>) };
              const sectionObj = {
                ...((tabObj[section] as Record<string, unknown>) ?? {}),
                [key]: value,
              };
              return { ...prev, [activeTab]: { ...tabObj, [section]: sectionObj } };
            });
          }}
        />
      </div>
    </div>
  );
}

function ActivePanel({
  tab,
  value,
  onChange,
  onArrayChange,
  onNestedChange,
}: {
  tab: TabKey;
  value: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onArrayChange: (entries: { key: string; value: unknown }[]) => void;
  onNestedChange: (section: string, key: string, value: unknown) => void;
}) {
  switch (tab) {
    case "site":
      return <SitePanel value={value} onChange={onChange} />;
    case "profile":
      return <ProfilePanel value={value} onChange={onChange} onNestedChange={onNestedChange} />;
    case "seo":
      return <SeoPanel value={value} onChange={onChange} />;
    case "social":
      return <SocialPanel value={value} onChange={onChange} />;
    case "availability":
      return <AvailabilityPanel value={value} onChange={onChange} />;
    case "resume":
      return <ResumePanel value={value} onChange={onChange} />;
    case "nav":
      return <NavPanel value={value} onArrayChange={onArrayChange} />;
    case "footer":
      return <FooterPanel value={value} onArrayChange={onArrayChange} />;
    case "sections":
      return <SectionsPanel value={value} onArrayChange={onArrayChange} />;
    case "visibility":
      return <VisibilityPanel value={value} onChange={onChange} />;
    default:
      return null;
  }
}

function TextField({
  label,
  value,
  onChange,
  inputType = "text",
  placeholder,
  textarea,
}: {
  label: string;
  value: unknown;
  onChange: (v: string) => void;
  inputType?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {textarea ? (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm leading-relaxed transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      ) : (
        <input
          type={inputType}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      )}
    </label>
  );
}

function TagsField({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: unknown;
  onChange: (v: unknown) => void;
  textarea?: boolean;
}) {
  const asString = Array.isArray(value) ? (value as string[]).join(", ") : String(value ?? "");
  const toArray = (text: string) =>
    text.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {textarea ? (
        <textarea
          value={asString}
          onChange={(e) => onChange(toArray(e.target.value))}
          rows={3}
          placeholder="Comma separated"
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm leading-relaxed transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      ) : (
        <input
          type="text"
          value={asString}
          onChange={(e) => onChange(toArray(e.target.value))}
          placeholder="Comma separated"
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      )}
    </label>
  );
}

function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="col-span-full text-sm font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  );
}

function SitePanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Branding
      </h2>
      <PanelGrid>
        <TextField label="Name" value={value.name} onChange={(v) => onChange("name", v)} />
        <TextField label="First name" value={value.firstName} onChange={(v) => onChange("firstName", v)} />
        <TextField label="Role / headline" value={value.role} onChange={(v) => onChange("role", v)} />
        <TextField label="Tagline" value={value.tagline} onChange={(v) => onChange("tagline", v)} />
      </PanelGrid>
      <SectionTitle>Contact</SectionTitle>
      <PanelGrid>
        <TextField label="Email" value={value.email} onChange={(v) => onChange("email", v)} />
        <TextField label="Phone" value={value.phone} onChange={(v) => onChange("phone", v)} />
        <TextField label="Location" value={value.location} onChange={(v) => onChange("location", v)} />
        <TextField label="Open Graph image path" value={value.image} onChange={(v) => onChange("image", v)} />
      </PanelGrid>
      <SectionTitle>SEO metadata</SectionTitle>
      <PanelGrid>
        <TextField label="Description" value={value.description} onChange={(v) => onChange("description", v)} textarea />
        <TagsField label="Keywords" value={value.keywords} onChange={(v) => onChange("keywords", v)} />
      </PanelGrid>
    </div>
  );
}

function ProfilePanel({
  value,
  onChange,
  onNestedChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
  onNestedChange: (section: string, key: string, value: unknown) => void;
}) {
  const headline = (value.headline as Record<string, unknown>) ?? {};
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Hero
      </h2>
      <PanelGrid>
        <TextField label="Intro" value={value.heroIntro} onChange={(v) => onChange("heroIntro", v)} />
        <TextField label="Hero subtitle" value={value.heroSubtitle} onChange={(v) => onChange("heroSubtitle", v)} textarea />
        <TextField label="Headline before" value={headline.before} onChange={(v) => onNestedChange("headline", "before", v)} />
        <TextField label="Headline highlight" value={headline.highlight} onChange={(v) => onNestedChange("headline", "highlight", v)} />
        <TextField label="Headline after" value={headline.after} onChange={(v) => onNestedChange("headline", "after", v)} />
        <TextField label="Current role" value={value.currentRole} onChange={(v) => onChange("currentRole", v)} />
      </PanelGrid>
      <SectionTitle>About</SectionTitle>
      <PanelGrid>
        <TagsField label="Credentials" value={value.credentials} onChange={(v) => onChange("credentials", v)} />
        <TagsField label="Focus areas" value={value.focusAreas} onChange={(v) => onChange("focusAreas", v)} />
        <TagsField label="Open to" value={value.openTo} onChange={(v) => onChange("openTo", v)} />
        <TagsField label="Career focus" value={value.careerFocus} onChange={(v) => onChange("careerFocus", v)} />
        <TextField
          label="Skills summary"
          value={value.skillsSummary}
          onChange={(v) => onChange("skillsSummary", v)}
          textarea
        />
        <TagsField label="Biography" value={value.biography} onChange={(v) => onChange("biography", v)} textarea />
      </PanelGrid>
    </div>
  );
}

function SeoPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Search engines
      </h2>
      <PanelGrid>
        <TextField label="Title" value={value.title} onChange={(v) => onChange("title", v)} />
        <TextField label="Description" value={value.description} onChange={(v) => onChange("description", v)} textarea />
        <TextField label="Image path" value={value.image} onChange={(v) => onChange("image", v)} />
        <TagsField label="Keywords" value={value.keywords} onChange={(v) => onChange("keywords", v)} />
      </PanelGrid>
    </div>
  );
}

function SocialPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Social profiles
      </h2>
      <PanelGrid>
        {(["github", "linkedin", "telegram", "whatsapp", "twitter"] as const).map((key) => (
          <TextField key={key} label={capitalize(key)} value={value[key]} onChange={(v) => onChange(key, v)} />
        ))}
      </PanelGrid>
    </div>
  );
}

function AvailabilityPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Availability badge
      </h2>
      <PanelGrid>
        <label className="space-y-1.5">
          <span className="text-sm font-medium">Status</span>
          <select
            value={(value.status as string) ?? "available"}
            onChange={(e) => onChange("status", e.target.value)}
            className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
        <TextField label="Custom label" value={value.label} onChange={(v) => onChange("label", v)} />
        <TagsField label="Types" value={value.types} onChange={(v) => onChange("types", v)} />
        <TextField
          label="Response time"
          value={value.responseTime}
          onChange={(v) => onChange("responseTime", v)}
        />
      </PanelGrid>
    </div>
  );
}

function ResumePanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (k: string, v: unknown) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Resume / CV
      </h2>
      <PanelGrid>
        <TextField
          label="Resume URL"
          value={(value as Record<string, unknown>).url}
          onChange={(v) => onChange("url", v)}
          placeholder="https://…/resume.pdf"
        />
      </PanelGrid>
      <p className="text-xs text-muted-foreground">
        Sitemap and public footer use this link for the &ldquo;View Resume&rdquo; action.
      </p>
    </div>
  );
}

function NavPanel({
  value,
  onArrayChange,
}: {
  value: Record<string, unknown>;
  onArrayChange: (entries: { key: string; value: unknown }[]) => void;
}) {
  const links = (value.links as { label: string; href: string }[]) ?? [];
  const update = (index: number, field: "label" | "href", next: string) => {
    const nextLinks = links.map((link, i) => (i === index ? { ...link, [field]: next } : link));
    onArrayChange([{ key: "links", value: nextLinks }]);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Navigation links
      </h2>
      <p className="text-xs text-muted-foreground">
        These appear in the public navbar. Keep hrefs as anchor (#id) or absolute paths (/projects).
      </p>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={`${index}-${link.label}`} className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-background p-4 sm:grid-cols-2">
            <TextField label="Label" value={link.label} onChange={(v) => update(index, "label", v)} />
            <TextField label="Link" value={link.href} onChange={(v) => update(index, "href", v)} />
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-muted-foreground">Nav links come from <code className="rounded bg-secondary px-1">src/content/site.ts</code> by default.</p>
        )}
      </div>
    </div>
  );
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

interface CredibilityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const CREDIBILITY_ICONS = ["graduation-cap", "layers", "cloud", "monitor"];

function FooterPanel({
  value,
  onArrayChange,
}: {
  value: Record<string, unknown>;
  onArrayChange: (entries: { key: string; value: unknown }[]) => void;
}) {
  const items = (value.credibility as CredibilityItem[]) ?? [];
  const update = (index: number, field: keyof CredibilityItem, next: string) => {
    const nextItems = items.map((item, i) =>
      i === index ? { ...item, [field]: next } : item
    );
    onArrayChange([{ key: "credibility", value: nextItems }]);
  };
  const remove = (index: number) => {
    const nextItems = items.filter((_, i) => i !== index);
    onArrayChange([{ key: "credibility", value: nextItems }]);
  };
  const add = () => {
    onArrayChange([
      {
        key: "credibility",
        value: [
          ...items,
          { id: String(Date.now()), title: "", description: "", icon: "layers" },
        ],
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Footer credibility strip
      </h2>
      <p className="text-xs text-muted-foreground">
        These items appear as the strip right below the homepage hero.
      </p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-xl border border-border bg-background p-4"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_160px]">
              <TextField label="Title" value={item.title} onChange={(v) => update(index, "title", v)} />
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Icon</span>
                <select
                  value={item.icon}
                  onChange={(e) => update(index, "icon", e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  {CREDIBILITY_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <TextField
              label="Description"
              value={item.description}
              onChange={(v) => update(index, "description", v)}
              textarea
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-xs font-medium text-destructive transition-colors hover:text-destructive/80"
            >
              Remove item
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No credibility items yet. Add one below.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
      >
        Add credibility item
      </button>
    </div>
  );
}

const SECTION_KEYS = [
  "hero",
  "credibility",
  "projects",
  "services",
  "whatICanBuild",
  "about",
  "experience",
  "skills",
  "engineeringApproach",
  "technicalChallenges",
  "certifications",
  "testimonials",
  "blog",
  "contact",
] as const;

function SectionsPanel({
  value,
  onArrayChange,
}: {
  value: Record<string, unknown>;
  onArrayChange: (entries: { key: string; value: unknown }[]) => void;
}) {
  const sectionCopy = (key: string) =>
    (value[key] as { badge: string; title: string; subtitle: string }) ?? {
      badge: "",
      title: "",
      subtitle: "",
    };
  const updateCopy = (key: string, field: "badge" | "title" | "subtitle", next: string) => {
    const current = (value[key] as Record<string, unknown>) ?? {};
    onArrayChange([{ key, value: { ...current, [field]: next } }]);
  };
  const projectFilters = (value.projectFilters as Record<string, string>) ?? {};
  const updateFilter = (key: string, next: string) => {
    onArrayChange([{ key: "projectFilters", value: { ...projectFilters, [key]: next } }]);
  };
  const contactPurposes = (value.contactPurposes as string[]) ?? [];
  const updatePurposes = (next: unknown) => {
    onArrayChange([{ key: "contactPurposes", value: Array.isArray(next) ? next : [] }]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Section headings &amp; copy
      </h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {SECTION_KEYS.map((key) => (
          <div key={key} className="rounded-xl border border-border bg-background p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {key}
            </p>
            <div className="space-y-3">
              <TextField
                label="Badge"
                value={sectionCopy(key).badge}
                onChange={(v) => updateCopy(key, "badge", v)}
              />
              <TextField
                label="Title"
                value={sectionCopy(key).title}
                onChange={(v) => updateCopy(key, "title", v)}
              />
              <TextField
                label="Subtitle"
                value={sectionCopy(key).subtitle}
                onChange={(v) => updateCopy(key, "subtitle", v)}
                textarea
              />
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Project filter labels</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Object.entries(projectFilters).map(([key, label]) => (
          <TextField key={key} label={key} value={label} onChange={(v) => updateFilter(key, v)} />
        ))}
      </div>

      <SectionTitle>Contact purposes</SectionTitle>
      <TagsField
        label="Contact purposes (comma separated)"
        value={contactPurposes}
        onChange={(v) => updatePurposes(v)}
      />
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          checked ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

const VISIBILITY_LABELS: Record<string, string> = {
  hero: "Hero",
  credibility: "Credibility strip",
  projects: "Projects",
  services: "Services",
  whatICanBuild: "What I Can Build",
  about: "About",
  experience: "Experience",
  skills: "Skills",
  engineeringApproach: "Engineering Approach",
  technicalChallenges: "Technical Challenges",
  certifications: "Certifications",
  testimonials: "Testimonials",
  blog: "Blog preview",
  contact: "Contact",
};

function VisibilityPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  const map = value ?? {};
  const enabled = (key: string) => map[key] !== false;
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Section visibility
      </h2>
      <p className="text-sm text-muted-foreground">
        Toggle a section off to hide it from the homepage. Content stays in the database, so it can
        be turned back on any time.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTION_KEYS.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3"
          >
            <span className="text-sm font-medium">{VISIBILITY_LABELS[key] ?? key}</span>
            <ToggleSwitch checked={enabled(key)} onChange={(v) => onChange(key, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}