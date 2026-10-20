// Progressive enhancement: all seven services remain visible without JavaScript.
document.querySelectorAll('.care-section').forEach(function (section) {
  var filters = section.querySelector('.care-filters');
  var cards = Array.from(section.querySelectorAll('.care-card'));
  var status = section.querySelector('.care-filter-status');
  if (!filters || !cards.length || !status) return;
  filters.hidden = false;
  var buttons = Array.from(filters.querySelectorAll('[data-care-filter]'));
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.dataset.careFilter;
      var count = 0;
      cards.forEach(function (card) {
        var show = category === 'all' || card.dataset.careCategory.split(' ').indexOf(category) !== -1;
        card.hidden = !show;
        if (show) count++;
      });
      buttons.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      status.hidden = false;
      status.textContent = count + ' ' + status.dataset.countWord;
    });
  });
});
