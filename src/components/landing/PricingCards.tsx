"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/paystack";

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="py-20 bg-[#0E1B2E] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC20E]/10 border border-[#FFC20E]/30 text-xs font-bold text-[#FFC20E] uppercase tracking-wider">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simple plans tailored for South African SMMEs
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Start for free, then upgrade seamlessly with Paystack as your business scales. Cancel anytime with zero lock-in.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* FREE PLAN */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">{PRICING_PLANS.FREE.name}</h3>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                  Free Forever
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">{PRICING_PLANS.FREE.description}</p>
              
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">R0</span>
                <span className="text-slate-400 text-xs ml-2">/ month</span>
                <p className="text-xs text-[#FFC20E] font-medium mt-1">Includes 5 documents monthly</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                {PRICING_PLANS.FREE.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#FFC20E] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                href="/dashboard/documents/new"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 text-sm transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* PRO PLAN - Highlighted */}
          <div className="relative rounded-2xl border-2 border-[#FFC20E] bg-gradient-to-b from-slate-900 via-[#0E1B2E] to-slate-900 p-8 flex flex-col justify-between shadow-2xl shadow-[#FFC20E]/10 hover:shadow-[#FFC20E]/20 transition-all scale-100 lg:scale-105 z-10">
            {/* Popular Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFC20E] text-[#0E1B2E] font-extrabold text-[11px] tracking-wider uppercase px-4 py-1 rounded-full shadow-md">
              Most Popular SMME Choice
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h3 className="text-xl font-extrabold text-white">{PRICING_PLANS.PRO.name}</h3>
                <span className="text-[11px] font-bold text-[#FFC20E] bg-[#FFC20E]/10 px-2.5 py-1 rounded-full border border-[#FFC20E]/30">
                  Unlimited
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6">{PRICING_PLANS.PRO.description}</p>
              
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">R49</span>
                <span className="text-slate-400 text-xs ml-2">/ month</span>
                <p className="text-xs text-[#FFC20E] font-medium mt-1">Billed monthly via Paystack</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                {PRICING_PLANS.PRO.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#FFC20E] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                href="/dashboard/billing"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] font-black py-3 px-4 text-sm transition-all shadow-lg shadow-[#FFC20E]/25"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro (R49/mo)
              </Link>
            </div>
          </div>

          {/* BUSINESS PLAN */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">{PRICING_PLANS.BUSINESS.name}</h3>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  Teams & Scale
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">{PRICING_PLANS.BUSINESS.description}</p>
              
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">R149</span>
                <span className="text-slate-400 text-xs ml-2">/ month</span>
                <p className="text-xs text-[#FFC20E] font-medium mt-1">Multi-user & automated recurring</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                {PRICING_PLANS.BUSINESS.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#FFC20E] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                href="/dashboard/billing"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 text-sm transition-all"
              >
                Choose Business Suite
              </Link>
            </div>
          </div>

        </div>

        {/* Security / SARS guarantee note */}
        <div className="mt-14 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>All plans come with full SARS Section 20 compliance. 256-bit encryption. Cancel anytime.</span>
        </div>

      </div>
    </section>
  );
}
