"use client";

import { useSyncExternalStore } from "react";
import { PLAN_START, WEEKS } from "./roadmapData";
import { CHAPTERS } from "./patternsData";
import { MODULES } from "./scratchData";
import { COURSE, SQUARES } from "./courseData";
import { HUMBLEBEE } from "./humblebeeData";
import { PHASES } from "./proRoadmapData";
import { toISO, todayISO } from "@/lib/dates";
import { checkinDays, streaks, studiedDays } from "@/lib/stats";
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
const RING = 2 * Math.PI * 52;

function Ring({ value, goal }) {
  const hit = value >= goal;
  return (
    <label htmlFor="log-hours" className={`${styles.ring} ${hit ? styles.ringHit : ""}`} title="Log hours worked today">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" className={styles.track} />
        <circle cx="60" cy="60" r="52" className={styles.arc} strokeDasharray={RING} strokeDashoffset={RING * (1 - Math.min(value / goal, 1))} />
      </svg>
      <span className={styles.ringN}>{value}<small>h</small></span>
      <span className={styles.l}>of {goal}h goal</span>
    </label>
  );
}

export default function TodayTab({ roadmap, setRoadmap, patterns, scratch, course, pro, humblebee, counts, notes, setNotes, review, setReview, recall, setRecall, hours, setHours, goal, log, totalDone, jumpTo }) {
  const dayN = useSyncExternalStore(noop, dayNow, () => NOT_READY);
  if (dayN === NOT_READY) return <div className={`${styles.wrap} mc-fade`} />;

  const toggle = (key) => setRoadmap((s) => ({ ...s, [key]: !s[key] }));
  const checked = (n) => !!roadmap[dayKey(n)];
  const started = dayN >= 0;
  const over = dayN >= DAYS;
  const today = Math.min(Math.max(dayN, 0), DAYS - 1);
  const wk = Math.floor(today / 7);
  const week = WEEKS[wk];

  const { current: streak, best } = streaks(studiedDays({ hours, notes, log, checkins: checkinDays(roadmap, toISO(PLAN_START)) }), todayISO());
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
  const nextHb = HUMBLEBEE.modules
    .flatMap((m, mi) => m.sections.flatMap((sec, si) => sec.items.map((item, ii) => ({ mi, si, item, heading: sec.heading, k: `${mi}-${si}-${ii}` }))))
    .find((x) => !humblebee[x.k]);
  const nextPro = PHASES.flatMap((p) => p.topics.filter((x) => !x.nocheck).map((x) => ({ p, x }))).find(({ x }) => !pro[x.id]);
  const nextUp = [
    { tab: "course", id: null, label: nextCourse && `ML Course · C${nextCourse.ci + 1} W${nextCourse.wi + 1}`, title: nextCourse?.t, empty: "Course complete" },
    { tab: "patterns", id: nextPattern?.id, label: `Pattern · ${nextPattern?.num}`, title: nextPattern?.title, empty: "All patterns done" },
    { tab: "scratch", id: nextModule?.id, label: nextModule && `From Scratch · ${nextModule.track === "a" ? `M${nextModule.mod}` : `B${nextModule.mod - 8}`}`, title: nextModule?.name, empty: "All modules done" },
    { tab: "humblebee", id: nextHb && `hb-${nextHb.mi}-${nextHb.si}`, label: nextHb && `HumbleBee · M${nextHb.mi + 1} ${nextHb.heading}`, title: nextHb?.item, empty: "HumbleBee complete" },
    { tab: "pro", id: nextPro && `node-${nextPro.x.id}`, label: nextPro && `Full Roadmap · ${nextPro.p.label.en}`, title: nextPro?.x.label.en, empty: "Full Roadmap complete" },
  ];
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

      <div className={styles.hero}>
        <Ring value={hoursToday || 0} goal={goal.day ?? 4} />
        <div className={`${styles.tile} ${streak > 0 ? styles.live : ""}`}><span className={styles.n}>{streak}</span><span className={styles.l}>study streak</span></div>
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
              <input id="log-hours" type="number" min="0" max="16" step="0.25" inputMode="decimal" value={hoursToday ?? ""} onChange={(e) => setTodayHours(e.target.value)} placeholder="0" />
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

      <section className={styles.card}>
        <h2 className={styles.h2}>Also today</h2>
        <div className={styles.next}>
          {nextUp.map((n) => n.title ? (
            <button key={n.tab} className={styles.nextCard} onClick={() => jumpTo(n.tab, n.id)}>
              <span className={styles.nl}>{n.label}<b>{counts[n.tab]}</b></span>
              <span className={styles.nt}>{n.title}</span>
            </button>
          ) : <div key={n.tab} className={styles.nextCard}><span className={styles.nt}>{n.empty}</span></div>)}
        </div>
      </section>

      <ReviewCard due={due} setReview={setReview} setRecall={setRecall} jumpTo={jumpTo} />
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

      <PastNotes notes={notes} skip={iso} />
    </div>
  );
}
