// Other Works page: audiobook credits from AUDIOBOOKS in data.js.
(() => {
  const { esc, reveal } = window.SITE;
  const BOOKS = window.AUDIOBOOKS || [];
  const $ = (id) => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();

  $("book-list").innerHTML = BOOKS.length
    ? BOOKS.map((b) => {
        const by = b.author ? `by ${esc(b.author)}` : "";
        const meta = [b.role, b.year].filter(Boolean).map(esc).join(" · ");
        return `<li class="card book">
          ${b.cover ? `<div class="cover"><img src="${esc(b.cover)}" alt="${esc(b.title)} cover" loading="lazy" decoding="async"></div>` : ""}
          <div class="card-body">
            <h3>${esc(b.title)}</h3>
            ${by ? `<p class="meta">${by}</p>` : ""}
            ${meta ? `<p class="meta mono book-meta">${meta}</p>` : ""}
            ${b.link ? `<a class="card-link" href="${esc(b.link)}" target="_blank" rel="noopener">Audible →</a>` : ""}
          </div>
        </li>`;
      }).join("")
    : `<li class="meta mono">Titles coming soon</li>`;

  reveal();
})();
