"use client";

import React from "react";
import Link from "next/link";
import { 
  PlusCircle, 
  FileText, 
  UserPlus, 
  ShieldCheck, 
  Download, 
  ArrowUpRight,
  Receipt
} from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "New Tax Invoice",
      desc: "SARS 15% VAT compliant with sequential number",
      href: "/dashboard/documents/new?type=INVOICE",
      icon: Receipt,
      accent: "bg-[#FFC20E] text-[#0E1B2E]",
      border: "hover:border-[#FFC20E]",
    },
    {
      title: "New Quotation",
      desc: "30-day validity with acceptance signature block",
      href: "/dashboard/documents/new?type=QUOTE",
      icon: FileText,
      accent: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
      border: "hover:border-cyan-500/50",
    },
    {
      title: "Add Client",
      desc: "Save client VAT, CSD and contact info",
      href: "/dashboard/clients",
      icon: UserPlus,
      accent: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      border: "hover:border-purple-500/50",
    },
    {
      title: "Bank Confirmation",
      desc: "Configure FNB, Capitec or Standard Bank details",
      href: "/dashboard/settings",
      icon: ShieldCheck,
      accent: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      border: "hover:border-emerald-500/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act, i) => (
        <Link
          key={i}
          href={act.href}
          className={`group rounded-2xl bg-slate-900/80 border border-slate-800 p-4 transition-all duration-200 hover:shadow-lg ${act.border} flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${act.accent}`}>
                <act.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#FFC20E] transition-colors">
              {act.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{act.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
