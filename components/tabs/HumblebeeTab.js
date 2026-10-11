"use client";

import { HUMBLEBEE, HUMBLEBEE_TOTAL } from "./humblebeeData";
import PageHead from "../ui/PageHead";
import ProgressRow from "../ui/ProgressRow";
import styles from "./HumblebeeTab.module.css";

export default function HumblebeeTab({ state, setState }) {
  const done = Object.values(state).filter(Boolean).length;
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <PageHead kicker={<>HumbleBeeAI</>} title={<>{HUMBLEBEE.title}</>} color="var(--accent)" />
      <p className={styles.by}>{HUMBLEBEE.by}</p>
      <a className={styles.open} href={HUMBLEBEE.url} target="_blank" rel="noopener noreferrer">Open curriculum ↗</a>
      <span className={styles.deadline}>Target: {HUMBLEBEE.deadline}</span>

      <div className={styles.progWrap}>
        <ProgressRow done={done} total={HUMBLEBEE_TOTAL} color="var(--accent)" onReset={() => setState({})} />
      </div>

      {HUMBLEBEE.modules.map((m, mi) => (
        <section key={mi} className={styles.module}>
          <h2 className={styles.h2}>{m.name}</h2>
          {m.sections.map((sec, si) => {
            const secDone = sec.items.filter((_, ii) => state[`${mi}-${si}-${ii}`]).length;
            return (
              <div key={si} className={styles.section}>
                <div className={styles.secHead}>
                  {sec.heading}
                  <span className={styles.secCount}>{secDone}/{sec.items.length}</span>
                </div>
                <div className={styles.items}>
                  {sec.items.map((item, ii) => {
                    const k = `${mi}-${si}-${ii}`;
                    return (
                      <button key={ii} onClick={() => toggle(k)} className={`${styles.item} ${state[k] ? styles.done : ""}`}>
                        <i className={styles.box} />{item}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      ))}
      <p className={styles.foot}>Topics follow HumbleBeeAI open curriculum. Pick 2 electives from the 6 listed. If curriculum updates, trust the source.</p>
    </div>
  );
}
