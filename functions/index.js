'use strict';
// EquipCore Auth API — Firebase Cloud Function
//
// Deployed behind the hosting rewrite in firebase.json ("/api/**" -> this
// function), so it's reachable at a same-origin, realistic URL — e.g.
// https://logisticsandconstructionrentals.com/api/auth/me — instead of a
// raw *.cloudfunctions.net URL or a localhost port.
//
// Verifies Firebase Auth ID tokens (admin.auth().verifyIdToken), which
// Firebase itself issues and expires (~1hr) — there is no self-managed
// secret here, and no localhost default: in production this only runs
// where Firebase Hosting routes it.

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// No credential argument needed — Cloud Functions supplies the runtime
// service account automatically.
admin.initializeApp();

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const totpRoutes = require('./routes/totpRoutes');
const { rateLimiter } = require('./middlewares/rateLimiter');

const ALLOWED_ORIGINS = new Set([
  'https://novara-f985b.web.app',
  'https://novara-f985b.firebaseapp.com',
  'https://logisticsandconstructionrentals.com',
  'https://www.logisticsandconstructionrentals.com',
]);

const app = express();

// Cloud Functions always sits behind Firebase Hosting's proxy — without
// this, req.ip (used by rateLimiter and auditLog) would resolve to the
// proxy's address for every caller instead of the real client IP.
app.set('trust proxy', true);

app.use(helmet());
app.use(cors({
  origin(origin, cb) {
    if (!origin || ALLOWED_ORIGINS.has(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(rateLimiter);

// Mounted at /api/auth, /api/auth/totp, and /api/data to match the full
// paths Firebase Hosting forwards.
app.use('/api/auth', authRoutes);
app.use('/api/auth/totp', totpRoutes);
app.use('/api/data', dataRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  // err.status set means this is a deliberately-thrown, client-facing
  // validation/auth error (see authController.js) — safe to pass through.
  // Anything else is unexpected (e.g. a raw Admin SDK/GCP error) and could
  // contain internal details, so the client only gets a generic message;
  // the real one is already logged above.
  const status = err.status || 500;
  res.status(status).json({ error: status < 500 ? err.message : 'Server error' });
});

// TOTP_ENCRYPTION_KEY is a Secret Manager secret (see services/totp.js) —
// binding it here injects it as process.env.TOTP_ENCRYPTION_KEY at
// runtime, never checked into source.
exports.api = functions.https.onRequest({ secrets: ['TOTP_ENCRYPTION_KEY'] }, app);
