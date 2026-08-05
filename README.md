# Bevoky Global — Premium Website

A premium, cinematic marketing site for **Bevoky Global UG (haftungsbeschränkt)**,
a Germany-based beverage import and distribution company. Built with
React 19, Vite, React Router, Framer Motion, GSAP/ScrollTrigger, Lenis
smooth scroll, and React Three Fiber for the ambient hero atmosphere.

## Getting started

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## What's built

- **Home** - fully production-ready: cinematic hero with a mouse-reactive
  bottle, R3F ambient bubble field, animated carbonation, scroll-storytelling
  sections (About preview with animated counters, beverage categories grid,
  distribution services, a partnership timeline, a network map of markets
  served, and a full-width CTA).
- **About / Products / Contact** - premium placeholder pages on the same
  design system, ready to be filled in with final copy, team photography,
  and a real contact-form backend.

## Project structure

```
src/
  assets/images/       brand assets (logo, bottle, can - all optimized WebP)
  components/
    home/               hero + homepage sections
    layout/             Header, Footer, page-transition, scroll-to-top
    ui/                 Reveal, RevealText, MagneticButton - shared motion primitives
  hooks/                useLenis (smooth scroll + GSAP ScrollTrigger sync), useCountUp
  pages/                Home, About, Products, Contact
  styles/               variables.css (design tokens), global.css
```

## Design system

All colors, type, spacing, radii, and motion easings are CSS custom
properties in `src/styles/variables.css` - change the palette or type
scale there and it propagates everywhere. Headings use Montserrat, body
copy uses Open Sans, per the brief.

## Notes for the next pass

- **Hero bottle**: built from your uploaded bottle photo with layered
  CSS treatment (mouse-parallax tilt, moving golden reflection sweep,
  animated internal carbonation, ambient halo/glow) rather than a modeled
  3D asset - there was no 3D source file to render from. If you get a
  `.glb`/`.gltf` model made (or want one commissioned), swapping it into
  `HeroBottle.jsx` with `@react-three/drei`'s model loader is a
  straightforward next step and would let the bottle handle physical
  lighting/reflections more accurately than the current image-based approach.
- **Category cards & About image**: use gradient/color-field treatments
  and your product photography rather than lifestyle photography (warehouses,
  bars, pouring shots, etc.) - there was no way to source real stock
  photography here. Swap in licensed photos when you have them; the
  card and section layouts are already built to hold them.
- **Markets map**: an abstract network diagram (not a literal geographic
  map) showing Germany as the hub with animated routes to partner
  countries - easy to swap for a real SVG map of Europe later if you want
  literal geography.
- **Contact form**: styled and validated client-side but not wired to a
  backend/email service yet - hook up `handleSubmit` in `Contact.jsx` to
  your provider of choice (Formspree, a serverless function, etc.).
