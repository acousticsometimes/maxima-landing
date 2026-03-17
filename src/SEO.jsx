// SEO.jsx
// Drop this next to App.jsx.
// Usage: <SEO page="home" content={content} />
// Dynamically injects <title>, <meta>, canonical, Open Graph, Twitter Card,
// and JSON-LD structured data into <head> without any extra library.

import { useEffect } from 'react';

const SITE_NAME    = 'Maxima Prospera Asia';
const SITE_URL     = 'https://www.maximaprospera.com'; // ← change to your live domain
const DEFAULT_IMG  = `${SITE_URL}/images/og-default.jpg`;
const TWITTER_HANDLE = '@MaximaProspera';

const PAGE_META = {
  home: {
    title:       'Industrial Property & Business Expansion in Indonesia | Maxima Prospera Asia',
    description: 'Expert guidance for manufacturing expansion across Indonesia\'s prime industrial zones. 14+ years experience, 200+ projects completed across Cikarang, Karawang, Batam & more.',
    keywords:    'industrial property Indonesia, factory land Indonesia, manufacturing expansion Indonesia, industrial zone Cikarang, Karawang industrial, business setup Indonesia, foreign investment Indonesia',
    canonical:   SITE_URL,
  },
  'why-us': {
    title:       'Why Choose Maxima Prospera Asia | Industrial Consultancy Indonesia',
    description: 'Discover why 200+ companies trust Maxima Prospera Asia for industrial expansion. Full-service property, licensing, and compliance support across 9 Indonesian industrial zones.',
    keywords:    'industrial consultancy Indonesia, industrial property agent Indonesia, business expansion consultant Indonesia, Maxima Prospera Asia',
    canonical:   `${SITE_URL}/why-us`,
  },
  'why-indonesia': {
    title:       'Why Invest in Indonesia | Industrial Opportunities | Maxima Prospera Asia',
    description: 'Indonesia is Southeast Asia\'s largest economy with a growing manufacturing sector. Explore investment opportunities, incentives, and strategic industrial zones.',
    keywords:    'invest in Indonesia, Indonesia manufacturing, Indonesia industrial zones, Indonesia FDI, BKPM investment Indonesia',
    canonical:   `${SITE_URL}/why-indonesia`,
  },
  'investment-guidelines': {
    title:       'Indonesia Investment Guidelines & Permits | Maxima Prospera Asia',
    description: 'Complete guide to Indonesian business permits, company setup, construction approvals, and operational licenses. Step-by-step process for foreign investors.',
    keywords:    'Indonesia business permit, PT PMA Indonesia, KITAS Indonesia, NIB Indonesia, building permit Indonesia, environmental permit Indonesia',
    canonical:   `${SITE_URL}/investment-guidelines`,
  },
  faq: {
    title:       'FAQ – Industrial Expansion in Indonesia | Maxima Prospera Asia',
    description: 'Frequently asked questions about industrial property, business registration, permits, and manufacturing expansion in Indonesia answered by our expert team.',
    keywords:    'Indonesia industrial FAQ, Indonesia business setup questions, factory Indonesia questions',
    canonical:   `${SITE_URL}/faq`,
  },
};

// JSON-LD structured data builders
const buildOrganizationSchema = (content) => ({
  '@context':   'https://schema.org',
  '@type':      'Organization',
  name:          SITE_NAME,
  url:           SITE_URL,
  logo:          `${SITE_URL}/images/logo/logo.2.png`,
  description:  'Industrial property consultancy and business expansion services in Indonesia.',
  foundingDate: '2010',
  contactPoint: {
    '@type':       'ContactPoint',
    telephone:      content?.contact?.phone    ?? '+62 812 3456 7890',
    email:          content?.contact?.email    ?? 'maximaprosperaasia@gmail.com',
    contactType:   'customer service',
    areaServed:    'ID',
    availableLanguage: ['English', 'Indonesian', 'Chinese'],
  },
  address: {
    '@type':           'PostalAddress',
    addressLocality:  'Cikarang',
    addressRegion:    'Jawa Barat',
    addressCountry:   'ID',
    streetAddress:     content?.contact?.address ?? 'Cikarang Technopark, Bekasi',
  },
  sameAs: [
    'https://www.linkedin.com/company/maxima-prospera-asia',
    'https://www.instagram.com/maximaprospera',
  ],
});

const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:        SITE_NAME,
  url:         SITE_URL,
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

const buildLocalBusinessSchema = (content) => ({
  '@context':   'https://schema.org',
  '@type':      'LocalBusiness',
  '@id':        `${SITE_URL}/#localbusiness`,
  name:          SITE_NAME,
  image:         DEFAULT_IMG,
  url:           SITE_URL,
  telephone:     content?.contact?.phone   ?? '+62 812 3456 7890',
  email:         content?.contact?.email   ?? 'maximaprosperaasia@gmail.com',
  address: {
    '@type':          'PostalAddress',
    streetAddress:     content?.contact?.address ?? 'Cikarang Technopark, Bekasi',
    addressLocality:  'Cikarang',
    addressRegion:    'Jawa Barat',
    postalCode:       '17530',
    addressCountry:   'ID',
  },
  geo: {
    '@type':    'GeoCoordinates',
    latitude:  -6.3148,
    longitude: 107.1444,
  },
  openingHoursSpecification: {
    '@type':     'OpeningHoursSpecification',
    dayOfWeek:  ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    opens:       '09:00',
    closes:      '18:00',
  },
  priceRange: '$$',
});

