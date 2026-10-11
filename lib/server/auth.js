import { createHash, randomBytes } from "node:crypto";
import { getDb } from "./db";

const COOKIE = "mc_session";
const DAYS = 60;
const sha = (s) => createHash("sha256").update(s).digest("hex");

export function createSession(userId) {
  const token = randomBytes(32).toString("base64url");
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(sha(token), userId, Date.now() + DAYS * 86400000);
  return token;
}

const readToken = (request) => request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))?.[1];

export function currentUser(request) {
  const token = readToken(request);
  if (!token) return null;
  return getDb()
    .prepare("SELECT u.id, u.username, u.is_owner FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?")
    .get(sha(token), Date.now()) ?? null;
}

export function endSession(request) {
  const token = readToken(request);
  if (token) getDb().prepare("DELETE FROM sessions WHERE token_hash = ?").run(sha(token));
}

const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
export const sessionCookie = (token) => `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${DAYS * 86400}${secure}`;
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;

// Blocks cross-site form posts: mutations must come from this same site.
export function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

// ponytail: in-memory failure counter, resets on restart. Fine for one process; use the DB or Redis if it ever runs several.
const WINDOW = 15 * 60000;
const fails = new Map();
const recent = (id) => (fails.get(id) || []).filter((t) => Date.now() - t < WINDOW);
export const tooManyFailures = (id, max) => recent(id).length >= max;
export const recordFailure = (id) => fails.set(id, [...recent(id), Date.now()]);

export const clientIp = (request) => request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
