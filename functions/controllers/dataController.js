'use strict';

const REGISTRY = require('../registry/dataOperations');
const { runQuery, runMutation } = require('../services/dataConnect');
const { logEvent } = require('../services/auditLog');
const { SCHEMAS, PUBLIC_SCHEMAS } = require('../validation/dataSchemas');
const { verifyTurnstile } = require('../services/turnstile');

async function resolveOwnUserId(email) {
  const data = await runQuery('GetUserByEmail', { email });
  const row = data.users && data.users[0];
  return row ? row.id : null;
}

// Generic proxy for every registered admin/self-service Data Connect
// operation. The Data Connect connector itself refuses these to every
// client (@auth(level: NO_ACCESS)) — this handler, not the GraphQL layer,
// is what decides who may call what (see registry/dataOperations.js).
exports.execute = async (req, res) => {
  const { operationName, variables } = req.body || {};
  const op = typeof operationName === 'string' ? REGISTRY[operationName] : null;
  if (!op) {
    return res.status(404).json({ error: 'Unknown operation' });
  }

  const schema = SCHEMAS[operationName];
  const parsed = schema ? schema.safeParse(variables || {}) : { success: true, data: variables || {} };
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) });
  }

  const role = req.user.role;
  const effectiveVariables = { ...parsed.data };
  let authorized = op.roles.includes(role);

  if (!authorized && op.ownField) {
    const targetId = effectiveVariables[op.ownField];
    if (targetId) {
      try {
        const ownId = await resolveOwnUserId(req.user.email);
        authorized = !!ownId && ownId === targetId;
      } catch {
        authorized = false;
      }
    }
  }

  if (!authorized && op.orgRoles && op.orgRoles.includes(role)) {
    // The client's requested org is irrelevant here — always overridden
    // with the caller's own orgId claim, so this can't be used to read
    // another organisation's data regardless of what was sent.
    if (req.user.orgId) {
      effectiveVariables[op.orgField] = req.user.orgId;
      authorized = true;
    }
  }

  if (!authorized) {
    await logEvent(req, 'DATA_ACCESS_DENIED', { operationName });
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const data = op.kind === 'query'
      ? await runQuery(operationName, effectiveVariables)
      : await runMutation(operationName, effectiveVariables);
    if (op.kind === 'mutation') {
      await logEvent(req, 'DATA_MUTATION', { operationName });
    }
    res.status(200).json({ data });
  } catch (err) {
    console.error('[dataController] execute', operationName, err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};

// Self-registration — called once, right after Firebase Auth signup,
// before any database row exists for the new account yet. Deliberately
// NOT in the generic registry above: role and organisationId are
// hardcoded here, never taken from the client, so this can never be used
// to self-grant anything beyond a bare USER account with no organisation.
// (Mirrors the "no self-granted role" rule authController.js's setRole
// already enforces for Firebase custom claims.)
exports.registerSelf = async (req, res) => {
  const name = String((req.body && req.body.name) || '').trim().slice(0, 200);
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    await runMutation('CreateUser', {
      name,
      email: req.user.email,
      role: 'USER',
      organisationId: null,
      avatarUrl: null,
    });
    const data = await runQuery('GetUserByEmail', { email: req.user.email });
    await logEvent(req, 'SELF_REGISTER_DB_ROW', {});
    res.status(200).json({ user: (data.users && data.users[0]) || null });
  } catch (err) {
    console.error('[dataController] registerSelf', err.message);
    res.status(500).json({ error: 'Unable to complete registration' });
  }
};

// Anonymous-submission forms (org registration, rental application,
// waitlist join, contact inquiry) — deliberately reachable without signing
// in, so there is no req.user and no role/ownership check here at all.
// Server-side schema validation (PUBLIC_SCHEMAS) is the only gate between
// hostile input and the database for these; rate limiting is applied at
// the route level (see routes/dataRoutes.js).
exports.submitPublic = async (req, res) => {
  const { operationName, variables, turnstileToken } = req.body || {};
  const schema = typeof operationName === 'string' ? PUBLIC_SCHEMAS[operationName] : null;
  if (!schema) {
    return res.status(404).json({ error: 'Unknown operation' });
  }

  // No-op until TURNSTILE_SECRET_KEY is configured (see services/turnstile.js)
  // — kept outside the zod schema since turnstileToken isn't a data field.
  const humanVerified = await verifyTurnstile(turnstileToken, req.ip);
  if (!humanVerified) {
    await logEvent(req, 'BOT_CHECK_FAILED', { operationName });
    return res.status(400).json({ error: 'Verification failed. Please try again.' });
  }

  const parsed = schema.safeParse(variables || {});
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) });
  }

  try {
    const data = await runMutation(operationName, parsed.data);
    await logEvent(req, 'PUBLIC_SUBMIT', { operationName });
    res.status(200).json({ data });
  } catch (err) {
    console.error('[dataController] submitPublic', operationName, err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};

// Looked up by email (not the generic registry, since the authorization
// rule here — "your own email, or any email if you're an admin" — doesn't
// fit the flat role/ownField shape used for everything else).
exports.getUserByEmail = async (req, res) => {
  const email = (req.query && req.query.email) || '';
  if (!email) return res.status(400).json({ error: 'email is required' });
  if (req.user.role !== 'admin' && email.toLowerCase() !== (req.user.email || '').toLowerCase()) {
    await logEvent(req, 'DATA_ACCESS_DENIED', { operationName: 'GetUserByEmail' });
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const data = await runQuery('GetUserByEmail', { email });
    res.status(200).json({ user: (data.users && data.users[0]) || null });
  } catch (err) {
    console.error('[dataController] getUserByEmail', err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};
