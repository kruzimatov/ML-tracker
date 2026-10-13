import styles from "./ui.module.css";

export default function PageHead({ kicker, title, color = "var(--teal)", children }) {
  return (
    <header className={styles.head}>
      <div className={styles.kicker} style={{ color }}><i className={styles.dot} aria-hidden="true" />{kicker}</div>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  );
}
