/**
 * Navigazione: menu a tendina "Servizi" (desktop) e menu mobile.
 * La tendina si apre con clic, Invio o Spazio (non al passaggio del mouse: un'apertura al
 * passaggio seguita da un clic la richiuderebbe, comportamento confuso).
 * Pattern "disclosure" accessibile: aria-expanded, Esc per chiudere, focus gestito,
 * contenuti esterni resi inerti quando il menu mobile è aperto.
 */
const desktopQuery = window.matchMedia('(min-width: 64rem)');

function initDropdowns() {
  document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((item) => {
    const toggle = item.querySelector<HTMLButtonElement>('[data-dropdown-toggle]');
    const panel = item.querySelector<HTMLElement>('[data-dropdown-panel]');
    if (!toggle || !panel) return;
    const setOpen = (open: boolean) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    };
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
    item.addEventListener('focusout', (e) => {
      const next = e.relatedTarget as Node | null;
      if (next && !item.contains(next)) setOpen(false);
    });
    document.addEventListener('click', (e) => {
      if (isOpen() && !item.contains(e.target as Node)) setOpen(false);
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  if (!toggle || !menu) return;
  const outside = () => Array.from(document.querySelectorAll<HTMLElement>('main, footer, .skip-link'));

  const setOpen = (open: boolean, restoreFocus = true) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (label) label.textContent = open ? 'Chiudi' : 'Menu';
    document.documentElement.classList.toggle('menu-open', open);
    outside().forEach((el) => el.toggleAttribute('inert', open));
    if (open) {
      menu.querySelector<HTMLElement>('a')?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setOpen(false);
  });
  // Mantiene il focus tra il pulsante e il menu (il resto della pagina è inerte)
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      toggle.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      toggle.focus();
    }
  });
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches && !menu.hidden) setOpen(false, false);
  });
}

function initHeaderState() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

export function initNavigation() {
  initDropdowns();
  initMobileMenu();
  initHeaderState();
}
