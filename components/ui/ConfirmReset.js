"use client";

import { useState } from "react";
import styles from "./ui.module.css";

export default function ConfirmReset({ onConfirm, label = "Reset" }) {
  const [asking, setAsking] = useState(false);
  if (!asking) {
    return <button className={styles.btn} onClick={() => setAsking(true)}>{label}</button>;
  }
  return (
    <span className={styles.ask}>
      <span>Erase this progress?</span>
      <button className={styles.danger} onClick={() => { onConfirm(); setAsking(false); }}>Yes, erase</button>
      <button className={styles.btn} onClick={() => setAsking(false)}>Cancel</button>
    </span>
  );
}
