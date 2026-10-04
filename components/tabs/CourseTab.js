"use client";

import { COURSE, COURSE_TOTAL, SQUARES } from "./courseData";
import PageHead from "../ui/PageHead";
import ProgressRow from "../ui/ProgressRow";
import styles from "./CourseTab.module.css";

export default function CourseTab({ state, setState, jumpTo }) {
  const done = Object.values(state).filter(Boolean).length;
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));
  let n = 0;

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <PageHead kicker={<>Your course · Coursera</>} title={<>{COURSE.title}</>} color="var(--gold)" />
      <p className={styles.by}>{COURSE.by}</p>
      <a className={styles.open} href={COURSE.url} target="_blank" rel="noopener noreferrer">Open course on Coursera ↗</a>

      <div className={styles.rule}>
        <b>The rule that fixes &quot;I can&apos;t write it myself&quot;:</b> after each week, close the videos and rewrite that
        week&apos;s model in NumPy from memory. Peek only when stuck. The labs are the right place to learn the
        sklearn/TensorFlow side; the rewrite is where you learn the model.
      </div>

      <div className={styles.progWrap}><ProgressRow done={done} total={COURSE_TOTAL} color="var(--gold)" onReset={() => setState({})} /></div>

      {COURSE.courses.map((c, ci) => (
        <section key={ci} className={styles.course}>
          <h2 className={styles.h2}>{c.name}</h2>
          {c.weeks.map((w, wi) => {
            n++;
            return (
              <div key={wi} className={styles.week}>
                <div className={styles.wtop}>
                  <span className={styles.wn}>Week {wi + 1}</span>
                  <span className={styles.wt}>{w.t}</span>
                </div>
                <div className={styles.row}>
                  {SQUARES.map((sq) => {
                    const k = `${ci}-${wi}:${sq.key}`;
                    return (
                      <button key={sq.key} title={sq.hint} onClick={() => toggle(k)} className={`${styles.sq} ${state[k] ? styles.done : ""}`}>
                        <i className={styles.box} />{sq.label}
                      </button>
                    );
                  })}
                  {w.jump && (
                    <button className={styles.jump} onClick={() => jumpTo(w.jump.tab, w.jump.id)}>Notes: {w.jump.label} →</button>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ))}
      <p className={styles.foot}>Week topics follow the specialization&apos;s published structure (3 courses, 10 weeks). If Coursera reorders anything, trust Coursera.</p>
    </div>
  );
}
