import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import { siteConfig } from "@/lib/site-config";
import type { RfqPayload } from "@/lib/rfq";

type RfqPdfInput = {
  rfq: RfqPayload;
  rfqId: string;
};

type Row = {
  label: string;
  value?: string | boolean;
};

const PAGE = {
  width: 595.28,
  height: 841.89,
  marginX: 46,
  bottom: 780,
};

const COLOR = {
  black: "#111315",
  dark: "#2A2F36",
  grey: "#5F6670",
  muted: "#8A929D",
  line: "#D9DDE3",
  lightLine: "#E8EBEF",
  soft: "#F6F7F8",
  white: "#FFFFFF",
};

function clean(value?: string | boolean) {
  if (value === undefined || value === "") return "";
  return String(value).trim();
}

function ensureSpace(doc: PDFKit.PDFDocument, needed = 120) {
  if (doc.y + needed <= PAGE.bottom) return;
  doc.addPage();
  doc.y = 54;
}

function drawHeader(doc: PDFKit.PDFDocument, rfqId: string) {
  doc.rect(0, 0, PAGE.width, 118).fill(COLOR.black);
  doc
    .fillColor(COLOR.white)
    .font("Helvetica-Bold")
    .fontSize(24)
    .text(siteConfig.name, PAGE.marginX, 34, { width: 280 });
  doc
    .fillColor(COLOR.line)
    .font("Helvetica")
    .fontSize(9.5)
    .text("Trade and export partner", PAGE.marginX, 65, { width: 280 });

  doc
    .roundedRect(382, 32, 160, 54, 6)
    .strokeColor("#3C424A")
    .lineWidth(1)
    .stroke();
  doc
    .fillColor(COLOR.line)
    .font("Helvetica-Bold")
    .fontSize(7.5)
    .text("RFQ REFERENCE", 398, 45, { width: 128, align: "right", characterSpacing: 0.6 });
  doc
    .fillColor(COLOR.white)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(rfqId, 398, 60, { width: 128, align: "right" });

  doc.y = 146;
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string, subtitle?: string) {
  ensureSpace(doc, subtitle ? 76 : 56);
  doc.moveDown(0.25);
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLOR.black)
    .text(title.toUpperCase(), PAGE.marginX, doc.y, { characterSpacing: 0.7 });
  if (subtitle) {
    doc.moveDown(0.22);
    doc.font("Helvetica").fontSize(8.6).fillColor(COLOR.muted).text(subtitle, PAGE.marginX, doc.y, {
      width: 500,
      lineGap: 1.5,
    });
  }
  doc.moveDown(0.55);
  doc.moveTo(PAGE.marginX, doc.y).lineTo(PAGE.width - PAGE.marginX, doc.y).strokeColor(COLOR.line).lineWidth(1).stroke();
  doc.moveDown(0.9);
}

function drawInfoCards(doc: PDFKit.PDFDocument, rfq: RfqPayload, rfqId: string) {
  const cards = [
    { label: "RFQ ID", value: rfqId },
    { label: "Company", value: rfq.companyName || "-" },
    { label: "Destination", value: [rfq.destinationPort, rfq.destinationCountry].filter(Boolean).join(", ") || "-" },
  ];

  const y = doc.y;
  const gap = 12;
  const width = (PAGE.width - PAGE.marginX * 2 - gap * 2) / 3;
  cards.forEach((card, index) => {
    const x = PAGE.marginX + index * (width + gap);
    doc.roundedRect(x, y, width, 72, 8).fillAndStroke(COLOR.soft, COLOR.lightLine);
    doc
      .font("Helvetica-Bold")
      .fontSize(7.5)
      .fillColor(COLOR.muted)
      .text(card.label.toUpperCase(), x + 13, y + 14, { width: width - 26, characterSpacing: 0.5 });
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(COLOR.black)
      .text(card.value, x + 13, y + 31, { width: width - 26, height: 30, ellipsis: true });
  });
  doc.y = y + 92;
}

function drawRows(doc: PDFKit.PDFDocument, rows: Row[]) {
  const visibleRows = rows.filter((row) => clean(row.value));
  if (visibleRows.length === 0) {
    doc.font("Helvetica").fontSize(9.5).fillColor(COLOR.muted).text("No details provided.", PAGE.marginX);
    doc.moveDown(0.8);
    return;
  }

  visibleRows.forEach((row) => {
    const value = clean(row.value);
    const valueHeight = doc.heightOfString(value, { width: 320, lineGap: 2 });
    const rowHeight = Math.max(28, valueHeight + 12);
    ensureSpace(doc, rowHeight + 18);

    const y = doc.y;
    doc.rect(PAGE.marginX, y, PAGE.width - PAGE.marginX * 2, rowHeight).fill(COLOR.white);
    doc.moveTo(PAGE.marginX, y + rowHeight).lineTo(PAGE.width - PAGE.marginX, y + rowHeight).strokeColor(COLOR.lightLine).lineWidth(1).stroke();
    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor(COLOR.grey)
      .text(row.label, PAGE.marginX + 12, y + 9, { width: 150 });
    doc
      .font("Helvetica")
      .fontSize(9.7)
      .fillColor(COLOR.black)
      .text(value, PAGE.marginX + 185, y + 8, { width: 315, lineGap: 2 });
    doc.y = y + rowHeight;
  });
  doc.moveDown(0.8);
}

