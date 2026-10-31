// Tech page: tech.html?t=<slug>. Renders that item's header, details and demos from TECH in data.js.
(() => {
  const { esc, chips, clipGrid, reveal } = window.SITE;
  const TECH = window.TECH || [];
  const $ = (id) => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();

  const slug = new URLSearchParams(location.search).get("t");
  const i = TECH.findIndex((t) => t.slug === slug);
  const t = TECH[i];
  if (!t) {
    $("tech-hero").innerHTML = `<h1 class="game-title">Not found</h1><p class="meta"><a class="card-link" href="./#tech">See all tech →</a></p>`;
    return;
  }

  document.title = `${t.title} | Jay Sabins`;
  $("tech-hero").innerHTML = `
    ${t.kind ? `<span class="tag">${esc(t.kind)}</span>` : ""}
    <h1 class="game-title">${esc(t.title)}</h1>
    ${t.context ? `<p class="meta mono">${esc(t.context)}</p>` : ""}
    ${t.desc ? `<p class="desc">${esc(t.desc)}</p>` : ""}
    ${t.result ? `<p class="result">${esc(t.result)}</p>` : ""}
    ${chips(t.stack)}
    ${t.link ? `<a class="card-link" href="${esc(t.link)}" target="_blank" rel="noopener">View →</a>` : ""}`;

  // Longer write-up, only on this page; hidden while empty
  const details = t.details || [];
  if (details.length) {
    $("details").innerHTML = details.map((p) => `<p>${esc(p)}</p>`).join("");
    $("details").hidden = false;
  }

  // Demos: same clip cards as the game pages
  clipGrid($("clip-list"), t.videos, t.title, "Demo coming soon");
  $("clips").hidden = false;

  // Previous / next item, in the same order as the home page
  const link = (other, label) => other
    ? `<a href="tech.html?t=${encodeURIComponent(other.slug)}"><span class="mono">${label}</span>${esc(other.title)}</a>`
    : "<span></span>";
  $("game-pager").innerHTML = link(TECH[i - 1], "← Previous") + link(TECH[i + 1], "Next →");

  reveal();
})();
