"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const EMPTY = {};
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const notifyStored = emit;

function subscribe(cb) {
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
  const raw = useSyncExternalStore(subscribe, () => read(key), () => null);

  const value = useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : EMPTY;
    } catch {
      return EMPTY;
    }
  }, [raw]);

  const update = useCallback(
    (next) => {
      let prev = EMPTY;
      try {
        prev = JSON.parse(read(key) || "{}");
      } catch {}
      const resolved = typeof next === "function" ? next(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {}
      emit();
    },
    [key]
  );

  return [value, update];
}
