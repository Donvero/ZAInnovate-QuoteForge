import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DocumentData } from "@/types";
import { formatZAR, amountInWords } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1A2E44",
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#FFC20E",
    paddingBottom: 16,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E1B2E",
  },
  brandSubtitle: {
    fontSize: 9,
    color: "#627D98",
    marginTop: 2,
  },
  companyDetails: {
    marginTop: 8,
    lineHeight: 1.4,
  },
  quoteBadge: {
    alignItems: "flex-end",
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E1B2E",
    letterSpacing: 1,
  },
  validityTag: {
    fontSize: 8,
    color: "#0E1B2E",
    backgroundColor: "#FFC20E",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginTop: 4,
    fontWeight: "bold",
  },
  metaBlock: {
    marginTop: 8,
    alignItems: "flex-end",
    lineHeight: 1.4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  metaLabel: {
    fontWeight: "bold",
    color: "#0E1B2E",
    marginRight: 6,
  },
  metaValue: {
    color: "#243B53",
  },
  addressSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 4,
  },
  addressBox: {
    width: "48%",
  },
  sectionTitle: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#627D98",
    fontWeight: "bold",
    marginBottom: 6,
  },
  clientName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0E1B2E",
    marginBottom: 2,
  },
  clientText: {
    lineHeight: 1.35,
    color: "#334E68",
  },
  table: {
    width: "100%",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0E1B2E",
    color: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontWeight: "bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  colDesc: { width: "45%" },
  colQty: { width: "12%", textAlign: "right" },
  colPrice: { width: "18%", textAlign: "right" },
  colVat: { width: "10%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },

  totalsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  acceptanceBox: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    padding: 10,
    borderRadius: 4,
  },
  acceptanceTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0E1B2E",
    marginBottom: 6,
  },
  signLine: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#94A3B8",
    paddingTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#64748B",
  },
  summaryBox: {
    width: "44%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    backgroundColor: "#0E1B2E",
    color: "#FFFFFF",
    paddingHorizontal: 8,
    marginTop: 6,
    borderRadius: 3,
  },
  grandTotalLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFC20E",
  },
  grandTotalVal: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  amountInWords: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#627D98",
    marginTop: 6,
    textAlign: "right",
  },
  notesSection: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 10,
    marginTop: 4,
  },
  notesTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0E1B2E",
    marginBottom: 3,
  },
  notesContent: {
    fontSize: 8,
    color: "#486581",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    textAlign: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#CBD5E1",
    paddingTop: 8,
    fontSize: 7,
    color: "#9FB3C8",
  },
});

