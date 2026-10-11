import { getDb } from "@/lib/server/db";
import { DUMMY_HASH, verifyPassword } from "@/lib/server/password";
import { clientIp, createSession, recordFailure, sameOrigin, sessionCookie, tooManyFailures } from "@/lib/server/auth";

export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: "Bad origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!username || !password || username.length > 40 || password.length > 200) {
    return Response.json({ error: "Enter a username and password." }, { status: 400 });
  }
  const ipId = `ip:${clientIp(request)}`, userId = `user:${username}`;
  if (tooManyFailures(ipId, 10) || tooManyFailures(userId, 5)) {
    return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }
  const user = getDb().prepare("SELECT id, username, pass_hash, is_owner FROM users WHERE username = ?").get(username);
  const ok = verifyPassword(password, user?.pass_hash ?? DUMMY_HASH) && !!user;
  if (!ok) {
    recordFailure(ipId);
    recordFailure(userId);
    return Response.json({ error: "Wrong username or password." }, { status: 401 });
  }
  return Response.json({ username: user.username, owner: !!user.is_owner }, { headers: { "Set-Cookie": sessionCookie(createSession(user.id)) } });
}
