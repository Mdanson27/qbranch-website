#!/usr/bin/env python3
"""Inject the reusable QBranch experience layer into generated static pages."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
version='20261123-showcase1'
for page in ROOT.glob('*.html'):
 txt=page.read_text(encoding='utf-8')
 if 'assets/showcase.css' not in txt:
  assert '</head>' in txt, page
  txt=txt.replace('</head>',f'<link rel="stylesheet" href="assets/showcase.css?v={version}"></head>',1)
 if 'assets/showcase.js' not in txt:
  assert '</body>' in txt,page
  txt=txt.replace('</body>',f'<script src="assets/showcase.js?v={version}" defer></script></body>',1)
 page.write_text(txt,encoding='utf-8')
 print(page.name,'integrated experience layer')
p=ROOT/'scripts'/'build.py';s=p.read_text(encoding='utf-8')
needle='<link rel="stylesheet" href="assets/site.css"'
if needle in s and 'assets/showcase.css' not in s:
 s=s.replace(needle,needle+'><link rel="stylesheet" href="assets/showcase.css?v='+version+'"',1)
# Avoid `<link ...>` malformed if original string had closing `>`; correct if needed.
s=s.replace('href="assets/showcase.css?v='+version+'"><', 'href="assets/showcase.css?v='+version+'"><')
if 'assets/showcase.js' not in s:
 s=s.replace('{intro_script}</body></html>', '{intro_script}<script src="assets/showcase.js?v='+version+'" defer></script></body></html>',1)
p.write_text(s,encoding='utf-8')
README=ROOT/'README.md';text=README.read_text(encoding='utf-8')
text+='''\n\n## Enhanced media and interactive experience (23 November 2026)\n- Original visual assets in `assets/visuals/`: ten SVG illustrations, one QBranch-themed AI-generated conceptual image, a silent original 10.5-second MP4 visual montage and a poster. Illustrations and footage are **not actual QBranch employees, customers or documented jobs**.\n- Home/About service cards and project/focus cards support a keyboard-operable flip control, with clear back-side information and original CTAs. Product cards have an accessible quick-view dialog. Technology cards include photo/illustration tiles and hover glow.\n- A muted, user-controllable video is included in the homepage; it pauses offscreen and on hidden tabs. Prefers-reduced-motion disables automatic playback.\n- Pexels/Unsplash stock imagery is illustrative, loaded externally where available, with original local SVG fallbacks. Stock content must not be represented as QBranch project evidence.\n- The 'Technology brands in the catalogue' section is **not** an endorsement, reseller agreement or official partnership claim. Names/marks reflect brands listed on QBranch's legacy website. The former Yodgy/IBM Media/Green Host/Atomic SEO carousel appears on unrelated theme demo sites, so was not imported as verified partners.\n- `scripts/install_showcase.py` ensures generated HTML includes the enhanced CSS and JavaScript. The normal `scripts/build.py` template also loads these assets.\n- See `MEDIA_SOURCES.md` for external photo and logo source/licensing notes.\n'''
README.write_text(text,encoding='utf-8')