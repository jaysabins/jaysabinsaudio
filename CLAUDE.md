# jaysabinsaudio.com

Personal portfolio for Jay Sabins, game sound designer. One static page with anchor navigation.

## Stack

- Plain HTML/CSS/JS, no build step, no dependencies. Keep it that way unless there's a strong reason.
- Hosting: GitHub Pages from `main` / root. `CNAME` sets jaysabinsaudio.com. Don't add other hosting platforms or paid services.
- Contact form: Formspree free plan, posted with `fetch` from `js/main.js`. Endpoint is `PROFILE.formEndpoint` in `js/data.js`; `_gotcha` is the honeypot field.

## Files

- `index.html`: page shell, meta tags, structured data.
- `css/tokens.css`: shared design tokens. Kept identical with the sabinssound.com repo; change both together.
- `css/site.css`: layout and components.
- `js/data.js`: all content (`PROFILE`, `GAMES`, `TECH`). Fields set to `null` or `[]` are hidden on the page.
- `js/main.js`: renders the data, the reel embed (loaded on click), the waveform poster, and the contact form.

## Content rules

- Never invent titles, credits, numbers, or tools. Leave the field empty and the page hides it.
- Anything committed is public, including history. Don't commit content before Jay has cleared it for publication.
- `TECH[].result` is the most important line on a tech card. Leave it `null` rather than writing filler.

## Page structure

1. Sticky header: "Jay Sabins" wordmark with meter glyph; anchors Work · Tech · About · Contact.
2. Hero: mono eyebrow, headline with one `<em>` word, one-line lede, stat row (real values only), 16:9 reel (YouTube/Vimeo, waveform canvas as poster).
3. Work: 16:9 cards, newest first: key art, title, studio, year, platform chips, role, optional breakdown link.
4. Tech: terminal-style cards: `$ cmd` bar, title, description, result line (accent left rule), stack chips, link.
5. About: bio, three disciplines, mono tools line, résumé PDF link.
6. Contact: form plus selectable email, LinkedIn, GitHub.
7. Footer: © year, one link to sabinssound.com.

## Design system

- Dark-first, single theme. One accent (`--accent`), used only for emphasized words, the primary button, the played part of the waveform, focus rings, and result rules.
- Headline face lives in `--title` (Jost now): weight ~250 h1 / 300 h2, tracking −0.035em / −0.02em, sentence case. `<em>` = weight 500 in the accent, not italic.
- Body: Public Sans 400/500/600. Data/eyebrows/chips: IBM Plex Mono with tabular numbers.
- Motifs: mono eyebrows with an accent dot; audio vernacular (timecode, sample rate, LUFS, platform chips); hairline borders (`--line`), 6–8px radii, no heavy shadows, ~88px between sections.
- The waveform reads the accent from the CSS variable; never hard-code colors in JS.

## Quality bar

- Works at phone width (390px) with no horizontal scroll.
- Lazy-load key art; load the reel iframe only on click; respect `prefers-reduced-motion`; pause the waveform offscreen.
- Visible focus states, alt text on key art, contrast checked against the accent.
- SEO: title "Jay Sabins | Sound Designer", meta description, OG image, `Person` JSON-LD with `sameAs`.

## Local preview

    python3 -m http.server 8000
