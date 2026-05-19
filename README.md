# E‑Commerce Storefront

Production-style e‑commerce UI built for the **SDE-2 Frontend Engineering** take-home: **product discovery, cart, and a full mock checkout** — no backend; data is local.

## What’s included

- **Browse** — Home with flagship hero panels and category rails; category listing at `/category/[id]` with price filters and sort; product detail at `/category/[id]/product/[productId]` (reviews, related products, gallery).
- **Cart** — Slide-over bag with line items, quantities, and totals (INR). Cart persists in `localStorage` via Zustand.
- **Checkout** — Multi-step flow on `/cart`: bag summary → delivery → payment card UI → confirmation receipt (simulated success / no real gateway).
- **UX** — Dark/light theme, responsive layouts, editorial typography tokens, shadcn-style UI, view transitions on key navigations where enabled.

## Tech stack

| Layer     | Choice                                  | Why                                                          |
| --------- | --------------------------------------- | ------------------------------------------------------------ |
| Framework | **Next.js 16** (App Router)             | SSR/SSG-friendly, file-based routing, image optimization.    |
| Language  | **TypeScript**                          | Safer refactors and shared types for products/cart.          |
| Styling   | **Tailwind CSS v4** + CSS variables     | Fast UI work; theme tokens in `app/globals.css`.             |
| State     | **Zustand** + `persist`                 | Minimal boilerplate for cart + sheet open state.             |
| UI        | **Radix / shadcn patterns**, **Motion** | Accessible primitives; motion for hero/cart affordances.     |
| Data      | **Mock** in `lib/data.ts`               | Assignment allows no backend; easy to swap for an API later. |

Other libraries: `next-themes`, `sonner`, Tabler/Lucide icons, Embla (where used).

## Getting started

**Requirements:** Node.js 20+ recommended, `npm` / `pnpm` / `yarn`.

### Install

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build & run

```bash
npm run build
npm start
```

Same with pnpm: `pnpm build` then `pnpm start`.

### Lint

```bash
npm run lint
```

## Project map (high level)

```
app/
  (www)/                 # Storefront routes (layout + header/footer)
    page.tsx             # Home
    category/[id]/       # PLP
    category/.../product/[productId]  # PDP
    cart/page.tsx        # Checkout flow
components/              # Cards, drawer, navigation, UI kit
lib/
  data.ts                # Products & categories
  store.ts               # Zustand cart
  money.ts               # INR formatting & shipping helpers
```

## Design decisions

1. **INR everywhere** — Single `formatInr` / thresholds in `lib/money.ts` so cart, PLP, and PDP stay consistent.
2. **Cart persistence** — Only the cart is persisted to avoid surprising resets on refresh.
3. **Mock checkout** — Final step clears the cart and shows a receipt; no PCI or real PSP — appropriate for a frontend exercise.
4. **Category routing** — Nested `/category/[id]/product/[productId]` keeps URLs shareable and matches mental model “category → product”.
5. **Alternate routes** `/cart/delivery` and `/cart/payment` **redirect to `/cart`** so there is one canonical checkout.

## What I’d add with more time

- **Real API** — Products, inventory, and prices from a service; cart sync for logged-in users.
- **Auth & orders** — Account, order history, transactional email hooks.
- **Payments** — Stripe (or similar) with server-side payment intents; never card data on the client beyond tokenization.
- **Search & facets** — URL-driven filters, debounced search, SEO for PLP/PDP.
- **Tests** — Playwright for checkout smoke paths; unit tests for cart reducers and money math.
- **README deployment** — Environment variables, preview URLs, and accessibility audit (WCAG) pass.

## Assignment alignment

This repo is intended to satisfy the brief: **React/Next**, **TypeScript**, **CSS (Tailwind)**, **client state (Zustand)**, **mock catalog**, **browsing + purchase flow**, runnable with standard **install + dev/start** commands. Replace this README’s top section with your **public GitHub URL** when you submit.

---

Built with [Next.js](https://nextjs.org).
