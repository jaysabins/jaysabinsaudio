# jaysabinsaudio.com

Personal portfolio for Jay Sabins, AAA game sound designer. One static page, no build step.

## Editing content

All content lives in `js/data.js`:

- `PROFILE`: reel link, stat row, bio, tools, résumé, email, LinkedIn.
- `GAMES`: shipped titles, newest first. Put key art in `assets/keyart/`.
- `TECH`: tools and systems. Leave `result` as `null` until there's a real number.

Anything left `null` or empty is hidden on the page. Search for `TODO` to see what's still missing.

## Design

`css/tokens.css` holds the colors, fonts, and spacing. The accent is `--accent`.

## Local preview

    python3 -m http.server 8000

## Deploy

GitHub Pages, free, built by `.github/workflows/pages.yml` from two branches:

- `staging` → a hidden folder named by the `STAGING_PATH` repo secret (Settings → Secrets and variables → Actions), not indexed. Without the secret it falls back to `/staging/`. Changes land here first for review.
- `main` → `/` (the live site). Merge `staging` into `main` to publish.

Until launch, `holding/` exists on `main` and the live address shows a holding page.
To launch, delete `holding/` on `main`.

One-time setup: make the repo public (Pages on a private repo needs a paid plan),
then Settings → Pages → Source: GitHub Actions, and add jaysabinsaudio.com as the custom domain.
In Settings → Environments → github-pages → Deployment branches, allow both `main` and `staging`.

The contact form posts to Formspree (free plan, 50 messages a month). Set
`PROFILE.formEndpoint` in `js/data.js` to the form's endpoint. `_gotcha` is the honeypot field.
