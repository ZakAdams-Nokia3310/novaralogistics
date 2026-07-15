'use strict';
// Seeds sample conversations/messages into the Firestore EMULATOR only, for
// viewing the messages.html UI locally. Refuses to run unless
// FIRESTORE_EMULATOR_HOST is set — this must never touch a live database.
//
// Uses real production Firebase Auth UIDs (auth itself stays pointed at
// production in local dev — only Firestore is emulated, since Firestore
// isn't enabled on the live project yet) so logging in locally with the
// real demo accounts actually shows this seeded conversation.
//
// Usage:
//   firebase emulators:start --only firestore
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 GCLOUD_PROJECT=novara-f985b node functions/scripts/seedChatDemo.js

const admin = require('firebase-admin');

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error('Refusing to run: FIRESTORE_EMULATOR_HOST is not set. This script only ever targets the emulator.');
  process.exit(1);
}

admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'novara-f985b' });
const db = admin.firestore();

// Real production UIDs for the Vanguard Heavies demo org (from the live
// seedDemoUsers run) — admin@vanguard.io and user@vanguard.io.
const ORG_ADMIN_UID = 'QLbvHVGmGtcA3SdbhCDvRveEWPA2';
const CUSTOMER_UID  = 'dCJI45jj5zP2ALSkptNhl22cvHw1';

async function seed() {
  const convoRef = db.collection('conversations').doc('demo-convo-1');

  await convoRef.set({
    organisationId: '00000001-0000-0000-0000-000000000001',
    organisationName: 'Vanguard Heavies Ltd.',
    customerUserId: CUSTOMER_UID,
    customerName: 'Lerato Molefe',
    customerEmail: 'user@vanguard.io',
    rentalApplicationId: 'demo-application-1',
    participantUids: [ORG_ADMIN_UID, CUSTOMER_UID],
    createdAt: admin.firestore.Timestamp.now(),
    lastMessageAt: admin.firestore.Timestamp.now(),
    lastMessagePreview: 'Sounds good, Tuesday works for delivery.',
    lastMessageSenderId: CUSTOMER_UID,
  });

  const messages = [
    { senderId: 'system', senderRole: 'system', text: 'Your rental application for Cat 320 GC Excavator has been approved. You can chat with Vanguard Heavies Ltd. here about pickup, delivery, or any questions.', readBy: [] },
    { senderId: ORG_ADMIN_UID, senderRole: 'admin', text: 'Hi Lerato, congrats on the approval! When would you like the excavator delivered?', readBy: [ORG_ADMIN_UID] },
    { senderId: CUSTOMER_UID, senderRole: 'user', text: 'Hi Sipho, thank you! Would Tuesday morning work on your side?', readBy: [ORG_ADMIN_UID, CUSTOMER_UID] },
    { senderId: ORG_ADMIN_UID, senderRole: 'admin', text: 'Tuesday morning is perfect. We’ll have it at the Sandton site by 8am.', readBy: [ORG_ADMIN_UID] },
    { senderId: CUSTOMER_UID, senderRole: 'user', text: 'Sounds good, Tuesday works for delivery.', readBy: [CUSTOMER_UID] },
  ];

  let base = Date.now() - messages.length * 60000;
  for (const m of messages) {
    await convoRef.collection('messages').add({
      ...m,
      sentAt: admin.firestore.Timestamp.fromMillis(base),
    });
    base += 60000;
  }

  console.log('Seeded demo conversation "demo-convo-1" with', messages.length, 'messages.');
  console.log('Org admin UID:', ORG_ADMIN_UID, '(admin@vanguard.io / vanguard1)');
  console.log('Customer UID:', CUSTOMER_UID, '(user@vanguard.io / vanguard1)');
}

seed().catch((err) => { console.error(err); process.exit(1); });
