document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('[data-case-hero-video]');
  const toggle = document.querySelector('[data-video-toggle]');
  if (!video || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateToggle = () => {
    toggle.textContent = video.paused ? 'Play video' : 'Pause video';
    toggle.setAttribute('aria-label', video.paused ? 'Play project video' : 'Pause project video');
  };
  toggle.hidden = false;
  video.addEventListener('play', updateToggle);
  video.addEventListener('pause', updateToggle);
  toggle.addEventListener('click', () => {
    if (video.paused) video.play().catch(updateToggle);
    else video.pause();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) video.pause();
  });
  if (!reducedMotion.matches) video.play().catch(updateToggle);
  updateToggle();
});

window.addEventListener('load', () => {
  if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('[data-parallax]').forEach((image) => {
    gsap.fromTo(image, { yPercent: -4 }, {
      yPercent: 4, ease: 'none',
      scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
  gsap.utils.toArray('[data-reveal]').forEach((item) => {
    gsap.from(item, {
      y: 55, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%', once: true }
    });
  });
  if (document.querySelector('.case-jin-restaurant')) {
    gsap.utils.toArray('.floating-food').forEach((item, index) => {
      gsap.to(item, { y: index ? -36 : 38, rotation: index ? 28 : -30, ease: 'none', scrollTrigger: { trigger: '.case-device-scene', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
});
