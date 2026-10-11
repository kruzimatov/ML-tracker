import { notifyStored } from "./useStored";
import { mapLaterProgress, mapLaterReview } from "./migrate";
import { KEYS, VALID, isValid, kindOf } from "./validate";
import { touch } from "./sync";

export { KEYS };

const MAX_BYTES = 1_000_000;

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
  notifyStored();
}


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
  if ("mc-later" in json.data) {
    if (!VALID.progress(json.data["mc-later"])) throw new Error("Backup data for mc-later is malformed.");
    clean["mc-later"] = json.data["mc-later"];
  }
  for (const k of KEYS) {
    if (!(k in json.data)) continue;
    const v = json.data[k];
    if (!isValid(k, v)) throw new Error(`Backup data for ${k} is malformed.`);
    clean[k] = v;
  }
  const checks = KEYS.filter((k) => kindOf(k) === "progress").reduce((n, k) => n + Object.values(clean[k] ?? {}).filter(Boolean).length, 0);
  return { data: clean, exportedAt: json.exportedAt, checks };
}

export function applyBackup(data) {
  const incoming = { ...data };
  if (incoming["mc-later"]) {
    let pro = {};
    try {
      pro = JSON.parse(localStorage.getItem("mc-pro") || "{}");
    } catch {}
    incoming["mc-pro"] = { ...pro, ...(incoming["mc-pro"] || {}), ...mapLaterProgress(incoming["mc-later"]) };
  }
  if (incoming["mc-review"]) incoming["mc-review"] = mapLaterReview(incoming["mc-review"]);
  for (const k of KEYS) {
    if (!(k in incoming)) continue;
    try {
      localStorage.setItem(k, JSON.stringify(incoming[k]));
      touch(k);
    } catch {}
  }
  notifyStored();
}
