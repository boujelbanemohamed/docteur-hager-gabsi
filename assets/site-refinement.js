// Advice filters: every article remains readable when JavaScript is unavailable.
(function () {
  var filters = document.querySelector('.editorial-filters');
  if (!filters) return;
  var cards = Array.from(document.querySelectorAll('[data-advice-category]'));
  var buttons = Array.from(filters.querySelectorAll('[data-advice-filter]'));
  var status = document.querySelector('.editorial-status');
  filters.hidden = false;
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.dataset.adviceFilter;
      cards.forEach(function (card) { card.hidden = category !== 'all' && card.dataset.adviceCategory !== category; });
      buttons.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      if (status) { status.hidden = true; status.textContent = ''; }
    });
  });
})();
