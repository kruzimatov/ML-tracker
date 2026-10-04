"use client";

import { useEffect, useState } from "react";
import { useStored } from "@/lib/useStored";
import { PHASES, PRO_TOTAL, SKIPS, UI } from "./proRoadmapData";
import styles from "./ProRoadmapTab.module.css";

const t = (v, lang) => (v == null ? "" : typeof v === "string" ? v : v[lang] || v.en || "");
const tl = (v, lang) => (!v ? [] : Array.isArray(v) ? v : v[lang] || v.en || []);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const boldOnly = (s) => esc(s).replace(/&lt;b&gt;/g, "<b>").replace(/&lt;\/b&gt;/g, "</b>");
const ADDED = { en: "Added for you", uz: "Siz uchun qo'shilgan" };
const NOTE = { en: "For you", uz: "Siz uchun" };

export default function ProRoadmapTab({ state, setState, jumpTo }) {
  const [cfg, setCfg] = useStored("mc-prolang");
  const lang = cfg.lang === "uz" ? "uz" : "en";
  const [currentId, setCurrentId] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const all = [...PHASES.flatMap((p) => p.topics), ...SKIPS];
  const current = all.find((x) => x.id === currentId) || null;
  const done = PHASES.flatMap((p) => p.topics).filter((x) => !x.nocheck && state[x.id]).length;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setCurrentId(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (id) => setState((s) => { const n = { ...s }; if (n[id]) delete n[id]; else n[id] = true; return n; });
  const kindLabel = (k) => t({ must: UI.kMust, deep: UI.kDeep, goal: UI.kGoal, skip: UI.kSkip }[k] || UI.kMust, lang);

  const node = (x) => (
    <button key={x.id} type="button" onClick={() => setCurrentId(x.id)}
      className={`${styles.node} ${styles[x.kind]} ${x.nocheck ? styles.nocheck : ""} ${state[x.id] ? styles.isDone : ""}`}>
      <span className={styles.tick} aria-hidden="true">{state[x.id] ? "✓" : ""}</span>
      <span className={styles.lbl}>
        {t(x.label, lang)}
        {x.hint && <span className={styles.hint}>{t(x.hint, lang)}</span>}
        {x.added && <span className={styles.added}>★ {t(ADDED, lang)}</span>}
      </span>
    </button>
  );

  return (
    <div className={`${styles.root} mc-fade`}>
      <header className={styles.top}>
        <div className={styles.topInner}>
          <div className={styles.brand}>
            <h1 className={styles.h1}>ML Roadmap</h1>
            <span className={styles.sub}>{t(UI.subtitle, lang)}</span>
            <span className={styles.langs}>
              <button className={`${styles.btn} ${lang === "uz" ? styles.on : ""}`} onClick={() => setCfg({ lang: "uz" })}>UZ</button>
              <button className={`${styles.btn} ${lang === "en" ? styles.on : ""}`} onClick={() => setCfg({ lang: "en" })}>EN</button>
            </span>
          </div>
          <div className={styles.barWrap}>
            <div className={styles.bar}><i style={{ width: `${(done / PRO_TOTAL) * 100}%` }} /></div>
            <span className={styles.count}>{done} / {PRO_TOTAL}</span>
            {confirmReset ? (
              <>
                <button className={styles.btn} onClick={() => { setState({}); setCurrentId(null); setConfirmReset(false); }}>{t(UI.resetConfirm, lang)} ✓</button>
                <button className={styles.btn} onClick={() => setConfirmReset(false)}>×</button>
              </>
            ) : (
              <button className={styles.btn} onClick={() => setConfirmReset(true)}>{t(UI.reset, lang)}</button>
            )}
          </div>
        </div>
      </header>

      <div className={styles.legend}>
        {[["must", UI.lgMust], ["deep", UI.lgDeep], ["goal", UI.lgGoal], ["skip", UI.lgSkip], ["done", UI.lgDone]].map(([k, txt]) => (
          <span key={k} className={styles.lg}><i className={`${styles.sw} ${styles[`sw_${k}`]}`} />{t(txt, lang)}</span>
        ))}
      </div>
      <p className={styles.intro} dangerouslySetInnerHTML={{ __html: boldOnly(t(UI.intro, lang)) }} />
      <p className={styles.intro} dangerouslySetInnerHTML={{ __html: boldOnly(t(UI.introAdded, lang)) }} />

      <main className={styles.roadmap}>
        {PHASES.map((p) => (
          <section key={p.id} className={styles.phase}>
            <div className={styles.phaseHead}>
              <div className={`${styles.pnode} ${p.hi ? styles.hi : ""}`}>
                <div className={styles.ph}>{t(p.label, lang)}</div>
                <div className={styles.pt}>{t(p.title, lang)}</div>
                <div className={styles.pw}>{t(p.weeks, lang)}</div>
              </div>
            </div>
            <div className={styles.rows}>
              {p.topics.map((x) => (
                <div key={x.id} className={`${styles.row} ${x.side === "r" ? styles.rowR : styles.rowL}`}>{node(x)}</div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <section className={styles.skipwrap}>
        <div className={styles.skiphead}>
          <div className={styles.pnode}>
            <div className={styles.ph}>{t(UI.skipHeadTop, lang)}</div>
            <div className={styles.pt}>{t(UI.skipHeadTitle, lang)}</div>
            <div className={styles.pw}>{t(UI.skipHeadSub, lang)}</div>
          </div>
        </div>
        <div className={styles.skiplist}>{SKIPS.map(node)}</div>
      </section>
      <p className={styles.savenote}>{t(UI.saveLocal, lang)} · {t(UI.footer, lang)}</p>

      <div className={`${styles.scrim} ${current ? styles.open : ""}`} onClick={() => setCurrentId(null)} />
      <aside className={`${styles.panel} ${current ? styles.open : ""}`} role="dialog" aria-modal="true" aria-hidden={!current}>
        {current && (
          <>
            <div className={styles.pHead}>
              <div>
                <span className={`${styles.pKind} ${styles[`k_${current.kind}`]}`}>{kindLabel(current.kind)}</span>
                <h2 className={styles.h2}>{t(current.label, lang)}</h2>
              </div>
              <button className={styles.pClose} onClick={() => setCurrentId(null)} aria-label="Close">×</button>
            </div>
            <div className={styles.pBody}>
              <p>{t(current.why, lang)}</p>
              {current.note && <div className={styles.forYou}><b>{t(NOTE, lang)}:</b> {t(current.note, lang).replace(/^(For you|Siz uchun):\s*/, "")}</div>}
              {tl(current.learn, lang).length > 0 && (<><h3>{t(UI.secLearn, lang)}</h3><ul>{tl(current.learn, lang).map((i) => <li key={i}>{i}</li>)}</ul></>)}
              {tl(current.fails, lang).length > 0 && (<><h3>{t(UI.secFails, lang)}</h3><div className={styles.warn}><ul>{tl(current.fails, lang).map((i) => <li key={i}>{i}</li>)}</ul></div></>)}
              {tl(current.res, lang).length > 0 && (<><h3>{t(UI.secRes, lang)}</h3><ul>{tl(current.res, lang).map((i) => <li key={i}>{i}</li>)}</ul></>)}
              {current.jump && (
                <button className={styles.jump} onClick={() => jumpTo(current.jump.tab, current.jump.id)}>{current.jump.label} →</button>
              )}
            </div>
            {!current.nocheck && (
              <div className={styles.pFoot}>
                <button className={`${styles.pToggle} ${state[current.id] ? styles.pDone : ""}`} onClick={() => toggle(current.id)}>
                  {state[current.id] ? t(UI.undone, lang) : t(UI.markDone, lang)}
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
