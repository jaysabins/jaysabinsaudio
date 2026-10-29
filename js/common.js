// Helpers shared by the home page (main.js) and the game pages (game.js).
window.SITE = (() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const chips = (list) => list && list.length ? `<ul class="chips">${list.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : "";

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

  // Slight 3D tilt toward the pointer, with the key art drifting the other way for depth.
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

  return { esc, chips, embedUrl, player, tilt };
})();
