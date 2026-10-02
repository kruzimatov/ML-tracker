import { notifyStored } from "./useStored";

export const KEYS = ["mc-roadmap", "mc-patterns", "mc-scratch", "mc-ledger", "mc-course"];
const MAX_BYTES = 1_000_000;
const MAX_ENTRIES = 2000;

export function buildBackup() {
  const data = {};
  for (const k of KEYS) {
    try {
      data[k] = JSON.parse(localStorage.getItem(k) || "{}");
    } catch {
      data[k] = {};
    }
  }
  return { app: "mission-control", version: 1, exportedAt: new Date().toISOString(), data };
}

export function downloadBackup() {
  const blob = new Blob([JSON.stringify(buildBackup(), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `mission-control-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  try {
    localStorage.setItem("mc-last-export", new Date().toISOString());
  } catch {}
}

const isProgress = (v) =>
  v && typeof v === "object" && !Array.isArray(v) &&
  Object.keys(v).length <= MAX_ENTRIES &&
  Object.entries(v).every(([k, x]) => typeof k === "string" && k.length <= 60 && typeof x === "boolean");

export async function parseBackup(file) {
  if (file.size > MAX_BYTES) throw new Error("File is too large to be a backup.");
  let json;
  try {
    json = JSON.parse(await file.text());
  } catch {
    throw new Error("Not a valid JSON file.");
  }
  if (json?.app !== "mission-control" || json.version !== 1 || typeof json.data !== "object") {
    throw new Error("This is not a Mission Control backup.");
  }
  const clean = {};
  for (const k of KEYS) {
    const v = json.data[k] ?? {};
    if (!isProgress(v)) throw new Error(`Backup data for ${k} is malformed.`);
    clean[k] = v;
  }
  const checks = Object.values(clean).reduce((n, v) => n + Object.values(v).filter(Boolean).length, 0);
  return { data: clean, exportedAt: json.exportedAt, checks };
}

export function applyBackup(data) {
  for (const k of KEYS) {
    try {
      localStorage.setItem(k, JSON.stringify(data[k]));
    } catch {}
  }
  notifyStored();
}
