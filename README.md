# QBranch Uganda Limited — Corporate Website

Modern multi-page static corporate website for QBranch Uganda Limited, rebuilt from the November 2026 website content audit.

## Pages

- `index.html` — Home
- `about.html` — Company background, mission and vision
- `services.html` — ICT installation and technical services
- `solutions.html` — Managed IT, data protection, infrastructure and software
- `products.html` — Filterable ICT equipment catalogue
- `industries.html` — Corporate, NGO and institutional audiences
- `projects.html` — Historic technology focus areas (not claimed as verified case studies)
- `contact.html` — Contact details and validated mailto enquiry form
- `privacy.html` — Website-specific privacy and enquiry explanation

## Deployment

Designed for **GitHub Pages**, publish from `main` / repository root. No build step.

Expected URL: https://mdanson27.github.io/qbranch-website/

Static HTML/CSS/JS, with no frameworks or package dependencies. Relative internal URLs support GitHub Pages project subpaths. `Qbranch-logo.png` is the original repository logo. Google Fonts and Unsplash illustrative photos are remotely hosted; original in-repository SVG illustrations provide image fallbacks. Replace illustrative photography with approved QBranch photos when available.

## Functionality

- 9 semantic pages plus 404 page
- Responsive mobile navigation, sticky header, active-page state
- Homepage-only 5-second binary 0/1 rain animation with QBRANCH letter assembly, skip button, reduced-motion bypass and no dependencies (`assets/intro.css`, `assets/intro.js`)
- Accessible navigation, skip link and reduced-motion support
- Search overlay (Ctrl/⌘ + K) with local site index
- Product-category filters, back-to-top, scroll progress and scroll reveals
- Enquiry form checks fields and previews an enquiry and opens the user’s mail app via `mailto:` when requested; **it does not submit to a backend or automatically deliver mail**
- Contact links, map search, SEO metadata and sitemap

## Important editorial notes

Numbers (15K clients, 10K projects, 992 awards), conflicting years of experience, demo testimonials, and unverified customer logos from the old site were deliberately omitted. The original site's project headings are presented as **areas of expertise**, not confirmed completed projects. Correct postal box and all client claims should be verified before using the company’s main domain. The form needs a confirmed mail-delivery service if fully automatic submission is required.

## Local preview

Run `python3 -m http.server 8080` in the repository root, then visit http://localhost:8080 .

## Rebuild content

If needed, rerun `python3 scripts/build.py` to regenerate static HTML pages from the page generator; shared CSS and JS are in `assets/`. The generator does not replace the logo.

## Responsive hero fit and binary intro (Nov 2026)
First-view blue banners and the homepage hero size to the viewport beneath the top and navigation bars. The homepage-only 5-second intro uses 0/1 rain, reveals QBRANCH early, and brings in “Bringing Life to Technology” around second 3 so visitors can read it before the homepage opens. Skip and reduced-motion behavior remain available.

## Rich media and interactive experience — November 2026
- Original image library: 10 technical vector illustrations, a QBranch-themed illustrative data-center image, and a first-party 10-second muted MP4 capability montage. Media files live in `assets/visuals/`.
- Service and technical focus cards flip via keyboard-accessible controls; product cards offer an accessible quick-view overlay. All cards have subtle hover/focus glow and photography or original fallbacks.
- Home page also has a visual capabilities gallery, video with native controls and pause-when-hidden behavior, and a technology-brand catalogue strip.
- 'Technology brands' are product-brand references, **not verified partnership/authorised reseller claims**. Yodgy, IBM Media, Green Host and Atomic SEO logos were not imported as partners because the same carousel appears on unrelated template sites.
- Visuals and video are illustrative, not representations of QBranch client installations. See `MEDIA_SOURCES.md` for sources and accuracy notes.
- `scripts/build.py` preserves the shared site CSS/JS imports on regeneration.
