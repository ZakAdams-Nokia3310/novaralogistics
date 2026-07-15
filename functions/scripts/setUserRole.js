'use strict';
// Assigns role/org custom claims to an EXISTING Firebase Auth user, looked
// up by email. No account data is stored in this file — the user must
// already exist (created via real self-signup at /signup, or manually in
// the Firebase console). This is the tool for the one-time bootstrap of
// the first admin, before any admin exists to use the in-app admin panel
// (which calls the same /api/auth/set-role endpoint for everyone after).
//
// Usage:
//   GCLOUD_PROJECT=novara-f985b node functions/scripts/setUserRole.js \
//     --email you@example.com --role admin [--org "Org Name"] [--orgId "..."]
//
// Against the emulator instead of live, also set:
//   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099

const admin = require('firebase-admin');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '');
    out[key] = argv[i + 1];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const VALID_ROLES = ['admin', 'user', 'driver', 'guest'];

if (!args.email || !args.role) {
  console.error('Usage: node setUserRole.js --email <email> --role <admin|user|driver|guest> [--org <name>] [--orgId <id>]');
  process.exit(1);
}
if (!VALID_ROLES.includes(args.role)) {
  console.error(`Invalid role "${args.role}". Must be one of: ${VALID_ROLES.join(', ')}`);
  process.exit(1);
}

if (!process.env.FIREBASE_AUTH_EMULATOR_HOST && process.env.ALLOW_LIVE_SEED !== '1') {
  console.error(
    'Refusing to run against the live project without ALLOW_LIVE_SEED=1.\n' +
    'Run against the emulator by setting FIREBASE_AUTH_EMULATOR_HOST, or set\n' +
    'ALLOW_LIVE_SEED=1 explicitly if you really mean to modify the live project.'
  );
  process.exit(1);
}

admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'novara-f985b' });

async function run() {
  const user = await admin.auth().getUserByEmail(args.email);
  await admin.auth().setCustomUserClaims(user.uid, {
    role: args.role,
    org: args.org || null,
    orgId: args.orgId || null,
  });
  console.log(`Set ${args.email} (${user.uid}) -> role=${args.role} org=${args.org || 'null'} orgId=${args.orgId || 'null'}`);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
