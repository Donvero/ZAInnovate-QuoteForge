"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  CreditCard,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Company Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-[#0E1B2E] text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between hidden md:flex">
      <div className="p-4 space-y-6">
        {/* Quick Action Button */}
        <div>
          <Link
            href="/dashboard/documents/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#FFC20E] text-[#0E1B2E] font-bold text-sm shadow-md shadow-[#FFC20E]/20 hover:bg-amber-400 transition-all group"
          >
            <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90" />
            Create Document
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Main Menu
          </div>
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-slate-800 text-[#FFC20E] font-semibold border-l-4 border-[#FFC20E]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-[#FFC20E]" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick SARS status info */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SARS 15% VAT Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Invoices and quotations formatted strictly under SARS Section 20 tax requirements.
          </p>
        </div>
      </div>

      {/* ZAInnovate Brand Badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#0E1B2E] border border-amber-500/30 flex items-center justify-center text-[#FFC20E] font-extrabold text-xs">
            ZA
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-tight">
              ZAInnovate Technologies
            </span>
            <span className="text-[10px] text-[#FFC20E] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> B-BBEE Level 1 • East London
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
