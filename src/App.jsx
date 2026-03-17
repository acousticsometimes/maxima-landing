import { useState, useEffect, useRef } from 'react';
import {
  Moon, Sun, Menu, X, ArrowRight, Check, MapPin,
  FileText, Shield, Mail, Phone, Download, ChevronDown,
  ChevronLeft, ChevronRight, MessageCircle, Calendar, Clock, Globe
} from 'lucide-react';
import WhyUs from './WhyUs';
import WhyIndonesia from './WhyIndonesia';
import InvestmentGuidelines from './InvestmentGuidelines';
import FAQ from './FAQ';
import SEO from './SEO';
import useLandingContent from './hooks/useLandingContent';
import { useGoogleTranslate } from './hooks/useGoogleTranslate';

/* ─── Scroll Reveal ── */
const Reveal = ({ children, delay = 0, from = 'bottom', noOpacity = false, className = '' }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(e.target); }
    }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => ref.current && obs.unobserve(ref.current);
  }, [delay]);
  const tmap = { bottom:'translateY(32px)', left:'translateX(-32px)', right:'translateX(32px)', top:'translateY(-32px)' };
  return (
    <div ref={ref} className={className} style={{
      transition: noOpacity ? 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' : 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      opacity: noOpacity ? 1 : (vis ? 1 : 0),
      transform: vis ? 'translate(0)' : (tmap[from] || tmap.bottom),
    }}>{children}</div>
  );
};

