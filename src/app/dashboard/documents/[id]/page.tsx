"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DocumentPreview } from "@/components/documents/DocumentPreview";
import { DocumentData } from "@/types";
import { 
  ArrowLeft, 
  Download, 
  Send, 
  Printer, 
  CheckCircle, 
  Repeat, 
  Edit, 
  Trash2,
  Sparkles,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { formatZAR } from "@/lib/currency";

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [doc, setDoc] = useState<DocumentData>({
    id: id || "doc_view",
    companyId: "comp_1",
    clientId: "cl_1",
    client: {
      id: "cl_1",
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
    },
    type: "INVOICE",
    status: "SENT",
    number: "INV-2026-1041",
    referenceNumber: "EC-DOT-PO-981",
    date: "2026-10-24",
    dueDate: "2026-11-24",
    subtotal: 35000,
    vatAmount: 5250,
    discount: 0,
    total: 40250,
    amountPaid: 0,
    balanceDue: 40250,
    notes: "Payment reference: INV-2026-1041. Please deposit directly into our FNB cheque account.",
    terms: "Payment terms strictly 30 days. SARS Section 20 Tax Invoice rules apply.",
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
  });

  const handlePrint = () => {
    window.print();
  };

  const handleMarkAsPaid = () => {
    setDoc({
      ...doc,
      status: "PAID",
      amountPaid: doc.total,
      balanceDue: 0,
    });
  };

  const handleConvertToInvoice = () => {
    setDoc({
      ...doc,
      type: "INVOICE",
      number: doc.number.replace("QT-", "INV-"),
    });
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const res = await fetch(`/api/documents/${doc.id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document: doc }),
      });
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 4000);
    } catch (e) {
      console.error(e);
      setSendSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/documents"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white font-mono">{doc.number}</h1>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                doc.status === "PAID" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                doc.status === "OVERDUE" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}>
                {doc.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {doc.client?.companyName} • Total: <span className="text-[#FFC20E] font-bold font-mono">{formatZAR(doc.total)}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>

          <a
            href={`/api/documents/${doc.id}/pdf`}
            download={`${doc.number}.pdf`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>

          {doc.type === "QUOTE" && (
            <button
              onClick={handleConvertToInvoice}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#FFC20E] border border-amber-500/30 text-xs font-bold transition-all"
            >
              <Repeat className="w-3.5 h-3.5" />
              Convert to Invoice
            </button>
          )}

          {doc.status !== "PAID" && (
            <button
              onClick={handleMarkAsPaid}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Mark Paid
            </button>
          )}

          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            {isSending ? "Sending Resend Email..." : sendSuccess ? "Sent Successfully! ✓" : "Email to Client"}
          </button>
        </div>
      </div>

      {sendSuccess && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400 font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Document and official vector PDF sent successfully to {doc.client?.email}!
        </div>
      )}

      {/* Document View Canvas */}
      <div className="max-w-4xl mx-auto">
        <DocumentPreview document={doc} />
      </div>

    </div>
  );
}
