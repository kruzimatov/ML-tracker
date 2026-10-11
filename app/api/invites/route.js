import { currentUser, sameOrigin } from "@/lib/server/auth";
import { createInvite } from "@/lib/server/users";

export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: "Bad origin." }, { status: 403 });
  const user = currentUser(request);
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });
  if (!user.is_owner) return Response.json({ error: "Only the owner can invite people." }, { status: 403 });
  return Response.json(createInvite(user.id), { headers: { "Cache-Control": "no-store" } });
}
