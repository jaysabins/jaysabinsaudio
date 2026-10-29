# jaysabinsaudio.com

Personal portfolio for Jay Sabins, game sound designer. A static home page with anchor navigation, plus one shared game page (`game.html?g=<slug>`) per shipped title.

## Stack

- Plain HTML/CSS/JS, no build step, no dependencies. Keep it that way unless there's a strong reason.
- Hosting: GitHub Pages only, deployed by `.github/workflows/pages.yml` (Pages source: GitHub Actions). Don't add other hosting platforms or paid services.
- Branches: `staging` deploys to `/<STAGING_PATH>/` (repo secret, hard-to-guess folder name; `/staging/` if unset; noindex) for Jay to review; `main` deploys to `/` (live). Work on `staging` first; changes reach `main` only through a PR Jay approves.
- Pre-launch: while `holding/` exists on `main`, the live address shows `holding/index.html`. Launch = delete `holding/` on `main`.
- Contact form: Formspree free plan, posted with `fetch` from `js/main.js`. Endpoint is `PROFILE.formEndpoint` in `js/data.js`; `_gotcha` is the honeypot field.

## Files

- `index.html`: home page shell, meta tags, structured data.
- `game.html`: game page shell; `js/game.js` fills it from the `GAMES` entry whose `slug` matches `?g=`.
- `css/tokens.css`: design tokens (colors, fonts, spacing).
- `css/site.css`: layout and components.
- `js/data.js`: all content (`PROFILE`, `GAMES`, `TECH`). Fields set to `null` or `[]` are hidden on the page.
- `js/common.js`: helpers shared by both pages (escaping, chips, YouTube/Vimeo embeds loaded on click, card tilt).
- `js/main.js`: renders the home page data, the reel embed (loaded on click), and the contact form.
- `js/accent-picker.js`: design-time panel (bottom-right dot): accent, glow strength, background, card color, and heading/body/data fonts (every dropdown lists all sans and monospace fonts). Shown only on noindex (staging) pages and non-live hosts; delete it and its `<script>` tag before launch, once Jay's values are set in `tokens.css`.

## Content rules

- Never invent titles, credits, numbers, or tools. Leave the field empty and the page hides it.
- Anything committed is public, including history. Don't commit content before Jay has cleared it for publication.
- `TECH[].result` is the most important line on a tech card. Leave it `null` rather than writing filler.

## Page structure

1. Header (not sticky): "Jay Sabins" with "Sound Designer / Game Developer" underneath, smaller and lighter; anchors Work · Tech · About · Contact.
2. Reel, directly under the header: 16:9 panel with a large play button in the accent. It is the first thing a visitor can press. The YouTube/Vimeo embed loads on click.
3. `Games/`: 16:9 key-art cards, newest first: title, role · studio · year, platform chips. Each whole card links to its game page and tilts slightly toward the pointer (mouse only, off with reduced motion).
4. `Tech/`: flat cards: title, context, description, result line, stack chips, link.
5. `About/`: bio, three disciplines, mono tools line, résumé PDF link.
6. `Contact/`: form plus selectable email, LinkedIn, GitHub.
7. Footer: © year, one link to sabinssound.com.

Game page: back link, key-art banner, title, role · studio · year, then `Clips/`: one card per area of the game Jay worked on (`GAMES[].videos`, each `{ title, url, desc }`), embed loaded on click. Empty `videos` shows placeholder tiles; then newer/older links.

No hero headline or tagline: Jay dropped "Sound for games people play." Section headings are one word plus an accent slash.

## Design system

- Direction "6A" (Oct 2026): flat, dark, single theme. Tokens in `css/tokens.css`.
- Type: Sora (300 for big headings, 600 for names and card titles) and Fira Code for small data (context lines, chips).
- Colors: `--bg #0d1117`, `--surface #151b23`, `--line #34383e`, one accent `--accent #3fc48a` for the play button, heading slashes, primary button, focus rings, and links.
- Flat: hairline borders, 8px radii, no drop shadows, no gradients. The one exception is a neon glow on accent-colored items, set by `--glow` (0 = off) via `--glow-box` / `--glow-text`.

## Quality bar

- Works at phone width (390px) with no horizontal scroll.
- Lazy-load key art; load the reel iframe only on click; respect `prefers-reduced-motion`.
- Visible focus states, alt text on key art, contrast checked against the accent.
- SEO: title "Jay Sabins | Sound Designer / Game Developer", meta description, OG image, `Person` JSON-LD with `sameAs`.

## Local preview

    python3 -m http.server 8000

All asset paths are relative so the same files work at `/` and the staging folder. Keep them relative.
