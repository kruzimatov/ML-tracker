import styles from "./TopBar.module.css";

export default function TopBar({ tabs, active, onSelect, done, total }) {
  return (
    <header className={styles.bar}>
      <div className={styles.brand}>Mission Control</div>
      <nav className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${active === t.id ? styles.active : ""}`}
            onClick={() => onSelect(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div className={styles.agg}>
        <b>{done}</b> / {total} done
      </div>
    </header>
  );
}
