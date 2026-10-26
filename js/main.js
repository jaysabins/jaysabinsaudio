(() => {
  const P = window.PROFILE, GAMES = window.GAMES || [], TECH = window.TECH || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const chips = (list) => list && list.length ? `<ul class="chips">${list.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : "";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  $("year").textContent = new Date().getFullYear();

  // Stat row: real values only
  const stats = P.stats.filter((s) => s.value != null && s.value !== "");
  if (stats.length) {
    $("stats").innerHTML = stats.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join("");
    $("stats").hidden = false;
  }

  // Work
  $("games").innerHTML = GAMES.map((g) => {
    const meta = [g.studio, g.year].filter(Boolean).join(" · ");
    const art = g.art
      ? `<img src="${esc(g.art)}" alt="${esc(g.title)} key art" loading="lazy" decoding="async">`
      : `<span class="ph">${esc(g.title)}</span>`;
    return `<li class="game">
      <div class="game-art">${art}</div>
      <div class="game-body">
        <h3>${esc(g.title)}</h3>
        ${meta ? `<p class="game-meta">${esc(meta)}</p>` : ""}
        ${chips(g.platforms)}
        ${g.role ? `<p class="game-role">${esc(g.role)}</p>` : ""}
        ${g.link ? `<a class="game-link" href="${esc(g.link)}" target="_blank" rel="noopener">Watch breakdown →</a>` : ""}
      </div>
    </li>`;
  }).join("");

  // Tech
  $("tech-list").innerHTML = TECH.map((t) => `<article class="term">
      <div class="term-bar"><b>$</b> ${esc(t.cmd)}</div>
      <div class="term-body">
        ${t.context ? `<p class="term-ctx">${esc(t.context)}</p>` : ""}
        <h3>${esc(t.title)}</h3>
        <p class="term-desc">${esc(t.desc)}</p>
        ${t.result ? `<p class="term-result">${esc(t.result)}</p>` : ""}
        ${chips(t.stack)}
        ${t.link ? `<a class="term-link" href="${esc(t.link)}" target="_blank" rel="noopener">View →</a>` : ""}
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

  // Reel: load the embed only on click
  const embedUrl = (url) => {
    if (!url) return null;
    let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1`;
    return null;
  };
  const src = embedUrl(P.reel);
  const play = $("reel-play");
  if (src) {
    play.hidden = false;
    play.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = src;
      f.title = "Jay Sabins demo reel";
      f.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      f.allowFullscreen = true;
      $("reel").replaceChildren(f);
      stopWave();
    });
  }

  // Waveform poster: played portion in the accent, read from the CSS variable
  const canvas = document.querySelector(".reel .wave");
  const ctx = canvas.getContext("2d");
  const tc = $("reel-tc");
  const bars = [];
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 160; i++) {
    const env = 0.35 + 0.65 * Math.abs(Math.sin(i / 11) * Math.cos(i / 29));
    bars.push(Math.max(0.04, env * (0.4 + 0.6 * rand())));
  }
  const LOOP = 24000; // ms for one pass of the playhead
  let raf = null, visible = true, t0 = performance.now();

  function size() {
    const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * d); canvas.height = Math.round(r.height * d);
  }
  function draw(now) {
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim();
    const line = css.getPropertyValue("--line").trim();
    const W = canvas.width, H = canvas.height, mid = H * 0.46;
    const pos = reducedMotion ? 0.38 : ((now - t0) % LOOP) / LOOP;
    const pad = W * 0.04, step = (W - pad * 2) / bars.length, bw = Math.max(1, step * 0.55);
    ctx.clearRect(0, 0, W, H);
    bars.forEach((b, i) => {
      const x = pad + i * step, h = b * H * 0.32;
      ctx.fillStyle = i / bars.length < pos ? accent : line;
      ctx.fillRect(x, mid - h, bw, h * 2);
    });
    const px = pad + (W - pad * 2) * pos;
    ctx.fillStyle = accent;
    ctx.fillRect(px, H * 0.12, Math.max(1, W / 900), H * 0.68);
    const secs = (pos * LOOP) / 1000, f = Math.floor((secs % 1) * 24);
    const s = Math.floor(secs);
    tc.textContent = `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
  }
  function loop(now) { draw(now); raf = requestAnimationFrame(loop); }
  function startWave() { if (!raf && visible && !reducedMotion) raf = requestAnimationFrame(loop); }
  function stopWave() { if (raf) cancelAnimationFrame(raf); raf = null; }

  size(); draw(performance.now());
  addEventListener("resize", () => { size(); draw(performance.now()); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? startWave() : stopWave(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stopWave() : startWave()));
})();
