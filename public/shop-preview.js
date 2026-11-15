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

  const iframe = stage.querySelector('iframe');
  const fallbackButton = document.querySelector('[data-preview-fallback]');
  if (!iframe) return;

  let watchdog;
  let manualFallback = false;
  const showFallback = () => {
    clearTimeout(watchdog);
    stage.classList.remove('is-live');
    stage.classList.add('is-fallback');
    iframe.tabIndex = -1;
    fallbackButton?.setAttribute('aria-pressed', 'true');
    if (fallbackButton) fallbackButton.textContent = 'Try interactive preview';
  };
  const showLive = () => {
    if (manualFallback) return;
    clearTimeout(watchdog);
    stage.classList.remove('is-fallback');
    stage.classList.add('is-live');
    iframe.removeAttribute('tabindex');
    fallbackButton?.setAttribute('aria-pressed', 'false');
    if (fallbackButton) fallbackButton.textContent = 'Preview not showing? Use image';
  };
  const startWatchdog = () => {
    clearTimeout(watchdog);
    watchdog = window.setTimeout(() => {
      if (!stage.classList.contains('is-live')) showFallback();
    }, 12000);
  };

  iframe.addEventListener('load', showLive);
  iframe.addEventListener('error', showFallback);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startWatchdog();
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(stage);
  } else startWatchdog();

  fallbackButton?.addEventListener('click', () => {
    if (stage.classList.contains('is-live')) {
      manualFallback = true;
      showFallback();
    } else {
      manualFallback = false;
      stage.classList.remove('is-fallback');
      startWatchdog();
      iframe.src = iframe.src;
    }
  });
});
