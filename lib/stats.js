// Pure date math on ISO day strings. Days are counted in UTC so DST never shifts them.
const DAY = 86400000;
export const dayNum = (iso) => Math.round(Date.parse(`${iso}T00:00:00Z`) / DAY);
export const isoOf = (n) => new Date(n * DAY).toISOString().slice(0, 10);
const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function checkinDays(roadmap, planStartISO) {
  const start = dayNum(planStartISO);
  return Object.entries(roadmap)
    .map(([k, v]) => v && k.match(/^(\d+):day:(\d)$/))
    .filter(Boolean)
    .map(([, w, d]) => isoOf(start + Number(w) * 7 + Number(d)));
}

// A day counts as studied if any study happened: hours, a note, a check-in, or more items done than the day before.
export function studiedDays({ hours = {}, notes = {}, checkins = [], log = {} }) {
  const days = new Set(checkins);
  for (const [k, h] of Object.entries(hours)) if (h > 0) days.add(k);
  for (const [k, t] of Object.entries(notes)) if (ISO.test(k) && t.trim()) days.add(k);
  const logged = Object.keys(log).sort();
  for (let i = 1; i < logged.length; i++) if (log[logged[i]] > log[logged[i - 1]]) days.add(logged[i]);
  return days;
}

// Today not studied yet keeps yesterday's streak alive until the day ends.
export function streaks(days, today) {
  let n = dayNum(today);
  if (!days.has(today)) n--;
  let current = 0;
  while (days.has(isoOf(n))) { current++; n--; }
  let best = 0, run = 0, prev = null;
  for (const d of [...days].map(dayNum).sort((a, b) => a - b)) {
    run = prev !== null && d === prev + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return { current, best };
}

export function goalStats(hours, goal, today, window = 7) {
  const t = dayNum(today);
  let hit = 0;
  for (let i = 0; i < window; i++) if ((hours[isoOf(t - i)] || 0) >= goal) hit++;
  const goalDays = new Set(Object.keys(hours).filter((k) => hours[k] >= goal));
  return { hit, window, best: streaks(goalDays, today).best };
}

// Weeks are anchored to the plan start weekday so "this week" matches the Today tab.
export function weekStarts(anchorISO, today, count) {
  const a = dayNum(anchorISO);
  const w = Math.floor((dayNum(today) - a) / 7);
  return Array.from({ length: count }, (_, i) => a + (w - count + 1 + i) * 7);
}

export function weekTotals(hours, anchorISO, today, count) {
  return weekStarts(anchorISO, today, count).map((s) => ({
    start: isoOf(s),
    total: Array.from({ length: 7 }, (_, d) => hours[isoOf(s + d)] || 0).reduce((a, b) => a + b, 0),
  }));
}

export function heatColumns(hours, days, anchorISO, today, count) {
  const t = dayNum(today);
  return weekStarts(anchorISO, today, count).map((s) =>
    Array.from({ length: 7 }, (_, d) => {
      const iso = isoOf(s + d);
      return { iso, h: hours[iso] || 0, studied: days.has(iso), future: s + d > t };
    })
  );
}

// Items done since the start of a period, from the daily snapshot log. Null until a snapshot exists before it.
export function doneSince(log, sinceISO, doneNow) {
  const before = Object.keys(log).filter((k) => k < sinceISO).sort().pop();
  return before ? Math.max(0, doneNow - log[before]) : null;
}

export function reviewForecast(review, intervals, today, days) {
  const t = dayNum(today);
  const counts = Array(days).fill(0);
  for (const r of Object.values(review)) {
    if (!r?.last || r.stage >= intervals.length) continue;
    const i = dayNum(r.last) + intervals[r.stage] - t;
    if (i > 0 && i < days) counts[i]++;
  }
  return counts;
}

// Share of "Got it" answers in the last `days` days (null when there were none), and all time.
export function recallRate(recall, today, days = 30) {
  const from = isoOf(dayNum(today) - days + 1);
  let got = 0, total = 0, allGot = 0, all = 0;
  for (const events of Object.values(recall)) {
    for (const [d, ok] of events) {
      all++; allGot += ok;
      if (d >= from) { total++; got += ok; }
    }
  }
  return { got, total, pct: total ? Math.round((got / total) * 100) : null, allPct: all ? Math.round((allGot / all) * 100) : null };
}

// Lowest recall first; ties go to the item that was rusty most recently.
export function weakest(recall, limit = 5) {
  return Object.entries(recall)
    .filter(([, ev]) => ev.some(([, ok]) => !ok))
    .map(([rk, ev]) => ({ rk, tries: ev.length, pct: Math.round((ev.reduce((a, [, ok]) => a + ok, 0) / ev.length) * 100), lastMiss: ev.filter(([, ok]) => !ok).pop()[0] }))
    .sort((a, b) => a.pct - b.pct || (a.lastMiss < b.lastMiss ? 1 : -1))
    .slice(0, limit);
}
