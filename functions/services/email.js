'use strict';
// Outbound email — approval notifications, invoice PDFs. Same no-op-until-
// configured shape as services/turnstile.js: until SMTP settings are bound
// as Secret Manager secrets (see functions/index.js's `secrets: [...]`
// array), this logs once and skips sending rather than failing the caller.
// That means the approval flow, credit-check flow etc. all work today
// without SMTP configured — email is a bonus side effect, never a
// requirement for the underlying action to succeed.

const nodemailer = require('nodemailer');

let _warnedMissing = false;
let _transporter = null;

function smtpConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return _transporter;
}

// Returns true if actually sent, false if skipped (SMTP not configured) or
// failed (logged server-side, never thrown — a failed email must never fail
// the action that triggered it, e.g. an application approval).
async function sendMail({ to, subject, text, html, attachments }) {
  if (!smtpConfigured()) {
    if (!_warnedMissing) {
      console.warn('[email] SMTP_HOST/SMTP_USER/SMTP_PASS not configured — outbound email is disabled.');
      _warnedMissing = true;
    }
    return false;
  }
  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to, subject, text, html, attachments,
    });
    return true;
  } catch (err) {
    console.error('[email] sendMail failed:', err.message);
    return false;
  }
}

module.exports = { sendMail, smtpConfigured };
