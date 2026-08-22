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

1. Start Postgres (either `docker compose up db` from the repo root, or your
   own local Postgres matching `DATABASE_URL`).
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` / `AUTH_SECRET`
   (generate a secret with `openssl rand -base64 32`).
3. Install dependencies and set up the database:

   ```bash
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

Seeded accounts (from `prisma/seed.ts`):

| Role     | Email                        | Password    |
| -------- | ----------------------------- | ----------- |
| Admin    | admin@thefoodie.example       | Admin123!   |
| Customer | demo@thefoodie.example        | Demo1234!   |

## Docker

From the repository root:

```bash
docker compose up --build
```

This starts Postgres and the app (migrations run automatically on
container start). The app is served at `http://localhost:3000`.

## Environment variables

See `.env.example`. `RESEND_API_KEY` is optional — without it, contact-form
and order emails are logged to the server console instead of sent.
