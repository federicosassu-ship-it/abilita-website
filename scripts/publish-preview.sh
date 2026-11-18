#!/usr/bin/env bash
# Pubblica un'anteprima del sito su GitHub Pages (branch gh-pages di questa repo).
# L'anteprima è esclusa dai motori di ricerca, senza banner cookie e con il modulo
# in modalità anteprima (nessun invio). Indirizzo: https://<utente>.github.io/<repo>/
# Uso: bash scripts/publish-preview.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
REMOTE="$(git remote get-url origin)"
REPO="$(basename -s .git "$REMOTE")"
BASE="/$REPO"

SITE_BASE="$BASE" PUBLIC_NOINDEX=true PUBLIC_IUBENDA_BANNER=false PUBLIC_PREVIEW=true npx astro build
node scripts/preview-pages.mjs "$BASE"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R dist/. "$TMP/"
rm -rf "$TMP/api" "$TMP/.htaccess" "$TMP/_redirects"   # file utili solo in produzione
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -q -m "Anteprima del sito ($(git -C "$ROOT" rev-parse --short HEAD))"
git push -q -f "$REMOTE" gh-pages
echo "Anteprima pubblicata sul branch gh-pages."
