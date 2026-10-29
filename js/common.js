// Helpers shared by the home page (main.js), game pages (game.js) and tech pages (tech.js).
window.SITE = (() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const chips = (list) => list && list.length ? `<ul class="chips">${list.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : "";

  // Trophy for GAMES[].awards: one icon, the tooltip lists every award (name, then note)
  const trophy = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
  const awardText = (a) => `${a.name ? `<strong>${esc(a.name)}</strong> ` : ""}${a.note ? esc(a.note) : ""}`;
  const award = (list) => list && list.length
    ? `<span class="award">${trophy}<span class="award-tip" role="tooltip">${list.map((a) => `<span>${awardText(a)}</span>`).join("")}</span></span>`
    : "";

  // YouTube or Vimeo page URL -> autoplaying embed URL (null if unrecognised)
  const embedUrl = (url) => {
    if (!url) return null;
    let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1`;
    return null;
  };

  // Swap a play button's container for the embed, only when clicked
  const player = (button, container, src, title) => {
    button.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = src;
      f.title = title;
      f.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      f.allowFullscreen = true;
      container.replaceChildren(f);
    });
  };

  // Grid of clip cards (game and tech pages); each embed loads on click.
  // Shows placeholder tiles while `videos` is empty.
  // TODO: remove the placeholder tiles once every page has videos.
  const clipGrid = (list, videos, label, empty = "Clip coming soon") => {
    videos = videos || [];
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
          <div class="clip"><span class="clip-play" aria-hidden="true">${disc}</span><span class="ph">${esc(empty)}</span></div>
        </li>`).join("");
    list.querySelectorAll(".clip[data-n]").forEach((box) => {
      const v = videos[box.dataset.n], src = embedUrl(v.url);
      if (src) player(box.querySelector("button"), box, src, `${label}: ${v.title}`);
      else box.querySelector("button").disabled = true;
    });
  };

  // Card lifts and tilts to face the pointer (CSS reads --tx/--ty, each -0.5..0.5).
  // Mouse/pen only, and off when the visitor prefers reduced motion.
  const tilt = (cards) => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cards.forEach((card) => {
      let frame = 0;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.setProperty("--tx", x.toFixed(3));
          card.style.setProperty("--ty", y.toFixed(3));
        });
      });
      card.addEventListener("pointerleave", () => {
        cancelAnimationFrame(frame);
        card.style.setProperty("--tx", 0);
        card.style.setProperty("--ty", 0);
      });
    });
  };

  // Content fades and rises in as it scrolls into view, once. Items that arrive
  // together are staggered. Skipped for reduced motion (content just shows).
  const reveal = () => {
    if (!("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll("main .section > h2, main .grid > li, .about > *, .contact > *, .game-hero, .details > *, .game-pager");
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e, n) => {
        e.target.style.transitionDelay = `${n * 80}ms`;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  };

  return { esc, chips, trophy, award, awardText, embedUrl, player, clipGrid, tilt, reveal };
})();
