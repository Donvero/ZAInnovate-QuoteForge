"use client";

import React from "react";
import { formatZAR } from "@/lib/currency";
import { TrendingUp, ArrowUpRight, DollarSign, Clock, CheckCircle } from "lucide-react";

interface RevenueMetrics {
  collectedThisMonth: number;
  pendingTotal: number;
  overdueTotal: number;
  quotesPipeline: number;
}

export function RevenueChart({
  metrics = {
    collectedThisMonth: 84500,
    pendingTotal: 32400,
    overdueTotal: 14200,
    quotesPipeline: 118000,
  },
}: {
  metrics?: RevenueMetrics;
}) {
  const months = [
    { name: "Jun", paid: 42000, target: 50000, pct: 84 },
    { name: "Jul", paid: 56000, target: 55000, pct: 100 },
    { name: "Aug", paid: 68500, target: 60000, pct: 100 },
    { name: "Sep", paid: 71000, target: 70000, pct: 100 },
    { name: "Oct", paid: 84500, target: 80000, pct: 100 },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Monthly Cash Flow & Revenue</h3>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3 h-3" /> +19% vs Sep
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track paid tax invoices, pending client transfers, and active quotations.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Collected (Oct 2026)
          </span>
          <span className="text-2xl font-black text-[#FFC20E] font-mono">
            {formatZAR(metrics.collectedThisMonth)}
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Paid / Collected */}
        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Paid Invoices
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Settled
            </span>
          </div>
          <div className="text-lg font-black font-mono text-white mt-2">
            {formatZAR(metrics.collectedThisMonth)}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">FNB & Paystack settled transactions</p>
        </div>

        {/* Pending Invoices */}
        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Pending Invoices
            </span>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
              Awaiting
            </span>
          </div>
          <div className="text-lg font-black font-mono text-white mt-2">
            {formatZAR(metrics.pendingTotal)}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Within standard credit payment terms</p>
        </div>

        {/* Quotes Pipeline */}
        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-[#FFC20E]" /> Active Quotes Pipeline
            </span>
            <span className="text-[10px] font-bold text-[#FFC20E] bg-[#FFC20E]/10 px-1.5 py-0.5 rounded">
              Quotes
            </span>
          </div>
          <div className="text-lg font-black font-mono text-[#FFC20E] mt-2">
            {formatZAR(metrics.quotesPipeline)}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Potential deals ready for conversion</p>
        </div>

      </div>

      {/* Visual Bar Progression */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Monthly Settlement Performance
        </h4>
        <div className="space-y-3">
          {months.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">{m.name} 2026</span>
                <span className="font-mono text-slate-300">
                  {formatZAR(m.paid)} / <span className="text-slate-500">{formatZAR(m.target)}</span>
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#FFC20E] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (m.paid / m.target) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
