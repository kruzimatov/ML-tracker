"use client";

import { useEffect, useRef, useState } from "react";
import { isRight } from "@/lib/exam";
import { TOPIC } from "./exam/topics";
import ExamQuestion, { Rich } from "./ExamQuestion";
import styles from "./ExamTab.module.css";

const TITLE = { practice: "Practice", weak: "Weak spots", mock: "Mock test", interview: "Interview" };
const clock = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;
const shown = (q, v) => (v === undefined || v === "" ? "no answer" : q.kind === "calc" ? v : q.options[v]);

export default function ExamSession({ items, mode, deadline, onRecord, onExit }) {
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState({});
  const [results, setResults] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const picksRef = useRef(picks);
  const mock = mode === "mock";
  const q = items[i];
  const pick = picks[q.id];

  const finishMock = (p) => {
    const r = Object.fromEntries(items.map((x) => [x.id, isRight(x, p[x.id])]));
    items.forEach((x) => onRecord(x.id, r[x.id]));
    setResults(r);
    setFinished(true);
  };

  useEffect(() => { picksRef.current = picks; }, [picks]);
  useEffect(() => {
    if (!deadline || finished) return;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= deadline) finishMock(picksRef.current);
    }, 1000);
    return () => clearInterval(t);
  });

  const mark = (ok) => {
    onRecord(q.id, ok);
    setResults((r) => ({ ...r, [q.id]: ok }));
  };
  const choose = (v) => {
    setPicks((p) => ({ ...p, [q.id]: v }));
    if (!mock && q.kind !== "calc") {
      setRevealed(true);
      mark(isRight(q, v));
    }
  };
  const check = () => {
    setRevealed(true);
    mark(isRight(q, pick));
  };
  const go = (to) => {
    if (to >= items.length) return mock ? finishMock(picks) : setFinished(true);
    setI(to);
    setRevealed(false);
  };
  const grade = (ok) => {
    mark(ok);
    go(i + 1);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (finished || e.target.matches?.("input, textarea")) return;
      const n = Number(e.key);
      if (q.order && n >= 1 && n <= q.order.length && (mock || !revealed)) choose(q.order[n - 1]);
      else if (e.key === "Enter" && (mock || revealed)) go(i + 1);
      else if (e.key === "Enter" && q.kind === "open") setRevealed(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (finished) return <Results items={items} picks={picks} results={results} mode={mode} onExit={onExit} />;

  const unanswered = items.filter((x) => picks[x.id] === undefined || picks[x.id] === "").length;
  return (
    <div className={styles.session}>
      <div className={styles.bar}>
        <span className={styles.mode}>{TITLE[mode]}</span>
        <span>{i + 1} / {items.length}</span>
        {deadline && <span className={deadline - now < 300000 ? styles.late : ""}>{clock(Math.max(0, deadline - now))}</span>}
        <button className={styles.ghost} onClick={onExit}>Quit</button>
      </div>
      <div className={styles.track}><i style={{ width: `${((i + (revealed || mock ? 1 : 0)) / items.length) * 100}%` }} /></div>

      <section className={styles.card}>
        {q.kind === "open" ? (
          <>
            <ExamQuestion q={q} />
            <p className={styles.hint}>Answer out loud or on paper first, then reveal.</p>
            {revealed ? (
              <>
                <ul className={styles.model}>{q.a.map((line, n) => <li key={n}><Rich text={line} /></li>)}</ul>
                <div className={styles.row}>
                  <button className={styles.ok} onClick={() => grade(true)}>Got it</button>
                  <button className={styles.rusty} onClick={() => grade(false)}>Rusty</button>
                </div>
              </>
            ) : <button className={styles.primary} onClick={() => setRevealed(true)}>Reveal model answer</button>}
          </>
        ) : (
          <>
            <ExamQuestion q={q} pick={pick} reveal={!mock && revealed} onPick={choose} />
            <div className={styles.row}>
              {mock && i > 0 && <button className={styles.ghost} onClick={() => go(i - 1)}>Back</button>}
              {!mock && q.kind === "calc" && !revealed && <button className={styles.primary} disabled={!pick} onClick={check}>Check</button>}
              {(mock || revealed) && (
                <button className={styles.primary} onClick={() => go(i + 1)}>
                  {i + 1 < items.length ? "Next" : mock ? `Finish${unanswered ? ` · ${unanswered} unanswered` : ""}` : "See results"}
                </button>
              )}
              {mock && i + 1 < items.length && <button className={styles.ghost} onClick={() => finishMock(picks)}>Finish now</button>}
            </div>
          </>
        )}
      </section>
      <p className={styles.keys}>Keys: 1-4 choose · Enter next</p>
    </div>
  );
}

function Results({ items, picks, results, mode, onExit }) {
  const done = items.filter((x) => x.id in results);
  const right = done.filter((x) => results[x.id]).length;
  const pct = done.length ? Math.round((right / done.length) * 100) : 0;
  const tally = done.reduce((m, x) => {
    const [r, n] = m[x.topic] || [0, 0];
    return { ...m, [x.topic]: [r + (results[x.id] ? 1 : 0), n + 1] };
  }, {});
  const byTopic = Object.entries(tally).map(([t, [r, n]]) => [t, r, n]);
  const missed = done.filter((x) => !results[x.id]);

  return (
    <div className={styles.session}>
      <section className={styles.card}>
        <h2 className={styles.h2}>{TITLE[mode]} result</h2>
        <div className={styles.score}>
          <span className={pct >= 80 ? styles.pass : styles.fail}>{pct}<small>%</small></span>
          <span className={styles.l}>{right} of {done.length} {mode === "interview" ? "got it" : "correct"}{mode === "mock" ? ` · ${pct >= 80 ? "pass level" : "aim for 80%+"}` : ""}</span>
        </div>
        <div className={styles.topics}>
          {byTopic.map(([t, r, n]) => (
            <div key={t} className={styles.trow}>
              <span>{TOPIC[t].name}</span>
              <div className={styles.tbar}><i style={{ width: `${(r / n) * 100}%` }} /></div>
              <b>{r}/{n}</b>
            </div>
          ))}
        </div>
        <button className={styles.primary} onClick={onExit}>Back to exam prep</button>
      </section>

      {missed.length > 0 && mode !== "interview" && (
        <section className={styles.card}>
          <h2 className={styles.h2}>Review what you missed</h2>
          {missed.map((x) => (
            <div key={x.id} className={styles.miss}>
              <p className={styles.qText}><Rich text={x.q} /></p>
              {x.code && <pre className={styles.code}>{x.code}</pre>}
              <p className={styles.yours}>Your answer: <Rich text={String(shown(x, picks[x.id]))} /></p>
              <p className={styles.correct}>Correct: <Rich text={String(x.kind === "calc" ? x.answer : x.options[x.answer])} /></p>
              <p className={styles.expl}><Rich text={x.why} /></p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
