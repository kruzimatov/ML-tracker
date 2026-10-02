"use client";

import { useRef, useState } from "react";
import { applyBackup, downloadBackup, parseBackup } from "@/lib/backup";
import styles from "./BackupMenu.module.css";

const fmt = (iso) => (iso ? new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "never");

export default function BackupMenu() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [pending, setPending] = useState(null);
  const [last, setLast] = useState("");
  const fileRef = useRef(null);

  const toggle = () => {
    if (!open) {
      try {
        setLast(localStorage.getItem("mc-last-export") || "");
      } catch {}
    }
    setOpen((o) => !o);
    setMsg("");
    setPending(null);
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setPending(await parseBackup(file));
      setMsg("");
    } catch (err) {
      setPending(null);
      setMsg(err.message);
    }
  };

  return (
    <div className={styles.root}>
      <button className={styles.btn} onClick={toggle} aria-label="Backup and restore progress" title="Backup / restore">⇅</button>
      {open && (
        <div className={styles.pop}>
          <div className={styles.h}>Backup</div>
          <p className={styles.p}>Your progress lives only in this browser. Export a file now and then.</p>
          <button className={styles.act} onClick={() => { downloadBackup(); setLast(new Date().toISOString()); setMsg("Backup downloaded."); }}>Export backup (.json)</button>
          <button className={styles.act} onClick={() => fileRef.current?.click()}>Import backup…</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onFile} />
          {pending && (
            <div className={styles.confirm}>
              <p>Replace your current progress with this backup?<br />
                <b>{pending.checks}</b> checks · exported {fmt(pending.exportedAt)}</p>
              <div className={styles.row}>
                <button className={styles.danger} onClick={() => { applyBackup(pending.data); setPending(null); setMsg("Backup restored."); }}>Replace</button>
                <button className={styles.ghost} onClick={() => setPending(null)}>Cancel</button>
              </div>
            </div>
          )}
          {msg && <div className={styles.msg}>{msg}</div>}
          <div className={styles.last}>Last export: {fmt(last)}</div>
        </div>
      )}
    </div>
  );
}
