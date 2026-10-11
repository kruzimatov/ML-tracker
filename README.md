# Mission Control

One tracker for the whole plan: a 13-week roadmap with daily check-ins, DSA + system design patterns, the math/ML/RAG build, and an index over the two long study guides.

Next.js (App Router, JavaScript). Progress is kept in the browser's `localStorage` and, when signed in, synced to the server so every device shares it.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: Add New Project, import the repo, keep the defaults (Framework: Next.js), Deploy.

No environment variables needed.

## Where things live

| What | File |
| --- | --- |
| Week-by-week plan (why / how / links) | `components/tabs/roadmapData.js` |
| DSA + system design chapters | `components/tabs/patternsData.js` |
| Math/ML + FastAPI/RAG modules | `components/tabs/scratchData.js` |
| Guide index chapter lists | `components/tabs/LedgerTab.js` |
| Plan start date | `PLAN_START` in `roadmapData.js` |

Chapter `body` fields are trusted static HTML rendered with `dangerouslySetInnerHTML`. Never feed them user input.

Progress is per browser. Clearing site data or switching device starts from zero.

## Sync server

Live at https://mission-control.safarona.uz. API routes in `app/api/*`, SQLite via Node's built-in `node:sqlite` (file set by `MC_DB`, default `data/mission.db`, git-ignored).

- No public sign-up. Manage accounts on the server:
  `cd /var/www/mission-control/app && MC_DB=/var/www/mission-control/data/mission.db node scripts/user.mjs add <username>` (also `passwd`, `remove`, `list`)
- Deploy: `bash scripts/deploy.sh` (pulls `main` on the server, builds, restarts the `mission-control` service)
- Backups: daily cron runs `scripts/backup-db.mjs` into `~/backups/mission-control`, keeping 14
