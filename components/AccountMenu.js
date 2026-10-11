"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createInviteCode, getSyncState, login, logout, signup, subscribeSync } from "@/lib/sync";
import styles from "./BackupMenu.module.css";

const OFF = { user: null, owner: false, setup: false, status: "off", error: "" };
const LABEL = { ok: "Synced", syncing: "Syncing…", offline: "Offline, will sync when back online", error: "Sync failed, retrying on next focus", off: "Not syncing" };
const COLOR = { ok: "var(--green)", syncing: "var(--gold)", offline: "var(--text3)", error: "var(--red)", off: "var(--text3)" };

function Invite() {
  const [invite, setInvite] = useState(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState("");
  const make = async () => {
    setErr("");
    setCopied(false);
    try {
      setInvite(await createInviteCode());
    } catch (e) {
      setErr(e.message);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(invite.code);
      setCopied(true);
    } catch {}
  };
  return (
    <>
      <button className={styles.act} onClick={make}>{invite ? "Make another invite code" : "Invite a friend"}</button>
      {invite && (
        <div className={styles.code}>
          <b>{invite.code}</b>
          <button className={styles.ghost} onClick={copy}>{copied ? "Copied" : "Copy"}</button>
          <p className={styles.p}>One use, valid {invite.days} days. Your friend picks Create account, enters this code, and chooses their own username and password.</p>
        </div>
      )}
      {err && <div className={styles.err}>{err}</div>}
    </>
  );
}

export default function AccountMenu() {
  const sync = useSyncExternalStore(subscribeSync, getSyncState, () => OFF);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("in");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const close = (e) => e.detail !== "account" && setOpen(false);
    window.addEventListener("mc-menu", close);
    return () => window.removeEventListener("mc-menu", close);
  }, []);

  const creating = sync.setup || mode === "up";
  const toggle = () => {
    if (!open) window.dispatchEvent(new CustomEvent("mc-menu", { detail: "account" }));
    setOpen((o) => !o);
    setMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const [u, p] = [String(f.get("username")), String(f.get("password"))];
    if (creating && p !== String(f.get("password2"))) return setMsg("Passwords do not match.");
    setBusy(true);
    setMsg("");
    try {
      if (creating) await signup(u, p, String(f.get("invite") || ""));
      else await login(u, p);
      setOpen(sync.setup);
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
              <div className={styles.h}>{sync.user}{sync.owner && <span className={styles.tag}>owner</span>}</div>
              <p className={styles.p}><span style={{ color: COLOR[status] }}>●</span> {LABEL[status]}</p>
              <p className={styles.p}>Progress, hours and notes sync between every device you sign in on.</p>
              {sync.owner && <Invite />}
              <button className={styles.act} disabled={busy} onClick={async () => { setBusy(true); await logout(); setBusy(false); setOpen(false); }}>
                Sign out
              </button>
              <p className={styles.p}>Signing out removes the data from this device only. It stays on your account.</p>
            </>
          ) : (
            <form onSubmit={onSubmit} key={creating ? "up" : "in"}>
              <div className={styles.h}>{sync.setup ? "Create the first account" : creating ? "Create account" : "Sign in to sync"}</div>
              <p className={styles.p}>
                {sync.setup
                  ? "No accounts exist yet. The first account becomes the owner and can invite friends."
                  : creating
                    ? "You need an invite code from the owner."
                    : "Your progress on this device is added to your account the first time you sign in."}
              </p>
              {creating && !sync.setup && (
                <input className={styles.field} name="invite" placeholder="Invite code, e.g. ABCD-EFGH" aria-label="Invite code" required autoCapitalize="characters" autoComplete="off" />
              )}
              <input className={styles.field} name="username" autoComplete="username" placeholder={creating ? "Choose a username" : "Username"} aria-label="Username" required autoCapitalize="none" />
              <input className={styles.field} name="password" type="password" autoComplete={creating ? "new-password" : "current-password"} placeholder={creating ? "Choose a password (10+ characters)" : "Password"} aria-label="Password" required minLength={creating ? 10 : undefined} />
              {creating && <input className={styles.field} name="password2" type="password" autoComplete="new-password" placeholder="Repeat password" aria-label="Repeat password" required />}
              <button className={styles.act} type="submit" disabled={busy}>{busy ? "Please wait…" : creating ? "Create account" : "Sign in"}</button>
              {msg && <div className={styles.err}>{msg}</div>}
              {!sync.setup && (
                <button type="button" className={styles.link} onClick={() => { setMode(creating ? "in" : "up"); setMsg(""); }}>
                  {creating ? "Have an account? Sign in" : "Have an invite code? Create account"}
                </button>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
