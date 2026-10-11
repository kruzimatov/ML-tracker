"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { touch } from "./sync";

const EMPTY = {};
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const notifyStored = emit;

export function subscribeStored(cb) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export function useStored(key) {
  const raw = useSyncExternalStore(subscribeStored, () => read(key), () => null);

  const value = useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : EMPTY;
    } catch {
      return EMPTY;
    }
  }, [raw]);

  const update = useCallback(
    (next) => {
      const before = read(key);
      let prev = EMPTY;
      try {
        prev = JSON.parse(before || "{}");
      } catch {}
      const raw = JSON.stringify(typeof next === "function" ? next(prev) : next);
      if (raw === before) return;
      try {
        localStorage.setItem(key, raw);
      } catch {}
      touch(key);
      emit();
    },
    [key]
  );

  return [value, update];
}
