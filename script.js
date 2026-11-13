document.getElementById('year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}));

const solutionPanels = [...document.querySelectorAll('.solution')];
solutionPanels.forEach(panel => panel.addEventListener('toggle', () => {
  if (panel.open) solutionPanels.filter(other => other !== panel).forEach(other => { other.open = false; });
  if (panel.open && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.fromTo(panel.querySelectorAll('.solution-content > *'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .08, ease: 'power3.out' });
  }
  if (panel.open && window.ScrollTrigger) ScrollTrigger.refresh();
}));

if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  if (document.querySelector('.hero')) {
    gsap.from('.hero h1', { y: 42, opacity: 0, duration: 1.15, ease: 'power3.out' });
    gsap.from('.project-mini', { y: 26, opacity: 0, duration: .8, delay: .2, stagger: .1, ease: 'power2.out' });
  }
  document.querySelectorAll('.manifesto, .work, .solutions, .shop-teaser, .contact').forEach(section => {
    gsap.from(section.querySelectorAll('h2, p, .work-item, .contact-link'), {
      y: 34, opacity: 0, duration: .9, stagger: .11, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true }
    });
  });
}
