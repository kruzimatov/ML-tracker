// Run: node scripts/check-stats.mjs
import assert from "node:assert/strict";
import { checkinDays, doneSince, goalStats, studiedDays, streaks, weekTotals, reviewForecast } from "../lib/stats.js";

const today = "2026-10-11";
const days = studiedDays({
  hours: { "2026-10-08": 4.5, "2026-10-09": 1, "2026-10-01": 0 },
  notes: { "2026-10-10": "learned SVD", w2: "week note", "2026-10-05": "  " },
  checkins: checkinDays({ "0:day:0": true, "0:day:1": false }, "2026-10-01"),
  log: { "2026-10-06": 10, "2026-10-07": 12, "2026-10-11": 12 },
});
assert.deepEqual([...days].sort(), ["2026-10-01", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10"]);

assert.deepEqual(streaks(days, today), { current: 4, best: 4 }, "today unstudied keeps yesterday's streak");
assert.equal(streaks(days, "2026-10-12").current, 0, "a missed full day breaks it");

const g = goalStats({ "2026-10-11": 4, "2026-10-10": 5, "2026-10-09": 3.75, "2026-10-08": 4 }, 4, today);
assert.deepEqual(g, { hit: 3, window: 7, best: 2 });

const w = weekTotals({ "2026-10-01": 2, "2026-10-07": 3, "2026-10-08": 4 }, "2026-10-01", today, 2);
assert.deepEqual(w, [{ start: "2026-10-01", total: 5 }, { start: "2026-10-08", total: 4 }]);

assert.equal(doneSince({ "2026-10-06": 10, "2026-10-09": 15 }, "2026-10-08", 20), 10);
assert.equal(doneSince({ "2026-10-09": 15 }, "2026-10-08", 20), null);

const f = reviewForecast({ a: { last: "2026-10-10", stage: 0 }, b: { last: "2026-10-01", stage: 1 }, c: { last: "2026-10-01", stage: 3 } }, [3, 7, 21], today, 14);
assert.equal(f[2], 1);
assert.equal(f.reduce((a, b) => a + b, 0), 1, "overdue and finished items are not forecast");

console.log("stats ok");
