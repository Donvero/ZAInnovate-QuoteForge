# QuoteForge 🇿🇦
> **Professional Quote & Invoice Generator SaaS for South African SMMEs**  
> Built by **ZAInnovate Technologies (Pty) Ltd** • 100% Black Youth-Owned • B-BBEE Level 1 Contributor • East London, South Africa

---

## 🌟 Overview

**QuoteForge** is a production-grade, revenue-generating SaaS engineered specifically for South African contractors, freelancers, SMMEs, and government tenderers. It automates SARS Section 20 tax compliance, generates crystal-clear quotations and tax invoices with live calculations, integrates Paystack for frictionless ZAR payments, and formats official procurement credentials (CSD, B-BBEE, TCS PIN, EFT banking confirmation).

### 🎨 Brand Identity & Palette
- **Brand:** ZAInnovate Technologies (Pty) Ltd (Reg: `2025/572318/07` • CSD: `MAAA1646894`)
- **Primary Navy:** `#0E1B2E`
- **Accent Gold:** `#FFC20E`
- **Headquarters:** 14 Abdullah Ibrahim Close, Belgravia Valley, East London, Eastern Cape, 5241, South Africa

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
- Zero-dependency pure PDF 1.4 binary stream generator (`src/lib/pdf.ts`)
- Direct client email delivery via Resend API with PDF attachments

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Database / ORM:** PostgreSQL (Supabase) + Prisma ORM
- **Authentication:** NextAuth.js (JWT Strategy)
- **Payments:** Paystack South Africa (ZAR Cents, Webhooks, Subscriptions)
- **PDF Generation:** Pure PDF 1.4 Binary Generator (Zero-Dependency)
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

### 5. Run automated statutory & document numbering tests
```bash
npx vitest run
```
Expected output: **12/12 tests passed (100%)** across:
- `vat-sars.test.ts` (15.0% VAT math, exempt vs standard, Rand amount formatting in words)
- `document-numbering.test.ts` (Sequential serial prefixes `INV-YYYY-XXXX` and `QT-YYYY-XXXX`)

### 6. Build for production
```bash
npm run build
```
Compiles with strict TypeScript verification across all 12 routes and React `<Suspense>` boundaries.

---

## 💎 Design Taste & Sovereign Studio Standards

QuoteForge is engineered according to anti-AI-slop design and craft engineering standards derived from [`Donvero/hallmark`](https://github.com/Donvero/hallmark) and [`Donvero/taste-skill`](https://github.com/Donvero/taste-skill):
- **The Floor:** WCAG AAA contrast (Studio Obsidian `#08101C`, Card Navy `#0E1B2E`, Gold Accent `#FFC20E`), tactile document state toggles, and dual-pane layout that folds gracefully on mobile.
- **True-to-Life Document Geometry:** The document canvas simulates authentic South African tax invoice paper specifications, with high-density tabular line-item accounting.
- **Monospace Financial Alignments:** All rand values (`R 51,750.00`), VAT proportions, and CSD supplier codes use tabular monospace figures to ensure decimal-point alignment.
- **Zero AI Slop:** No placeholder business templates, no fake demo data in production, and zero generic marketing copy. Built strictly for South African statutory compliance.

---

## 📜 Sovereign IP, Forkability & Public View License

This repository is published for **public view, peer inspection, and statutory accounting review**.

- **Public View & Review:** Public inspection and technical evaluation are permitted.
- **Forkability & Commercial Use:** Forking, redistribution, deployment, or commercial utilization of the QuoteForge codebase, PDF generator, or billing workflows is **strictly subject to prior written approval of the owner**:
  - **Owner:** Fana Siyasanga Qhawe Mgengo ([@Donvero](https://github.com/Donvero))
  - **Entity:** ZAinnovate Technologies (Pty) Ltd (Reg: 2025/572318/07)
  - **Licensing Contact:** `director@zainnovate.co.za` | `legal@zainnovate.co.za`

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

## 🏢 Corporate Governance

**ZAInnovate Technologies (Pty) Ltd**
- **Company Registration:** 2025/572318/07
- **National Treasury CSD:** MAAA1646894
- **B-BBEE Status:** Level 1 Contributor (135% Procurement Spend Recognition)
- **Headquarters:** 14 Abdullah Ibrahim Close, Belgravia Valley, East London, Eastern Cape, 5241
- **Website:** [https://zainnovate.co.za](https://zainnovate.co.za)
- **Contact:** `billing@zainnovate.co.za` | `contact@zainnovate.co.za`

---

<div align="center">
  <sub>QuoteForge is sovereign software engineered by ZAInnovate Technologies (Pty) Ltd. Copyright © 2025–2026. All sovereign rights reserved. Built with mathematical rigor in East London, South Africa.</sub>
</div>
