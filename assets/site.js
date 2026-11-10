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

  // Normalize /index.html to the canonical directory URL without reloading.
  var currentPath = window.location.pathname;
  if (currentPath.toLowerCase().endsWith('/index.html')) {
    var cleanPath = currentPath.slice(0, -'index.html'.length);
    window.history.replaceState(null, document.title, cleanPath + window.location.search + window.location.hash);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Keep automatic page_view disabled here; GTM is the single page_view source.
  window.gtag('config', 'G-0VY997YCWE', {
    send_page_view: false,
    allow_google_signals: true,
    allow_ad_personalization_signals: false
  });

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-0VY997YCWE';
  document.head.appendChild(tag);

  function sendEvent(name, link, extra) {
    var params = {
      transport_type: 'beacon',
      link_url: link.href,
      link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 100),
      page_path: window.location.pathname
    };
    if (extra) Object.keys(extra).forEach(function (key) { params[key] = extra[key]; });
    window.gtag('event', name, params);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    var href = link.href || '';
    var rawHref = link.getAttribute('href') || '';
    var lowerHref = href.toLowerCase();
    var label = ((link.textContent || '') + ' ' + (link.getAttribute('aria-label') || '')).toLowerCase();
    var isPhone = rawHref.toLowerCase().indexOf('tel:') === 0;
    var isAppointment = link.getAttribute('data-appointment-intent') === 'true' ||
      /rendez-vous|prendre rendez-vous|appointment|rdv/i.test(label) ||
      lowerHref.indexOf('prendre-rendez-vous-gynecologue.html') !== -1 ||
      lowerHref.indexOf('lerdvmedical.tn') !== -1 ||
      lowerHref.indexOf('yesrdv.com') !== -1;

    var isMaps = false;
    try {
      var parsedUrl = new URL(href);
      var host = parsedUrl.hostname.toLowerCase();
      isMaps = host === 'maps.app.goo.gl' ||
        ((host === 'google.com' || host === 'www.google.com' || host === 'maps.google.com') &&
          parsedUrl.pathname.toLowerCase().indexOf('/maps') === 0);
    } catch (_) {
      isMaps = label.indexOf('itinéraire google maps') !== -1 || label.indexOf('google maps') !== -1;
    }
    if (!isMaps && (label.indexOf('itinéraire google maps') !== -1 || label.indexOf('google maps') !== -1)) isMaps = true;

    if (isPhone) sendEvent('contact_phone_click', link, { contact_method: 'phone' });
    if (isAppointment) sendEvent('appointment_click', link, { appointment_method: isPhone ? 'phone' : 'online_or_page' });
    if (rawHref.toLowerCase().indexOf('mailto:') === 0) sendEvent('contact_email_click', link, { contact_method: 'email' });
    if (isMaps) sendEvent('google_maps_click', link, { destination_type: 'directions' });
    if (link.classList.contains('mobile-contact-reviews')) sendEvent('google_reviews_click', link);
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
