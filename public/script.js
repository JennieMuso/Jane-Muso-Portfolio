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
let menuCloseTimer;
mobileNav.inert = true;
function setMobileMenu(open, returnFocus = false) {
  clearTimeout(menuCloseTimer);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
  if (open) {
    mobileNav.hidden = false;
    mobileNav.inert = false;
    requestAnimationFrame(() => mobileNav.classList.add('is-open'));
    mobileNav.querySelector('a')?.focus({ preventScroll: true });
  } else {
    mobileNav.classList.remove('is-open');
    mobileNav.inert = true;
    menuCloseTimer = setTimeout(() => { mobileNav.hidden = true; }, 480);
    if (returnFocus) menuButton.focus({ preventScroll: true });
  }
}
menuButton.addEventListener('click', () => setMobileMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMobileMenu(false, true);
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches && menuButton.getAttribute('aria-expanded') === 'true') setMobileMenu(false);
});

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
  if (!window.matchMedia('(max-width: 700px)').matches && !navigator.connection?.saveData) document.querySelectorAll('.insight-media img, .blog-article-image img').forEach(image => {
    gsap.fromTo(image, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: .6 }
    });
  });
}
