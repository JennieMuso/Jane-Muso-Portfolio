document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('.live-browser-stage');
  const buttons = [...document.querySelectorAll('[data-preview-size]')];
  if (!stage || !buttons.length) return;
  buttons.forEach((button) => button.addEventListener('click', () => {
    const mobile = button.dataset.previewSize === 'mobile';
    stage.classList.toggle('is-mobile', mobile);
    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  }));
});
