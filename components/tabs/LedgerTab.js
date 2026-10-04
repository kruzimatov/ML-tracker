"use client";

import { SECTIONS } from "./ledgerData";
import ConfirmReset from "../ui/ConfirmReset";
import PageHead from "../ui/PageHead";
import styles from "./LedgerTab.module.css";

export default function LedgerTab({ state, setState }) {
  const toggle = (k) => setState((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <div className={styles.masthead}>
        <PageHead kicker={<>Index · not a replacement</>} title={<>The Ledger</>} color="var(--gold)" />
        <p className={styles.lede}>
          A tracking layer over two guides that already exist and already have the depth — worked numeric traces,
          from-scratch derivations, interview questions, a full hands-on build. This page adds nothing to their
          content. It only tracks which of the 68 chapters across both are actually done.
        </p>
        <div className={styles.sourcePaths}>
          <b>ML_GUIDE.html</b>~/MachineLearning/ML PPTS/ML_GUIDE.html — 32 chapters, classic ML &amp; deep learning
          <b className={styles.second}>AI_ENGINEERING.html</b>~/Downloads/AI_ENGINEERING.html — same 32 + RAG theory (15) + hands-on RAG build (21)
        </div>
        <p className={styles.note}>
          This page can&apos;t open local files for you — open them yourself in your editor or browser. Checking a
          square here only tracks progress; it doesn&apos;t jump into the file.
        </p>
        <div className={styles.controls}><ConfirmReset onConfirm={() => setState({})} label="Reset all" /></div>
      </div>

      {SECTIONS.map((sec) => {
        const done = sec.items.filter(([n]) => state[`${sec.key}:${n}`]).length;
        const pct = (done / sec.items.length) * 100;
        return (
          <div key={sec.key} id={sec.id} className={styles.section}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionTitle}>
                <span className={`${styles.dot} ${styles[sec.accent]}`} />{sec.title}
              </div>
              <div className={styles.frac}><b>{done}</b>/{sec.items.length}</div>
            </div>
            <div className={styles.source}>{sec.source}</div>
            <div className={styles.pbar}><div className={`${styles.pbarFill} ${styles[sec.accent]}`} style={{ width: `${pct}%` }} /></div>
            <div className={styles.grid}>
              {sec.items.map(([num, title]) => {
                const k = `${sec.key}:${num}`;
                return (
                  <button key={k} title={title} onClick={() => toggle(k)}
                    className={`${styles.card} ${state[k] ? `${styles.done} ${styles[`done_${sec.accent}`]}` : ""}`}>
                    <div className={styles.num}><span>{num}</span><span className={styles.check} /></div>
                    <div className={styles.cardTitle}>{title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.footnote}>
        Chapter numbers and titles are read directly from both files&apos; own headings — nothing here is guessed. The
        RAG build guide&apos;s own numbering skips from 13-BOB to 15-BOB in the source file; that gap is preserved here
        rather than renumbered.
      </div>
    </div>
  );
}
