import { currentUser } from "@/lib/server/auth";

export async function GET(request) {
  const user = currentUser(request);
  return user ? Response.json({ username: user.username }) : Response.json({ error: "Not signed in." }, { status: 401 });
}
