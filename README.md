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

Static HTML/CSS/JS, with no frameworks or package dependencies. Relative internal URLs support GitHub Pages project subpaths. `Qbranch-logo.png` is the original repository logo. Google Fonts and Unsplash illustrative photos are remotely hosted; replace illustration photography with approved QBranch photos when available.

## Functionality

- 9 semantic pages plus 404 page
- Responsive mobile navigation, sticky header, active-page state
- Accessible navigation, skip link and reduced-motion support
- Search overlay (Ctrl/⌘ + K) with local site index
- Product-category filters, back-to-top, scroll progress and scroll reveals
- Enquiry form checks fields and prepares mail via `mailto:`; **it does not submit to a backend or automatically deliver mail**
- Contact links, map search, SEO metadata and sitemap

## Important editorial notes

Numbers (15K clients, 10K projects, 992 awards), conflicting years of experience, demo testimonials, and unverified customer logos from the old site were deliberately omitted. The original site's project headings are presented as **areas of expertise**, not confirmed completed projects. Correct postal box and all client claims should be verified before using the company’s main domain. The form needs a confirmed mail-delivery service if fully automatic submission is required.

## Local preview

Run `python3 -m http.server 8080` in the repository root, then visit http://localhost:8080 .

## Rebuild content

If needed, rerun `python3 scripts/build.py` to regenerate static HTML pages from the page generator; shared CSS and JS are in `assets/`. The generator does not replace the logo.