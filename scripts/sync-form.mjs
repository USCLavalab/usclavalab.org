#!/usr/bin/env node
/**
 * sync-form.mjs — fetch new Google Form responses and append them to data.ts
 *
 * Usage:
 *   node scripts/sync-form.mjs           — add new startups only
 *   node scripts/sync-form.mjs --update  — also offer field-level updates for
 *                                          startups that already exist in data.ts
 *
 * First-time setup:
 *   1. Enable Google Forms API and Google Drive API in your GCP project.
 *   2. Create an OAuth 2.0 Desktop App credential and download it as
 *      scripts/credentials.json  (gitignored).
 *   3. Run once: node scripts/sync-form.mjs
 *      A browser auth flow runs; token saved to scripts/.token.json.
 *   4. On first run after auth, the script prints all form question IDs
 *      and generates scripts/field-map.json for you to fill in.
 *   5. Fill in field-map.json (see comments inside), then run again.
 */

import { google } from "googleapis";
import sharp from "sharp";
import http from "http";
import fs from "fs";
import path from "path";
import readline from "readline";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(REPO_ROOT, "src/app/startup-directory/data.ts");
const FIELD_MAP_FILE = path.join(__dirname, "field-map.json");
const LAST_SYNC_FILE = path.join(__dirname, ".last-sync");
const TOKEN_FILE = path.join(__dirname, ".token.json");
const CREDENTIALS_FILE = path.join(__dirname, "credentials.json");
const FORM_ID = "1i6aECMbAkbZ9LSa9nLlVrHzHxvLPrO3QMhJ8CBOhfuc";
const REDIRECT_PORT = 3030;
const UPDATE_MODE = process.argv.includes("--update");

const SCOPES = [
  "https://www.googleapis.com/auth/forms.responses.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

// ─── OAuth ────────────────────────────────────────────────────────────────────

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.error(
      `\nMissing ${CREDENTIALS_FILE}\n\n` +
        `Steps:\n` +
        `  1. Go to console.cloud.google.com → APIs & Services → Credentials\n` +
        `  2. Create Credentials → OAuth 2.0 Client ID → Desktop app\n` +
        `  3. Download JSON and save it as scripts/credentials.json\n`
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, "utf8"));
}

async function getAuthClient() {
  const raw = loadCredentials();
  const { client_id, client_secret } = raw.installed || raw.web;

  const oauth2 = new google.auth.OAuth2(
    client_id,
    client_secret,
    `http://localhost:${REDIRECT_PORT}`
  );

  if (fs.existsSync(TOKEN_FILE)) {
    oauth2.setCredentials(JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8")));
    try {
      await oauth2.getAccessToken();
    } catch {
      fs.unlinkSync(TOKEN_FILE);
      return getAuthClient();
    }
    return oauth2;
  }

  const authUrl = oauth2.generateAuthUrl({ access_type: "offline", scope: SCOPES });
  console.log("\nOpen this URL in your browser to authorize:\n");
  console.log("  " + authUrl + "\n");

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const qs = new URL(req.url, `http://localhost:${REDIRECT_PORT}`).searchParams;
      const code = qs.get("code");
      res.end(code ? "Authorized! You can close this tab." : "Error — no code received.");
      server.close();
      code ? resolve(code) : reject(new Error("No auth code in redirect"));
    });
    server.listen(REDIRECT_PORT, () =>
      console.log(`Waiting for OAuth redirect on http://localhost:${REDIRECT_PORT} ...`)
    );
  });

  const { tokens } = await oauth2.getToken(code);
  oauth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  console.log("Token saved to scripts/.token.json\n");
  return oauth2;
}

// ─── Google Forms API ─────────────────────────────────────────────────────────

async function getFormQuestions(auth) {
  const forms = google.forms({ version: "v1", auth });
  const res = await forms.forms.get({ formId: FORM_ID });
  return res.data.items || [];
}

async function getFormResponses(auth) {
  const forms = google.forms({ version: "v1", auth });
  const res = await forms.forms.responses.list({ formId: FORM_ID });
  return res.data.responses || [];
}

