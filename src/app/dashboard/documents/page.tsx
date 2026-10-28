"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DocumentTable } from "@/components/documents/DocumentTable";
import { DocumentData } from "@/types";
import { PlusCircle, FileText, Receipt, Sparkles, Filter } from "lucide-react";

const INITIAL_DOCUMENTS: DocumentData[] = [
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
      csdNumber: "MAAA0938472",
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
      csdNumber: "MAAA0458123",
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
      csdNumber: "MAAA0192847",
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
  {
    id: "doc_5",
    companyId: "comp_1",
    clientId: "cl_2",
    client: {
      id: "cl_2",
      name: "Anathi Gqirana",
      companyName: "Amathole Logistics & Projects",
      email: "agqirana@amatholelogistics.co.za",
    },
    type: "DELIVERY_NOTE",
    status: "SENT",
    number: "DN-2026-1008",
    referenceNumber: "DEL-881",
    date: "2026-10-20",
    subtotal: 12500,
    vatAmount: 1875,
    discount: 0,
    total: 14375,
    amountPaid: 0,
    balanceDue: 14375,
    items: [
      {
        description: "Zebra Barcode Handheld Terminals (5 Units)",
        quantity: 5,
        unitPrice: 2500,
        vatRate: 15,
        total: 14375,
      },
    ],
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentData[]>(INITIAL_DOCUMENTS);

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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Documents</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your SARS tax invoices, official quotations, delivery notes, and purchase orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/documents/new?type=QUOTE"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            New Quote
          </Link>
          <Link
            href="/dashboard/documents/new?type=INVOICE"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
          >
            <Receipt className="w-4 h-4 text-[#0E1B2E]" />
            New Tax Invoice
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <DocumentTable
        documents={documents}
        onMarkPaid={handleMarkPaid}
        onConvertToInvoice={handleConvertToInvoice}
      />

    </div>
  );
}
