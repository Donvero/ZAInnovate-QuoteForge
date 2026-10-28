import { DocumentType } from "@/types";

interface DocumentNumberOptions {
  type: DocumentType;
  sequenceNumber: number;
  prefix?: string;
  year?: number;
  padding?: number;
}

const DEFAULT_PREFIXES: Record<DocumentType, string> = {
  QUOTE: "QT-",
  INVOICE: "INV-",
  DELIVERY_NOTE: "DN-",
  PURCHASE_ORDER: "PO-",
};

/**
 * Generates SARS-compliant sequential document numbers.
 * Example: INV-2026-1001 or QT-1002
 */
export function generateDocumentNumber({
  type,
  sequenceNumber,
  prefix,
  year = new Date().getFullYear(),
  padding = 4,
}: DocumentNumberOptions): string {
  const actualPrefix = prefix || DEFAULT_PREFIXES[type];
  const paddedNumber = String(sequenceNumber).padStart(padding, "0");
  return `${actualPrefix}${year}-${paddedNumber}`;
}

/**
 * Parses a document number to extract sequence number and type
 */
export function parseDocumentNumber(docNum: string): {
  prefix: string;
  sequence: number | null;
} {
  const match = docNum.match(/^([A-Za-z-]+)(\d{4}-)?(\d+)$/);
  if (!match) {
    return { prefix: "", sequence: null };
  }
  return {
    prefix: match[1],
    sequence: parseInt(match[3], 10),
  };
}