// ─── Google Drive download ────────────────────────────────────────────────────

async function downloadDriveFile(auth, fileId, destPath) {
  const drive = google.drive({ version: "v3", auth });
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // 👇 get metadata FIRST
  const meta = await drive.files.get({
    fileId,
    fields: "mimeType, name",
  });

  const mime = meta.data.mimeType || "";
  const name = meta.data.name || "";

  // 🚫 skip HEIC/HEIF
  if (mime.includes("heic") || mime.includes("heif") || name.toLowerCase().endsWith(".heic")) {
    console.log(`  Skipping HEIC file → ${name}`);
    return; // just skip this image
  }

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  await new Promise((resolve, reject) => {
    res.data
      .pipe(sharp().png())
      .pipe(fs.createWriteStream(destPath))
      .on("finish", resolve)
      .on("error", reject);
  });
}

// ─── Field map bootstrap ──────────────────────────────────────────────────────

function bootstrapFieldMap(questions) {
  console.log("\n─── Form questions ──────────────────────────────────────────────\n");

  const template = {};
  for (const item of questions) {
    if (!item.questionItem) continue;
    const question = item.questionItem.question;
    const id = question.questionId;
    const title = item.title || "(untitled)";
    const isFile = !!question.fileUploadQuestion;

    console.log(`  ${id}  →  "${title}"${isFile ? "  [FILE UPLOAD]" : ""}`);
    template[id] = isFile ? `file:# ${title}` : `# ${title}`;
  }

  console.log(`
─────────────────────────────────────────────────────────────────

Template written to scripts/field-map.json.
Edit each value to map question IDs to Startup fields.

Text field paths:
  name, description, longDescription, product, logo,
  batch, industry, website, stage
  tags                         ← comma-separated string → array
  founders[0].name             ← repeat for [1], [2], [3]
  founders[0].bio
  founders[0].linkedin
  founders[0].twitter

File upload field paths (keep the "file:" prefix):
  file:logo                    → saved to /public/startup-logos/{id}.png
  file:founders[0].image       → saved to /public/founders/{batch}/{firstname}.png

Skip a question by leaving its value starting with "#".
`);

  fs.writeFileSync(FIELD_MAP_FILE, JSON.stringify(template, null, 2));
  console.log("Now fill in scripts/field-map.json and run again.");
  process.exit(0);
}

// ─── Existing startup names ───────────────────────────────────────────────────

function existingNames() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const names = new Set();
  for (const m of src.matchAll(/^\s+name:\s+"([^"]+)"/gm)) {
    names.add(m[1].trim().toLowerCase());
  }
  return names;
}

// ─── Dot-path setter ─────────────────────────────────────────────────────────

function setPath(obj, dotPath, value) {
  const parts = dotPath.replace(/\[(\d+)\]/g, ".$1").split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const nextIsIndex = /^\d+$/.test(parts[i + 1]);
    if (cur[key] === undefined) cur[key] = nextIsIndex ? [] : {};
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
}

// ─── Response → Startup (async — downloads images) ───────────────────────────
//
// Returns the startup object, or null if it should be skipped.
// In update mode, duplicates are returned with _isUpdate: true instead of null.
// _uploadedFields tracks which image paths came from actual Drive downloads
// (vs. fallback placeholders) so the diff logic can filter out spurious changes.

