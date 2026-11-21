(() => {
  const footer = document.querySelector('.footer');
  const character = footer?.querySelector('.footer-character');
  if (!footer || !character) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  function setFacing(event) {
    if (!finePointer.matches || reducedMotion.matches) return;
    const bounds = footer.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    const facing = position < .38 ? 'left' : position > .62 ? 'right' : 'center';
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      character.dataset.facing = facing;
      frame = 0;
    });
  }

  footer.addEventListener('pointermove', setFacing, { passive: true });
  footer.addEventListener('pointerleave', () => { character.dataset.facing = 'center'; });
  reducedMotion.addEventListener('change', () => { character.dataset.facing = 'center'; });
})();
