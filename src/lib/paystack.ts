import crypto from "crypto";
import { PricingPlan, SubscriptionPlan } from "@/types";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export const PRICING_PLANS: Record<SubscriptionPlan, PricingPlan> = {
  FREE: {
    id: "FREE",
    name: "Starter (SMME)",
    priceZar: 0,
    billingPeriod: "forever",
    description: "Perfect for sole traders and micro-enterprises just getting started.",
    documentLimit: "5 documents / month",
    features: [
      "5 quotes & invoices / month",
      "SARS 15% VAT compliant",
      "Standard PDF download",
      "Basic client directory",
      "Email delivery",
      "Single user account",
    ],
  },
  PRO: {
    id: "PRO",
    name: "Pro Builder",
    priceZar: 49,
    billingPeriod: "per month",
    popular: true,
    description: "Designed for growing contractors, freelancers, and small businesses.",
    documentLimit: "Unlimited documents",
    paystackPlanCode: "PLN_quoteforge_pro_monthly",
    features: [
      "Unlimited quotes, invoices & POs",
      "Custom company logo & colors",
      "No QuoteForge watermark",
      "One-click Quote to Invoice conversion",
      "Direct Paystack payment links on invoices",
      "Overdue invoice tracking & reminders",
      "Client statement generation",
      "CSV & Excel export",
    ],
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Business Suite",
    priceZar: 149,
    billingPeriod: "per month",
    description: "For established businesses needing team collaboration and recurring billing.",
    documentLimit: "Unlimited documents + Team",
    paystackPlanCode: "PLN_quoteforge_biz_monthly",
    features: [
      "Everything in Pro, plus:",
      "Up to 5 team member accounts",
      "Automated recurring monthly invoices",
      "B-BBEE compliance certificate tag",
      "Multiple bank account support",
      "Custom email domain sending",
      "Audit trail & SARS compliance logs",
      "Priority WhatsApp & phone support",
    ],
  },
};

/**
 * Initialize a Paystack transaction (ZAR amount converted to cents)
 */
export async function initializePaystackPayment({
  email,
  amountInRands,
  reference,
  callbackUrl,
  metadata = {},
}: {
  email: string;
  amountInRands: number;
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
}) {
  const amountInCents = Math.round(amountInRands * 100);
  const ref = reference || `QF_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  if (!PAYSTACK_SECRET_KEY) {
    // Return mock payment URL in development if no key configured
    return {
      status: true,
      message: "Development mode mock payment",
      data: {
        authorization_url: `/dashboard/billing?status=success&reference=${ref}`,
        access_code: "mock_access_code",
        reference: ref,
      },
    };
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountInCents,
      currency: "ZAR",
      reference: ref,
      callback_url: callbackUrl,
      metadata: {
        ...metadata,
        platform: "QuoteForge ZA",
      },
    }),
  });

  return response.json();
}

/**
 * Verify a Paystack transaction reference
 */
export async function verifyPaystackPayment(reference: string) {
  if (!PAYSTACK_SECRET_KEY) {
    return {
      status: true,
      message: "Dev mock verified",
      data: {
        status: "success",
        reference,
        amount: 4900,
        currency: "ZAR",
      },
    };
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });

  return response.json();
}

/**
 * Verify Paystack webhook HMAC SHA512 signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!PAYSTACK_SECRET_KEY) return true;
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(payload).digest("hex");
  return hash === signature;
}
