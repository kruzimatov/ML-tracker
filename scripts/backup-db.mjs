// Daily copy of the sync database, keeps the newest 14. Run by cron on the server:
//   MC_DB=/var/www/mission-control/data/mission.db MC_BACKUPS=/home/ubuntu/backups/mission-control node scripts/backup-db.mjs
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const dir = process.env.MC_BACKUPS;
if (!process.env.MC_DB || !dir) throw new Error("Set MC_DB and MC_BACKUPS.");
mkdirSync(dir, { recursive: true, mode: 0o700 });
const file = join(dir, `mission-${new Date().toISOString().slice(0, 10)}.db`);
rmSync(file, { force: true });
new DatabaseSync(process.env.MC_DB).exec(`VACUUM INTO '${file.replaceAll("'", "''")}'`);
const old = readdirSync(dir).filter((f) => /^mission-\d{4}-\d{2}-\d{2}\.db$/.test(f)).sort().slice(0, -14);
for (const f of old) rmSync(join(dir, f));
console.log(`Backed up to ${file}, removed ${old.length} old.`);
