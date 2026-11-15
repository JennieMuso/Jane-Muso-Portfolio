document.addEventListener('DOMContentLoaded', () => {
  const buttons = [...document.querySelectorAll('.shop-tabs [data-filter]')];
  const cards = [...document.querySelectorAll('.shop-product[data-category]')];
  const grid = document.querySelector('.shop-grid');
  const count = document.querySelector('.shop-results');
  if (!buttons.length || !cards.length || !count) return;

  function select(filter, updateUrl = true) {
    const choice = buttons.some((button) => button.dataset.filter === filter) ? filter : 'all';
    let visible = 0;
    buttons.forEach((button) => {
      const active = button.dataset.filter === choice;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      card.hidden = choice !== 'all' && card.dataset.category !== choice;
      if (!card.hidden) visible++;
    });
    grid?.classList.toggle('is-filtered', choice !== 'all');
    const noun = choice === 'all' ? (visible === 1 ? 'product' : 'products') : choice === 'component' ? (visible === 1 ? 'component' : 'components') : (visible === 1 ? 'website template' : 'website templates');
    count.textContent = `Showing ${visible} ${noun}`;
    if (updateUrl) {
      const url = new URL(location.href);
      if (choice === 'all') url.searchParams.delete('type');
      else url.searchParams.set('type', choice);
      history.replaceState(null, '', url);
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.filter)));
  select(new URL(location.href).searchParams.get('type') || 'all', false);
});
