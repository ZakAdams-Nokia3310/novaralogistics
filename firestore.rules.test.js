'use strict';
// Security-rules test suite for firestore.rules — run against the local
// Firestore emulator (never against the live project). Uses
// @firebase/rules-unit-testing so each assertion exercises the actual
// rules engine, not a guess about what the rules should do.
//
// Usage: firebase emulators:exec --only firestore "node firestore.rules.test.js"
// or, with the emulator already running: node firestore.rules.test.js

const fs = require('fs');
require('firebase/compat/app');
require('firebase/compat/firestore');
const firebaseCompat = require('firebase/compat/app').default;
const SERVER_TIMESTAMP = firebaseCompat.firestore.FieldValue.serverTimestamp();
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require('@firebase/rules-unit-testing');

const CONVO_ID = 'convo1';
const ORG_ADMIN_UID = 'org-admin-uid';
const CUSTOMER_UID = 'customer-uid';
const OUTSIDER_UID = 'outsider-uid';

async function main() {
  const testEnv = await initializeTestEnvironment({
    projectId: 'novara-f985b-rules-test',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: 8080,
    },
  });

  await testEnv.clearFirestore();

  // Seed a conversation as if the approval Cloud Function created it
  // (Admin SDK bypasses rules entirely, matching how it works in reality).
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await ctx.firestore().doc(`conversations/${CONVO_ID}`).set({
      organisationId: 'org1',
      customerUserId: CUSTOMER_UID,
      rentalApplicationId: 'app1',
      participantUids: [ORG_ADMIN_UID, CUSTOMER_UID],
      createdAt: new Date(),
      lastMessageAt: new Date(),
      lastMessagePreview: 'Your application has been approved.',
      lastMessageSenderId: 'system',
    });
  });

  const orgAdmin = testEnv.authenticatedContext(ORG_ADMIN_UID, { role: 'admin' }).firestore();
  const customer = testEnv.authenticatedContext(CUSTOMER_UID, { role: 'user' }).firestore();
  const outsider = testEnv.authenticatedContext(OUTSIDER_UID, { role: 'user' }).firestore();
  const anon = testEnv.unauthenticatedContext().firestore();

  let passed = 0;
  async function check(name, fn) {
    try {
      await fn();
      console.log('PASS:', name);
      passed++;
    } catch (err) {
      console.error('FAIL:', name, '-', err.message);
      process.exitCode = 1;
    }
  }

  // ── Conversation read access ──────────────────────────────────────────────
  await check('participant (org admin) can read the conversation', () =>
    assertSucceeds(orgAdmin.doc(`conversations/${CONVO_ID}`).get()));

  await check('participant (customer) can read the conversation', () =>
    assertSucceeds(customer.doc(`conversations/${CONVO_ID}`).get()));

  await check('non-participant cannot read the conversation', () =>
    assertFails(outsider.doc(`conversations/${CONVO_ID}`).get()));

  await check('unauthenticated user cannot read the conversation', () =>
    assertFails(anon.doc(`conversations/${CONVO_ID}`).get()));

  // ── Conversation writes are entirely server-managed ───────────────────────
  await check('participant cannot create a conversation document directly', () =>
    assertFails(orgAdmin.doc('conversations/convo2').set({
      organisationId: 'org1', customerUserId: CUSTOMER_UID, participantUids: [ORG_ADMIN_UID, CUSTOMER_UID],
    })));

  await check('participant cannot edit conversation metadata directly (e.g. spoof lastMessagePreview)', () =>
    assertFails(orgAdmin.doc(`conversations/${CONVO_ID}`).update({ lastMessagePreview: 'spoofed' })));

  // ── Sending messages ───────────────────────────────────────────────────────
  await check('participant can send a message as themselves', () =>
    assertSucceeds(orgAdmin.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: ORG_ADMIN_UID,
      senderRole: 'admin',
      text: 'Hi, when would you like to pick up the excavator?',
      sentAt: SERVER_TIMESTAMP,
      readBy: [ORG_ADMIN_UID],
    })));

  await check('non-participant cannot send a message into the conversation', () =>
    assertFails(outsider.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: OUTSIDER_UID, senderRole: 'user', text: 'hi', sentAt: SERVER_TIMESTAMP, readBy: [OUTSIDER_UID],
    })));

  await check('participant cannot impersonate another sender (spoofed senderId)', () =>
    assertFails(customer.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: ORG_ADMIN_UID, senderRole: 'admin', text: 'pretending to be the org', sentAt: SERVER_TIMESTAMP, readBy: [ORG_ADMIN_UID],
    })));

  await check('participant cannot spoof their role in senderRole', () =>
    assertFails(customer.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: CUSTOMER_UID, senderRole: 'admin', text: 'pretending to be admin', sentAt: SERVER_TIMESTAMP, readBy: [CUSTOMER_UID],
    })));

  await check('empty message text is rejected', () =>
    assertFails(customer.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: CUSTOMER_UID, senderRole: 'user', text: '', sentAt: SERVER_TIMESTAMP, readBy: [CUSTOMER_UID],
    })));

  await check('message must claim to be read by its own sender only, on creation', () =>
    assertFails(customer.collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: CUSTOMER_UID, senderRole: 'user', text: 'hi', sentAt: SERVER_TIMESTAMP, readBy: [CUSTOMER_UID, ORG_ADMIN_UID],
    })));

  // ── Read receipts ──────────────────────────────────────────────────────────
  let msgId;
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const ref = await ctx.firestore().collection(`conversations/${CONVO_ID}/messages`).add({
      senderId: CUSTOMER_UID, senderRole: 'user', text: 'Sounds good, Tuesday works.', sentAt: SERVER_TIMESTAMP, readBy: [CUSTOMER_UID],
    });
    msgId = ref.id;
  });

  await check('participant can mark a message as read by adding their own uid', () =>
    assertSucceeds(orgAdmin.doc(`conversations/${CONVO_ID}/messages/${msgId}`).update({
      readBy: [CUSTOMER_UID, ORG_ADMIN_UID],
    })));

  await check('participant cannot remove an existing readBy entry', () =>
    assertFails(orgAdmin.doc(`conversations/${CONVO_ID}/messages/${msgId}`).update({
      readBy: [ORG_ADMIN_UID],
    })));

  await check('participant cannot mark the message read on someone else\'s behalf', () =>
    assertFails(orgAdmin.doc(`conversations/${CONVO_ID}/messages/${msgId}`).update({
      readBy: [CUSTOMER_UID, OUTSIDER_UID],
    })));

  await check('participant cannot edit message text after sending', () =>
    assertFails(orgAdmin.doc(`conversations/${CONVO_ID}/messages/${msgId}`).update({
      text: 'edited after the fact',
    })));

  await check('non-participant cannot read messages', () =>
    assertFails(outsider.collection(`conversations/${CONVO_ID}/messages`).get()));

  await testEnv.cleanup();

  console.log(`\n${passed} checks passed.`);
  if (process.exitCode) {
    console.error('SOME CHECKS FAILED.');
  } else {
    console.log('ALL CHECKS PASSED.');
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
