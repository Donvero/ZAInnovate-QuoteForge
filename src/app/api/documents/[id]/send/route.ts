import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateDocumentPdf } from "@/lib/pdf";
import { DocumentData } from "@/types";
import { formatZAR } from "@/lib/currency";

const resend = new Resend(process.env.RESEND_API_KEY || "mock_resend_dev_key");

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const doc: DocumentData = body.document;

    if (!doc || !doc.client?.email) {
      return NextResponse.json(
        { success: false, error: "Missing document or client email address" },
        { status: 400 }
      );
    }

    const docTypeLabel = doc.type === "QUOTE" ? "Quotation" : "Tax Invoice";
    const subject = `${docTypeLabel} ${doc.number} from ZAInnovate Technologies`;

    // In production with valid RESEND_API_KEY, generate PDF and send email
    if (process.env.RESEND_API_KEY) {
      const pdfBuffer = await generateDocumentPdf(doc);

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "QuoteForge <invoicing@zainnovate.co.za>",
        to: [doc.client.email],
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; color: #0E1B2E; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #0E1B2E; padding: 15px; border-radius: 8px; text-align: center;">
              <h2 style="color: #FFC20E; margin: 0;">QuoteForge • ZAInnovate Technologies</h2>
            </div>
            <div style="padding: 20px 0;">
              <p>Dear ${doc.client.name},</p>
              <p>Please find attached your official <strong>${docTypeLabel} (${doc.number})</strong> for <strong>${formatZAR(doc.total)}</strong>.</p>
              <p>If you have any questions or require banking confirmation letters, feel free to reply directly to this email.</p>
              <p style="margin-top: 30px;">Warm regards,<br/><strong>ZAInnovate Technologies (Pty) Ltd</strong><br/>East London, South Africa</p>
            </div>
            <div style="font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 10px;">
              B-BBEE Level 1 Contributor • SARS 15% VAT Compliant
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `${doc.number}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      message: `Document ${doc.number} successfully emailed to ${doc.client.email}`,
    });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email" },
      { status: 500 }
    );
  }
}
