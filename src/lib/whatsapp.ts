import { siteConfig } from "@/lib/site-config";

type SendDocumentInput = {
  to: string;
  pdf: Buffer;
  fileName: string;
  caption: string;
};

type WhatsAppResult = {
  sent: boolean;
  reason?: string;
};

const GRAPH_VERSION = "v20.0";

function digitsOnly(value?: string) {
  return value?.replace(/\D/g, "") || "";
}

export function isWhatsAppConfigured() {
  return Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN);
}

async function uploadDocument(pdf: Buffer, fileName: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !token) throw new Error("WhatsApp API is not configured.");

  const formData = new FormData();
  formData.append("messaging_product", "whatsapp");
  formData.append("type", "application/pdf");
  formData.append("file", new Blob([new Uint8Array(pdf)], { type: "application/pdf" }), fileName);

  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.id) {
    throw new Error(`WhatsApp media upload failed: ${JSON.stringify(body)}`);
  }
  return String(body.id);
}

export async function sendWhatsAppDocument({
  to,
  pdf,
  fileName,
  caption,
}: SendDocumentInput): Promise<WhatsAppResult> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const recipient = digitsOnly(to);

  if (!recipient) return { sent: false, reason: "Missing recipient number." };
  if (!phoneNumberId || !token) return { sent: false, reason: "WhatsApp API credentials are not configured." };

  try {
    const mediaId = await uploadDocument(pdf, fileName);
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "document",
        document: {
          id: mediaId,
          filename: fileName,
          caption,
        },
      }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("WhatsApp document send failed:", body);
      return { sent: false, reason: "WhatsApp API rejected the document message." };
    }

    return { sent: true };
  } catch (err) {
    console.error("WhatsApp document delivery failed:", err);
    return { sent: false, reason: "WhatsApp document delivery failed." };
  }
}

export function buildManualWhatsAppUrl(message: string, to = siteConfig.whatsapp) {
  const recipient = digitsOnly(to);
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

export function getSafarWhatsAppRecipient() {
  return process.env.WHATSAPP_BUSINESS_RECIPIENT || siteConfig.whatsapp;
}
