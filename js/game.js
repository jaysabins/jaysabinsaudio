// Game page: game.html?g=<slug>. Renders that title's header and clips from GAMES in data.js.
(() => {
  const { esc, chips, trophy, awardText, clipGrid, reveal } = window.SITE;
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
    ${chips(g.platforms)}
    ${(g.awards || []).map((a) => `<p class="award-line">${trophy}<span>${awardText(a)}</span></p>`).join("")}`;

  // Clips: one card per area of the game, embed loads on click.
  clipGrid($("clip-list"), g.videos, g.title);
  $("clips").hidden = false;

  // Previous / next title, in the same order as the home page
  const link = (other, label) => other
    ? `<a href="game.html?g=${encodeURIComponent(other.slug)}"><span class="mono">${label}</span>${esc(other.title)}</a>`
    : "<span></span>";
  $("game-pager").innerHTML = link(GAMES[i - 1], "← Newer") + link(GAMES[i + 1], "Older →");

  reveal();
})();
