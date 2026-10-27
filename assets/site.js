const menu=document.querySelector('.mobile-menu');const nav=document.querySelector('.main-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))})}document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.setAttribute('aria-label',a.getAttribute('aria-label')||'Appeler le cabinet'));

// Microsoft Clarity — project yu0c7gni4i
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yu0c7gni4i");

// Google Analytics 4 — cabinet website
(function () {
  if (window.cabinetGAInitialized) return;
  window.cabinetGAInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-0VY997YCWE', { allow_google_signals: true, allow_ad_personalization_signals: false });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-0VY997YCWE';
  document.head.appendChild(tag);
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var name = link.classList.contains('mobile-contact-reviews') ? 'google_reviews_click' : href.indexOf('tel:') === 0 ? 'contact_phone_click' :
      href.indexOf('mailto:') === 0 ? 'contact_email_click' :
      (href.indexOf('https://maps.app.goo.gl/') === 0 || href.indexOf('https://www.google.com/maps') === 0 || href.indexOf('https://google.com/maps') === 0) ? 'google_maps_click' : null;
    if (name) window.gtag('event', name, { transport_type: 'beacon' });
  });
})();

// Close the mobile navigation after choosing a page, or pressing Escape.
if (menu && nav) {
  function closeMobileNavigation() {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNavigation);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMobileNavigation();
      menu.focus();
    }
  });
}

// Search and category filters keep all FAQ answers available in the static HTML.
(function () {
  var input = document.getElementById('faq-search');
  var list = document.getElementById('faq-list');
  if (!input || !list) return;
  var items = Array.from(list.querySelectorAll('details'));
  var buttons = Array.from(document.querySelectorAll('[data-faq-filter]'));
  var status = document.querySelector('.faq-status');
  var category = 'all';
  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي');
  }
  function filter() {
    var words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    var count = 0;
    items.forEach(function (item) {
      var matches = (category === 'all' || item.dataset.faqCategory === category) && words.every(function (word) { return normalize(item.textContent).indexOf(word) !== -1; });
      item.hidden = !matches;
      if (matches) count++;
    });
    status.hidden = !words.length && category === 'all';
    status.textContent = count ? count + ' ' + status.dataset.resultWord : status.dataset.emptyText;
  }
  input.addEventListener('input', filter);
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      category = button.dataset.faqFilter;
      buttons.forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
      filter();
    });
  });
  // A shared link to a question resets filters so the answer stays visible.
  function revealHash() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    if (!target || !list.contains(target)) return;
    input.value = '';
    category = 'all';
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.faqFilter === 'all')); });
    filter();
    target.open = true;
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
})();