export const QuotePdfDocument: React.FC<{ document: DocumentData }> = ({ document: doc }) => {
  const company = doc.company || {
    name: "ZAInnovate Technologies (Pty) Ltd",
    tradingName: "ZAInnovate",
    regNumber: "2024/098765/07",
    vatNumber: "4190283746",
    address: "Beacon Bay Commercial Park",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5241",
    phone: "+27 43 700 1200",
    email: "quotes@zainnovate.co.za",
  };

  const client = doc.client || {
    name: "Prospective Client",
    email: "client@example.co.za",
    companyName: "Client Company Ltd",
  };

  return (
    <Document title={`Official Quotation ${doc.number}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ width: "55%" }}>
            <Text style={styles.brandTitle}>{company.tradingName || company.name}</Text>
            {company.regNumber && (
              <Text style={styles.brandSubtitle}>Reg No: {company.regNumber}</Text>
            )}
            <View style={styles.companyDetails}>
              {company.vatNumber && <Text>VAT Registration No: {company.vatNumber}</Text>}
              {company.address && <Text>{company.address}, {company.city} {company.postalCode}</Text>}
              {company.email && <Text>Email: {company.email} | Phone: {company.phone || "—"}</Text>}
            </View>
          </View>

          <View style={styles.quoteBadge}>
            <Text style={styles.quoteTitle}>OFFICIAL QUOTATION</Text>
            <Text style={styles.validityTag}>VALID FOR 30 DAYS</Text>
            <View style={styles.metaBlock}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Quote No:</Text>
                <Text style={styles.metaValue}>{doc.number}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Date Issued:</Text>
                <Text style={styles.metaValue}>{formatDate(doc.date)}</Text>
              </View>
              {doc.dueDate && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Expiry Date:</Text>
                  <Text style={styles.metaValue}>{formatDate(doc.dueDate)}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Client & Quotation Meta */}
        <View style={styles.addressSection}>
          <View style={styles.addressBox}>
            <Text style={styles.sectionTitle}>Prepared For:</Text>
            <Text style={styles.clientName}>{client.companyName || client.name}</Text>
            {client.companyName && client.name && (
              <Text style={styles.clientText}>Attn: {client.name}</Text>
            )}
            {client.address && <Text style={styles.clientText}>{client.address}</Text>}
            {client.city && <Text style={styles.clientText}>{client.city}, {client.province} {client.postalCode}</Text>}
            <Text style={styles.clientText}>{client.email}</Text>
            {client.phone && <Text style={styles.clientText}>Tel: {client.phone}</Text>}
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.sectionTitle}>Scope of Quote:</Text>
            <Text style={styles.clientText}>
              All prices quoted in South African Rand (ZAR). This quote is valid for 30 calendar days from date of issue.
            </Text>
            <Text style={[styles.clientText, { marginTop: 4 }]}>
              Upon acceptance, sign below or reply via email to initiate the project / order.
            </Text>
          </View>
        </View>

        {/* Table of Line Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>ESTIMATED SCOPE / ITEM</Text>
            <Text style={styles.colQty}>QTY</Text>
            <Text style={styles.colPrice}>RATE (EXCL)</Text>
            <Text style={styles.colVat}>VAT %</Text>
            <Text style={styles.colTotal}>AMOUNT (EXCL)</Text>
          </View>

          {doc.items.map((item, idx) => {
            const qty = item.quantity || 1;
            const price = item.unitPrice || 0;
            const lineSubtotal = qty * price;
            return (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>{qty}</Text>
                <Text style={styles.colPrice}>{formatZAR(price)}</Text>
                <Text style={styles.colVat}>{item.vatRate ?? 15}%</Text>
                <Text style={styles.colTotal}>{formatZAR(lineSubtotal)}</Text>
              </View>
            );
          })}
        </View>

        {/* Acceptance and Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.acceptanceBox}>
            <Text style={styles.acceptanceTitle}>CLIENT ACCEPTANCE OF QUOTATION</Text>
            <Text style={{ fontSize: 7, color: "#64748B", lineHeight: 1.3 }}>
              I hereby accept this quotation and authorize the commencement of work in accordance with the stated terms.
            </Text>
            <View style={styles.signLine}>
              <Text>Authorized Signature: __________________</Text>
              <Text>Date: ___________</Text>
            </View>
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: "#627D98" }}>Subtotal (Excl. VAT):</Text>
              <Text style={{ fontWeight: "bold" }}>{formatZAR(doc.subtotal)}</Text>
            </View>
            {doc.discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: "#627D98" }}>Discount:</Text>
                <Text style={{ color: "#DC2626" }}>- {formatZAR(doc.discount)}</Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={{ color: "#627D98" }}>VAT (15%):</Text>
              <Text style={{ fontWeight: "bold" }}>{formatZAR(doc.vatAmount)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>TOTAL ESTIMATE (INCL):</Text>
              <Text style={styles.grandTotalVal}>{formatZAR(doc.total)}</Text>
            </View>
            <Text style={styles.amountInWords}>{amountInWords(doc.total)}</Text>
          </View>
        </View>

        {/* Notes & Terms */}
        {(doc.notes || doc.terms) && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>TERMS & CONDITIONS</Text>
            <Text style={styles.notesContent}>
              {doc.notes ? `${doc.notes}\n` : ""}
              {doc.terms || "Standard delivery turnaround 7-14 working days from date of deposit. Quotation valid for 30 days."}
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated with QuoteForge | Proudly South African SMME Software by ZAInnovate Technologies (Pty) Ltd | 100% Black Youth-Owned | B-BBEE Level 1
        </Text>
      </Page>
    </Document>
  );
};
