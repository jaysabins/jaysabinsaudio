(() => {
  const P = window.PROFILE, GAMES = window.GAMES || [], TECH = window.TECH || [];
  const { esc, chips, award, embedUrl, player, tilt, reveal } = window.SITE;
  const $ = (id) => document.getElementById(id);

  $("year").textContent = new Date().getFullYear();

  // Games: each card opens that title's page
  $("games").innerHTML = GAMES.map((g) => {
    const meta = [g.role, g.studio, g.year].filter(Boolean).join(" · ");
    const art = g.art
      ? `<img src="${esc(g.art)}" alt="${esc(g.title)} key art" loading="lazy" decoding="async">`
      : `<span class="ph">${esc(g.title)}</span>`;
    return `<li><a class="card game-card" href="game.html?g=${encodeURIComponent(g.slug)}">
      <div class="art">${art}${award(g.awards)}</div>
      <div class="card-body">
        <h3>${esc(g.title)}</h3>
        ${meta ? `<p class="meta">${esc(meta)}</p>` : ""}
        ${chips(g.platforms)}
        <span class="card-link">View work →</span>
      </div>
    </a></li>`;
  }).join("");
  tilt(document.querySelectorAll(".game-card"));

  // Tech: each card opens that item's page
  $("tech-list").innerHTML = TECH.map((t) => `<li><a class="card tech-card" href="tech.html?t=${encodeURIComponent(t.slug)}">
      <div class="card-body">
        ${t.kind ? `<span class="tag">${esc(t.kind)}</span>` : ""}
        <h3>${esc(t.title)}</h3>
        ${t.context ? `<p class="meta mono">${esc(t.context)}</p>` : ""}
        ${t.desc ? `<p class="desc">${esc(t.desc)}</p>` : ""}
        ${t.result ? `<p class="result">${esc(t.result)}</p>` : ""}
        ${chips(t.stack)}
        <span class="card-link">See more →</span>
      </div>
    </a></li>`).join("");
  tilt(document.querySelectorAll(".tech-card"));

  // About
  const bio = Array.isArray(P.bio) ? P.bio : P.bio ? [P.bio] : [];
  const linkify = (s) => esc(s).replace(/\[([^\]]+)\]\(((?:https:\/\/|[\w-]+\.html)[^)\s]*)\)/g, '<a href="$2">$1</a>');
  $("bio").innerHTML = bio.map((p) => `<p>${linkify(p)}</p>`).join("");
  $("portrait").innerHTML = P.headshot
    ? `<img src="${esc(P.headshot)}" alt="${esc(P.name)}" loading="lazy">`
    : `<div class="portrait-ph" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18"/><path d="M14 96c2-22 17-34 36-34s34 12 36 34z"/></svg><span>Headshot</span></div>`;
  const ICONS = {
    Instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>`,
    LinkedIn: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.6 4.78 6V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.64V21h-4z"/></svg>`,
  };
  const socials = [["Instagram", P.instagram], ["LinkedIn", P.linkedin]].filter(([, u]) => u);
  if (socials.length) {
    $("socials").innerHTML = socials.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${n}" title="${n}">${ICONS[n]}</a></li>`).join("");
    $("socials").hidden = false;
  }
  $("skills").innerHTML = [...(P.disciplines || []), ...(P.skills || [])].map((d) => `<li>${esc(d)}</li>`).join("");
  if (P.tools.length) { $("tools").textContent = P.tools.join(" · "); $("tools").hidden = false; }
  if (P.resume) { $("resume").href = P.resume; $("resume").hidden = false; }

  // Contact
  if (P.email) {
    $("email").innerHTML = `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`;
    $("email").hidden = false;
  }
  $("links").innerHTML = [["LinkedIn", P.linkedin], ["GitHub", P.github]]
    .filter(([, url]) => url)
    .map(([label, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${label} ↗</a></li>`).join("");

  // Contact form: posts to Formspree; the _gotcha field is the honeypot
  const form = $("contact-form"), status = $("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!P.formEndpoint) { status.textContent = "The form isn't connected yet."; return; }
    const btn = form.querySelector("button");
    btn.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch(P.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = "Thanks. I'll be in touch.";
    } catch {
      status.textContent = P.email ? `That didn't send. Email me at ${P.email} instead.` : "That didn't send. Please try again.";
    } finally {
      btn.disabled = false;
    }
  });

  // Reel: the play button is the first thing on the page; the embed loads on click
  const src = embedUrl(P.reel);
  const play = $("reel-play");
  if (P.reelNote) { $("reel-meta").textContent = P.reelNote; $("reel-meta").hidden = false; }
  if (src) {
    player(play, $("reel"), src, "Jay Sabins demo reel");
  } else {
    // TODO: remove once PROFILE.reel is set
    play.setAttribute("aria-disabled", "true");
    $("reel-label").textContent = "Reel coming soon";
  }

  reveal();
})();
