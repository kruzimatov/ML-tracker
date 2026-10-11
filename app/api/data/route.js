import { getDb } from "@/lib/server/db";
import { currentUser, sameOrigin } from "@/lib/server/auth";
import { isValid } from "@/lib/validate";

const MAX_BODY = 1_000_000;
const unauthorized = () => Response.json({ error: "Not signed in." }, { status: 401 });

export async function GET(request) {
  const user = currentUser(request);
  if (!user) return unauthorized();
  const rows = getDb().prepare("SELECT key, value, updated_at FROM kv WHERE user_id = ?").all(user.id);
  return Response.json(Object.fromEntries(rows.map((r) => [r.key, { value: JSON.parse(r.value), updatedAt: r.updated_at }])), {
    headers: { "Cache-Control": "no-store" },
  });
}

// Last write wins per key, decided by the client's change time.
export async function PUT(request) {
  if (!sameOrigin(request)) return Response.json({ error: "Bad origin." }, { status: 403 });
  const user = currentUser(request);
  if (!user) return unauthorized();
  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ error: "Too large." }, { status: 413 });
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const { key, value, updatedAt } = body ?? {};
  if (!isValid(key, value)) return Response.json({ error: `Invalid data for ${String(key).slice(0, 40)}.` }, { status: 400 });
  const ts = Number.isInteger(updatedAt) ? Math.min(updatedAt, Date.now() + 60000) : Date.now();
  const db = getDb();
  db.prepare(
    `INSERT INTO kv (user_id, key, value, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT (user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
     WHERE excluded.updated_at >= kv.updated_at`
  ).run(user.id, key, JSON.stringify(value), ts);
  const row = db.prepare("SELECT value, updated_at FROM kv WHERE user_id = ? AND key = ?").get(user.id, key);
  return Response.json({ key, value: JSON.parse(row.value), updatedAt: row.updated_at });
}
