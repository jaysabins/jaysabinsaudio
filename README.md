# jaysabinsaudio.com

Personal portfolio for Jay Sabins, AAA game sound designer. One static page, no build step.

## Editing content

All content lives in `js/data.js`:

- `PROFILE`: reel link, stat row, bio, tools, résumé, email, LinkedIn.
- `GAMES`: shipped titles, newest first. Put key art in `assets/keyart/`.
- `TECH`: tools and systems. Leave `result` as `null` until there's a real number.

Anything left `null` or empty is hidden on the page. Search for `TODO` to see what's still missing.

## Design

`css/tokens.css` is shared with sabinssound.com and must stay identical in both repos.
The headline face is the `--title` token and the accent is `--accent`.

## Local preview

    python3 -m http.server 8000

## Deploy

GitHub Pages, free. Settings → Pages → "Deploy from a branch", branch `main`, folder `/ (root)`.
`CNAME` sets the custom domain to jaysabinsaudio.com. Pages from a private repo needs a paid
GitHub plan, so keep this repo public.

The contact form posts to Formspree (free plan, 50 messages a month). Set
`PROFILE.formEndpoint` in `js/data.js` to the form's endpoint. `_gotcha` is the honeypot field.
