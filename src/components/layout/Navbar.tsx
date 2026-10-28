"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  PlusCircle, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0E1B2E]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0E1B2E]/80 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href={isDashboard ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFC20E] to-amber-500 shadow-md shadow-[#FFC20E]/20 transition-transform group-hover:scale-105">
            <FileText className="h-5 w-5 text-[#0E1B2E]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Quote<span className="text-[#FFC20E]">Forge</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-1">
              by ZAInnovate
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {!isDashboard ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-slate-300 hover:text-[#FFC20E] transition-colors">
              Features
            </Link>
            <Link href="#sars-compliance" className="text-slate-300 hover:text-[#FFC20E] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SARS Compliance
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-[#FFC20E] transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-slate-300 hover:text-[#FFC20E] transition-colors">
              About ZAInnovate
            </Link>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Pro Plan (Active)
            </div>
            <Link
              href="/dashboard/documents/new"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFC20E] px-4 py-2 text-sm font-bold text-[#0E1B2E] hover:bg-amber-400 transition-all shadow-sm shadow-[#FFC20E]/20"
            >
              <PlusCircle className="h-4 w-4" />
              Create Document
            </Link>
          </div>
        )}

        {/* Right CTA / Actions */}
        <div className="flex items-center gap-3">
          {!isDashboard ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFC20E] px-4 py-2 text-sm font-bold text-[#0E1B2E] hover:bg-amber-400 transition-all shadow-md shadow-[#FFC20E]/20"
              >
                <Sparkles className="h-4 w-4" />
                Start Free
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/dashboard/documents/new"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-[#FFC20E] text-[#0E1B2E]"
                title="Create Document"
              >
                <PlusCircle className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-800">
                <div className="flex flex-col text-right hidden sm:block">
                  <span className="text-xs font-semibold text-white">Sipho Khumalo</span>
                  <span className="text-[10px] text-slate-400">ZAInnovate Technologies</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-sm font-bold">
                  SK
                </div>
              </div>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0E1B2E] px-4 pt-2 pb-6 space-y-3">
          {!isDashboard ? (
            <>
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-slate-300 hover:text-[#FFC20E]"
              >
                Features
              </Link>
              <Link
                href="#sars-compliance"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-slate-300 hover:text-[#FFC20E]"
              >
                SARS Compliance
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-slate-300 hover:text-[#FFC20E]"
              >
                Pricing Plans
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-slate-300 hover:text-[#FFC20E]"
              >
                About ZAInnovate
              </Link>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC20E] px-4 py-2.5 text-sm font-bold text-[#0E1B2E]"
                >
                  Go to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Dashboard Overview
              </Link>
              <Link
                href="/dashboard/documents"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Documents (Quotes & Invoices)
              </Link>
              <Link
                href="/dashboard/clients"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Clients Directory
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Company Settings
              </Link>
              <Link
                href="/dashboard/billing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Subscription & Paystack
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
