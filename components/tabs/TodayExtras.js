"use client";

import { addDaysISO, fmtISO, todayISO } from "@/lib/dates";
import { CHAPTERS } from "./patternsData";
import { MODULES } from "./scratchData";
import { PHASES } from "./laterData";
import styles from "./TodayExtras.module.css";

export const INTERVALS = [3, 7, 21];

const MILESTONES = ["learn", "derive", "build", "apply", "teach"];

export function dueReviews(patterns, scratch, later, review, today) {
  const items = [
    ...CHAPTERS.filter((c) => patterns[c.id]).map((c) => ({
      rk: c.id, tab: "patterns", id: c.id, num: c.num, title: c.title, task: "Write the template from memory on a blank file.",
    })),
    ...MODULES.filter((m) => m.track === "a" && MILESTONES.every((ms) => scratch[`${m.mod}:${ms}`])).map((m) => ({
      rk: `mod:${m.id}`, tab: "scratch", id: m.id, num: `M${m.mod}`, title: m.name, task: "Rewrite the model in NumPy from memory, then explain the formula out loud.",
    })),
    ...PHASES.flatMap((p) =>
      p.topics.map((t, i) => ({ p, t, i })).filter(({ t }) => t.kind !== "goal" && later[t.id])
    ).map(({ p, t, i }) => ({
      rk: `later:${t.id}`, tab: "later", id: `topic-${t.id}`, num: `${p.id}${i + 1}`, title: t.title,
      task: "Explain it out loud in two minutes without notes, then open it and check what you missed.",
    })),
  ];
  return items
    .map((it) => ({ it, rec: review[it.rk] || { last: null, stage: 0 } }))
    .filter(({ rec }) => rec.stage < INTERVALS.length && (!rec.last || today >= addDaysISO(rec.last, INTERVALS[rec.stage])));
}

export function ReviewCard({ due, setReview, jumpTo }) {
  const mark = (id, ok) =>
    setReview((r) => ({ ...r, [id]: { last: todayISO(), stage: ok ? (r[id]?.stage ?? 0) + 1 : 0 } }));
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>Review due <span className={styles.count}>{due.length}</span></h2>
      {due.length === 0 ? (
        <p className={styles.empty}>Nothing due. Finished patterns, math modules and After January topics come back after 3, 7 and 21 days.</p>
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
