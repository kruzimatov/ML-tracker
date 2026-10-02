"use client";

import { useSyncExternalStore } from "react";
import { PLAN_START, WEEKS } from "./roadmapData";
import { CHAPTERS } from "./patternsData";
import { MODULES } from "./scratchData";
import styles from "./TodayTab.module.css";

const NOT_READY = -1000000;
const DAYS = WEEKS.length * 7;
const noop = () => () => {};
const dayNow = () => Math.floor((new Date() - PLAN_START) / 86400000);
const dateOf = (n) => {
  const d = new Date(PLAN_START);
  d.setDate(d.getDate() + n);
  return d;
};
const fmt = (d, o = { month: "short", day: "numeric" }) => d.toLocaleDateString("en-US", o);
const dayKey = (n) => `${Math.floor(n / 7)}:day:${n % 7}`;

export default function TodayTab({ roadmap, setRoadmap, patterns, scratch, jumpTo }) {
  const dayN = useSyncExternalStore(noop, dayNow, () => NOT_READY);
  if (dayN === NOT_READY) return <div className={styles.wrap} />;

  const toggle = (key) => setRoadmap((s) => ({ ...s, [key]: !s[key] }));
  const checked = (n) => !!roadmap[dayKey(n)];
  const started = dayN >= 0;
  const over = dayN >= DAYS;
  const today = Math.min(Math.max(dayN, 0), DAYS - 1);
  const wk = Math.floor(today / 7);
  const week = WEEKS[wk];

  let streak = 0;
  if (started) {
    let n = today;
    if (!checked(n)) n--;
    while (n >= 0 && checked(n)) { streak++; n--; }
  }
  let best = 0, run = 0;
  for (let n = 0; n <= (started ? today : -1); n++) {
    run = checked(n) ? run + 1 : 0;
    best = Math.max(best, run);
  }
  const elapsed = started ? today + 1 : 0;
  const doneDays = Array.from({ length: elapsed }).filter((_, n) => checked(n)).length;
  const jobsThisWeek = Array.from({ length: 5 }).filter((_, j) => roadmap[`${wk}:job:${j}`]).length;
  const jobsTotal = Object.keys(roadmap).filter((k) => k.includes(":job:") && roadmap[k]).length;

  const logJob = () =>
    setRoadmap((s) => {
      const next = [0, 1, 2, 3, 4].find((j) => !s[`${wk}:job:${j}`]);
      return next === undefined ? s : { ...s, [`${wk}:job:${next}`]: true };
    });

  const nextPattern = CHAPTERS.find((c) => !patterns[c.id]);
  const nextModule = MODULES.find(
    (m) => ["learn", "derive", "build", "apply", "teach"].filter((ms) => scratch[`${m.mod}:${ms}`]).length < 5
  );
  const todayKey = dayKey(today);
  const deliverKey = `${wk}:deliverable`;

  return (
    <div className={styles.wrap}>
      <div className={styles.kicker}>{fmt(dateOf(today), { weekday: "long", month: "long", day: "numeric" })}</div>
      <h1 className={styles.title}>
        {!started ? `Plan starts ${fmt(PLAN_START)}` : over ? "Plan complete" : `Day ${today + 1} of ${DAYS}`}
      </h1>
      <p className={styles.sub}>Week {wk + 1} · {week.deliverable}</p>

      <div className={styles.tiles}>
        <div className={styles.tile}><span className={styles.n}>{streak}</span><span className={styles.l}>day streak</span></div>
        <div className={styles.tile}><span className={styles.n}>{best}</span><span className={styles.l}>best streak</span></div>
        <div className={styles.tile}><span className={styles.n}>{doneDays}<small>/{elapsed}</small></span><span className={styles.l}>days checked in</span></div>
        <div className={styles.tile}><span className={styles.n}>{jobsThisWeek}<small>/5</small></span><span className={styles.l}>jobs this week · {jobsTotal} total</span></div>
      </div>

      {started && (
        <section className={styles.card}>
          <h2 className={styles.h2}>Today</h2>
          <div className={styles.actions}>
            <button className={`${styles.big} ${roadmap[todayKey] ? styles.bigDone : ""}`} onClick={() => toggle(todayKey)}>
              {roadmap[todayKey] ? "✓ Checked in today" : "Mark today done"}
            </button>
            <button className={styles.ghost} onClick={logJob} disabled={jobsThisWeek >= 5}>
              {jobsThisWeek >= 5 ? "5/5 applications this week" : "+ Log a job application"}
            </button>
            <button className={`${styles.ghost} ${roadmap[deliverKey] ? styles.ghostDone : ""}`} onClick={() => toggle(deliverKey)}>
              {roadmap[deliverKey] ? "✓ " : ""}Deliverable: {week.deliverable}
            </button>
          </div>
          <ol className={styles.how}>{week.how.map((s, i) => <li key={i}>{s}</li>)}</ol>
          <div className={styles.links}>
            {week.resources.map((r) => (
              <a key={r.url} className={styles.chip} href={r.url} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>
            ))}
            {week.jump && <button className={`${styles.chip} ${styles.chipInt}`} onClick={() => jumpTo(week.jump.tab, week.jump.id)}>Open this week&apos;s topic →</button>}
            <button className={`${styles.chip} ${styles.chipInt}`} onClick={() => jumpTo("roadmap", `week-${wk}`)}>Full week →</button>
          </div>
        </section>
      )}

      <section className={styles.card}>
        <h2 className={styles.h2}>13 weeks</h2>
        <div className={styles.heat}>
          {WEEKS.map((_, w) => (
            <div key={w} className={styles.col} title={`Week ${w + 1}`}>
              {Array.from({ length: 7 }).map((__, d) => {
                const n = w * 7 + d;
                const cls = checked(n) ? styles.hDone : n === dayN ? styles.hToday : n > dayN ? styles.hFuture : styles.hMissed;
                return <div key={d} className={`${styles.cell} ${cls}`} title={`${fmt(dateOf(n))}${checked(n) ? " · done" : ""}`} />;
              })}
            </div>
          ))}
        </div>
        <div className={styles.legend}>
          <span><i className={`${styles.cell} ${styles.hDone}`} />checked in</span>
          <span><i className={`${styles.cell} ${styles.hMissed}`} />missed</span>
          <span><i className={`${styles.cell} ${styles.hToday}`} />today</span>
          <span><i className={`${styles.cell} ${styles.hFuture}`} />upcoming</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.h2}>Up next</h2>
        <div className={styles.next}>
          {nextPattern ? (
            <button className={styles.nextCard} onClick={() => jumpTo("patterns", nextPattern.id)}>
              <span className={styles.nl}>Next pattern · {nextPattern.num}</span>
              <span className={styles.nt}>{nextPattern.title}</span>
            </button>
          ) : <div className={styles.nextCard}><span className={styles.nt}>All patterns done</span></div>}
          {nextModule ? (
            <button className={styles.nextCard} onClick={() => jumpTo("scratch", nextModule.id)}>
              <span className={styles.nl}>Next module · {nextModule.track === "a" ? `M${nextModule.mod}` : `B${nextModule.mod - 8}`}</span>
              <span className={styles.nt}>{nextModule.name}</span>
            </button>
          ) : <div className={styles.nextCard}><span className={styles.nt}>All modules done</span></div>}
        </div>
      </section>
    </div>
  );
}
