window.addEventListener('load', () => {
  if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 700px)').matches || navigator.connection?.saveData) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('[data-parallax]').forEach((media) => {
    const strength = Number(media.dataset.parallaxStrength) || 4;
    gsap.fromTo(media, { yPercent: -strength }, {
      yPercent: strength,
      ease: 'none',
      scrollTrigger: { trigger: media.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
});
