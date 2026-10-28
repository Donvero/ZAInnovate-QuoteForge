export type DocumentType = 'QUOTE' | 'INVOICE' | 'DELIVERY_NOTE' | 'PURCHASE_ORDER';

export type DocumentStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export type SubscriptionPlan = 'FREE' | 'PRO' | 'BUSINESS';

export interface LineItemInput {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // 0 or 15
  subtotal?: number;
  vatAmount?: number;
  total?: number;
}

export interface CompanyData {
  id: string;
  name: string;
  tradingName?: string | null;
  regNumber?: string | null;
  vatNumber?: string | null;
  taxNumber?: string | null;
  taxPin?: string | null;
  csdNumber?: string | null;
  bbbeeLevel?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  logo?: string | null;
  bankName?: string | null;
  accountHolder?: string | null;
  accountNumber?: string | null;
  branchCode?: string | null;
  accountType?: string | null;
  defaultVatRate?: number;
  quotePrefix?: string;
  invoicePrefix?: string;
  defaultNotes?: string | null;
  defaultTerms?: string | null;
}

export interface ClientData {
  id: string;
  name: string;
  companyName?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  vatNumber?: string | null;
  csdNumber?: string | null;
}

export interface DocumentData {
  id: string;
  companyId: string;
  company?: CompanyData;
  clientId: string;
  client?: ClientData;
  type: DocumentType;
  status: DocumentStatus;
  number: string;
  referenceNumber?: string | null;
  date: string | Date;
  dueDate?: string | Date | null;
  supplyDate?: string | Date | null;
  subtotal: number;
  vatAmount: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  notes?: string | null;
  terms?: string | null;
  items: LineItemInput[];
  createdAt?: string | Date;
}

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  priceZar: number;
  billingPeriod: string;
  description: string;
  features: string[];
  documentLimit: string;
  popular?: boolean;
  paystackPlanCode?: string;
}
