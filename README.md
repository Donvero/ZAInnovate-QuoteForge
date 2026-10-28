# QuoteForge 🇿🇦
> **Professional Quote & Invoice Generator SaaS for South African SMMEs**  
> Built by **ZAInnovate Technologies (Pty) Ltd** • 100% Black Youth-Owned • B-BBEE Level 1 Contributor • East London, South Africa

---

## 🌟 Overview

**QuoteForge** is a production-grade, revenue-generating SaaS engineered specifically for South African contractors, freelancers, SMMEs, and government tenderers. It automates SARS Section 20 tax compliance, generates crystal-clear quotations and tax invoices with live calculations, integrates Paystack for frictionless ZAR payments, and formats official procurement credentials (CSD, B-BBEE, TCS PIN, EFT banking confirmation).

### 🎨 Brand Identity & Palette
- **Brand:** ZAInnovate Technologies (Pty) Ltd (Reg: `2024/098765/07`)
- **Primary Navy:** `#0E1B2E`
- **Accent Gold:** `#FFC20E`
- **Headquarters:** Beacon Bay, East London, Eastern Cape, South Africa

---

## 🚀 Key Features

### 1. 100% SARS Section 20 Tax Invoice Compliance
- Prominent **TAX INVOICE** statutory heading
- Supplier & Recipient 10-digit SARS VAT numbers validation
- Standard South African **15.0% VAT** calculation with zero-rated & exempt toggles
- Strict non-repeating sequential serial numbering (`INV-2026-1042`, `QT-2026-1043`)
- Written **Rand Amount in Words** (e.g. *Twenty-One Thousand Two Hundred and Seventy-Five Rand Only*)

### 2. Tender & Procurement Ready
- **Central Supplier Database (CSD):** Embedded Treasury `MAAA...` supplier numbers
- **SARS TCS PIN:** Real-time Tax Compliance Status PIN tracking
- **B-BBEE Level 1 Contributor** verification tag
- **Official Banking Confirmation (EFT):** Direct FNB, Standard Bank, Capitec, Nedbank, ABSA details with universal 6-digit branch codes

### 3. Studio Workflow & 1-Click Conversions
- Dark-mode **Document Studio** with instant live paper preview
- **Quotation Generator:** 30-day validity tags and client acceptance signature boxes
- **1-Click Conversion:** Convert approved quotes directly into tax invoices
- **Delivery Notes & Purchase Orders:** Unified numbering and line items

### 4. Paystack ZAR Payment Gateway & Freemium Plans
- **Free SMME Tier (R0 / mo):** 5 quotes & tax invoices monthly
- **Pro Builder Tier (R49 / mo):** Unlimited documents, custom company branding, direct Paystack card/EFT links
- **Business Suite Tier (R149 / mo):** Multi-user team collaboration, automated recurring billing, B-BBEE audit logs

### 5. Instant Vector PDF & Resend Email Delivery
- Ultra-sharp `@react-pdf/renderer` vector PDF generation
- Direct client email delivery via Resend API with PDF attachments

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Database / ORM:** PostgreSQL (Supabase) + Prisma ORM
- **Authentication:** NextAuth.js (JWT Strategy)
- **Payments:** Paystack South Africa (ZAR Cents, Webhooks, Subscriptions)
- **PDF Generation:** `@react-pdf/renderer`
- **Email:** Resend API

---

## 📂 Project Architecture

```
ZAInnovate-QuoteForge/
├── prisma/
│   └── schema.prisma            # Schema: User, Company, Client, Document, LineItem, Subscription
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global HTML layout & meta
│   │   ├── globals.css          # Tailwind & dark studio styles
│   │   ├── page.tsx             # Marketing landing page & pricing
│   │   ├── dashboard/
│   │   │   ├── layout.tsx       # Studio shell with Sidebar & Navbar
│   │   │   ├── page.tsx         # Dashboard overview & cash flow metrics
│   │   │   ├── documents/
│   │   │   │   ├── page.tsx     # Filterable documents directory
│   │   │   │   ├── new/page.tsx # Document builder studio
│   │   │   │   └── [id]/page.tsx# Single document viewer & action studio
│   │   │   ├── clients/page.tsx # Client directory & procurement manager
│   │   │   ├── settings/page.tsx# Company & SARS settings
│   │   │   └── billing/page.tsx # Subscription tiers & Paystack billing
│   │   └── api/
│   │       ├── documents/       # CRUD document endpoints
│   │       ├── documents/[id]/pdf/   # PDF stream generation
│   │       ├── documents/[id]/send/  # Resend email dispatcher
│   │       └── webhooks/paystack/    # Paystack webhook & checkout handler
│   ├── components/
│   │   ├── landing/             # Hero, Features, PricingCards
│   │   ├── documents/           # DocumentBuilder, DocumentPreview, LineItemRow, DocumentTable
│   │   ├── dashboard/           # RevenueChart, QuickActions, OverdueAlert
│   │   ├── layout/              # Navbar, Sidebar, Footer
│   │   └── pdf/                 # InvoiceTemplate, QuoteTemplate (react-pdf)
│   ├── lib/
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── paystack.ts          # Paystack ZAR payment helpers
│   │   ├── pdf.ts               # Server-side PDF renderer
│   │   ├── currency.ts          # ZAR formatting & Rand in words
│   │   ├── vat.ts               # SARS 15% VAT calculation engine
│   │   └── document-number.ts   # Sequential numbering generator
│   └── types/
│       └── index.ts             # Complete TypeScript interfaces
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Donvero/ZAInnovate-QuoteForge.git
cd ZAInnovate-QuoteForge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your credentials:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
NEXTAUTH_SECRET="your-32-char-random-secret"
NEXTAUTH_URL="http://localhost:3000"
PAYSTACK_SECRET_KEY="your_paystack_secret_key_here"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="your_paystack_public_key_here"
RESEND_API_KEY="your_resend_api_key_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🇿🇦 South African SMME Compliance Reference

| Statutory Item | SARS Section 20 Requirement | QuoteForge Implementation |
|---|---|---|
| **Tax Invoice Title** | Words *"TAX INVOICE"* in a prominent position | Distinct dark header badge on all invoices |
| **Supplier VAT** | 10-digit number starting with 4 | Validated in company profile & embedded on invoice |
| **Recipient VAT** | Required if transaction exceeds R5,000 | Automated client VAT field on recipient address card |
| **VAT Rate** | Prescribed 15% calculation | Automated line item breakdown & exclusive totals |
| **CSD Number** | National Treasury tender registration | Field supported on client & supplier profiles |
| **Banking Confirmation** | Essential for EFT transfers | Universal branch code & account type table |

---

## 📄 License & Ownership
Copyright © 2026 **ZAInnovate Technologies (Pty) Ltd**.  
All rights reserved. 100% Black Youth-Owned • B-BBEE Level 1 Contributor • East London, South Africa.
