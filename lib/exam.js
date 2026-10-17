// Exam results live in mc-exam as { questionId: [[isoDay, 1 | 0], ...] }, same shape as mc-recall.
const KEEP = 12;

export const last = (rec) => rec?.at(-1)?.[1];

export function record(store, id, ok, day) {
  return { ...store, [id]: [...(store[id] || []), [day, ok ? 1 : 0]].slice(-KEEP) };
}

export function isRight(q, value) {
  if (q.kind === "calc") {
    const v = parseFloat(String(value).replace(",", "."));
    return Number.isFinite(v) && Math.abs(v - q.answer) <= (q.tol ?? 0);
  }
  return value === q.answer;
}

// Readiness counts unseen questions as not ready: right / total, not right / seen.
export function stats(qs, store) {
  let seen = 0, right = 0;
  for (const q of qs) {
    const l = last(store[q.id]);
    if (l === undefined) continue;
    seen++;
    if (l === 1) right++;
  }
  return { total: qs.length, seen, right, ready: qs.length ? Math.round((right / qs.length) * 100) : 0 };
}

export const weak = (qs, store) => qs.filter((q) => last(store[q.id]) === 0);

export function shuffle(a, rand = Math.random) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
