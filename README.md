# Mission Control

One tracker for the whole plan: a 13-week roadmap with daily check-ins, DSA + system design patterns, the math/ML/RAG build, and an index over the two long study guides.

Next.js (App Router, JavaScript). No backend: progress is stored in the browser's `localStorage` (keys `mc-roadmap`, `mc-patterns`, `mc-scratch`, `mc-ledger`).

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
