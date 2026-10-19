
// Vector flags render consistently on Windows, macOS and mobile.
(function () {
  var flags = {
    fr: { label: 'FR', name: 'Français', art: '<path fill="#fff" d="M0 0h30v20H0z"/><path fill="#002395" d="M0 0h10v20H0z"/><path fill="#ed2939" d="M20 0h10v20H20z"/>' },
    ar: { label: 'AR', name: 'العربية', art: '<path fill="#e70013" d="M0 0h30v20H0z"/><circle cx="15" cy="10" r="6" fill="#fff"/><circle cx="14" cy="10" r="4.5" fill="#e70013"/><circle cx="15.5" cy="10" r="3.7" fill="#fff"/><path fill="#e70013" d="m18.5 10-2.7.88 1.67-2.3v2.84L15.8 9.12z"/>' },
    en: { label: 'EN', name: 'English', art: '<path fill="#012169" d="M0 0h30v20H0z"/><path stroke="#fff" stroke-width="4" d="m0 0 30 20M30 0 0 20"/><path stroke="#c8102e" stroke-width="1.5" d="m0 0 30 20M30 0 0 20"/><path stroke="#fff" stroke-width="6" d="M15 0v20M0 10h30"/><path stroke="#c8102e" stroke-width="3.5" d="M15 0v20M0 10h30"/>' }
  };
  document.querySelectorAll('.lang-switch a[hreflang]').forEach(function (link) {
    var flag = flags[link.getAttribute('hreflang')];
    if (!flag) return;
    link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="18" height="12" aria-hidden="true" focusable="false" style="display:block;flex:none;border-radius:1px;box-shadow:0 0 0 1px rgba(0,0,0,.08)">' + flag.art + '</svg><span>' + flag.label + '</span>';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.gap = '5px';
    link.style.direction = 'ltr';
    link.setAttribute('aria-label', flag.name);
  });
})();

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
  window.gtag('config', 'G-0VY997YCWE', { allow_google_signals: false, allow_ad_personalization_signals: false });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-0VY997YCWE';
  document.head.appendChild(tag);
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var name = href.indexOf('tel:') === 0 ? 'contact_phone_click' :
      href.indexOf('mailto:') === 0 ? 'contact_email_click' :
      (href.indexOf('https://maps.app.goo.gl/') === 0 || href.indexOf('https://www.google.com/maps') === 0 || href.indexOf('https://google.com/maps') === 0) ? 'google_maps_click' : null;
    if (name) window.gtag('event', name, { transport_type: 'beacon' });
  });
})();
