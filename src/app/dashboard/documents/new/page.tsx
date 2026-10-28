"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { DocumentBuilder } from "@/components/documents/DocumentBuilder";
import { DocumentType } from "@/types";

export default function NewDocumentPage() {
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
