#!/usr/bin/env bash
# Test del gestore PHP del modulo (public/api/contatto.php) con un server PHP locale.
# Le email non vengono inviate: un finto sendmail le scrive in un file.
# Uso: bash scripts/qa/test-form-php.sh   (dopo "npm run build")
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"
PORT=8089
MAILS="$TMP/mails.txt"
cat > "$TMP/sendmail.sh" <<SH
#!/bin/sh
echo "----- ARGS: \$* -----" >> "$MAILS"
cat >> "$MAILS"
SH
chmod +x "$TMP/sendmail.sh"
: > "$MAILS"
php -d sendmail_path="$TMP/sendmail.sh" -d sys_temp_dir="$TMP" -S 127.0.0.1:$PORT -t "$ROOT/dist" > "$TMP/server.log" 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null; rm -rf "$TMP"' EXIT
sleep 1
URL="http://127.0.0.1:$PORT/api/contatto.php"
OLD=$(( $(date +%s%3N) - 10000 ))
pass=0; fail=0
check() { # descrizione, atteso, ottenuto
  if [[ "$3" == *"$2"* ]]; then echo "OK   $1"; pass=$((pass+1)); else echo "FAIL $1 — atteso '$2', ottenuto '$3'"; fail=$((fail+1)); fi
}
J=(-H "Accept: application/json")
r=$(curl -s -o /dev/null -w "%{http_code}" "${J[@]}" "$URL"); check "GET rifiutato (405)" "405" "$r"
r=$(curl -s "${J[@]}" -w " %{http_code}" --data-urlencode "nome=" --data-urlencode "email=x" --data-urlencode "messaggio=corto" "$URL"); check "Campi non validi → 422 con errori" '"errors"' "$r"; check "…codice 422" "422" "$r"
r=$(curl -s "${J[@]}" -w " %{http_code}" --data-urlencode "nome=Mario Rossi" --data-urlencode "email=mario@example.com" --data-urlencode "telefono=abc" --data-urlencode "messaggio=Messaggio di prova abbastanza lungo" "$URL"); check "Telefono non valido → errore" '"telefono"' "$r"
r=$(curl -s "${J[@]}" -w " %{http_code}" --data-urlencode $'nome=Mario\r\nBcc: spam@example.com' --data-urlencode "email=mario@example.com" --data-urlencode "messaggio=Messaggio di prova abbastanza lungo" "$URL"); check "Header injection nel nome → 422" "422" "$r"
r=$(curl -s "${J[@]}" -w " %{http_code}" -H "Origin: https://sito-estraneo.example" --data-urlencode "nome=Mario Rossi" --data-urlencode "email=mario@example.com" --data-urlencode "messaggio=Messaggio di prova abbastanza lungo" "$URL"); check "Origine esterna → 403" "403" "$r"
before=$(wc -c < "$MAILS" 2>/dev/null || echo 0)
r=$(curl -s "${J[@]}" --data-urlencode "nome=Bot" --data-urlencode "email=bot@example.com" --data-urlencode "messaggio=Messaggio di prova abbastanza lungo" --data-urlencode "sito_web=http://spam" "$URL"); check "Honeypot → risposta ok" '"ok":true' "$r"
r=$(curl -s "${J[@]}" --data-urlencode "nome=Bot veloce" --data-urlencode "email=bot@example.com" --data-urlencode "messaggio=Messaggio di prova abbastanza lungo" --data-urlencode "ts=$(date +%s%3N)" "$URL"); check "Compilazione troppo rapida → risposta ok" '"ok":true' "$r"
after=$(wc -c < "$MAILS" 2>/dev/null || echo 0); check "…e nessuna email inviata dai bot" "$before" "$after"
r=$(curl -s "${J[@]}" -w " %{http_code}" -H "Origin: http://127.0.0.1:$PORT" --data-urlencode "nome=Maria Bianchi" --data-urlencode "email=maria@azienda.it" --data-urlencode "azienda=Caseificio Esempio" --data-urlencode "telefono=+39 333 1234567" --data-urlencode "ambito=e-commerce" --data-urlencode "messaggio=Vorremmo aprire un e-commerce per i nostri formaggi." --data-urlencode "ts=$OLD" --data-urlencode "pagina=/contatti/" "$URL"); check "Invio valido (JSON) → 200 ok" '"ok":true' "$r"
mail=$(cat "$MAILS" 2>/dev/null)
check "Email: destinatario" "To: info@abilita.biz" "$mail"
check "Email: Reply-To del richiedente" "<maria@azienda.it>" "$mail"
check "Email: mittente di dominio (-f)" "-finfo@abilita.biz" "$mail"
check "Email: contenuto UTF-8" "Content-Type: text/plain; charset=UTF-8" "$mail"
check "Email: ambito" "Ambito di interesse: E-commerce" "$mail"
check "Email: messaggio" "Vorremmo aprire un e-commerce per i nostri formaggi." "$mail"
r=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" --data-urlencode "nome=Luca Verdi" --data-urlencode "email=luca@azienda.it" --data-urlencode "messaggio=Invio senza JavaScript di prova." "$URL"); check "Invio senza JS → 303 verso /contatti/grazie/" "303 http://127.0.0.1:$PORT/contatti/grazie/" "$r"
r=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" --data-urlencode "nome=" --data-urlencode "email=" --data-urlencode "messaggio=" "$URL"); check "Errore senza JS → 303 verso /contatti/errore/" "303 http://127.0.0.1:$PORT/contatti/errore/" "$r"
for i in 1 2 3 4; do curl -s -o /dev/null "${J[@]}" --data-urlencode "nome=Utente $i" --data-urlencode "email=u$i@azienda.it" --data-urlencode "messaggio=Messaggio numero $i di prova." "$URL"; done
r=$(curl -s -o /dev/null -w "%{http_code}" "${J[@]}" --data-urlencode "nome=Utente 6" --data-urlencode "email=u6@azienda.it" --data-urlencode "messaggio=Messaggio numero 6 di prova." "$URL"); check "Limite di invii per IP → 429" "429" "$r"
echo "Risultato: $pass superati, $fail falliti"
[ $fail -eq 0 ]
