import { describe, it, expect } from "vitest";
import {
  SA_VAT_RATE,
  calculateVatFromExclusive,
  extractVatFromInclusive,
  calculateDocumentTotals,
  isValidSarsVatNumber,
} from "../src/lib/vat";

describe("SARS Section 20 VAT Engine (15%)", () => {
  it("should verify standard South African VAT rate is 15.0%", () => {
    expect(SA_VAT_RATE).toBe(15.0);
  });

  describe("calculateVatFromExclusive", () => {
    it("should accurately calculate 15% VAT on round and fractional amounts", () => {
      expect(calculateVatFromExclusive(100)).toBe(15.0);
      expect(calculateVatFromExclusive(1000)).toBe(150.0);
      expect(calculateVatFromExclusive(35000)).toBe(5250.0);
      expect(calculateVatFromExclusive(199.99)).toBe(30.0); // 199.99 * 0.15 = 29.9985 -> 30.00
      expect(calculateVatFromExclusive(0)).toBe(0);
      expect(calculateVatFromExclusive(-50)).toBe(0);
    });
  });

  describe("extractVatFromInclusive", () => {
    it("should reverse-calculate exclusive subtotal and VAT component using 15/115 tax factor", () => {
      // For R115 inclusive: subtotal = 100, VAT = 15
      const res1 = extractVatFromInclusive(115);
      expect(res1.subtotal).toBe(100.0);
      expect(res1.vatAmount).toBe(15.0);

      // For R1150 inclusive: subtotal = 1000, VAT = 150
      const res2 = extractVatFromInclusive(1150);
      expect(res2.subtotal).toBe(1000.0);
      expect(res2.vatAmount).toBe(150.0);

      // For R40,250 inclusive: subtotal = 35000, VAT = 5250
      const res3 = extractVatFromInclusive(40250);
      expect(res3.subtotal).toBe(35000.0);
      expect(res3.vatAmount).toBe(5250.0);
    });
  });

  describe("calculateDocumentTotals", () => {
    it("should compute subtotal, VAT and total across multiple line items", () => {
      const items = [
        { quantity: 2, unitPrice: 500 }, // 1000 subtotal, 150 VAT
        { quantity: 1, unitPrice: 2000 }, // 2000 subtotal, 300 VAT
      ];
      const result = calculateDocumentTotals(items, 0);
      expect(result.subtotal).toBe(3000.0);
      expect(result.vatAmount).toBe(450.0);
      expect(result.total).toBe(3450.0);
    });

    it("should handle proportional discounts correctly", () => {
      const items = [
        { quantity: 1, unitPrice: 1000 }, // 1000 subtotal, 150 VAT
      ];
      // R100 discount (10% discount) -> net subtotal 900, VAT 135, total 1035
      const result = calculateDocumentTotals(items, 100);
      expect(result.subtotal).toBe(900.0);
      expect(result.vatAmount).toBe(135.0);
      expect(result.total).toBe(1035.0);
    });
  });

  describe("isValidSarsVatNumber", () => {
    it("should accept valid 10-digit SA VAT numbers starting with 4", () => {
      expect(isValidSarsVatNumber("4123456789")).toBe(true);
      expect(isValidSarsVatNumber("4987654321")).toBe(true);
      expect(isValidSarsVatNumber("412 345 6789")).toBe(true); // spaced format
    });

    it("should reject invalid SA VAT numbers", () => {
      expect(isValidSarsVatNumber("3123456789")).toBe(false); // does not start with 4
      expect(isValidSarsVatNumber("412345678")).toBe(false); // 9 digits
      expect(isValidSarsVatNumber("41234567890")).toBe(false); // 11 digits
      expect(isValidSarsVatNumber("412345678A")).toBe(false); // contains letters
      expect(isValidSarsVatNumber(null)).toBe(false);
      expect(isValidSarsVatNumber(undefined)).toBe(false);
    });
  });
});
