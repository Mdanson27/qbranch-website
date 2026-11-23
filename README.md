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


## Enhanced media and interactive experience (23 November 2026)
- Original visual assets in `assets/visuals/`: ten SVG illustrations, one QBranch-themed AI-generated conceptual image, a silent original 10.5-second MP4 visual montage and a poster. Illustrations and footage are **not actual QBranch employees, customers or documented jobs**.
- Home/About service cards and project/focus cards support a keyboard-operable flip control, with clear back-side information and original CTAs. Product cards have an accessible quick-view dialog. Technology cards include photo/illustration tiles and hover glow.
- A muted, user-controllable video is included in the homepage; it pauses offscreen and on hidden tabs. Prefers-reduced-motion disables automatic playback.
- Pexels/Unsplash stock imagery is illustrative, loaded externally where available, with original local SVG fallbacks. Stock content must not be represented as QBranch project evidence.
- The 'Technology brands in the catalogue' section is **not** an endorsement, reseller agreement or official partnership claim. Names/marks reflect brands listed on QBranch's legacy website. The former Yodgy/IBM Media/Green Host/Atomic SEO carousel appears on unrelated theme demo sites, so was not imported as verified partners.
- `scripts/install_showcase.py` ensures generated HTML includes the enhanced CSS and JavaScript. The normal `scripts/build.py` template also loads these assets.
- See `MEDIA_SOURCES.md` for external photo and logo source/licensing notes.

### Earth / Uganda visual and curated imagery (23 November 2026)

- Home hero now uses a responsive, animated Earth canvas focused on Africa, with Uganda illuminated at its geographic coordinates; it replaces the former photo, two floating quote cards and circular icon cluster.
- The previous generic capability/image mosaic has been removed. Services and projects remain interactive with keyboard-accessible flips; product quick views remain operational.
- Curated stock photos are unique by URL and selected only for relevant cards. If a photo fails to load, the card reverts to a compact icon-based layout with its actual details. No images are injected into every service/detail/industry card.
- The 5-second intro retains the white/blue binary style: 0s and 1s assemble in the exact area of the actual QBRANCH word, the word illuminates, and the slogan becomes readable around second 3.
- `assets/refinement.css`, `assets/refinement.js` and `assets/visuals/world-earth.json` are part of the finished site. Run `scripts/build.py` after modifications to the generator to keep the static files in sync. Map coordinates use Natural Earth 1:110m public-domain data.
- Nov 23: Added Toshiba, RISO and APC to product-brand catalogue. Replaced the homepage concept video with a white-and-blue moving-code illustration; reduced-motion friendly. RISO/APC use text-only wordmarks pending approved logo assets; catalogue brands are not verified partnerships.
