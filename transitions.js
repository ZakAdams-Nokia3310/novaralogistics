'use strict';
// EquipCore — Shared Transitions, Splash Screen & Scroll Animations

(function () {
const SPLASH_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgc6Y5rWWeUQZRIL0__CeHIVE7-Y1PnBOmGzY6bTfyHJPFQ2z0o6zITEEB8Ze2bO-kK9sDEeZR1t5yOc1eSPjLm98WbiI72qRvJio2j7tkC_RNSxgzNH-dVTFwYaogWlenOal0HxIQutFpVLHuFFw92GtNMG7NwnRB6LJJYd6ONZ2tt6fis9ypydlFevWKr8pEgtgW70GDf7jnMkv-I0mOGUIa4IgDZzN61Jtr4XLg0JPzyMBj1JbC4puBBnBvPEYGRUJXwfCr9qI';

/* ── Inject CSS ─────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@700&family=JetBrains+Mono:wght@500&display=swap');

  body { transition: opacity 0.28s cubic-bezier(0.4,0,0.2,1); }

  @keyframes ec-in  { from{opacity:0} to{opacity:1} }
  @keyframes ec-out { from{opacity:1} to{opacity:0} }
  @keyframes ec-progress { from{width:0%} to{width:100%} }
  @keyframes ec-pulse-glow {
    0%,100%{box-shadow:0 0 20px rgba(0,240,255,0.4),0 0 60px rgba(0,240,255,0.1)}
    50%{box-shadow:0 0 40px rgba(0,240,255,0.7),0 0 100px rgba(0,240,255,0.2)}
  }
  @keyframes ec-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes ec-exit { to{opacity:0;transform:scale(1.03)} }

  .ec-enter { animation: ec-in 0.45s cubic-bezier(0.4,0,0.2,1) both; }

  #ec-splash {
    position:fixed; inset:0; z-index:99999;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:#060810; overflow:hidden;
    /* Purely decorative — no interactive elements of its own. Without
       this, it silently blocks every click on the real page underneath
       for its ~2.9s lifetime (worse: at equal z-index, whichever of this
       or the cookie-consent banner got appended to the DOM later wins the
       hit-test, so which one was actually swallowing a given click was
       timing-dependent). Letting clicks pass through removes that whole
       class of "nothing happens" bug regardless of timing. */
    pointer-events:none;
  }
  #ec-splash-bg {
    position:absolute; inset:0;
    background: url('${SPLASH_BG}') center/cover no-repeat;
    opacity:0.22; filter:saturate(0.5) brightness(0.7);
    animation: ec-in 1.2s ease both;
  }
  #ec-splash-vignette {
    position:absolute; inset:0;
    background: radial-gradient(ellipse at 50% 60%, transparent 0%, rgba(6,8,16,0.85) 65%),
                linear-gradient(to top, #060810 0%, transparent 40%);
  }
  #ec-splash-grid { display:none; }
  #ec-splash-content {
    position:relative; z-index:1; text-align:center;
    animation: ec-in 0.8s 0.2s cubic-bezier(0.4,0,0.2,1) both;
  }
  #ec-splash-icon {
    font-size:56px; margin-bottom:4px;
    animation: ec-float 2.5s ease infinite;
    display:block;
  }
  #ec-splash-logo {
    font-family:'Hanken Grotesk',sans-serif;
    font-size: clamp(44px,8vw,76px);
    font-weight:700; letter-spacing:-0.03em;
    background:linear-gradient(135deg,#00f0ff 0%,#7df4ff 50%,#ffffff 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    filter:drop-shadow(0 0 30px rgba(0,240,255,0.55));
    margin-bottom:6px; display:block;
  }
  #ec-splash-tag {
    font-family:'JetBrains Mono',monospace;
    font-size:11px; letter-spacing:0.28em; text-transform:uppercase;
    color:rgba(0,240,255,0.55); margin-bottom:44px; display:block;
  }
  #ec-splash-canvas {
    position:absolute; inset:0; width:100%; height:100%;
    pointer-events:none;
  }
  #ec-splash-bar-wrap {
    width:240px; height:1.5px;
    background:rgba(255,255,255,0.08); border-radius:999px;
    overflow:hidden; margin:0 auto 14px;
  }
  #ec-splash-bar {
    height:100%;
    background:linear-gradient(90deg,#00f0ff,#7df4ff);
    border-radius:999px;
    box-shadow:0 0 12px rgba(0,240,255,0.8);
    animation: ec-progress 2.1s cubic-bezier(0.4,0,0.6,1) forwards;
  }
  #ec-splash-status {
    font-family:'JetBrains Mono',monospace;
    font-size:10px; color:rgba(255,255,255,0.28);
    letter-spacing:0.12em; transition:opacity 0.3s;
  }
  #ec-splash.exiting { animation: ec-exit 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }

  /* scroll-in cards */
  .ec-reveal {
    opacity:0; transform:translateY(22px);
    transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1),
                transform 0.55s cubic-bezier(0.4,0,0.2,1);
  }
  .ec-reveal.visible { opacity:1; transform:translateY(0); }

  /* hover lift on cards */
  .glass-card, article {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
                border-color 0.3s ease,
                box-shadow 0.3s ease !important;
  }

  /* NProgress-style page bar */
  #ec-topbar {
    position:fixed; top:0; left:0; height:2px; z-index:99998;
    background:linear-gradient(90deg,#00f0ff,#7df4ff);
    box-shadow: 0 0 8px rgba(0,240,255,0.7);
    width:0%; transition:width 0.25s ease, opacity 0.4s ease;
    border-radius:0 2px 2px 0;
  }
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ── Top progress bar ───────────────────────────────────── */
const bar = document.createElement('div');
bar.id = 'ec-topbar';
document.body.appendChild(bar);

