'use strict';
// TOTP (authenticator-app) two-factor auth — required for admin accounts,
// "occasional" beyond initial enrollment (see controllers/totpController.js
// for the re-challenge window). Not Firebase's built-in phone/SMS MFA —
// that requires upgrading the project to Identity Platform, a plan change
// this module deliberately avoids depending on.
//
// The TOTP secret and backup codes are encrypted at rest (AES-256-GCM)
// with a key that lives only in Secret Manager (TOTP_ENCRYPTION_KEY, bound
// to this function in index.js) — never in source, never in the database
// in plaintext. See dataconnect/schema/schema.gql's totpSecretEnc comment:
// no client-reachable operation can ever read these columns regardless.

const crypto = require('crypto');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');

const ALGO = 'aes-256-gcm';

function getKey() {
  const raw = process.env.TOTP_ENCRYPTION_KEY;
  if (!raw) throw new Error('TOTP_ENCRYPTION_KEY is not configured');
  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) throw new Error('TOTP_ENCRYPTION_KEY must decode to exactly 32 bytes');
  return key;
}

function encrypt(plaintext) {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString('base64');
}

function decrypt(encoded) {
  const key = getKey();
  const buf = Buffer.from(encoded, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const ciphertext = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

function generateSecret() {
  return authenticator.generateSecret();
}

async function qrCodeDataUrl(secret, email) {
  const otpauth = authenticator.keyuri(email, 'EquipCore', secret);
  return QRCode.toDataURL(otpauth);
}

function verifyToken(secret, token) {
  const clean = String(token || '').replace(/\s/g, '');
  if (!/^\d{6}$/.test(clean)) return false;
  try {
    return authenticator.verify({ token: clean, secret });
  } catch {
    return false;
  }
}

function generateBackupCodes(count = 8) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const hex = crypto.randomBytes(5).toString('hex').toUpperCase(); // 10 hex chars, ~40 bits/code
    codes.push(hex.slice(0, 5) + '-' + hex.slice(5, 10));
  }
  return codes;
}

function hashBackupCodes(codes) {
  // Backup codes are server-generated random tokens (not user-chosen, so
  // already high-entropy) — a plain SHA-256 per code is sufficient, no
  // per-code salt needed the way a user password would require.
  return codes.map((c) => crypto.createHash('sha256').update(c.toUpperCase()).digest('hex'));
}

// Returns the remaining hash list with the matched code removed (so it
// can't be reused), or null if the code didn't match any stored hash.
function verifyAndConsumeBackupCode(code, hashList) {
  const hash = crypto.createHash('sha256').update(String(code || '').toUpperCase().trim()).digest('hex');
  const idx = hashList.indexOf(hash);
  if (idx === -1) return null;
  const remaining = hashList.slice();
  remaining.splice(idx, 1);
  return remaining;
}

module.exports = {
  encrypt,
  decrypt,
  generateSecret,
  qrCodeDataUrl,
  verifyToken,
  generateBackupCodes,
  hashBackupCodes,
  verifyAndConsumeBackupCode,
};
