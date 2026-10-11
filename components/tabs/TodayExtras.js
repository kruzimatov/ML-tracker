"use client";

import { addDaysISO, fmtISO, todayISO } from "@/lib/dates";
import { CHAPTERS } from "./patternsData";
import { MODULES } from "./scratchData";
import { REVIEW_TOPICS } from "./proRoadmapData";
import { MILESTONES } from "./milestones";
import styles from "./TodayExtras.module.css";

export const INTERVALS = [3, 7, 21];

// Every item that can come up for review, done or not. done() says whether it is in the review cycle yet.
export const REVIEW_ITEMS = [
  ...CHAPTERS.map((c) => ({
    rk: c.id, tab: "patterns", id: c.id, num: c.num, title: c.title, task: "Write the template from memory on a blank file.",
    done: (s) => s.patterns[c.id],
  })),
  ...MODULES.filter((m) => m.track === "a").map((m) => ({
    rk: `mod:${m.id}`, tab: "scratch", id: m.id, num: `M${m.mod}`, title: m.name, task: "Rewrite the model in NumPy from memory, then explain the formula out loud.",
    done: (s) => MILESTONES.every((ms) => s.scratch[`${m.mod}:${ms}`]),
  })),
  ...REVIEW_TOPICS.map(({ t, num }) => ({
    rk: `pro:${t.id}`, tab: "pro", id: `node-${t.id}`, num, title: t.label.en,
    task: "Explain it out loud in two minutes without notes, then open it and check what you missed.",
    done: (s) => s.pro[t.id],
  })),
];

export function dueReviews(patterns, scratch, pro, review, today) {
  const s = { patterns, scratch, pro };
  return REVIEW_ITEMS.filter((it) => it.done(s))
    .map((it) => ({ it, rec: review[it.rk] || { last: null, stage: 0 } }))
    .filter(({ rec }) => rec.stage < INTERVALS.length && (!rec.last || today >= addDaysISO(rec.last, INTERVALS[rec.stage])));
}

const KEEP = 12;

export function ReviewCard({ due, setReview, setRecall, jumpTo }) {
  const mark = (id, ok) => {
    const day = todayISO();
    setReview((r) => ({ ...r, [id]: { last: day, stage: ok ? (r[id]?.stage ?? 0) + 1 : 0 } }));
    setRecall((r) => ({ ...r, [id]: [...(r[id] || []), [day, ok ? 1 : 0]].slice(-KEEP) }));
  };
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>Review due <span className={styles.count}>{due.length}</span></h2>
      {due.length === 0 ? (
        <p className={styles.empty}>Nothing due. Finished patterns, math modules and Full Roadmap topics come back after 3, 7 and 21 days.</p>
      ) : (
        <>
          <p className={styles.hint}>Close the page first, do the task shown, then mark how it went.</p>
          {due.slice(0, 5).map(({ it, rec }) => (
            <div key={it.rk} className={styles.rev}>
              <button className={styles.revTitle} onClick={() => jumpTo(it.tab, it.id)}>
                <b>{it.num}</b> {it.title}
                <em>{it.task}</em>
                <span>review {rec.stage + 1} of {INTERVALS.length}{rec.last ? ` · last ${fmtISO(rec.last)}` : " · first review"}</span>
              </button>
              <button className={styles.ok} onClick={() => mark(it.rk, true)}>Got it</button>
              <button className={styles.rusty} onClick={() => mark(it.rk, false)}>Rusty</button>
            </div>
          ))}
          {due.length > 5 && <p className={styles.more}>+ {due.length - 5} more due</p>}
        </>
      )}
    </section>
  );
}

export function NoteCard({ id, title, prompt, notes, setNotes }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>{title}</h2>
      <textarea
        className={styles.ta}
        rows={4}
        maxLength={2000}
        placeholder={prompt}
        value={notes[id] ?? ""}
        onChange={(e) => setNotes((n) => ({ ...n, [id]: e.target.value }))}
      />
      <div className={styles.saved}>Saved in this browser as you type · {(notes[id] ?? "").length}/2000</div>
    </section>
  );
}

export function PastNotes({ notes, skip }) {
  const entries = Object.entries(notes)
    .filter(([k, v]) => v && v.trim() && k !== skip)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 8);
  if (!entries.length) return null;
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>Past notes</h2>
      {entries.map(([k, v]) => (
        <div key={k} className={styles.past}>
          <div className={styles.pd}>{/^\d{4}-/.test(k) ? fmtISO(k) : `Week ${k.slice(1)} review`}</div>
          <div className={styles.pt}>{v}</div>
        </div>
      ))}
    </section>
  );
}
