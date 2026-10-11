import { clearCookie, endSession, sameOrigin } from "@/lib/server/auth";

export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: "Bad origin." }, { status: 403 });
  endSession(request);
  return Response.json({ ok: true }, { headers: { "Set-Cookie": clearCookie() } });
}