function startBar() {
  bar.style.width = '0%'; bar.style.opacity = '1';
  setTimeout(() => { bar.style.width = '70%'; }, 30);
}
function finishBar() {
  bar.style.width = '100%';
  setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0%'; }, 350);
}

/* ── Splash screen ──────────────────────────────────────── */
function showSplash() {
  const s = document.createElement('div');
  s.id = 'ec-splash';
  s.innerHTML = `
    <div id="ec-splash-bg"></div>
    <div id="ec-splash-vignette"></div>
    <canvas id="ec-splash-canvas"></canvas>
    <div id="ec-splash-content">
      <span id="ec-splash-icon">⚡</span>
      <span id="ec-splash-logo">EquipCore</span>
      <span id="ec-splash-tag">Fleet &amp; Equipment Manager</span>
      <div id="ec-splash-bar-wrap"><div id="ec-splash-bar"></div></div>
      <div id="ec-splash-status">Initializing fleet systems…</div>
    </div>
  `;
  document.body.appendChild(s);

  // ── Canvas animation ──────────────────────────────────────
  const cv  = s.querySelector('#ec-splash-canvas');
  const ctx = cv.getContext('2d');
  let cW, cH, rings = [], pts2 = [], cRaf;

  function cResize() {
    cW = cv.width  = cv.offsetWidth  || window.innerWidth;
    cH = cv.height = cv.offsetHeight || window.innerHeight;
  }
  cResize();

  // Particles
  const NP = 55;
  for (let k = 0; k < NP; k++) {
    pts2.push({
      x: Math.random() * cW, y: Math.random() * cH,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.3 + .4,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  // Scanner rings
  function spawnRing() {
    rings.push({ r: 0, maxR: Math.max(cW, cH) * .72, born: performance.now() });
  }
  spawnRing();
  const ringTimer = setInterval(spawnRing, 900);

  function drawSplashCanvas(t) {
    ctx.clearRect(0, 0, cW, cH);
    const cx = cW / 2, cy = cH / 2;

    // Rings
    const now = performance.now();
    rings = rings.filter(rg => {
      const age = (now - rg.born) / 1800;
      if (age > 1) return false;
      const radius = rg.maxR * age;
      const alpha  = .18 * (1 - age);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,240,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      // Inner glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius * .55, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,240,255,${alpha * .4})`;
      ctx.lineWidth = .5;
      ctx.stroke();
      return true;
    });

    // Crosshair lines at center
    ctx.strokeStyle = 'rgba(0,240,255,0.06)';
    ctx.lineWidth = .5;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, cH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(cW, cy); ctx.stroke();

    // Particles + network
    const D = 130;
    for (let i = 0; i < pts2.length; i++) {
      const p = pts2[i];
      p.x += p.vx; p.y += p.vy; p.pulse += .02;
      if (p.x < -10) p.x = cW+10;
      if (p.x > cW+10) p.x = -10;
      if (p.y < -10) p.y = cH+10;
      if (p.y > cH+10) p.y = -10;
      const pulse = .5 + .5 * Math.sin(p.pulse);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,240,255,${.32 * pulse})`;
      ctx.fill();
      for (let j = i+1; j < pts2.length; j++) {
        const q = pts2[j];
        const dx = p.x-q.x, dy = p.y-q.y, d2 = dx*dx+dy*dy;
        if (d2 < D*D) {
          const dist = Math.sqrt(d2);
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle = `rgba(0,240,255,${.07*(1-dist/D)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    }
    cRaf = requestAnimationFrame(drawSplashCanvas);
  }
  drawSplashCanvas();

  const msgs = ['Connecting to telemetry…','Loading fleet data…','Syncing GPS nodes…','Systems online ✓'];
  let i = 0;
  const st = s.querySelector('#ec-splash-status');
  const tick = setInterval(() => { if (st && msgs[i]) { st.textContent = msgs[i++]; } }, 520);

  setTimeout(() => {
    clearInterval(tick);
    clearInterval(ringTimer);
    cancelAnimationFrame(cRaf);
    s.classList.add('exiting');
    setTimeout(() => s.remove(), 580);
  }, 2300);
}

/* ── Page-enter animation ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  finishBar();
  document.body.classList.add('ec-enter');

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!sessionStorage.getItem('ec_v')) {
    sessionStorage.setItem('ec_v', '1');
    if (!reduceMotion) showSplash();
  }

  // Scroll-reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 55);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  // Auto-tag cards for reveal
  document.querySelectorAll('.glass-card, article, .glass-float').forEach((el, i) => {
    if (!el.closest('#ec-splash')) {
      el.classList.add('ec-reveal');
      obs.observe(el);
    }
  });
});

/* ── Link click transition ──────────────────────────────── */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('mailto') || link.target === '_blank') return;
  const sameSite = !link.hostname || link.hostname === location.hostname;
  if (!sameSite) return;

  e.preventDefault();
  startBar();
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = href; }, 270);
  // Safety net: if navigation is ever interrupted (blocked, cancelled, a
  // redirect race with security.js's session guard, etc.) the page must
  // never stay stuck invisible — restore it after a generous grace period.
  setTimeout(() => {
    if (document.body.style.opacity === '0') document.body.style.opacity = '1';
  }, 2000);
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    document.body.style.opacity = '1';
  }
});
})();
