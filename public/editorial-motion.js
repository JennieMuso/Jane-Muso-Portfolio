document.addEventListener('DOMContentLoaded', () => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches || navigator.connection?.saveData) return;

  const items = [];
  const pending = new Set();
  let scheduled = false;
  function checkVisible() {
    scheduled = false;
    for (const element of pending) {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      if (rect.bottom < 0 || (rect.top < innerHeight * .9 && rect.bottom > 0)) {
        element.classList.add('motion-in');
        pending.delete(element);
      }
    }
  }
  function scheduleCheck() {
    if (scheduled || !pending.size) return;
    scheduled = true;
    requestAnimationFrame(checkVisible);
  }

  function register(selector, kind, stagger = 0) {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.classList.contains('motion-pending')) return;
      element.classList.add(`motion-${kind}`, 'motion-pending');
      if (stagger) element.style.setProperty('--motion-delay', `${Math.min(index * stagger, 440)}ms`);
      items.push(element);
      pending.add(element);
    });
  }

  // The homepage gallery is the opening sequence. The project imagery leads.
  register('.editorial-hero h1', 'title');
  register('.editorial-gallery .project-mini img', 'photo', 110);
  register('.editorial-gallery .project-mini figcaption', 'copy', 110);
  register('.editorial-gallery .gallery-thesis', 'copy');

  // Other pages use the same visual language at their most important moments.
  register('.work-page .page-intro h1, .insights-index .blog-intro h1, .services-hero h1, .shop-heading h1, .contact-hero h1, .case-heading h1, .article-header h1, .product-heading h1', 'title');
  register('.services-hero-bottom, .shop-heading-bottom, .contact-hero-note', 'copy');
  register('.work-page .work-media, .service-tier .tier-image img, .insight-media, .shop-card-art, .contact-portrait, .case-gallery-main, .article-inline-image, .product-hero-art', 'photo');
  register('.service-tier .tier-heading h2, .services-process h2, .addons-header h2, .care-intro h3, .shop-collection-head h2, .product-preview-header h2, .product-includes h2, .case-gallery-heading h2, .solutions-intro h2, .insights-head h2, .shop-teaser h2, .contact h2, .faq-heading h2', 'title');
  register('.service-tier .tier-price, .service-tier .tier-benefit p, .services-process .process-copy, .addons-header p, .shop-collection-head p, .work-page .page-intro p, .case-story .case-lede, .article-deck, .product-story .product-lede', 'copy');
  register('.addons-list .addon-row, .care-options > div', 'copy', 70);

  window.addEventListener('scroll', scheduleCheck, { passive: true });
  window.addEventListener('resize', scheduleCheck, { passive: true });
  document.addEventListener('click', scheduleCheck);
  scheduleCheck();

  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return;
    pending.clear();
    items.forEach((element) => element.classList.remove('motion-pending'));
  });
});
