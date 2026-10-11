import { createHash, randomInt } from "node:crypto";
import { getDb } from "./db";
import { hashPassword } from "./password";

export const USERNAME = /^[a-z0-9_.-]{3,40}$/;
const INVITE_DAYS = 7;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I so codes are easy to read out
const sha = (s) => createHash("sha256").update(s).digest("hex");
const normalizeCode = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

export const userCount = () => getDb().prepare("SELECT COUNT(*) AS n FROM users").get().n;

export function checkNew(username, password) {
  if (!USERNAME.test(username)) return "Username: 3-40 characters, lowercase letters, numbers, _ . -";
  if (password.length < 10) return "Password must be at least 10 characters.";
  if (password.length > 200) return "Password is too long.";
  return null;
}

// Node runs this synchronously in one process, so the zero-users check and the insert cannot interleave.
export function createUser(username, password, invite) {
  const db = getDb();
  const first = userCount() === 0;
  let inviteRow = null;
  if (!first) {
    inviteRow = db.prepare("SELECT code_hash FROM invites WHERE code_hash = ? AND used_by IS NULL AND expires_at > ?").get(sha(normalizeCode(invite)), Date.now());
    if (!inviteRow) return { error: "That invite code is wrong, used, or expired." };
  }
  if (db.prepare("SELECT 1 FROM users WHERE username = ?").get(username)) return { error: "That username is taken.", taken: true };
  const { lastInsertRowid } = db
    .prepare("INSERT INTO users (username, pass_hash, created_at, is_owner) VALUES (?, ?, ?, ?)")
    .run(username, hashPassword(password), Date.now(), first ? 1 : 0);
  if (inviteRow) db.prepare("UPDATE invites SET used_by = ? WHERE code_hash = ?").run(lastInsertRowid, inviteRow.code_hash);
  return { id: Number(lastInsertRowid), owner: first };
}

export function createInvite(userId) {
  const raw = Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  getDb().prepare("INSERT INTO invites (code_hash, created_by, expires_at) VALUES (?, ?, ?)").run(sha(raw), userId, Date.now() + INVITE_DAYS * 86400000);
  return { code: `${raw.slice(0, 4)}-${raw.slice(4)}`, days: INVITE_DAYS };
}
