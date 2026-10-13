"use client";

import { useState, useSyncExternalStore } from "react";
import AccountMenu from "./AccountMenu";
import BackupMenu from "./BackupMenu";
import ReminderMenu from "./ReminderMenu";
import { toggleTheme, useTheme } from "@/lib/theme";
import styles from "./Sidebar.module.css";

const isSolo = (g) => g.tabs.length === 1 && g.tabs[0].label === g.label;
const noop = () => () => {};
const useKeyLabel = () => useSyncExternalStore(noop, () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"), () => "Ctrl K");

function Tools({ done, total }) {
  const theme = useTheme();
  return (
    <div className={styles.tools}>
      <span className={styles.agg}><b>{done}</b> / {total}</span>
      <AccountMenu />
      <ReminderMenu />
      <BackupMenu />
      <button className={styles.icon} onClick={toggleTheme} aria-label="Toggle light/dark theme" title="Toggle theme">
        {theme === "light" ? "☾" : "☀"}
      </button>
    </div>
  );
}

export default function Sidebar({ groups, activeTab, onTab, done, total, onSearch, rail, onRail }) {
  const [sheet, setSheet] = useState(null);
  const KEY = useKeyLabel();
  const go = (id) => {
    setSheet(null);
    onTab(id);
  };
  const tapGroup = (g) => (g.tabs.length === 1 ? go(g.tabs[0].id) : setSheet(sheet === g.id ? null : g.id));
  const extra = groups.filter((g) => g.more).flatMap((g) => g.tabs);
  const open = sheet === "more" ? { id: "more", label: "More", tabs: extra } : groups.find((g) => g.id === sheet);

  return (
    <>
      <aside className={`${styles.side} ${rail ? styles.rail : ""}`} aria-label="Main navigation">
        <div className={styles.head}>
          {!rail && <span className={styles.brand}><i className={styles.led} aria-hidden="true" />Mission Control</span>}
          <button className={styles.icon} onClick={onRail} aria-label={rail ? "Expand sidebar" : "Collapse sidebar"} title={rail ? "Expand" : "Collapse"}>
            {rail ? "»" : "«"}
          </button>
        </div>
        <button className={styles.jump} onClick={onSearch} title={`Jump to (${KEY})`}>
          {rail ? "⌕" : <>Jump to… <kbd>{KEY}</kbd></>}
        </button>
        <nav className={styles.nav}>
          {groups.map((g) => (
            <div key={g.id} className={styles.group}>
              {!isSolo(g) && !rail && <div className={styles.label}>{g.label}</div>}
              {g.tabs.map((t) => (
                <button key={t.id} className={`${styles.tab} ${t.id === activeTab ? styles.on : ""}`} onClick={() => onTab(t.id)} title={rail ? t.label : undefined} aria-current={t.id === activeTab ? "page" : undefined}>
                  {rail ? t.short : <><span>{t.label}</span>{t.badge && <small>{t.badge}</small>}</>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        {!rail && <Tools done={done} total={total} />}
      </aside>

      {open && (
        <>
          <div className={styles.scrim} onClick={() => setSheet(null)} />
          <div className={styles.sheet} role="dialog" aria-label={open.label}>
            {open.tabs.map((t) => (
              <button key={t.id} className={`${styles.tab} ${t.id === activeTab ? styles.on : ""}`} onClick={() => go(t.id)}>
                <span>{t.label}</span>{t.badge && <small>{t.badge}</small>}
              </button>
            ))}
            {open.id === "more" && <Tools done={done} total={total} />}
          </div>
        </>
      )}

      <nav className={styles.bottom} aria-label="Main navigation">
        {groups.filter((g) => !g.more).map((g) => (
          <button key={g.id} className={g.tabs.some((t) => t.id === activeTab) ? styles.on : ""} onClick={() => tapGroup(g)}>
            {g.label}
          </button>
        ))}
        <button onClick={() => { setSheet(null); onSearch(); }}>Search</button>
        <button className={sheet === "more" || extra.some((t) => t.id === activeTab) ? styles.on : ""} onClick={() => setSheet(sheet === "more" ? null : "more")}>More</button>
      </nav>
    </>
  );
}
