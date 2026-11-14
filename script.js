document.getElementById('year').textContent = new Date().getFullYear();

function fitDisplayTitles() {
  document.querySelectorAll('.editorial-hero h1, .work-page .page-intro h1').forEach(title => {
    title.style.fontSize = '';
    const range = document.createRange();
    range.selectNodeContents(title);
    const textWidth = range.getBoundingClientRect().width;
    const fontSize = parseFloat(getComputedStyle(title).fontSize);
    if (textWidth > 0) title.style.fontSize = `${Math.min(340, fontSize * title.clientWidth * .98 / textWidth)}px`;
  });
}
document.fonts.ready.then(fitDisplayTitles);
window.addEventListener('resize', fitDisplayTitles);

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

const contact = document.querySelector('.contact');
const pupils = [...document.querySelectorAll('.contact-pupil')];
if (contact && pupils.length && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const moveX = pupils.map(pupil => gsap.quickTo(pupil, 'x', { duration: .35, ease: 'power2.out' }));
  const moveY = pupils.map(pupil => gsap.quickTo(pupil, 'y', { duration: .35, ease: 'power2.out' }));
  contact.addEventListener('pointermove', event => {
    pupils.forEach((pupil, index) => {
      const eye = pupil.parentElement.getBoundingClientRect();
      const angle = Math.atan2(event.clientY - (eye.top + eye.height / 2), event.clientX - (eye.left + eye.width / 2));
      moveX[index](Math.cos(angle) * 10);
      moveY[index](Math.sin(angle) * 10);
    });
  });
  contact.addEventListener('pointerleave', () => pupils.forEach((_, index) => { moveX[index](0); moveY[index](0); }));
}

if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  const revealWords = [...document.querySelectorAll('.about-statement .reveal-word')];
  if (revealWords.length) {
    ScrollTrigger.create({
      trigger: '.about-story', start: 'top 70%', end: 'bottom 38%', scrub: true,
      onUpdate: self => {
        const visible = 4 + Math.round(self.progress * (revealWords.length - 4));
        revealWords.forEach((word, index) => word.classList.toggle('revealed', index < visible));
      }
    });
  }
  if (document.querySelector('.hero')) {
    gsap.from('.hero h1', { y: 42, opacity: 0, duration: 1.15, ease: 'power3.out' });
    gsap.from('.project-mini', { y: 26, opacity: 0, duration: .8, delay: .2, stagger: .1, ease: 'power2.out' });
  }
  if (document.querySelector('.insights')) {
    gsap.from('.insights-head > *', { y: 28, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.insights', start: 'top 78%', once: true } });
    gsap.from('.insight', { y: 60, opacity: 0, duration: 1, stagger: .16, ease: 'power3.out', scrollTrigger: { trigger: '.insights-grid', start: 'top 82%', once: true } });
  }
  document.querySelectorAll('.manifesto:not(.about-story), .work, .shop-teaser, .contact').forEach(section => {
    gsap.from(section.querySelectorAll('h2, p, .work-item, .contact-link'), {
      y: 34, opacity: 0, duration: .9, stagger: .11, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true }
    });
  });
}
