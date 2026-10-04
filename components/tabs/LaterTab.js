"use client";

import { useState } from "react";
import { GATE, LATER_TOTAL, PHASES, SKIP } from "./laterData";
import styles from "./LaterTab.module.css";

const KIND = { must: "Core", deep: "Depth", goal: "Deliverable" };

export default function LaterTab({ state, setState, jumpTo }) {
  const [open, setOpen] = useState({});
  const done = Object.values(state).filter(Boolean).length;
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <div className={styles.kicker}>Next stage · not yet</div>
      <h1 className={styles.title}>After January</h1>
      <p className={styles.lede}>
        What to learn once the first backend-plus-AI job or the two portfolio projects are done: five phases from honest
        evaluation to running models in production. Adapted from a roadmap you found, re-ordered for where you are now.
        Phase order and week counts are suggestions, not promises.
      </p>

      <div className={styles.gate}>
        <b>Start here only when all three are true</b>
        <ul>{GATE.map((g) => <li key={g}>{g}</li>)}</ul>
      </div>

      <div className={styles.progress}>
        <div className={styles.bar}><div className={styles.fill} style={{ width: `${(done / LATER_TOTAL) * 100}%` }} /></div>
        <span>{done}/{LATER_TOTAL}</span>
        <button className={styles.reset} onClick={() => setState({})}>Reset</button>
      </div>

      {PHASES.map((p) => (
        <section key={p.id} className={styles.phase}>
          <div className={styles.ph}>
            <span className={styles.pid}>Phase {p.id}</span>
            <h2 className={styles.h2}>{p.name}</h2>
            <span className={styles.weeks}>{p.weeks}</span>
          </div>
          <p className={styles.blurb}>{p.blurb}</p>
          {p.topics.map((t) => (
            <div key={t.id} className={`${styles.topic} ${state[t.id] ? styles.done : ""}`}>
              <div className={styles.row}>
                <input type="checkbox" className={styles.cb} checked={!!state[t.id]} onChange={() => toggle(t.id)} aria-label={`Mark ${t.title} done`} />
                <button className={styles.head} onClick={() => setOpen((o) => ({ ...o, [t.id]: !o[t.id] }))}>
                  <span className={`${styles.kind} ${styles[t.kind]}`}>{KIND[t.kind]}</span>
                  <span className={styles.tt}>{t.title}</span>
                  <span className={styles.hint}>{t.hint}</span>
                </button>
              </div>
              {open[t.id] && (
                <div className={styles.body}>
                  <p>{t.why}</p>
                  <div className={styles.cols}>
                    <div><h3>What to learn</h3><ul>{t.learn.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div><h3>Where it breaks</h3><ul>{t.fails.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  </div>
                  {(t.res.length > 0 || t.jump) && (
                    <div className={styles.links}>
                      {t.res.map((r) => <a key={r.url} className={styles.chip} href={r.url} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>)}
                      {t.jump && <button className={`${styles.chip} ${styles.int}`} onClick={() => jumpTo(t.jump.tab, t.jump.id)}>{t.jump.label} →</button>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      ))}

      <section className={styles.skip}>
        <h2 className={styles.h2}>Skip on purpose</h2>
        <ul>{SKIP.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>
    </div>
  );
}
