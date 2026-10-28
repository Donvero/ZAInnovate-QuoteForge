"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DocumentData, DocumentType, DocumentStatus } from "@/types";
import { formatZAR } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  Repeat
} from "lucide-react";

interface DocumentTableProps {
  documents: DocumentData[];
  onMarkPaid?: (id: string) => void;
  onConvertToInvoice?: (id: string) => void;
}

export function DocumentTable({
  documents,
  onMarkPaid,
  onConvertToInvoice,
}: DocumentTableProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Type match
      if (selectedType !== "ALL" && doc.type !== selectedType) {
        return false;
      }
      // Status match
      if (selectedStatus !== "ALL" && doc.status !== selectedStatus) {
        return false;
      }
      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const clientName = doc.client?.companyName?.toLowerCase() || doc.client?.name.toLowerCase() || "";
        const docNum = doc.number.toLowerCase();
        const ref = doc.referenceNumber?.toLowerCase() || "";
        return clientName.includes(q) || docNum.includes(q) || ref.includes(q);
      }
      return true;
    });
  }, [documents, selectedType, selectedStatus, search]);

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Paid
          </span>
        );
      case "OVERDUE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" /> Overdue
          </span>
        );
      case "SENT":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Clock className="w-3 h-3" /> Sent
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-[#FFC20E] border border-amber-500/20">
            <CheckCircle className="w-3 h-3" /> Accepted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400 border border-slate-700">
            Draft
          </span>
        );
    }
  };

  const getTypeBadge = (type: DocumentType) => {
    switch (type) {
      case "INVOICE":
        return <span className="text-[#FFC20E] font-bold">Tax Invoice</span>;
      case "QUOTE":
        return <span className="text-cyan-400 font-bold">Quotation</span>;
      case "DELIVERY_NOTE":
        return <span className="text-purple-400 font-bold">Delivery Note</span>;
      case "PURCHASE_ORDER":
        return <span className="text-emerald-400 font-bold">Purchase Order</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, number (e.g. INV-1042), PO ref..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC20E]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="ALL">All Document Types</option>
            <option value="INVOICE">Tax Invoices</option>
            <option value="QUOTE">Quotations</option>
            <option value="DELIVERY_NOTE">Delivery Notes</option>
            <option value="PURCHASE_ORDER">Purchase Orders</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0E1B2E] text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Document</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-right">Total (Incl. VAT)</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#FFC20E]" />
                    <p className="text-sm font-semibold text-slate-400">No documents found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting your search criteria or create a new quote or invoice.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                    {/* Document Number & PO */}
                    <td className="py-3 px-4 font-medium text-white">
                      <Link
                        href={`/dashboard/documents/${doc.id}`}
                        className="font-mono font-bold hover:text-[#FFC20E] transition-colors"
                      >
                        {doc.number}
                      </Link>
                      {doc.referenceNumber && (
                        <span className="block text-[10px] text-slate-500 font-mono">
                          Ref: {doc.referenceNumber}
                        </span>
                      )}
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4">{getTypeBadge(doc.type)}</td>

                    {/* Client */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">
                        {doc.client?.companyName || doc.client?.name}
                      </div>
                      <span className="text-[10px] text-slate-500">{doc.client?.email}</span>
                    </td>

                    {/* Dates */}
                    <td className="py-3 px-4 font-mono text-slate-400">{formatDate(doc.date)}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {doc.dueDate ? formatDate(doc.dueDate) : "—"}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      {formatZAR(doc.total)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 text-center">{getStatusBadge(doc.status)}</td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/documents/${doc.id}`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        
                        {/* Quote to invoice conversion shortcut */}
                        {doc.type === "QUOTE" && onConvertToInvoice && (
                          <button
                            onClick={() => onConvertToInvoice(doc.id)}
                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#FFC20E] transition-colors"
                            title="Convert to Tax Invoice"
                          >
                            <Repeat className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Mark Paid Shortcut */}
                        {doc.type === "INVOICE" && doc.status !== "PAID" && onMarkPaid && (
                          <button
                            onClick={() => onMarkPaid(doc.id)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="bg-[#0E1B2E]/60 border-t border-slate-800 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
          <span className="font-semibold text-slate-300">
            Total Value:{" "}
            <span className="text-[#FFC20E] font-mono">
              {formatZAR(filteredDocuments.reduce((acc, d) => acc + d.total, 0))}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
