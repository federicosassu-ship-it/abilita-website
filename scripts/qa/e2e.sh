#!/usr/bin/env bash
# Avvia un server PHP locale sulla build (dist/) con email catturate su file ed esegue i test E2E.
# Uso: npm run build && bash scripts/qa/e2e.sh
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"; MAILS="$TMP/mails.txt"; : > "$MAILS"
printf '#!/bin/sh\ncat >> %s\n' "$MAILS" > "$TMP/sendmail.sh"; chmod +x "$TMP/sendmail.sh"
php -d sendmail_path="$TMP/sendmail.sh" -d sys_temp_dir="$TMP" -S 127.0.0.1:8089 -t "$ROOT/dist" > "$TMP/server.log" 2>&1 &
PID=$!; trap 'kill $PID 2>/dev/null; rm -rf "$TMP"' EXIT; sleep 1
node "$ROOT/scripts/qa/e2e.mjs" http://127.0.0.1:8089 "$MAILS"
