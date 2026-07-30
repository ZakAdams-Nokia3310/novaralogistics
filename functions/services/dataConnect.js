'use strict';
// Trusted, server-side Data Connect access via the Firebase Admin SDK.
//
// getDataConnect(...).executeGraphql runs with the Cloud Function's service
// account — the same trust model as every other Firebase Admin SDK (Admin
// Firestore/Storage access bypasses their security rules too), so it
// bypasses the connector's per-operation @auth level entirely. That's
// exactly why every operation below is declared @auth(level: NO_ACCESS) in
// dataconnect/connectors/*.gql: no client can ever reach these directly,
// only this trusted path can. All real authorization for who may call
// what happens in registry/dataOperations.js + controllers/dataController.js
// — this module has no opinion on that, it only executes what it's told.

const { getDataConnect } = require('firebase-admin/data-connect');
const fs = require('fs');
const path = require('path');

const CONNECTOR_CONFIG = { location: 'us-east1', serviceId: 'novara-f985b-service' };

let _dc = null;
function dc() {
  if (!_dc) _dc = getDataConnect(CONNECTOR_CONFIG);
  return _dc;
}

// Splits a .gql file containing multiple top-level `query Name(...) { ... }`
// / `mutation Name(...) { ... }` blocks into { Name: fullOperationText }.
function parseOperations(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const heading = /^(query|mutation)\s+(\w+)/gm;
  const starts = [];
  let match;
  while ((match = heading.exec(text))) starts.push({ index: match.index, name: match[2] });

  const ops = {};
  for (let i = 0; i < starts.length; i++) {
    const begin = starts[i].index;
    const end = i + 1 < starts.length ? starts[i + 1].index : text.length;
    ops[starts[i].name] = text.slice(begin, end).trim();
  }
  return ops;
}

const QUERIES = parseOperations(path.join(__dirname, '..', 'gql', 'queries.gql'));
const MUTATIONS = parseOperations(path.join(__dirname, '..', 'gql', 'mutations.gql'));

async function runQuery(operationName, variables) {
  const text = QUERIES[operationName];
  if (!text) throw Object.assign(new Error(`Unknown query: ${operationName}`), { status: 404 });
  const res = await dc().executeGraphqlRead(text, { variables, operationName });
  return res.data;
}

async function runMutation(operationName, variables) {
  const text = MUTATIONS[operationName];
  if (!text) throw Object.assign(new Error(`Unknown mutation: ${operationName}`), { status: 404 });
  const res = await dc().executeGraphql(text, { variables, operationName });
  return res.data;
}

module.exports = { runQuery, runMutation };