function drawNoteBox(doc: PDFKit.PDFDocument, title: string, body: string) {
  ensureSpace(doc, 104);
  const y = doc.y;
  doc.roundedRect(PAGE.marginX, y, PAGE.width - PAGE.marginX * 2, 84, 8).fillAndStroke(COLOR.soft, COLOR.lightLine);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(COLOR.black).text(title, PAGE.marginX + 16, y + 16);
  doc.font("Helvetica").fontSize(9).fillColor(COLOR.grey).text(body, PAGE.marginX + 16, y + 34, {
    width: PAGE.width - PAGE.marginX * 2 - 32,
    lineGap: 2,
  });
  doc.y = y + 104;
}

function drawFooter(doc: PDFKit.PDFDocument) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    doc.switchToPage(i);
    doc.moveTo(PAGE.marginX, 766).lineTo(PAGE.width - PAGE.marginX, 766).strokeColor(COLOR.lightLine).lineWidth(1).stroke();
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(COLOR.muted)
      .text(`${siteConfig.email} | ${siteConfig.phone}`, PAGE.marginX, 778, { width: 220 });
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(COLOR.muted)
      .text(`Page ${i + 1 - range.start} of ${range.count}`, PAGE.width - PAGE.marginX - 100, 778, {
        width: 100,
        align: "right",
      });
  }
}

export async function generateRfqPdf({ rfq, rfqId }: RfqPdfInput): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 46, left: PAGE.marginX, right: PAGE.marginX, bottom: 46 },
    bufferPages: true,
    info: {
      Title: `${siteConfig.name} RFQ Summary ${rfqId}`,
      Author: siteConfig.name,
      Subject: "Request for Quotation Summary",
    },
  });

  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  drawHeader(doc, rfqId);

  doc.font("Helvetica-Bold").fontSize(18).fillColor(COLOR.black).text("RFQ Summary", PAGE.marginX, doc.y);
  doc.moveDown(0.35);
  doc.font("Helvetica").fontSize(9.6).fillColor(COLOR.grey).text(
    "This is a structured requirement summary for sourcing feasibility review. It is not a price quotation, proforma invoice, or supply commitment.",
    PAGE.marginX,
    doc.y,
    { width: 500, lineGap: 2 }
  );
  doc.moveDown(1.2);

  drawInfoCards(doc, rfq, rfqId);

  sectionTitle(doc, "Product Requirement", "Core product details needed to prevent wrong item, wrong grade, or unclear sourcing.");
  drawRows(doc, [
    { label: "Product / Requirement", value: rfq.requirement },
    { label: "Category", value: rfq.productCategory },
    { label: "Quantity", value: rfq.quantity },
    { label: "Grade / Specification", value: rfq.gradeSpecification },
    { label: "Application / Use Case", value: rfq.applicationUse },
    { label: "Additional Details", value: rfq.message },
  ]);

  sectionTitle(doc, "Destination", "Port, country, and local delivery information used for freight and export feasibility review.");
  drawRows(doc, [
    { label: "Destination Port", value: rfq.destinationPort },
    { label: "Country", value: rfq.destinationCountry },
    { label: "State / Province", value: rfq.destinationState },
    { label: "ZIP / PIN", value: rfq.destinationZip },
  ]);

  sectionTitle(doc, "Trade and Shipment Details");
  drawRows(doc, [
    { label: "Incoterm Preference", value: rfq.incoterm },
    { label: "Shipment Type", value: rfq.shipmentType },
    { label: "Timeline", value: rfq.timeline },
    { label: "Recurring Requirement", value: rfq.monthlyRequirement },
  ]);

  sectionTitle(doc, "Quality and R&D Review", "These notes help Safar Traders screen supplier fit before quotation.");
  drawRows(doc, [
    { label: "Standards", value: rfq.qualityStandards },
    { label: "Certificates", value: rfq.certificates },
    { label: "Inspection Preference", value: rfq.inspectionPreference },
    { label: "Sample / Drawing / Reference", value: rfq.sampleOrDrawing },
  ]);

  sectionTitle(doc, "Buyer Details");
  drawRows(doc, [
    { label: "Company", value: rfq.companyName },
    { label: "Contact Person", value: rfq.contactPerson },
    { label: "Email", value: rfq.email },
    { label: "Phone", value: rfq.phone },
    { label: "WhatsApp", value: rfq.whatsapp },
    { label: "Address", value: rfq.address },
    { label: "State / Province", value: rfq.addressState },
    { label: "ZIP / PIN", value: rfq.addressZip },
  ]);

  drawNoteBox(
    doc,
    "Next step",
    "Safar Traders will review supplier fit, specification clarity, product quality expectations, export feasibility, documentation needs, and shipment handling before preparing commercial terms."
  );

  drawFooter(doc);
  doc.end();

  return await new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}
