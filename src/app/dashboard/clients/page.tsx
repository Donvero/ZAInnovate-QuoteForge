"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClientData } from "@/types";
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Receipt, 
  FileText, 
  Plus, 
  ShieldCheck,
  Award
} from "lucide-react";
import { formatZAR } from "@/lib/currency";

const INITIAL_CLIENTS: (ClientData & { totalBilled: number; docCount: number })[] = [
  {
    id: "cl_1",
    name: "Siphesihle Ndlovu",
    companyName: "Eastern Cape Infrastructure Services",
    email: "sndlovu@ecis.co.za",
    phone: "+27 (0) 83 234 5678",
    address: "14 Oxford Street, City Centre",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5201",
    vatNumber: "4820194857",
    csdNumber: "MAAA0938472",
    totalBilled: 92000,
    docCount: 3,
  },
  {
    id: "cl_2",
    name: "Anathi Gqirana",
    companyName: "Amathole Logistics & Projects",
    email: "agqirana@amatholelogistics.co.za",
    phone: "+27 (0) 82 998 1234",
    address: "5 Gloucester Road, Vincent",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5247",
    vatNumber: "4710293849",
    csdNumber: "MAAA0458123",
    totalBilled: 35075,
    docCount: 2,
  },
  {
    id: "cl_3",
    name: "Dr. Lindiwe Mthembu",
    companyName: "Buffalo City Health Diagnostics",
    email: "procurement@bchealth.co.za",
    phone: "+27 (0) 43 748 9000",
    address: "Berea Medical Centre",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5214",
    vatNumber: "4392019284",
    csdNumber: "MAAA0192847",
    totalBilled: 71300,
    docCount: 1,
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientData>>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    city: "East London",
    province: "Eastern Cape",
    postalCode: "5201",
    vatNumber: "",
    csdNumber: "",
  });

  const filteredClients = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.companyName && c.companyName.toLowerCase().includes(q)) ||
      c.email.toLowerCase().includes(q) ||
      (c.vatNumber && c.vatNumber.includes(q))
    );
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newClient = {
      id: `cl_${Date.now()}`,
      name: formData.name,
      companyName: formData.companyName || null,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address || null,
      city: formData.city || null,
      province: formData.province || null,
      postalCode: formData.postalCode || null,
      vatNumber: formData.vatNumber || null,
      csdNumber: formData.csdNumber || null,
      totalBilled: 0,
      docCount: 0,
    };

    setClients([newClient, ...clients]);
    setShowModal(false);
    setFormData({
      name: "",
      companyName: "",
      email: "",
      phone: "",
      address: "",
      city: "East London",
      province: "Eastern Cape",
      postalCode: "5201",
      vatNumber: "",
      csdNumber: "",
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Clients Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain customer records, SARS VAT registration numbers, and Treasury CSD supplier profiles.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4 text-[#0E1B2E]" />
          Add Client
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company, person name, email, or VAT number..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC20E]"
        />
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-[#0E1B2E] border border-amber-500/30 flex items-center justify-center font-bold text-xs text-[#FFC20E]">
                    {client.companyName ? client.companyName.substring(0, 2).toUpperCase() : "CL"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {client.companyName || client.name}
                    </h3>
                    {client.companyName && (
                      <p className="text-[11px] text-slate-400">Attn: {client.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact and address details */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#FFC20E] flex-shrink-0" />
                  <span className="truncate text-slate-300">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FFC20E] flex-shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FFC20E] flex-shrink-0 mt-0.5" />
                    <span className="truncate">{client.address}, {client.city}</span>
                  </div>
                )}
              </div>

              {/* SA Compliance Tags */}
              <div className="pt-3 flex flex-wrap gap-1.5 text-[10px]">
                {client.vatNumber && (
                  <span className="bg-slate-800 text-[#FFC20E] px-2 py-0.5 rounded border border-slate-700 font-mono">
                    VAT: {client.vatNumber}
                  </span>
                )}
                {client.csdNumber && (
                  <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                    CSD: {client.csdNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Total billed & Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Billed</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatZAR(client.totalBilled)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`/dashboard/documents/new?type=QUOTE`}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold"
                  title="Create Quote"
                >
                  Quote
                </Link>
                <Link
                  href={`/dashboard/documents/new?type=INVOICE`}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-bold"
                  title="Create Invoice"
                >
                  Invoice
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#FFC20E]" />
                Add Client Profile
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Company / Entity Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Eastern Cape Infrastructure Services"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Siphesihle Ndlovu"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="billing@ecis.co.za"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+27 (0) 83 234 5678"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Physical Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="14 Oxford Street, City Centre"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="East London"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Province</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    placeholder="Eastern Cape"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="5201"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">SARS VAT Number</label>
                  <input
                    type="text"
                    value={formData.vatNumber}
                    onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                    placeholder="4820194857"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Treasury CSD Number</label>
                  <input
                    type="text"
                    value={formData.csdNumber}
                    onChange={(e) => setFormData({ ...formData, csdNumber: e.target.value })}
                    placeholder="MAAA0938472"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] font-black"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
