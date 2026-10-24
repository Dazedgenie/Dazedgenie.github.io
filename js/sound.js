/* Sound effects, synthesised with the Web Audio API so there are no audio
   files to host. Muted until the visitor turns sound on. */
window.Sound = (() => {
  const KEY = "dazed-sound";
  let ctx = null;
  let master = null;
  let noise = null;
  let enabled = false;

  try { enabled = localStorage.getItem(KEY) === "on"; } catch (e) { /* storage blocked */ }

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.45;
      master.connect(ctx.destination);
      noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noiseSource() {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    return src;
  }

  // Smoke rushing out of the lamp: band-passed noise swept up then down.
  function whoosh() {
    if (!enabled || !ensure()) return;
    const t = ctx.currentTime;
    const src = noiseSource();
    const bp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    bp.type = "bandpass";
    bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(250, t);
    bp.frequency.exponentialRampToValueAtTime(1600, t + 0.45);
    bp.frequency.exponentialRampToValueAtTime(300, t + 1.2);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.7, t + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.25);
    src.connect(bp).connect(g).connect(master);
    src.start(t);
    src.stop(t + 1.3);
  }

  // Cloth rubbing brass: low-passed noise wobbled by a fast LFO.
  function rub() {
    if (!enabled || !ensure()) return;
    const t = ctx.currentTime;
    const src = noiseSource();
    const lp = ctx.createBiquadFilter();
    const wobble = ctx.createGain();
    const env = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lp.type = "lowpass";
    lp.frequency.value = 1100;
    wobble.gain.value = 0.25;
    lfo.frequency.value = 13;
    lfoDepth.gain.value = 0.22;
    lfo.connect(lfoDepth).connect(wobble.gain);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.9, t + 0.05);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    src.connect(lp).connect(wobble).connect(env).connect(master);
    src.start(t);
    lfo.start(t);
    src.stop(t + 0.55);
    lfo.stop(t + 0.55);
  }

  // A short minor arpeggio when the menu appears.
  function chime() {
    if (!enabled || !ensure()) return;
    const t = ctx.currentTime;
    [440, 523.25, 659.25, 987.77].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const start = t + i * 0.07;
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 8;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.18, start + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 1.3);
      osc.connect(g).connect(master);
      osc.start(start);
      osc.stop(start + 1.35);
    });
  }

  function setEnabled(on) {
    enabled = on;
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) { /* storage blocked */ }
    if (on) { ensure(); chime(); }
  }

  return {
    whoosh,
    rub,
    chime,
    setEnabled,
    get enabled() { return enabled; }
  };
})();
