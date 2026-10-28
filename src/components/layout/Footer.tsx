import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0E1B2E] text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#FFC20E] to-amber-500 flex items-center justify-center font-extrabold text-[#0E1B2E] text-base shadow-sm">
                QF
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Quote<span className="text-[#FFC20E]">Forge</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional SARS-compliant quotation and tax invoice generator crafted for South African SMMEs, contractors, and forward-thinking enterprises.
            </p>
            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-[#FFC20E] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Black Youth-Owned
              </div>
              <div className="text-[11px] text-slate-400">
                B-BBEE Level 1 Contributor • East London, SA
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="#features" className="hover:text-[#FFC20E] transition-colors">
                  Tax Invoice Generator
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#FFC20E] transition-colors">
                  Quotation Maker & Approvals
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#FFC20E] transition-colors">
                  Paystack ZAR Billing
                </Link>
              </li>
              <li>
                <Link href="#sars-compliance" className="hover:text-[#FFC20E] transition-colors">
                  SARS Section 20 Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="flex items-center gap-1">
                  SARS 15% VAT Standard
                </span>
              </li>
              <li>
                <span>POPIA Act Data Privacy Compliant</span>
              </li>
              <li>
                <span>B-BBEE Procurement Records</span>
              </li>
              <li>
                <span>Terms of Service & SLA</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              ZAInnovate Technologies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFC20E] flex-shrink-0 mt-0.5" />
                <span>Beacon Bay, East London, Eastern Cape, 5241, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                <span>invoicing@zainnovate.co.za</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFC20E] flex-shrink-0" />
                <span>+27 (0) 43 700 1200</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ZAInnovate Technologies (Pty) Ltd. Reg: 2024/098765/07. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with pride in South Africa <span className="text-[#FFC20E]">🇿🇦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