const buildFAQSchema = (faqItems = []) => {
  if (!faqItems.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type':          'Question',
      name:              item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:     item.a,
      },
    })),
  };
};

const buildBreadcrumbSchema = (page) => {
  const crumbs = [{ name: 'Home', url: SITE_URL }];
  if (page !== 'home') {
    const names = {
      'why-us':                 'Why Us',
      'why-indonesia':          'Why Indonesia',
      'investment-guidelines':  'Investment Guidelines',
      'faq':                    'FAQ',
    };
    crumbs.push({ name: names[page] ?? page, url: `${SITE_URL}/${page}` });
  }
  return {
    '@context':  'https://schema.org',
    '@type':     'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type':   'ListItem',
      position:   i + 1,
      name:       c.name,
      item:       c.url,
    })),
  };
};

// ── Main SEO component ────────────────────────────────────────────────────────
export default function SEO({ page = 'home', content = null, faqItems = [] }) {
  const meta = PAGE_META[page] ?? PAGE_META.home;

  // Dynamic title suffix for inner pages
  const fullTitle = meta.title;
  const ogImage   = content?.hero?.image || DEFAULT_IMG;

  useEffect(() => {
    // ── <title> ──
    document.title = fullTitle;

    // ── Helper: upsert a <meta> tag ──
    const setMeta = (selector, attrName, attrValue, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // ── Helper: upsert a <link> tag ──
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };

    // ── Helper: upsert a JSON-LD <script> ──
    const setJsonLd = (id, data) => {
      if (!data) return;
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('script');
        el.id   = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    // Basic meta
    setMeta('meta[name="description"]',          'name', 'description',          meta.description);
    setMeta('meta[name="keywords"]',             'name', 'keywords',             meta.keywords);
    setMeta('meta[name="robots"]',               'name', 'robots',               'index, follow, max-snippet:-1, max-image-preview:large');
    setMeta('meta[name="author"]',               'name', 'author',               SITE_NAME);

    // Canonical
    setLink('canonical', meta.canonical);

    // Open Graph
    setMeta('meta[property="og:type"]',          'property', 'og:type',          page === 'home' ? 'website' : 'article');
    setMeta('meta[property="og:title"]',         'property', 'og:title',         fullTitle);
    setMeta('meta[property="og:description"]',   'property', 'og:description',   meta.description);
    setMeta('meta[property="og:url"]',           'property', 'og:url',           meta.canonical);
    setMeta('meta[property="og:image"]',         'property', 'og:image',         ogImage);
    setMeta('meta[property="og:image:alt"]',     'property', 'og:image:alt',     fullTitle);
    setMeta('meta[property="og:image:width"]',   'property', 'og:image:width',   '1200');
    setMeta('meta[property="og:image:height"]',  'property', 'og:image:height',  '630');
    setMeta('meta[property="og:site_name"]',     'property', 'og:site_name',     SITE_NAME);
    setMeta('meta[property="og:locale"]',        'property', 'og:locale',        'en_US');

    // Twitter Card
    setMeta('meta[name="twitter:card"]',         'name', 'twitter:card',         'summary_large_image');
    setMeta('meta[name="twitter:site"]',         'name', 'twitter:site',         TWITTER_HANDLE);
    setMeta('meta[name="twitter:title"]',        'name', 'twitter:title',        fullTitle);
    setMeta('meta[name="twitter:description"]',  'name', 'twitter:description',  meta.description);
    setMeta('meta[name="twitter:image"]',        'name', 'twitter:image',        ogImage);

    // Geo tags (helpful for local SEO)
    setMeta('meta[name="geo.region"]',           'name', 'geo.region',           'ID-JB');
    setMeta('meta[name="geo.placename"]',        'name', 'geo.placename',        'Cikarang, West Java, Indonesia');
    setMeta('meta[name="geo.position"]',         'name', 'geo.position',         '-6.3148;107.1444');
    setMeta('meta[name="ICBM"]',                 'name', 'ICBM',                 '-6.3148, 107.1444');

    // ── JSON-LD Structured Data ──
    setJsonLd('ld-organization',  buildOrganizationSchema(content));
    setJsonLd('ld-website',       buildWebSiteSchema());
    setJsonLd('ld-localbusiness', buildLocalBusinessSchema(content));
    setJsonLd('ld-breadcrumb',    buildBreadcrumbSchema(page));
    if (page === 'faq') {
      setJsonLd('ld-faq', buildFAQSchema(faqItems));
    }

  }, [page, content, faqItems, fullTitle, meta, ogImage]);

  return null; // renders nothing — only touches <head>
}