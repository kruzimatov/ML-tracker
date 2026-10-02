"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set();
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const current = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export const useTheme = () => useSyncExternalStore(subscribe, current, () => "dark");

export function toggleTheme() {
  const next = current() === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("mc-theme", next);
  } catch {}
  listeners.forEach((l) => l());
}
