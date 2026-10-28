"use client";

import React from "react";
import { Trash2, GripVertical } from "lucide-react";
import { LineItemInput } from "@/types";
import { formatZAR } from "@/lib/currency";

interface LineItemRowProps {
  index: number;
  item: LineItemInput;
  onChange: (index: number, updatedItem: LineItemInput) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export function LineItemRow({
  index,
  item,
  onChange,
  onRemove,
  canRemove,
}: LineItemRowProps) {
  const qty = Number(item.quantity) || 0;
  const unitPrice = Number(item.unitPrice) || 0;
  const vatRate = typeof item.vatRate === "number" ? item.vatRate : 15;

  const subtotal = Math.round(qty * unitPrice * 100) / 100;
  const vatAmount = Math.round((subtotal * (vatRate / 100)) * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  const updateField = (field: keyof LineItemInput, val: any) => {
    onChange(index, {
      ...item,
      [field]: val,
      subtotal,
      vatAmount,
      total,
    });
  };

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-all">
      {/* Item index */}
      <div className="hidden sm:flex items-center text-slate-500 font-mono text-xs w-6 justify-center">
        {index + 1}
      </div>

      {/* Description */}
      <div className="w-full sm:flex-1">
        <label className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Description / Scope of Work
        </label>
        <input
          type="text"
          value={item.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="e.g. IT Infrastructure Maintenance & Security Auditing"
          className="w-full rounded-lg bg-slate-950 border border-slate-700/80 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC20E] focus:ring-1 focus:ring-[#FFC20E]"
        />
      </div>

      {/* Quantity */}
      <div className="w-28">
        <label className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Qty / Hrs
        </label>
        <input
          type="number"
          step="any"
          min="0"
          value={item.quantity === 0 ? "" : item.quantity}
          onChange={(e) => updateField("quantity", parseFloat(e.target.value) || 0)}
          placeholder="1"
          className="w-full text-right rounded-lg bg-slate-950 border border-slate-700/80 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFC20E] focus:ring-1 focus:ring-[#FFC20E]"
        />
      </div>

      {/* Unit Price (ZAR) */}
      <div className="w-36">
        <label className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Rate / Price (R)
        </label>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
            R
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={item.unitPrice === 0 ? "" : item.unitPrice}
            onChange={(e) => updateField("unitPrice", parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-7 pr-3 py-2 text-right rounded-lg bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-[#FFC20E] focus:ring-1 focus:ring-[#FFC20E]"
          />
        </div>
      </div>

      {/* VAT Rate Selection */}
      <div className="w-24">
        <label className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          VAT
        </label>
        <select
          value={vatRate}
          onChange={(e) => updateField("vatRate", parseFloat(e.target.value))}
          className="w-full rounded-lg bg-slate-950 border border-slate-700/80 px-2 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#FFC20E]"
        >
          <option value={15}>15% Standard</option>
          <option value={0}>0% Zero/Exempt</option>
        </select>
      </div>

      {/* Line Total */}
      <div className="w-32 text-right">
        <label className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Total (Incl.)
        </label>
        <span className="text-sm font-bold text-white font-mono">
          {formatZAR(total)}
        </span>
      </div>

      {/* Remove Button */}
      <div className="w-8 flex items-center justify-center">
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
