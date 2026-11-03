import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DocumentData } from "@/types";
import { calculateDocumentTotals } from "@/lib/vat";
import { generateDocumentNumber } from "@/lib/document-number";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const companyId = (session?.user as { companyId?: string } | undefined)?.companyId;
    if (!companyId) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    // Attempt Prisma fetch if database is configured
    try {
      const documents = await prisma.document.findMany({
        where: {
          companyId,
          ...(type && { type: type as any }),
          ...(status && { status: status as any }),
        },
        include: {
          client: true,
          company: true,
          items: true,
        },
        orderBy: { date: "desc" },
      });

      return NextResponse.json({ success: true, data: documents });
    } catch {
      return NextResponse.json(
        { success: false, error: "Document storage is unavailable" },
        { status: 503 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const companyId = (session?.user as { companyId?: string } | undefined)?.companyId;
    if (!companyId) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    const userId = (session?.user as { id?: string } | undefined)?.id;
    const body: DocumentData = await req.json();

    const totals = calculateDocumentTotals(body.items, body.discount);

    // If doc number is empty, auto generate
    const docNumber =
      body.number ||
      generateDocumentNumber({
        type: body.type,
        sequenceNumber: 1042,
      });

    try {
      const created = await prisma.document.create({
        data: {
          companyId,
          userId,
          clientId: body.clientId,
          type: body.type as any,
          status: (body.status as any) || "DRAFT",
          number: docNumber,
          referenceNumber: body.referenceNumber,
          date: body.date ? new Date(body.date) : new Date(),
          dueDate: body.dueDate ? new Date(body.dueDate) : null,
          subtotal: totals.subtotal,
          vatAmount: totals.vatAmount,
          discount: body.discount || 0,
          total: totals.total,
          notes: body.notes,
          terms: body.terms,
          items: {
            create: body.items.map((item, index) => ({
              position: index,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              vatRate: item.vatRate ?? 15,
              subtotal: item.quantity * item.unitPrice,
              vatAmount: (item.quantity * item.unitPrice * (item.vatRate ?? 15)) / 100,
              total:
                item.quantity * item.unitPrice +
                (item.quantity * item.unitPrice * (item.vatRate ?? 15)) / 100,
            })),
          },
        },
        include: {
          items: true,
          client: true,
          company: true,
        },
      });

      return NextResponse.json({ success: true, data: created });
    } catch {
      return NextResponse.json(
        { success: false, error: "Document storage is unavailable" },
        { status: 503 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create document" },
      { status: 500 }
    );
  }
}
