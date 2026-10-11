"use client";

import { useSyncExternalStore } from "react";
import { PLAN_START } from "./roadmapData";
import { INTERVALS, REVIEW_ITEMS, dueReviews } from "./TodayExtras";
import { toISO, todayISO } from "@/lib/dates";
import { checkinDays, doneSince, goalStats, heatColumns, isoOf, dayNum, recallRate, reviewForecast, streaks, studiedDays, weakest, weekTotals } from "@/lib/stats";
import PageHead from "../ui/PageHead";
import styles from "./ProgressTab.module.css";

const noop = () => () => {};
const ANCHOR = toISO(PLAN_START);
const short = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const long = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const h1 = (n) => Math.round(n * 10) / 10;
const ITEM = Object.fromEntries(REVIEW_ITEMS.map((it) => [it.rk, it]));

function Bars({ items, max, line, lineLabel, unit }) {
  return (
    <div className={styles.chart}>
      {line != null && <div className={styles.line} style={{ bottom: `calc(18px + (100% - 18px) * ${line / max})` }}><span>{lineLabel}</span></div>}
      {items.map((it) => (
        <div key={it.key} className={styles.col} title={`${it.label}: ${h1(it.v)}${unit}`}>
          <div className={`${styles.bar} ${it.hit ? styles.hit : ""}`} style={{ height: `${(it.v / max) * 100}%` }} />
          <span className={styles.x}>{it.tick || ""}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressTab({ hours, notes, roadmap, log, review, patterns, scratch, pro, goal, setGoal, tracks, done, recall, jumpTo }) {
  const today = useSyncExternalStore(noop, todayISO, () => null);
  if (!today) return <div className={styles.wrap} />;

  const daily = goal.day ?? 4;
  const weekly = daily * 7;
  const days = studiedDays({ hours, notes, log, checkins: checkinDays(roadmap, ANCHOR) });
  const streak = streaks(days, today);
  const g = goalStats(hours, daily, today);
  const weeks = weekTotals(hours, ANCHOR, today, 12);
  const [prev, cur] = weeks.slice(-2);
  const diff = h1(cur.total - prev.total);
  const items = doneSince(log, cur.start, done);
  const t = dayNum(today);
  const last30 = Array.from({ length: 30 }, (_, i) => isoOf(t - i)).filter((d) => days.has(d)).length;
  const firstLog = Object.keys(log).sort()[0];

  const cols = heatColumns(hours, days, ANCHOR, today, 26);
  const level = (c) => (c.future ? "f" : c.h >= daily ? 4 : c.h >= daily / 2 ? 3 : c.h > 0 ? 2 : c.studied ? 1 : 0);

  const forecast = reviewForecast(review, INTERVALS, today, 14);
  forecast[0] = dueReviews(patterns, scratch, pro, review, today).length;
  const wkMax = Math.max(weekly, ...weeks.map((w) => w.total)) * 1.1;
  const fMax = Math.max(4, ...forecast);
  const rate = recallRate(recall, today);
  const weak = weakest(recall).filter((w) => ITEM[w.rk]);

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <PageHead kicker={<>{long(today)}</>} title={<>Progress</>} color="var(--teal)" />
      <label className={styles.goal}>
        Daily goal
        <input type="number" min="0.5" max="16" step="0.5" inputMode="decimal" value={daily}
          onChange={(e) => { const v = parseFloat(e.target.value); if (v >= 0.5 && v <= 16) setGoal((s) => ({ ...s, day: v })); }} />
        h · {weekly} h a week
      </label>

      <div className={styles.tiles}>
        <div className={styles.tile}>
          <span className={styles.n}>{h1(cur.total)}<small> / {weekly} h</small></span>
          <span className={styles.l}>this week · <em className={diff >= 0 ? styles.up : styles.down}>{diff >= 0 ? "▲" : "▼"} {Math.abs(diff)} h vs last</em></span>
        </div>
        <div className={styles.tile}>
          <span className={styles.n}>{streak.current}<small> days</small></span>
          <span className={styles.l}>study streak · best {streak.best}</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.n}>{g.hit}<small> / {g.window}</small></span>
          <span className={styles.l}>days at {daily} h+ · best run {g.best}</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.n}>{items ?? "–"}</span>
          <span className={styles.l}>{items == null ? `items: tracking since ${short(firstLog || today)}` : "items done this week"}</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.n}>{last30}<small> / 30</small></span>
          <span className={styles.l}>days studied, last 30</span>
        </div>
      </div>

      <section className={styles.card}>
        <h2 className={styles.h2}>Study days · last 26 weeks</h2>
        <div className={styles.heatWrap} ref={(el) => { if (el) el.scrollLeft = el.scrollWidth; }}>
          <div className={styles.heat} style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
            {cols.map((col) => col.map((c) => (
              <i key={c.iso} className={styles[`l${level(c)}`]} title={c.future ? "" : `${long(c.iso)}: ${h1(c.h)} h${c.studied && !c.h ? " (studied, no hours logged)" : ""}`} />
            )))}
          </div>
        </div>
        <div className={styles.legend}>
          <span><i className={styles.l0} />none</span><span><i className={styles.l1} />studied, no hours</span>
          <span><i className={styles.l2} />under {daily / 2} h</span><span><i className={styles.l3} />under {daily} h</span><span><i className={styles.l4} />goal hit</span>
        </div>
      </section>

      <div className={styles.two}>
        <section className={styles.card}>
          <h2 className={styles.h2}>Hours per week</h2>
          <Bars unit=" h" max={wkMax} line={weekly} lineLabel={`${weekly} h`}
            items={weeks.map((w, i) => ({ key: w.start, v: w.total, hit: w.total >= weekly, label: `Week of ${short(w.start)}`, tick: i === 11 ? "now" : i % 3 === 2 ? short(w.start) : "" }))} />
        </section>
        <section className={styles.card}>
          <h2 className={styles.h2}>Reviews due · next 14 days</h2>
          <Bars unit=" due" max={fMax}
            items={forecast.map((v, i) => ({ key: i, v, label: i === 0 ? "Today" : long(isoOf(t + i)), tick: i === 0 ? "today" : i % 7 === 0 ? short(isoOf(t + i)) : "" }))} />
        </section>
      </div>

      <section className={styles.card}>
        <h2 className={styles.h2}>Recall</h2>
        {rate.pct == null && !weak.length ? (
          <p className={styles.empty}>No reviews answered yet. When a review comes up on Today, press Got it or Rusty and your recall shows here.</p>
        ) : (
          <div className={styles.recall}>
            <div className={styles.rate}>
              <span className={styles.big}>{rate.pct ?? "–"}<small>%</small></span>
              <span className={styles.l}>got it, last 30 days · {rate.got} of {rate.total}</span>
              <span className={styles.l}>all time {rate.allPct ?? "–"}%</span>
            </div>
            <div className={styles.weak}>
              <div className={styles.l}>Weakest · review these first</div>
              {weak.length ? weak.map((w) => (
                <button key={w.rk} className={styles.wrow} onClick={() => jumpTo(ITEM[w.rk].tab, ITEM[w.rk].id)}>
                  <span><b>{ITEM[w.rk].num}</b> {ITEM[w.rk].title}</span>
                  <em>{w.pct}% of {w.tries} · last rusty {short(w.lastMiss)}</em>
                </button>
              )) : <p className={styles.empty}>Nothing rusty yet.</p>}
            </div>
          </div>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.h2}>Completion by track</h2>
        <div className={styles.tracks}>
          {tracks.map((tr) => (
            <div key={tr.label} className={styles.track}>
              <span>{tr.label}</span>
              <div className={styles.tbar}><i style={{ width: `${(tr.done / tr.total) * 100}%` }} /></div>
              <b>{Math.round((tr.done / tr.total) * 100)}%</b>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
