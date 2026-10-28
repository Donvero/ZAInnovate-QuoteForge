import { NextRequest, NextResponse } from "next/server";
import { generateDocumentPdf } from "@/lib/pdf";
import { DocumentData } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Build document structure (can query prisma.document or generate default)
    const mockDocument: DocumentData = {
      id,
      companyId: "comp_zainnovate_01",
      clientId: "cl_1",
      type: "INVOICE",
      status: "SENT",
      number: "INV-2026-1041",
      referenceNumber: "EC-DOT-PO-981",
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      subtotal: 35000,
      vatAmount: 5250,
      discount: 0,
      total: 40250,
      amountPaid: 0,
      balanceDue: 40250,
      notes: "Payment reference: INV-2026-1041. Please deposit into our FNB cheque account.",
      terms: "Strictly 30 days. SARS Section 20 Tax Invoice rules apply.",
      items: [
        {
          description: "Provincial Highway Fleet Telemetry Software & IoT Tracking",
          quantity: 1,
          unitPrice: 35000,
          vatRate: 15,
          subtotal: 35000,
          vatAmount: 5250,
          total: 40250,
        },
      ],
    };

    const pdfBuffer = await generateDocumentPdf(mockDocument);

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${mockDocument.number}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to render PDF" },
      { status: 500 }
    );
  }
}
