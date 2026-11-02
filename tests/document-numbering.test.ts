import { describe, it, expect } from "vitest";
import { generateDocumentNumber, parseDocumentNumber } from "../src/lib/document-number";

describe("Sequential Document Numbering Engine", () => {
  it("should generate standard sequential invoice numbers with year and 4-digit padding", () => {
    const inv1 = generateDocumentNumber({
      type: "INVOICE",
      sequenceNumber: 1,
      year: 2026,
    });
    expect(inv1).toBe("INV-2026-0001");

    const inv42 = generateDocumentNumber({
      type: "INVOICE",
      sequenceNumber: 42,
      year: 2026,
    });
    expect(inv42).toBe("INV-2026-0042");

    const inv1041 = generateDocumentNumber({
      type: "INVOICE",
      sequenceNumber: 1041,
      year: 2026,
    });
    expect(inv1041).toBe("INV-2026-1041");
  });

  it("should generate quote numbers with default QT- prefix", () => {
    const qt = generateDocumentNumber({
      type: "QUOTE",
      sequenceNumber: 5,
      year: 2026,
    });
    expect(qt).toBe("QT-2026-0005");
  });

  it("should generate delivery notes and purchase orders with statutory prefixes", () => {
    const dn = generateDocumentNumber({
      type: "DELIVERY_NOTE",
      sequenceNumber: 12,
      year: 2026,
    });
    expect(dn).toBe("DN-2026-0012");

    const po = generateDocumentNumber({
      type: "PURCHASE_ORDER",
      sequenceNumber: 88,
      year: 2026,
    });
    expect(po).toBe("PO-2026-0088");
  });

  it("should support custom prefixes and custom padding lengths", () => {
    const custom = generateDocumentNumber({
      type: "INVOICE",
      sequenceNumber: 7,
      prefix: "ZA-TAX-",
      year: 2026,
      padding: 6,
    });
    expect(custom).toBe("ZA-TAX-2026-000007");
  });

  it("should accurately parse document numbers back into prefix and sequence", () => {
    const parsed = parseDocumentNumber("INV-2026-0042");
    expect(parsed.prefix).toBe("INV-");
    expect(parsed.sequence).toBe(42);

    const parsedQt = parseDocumentNumber("QT-2026-1200");
    expect(parsedQt.prefix).toBe("QT-");
    expect(parsedQt.sequence).toBe(1200);
  });
});
