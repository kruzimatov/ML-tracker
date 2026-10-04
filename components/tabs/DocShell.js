"use client";

import { useEffect, useRef, useState } from "react";
import ConfirmReset from "../ui/ConfirmReset";
import styles from "./DocShell.module.css";

export default function DocShell({ title, sub, onReset, progress, search, footer, sidebar, barColor, children }) {
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.root} mc-fade`}>
      <div ref={barRef} className={styles.bar} style={{ background: barColor }} />
      <button className={styles.toggle} onClick={() => setOpen((o) => !o)} aria-label="Toggle sidebar">☰</button>
      <nav className={`${styles.sidebar} ${open ? styles.open : ""}`} onClick={() => setOpen(false)}>
        <div className={styles.header} onClick={(e) => e.stopPropagation()}>
          <div className={styles.title}>{title}</div>
          <div className={styles.sub}>{sub}</div>
          <ConfirmReset onConfirm={onReset} />
        </div>
        <div className={styles.progress} onClick={(e) => e.stopPropagation()}>
          {progress.map((p) => (
            <div key={p.label}>
              <div className={styles.track}><span>{p.label}</span><b>{p.value}/{p.total}</b></div>
              <div className={styles.mini}><div className={styles.miniFill} style={{ width: `${(p.value / p.total) * 100}%`, background: p.color }} /></div>
            </div>
          ))}
        </div>
        {search && (
          <div className={styles.search} onClick={(e) => e.stopPropagation()}>
            <input type="text" placeholder="search topics..." value={search.value} onChange={(e) => search.onChange(e.target.value)} />
          </div>
        )}
        <div className={styles.items}>{sidebar}</div>
        <div className={styles.footer}>{footer}</div>
      </nav>
      <main className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </main>
    </div>
  );
}
