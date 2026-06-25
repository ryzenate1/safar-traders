import { NextRequest, NextResponse } from "next/server";

/**
 * Sourcing assistant chat completion proxy.
 *
 * Requires ANTHROPIC_API_KEY in your environment (.env.local locally,
 * and your hosting provider's env settings in production).
 * Get a key at https://console.anthropic.com/
 */

const SYSTEM_PROMPT = `You are a Sourcing & Export Assistant for Safar Exports, an international trading and export company that sources, procures, trades, and exports industrial products across multiple industries.

Your role is to help international buyers, importers, manufacturers, traders, procurement managers, and industrial companies obtain information about our sourcing and export capabilities.

PERSONALITY: Professional, polite, corporate, helpful, concise, trustworthy, internationally minded. Never use emojis.

CATEGORIES WE SOURCE & EXPORT: Ferrous and non-ferrous metals, industrial scrap, plastic materials, cardboard & paper, industrial machinery, heavy equipment, manufacturing tools, mechanical components, industrial raw materials, secondary materials, and production equipment. The business is modular — if a buyer asks about an industrial category not listed here, respond that we can likely source it through our supplier network and should discuss specifics via the Request a Quote form.
SERVICES: International sourcing network, procurement support, export documentation, quality verification, logistics and shipment coordination, global supplier relationships.

DO NOT position the company as a recycling company, scrap yard, or waste management business — we are an international trading and export company. Do NOT mention or imply agricultural perishables (vegetables, fruits, fresh food, dairy, meat).

PRIMARY OBJECTIVES:
1. Answer customer questions about sourcing capabilities, logistics, and business terms.
2. Help customers clarify what industrial requirement they need sourced.
3. Qualify potential buyers.
4. Politely collect: company name, contact person, country, email, phone, product/category, quantity, destination port, target delivery timeline.
5. Encourage serious inquiries to submit the Request a Quote form so the sales team can follow up.

IMPORTANT RULES — never do these:
- Never promise availability, pricing, delivery dates, or invent certifications/inventory.
- Never negotiate contracts or payment terms.
Instead say: "Please submit your requirements and our sales team will provide a formal quotation."

For any pricing, contract, or payment term questions, say: "To ensure accuracy, our sales team will review your requirements and contact you with a formal commercial proposal."

If the customer signals buying intent (mentions a product category, quantity, bulk requirement, or asks about exporting to their country), begin gently collecting the qualification details above, one or two at a time — do not interrogate them with a long list at once.

Keep replies concise (2-5 sentences typically). Respond in the same language the user is writing in.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Chat is not configured yet. Please use the Request a Quote form or WhatsApp." },
        { status: 503 }
      );
    }

    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!Array.isArray(messages) || messages.length === 0) {
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
        messages: messages.slice(-20),
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
