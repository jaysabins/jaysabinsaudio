(() => {
  const P = window.PROFILE, GAMES = window.GAMES || [], TECH = window.TECH || [];
  const { esc, chips, embedUrl, player, tilt, reveal } = window.SITE;
  const $ = (id) => document.getElementById(id);

  $("year").textContent = new Date().getFullYear();

  // Games: each card opens that title's page
  $("games").innerHTML = GAMES.map((g) => {
    const meta = [g.role, g.studio, g.year].filter(Boolean).join(" · ");
    const art = g.art
      ? `<img src="${esc(g.art)}" alt="${esc(g.title)} key art" loading="lazy" decoding="async">`
      : `<span class="ph">${esc(g.title)}</span>`;
    return `<li><a class="card game-card" href="game.html?g=${encodeURIComponent(g.slug)}">
      <div class="art">${art}</div>
      <div class="card-body">
        <h3>${esc(g.title)}</h3>
        ${meta ? `<p class="meta">${esc(meta)}</p>` : ""}
        ${chips(g.platforms)}
        <span class="card-link">View work →</span>
      </div>
    </a></li>`;
  }).join("");
  tilt(document.querySelectorAll(".game-card"));

  // Tech
  $("tech-list").innerHTML = TECH.map((t) => `<article class="card">
      <div class="card-body">
        <h3>${esc(t.title)}</h3>
        ${t.context ? `<p class="meta mono">${esc(t.context)}</p>` : ""}
        <p class="desc">${esc(t.desc)}</p>
        ${t.result ? `<p class="result">${esc(t.result)}</p>` : ""}
        ${chips(t.stack)}
        ${t.link ? `<a class="card-link" href="${esc(t.link)}" target="_blank" rel="noopener">View →</a>` : ""}
      </div>
    </article>`).join("");

  // About
  const bio = Array.isArray(P.bio) ? P.bio : P.bio ? [P.bio] : [];
  $("bio").innerHTML = bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("disciplines").innerHTML = P.disciplines.map((d) => `<li>${esc(d)}</li>`).join("");
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
