import { notifyStored } from "./useStored";

// After January topic id -> original Full Roadmap topic id
export const LATER_TO_PRO = {
  "a-split": "c-cv", "a-leak": "c-leak", "a-metric": "c-metric", "a-feat": "c-feat", "a-gbm": "c-gbm", "a-calib": "c-calib", "a-goal": "c-deliver",
  "b-torch": "d-torch", "b-loop": "d-loop", "b-cnn": "d-cnn", "b-attn": "d-attn", "b-prac": "d-practice", "b-shift": "d-shift", "b-goal": "d-deliver",
  "c-emb": "l-embed", "c-uz": "l-uz", "c-eval": "l-rageval", "c-hybrid": "l-hybrid", "c-chunk": "l-chunk", "c-goal": "l-rag-deliver",
  "d-enc": "l-ft-enc", "d-sft": "l-ft-data", "d-lora": "l-ft", "d-pref": "l-ft-dpo", "d-eval": "l-ft-eval", "d-serve": "l-serve", "d-goal": "l-deliver",
  "e-track": "o-track", "e-serve": "o-serve", "e-skew": "o-skew", "e-drift": "o-drift", "e-retrain": "o-retrain",
};

export function mapLaterProgress(later) {
  const out = {};
  for (const [k, v] of Object.entries(later || {})) if (v && LATER_TO_PRO[k]) out[LATER_TO_PRO[k]] = true;
  return out;
}

export function mapLaterReview(review) {
  const out = {};
  for (const [k, v] of Object.entries(review || {})) {
    if (k.startsWith("later:")) {
      const m = LATER_TO_PRO[k.slice(6)];
      if (m) out[`pro:${m}`] = v;
    } else out[k] = v;
  }
  return out;
}

const read = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k) || "{}");
  } catch {
    return {};
  }
};

export function runLaterMigration() {
  try {
    if (localStorage.getItem("mc-later-migrated")) return;
    const later = read("mc-later");
    const hadData = localStorage.getItem("mc-later") !== null;
    if (hadData) {
      localStorage.setItem("mc-pro", JSON.stringify({ ...read("mc-pro"), ...mapLaterProgress(later) }));
      localStorage.setItem("mc-review", JSON.stringify(mapLaterReview(read("mc-review"))));
      localStorage.removeItem("mc-later");
    }
    localStorage.setItem("mc-later-migrated", "1");
    if (hadData) notifyStored();
  } catch {}
}
