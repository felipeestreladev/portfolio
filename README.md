# Felipe Estrela, Portfolio

[Ler em português](README.pt-BR.md)

Personal portfolio of **Felipe Estrela**, a full stack developer from Toledo, Paraná, Brazil. It is a single page site built with **Next.js**, with a brutalist look: black, off-white and lime green, giant type, right angles everywhere and animation driven by **GSAP** and **Motion**.

Live at [felipeestrela.com.br](https://felipeestrela.com.br).

## Table of contents

- [Design concept](#design-concept)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [How it works](#how-it-works)
- [Customizing](#customizing)
- [Deployment](#deployment)
- [Accessibility and performance](#accessibility-and-performance)
- [License and contact](#license-and-contact)

## Design concept

**Brutalist poster.** The site avoids the usual portfolio patterns and bets on contrast and scale:

- A three color palette: black `#0B0B0B`, off-white `#F4F4EE` and lime green `#C8FF00`.
- **No rounded corners at all.** Everything is square, with 3 px borders and hard offset shadows.
- Oversized typography: **Anton** for headings, **Space Mono** for labels and **Archivo** for body text.
- Crossing slanted bands, huge numbers, outlined ghost text in the background and a spinning square badge.
- Custom components instead of the browser defaults: buttons, language switch, send method switch, form fields, scrollbar and cursor.

## Features

- **Preloader** with a 000 to 100 counter and square curtains that slide up.
- **Animated hero**: the letters of the name rise one by one, with mouse and scroll parallax.
- **About section** where the main sentence lights up word by word and numbers count up to their final value.
- **Arsenal**: 67 technologies shown as squares, grouped by category, with local SVG logos.
- **Projects** shown as a horizontal scroll pinned to the screen (on wide screens), each card with its own geometric artwork.
- **Live project status**: each card shows whether the site is online and how fast it answered.
- **Journey** with lines that draw themselves on scroll, plus education and languages.
- **Contact** with email, WhatsApp, LinkedIn, GitHub and a form that sends by **email** or by **WhatsApp**.
- **Three languages**: Portuguese, English and Spanish, and the choice is remembered in the browser.
- Square custom cursor (mouse devices only), page progress bar and a live clock for Toledo in the footer.
- Respects `prefers-reduced-motion`: visitors who ask for less motion get the site without animations.

## Tech stack

| Area | What is used |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) and React 19 |
| Language | TypeScript |
| Animation | GSAP with ScrollTrigger (scenes and scrolling) and Motion (state and components) |
| Styling | Plain CSS with design tokens, no component library |
| Fonts | Anton, Space Mono and Archivo, loaded with `next/font` |
| Icons | Local SVG paths from the simple-icons project |
| Quality | ESLint and TypeScript type checking |
| Container | Dockerfile using the `standalone` output |

## Project structure

```text
.
├── public/                  static files (link preview image)
├── src/
│   ├── app/
│   │   ├── api/status/      route that checks whether the projects are online
│   │   ├── globals.css      design tokens and the styles of every component
│   │   ├── icon.svg         favicon (the </> mark)
│   │   ├── layout.tsx       fonts, metadata and root layout
│   │   └── page.tsx         the single page
│   ├── components/
│   │   ├── Portfolio.tsx    puts everything together, handles language and loading
│   │   ├── Chrome.tsx       preloader, cursor and progress bar
│   │   ├── Header.tsx       header, language switch and full screen menu
│   │   ├── Hero.tsx         opening with the giant name and bands
│   │   ├── About.tsx        About section and numbers
│   │   ├── Stack.tsx        Arsenal of technologies
│   │   ├── Projects.tsx     projects with horizontal scroll and live status
│   │   ├── Journey.tsx      career path, education and languages
│   │   ├── Contact.tsx      contact section and form
│   │   ├── Footer.tsx       footer with the clock
│   │   └── ui.tsx           square button, icons, letters and bands
│   ├── lib/
│   │   ├── content.ts       all the content in pt, en and es
│   │   ├── icons.ts         SVG paths of the technologies
│   │   └── gsap.ts          single registration point for the GSAP plugins
│   └── proxy.ts             answers 404 to bot probes that fake Server Actions
├── Dockerfile               production image
├── .env.example             template for the environment variables
└── next.config.ts           Next.js configuration
```

## Getting started

Requirements: **Node.js 20 or newer** and **npm**.

```bash
git clone https://github.com/felipeestreladev/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No, but recommended | Email shown in the contact section and used by the form. Without it, the section shows a notice instead of the address. |

The email is **not** hard coded. Because the variable starts with `NEXT_PUBLIC_`, it is baked into the build output, so set the value **before** building the app or the image.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (`standalone`) |
| `npm run start` | Production server, after the build |
| `npm run lint` | Lints the code with ESLint |

## How it works

**Content lives in one place.** All the text of the site is in `src/lib/content.ts`, in three dictionaries (`pt`, `en` and `es`) with the same shape. TypeScript makes sure no language misses a key that the others have.

**Language is saved in the browser.** The choice is stored in `localStorage` and read with `useSyncExternalStore`. It keeps working if storage is blocked, for example in a private window.

**Project status.** `GET /api/status` runs on the server and requests each project URL with a 7 second timeout. Any answer below HTTP 500 counts as online. The browser repeats the check every minute. The URL list is fixed and comes from the content file, so a visitor cannot make the server request an arbitrary address.

**Contact form.** The site has no mail server. The send method switch picks where the message goes:
- **Email**: builds a `mailto:` link with subject and body and opens the visitor's mail app. It asks for name, email and message.
- **WhatsApp**: opens `wa.me` in a new tab with the message ready. The visitor's email is not needed, so that field disappears.

In both cases the message starts with a greeting that includes the visitor's name, in the language of the site.

**Email is rendered after hydration.** The address is only added to the page in the browser. If it were in the server HTML, email obfuscation features such as Cloudflare's would rewrite it and React would report a hydration mismatch in the console.

**Bot probes.** The site does not use Server Actions. Scanners that send fake requests with a `next-action` header get a `404` from `src/proxy.ts`, which keeps the server logs clean.

**Animation.** GSAP handles anything tied to scroll or to a timeline (the opening, parallax, number counters and the horizontal scroll of the projects). Motion handles anything tied to component state (the menu, switches, fields and the entrance of the squares). Only `transform` and `opacity` are animated, so the browser does not recalculate layout. Scroll animations use `gsap.matchMedia()`, which also switches everything off for visitors who prefer reduced motion. The pinned projects section is measured again whenever the layout changes (fonts, status text, resizes), so it never ends up in the wrong place.

## Customizing

- **Text, projects, experience and technologies**: edit `src/lib/content.ts`.
- **Colors, borders and sizes**: the variables are at the top of `src/app/globals.css`.
- **A new technology icon**: add the SVG path to `src/lib/icons.ts` using the same name as in the content. Without an icon, the square shows the first two letters.
- **A new project**: add the item in the three languages. The status route starts checking it on its own.
- **Link preview image**: replace `public/og.png` (1200 by 630). It is what WhatsApp, Discord and social networks show when the link is shared.

## Deployment

The project builds a `standalone` output and includes a `Dockerfile`:

```bash
docker build --build-arg NEXT_PUBLIC_CONTACT_EMAIL=you@example.com -t portfolio .
docker run -p 3000:3000 portfolio
```

Because `/api/status` runs on the server, the site needs a Node.js environment (a container, a VPS or a platform that supports Next.js). Plain static hosting cannot run that route.

## Accessibility and performance

- "Skip to content" link, and the page `lang` follows the selected language.
- Interactive elements have ARIA roles, keyboard support and a visible custom focus state.
- Form fields have labels, announced error messages and their own focus style.
- The full screen menu closes with the `Esc` key.
- Animations are turned off for visitors with `prefers-reduced-motion`.
- Icons are inline SVG with no extra requests, and fonts are loaded through `next/font`.

## License and contact

The code is public for reading. All rights reserved: if you want to reuse any part of it, please talk to me first.

- LinkedIn: [linkedin.com/in/felipe-gte](https://www.linkedin.com/in/felipe-gte)
- GitHub: [github.com/felipeestreladev](https://github.com/felipeestreladev)
- Website: [felipeestrela.com.br](https://felipeestrela.com.br)
