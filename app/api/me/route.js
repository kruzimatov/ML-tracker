import { currentUser } from "@/lib/server/auth";
import { userCount } from "@/lib/server/users";

export async function GET(request) {
  const user = currentUser(request);
  if (user) return Response.json({ username: user.username, owner: !!user.is_owner });
  return Response.json({ error: "Not signed in.", setup: userCount() === 0 }, { status: 401 });
}
