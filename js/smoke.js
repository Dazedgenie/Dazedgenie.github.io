/* Canvas smoke. Draws soft purple puffs from pre-rendered sprites.
   The lamp's spout is the source for the idle wisp and the menu plume. */
window.Smoke = (() => {
  const canvas = document.getElementById("smoke");
  const ctx = canvas.getContext("2d");
  const COLORS = ["#c77dff", "#ff5ce1", "#5b8cff", "#a35cff"];  // violet, neon pink, genie blue
  const MAX_PARTICLES = 700;
  const sprites = COLORS.map(makeSprite);

  let W = 0;
  let H = 0;
  let scale = 1;
  let parts = [];
  let emitters = [];
  let running = false;
  let last = 0;
  let wispOn = false;
  let wispAcc = 0;
  let source = () => ({ x: 80, y: innerHeight - 80 });

  const rand = (a, b) => a + Math.random() * (b - a);

  function makeSprite(hex) {
    const s = document.createElement("canvas");
    s.width = s.height = 128;
    const g = s.getContext("2d");
    const [r, gr, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, `rgba(${r},${gr},${b},0.55)`);
    grad.addColorStop(0.45, `rgba(${r},${gr},${b},0.22)`);
    grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return s;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = Math.max(0.6, Math.min(1.4, Math.min(W, H) / 800));
  }

  function spawn(x, y, o = {}) {
    if (parts.length >= MAX_PARTICLES) parts.shift();
    parts.push({
      x, y,
      vx: o.vx ?? 0,
      vy: o.vy ?? 0,
      r: (o.r ?? 10) * scale,
      grow: (o.grow ?? 20) * scale,
      life: 0,
      max: o.life ?? 2,
      alpha: o.alpha ?? 0.6,
      lift: o.lift ?? -10,
      target: o.target || null,
      seed: Math.random() * 1000,
      sprite: sprites[(Math.random() * sprites.length) | 0]
    });
    start();
  }

  // Calls make() `rate` times per second for `duration` seconds.
  function emit(duration, rate, make) {
    emitters.push({ t: duration, rate, acc: 0, make });
    start();
  }

  function start() {
    if (running || document.hidden) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(step);
  }

  function step(now) {
    if (document.hidden) { running = false; return; }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (wispOn) {
      wispAcc += dt;
      while (wispAcc > 0.11) {
        wispAcc -= 0.11;
        const o = source();
        spawn(o.x, o.y, { vx: rand(4, 18), vy: rand(-34, -18), r: 5, grow: 9, life: rand(2.2, 3.2), alpha: 0.32, lift: -6 });
      }
    }

    for (let i = emitters.length - 1; i >= 0; i--) {
      const e = emitters[i];
      e.t -= dt;
      e.acc += dt * e.rate;
      while (e.acc >= 1) { e.acc -= 1; e.make(); }
      if (e.t <= 0) emitters.splice(i, 1);
    }

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "screen";
    const t = now / 1000;

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }

      if (p.target) {
        // Pulled back into the lamp: accelerate toward the target and shrink.
        const dx = p.target.x - p.x;
        const dy = p.target.y - p.y;
        p.vx = (p.vx + dx * 6 * dt) * 0.88;
        p.vy = (p.vy + dy * 6 * dt) * 0.88;
        p.r = Math.max(2, p.r * (1 - 1.6 * dt));
      } else {
        // Drift: a sideways curl that varies with height and time, plus lift.
        const drag = Math.pow(0.985, dt * 60);
        p.vx = (p.vx + Math.sin(p.y * 0.011 + t * 1.4 + p.seed) * 22 * dt) * drag;
        p.vy = (p.vy + p.lift * dt) * drag;
        p.r += p.grow * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const k = p.life / p.max;
      ctx.globalAlpha = p.alpha * (k < 0.12 ? k / 0.12 : 1 - (k - 0.12) / 0.88);
      ctx.drawImage(p.sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    ctx.globalAlpha = 1;

    if (parts.length || emitters.length || wispOn) {
      requestAnimationFrame(step);
    } else {
      running = false;
      ctx.clearRect(0, 0, W, H);
    }
  }

  // A column of smoke rising from the spout toward the menu.
  function plume(o) {
    emit(0.55, 110, () => spawn(o.x + rand(-4, 4), o.y + rand(-4, 4), {
      vx: rand(-40, 30), vy: rand(-210, -120), r: rand(8, 14), grow: rand(40, 70),
      life: rand(1.2, 1.9), alpha: 0.55, lift: -30
    }));
  }

  // Puffs along the edge of the fog as it grows (outward) or shrinks (inward).
  function ring(o, radius, n, inward) {
    let made = 0;
    for (let tries = 0; tries < n * 4 && made < n; tries++) {
      const a = rand(0, Math.PI * 2);
      const x = o.x + Math.cos(a) * radius;
      const y = o.y + Math.sin(a) * radius;
      if (x < -80 || x > W + 80 || y < -80 || y > H + 80) continue;
      made++;
      if (inward) {
        spawn(x, y, { target: o, r: rand(30, 60), life: rand(0.5, 0.8), alpha: 0.5 });
      } else {
        const speed = rand(30, 90);
        spawn(x, y, {
          vx: Math.cos(a) * speed, vy: Math.sin(a) * speed - 20, r: rand(30, 70),
          grow: rand(30, 60), life: rand(0.9, 1.4), alpha: 0.5, lift: -12
        });
      }
    }
  }

  // Wisps sucked from one point into another (used when the menu closes).
  function inhale(from, to, n) {
    for (let i = 0; i < n; i++) {
      spawn(from.x + rand(-70, 70), from.y + rand(-50, 50), { target: to, r: rand(16, 30), life: rand(0.6, 0.9), alpha: 0.45 });
    }
  }

  // Big slow puffs over the whole screen while the fog clears.
  function scatter(n) {
    for (let i = 0; i < n; i++) {
      spawn(rand(0, W), rand(0, H), {
        vx: rand(-30, 30), vy: rand(-40, 0), r: rand(80, 140), grow: rand(20, 50),
        life: rand(1, 1.6), alpha: 0.35, lift: -10
      });
    }
  }

  function wisp(on) {
    wispOn = on;
    if (on) start();
  }

  function setSource(fn) { source = fn; }

  resize();
  addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });

  return { plume, ring, inhale, scatter, wisp, setSource };
})();
