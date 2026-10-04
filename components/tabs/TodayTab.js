"use client";

import { useSyncExternalStore } from "react";
import { PLAN_START, WEEKS } from "./roadmapData";
import { CHAPTERS } from "./patternsData";
import { MODULES } from "./scratchData";
import { COURSE, SQUARES } from "./courseData";
import { toISO, todayISO } from "@/lib/dates";
import BackupNudge from "./BackupNudge";
import { NoteCard, PastNotes, ReviewCard, dueReviews } from "./TodayExtras";
import PageHead from "../ui/PageHead";
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

export default function TodayTab({ roadmap, setRoadmap, patterns, scratch, course, pro, notes, setNotes, review, setReview, hours, setHours, totalDone, jumpTo }) {
  const dayN = useSyncExternalStore(noop, dayNow, () => NOT_READY);
  if (dayN === NOT_READY) return <div className={`${styles.wrap} mc-fade`} />;

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
  const courseWeeks = COURSE.courses.flatMap((c, ci) => c.weeks.map((w, wi) => ({ ci, wi, t: w.t })));
  const nextCourse = courseWeeks.find((w) => SQUARES.some((sq) => !course[`${w.ci}-${w.wi}:${sq.key}`]));
  const iso = todayISO();
  const due = dueReviews(patterns, scratch, pro, review, iso);
  const weekReviewDay = started && !over && today % 7 >= 5;
  const hoursToday = hours[iso];
  const weekHours = Array.from({ length: 7 }).reduce((n, _, d) => n + (hours[toISO(dateOf(wk * 7 + d))] || 0), 0);
  const allHours = Object.values(hours).reduce((n, x) => n + x, 0);
  const setTodayHours = (raw) =>
    setHours((h) => {
      const next = { ...h };
      const v = parseFloat(raw);
      if (Number.isFinite(v) && v >= 0) next[iso] = Math.min(16, Math.round(v * 4) / 4);
      else delete next[iso];
      return next;
    });
  const todayKey = dayKey(today);
  const deliverKey = `${wk}:deliverable`;

  return (
    <div className={styles.wrap}>
      <PageHead kicker={<>{fmt(dateOf(today), { weekday: "long", month: "long", day: "numeric" })}</>} title={<>
        {!started ? `Plan starts ${fmt(PLAN_START)}` : over ? "Plan complete" : `Day ${today + 1} of ${DAYS}`}
      </>} color="var(--teal)" />
      <p className={styles.sub}>Week {wk + 1} · {week.deliverable}</p>

      <div className={styles.tiles}>
        <div className={styles.tile}><span className={styles.n}>{streak}</span><span className={styles.l}>day streak</span></div>
        <div className={styles.tile}><span className={styles.n}>{best}</span><span className={styles.l}>best streak</span></div>
        <div className={styles.tile}><span className={styles.n}>{doneDays}<small>/{elapsed}</small></span><span className={styles.l}>days checked in</span></div>
        <div className={styles.tile}><span className={styles.n}>{jobsThisWeek}<small>/5</small></span><span className={styles.l}>jobs this week · {jobsTotal} total</span></div>
        <div className={styles.tile}><span className={styles.n}>{weekHours}<small>h</small></span><span className={styles.l}>hours this week · {allHours}h total</span></div>
      </div>

      <BackupNudge hasProgress={totalDone > 0} />

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
            <label className={styles.hours}>
              <span>Hours worked today</span>
              <input type="number" min="0" max="16" step="0.25" inputMode="decimal" value={hoursToday ?? ""} onChange={(e) => setTodayHours(e.target.value)} placeholder="0" />
            </label>
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

      <ReviewCard due={due} setReview={setReview} jumpTo={jumpTo} />
      <NoteCard id={iso} title="Today's note" prompt="What did I learn today? What is stuck? What will I do first tomorrow?" notes={notes} setNotes={setNotes} />
      {weekReviewDay && (
        <NoteCard id={`w${wk + 1}`} title={`Week ${wk + 1} review`} prompt="Did I ship the deliverable? What slowed me down? What changes next week? (Do not restart. Continue.)" notes={notes} setNotes={setNotes} />
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
          {nextCourse ? (
            <button className={styles.nextCard} onClick={() => jumpTo("course", null)}>
              <span className={styles.nl}>Andrew Ng · Course {nextCourse.ci + 1}, Week {nextCourse.wi + 1}</span>
              <span className={styles.nt}>{nextCourse.t}</span>
            </button>
          ) : <div className={styles.nextCard}><span className={styles.nt}>Course complete</span></div>}
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
      <PastNotes notes={notes} skip={iso} />
    </div>
  );
}
