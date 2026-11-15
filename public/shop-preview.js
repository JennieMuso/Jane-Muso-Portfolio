document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('.preview-stage');
  const buttons = [...document.querySelectorAll('.preview-device-switch [data-width]')];
  if (!stage || !buttons.length) return;
  const loadButton = stage.querySelector('[data-load-preview]');
  const frame = stage.querySelector('iframe[data-src]');
  loadButton?.addEventListener('click', () => {
    if (!frame) return;
    frame.src = frame.dataset.src;
    stage.classList.add('preview-loaded');
  });
  buttons.forEach((button) => button.addEventListener('click', () => {
    const mobile = button.dataset.width === 'mobile';
    stage.classList.toggle('is-mobile', mobile);
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }));
});
