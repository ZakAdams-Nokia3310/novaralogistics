'use strict';
// EquipCore — Shared background + sign-in intro video

(function () {

  var INTRO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_3F3a4QhSJAaJAIbLMhLHPVYFt1B/hf_20260621_225538_3cfc187b-1d98-4660-9edc-7d83d718815e.mp4';

  var params = new URLSearchParams(window.location.search);
  var showIntro = params.get('intro') === '1';

  if (showIntro) {
    params.delete('intro');
    var clean = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', clean);
  }

  /* ── CSS ── */
  var css = `
    html { background: #080a0e !important; }
    body { background: transparent !important; }

    /* ══ App-shell pages: paint the atmosphere directly on <html> instead of
       a position:fixed sibling div. Reference comparison (a well-regarded
       Tailwind admin template, and our own landing page) confirmed a real
       structural difference: dashboards were the only pages carrying a
       persistent position:fixed, full-viewport gradient layer that the
       browser must keep compositing independently of normal page paint on
       every scroll frame, on top of the sidebar/topbar/glass-card layers.
       A background painted on <html> is just part of its ordinary paint —
       no extra compositor layer, and (unlike background-attachment:fixed,
       which reintroduces the same per-frame repaint cost, notably on
       mobile Safari) it scrolls with the document like any other paint. */
    html.ec-appshell {
      background:
        radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 55%),
        radial-gradient(ellipse at 100% 100%, rgba(112,0,255,0.05) 0%, transparent 50%),
        linear-gradient(rgba(0,240,255,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,240,255,0.022) 1px, transparent 1px),
        #080a0e !important;
      background-size: auto, auto, 80px 80px, 80px 80px;
    }

    /* ══ GLOBAL SELECT / DROPDOWN STYLING ══ */
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: rgba(255,255,255,0.04);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath d='M3 5l4 4 4-4' fill='none' stroke='%23849495' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px;
      color: #e2e2e8;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      padding: 9px 36px 9px 12px;
      cursor: pointer;
      outline: none;
      transition: border-color .18s, background-color .18s, box-shadow .18s;
      min-height: 40px;
    }
    select:hover {
      border-color: rgba(255,255,255,0.18);
      background-color: rgba(255,255,255,0.06);
    }
    select:focus {
      border-color: #00f0ff;
      box-shadow: 0 0 0 1px rgba(0,240,255,0.2);
      background-color: rgba(0,240,255,0.03);
    }
    select option {
      background-color: #111317;
      color: #e2e2e8;
      padding: 8px;
    }
    select option:checked {
      background-color: rgba(0,240,255,0.12);
    }

    /* ══ GLOBAL MOBILE UTILITIES ══ */

    /* Scrollable table wrapper */
    .tbl-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

    /* Scroll-perf: promote sticky/fixed chrome onto their own compositor
       layer. .topbar/#sidebar-root no longer carry backdrop-filter at all
       (see theme.css) so this is now just cheap transform promotion, not
       blur mitigation. */
    .topbar, #sidebar-root, #sb-overlay {
      transform: translateZ(0);
      will-change: transform;
    }
    /* Mobile-safe stats grids */
    @media (max-width: 600px) {
      [style*="grid-template-columns:repeat(4"] {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    /* Sidebar toggle button (mobile) */
    #sb-toggle {
      display: none;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 200;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #00f0ff;
      color: #003a3c;
      border: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0,240,255,0.35);
      font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
      font-size: 22px;
    }
    @media (max-width: 768px) {
      #sb-toggle { display: flex; }
      .sidebar.sb-open { transform: translateX(0) !important; display: flex !important; }
      .sidebar {
        transform: translateX(-100%);
        display: flex !important;
        transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
        z-index: 500 !important;
      }
      .sb-backdrop {
        position: fixed; inset: 0; z-index: 499;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(2px);
      }
    }

    /* Prevent horizontal overflow on all pages */
    .main, .body, .topbar { max-width: 100vw; overflow-x: hidden; }

    /* Better form inputs on mobile */
    @media (max-width: 600px) {
      input, textarea, select {
        font-size: 16px !important; /* prevents iOS zoom on focus */
      }
      .body { padding: 14px 14px !important; }
    }

    #ec-bg { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
    #ec-bg-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 55%),
                  radial-gradient(ellipse at 100% 100%, rgba(112,0,255,0.05) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(8,10,14,0.25) 0%, rgba(8,10,14,0.88) 55%, rgba(8,10,14,0.97) 100%);
    }
    #ec-bg-grid {
      position: absolute; inset: 0; opacity: 0.022;
      background-image: linear-gradient(rgba(0,240,255,1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px);
      background-size: 80px 80px;
    }

    /* ── Full-screen video intro ── */
    #ec-vid-intro {
      position: fixed; inset: 0; z-index: 9999; background: #000; overflow: hidden;
    }
    #ec-vid-intro.fading {
      transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);
      opacity: 0;
    }
    #ec-vid-intro video {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; display: block;
    }
    .vid-bottom-gradient {
      position: absolute; bottom: 0; left: 0; right: 0; height: 45%; z-index: 1;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);
    }
    .vid-brand {
      position: absolute; bottom: 48px; left: 0; right: 0; z-index: 2;
      text-align: center; padding: 0 24px;
      opacity: 0; transform: translateY(18px);
      animation: vid-up 0.7s ease 0.5s forwards;
    }
    @keyframes vid-up { to { opacity: 1; transform: none; } }
    .vid-brand-logo { font-size: 28px; margin-bottom: 8px; }
    .vid-brand-title {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: clamp(26px, 4.5vw, 48px); font-weight: 800;
      color: #fff; letter-spacing: -0.02em;
      text-shadow: 0 2px 24px rgba(0,0,0,0.9); margin-bottom: 4px;
    }
    .vid-brand-title span {
      background: linear-gradient(135deg, #00f0ff, #7df4ff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .vid-brand-sub {
      font-family: 'JetBrains Mono', monospace; font-size: 10px;
      color: rgba(0,240,255,0.55); letter-spacing: 0.22em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .vid-bar { width: 140px; height: 2px; background: rgba(255,255,255,0.12); border-radius: 2px; overflow: hidden; margin: 0 auto; }
    .vid-fill { height: 100%; background: linear-gradient(90deg, #00f0ff, #7df4ff); border-radius: 2px; width: 0%; }

    /* Named ec-load-in-kf, not ec-in: transitions.js also defines a
       @keyframes ec-in (opacity-only, for its own unrelated .ec-enter class)
       and loads after this file, so its definition silently replaced this
       one wholesale — CSS keyframe names aren't scoped per-file, last one
       parsed wins outright, they don't merge. Since the winning definition
       never mentioned transform, every .ec-load-in element's initial
       translateY(20px) was never animated back to none: confirmed via
       computed style that it stayed there permanently, well past the
       animation's 0.5s duration. That's every one of up to 24 top-level
       children of .main/.body on every dashboard/app page (topbar, cards,
       charts, tables, the map) sitting 20px off and pinned to its own
       compositor layer, indefinitely, on every single page load. */
    .ec-load-in { opacity: 0; transform: translateY(20px); animation: ec-load-in-kf 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
    @keyframes ec-load-in-kf { to { opacity: 1; transform: none; } }

    /* ══ Scroll-reveal system — identical values to index.html's .sr (the
       landing page), which never had this problem. This exact system was
       tried here before and reverted for a suspected "momentum-scroll
       regression" — but that revert happened before the @keyframes ec-in
       collision above was found and fixed, and .ec-load-in (corrupted by
       that collision) was active on the same pages at the same time. The
       landing page's own IntersectionObserver batches multiple simultaneous
       reveals with no stagger either (checked directly), so there's nothing
       about this system itself that differs from the working reference. ══ */
    .sr { opacity: 0; transform: translateY(26px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .sr.visible { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) {
      .sr { transition: opacity .3s linear !important; transform: none !important; }
    }

    .cs-wrap{position:relative;display:block}
    .cs-trigger{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:9px;color:#e2e2e8;font-family:'Inter',sans-serif;font-size:13px;padding:9px 12px;cursor:pointer;transition:border-color .18s,background .18s;user-select:none;min-height:40px}
    .cs-trigger:hover{border-color:rgba(255,255,255,.15);background:rgba(255,255,255,.05)}
    .cs-wrap.cs-open .cs-trigger{border-color:rgba(0,240,255,.5);background:rgba(0,240,255,.03)}
    .cs-val{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .cs-arrow{font-size:18px!important;color:#849495;transition:transform .18s,color .18s;flex-shrink:0;line-height:1!important}
    .cs-wrap.cs-open .cs-arrow{transform:rotate(180deg)!important;color:#00f0ff}
    .cs-dropdown{background:rgba(10,12,18,.98);border:1px solid rgba(0,240,255,.16);border-radius:10px;overflow:hidden auto;max-height:240px;box-shadow:0 16px 48px rgba(0,0,0,.75),0 0 0 1px rgba(0,240,255,.04);backdrop-filter:blur(28px)}
    .cs-dropdown.cs-anim{animation:csSlide .14s ease both}
    @keyframes csSlide{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
    .cs-opt{padding:10px 14px;font-size:13px;color:#b9cacb;cursor:pointer;transition:background .1s,color .1s;font-family:'Inter',sans-serif;border-bottom:1px solid rgba(255,255,255,.04)}
    .cs-opt:last-child{border-bottom:none}
    .cs-opt:hover{background:rgba(0,240,255,.07);color:#e2e2e8}
    .cs-opt.cs-sel{color:#00f0ff;background:rgba(0,240,255,.04)}
    .cs-opt.cs-sel::after{content:'\\2713';float:right;font-size:11px;opacity:.7}
    .leaflet-container{background:#080a0e!important}
    .leaflet-popup-content-wrapper,.leaflet-popup-tip{background:rgba(12,14,20,.98)!important;border:1px solid rgba(0,240,255,.18)!important;color:#e2e2e8!important;box-shadow:0 12px 40px rgba(0,0,0,.7)!important;border-radius:9px!important}
    .leaflet-popup-content{margin:9px 13px!important;font-family:'JetBrains Mono',monospace;font-size:11px!important;line-height:1.6!important}
    .leaflet-popup-content b{color:#00f0ff}
    .leaflet-popup-close-button{color:#849495!important;font-size:16px!important}
    .leaflet-bar{border:1px solid rgba(255,255,255,.08)!important;border-radius:8px!important;overflow:hidden!important;box-shadow:none!important}
    .leaflet-control-zoom a{background:rgba(12,14,20,.9)!important;border-color:rgba(255,255,255,.06)!important;color:#b9cacb!important;width:28px!important;height:28px!important;line-height:28px!important;font-size:16px!important}
    .leaflet-control-zoom a:hover{background:rgba(0,240,255,.1)!important;color:#00f0ff!important}
    .leaflet-control-attribution{background:rgba(8,10,14,.5)!important;color:#849495!important;font-size:9px!important;border-radius:4px!important;padding:2px 6px!important}
    .leaflet-control-attribution a{color:#849495!important}

    /* ══ GLOBAL: smooth scrolling + accessible focus states ══ */
    html { scroll-behavior: smooth; }
    a:focus-visible, button:focus-visible, select:focus-visible,
    input:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
      outline: 2px solid #00f0ff;
      outline-offset: 2px;
      border-radius: 6px;
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* ══ GLOBAL: aurora background — GPU-composited transform-only animation ══ */
    .ec-aurora-blob {
      position: absolute; border-radius: 50%;
      filter: blur(40px); mix-blend-mode: screen;
      will-change: transform; transform: translateZ(0);
    }
    @keyframes ec-aurora-a { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-6%,8%); } }
    @keyframes ec-aurora-b { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8%,5%); } }
    @keyframes ec-aurora-c { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5%,-8%); } }
    @media (max-width: 768px) { .ec-aurora-blob { filter: blur(24px); } }
    @media (prefers-reduced-motion: reduce) { .ec-aurora-blob { animation: none !important; } }

    /* ══ Scroll-progress indicator — 2px fixed bar, transform-only (scaleX),
       updated via a passive + rAF-throttled listener. This is the same
       pattern the landing page already uses safely for its nav .scrolled
       toggle; the earlier jank came from backdrop-filter recompositing and
       the scroll-tint background transition, both already removed, not from
       having a scroll listener at all. ══ */
    #ec-scroll-progress {
      position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 300;
      background: linear-gradient(90deg, #00f0ff, #7df4ff);
      transform: scaleX(0); transform-origin: left;
      will-change: transform; pointer-events: none;
    }
    @media (prefers-reduced-motion: reduce) {
      #ec-scroll-progress { display: none; }
    }
  `;

  var s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  /* ── Static background ──
     App-shell pages (dashboards with a sidebar) skip the animated, blurred
     aurora blobs entirely — they bring little value behind dense data UI and
     are a real, measured scroll-jank cost: each one is a continuously
     animating, blurred, blend-mode layer sitting directly behind several
     backdrop-filter glass panels, forcing the browser to recomposite all of
     them together on every frame. Marketing-ish pages (catalog, marketplace,
     calculator, profile, login…) keep the atmosphere.

     App-shell pages also skip the position:fixed #ec-bg div entirely (see
     the html.ec-appshell rule above) — that div was the one persistent
     full-viewport compositor layer every dashboard page carried that the
     landing page, and the reference template that prompted this pass,
     don't have. */
  var isAppShell = !!(document.getElementById('sidebar-root') || document.querySelector('.sidebar'));
  if (isAppShell) {
    document.documentElement.classList.add('ec-appshell');
  } else {
    var bg = document.createElement('div');
    bg.id = 'ec-bg';
    bg.innerHTML =
      '<div style="position:absolute;inset:0;overflow:hidden;isolation:isolate;-webkit-mask-image:linear-gradient(180deg,#000 60%,transparent 100%);mask-image:linear-gradient(180deg,#000 60%,transparent 100%)">' +
        '<div class="ec-aurora-blob" style="width:640px;height:520px;top:-160px;right:-100px;background:radial-gradient(circle at 50% 50%,rgba(0,240,255,0.22),transparent 66%);animation:ec-aurora-a 27s ease-in-out infinite"></div>' +
        '<div class="ec-aurora-blob" style="width:560px;height:480px;top:-110px;left:-140px;background:radial-gradient(circle at 50% 50%,rgba(112,0,255,0.18),transparent 66%);animation:ec-aurora-b 33s ease-in-out infinite"></div>' +
      '</div>' +
      '<div id="ec-bg-vignette"></div><div id="ec-bg-grid"></div>';
    document.body.insertBefore(bg, document.body.firstChild);
  }

  /* ── Content stagger helper ── */
  function stagger() {
    // First screenful animates in immediately on load (.ec-load-in);
    // anything further down gets .sr instead so it reveals on scroll, same
    // as the landing page, rather than animating off-screen where it's
    // never seen.
    var els = document.querySelectorAll('.main > *, .body > *, .sidebar + * > *, [data-ec-animate]');
    for (var i = 0; i < els.length; i++) {
      if (i < 8) {
        els[i].classList.add('ec-load-in');
        els[i].style.animationDelay = (i * 50) + 'ms';
      } else if (i < 24) {
        els[i].classList.add('sr');
      }
    }
    observeReveal();
  }

  /* ── Scroll-reveal observer (mirrors index.html's .sr system) ── */
  var revealObs = null;
  function observeReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.sr').forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    if (!revealObs) {
      revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
    }
    document.querySelectorAll('.sr:not(.visible)').forEach(function (el) { revealObs.observe(el); });
  }

  /* ── Scroll-progress bar — passive listener, rAF-throttled, transform-only ── */
  (function initScrollProgress() {
    var bar = document.createElement('div');
    bar.id = 'ec-scroll-progress';
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? Math.min(h.scrollTop / max, 1) : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ═══ VIDEO INTRO ═══ */
  if (showIntro) {
    document.body.style.overflow = 'hidden';

    var div = document.createElement('div');
    div.id = 'ec-vid-intro';
    div.innerHTML =
      '<video autoplay muted playsinline preload="auto">' +
        '<source src="' + INTRO_VIDEO + '" type="video/mp4">' +
      '</video>' +
      '<div class="vid-bottom-gradient"></div>' +
      '<div class="vid-brand">' +
        '<div class="vid-brand-logo">⚡</div>' +
        '<div class="vid-brand-title">Fleet Systems <span>Online</span></div>' +
        '<div class="vid-brand-sub">Initialising Dashboard</div>' +
        '<div class="vid-bar"><div class="vid-fill" id="ec-vf"></div></div>' +
      '</div>';
    document.body.insertBefore(div, document.body.firstChild);

    var video = div.querySelector('video');
    var fill  = document.getElementById('ec-vf');
    var done  = false;

    // Force play (some browsers block autoplay)
    if (video) {
      video.play().catch(function () {});
    }

    // Animate progress bar once we know duration
    function startBar() {
      if (!fill) return;
      var dur = (video && video.duration && isFinite(video.duration)) ? video.duration : 5;
      fill.style.transition = 'width ' + dur + 's linear';
      fill.style.width = '100%';
    }

    if (video) {
      video.addEventListener('loadedmetadata', startBar);
      video.addEventListener('playing', startBar);
    }
    // Fallback if events don't fire
    setTimeout(startBar, 300);

    function dismiss() {
      if (done) return;
      done = true;
      div.classList.add('fading');
      document.body.style.overflow = '';
      stagger();
      setTimeout(function () { if (div.parentNode) div.remove(); }, 1400);
    }

    if (video) video.addEventListener('ended', dismiss);
    setTimeout(dismiss, 7000);

  } else {
    /* ── Normal page load — just stagger content in ── */
    if (document.readyState === 'complete') { stagger(); }
    else { window.addEventListener('load', stagger); }
  }

  /* ── Mobile sidebar toggle (floating FAB) ──
     Only needed on pages built around .sidebar (dashboard-driver.html,
     dashboard-user.html) — those have no topbar-embedded hamburger of their
     own. Pages using #sidebar-root (buildSidebar) already get a proper
     hamburger inserted into .topbar by sidebar.js, and #sidebar-root's
     mobile CSS never wires up a `.sb-open` state anyway, so on those pages
     this floating button was dead weight sitting over the content. */
  if (!document.getElementById('sidebar-root') && document.querySelector('.sidebar')) {
  var sidebarToggle = document.createElement('button');
  sidebarToggle.id = 'sb-toggle';
  sidebarToggle.setAttribute('aria-label', 'Toggle menu');
  sidebarToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:\'FILL\' 0,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24">menu</span>';
  document.body.appendChild(sidebarToggle);

  sidebarToggle.addEventListener('click', function () {
    var sb = document.querySelector('.sidebar');
    if (!sb) return;
    var isOpen = sb.classList.contains('sb-open');
    if (isOpen) {
      sb.classList.remove('sb-open');
      var bd = document.getElementById('sb-backdrop');
      if (bd) bd.remove();
      sidebarToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:\'FILL\' 0,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24">menu</span>';
    } else {
      sb.classList.add('sb-open');
      var backdrop = document.createElement('div');
      backdrop.id = 'sb-backdrop';
      backdrop.className = 'sb-backdrop';
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', function () {
        sb.classList.remove('sb-open');
        backdrop.remove();
        sidebarToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:\'FILL\' 0,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24">menu</span>';
      });
      sidebarToggle.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:\'FILL\' 0,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24">close</span>';
    }
  });
  }

})();
