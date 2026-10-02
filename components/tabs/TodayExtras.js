"use client";

import { addDaysISO, fmtISO, todayISO } from "@/lib/dates";
import { CHAPTERS } from "./patternsData";
import styles from "./TodayExtras.module.css";

export const INTERVALS = [3, 7, 21];

export function dueReviews(patterns, review, today) {
  return CHAPTERS.filter((c) => patterns[c.id])
    .map((c) => ({ c, rec: review[c.id] || { last: null, stage: 0 } }))
    .filter(({ rec }) => rec.stage < INTERVALS.length && (!rec.last || today >= addDaysISO(rec.last, INTERVALS[rec.stage])));
}

export function ReviewCard({ due, setReview, jumpTo }) {
  const mark = (id, ok) =>
    setReview((r) => ({ ...r, [id]: { last: todayISO(), stage: ok ? (r[id]?.stage ?? 0) + 1 : 0 } }));
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>Review due <span className={styles.count}>{due.length}</span></h2>
      {due.length === 0 ? (
        <p className={styles.empty}>Nothing due. Finished patterns come back after 3, 7 and 21 days.</p>
      ) : (
        <>
          <p className={styles.hint}>Close the page, then write the template from memory on a blank file. Then mark how it went.</p>
          {due.slice(0, 5).map(({ c, rec }) => (
            <div key={c.id} className={styles.rev}>
              <button className={styles.revTitle} onClick={() => jumpTo("patterns", c.id)}>
                <b>{c.num}</b> {c.title}
                <span>review {rec.stage + 1} of {INTERVALS.length}{rec.last ? ` · last ${fmtISO(rec.last)}` : " · first review"}</span>
              </button>
              <button className={styles.ok} onClick={() => mark(c.id, true)}>Got it</button>
              <button className={styles.rusty} onClick={() => mark(c.id, false)}>Rusty</button>
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
