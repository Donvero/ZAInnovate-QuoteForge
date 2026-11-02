"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentBuilder } from "@/components/documents/DocumentBuilder";
import { DocumentType } from "@/types";

function NewDocumentContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  
  const validTypes: DocumentType[] = ["QUOTE", "INVOICE", "DELIVERY_NOTE", "PURCHASE_ORDER"];
  const docType: DocumentType = validTypes.includes(typeParam as DocumentType)
    ? (typeParam as DocumentType)
    : "INVOICE";

  return (
    <div>
      <DocumentBuilder initialDocument={{ type: docType }} />
    </div>
  );
}

export default function NewDocumentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading document builder...</div>}>
      <NewDocumentContent />
    </Suspense>
  );
}
