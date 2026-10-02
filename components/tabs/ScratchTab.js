"use client";

import "../content.css";
import DocShell from "./DocShell";
import { MODULES } from "./scratchData";
import { EXAMPLES } from "./scratchExtras";
import Extras from "./Extras";
import Html from "./Html";
import styles from "./ScratchTab.module.css";

const MILESTONES = ["learn", "derive", "build", "apply", "teach"];
const LABEL = { learn: "L", derive: "D", build: "B", apply: "A", teach: "T" };
const scrollTo = (id, behavior = "smooth") => document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
const rowTag = (m) => (m.track === "a" ? `M${m.mod}` : `B${m.mod - 8}`);
const TRACK_NAME = { a: "Math & Classic ML", b: "FastAPI + RAG" };
const aMods = MODULES.filter((m) => m.track === "a");
const bMods = MODULES.filter((m) => m.track === "b");

export default function ScratchTab({ state, setState }) {
  const key = (mod, ms) => `${mod}:${ms}`;
  const toggle = (mod, ms) => setState((s) => ({ ...s, [key(mod, ms)]: !s[key(mod, ms)] }));
  const modDone = (mod) => MILESTONES.filter((ms) => state[key(mod, ms)]).length;
  const trackDone = (mods) => mods.reduce((n, m) => n + modDone(m.mod), 0);

  const square = (m, ms) => (
    <button
      key={ms}
      title={ms}
      onClick={() => toggle(m.mod, ms)}
      className={`${styles.sq} ${state[key(m.mod, ms)] ? (m.track === "a" ? styles.doneA : styles.doneB) : ""}`}
    />
  );

  const sidebar = MODULES.map((m, i) => (
    <div key={m.id}>
      {(i === 0 || MODULES[i - 1].track !== m.track) && <div className={styles.divider}>{TRACK_NAME[m.track]}</div>}
      <button className={styles.link} onClick={() => scrollTo(m.id)}>
        <span className={`${styles.num} ${m.track === "a" ? styles.numA : styles.numB}`}>{rowTag(m)}</span>
        <span>{m.name}</span>
      </button>
    </div>
  ));

  return (
    <DocShell
      title="From Scratch"
      sub="Math, ML & the RAG build"
      barColor="var(--gold)"
      onReset={() => setState({})}
      progress={[
        { label: "Math & Classic ML", value: trackDone(aMods), total: aMods.length * 5, color: "var(--gold)" },
        { label: "FastAPI + RAG", value: trackDone(bMods), total: bMods.length * 5, color: "var(--teal)" },
      ]}
      footer={<>Each square: Learn · Derive · Build · Apply · Teach.<br />Saved in this browser only.</>}
      sidebar={sidebar}
    >
      <div className={styles.masthead}>
        <div className={styles.kicker}>Field manual · Math, ML &amp; Backend-AI build</div>
        <h1 className={styles.title}>From Scratch</h1>
        <p className={styles.lede}>
          Two tracks running in parallel. <strong>Math &amp; Classic ML</strong> follows your course — every model gets
          rewritten in NumPy from memory before you move on. <strong>FastAPI + RAG</strong> is the October–December
          build plan: Python, FastAPI, embeddings, and a real RAG feature shipped into Kitobon. Five milestones per
          topic, one grid, no guessing what&apos;s next.
        </p>
        <div className={styles.statRow}>
          <div><span className={styles.statN}>{aMods.length}</span><span className={styles.statL}>math &amp; ML modules</span></div>
          <div><span className={styles.statN}>{bMods.length}</span><span className={styles.statL}>FastAPI + RAG modules</span></div>
          <div><span className={styles.statN}>{MODULES.length * 5}</span><span className={styles.statL}>milestones total</span></div>
        </div>
      </div>

      <div className={styles.gridSection}>
        <div className={styles.legend}>
          <span><i className={`${styles.lg} ${styles.doneA}`} />Math &amp; Classic ML</span>
          <span><i className={`${styles.lg} ${styles.doneB}`} />FastAPI + RAG</span>
          <span>L = Learn · D = Derive · B = Build · A = Apply · T = Teach</span>
        </div>
        <div className={styles.gridWrap}>
          <table className={styles.gridTable}>
            <thead>
              <tr>
                <th className={styles.rowheadCol}>Module</th>
                {MILESTONES.map((ms) => <th key={ms}>{LABEL[ms]}</th>)}
                <th />
              </tr>
            </thead>
            <tbody>
              {MODULES.map((m, i) => (
                <GridRow key={m.id} m={m} first={i === 0 || MODULES[i - 1].track !== m.track} square={square} done={modDone(m.mod)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {MODULES.map((m, i) => {
        const last = i === MODULES.length - 1 || MODULES[i + 1].track !== m.track;
        const group = m.track === "a" ? aMods : bMods;
        return (
          <section key={m.id} id={m.id} className={styles.module}>
            <div className={`${styles.eyebrow} ${m.track === "a" ? styles.eyebrowA : styles.eyebrowB}`}>{m.eyebrow}</div>
            <h1 className={styles.modTitle}>{m.title}</h1>
            <div className={styles.checklist}>
              {MILESTONES.map((ms) => (
                <span key={ms} className={styles.mc}>
                  {square(m, ms)}
                  <span>{ms[0].toUpperCase() + ms.slice(1)}</span>
                </span>
              ))}
              <span className={styles.mcFrac}>{modDone(m.mod)}/5</span>
            </div>
            <Html html={m.body} variant="scratch" />
            <Extras id={m.id} variant="scratch" example={EXAMPLES[m.id]} />
            <div className={styles.pn}>
              {i > 0 ? <button onClick={() => scrollTo(MODULES[i - 1].id)}>← {MODULES[i - 1].name}</button> : <span />}
              {i < MODULES.length - 1 ? <button onClick={() => scrollTo(MODULES[i + 1].id)}>{MODULES[i + 1].name} →</button> : <span />}
            </div>
            {last && <div className={styles.trackEnd}>End of {TRACK_NAME[m.track]} · {group.length} / {group.length} modules</div>}
          </section>
        );
      })}
    </DocShell>
  );
}

function GridRow({ m, first, square, done }) {
  return (
    <>
      {first && (
        <tr className={styles.rowDivider}><td colSpan={7}>{TRACK_NAME[m.track]}</td></tr>
      )}
      <tr>
        <td className={styles.rowhead} onClick={() => scrollTo(m.id)}>
          <span className={styles.rn}>{rowTag(m)}</span>{m.name}
        </td>
        {MILESTONES.map((ms) => (
          <td key={ms} className={styles.cell}>{square(m, ms)}</td>
        ))}
        <td className={styles.frac}>{done}/5</td>
      </tr>
    </>
  );
}
