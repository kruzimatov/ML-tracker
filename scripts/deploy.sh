#!/bin/bash
# Pull the latest main on the server, build, restart. Run from your laptop: bash scripts/deploy.sh
set -euo pipefail
KEY="${MC_KEY:-$HOME/Downloads/kitobon_pem_login.pem}"
ssh -i "$KEY" ubuntu@13.63.254.1 'set -e
  cd /var/www/mission-control/app
  git pull --ff-only
  npm ci --no-audit --no-fund
  NODE_OPTIONS=--max-old-space-size=1024 nice -n 10 npm run build
  sudo systemctl restart mission-control
  sleep 2
  curl -fsS -o /dev/null -w "local check: %{http_code}\n" http://127.0.0.1:3200/'
