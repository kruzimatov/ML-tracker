import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const N = 16384, R = 8, P = 1, LEN = 64;

export function hashPassword(pw) {
  const salt = randomBytes(16);
  const hash = scryptSync(pw, salt, LEN, { N, r: R, p: P });
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export function verifyPassword(pw, stored) {
  const [alg, salt, hash] = String(stored).split("$");
  if (alg !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const got = scryptSync(pw, Buffer.from(salt, "base64"), expected.length, { N, r: R, p: P });
  return timingSafeEqual(got, expected);
}

// Used when the username does not exist, so a wrong username takes as long as a wrong password.
export const DUMMY_HASH = hashPassword(randomBytes(12).toString("hex"));
