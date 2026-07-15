'use strict';
// Creates the demo accounts (same emails/passwords/roles the old hardcoded
// auth.js array used) as real Firebase Auth users, with role/org custom
// claims set via the Admin SDK.
//
// SAFETY: refuses to run unless FIREBASE_AUTH_EMULATOR_HOST is set, so this
// can't accidentally create real accounts in the live project. To seed the
// live project, export ALLOW_LIVE_SEED=1 as well — that is a deliberate,
// separate step, not the default.
//
// Usage (against the emulator):
//   firebase emulators:start --only auth,functions
//   # in another terminal:
//   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 GCLOUD_PROJECT=novara-f985b \
//     node functions/scripts/seedDemoUsers.js

const admin = require('firebase-admin');

if (!process.env.FIREBASE_AUTH_EMULATOR_HOST && process.env.ALLOW_LIVE_SEED !== '1') {
  console.error(
    'Refusing to run: FIREBASE_AUTH_EMULATOR_HOST is not set.\n' +
    'This script creates real accounts. Run it against the emulator, or set\n' +
    'ALLOW_LIVE_SEED=1 explicitly if you really mean to seed the live project.'
  );
  process.exit(1);
}

admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'novara-f985b' });

const DEMO_USERS = [
  { email: 'admin@equipcore.com',    password: 'admin123',   name: 'Alex Carter',     role: 'admin',  org: 'EquipCore HQ',          orgId: null },
  { email: 'admin@vanguard.io',      password: 'vanguard1',  name: 'Sipho Ndlovu',    role: 'admin',  org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
  { email: 'user@vanguard.io',       password: 'vanguard1',  name: 'Lerato Molefe',   role: 'user',   org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
  { email: 'driver@vanguard.io',     password: 'vanguard1',  name: 'Thabo Kgosi',     role: 'driver', org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
  { email: 'admin@oceanic.com',      password: 'oceanic1',   name: 'Morgan Blake',    role: 'admin',  org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
  { email: 'user@oceanic.com',       password: 'oceanic1',   name: 'Taylor Osei',     role: 'user',   org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
  { email: 'driver@oceanic.com',     password: 'oceanic1',   name: 'Casey Drummond',  role: 'driver', org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
  { email: 'admin@aether.org',       password: 'aether1',    name: 'Zanele Mthembu',  role: 'admin',  org: 'Aether Power Grid',     orgId: '00000001-0000-0000-0000-000000000003' },
  { email: 'user@aether.org',        password: 'aether1',    name: 'Pieter van Wyk',  role: 'user',   org: 'Aether Power Grid',     orgId: '00000001-0000-0000-0000-000000000003' },
  { email: 'driver@aether.org',      password: 'aether1',    name: 'Mandla Zulu',     role: 'driver', org: 'Aether Power Grid',     orgId: '00000001-0000-0000-0000-000000000003' },
  { email: 'admin@terraform.co',     password: 'terraform1', name: 'Fatima Patel',    role: 'admin',  org: 'TerraForming Inc',      orgId: '00000001-0000-0000-0000-000000000004' },
  { email: 'user@terraform.co',      password: 'terraform1', name: 'David Botha',     role: 'user',   org: 'TerraForming Inc',      orgId: '00000001-0000-0000-0000-000000000004' },
  { email: 'driver@terraform.co',    password: 'terraform1', name: 'Nkosi Dlamini',   role: 'driver', org: 'TerraForming Inc',      orgId: '00000001-0000-0000-0000-000000000004' },
  { email: 'admin@ironclad.co.za',   password: 'ironclad1',  name: 'Bongani Dube',    role: 'admin',  org: 'Ironclad Logistics',    orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
  { email: 'user@ironclad.co.za',    password: 'ironclad1',  name: 'Amahle Sithole',  role: 'user',   org: 'Ironclad Logistics',    orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
  { email: 'driver@ironclad.co.za',  password: 'ironclad1',  name: 'Johan Pretorius', role: 'driver', org: 'Ironclad Logistics',    orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
];

async function seed() {
  for (const u of DEMO_USERS) {
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(u.email);
      console.log(`exists:  ${u.email} (${userRecord.uid})`);
    } catch {
      userRecord = await admin.auth().createUser({
        email: u.email,
        password: u.password,
        displayName: u.name,
      });
      console.log(`created: ${u.email} (${userRecord.uid})`);
    }

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: u.role,
      org: u.org,
      orgId: u.orgId,
    });
  }
  console.log(`\nSeeded ${DEMO_USERS.length} demo accounts.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