export default function App() {
  const { content, loading } = useLandingContent();
  const { setLang } = useGoogleTranslate();
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showResourceGate, setShowResourceGate] = useState(false);
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [whatsAppFormData, setWhatsAppFormData] = useState({ name:'', company:'', size:'', location:'' });
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({ service:'', location:[], propertyType:'', propertySize:'', timeline:'', name:'', company:'', email:'', phone:'', wantsMeeting:null, meetingType:'', meetingDate:'', meetingTime:'' });
  const [locIndex, setLocIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const autoRef = useRef(null);
  const discoverRef = useRef(null);
  const langRef = useRef(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const processGridRef = useRef(null);
  const [processLineVisible, setProcessLineVisible] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);

  useEffect(() => {
    const getCookie = n => { const v=`; ${document.cookie}`, p=v.split(`; ${n}=`); if(p.length===2) return p.pop().split(';').shift(); return null; };
    const lc = getCookie('googtrans');
    if (lc && lc !== 'null') { const c=lc.split('/')[2]; if(c==='id') setLanguage('IND'); else if(c==='zh-CN') setLanguage('CHN'); else setLanguage('ENG'); }
  }, []);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => { const t = setInterval(() => setPlaceholderIndex(p=>(p+1)%3), 4000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (!processGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setProcessLineVisible(true); }, { threshold: 0.3 });
    obs.observe(processGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (discoverRef.current && !discoverRef.current.contains(e.target)) setDiscoverOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (loading) return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#022f54', fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:16, fontWeight:500 }}>Loading...</div>
  );

  if (content?.maintenanceMode) return (
    <div style={{ height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:24, background:'#f4f6f9', color:'#0d1e30', fontFamily:'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ padding:40, background:'#fff', borderRadius:24, boxShadow:'0 20px 56px rgba(2,47,84,0.12)', textAlign:'center', maxWidth:480, margin:20 }}>
        <div style={{ width:64, height:64, background:'#edf4fc', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#0775b9' }}><Shield size={28}/></div>
        <h1 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:24, fontWeight:800, marginBottom:12 }}>Under Maintenance</h1>
        <p style={{ fontSize:15, color:'#5a7390', lineHeight:1.65 }}>We are currently updating our website. Please check back soon.</p>
      </div>
    </div>
  );

  const placeholderImages = [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
  ];
  const galleryImages = content?.whyUs?.gallery?.length > 0 ? content.whyUs.gallery : [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
  ];

  const services = content?.services?.items ?? [
    { id:'property', title:'Property & Land Acquisition', description:'Expert site selection and property acquisition across 9 major industrial zones in Indonesia.', features:['Site surveys & due diligence','Negotiation support','Legal clearance'] },
    { id:'business', title:'Business Setup & Registration', description:'Complete company registration and strategic planning for market entry.', features:['Company incorporation','Feasibility studies','Market analysis'] },
    { id:'permits',  title:'Permits & Compliance',          description:'Navigate Indonesian regulations with our permit and licensing expertise.', features:['Permit applications','Immigration services','Tax consultation'] },
    { id:'support',  title:'Ongoing Support',               description:'Performance monitoring and compliance management for operational excellence.', features:['Performance audits','Compliance monitoring','Strategic advisory'] },
  ];
  const locations = (content?.locations?.items ?? []).map(loc => ({ id:loc.name.toLowerCase().replace(/ /g,'-'), name:loc.name, image:loc.image, desc:loc.desc??`Industrial zone in ${loc.region}.`, specs:loc.specs??[loc.region] }));
  const discoverCards = content?.discover ?? [];
  const processSteps = content?.process?.steps ?? [
    { step:'01', title:'Initial Consultation', description:'Discuss your requirements and objectives with our expert team.' },
    { step:'02', title:'Site Selection',        description:'Identify optimal locations tailored specifically to your needs.' },
    { step:'03', title:'Due Diligence',         description:'Comprehensive legal and site assessment for full transparency.' },
    { step:'04', title:'Execution',             description:'Smooth transaction and seamless handover process.' },
  ];
  const brands = ['WIDEX','YASUFUKU','VIRIDI GROUP','GLOBAL TECH','ASIA MFG','SELAMAT SEMPURNA','ASTRA','YAMAHA','BRIDGESTONE','TOYOTA'];

  const heroTitleLines = (content?.hero?.title ?? 'Your gateway to\nindustrial Indonesia').split('\n');
  const heroTitle1 = heroTitleLines[0] ?? 'Your gateway to';
  const heroTitle2 = heroTitleLines[1] ?? 'industrial Indonesia';
  const heroDesc   = content?.hero?.description ?? "Expert guidance for manufacturing expansion across Indonesia's prime industrial zones.";
  const heroCta1   = content?.hero?.ctaConsultation ?? 'Get Free Consultation';
  const heroCta2   = content?.hero?.ctaProfile ?? 'Company Profile';
  const heroImage  = content?.hero?.image ?? 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80';
  const heroStats  = content?.stats ?? [{ number:'14+', label:'Years of Experience' },{ number:'200+', label:'Projects Completed' },{ number:'15+', label:'Countries Served' },{ number:'7+', label:'Industrial Zones' }];
  const ctaTitle   = content?.cta?.title ?? 'Ready to Explore Indonesia?';
  const ctaDesc    = content?.cta?.description ?? 'Schedule a free consultation with our team to discuss your expansion plans.';
  const ctaBtn1    = content?.cta?.btn1 ?? 'Download Guide';
  const ctaBtn2    = content?.cta?.btn2 ?? 'Schedule Consultation';
  const procTitle  = content?.process?.title ?? 'How we work';
  const procDesc   = content?.process?.description ?? 'A streamlined, transparent process designed for efficiency and clarity.';

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => { setLocIndex(p => p < Math.max(0, locations.length - itemsPerView) ? p + 1 : 0); }, 4000);
  };
  const navigateTo = (page, sec) => {
    setActivePage(page); setMobileMenuOpen(false); setDiscoverOpen(false);
    if (sec && page === 'home') setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior:'smooth' }), 100);
    else window.scrollTo({ top:0, behavior:'instant' });
  };
  const toggleLoc = l => setFormData(p => ({ ...p, location: p.location.includes(l) ? p.location.filter(x=>x!==l) : [...p.location, l] }));
  const handleFormSubmit = () => {
    alert(formData.wantsMeeting ? 'Thank you! Please wait for a confirmation email.' : 'Thank you! We will contact you within 24 hours.');
    setShowEnquiryForm(false); setFormStep(1);
    setFormData({ service:'', location:[], propertyType:'', propertySize:'', timeline:'', name:'', company:'', email:'', phone:'', wantsMeeting:null, meetingType:'', meetingDate:'', meetingTime:'' });
  };
  const openWA = (location='') => { setWhatsAppFormData(p => ({ ...p, location })); setShowWhatsAppForm(true); };
  const handleWASubmit = e => {
    e.preventDefault();
    const { name, company, size, location } = whatsAppFormData;
    if (!name||!company||!size) { alert('Please fill in all required fields'); return; }
    window.open(`https://wa.me/6281234567890?text=Hello%2C%20I%20am%20interested%20in%20expanding%20to%20Indonesia.%0A%0AName%3A%20${name}%0ACompany%3A%20${company}%0ARequired%20Size%3A%20${size}%0ALocation%3A%20${location}`, '_blank');
    setShowWhatsAppForm(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root {
      --blue:#0775b9; --blue-dark:#0563a0; --blue-dim:rgba(7,117,185,0.10);
      --navy:#022f54; --navy-2:#03416e;
      --bg:#ffffff; --surface:#f4f6f9; --surface-2:#edf0f4; --border:#e2e6ec;
      --text:#0d1e30; --text-2:#3d5168; --muted:#6b7f95;
      --shadow-sm:0 2px 8px rgba(2,47,84,0.06); --shadow-md:0 8px 28px rgba(2,47,84,0.10); --shadow-lg:0 20px 56px rgba(2,47,84,0.14);
      --max:1600px; --pad:80px;
    }
    .dm { --bg:#0c1420; --surface:#131e2d; --surface-2:#1a2535; --border:rgba(255,255,255,0.09); --text:#e8f0f8; --text-2:#a8bdd4; --muted:#6b8099; --blue-dim:rgba(7,117,185,0.18); }
    html { scroll-behavior:smooth; }
    body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text); -webkit-font-smoothing:antialiased; }

    /* ── Google Translate suppression ── */
    .goog-te-banner-frame,.goog-te-balloon-frame,.goog-te-menu-frame,.goog-te-bubble-frame,#goog-gt-tt,.skiptranslate,#gt-mount { display:none!important; visibility:hidden!important; height:0!important; }
    body { top:0!important; }
    body > font[id] { display:contents!important; }

    /* ════ NAV ════ */
    .nav { position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(255,255,255,0.94); backdrop-filter:blur(24px) saturate(200%); border-bottom:1px solid var(--border); }
    .dm .nav { background:rgba(12,20,32,0.94); }
    .nav-inner { max-width:var(--max); margin:0 auto; padding:0 var(--pad); height:72px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
    .nav-logo { display:flex; align-items:center; gap:8px; cursor:pointer; flex-shrink:0; }
    .nav-logo-word { font-family:'Plus Jakarta Sans',sans-serif; font-size:17px; font-weight:900; letter-spacing:0.15em; color:var(--navy); text-transform:uppercase; }
    .dm .nav-logo-word { color:#e8f0f8; }
    .nav-links { display:flex; align-items:center; gap:4px; flex:1; justify-content:flex-end; }
    .nav-link { padding:8px 16px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; color:var(--text-2); background:none; border:none; cursor:pointer; transition:color .18s,background .18s; white-space:nowrap; }
    .nav-link:hover { color:var(--text); background:var(--surface); }
    .nav-right { display:flex; align-items:center; gap:16px; flex-shrink:0; }
    .nav-divider { width:1px; height:22px; background:var(--border); }
    .nav-icon-btn { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:none; border:none; cursor:pointer; color:var(--muted); transition:background .18s; }
    .nav-icon-btn:hover { background:var(--surface); color:var(--text); }
    .nav-cta { display:flex; align-items:center; gap:7px; padding:10px 22px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:700; color:#fff; background:var(--blue); border:none; cursor:pointer; transition:background .18s,transform .15s; white-space:nowrap; }
    .nav-cta:hover { background:var(--blue-dark); transform:translateY(-1px); }
    .nav-lang-wrap,.discover-wrap { position:relative; }
    .nav-lang-btn { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; color:var(--text-2); background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; }
    .nav-lang-btn:hover { color:var(--text); }
    .disc-trigger { display:flex; align-items:center; gap:4px; }
    .dd-menu { position:absolute; top:calc(100% + 12px); left:50%; transform:translateX(-50%); background:var(--bg); border:1px solid var(--border); border-radius:16px; padding:8px; box-shadow:var(--shadow-lg); min-width:200px; animation:ddIn .15s ease; z-index:200; }
    @keyframes ddIn { from{opacity:0;transform:translateX(-50%) translateY(-8px);} to{opacity:1;transform:translateX(-50%) translateY(0);} }
    .dd-item { width:100%; text-align:left; padding:10px 16px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; color:var(--muted); background:none; border:none; border-radius:10px; cursor:pointer; transition:color .15s,background .15s; display:block; }
    .dd-item:hover { color:var(--text); background:var(--blue-dim); }
    .mob-toggle { display:none; }

    /* ════ HERO ════ */
    .hero-outer { background:var(--bg); padding-top:72px; }
    .hero-inner { max-width:var(--max); margin:0 auto; padding:120px var(--pad) 0; text-align:center; }
    .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; padding:7px 18px; border-radius:40px; background:var(--blue-dim); font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--blue); margin-bottom:32px; }
    .hero-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(56px,8vw,96px); font-weight:800; letter-spacing:-3px; line-height:1.02; color:var(--text); margin-bottom:28px; }
    .hero-desc { font-size:21px; font-weight:400; color:var(--muted); line-height:1.7; max-width:640px; margin:0 auto 48px; }
    .hero-btns { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:72px; justify-content:center; }
    .btn-outline { padding:14px 30px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:600; color:var(--text); background:none; border:1.5px solid var(--border); cursor:pointer; transition:border-color .18s,background .18s,color .18s; }
    .btn-outline:hover { border-color:var(--blue); background:var(--blue-dim); color:var(--blue); }
    .btn-filled { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; color:#fff; background:var(--blue); border:none; cursor:pointer; transition:background .18s,transform .15s; }
    .btn-filled:hover { background:var(--blue-dark); transform:translateY(-2px); }

    /* ════ HERO BANNER ════ */
    .hero-banner-wrap { max-width:var(--max); margin:0 auto; padding:0 var(--pad) 120px; }
    .hero-banner { width:100%; height:600px; border-radius:28px; overflow:hidden; position:relative; background:#0a1624; box-shadow:var(--shadow-lg); }
    .hero-banner img { width:100%; height:100%; object-fit:cover; display:block; }
    .hero-banner-grad { position:absolute; inset:0; background:linear-gradient(to right,rgba(2,15,40,0.82) 0%,rgba(2,15,40,0.28) 55%,transparent 100%); }
    .hero-stats-row { position:absolute; bottom:0; left:0; right:0; display:flex; align-items:flex-end; padding:48px 64px; gap:0; }
    .hero-stat { padding-right:32px; border-right:1px solid rgba(255,255,255,0.15); margin-right:32px; }
    .hero-stat:last-child { border-right:none; margin-right:0; }
    .hs-num { font-family:'Plus Jakarta Sans',sans-serif; font-size:52px; font-weight:800; color:#fff; letter-spacing:-2px; line-height:1; }
    .hs-label { font-size:13px; font-weight:500; color:rgba(255,255,255,0.55); margin-top:6px; letter-spacing:0.03em; }

    /* ════ DISCOVER ════ */
    .disc-section { max-width:var(--max); margin:0 auto; padding:0 var(--pad) 120px; }
    .disc-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1.7fr; gap:24px; align-items:stretch; }
    .disc-card { border-radius:24px; overflow:hidden; cursor:pointer; background:var(--surface); border:1px solid var(--border); transition:transform .3s,box-shadow .3s; display:flex; flex-direction:column; }
    .disc-card:hover { transform:translateY(-8px); box-shadow:var(--shadow-lg); }
    .disc-card-img-wrap { overflow:hidden; height:220px; flex-shrink:0; }
    .disc-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s; }
    .disc-card:hover .disc-card-img { transform:scale(1.07); }
    .disc-card-body { padding:28px; flex:1; display:flex; flex-direction:column; }
    .disc-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:21px; font-weight:800; color:var(--text); margin-bottom:10px; display:flex; align-items:center; justify-content:space-between; }
    .disc-card-arrow { color:var(--blue); flex-shrink:0; }
    .disc-card-desc { font-size:15px; color:var(--muted); line-height:1.65; flex:1; }
    .disc-placeholder { grid-column:4; border-radius:24px; position:relative; overflow:hidden; background:#111; box-shadow:var(--shadow-md); }
    .disc-placeholder-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 1.2s ease-in-out; }
    .disc-placeholder-img.visible { opacity:1; }
    .disc-placeholder-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(2,15,40,0.55),transparent 50%); }

    /* ════ BRANDS ════ */
    .brands-strip { border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:40px 0; overflow:hidden; }
    .brands-mask { mask-image:linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%); }
    .brands-ticker { display:flex; gap:112px; width:max-content; animation:ticker 45s linear infinite; }
    .brands-ticker:hover { animation-play-state:paused; }
    @keyframes ticker { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
    .brand-item { font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:#c8d4df; white-space:nowrap; transition:color .2s; cursor:default; }
    .brand-item:hover { color:var(--blue); }

    /* ════ SERVICES ════ */
    .services-section { max-width:var(--max); margin:0 auto; padding:140px var(--pad); }
    .services-layout { display:grid; grid-template-columns:1fr 1.8fr; gap:120px; align-items:start; }
    .services-left { position:sticky; top:100px; }
    .services-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--blue); margin-bottom:18px; display:block; }
    .services-big-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(40px,4.5vw,60px); font-weight:800; letter-spacing:-2px; line-height:1.04; color:var(--text); margin-bottom:20px; }
    .services-desc { font-size:18px; color:var(--muted); line-height:1.75; max-width:360px; }
    .service-pills { display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:stretch; }
    .service-pill { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:36px; display:flex; flex-direction:column; gap:12px; cursor:default; transition:border-color .2s,box-shadow .2s,transform .2s; }
    .service-pill:hover { border-color:rgba(7,117,185,0.3); box-shadow:var(--shadow-md); transform:translateY(-4px); }
    .sp-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:19px; font-weight:800; color:var(--text); }
    .sp-desc { font-size:15px; color:var(--muted); line-height:1.7; flex:1; }
    .sp-feats { display:flex; flex-direction:column; gap:8px; margin-top:10px; }
    .sp-feat { font-size:13.5px; color:var(--text-2); display:flex; align-items:center; gap:10px; font-weight:400; }
    .sp-feat::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--blue); flex-shrink:0; }

    /* ════ LOCATIONS ════ */
    .locs-section { background:var(--surface); padding:140px 0; }
    .locs-inner { max-width:var(--max); margin:0 auto; padding:0 var(--pad); }
    .locs-top { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px; gap:24px; }
    .locs-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--blue); margin-bottom:14px; display:block; }
    .locs-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(36px,4vw,54px); font-weight:800; letter-spacing:-1.5px; line-height:1.06; color:var(--text); }
    .locs-sub { font-size:17px; color:var(--muted); line-height:1.65; max-width:520px; margin-top:14px; }
    .locs-navbtns { display:flex; gap:10px; flex-shrink:0; }
    .loc-nav-btn { width:50px; height:50px; border-radius:50%; border:1.5px solid var(--border); background:var(--bg); color:var(--text); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s,border-color .18s,transform .15s; }
    .loc-nav-btn:hover { background:var(--navy); border-color:var(--navy); color:#fff; transform:scale(1.07); }
    .locs-overflow { overflow:hidden; border-radius:20px; }
    .locs-track { display:flex; transition:transform .7s cubic-bezier(.25,.46,.45,.94); }
    .locs-slide { flex-shrink:0; padding-right:18px; }
    .loc-card { position:relative; border-radius:20px; overflow:hidden; height:380px; background:var(--navy); cursor:pointer; }
    .loc-card img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s; }
    .loc-card:hover img { transform:scale(1.07); }
    .loc-card-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(2,15,40,0.92) 0%,transparent 60%); }
    .loc-card-info { position:absolute; bottom:0; left:0; right:0; padding:28px; }
    .lc-tag { font-family:'Plus Jakarta Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; display:flex; align-items:center; gap:4px; }
    .lc-name { font-family:'Plus Jakarta Sans',sans-serif; font-size:22px; font-weight:800; color:#fff; }
    .lc-hover { max-height:0; overflow:hidden; transition:max-height .4s ease,opacity .3s; opacity:0; }
    .loc-card:hover .lc-hover { max-height:100px; opacity:1; }
    .lc-desc { font-size:14px; color:rgba(255,255,255,0.72); margin-top:8px; line-height:1.55; }
    .locs-dots { display:flex; gap:7px; justify-content:center; margin-top:28px; }
    .locs-dot { height:5px; border-radius:99px; background:var(--border); cursor:pointer; transition:width .3s,background .3s; }
    .locs-dot.on { background:var(--blue); }

    /* ════ PROCESS ════ */
    .proc-section { max-width:var(--max); margin:0 auto; padding:140px var(--pad); text-align:center; }
    .proc-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--blue); margin-bottom:18px; display:block; }
    .proc-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(36px,4vw,54px); font-weight:800; letter-spacing:-1.5px; line-height:1.06; color:var(--text); margin-bottom:14px; }
    .proc-sub { font-size:18px; color:var(--muted); line-height:1.7; max-width:560px; margin:0 auto 80px; }
    .proc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; position:relative; align-items:stretch; }
    .proc-line-connector { position:absolute; top:54px; left:12.5%; width:75%; height:1px; background:var(--border); }
    .proc-line-connector::after { content:''; position:absolute; top:0; left:0; height:100%; width:0%; background:var(--blue); transition:width 1.2s ease-out; }
    .proc-line-connector.animate::after { width:100%; }
    .proc-card { background:var(--navy); border-radius:22px; padding:44px 32px 36px; text-align:left; transition:transform .25s,box-shadow .25s; display:flex; flex-direction:column; }
    .proc-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(2,47,84,0.4); }
    .proc-num { font-family:'Plus Jakarta Sans',sans-serif; font-size:72px; font-weight:900; color:rgba(7,117,185,0.25); line-height:1; letter-spacing:-4px; margin-bottom:24px; }
    .proc-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:20px; font-weight:800; color:#fff; margin-bottom:10px; }
    .proc-card-desc { font-size:15px; color:rgba(255,255,255,0.6); line-height:1.7; flex:1; }

    /* ════ CTA + FOOTER WRAPPER ════ */
    .cta-footer-wrapper { background:linear-gradient(135deg,var(--navy) 0%,#03416e 55%,var(--blue) 100%); overflow:hidden; padding:28px; }
    .cta-section { padding:140px var(--pad); text-align:center; }
    .cta-inner { max-width:760px; margin:0 auto; }
    .cta-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:20px; display:block; }
    .cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(36px,5vw,60px); font-weight:800; letter-spacing:-2px; color:#fff; margin-bottom:18px; line-height:1.06; }
    .cta-desc { font-size:20px; color:rgba(255,255,255,0.65); line-height:1.7; margin-bottom:48px; }
    .cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
    .btn-cta-w { padding:16px 32px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:700; color:var(--navy); background:#fff; border:none; cursor:pointer; transition:transform .15s,box-shadow .15s; box-shadow:0 4px 20px rgba(0,0,0,0.18); }
    .btn-cta-w:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(0,0,0,0.22); }
    .btn-cta-g { display:inline-flex; align-items:center; gap:8px; padding:16px 32px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:600; color:#fff; background:rgba(255,255,255,0.12); border:1.5px solid rgba(255,255,255,0.22); cursor:pointer; transition:background .18s,transform .15s; }
    .btn-cta-g:hover { background:rgba(255,255,255,0.2); transform:translateY(-2px); }

    /* ════ FOOTER ════ */
    .footer { background:#07111e; padding:96px var(--pad) 48px; border-radius:56px; }
    .footer-inner { max-width:var(--max); margin:0 auto; }

    /* Top grid: brand | nav | services | contact */
    .footer-top { display:grid; grid-template-columns:1.4fr 1fr 1.2fr 1.6fr; gap:64px; margin-bottom:64px; }
    .footer-brand { display:flex; flex-direction:column; }
    .footer-logo-row { display:flex; align-items:center; gap:10px; margin-bottom:20px; cursor:pointer; }
    .footer-logo-img { height:60px; width:auto; }
    .footer-about { font-size:15px; color:#4a6070; line-height:1.8; max-width:280px; margin-bottom:28px; }
    .footer-socials { display:flex; gap:10px; }
    .footer-social { width:38px; height:38px; border-radius:10px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); display:flex; align-items:center; justify-content:center; color:#4a6070; font-size:11px; font-weight:700; cursor:pointer; transition:background .18s,color .18s,border-color .18s; text-decoration:none; }
    .footer-social:hover { background:var(--blue); border-color:var(--blue); color:#fff; }

    .footer-nav-col,.footer-contact-col { }
    .footer-col-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; color:rgba(255,255,255,0.35); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:20px; }
    .footer-links { display:flex; flex-direction:column; gap:12px; }
    .footer-link { font-size:15px; color:#4a6070; background:none; border:none; cursor:pointer; text-align:left; padding:0; font-family:'DM Sans',sans-serif; transition:color .15s; }
    .footer-link:hover { color:#e8f0f8; }

    .footer-ci { display:flex; gap:12px; align-items:flex-start; margin-bottom:16px; }
    .footer-ci-icon { width:34px; height:34px; border-radius:9px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:center; color:#4a6070; flex-shrink:0; }
    .footer-ci-text { font-size:15px; color:#4a6070; line-height:1.6; }
    .footer-ci-link { transition:color .15s; text-decoration:none; }
    .footer-ci-link:hover { color:#e8f0f8; }

    /* Newsletter row */
    .footer-nl-wrap { margin-top:28px; }
    .footer-nl-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; color:rgba(255,255,255,0.35); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:12px; }
    .footer-nl-row { display:flex; gap:0; }
    .footer-inp { flex:1; padding:12px 16px; border-radius:11px 0 0 11px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-right:none; color:#e8f0f8; font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color .18s; }
    .footer-inp:focus { border-color:var(--blue); }
    .footer-inp::placeholder { color:#2e3e4e; }
    .footer-sub { padding:12px 20px; border-radius:0 11px 11px 0; background:var(--blue); color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:700; border:none; cursor:pointer; transition:background .18s; white-space:nowrap; flex-shrink:0; }
    .footer-sub:hover { background:#0563a0; }

    /* Bottom row */
    .footer-divider { height:1px; background:rgba(255,255,255,0.06); margin-bottom:28px; }
    .footer-bottom { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
    .footer-copy { font-size:13px; color:#2e3e4e; }
    .footer-bl { display:flex; gap:24px; }
    .footer-blink { font-size:13px; color:#2e3e4e; background:none; border:none; cursor:pointer; transition:color .15s; font-family:'DM Sans',sans-serif; }
    .footer-blink:hover { color:var(--blue); }

    /* ════ GALLERY ════ */
    .wu-gallery { padding:96px var(--pad) 72px; }
    .wu-gallery-inner { max-width:var(--max); margin:0 auto; }
    .wu-gallery-frame { position:relative; border-radius:22px; overflow:hidden; height:520px; background:#0a1624; box-shadow:var(--shadow-md); }
    .wu-gallery-frame img { width:100%; height:100%; object-fit:cover; display:block; }
    .wu-gallery-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.35),transparent 55%); opacity:0; transition:opacity .3s; }
    .wu-gallery-frame:hover .wu-gallery-overlay { opacity:1; }
    .wu-gallery-btn { position:absolute; top:50%; transform:translateY(-50%); width:44px; height:44px; border-radius:50%; border:none; cursor:pointer; background:rgba(255,255,255,0.16); color:#fff; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(8px); opacity:0; transition:opacity .25s,background .2s,transform .2s; }
    .wu-gallery-frame:hover .wu-gallery-btn { opacity:1; }
    .wu-gallery-btn:hover { background:rgba(255,255,255,0.28); transform:translateY(-50%) scale(1.08); }
    .wu-gallery-prev { left:18px; } .wu-gallery-next { right:18px; }
    .wu-gallery-dots { display:flex; gap:7px; justify-content:center; margin-top:16px; }
    .wu-gallery-dot { width:7px; height:7px; border-radius:50%; background:rgba(0,0,0,0.18); cursor:pointer; transition:background .2s,transform .2s; }
    .wu-gallery-dot.on { background:var(--blue); transform:scale(1.3); }

    /* ════ MODALS ════ */
    .modal-bg { position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.52); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; padding:20px; animation:bgFadeIn .2s; }
    @keyframes bgFadeIn { from{opacity:0;} to{opacity:1;} }
    .modal-box { background:var(--bg); border:1px solid var(--border); border-radius:28px; max-width:780px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:0 40px 100px rgba(0,0,0,0.28); animation:modalPop .22s cubic-bezier(.34,1.56,.64,1); }
    @keyframes modalPop { from{opacity:0;transform:scale(.94) translateY(14px);} to{opacity:1;transform:scale(1) translateY(0);} }
    .modal-head { display:flex; justify-content:space-between; align-items:flex-start; padding:28px 32px; border-bottom:1px solid var(--border); }
    .modal-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:21px; font-weight:800; color:var(--text); }
    .modal-x { width:32px; height:32px; border-radius:50%; background:var(--surface); border:none; cursor:pointer; color:var(--muted); display:flex; align-items:center; justify-content:center; transition:background .15s; flex-shrink:0; }
    .modal-x:hover { background:var(--border); }
    .modal-body { padding:28px 32px; }
    .modal-foot { padding:20px 32px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; }
    .prog { display:flex; gap:4px; margin-top:10px; }
    .prog-s { flex:1; height:3px; border-radius:99px; background:var(--border); transition:background .3s; }
    .prog-s.on { background:var(--blue); }
    .prog-label { font-size:13px; color:var(--muted); margin-top:6px; }
    .fl { font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:600; color:var(--text-2); display:block; margin-bottom:7px; }
    .fi { width:100%; padding:13px 16px; border-radius:10px; background:var(--surface); border:1.5px solid var(--border); color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color .18s,box-shadow .18s; }
    .fi:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(7,117,185,.09); }
    .fstack { display:flex; flex-direction:column; gap:16px; }
    .frow2 { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
    .ficon-w { position:relative; }
    .ficon-w svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; }
    .ficon-w .fi { padding-left:38px; }
    .cg { display:grid; gap:10px; }
    .cg2 { grid-template-columns:1fr 1fr; }
    .cg3 { grid-template-columns:repeat(3,1fr); }
    .cb { padding:14px 15px; border-radius:11px; border:1.5px solid var(--border); background:var(--bg); cursor:pointer; text-align:left; transition:border-color .18s,background .18s; }
    .cb:hover { border-color:var(--blue); background:var(--blue-dim); }
    .cb.sel { border-color:var(--blue); background:var(--blue-dim); }
    .cb-t { font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:700; color:var(--text); margin-bottom:3px; }
    .cb-d { font-size:12px; color:var(--muted); }
    .cb-c { text-align:center; }
    .cb-c svg { margin:0 auto 5px; color:var(--blue); }
    .btn-b { padding:9px 20px; border-radius:9px; border:1.5px solid var(--border); background:none; color:var(--muted); font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:background .15s; }
    .btn-b:hover { background:var(--surface); }
    .btn-b:disabled { opacity:.35; cursor:not-allowed; }
    .btn-n { padding:9px 22px; border-radius:9px; background:var(--navy); color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:700; border:none; cursor:pointer; transition:background .15s; }
    .btn-n:hover { background:#011e38; }
    .wa-bg { position:fixed; inset:0; z-index:300; background:rgba(0,0,0,0.52); backdrop-filter:blur(10px); display:flex; align-items:flex-end; justify-content:center; animation:bgFadeIn .2s; }
    @media (min-width:560px) { .wa-bg { align-items:center; padding:20px; } }
    .wa-box { background:var(--bg); border-radius:24px 24px 0 0; max-width:520px; width:100%; box-shadow:0 -16px 60px rgba(0,0,0,0.18); animation:waUp .26s cubic-bezier(.34,1.56,.64,1); }
    @media (min-width:560px) { .wa-box { border-radius:24px; animation:modalPop .22s cubic-bezier(.34,1.56,.64,1); } }
    @keyframes waUp { from{transform:translateY(100%);} to{transform:translateY(0);} }
    .btn-wa { width:100%; padding:14px; border-radius:11px; background:#128C7E; color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:700; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background .18s; }
    .btn-wa:hover { background:#075E54; }
    .loc-modal-box { background:var(--bg); border:1px solid var(--border); border-radius:28px; max-width:840px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:0 40px 100px rgba(0,0,0,0.28); animation:modalPop .22s cubic-bezier(.34,1.56,.64,1); }
    .lm-img { width:100%; height:280px; object-fit:cover; border-radius:28px 28px 0 0; display:block; }
    .lm-body { padding:36px; }
    .lm-desc { font-size:17px; color:var(--muted); line-height:1.7; margin-bottom:28px; }
    .lm-feats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:28px; }
    .lm-feat { display:flex; align-items:center; gap:8px; padding:14px 16px; background:var(--blue-dim); border-radius:11px; font-size:13px; font-weight:600; color:var(--navy); }
    .lm-feat svg { color:var(--blue); flex-shrink:0; }
    .lm-acts { display:flex; justify-content:flex-end; gap:12px; }
    .dl-icon { width:64px; height:64px; border-radius:50%; background:var(--blue-dim); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; color:var(--blue); }
    .wa-fab { position:fixed; bottom:28px; right:28px; z-index:150; display:flex; align-items:center; background:#128C7E; color:#fff; border:none; border-radius:99px; cursor:pointer; padding:14px 17px; box-shadow:0 8px 28px rgba(18,140,126,0.42); transition:box-shadow .2s,transform .2s; overflow:hidden; }
    .wa-fab:hover { box-shadow:0 12px 36px rgba(18,140,126,0.52); transform:scale(1.04); }
    .wa-fab-label { max-width:0; overflow:hidden; white-space:nowrap; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; transition:max-width .3s,margin-left .3s; }
    .wa-fab:hover .wa-fab-label { max-width:120px; margin-left:9px; }
    .mob-menu { border-top:1px solid var(--border); background:var(--bg); padding:16px 24px 24px; animation:slideD .18s ease; }
    @keyframes slideD { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
    .mob-section { font-family:'Plus Jakarta Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin:16px 0 8px; }
    .mob-link { display:block; width:100%; text-align:left; padding:13px 0; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; color:var(--text); background:none; border:none; border-bottom:1px solid var(--border); cursor:pointer; }

    /* ════ RESPONSIVE ════ */
    @media (max-width:1280px) {
      :root { --pad:48px; }
      .disc-grid { grid-template-columns:1fr 1fr; }
      .disc-placeholder { grid-column:auto; }
      .services-layout { grid-template-columns:1fr; gap:56px; }
      .services-left { position:static; }
      .proc-grid { grid-template-columns:repeat(2,1fr); }
      .footer-top { grid-template-columns:1fr 1fr; gap:48px; }
      .lm-feats { grid-template-columns:1fr; }
    }
    @media (max-width:768px) {
      :root { --pad:24px; }
      .nav-links { display:none; }
      .mob-toggle { display:flex; gap:6px; align-items:center; }
      .hero-h1 { font-size:clamp(40px,10vw,64px); letter-spacing:-2px; }
      .hero-inner { padding:80px 24px 0; }
      .hero-banner-wrap { padding:0 24px 72px; }
      .hero-banner { height:320px; }
      .hero-stats-row { padding:20px 28px; }
      .hero-stat { padding-right:24px; margin-right:24px; }
      .hs-num { font-size:32px; }
      .services-section,.proc-section { padding:80px 24px; }
      .service-pills { grid-template-columns:1fr; }
      .locs-inner { padding:0 24px; }
      .locs-section { padding:80px 0; }
      .locs-title { font-size:36px; }
      .cta-section { padding:80px 24px; }
      .cta-footer-wrapper { padding:16px; }
      .footer { padding:64px 24px 36px; border-radius:32px; }
      .wu-gallery { padding:64px 0 48px; }
      .wu-gallery-frame { height:320px; }
      .footer-top { grid-template-columns:1fr; gap:40px; }
      .footer-nl-row { flex-direction:column; }
      .footer-inp { border-radius:11px; border-right:1px solid rgba(255,255,255,0.09); }
      .footer-sub { border-radius:11px; margin-top:8px; }
      .frow2 { grid-template-columns:1fr; }
      .disc-grid { grid-template-columns:1fr; }
    }
    @media (max-width:480px) {
      .proc-grid { grid-template-columns:1fr; }
      .cg3 { grid-template-columns:1fr 1fr; }
    }
  `;

  return (
    <div className={darkMode ? 'dm' : ''} style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', fontFamily:"'DM Sans', sans-serif" }}>
      <SEO page={activePage} content={content} faqItems={content?.faq?.items ?? []} />
      <style>{css}</style>

      {/* ════ NAV ════ */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigateTo('home')}>
            <img src="/images/logo/maximalogo.png" alt="Maxima Prospera Asia" style={{ height: '20px' }} />
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigateTo('home')}>Home</button>
            <div className="discover-wrap" ref={discoverRef}>
              <button className="nav-link disc-trigger" onClick={() => setDiscoverOpen(!discoverOpen)}>Discover <ChevronDown size={12}/></button>
              {discoverOpen && (
                <div className="dd-menu">
                  <button className="dd-item" onClick={() => navigateTo('why-us')}>Why Us</button>
                  <button className="dd-item" onClick={() => navigateTo('why-indonesia')}>Why Indonesia</button>
                  <button className="dd-item" onClick={() => navigateTo('investment-guidelines')}>Investment Guidelines</button>
                </div>
              )}
            </div>
            <button className="nav-link" onClick={() => navigateTo('home','services')}>Services</button>
            <button className="nav-link" onClick={() => navigateTo('home','locations')}>Locations</button>
            <button className="nav-link" onClick={() => navigateTo('faq')}>FAQ</button>
            <button className="nav-link" onClick={() => navigateTo('home','contact')}>Contact</button>
          </div>
          <div className="nav-right">
            <div className="nav-divider"/>
            <button className="nav-cta" onClick={() => setShowEnquiryForm(true)}>Get Started <ArrowRight size={13}/></button>
            <div className="nav-lang-wrap" ref={langRef}>
              <button className="nav-lang-btn" onClick={() => setLangOpen(!langOpen)}><Globe size={14}/> {language} <ChevronDown size={11}/></button>
              {langOpen && (
                <div className="dd-menu">
                  <button className="dd-item" onClick={() => { setLanguage('ENG'); setLang('en'); setLangOpen(false); }}>English</button>
                  <button className="dd-item" onClick={() => { setLanguage('IND'); setLang('id'); setLangOpen(false); }}>Bahasa Indonesia</button>
                  <button className="dd-item" onClick={() => { setLanguage('CHN'); setLang('zh-CN'); setLangOpen(false); }}>Mandarin</button>
                </div>
              )}
            </div>
          </div>
          <div className="mob-toggle">
            <button className="nav-icon-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={15}/> : <Moon size={15}/>}</button>
            <button className="nav-icon-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={17}/> : <Menu size={17}/>}</button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mob-menu">
            <div className="mob-section">Discover</div>
            <button className="mob-link" onClick={() => navigateTo('why-us')}>Why Us</button>
            <button className="mob-link" onClick={() => navigateTo('why-indonesia')}>Why Indonesia</button>
            <button className="mob-link" onClick={() => navigateTo('investment-guidelines')}>Investment Guidelines</button>
            <div className="mob-section">Menu</div>
            <button className="mob-link" onClick={() => navigateTo('home','services')}>Services</button>
            <button className="mob-link" onClick={() => navigateTo('home','locations')}>Locations</button>
            <button className="mob-link" onClick={() => navigateTo('faq')}>FAQ</button>
            <button className="mob-link" onClick={() => navigateTo('home','contact')}>Contact</button>
            <div style={{ marginTop:18 }}>
              <button className="btn-filled" style={{ width:'100%', justifyContent:'center', borderRadius:12 }} onClick={() => { setShowEnquiryForm(true); setMobileMenuOpen(false); }}>Get Started <ArrowRight size={14}/></button>
            </div>
          </div>
        )}
      </nav>

      {/* ════ HOME ════ */}
      {activePage === 'home' && (<>

        {/* HERO */}
        <div className="hero-outer">
          <div className="hero-inner">
            <Reveal delay={40}><span className="hero-eyebrow">Industrial Consultancy &amp; Property</span></Reveal>
            <Reveal delay={100}><h1 className="hero-h1">{heroTitle1}<br/>{heroTitle2}</h1></Reveal>
            <Reveal delay={180}><p className="hero-desc">{heroDesc}</p></Reveal>
            <Reveal delay={240}>
              <div className="hero-btns">
                <button className="btn-outline" onClick={() => navigateTo('why-us')}>{heroCta2}</button>
                <button className="btn-filled" onClick={() => setShowEnquiryForm(true)}>{heroCta1} <ArrowRight size={15}/></button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="hero-banner-wrap">
          <Reveal delay={300}>
            <div className="hero-banner">
              <img src={heroImage} alt="Industrial Indonesia"/>
              <div className="hero-banner-grad"/>
              <div className="hero-stats-row">
                {heroStats.map(s => (
                  <div key={s.number} className="hero-stat">
                    <div className="hs-num">{s.number}</div>
                    <div className="hs-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* DISCOVER */}
        <div className="disc-section">
          <div className="disc-grid">
            {discoverCards.map((card, i) => (
              <Reveal key={card.id} delay={i * 80}>
                <div className="disc-card" onClick={() => navigateTo(card.id)} style={{ height:'100%' }}>
                  <div className="disc-card-img-wrap"><img className="disc-card-img" src={card.image} alt={card.title} loading="lazy"/></div>
                  <div className="disc-card-body">
                    <div className="disc-card-title">{card.title}<span className="disc-card-arrow"><ArrowRight size={15}/></span></div>
                    <div className="disc-card-desc">{card.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={discoverCards.length * 80}>
              <div className="disc-placeholder" style={{ minHeight:480 }}>
                {placeholderImages.map((src, i) => (<img key={src} src={src} alt="" className={`disc-placeholder-img${i===placeholderIndex?' visible':''}`} loading="lazy"/>))}
                <div className="disc-placeholder-overlay"/>
              </div>
            </Reveal>
          </div>
        </div>

        {/* BRANDS */}
        <div className="brands-strip">
          <div className="brands-mask">
            <div className="brands-ticker">
              {[...brands,...brands,...brands].map((b,i) => <span key={i} className="brand-item">{b}</span>)}
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services">
          <div className="services-section">
            <div className="services-layout">
              <div className="services-left">
                <Reveal>
                  <span className="services-eyebrow">Our Services</span>
                  <div className="services-big-title">{content?.services?.title ?? 'Complete\nExpansion\nService'}</div>
                  <p className="services-desc" style={{ marginTop:20 }}>Everything you need to successfully enter and operate in Indonesia's industrial landscape — from first land search to full operations.</p>
                </Reveal>
              </div>
              <div className="service-pills">
                {services.map((svc, i) => (
                  <Reveal key={svc.id ?? i} delay={i * 80}>
                    <div className="service-pill" style={{ height:'100%' }}>
                      <div className="sp-title">{svc.title}</div>
                      <div className="sp-desc">{svc.description}</div>
                      <div className="sp-feats">{(svc.features??[]).map((f,fi) => <div key={fi} className="sp-feat">{f}</div>)}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="locs-section" id="locations">
          <div className="locs-inner">
            <div className="locs-top">
              <Reveal>
                <div>
                  <span className="locs-eyebrow">Industrial Zones</span>
                  <div className="locs-title">{content?.locations?.title ?? 'Strategic coverage\nacross Indonesia'}</div>
                  <div className="locs-sub">{content?.locations?.description ?? 'Nine major industrial zones from West to East Java, carefully curated for your expansion.'}</div>
                </div>
              </Reveal>
              <div className="locs-navbtns">
                <button className="loc-nav-btn" onClick={() => { clearInterval(autoRef.current); const mx=Math.max(0,locations.length-itemsPerView); setLocIndex(p=>p>0?p-1:mx); startAuto(); }}><ChevronLeft size={16}/></button>
                <button className="loc-nav-btn" onClick={() => { clearInterval(autoRef.current); const mx=Math.max(0,locations.length-itemsPerView); setLocIndex(p=>p<mx?p+1:0); startAuto(); }}><ChevronRight size={16}/></button>
              </div>
            </div>
            <div className="locs-overflow">
              <div className="locs-track" style={{ width:`${locations.length*100/itemsPerView}%`, transform:`translateX(-${locIndex*(100/locations.length)}%)` }}>
                {locations.map(loc => (
                  <div key={loc.id} className="locs-slide" style={{ width:`${100/locations.length}%` }}>
                    <div className="loc-card" onClick={() => setSelectedLocation(loc)}>
                      <img src={loc.image} alt={loc.name} loading="lazy"/>
                      <div className="loc-card-grad"/>
                      <div className="loc-card-info">
                        <div className="lc-tag"><MapPin size={9}/>Industrial Zone</div>
                        <div className="lc-name">{loc.name}</div>
                        <div className="lc-hover"><div className="lc-desc">{loc.desc}</div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="locs-dots">
              {Array.from({ length:Math.max(1,locations.length-itemsPerView+1) }).map((_,i) => (
                <div key={i} className={`locs-dot${i===locIndex?' on':''}`} style={{ width:i===locIndex?24:5 }} onClick={() => { setLocIndex(i); startAuto(); }}/>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process">
          <div className="proc-section">
            <Reveal>
              <span className="proc-eyebrow">Methodology</span>
              <h2 className="proc-title">{procTitle}</h2>
              <p className="proc-sub">{procDesc}</p>
            </Reveal>
            <div className="proc-grid" ref={processGridRef}>
              <div className={`proc-line-connector${processLineVisible?' animate':''}`}/>
              {processSteps.map((p, i) => (
                <Reveal key={p.step} delay={600 + i * 150}>
                  <div className="proc-card">
                    <div className="proc-num">{p.step}</div>
                    <div className="proc-card-title">{p.title}</div>
                    <div className="proc-card-desc">{p.description}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>)}

      {/* ════ INNER PAGES ════ */}
      {activePage==='why-us' && <WhyUs language="en"/>}
      {activePage==='why-indonesia' && <WhyIndonesia language="en" onOpenWhatsApp={openWA}/>}
      {activePage==='investment-guidelines' && <InvestmentGuidelines language="en"/>}
      {activePage==='faq' && <FAQ language="en"/>}

      {/* ════ CTA + FOOTER ════ */}
      <div className="cta-footer-wrapper">
        {activePage==='home' && (
          <section className="cta-section" id="contact">
            <div className="cta-inner">
              <Reveal>
                <span className="cta-eyebrow">Get in Touch</span>
                <h2 className="cta-title">{ctaTitle}</h2>
                <p className="cta-desc">{ctaDesc}</p>
                <div className="cta-btns">
                  <button className="btn-cta-w" onClick={() => setShowResourceGate(true)}>{ctaBtn1}</button>
                  <button className="btn-cta-g" onClick={() => setShowEnquiryForm(true)}>{ctaBtn2} <ArrowRight size={15}/></button>
                </div>
              </Reveal>
            </div>
          </section>
        )}
        {activePage==='why-us' && (
          <section className="wu-gallery">
            <div className="wu-gallery-inner">
              <Reveal>
                <div className="wu-gallery-frame">
                  {galleryImages.map((src,i) => (<img key={src} src={src} alt={`Gallery ${i+1}`} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:i===gallerySlide?1:0, transition:'opacity 0.9s ease' }}/>))}
                  <div className="wu-gallery-overlay"/>
                  <button className="wu-gallery-btn wu-gallery-prev" onClick={() => setGallerySlide(p=>(p-1+galleryImages.length)%galleryImages.length)}>❮</button>
                  <button className="wu-gallery-btn wu-gallery-next" onClick={() => setGallerySlide(p=>(p+1)%galleryImages.length)}>❯</button>
                </div>
                <div className="wu-gallery-dots">{galleryImages.map((_,i) => <div key={i} className={`wu-gallery-dot${i===gallerySlide?' on':''}`} onClick={() => setGallerySlide(i)}/>)}</div>
              </Reveal>
            </div>
          </section>
        )}
        <footer className="footer">
          <div className="footer-inner">
            {/* ── TOP ROW: Brand + Nav columns + Contact ── */}
            <div className="footer-top">
              {/* Brand col */}
              <div className="footer-brand">
                <div className="footer-logo-row" onClick={() => navigateTo('home')}>
                  <img src="/images/logo/logo.2.png" alt="Maxima Prospera Asia" className="footer-logo-img"/>
                </div>
                <p className="footer-about">Your trusted partner for industrial expansion in Indonesia — from site selection to full operations.</p>
                <div className="footer-socials">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">in</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">ig</a>
                </div>
              </div>

              {/* Quick links */}
              <div className="footer-nav-col">
                <div className="footer-col-title">Quick Links</div>
                <div className="footer-links">
                  <button className="footer-link" onClick={() => navigateTo('home')}>Home</button>
                  <button className="footer-link" onClick={() => navigateTo('why-us')}>Why Us</button>
                  <button className="footer-link" onClick={() => navigateTo('why-indonesia')}>Why Indonesia</button>
                  <button className="footer-link" onClick={() => navigateTo('investment-guidelines')}>Investment Guidelines</button>
                  <button className="footer-link" onClick={() => navigateTo('faq')}>FAQ</button>
                </div>
              </div>

              {/* Services */}
              <div className="footer-nav-col">
                <div className="footer-col-title">Services</div>
                <div className="footer-links">
                  <button className="footer-link" onClick={() => navigateTo('home','services')}>Property & Land Acquisition</button>
                  <button className="footer-link" onClick={() => navigateTo('home','services')}>Business Setup & Registration</button>
                  <button className="footer-link" onClick={() => navigateTo('home','services')}>Permits & Compliance</button>
                  <button className="footer-link" onClick={() => navigateTo('home','services')}>Ongoing Support</button>
                </div>
              </div>

              {/* Contact + newsletter */}
              <div className="footer-contact-col">
                <div className="footer-col-title">Get in Touch</div>
                <div className="footer-ci"><div className="footer-ci-icon"><MapPin size={13}/></div><div className="footer-ci-text">{content?.contact?.address ?? 'Cikarang Technopark, Bekasi, Jawa Barat, Indonesia'}</div></div>
                <div className="footer-ci"><div className="footer-ci-icon"><Mail size={13}/></div><a href={`mailto:${content?.contact?.email ?? 'maximaprosperaasia@gmail.com'}`} className="footer-ci-text footer-ci-link">{content?.contact?.email ?? 'maximaprosperaasia@gmail.com'}</a></div>
                <div className="footer-ci"><div className="footer-ci-icon"><Phone size={13}/></div><a href={`tel:${content?.contact?.phone ?? '+628123456789'}`} className="footer-ci-text footer-ci-link">{content?.contact?.phone ?? '+62 812 3456 7890'}</a></div>
                <div className="footer-nl-wrap">
                  <div className="footer-nl-label">Stay Updated</div>
                  <div className="footer-nl-row">
                    <input className="footer-inp" type="email" placeholder="Your email address"/>
                    <button className="footer-sub">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="footer-divider"/>

            {/* ── BOTTOM ROW ── */}
            <div className="footer-bottom">
              <span className="footer-copy">© 2026 PT Maxima Prospera Asia. All rights reserved. · Cikarang, West Java, Indonesia</span>
              <div className="footer-bl">
                <button className="footer-blink">Privacy Policy</button>
                <button className="footer-blink">Terms of Service</button>
                <button className="footer-blink">Cookie Policy</button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* WA FAB */}
      <button className="wa-fab" onClick={() => openWA()}><MessageCircle size={21}/><span className="wa-fab-label">Chat with us</span></button>

      {/* ENQUIRY MODAL */}
      {showEnquiryForm && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setShowEnquiryForm(false)}>
          <div className="modal-box">
            <div className="modal-head">
              <div>
                <div className="modal-title">Get Free Consultation</div>
                <div className="prog">{[1,2,3,4,5,6].map(s=><div key={s} className={`prog-s${s<=formStep?' on':''}`}/>)}</div>
                <div className="prog-label">Step {formStep} of 6</div>
              </div>
              <button className="modal-x" onClick={() => setShowEnquiryForm(false)}><X size={13}/></button>
            </div>
            <div className="modal-body">
              {formStep===1 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>What can we help you with?</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>Select the service you're interested in</div><div className="cg cg2">{[['Property Search','Find the perfect industrial location'],['Business Licensing','Navigate Indonesian regulations'],['Company Registration','Set up your business entity'],['Tax/Audit Services','Compliance and performance']].map(([v,d])=>(<button key={v} className={`cb${formData.service===v?' sel':''}`} onClick={()=>setFormData({...formData,service:v})}><div className="cb-t">{v}</div><div className="cb-d">{d}</div></button>))}</div></div>)}
              {formStep===2 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>Which areas interest you?</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>Select one or more locations</div><div className="cg cg3">{locations.map(a=>(<button key={a.id} className={`cb cb-c${formData.location.includes(a.name)?' sel':''}`} onClick={()=>toggleLoc(a.name)}><MapPin size={14}/><div className="cb-t">{a.name}</div></button>))}</div></div>)}
              {formStep===3 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>Property Details</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>Tell us your requirements</div><div className="fstack"><div><label className="fl">Rent or purchase?</label><div className="cg cg3">{['Rent','Purchase','Land Only'].map(t=><button key={t} className={`cb${formData.propertyType===t?' sel':''}`} onClick={()=>setFormData({...formData,propertyType:t})}><div className="cb-t">{t}</div></button>)}</div></div><div><label className="fl">Estimated size needed (sqm)</label><input type="number" className="fi" placeholder="e.g. 5000" value={formData.propertySize} onChange={e=>setFormData({...formData,propertySize:e.target.value})}/></div></div></div>)}
              {formStep===4 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>Timeline</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>How soon do you plan to start?</div><div className="cg cg2">{['Immediate','3–6 Months','6–12 Months','Just Exploring'].map(t=><button key={t} className={`cb${formData.timeline===t?' sel':''}`} onClick={()=>setFormData({...formData,timeline:t})}><div className="cb-t">{t}</div></button>)}</div></div>)}
              {formStep===5 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>Contact Details</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>Who should we send the proposal to?</div><div className="fstack"><div className="frow2"><div><label className="fl">Full Name *</label><input className="fi" placeholder="John Doe" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/></div><div><label className="fl">Company *</label><input className="fi" placeholder="ABC Manufacturing" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})}/></div></div><div><label className="fl">Email *</label><input type="email" className="fi" placeholder="john@company.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/></div><div><label className="fl">Phone *</label><input type="tel" className="fi" placeholder="+62 xxx xxxx xxxx" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/></div></div></div>)}
              {formStep===6 && (<div><div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:19, fontWeight:700, color:'var(--text)', marginBottom:6 }}>Schedule a Meeting</div><div style={{ fontSize:15, color:'var(--muted)', marginBottom:20 }}>Would you like to book a consultation?</div><div className="fstack"><div className="cg cg2">{[[true,'Schedule a meeting','Book a time with our team'],[false,'Just enquiring',"We'll reach out within 24h"]].map(([val,t,d])=>(<button key={String(val)} className={`cb${formData.wantsMeeting===val?' sel':''}`} onClick={()=>setFormData({...formData,wantsMeeting:val,...(!val&&{meetingDate:'',meetingTime:'',meetingType:''})})}><div className="cb-t">{t}</div><div className="cb-d">{d}</div></button>))}</div>{formData.wantsMeeting&&(<div className="fstack"><div><label className="fl">Meeting Type</label><select className="fi" value={formData.meetingType} onChange={e=>setFormData({...formData,meetingType:e.target.value})}><option value="">Select Type</option><option>Online Consultation</option><option>Site Survey</option><option>Office Visit</option></select></div><div className="frow2"><div><label className="fl">Date</label><div className="ficon-w"><Calendar size={14}/><input type="date" className="fi" value={formData.meetingDate} onChange={e=>setFormData({...formData,meetingDate:e.target.value})}/></div></div><div><label className="fl">Time</label><div className="ficon-w"><Clock size={14}/><input type="time" className="fi" value={formData.meetingTime} onChange={e=>setFormData({...formData,meetingTime:e.target.value})}/></div></div></div></div>)}</div></div>)}
            </div>
            <div className="modal-foot">
              <button className="btn-b" disabled={formStep===1} onClick={()=>setFormStep(p=>Math.max(1,p-1))}>Back</button>
              {formStep<6 ? <button className="btn-n" onClick={()=>setFormStep(p=>p+1)}>Next</button>
                : (formData.wantsMeeting===false||(formData.wantsMeeting===true&&formData.meetingDate&&formData.meetingTime)) ? <button className="btn-n" onClick={handleFormSubmit}>Submit</button> : null}
            </div>
          </div>
        </div>
      )}

      {/* RESOURCE GATE */}
      {showResourceGate && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setShowResourceGate(false)}>
          <div className="modal-box" style={{ maxWidth:420 }}>
            <div className="modal-head"><div className="modal-title">Download Guide</div><button className="modal-x" onClick={()=>setShowResourceGate(false)}><X size={13}/></button></div>
            <div className="modal-body">
              <div className="dl-icon"><Download size={26}/></div>
              <div style={{ textAlign:'center', marginBottom:24 }}>
                <div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:18, fontWeight:800, color:'var(--text)', marginBottom:6 }}>Indonesia Expansion Guide 2026</div>
                <div style={{ fontSize:14, color:'var(--muted)' }}>Complete guide to manufacturing expansion in Indonesia</div>
              </div>
              <div className="fstack">
                <div><label className="fl">Email Address *</label><input type="email" className="fi" placeholder="your@email.com"/></div>
                <div><label className="fl">Company</label><input type="text" className="fi" placeholder="Your Company"/></div>
                <button className="btn-filled" style={{ width:'100%', justifyContent:'center', borderRadius:11, padding:'13px 0' }}><Download size={15}/> Download Guide</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP FORM */}
      {showWhatsAppForm && (
        <div className="wa-bg" onClick={e=>e.target===e.currentTarget&&setShowWhatsAppForm(false)}>
          <div className="wa-box">
            <div className="modal-head">
              <div style={{ display:'flex', alignItems:'center', gap:10 }}><MessageCircle size={19} style={{ color:'#128C7E' }}/><div className="modal-title">Chat on WhatsApp</div></div>
              <button className="modal-x" onClick={()=>setShowWhatsAppForm(false)}><X size={13}/></button>
            </div>
            <form onSubmit={handleWASubmit}>
              <div className="modal-body">
                <div className="fstack">
                  <div><label className="fl">Name *</label><input className="fi" placeholder="Your Name" value={whatsAppFormData.name} onChange={e=>setWhatsAppFormData(p=>({...p,name:e.target.value}))} required/></div>
                  <div><label className="fl">Company Name *</label><input className="fi" placeholder="Company Name" value={whatsAppFormData.company} onChange={e=>setWhatsAppFormData(p=>({...p,company:e.target.value}))} required/></div>
                  <div><label className="fl">Required Size *</label><input className="fi" placeholder="e.g. 5000 sqm" value={whatsAppFormData.size} onChange={e=>setWhatsAppFormData(p=>({...p,size:e.target.value}))} required/></div>
                  <div><label className="fl">Preferred Location</label><input className="fi" placeholder="e.g. Cikarang" value={whatsAppFormData.location} onChange={e=>setWhatsAppFormData(p=>({...p,location:e.target.value}))}/></div>
                  <button type="submit" className="btn-wa">Start Chat <ArrowRight size={15}/></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOCATION MODAL */}
      {selectedLocation && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setSelectedLocation(null)}>
          <div className="loc-modal-box">
            <div style={{ position:'relative' }}>
              <img src={selectedLocation.image} alt={selectedLocation.name} className="lm-img"/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 60%)', borderRadius:'inherit' }}/>
              <button className="modal-x" style={{ position:'absolute', top:16, right:16, background:'rgba(0,0,0,0.4)', color:'#fff' }} onClick={()=>setSelectedLocation(null)}><X size={13}/></button>
              <div style={{ position:'absolute', bottom:28, left:32 }}>
                <div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#60b8f5', marginBottom:6, display:'flex', alignItems:'center', gap:4 }}><MapPin size={10}/> Industrial Zone</div>
                <div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:26, fontWeight:800, color:'#fff' }}>{selectedLocation.name}</div>
              </div>
            </div>
            <div className="lm-body">
              <p className="lm-desc">{selectedLocation.desc}</p>
              <div style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:13, fontWeight:700, color:'var(--text-2)', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:14 }}>Key Features</div>
              <div className="lm-feats">{selectedLocation.specs.map((s,i)=><div key={i} className="lm-feat"><Check size={14}/>{s}</div>)}</div>
              <div className="lm-acts">
                <button className="btn-outline" onClick={()=>setSelectedLocation(null)}>Close</button>
                <button className="btn-filled" onClick={()=>{ const l=selectedLocation; setSelectedLocation(null); openWA(l.name); }}>Enquire Now <ArrowRight size={15}/></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}