'use strict';
// Cloudflare Turnstile server-side verification for the app's anonymous
// public-submission forms (contact, rental application). Verification is
// enabled only once TURNSTILE_SECRET_KEY is actually configured (see
// functions/index.js's secrets binding) — until then this is a no-op so
// deploys don't break the forms before the account-level Turnstile setup
// (creating a site + getting keys at dash.cloudflare.com/turnstile, which
// only a human with dashboard access can do) has happened.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

let _warnedMissing = false;

async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (!_warnedMissing) {
      console.warn('[turnstile] TURNSTILE_SECRET_KEY not configured — public-form bot verification is disabled.');
      _warnedMissing = true;
    }
    return true;
  }
  if (typeof token !== 'string' || !token) return false;

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: remoteIp || '' }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error('[turnstile] verification request failed:', err.message);
    return false;
  }
}

module.exports = { verifyTurnstile };
