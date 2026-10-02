"use client";

import { useEffect, useState } from "react";
import "../content.css";
import DocShell from "./DocShell";
import { CHAPTERS } from "./patternsData";
import { EXTRAS } from "./patternsExtras";
import Extras from "./Extras";
import Html from "./Html";
import styles from "./PatternsTab.module.css";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const TRACKS = {
  dsa: { label: "DSA Patterns", color: "var(--accent)", end: (n) => `End of DSA track · ${n} / ${n} patterns` },
  sd: { label: "System Design", color: "var(--teal)", end: (n) => `End of System Design track · ${n} / ${n} topics` },
};
const subsOf = (c) => {
  const x = EXTRAS[c.id] || {};
  return [
    ...c.subs,
    ...(x.example ? [{ id: `${c.id}-example`, title: "Worked example" }] : []),
    ...(x.followups ? [{ id: `${c.id}-followups`, title: "Interview follow-ups" }] : []),
  ];
};
const trackCount = (t) => CHAPTERS.filter((c) => c.track === t).length;

export default function PatternsTab({ state, setState }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({});
  const [active, setActive] = useState(CHAPTERS[0].id);

  useEffect(() => {
    const onScroll = () => {
      let cur = CHAPTERS[0].id;
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= 120) cur = c.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (id) => setState((s) => ({ ...s, [id]: !s[id] }));
  const doneOf = (t) => CHAPTERS.filter((c) => c.track === t && state[c.id]).length;
  const q = query.trim().toLowerCase();

  const sidebar = CHAPTERS.map((c, i) => {
    const showDivider = !q && (i === 0 || CHAPTERS[i - 1].track !== c.track);
    if (q && !c.title.toLowerCase().includes(q)) return null;
    const open = expanded[c.id];
    return (
      <div key={c.id}>
        {showDivider && <div className={styles.divider}>{TRACKS[c.track].label}</div>}
        <div className={`${styles.chapterItem} ${styles[c.track]}`}>
          <div className={`${styles.row} ${active === c.id ? styles.active : ""}`}>
            <input type="checkbox" className={styles.cb} checked={!!state[c.id]} onChange={() => toggle(c.id)} aria-label={`Mark ${c.title} done`} />
            <span className={styles.num}>{c.num}</span>
            <button className={styles.itemTitle} onClick={() => scrollTo(c.id)}>{c.title}</button>
            <button className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`} onClick={() => setExpanded((e) => ({ ...e, [c.id]: !e[c.id] }))} aria-label="Toggle sections">▶</button>
          </div>
          {open && (
            <div className={styles.subs}>
              {subsOf(c).map((s) => (
                <button key={s.id} className={styles.sub} onClick={() => scrollTo(s.id)}>{s.title}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <DocShell
      title="Pattern Manual"
      sub="DSA & System Design"
      barColor="var(--accent)"
      onReset={() => setState({})}
      progress={[
        { label: "Patterns", value: doneOf("dsa"), total: trackCount("dsa"), color: "var(--accent)" },
        { label: "System Design", value: doneOf("sd"), total: trackCount("sd"), color: "var(--teal)" },
      ]}
      search={{ value: query, onChange: setQuery }}
      footer={<>Track order matters — go in sequence.<br />Progress saved in this browser only.</>}
      sidebar={sidebar}
    >
      <div className={styles.masthead}>
        <div className={styles.kicker}>Field manual · DSA + System Design</div>
        <h1 className={styles.title}>Pattern Manual</h1>
        <p className={styles.lede}>
          Sixteen problem-solving patterns that cover most of LeetCode, and ten system design mechanisms that cover most
          interviews. Not a course — a reference you return to after every problem: what the pattern looks like, when it
          fires, the template, the trap that costs people the round.
        </p>
        <div className={styles.statRow}>
          <div><span className={styles.statN}>16</span><span className={styles.statL}>DSA patterns</span></div>
          <div><span className={styles.statN}>10</span><span className={styles.statL}>system design topics</span></div>
          <div><span className={styles.statN}>Python</span><span className={styles.statL}>templates</span></div>
        </div>
      </div>

      {CHAPTERS.map((c, i) => {
        const last = i === CHAPTERS.length - 1 || CHAPTERS[i + 1].track !== c.track;
        return (
          <section key={c.id} id={c.id} className={styles.chapter}>
            <div className={styles.eyebrow} style={{ color: TRACKS[c.track].color }}>{c.eyebrow}</div>
            <h1 className={styles.chTitle}>{c.title}</h1>
            <Html html={c.body} variant="patterns" />
            <Extras id={c.id} variant="patterns" {...EXTRAS[c.id]} />
            <div className={styles.pn}>
              {i > 0 ? <button onClick={() => scrollTo(CHAPTERS[i - 1].id)}>← {CHAPTERS[i - 1].title}</button> : <span />}
              {i < CHAPTERS.length - 1 ? <button onClick={() => scrollTo(CHAPTERS[i + 1].id)}>{CHAPTERS[i + 1].title} →</button> : <span />}
            </div>
            {last && <div className={styles.trackEnd}>{TRACKS[c.track].end(trackCount(c.track))}</div>}
          </section>
        );
      })}
    </DocShell>
  );
}
