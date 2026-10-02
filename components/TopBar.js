import BackupMenu from "./BackupMenu";
import { toggleTheme, useTheme } from "@/lib/theme";
import styles from "./TopBar.module.css";

export default function TopBar({ tabs, active, onSelect, done, total }) {
  const theme = useTheme();
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
            {t.badge && <span className={styles.badge}>{t.badge}</span>}
          </button>
        ))}
      </nav>
      <div className={styles.agg}>
        <b>{done}</b> / {total} done
      </div>
      <BackupMenu />
      <button className={styles.theme} onClick={toggleTheme} aria-label="Toggle light/dark theme" title="Toggle theme">
        {theme === "light" ? "☾" : "☀"}
      </button>
    </header>
  );
}
