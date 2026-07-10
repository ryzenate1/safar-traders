import { NextRequest, NextResponse } from "next/server";

/**
 * Sourcing assistant chat completion proxy.
 *
 * Requires ANTHROPIC_API_KEY in your environment (.env.local locally,
 * and your hosting provider's env settings in production).
 * Get a key at https://console.anthropic.com/
 */

const SYSTEM_PROMPT = `You are a trade and sourcing assistant for Safar Traders, a procurement and export partner for buyers of non-perishable industrial and commercial goods.

Your role is to help buyers understand our sourcing scope and guide them toward submitting a requirement for review.

PERSONALITY: Professional, calm, concise, trustworthy. Never use emojis.

WHAT WE DO: We coordinate supplier sourcing, procurement, quotation preparation, export documentation, and supply handling across multiple product categories — metals, machinery and equipment, industrial materials (plastics, paper, packaging, rubber), and custom sourcing requirements. We do not deal with food, fresh produce, or any perishable goods.

SERVICES: Buyer-led sourcing, supplier coordination, quotation support, export documentation, logistics coordination, and single-point supply management.

PRIMARY OBJECTIVES:
1. Answer questions about sourcing capabilities, trade terms, and process.
2. Help buyers clarify and structure their requirement.
3. Gently collect: company name, contact person, country, email or phone, product, quantity, destination, and timeline — one or two at a time.
4. Direct serious buyers to the Request a Quote form.

IMPORTANT RULES:
- Never promise availability, pricing, or delivery dates.
- Never negotiate payment terms or contracts.
- For pricing or commercial questions: “Our team will review your requirement and revert with a formal commercial proposal.”
- For availability questions: “Please submit your requirement and we will assess sourcing feasibility.”

Keep replies concise (2–4 sentences). Respond in the language the buyer uses.`;

const recentChatRequests = new Map<string, number[]>();
const CHAT_WINDOW_MS = 60_000;
const CHAT_LIMIT = 12;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 1200;

function getClientKey(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const recent = (recentChatRequests.get(clientKey) || []).filter((time) => now - time < CHAT_WINDOW_MS);
  if (recent.length >= CHAT_LIMIT) {
    recentChatRequests.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  recentChatRequests.set(clientKey, recent);
  return false;
}

function normalizeMessages(value: unknown) {
  if (!Array.isArray(value)) return null;
  const normalized = value
    .slice(-MAX_MESSAGES)
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const item = message as { role?: unknown; content?: unknown };
      if (item.role !== "user" && item.role !== "assistant") return null;
      if (typeof item.content !== "string") return null;
      const content = item.content.trim().slice(0, MAX_MESSAGE_CHARS);
      if (!content) return null;
      return { role: item.role, content };
    })
    .filter((message): message is { role: "user" | "assistant"; content: string } => Boolean(message));

  return normalized.length > 0 ? normalized : null;
}

export async function POST(req: NextRequest) {
  try {
    const clientKey = getClientKey(req);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { ok: false, error: "Please wait a moment before sending more messages." },
        { status: 429 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Chat is not configured yet. Please use the Request a Quote form or WhatsApp." },
        { status: 503 }
      );
    }

    const { messages } = (await req.json()) as { messages?: unknown };
    const normalizedMessages = normalizeMessages(messages);

    if (!normalizedMessages) {
      return NextResponse.json({ ok: false, error: "No messages provided." }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: normalizedMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { ok: false, error: "The assistant is temporarily unavailable. Please try the Request a Quote form." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content
      ?.map((block: { type: string; text?: string }) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n");

    return NextResponse.json({ ok: true, reply: text || "" });
  } catch (err) {
    console.error("Chat route failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
