import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, initializePaystackPayment, PRICING_PLANS } from "@/lib/paystack";
import { prisma } from "@/lib/db";
import { SubscriptionPlan } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Handle Client-initiated subscription checkout request
    if (body.action === "initialize_subscription") {
      const planKey = (body.plan as SubscriptionPlan) || "PRO";
      const plan = PRICING_PLANS[planKey];
      const email = body.email || "billing@zainnovate.co.za";

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const callbackUrl = `${appUrl}/dashboard/billing?status=success&plan=${planKey}`;

      const paymentInit = await initializePaystackPayment({
        email,
        amountInRands: plan.priceZar,
        callbackUrl,
        metadata: {
          plan: planKey,
          planName: plan.name,
          platform: "QuoteForge ZAInnovate",
        },
      });

      return NextResponse.json(paymentInit?.data || { success: true });
    }

    // Handle Paystack Webhook Event Dispatch
    const signature = req.headers.get("x-paystack-signature") || "";
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Invalid Paystack signature" }, { status: 401 });
    }

    const event = body.event;
    const data = body.data;

    switch (event) {
      case "charge.success": {
        const reference = data.reference;
        const amountRands = data.amount / 100;
        const customerEmail = data.customer?.email;

        // In a database-backed deployment, record payment record and update document or subscription:
        try {
          await prisma.paymentRecord.create({
            data: {
              documentId: data.metadata?.documentId || "doc_sample",
              amount: amountRands,
              method: "Paystack Card / Instant EFT",
              paystackRef: reference,
            },
          });
        } catch (dbErr) {
          // Graceful fallback
        }
        break;
      }

      case "subscription.create": {
        // Handle subscription created
        break;
      }

      case "invoice.payment_failed": {
        // Handle failed payment notice
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
