<?php
/**
 * Abilita — gestore del modulo di contatto.
 *
 * Pensato per hosting PHP condiviso (es. Aruba Linux, PHP 7.4+). Invia la richiesta
 * via mail() alla casella aziendale, senza salvare dati personali sul server.
 *
 * Risposte:
 *  - richieste con "Accept: application/json" (invio via JavaScript) → JSON
 *      200 {"ok":true} · 422 {"ok":false,"errors":{campo:messaggio}} · 429 · 500
 *  - invio classico senza JavaScript → redirect 303 a PAGINA_GRAZIE o PAGINA_ERRORE
 *
 * Prima della messa online: verificare che MITTENTE sia una casella esistente del dominio
 * (requisito dei server di posta Aruba) e fare un invio di prova.
 */
declare(strict_types=1);

// ---------------------------------------------------------------------------
// Configurazione
// ---------------------------------------------------------------------------
const DESTINATARIO = 'info@abilita.biz';
const MITTENTE = 'info@abilita.biz';
const NOME_MITTENTE = 'Sito Abilita';
const PAGINA_GRAZIE = '/contatti/grazie/';
const PAGINA_ERRORE = '/contatti/errore/';
const MAX_INVII = 5;            // invii massimi per indirizzo IP…
const FINESTRA_SECONDI = 600;   // …in questa finestra temporale
const TEMPO_MINIMO_MS = 3000;   // compilazioni più rapide sono considerate automatiche

const AMBITI = [
    'e-commerce' => 'E-commerce',
    'food-marketing' => 'Food marketing',
    'digital-advertising' => 'Digital advertising',
    'progetto-integrato' => 'Progetto integrato',
    'partnership' => 'Partnership e collaborazioni',
    'altro' => 'Altro',
];

date_default_timezone_set('Europe/Rome');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$vuoleJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

/** Invia la risposta e termina. */
function rispondi(int $stato, array $dati, bool $json, string $redirect): void
{
    if ($json) {
        http_response_code($stato);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dati, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    } else {
        header('Location: ' . $redirect, true, 303);
    }
    exit;
}

function lunghezza(string $s): int
{
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

function campo(string $nome, int $max): string
{
    $valore = $_POST[$nome] ?? '';
    if (!is_string($valore)) {
        return '';
    }
    $valore = trim(str_replace("\0", '', $valore));
    return function_exists('mb_substr') ? mb_substr($valore, 0, $max, 'UTF-8') : substr($valore, 0, $max);
}

function codificaIntestazione(string $testo): string
{
    return '=?UTF-8?B?' . base64_encode($testo) . '?=';
}

// ---------------------------------------------------------------------------
// Metodo e provenienza
// ---------------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    rispondi(405, ['ok' => false, 'error' => 'metodo'], $vuoleJson, '/contatti/');
}

// Accetta solo invii dallo stesso sito (se il browser dichiara l'origine)
$origine = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origine !== '' && $origine !== 'null') {
    $partiOrigine = parse_url($origine);
    $hostOrigine = strtolower(($partiOrigine['host'] ?? '') . (isset($partiOrigine['port']) ? ':' . $partiOrigine['port'] : ''));
    $hostRichiesta = strtolower($_SERVER['HTTP_HOST'] ?? '');
    if ($hostOrigine === '' || $hostOrigine !== $hostRichiesta) {
        rispondi(403, ['ok' => false, 'error' => 'origine'], $vuoleJson, PAGINA_ERRORE);
    }
}

// ---------------------------------------------------------------------------
// Anti-spam: honeypot e tempo minimo (si risponde "ok" senza inviare nulla)
// ---------------------------------------------------------------------------
if (campo('sito_web', 200) !== '') {
    rispondi(200, ['ok' => true], $vuoleJson, PAGINA_GRAZIE);
}
$ts = campo('ts', 20);
if ($ts !== '' && ctype_digit($ts)) {
    $trascorsi = (int) round(microtime(true) * 1000) - (int) $ts;
    if ($trascorsi >= 0 && $trascorsi < TEMPO_MINIMO_MS) {
        rispondi(200, ['ok' => true], $vuoleJson, PAGINA_GRAZIE);
    }
}

