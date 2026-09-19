(() => {
  const button = document.querySelector('.header__boton');
  const menu = document.getElementById('menu-principal');
  if (!button || !menu) return;
  const desktop = window.matchMedia('(min-width: 1024px)');
  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    button.querySelector('[data-menu-open]').classList.toggle('hidden', open);
    button.querySelector('[data-menu-close]').classList.toggle('hidden', !open);
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a') && !desktop.matches) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  desktop.addEventListener('change', () => {
    const focusedLink = menu.contains(document.activeElement);
    setOpen(false);
    if (!desktop.matches && focusedLink) button.focus();
  });
})();
