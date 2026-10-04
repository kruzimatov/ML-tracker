import { UI as SRC_UI, PHASES as SRC_PHASES, SKIPS as SRC_SKIPS } from "./proRoadmapSource";
import { ADDED_INTRO, ADDED_NOTES, ADDED_PHASE, FOOTER } from "./proRoadmapAdditions";

export const UI = { ...SRC_UI, introAdded: ADDED_INTRO, footer: FOOTER };
export const PHASES = [ADDED_PHASE, ...SRC_PHASES];
export const SKIPS = SRC_SKIPS.map((s) => (ADDED_NOTES[s.id] ? { ...s, note: ADDED_NOTES[s.id] } : s));
export const PRO_TOTAL = PHASES.flatMap((p) => p.topics).filter((x) => !x.nocheck).length;
