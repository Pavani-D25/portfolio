# Pavani D — Portfolio

An editorial-style portfolio built on the same formula used by award-winning
studio sites (Cappen, Lisovskiy, Twice): near-monochrome palette, oversized
serif typography, buttery-smooth inertia scrolling, and GSAP-driven text
reveals — not decoration, motion craft.

## Stack

Next.js 14 (App Router, TypeScript) · Tailwind CSS · GSAP + ScrollTrigger ·
Lenis (smooth scroll) · Fraunces (serif) + Inter (sans) via `next/font/google`

## Before you deploy — fill these in

Open `src/lib/data.ts` and update:

- `profile.linkedin`, `profile.github` — currently placeholder URLs.
- `profile.githubUsername` — set to your real GitHub handle to activate the
  live stats line in the About section.
- `project.demoUrl` for FloorPlanTo3D / MindBloom / FaceEcho — currently `#`.

## Getting started locally

```bash
cd portfolio
npm install
npm run dev
```

Visit http://localhost:3000. If you had an older copy of this project
running already, stop that dev server first (Ctrl+C) and restart it from
THIS folder — otherwise your browser may still show the old version.

## Wiring up the contact form to actually send email

`src/app/api/contact/route.ts` validates and rate-limits submissions and logs
them server-side. To have it actually email you, the fastest path is Resend
(https://resend.com, free tier, 2-minute setup):

```bash
npm install resend
```

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "portfolio@yourdomain.com",
  to: "dpavani1125@gmail.com",
  subject: `New message from ${name}`,
  text: message,
  replyTo: email,
});
```

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo at vercel.com/new — zero config needed.

## Project structure

```
src/
  app/
    api/contact/route.ts
    api/github/route.ts
    layout.tsx
    page.tsx
    globals.css
  components/
    SmoothScroll.tsx, Reveal.tsx, Cursor.tsx,
    Hero, About, Work, WorkPreview, Marquee,
    Experience, Certifications, Contact, Footer, LabelRow, GithubStats
  lib/
    data.ts   <- ALL site content, edit this first
```

Verified with a full `npm install && tsc --noEmit && next build` pass before
delivery.
