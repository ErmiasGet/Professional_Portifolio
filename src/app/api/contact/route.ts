import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import { createMessage } from "@/db/messages";
import { isDatabaseReachable } from "@/db/client";
import { ensureSchema } from "@/db/migrate";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const submittedAt: Record<string, number[]> = {};

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submittedAt[ip] ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  submittedAt[ip] = recent;
  return recent.length >= RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim() || process.env.CONTACT_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Contact route: missing env variables.", {
      hasResendKey: Boolean(apiKey),
      hasContactEmail: Boolean(toEmail),
    });
    return NextResponse.json(
      { error: "Server is not configured to send messages." },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: ContactFormData;
  try {
    const raw = await request.json();
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      return NextResponse.json(
        { error: first?.message ?? "Please check the form and try again." },
        { status: 400 }
      );
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field: bots fill this hidden field. Silently accept so bots
  // think the submission succeeded, but never send anything.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: body.email,
      subject: `Portfolio Contact: ${body.subject}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px;">
          <h2 style="margin-bottom: 16px;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
          ${body.purpose ? `<p><strong>Purpose:</strong> ${escapeHtml(body.purpose)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${escapeHtml(body.message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ error: "Failed to send the message." }, { status: 500 });
    }

    submittedAt[ip] = [...(submittedAt[ip] ?? []), Date.now()];

    // Persist to the messages inbox when the DB is configured, so the admin
    // can read submissions even if email delivery fails later.
    try {
      if ((await isDatabaseReachable()) && (await ensureSchema())) {
        await createMessage({
          name: body.name,
          email: body.email,
          subject: body.subject,
          message: body.message,
          purpose: body.purpose,
          ip,
          userAgent: request.headers.get("user-agent") ?? undefined,
        });
      }
    } catch (err) {
      // Never fail a submission because persistence failed; email already sent.
      console.error("Contact route: failed to persist message.", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route unexpected error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}