'use strict';
// Builds dist/ — what actually gets deployed to Firebase Hosting (see
// firebase.json's hosting.public + predeploy hook, which runs this script
// automatically before every `firebase deploy`).
//
// Mirrors the project root 1:1 (same relative paths, so every existing
// <script src="...">/<link href="...">/<img src="..."> reference keeps
// working unmodified) except: server-only/dev-only files are excluded
// entirely, and the shared client-side .js files are run through Terser
// (mangled, comments stripped) so DevTools' Sources panel shows dense,
// unlabeled code instead of the annotated source developers work in. This
// raises the bar for casual reading — it does not and cannot make the code
// truly inaccessible, since the browser must still download and execute it
// to run the app at all.

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// Directories that must never reach the browser: server code, IaC/schema
// definitions, dev tooling, dependency trees, this build script itself.
const EXCLUDE_DIRS = new Set([
  'node_modules', 'dataconnect', 'functions', 'src', 'dist', 'scripts',
  '.git', '.github', '.firebase', '.claude', '.agents', '.vscode',
]);

// Individual files at any level that must never reach the browser —
// server entry points, IaC configs, secrets templates, dev/test scripts,
// lockfiles, docs. Matched by basename.
const EXCLUDE_FILES = new Set([
  'firebase.json', '.firebaserc', 'firestore.rules', 'firestore.indexes.json',
  'firestore.rules.test.js', 'firestore-debug.log', 'storage.rules',
  'seed-db.js', 'server.js', 'package.json', 'package-lock.json',
  'skills-lock.json', 'README.md', '.env', '.eslintrc.json', '.gitignore',
  '.nvmrc', '.DS_Store', 'firebase-config.template.js', 'novara',
]);

// Shared, heavily-commented client logic — worth the minify pass. Inline
// <script> blocks inside individual pages and small one-off files are
// left as-is (see the minify-scope decision this was built for).
const MINIFY_FILES = new Set([
  'auth.js', 'bg.js', 'canonical-redirect.js', 'cookie-consent.js', 'dc.js',
  'security.js', 'sidebar.js', 'transitions.js', 'firebase-config.js',
  path.join('frontend', 'chat-client.js'),
  path.join('frontend', 'token-client.js'),
]);

const TERSER_OPTS = {
  compress: true,
  // toplevel deliberately NOT set — every shared script here defines one
  // top-level global (DC_DATA, EC_AUTH, EC_SECURITY, EC_API, FIREBASE_CONFIG,
  // ...) that OTHER scripts reference by that exact name. Terser's default
  // (toplevel unset) only mangles names local to a function/block scope,
  // never top-level declarations — so this stays safe without needing to
  // hand-maintain a reserved-names list.
  mangle: true,
  format: { comments: false },
};

let minifiedCount = 0, copiedCount = 0;

async function copyAndMinify(srcDir, destDir, relBase) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue; // dotfiles/dirs and scratch files — never served
    const rel = relBase ? path.join(relBase, entry.name) : entry.name;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      await copyAndMinify(srcPath, destPath, rel);
      continue;
    }

    if (EXCLUDE_FILES.has(entry.name)) continue;

    if (MINIFY_FILES.has(rel)) {
      const code = fs.readFileSync(srcPath, 'utf8');
      const result = await minify(code, TERSER_OPTS);
      if (result.error) throw new Error(`Terser failed on ${rel}: ${result.error.message}`);
      fs.writeFileSync(destPath, result.code);
      minifiedCount++;
    } else {
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
    }
  }
}

(async () => {
  fs.rmSync(DIST, { recursive: true, force: true });
  await copyAndMinify(ROOT, DIST, '');
  console.log(`Built dist/: ${minifiedCount} files minified, ${copiedCount} copied as-is.`);
})().catch((err) => {
  console.error('[build-hosting] FAILED:', err.message);
  process.exit(1);
});
