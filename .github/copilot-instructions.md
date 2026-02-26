# Copilot instructions

## Project overview

- Next.js App Router project using `src/app` for routes and layouts.
- Pages compose UI blocks from `src/ui` and `src/app/_components` (see `src/app/page.tsx` and `src/app/projects/[slug]/page.tsx`).
- Interactive/animated UI is implemented as client components (`'use client'`) using GSAP or Three.js.

## Key directories and patterns

- `src/app/_components`: home-page sections like `HeroHeadlineGSAPTyping` and `WorkCategoriesGSAPSection`.
- `src/ui/common`: reusable content blocks (`TitleBlock`, `QuoteBlock`, `ImageStack`).
- `src/ui/features`: higher‑order interaction patterns (`WithSticky`, `WithTilt`) and visuals (`backgrounds/GridDistortion`).
- `src/ui/SlideDeck` and `src/ui/Slider`: scroll/GSAP-driven decks and carousels.

## Styling conventions

- Tailwind v4 is configured via `@theme` in `src/app/globals.css` (custom widths, pattern utilities).
- Component-specific styles use SCSS modules (e.g., `src/ui/header/header.module.scss`, `src/ui/SlideDeck/SlideDeck.module.scss`) mixed with Tailwind utility classes.

## Animation/graphics conventions

- GSAP animations are set up inside components and registered locally (see `src/ui/features/WithSticky/index.tsx` and `src/ui/SlideDeck/SlideDeck.tsx`).
- Three.js shader effects live in `src/ui/features/backgrounds/GridDistortion/index.tsx` with explicit cleanup in `useEffect`.
- Any component touching `window`, `document`, GSAP, or Three.js should remain a client component.

## Assets and media

- Runtime assets are served from `public/` (e.g., `public/backgrounds`, `public/projects`).
- Seed/demo imagery is referenced via `/seed/...` in `SlideDeck` and `Slider`; ensure assets are placed under `public/seed` if adding new items.

## Imports and typing

- Use the `@/` path alias for `src` (configured in `tsconfig.json`).
- TypeScript is `strict`; avoid `any` and keep props typed.

## Developer workflows

- `pnpm dev` runs `next dev --webpack`.
- `pnpm build` runs `next build --webpack`.
- `pnpm lint` runs ESLint.
