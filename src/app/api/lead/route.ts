import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail, type LeadPayload } from "@/lib/mailer";

// Very small in-memory rate limiter (per server instance) to deter spam bots.
// Not a substitute for a real WAF/captcha, but stops naive abuse.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const allowedSources = new Set(["rfq-wizard", "chatbot", "contact-form"]);

function getClientKey(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hasValidEmail(email?: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : undefined;
}

function isHighPriority(lead: LeadPayload): boolean {
  const qty = `${lead.quantity || ""} ${lead.monthlyRequirement || ""}`.toLowerCase();
  const mtMatch = qty.match(/(\d{2,})\s*mt/);
  if (mtMatch && Number(mtMatch[1]) >= 100) return true;
  if (/container/.test(qty)) return true;
  if (/month(ly)?/.test(qty)) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const clientKey = getClientKey(req);
    const lastSubmit = recentSubmissions.get(clientKey);
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        { ok: false, error: "Please wait a moment before submitting again." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<LeadPayload>;

    if (!body.source || !allowedSources.has(String(body.source))) {
      return NextResponse.json({ ok: false, error: "Missing source." }, { status: 400 });
    }
    if (!body.email && !body.phone) {
      return NextResponse.json(
        { ok: false, error: "Provide at least an email or phone number." },
        { status: 400 }
      );
    }

    // Basic honeypot field support — if a hidden field named "website" is
    // filled in, it's almost certainly a bot. Silently accept without emailing.
    if ((body as Record<string, unknown>).website) {
      return NextResponse.json({ ok: true });
    }

    const lead: LeadPayload = {
      source: body.source as LeadPayload["source"],
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone, 100),
      country: clean(body.country, 100),
      product: clean(body.product),
      quantity: clean(body.quantity),
      destinationPort: clean(body.destinationPort),
      monthlyRequirement: clean(body.monthlyRequirement),
      timeline: clean(body.timeline),
      message: clean(body.message, 4000),
      locale: clean(body.locale, 10),
    };

    if (lead.email && !hasValidEmail(lead.email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    lead.priority = isHighPriority(lead) ? "High Priority Lead" : "Standard";

    await sendLeadEmail(lead);

    recentSubmissions.set(clientKey, Date.now());

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your requirement. Please try WhatsApp or email us directly." },
      { status: 500 }
    );
  }
}
