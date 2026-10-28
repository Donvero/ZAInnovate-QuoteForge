"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  DocumentData, 
  DocumentType, 
  DocumentStatus, 
  LineItemInput, 
  ClientData, 
  CompanyData 
} from "@/types";
import { LineItemRow } from "./LineItemRow";
import { DocumentPreview } from "./DocumentPreview";
import { calculateDocumentTotals } from "@/lib/vat";
import { generateDocumentNumber } from "@/lib/document-number";
import { formatZAR } from "@/lib/currency";
import { 
  Plus, 
  Save, 
  Send, 
  Printer, 
  Download, 
  Sparkles, 
  UserPlus, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  FileCheck2,
  Calendar,
  Hash,
  Briefcase
} from "lucide-react";

interface DocumentBuilderProps {
  initialDocument?: Partial<DocumentData>;
  initialClients?: ClientData[];
  initialCompany?: CompanyData;
  onSave?: (doc: DocumentData) => Promise<void>;
}

const DEFAULT_COMPANY: CompanyData = {
  id: "comp_zainnovate_01",
  name: "ZAInnovate Technologies (Pty) Ltd",
  tradingName: "ZAInnovate Technologies",
  regNumber: "2024/098765/07",
  vatNumber: "4190283746",
  taxPin: "9834710294",
  csdNumber: "MAAA1289456",
  bbbeeLevel: "B-BBEE Level 1 Contributor (100% Black Youth Owned)",
  address: "Beacon Bay Commercial Park, Pearl Road",
  city: "East London",
  province: "Eastern Cape",
  postalCode: "5241",
  phone: "+27 (0) 43 700 1200",
  email: "invoicing@zainnovate.co.za",
  bankName: "First National Bank (FNB)",
  accountHolder: "ZAInnovate Technologies (Pty) Ltd",
  accountNumber: "62891234567",
  branchCode: "250655",
  accountType: "Cheque / Business Current Account",
};

const DEFAULT_CLIENTS: ClientData[] = [
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
  },
];

