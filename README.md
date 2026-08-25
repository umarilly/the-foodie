# The Foodie

A full-stack online food ordering app — menu browsing, cart, checkout, order
tracking, and an admin panel — built with Next.js. A complete rewrite of an
earlier PHP + vanilla JS version of the same project.

## Stack

- **Next.js 16** (App Router, Server Actions, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- **Prisma 7** + **PostgreSQL**
- **Auth.js (NextAuth v5)** — credentials login, JWT sessions, bcrypt password hashing
- **Zustand** — client-side cart state (persisted to `localStorage`)
- **Zod** — server-side validation on every mutation
- **Motion** — cart/menu micro-interactions

## Features

- Public menu browsing by category, gallery, about, contact (with newsletter
  signup and a working contact form)
- Auth: signup/login/logout, editable profile, password change
- Cart (drawer + full page) with quantity controls
- Checkout: cash-on-delivery or a simulated card payment (no real payment
  gateway is wired up — this is a portfolio project), server-recomputed
  pricing from the database (client-supplied prices are never trusted)
- Order history and a 5-step order status tracker
- Admin panel (role-gated): menu item CRUD + availability toggle, order list
  and status management, a small stats dashboard

## Local development

Local dev connects straight to the same Supabase Postgres project used in
production — no local Postgres or Docker needed.

1. Create a Supabase project, then copy `.env.example` to `.env` and fill in
   `DATABASE_URL` (transaction pooler, port 6543) and `DIRECT_URL` (direct
   connection, port 5432) from Supabase's dashboard, plus `AUTH_SECRET`
   (generate with `openssl rand -base64 32`).
2. Install dependencies and set up the database:

   ```bash
   npm install
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

Seeded accounts (from `prisma/seed.ts`):

| Role     | Email                        | Password    |
| -------- | ----------------------------- | ----------- |
| Admin    | admin@thefoodie.example       | Admin123!   |
| Customer | demo@thefoodie.example        | Demo1234!   |

## Environment variables

See `.env.example`. `RESEND_API_KEY` is optional — without it, contact-form
and order emails are logged to the server console instead of sent.
