document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('[data-blog-load-more]');
  const cards = [...document.querySelectorAll('[data-blog-card]')];
  if (!button || cards.length <= 4) return;

  const revealNext = () => {
    cards.filter((card) => card.hidden).slice(0, 4).forEach((card) => {
      card.hidden = false;
    });
    if (!cards.some((card) => card.hidden)) button.hidden = true;
  };

  button.addEventListener('click', revealNext);
});
