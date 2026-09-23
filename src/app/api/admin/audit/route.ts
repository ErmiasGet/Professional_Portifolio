import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth/auth";
import { listAuditLog } from "@/db/audit";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const requested = Number(url.searchParams.get("limit") ?? 100);
  const limit = Math.min(200, Math.max(1, Number.isFinite(requested) ? requested : 100));
  const rows = await listAuditLog(limit);

  return NextResponse.json({ rows: rows ?? [] });
}