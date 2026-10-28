"use client";

import React, { useState } from "react";
import { PRICING_PLANS } from "@/lib/paystack";
import { SubscriptionPlan } from "@/types";
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Receipt, 
  AlertCircle,
  ExternalLink,
  Award
} from "lucide-react";
import { formatZAR } from "@/lib/currency";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>("PRO");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleUpgrade = async (planKey: SubscriptionPlan) => {
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/webhooks/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "initialize_subscription",
          plan: planKey,
          email: "invoicing@zainnovate.co.za",
        }),
      });
      const data = await res.json();
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        // Fallback simulated success
        setCurrentPlan(planKey);
        setCheckoutSuccess(true);
        setTimeout(() => setCheckoutSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
      setCurrentPlan(planKey);
      setCheckoutSuccess(true);
      setTimeout(() => setCheckoutSuccess(false), 5000);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Subscription & Billing</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your QuoteForge plan, Paystack recurring card debit, and usage allowance.
        </p>
      </div>

      {checkoutSuccess && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs text-emerald-400 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Subscription updated! You are now subscribed to the {currentPlan} plan via Paystack.
        </div>
      )}

      {/* Current Active Plan Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Plan</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-black text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Active
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {PRICING_PLANS[currentPlan].name}{" "}
            <span className="text-[#FFC20E] font-mono text-xl">
              (R{PRICING_PLANS[currentPlan].priceZar}/month)
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            {PRICING_PLANS[currentPlan].description} Next billing cycle renewal: 28 November 2026.
          </p>
        </div>

        <div className="w-full sm:w-auto text-left sm:text-right space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Monthly Documents Quota
          </span>
          <span className="text-lg font-bold text-white font-mono">
            {currentPlan === "FREE" ? "4 / 5 used (80%)" : "Unlimited Active"}
          </span>
          <div className="h-2 w-48 bg-slate-800 rounded-full overflow-hidden mt-1 sm:ml-auto">
            <div
              className="h-full bg-[#FFC20E] rounded-full"
              style={{ width: currentPlan === "FREE" ? "80%" : "100%" }}
            />
          </div>
        </div>
      </div>

      {/* Pricing Tiers Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Available Subscription Tiers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["FREE", "PRO", "BUSINESS"] as SubscriptionPlan[]).map((planKey) => {
            const plan = PRICING_PLANS[planKey];
            const isCurrent = currentPlan === planKey;

            return (
              <div
                key={planKey}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? "border-2 border-[#FFC20E] bg-gradient-to-b from-[#0E1B2E] via-slate-900 to-[#0E1B2E] shadow-xl shadow-[#FFC20E]/5"
                    : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-base font-bold text-white">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-black uppercase bg-[#FFC20E] text-[#0E1B2E] px-2 py-0.5 rounded-full">
                        Your Plan
                      </span>
                    )}
                  </div>

                  <div className="mb-4 pb-4 border-b border-slate-800">
                    <span className="text-3xl font-extrabold text-white">R{plan.priceZar}</span>
                    <span className="text-slate-400 text-xs ml-1.5">/ {plan.billingPeriod}</span>
                    <p className="text-[11px] text-[#FFC20E] font-medium mt-1">{plan.documentLimit}</p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FFC20E] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => handleUpgrade(planKey)}
                    disabled={isCurrent || loadingPlan === planKey}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                        : planKey === "PRO"
                        ? "bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] font-black shadow-md shadow-[#FFC20E]/20"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {loadingPlan === planKey ? (
                      "Connecting Paystack..."
                    ) : isCurrent ? (
                      "Current Plan"
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        Upgrade to {plan.name}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Paystack Security & Local Payment Note */}
      <div className="rounded-2xl border border-slate-800 bg-[#0E1B2E] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#FFC20E]">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-white">Processed securely with Paystack South Africa</h5>
            <p>Supports Visa, Mastercard, Instant EFT (Ozow, Capitec Pay) with zero transaction fees on subscription.</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-semibold text-slate-300">B-BBEE Level 1 Invoicing Included</span>
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          Recent Payment Receipts
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E1B2E] text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Plan</th>
                <th className="py-2.5 px-3 text-right">Amount (ZAR)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-3 font-mono text-slate-400">28 Oct 2026</td>
                <td className="py-3 px-3 font-mono text-slate-300">PSTK_REC_891048</td>
                <td className="py-3 px-3 font-semibold text-white">Pro Builder Tier</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white">{formatZAR(49)}</td>
                <td className="py-3 px-3 text-center">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-slate-400">28 Sep 2026</td>
                <td className="py-3 px-3 font-mono text-slate-300">PSTK_REC_772910</td>
                <td className="py-3 px-3 font-semibold text-white">Pro Builder Tier</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white">{formatZAR(49)}</td>
                <td className="py-3 px-3 text-center">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    Success
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
