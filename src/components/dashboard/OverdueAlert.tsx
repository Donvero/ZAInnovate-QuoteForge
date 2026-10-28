"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Clock, Send } from "lucide-react";
import { formatZAR } from "@/lib/currency";

interface OverdueAlertProps {
  overdueCount: number;
  overdueAmount: number;
}

export function OverdueAlert({ overdueCount, overdueAmount }: OverdueAlertProps) {
  if (overdueCount === 0) return null;

  return (
    <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">
              {overdueCount} {overdueCount === 1 ? "Invoice is" : "Invoices are"} currently overdue!
            </h4>
            <span className="text-[10px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Total of <span className="font-bold text-rose-300 font-mono">{formatZAR(overdueAmount)}</span> past standard payment terms. Send automated reminder emails to collect.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Link
          href="/dashboard/documents?status=OVERDUE"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
        >
          <Clock className="w-3.5 h-3.5" />
          Review Overdue Invoices
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
