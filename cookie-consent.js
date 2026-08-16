'use strict';
// EquipCore — Cookie Consent Banner
// Include on all pages. Reads EC_SECURITY.hasConsent() to avoid re-showing.

(function () {
  // Only show if user hasn't consented or declined yet
  if (typeof EC_SECURITY !== 'undefined' && (EC_SECURITY.hasConsent() || EC_SECURITY.hasDeclined())) return;

  function inject() {
    if (document.getElementById('ec-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'ec-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:99999',
      'background:rgba(8,10,14,0.97)', 'backdrop-filter:blur(24px)',
      'border-top:1px solid rgba(0,240,255,0.15)',
      'padding:16px 24px', 'display:flex', 'align-items:center',
      'justify-content:space-between', 'flex-wrap:wrap', 'gap:12px',
      'font-family:Inter,sans-serif', 'font-size:13px', 'color:#b9cacb',
    ].join(';');

    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:260px">
        <span style="font-size:20px;flex-shrink:0">🍪</span>
        <span>
          We use essential cookies to keep you signed in and remember your preferences.
          No tracking or advertising cookies are used without your consent.
          <a href="privacy" style="color:#00f0ff;text-decoration:none;white-space:nowrap">Privacy Policy →</a>
        </span>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button id="ec-cookie-decline" style="padding:8px 16px;background:rgba(255,255,255,0.05);color:#849495;border:1px solid rgba(255,255,255,0.09);border-radius:8px;font-family:Inter,sans-serif;font-size:12px;cursor:pointer;font-weight:600">
          Decline
        </button>
        <button id="ec-cookie-accept" style="padding:8px 16px;background:#00f0ff;color:#003a3c;border:none;border-radius:8px;font-family:Hanken Grotesk,Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 0 16px rgba(0,240,255,0.2)">
          Accept
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    // Fixed-to-bottom banner would otherwise sit directly on top of
    // whatever's at the bottom of the page underneath it (on login.html /
    // signup.html specifically, that's the "Continue with Google" button —
    // its click was landing on this banner instead, since a higher
    // z-index element always wins the hit-test regardless of visual
    // transparency). Reserving real space for the banner's own height
    // means nothing ever renders underneath it in the first place.
    const _prevPaddingBottom = document.body.style.paddingBottom;
    requestAnimationFrame(() => {
      document.body.style.paddingBottom = banner.offsetHeight + 'px';
    });

    function dismiss(accepted) {
      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.recordConsent(accepted);
      else localStorage.setItem('ec_cookie_consent', accepted ? 'accepted' : 'declined');
      banner.style.transition = 'opacity 0.3s';
      banner.style.opacity = '0';
      document.body.style.paddingBottom = _prevPaddingBottom;
      setTimeout(() => banner.remove(), 350);
    }

    document.getElementById('ec-cookie-accept').addEventListener('click', () => dismiss(true));
    document.getElementById('ec-cookie-decline').addEventListener('click', () => dismiss(false));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
