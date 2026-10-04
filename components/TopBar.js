import BackupMenu from "./BackupMenu";
import ReminderMenu from "./ReminderMenu";
import { toggleTheme, useTheme } from "@/lib/theme";
import styles from "./TopBar.module.css";

export default function TopBar({ groups, activeGroup, activeTab, onGroup, onTab, done, total }) {
  const theme = useTheme();
  const group = groups.find((g) => g.id === activeGroup);
  return (
    <header className={styles.bar}>
      <div className={styles.row1}>
        <div className={styles.brand}>Mission Control</div>
        <nav className={styles.groups} aria-label="Sections">
          {groups.map((g) => (
            <button key={g.id} className={`${styles.group} ${g.id === activeGroup ? styles.active : ""}`} onClick={() => onGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </nav>
        <div className={styles.tools}>
          <ReminderMenu />
          <BackupMenu />
          <button className={styles.theme} onClick={toggleTheme} aria-label="Toggle light/dark theme" title="Toggle theme">
            {theme === "light" ? "☾" : "☀"}
          </button>
        </div>
      </div>
      <div className={styles.row2}>
        <nav className={styles.subs} aria-label={group.label}>
          {group.tabs.length > 1 ? (
            group.tabs.map((t) => (
              <button key={t.id} className={`${styles.sub} ${t.id === activeTab ? styles.subActive : ""}`} onClick={() => onTab(t.id)}>
                {t.label}
                {t.badge && <span className={styles.badge}>{t.badge}</span>}
              </button>
            ))
          ) : (
            <span className={styles.desc}>{group.desc}</span>
          )}
        </nav>
        <div className={styles.agg}><b>{done}</b> / {total}</div>
      </div>
    </header>
  );
}
