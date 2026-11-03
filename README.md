# QuoteForge

Quotation, invoice, delivery-note, and purchase-order software for South African SMMEs.

QuoteForge handles ZAR documents, SARS Section 20 invoice fields, 15% VAT calculations, sequential document numbers, customer records, PDF generation, and Paystack billing. It is built for contractors, freelancers, suppliers, and tenderers who need records they can send and reconcile.

## Current scope

- Next.js App Router, TypeScript, Prisma, PostgreSQL, and NextAuth.
- Document and line-item persistence.
- VAT and Rand amount-in-words utilities.
- PDF generation and email dispatch.
- Paystack webhook integration.

## Development

```bash
npm ci
npm run dev
npm test
npm run build
```

Set `DATABASE_URL`, `NEXTAUTH_SECRET`, and payment/email credentials before testing connected flows. Production authentication requires a stored password hash or another configured identity provider. Demo authentication and fake banking details must never be enabled in production.

## Correctness rules

- Use exact decimal handling for money at persistence and payment boundaries.
- Validate VAT numbers, document ownership, dates, line items, and totals server-side.
- Scope every document query to the authenticated company.
- Treat payment webhooks as signed, replay-safe state transitions.
- Never render placeholder banking details or claim an email was sent when no provider accepted it.

## License

See `LICENSE`.
