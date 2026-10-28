import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { DocumentData } from "@/types";
import { InvoicePdfDocument } from "@/components/pdf/InvoiceTemplate";
import { QuotePdfDocument } from "@/components/pdf/QuoteTemplate";

/**
 * Renders a SARS-compliant PDF document to a Node Buffer
 */
export async function generateDocumentPdf(doc: DocumentData): Promise<Buffer> {
  const isQuote = doc.type === "QUOTE";
  
  const element = isQuote
    ? React.createElement(QuotePdfDocument, { document: doc })
    : React.createElement(InvoicePdfDocument, { document: doc });

  return await renderToBuffer(element as any);
}
