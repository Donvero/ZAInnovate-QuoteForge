import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PricingCards } from "@/components/landing/PricingCards";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Building2, 
  FileCheck,
  TrendingUp,
  Receipt
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* SARS Compliance Banner / Section */}
        <section id="sars-compliance" className="py-16 bg-[#0E1B2E] border-y border-slate-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-[#0E1B2E] to-slate-900 border border-[#FFC20E]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-[#FFC20E]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> SARS Section 20 Certified
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Never worry about SARS tax invoice compliance again.
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Under the South African Value-Added Tax Act No. 89 of 1991, every tax invoice must strictly contain key statutory elements. QuoteForge enforces every single rule automatically:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>Prominent TAX INVOICE heading</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>Supplier & client 10-digit VAT numbers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>Sequential non-repeating serials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>Accurate 15% VAT breakdown</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>Full physical address & contact info</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                      <span>National Treasury CSD references</span>
                    </li>
                  </ul>
                </div>

                <div className="flex-shrink-0 text-center sm:text-right">
                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-3">
                    <Receipt className="w-10 h-10 text-[#FFC20E] mx-auto sm:ml-auto" />
                    <div className="text-3xl font-black text-white">15%</div>
                    <div className="text-xs font-semibold text-slate-400">SA Standard VAT Rate</div>
                    <Link
                      href="/dashboard/documents/new"
                      className="block text-xs font-bold text-[#0E1B2E] bg-[#FFC20E] hover:bg-amber-400 py-2.5 px-4 rounded-xl transition-all shadow-md"
                    >
                      Build SARS Invoice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Pricing Section */}
        <PricingCards />

        {/* Final CTA Banner */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-[#08101C] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#0E1B2E] via-slate-900 to-[#0E1B2E] border border-amber-500/30 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC20E]/10 border border-[#FFC20E]/30 text-xs font-bold text-[#FFC20E]">
                <Sparkles className="w-3.5 h-3.5" /> Ready in 60 Seconds
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Send your first professional quote or invoice today.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Join hundreds of forward-thinking South African contractors, consultants, and SMMEs who get paid faster with QuoteForge.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/dashboard/documents/new"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC20E] px-8 py-4 text-base font-black text-[#0E1B2E] hover:bg-amber-400 transition-all shadow-xl shadow-[#FFC20E]/20"
                >
                  <Sparkles className="w-5 h-5 text-[#0E1B2E]" />
                  Start Creating Free
                </Link>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-6 py-4 text-sm font-bold text-white transition-all border border-slate-700"
                >
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
