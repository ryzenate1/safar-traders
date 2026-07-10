import { NextRequest, NextResponse } from "next/server";
import { generateRfqPdf } from "@/lib/rfq-pdf";
import {
  makeRfqId,
  normalizeRfqPayload,
  rfqMissingFields,
  rfqToMessage,
  type RfqSubmitResponse,
} from "@/lib/rfq";
import { sendLeadEmail, type LeadPayload } from "@/lib/mailer";
import {
  buildManualWhatsAppUrl,
  getSafarWhatsAppRecipient,
  isWhatsAppConfigured,
  sendWhatsAppDocument,
} from "@/lib/whatsapp";

export const runtime = "nodejs";

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

function getClientKey(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hasValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isHighPriority(rfq: ReturnType<typeof normalizeRfqPayload>) {
  const qty = `${rfq.quantity} ${rfq.monthlyRequirement}`.toLowerCase();
  const mtMatch = qty.match(/(\d{2,})\s*mt/);
  if (mtMatch && Number(mtMatch[1]) >= 100) return true;
  return /container|monthly|recurring|fcl/.test(qty);
}

export async function POST(req: NextRequest) {
  try {
    const clientKey = getClientKey(req);
    const lastSubmit = recentSubmissions.get(clientKey);
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json<RfqSubmitResponse>(
        { ok: false, error: "Please wait a moment before submitting again." },
        { status: 429 }
      );
    }

    const rfq = normalizeRfqPayload(await req.json());
    const missing = rfqMissingFields(rfq);
    if (missing.length > 0) {
      return NextResponse.json<RfqSubmitResponse>(
        { ok: false, error: `Missing required RFQ fields: ${missing.join(", ")}.` },
        { status: 400 }
      );
    }
    if (rfq.email && !hasValidEmail(rfq.email)) {
      return NextResponse.json<RfqSubmitResponse>(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const rfqId = makeRfqId();
    const pdfFileName = `${rfqId}-Safar-Traders-RFQ-Summary.pdf`;
    const pdf = await generateRfqPdf({ rfq, rfqId });
    const priority: LeadPayload["priority"] = isHighPriority(rfq) ? "High Priority Lead" : "Standard";

    let emailSent = false;
    let emailNote = "";
    try {
      await sendLeadEmail({
        source: "rfq-wizard",
        name: rfq.contactPerson,
        company: rfq.companyName,
        email: rfq.email,
        phone: rfq.phone,
        country: rfq.destinationCountry,
        product: rfq.requirement,
        quantity: rfq.quantity,
        destinationPort: rfq.destinationPort,
        monthlyRequirement: rfq.monthlyRequirement,
        timeline: rfq.timeline,
        message: [`RFQ ID: ${rfqId}`, rfqToMessage(rfq)].filter(Boolean).join("\n"),
        priority,
        attachments: [{ filename: pdfFileName, content: pdf, contentType: "application/pdf" }],
      });
      emailSent = true;
    } catch (err) {
      emailNote = "Email delivery is not configured or failed. PDF download and WhatsApp text fallback are still available.";
      console.error("RFQ email delivery failed:", err);
    }

    const caption = `${rfqId} - Safar Traders RFQ Summary. This is a requirement summary for feasibility review, not a price quotation.`;
    const teamResult = isWhatsAppConfigured()
      ? await sendWhatsAppDocument({
          to: getSafarWhatsAppRecipient(),
          pdf,
          fileName: pdfFileName,
          caption,
        })
      : { sent: false, reason: "WhatsApp API credentials are not configured." };

    const buyerResult = rfq.whatsappConsent && rfq.whatsapp && isWhatsAppConfigured()
      ? await sendWhatsAppDocument({
          to: rfq.whatsapp,
          pdf,
          fileName: pdfFileName,
          caption,
        })
      : {
          sent: false,
          reason: rfq.whatsappConsent ? "Buyer WhatsApp number or API credentials missing." : "Buyer did not consent to WhatsApp delivery.",
        };

    recentSubmissions.set(clientKey, Date.now());

    const manualMessage = [
      `Hello Safar Traders, I would like to submit RFQ ${rfqId}.`,
      `Company: ${rfq.companyName}`,
      `Contact: ${rfq.contactPerson}`,
      `Phone: ${rfq.phone}`,
      rfq.email && `Email: ${rfq.email}`,
      `Requirement: ${rfq.requirement}`,
      `Quantity: ${rfq.quantity}`,
      rfq.gradeSpecification && `Specification: ${rfq.gradeSpecification}`,
      `Destination: ${[rfq.destinationPort, rfq.destinationState, rfq.destinationCountry, rfq.destinationZip].filter(Boolean).join(", ")}`,
      rfq.timeline && `Timeline: ${rfq.timeline}`,
      "The RFQ Summary PDF has been downloaded from the website.",
    ].join("\n");

    return NextResponse.json<RfqSubmitResponse>({
      ok: true,
      rfqId,
      pdfFileName,
      pdfBase64: pdf.toString("base64"),
      emailSent,
      whatsappTeamSent: teamResult.sent,
      whatsappBuyerSent: buyerResult.sent,
      whatsappManualUrl: buildManualWhatsAppUrl(manualMessage, getSafarWhatsAppRecipient()),
      whatsappNote: buyerResult.sent && teamResult.sent
        ? "PDF sent automatically on WhatsApp."
        : emailNote || buyerResult.reason || teamResult.reason || "Manual WhatsApp sharing is available.",
    });
  } catch (err) {
    console.error("Structured RFQ submission failed:", err);
    return NextResponse.json<RfqSubmitResponse>(
      { ok: false, error: "Something went wrong sending your RFQ. Please try WhatsApp or email us directly." },
      { status: 500 }
    );
  }
}
