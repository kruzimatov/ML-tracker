// Shared by backup import (browser) and the sync API (server). Pure, no browser or Node APIs.
export const KEYS = ["mc-roadmap", "mc-patterns", "mc-scratch", "mc-ledger", "mc-course", "mc-pro", "mc-notes", "mc-review", "mc-hours", "mc-humblebee", "mc-log", "mc-goal", "mc-recall"];
const MAX_ENTRIES = 2000;

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length <= MAX_ENTRIES;
const ISO = /^\d{4}-\d{2}-\d{2}$/;
export const VALID = {
  progress: (v) => isObj(v) && Object.entries(v).every(([k, x]) => k.length <= 60 && typeof x === "boolean"),
  notes: (v) => isObj(v) && Object.entries(v).every(([k, x]) => (ISO.test(k) || /^w\d{1,2}$/.test(k)) && typeof x === "string" && x.length <= 2000),
  hours: (v) => isObj(v) && Object.entries(v).every(([k, x]) => ISO.test(k) && typeof x === "number" && Number.isFinite(x) && x >= 0 && x <= 24),
  log: (v) => isObj(v) && Object.entries(v).every(([k, x]) => ISO.test(k) && Number.isInteger(x) && x >= 0 && x <= 100000),
  goal: (v) => isObj(v) && Object.entries(v).every(([k, x]) => k === "day" && typeof x === "number" && x >= 0.5 && x <= 16),
  recall: (v) =>
    isObj(v) && Object.entries(v).every(([k, x]) => k.length <= 60 && Array.isArray(x) && x.length <= 12 && x.every((e) => Array.isArray(e) && e.length === 2 && ISO.test(e[0]) && (e[1] === 0 || e[1] === 1))),
  review: (v) =>
    isObj(v) && Object.entries(v).every(([k, x]) => k.length <= 60 && x && ISO.test(x.last ?? "1970-01-01") && Number.isInteger(x.stage) && x.stage >= 0 && x.stage <= 3),
};
const KINDS = { "mc-notes": "notes", "mc-review": "review", "mc-hours": "hours", "mc-log": "log", "mc-goal": "goal", "mc-recall": "recall" };
export const kindOf = (k) => KINDS[k] || "progress";

export const isValid = (key, value) => KEYS.includes(key) && VALID[kindOf(key)](value);
