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
