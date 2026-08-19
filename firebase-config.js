'use strict';

// Firebase project configuration.
// This file is gitignored — copy firebase-config.template.js and fill in your values.
// The web API key is NOT a secret: https://firebase.google.com/docs/projects/api-keys
// Security is enforced by Firebase Security Rules and Data Connect auth levels.

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyAmwmrTd6YNGT7TH0oLx6_IBKzuB9-vRss',
  // The custom domain, not the default *.firebaseapp.com one — Firebase
  // Hosting auto-provisions the /__/auth/** handler routes for any
  // connected custom domain, so this works without extra setup, and it's
  // what the Google OAuth handshake shows in the address bar. Requires
  // https://logisticsandconstructionrentals.com/__/auth/handler to be in
  // the OAuth client's authorized redirect URIs (Google Cloud Console —
  // separate from Firebase's own authorized-domains list) or Google
  // rejects it with redirect_uri_mismatch.
  authDomain:        'logisticsandconstructionrentals.com',
  projectId:         'novara-f985b',
  storageBucket:     'novara-f985b.firebasestorage.app',
  messagingSenderId: '374657345644',
  appId:             '1:374657345644:web:d09276d39f04792527d049',
  measurementId:     'G-3M0DSPKH3M',
  // TEMPORARILY BLANKED: GitHub's push protection flagged the previous
  // value here as a "Mapbox Secret Access Token" (not a public one, despite
  // its pk. prefix) — check this token's actual scopes in the Mapbox
  // dashboard (https://account.mapbox.com/access-tokens/) before restoring
  // it. If it genuinely has secret-level scopes, rotate it and generate a
  // real public-only token instead. Maps that depend on this (dashboard-admin
  // etc.) won't render until it's set again.
  mapboxToken:       '',
  // Cloudflare Turnstile site key (free) — get one at
  // dash.cloudflare.com/turnstile. Leave blank to leave the public forms'
  // bot-check widget disabled (they still work, just without it).
  turnstileSiteKey:  '',
};
