"use client";

import React from "react";
import { DocumentData, CompanyData, ClientData } from "@/types";
import { formatZAR, amountInWords } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { ShieldCheck, CheckCircle2, Award, Building2, Landmark } from "lucide-react";

interface DocumentPreviewProps {
  document: DocumentData;
  company?: CompanyData;
  client?: ClientData;
  className?: string;
}

export function DocumentPreview({
  document: doc,
  company: propCompany,
  client: propClient,
  className = "",
}: DocumentPreviewProps) {
  const company = propCompany || doc.company || {
    id: "default_company",
    name: "ZAInnovate Technologies (Pty) Ltd",
    tradingName: "ZAInnovate Technologies",
    regNumber: "2024/098765/07",
    vatNumber: "4190283746",
    taxPin: "9834710294",
    csdNumber: "MAAA1289456",
    bbbeeLevel: "B-BBEE Level 1 Contributor (100% Black Youth Owned)",
    address: "Beacon Bay Commercial Park, Pearl Road",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5241",
    phone: "+27 (0) 43 700 1200",
    email: "invoicing@zainnovate.co.za",
    bankName: "First National Bank (FNB)",
    accountHolder: "ZAInnovate Technologies (Pty) Ltd",
    accountNumber: "62891234567",
    branchCode: "250655",
    accountType: "Cheque / Business Current Account",
  };

  const client = propClient || doc.client || {
    id: "default_client",
    name: "Siphesihle Ndlovu",
    companyName: "Eastern Cape Infrastructure Services",
    email: "sndlovu@ecis.co.za",
    phone: "+27 (0) 83 234 5678",
    address: "14 Oxford Street, City Centre",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5201",
    vatNumber: "4820194857",
    csdNumber: "MAAA0938472",
  };

  const isQuote = doc.type === "QUOTE";
  const isInvoice = doc.type === "INVOICE";
  const isDeliveryNote = doc.type === "DELIVERY_NOTE";
  const isPurchaseOrder = doc.type === "PURCHASE_ORDER";

  const docTitle = isQuote
    ? "OFFICIAL QUOTATION"
    : isInvoice
    ? "TAX INVOICE"
    : isDeliveryNote
    ? "DELIVERY NOTE"
    : "PURCHASE ORDER";

  return (
    <div
      className={`bg-white text-[#0E1B2E] shadow-2xl rounded-xl border border-slate-200 overflow-hidden text-xs print:shadow-none print:border-none print:m-0 ${className}`}
      id="printable-document"
    >
      {/* Top Branding Accent Bar */}
      <div className="h-3 bg-gradient-to-r from-[#0E1B2E] via-[#1A2E44] to-[#FFC20E]" />

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-[#0E1B2E] pb-6">
          {/* Company Details */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-[#0E1B2E] flex items-center justify-center font-black text-[#FFC20E] text-base shadow-sm">
                ZA
              </div>
              <div>
                <h1 className="text-xl font-black text-[#0E1B2E] tracking-tight leading-tight">
                  {company.tradingName || company.name}
                </h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Technology & Digital Solutions
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 space-y-0.5 pt-2">
              {company.regNumber && (
                <p><span className="font-semibold text-[#0E1B2E]">CIPC Reg No:</span> {company.regNumber}</p>
              )}
              {company.vatNumber && (
                <p><span className="font-semibold text-[#0E1B2E]">SARS VAT Reg No:</span> {company.vatNumber}</p>
              )}
              {company.csdNumber && (
                <p><span className="font-semibold text-[#0E1B2E]">Treasury CSD:</span> {company.csdNumber}</p>
              )}
              {company.taxPin && (
                <p><span className="font-semibold text-[#0E1B2E]">SARS TCS PIN:</span> {company.taxPin}</p>
              )}
              <p>{company.address}, {company.city}, {company.province} {company.postalCode}</p>
              <p>Email: {company.email} | Tel: {company.phone}</p>
            </div>

            {/* B-BBEE Level Badge */}
            {company.bbbeeLevel && (
              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded bg-[#0E1B2E]/5 border border-[#0E1B2E]/10 text-[10px] font-bold text-[#0E1B2E]">
                <Award className="w-3.5 h-3.5 text-[#FFC20E]" />
                <span>{company.bbbeeLevel}</span>
              </div>
            )}
          </div>

          {/* Right Header: Document Type, Serial Number & SARS Badge */}
          <div className="sm:text-right space-y-2">
            <div>
              <span className="inline-block bg-[#0E1B2E] text-white px-3.5 py-1.5 rounded-lg text-sm font-black tracking-wider shadow-sm">
                {docTitle}
              </span>
              {isInvoice && (
                <div className="mt-1 text-[10px] font-bold text-[#8C6000] bg-[#FFF9E6] px-2 py-0.5 rounded border border-[#FFC20E]/40 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#FFC20E]" />
                  SARS Section 20 Compliant
                </div>
              )}
              {isQuote && (
                <div className="mt-1 text-[10px] font-bold text-[#0E1B2E] bg-[#FFC20E]/20 px-2 py-0.5 rounded border border-[#FFC20E]/40 inline-block">
                  Valid for 30 Calendar Days
                </div>
              )}
            </div>

            <div className="space-y-1 font-mono text-[11px] pt-1">
              <p>
                <span className="text-slate-500 font-sans font-semibold">Document No:</span>{" "}
                <span className="font-bold text-[#0E1B2E] text-sm">{doc.number}</span>
              </p>
              <p>
                <span className="text-slate-500 font-sans font-semibold">Date of Issue:</span>{" "}
                <span className="font-semibold text-[#0E1B2E]">{formatDate(doc.date)}</span>
              </p>
              {doc.dueDate && (
                <p>
                  <span className="text-slate-500 font-sans font-semibold">
                    {isQuote ? "Valid Until:" : "Payment Due Date:"}
                  </span>{" "}
                  <span className="font-semibold text-[#0E1B2E]">{formatDate(doc.dueDate)}</span>
                </p>
              )}
              {doc.referenceNumber && (
                <p>
                  <span className="text-slate-500 font-sans font-semibold">PO / Tender Ref:</span>{" "}
                  <span className="font-semibold text-[#0E1B2E]">{doc.referenceNumber}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address / Recipient Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Recipient / Client (Billed To)
            </span>
            <p className="font-black text-sm text-[#0E1B2E]">
              {client.companyName || client.name}
            </p>
            {client.companyName && client.name && (
              <p className="text-slate-600 font-medium">Attn: {client.name}</p>
            )}
            {client.address && <p className="text-slate-600">{client.address}</p>}
            {client.city && (
              <p className="text-slate-600">
                {client.city}, {client.province} {client.postalCode}
              </p>
            )}
            <p className="text-slate-600">{client.email} {client.phone ? `• ${client.phone}` : ""}</p>
            
            <div className="mt-2 space-y-0.5 text-[11px]">
              {client.vatNumber && (
                <p className="font-semibold text-[#0E1B2E]">
                  Client VAT No: <span className="font-mono">{client.vatNumber}</span>
                </p>
              )}
              {client.csdNumber && (
                <p className="font-semibold text-[#0E1B2E]">
                  Client CSD No: <span className="font-mono">{client.csdNumber}</span>
                </p>
              )}
            </div>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4 pt-3 sm:pt-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Payment & Supply Terms
            </span>
            <div className="text-[11px] text-slate-600 space-y-1">
              <p>
                <span className="font-semibold text-[#0E1B2E]">Currency:</span> South African Rand (ZAR)
              </p>
              <p>
                <span className="font-semibold text-[#0E1B2E]">Status:</span>{" "}
                <span className={`font-bold uppercase px-2 py-0.5 rounded text-[10px] ${
                  doc.status === "PAID" ? "bg-emerald-100 text-emerald-800" :
                  doc.status === "OVERDUE" ? "bg-rose-100 text-rose-800" :
                  doc.status === "ACCEPTED" ? "bg-blue-100 text-blue-800" :
                  "bg-amber-100 text-amber-800"
                }`}>
                  {doc.status}
                </span>
              </p>
              <p>
                <span className="font-semibold text-[#0E1B2E]">Due Date:</span>{" "}
                {doc.dueDate ? formatDate(doc.dueDate) : "Payable on receipt"}
              </p>
              <p className="italic text-slate-500 text-[10px]">
                Payment reference must clearly reflect invoice number <span className="font-mono font-bold text-[#0E1B2E]">{doc.number}</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0E1B2E] text-white text-[11px]">
                <th className="py-2.5 px-3 font-bold w-10 text-center">#</th>
                <th className="py-2.5 px-3 font-bold">Item Description / Deliverable</th>
                <th className="py-2.5 px-3 font-bold text-right w-16">Qty</th>
                <th className="py-2.5 px-3 font-bold text-right w-28">Rate (Excl.)</th>
                <th className="py-2.5 px-3 font-bold text-right w-20">VAT %</th>
                <th className="py-2.5 px-3 font-bold text-right w-32">Total (Excl.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {doc.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                    No line items added yet.
                  </td>
                </tr>
              ) : (
                doc.items.map((item, idx) => {
                  const qty = item.quantity || 1;
                  const price = item.unitPrice || 0;
                  const lineSubtotal = qty * price;
                  return (
                    <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                      <td className="py-3 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-[#0E1B2E] leading-relaxed">
                        {item.description || "—"}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">{qty}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">{formatZAR(price)}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">{item.vatRate ?? 15}%</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#0E1B2E]">
                        {formatZAR(lineSubtotal)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Financial Breakdown & EFT Banking Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* EFT Banking Block (Crucial for SA procurement & tender validity) */}
          <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-[#FFF9E6] to-amber-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-amber-200/80 pb-2">
              <Landmark className="w-4 h-4 text-[#0E1B2E]" />
              <h4 className="font-extrabold text-xs text-[#0E1B2E] uppercase tracking-wider">
                Official Banking Confirmation (EFT)
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
              <span className="text-slate-500 font-semibold">Bank:</span>
              <span className="font-bold text-[#0E1B2E]">{company.bankName || "FNB"}</span>

              <span className="text-slate-500 font-semibold">Account Holder:</span>
              <span className="font-bold text-[#0E1B2E]">{company.accountHolder || company.name}</span>

              <span className="text-slate-500 font-semibold">Account Number:</span>
              <span className="font-mono font-black text-[#0E1B2E] text-xs">
                {company.accountNumber || "62891234567"}
              </span>

              <span className="text-slate-500 font-semibold">Branch Code:</span>
              <span className="font-mono font-bold text-[#0E1B2E]">{company.branchCode || "250655"}</span>

              <span className="text-slate-500 font-semibold">Account Type:</span>
              <span className="text-[#0E1B2E]">{company.accountType || "Business Cheque"}</span>

              <span className="text-slate-500 font-semibold">Payment Reference:</span>
              <span className="font-mono font-black text-[#0E1B2E] bg-[#FFC20E]/40 px-1.5 py-0.5 rounded">
                {doc.number}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 italic pt-1 border-t border-amber-200/60">
              * Email proof of payment (POP) to <span className="font-semibold text-[#0E1B2E]">{company.email}</span>
            </p>
          </div>

          {/* Totals Table */}
          <div className="space-y-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex justify-between text-slate-600 text-xs">
                <span>Subtotal (Exclusive of VAT):</span>
                <span className="font-bold font-mono text-[#0E1B2E]">{formatZAR(doc.subtotal)}</span>
              </div>

              {doc.discount > 0 && (
                <div className="flex justify-between text-rose-600 text-xs">
                  <span>Discount:</span>
                  <span className="font-bold font-mono">- {formatZAR(doc.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 text-xs">
                <span>Value Added Tax (SARS 15% Standard):</span>
                <span className="font-bold font-mono text-[#0E1B2E]">{formatZAR(doc.vatAmount)}</span>
              </div>

              <div className="border-t-2 border-[#0E1B2E] pt-2 flex justify-between items-baseline">
                <span className="text-xs font-black uppercase text-[#0E1B2E]">Total Consideration (ZAR):</span>
                <span className="text-base font-black font-mono text-[#0E1B2E]">
                  {formatZAR(doc.total)}
                </span>
              </div>
            </div>

            {/* Amount in words */}
            <div className="text-right text-[10px] text-slate-500 italic pr-1">
              {amountInWords(doc.total)}
            </div>
          </div>

        </div>

        {/* Quotation Acceptance or Terms & Conditions */}
        {isQuote ? (
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[#0E1B2E]">
                Client Acceptance & Authorization
              </span>
              <span className="text-[10px] text-slate-500">Sign & return copy to initiate work</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              We hereby accept this quotation ({doc.number}) and agree to the specified scope, pricing, and terms.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 text-[10px] text-slate-500">
              <div className="border-t border-slate-400 pt-1">
                Authorized Signature: _________________________________
              </div>
              <div className="border-t border-slate-400 pt-1">
                Date: ________________________
              </div>
            </div>
          </div>
        ) : (
          (doc.notes || doc.terms || company.defaultTerms) && (
            <div className="border-t border-slate-200 pt-3 space-y-1 text-[10px] text-slate-600 leading-relaxed">
              <span className="font-bold text-[#0E1B2E] block uppercase tracking-wider text-[9px]">
                Terms, Warranties & Conditions:
              </span>
              <p>{doc.notes}</p>
              <p>{doc.terms || company.defaultTerms || "Payment terms strictly 30 days from tax invoice date. Ownership of goods remains with supplier until full settlement."}</p>
            </div>
          )
        )}

        {/* Footer */}
        <div className="border-t border-slate-200 pt-4 text-center text-[9px] text-slate-400 space-y-0.5">
          <p className="font-semibold text-[#0E1B2E]">
            {company.name} | Proudly South African SMME Software by ZAInnovate Technologies (Pty) Ltd
          </p>
          <p>
            100% Black Youth-Owned • B-BBEE Level 1 Contributor • Reg No: 2024/098765/07 • Beacon Bay, East London, South Africa
          </p>
        </div>

      </div>
    </div>
  );
}
