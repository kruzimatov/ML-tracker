import { clientIp, createSession, recordFailure, sameOrigin, sessionCookie, tooManyFailures } from "@/lib/server/auth";
import { checkNew, createUser } from "@/lib/server/users";

export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: "Bad origin." }, { status: 403 });
  const ipId = `signup:${clientIp(request)}`;
  if (tooManyFailures(ipId, 10)) return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const problem = checkNew(username, password);
  if (problem) return Response.json({ error: problem }, { status: 400 });
  const made = createUser(username, password, body.invite);
  if (made.error) {
    if (!made.taken) recordFailure(ipId);
    return Response.json({ error: made.error }, { status: made.taken ? 409 : 403 });
  }
  return Response.json({ username, owner: made.owner }, { headers: { "Set-Cookie": sessionCookie(createSession(made.id)) } });
}
