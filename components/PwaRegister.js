"use client";

import { useEffect } from "react";
import { PLAN_START } from "./tabs/roadmapData";
import { todayISO } from "@/lib/dates";

async function notify() {
  const body = "You have not checked in today. Do the work, tick today's box, write one line.";
  const opts = { body, icon: "/icon-192.png", tag: "mc-daily" };
  const reg = await navigator.serviceWorker?.getRegistration();
  if (reg) await reg.showNotification("Mission Control", opts);
  else new Notification("Mission Control", opts);
}

async function checkReminder() {
  try {
    const r = JSON.parse(localStorage.getItem("mc-reminder") || "{}");
    if (!r.enabled || typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const [h, m] = (r.time || "20:00").split(":").map(Number);
    const now = new Date();
    if (now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
    const iso = todayISO();
    if (localStorage.getItem("mc-reminder-last") === iso) return;
    const dayN = Math.floor((now - PLAN_START) / 86400000);
    if (dayN < 0 || dayN >= 91) return;
    const done = JSON.parse(localStorage.getItem("mc-roadmap") || "{}");
    if (done[`${Math.floor(dayN / 7)}:day:${dayN % 7}`]) return;
    await notify();
    localStorage.setItem("mc-reminder-last", iso);
  } catch {}
}

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    checkReminder();
    const id = setInterval(checkReminder, 30000);
    const onVis = () => document.visibilityState === "visible" && checkReminder();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
}
