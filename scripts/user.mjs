// Manage accounts on the server. Run from the app folder:
//   MC_DB=/var/www/mission-control/data/mission.db node scripts/user.mjs add <username>
//   ... node scripts/user.mjs passwd <username>
//   ... node scripts/user.mjs list
//   ... node scripts/user.mjs remove <username>
import { getDb } from "../lib/server/db.js";
import { hashPassword } from "../lib/server/password.js";

const [cmd, rawName] = process.argv.slice(2);
const name = rawName?.trim().toLowerCase();
const db = getDb();

function askHidden(prompt) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    let pw = "";
    const onData = (buf) => {
      for (const ch of buf.toString("utf8")) {
        if (ch === "\r" || ch === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          stdout.write("\n");
          return resolve(pw);
        }
        if (ch === "\u0003") process.exit(1);
        if (ch === "\u007f") pw = pw.slice(0, -1);
        else pw += ch;
      }
    };
    stdin.on("data", onData);
  });
}

async function newPassword() {
  const a = await askHidden("Password (min 10 chars): ");
  if (a.length < 10) throw new Error("Password must be at least 10 characters.");
  const b = await askHidden("Repeat password: ");
  if (a !== b) throw new Error("Passwords do not match.");
  return hashPassword(a);
}

try {
  if (cmd === "list") {
    for (const u of db.prepare("SELECT username, created_at FROM users ORDER BY id").all()) {
      console.log(`${u.username}  created ${new Date(u.created_at).toISOString().slice(0, 10)}`);
    }
  } else if (cmd === "add" && /^[a-z0-9_.-]{3,40}$/.test(name ?? "")) {
    if (db.prepare("SELECT 1 FROM users WHERE username = ?").get(name)) throw new Error(`User ${name} already exists.`);
    db.prepare("INSERT INTO users (username, pass_hash, created_at) VALUES (?, ?, ?)").run(name, await newPassword(), Date.now());
    console.log(`Created ${name}.`);
  } else if (cmd === "passwd" && name) {
    const r = db.prepare("UPDATE users SET pass_hash = ? WHERE username = ?").run(await newPassword(), name);
    if (!r.changes) throw new Error(`No user ${name}.`);
    db.prepare("DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE username = ?)").run(name);
    console.log(`Password changed for ${name}. Their devices are signed out.`);
  } else if (cmd === "remove" && name) {
    const r = db.prepare("DELETE FROM users WHERE username = ?").run(name);
    console.log(r.changes ? `Removed ${name} and all their data.` : `No user ${name}.`);
  } else {
    console.log("Usage: node scripts/user.mjs add|passwd|remove <username> | list\nUsernames: 3-40 chars, a-z 0-9 _ . -");
    process.exitCode = 1;
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