async function responseToStartup(response, fieldMap, auth, knownNames) {
  const answers = response.answers || {};
  const raw = {};
  const fileTasks = [];

  for (const [questionId, mapping] of Object.entries(fieldMap)) {
    if (mapping.startsWith("#")) continue;
    const answer = answers[questionId];
    if (!answer) continue;

    if (mapping.startsWith("file:")) {
      const fieldPath = mapping.slice(5);
      if (fieldPath.startsWith("#")) continue;
      const fileIds = answer.fileUploadAnswers?.answers?.map((a) => a.fileId) || [];
      if (fileIds.length > 0) fileTasks.push({ fieldPath, fileId: fileIds[0] });
    } else {
      const value =
        answer.textAnswers?.answers?.map((a) => a.value).join(", ") ?? "";
      setPath(raw, mapping, value);
    }
  }

  if (typeof raw.tags === "string") {
    raw.tags = raw.tags.split(/[,;]+/).map((t) => t.trim()).filter(Boolean);
  }
  raw.id =
    raw.id ||
    (raw.name || "unknown").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  raw.batch = raw.batch || "unknown";
  raw.tags = raw.tags || [];
  raw.stage = raw.stage ?? "";

  const FOUNDER_ROLES = ["PM", "Designer", "Developer", "Developer"];

  const isDuplicate = knownNames.has((raw.name || "").trim().toLowerCase());
  if (isDuplicate && !UPDATE_MODE) {
    console.log(`  Skipping "${raw.name}" — already exists (use --update to diff)`);
    return null;
  }

  if (isDuplicate) {
    // Update mode: preserve the original index of every submitted founder, even
    // those without a name, so computeDiff can compare at the right position.
    // Slots that were never set by the form stay null.
    const maxIdx = raw.founders
      ? Math.max(-1, ...Object.keys(raw.founders).map(Number).filter((n) => !isNaN(n)))
      : -1;
    raw.founders = Array.from({ length: maxIdx + 1 }, (_, i) => {
      const f = (raw.founders || [])[i];
      return f ? { ...f, role: FOUNDER_ROLES[i] ?? "Developer" } : null;
    });
  } else {
    // New startup: compact out any slots that have no name.
    raw.founders = (raw.founders || [])
      .filter((f) => f && f.name)
      .map((f, i) => ({ ...f, role: FOUNDER_ROLES[i] ?? "Developer" }));
  }

  // Pass 2: download images
  const uploadedFields = new Set();
  for (const { fieldPath, fileId } of fileTasks) {
    let destPath;
    if (fieldPath === "logo") {
      destPath = path.join(REPO_ROOT, "public", "startup-logos", `${raw.id}.png`);
    } else {
      const match = fieldPath.match(/founders\[(\d+)\]/);
      if (!match) continue;
      const idx = parseInt(match[1]);
      const founder = (raw.founders || [])[idx];
      const firstName = (founder?.name?.split(" ")[0] || `founder${idx}`)
        .toLowerCase().replace(/[^a-z0-9]/g, "");
      destPath = path.join(
        REPO_ROOT, "public", "founders", raw.batch.toLowerCase(), `${firstName}.png`
      );
    }

    console.log(`  Downloading ${fieldPath} from Drive...`);
    await downloadDriveFile(auth, fileId, destPath);
    console.log(`  Saved → ${path.relative(REPO_ROOT, destPath)}`);

    const publicPath =
      "/" + path.relative(path.join(REPO_ROOT, "public"), destPath).replace(/\\/g, "/");
    setPath(raw, fieldPath, publicPath);
    uploadedFields.add(fieldPath);
  }

  if (!raw.logo) raw.logo = `/startup-logos/${raw.id}.png`;
  for (let i = 0; i < raw.founders.length; i++) {
    const f = raw.founders[i];
    if (f && !f.image) {
      const firstName = (f.name || `founder${i}`)
        .split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      f.image = `/founders/${raw.batch.toLowerCase()}/${firstName}.png`;
    }
  }

  raw._isUpdate = isDuplicate;
  raw._uploadedFields = uploadedFields;
  return raw;
}

// ─── TypeScript serializer ────────────────────────────────────────────────────

function q(s) {
  return JSON.stringify(s ?? "");
}

function founderTs(f) {
  const lines = [
    `    {`,
    `      name: ${q(f.name)},`,
    `      role: ${q(f.role)},`,
    `      image: ${q(f.image)},`,
    `      bio: ${q(f.bio)},`,
  ];
  if (f.linkedin) lines.push(`      linkedin: ${q(f.linkedin)},`);
  if (f.twitter) lines.push(`      twitter: ${q(f.twitter)},`);
  lines.push(`    }`);
  return lines.join("\n");
}

