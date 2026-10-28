// Design-time accent picker. Shows everywhere except the live site
// (jaysabinsaudio.com outside /staging/). Remove before launch once the accent is chosen.
(() => {
  const live = /(^|\.)jaysabinsaudio\.com$/.test(location.hostname) && !location.pathname.startsWith("/staging/");
  if (live) return;

  const KEY = "accent-picker";
  const swatches = [
    ["Blue", "#14a7ff"], ["Petrol", "#3a9fb8"], ["Lagoon", "#3cbfe8"], ["Cobalt", "#4c6fff"],
    ["Periwinkle", "#9aa6ff"], ["Verdigris", "#6fb0a0"], ["Jade", "#3fc48a"], ["Seafoam", "#b4e8d4"],
    ["Amber", "#f2b544"], ["Coral", "#f59a8c"],
  ];
  const root = document.documentElement;
  const initial = getComputedStyle(root).getPropertyValue("--accent").trim();

  // Dark ink on light accents, white ink on dark ones, whichever has more contrast
  const lum = (hex) => {
    const c = hex.replace("#", "").match(/../g).map((h) => parseInt(h, 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

  const panel = document.createElement("div");
  panel.className = "ap";
  panel.innerHTML = `
    <button class="ap-toggle" type="button" aria-expanded="false" aria-label="Accent color picker"><span class="ap-dot"></span></button>
    <div class="ap-body" hidden>
      <p class="ap-title">Accent</p>
      <div class="ap-swatches">${swatches.map(([n, c]) => `<button type="button" class="ap-sw" data-c="${c}" title="${n} ${c}" aria-label="${n}" style="background:${c}"></button>`).join("")}</div>
      <label class="ap-custom">Custom <input type="color" value="${initial}"></label>
      <p class="ap-hex"></p>
      <button type="button" class="ap-reset">Reset</button>
    </div>`;
  const style = document.createElement("style");
  style.textContent = `
    .ap{position:fixed;right:16px;bottom:16px;z-index:1000;font:400 13px/1.4 var(--body);color:var(--fg)}
    .ap-toggle{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);display:grid;place-items:center;cursor:pointer;margin-left:auto}
    .ap-dot{width:20px;height:20px;border-radius:50%;background:var(--accent)}
    .ap-body{position:absolute;right:0;bottom:56px;width:232px;padding:14px;background:var(--surface);border:1px solid var(--line);border-radius:8px}
    .ap-title{margin:0 0 10px;font-weight:600}
    .ap-swatches{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
    .ap-sw{aspect-ratio:1;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0;min-height:32px}
    .ap-sw[aria-pressed="true"]{border-color:var(--fg)}
    .ap-custom{display:flex;align-items:center;justify-content:space-between;margin-top:12px;color:var(--muted)}
    .ap-custom input{width:44px;height:32px;border:0;background:none;padding:0;cursor:pointer}
    .ap-hex{margin:10px 0 0;font:400 12px var(--mono);color:var(--muted);user-select:all}
    .ap-reset{margin-top:10px;background:none;border:1px solid var(--line);border-radius:6px;color:var(--fg);padding:6px 10px;cursor:pointer;font:inherit}`;
  document.head.append(style);
  document.body.append(panel);

  const body = panel.querySelector(".ap-body"), toggle = panel.querySelector(".ap-toggle");
  const input = panel.querySelector("input"), hex = panel.querySelector(".ap-hex");

  function apply(c, save = true) {
    root.style.setProperty("--accent", c);
    const ink = contrast(c, "#1b1d21") >= contrast(c, "#ffffff") ? "#1b1d21" : "#ffffff";
    root.style.setProperty("--accent-ink", ink);
    input.value = c;
    hex.textContent = `${c} · ${contrast(c, "#1b1d21").toFixed(1)}:1 on background`;
    panel.querySelectorAll(".ap-sw").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.c === c)));
    if (save) try { localStorage.setItem(KEY, c); } catch {}
  }

  toggle.addEventListener("click", () => {
    body.hidden = !body.hidden;
    toggle.setAttribute("aria-expanded", String(!body.hidden));
  });
  panel.querySelectorAll(".ap-sw").forEach((b) => b.addEventListener("click", () => apply(b.dataset.c)));
  input.addEventListener("input", () => apply(input.value));
  panel.querySelector(".ap-reset").addEventListener("click", () => {
    try { localStorage.removeItem(KEY); } catch {}
    root.style.removeProperty("--accent"); root.style.removeProperty("--accent-ink");
    apply(initial, false);
  });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch {}
  apply(saved || initial, false);
})();
