'use strict';
// EquipCore — Dynamic sidebar builder (injected on all app pages)

(function () {

  const NAV = {
    admin: [
      { section: 'Main' },
      { href:'dashboard-admin',  icon:'dashboard',     label:'Overview' },
      { href:'messages',         icon:'chat',          label:'Messages' },
      { href:'admin-rentals',    icon:'receipt_long',  label:'Rental Tracking' },
      { href:'admin-orgs',       icon:'domain',        label:'Organisations' },
      { href:'admin-fleet',      icon:'garage',        label:'Fleet' },
      { href:'add-vehicle',      icon:'add_box',       label:'Add Vehicle' },
      { href:'admin-maintenance',icon:'build',         label:'Maintenance' },
      { href:'admin-reports',    icon:'monitoring',    label:'Reporting' },
      { section: 'Tools' },
      { href:'calculator',       icon:'calculate',     label:'Calculator' },
      { section: 'Security' },
      { href:'admin-audit',      icon:'policy',        label:'Audit Logs' },
      { href:'admin-orgs#users', icon:'manage_accounts', label:'User Management' },
      { href:'admin-roles',      icon:'admin_panel_settings', label:'Roles & Permissions' },
      { section: 'Account' },
      { href:'profile',          icon:'person',        label:'My Profile' },
    ],
    user: [
      { section: 'My Account' },
      { href:'dashboard-user',   icon:'dashboard',     label:'My Dashboard' },
      { href:'my-rentals',       icon:'receipt_long',  label:'My Rentals' },
      { href:'messages',         icon:'chat',          label:'Messages' },
      { href:'rent-equipment',   icon:'add_circle',    label:'Apply to Rent' },
      { section: 'Browse' },
      { href:'calculator',       icon:'calculate',     label:'Calculator' },
      { section: 'Account' },
      { href:'profile',          icon:'person',        label:'My Profile' },
    ],
    driver: [
      { section: 'Driver Portal' },
      { href:'dashboard-driver', icon:'home',          label:'My Dashboard' },
      { href:'my-rentals',       icon:'receipt_long',  label:'My Rentals' },
      { href:'messages',         icon:'chat',          label:'Messages' },
      { href:'calculator',       icon:'calculate',     label:'Calculator' },
      { section: 'Account' },
      { href:'profile',          icon:'person',        label:'My Profile' },
    ],
  };

  const ROLE_COLOUR = {
    admin: 'var(--accent, #00f0ff)', user: 'var(--accent, #00f0ff)',
    driver: 'var(--driver, #ffb4a2)',
  };

  // Feature key -> nav entry, for custom-role-granted pages (see
  // dataconnect/schema/schema.gql's Role type). Only listed here so a
  // custom-role holder (base role user/driver, not in NAV.admin) still
  // gets a link to whatever admin pages their role actually grants them.
  const FEATURE_NAV = {
    'admin-fleet':       { href: 'admin-fleet',       icon: 'garage',       label: 'Fleet' },
    'admin-rentals':     { href: 'admin-rentals',     icon: 'receipt_long', label: 'Rental Tracking' },
    'admin-maintenance': { href: 'admin-maintenance', icon: 'build',        label: 'Maintenance' },
    'admin-orgs':        { href: 'admin-orgs',        icon: 'domain',       label: 'Organisations' },
    'admin-audit':       { href: 'admin-audit',       icon: 'policy',       label: 'Audit Logs' },
    'admin-reports':     { href: 'admin-reports',     icon: 'monitoring',   label: 'Reporting' },
  };

  window.buildSidebar = function (currentHref) {
    const el = document.getElementById('sidebar-root');
    if (!el) return;

    const user    = (typeof EC_AUTH !== 'undefined') ? EC_AUTH.current() : null;
    const role    = user?.role || '';
    const rc      = ROLE_COLOUR[role] || '#00f0ff';
    const links   = (NAV[role] || []).slice();
    if (user && user.permissions) {
      const already = new Set(links.filter(l => l.href).map(l => l.href.split('#')[0]));
      const extra = Object.keys(user.permissions)
        .map(key => FEATURE_NAV[key])
        .filter(entry => entry && !already.has(entry.href));
      if (extra.length) {
        links.push({ section: 'Assigned Access' });
        links.push(...extra);
      }
    }
    const current = currentHref || location.pathname.split('/').pop();

    const icon = (name) =>
      `<span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;flex-shrink:0">${name}</span>`;

    let h = '';

    // ── Mobile close button (hidden on desktop) ───────────
    h += `<button id="sb-close" aria-label="Close menu" style="display:none;position:absolute;top:12px;right:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;width:32px;height:32px;color:#849495;cursor:pointer;align-items:center;justify-content:center;z-index:1;flex-shrink:0"><span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">close</span></button>`;
    // ── Logo + collapse toggle ──────────────────────────────
    h += `<div class="sb-logo-row" style="padding:18px 15px 14px;border-bottom:1px solid var(--hairline, rgba(255,255,255,0.05));display:flex;align-items:center;justify-content:space-between;gap:8px">
      <a href="/" style="display:flex;align-items:center;gap:9px;text-decoration:none;min-width:0">
        <span style="font-size:20px;flex-shrink:0">⚡</span>
        <span class="sb-label" style="font-family:'Hanken Grotesk',sans-serif;font-size:18px;font-weight:800;letter-spacing:-.03em;background:linear-gradient(135deg,#00f0ff,#7df4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;white-space:nowrap;overflow:hidden">EquipCore</span>
      </a>
      <button class="sb-toggle" aria-label="Collapse sidebar" title="Collapse sidebar" onclick="toggleSidebarCollapse()"><span class="material-symbols-outlined">chevron_left</span></button>
    </div>`;

    // ── User card or Sign-In prompt ────────────────────────
    if (user) {
      const init = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const avatarBg = role === 'driver' ? 'var(--driver-bg, rgba(255,180,162,.14))' : 'var(--accent-soft, rgba(0,240,255,.12))';
      h += `<div style="padding:9px 11px;border-bottom:1px solid var(--hairline, rgba(255,255,255,0.04))">
        <div class="sb-user-card" style="background:var(--surface, rgba(255,255,255,0.035));border:1px solid var(--border, rgba(255,255,255,0.07));border-radius:10px;padding:9px 10px;display:flex;align-items:center;gap:9px">
          <div style="width:30px;height:30px;border-radius:8px;background:${avatarBg};display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:${rc};flex-shrink:0" title="${user.name}">${init}</div>
          <div class="sb-label" style="min-width:0;flex:1">
            <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-primary, #e2e2e8)">${user.name}</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted, #849495)">${user.org || 'Independent'}</div>
          </div>
          <span class="sb-label" style="font-family:'JetBrains Mono',monospace;font-size:9px;background:rgba(0,240,255,.08);color:${rc};padding:2px 6px;border-radius:999px;border:1px solid rgba(0,240,255,.15);flex-shrink:0;letter-spacing:.06em">${role.toUpperCase()}</span>
        </div>
      </div>`;
    } else {
      h += `<div style="padding:9px 11px;border-bottom:1px solid var(--hairline, rgba(255,255,255,0.04))">
        <a href="login" title="Sign In" style="display:flex;align-items:center;justify-content:center;gap:7px;padding:10px;background:var(--accent, #00f0ff);color:var(--accent-ink, #003a3c);border-radius:10px;text-decoration:none;font-family:'Hanken Grotesk',sans-serif;font-weight:700;font-size:13px;box-shadow:var(--accent-glow, 0 0 20px rgba(0,240,255,.18))">
          ${icon('bolt')}<span class="sb-label">Sign In</span>
        </a>
      </div>`;
    }

    // ── Nav links ──────────────────────────────────────────
    h += `<nav style="flex:1;min-height:0;overscroll-behavior:contain;padding:8px 7px;overflow-y:auto;display:flex;flex-direction:column;gap:2px">`;
    links.forEach(item => {
      if (item.section) {
        h += `<div class="sb-section" style="font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-muted, #849495);text-transform:uppercase;letter-spacing:.18em;padding:10px 10px 4px;margin-top:4px">${item.section}</div>`;
        return;
      }
      const itemBase = item.href.split('#')[0];
      const active = current === item.href || current === itemBase;
      const base   = 'display:flex;align-items:center;gap:9px;padding:9px 11px;padding-left:14px;border-radius:10px;font-family:\'JetBrains Mono\',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;transition:all .18s;border:1px solid transparent;';
      // Active item: left accent bar + soft glow, not a solid fill block.
      const style  = active
        ? `${base}color:${rc};background:rgba(0,240,255,.04);box-shadow:inset 3px 0 0 0 ${rc},0 0 16px -8px rgba(0,240,255,.6);`
        : `${base}color:var(--text-secondary, #b9cacb);`;
      h += `<a href="${item.href}" title="${item.label}" data-nav-active="${active ? '1' : ''}" style="${style}" onmouseover="if(!this.dataset.navActive)this.style.background='var(--surface-hover, rgba(255,255,255,.05))'" onmouseout="if(!this.dataset.navActive)this.style.background='transparent'">${icon(item.icon)}<span class="sb-label">${item.label}</span></a>`;
    });
    h += `</nav>`;

    // ── Footer ────────────────────────────────────────────
    h += `<div style="padding:9px 7px;border-top:1px solid var(--hairline, rgba(255,255,255,0.04))">`;
    if (user) {
      h += `<button onclick="EC_AUTH.logout()" title="Sign Out" style="display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;background:none;border:none;cursor:pointer;width:100%;color:var(--text-muted, #849495);transition:all .18s" onmouseover="this.style.background='var(--surface-hover, rgba(255,255,255,.05))'" onmouseout="this.style.background='transparent'">${icon('logout')}<span class="sb-label">Sign Out</span></button>`;
    } else {
      h += `<a href="/" title="Home" style="display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted, #849495);text-decoration:none;">${icon('home')}<span class="sb-label">Home</span></a>`;
    }
    h += `</div>`;

    el.innerHTML = h;
    applySidebarCollapseState();

    // ── Mobile + toast system (injected once per page) ───────────────────
    if (!document.getElementById('sb-m-css')) {
      const s = document.createElement('style');
      s.id = 'sb-m-css';
      s.textContent =
        // Overlay
        '#sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:50;backdrop-filter:blur(4px)}' +
        '#sb-overlay.on{display:block}' +
        // Toast system
        '#ec-toast-wrap{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9998;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;width:calc(100vw - 32px);max-width:400px}' +
        '.ec-toast{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;font-family:"JetBrains Mono",monospace;font-size:12px;animation:ec-tin .22s ease both;backdrop-filter:blur(16px);width:100%;box-shadow:0 4px 24px rgba(0,0,0,.5);line-height:1.4}' +
        '.ec-toast-success{background:rgba(0,212,170,.18);border:1px solid rgba(0,212,170,.35);color:#00d4aa}' +
        '.ec-toast-error{background:rgba(255,107,107,.18);border:1px solid rgba(255,107,107,.35);color:#ff6b6b}' +
        '.ec-toast-warn{background:rgba(255,217,61,.15);border:1px solid rgba(255,217,61,.3);color:#ffd93d}' +
        '.ec-toast-info{background:rgba(0,240,255,.12);border:1px solid rgba(0,240,255,.25);color:#00f0ff}' +
        '@keyframes ec-tin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' +
        // Mobile triggers
        '@media(max-width:768px){' +
          'body{overflow-x:hidden!important}' +
          '#sidebar-root{display:none}' +
          '#sb-burger{display:flex!important}' +
          '#sb-close{display:flex!important}' +
          // Desktop-only collapse-to-rail control — without this it renders
          // in the same top-right corner as #sb-close above (X) on mobile,
          // where the sidebar is an open/close overlay, not a collapsible
          // rail, so both were visible at once.
          '.sb-toggle{display:none!important}' +
          '#sidebar-root.mob{display:flex!important;z-index:51}' +
          '.main{margin-left:0!important;max-width:100vw!important;overflow-x:hidden!important}' +
          '.body{padding:14px 12px!important}' +
          '.topbar{padding:0 14px!important;height:auto!important;min-height:56px;gap:6px;flex-wrap:nowrap}' +
        '}' +
        // Card table layout ≤600 px
        '@media(max-width:600px){' +
          '#statsRow,#kpiRow{grid-template-columns:repeat(2,1fr)!important}' +
          '.tbl{max-width:100%!important;overflow-x:hidden!important}' +
          '.tbl thead{display:none!important}' +
          '.tbl,.tbl tbody{display:block!important;background:none!important;border:none!important;border-radius:0!important;width:100%!important}' +
          '.tbl tbody tr{display:block!important;margin-bottom:10px;border-radius:12px;padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}' +
          '.tbl tbody tr.tr-panel{display:table-row!important;background:none!important;border:none!important;border-radius:0!important;padding:0!important;margin:0!important}' +
          '.tbl tbody tr.tr-panel td{display:table-cell!important;width:auto!important;border:none!important;padding:0!important}' +
          '.tbl tbody td{display:flex!important;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:12px!important;gap:10px;width:100%!important;max-width:100%!important;white-space:normal!important;word-break:break-word}' +
          '.tbl tbody td:last-child{border-bottom:none;padding-top:8px;flex-wrap:wrap;justify-content:flex-end}' +
          '.tbl tbody td[data-label]::before{content:attr(data-label);font-family:"JetBrains Mono",monospace;font-size:9px;color:#849495;text-transform:uppercase;letter-spacing:.08em;flex-shrink:0;white-space:nowrap;margin-right:4px}' +
          '.modal-bg{align-items:flex-end!important}' +
          '.modal-bg .modal-card{border-radius:16px 16px 0 0!important;width:100%!important;max-width:100%!important;margin:0!important;max-height:88vh!important;overflow-y:auto!important}' +
          '.btnp,.btng,.btnr,.btny{min-height:44px}' +
          '#ec-toast-wrap{bottom:24px}' +
        '}' +
        // Smooth in-page scrolling + accessible focus states (site-wide)
        'html{scroll-behavior:smooth}' +
        'a:focus-visible,button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:2px solid #00f0ff;outline-offset:2px;border-radius:6px}' +
        '@media(prefers-reduced-motion:reduce){' +
          'html{scroll-behavior:auto}' +
          '*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}' +
        '}';
      document.head.appendChild(s);
    }

    // Slide-over overlay backdrop
    if (!document.getElementById('sb-overlay')) {
      const o = document.createElement('div');
      o.id = 'sb-overlay';
      o.addEventListener('click', () => window.closeSbMobile?.());
      document.body.appendChild(o);
    }

    // Toast container + global showToast
    if (!document.getElementById('ec-toast-wrap')) {
      const tw = document.createElement('div');
      tw.id = 'ec-toast-wrap';
      document.body.appendChild(tw);
    }
    if (!window.showToast) {
      window.showToast = function (type, msg) {
        const wrap = document.getElementById('ec-toast-wrap');
        if (!wrap) return;
        const t = document.createElement('div');
        t.className = 'ec-toast ec-toast-' + (type || 'info');
        const icons = { success: 'check_circle', error: 'error', warn: 'warning', info: 'info' };
        // msg often embeds DB-sourced values (emails, names) from callers
        // across the app — escape so a hostile value can't run script here.
        const safeMsg = (typeof EC_SECURITY !== 'undefined') ? EC_SECURITY.sanitizeHtml(msg) : msg;
        t.innerHTML = '<span class="material-symbols-outlined" style="font-size:15px;flex-shrink:0">' + (icons[type] || 'info') + '</span><span>' + safeMsg + '</span>';
        wrap.appendChild(t);
        setTimeout(() => {
          t.style.cssText += ';opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s';
          setTimeout(() => t.remove(), 320);
        }, 4000);
      };
    }

    // Hamburger button — inserted as first child of .topbar
    const _tb = document.querySelector('.topbar');
    if (_tb && !document.getElementById('sb-burger')) {
      const b = document.createElement('button');
      b.id = 'sb-burger';
      b.setAttribute('aria-label', 'Open navigation');
      b.style.cssText = 'display:none;align-items:center;justify-content:center;min-width:40px;height:40px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:9px;color:#e2e2e8;cursor:pointer;flex-shrink:0;margin-right:8px';
      b.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;font-variation-settings:\'FILL\' 0,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24">menu</span>';
      b.addEventListener('click', () => window.openSbMobile?.());
      _tb.insertBefore(b, _tb.firstChild);
    }

    // Notification bell — inserted once per page, same "leading child of
    // .topbar" technique as the burger button above. Guarded on a real
    // session + dc.js being loaded, so it's a no-op on public pages.
    if (_tb && user && typeof DC_DATA !== 'undefined' && !document.getElementById('sb-notif-btn')) {
      const nb = document.createElement('button');
      nb.id = 'sb-notif-btn';
      nb.setAttribute('aria-label', 'Notifications');
      nb.style.cssText = 'position:relative;display:flex;align-items:center;justify-content:center;min-width:40px;height:40px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:9px;color:#e2e2e8;cursor:pointer;flex-shrink:0;margin-right:8px';
      nb.innerHTML = icon('notifications') +
        '<span id="sb-notif-badge" style="display:none;position:absolute;top:4px;right:4px;min-width:15px;height:15px;padding:0 3px;border-radius:999px;background:#ff6b6b;color:#fff;font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;align-items:center;justify-content:center;line-height:1"></span>';
      nb.addEventListener('click', (e) => { e.stopPropagation(); window.toggleNotifPanel?.(nb); });
      _tb.insertBefore(nb, _tb.firstChild);
      refreshNotifications(user.dbId);
    }

    // Wire close button inside sidebar
    document.getElementById('sb-close')?.addEventListener('click', () => window.closeSbMobile?.());
  };

  // ── Notification bell panel ─────────────────────────────────────────────
  let _notifCache = [];
  let _notifUserId = null;

  async function refreshNotifications(userId) {
    _notifUserId = userId;
    try {
      _notifCache = await DC_DATA.getNotifications(userId);
    } catch (_) {
      _notifCache = [];
    }
    const unread = _notifCache.filter(n => !n.read).length;
    const badge = document.getElementById('sb-notif-badge');
    if (badge) {
      badge.textContent = unread > 9 ? '9+' : String(unread);
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  }

  function notifTimeAgo(dateVal) {
    const mins = Math.floor((Date.now() - new Date(dateVal).getTime()) / 60000);
    if (mins < 1)  return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  const NOTIF_ICON = { application_status: 'description', rental_status: 'local_shipping', credit_check: 'fact_check', maintenance: 'build' };

  function renderNotifPanel(panel) {
    const esc = (typeof EC_SECURITY !== 'undefined') ? EC_SECURITY.sanitizeHtml : (s => s);
    if (!_notifCache.length) {
      panel.innerHTML = '<div style="padding:24px;text-align:center;color:#849495;font-size:12px;font-family:\'JetBrains Mono\',monospace">No notifications yet</div>';
      return;
    }
    panel.innerHTML = _notifCache.map(n => `
      <div class="sb-notif-item" data-id="${n.id}" data-link="${n.linkPath ? esc(n.linkPath) : ''}" style="display:flex;gap:10px;padding:11px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.05);${n.read ? '' : 'background:rgba(0,240,255,.04)'}">
        <span class="material-symbols-outlined" style="font-size:17px;color:${n.read ? '#849495' : '#00f0ff'};flex-shrink:0;margin-top:1px">${NOTIF_ICON[n.type] || 'notifications'}</span>
        <div style="min-width:0;flex:1">
          <div style="font-size:12.5px;font-weight:${n.read ? '500' : '700'};color:${n.read ? '#b9cacb' : '#e2e2e8'}">${esc(n.title)}</div>
          <div style="font-size:11.5px;color:#849495;margin-top:2px;line-height:1.4">${esc(n.body)}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#556;margin-top:4px">${notifTimeAgo(n.createdAt)}</div>
        </div>
      </div>`).join('');
    panel.querySelectorAll('.sb-notif-item').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.id;
        const link = el.dataset.link;
        const n = _notifCache.find(x => x.id === id);
        if (n && !n.read) {
          n.read = true;
          try { await DC_DATA.markNotificationRead(id); } catch (_) { /* best effort */ }
          refreshNotifications(_notifUserId);
        }
        if (link) location.href = link;
        window.closeNotifPanel?.();
      });
    });
  }

  window.toggleNotifPanel = function (trigger) {
    const existing = document.getElementById('sb-notif-panel');
    if (existing) { window.closeNotifPanel(); return; }
    const r = trigger.getBoundingClientRect();
    const panel = document.createElement('div');
    panel.id = 'sb-notif-panel';
    panel.style.cssText = `position:fixed;top:${r.bottom + 6}px;left:${r.left}px;width:320px;max-height:420px;overflow-y:auto;background:rgba(10,12,16,.98);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);border-radius:12px;z-index:9999;box-shadow:0 12px 36px rgba(0,0,0,.5)`;
    document.body.appendChild(panel);
    renderNotifPanel(panel);
    setTimeout(() => document.addEventListener('click', window._notifOutsideClick = (e) => {
      if (!panel.contains(e.target) && e.target !== trigger) window.closeNotifPanel?.();
    }), 0);
  };
  window.closeNotifPanel = function () {
    document.getElementById('sb-notif-panel')?.remove();
    if (window._notifOutsideClick) { document.removeEventListener('click', window._notifOutsideClick); window._notifOutsideClick = null; }
  };

  // ── Custom Select ────────────────────────────────────────────
  window.initCustomSelects = function(root) {
    (root || document).querySelectorAll('select').forEach(sel => {
      if (sel.dataset.csInit) return;
      sel.dataset.csInit = '1';
      sel.style.display = 'none';
      const wrap = document.createElement('div');
      wrap.className = 'cs-wrap';
      sel.parentNode.insertBefore(wrap, sel);
      wrap.appendChild(sel);
      const trigger = document.createElement('div');
      trigger.className = 'cs-trigger';
      const val = document.createElement('span');
      val.className = 'cs-val';
      val.textContent = sel.options[sel.selectedIndex]?.text ?? 'Select…';
      const arrow = document.createElement('span');
      arrow.className = 'material-symbols-outlined cs-arrow';
      arrow.textContent = 'expand_more';
      trigger.append(val, arrow);
      wrap.appendChild(trigger);
      const dd = document.createElement('div');
      dd.className = 'cs-dropdown';
      const buildOpts = () => {
        dd.innerHTML = '';
        Array.from(sel.options).forEach(opt => {
          const o = document.createElement('div');
          o.className = 'cs-opt' + (opt.selected ? ' cs-sel' : '');
          o.dataset.value = opt.value;
          o.textContent = opt.text;
          o.addEventListener('mousedown', e => {
            e.preventDefault(); e.stopPropagation();
            sel.value = opt.value;
            sel.dispatchEvent(new Event('change', {bubbles:true}));
            val.textContent = opt.text;
            dd.querySelectorAll('.cs-opt').forEach(x => x.classList.toggle('cs-sel', x === o));
            closeWrap();
          });
          dd.appendChild(o);
        });
      };
      buildOpts();
      wrap._refresh = () => {
        val.textContent = sel.options[sel.selectedIndex]?.text ?? 'Select…';
        dd.querySelectorAll('.cs-opt').forEach(o => o.classList.toggle('cs-sel', o.dataset.value === sel.value));
      };
      let _open = false;
      const openWrap = () => {
        if (_open) return; _open = true;
        const r = trigger.getBoundingClientRect();
        dd.style.cssText = `position:fixed;width:${r.width}px;top:${r.bottom+4}px;left:${r.left}px;z-index:99999`;
        dd.classList.add('cs-anim');
        document.body.appendChild(dd);
        wrap.classList.add('cs-open');
        requestAnimationFrame(() => {
          const dr = dd.getBoundingClientRect();
          if (dr.bottom > window.innerHeight - 8) dd.style.top = (r.top - dr.height - 4) + 'px';
        });
      };
      const closeWrap = () => {
        if (!_open) return; _open = false;
        wrap.classList.remove('cs-open');
        if (dd.parentNode === document.body) document.body.removeChild(dd);
      };
      wrap._closeIt = closeWrap;
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        if (_open) { closeWrap(); } else {
          document.querySelectorAll('.cs-wrap.cs-open').forEach(w => w._closeIt?.());
          openWrap();
        }
      });
    });
    if (!window._csGlobal) {
      window._csGlobal = true;
      document.addEventListener('click', () => document.querySelectorAll('.cs-wrap.cs-open').forEach(w => w._closeIt?.()));
    }
  };

  window.refreshCS = id => {
    const sel = document.getElementById(id);
    sel?.closest('.cs-wrap')?._refresh?.();
  };

  document.addEventListener('DOMContentLoaded', () => window.initCustomSelects?.());

  // ── Collapsible sidebar (desktop) ───────────────────────────────
  // body.sb-collapsed is the single source of truth; theme.css reacts to it.
  window.applySidebarCollapseState = function () {
    document.body.classList.toggle('sb-collapsed', localStorage.getItem('ec_sb_collapsed') === '1');
  };
  window.toggleSidebarCollapse = function () {
    const collapsed = document.body.classList.toggle('sb-collapsed');
    localStorage.setItem('ec_sb_collapsed', collapsed ? '1' : '0');
  };
  applySidebarCollapseState();

  window.openSbMobile = function () {
    document.getElementById('sidebar-root').classList.add('mob');
    const o = document.getElementById('sb-overlay');
    if (o) o.classList.add('on');
  };
  window.closeSbMobile = function () {
    document.getElementById('sidebar-root').classList.remove('mob');
    const o = document.getElementById('sb-overlay');
    if (o) o.classList.remove('on');
  };
})();
