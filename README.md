# UNIT-07 — Cyborg-Themed Landing Page

Built for the Techfest IIT Bombay Campus Ambassador Program — Task: *Cyborg-Themed Landing Page Development*.

## Concept

A recruitment landing page for a fictional dev program, framed as a "rebuild" — half organic, half machine. The cyborg portrait at the center is the page's signature element: a hand-built SVG face with a glowing, cursor-tracked mechanical eye and an animated scan line, set against a calm organic half. The idea: every developer who builds real things under pressure comes out a little bit rewired.

## Stack

Zero build step — plain HTML, CSS, and vanilla JS. No frameworks, no bundler.

- **Fonts**: Rajdhani (display), Inter (body), JetBrains Mono (HUD/data), via Google Fonts
- **Visuals**: hand-coded inline SVG (the cyborg portrait + module icons)
- **Interactions**: cursor-tracked iris, animated scan line, scroll-triggered reveals via `IntersectionObserver`, animated diagnostic bars, button shimmer on hover

## Structure

- `index.html` — markup + all styling (single file, no external CSS)
- `script.js` — portrait injection, eye tracking, scan line loop, entrance sequence, scroll reveals

## Running locally

No install needed. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Sections

1. **Hero** — pitch + cyborg portrait
2. **System Diagnostics** — animated stat bars (skills as vitals)
3. **Upgrade Path** — 3-stage process (Calibration → Build Cycle → Field Deploy)
4. **System Modules** — 4 feature cards
5. **Final CTA** — enlistment call to action
