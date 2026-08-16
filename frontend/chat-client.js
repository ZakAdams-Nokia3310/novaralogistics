'use strict';
// EquipCore — Chat Client (Firestore)
//
// Thin wrapper around the Firestore SDK for the conversations/messages
// collections defined in firestore.rules. Firestore itself enforces who can
// read/write what — this module just shapes the calls and listeners.
//
// Load order: security.js, auth.js, frontend/token-client.js, sidebar.js,
// then this file (needs `firebase` from the compat SDK + firebase-config.js
// already loaded, same as auth.js).

const EC_CHAT = (() => {
  let _firestoreReady = false;

  function db() {
    if (!_firestoreReady) {
      // Chat data lives only in the Firestore emulator during local dev —
      // Firestore isn't enabled on the live project yet. This never runs
      // in production since the hostname check only matches local dev.
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        firebase.firestore().useEmulator('127.0.0.1', 8080);
      }
      _firestoreReady = true;
    }
    return firebase.firestore();
  }

  function listenToConversations(uid, cb) {
    return db().collection('conversations')
      .where('participantUids', 'array-contains', uid)
      .orderBy('lastMessageAt', 'desc')
      .onSnapshot(snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))), () => {
        cb([]);
      });
  }

  function listenToMessages(conversationId, cb) {
    return db().collection('conversations').doc(conversationId).collection('messages')
      .orderBy('sentAt', 'asc')
      .onSnapshot(snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))), () => {
        cb([]);
      });
  }

  async function sendMessage(conversationId, text) {
    const user = firebase.auth().currentUser;
    if (!user) throw new Error('Not signed in');
    const session = (typeof EC_AUTH !== 'undefined') ? EC_AUTH.current() : null;

    const clean = String(text || '').trim().slice(0, 4000);
    if (!clean) return;

    await db().collection('conversations').doc(conversationId).collection('messages').add({
      senderId: user.uid,
      senderRole: session ? session.role : 'user',
      text: clean,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      readBy: [user.uid],
    });
  }

  async function markRead(conversationId, messageId, uid) {
    await db().collection('conversations').doc(conversationId).collection('messages').doc(messageId).update({
      readBy: firebase.firestore.FieldValue.arrayUnion(uid),
    });
  }

  // "2m ago" / "Yesterday" / "12 Jun" style relative timestamps.
  function relativeTime(date) {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    const diffMs = Date.now() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return days + 'd ago';
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  }

  return { listenToConversations, listenToMessages, sendMessage, markRead, relativeTime };
})();
