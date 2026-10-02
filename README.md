<div align="center">

<br />

<img src="public/logo.svg" width="64" height="64" alt="axiom" />

# axiom

**Precision-cut interface primitives, live-rendered.**

A living library of motion-grade UI primitives — every tile on the site is
the component itself, live and interactive. No screenshots, no video loops,
no raster images: pure CSS, SVG and one motion dependency. First-class
light and dark themes from a single token system.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=black)](https://tailwindcss.com/)
[![framer-motion](https://img.shields.io/badge/framer--motion-12-E879F9?style=flat-square)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-2DD4BF?style=flat-square)](https://github.com/srivtx/axiom/pulls)

<br />

</div>

## What's inside

**38 primitives · 10 families · 76 alternate forms**, each with its own
page, live stage, variant switcher, import line and design notes:

| Family | Primitives |
| --- | --- |
| **Ambience** | Corona, Flux, Trace Grid, Beam Lines, Aurora Veil |
| **Buttons** | Sheen, Sweep, Halo, Notch, Pop, Candy |
| **Cards** | Pointer Card, Halo Card, Stack Deck, Voice Card |
| **Kinetic Type** | Flip Cycle, Morph Stream, Cascade, Glitch, Roll Digits |
| **Dimension** | Iso Stage, Tilt Card, Ribbon, Orbit Cam |
| **Galleries** | Orbit Gallery, Diagonal Rail, Cursor Trail |
| **Navigation** | Notch Bar, Spotlight Bar, Glass Dock |
| **Loaders** | Kinetic, Shutter, Orbit Dot |
| **Inputs** | Goo Search, Type Deck |
| **Showcase** | Player Deck, Orbit System, Peek Folder |

## The site

Every route is statically rendered and URL-addressable:

| Route | What lives there |
| --- | --- |
| `/` | The hero — a pointer-parallax collage of live primitives — plus four curated family passes |
| `/library` | The full catalogue: family sidebar, search, live tiles |
| `/library/[family]` | A family pass with its own count and blurb |
| `/library/[family]/[id]` | A page per primitive: live stage, `?v=` variant deep-links, import line, related entries, keyboard navigation |
| `/docs` | Getting started, the three laws, the token table |
| `/changelog` | Release notes, one entry per release |

## Highlights

- **Live, not recorded.** Every stage renders the real component — hover,
  drag, type and scroll them directly on the page.
- **Dual theme, one system.** Semantic design tokens flip between light and
  dark; demo stages are deliberate dark islands in both, so component
  lighting never needs re-tuning.
- **Zero raster assets.** All backgrounds, glows and geometry are CSS
  gradients, SVG and registered custom properties — the whole library ships
  as markup and styles.
- **Keyboard-complete.** Full focus-visible parity, Esc/arrow-key detail
  navigation, `prefers-reduced-motion` respected on every ambient loop.
- **Responsive by construction.** The alternating catalogue stacks cleanly
  from 360px up, with horizontally scrollable family filters.

## The three laws

1. **Motion budget.** One ambient loop + one 200ms affordance per surface.
   Ambient clocks live between 6s and 60s — motion you can stare at.
2. **Contrast floor.** Text over any animated background holds 4.5:1 against
   the worst-case frame. Glows cap at 16% opacity.
3. **Borrow the physics.** Every effect decomposes into primitives you
   already own — custom properties, `offset-path`, `preserve-3d`,
   `conic-gradient`. Take the technique; it composes with your system.

## Run it

```bash
bun install
bun run dev
```

Open <http://localhost:3000>.

## Project structure

```
src/
├── app/
│   ├── page.tsx               # home: hero collage + curated passes
│   ├── library/               # catalogue + [family] + [family]/[id] routes
│   ├── docs/                  # getting started, laws, tokens
│   ├── changelog/             # release log
│   ├── icon.svg               # identity tile (favicon)
│   ├── opengraph-image.tsx    # generated 1200×630 social card
│   └── globals.css            # the token system (light + dark)
├── components/
│   ├── ax/                    # the primitive library (10 family modules)
│   └── site/                  # page chrome: hero, rows, catalogue, detail
└── lib/registry.ts            # catalogue data: families, entries, variants
```

## Stack

- Next.js 16 (App Router) · React 19
- TypeScript strict
- Tailwind CSS v4 (CSS-first token system)
- framer-motion 12
- Geist type system
- lucide icons

## License

MIT — steal the technique, keep the craft.
