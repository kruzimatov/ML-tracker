import { UI as SRC_UI, PHASES as SRC_PHASES, SKIPS as SRC_SKIPS } from "./proRoadmapSource";
import { ADDED_INTRO, ADDED_NOTES, ADDED_PHASE, FOOTER, GATE, JUMPS, REVIEW_EXCLUDE_PHASES, REVIEW_EXCLUDE_TOPICS } from "./proRoadmapAdditions";

export const UI = { ...SRC_UI, introAdded: ADDED_INTRO, footer: FOOTER };
const withJump = (x) => (JUMPS[x.id] ? { ...x, jump: JUMPS[x.id] } : x);
export const PHASES = [ADDED_PHASE, ...SRC_PHASES.map((p) => ({ ...p, topics: p.topics.map(withJump) }))];
export { GATE };

export const REVIEW_TOPICS = PHASES.filter((p) => !REVIEW_EXCLUDE_PHASES.includes(p.id)).flatMap((p) =>
  p.topics
    .map((t, i) => ({ t, num: `${p.id.toUpperCase()}.${i + 1}` }))
    .filter(({ t }) => (t.kind === "must" || t.kind === "deep") && !t.nocheck && !REVIEW_EXCLUDE_TOPICS.includes(t.id))
);
export const SKIPS = SRC_SKIPS.map((s) => (ADDED_NOTES[s.id] ? { ...s, note: ADDED_NOTES[s.id] } : s));
export const PRO_TOTAL = PHASES.flatMap((p) => p.topics).filter((x) => !x.nocheck).length;