// ---------------------------------------------------------------------------
// Limite di invii per IP (memorizza solo un hash, non l'indirizzo)
// ---------------------------------------------------------------------------
$cartella = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'abilita-modulo';
$file = null;
$invii = [];
if ((is_dir($cartella) || @mkdir($cartella, 0700, true)) && is_writable($cartella)) {
    $chiave = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . date('Y-m-d') . '|abilita');
    $file = $cartella . DIRECTORY_SEPARATOR . $chiave . '.json';
    $adesso = time();
    if (is_file($file)) {
        $letti = json_decode((string) @file_get_contents($file), true);
        if (is_array($letti)) {
            $invii = array_values(array_filter($letti, static function ($t) use ($adesso) {
                return is_int($t) && $t > $adesso - FINESTRA_SECONDI;
            }));
        }
    }
    if (count($invii) >= MAX_INVII) {
        rispondi(429, ['ok' => false, 'error' => 'limite'], $vuoleJson, PAGINA_ERRORE);
    }
}

// ---------------------------------------------------------------------------
// Validazione
// ---------------------------------------------------------------------------
$nome = campo('nome', 100);
$email = campo('email', 150);
$azienda = campo('azienda', 150);
$telefono = campo('telefono', 25);
$ambito = campo('ambito', 40);
$messaggio = campo('messaggio', 5000);
$pagina = campo('pagina', 120);

$errori = [];
if ($nome === '') {
    $errori['nome'] = 'Inserisci nome e cognome.';
} elseif (lunghezza($nome) < 2 || preg_match('/[\r\n]/', $nome)) {
    $errori['nome'] = 'Il nome sembra incompleto.';
}
if ($email === '') {
    $errori['email'] = 'Inserisci il tuo indirizzo email.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    $errori['email'] = 'Controlla l’indirizzo email (esempio: nome@azienda.it).';
}
if ($telefono !== '' && !preg_match('/^[0-9 +().\/-]{6,25}$/', $telefono)) {
    $errori['telefono'] = 'Inserisci un numero valido (solo cifre, spazi e +), oppure lascia vuoto il campo.';
}
if ($ambito !== '' && !array_key_exists($ambito, AMBITI)) {
    $ambito = 'altro';
}
if ($messaggio === '') {
    $errori['messaggio'] = 'Scrivi qualche riga sul tuo progetto.';
} elseif (lunghezza($messaggio) < 10) {
    $errori['messaggio'] = 'Aggiungi qualche dettaglio in più (almeno 10 caratteri).';
}

if ($errori) {
    rispondi(422, ['ok' => false, 'errors' => $errori], $vuoleJson, PAGINA_ERRORE);
}

// ---------------------------------------------------------------------------
// Composizione e invio dell'email
// ---------------------------------------------------------------------------
$etichettaAmbito = $ambito !== '' ? AMBITI[$ambito] : 'Non indicato';
$oggetto = 'Nuova richiesta dal sito – ' . $etichettaAmbito . ' – ' . $nome;

$righe = [
    'Nuova richiesta dal modulo di contatto di abilita.biz',
    '',
    'Nome e cognome: ' . $nome,
    'Email: ' . $email,
    'Azienda / organizzazione: ' . ($azienda !== '' ? $azienda : '—'),
    'Telefono: ' . ($telefono !== '' ? $telefono : '—'),
    'Ambito di interesse: ' . $etichettaAmbito,
    '',
    'Messaggio:',
    $messaggio,
    '',
    '—',
    'Inviato il ' . date('d/m/Y \a\l\l\e H:i') . ($pagina !== '' ? ' dalla pagina ' . $pagina : ''),
    'Per rispondere, usa "Rispondi": il messaggio andrà a ' . $email . '.',
];
$corpo = str_replace("\r\n", "\n", implode("\n", $righe));

$intestazioni = [
    'From: ' . codificaIntestazione(NOME_MITTENTE) . ' <' . MITTENTE . '>',
    'Reply-To: ' . codificaIntestazione($nome) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: abilita-modulo-contatto',
];

$inviato = @mail(
    DESTINATARIO,
    codificaIntestazione($oggetto),
    $corpo,
    implode("\r\n", $intestazioni),
    '-f' . MITTENTE
);

if (!$inviato) {
    rispondi(500, ['ok' => false, 'error' => 'invio'], $vuoleJson, PAGINA_ERRORE);
}

// Registra l'invio riuscito per il limite per IP
if ($file !== null) {
    $invii[] = time();
    @file_put_contents($file, json_encode($invii), LOCK_EX);
}

rispondi(200, ['ok' => true], $vuoleJson, PAGINA_GRAZIE);
