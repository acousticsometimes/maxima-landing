/**
 * useLandingContent.js  –  Maxima Landing Site
 * Drop into: src/hooks/useLandingContent.js
 *
 * FIX 1: The editor saves content nested under `home.*`, `whyUs.*` etc.
 *         This hook flattens it so the landing site can read it correctly.
 *
 * FIX 2: Uses a module-level cache so the Firestore fetch only happens ONCE
 *         across the entire session — no re-fetching on page navigation.
 *
 * FIX 3: Correct relative import path for the fallback static content.
 *
 * The hook returns a `content` object with this shape (matches landing site usage):
 * {
 *   hero:       { title1, title2, description, ctaConsultation, ctaProfile, image }
 *   stats:      [{ number, label }]
 *   services:   { title, description, items: [...] }
 *   locations:  { title, description, items: [...] }
 *   process:    { title, description, steps: [...] }
 *   cta:        { title, description, btn1, btn2 }
 *   contact:    { email, phone, whatsapp, address }
 *   whyUs:      { header, banner, intro, pillars, cards, deliverables, process, services, team, gallery }
 *   whyIndonesia: { header, facts, chart, destinations }
 *   investmentGuidelines: { header, guidelines }
 *   faq:        { header, items }
 * }
 */

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// ─── Static fallback (used when Firestore is offline) ────────────────────────
const FALLBACK = {
  maintenanceMode: false,
  hero: {
    title1: 'Your gateway to',
    title2: 'industrial Indonesia',
    description: "Expert guidance for manufacturing expansion across Indonesia's prime industrial zones. From site selection to permits, we handle every detail.",
    ctaConsultation: 'Get Free Consultation',
    ctaProfile: 'Company Profile',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80',
  },
  stats: [
    { number: '14+', label: 'Years of Experience' },
    { number: '200+', label: 'Projects Completed' },
    { number: '15+', label: 'Countries Served' },
    { number: '7+',   label: 'Industrial Zones' },
  ],
  discover: [
    { id: 'why-us', title: 'Why Us?', desc: 'Discover our expertise and proven track record in industrial expansion.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
    { id: 'why-indonesia', title: 'Why Indonesia?', desc: 'Explore the economic potential and strategic advantages.', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
    { id: 'investment-guidelines', title: 'Investment Guidelines', desc: 'Essential regulations and procedures for foreign investors.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' }
  ],
  services: {
    title: 'Complete expansion services',
    description: 'End-to-end support for your Indonesian manufacturing operations.',
    items: [
      { id: 1, title: 'Property & Land Acquisition', description: 'Expert site selection and property acquisition.', features: ['Site surveys', 'Negotiation', 'Legal clearance'] },
      { id: 2, title: 'Business Setup', description: 'Complete company registration and strategic planning.', features: ['Incorporation', 'Feasibility', 'Market analysis'] },
      { id: 3, title: 'Permits & Compliance', description: 'Navigate Indonesian regulations with expertise.', features: ['Permits', 'Immigration', 'Tax'] },
      { id: 4, title: 'Ongoing Support', description: 'Performance monitoring and compliance management.', features: ['Audits', 'Monitoring', 'Advisory'] },
    ],
  },
  locations: {
    title: 'Strategic coverage across Indonesia',
    description: 'Nine major industrial zones from West to East Java.',
    items: [
      { id: 1, name: 'Jakarta',   region: 'West Java',    image: 'https://images.unsplash.com/photo-1555899434-94d1368d7dd6?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Cikarang',  region: 'West Java',    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
      { id: 3, name: 'Karawang',  region: 'West Java',    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80' },
      { id: 4, name: 'Subang',    region: 'West Java',    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
      { id: 5, name: 'Semarang',  region: 'Central Java', image: 'https://images.unsplash.com/photo-1584278562758-d9c25d803627?auto=format&fit=crop&w=800&q=80' },
      { id: 6, name: 'Kendal',    region: 'Central Java', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
      { id: 7, name: 'Batang',    region: 'Central Java', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80' },
      { id: 8, name: 'Grobogan',  region: 'Central Java', image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=800&q=80' },
      { id: 9, name: 'Sidoarjo',  region: 'East Java',    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  process: {
    title: 'How we work',
    description: 'A streamlined process designed for efficiency and clarity.',
    steps: [
      { step: '01', title: 'Initial Consultation', description: 'Discuss your requirements' },
      { step: '02', title: 'Site Selection',        description: 'Identify optimal locations' },
      { step: '03', title: 'Due Diligence',         description: 'Comprehensive assessment' },
      { step: '04', title: 'Execution',             description: 'Smooth transaction' },
    ],
  },
  cta: {
    title: 'Ready to Explore Indonesia?',
    description: 'Schedule a free consultation with our team to discuss your expansion plans.',
    btn1: 'Download Guide',
    btn2: 'Schedule Consultation',
  },
  contact: {
    email:    'maximaprosperaasia@gmail.com',
    phone:    '+65 1234 5678',
    whatsapp: '+65 1234 5678',
    address:  'West Java, Indonesia',
  },
  whyUs: {
    header:      { title: 'Why Us?', subtitle: 'With over 14 years of experience in manufacturing industry development.' },
    banner:      { image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80' },
    intro:       { text: 'The most important principle for our business is Trust, Care, Convenience, Saving Time, & Money.' },
    pillars:     [{ title: 'Property Agency', description: 'For secondary and primary properties.' }, { title: 'Business Consultancy', description: 'Feasibility Study, Permit and Licenses.' }, { title: 'Commodity Trading', description: 'For Nickel, coal, iron, bauxite.' }],
    cards:       [{ title: 'Key Locations', desc: 'Our operations span 9 major industrial zones across Indonesia.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80' }],
    deliverables: ['Undertake the industrial land search', 'Advise on local comprehension', 'Facilitate the QnA due diligence', 'Facilitate negotiation process', 'Liaise for transaction preparation', 'Ensure successful sales transaction'],
    process:     { title: 'Our Process', description: 'A clear approach.', steps: [{ step: '01', title: 'Discovery', description: 'Understand your goals' }, { step: '02', title: 'Strategy', description: 'Develop a tailored plan' }, { step: '03', title: 'Execution', description: 'Implement with precision' }, { step: '04', title: 'Delivery', description: 'Ensure successful outcomes' }] },
    services:    { title: 'What We Offer', description: 'Comprehensive services tailored to your needs.', items: [{ title: 'Industrial Property', description: 'Full-service property solutions.' }, { title: 'Permit Management', description: 'End-to-end permit handling.' }] },
    team:        [{ name: 'Michael Rino', role: 'Principal', description: 'Provides strategic oversight.', image: '/images/team/michael.jpg' }, { name: 'Michelle Prayogo', role: 'Marketing Director', description: 'Facilitates dialogue.', image: '/images/team/michelle.jpg' }, { name: 'Subekti Aswinanto', role: 'Site Surveyor', description: 'Handles coordination.', image: '/images/team/subekti.jpg' }],
    gallery:     ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'],
  },
  whyIndonesia: {
    header:       { title: 'Our Presence in Indonesia', subtitle: "Explore Indonesia's vast potential." },
    facts:        [{ title: 'Economic', subtitle: 'Largest Economy in SEA', description: 'Indonesia is #1 in Southeast Asia' }, { title: 'Population', subtitle: '#4 Most Populous', description: '278 million citizens' }],
    chart:        { title: 'Top 5 Investment Realizations in Central Java', data: [{ country: 'Singapore', value: 35, color: '#0775b9' }, { country: 'China', value: 28, color: '#0a6e55' }] },
    destinations: [{ title: 'Karawang', desc: 'Heart of Jakarta-Bandung corridor.', points: ['Hub of 1,762 manufacturing companies', '1.5 million workforce'], image: '' }],
  },
  investmentGuidelines: {
    header:     { title: 'Complete Investment Guidelines', subtitle: 'We have prepared a thorough investment guideline just for you.' },
    guidelines: [{ category: 'Establishment & Pre-Investments', items: ['Company Name Reservation', 'Deed of Establishment', 'Business License'] }],
  },
  faq: {
    header: { title: 'Frequently Asked Questions', subtitle: 'Find answers to common questions.' },
    items:  [{ q: 'What services does Maxima Prospera Asia provide?', a: 'We provide end-to-end industrial expansion services.' }],
  },
};

// ─── Module-level cache — survives React re-renders & page navigation ─────────
// This means Firestore is only fetched ONCE per browser session, not on every
// component mount. Subsequent hook calls return the cached data instantly.
let _cache    = null;  // the mapped content object
let _listeners = [];   // components waiting for the first load

const mapFirestoreToContent = (raw) => {
  // The Firestore document is shaped by the dashboard editor:
  // { home: { hero, stats, services, locations, process, cta, contact }, whyUs, ... }
  //
  // The landing site expects a FLAT shape at the top level.
  // This function bridges the gap.

  const home = raw?.home ?? {};

  // hero: editor stores title as a single string with \n, site expects title1/title2
  const heroTitle = home?.hero?.title ?? FALLBACK.hero.title1 + '\n' + FALLBACK.hero.title2;
  const [title1 = FALLBACK.hero.title1, title2 = FALLBACK.hero.title2] = heroTitle.split('\n');

  return {
    maintenanceMode: raw?.maintenanceMode ?? false,
    // ── Home page fields (flattened from home.* to root) ──
    hero: {
      title1:           title1.trim(),
      title2:           title2.trim(),
      description:      home?.hero?.description      ?? FALLBACK.hero.description,
      ctaConsultation:  home?.hero?.ctaConsultation  ?? FALLBACK.hero.ctaConsultation,
      ctaProfile:       home?.hero?.ctaProfile       ?? FALLBACK.hero.ctaProfile,
      image:            home?.hero?.image            ?? FALLBACK.hero.image,
    },
    stats:    home?.stats    ?? FALLBACK.stats,
    services: home?.services ?? FALLBACK.services,
    discover: home?.discover ?? FALLBACK.discover,
    locations: home?.locations ?? FALLBACK.locations,
    process:  home?.process  ?? FALLBACK.process,
    cta:      home?.cta      ?? FALLBACK.cta,
    contact:  home?.contact  ?? FALLBACK.contact,

    // ── Sub-page fields (passed through as-is) ──
    whyUs:                raw?.whyUs                ?? FALLBACK.whyUs,
    whyIndonesia:         raw?.whyIndonesia         ?? FALLBACK.whyIndonesia,
    investmentGuidelines: raw?.investmentGuidelines ?? FALLBACK.investmentGuidelines,
    faq:                  raw?.faq                  ?? FALLBACK.faq,
  };
};

// ─── Hook ────────────────────────────────────────────────────────────────────
const useLandingContent = () => {
  // If we already have cached data, skip the loading state entirely
  const [content, setContent] = useState(_cache ?? FALLBACK);
  const [loading, setLoading] = useState(_cache === null);
  const [error, setError]     = useState(null);

  useEffect(() => {
    // Cache hit — nothing to do, data already loaded
    if (_cache !== null) return;

    const unsubscribe = onSnapshot(
      doc(db, 'landing', 'content'),
      (snap) => {
        const mapped = snap.exists()
          ? mapFirestoreToContent(snap.data())
          : FALLBACK;

        // Update module-level cache so future hook calls are instant
        _cache = mapped;

        setContent(mapped);
        setLoading(false);

        // Notify any other mounted components that were also waiting
        _listeners.forEach(fn => fn(mapped));
        _listeners = [];
      },
      (err) => {
        console.warn('Firestore unavailable, using static fallback content:', err.message);
        _cache = FALLBACK;
        setContent(FALLBACK);
        setLoading(false);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, []);

  return { content, loading, error };
};

export default useLandingContent;
