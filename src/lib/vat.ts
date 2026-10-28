/**
 * South African SARS VAT (Value Added Tax) calculation helpers
 * ZAInnovate Technologies - QuoteForge
 * Standard South African VAT Rate: 15.0%
 */

export const SA_VAT_RATE = 15.0; // 15%

export interface VatCalculationResult {
  subtotal: number;       // Exclusive of VAT
  vatAmount: number;      // 15% VAT total
  total: number;          // Subtotal + VAT
}

/**
 * Calculates VAT from exclusive amount
 * @param exclusiveAmount Price before VAT
 * @param rate VAT rate in percentage (default: 15)
 */
export function calculateVatFromExclusive(exclusiveAmount: number, rate: number = SA_VAT_RATE): number {
  if (exclusiveAmount <= 0 || rate <= 0) return 0;
  return Math.round((exclusiveAmount * (rate / 100)) * 100) / 100;
}

/**
 * Extracts VAT from inclusive amount (Formula: amount * (15 / 115))
 * @param inclusiveAmount Price after VAT
 * @param rate VAT rate in percentage (default: 15)
 */
export function extractVatFromInclusive(inclusiveAmount: number, rate: number = SA_VAT_RATE): {
  subtotal: number;
  vatAmount: number;
} {
  if (inclusiveAmount <= 0 || rate <= 0) {
    return { subtotal: inclusiveAmount, vatAmount: 0 };
  }
  const vatAmount = Math.round((inclusiveAmount * (rate / (100 + rate))) * 100) / 100;
  const subtotal = Math.round((inclusiveAmount - vatAmount) * 100) / 100;
  return { subtotal, vatAmount };
}

/**
 * Calculates total document breakdown from array of line items
 */
export function calculateDocumentTotals(
  items: Array<{
    quantity: number;
    unitPrice: number;
    vatRate?: number;
  }>,
  discount: number = 0
): VatCalculationResult {
  let subtotal = 0;
  let vatAmount = 0;

  for (const item of items) {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    const rate = typeof item.vatRate === "number" ? item.vatRate : SA_VAT_RATE;

    const lineSubtotal = Math.round(qty * price * 100) / 100;
    const lineVat = Math.round((lineSubtotal * (rate / 100)) * 100) / 100;

    subtotal += lineSubtotal;
    vatAmount += lineVat;
  }

  // Apply overall discount proportionally to subtotal
  const netSubtotal = Math.max(0, subtotal - discount);
  const discountFactor = subtotal > 0 ? netSubtotal / subtotal : 1;
  const adjustedVat = Math.round(vatAmount * discountFactor * 100) / 100;
  const total = Math.round((netSubtotal + adjustedVat) * 100) / 100;

  return {
    subtotal: netSubtotal,
    vatAmount: adjustedVat,
    total,
  };
}

/**
 * Validates SARS 10-digit VAT number format
 * Valid SA VAT numbers are 10 digits starting with '4'
 */
export function isValidSarsVatNumber(vatNumber: string | null | undefined): boolean {
  if (!vatNumber) return false;
  const cleaned = vatNumber.replace(/\s+/g, "");
  return /^4\d{9}$/.test(cleaned);
}
