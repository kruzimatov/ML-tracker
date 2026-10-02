"use client";

import { useEffect, useState } from "react";
import { downloadDailyReminder } from "@/lib/ics";
import { isIOS, isStandalone, promptInstall, useInstallPrompt } from "@/lib/pwa";
import { useStored } from "@/lib/useStored";
import styles from "./ReminderMenu.module.css";

export default function ReminderMenu() {
  const [open, setOpen] = useState(false);
  const [perm, setPerm] = useState("default");
  const [info, setInfo] = useState({ standalone: false, ios: false });
  const [msg, setMsg] = useState("");
  const [rem, setRem] = useStored("mc-reminder");
  const installEvent = useInstallPrompt();
  const time = rem.time || "20:00";

  useEffect(() => {
    const close = (e) => e.detail !== "reminder" && setOpen(false);
    window.addEventListener("mc-menu", close);
    return () => window.removeEventListener("mc-menu", close);
  }, []);

  const toggle = () => {
    if (!open) {
      window.dispatchEvent(new CustomEvent("mc-menu", { detail: "reminder" }));
      setPerm(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
      setInfo({ standalone: isStandalone(), ios: isIOS() });
      setMsg("");
    }
    setOpen((o) => !o);
  };

  const enable = async (on) => {
    if (!on) return setRem((r) => ({ ...r, enabled: false }));
    if (typeof Notification === "undefined") return setMsg("This browser does not support notifications.");
    const p = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    setPerm(p);
    if (p !== "granted") return setMsg("Notifications are blocked. Allow them in the browser or phone settings.");
    setRem((r) => ({ ...r, enabled: true }));
  };

  return (
    <div className={styles.root}>
      <button className={styles.btn} onClick={toggle} aria-label="Install app and reminders" title="Install / reminders">🔔</button>
      {open && (
        <div className={styles.pop}>
          <div className={styles.h}>Phone app &amp; reminders</div>

          <div className={styles.sec}>
            <b>Install</b>
            {info.standalone ? <p>Installed. You are running the app.</p>
              : installEvent ? <button className={styles.act} onClick={promptInstall}>Install app</button>
              : info.ios ? <p>iPhone: tap Share, then <b>Add to Home Screen</b>.</p>
              : <p>Use the browser menu: <b>Install app</b> (Chrome/Edge) or <b>Add to Home screen</b>.</p>}
          </div>

          <div className={styles.sec}>
            <b>Daily reminder time</b>
            <input className={styles.time} type="time" value={time} onChange={(e) => setRem((r) => ({ ...r, time: e.target.value || "20:00" }))} />
            <button className={styles.act} onClick={() => downloadDailyReminder(time, window.location.origin)}>
              Add to calendar (.ics)
            </button>
            <p>Most reliable: your phone&apos;s calendar rings at that time every day, even when the app is closed. Open the file to add it.</p>
          </div>

          <div className={styles.sec}>
            <label className={styles.check}>
              <input type="checkbox" checked={!!rem.enabled && perm === "granted"} onChange={(e) => enable(e.target.checked)} />
              Also notify while the app is open
            </label>
            <p>Fires after the time above if you haven&apos;t checked in. It cannot wake a closed app (that needs a push server).</p>
          </div>
          {msg && <div className={styles.msg}>{msg}</div>}
        </div>
      )}
    </div>
  );
}
