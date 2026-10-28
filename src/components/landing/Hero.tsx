"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Zap, 
  CreditCard,
  Building2,
  Sparkles
} from "lucide-react";
import { formatZAR } from "@/lib/currency";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0E1B2E] via-[#0E1B2E] to-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC20E]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 border border-amber-500/30 px-3.5 py-1.5 text-xs text-slate-300 shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-[#FFC20E]" />
            <span className="font-semibold text-[#FFC20E]">ZAInnovate Technologies</span>
            <span className="text-slate-500">•</span>
            <span>100% Black Youth-Owned • B-BBEE Level 1</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Professional quotes & <br className="hidden sm:inline" />
            invoices in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC20E] via-amber-300 to-amber-500">seconds</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            The all-in-one quotation and SARS-compliant tax invoice platform built specifically for South African SMMEs, contractors, and entrepreneurs.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/dashboard/documents/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#FFC20E] px-7 py-3.5 text-base font-bold text-[#0E1B2E] hover:bg-amber-400 transition-all shadow-lg shadow-[#FFC20E]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-[#0E1B2E]" />
              Create Free Quote / Invoice
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/90 border border-slate-700 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Live Demo Dashboard
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Feature checklist */}
          <div className="pt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFC20E]" /> SARS 15% VAT Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFC20E]" /> Paystack ZAR Payments
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFC20E]" /> Free 5 Documents / Month
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFC20E]" /> Instant PDF & Email
            </span>
          </div>

          {/* Mock Document Visual Teaser */}
          <div className="pt-10 w-full max-w-4xl">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-3 sm:p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-slate-400 hidden sm:inline">quoteforge.co.za/tax-invoice-builder</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-400 font-medium px-2 py-0.5 rounded text-[11px]">
                    SARS Validated
                  </span>
                </div>
              </div>

              {/* Realistic Tax Invoice Preview Inside Browser Window */}
              <div className="bg-white text-slate-900 rounded-xl p-5 sm:p-8 shadow-inner text-left text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-5 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-[#0E1B2E] text-[#FFC20E] flex items-center justify-center font-bold text-xs">
                        ZA
                      </div>
                      <span className="font-extrabold text-base sm:text-lg text-[#0E1B2E]">
                        ZAInnovate Technologies (Pty) Ltd
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">Reg No: 2024/098765/07 | VAT No: 4190283746</p>
                    <p className="text-slate-500 text-xs">Beacon Bay, East London, 5241</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-block bg-[#0E1B2E] text-white font-bold text-xs px-2.5 py-1 rounded">
                      TAX INVOICE
                    </span>
                    <p className="font-mono font-bold text-base text-[#0E1B2E] mt-1">INV-2026-1042</p>
                    <p className="text-xs text-slate-500">Date: 28 Oct 2026 | Due: 28 Nov 2026</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Billed To</span>
                    <p className="font-bold text-slate-900 mt-0.5">Khumalo Logistics & Transport (Pty) Ltd</p>
                    <p className="text-slate-600">VAT No: 4900123456</p>
                    <p className="text-slate-600">Sandton, Johannesburg</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Payment Method</span>
                    <p className="font-bold text-slate-900 mt-0.5">FNB EFT / Paystack Direct</p>
                    <p className="text-slate-600">Account: 62891234567 | Branch: 250655</p>
                  </div>
                </div>

                {/* Table snippet */}
                <div className="overflow-x-auto border rounded-lg border-slate-200 mt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0E1B2E] text-white">
                      <tr>
                        <th className="py-2 px-3">Description</th>
                        <th className="py-2 px-3 text-right">Qty</th>
                        <th className="py-2 px-3 text-right">Unit Price</th>
                        <th className="py-2 px-3 text-right">VAT (15%)</th>
                        <th className="py-2 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-3 font-medium">Enterprise Web App & Cloud Setup</td>
                        <td className="py-2.5 px-3 text-right">1</td>
                        <td className="py-2.5 px-3 text-right">{formatZAR(18500)}</td>
                        <td className="py-2.5 px-3 text-right">{formatZAR(2775)}</td>
                        <td className="py-2.5 px-3 text-right font-bold">{formatZAR(21275)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Subtotals & Total */}
                <div className="flex justify-end pt-4">
                  <div className="w-full max-w-xs space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal (Excl. VAT):</span>
                      <span className="font-semibold">{formatZAR(18500)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>VAT @ 15%:</span>
                      <span className="font-semibold">{formatZAR(2775)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-1.5 text-sm font-extrabold text-[#0E1B2E]">
                      <span>Total Due (ZAR):</span>
                      <span className="text-[#0E1B2E] font-black">{formatZAR(21275)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
