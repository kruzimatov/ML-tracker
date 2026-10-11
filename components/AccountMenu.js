"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getSyncState, login, logout, subscribeSync } from "@/lib/sync";
import styles from "./BackupMenu.module.css";

const OFF = { user: null, status: "off", error: "" };
const LABEL = { ok: "Synced", syncing: "Syncing…", offline: "Offline, will sync when back online", error: "Sync failed, retrying on next focus", off: "Not syncing" };
const COLOR = { ok: "var(--green)", syncing: "var(--gold)", offline: "var(--text3)", error: "var(--red)", off: "var(--text3)" };

export default function AccountMenu() {
  const sync = useSyncExternalStore(subscribeSync, getSyncState, () => OFF);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const close = (e) => e.detail !== "account" && setOpen(false);
    window.addEventListener("mc-menu", close);
    return () => window.removeEventListener("mc-menu", close);
  }, []);

  const toggle = () => {
    if (!open) window.dispatchEvent(new CustomEvent("mc-menu", { detail: "account" }));
    setOpen((o) => !o);
    setMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setMsg("");
    try {
      await login(String(f.get("username")), String(f.get("password")));
      setOpen(false);
    } catch (err) {
      setMsg(err.message);
    }
    setBusy(false);
  };

  const status = sync.user ? sync.status : "off";
  return (
    <div className={styles.root}>
      <button className={styles.btn} onClick={toggle} aria-label={sync.user ? `Account: ${sync.user}, ${LABEL[status]}` : "Sign in to sync"} title={sync.user ? `${sync.user} · ${LABEL[status]}` : "Sign in to sync"} style={{ color: COLOR[status] }}>
        ☁
      </button>
      {open && (
        <div className={styles.pop}>
          {sync.user ? (
            <>
              <div className={styles.h}>{sync.user}</div>
              <p className={styles.p}><span style={{ color: COLOR[status] }}>●</span> {LABEL[status]}</p>
              <p className={styles.p}>Progress, hours and notes sync between every device you sign in on.</p>
              <button className={styles.act} disabled={busy} onClick={async () => { setBusy(true); await logout(); setBusy(false); setOpen(false); }}>
                Sign out
              </button>
              <p className={styles.p}>Signing out removes the data from this device only. It stays on your account.</p>
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <div className={styles.h}>Sign in to sync</div>
              <p className={styles.p}>Your progress on this device is added to your account the first time you sign in.</p>
              <input className={styles.field} name="username" autoComplete="username" placeholder="Username" aria-label="Username" required autoCapitalize="none" />
              <input className={styles.field} name="password" type="password" autoComplete="current-password" placeholder="Password" aria-label="Password" required />
              <button className={styles.act} type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
              {msg && <div className={styles.err}>{msg}</div>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
