'use strict';
// TOTP (2FA) — required for every admin AND every org-affiliated user
// (anyone with req.user.orgId set), re-verified on every fresh sign-in
// rather than on a grace-period timer — see status() below. Every handler
// here operates ONLY on the caller's own row (resolved from their verified
// email, never a client-supplied target) except disableForUser, which is
// an explicit admin-to-another-user recovery action.

const totp = require('../services/totp');
const { runQuery, runMutation } = require('../services/dataConnect');
const { logEvent } = require('../services/auditLog');

function isOrgMemberOrAdmin(user) {
  return user.role === 'admin' || !!user.orgId;
}

async function getOwnTotpRow(email) {
  const data = await runQuery('GetUserTotpByEmail', { email });
  return (data.users && data.users[0]) || null;
}

// GET /api/auth/totp/status
exports.status = async (req, res) => {
  if (!isOrgMemberOrAdmin(req.user)) {
    return res.status(200).json({ required: false, needsEnrollment: false, needsChallenge: false });
  }
  const row = await getOwnTotpRow(req.user.email);
  if (!row) return res.status(404).json({ error: 'Account not found' });

  if (!row.totpEnabled) {
    return res.status(200).json({ required: true, needsEnrollment: true, needsChallenge: false });
  }
  // Challenge required on every fresh sign-in — this endpoint is only ever
  // called from the login flow (see auth.js's checkTotpRequired), never
  // from ongoing-session validation, so "always true once enrolled" is
  // exactly "once per new session, cleared again by the next logout."
  res.status(200).json({ required: true, needsEnrollment: false, needsChallenge: true });
};

// POST /api/auth/totp/enroll/start
exports.enrollStart = async (req, res) => {
  if (!isOrgMemberOrAdmin(req.user)) return res.status(403).json({ error: 'Forbidden' });

  const row = await getOwnTotpRow(req.user.email);
  if (!row) return res.status(404).json({ error: 'Account not found' });
  if (row.totpEnabled) return res.status(400).json({ error: 'Two-factor auth is already enabled' });

  const secret = totp.generateSecret();
  await runMutation('SetUserTotpPending', { id: row.id, totpSecretEnc: totp.encrypt(secret) });
  const qrCodeDataUrl = await totp.qrCodeDataUrl(secret, req.user.email);
  await logEvent(req, 'TOTP_ENROLL_STARTED', {});
  res.status(200).json({ qrCodeDataUrl, secret });
};

// POST /api/auth/totp/enroll/confirm  { code }
exports.enrollConfirm = async (req, res) => {
  if (!isOrgMemberOrAdmin(req.user)) return res.status(403).json({ error: 'Forbidden' });

  const code = String((req.body && req.body.code) || '');
  const row = await getOwnTotpRow(req.user.email);
  if (!row || !row.totpSecretEnc) {
    return res.status(400).json({ error: 'No enrollment in progress. Start enrollment first.' });
  }

  const secret = totp.decrypt(row.totpSecretEnc);
  if (!totp.verifyToken(secret, code)) {
    await logEvent(req, 'TOTP_ENROLL_FAILED', {});
    return res.status(400).json({ error: 'Invalid code. Please try again.' });
  }

  const backupCodes = totp.generateBackupCodes();
  const backupCodesEnc = totp.encrypt(JSON.stringify(totp.hashBackupCodes(backupCodes)));
  await runMutation('ConfirmUserTotpEnrollment', { id: row.id, totpBackupCodesEnc: backupCodesEnc });
  await logEvent(req, 'TOTP_ENROLLED', {});
  res.status(200).json({ success: true, backupCodes });
};

