import React from "react";
import { 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  FileCheck2, 
  Send, 
  Layers, 
  Receipt, 
  Clock, 
  CheckCircle,
  Building
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% SARS Tax Invoice Compliant",
    description: "Meets every requirement of SARS Section 20. Displays supplier and recipient 10-digit VAT numbers, sequential serials, and exact 15% VAT breakdowns.",
    badge: "SARS Standard",
  },
  {
    icon: Zap,
    title: "Instant 1-Click Quote-to-Invoice",
    description: "Generate beautiful quotes with 30-day validity and acceptance blocks. Once approved by your client, convert it into a Tax Invoice in a single click.",
    badge: "Speed",
  },
  {
    icon: CreditCard,
    title: "Paystack ZAR Gateway Built-in",
    description: "Give your clients a seamless way to pay instantly in Rands via Paystack card, Instant EFT, or QR without leaving the invoice.",
    badge: "Fast Settlement",
  },
  {
    icon: FileCheck2,
    title: "Delivery Notes & Purchase Orders",
    description: "Not just invoices! Generate accompanying Delivery Notes and Purchase Orders with unified company numbering and branding.",
    badge: "All-in-One",
  },
  {
    icon: Send,
    title: "One-Click Resend Email & PDF",
    description: "Email invoices directly to your clients with attached crystal-clear vector PDFs. Know when documents are sent and received.",
    badge: "Resend API",
  },
  {
    icon: Clock,
    title: "Overdue Reminders & Cash Flow Tracking",
    description: "Visual dashboards highlight overdue invoices before they hurt your business cash flow. Track paid, pending, and overdue at a glance.",
    badge: "Cash Flow",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-slate-900/60 border-t border-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC20E]/10 border border-[#FFC20E]/30 text-xs font-bold text-[#FFC20E] uppercase tracking-wider">
            Engineered for Mzansi SMMEs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything your business needs to get paid faster.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Stop struggling with outdated Excel templates, broken word docs, and manual VAT calculations. QuoteForge gives South African businesses an enterprise-grade invoicing edge.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-slate-800 bg-[#0E1B2E]/70 p-6 hover:border-[#FFC20E]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFC20E]/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#FFC20E] group-hover:bg-[#FFC20E] group-hover:text-[#0E1B2E] transition-all">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFC20E] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-[#FFC20E]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>SARS Compliant Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* B-BBEE and Local pride banner */}
        <div id="about" className="mt-16 rounded-2xl bg-gradient-to-r from-[#0E1B2E] via-slate-900 to-[#0E1B2E] border border-amber-500/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FFC20E]" />
              <h4 className="text-lg font-bold text-white">Proudly Developed by ZAInnovate Technologies</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Based in East London, Eastern Cape, ZAInnovate Technologies (Pty) Ltd is a 100% Black Youth-Owned, B-BBEE Level 1 enterprise empowering African entrepreneurs with high-velocity digital tools.
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="inline-block bg-[#FFC20E] text-[#0E1B2E] font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-md">
              Level 1 B-BBEE Contributor
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
