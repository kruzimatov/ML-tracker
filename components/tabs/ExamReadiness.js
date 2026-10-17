import { stats, weak } from "@/lib/exam";
import { INTERVIEW, QUESTIONS, TOPICS } from "./exam/topics";
import styles from "./ExamTab.module.css";

// Weakest = lowest accuracy among topics you have tried; untouched topics come next, in curriculum order.
function weakest(exam) {
  const rows = TOPICS.map((t) => ({ t, s: stats(QUESTIONS.filter((q) => q.topic === t.id), exam) }));
  const tried = rows.filter((r) => r.s.seen).sort((a, b) => a.s.right / a.s.seen - b.s.right / b.s.seen);
  const low = tried.find((r) => r.s.right < r.s.seen);
  if (low) return `${low.t.name} · ${Math.round((low.s.right / low.s.seen) * 100)}% of tried`;
  const fresh = rows.find((r) => !r.s.seen);
  return fresh ? `${fresh.t.name} · not started` : null;
}

export default function ExamReadiness({ exam, jumpTo }) {
  const all = stats(QUESTIONS, exam);
  const iv = stats(INTERVIEW, exam);
  const next = weakest(exam);
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>Exam readiness</h2>
      <div className={styles.ready}>
        <span className={all.ready >= 80 ? styles.pass : styles.fail}>{all.ready}<small>%</small></span>
        <div className={styles.readyInfo}>
          <span>{all.seen}/{all.total} tried · {weak(QUESTIONS, exam).length} wrong last time · interview {iv.right}/{iv.total}</span>
          {next && <span>Focus next: <b>{next}</b></span>}
        </div>
        <button className={styles.primary} onClick={() => jumpTo("exam", null)}>Open exam prep</button>
      </div>
    </section>
  );
}