// POST /api/auth/totp/challenge  { code }
exports.challenge = async (req, res) => {
  if (!isOrgMemberOrAdmin(req.user)) return res.status(403).json({ error: 'Forbidden' });

  const code = String((req.body && req.body.code) || '').trim();
  const row = await getOwnTotpRow(req.user.email);
  if (!row || !row.totpEnabled || !row.totpSecretEnc) {
    return res.status(400).json({ error: 'Two-factor auth is not enabled for this account' });
  }

  const secret = totp.decrypt(row.totpSecretEnc);
  if (totp.verifyToken(secret, code)) {
    await runMutation('RecordTotpVerification', { id: row.id });
    await logEvent(req, 'TOTP_VERIFIED', {});
    return res.status(200).json({ success: true });
  }

  // Not a valid 6-digit code — try it as a one-time backup code.
  if (row.totpBackupCodesEnc) {
    const hashList = JSON.parse(totp.decrypt(row.totpBackupCodesEnc));
    const remaining = totp.verifyAndConsumeBackupCode(code, hashList);
    if (remaining) {
      await runMutation('UpdateUserTotpBackupCodes', { id: row.id, totpBackupCodesEnc: totp.encrypt(JSON.stringify(remaining)) });
      await runMutation('RecordTotpVerification', { id: row.id });
      await logEvent(req, 'TOTP_BACKUP_CODE_USED', { remaining: remaining.length });
      return res.status(200).json({ success: true, backupCodeUsed: true, remainingBackupCodes: remaining.length });
    }
  }

  await logEvent(req, 'TOTP_CHALLENGE_FAILED', {});
  res.status(401).json({ error: 'Invalid code' });
};

// POST /api/auth/totp/self-recovery-disable
// Self-service recovery for an admin or org member who's lost BOTH their
// authenticator device and their backup codes — the only other path
// (disableForUser) needs an admin to exist and be reachable. This substitutes proof
// of email ownership for that second admin: the client only reaches this
// endpoint after firebase.auth().confirmPasswordReset() succeeded against
// an oobCode Firebase emailed to the account's own verified address (see
// totp-recovery.html) and then signed back in with the new password, so
// req.user.authTime here reflects that brand-new sign-in — not a
// pre-existing token an attacker who merely stole a session might hold.
// Requiring it to be within the last 5 minutes ties this action to that
// specific recovery sign-in, not just any still-valid token.
const SELF_RECOVERY_MAX_AGE_S = 5 * 60;
exports.selfRecoveryDisable = async (req, res) => {
  if (!isOrgMemberOrAdmin(req.user)) return res.status(403).json({ error: 'Forbidden' });

  const ageS = Math.floor(Date.now() / 1000) - req.user.authTime;
  if (!req.user.authTime || ageS > SELF_RECOVERY_MAX_AGE_S || ageS < 0) {
    await logEvent(req, 'TOTP_SELF_RECOVERY_DENIED_STALE_AUTH', { ageS });
    return res.status(401).json({ error: 'Please sign in again to complete recovery.' });
  }

  const row = await getOwnTotpRow(req.user.email);
  if (!row) return res.status(404).json({ error: 'Account not found' });
  if (!row.totpEnabled) return res.status(400).json({ error: 'Two-factor auth is not enabled' });

  await runMutation('DisableUserTotp', { id: row.id });
  // Loud on purpose — this is the one self-service path that removes a
  // security control on an admin account without a second admin's
  // involvement; it needs to be conspicuous in the audit log, not folded
  // into a generic event name another admin might skim past.
  await logEvent(req, 'TOTP_SELF_RECOVERY_DISABLED', { email: req.user.email });
  res.status(200).json({ success: true });
};

// POST /api/auth/totp/disable-for-user  { email }
// Admin-assisted recovery for any locked-out user (admin or org member)
// with no backup codes left. Requires requireAdmin (see routes/totpRoutes.js) —
// the CALLER must already be an admin, same bootstrapping precedent as
// every other cross-account admin action in this app.
exports.disableForUser = async (req, res) => {
  const targetEmail = String((req.body && req.body.email) || '').trim();
  if (!targetEmail) return res.status(400).json({ error: 'email is required' });

  const row = await getOwnTotpRow(targetEmail);
  if (!row) return res.status(404).json({ error: 'Account not found' });

  await runMutation('DisableUserTotp', { id: row.id });
  await logEvent(req, 'TOTP_DISABLED_BY_ADMIN', { targetEmail });
  res.status(200).json({ success: true });
};
