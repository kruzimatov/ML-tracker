import { isRight } from "@/lib/exam";
import { LEVELS, TOPIC } from "./exam/topics";
import styles from "./ExamTab.module.css";

const KIND = { mcq: "Choose one", output: "Predict the output", bug: "Spot the bug", calc: "Calculate", open: "Interview" };

export function Rich({ text }) {
  return text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}

export default function ExamQuestion({ q, pick, reveal, onPick }) {
  const cls = (i) => {
    if (!reveal) return pick === i ? styles.chosen : "";
    if (i === q.answer) return styles.right;
    return pick === i ? styles.wrong : styles.dim;
  };
  const ok = reveal && isRight(q, pick);

  return (
    <div className={styles.question}>
      <div className={styles.meta}>
        {TOPIC[q.topic].name}
        {q.level ? <span className={styles[`lv${q.level}`]}>{LEVELS[q.level]}</span> : null}
        <span>{KIND[q.kind]}</span>
      </div>
      <p className={styles.qText}><Rich text={q.q} /></p>
      {q.data && <pre className={`${styles.code} ${styles.data}`}>{q.data}</pre>}
      {q.code && <pre className={styles.code}>{q.code}</pre>}

      {q.kind === "calc" ? (
        <input className={`${styles.calc} ${reveal ? (ok ? styles.right : styles.wrong) : ""}`} inputMode="decimal" placeholder="Your answer"
          value={pick ?? ""} disabled={reveal} onChange={(e) => onPick(e.target.value)} autoFocus />
      ) : q.options && (
        <div className={styles.opts}>
          {q.order.map((i, n) => (
            <button key={i} className={`${styles.opt} ${cls(i)}`} disabled={reveal} onClick={() => onPick(i)}>
              <kbd>{n + 1}</kbd>
              <span className={q.kind === "output" ? styles.mono : ""}><Rich text={q.options[i]} /></span>
            </button>
          ))}
        </div>
      )}

      {reveal && (
        <div className={`${styles.why} ${ok ? styles.whyOk : styles.whyBad}`}>
          <b>{ok ? "Correct." : q.kind === "calc" ? `Answer: ${q.answer}.` : "Not quite."}</b> <Rich text={q.why} />
        </div>
      )}
    </div>
  );
}
