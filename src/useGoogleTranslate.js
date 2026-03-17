// hooks/useGoogleTranslate.js
// Cookie-only approach — no DOM mount point, no widget injection.
// Translation works by setting the googtrans cookie and reloading.
// The Google Translate <script> tag in index.html handles the rest.

import { useEffect } from 'react';

export function useGoogleTranslate() {
  useEffect(() => {
    // Clean up any Google Translate UI that leaked onto the page
    const suppress = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) banner.remove();
      document.body.style.top = '0px';
      document.body.style.removeProperty('top');
    };
    suppress();
    const t = setTimeout(suppress, 1000);
    return () => clearTimeout(t);
  }, []);

  const setLang = (langCode) => {
    if (langCode === 'en') {
      eraseCookie('googtrans');
      eraseCookie('googtrans', window.location.hostname);
    } else {
      setCookie('googtrans', `/en/${langCode}`);
    }
    window.location.reload();
  };

  return { setLang };
}

function setCookie(name, value) {
  document.cookie = `${name}=${value};path=/`;
  document.cookie = `${name}=${value};path=/;domain=${window.location.hostname}`;
}

function eraseCookie(name, domain) {
  const domainPart = domain ? `;domain=${domain}` : '';
  document.cookie = `${name}=;path=/${domainPart};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}