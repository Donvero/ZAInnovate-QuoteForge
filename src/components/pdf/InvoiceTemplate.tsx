import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { DocumentData } from "@/types";
import { formatZAR, amountInWords } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

// Create clean, crisp styles for professional SA SMME tax invoices
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
    borderBottomColor: "#0E1B2E",
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
  taxInvoiceBadge: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E1B2E",
    letterSpacing: 1,
  },
  sarsNotice: {
    fontSize: 8,
    color: "#8C6000",
    backgroundColor: "#FFF9E6",
    paddingVertical: 2,
    paddingHorizontal: 6,
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
    letterSpacing: 0.5,
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
  bankBox: {
    width: "50%",
    backgroundColor: "#F0F4F8",
    padding: 10,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#FFC20E",
  },
  bankTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0E1B2E",
    marginBottom: 4,
  },
  bankRow: {
    flexDirection: "row",
    marginBottom: 2,
    lineHeight: 1.3,
  },
  bankLabel: {
    width: "40%",
    fontWeight: "bold",
    color: "#334E68",
  },
  bankVal: {
    width: "60%",
    color: "#0E1B2E",
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
    marginTop: 8,
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

export const InvoicePdfDocument: React.FC<{ document: DocumentData }> = ({ document: doc }) => {
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
    email: "billing@zainnovate.co.za",
    bankName: "First National Bank (FNB)",
    accountHolder: "ZAInnovate Technologies",
    accountNumber: "62891234567",
    branchCode: "250655",
    accountType: "Cheque / Current Account",
  };

  const client = doc.client || {
    name: "Customer Name",
    email: "client@example.co.za",
    companyName: "Client Company Ltd",
  };

  return (
    <Document title={`Tax Invoice ${doc.number}`}>
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

          <View style={styles.taxInvoiceBadge}>
            <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
            <Text style={styles.sarsNotice}>SARS Section 20 Compliant</Text>
            <View style={styles.metaBlock}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Invoice No:</Text>
                <Text style={styles.metaValue}>{doc.number}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Date Issued:</Text>
                <Text style={styles.metaValue}>{formatDate(doc.date)}</Text>
              </View>
              {doc.dueDate && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Due Date:</Text>
                  <Text style={styles.metaValue}>{formatDate(doc.dueDate)}</Text>
                </View>
              )}
              {doc.referenceNumber && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Ref / PO No:</Text>
                  <Text style={styles.metaValue}>{doc.referenceNumber}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Client & Billing Info */}
        <View style={styles.addressSection}>
          <View style={styles.addressBox}>
            <Text style={styles.sectionTitle}>Billed To (Recipient):</Text>
            <Text style={styles.clientName}>{client.companyName || client.name}</Text>
            {client.companyName && client.name && (
              <Text style={styles.clientText}>Attn: {client.name}</Text>
            )}
            {client.address && <Text style={styles.clientText}>{client.address}</Text>}
            {client.city && <Text style={styles.clientText}>{client.city}, {client.province} {client.postalCode}</Text>}
            <Text style={styles.clientText}>{client.email}</Text>
            {client.phone && <Text style={styles.clientText}>Tel: {client.phone}</Text>}
            {client.vatNumber && (
              <Text style={[styles.clientText, { fontWeight: "bold", marginTop: 2 }]}>
                Client VAT No: {client.vatNumber}
              </Text>
            )}
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.sectionTitle}>Payment Terms:</Text>
            <Text style={styles.clientText}>
              Due Date: {doc.dueDate ? formatDate(doc.dueDate) : "Payable upon presentation"}
            </Text>
            <Text style={styles.clientText}>
              Payment Status: <Text style={{ fontWeight: "bold", color: doc.status === "PAID" ? "#047857" : "#B45309" }}>{doc.status}</Text>
            </Text>
            <Text style={[styles.clientText, { marginTop: 4, fontStyle: "italic" }]}>
              Please quote invoice number <Text style={{ fontWeight: "bold" }}>{doc.number}</Text> as your payment reference.
            </Text>
          </View>
        </View>

        {/* Table of Line Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>DESCRIPTION</Text>
            <Text style={styles.colQty}>QTY</Text>
            <Text style={styles.colPrice}>UNIT PRICE</Text>
            <Text style={styles.colVat}>VAT %</Text>
            <Text style={styles.colTotal}>TOTAL (EXCL)</Text>
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

        {/* Banking Details and Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.bankBox}>
            <Text style={styles.bankTitle}>BANKING DETAILS (EFT PAYMENT)</Text>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Bank:</Text>
              <Text style={styles.bankVal}>{company.bankName || "First National Bank (FNB)"}</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Account Name:</Text>
              <Text style={styles.bankVal}>{company.accountHolder || company.name}</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Account Number:</Text>
              <Text style={styles.bankVal}>{company.accountNumber || "62891234567"}</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Branch Code:</Text>
              <Text style={styles.bankVal}>{company.branchCode || "250655"}</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Reference:</Text>
              <Text style={[styles.bankVal, { fontWeight: "bold" }]}>{doc.number}</Text>
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
              <Text style={styles.grandTotalLabel}>TOTAL DUE (INCL. VAT):</Text>
              <Text style={styles.grandTotalVal}>{formatZAR(doc.total)}</Text>
            </View>
            <Text style={styles.amountInWords}>{amountInWords(doc.total)}</Text>
          </View>
        </View>

        {/* Notes & Terms */}
        {(doc.notes || doc.terms || company.defaultTerms) && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>TERMS & PAYMENT CONDITIONS</Text>
            <Text style={styles.notesContent}>
              {doc.notes ? `${doc.notes}\n` : ""}
              {doc.terms || company.defaultTerms || "Payment strictly due upon receipt or as per agreed credit term. Interest charged at maximum prescribed rate on overdue amounts."}
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
