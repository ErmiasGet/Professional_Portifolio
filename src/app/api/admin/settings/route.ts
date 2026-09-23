import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminFromRequest, isSameOrigin } from "@/lib/auth/auth";
import { getAllSettings, setSettings } from "@/db/settings";
import { writeAuditLog } from "@/db/audit";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getAllSettings();
  return NextResponse.json({ settings: settings ?? {} });
}

export async function PUT(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.json();
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    body = raw as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Only allow known setting keys.
  const allowed = new Set([
    "site",
    "profile",
    "seo",
    "social",
    "availability",
    "resume",
    "nav",
    "footer",
    "sections",
    "visibility",
  ]);
  const entries: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (allowed.has(key)) entries[key] = value;
  }
  if (Object.keys(entries).length === 0) {
    return NextResponse.json({ error: "No valid settings provided." }, { status: 400 });
  }

  const ok = await setSettings(entries);
  if (!ok) {
    return NextResponse.json({ error: "Could not save settings." }, { status: 500 });
  }

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "settings.update",
    entityType: "site_settings",
    meta: { keys: Object.keys(entries) },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");

  return NextResponse.json({ success: true });
}