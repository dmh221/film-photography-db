#!/usr/bin/env node
// Validates the Phaos catalog CSVs: header shape, required fields, allowed
// values, and duplicate keys. No dependencies — `node scripts/validate.mjs`.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Minimal RFC-4180-ish parser: handles quoted fields and escaped quotes.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  // drop a trailing blank line
  return rows.filter((r) => !(r.length === 1 && r[0] === ''));
}

const specs = [
  {
    file: 'data/film_labs.csv',
    columns: ['lab_name', 'city', 'state', 'country', 'website', 'status'],
    key: ['lab_name', 'city', 'country'],
    enums: { status: ['active', 'closed', 'unverified'] },
  },
  {
    file: 'data/film_stocks.csv',
    columns: ['manufacturer', 'film_name', 'iso', 'format'],
    key: ['manufacturer', 'film_name', 'format'],
  },
  {
    file: 'data/camera_bodies.csv',
    columns: ['manufacturer', 'model', 'format', 'camera_type', 'mount', 'lens_type', 'fixed_lens_name'],
    key: ['manufacturer', 'model'],
  },
];

let errors = 0;
const fail = (m) => { console.error('  ✗ ' + m); errors++; };

for (const spec of specs) {
  console.log(`\n${spec.file}`);
  const before = errors;
  let text;
  try { text = readFileSync(join(root, spec.file), 'utf8'); }
  catch { fail('file not found'); continue; }

  const rows = parseCSV(text);
  const header = rows[0] || [];
  if (header.join(',') !== spec.columns.join(',')) {
    fail(`header mismatch\n     expected: ${spec.columns.join(',')}\n     found:    ${header.join(',')}`);
    continue;
  }

  const idx = Object.fromEntries(spec.columns.map((c, i) => [c, i]));
  const seen = new Map();
  let count = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const line = r + 1; // 1-based, accounts for header
    if (row.length !== spec.columns.length) {
      fail(`line ${line}: expected ${spec.columns.length} columns, found ${row.length}`);
      continue;
    }
    count++;
    for (const f of spec.key) {
      if (!row[idx[f]]?.trim()) fail(`line ${line}: missing required field "${f}"`);
    }
    for (const [f, allowed] of Object.entries(spec.enums || {})) {
      const v = row[idx[f]]?.trim();
      if (v && !allowed.includes(v)) {
        fail(`line ${line}: invalid ${f} "${v}" (allowed: ${allowed.join(', ')})`);
      }
    }
    // Case-sensitive to mirror the Supabase upsert key (e.g. Retina IIIC ≠ IIIc).
    const k = spec.key.map((f) => (row[idx[f]] || '').trim()).join(' | ');
    if (seen.has(k)) fail(`line ${line}: duplicate of line ${seen.get(k)} — ${k}`);
    else seen.set(k, line);
  }

  if (errors === before) console.log(`  ✓ ${count} rows OK`);
  else console.log(`  (${count} rows checked)`);
}

console.log('');
if (errors) { console.error(`✗ ${errors} error(s) found`); process.exit(1); }
console.log('✓ all checks passed');