function startupToTs(s) {
  const lines = [
    `  {`,
    `    id: ${q(s.id)},`,
    `    name: ${q(s.name)},`,
    `    description: ${q(s.description)},`,
  ];
  if (s.longDescription) lines.push(`    longDescription: ${q(s.longDescription)},`);
  if (s.product) lines.push(`    product: ${q(s.product)},`);
  lines.push(`    logo: ${q(s.logo)},`);
  lines.push(`    batch: ${q(s.batch)},`);
  lines.push(`    industry: ${q(s.industry)},`);
  lines.push(`    website: ${q(s.website || "")},`);
  lines.push(`    tags: [${s.tags.map(q).join(", ")}],`);
  lines.push(`    stage: ${q(s.stage ?? "")},`);
  lines.push(`    founders: [`);
  for (const f of s.founders) lines.push(founderTs(f) + ",");
  lines.push(`    ],`);
  lines.push(`  }`);
  return lines.join("\n");
}

// ─── Entry text parser ────────────────────────────────────────────────────────
// Converts a text blob (one entry from data.ts) back to a plain JS object.

function parseEntryText(text) {
  const str = (field) => {
    const m = text.match(new RegExp(`\\b${field}:\\s*("(?:[^"\\\\]|\\\\.)*")`));
    return m ? JSON.parse(m[1]) : undefined;
  };

  const tagsM = text.match(/\btags:\s*\[((?:\s*"[^"]*",?\s*)*)\]/);
  const tags = tagsM
    ? [...tagsM[1].matchAll(/"([^"]*)"/g)].map((m) => m[1])
    : [];

  // Extract founder objects using brace counting (handles strings with { } safely
  // because we only encounter them inside quoted values which we skip character by
  // character without incrementing the depth counter).
  const founders = [];
  const foundersM = text.match(/\bfounders:\s*\[/);
  if (foundersM) {
    let i = foundersM.index + foundersM[0].length;
    let depth = 0;
    let objStart = -1;
    let inStr = false;
    let escape = false;

    while (i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (ch === "\\" && inStr) { escape = true; i++; continue; }
      if (ch === '"') { inStr = !inStr; i++; continue; }
      if (inStr) { i++; continue; }

      if (ch === "{") {
        if (depth === 0) objStart = i;
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0 && objStart !== -1) {
          const block = text.slice(objStart, i + 1);
          const fstr = (field) => {
            const m = block.match(new RegExp(`\\b${field}:\\s*("(?:[^"\\\\]|\\\\.)*")`));
            return m ? JSON.parse(m[1]) : undefined;
          };
          founders.push({
            name: fstr("name"),
            role: fstr("role"),
            image: fstr("image"),
            bio: fstr("bio"),
            linkedin: fstr("linkedin"),
            twitter: fstr("twitter"),
          });
          objStart = -1;
        }
      } else if (ch === "]" && depth === 0) {
        break; // end of founders array
      }
      i++;
    }
  }

  return {
    id: str("id"),
    name: str("name"),
    description: str("description"),
    longDescription: str("longDescription"),
    product: str("product"),
    logo: str("logo"),
    batch: str("batch"),
    industry: str("industry"),
    website: str("website"),
    stage: str("stage"),
    tags,
    founders: founders.filter((f) => f.name),
  };
}

// ─── Diff helpers ─────────────────────────────────────────────────────────────

// Returns an array of { path, old, new } for fields that differ.
// uploadedFields: Set of image field paths that came from a real Drive download.
// Image paths that were NOT uploaded are excluded from the diff to avoid noise
// from the .png fallback placeholder diffing against an existing .jpg path.
function computeDiff(existing, incoming, uploadedFields) {
  const changes = [];

  const scalar = ["description", "longDescription", "product", "website", "industry", "stage"];
  for (const field of scalar) {
    const oldVal = existing[field];
    const newVal = incoming[field];
    if (newVal && newVal !== (oldVal ?? "")) {
      changes.push({ path: field, old: oldVal ?? "", new: newVal });
    }
  }

  // Image fields at the top level (logo)
  if (uploadedFields.has("logo") && incoming.logo && incoming.logo !== existing.logo) {
    changes.push({ path: "logo", old: existing.logo ?? "", new: incoming.logo });
  }

  // Tags — only if the submission actually provided tags
  if (incoming.tags?.length > 0 && JSON.stringify(incoming.tags) !== JSON.stringify(existing.tags ?? [])) {
    changes.push({ path: "tags", old: existing.tags ?? [], new: incoming.tags });
  }

  // Founders — iterate up to the longer of the two arrays.
  // incoming slots that are null were not submitted; skip them so we don't
  // report spurious removals. Only compare slots where data was actually sent.
  const maxLen = Math.max(existing.founders?.length ?? 0, incoming.founders?.length ?? 0);
  for (let i = 0; i < maxLen; i++) {
    const nf = (incoming.founders ?? [])[i];
    if (nf == null) continue; // nothing submitted for this founder — leave unchanged

    const ef = (existing.founders ?? [])[i] ?? {};
    for (const field of ["bio", "linkedin", "twitter"]) {
      const oldVal = ef[field] ?? "";
      const newVal = nf[field] ?? "";
      if (newVal && newVal !== oldVal) {
        changes.push({ path: `founders[${i}].${field}`, old: oldVal, new: newVal });
      }
    }
    const imageField = `founders[${i}].image`;
    if (uploadedFields.has(imageField) && nf.image && nf.image !== ef.image) {
      changes.push({ path: imageField, old: ef.image ?? "", new: nf.image });
    }
  }

  return changes;
}

const RED   = (s) => `\x1b[31m${s}\x1b[0m`;
const GREEN = (s) => `\x1b[32m${s}\x1b[0m`;
const BOLD  = (s) => `\x1b[1m${s}\x1b[0m`;

function printDiff(name, changes) {
  console.log(BOLD(`\n─── Update diff: ${name} ${"─".repeat(Math.max(0, 45 - name.length))}\n`));
  for (const { path, old: oldVal, new: newVal } of changes) {
    console.log(`  ${BOLD(path)}`);
    if (Array.isArray(oldVal)) {
      console.log(RED(`    - [${oldVal.map(q).join(", ")}]`));
      console.log(GREEN(`    + [${newVal.map(q).join(", ")}]`));
    } else {
      const wrap = (s) => (s.length > 120 ? s.slice(0, 117) + "…" : s);
      console.log(RED(`    - ${wrap(JSON.stringify(oldVal))}`));
      console.log(GREEN(`    + ${wrap(JSON.stringify(newVal))}`));
    }
    console.log();
  }
}

// Merges only the changed fields from `changes` into a copy of `existing`.
function applyChanges(existing, changes) {
  const merged = {
    ...existing,
    founders: (existing.founders || []).map((f) => ({ ...f })),
  };
  for (const { path, new: newVal } of changes) {
    const founderM = path.match(/^founders\[(\d+)\]\.(.+)$/);
    if (founderM) {
      const idx = parseInt(founderM[1]);
      merged.founders[idx] = merged.founders[idx] ?? {};
      merged.founders[idx][founderM[2]] = newVal;
    } else {
      merged[path] = newVal;
    }
  }
  return merged;
}

// ─── Batch sort key ──────────────────────────────────────────────────────────
// F26 > S26 > F25 > S25 > ... Higher key = earlier in file.

function batchKey(batchStr) {
  const m = (batchStr || "").match(/^([SF])(\d+)$/i);
  if (!m) return 0;
  return parseInt(m[2]) * 2 + (m[1].toUpperCase() === "F" ? 1 : 0);
}

// ─── data.ts updater ─────────────────────────────────────────────────────────
// Parses all existing entries, replaces any in `replacements` (name → object),
// appends `newStartups`, sorts the full list by batch, reconstructs the file.

function buildUpdatedFile(newStartups, replacements = new Map()) {
  const src = fs.readFileSync(DATA_FILE, "utf8");

  const ARRAY_OPEN = "export const startups: Startup[] = [\n";
  const arrayStart = src.indexOf(ARRAY_OPEN);
  if (arrayStart === -1) throw new Error("Could not find startups array in data.ts");
  const bodyStart = arrayStart + ARRAY_OPEN.length;

  const arrayEnd = src.lastIndexOf("\n];");
  if (arrayEnd === -1) throw new Error("Could not find closing `];` in data.ts");

  const header = src.slice(0, bodyStart);
  const footer = src.slice(arrayEnd);
  const body   = src.slice(bodyStart, arrayEnd);

  const entryStarts = [];
  const topLevelBrace = /^  \{/gm;
  let m;
  while ((m = topLevelBrace.exec(body)) !== null) {
    entryStarts.push(m.index);
  }

  const existingEntries = entryStarts.map((start, i) => {
    const end = i + 1 < entryStarts.length ? entryStarts[i + 1] : body.length;
    const entryText = body.slice(start, end).replace(/,\s*$/, "").trimEnd();

    // Replace with updated version if this startup was approved for update
    const nameM = entryText.match(/^\s+name:\s*"([^"]+)"/m);
    const entryName = nameM?.[1]?.trim().toLowerCase();
    if (entryName && replacements.has(entryName)) {
      return startupToTs(replacements.get(entryName));
    }
    return entryText;
  });

  const allEntries = [...existingEntries, ...newStartups.map(startupToTs)];

  allEntries.sort((a, b) => {
    const bA = (a.match(/^\s+batch:\s*"([^"]+)"/m) || [])[1] || "";
    const bB = (b.match(/^\s+batch:\s*"([^"]+)"/m) || [])[1] || "";
    return batchKey(bB) - batchKey(bA);
  });

  return header + allEntries.join(",\n") + footer;
}

// ─── Prompt helper ────────────────────────────────────────────────────────────

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (ans) => { rl.close(); resolve(ans); });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Authenticating with Google...");
  const auth = await getAuthClient();

  if (!fs.existsSync(FIELD_MAP_FILE)) {
    console.log("No field-map.json — fetching form questions...");
    const questions = await getFormQuestions(auth);
    bootstrapFieldMap(questions);
    return;
  }

  const fieldMap = JSON.parse(fs.readFileSync(FIELD_MAP_FILE, "utf8"));

  console.log("Fetching form responses...");
  const allResponses = await getFormResponses(auth);

  const lastSync = fs.existsSync(LAST_SYNC_FILE)
    ? new Date(fs.readFileSync(LAST_SYNC_FILE, "utf8").trim())
    : new Date(0);

  const newResponses = allResponses.filter(
    (r) => new Date(r.lastSubmittedTime) > lastSync
  );

  if (newResponses.length === 0) {
    const when = lastSync.valueOf() === 0 ? "never" : lastSync.toLocaleString();
    console.log(`No new responses since last sync (${when}).`);
    return;
  }

  console.log(`\nFound ${newResponses.length} new response(s). Downloading images...\n`);

  const knownNames = existingNames();
  const newStartups   = [];  // truly new — will be appended
  const updateCandidates = []; // duplicates in --update mode — need diff + approval

  for (const r of newResponses) {
    const startup = await responseToStartup(r, fieldMap, auth, knownNames);
    if (!startup) continue;
    if (startup._isUpdate) {
      updateCandidates.push(startup);
    } else {
      newStartups.push(startup);
    }
  }

  // ── Handle updates ─────────────────────────────────────────────────────────

  const replacements = new Map(); // name.toLowerCase() → merged startup object

  if (updateCandidates.length > 0) {
    // Parse the existing entries once so we can diff against them
    const src = fs.readFileSync(DATA_FILE, "utf8");
    const ARRAY_OPEN = "export const startups: Startup[] = [\n";
    const bodyStart = src.indexOf(ARRAY_OPEN) + ARRAY_OPEN.length;
    const bodyEnd = src.lastIndexOf("\n];");
    const body = src.slice(bodyStart, bodyEnd);

    const entryStarts = [];
    const re = /^  \{/gm;
    let m2;
    while ((m2 = re.exec(body)) !== null) entryStarts.push(m2.index);

    const entryMap = new Map(); // name.toLowerCase() → parsed object
    for (let i = 0; i < entryStarts.length; i++) {
      const end = i + 1 < entryStarts.length ? entryStarts[i + 1] : body.length;
      const text = body.slice(entryStarts[i], end).replace(/,\s*$/, "").trimEnd();
      const parsed = parseEntryText(text);
      if (parsed.name) entryMap.set(parsed.name.toLowerCase(), parsed);
    }

    for (const incoming of updateCandidates) {
      const key = incoming.name.trim().toLowerCase();
      const existing = entryMap.get(key);
      if (!existing) continue;

      const changes = computeDiff(existing, incoming, incoming._uploadedFields);

      if (changes.length === 0) {
        console.log(`  "${incoming.name}" — no field changes detected, skipping.`);
        continue;
      }

      printDiff(incoming.name, changes);

      const ans = await ask(`Apply ${changes.length} change(s) to "${incoming.name}"? [y/N] `);
      if (ans.trim().toLowerCase() === "y") {
        replacements.set(key, applyChanges(existing, changes));
        console.log(`  Queued update for "${incoming.name}".`);
      } else {
        console.log(`  Skipped "${incoming.name}".`);
      }
    }
  }

  // ── Handle new entries ─────────────────────────────────────────────────────

  if (newStartups.length > 0) {
    console.log("\n─── Preview (new additions to data.ts) ─────────────────────────\n");
    for (const s of newStartups) {
      for (const line of startupToTs(s).split("\n")) {
        console.log(GREEN("+ " + line));
      }
      console.log();
    }
    console.log("─────────────────────────────────────────────────────────────────\n");

    const approve = await ask(`Add ${newStartups.length} new startup(s)? [y/N] `);
    if (approve.trim().toLowerCase() !== "y") {
      newStartups.length = 0; // clear — don't commit new ones
      console.log("New additions skipped.");
    }
  }

  if (newStartups.length === 0 && replacements.size === 0) {
    console.log("Nothing to commit.");
    return;
  }

  // ── Write + commit ─────────────────────────────────────────────────────────

  fs.writeFileSync(DATA_FILE, buildUpdatedFile(newStartups, replacements), "utf8");

  const latestTs = newResponses
    .map((r) => new Date(r.lastSubmittedTime))
    .sort((a, b) => b - a)[0];
  fs.writeFileSync(LAST_SYNC_FILE, latestTs.toISOString());

  const filesToStage = [
    "src/app/startup-directory/data.ts",
    "public/startup-logos",
    "public/founders",
  ];
  const gitAdd = spawnSync("git", ["add", ...filesToStage], { cwd: REPO_ROOT, stdio: "inherit" });
  if (gitAdd.status !== 0) { console.error("git add failed"); process.exit(1); }

  const addedNames   = newStartups.map((s) => s.name);
  const updatedNames = [...replacements.values()].map((s) => s.name);
  const parts = [];
  if (addedNames.length)   parts.push(`Adding ${addedNames.join(", ")}`);
  if (updatedNames.length) parts.push(`Updating ${updatedNames.join(", ")}`);
  const commitMsg = parts.join("; ");

  const gitCommit = spawnSync("git", ["commit", "-m", commitMsg], { cwd: REPO_ROOT, stdio: "inherit" });
  if (gitCommit.status !== 0) { console.error("git commit failed"); process.exit(1); }

  const push = await ask("Push to GitHub now? [y/N] ");
  if (push.trim().toLowerCase() === "y") {
    const gitPush = spawnSync("git", ["push"], { cwd: REPO_ROOT, stdio: "inherit" });
    if (gitPush.status !== 0) { console.error("git push failed"); process.exit(1); }
    console.log("\nPushed successfully.");
  } else {
    console.log("\nCommit made locally. Run `git push` when ready.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
