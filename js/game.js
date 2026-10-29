// Game page: game.html?g=<slug>. Renders that title's header and clips from GAMES in data.js.
(() => {
  const { esc, chips, embedUrl, player, reveal } = window.SITE;
  const GAMES = window.GAMES || [];
  const $ = (id) => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();

  const slug = new URLSearchParams(location.search).get("g");
  const i = GAMES.findIndex((g) => g.slug === slug);
  const g = GAMES[i];
  if (!g) {
    $("game-hero").innerHTML = `<h1 class="game-title">Game not found</h1><p class="meta"><a class="card-link" href="./#work">See all games →</a></p>`;
    return;
  }

  document.title = `${g.title} | Jay Sabins`;
  const meta = [g.role, g.studio, g.year].filter(Boolean).join(" · ");
  $("game-hero").innerHTML = `
    ${g.art ? `<div class="art banner"><img src="${esc(g.art)}" alt="${esc(g.title)} key art"></div>` : ""}
    <h1 class="game-title">${esc(g.title)}</h1>
    ${meta ? `<p class="meta">${esc(meta)}</p>` : ""}
    ${chips(g.platforms)}`;

  // Clips: one card per area of the game, embed loads on click.
  // TODO: remove the placeholder tiles once every game has videos.
  const videos = g.videos || [];
  const list = $("clip-list");
  const disc = `<span class="play-disc" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>`;
  list.innerHTML = videos.length
    ? videos.map((v, n) => `<li class="card">
        <div class="clip" data-n="${n}"><button class="clip-play" type="button" aria-label="Play ${esc(v.title)}">${disc}</button></div>
        <div class="card-body">
          <h3>${esc(v.title)}</h3>
          ${v.desc ? `<p class="desc">${esc(v.desc)}</p>` : ""}
        </div>
      </li>`).join("")
    : Array.from({ length: 3 }, () => `<li class="card">
        <div class="clip"><span class="clip-play" aria-hidden="true">${disc}</span><span class="ph">Clip coming soon</span></div>
      </li>`).join("");
  list.querySelectorAll(".clip[data-n]").forEach((box) => {
    const v = videos[box.dataset.n], src = embedUrl(v.url);
    if (src) player(box.querySelector("button"), box, src, `${g.title}: ${v.title}`);
    else box.querySelector("button").disabled = true;
  });
  $("clips").hidden = false;

  // Previous / next title, in the same order as the home page
  const link = (other, label) => other
    ? `<a href="game.html?g=${encodeURIComponent(other.slug)}"><span class="mono">${label}</span>${esc(other.title)}</a>`
    : "<span></span>";
  $("game-pager").innerHTML = link(GAMES[i - 1], "← Newer") + link(GAMES[i + 1], "Older →");

  reveal();
})();
