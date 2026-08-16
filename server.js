'use strict';
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Allowed CORS origins — extend via CORS_ORIGINS env var (comma-separated)
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:5000',
  'https://novara-f985b.web.app',
  'https://novara-f985b.firebaseapp.com',
  'https://logisticsandconstructionrentals.com',
  'https://www.logisticsandconstructionrentals.com',
  ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map(s => s.trim()) : []),
]);

// ── In-memory IP rate limiter ──────────────────────────────────────────────
const RATE_WINDOW_MS = 60 * 1000;  // 1 minute
const RATE_MAX_REQ   = 200;        // per IP per window (generous for static assets)
const ipRateMap = new Map();

function isIpRateLimited(ip) {
  const now    = Date.now();
  const record = ipRateMap.get(ip) || { calls: [], blocked: false };
  record.calls  = record.calls.filter(t => now - t < RATE_WINDOW_MS);
  record.calls.push(now);
  ipRateMap.set(ip, record);
  return record.calls.length > RATE_MAX_REQ;
}

// Prune the rate map every 5 minutes to prevent unbounded growth
setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, record] of ipRateMap) {
    if (!record.calls.some(t => t > cutoff)) ipRateMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ── Security headers sent on every response ────────────────────────────────
const SECURITY_HEADERS = {
  // Prevent clickjacking
  'X-Frame-Options'           : 'SAMEORIGIN',
  // Prevent MIME-type sniffing
  'X-Content-Type-Options'    : 'nosniff',
  // XSS filter (legacy browsers)
  'X-XSS-Protection'          : '1; mode=block',
  // Restrict referrer information
  'Referrer-Policy'           : 'strict-origin-when-cross-origin',
  // Disable unnecessary browser features
  'Permissions-Policy'        : 'geolocation=(), microphone=(), camera=(), payment=()',
  // Force HTTPS for 1 year (only effective when served over HTTPS)
  'Strict-Transport-Security' : 'max-age=31536000; includeSubDomains',
  // Content Security Policy
  // unsafe-inline is required because the app uses extensive inline styles and
  // onclick handlers. Refactoring to nonce-based CSP is tracked as a future task.
  'Content-Security-Policy'   : [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://api.mapbox.com https://www.gstatic.com https://apis.google.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://api.mapbox.com",
    "font-src 'self' https://fonts.gstatic.com https://api.mapbox.com",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com https://storage.googleapis.com https://firebasestorage.googleapis.com https://unpkg.com https://*.mapbox.com https://*.basemaps.cartocdn.com",
    "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebasedataconnect.googleapis.com https://apis.google.com https://unpkg.com https://api.mapbox.com https://events.mapbox.com https://*.tiles.mapbox.com https://challenges.cloudflare.com",
    "frame-src https://logisticsandconstructionrentals.com https://accounts.google.com https://challenges.cloudflare.com",
    "worker-src blob:",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join('; '),
  // Remove server fingerprint
  'Server'                    : 'EquipCore',
};

// ── MIME types ─────────────────────────────────────────────────────────────
const MIME = {
  '.html' : 'text/html; charset=utf-8',
  '.js'   : 'text/javascript; charset=utf-8',
  '.css'  : 'text/css; charset=utf-8',
  '.json' : 'application/json; charset=utf-8',
  '.png'  : 'image/png',
  '.jpg'  : 'image/jpeg',
  '.jpeg' : 'image/jpeg',
  '.gif'  : 'image/gif',
  '.svg'  : 'image/svg+xml',
  '.ico'  : 'image/x-icon',
  '.webp' : 'image/webp',
  '.woff2': 'font/woff2',
  '.woff' : 'font/woff',
};

// ── Path traversal guard ───────────────────────────────────────────────────
const ROOT = path.resolve('.');

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const resolved = path.resolve(ROOT, '.' + decoded);
  // Reject any path that escapes the root
  if (!resolved.startsWith(ROOT + path.sep) && resolved !== ROOT) return null;
  return resolved;
}

// ── Request handler ────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const ip     = req.socket.remoteAddress || 'unknown';
  const origin = req.headers['origin'];

  // ── IP rate limiting ──
  if (isIpRateLimited(ip)) {
    res.writeHead(429, { 'Content-Type': 'text/plain', 'Retry-After': '60', ...SECURITY_HEADERS });
    res.end('Too Many Requests');
    return;
  }

  // ── CORS ──
  if (origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin',  origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Vary', 'Origin');
    } else {
      // Unknown origin — deny preflight, allow GET (static files are public)
      // but do not echo the origin back in ACAO header
      if (req.method === 'OPTIONS') {
        res.writeHead(403, SECURITY_HEADERS);
        res.end();
        return;
      }
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, SECURITY_HEADERS);
    res.end();
    return;
  }

  // Only serve GET requests
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Allow': 'GET', ...SECURITY_HEADERS });
    res.end('Method Not Allowed');
    return;
  }

  const urlPath = req.url.split('?')[0];

  // Root serves index.html directly — never redirected, so this can't loop
  // with the ".html" redirect rule below.
  if (urlPath === '/' || urlPath === '') {
    serveFirstExisting(['/index.html'], 0);
    return;
  }

  // ── Clean URLs (mirrors Firebase Hosting's "cleanUrls" setting) ──────────
  // Requests for an extensionless path (e.g. /dashboard-admin) are served
  // from the matching .html file without a redirect. Requests that still
  // carry ".html" (e.g. /dashboard-admin.html) are 301-redirected to the
  // extensionless URL so local dev matches production exactly.
  if (/\.html$/i.test(urlPath)) {
    const clean = urlPath.toLowerCase() === '/index.html' ? '/' : urlPath.slice(0, -'.html'.length);
    res.writeHead(301, { Location: clean, ...SECURITY_HEADERS });
    res.end();
    return;
  }

  const hasExt = path.extname(urlPath) !== '';
  const candidatePaths = hasExt ? [urlPath] : [urlPath + '.html'];

  serveFirstExisting(candidatePaths, 0);

  function serveFirstExisting(paths, i) {
    if (i >= paths.length) {
      res.writeHead(302, { Location: '/', ...SECURITY_HEADERS });
      res.end();
      return;
    }

    const filePath = safePath(paths[i]);
    if (!filePath) {
      res.writeHead(400, SECURITY_HEADERS);
      res.end('Bad Request');
      return;
    }

    const ext  = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') return serveFirstExisting(paths, i + 1);
        res.writeHead(500, SECURITY_HEADERS);
        res.end('Internal Server Error');
        return;
      }

      const headers = {
        'Content-Type'  : type,
        'Cache-Control' : ext === '.html' ? 'no-store' : 'public, max-age=3600',
        ...SECURITY_HEADERS,
      };
      res.writeHead(200, headers);
      res.end(content);
    });
  }
});

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║                                          ║
║   ⚡  EquipCore  running                 ║
║                                          ║
║   http://localhost:${PORT}                  ║
║                                          ║
║   Press Ctrl+C to stop                   ║
║                                          ║
╚══════════════════════════════════════════╝
  `);
  const { execFile } = require('child_process');
  const url = `http://localhost:${PORT}`;
  execFile('open', ['-a', 'Google Chrome', url], err => {
    if (err) execFile('open', [url], () => {});
  });
});
