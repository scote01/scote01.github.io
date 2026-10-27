# Sylvestre Côté — Bilingual Portfolio

A professional, responsive portfolio for **Sylvestre Côté**, built around his experience in delivery coordination, customer relations, retail and operational support. The site is fully bilingual (French and English), with **French as the default language**.

## Highlights

- Complete French / English experience with no mixed-language states
- Typed translation dictionary and a small React context (no heavyweight i18n dependency)
- Responsive layout for mobile, tablet and desktop
- Sticky navigation with scroll spy and an accessible full-screen mobile menu
- Timeline-based professional experience, clearly separating salaried roles from occasional family support
- Skills grouped by category, with no arbitrary percentage bars
- CEFR language levels (French native, English C1, Spanish B2)
- Real `mailto:` / `tel:` links, a working copy-email button, and a real CV download
- No contact form and no backend, clearly explained in the contact section
- SEO metadata in both languages, Open Graph image, favicon, JSON-LD, `robots.txt` and a custom 404 page
- Reduced-motion support, visible focus states, semantic headings and a skip link
- No cookies, no analytics and no tracking

## Tech stack

- **React 19** + **TypeScript 7**
- **Vite 8**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Lucide React** for interface icons
- **Fraunces** and **Manrope** variable fonts, self-hosted via Fontsource
- **oxlint** for linting

No routing library, UI framework, backend or database is required.

## Getting started

Requirements: **Node.js 20.19+ or 22.12+** (Node 24 is recommended) and npm.

```bash
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript project build check |
| `npm run lint` | Run oxlint |

## Project structure

```text
.
├── public/
│   ├── cv/
│   │   └── Sylvestre-Cote-CV-FR.pdf   # Sanitized CV served by the website
│   ├── 404.html                       # Static custom 404 page
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   ├── favicon.svg
│   ├── icon-512.png
│   ├── og-image.png                   # 1200 × 630 social preview
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/                    # Section and UI components
│   ├── config/site.ts                 # Contact details and CV paths
│   ├── hooks/useScrollSpy.ts
│   ├── i18n/
│   │   ├── context.ts                 # Language context + useLanguage hook
│   │   ├── dictionary.ts              # Full FR/EN content
│   │   └── LanguageProvider.tsx       # Persistence, URL and document metadata
│   ├── App.tsx
│   ├── index.css                      # Tailwind theme and design tokens
│   └── main.tsx
├── index.html                         # Initial French SEO shell
├── vite.config.ts
└── README.md
```

## CV setup

The published CV is stored at:

```text
public/cv/Sylvestre-Cote-CV-FR.pdf
```

It is a sanitized copy of the supplied CV: marital status, hobbies and the PDF's original metadata were removed. No street address is present. The original source file (`cv logi.pdf`) stays in the project root, is listed in `.gitignore`, and is **not** part of the repository or the deployed site.

To update the published CV, replace the file in `public/cv/` while keeping the same filename, or update `SITE.cvFr` in `src/config/site.ts`. Check the replacement for private information before committing it.

Only the **French CV** is available today. The site deliberately does not machine-translate or publish a second CV. When an approved English CV exists:

1. Add it to `public/cv/`, for example `Sylvestre-Cote-CV-EN.pdf`.
2. Set `cvEn` in `src/config/site.ts` to that path.
3. The main CV buttons will automatically offer the English PDF when the interface is in English and the French PDF otherwise.

## Internationalisation

- French is the default language.
- The language can be changed with the visible **FR | EN** switcher in the header, the mobile menu and the footer.
- The selection is stored in `localStorage` and reflected in the URL:
  - French: `/`
  - English: `/?lang=en`
- Section anchors keep the query string, so `/?lang=en#experience` opens the English experience section.
- `document.documentElement.lang`, the document title, meta description, Open Graph tags, canonical URL and `hreflang` alternates are updated when the language changes.
- All copy lives in `src/i18n/dictionary.ts`. The English object is typed against the French one, so a missing key is a TypeScript error.
- If you change the metadata or add content, update both dictionaries.

## Content accuracy

All professional information comes from the supplied CV:

- Bricomarché, Gex — December 2024 to May 2026
- Temporary assignments — 2 years
- Hôtel Restaurant Bellevue — 4 years
- Espace Déco-Calligaris — 2 years
- Family property management support — 20 years, occasional and explicitly labelled **non-salaried**

No dates, employers, figures, certifications or achievements have been invented. The DAEU and PSC are the only qualifications shown. Marital status and hobbies from the original CV are intentionally not published.

## Contact behaviour

There is **no contact form**. A form would require a backend or third-party email service, and the site does not pretend to send messages. Instead:

- the email address opens the visitor's mail app (`mailto:`);
- the phone number starts a call (`tel:`);
- the email address can be copied with a button that reports success or failure;
- the contact section explains this directly.

No data is collected or stored by the site.

## SEO and deployment

The production site is deployed to GitHub Pages:

**https://scote01.github.io/**

Repository: **https://github.com/scote01/scote01.github.io**

The repository uses two branches:

- `main` — source code.
- `gh-pages` — the generated static site served by GitHub Pages.

The site is a static single-page build:

```bash
npm run build
```

To publish an update:

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch. In the repository settings, GitHub Pages must use **Deploy from a branch → `gh-pages` → `/ (root)`**.

Deployment notes:

1. The canonical URL, Open Graph URL and `hreflang` alternates are set for `https://scote01.github.io/` in `index.html` and refreshed at runtime when the language changes.
2. `public/sitemap.xml` lists the French and English URLs; `public/robots.txt` points to it.
3. `og-image.png` is referenced by absolute URL, so social previews work without JavaScript.
4. The CV is available at `/cv/Sylvestre-Cote-CV-FR.pdf`.
5. The custom `404.html` is supported natively by GitHub Pages.
6. `public/.nojekyll` prevents Jekyll processing of the deployed assets.
7. If the site ever moves to another domain or a sub-path, update `index.html`, `public/sitemap.xml`, `public/robots.txt`, `public/404.html` and, for a sub-path, Vite's `base` option.

## Accessibility

- Skip link to the main content
- Semantic landmarks and a single `h1`
- Keyboard-operable navigation, mobile menu and copy button
- Escape closes the mobile menu and focus returns to the trigger
- Focus is trapped inside the open mobile menu
- Visible `:focus-visible` outlines
- `aria-current`, `aria-expanded`, `aria-live` and descriptive labels
- Reduced-motion media query disables reveal and route animations
- Sufficient colour contrast for body text and controls

## Privacy

No cookies, analytics, advertising pixels or third-party tracking are used. The only stored preference is the selected language, kept locally in the browser.

---

© 2026 Sylvestre Côté. All rights reserved.
