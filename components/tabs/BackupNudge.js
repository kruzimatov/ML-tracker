"use client";

import { useSyncExternalStore } from "react";
import { downloadBackup } from "@/lib/backup";
import { notifyStored, subscribeStored } from "@/lib/useStored";
import styles from "./BackupNudge.module.css";

const DAY = 86400000;

function daysSinceExport() {
  try {
    const snooze = Date.parse(localStorage.getItem("mc-backup-snooze") || "");
    if (snooze && Date.now() < snooze) return null;
    const last = Date.parse(localStorage.getItem("mc-last-export") || "");
    return last ? Math.floor((Date.now() - last) / DAY) : 999;
  } catch {
    return null;
  }
}

export default function BackupNudge({ hasProgress }) {
  const days = useSyncExternalStore(subscribeStored, daysSinceExport, () => null);
  if (!hasProgress || days === null || days < 7) return null;

  const later = () => {
    try {
      localStorage.setItem("mc-backup-snooze", new Date(Date.now() + 3 * DAY).toISOString());
    } catch {}
    notifyStored();
  };

  return (
    <div className={styles.nudge} role="status">
      <div>
        <b>{days === 999 ? "You have never backed up." : `Last backup: ${days} days ago.`}</b>
        <span> Your progress lives only in this browser.</span>
      </div>
      <div className={styles.row}>
        <button className={styles.go} onClick={downloadBackup}>Back up now</button>
        <button className={styles.ghost} onClick={later}>Remind me in 3 days</button>
      </div>
    </div>
  );
}
