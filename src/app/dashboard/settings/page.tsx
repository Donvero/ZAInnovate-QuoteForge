"use client";

import React, { useState } from "react";
import { CompanyData } from "@/types";
import { 
  Building2, 
  Landmark, 
  ShieldCheck, 
  FileText, 
  Save, 
  CheckCircle2, 
  Award, 
  Upload,
  Globe,
  Mail,
  Phone
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState<CompanyData>({
    id: "comp_zainnovate_01",
    name: "ZAInnovate Technologies (Pty) Ltd",
    tradingName: "ZAInnovate Technologies",
    regNumber: "2024/098765/07",
    vatNumber: "4190283746",
    taxPin: "9834710294",
    csdNumber: "MAAA1289456",
    bbbeeLevel: "Level 1 Contributor (100% Black Youth Owned)",
    address: "Beacon Bay Commercial Park, Pearl Road",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5241",
    phone: "+27 (0) 43 700 1200",
    email: "invoicing@zainnovate.co.za",
    website: "https://zainnovate.co.za",
    bankName: "First National Bank (FNB)",
    accountHolder: "ZAInnovate Technologies (Pty) Ltd",
    accountNumber: "62891234567",
    branchCode: "250655",
    accountType: "Cheque / Business Current Account",
    defaultVatRate: 15.0,
    quotePrefix: "QT-",
    invoicePrefix: "INV-",
    defaultNotes: "Thank you for doing business with ZAInnovate Technologies. Please quote invoice number as payment reference.",
    defaultTerms: "Payment strictly within 30 days of tax invoice date. Ownership of all goods/deliverables remains with supplier until full settlement.",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Company Settings & Compliance</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure your enterprise details, SARS tax identification, Treasury CSD registration, and EFT banking particulars.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
        >
          <Save className="w-4 h-4 text-[#0E1B2E]" />
          {saved ? "Saved! ✓" : "Save Changes"}
        </button>
      </div>

      {saved && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-xs text-emerald-400 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Company profile and SARS compliance configuration updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Business Identity & SARS Details */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-[#FFC20E]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Legal Business Identity & SARS Registration
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Registered Company Name</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Trading Name (As shown on Invoices)</label>
              <input
                type="text"
                value={company.tradingName || ""}
                onChange={(e) => setCompany({ ...company, tradingName: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">CIPC Registration Number</label>
              <input
                type="text"
                value={company.regNumber || ""}
                onChange={(e) => setCompany({ ...company, regNumber: e.target.value })}
                placeholder="2024/098765/07"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">SARS VAT Registration Number (10 Digits)</label>
              <input
                type="text"
                value={company.vatNumber || ""}
                onChange={(e) => setCompany({ ...company, vatNumber: e.target.value })}
                placeholder="4190283746"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">SARS Tax Compliance Status (TCS) PIN</label>
              <input
                type="text"
                value={company.taxPin || ""}
                onChange={(e) => setCompany({ ...company, taxPin: e.target.value })}
                placeholder="9834710294"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">National Treasury CSD Supplier Number</label>
              <input
                type="text"
                value={company.csdNumber || ""}
                onChange={(e) => setCompany({ ...company, csdNumber: e.target.value })}
                placeholder="MAAA1289456"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-400 block mb-1">B-BBEE Status & Rating</label>
              <input
                type="text"
                value={company.bbbeeLevel || ""}
                onChange={(e) => setCompany({ ...company, bbbeeLevel: e.target.value })}
                placeholder="Level 1 Contributor (100% Black Youth Owned)"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Address */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail className="w-4 h-4 text-[#FFC20E]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Particulars & Physical Location
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Invoicing Email Address</label>
              <input
                type="email"
                value={company.email || ""}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Business Phone Number</label>
              <input
                type="tel"
                value={company.phone || ""}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-400 block mb-1">Physical Street Address</label>
              <input
                type="text"
                value={company.address || ""}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">City / Town</label>
              <input
                type="text"
                value={company.city || ""}
                onChange={(e) => setCompany({ ...company, city: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Province & Postal Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={company.province || ""}
                  onChange={(e) => setCompany({ ...company, province: e.target.value })}
                  placeholder="Eastern Cape"
                  className="w-2/3 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                />
                <input
                  type="text"
                  value={company.postalCode || ""}
                  onChange={(e) => setCompany({ ...company, postalCode: e.target.value })}
                  placeholder="5241"
                  className="w-1/3 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Official EFT Banking Details Confirmation */}
        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Landmark className="w-4 h-4 text-[#FFC20E]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Official EFT Banking Details Confirmation
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            These banking credentials are automatically embedded in every quote and tax invoice with payment reference instructions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Registered Bank</label>
              <select
                value={company.bankName || "First National Bank (FNB)"}
                onChange={(e) => setCompany({ ...company, bankName: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              >
                <option value="First National Bank (FNB)">First National Bank (FNB)</option>
                <option value="Standard Bank of South Africa">Standard Bank of South Africa</option>
                <option value="Nedbank">Nedbank</option>
                <option value="ABSA Bank">ABSA Bank</option>
                <option value="Capitec Bank / Capitec Business">Capitec Bank / Capitec Business</option>
                <option value="Investec Bank">Investec Bank</option>
                <option value="Discovery Bank">Discovery Bank</option>
                <option value="TymeBank">TymeBank</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Account Holder Name</label>
              <input
                type="text"
                value={company.accountHolder || ""}
                onChange={(e) => setCompany({ ...company, accountHolder: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Account Number</label>
              <input
                type="text"
                value={company.accountNumber || ""}
                onChange={(e) => setCompany({ ...company, accountNumber: e.target.value })}
                placeholder="62891234567"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Branch Code (Universal 6 Digits)</label>
              <input
                type="text"
                value={company.branchCode || ""}
                onChange={(e) => setCompany({ ...company, branchCode: e.target.value })}
                placeholder="250655"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Account Type</label>
              <select
                value={company.accountType || "Cheque / Business Current Account"}
                onChange={(e) => setCompany({ ...company, accountType: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              >
                <option value="Cheque / Business Current Account">Cheque / Business Current Account</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Transmission Account">Transmission Account</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Document Prefixes & Terms */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-4 h-4 text-[#FFC20E]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Document Numbering & Standard Terms
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Invoice Prefix</label>
              <input
                type="text"
                value={company.invoicePrefix || "INV-"}
                onChange={(e) => setCompany({ ...company, invoicePrefix: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Quotation Prefix</label>
              <input
                type="text"
                value={company.quotePrefix || "QT-"}
                onChange={(e) => setCompany({ ...company, quotePrefix: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 font-mono text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Default SARS VAT Rate (%)</label>
              <input
                type="number"
                value={company.defaultVatRate || 15}
                onChange={(e) => setCompany({ ...company, defaultVatRate: parseFloat(e.target.value) || 15 })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Default Notes (Appears on every new document)</label>
              <textarea
                rows={2}
                value={company.defaultNotes || ""}
                onChange={(e) => setCompany({ ...company, defaultNotes: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Default Terms & Conditions</label>
              <textarea
                rows={2}
                value={company.defaultTerms || ""}
                onChange={(e) => setCompany({ ...company, defaultTerms: e.target.value })}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-sm font-black shadow-lg shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4 text-[#0E1B2E]" />
            {saved ? "Saved Successfully! ✓" : "Save All Company Settings"}
          </button>
        </div>

      </form>

    </div>
  );
}
