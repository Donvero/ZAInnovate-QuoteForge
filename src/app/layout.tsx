import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuoteForge | SARS-Compliant Quotes & Invoices for SA SMMEs",
  description:
    "QuoteForge is an enterprise-grade quotation and tax invoice generator SaaS for South African SMMEs, contractors, and startups by ZAInnovate Technologies (Pty) Ltd. 100% Black Youth-Owned, B-BBEE Level 1.",
  keywords: [
    "South African Invoicing Software",
    "SARS Tax Invoice Generator",
    "SA SMME Quote Maker",
    "Paystack ZAR Payments",
    "B-BBEE Invoicing",
    "East London Software",
    "ZAInnovate Technologies",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08101C] text-slate-100 flex flex-col selection:bg-[#FFC20E] selection:text-[#0E1B2E]">
        {children}
      </body>
    </html>
  );
}
