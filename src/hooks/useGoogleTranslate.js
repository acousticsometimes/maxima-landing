// hooks/useGoogleTranslate.js
// Properly injects the Google Translate widget and switches language via
// the googtrans cookie + page reload — the only reliable approach for SPAs.

import { useEffect } from 'react';

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

export function useGoogleTranslate() {
  useEffect(() => {
    // Only inject once
    if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) return;

    // 1. Define the init callback BEFORE the script loads
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,id,zh-CN',
          autoDisplay: false,
          // Hide the built-in banner — we supply our own UI
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    // 2. Inject a hidden mount node (required by the library)
    if (!document.getElementById('google_translate_element')) {
      const el = document.createElement('div');
      el.id = 'google_translate_element';
      el.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;';
      document.body.appendChild(el);
    }

    // 3. Load the Google Translate script
    const script = document.createElement('script');
    script.id   = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src  = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /**
   * setLang('en')      → English (removes translation)
   * setLang('id')      → Bahasa Indonesia
   * setLang('zh-CN')   → Mandarin
   */
  const setLang = (langCode) => {
    if (langCode === 'en') {
      // Clear the cookie to restore original language
      eraseCookie('googtrans');
      // Also clear the domain-level cookie that Google sets
      eraseCookie('googtrans', window.location.hostname);
    } else {
      // Google Translate reads: /en/<target>
      setCookie('googtrans', `/en/${langCode}`);
    }
    // Hard reload so Google Translate re-initialises with the new language
    window.location.reload();
  };

  return { setLang };
}

// ── Cookie helpers ─────────────────────────────────────────────────────────────
function setCookie(name, value) {
  // Set on both root path and domain so Google Translate picks it up
  document.cookie = `${name}=${value};path=/`;
  document.cookie = `${name}=${value};path=/;domain=${window.location.hostname}`;
}

function eraseCookie(name, domain) {
  const domainPart = domain ? `;domain=${domain}` : '';
  document.cookie = `${name}=;path=/${domainPart};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}