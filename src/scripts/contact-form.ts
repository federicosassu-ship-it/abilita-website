/**
 * Modulo di contatto: validazione accessibile e invio asincrono.
 * Il successo viene mostrato solo se il gestore risponde con esito positivo:
 * nessuna conferma "finta" in assenza di backend.
 */
import { track } from './analytics';

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const MESSAGES: Record<string, { valueMissing?: string; tooShort?: string; custom?: string }> = {
  nome: {
    valueMissing: 'Inserisci nome e cognome.',
    tooShort: 'Il nome sembra incompleto.',
  },
  email: {
    valueMissing: 'Inserisci il tuo indirizzo email.',
    custom: 'Controlla l’indirizzo email (esempio: nome@azienda.it).',
  },
  telefono: {
    custom: 'Inserisci un numero valido (solo cifre, spazi e +), oppure lascia vuoto il campo.',
  },
  messaggio: {
    valueMissing: 'Scrivi qualche riga sul tuo progetto.',
    tooShort: 'Aggiungi qualche dettaglio in più (almeno 10 caratteri).',
  },
};

const LABELS: Record<string, string> = {
  nome: 'Nome e cognome',
  email: 'Email',
  azienda: 'Azienda o organizzazione',
  telefono: 'Telefono',
  ambito: 'Ambito di interesse',
  messaggio: 'Messaggio',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9 +().\/-]{6,25}$/;

function errorFor(field: FieldEl): string {
  const name = field.name;
  const value = field.value.trim();
  const m = MESSAGES[name] ?? {};
  if (field.required && !value) return m.valueMissing ?? 'Compila questo campo.';
  if (!value) return '';
  if (name === 'nome' && value.length < 2) return m.tooShort ?? 'Il testo è troppo breve.';
  if (name === 'messaggio' && value.length < 10) return m.tooShort ?? 'Il testo è troppo breve.';
  if (name === 'email' && !EMAIL_RE.test(value)) return m.custom ?? 'Controlla il valore inserito.';
  if (name === 'telefono' && !PHONE_RE.test(value)) return m.custom ?? 'Controlla il valore inserito.';
  return '';
}

function showError(field: FieldEl, message: string) {
  const box = field.closest('[data-field]')?.querySelector<HTMLElement>('[data-error]');
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (box) box.textContent = message;
}

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const endpoint = form.getAttribute('action') || '/api/contatto.php';
  const fields = Array.from(form.querySelectorAll<FieldEl>('input:not([type=hidden]):not([name=sito_web]), textarea, select'));
  const summary = form.querySelector<HTMLElement>('[data-summary]')!;
  const summaryTitle = form.querySelector<HTMLElement>('[data-summary-title]')!;
  const summaryList = form.querySelector<HTMLElement>('[data-summary-list]')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const success = document.querySelector<HTMLElement>('[data-success]');
  let submitted = false;

  form.noValidate = true;
  const ts = form.querySelector<HTMLInputElement>('[data-ts]');
  if (ts) ts.value = String(Date.now());
  const page = form.querySelector<HTMLInputElement>('[data-page]');
  if (page) page.value = window.location.pathname;

  // Preselezione dell'ambito dai link contestuali (es. /contatti/?ambito=e-commerce)
  const ambito = new URLSearchParams(window.location.search).get('ambito');
  const select = form.querySelector<HTMLSelectElement>('select[name=ambito]');
  if (ambito && select && Array.from(select.options).some((o) => o.value === ambito)) select.value = ambito;

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (submitted || field.value.trim() !== '') showError(field, errorFor(field));
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(field, errorFor(field));
    });
  });

  const renderSummary = (invalid: { field: FieldEl; message: string }[]) => {
    summaryList.replaceChildren();
    if (!invalid.length) {
      summary.hidden = true;
      return;
    }
    summaryTitle.textContent = invalid.length === 1
      ? 'Il modulo non è stato inviato: c’è un campo da correggere.'
      : `Il modulo non è stato inviato: ci sono ${invalid.length} campi da correggere.`;
    invalid.forEach(({ field, message }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${field.id}`;
      a.textContent = `${LABELS[field.name] ?? field.name}: ${message}`;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        field.focus();
      });
      li.appendChild(a);
      summaryList.appendChild(li);
    });
    summary.hidden = false;
    summary.focus();
  };

  const setBusy = (busy: boolean) => {
    form.setAttribute('aria-busy', String(busy));
    submit.disabled = busy;
    submitLabel.textContent = busy ? 'Invio in corso…' : 'Invia la richiesta';
  };

  const showStatus = (html: string) => {
    status.innerHTML = html;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitted = true;
    showStatus('');
    const invalid = fields
      .map((field) => ({ field, message: errorFor(field) }))
      .filter((r) => r.message);
    fields.forEach((f) => showError(f, invalid.find((i) => i.field === f)?.message ?? ''));
    if (invalid.length) {
      renderSummary(invalid);
      track('form_errore', { tipo: 'validazione' });
      return;
    }
    renderSummary([]);
    setBusy(true);

    const fallback = 'Non siamo riusciti a inviare il messaggio. Riprova tra qualche istante oppure scrivici direttamente a <a href="mailto:info@abilita.biz">info@abilita.biz</a>.';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      let data: { ok?: boolean; errors?: Record<string, string>; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (res.ok && data.ok !== false) {
        const email = form.querySelector<HTMLInputElement>('input[name=email]')?.value.trim() ?? '';
        track('form_invio', { ambito: select?.value || 'non indicato' });
        if (success) {
          const target = success.querySelector<HTMLElement>('[data-success-email]');
          if (target) target.textContent = email;
          form.hidden = true;
          success.hidden = false;
          success.querySelector<HTMLElement>('[data-success-title]')?.focus();
          success.scrollIntoView({ block: 'start' });
        }
        return;
      }
      if (res.status === 422 && data.errors) {
        const serverInvalid = Object.entries(data.errors)
          .map(([name, message]) => ({ field: fields.find((f) => f.name === name)!, message }))
          .filter((r) => r.field);
        serverInvalid.forEach(({ field, message }) => showError(field, message));
        renderSummary(serverInvalid);
        track('form_errore', { tipo: 'validazione_server' });
        return;
      }
      if (res.status === 429) {
        showStatus('Hai inviato diverse richieste in poco tempo. Riprova tra qualche minuto oppure scrivici a <a href="mailto:info@abilita.biz">info@abilita.biz</a>.');
        track('form_errore', { tipo: 'limite' });
        return;
      }
      showStatus(fallback);
      track('form_errore', { tipo: `http_${res.status}` });
    } catch {
      showStatus(fallback);
      track('form_errore', { tipo: 'rete' });
    } finally {
      setBusy(false);
    }
  });
}
