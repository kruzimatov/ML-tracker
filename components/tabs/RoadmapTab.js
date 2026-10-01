"use client";

import { useEffect, useSyncExternalStore } from "react";
import { PLAN_START, WEEKS } from "./roadmapData";
import styles from "./RoadmapTab.module.css";

const TOTAL = WEEKS.length * 13;
let didInitialScroll = false;

const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const addDays = (n) => {
  const d = new Date(PLAN_START);
  d.setDate(d.getDate() + n);
  return d;
};

const noopSubscribe = () => () => {};
const weekIndexNow = () => {
  const diff = Math.floor((new Date() - PLAN_START) / 86400000);
  return diff < 0 ? -1 : Math.floor(diff / 7);
};

export default function RoadmapTab({ state, setState, jumpTo }) {
  const curIdx = useSyncExternalStore(noopSubscribe, weekIndexNow, () => -1);

  useEffect(() => {
    if (didInitialScroll || curIdx < 0 || curIdx >= WEEKS.length) return;
    const t = setTimeout(() => {
      didInitialScroll = true;
      document.getElementById(`week-${curIdx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(t);
  }, [curIdx]);

  const toggle = (key) => setState((s) => ({ ...s, [key]: !s[key] }));
  const done = Object.values(state).filter(Boolean).length;

  return (
    <div className={styles.wrap}>
      <div className={styles.masthead}>
        <div className={styles.kicker}>Execution tracker · Oct → Jan</div>
        <h1 className={styles.title}>Thirteen Weeks</h1>
        <p className={styles.lede}>
          Your week-by-week plan toward a backend-plus-AI job by January. Each week: why it matters, how to actually
          do it (with real links), a daily check-in strip, job applications, and one deliverable. Topic links jump
          straight into From Scratch, Pattern Manual, or the Guide Index.
        </p>
        <div className={styles.slipNote}>
          <b>If a week slips:</b> do not restart. Continue from the next week. A missed day stays unchecked — it&apos;s
          not a reason to redo the week or the plan.
        </div>
        <div className={styles.statRow}>
          <div className={styles.stat}><span className={styles.statN}>13</span><span className={styles.statL}>weeks</span></div>
          <div className={styles.stat}><span className={styles.statN}>{TOTAL}</span><span className={styles.statL}>check-ins</span></div>
        </div>
        <div className={styles.pbar}><div className={styles.pbarFill} style={{ width: `${(done / TOTAL) * 100}%` }} /></div>
        <div className={styles.pbarLabel}>{done}/{TOTAL} done</div>
        <div className={styles.controls}><button onClick={() => setState({})}>Reset all</button></div>
      </div>

      <div className={styles.legend}>
        <span><span className={`${styles.lsq} ${styles.lsqGold}`} />Daily check-in (D1–D7)</span>
        <span><span className={`${styles.ldot}`} />Job applied</span>
        <span><span className={`${styles.lsq} ${styles.lsqTeal}`} />Week&apos;s deliverable</span>
      </div>

      {WEEKS.map((w, i) => {
        const start = addDays(i * 7);
        const end = addDays(i * 7 + 6);
        const deliverKey = `${i}:deliverable`;
        return (
          <div key={i} id={`week-${i}`} className={`${styles.week} ${i === curIdx ? styles.current : ""}`}>
            <div className={styles.weekPhase}>{w.phase}</div>
            <div className={styles.weekHead}>
              <div className={styles.weekTitle}>
                <span className={styles.wn}>Week {i + 1}</span>
                {w.deliverable}
                {i === curIdx && <span className={styles.nowTag}>NOW</span>}
              </div>
              <div className={styles.weekDates}>{fmt(start)} – {fmt(end)}</div>
            </div>
            <p className={styles.weekWhy}>{w.why}</p>
            <ol className={styles.weekHow}>{w.how.map((s, k) => <li key={k}>{s}</li>)}</ol>

            {(w.resources.length > 0 || w.internal.length > 0) && (
              <div className={styles.linkRow}>
                {w.resources.map((r) => (
                  <a key={r.url} className={styles.linkChip} href={r.url} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>
                ))}
                {w.internal.map((l) => (
                  <button key={l.label} className={`${styles.linkChip} ${styles.internal}`} onClick={() => jumpTo(l.tab, l.id)}>{l.label} →</button>
                ))}
              </div>
            )}

            <div className={styles.trackLabel}>Daily check-in</div>
            <div className={styles.dayStrip}>
              {Array.from({ length: 7 }).map((_, d) => {
                const key = `${i}:day:${d}`;
                return (
                  <button key={d} title={fmt(addDays(i * 7 + d))} onClick={() => toggle(key)}
                    className={`${styles.dayBox} ${state[key] ? styles.done : ""}`}>D{d + 1}</button>
                );
              })}
            </div>

            <div className={styles.trackLabel}>Jobs applied this week</div>
            <div className={styles.jobRow}>
              {Array.from({ length: 5 }).map((_, j) => {
                const key = `${i}:job:${j}`;
                return (
                  <button key={j} title={`Application ${j + 1}`} onClick={() => toggle(key)}
                    className={`${styles.jobDot} ${state[key] ? styles.done : ""}`} />
                );
              })}
            </div>

            <div className={`${styles.deliverRow} ${state[deliverKey] ? styles.done : ""}`} onClick={() => toggle(deliverKey)}>
              <div className={styles.deliverCheck} />
              <div className={styles.deliverText}>{w.deliverable}</div>
              {w.jump && (
                <button className={styles.jumpLink} onClick={(e) => { e.stopPropagation(); jumpTo(w.jump.tab, w.jump.id); }}>
                  → open topic
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className={styles.footnote}>
        Dates count from Oct 1, 2026. D1 is the first day of each week&apos;s 7-day block, not necessarily Monday.
        The current week is highlighted automatically; past weeks never lock.
      </div>
    </div>
  );
}
