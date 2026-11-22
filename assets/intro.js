/* Home-only 5-second QBranch code-rain / brand-assembly sequence. No dependencies. */
(() => {
  'use strict';
  const root = document.documentElement;
  const intro = document.getElementById('qb-intro');
  if (!intro || !root.classList.contains('qb-intro-enabled')) return;

  const canvas = document.getElementById('qb-intro-canvas');
  const skip = document.getElementById('qb-intro-skip');
  const progressLabel = document.getElementById('qb-intro-percent');
  const ctx = canvas && canvas.getContext('2d', { alpha: true });
  const TOTAL = 5000;
  const EXIT_AT = TOTAL - 360;
  const CHARACTERS = ['0', '1'];
  const SNIPPETS = ['0', '1'];
  const rnd = (min, max) => min + Math.random() * (max - min);
  let width = 0;
  let height = 0;
  let raf = 0;
  let streams = [];
  let particles = [];
  let stopped = false;
  let ending = false;
  let exitTimer;
  const started = performance.now();

  function sampleWord() {
    const offscreen = document.createElement('canvas');
    const size = Math.max(36, Math.min(width / 8.7, height / 3.9, 120));
    offscreen.width = Math.ceil(Math.min(width * .92, 1050));
    offscreen.height = Math.ceil(size * 1.55);
    const measure = offscreen.getContext('2d', { willReadFrequently: true });
    if (!measure) return [];
    measure.font = `900 ${size}px Arial, sans-serif`;
    measure.textAlign = 'center';
    measure.textBaseline = 'middle';
    measure.fillStyle = '#000';
    measure.fillText('QBRANCH', offscreen.width / 2, offscreen.height / 2);
    const data = measure.getImageData(0, 0, offscreen.width, offscreen.height).data;
    const gap = width < 620 ? 5 : 8;
    const targets = [];
    for (let y = 0; y < offscreen.height; y += gap) {
      for (let x = 0; x < offscreen.width; x += gap) {
        if (data[(y * offscreen.width + x) * 4 + 3] > 100 && Math.random() < .8) {
          targets.push({ x: (width - offscreen.width) / 2 + x, y: height * .50 - offscreen.height * .5 + y });
        }
      }
    }
    // Keep the particle count small enough for older mobile devices.
    const max = width < 620 ? 225 : 490;
    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targets[i], targets[j]] = [targets[j], targets[i]];
    }
    return targets.slice(0, max).map((pos, index) => ({
      x: pos.x,
      y: pos.y,
      fromX: rnd(-width * .1, width * 1.1),
      fromY: rnd(-height * .78, height * .76),
      symbol: CHARACTERS[index % CHARACTERS.length],
      delay: rnd(90, 520),
      duration: rnd(650, 1050),
      tint: index % 5 === 0 ? '#6eb5fb' : '#1766e9'
    }));
  }

  function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(66, Math.max(22, Math.round(width / 28)));
    streams = Array.from({ length: count }, (_, i) => ({
      x: (i + .35 + rnd(-.30, .30)) * width / count,
      y: rnd(-height * 1.5, -30),
      speed: rnd(115, 325),
      spacing: rnd(18, 25),
      glyphs: Array.from({ length: Math.floor(rnd(10, 20)) }, () => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]),
      alpha: rnd(.25, .59),
      size: rnd(10, 14)
    }));
    particles = sampleWord();
  }

  function clamp(n) { return Math.max(0, Math.min(1, n)); }
  function smooth(t) { return t * t * (3 - 2 * t); }

  function draw(now) {
    if (stopped || !ctx) return;
    const elapsed = now - started;
    if (elapsed >= EXIT_AT) { finish(); return; }
    ctx.clearRect(0, 0, width, height);
    const rainFade = 1 - .36 * smooth(clamp((elapsed - 3800) / 760));
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    for (const stream of streams) {
      const travel = ((elapsed / 1000) * stream.speed);
      const span = height + stream.spacing * stream.glyphs.length + 200;
      const baseY = ((stream.y + travel + span) % span) - stream.spacing * stream.glyphs.length;
      ctx.font = `600 ${stream.size}px ui-monospace, SFMono-Regular, Consolas, monospace`;
      for (let j = 0; j < stream.glyphs.length; j++) {
        const y = baseY + j * stream.spacing;
        if (y < -36 || y > height + 20) continue;
        ctx.globalAlpha = stream.alpha * rainFade * (.23 + .77 * (j + 1) / stream.glyphs.length);
        ctx.fillStyle = j === stream.glyphs.length - 1 ? '#064db6' : '#2a7de1';
        ctx.fillText(stream.glyphs[j], stream.x, y);
      }
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${width < 620 ? 9 : 11}px ui-monospace, SFMono-Regular, Consolas, monospace`;
    const particleFade = 1 - smooth(clamp((elapsed - 1350) / 750));
    for (const particle of particles) {
      const t = clamp((elapsed - particle.delay) / particle.duration);
      if (t <= 0 || particleFade <= 0) continue;
      const ease = smooth(t);
      const x = particle.fromX + (particle.x - particle.fromX) * ease;
      const y = particle.fromY + (particle.y - particle.fromY) * ease;
      ctx.globalAlpha = Math.min(1, t * 2) * particleFade * .85;
      ctx.fillStyle = particle.tint;
      ctx.fillText(particle.symbol, x, y);
    }
    ctx.globalAlpha = 1;
    if (progressLabel) progressLabel.textContent = `${String(Math.min(100, Math.floor(elapsed / EXIT_AT * 100))).padStart(2, '0')}%`;
    raf = requestAnimationFrame(draw);
  }

  function finish(skipped = false) {
    if (ending) return;
    ending = true;
    cancelAnimationFrame(raf);
    if (exitTimer) clearTimeout(exitTimer);
    if (progressLabel) progressLabel.textContent = '100%';
    intro.classList.add('is-exiting');
    // Hide and unlock immediately after the exit transition; never leave an invisible blocking overlay.
    setTimeout(() => {
      intro.hidden = true;
      intro.setAttribute('aria-hidden', 'true');
      root.classList.remove('qb-intro-enabled');
      stopped = true;
      if (skipped) {
        const main = document.getElementById('main-content');
        if (main) {
          main.setAttribute('tabindex', '-1');
          main.focus({ preventScroll: true });
          main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
        }
      }
    }, 360);
  }

  skip?.addEventListener('click', () => finish(true));
  document.addEventListener('keydown', (event) => {
    if (!ending && event.key === 'Escape') finish(true);
  });
  window.addEventListener('pagehide', () => finish(), { once: true });
  window.addEventListener('resize', () => { if (!ending) setup(); }, { passive: true });
  setup();
  raf = requestAnimationFrame(draw);
  // In throttled background tabs, requestAnimationFrame can pause. The timeout guarantees unlock.
  exitTimer = setTimeout(() => finish(), EXIT_AT);
})();