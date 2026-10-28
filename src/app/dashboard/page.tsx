"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OverdueAlert } from "@/components/dashboard/OverdueAlert";
import { DocumentTable } from "@/components/documents/DocumentTable";
import { DocumentData } from "@/types";
import { 
  PlusCircle, 
  FileText, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Receipt
} from "lucide-react";
import { formatZAR } from "@/lib/currency";

const MOCK_RECENT_DOCS: DocumentData[] = [
  {
    id: "doc_1",
    companyId: "comp_1",
    clientId: "cl_1",
    client: {
      id: "cl_1",
      name: "Siphesihle Ndlovu",
      companyName: "Eastern Cape Infrastructure Services",
      email: "sndlovu@ecis.co.za",
      vatNumber: "4820194857",
    },
    type: "INVOICE",
    status: "PAID",
    number: "INV-2026-1041",
    referenceNumber: "EC-DOT-PO-981",
    date: "2026-10-24",
    dueDate: "2026-11-24",
    subtotal: 35000,
    vatAmount: 5250,
    discount: 0,
    total: 40250,
    amountPaid: 40250,
    balanceDue: 0,
    items: [
      {
        description: "Provincial Highway Fleet Telemetry Software",
        quantity: 1,
        unitPrice: 35000,
        vatRate: 15,
        total: 40250,
      },
    ],
  },
  {
    id: "doc_2",
    companyId: "comp_1",
    clientId: "cl_2",
    client: {
      id: "cl_2",
      name: "Anathi Gqirana",
      companyName: "Amathole Logistics & Projects",
      email: "agqirana@amatholelogistics.co.za",
      vatNumber: "4710293849",
    },
    type: "INVOICE",
    status: "OVERDUE",
    number: "INV-2026-1040",
    referenceNumber: "PO-AMATH-884",
    date: "2026-09-15",
    dueDate: "2026-10-15",
    subtotal: 18000,
    vatAmount: 2700,
    discount: 0,
    total: 20700,
    amountPaid: 0,
    balanceDue: 20700,
    items: [
      {
        description: "Warehouse Inventory Barcode Integration & Scanner Config",
        quantity: 1,
        unitPrice: 18000,
        vatRate: 15,
        total: 20700,
      },
    ],
  },
  {
    id: "doc_3",
    companyId: "comp_1",
    clientId: "cl_3",
    client: {
      id: "cl_3",
      name: "Dr. Lindiwe Mthembu",
      companyName: "Buffalo City Health Diagnostics",
      email: "procurement@bchealth.co.za",
      vatNumber: "4392019284",
    },
    type: "QUOTE",
    status: "SENT",
    number: "QT-2026-1043",
    referenceNumber: "RFQ-MED-2026",
    date: "2026-10-26",
    dueDate: "2026-11-26",
    subtotal: 62000,
    vatAmount: 9300,
    discount: 0,
    total: 71300,
    amountPaid: 0,
    balanceDue: 71300,
    items: [
      {
        description: "Patient Appointment Scheduling & SMS Gateway App",
        quantity: 1,
        unitPrice: 62000,
        vatRate: 15,
        total: 71300,
      },
    ],
  },
  {
    id: "doc_4",
    companyId: "comp_1",
    clientId: "cl_1",
    client: {
      id: "cl_1",
      name: "Siphesihle Ndlovu",
      companyName: "Eastern Cape Infrastructure Services",
      email: "sndlovu@ecis.co.za",
      vatNumber: "4820194857",
    },
    type: "QUOTE",
    status: "ACCEPTED",
    number: "QT-2026-1039",
    date: "2026-10-18",
    dueDate: "2026-11-18",
    subtotal: 45000,
    vatAmount: 6750,
    discount: 0,
    total: 51750,
    amountPaid: 0,
    balanceDue: 51750,
    items: [
      {
        description: "Infrastructure Monitoring Sensor Cloud Dashboard",
        quantity: 1,
        unitPrice: 45000,
        vatRate: 15,
        total: 51750,
      },
    ],
  },
];

export default function DashboardPage() {
  const [documents, setDocuments] = useState<DocumentData[]>(MOCK_RECENT_DOCS);

  const handleMarkPaid = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "PAID", balanceDue: 0, amountPaid: d.total } : d))
    );
  };

  const handleConvertToInvoice = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              type: "INVOICE",
              status: "SENT",
              number: d.number.replace("QT-", "INV-"),
            }
          : d
      )
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Sipho! 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
            <span>ZAInnovate Technologies (Pty) Ltd</span>
            <span>•</span>
            <span className="text-[#FFC20E] font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> B-BBEE Level 1 Contributor
            </span>
            <span>•</span>
            <span className="text-slate-400">East London, SA</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/documents/new?type=QUOTE"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            New Quote
          </Link>
          <Link
            href="/dashboard/documents/new?type=INVOICE"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
          >
            <Receipt className="w-4 h-4 text-[#0E1B2E]" />
            New Tax Invoice
          </Link>
        </div>
      </div>

      {/* Overdue Invoices Alert */}
      <OverdueAlert overdueCount={1} overdueAmount={20700} />

      {/* Quick Actions Shortcuts */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Instant Actions
        </h3>
        <QuickActions />
      </div>

      {/* Revenue Performance & Breakdown */}
      <RevenueChart />

      {/* Recent Documents Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Documents</h3>
            <p className="text-xs text-slate-400">Your latest quotations and tax invoices</p>
          </div>
          <Link
            href="/dashboard/documents"
            className="text-xs font-bold text-[#FFC20E] hover:underline flex items-center gap-1"
          >
            View all documents
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <DocumentTable
          documents={documents}
          onMarkPaid={handleMarkPaid}
          onConvertToInvoice={handleConvertToInvoice}
        />
      </div>

    </div>
  );
}