export function DocumentBuilder({
  initialDocument,
  initialClients = DEFAULT_CLIENTS,
  initialCompany = DEFAULT_COMPANY,
  onSave,
}: DocumentBuilderProps) {
  const router = useRouter();
  
  // Document State
  const [docType, setDocType] = useState<DocumentType>(initialDocument?.type || "INVOICE");
  const [docNumber, setDocNumber] = useState(
    initialDocument?.number || generateDocumentNumber({ type: initialDocument?.type || "INVOICE", sequenceNumber: 1042 })
  );
  const [referenceNumber, setReferenceNumber] = useState(initialDocument?.referenceNumber || "PO-2026-992");
  const [docDate, setDocDate] = useState<string>(
    initialDocument?.date ? new Date(initialDocument.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
  );
  
  // Default due date: 30 days from now
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
  const [dueDate, setDueDate] = useState<string>(
    initialDocument?.dueDate ? new Date(initialDocument.dueDate).toISOString().split("T")[0] : thirtyDaysLater.toISOString().split("T")[0]
  );

  // Clients & Selected Client
  const [clients, setClients] = useState<ClientData[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialDocument?.clientId || initialClients[0]?.id || ""
  );
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientData, setNewClientData] = useState<Partial<ClientData>>({
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

  // Line items state
  const [items, setItems] = useState<LineItemInput[]>(
    initialDocument?.items || [
      {
        description: "Cloud Architecture & Digital Transformation Strategy",
        quantity: 1,
        unitPrice: 24500,
        vatRate: 15,
      },
      {
        description: "Next.js & Supabase Web Portal Implementation",
        quantity: 1,
        unitPrice: 18000,
        vatRate: 15,
      },
    ]
  );

  const [discount, setDiscount] = useState<number>(initialDocument?.discount || 0);
  const [notes, setNotes] = useState<string>(
    initialDocument?.notes || "Thank you for partnering with ZAInnovate Technologies. Please quote document number as reference for bank deposits."
  );
  const [terms, setTerms] = useState<string>(
    initialDocument?.terms || "Strictly 30 days from date of Tax Invoice. Late payments subject to statutory interest."
  );
  const [status, setStatus] = useState<DocumentStatus>(initialDocument?.status || "DRAFT");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);

  // Auto-recalculate Totals
  const totals = useMemo(() => {
    return calculateDocumentTotals(items, discount);
  }, [items, discount]);

  // Selected client object
  const selectedClient = useMemo(() => {
    return clients.find((c) => c.id === selectedClientId) || clients[0];
  }, [clients, selectedClientId]);

  // Complete document object for live preview
  const liveDocument: DocumentData = useMemo(() => {
    return {
      id: initialDocument?.id || "doc_temp_preview",
      companyId: initialCompany.id,
      company: initialCompany,
      clientId: selectedClient?.id || "",
      client: selectedClient,
      type: docType,
      status,
      number: docNumber,
      referenceNumber,
      date: docDate,
      dueDate,
      subtotal: totals.subtotal,
      vatAmount: totals.vatAmount,
      discount,
      total: totals.total,
      amountPaid: 0,
      balanceDue: totals.total,
      notes,
      terms,
      items,
    };
  }, [
    initialDocument?.id,
    initialCompany,
    selectedClient,
    docType,
    status,
    docNumber,
    referenceNumber,
    docDate,
    dueDate,
    totals,
    discount,
    notes,
    terms,
    items,
  ]);

  // Handle Type Change
  const handleTypeChange = (newType: DocumentType) => {
    setDocType(newType);
    setDocNumber(generateDocumentNumber({ type: newType, sequenceNumber: 1042 }));
  };

  // Line item handlers
  const handleItemChange = (index: number, updatedItem: LineItemInput) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
        vatRate: 15,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Client creation handler
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.name || !newClientData.email) return;

    const newClient: ClientData = {
      id: `cl_${Date.now()}`,
      name: newClientData.name,
      companyName: newClientData.companyName || null,
      email: newClientData.email,
      phone: newClientData.phone || null,
      address: newClientData.address || null,
      city: newClientData.city || null,
      province: newClientData.province || null,
      postalCode: newClientData.postalCode || null,
      vatNumber: newClientData.vatNumber || null,
      csdNumber: newClientData.csdNumber || null,
    };

    setClients((prev) => [...prev, newClient]);
    setSelectedClientId(newClient.id);
    setShowNewClientModal(false);
    setNewClientData({
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

  // Save handler
  const handleSaveDocument = async (newStatus: DocumentStatus = "DRAFT") => {
    setIsSaving(true);
    setStatus(newStatus);
    const updated = {
      ...liveDocument,
      status: newStatus,
    };

    try {
      if (onSave) {
        await onSave(updated);
      } else {
        // Direct API call
        const res = await fetch("/api/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (res.ok) {
          router.push("/dashboard/documents");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      // In standalone client demo mode, navigate smoothly
      router.push("/dashboard/documents");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0E1B2E] border border-amber-500/40 flex items-center justify-center text-[#FFC20E] font-extrabold text-sm shadow-md">
            QF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Document Studio</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFC20E] text-[#0E1B2E]">
                {docType}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Editing: <span className="text-[#FFC20E] font-bold">{docNumber}</span> • SARS 15% VAT Ready
            </p>
          </div>
        </div>

        {/* Tab Toggle for Mobile/Tablet */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="lg:hidden flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                activeTab === "edit" ? "bg-[#FFC20E] text-[#0E1B2E]" : "text-slate-400 hover:text-white"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                activeTab === "preview" ? "bg-[#FFC20E] text-[#0E1B2E]" : "text-slate-400 hover:text-white"
              }`}
            >
              Live Preview
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>

          <button
            onClick={() => handleSaveDocument("DRAFT")}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            Save Draft
          </button>

          <button
            onClick={() => handleSaveDocument("SENT")}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] text-xs font-black shadow-md shadow-[#FFC20E]/20 transition-all hover:scale-[1.02]"
          >
            <Send className="w-3.5 h-3.5" />
            Issue & Send
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Editor + Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Document Editor */}
        <div className={`lg:col-span-6 space-y-6 ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
          
          {/* Document Type Selector Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Document Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { type: "INVOICE", label: "Tax Invoice" },
                  { type: "QUOTE", label: "Quotation" },
                  { type: "DELIVERY_NOTE", label: "Delivery Note" },
                  { type: "PURCHASE_ORDER", label: "Purchase Order" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => handleTypeChange(cat.type)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    docType === cat.type
                      ? "bg-[#0E1B2E] text-[#FFC20E] border-2 border-[#FFC20E] shadow-sm"
                      : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Document Number, Dates, PO Ref */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#FFC20E]" /> Number
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FFC20E]" /> Issue Date
                </label>
                <input
                  type="date"
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FFC20E]" /> Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>
            </div>

            {/* PO / Tender Ref */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Client PO / Tender Reference Number (Optional)
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. EC-DOT-2026-PO-991"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
          </div>

          {/* Client Selection Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Client / Recipient (Billed To)
              </label>
              <button
                type="button"
                onClick={() => setShowNewClientModal(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FFC20E] hover:underline"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add New Client
              </button>
            </div>

            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-white font-medium focus:outline-none focus:border-[#FFC20E]"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName ? `${c.companyName} (${c.name})` : c.name} — {c.email}
                </option>
              ))}
            </select>

            {/* Client summary pill */}
            {selectedClient && (
              <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>{selectedClient.companyName || selectedClient.name}</span>
                  {selectedClient.vatNumber && (
                    <span className="text-[10px] text-[#FFC20E] bg-[#FFC20E]/10 px-2 py-0.5 rounded border border-[#FFC20E]/20">
                      VAT: {selectedClient.vatNumber}
                    </span>
                  )}
                </div>
                <p>{selectedClient.email} • {selectedClient.phone || "No phone"}</p>
                <p>{selectedClient.address ? `${selectedClient.address}, ${selectedClient.city}` : "Address not provided"}</p>
                {selectedClient.csdNumber && (
                  <p className="text-[10px] text-slate-500 font-mono">Treasury CSD: {selectedClient.csdNumber}</p>
                )}
              </div>
            )}
          </div>

          {/* Line Items Editor Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deliverables & Line Items
                </h3>
                <p className="text-[11px] text-slate-500">Standard SARS 15% VAT applied automatically</p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1B2E] border border-amber-500/40 text-[#FFC20E] text-xs font-bold hover:bg-slate-800 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
            </div>

            {/* Desktop column titles */}
            <div className="hidden sm:flex items-center gap-3 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="w-6 text-center">#</div>
              <div className="flex-1">Description</div>
              <div className="w-28 text-right">Qty</div>
              <div className="w-36 text-right">Unit Price (R)</div>
              <div className="w-24">VAT Rate</div>
              <div className="w-32 text-right">Line Total</div>
              <div className="w-8"></div>
            </div>

            {/* Rows list */}
            <div className="space-y-2">
              {items.map((item, index) => (
                <LineItemRow
                  key={index}
                  index={index}
                  item={item}
                  onChange={handleItemChange}
                  onRemove={handleRemoveItem}
                  canRemove={items.length > 1}
                />
              ))}
            </div>

            {/* Subtotal & Discount row */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Add Global Discount (Rands):</span>
                <div className="w-36 relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount === 0 ? "" : discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-1.5 text-right rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              {/* Calculated Totals Summary */}
              <div className="rounded-xl bg-slate-950 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal (Excl. VAT):</span>
                  <span className="font-mono font-semibold text-white">{formatZAR(totals.subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Discount:</span>
                    <span className="font-mono font-semibold">- {formatZAR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>SARS VAT (15% Standard):</span>
                  <span className="font-mono font-semibold text-white">{formatZAR(totals.vatAmount)}</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold text-white">
                  <span className="text-[#FFC20E]">Total Consideration (ZAR):</span>
                  <span className="font-mono text-base text-[#FFC20E] font-black">{formatZAR(totals.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes, Terms & Bank Details Confirmation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Client Notes & Payment Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes to appear on document..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Terms & Conditions
              </label>
              <textarea
                rows={2}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Terms and conditions..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-[#FFC20E]"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Paper Studio Preview */}
        <div className={`lg:col-span-6 ${activeTab === "edit" ? "hidden lg:block" : "block"}`}>
          <div className="sticky top-20 space-y-3">
            <div className="flex items-center justify-between px-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#FFC20E]" />
                <span className="font-semibold text-white">Live Document Preview</span>
                <span className="text-slate-500">• Printable Layout</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                SARS Compliant
              </div>
            </div>

            {/* Live Document Preview Component */}
            <DocumentPreview
              document={liveDocument}
              company={initialCompany}
              client={selectedClient}
            />
          </div>
        </div>

      </div>

      {/* Modal: Add New Client */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#FFC20E]" />
                Add New Client
              </h3>
              <button
                type="button"
                onClick={() => setShowNewClientModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Company / Entity Name</label>
                  <input
                    type="text"
                    required
                    value={newClientData.companyName}
                    onChange={(e) => setNewClientData({ ...newClientData, companyName: e.target.value })}
                    placeholder="e.g. Amathole Construction"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    value={newClientData.name}
                    onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                    placeholder="e.g. Sipho Ndlovu"
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
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                    placeholder="procurement@client.co.za"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                    placeholder="+27 (0) 82 000 0000"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Physical Street Address</label>
                <input
                  type="text"
                  value={newClientData.address}
                  onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                  placeholder="12 Commercial Road, Beacon Bay"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={newClientData.city}
                    onChange={(e) => setNewClientData({ ...newClientData, city: e.target.value })}
                    placeholder="East London"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Province</label>
                  <input
                    type="text"
                    value={newClientData.province}
                    onChange={(e) => setNewClientData({ ...newClientData, province: e.target.value })}
                    placeholder="Eastern Cape"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={newClientData.postalCode}
                    onChange={(e) => setNewClientData({ ...newClientData, postalCode: e.target.value })}
                    placeholder="5241"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              {/* SA Tax / Procurement Specifics */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">SARS VAT Number</label>
                  <input
                    type="text"
                    value={newClientData.vatNumber}
                    onChange={(e) => setNewClientData({ ...newClientData, vatNumber: e.target.value })}
                    placeholder="4000123456"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Treasury CSD Number</label>
                  <input
                    type="text"
                    value={newClientData.csdNumber}
                    onChange={(e) => setNewClientData({ ...newClientData, csdNumber: e.target.value })}
                    placeholder="MAAA0123456"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-[#FFC20E]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewClientModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FFC20E] hover:bg-amber-400 text-[#0E1B2E] font-black"
                >
                  Save & Select Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
