# QBranch visual sources and licensing notes — 23 November 2026

## Locally hosted original conceptual assets

`assets/visuals/*.svg`: 10 original themed illustrations authored for this website (network, surveillance, access, security, telecom, cloud, workplace, payments, products and perimeter security).

`assets/visuals/qbranch-technology-concept.webp`: AI-generated concept image of a modern network operations environment. It is **not a photograph of QBranch's premises or employees**.

`assets/visuals/qbranch-capabilities-overview.mp4` and `video-poster.webp`: silent ~10.5-second illustrative motion reel assembled from the original SVG illustrations. Shows types of services; not client/project footage. Produced by `scripts/build_showcase_assets.py`.

## Remote illustrative photography

Remote Unsplash stock imagery used in some cards through `assets/showcase.js`, with locally hosted original SVG artwork displayed if external images are unavailable:
- Technology/server racks: `photo-1558494949-ef010cbdcc31`
- Cyber protection: `photo-1563013544-824ae1b704d3`
- Surveillance/technology: `photo-1556075798-4825dfaaf498`
- Digital workplace: `photo-1519389950473-47ba0277781c`
- Computer hardware: `photo-1518770660439-4636190af475`
- General technology: `photo-1485827404703-89b55fcc595e`

Original photo sources hosted on `images.unsplash.com`; respect the Unsplash licence and any model/trademark usage restrictions. Illustrative stock imagery must never be represented as a documented QBranch project.

## Brand assets

Technology brand marks are displayed via Simple Icons (`cdn.simpleicons.org/<brand>/1559AE`), with readable text labels. Brands listed: HP, Dell, Lenovo, Acer, ASUS, Apple, Microsoft, Samsung, Canon and Epson. These are all listed as product brands on the legacy QBranch site. Their logo presentation is **not an assertion of partnership or reseller authorisation**. Respect the underlying trademarks and Simple Icons' licensing provisions. A formal partner/logo wall requires QBranch's confirmation and permission.

Yodgy / IBM Media / Green Host / Atomic SEO appear in several unrelated websites' theme-demo logo carousels, and have not been represented as QBranch's verified partners.

## Usage and quality

- Local illustrations, a first-party WebP and MP4 are shipped in GitHub Pages (site can render useful imagery without access to photo or logo CDNs).
- Only video metadata is preloaded. Playback occurs when it enters the viewport unless `prefers-reduced-motion` is enabled. Native controls allow a visitor to pause or replay.
- All product catalogue claims, availability and client/project attributions still need QBranch verification.