import { KEYS } from "./validate";
import { notifyStored } from "./useStored";

// ponytail: last write wins per key, plus a merge on a device's first sync. Two devices editing the same key
// without a pull in between keeps only the newer one; per-entry timestamps would fix that if it ever bites.
const META = "mc-sync-meta";
const USER = "mc-sync-user";
const PULL_EVERY = 10000;

const ls = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  del: (k) => { try { localStorage.removeItem(k); } catch {} },
};
const readJSON = (k, fallback) => { try { return JSON.parse(ls.get(k) || "null") ?? fallback; } catch { return fallback; } };

let state = { user: null, owner: false, setup: false, status: "off", error: "" };
const listeners = new Set();
const setState = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
export const subscribeSync = (cb) => (listeners.add(cb), () => listeners.delete(cb));
export const getSyncState = () => state;

let meta = null;
const getMeta = () => (meta ??= readJSON(META, {}));
const saveMeta = () => ls.set(META, JSON.stringify(getMeta()));
const dirty = new Set();
const early = new Set(); // keys changed before this session's first pull
let pulled = false;
let timer = null;

export function touch(key) {
  if (!KEYS.includes(key)) return;
  getMeta()[key] = Date.now();
  saveMeta();
  if (!pulled) early.add(key);
  dirty.add(key);
  if (state.user && pulled) schedulePush();
}

function schedulePush() {
  clearTimeout(timer);
  timer = setTimeout(push, 800);
}

async function api(path, init) {
  const res = await fetch(path, { credentials: "same-origin", headers: { "Content-Type": "application/json" }, ...init });
  if (res.status === 401) {
    setState({ user: null, status: "off" });
    throw new Error("signed out");
  }
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
  return res.json();
}

async function push() {
  if (!state.user || !dirty.size) return;
  setState({ status: "syncing" });
  try {
    for (const key of [...dirty]) {
      const sentAt = getMeta()[key] ?? Date.now();
      const row = await api("/api/data", { method: "PUT", body: JSON.stringify({ key, value: readJSON(key, {}), updatedAt: sentAt }) });
      if (getMeta()[key] === sentAt) dirty.delete(key);
      if (row.updatedAt > sentAt) apply(key, row.value, row.updatedAt);
    }
    saveMeta();
    notifyStored();
    setState({ status: "ok", error: "" });
  } catch (e) {
    if (state.user) setState({ status: navigator.onLine ? "error" : "offline", error: e.message });
  }
}

function apply(key, value, ts) {
  ls.set(key, JSON.stringify(value));
  getMeta()[key] = ts;
}

const isEmpty = (v) => !v || !Object.keys(v).length;

export async function pull() {
  if (!state.user) return;
  setState({ status: "syncing" });
  try {
    const server = await api("/api/data");
    const m = getMeta();
    for (const key of KEYS) {
      const srv = server[key];
      const local = readJSON(key, {});
      if (!srv) {
        if (!isEmpty(local)) { m[key] ??= Date.now(); dirty.add(key); }
      } else if (m[key] === undefined || early.has(key)) {
        const merged = { ...local, ...srv.value };
        const same = JSON.stringify(merged) === JSON.stringify(srv.value);
        apply(key, merged, same ? srv.updatedAt : Date.now());
        if (!same) dirty.add(key);
      } else if (srv.updatedAt > m[key]) {
        apply(key, srv.value, srv.updatedAt);
        dirty.delete(key);
      } else if (m[key] > srv.updatedAt) {
        dirty.add(key);
      }
    }
    early.clear();
    pulled = true;
    saveMeta();
    notifyStored();
    setState({ status: "ok", error: "" });
    await push();
  } catch (e) {
    if (state.user) setState({ status: navigator.onLine ? "error" : "offline", error: e.message });
  }
}

function wipe() {
  for (const k of KEYS) ls.del(k);
  ls.del(META);
  meta = null;
  dirty.clear();
  notifyStored();
}

async function enter(path, payload) {
  const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Something went wrong. Try again.");
  const previous = ls.get(USER);
  if (previous && previous !== body.username) wipe();
  ls.set(USER, body.username);
  setState({ user: body.username, owner: !!body.owner, setup: false });
  await pull();
}

export const login = (username, password) => enter("/api/login", { username, password });
export const signup = (username, password, invite) => enter("/api/signup", { username, password, invite });

export async function createInviteCode() {
  return api("/api/invites", { method: "POST" });
}

export async function logout() {
  await push();
  await fetch("/api/logout", { method: "POST" }).catch(() => {});
  wipe();
  ls.del(USER);
  pulled = false;
  setState({ user: null, owner: false, status: "off", error: "" });
}

async function resume() {
  try {
    const res = await fetch("/api/me", { credentials: "same-origin" });
    const me = await res.json();
    if (!res.ok) return setState({ user: null, owner: false, setup: !!me.setup, status: "off" });
    if (ls.get(USER) && ls.get(USER) !== me.username) wipe();
    ls.set(USER, me.username);
    setState({ user: me.username, owner: !!me.owner, setup: false });
    await pull();
  } catch {
    // Offline: the app keeps working from this browser's storage.
    if (ls.get(USER)) setState({ status: "offline" });
  }
}

let started = false;
let lastPull = 0;
export function startSync() {
  if (started) return;
  started = true;
  const again = (force) => {
    if (!force && (document.visibilityState !== "visible" || Date.now() - lastPull < PULL_EVERY)) return;
    lastPull = Date.now();
    if (state.user) pull();
    else resume();
  };
  window.addEventListener("focus", () => again());
  document.addEventListener("visibilitychange", () => again());
  window.addEventListener("online", () => again(true));
  lastPull = Date.now();
  resume();
}
