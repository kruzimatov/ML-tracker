import ConfirmReset from "./ConfirmReset";
import styles from "./ui.module.css";

export default function ProgressRow({ done, total, color = "var(--teal)", onReset, unit = "" }) {
  return (
    <div className={styles.progress}>
      <div className={styles.bar}><div className={styles.fill} style={{ width: `${total ? (done / total) * 100 : 0}%`, background: color }} /></div>
      <span className={styles.count}>{done}/{total}{unit}</span>
      {onReset && <ConfirmReset onConfirm={onReset} />}
    </div>
  );
}
