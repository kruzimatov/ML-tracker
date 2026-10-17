"use client";

import { useState } from "react";
import { todayISO } from "@/lib/dates";
import { last, record, shuffle, stats, weak } from "@/lib/exam";
import { INTERVIEW, LEVELS, QUESTIONS, TOPICS } from "./exam/topics";
import ExamSession from "./ExamSession";
import PageHead from "../ui/PageHead";
import styles from "./ExamTab.module.css";

const MOCK_SIZE = 30;
const SEC_PER_Q = 90;
const prep = (qs) => qs.map((q) => (q.options ? { ...q, order: shuffle(q.options.map((_, i) => i)) } : q));
// Wrong last time first, then never seen, then the rest.
const priority = (exam) => (q) => { const l = last(exam[q.id]); return l === 0 ? 0 : l === undefined ? 1 : 2; };

export default function ExamTab({ exam, setExam }) {
  const [picked, setPicked] = useState(() => new Set(TOPICS.map((t) => t.id)));
  const [level, setLevel] = useState(0);
  const [count, setCount] = useState(10);
  const [session, setSession] = useState(null);

  const onRecord = (id, ok) => setExam((s) => record(s, id, ok, todayISO()));
  if (session) return <div className={`${styles.wrap} mc-fade`}><ExamSession key={session.id} mode={session.mode} items={session.items} deadline={session.deadline} onRecord={onRecord} onExit={() => setSession(null)} /></div>;

  const inTopics = (q) => picked.has(q.topic);
  const pool = QUESTIONS.filter((q) => inTopics(q) && (!level || q.level === level));
  const weakQs = weak(QUESTIONS.filter(inTopics), exam);
  const ivQs = INTERVIEW.filter(inTopics);
  const all = stats(QUESTIONS, exam);
  const iv = stats(INTERVIEW, exam);
  const mockQs = QUESTIONS.filter(inTopics);
  const mockN = Math.min(MOCK_SIZE, mockQs.length);

  const start = (mode, qs, timed) => setSession({ id: Date.now(), mode, items: prep(qs), deadline: timed ? Date.now() + qs.length * SEC_PER_Q * 1000 : null });
  const practice = () => start("practice", shuffle(pool).sort((a, b) => priority(exam)(a) - priority(exam)(b)).slice(0, count || pool.length));
  const toggle = (id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOn = picked.size === TOPICS.length;

  return (
    <div className={`${styles.wrap} mc-fade`}>
      <PageHead kicker={<>HumbleBee · test, then interview</>} title={<>Exam prep</>} color="var(--accent)" />
      <p className={styles.sub}>{QUESTIONS.length} test questions and {INTERVIEW.length} interview questions across {TOPICS.length} topics. Every code output was checked by running it.</p>

      <div className={styles.tiles}>
        <div className={`${styles.tile} ${all.ready >= 80 ? styles.live : ""}`}><span className={styles.n}>{all.ready}<small>%</small></span><span className={styles.l}>test readiness</span></div>
        <div className={styles.tile}><span className={styles.n}>{all.seen}<small>/{all.total}</small></span><span className={styles.l}>questions tried</span></div>
        <div className={styles.tile}><span className={styles.n}>{weak(QUESTIONS, exam).length}</span><span className={styles.l}>wrong last time</span></div>
        <div className={styles.tile}><span className={styles.n}>{iv.right}<small>/{iv.total}</small></span><span className={styles.l}>interview got it</span></div>
      </div>

      <div className={styles.modes}>
        <section className={styles.card}>
          <h2 className={styles.h2}>Practice</h2>
          <p className={styles.desc}>Instant feedback and an explanation after every answer. Wrong and new questions come first.</p>
          <div className={styles.chips}>
            {LEVELS.map((name, n) => <button key={n} className={`${styles.chip} ${level === n ? styles.chipOn : ""}`} onClick={() => setLevel(n)}>{name || "All levels"}</button>)}
          </div>
          <div className={styles.chips}>
            {[10, 20, 0].map((n) => <button key={n} className={`${styles.chip} ${count === n ? styles.chipOn : ""}`} onClick={() => setCount(n)}>{n || "All"}</button>)}
          </div>
          <button className={styles.primary} disabled={!pool.length} onClick={practice}>Start practice · {count ? Math.min(count, pool.length) : pool.length}</button>
        </section>

        <section className={styles.card}>
          <h2 className={styles.h2}>Mock test</h2>
          <p className={styles.desc}>{mockN} random questions, {Math.round((mockN * SEC_PER_Q) / 60)} minutes, all levels mixed. No answers until the end, like the real test.</p>
          <button className={styles.primary} disabled={!mockN} onClick={() => start("mock", shuffle(mockQs).slice(0, mockN), true)}>Start mock test</button>
        </section>

        <section className={styles.card}>
          <h2 className={styles.h2}>Weak spots</h2>
          <p className={styles.desc}>Only questions you got wrong last time. Answer right once and they leave this list.</p>
          <button className={styles.primary} disabled={!weakQs.length} onClick={() => start("weak", shuffle(weakQs))}>{weakQs.length ? `Retry ${weakQs.length}` : "Nothing weak yet"}</button>
        </section>

        <section className={styles.card}>
          <h2 className={styles.h2}>Interview</h2>
          <p className={styles.desc}>Explain-it questions. Say your answer out loud, reveal the model answer, grade yourself honestly.</p>
          <button className={styles.primary} disabled={!ivQs.length} onClick={() => start("interview", shuffle(ivQs).sort((a, b) => priority(exam)(a) - priority(exam)(b)))}>Start interview · {ivQs.length}</button>
        </section>
      </div>

      <section className={styles.card}>
        <h2 className={styles.h2}>Topics <button className={styles.link} onClick={() => setPicked(new Set(allOn ? [] : TOPICS.map((t) => t.id)))}>{allOn ? "Select none" : "Select all"}</button></h2>
        <div className={styles.topics}>
          {TOPICS.map((t) => {
            const s = stats(QUESTIONS.filter((q) => q.topic === t.id), exam);
            const w = weak(QUESTIONS.filter((q) => q.topic === t.id), exam).length;
            return (
              <label key={t.id} className={`${styles.trow} ${styles.pick}`}>
                <input type="checkbox" checked={picked.has(t.id)} onChange={() => toggle(t.id)} />
                <span>{t.name}<em>{t.mod}{w ? ` · ${w} weak` : ""}</em></span>
                <div className={styles.tbar}><i style={{ width: `${s.ready}%` }} /></div>
                <b>{s.right}/{s.total}</b>
              </label>
            );
          })}
        </div>
      </section>
    </div>
  );
}
