/* Page logic: fills in content from content.js, runs the lamp menu,
   the smoke page transitions, the three wishes and the genie's eyes. */
(() => {
  const SITE = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const ROUTES = { home: "Home", projects: "Projects", about: "About", contact: "Contact" };

  // Small DOM builder. Text is always set with textContent, never as HTML.
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === "class") node.className = v;
      else node.setAttribute(k, v);
    }
    for (const c of children) {
      if (c == null || c === false || c === "") continue;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  /* ---------- Content ---------- */

  const ICONS = {
    Game: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M7 10v4M5 12h4"/><circle cx="15.5" cy="11" r=".6" fill="currentColor"/><circle cx="18" cy="13" r=".6" fill="currentColor"/></svg>',
    Mod: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-.7-.7-2.8z"/></svg>',
    Code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/></svg>'
  };

  function renderSite() {
    $$("[data-site]").forEach(n => { if (SITE[n.dataset.site]) n.textContent = SITE[n.dataset.site]; });
    $("#year").textContent = new Date().getFullYear();
  }

  const projectBySlug = slug => PROJECTS.find(p => p.slug && p.slug === slug);

  function coverArt(p, cls) {
    const art = el("div", { class: cls, "data-type": p.type || "Code" });
    if (p.cover) art.append(el("img", { src: p.cover, alt: p.coverAlt || "", loading: "lazy" }));
    else art.innerHTML = ICONS[p.type] || ICONS.Code;
    return art;
  }

  function chips(p) {
    return el("div", { class: "chips" },
      el("span", { class: "chip" }, p.type),
      p.status && el("span", { class: "chip chip-status", "data-status": p.status }, p.status),
      p.year && el("span", { class: "chip chip-year" }, p.year),
      p.example && el("span", { class: "chip chip-example" }, "Example")
    );
  }

  function linkButtons(links, cls) {
    links = (links || []).filter(l => l.url);
    if (!links.length) return null;
    return el("div", { class: cls },
      ...links.map(l => el("a", { class: l.primary ? "btn btn-primary" : "btn", href: l.url, target: "_blank", rel: "noopener" }, l.label))
    );
  }

  function renderProjects() {
    const list = $("#project-list");
    list.replaceChildren();
    if (!PROJECTS.length) {
      list.append(el("li", { class: "empty" }, "No projects yet. Add one in js/content.js."));
      return;
    }
    for (const p of PROJECTS) {
      list.append(el("li", {},
        el("article", { class: "card" },
          coverArt(p, "card-art"),
          el("div", { class: "card-body" },
            chips(p),
            // The title link covers the whole card (see .card-link in the CSS).
            el("h2", { class: "card-title" }, el("a", { class: "card-link", href: `#${p.slug}`, "data-route": p.slug }, p.title)),
            el("p", { class: "card-summary" }, p.summary),
            p.tech && p.tech.length > 0 && el("p", { class: "card-tech" }, p.tech.join("  ·  ")),
            el("div", { class: "card-foot" },
              el("span", { class: "card-cta", "aria-hidden": "true" }, "View project"),
              linkButtons(p.links, "card-links")
            )
          )
        )
      ));
    }
  }

  function renderProject(p) {
    const page = $("#project-page");
    const gallery = p.gallery || [];
    // Optional blocks evaluate to false or undefined; drop them before inserting.
    page.replaceChildren(...[
      el("a", { class: "back", href: "#projects", "data-route": "projects" }, "All projects"),
      el("header", { class: "page-head project-head" },
        chips(p),
        el("h1", { id: "project-title", tabindex: "-1" }, p.title),
        el("p", { class: "lede" }, p.summary),
        linkButtons(p.links, "project-links")
      ),
      p.cover && coverArt(p, "project-cover"),
      el("div", { class: "project-layout" },
        el("div", { class: "project-main" },
          ...(p.body || []).map(t => el("p", {}, t)),
          p.list && p.list.length > 0 && el("section", { class: "project-list" },
            el("h2", { class: "label" }, p.listHeading || "Highlights"),
            el("ul", {}, ...p.list.map(t => el("li", {}, t)))
          )
        ),
        p.facts && p.facts.length > 0 && el("aside", { class: "ledger facts", "aria-label": "Project details" },
          el("dl", {}, ...p.facts.flatMap(f => [el("dt", { class: "label" }, f.label), el("dd", {}, f.value)]))
        )
      ),
      p.sections && p.sections.length > 0 && el("section", { class: "features", "aria-label": "Features" },
        ...p.sections.map(sec => el("div", { class: "feature" }, el("h2", {}, sec.heading), el("p", {}, sec.text)))
      ),
      gallery.length > 0 && el("section", { class: "gallery-wrap", "aria-labelledby": "gallery-title" },
        el("h2", { class: "label", id: "gallery-title" }, "Gallery"),
        el("ul", { class: "gallery" }, ...gallery.map((g, i) => el("li", {},
          el("button", { class: `thumb${g.fit === "contain" ? " thumb-contain" : ""}`, type: "button", "data-index": i, "aria-label": `View larger: ${g.caption || "image " + (i + 1)}` },
            el("img", { src: g.src, alt: "", loading: "lazy" })
          ),
          g.caption && el("p", { class: "thumb-caption" }, g.caption)
        )))
      )
    ].filter(Boolean));
    $$(".thumb", page).forEach(btn => btn.addEventListener("click", () => Lightbox.open(gallery, +btn.dataset.index)));
  }

  /* ---------- Lightbox ---------- */

  const Lightbox = (() => {
    const dlg = $("#lightbox");
    const img = $("#lightbox-img");
    const cap = $("#lightbox-caption");
    const count = $("#lightbox-count");
    let items = [];
    let index = 0;

    function draw() {
      const g = items[index];
      img.src = g.src;
      img.alt = g.caption || "";
      cap.textContent = g.caption || "";
      count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
      $$(".lightbox-nav", dlg).forEach(b => { b.hidden = items.length < 2; });
    }
    function step(d) { index = (index + d + items.length) % items.length; draw(); }

    $("#lightbox-close").addEventListener("click", () => dlg.close());
    $("#lightbox-prev").addEventListener("click", () => step(-1));
    $("#lightbox-next").addEventListener("click", () => step(1));
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    return {
      open(list, i) {
        items = list;
        index = i;
        draw();
        dlg.showModal();
      }
    };
  })();

  function renderAbout() {
    const a = SITE.about || {};
    $("#bio").replaceChildren(...(a.paragraphs || []).map(t => el("p", {}, t)));
    const ledger = $("#ledger");
    ledger.replaceChildren();
    if (a.currently) ledger.append(el("div", {}, el("h2", { class: "label" }, "Currently"), el("p", {}, a.currently)));
    if (a.plays && a.plays.length) ledger.append(el("div", {}, el("h2", { class: "label" }, "Playing"), el("ul", {}, ...a.plays.map(t => el("li", {}, t)))));
    if (a.buildsWith && a.buildsWith.length) ledger.append(el("div", {}, el("h2", { class: "label" }, "Builds with"), el("ul", { class: "inline-list" }, ...a.buildsWith.map(t => el("li", {}, t)))));
  }

  function renderContact() {
    const list = $("#channels");
    list.replaceChildren();
    (SITE.contact || []).forEach((c, i) => {
      const handle = el("span", { class: "channel-handle", id: `channel-${i}` }, c.handle);
      const copy = el("button", { class: "btn", type: "button" }, "Copy");
      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(c.handle);
          flash(copy, "Copied");
        } catch (e) {
          const range = document.createRange();
          range.selectNodeContents(handle);
          const sel = getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          flash(copy, "Selected, press Ctrl+C");
        }
      });
      list.append(el("li", { class: "channel" },
        el("span", { class: "channel-label" }, c.label),
        el("span", { class: "channel-text" }, handle, c.note && el("span", { class: "channel-note" }, c.note)),
        el("span", { class: "channel-actions" },
          copy,
          c.url && el("a", { class: "btn", href: c.url, target: "_blank", rel: "noopener" }, "Open")
        )
      ));
    });
  }

  function flash(btn, text) {
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = text;
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { btn.textContent = original; }, 1600);
  }

  /* ---------- Lamp ---------- */

  const lampBtn = $("#lamp");
  const menu = $("#menu");
  const spoutEl = $("#lamp-spout");

  const Lamp = {
    rub() {
      lampBtn.classList.remove("is-rubbing");
      void lampBtn.offsetWidth; // restart the animation
      lampBtn.classList.add("is-rubbing");
      Sound.rub();
    },
    spout() {
      const r = spoutEl.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
  };
  lampBtn.addEventListener("animationend", () => lampBtn.classList.remove("is-rubbing"));

  Smoke.setSource(Lamp.spout);
  Smoke.wisp(!reduceMotion.matches);
  reduceMotion.addEventListener?.("change", () => Smoke.wisp(!reduceMotion.matches));

  /* ---------- Menu ---------- */

  let menuOpen = false;

  function openMenu(fromKeyboard) {
    menuOpen = true;
    menu.classList.add("is-open");
    lampBtn.setAttribute("aria-expanded", "true");
    lampBtn.setAttribute("aria-label", "Close menu");
    document.body.classList.add("lamp-used");
    Lamp.rub();
    Sound.chime();
    Eyes.perk(true);
    if (!reduceMotion.matches) Smoke.plume(Lamp.spout());
    if (fromKeyboard) setTimeout(() => $("a", menu).focus({ preventScroll: true }), 200);
  }

  function closeMenu(withSmoke = true) {
    if (!menuOpen) return;
    menuOpen = false;
    menu.classList.remove("is-open");
    lampBtn.setAttribute("aria-expanded", "false");
    lampBtn.setAttribute("aria-label", "Open menu");
    Eyes.perk(false);
    if (withSmoke && !reduceMotion.matches) {
      const r = menu.getBoundingClientRect();
      Smoke.inhale({ x: r.left + r.width / 2, y: r.top + r.height / 2 }, Lamp.spout(), 18);
    }
  }

  // event.detail is 0 when the button was "clicked" with Enter or Space.
  lampBtn.addEventListener("click", e => (menuOpen ? closeMenu() : openMenu(e.detail === 0)));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menuOpen) { closeMenu(); lampBtn.focus(); }
  });

  document.addEventListener("pointerdown", e => {
    if (menuOpen && !e.target.closest(".lamp-dock")) closeMenu();
  });

  /* ---------- Fog (the smoke that fills the screen between pages) ---------- */

  const Fog = (() => {
    const fog = $("#fog");
    const ease = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
    const reach = o => Math.hypot(Math.max(o.x, innerWidth - o.x), Math.max(o.y, innerHeight - o.y)) + 160;

    function tween(ms, fn) {
      return new Promise(resolve => {
        const t0 = performance.now();
        const frame = now => {
          const k = Math.min(1, (now - t0) / ms);
          fn(k);
          if (k < 1) requestAnimationFrame(frame); else resolve();
        };
        requestAnimationFrame(frame);
      });
    }

    // A soft-edged circle of fog centred on the lamp's spout.
    function mask(o, r) {
      const m = `radial-gradient(circle at ${o.x}px ${o.y}px, #000 ${Math.max(0, r - 160)}px, transparent ${Math.max(1, r)}px)`;
      fog.style.webkitMaskImage = m;
      fog.style.maskImage = m;
    }

    function hide() {
      fog.hidden = true;
      fog.style.opacity = "";
    }

    async function expand(o, ms) {
      const R = reach(o);
      mask(o, 0);
      fog.style.opacity = "1";
      fog.hidden = false;
      await tween(ms, k => {
        const r = ease(k) * R;
        mask(o, r);
        Smoke.ring(o, r, 4, false);
      });
    }

    async function contract(o, ms) {
      const R = reach(o);
      await tween(ms, k => {
        const r = (1 - ease(k)) * R;
        mask(o, r);
        Smoke.ring(o, r, 3, true);
      });
      hide();
    }

    async function dissipate(ms) {
      fog.style.webkitMaskImage = fog.style.maskImage = "none";
      Smoke.scatter(26);
      await tween(ms, k => { fog.style.opacity = String(1 - ease(k)); });
      hide();
    }

    return { expand, contract, dissipate };
  })();

  /* ---------- Genie eyes ---------- */

  const Eyes = (() => {
    const svg = $("#genie");
    const eyes = $$(".genie-eye", svg).map(g => ({ cx: +g.dataset.cx, cy: +g.dataset.cy, iris: $(".iris", g), x: 0, y: 0 }));
    const MAX_X = 6;   // how far the irises can move, in logo pixels
    const MAX_Y = 2.5;
    let pointer = null;
    let lastMove = 0;
    let active = false;
    let raf = 0;

    const track = e => { pointer = { x: e.clientX, y: e.clientY }; lastMove = performance.now(); };
    addEventListener("pointermove", track, { passive: true });
    addEventListener("pointerdown", track, { passive: true });

    function frame(now) {
      const m = svg.getScreenCTM();
      if (m) {
        for (const eye of eyes) {
          let tx, ty;
          if (pointer && now - lastMove < 6000) {
            // Look at the pointer.
            const sx = m.a * eye.cx + m.c * eye.cy + m.e;
            const sy = m.b * eye.cx + m.d * eye.cy + m.f;
            const dx = pointer.x - sx;
            const dy = pointer.y - sy;
            const d = Math.hypot(dx, dy) || 1;
            const k = Math.min(1, d / 220);
            tx = (dx / d) * MAX_X * k;
            ty = (dy / d) * MAX_Y * k;
          } else {
            // Nobody around: let the eyes roll about lazily.
            const t = now / 1000;
            tx = Math.sin(t * 0.6) * MAX_X * 0.7;
            ty = Math.sin(t * 0.9) * MAX_Y * 0.4;
          }
          eye.x += (tx - eye.x) * 0.18;
          eye.y += (ty - eye.y) * 0.18;
          eye.iris.setAttribute("transform", `translate(${eye.x.toFixed(2)} ${eye.y.toFixed(2)})`);
        }
      }
      raf = active ? requestAnimationFrame(frame) : 0;
    }

    return {
      setActive(on) {
        active = on;
        if (on && !raf) raf = requestAnimationFrame(frame);
      },
      perk(on) { svg.classList.toggle("is-perked", on); }
    };
  })();

  /* ---------- Three wishes ---------- */

  let wishes = 3;
  const WORDS = ["No", "One", "Two", "Three"];

  function updateWishCount() {
    const head = $("#wish-count");
    const sub = $("#wish-sub");
    if (wishes <= 0) {
      head.textContent = "Out of wishes";
      sub.textContent = "The genie is feeling generous. All three are back.";
      wishes = 3;
    } else {
      head.textContent = wishes === 3 ? "You have three wishes" : `${WORDS[wishes]} wish${wishes === 1 ? "" : "es"} left`;
      sub.textContent = "Choose one, or rub the lamp for the full menu.";
    }
  }

  $$(".wish").forEach(w => {
    w.addEventListener("click", () => { wishes -= 1; });
    w.addEventListener("pointerenter", () => Eyes.perk(true));
    w.addEventListener("pointerleave", () => Eyes.perk(false));
    w.addEventListener("focus", () => Eyes.perk(true));
    w.addEventListener("blur", () => Eyes.perk(false));
  });

  /* ---------- Router ---------- */

  const main = $("#main-content");
  const pages = $$("[data-page]");
  let current = null;
  let busy = false;
  let queued = null;

  function routeFromHash() {
    const token = (location.hash || "").slice(1);
    return token in ROUTES || projectBySlug(token) ? token : "home";
  }

  function show(route) {
    const project = projectBySlug(route);
    const page = project ? "project" : route;
    if (project) renderProject(project);
    pages.forEach(p => { p.hidden = p.dataset.page !== page; });
    document.body.dataset.route = page;
    $$("a[data-route]", menu).forEach(a => {
      if (a.dataset.route === (project ? "projects" : route)) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const name = SITE.name || "Dazed";
    document.title = route === "home" ? `${name} | Portfolio` : `${project ? project.title : ROUTES[route]} | ${name}`;
    current = route;
    if (route === "home") updateWishCount();
    Eyes.setActive(route === "home");
    window.scrollTo(0, 0);
  }

  async function go(route, { push = false } = {}) {
    if (route === current) { closeMenu(); return; }
    if (busy) { queued = route; return; }
    busy = true;
    closeMenu(false);
    if (push) { try { history.pushState(null, "", `#${route}`); } catch (e) { /* sandboxed */ } }

    if (reduceMotion.matches) {
      main.classList.add("is-fading");
      await wait(160);
      show(route);
      main.classList.remove("is-fading");
    } else {
      const o = Lamp.spout();
      document.body.classList.add("is-smoking");
      Lamp.rub();
      Sound.whoosh();
      await Fog.expand(o, 620);
      show(route);
      // Going home pulls the smoke back into the lamp; other pages let it drift away.
      if (route === "home") await Fog.contract(o, 760);
      else await Fog.dissipate(720);
      document.body.classList.remove("is-smoking");
    }

    const h1 = $(`[data-page="${projectBySlug(route) ? "project" : route}"] h1`);
    if (h1) h1.focus({ preventScroll: true });
    busy = false;
    if (queued && queued !== current) { const next = queued; queued = null; go(next); }
    queued = null;
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-route]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(a.dataset.route, { push: true });
  });

  addEventListener("popstate", () => go(routeFromHash()));
  addEventListener("hashchange", () => go(routeFromHash()));

  $(".skip").addEventListener("click", e => { e.preventDefault(); main.focus(); });

  /* ---------- Sound toggle ---------- */

  const soundBtn = $("#sound-toggle");
  function syncSound() {
    soundBtn.setAttribute("aria-pressed", String(Sound.enabled));
    const label = Sound.enabled ? "Turn sound off" : "Turn sound on";
    soundBtn.setAttribute("aria-label", label);
    soundBtn.title = label;
  }
  soundBtn.addEventListener("click", () => { Sound.setEnabled(!Sound.enabled); syncSound(); });

  /* ---------- Start ---------- */

  renderSite();
  renderProjects();
  renderAbout();
  renderContact();
  syncSound();
  show(routeFromHash());
})();
