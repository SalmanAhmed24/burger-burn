# Bunfire Burger & Grill

A multi-page restaurant site in Next.js (App Router, TypeScript) with GSAP + ScrollTrigger and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Node 20+ recommended. Set `NEXT_PUBLIC_SITE_URL` to your real domain for canonical URLs, sitemap and Open Graph.

## Pages

| Route | File | Contents |
|---|---|---|
| `/` | `app/page.tsx` | Pinned scroll hero, story intro, ribbon, "Order these first" menu picks, statement, locations list, booking band |
| `/menu` | `app/menu/page.tsx` | Page header, full menu (all four categories rendered as HTML for SEO) with a sticky section bar that tracks your scroll |
| `/how-we-cook` | `app/how-we-cook/page.tsx` | Page header, "A day at the grill" timeline, ribbon, the four promises, statement |
| `/locations` | `app/locations/page.tsx` | Page header, location cards, "Good to know" FAQ |
| 404 | `app/not-found.tsx` | Styled not-found page |

The header (menu overlay, Book a table, Order now), footer, floating dock and booking dialog live in `app/layout.tsx`, so they persist between pages. Nav links are defined once in `lib/nav.ts`; the current page is marked with `aria-current` and highlighted in the overlay and dock.

## What's where

| Path | What it is |
|---|---|
| `components/sections/Hero.tsx` | Pinned scroll story: burger layers stack, fries, skewer, box closes. Timing lives in `stepAt` / `TOTAL`; layer positions in `layers`. |
| `components/sections/Story.tsx` | Intro, tilted ribbon, promise grid, statement. Server components. |
| `components/motion/Reveal.tsx` | Small client wrappers that add GSAP motion to those server sections. |
| `components/sections/Pages.tsx` | Full menu, home teasers, cooking timeline, FAQ. Server components. |
| `components/PageHeader.tsx` | Split header used by the inner pages (CSS-only entrance animation). |
| `components/art/HeaderArt.tsx` | Illustrations for the inner page headers. |
| `components/MenuNav.tsx` | Sticky menu section bar (IntersectionObserver + Framer Motion pill). |
| `components/sections/Commerce.tsx` | Floating quick-action dock (client). |
| `components/sections/Static.tsx` | Locations, booking band, footer (server). |
| `components/Booking.tsx` | Booking dialog: validation, focus trap, Escape to close. |
| `app/api/reservations/route.ts` | Booking endpoint. Validates fields; connect your booking system at the TODO. |
| `components/art/` | All illustrations, hand-built as SVG components. |
| `lib/content.ts` | Menu items, prices, locations, time slots. Edit content here. |
| `lib/useGsapIdle.ts` | How animations load (see Performance). |
| `app/globals.css` | Design tokens at the top, then one block per section. |

## Things to replace before launch

- **"Order now"** links point to `/menu`. Set `ORDER_URL` in `lib/nav.ts` to your ordering or delivery URL (Header and dock use it; Hero's buttons link to `/menu` directly).
- **Booking** posts to `/api/reservations`, which only validates. Add your storage or notification at the TODO.
- **Photos**: everything is illustrated. To use photography, drop images in `public/` and use `next/image`.
- **Contact and social links** in the footer are placeholders.
- **Brand**: "Bunfire" is a placeholder name. Change the wordmark in `components/Wordmark.tsx` and the metadata in `app/layout.tsx`.

## Performance notes

- Fonts (Anton, Figtree, Caveat; all OFL) are self-hosted in `app/fonts`, so there are no third-party requests and no layout shift.
- Sections without interactivity are server components, so their SVG markup doesn't ship as JavaScript.
- GSAP is code-split. Scroll animations **activate on the visitor's first interaction** (pointer move, touch, wheel, key or scroll) and then set up one section at a time in idle slices. Before that, the page shows its finished static layout.
  - Trade-off: this keeps setup out of page load, and it's also why lab tools like Lighthouse (which never interact) score it well. Real visitors pay the setup cost (~100–200 ms on a mid-range phone) at their first touch instead.
  - To set up at load instead, replace `await activated;` with `await loaded;` in `lib/useGsapIdle.ts`, using a promise that resolves on `window` `load`.
- Below-the-fold sections after the last animation use `content-visibility: auto`.
- `prefers-reduced-motion` gets a finished still layout with no pinning.
- The hero is wrapped in a plain `div` (`.hero-wrap`) so GSAP's pin spacer stays inside a React-owned node. Don't remove it: without it, navigating away from Home crashes with a `removeChild` error.
