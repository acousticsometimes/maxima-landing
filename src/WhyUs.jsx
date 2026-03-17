import { useState, useEffect, useRef } from 'react';
import { Check, ShieldCheck, Heart, ThumbsUp, Clock, DollarSign, Sparkles } from 'lucide-react';
import useLandingContent from './hooks/useLandingContent';
import SEO from './SEO';

/* ── Reveal with stronger spring easing ── */
const Reveal = ({ children, delay = 0, from = 'bottom', className = '' }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(e.target); }
    }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => ref.current && obs.unobserve(ref.current);
  }, [delay]);
  const tmap = { bottom:'translateY(40px)', top:'translateY(-40px)', left:'translateX(-40px)', right:'translateX(40px)' };
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0)' : (tmap[from] || tmap.bottom),
    }}>{children}</div>
  );
};

/* ── Counter that animates up when visible ── */
const CountUp = ({ target, suffix = '', duration = 1800 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const step = num / (duration / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, num);
          setVal(Math.floor(cur));
          if (cur >= num) clearInterval(t);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const pillarIcons = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
];
const deliverableIcons = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
];

export default function WhyUs() {
  const { content, loading } = useLandingContent();
  const wu = content?.whyUs;
  const valuesRef = useRef(null);
  const [valuesVis, setValuesVis] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  const highlightWords = wu?.intro?.text
    ? wu.intro.text.split(/[,.]/).map(s => s.trim()).filter(Boolean)
    : ['Trust', 'Care', 'Convenience', 'Saving Time & Money'];

  useEffect(() => {
    if (loading || !valuesRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setValuesVis(true); obs.unobserve(e.target); }
    }, { threshold: 0.3 });
    obs.observe(valuesRef.current);
    return () => obs.disconnect();
  }, [loading]);

  /* cycle highlight word when section visible */
  useEffect(() => {
    if (!valuesVis) return;
    const t = setInterval(() => setWordIdx(p => (p + 1) % highlightWords.length), 2500);
    return () => clearInterval(t);
  }, [valuesVis]);

  if (loading) return <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#022f54', fontFamily:'Plus Jakarta Sans, sans-serif' }}>Loading...</div>;

  const pillars = wu?.pillars ?? [
    { title:'Property Agency',      desc:'Full-service for secondary and primary industrial properties, including land acquisition and development advisory.' },
    { title:'Business Consultancy', desc:'Feasibility studies, permit services, and licensing strategy for a smooth and fast market entry.' },
    { title:'Commodity Trading',    desc:"Trading facilitation for nickel, coal, iron, and bauxite across Indonesia's resource-rich islands." },
  ];
  const services = (wu?.services?.items ?? []).map((s, i) => ({ ...s, color:['#0775b9','#022f54','#0a6e55'][i%3] }));
  const deliverables = wu?.deliverables ?? [];
  const processSteps = wu?.process?.steps ?? [];
  const team = wu?.team ?? [
    { name:'Michael Rino',      role:'Principal',             desc:'Provides strategic oversight, ensures objectives are met, and represents the company at key strategic agendas.', img:'/images/team/michael.jpg' },
    { name:'Michelle Prayogo',  role:'Marketing Director',    desc:'Facilitates dialogue with stakeholders, organises sessions, and gathers feedback to inform direction.',           img:'/images/team/michelle.jpg' },
    { name:'Subekti Aswinanto', role:'Site Surveyor Officer', desc:'Handles day-to-day coordination, manages timelines and reports, and supervises implementation of activities.',   img:'/images/team/subekti.jpg' },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    .wu { font-family:'DM Sans',sans-serif; background:#fff; color:#0d1e30; padding-top:72px; }
    .wu { --blue:#0775b9; --navy:#022f54; --surface:#f4f6f9; --border:#e2e6ec; --muted:#5a7390; --pad:80px; --max:1600px; }

    /* ── HEADER ── */
    .wu-hdr { text-align:center; padding:140px var(--pad) 100px; background:#fff; position:relative; overflow:hidden; }
    .wu-hdr::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(7,117,185,0.07) 0%,transparent 70%); pointer-events:none; }
    .wu-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#0775b9; margin-bottom:20px; display:block; }
    .wu-hdr-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(48px,6vw,80px); font-weight:800; letter-spacing:-2.5px; line-height:1.04; color:#022f54; margin-bottom:24px; position:relative; }
    .wu-hdr-sub { font-size:20px; font-weight:400; color:#5a7390; line-height:1.7; max-width:640px; margin:0 auto; }

    /* ── BANNER ── */
    .wu-banner-wrap { padding:0 var(--pad) 100px; max-width:var(--max); margin:0 auto; }
    .wu-banner { width:100%; height:480px; border-radius:28px; overflow:hidden; box-shadow:0 20px 64px rgba(2,47,84,0.16); }
    .wu-banner img { width:100%; height:100%; object-fit:cover; display:block; }

    /* ── STATS STRIP ── */
    .wu-stats { background:#022f54; padding:80px var(--pad); }
    .wu-stats-inner { max-width:var(--max); margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
    .wu-stat { text-align:center; padding:40px 20px; border-right:1px solid rgba(255,255,255,0.1); }
    .wu-stat:last-child { border-right:none; }
    .wu-stat-num { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(48px,5vw,72px); font-weight:900; color:#fff; letter-spacing:-3px; line-height:1; margin-bottom:10px; }
    .wu-stat-lbl { font-size:14px; font-weight:500; color:rgba(255,255,255,0.55); letter-spacing:0.04em; }

    /* ── PHOTO CARDS ── */
    .wu-cards-wrap { max-width:var(--max); margin:0 auto; padding:100px var(--pad); }
    .wu-cards-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:stretch; }
    .wu-photo-card { height:100%; }
    .wu-photo-frame { position:relative; border-radius:24px; overflow:hidden; height:100%; min-height:360px; }
    .wu-photo-frame img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; }
    .wu-photo-card:hover .wu-photo-frame img { transform:scale(1.06); }
    .wu-photo-gradient { position:absolute; inset:0; background:linear-gradient(to top,rgba(2,15,40,0.88) 0%,rgba(2,15,40,0.12) 55%,transparent 100%); }
    .wu-photo-text { position:absolute; bottom:32px; left:32px; right:32px; }
    .wu-photo-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; font-weight:800; color:#fff; margin-bottom:8px; }
    .wu-photo-desc { font-size:15px; color:rgba(255,255,255,0.72); line-height:1.6; }

    /* ── FULL-SCREEN VALUES ── */
    .wu-values {
      min-height:100vh;
      background:#fff;
      display:flex; align-items:center; justify-content:center;
      position:relative; overflow:hidden;
      padding:160px var(--pad);
    }
    /* decorative gradient orbs */
    .wu-values::before {
      content:''; position:absolute; width:600px; height:600px; border-radius:50%;
      background:radial-gradient(circle,rgba(7,117,185,0.08) 0%,transparent 70%);
      top:-100px; left:-150px; pointer-events:none;
    }
    .wu-values::after {
      content:''; position:absolute; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle,rgba(2,47,84,0.06) 0%,transparent 70%);
      bottom:-80px; right:-100px; pointer-events:none;
    }
    .wu-values-inner { max-width:1100px; margin:0 auto; text-align:center; position:relative; z-index:2; }
    .wu-values-eyebrow {
      font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700;
      letter-spacing:0.14em; text-transform:uppercase; color:#0775b9;
      display:inline-block; margin-bottom:32px;
      opacity:0; transform:translateY(20px);
      transition:opacity 0.6s ease, transform 0.6s ease;
    }
    .wu-values.vis .wu-values-eyebrow { opacity:1; transform:none; }
    .wu-values-headline {
      font-family:'Plus Jakarta Sans',sans-serif;
      font-size:clamp(14px,1.8vw,20px); font-weight:600;
      color:#5a7390; letter-spacing:0.02em; margin-bottom:40px;
      opacity:0; transform:translateY(20px);
      transition:opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
    }
    .wu-values.vis .wu-values-headline { opacity:1; transform:none; }
    .wu-values-p {
      font-family:'Plus Jakarta Sans',sans-serif;
      font-size:clamp(36px,5.5vw,72px);
      font-weight:800; letter-spacing:-2px; line-height:1.12; color:#022f54;
      opacity:0; transform:translateY(40px);
      transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s;
      position: relative; z-index: 3;
    }
    .wu-values.vis .wu-values-p { opacity:1; transform:none; }
    .wu-values-word-container {
      display: inline-block;
      position: relative;
      height: 1.12em; /* Match parent line-height */
      overflow: hidden;
      vertical-align: -0.12em; /* Fine-tune vertical alignment */
    }
    .wu-values-word-reel {
      display: block;
      transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .wu-values-word {
      display: block;
      height: 1.12em;
      line-height: 1.12em;
      background: linear-gradient(135deg, #0775b9, #022f54);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    /* container bleeds way outside the section */
.wu-values-icons {
  position:absolute;
  inset:-120px -15vw;
  z-index:2;
  pointer-events:none;
}

/* individual icons */
.wu-value-icon {
  position:absolute;
  width:clamp(28px, 3vw, 44px); height:clamp(28px, 3vw, 44px);
  color:var(--blue);
  opacity:0;
  transform:scale(0.3) rotate(-20deg);
  transition:all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.wu-values.vis .wu-value-icon { opacity:1; transform:scale(1) rotate(0deg); }
.wu-value-icon.icon-1 { top:18%; left:18%; transition-delay:0.7s; }
.wu-value-icon.icon-2 { top:12%;  right:4%;  transition-delay:0.6s; }
.wu-value-icon.icon-3 { top:38%;  left:5%;   transition-delay:0.7s; }
.wu-value-icon.icon-4 { bottom:18%; right:1%;  transition-delay:0.8s; }
.wu-value-icon.icon-5 { bottom:6%; left:8%;   transition-delay:0.9s; }
.wu-value-icon.icon-6 { top:60%;  right:7%;  transition-delay:1.0s; }
    /* large decorative word in background */
    .wu-values-deco {
      position:absolute; font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(120px,18vw,240px);
      font-weight:900; color:rgba(7,117,185,0.035); letter-spacing:-8px; pointer-events:none;
      user-select:none; white-space:nowrap; top:50%; left:50%; transform:translate(-50%,-50%);
      z-index:1; transition:opacity 0.8s ease;
    }
    .wu-values.vis .wu-values-deco { opacity:1; }

    /* ── PILLARS ── */
    .wu-pillars { position:relative; overflow:hidden; padding:140px var(--pad); }
    .wu-pillars-bg { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat; }
    .wu-pillars-bg::after { content:''; position:absolute; inset:0; background:rgba(2,15,40,0.86); }
    .wu-pillars-inner { position:relative; z-index:2; max-width:var(--max); margin:0 auto; }
    .wu-pillars-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; }
    .wu-pillar-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:48px 40px; transition:transform 0.28s,background 0.28s,border-color 0.28s; display:flex; flex-direction:column; }
    .wu-pillar-card:hover { transform:translateY(-8px); background:rgba(255,255,255,0.09); border-color:rgba(255,255,255,0.22); }
    .wu-pillar-icon { width:60px; height:60px; border-radius:18px; background:#0775b9; display:flex; align-items:center; justify-content:center; margin-bottom:48px; flex-shrink:0; }
    .wu-pillar-num { font-size:12px; font-weight:700; color:rgba(255,255,255,0.3); letter-spacing:0.1em; margin-bottom:10px; }
    .wu-pillar-name { font-family:'Plus Jakarta Sans',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:14px; }
    .wu-pillar-desc { font-size:16px; color:rgba(255,255,255,0.65); line-height:1.7; flex:1; }

    /* ── SERVICES ── */
    .wu-svc { background:#f4f6f9; padding:140px var(--pad); }
    .wu-svc-inner { max-width:var(--max); margin:0 auto; }
    .wu-sec-head { margin-bottom:64px; }
    .wu-sec-head.center { text-align:center; }
    .wu-sec-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(32px,4vw,52px); font-weight:800; letter-spacing:-1.5px; line-height:1.08; color:#022f54; margin-top:12px; }
    .wu-sec-sub { font-size:17px; color:#5a7390; line-height:1.7; margin-top:14px; }
    .wu-svc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; }
    .wu-svc-card { background:#fff; border:1px solid #e2e6ec; border-radius:24px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.25s,box-shadow 0.25s; }
    .wu-svc-card:hover { transform:translateY(-6px); box-shadow:0 20px 56px rgba(2,47,84,0.10); }
    .wu-svc-bar { height:5px; width:100%; flex-shrink:0; }
    .wu-svc-head { padding:32px 32px 16px; font-family:'Plus Jakarta Sans',sans-serif; font-size:20px; font-weight:800; color:#022f54; flex-shrink:0; }
    .wu-svc-body { padding:0 32px 32px; display:flex; flex-direction:column; gap:12px; flex:1; list-style:none; }
    .wu-svc-item { display:flex; align-items:flex-start; gap:10px; font-size:15px; font-weight:400; color:#5a7390; line-height:1.6; }
    .wu-svc-item svg { flex-shrink:0; margin-top:4px; color:#0775b9; }

    /* ── DELIVERABLES ── */
    .wu-deliv { background:#022f54; padding:140px var(--pad); position:relative; overflow:hidden; }
    .wu-deliv-bg { position:absolute; inset:0; opacity:0.06; }
    .wu-deliv-bg img { width:100%; height:100%; object-fit:cover; }
    .wu-deliv-inner { max-width:var(--max); margin:0 auto; position:relative; z-index:2; }
    .wu-deliv-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(32px,4vw,52px); font-weight:800; letter-spacing:-1.5px; color:#fff; text-align:center; margin-bottom:72px; }
    .wu-deliv-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:stretch; }
    .wu-deliv-item { display:flex; gap:24px; align-items:flex-start; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); padding:36px; border-radius:24px; transition:all 0.28s ease; }
    .wu-deliv-item:hover { background:rgba(255,255,255,0.09); border-color:rgba(255,255,255,0.2); transform:translateY(-5px); }
    .wu-deliv-icon { width:52px; height:52px; border-radius:16px; background:#0775b9; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .wu-deliv-txt { font-size:17px; color:rgba(255,255,255,0.82); line-height:1.7; }

    /* ── PROCESS ── */
    .wu-proc { background:#fff; padding:140px var(--pad); }
    .wu-proc-inner { max-width:var(--max); margin:0 auto; }
    .wu-proc-wrap { position:relative; }
    .wu-proc-line { position:absolute; left:50%; top:0; bottom:0; width:1px; background:#e2e6ec; transform:translateX(-50%); }
    .wu-proc-steps { display:flex; flex-direction:column; gap:32px; }
    .wu-proc-row { display:grid; grid-template-columns:1fr 48px 1fr; align-items:center; }
    .wu-proc-side-l { padding-right:48px; }
    .wu-proc-side-r { padding-left:48px; }
    .wu-proc-dot-col { display:flex; justify-content:center; }
    .wu-proc-dot { width:16px; height:16px; border-radius:50%; background:#0775b9; box-shadow:0 0 0 5px rgba(7,117,185,0.15); flex-shrink:0; }
    .wu-proc-card { padding:36px; border-radius:20px; border:1.5px solid #e2e6ec; background:#fff; box-shadow:0 4px 24px rgba(2,47,84,0.06); transition:box-shadow 0.25s, transform 0.25s; }
    .wu-proc-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(2,47,84,0.10); }
    .wu-proc-lbl { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#0775b9; margin-bottom:8px; }
    .wu-proc-txt { font-family:'Plus Jakarta Sans',sans-serif; font-size:19px; font-weight:700; color:#022f54; line-height:1.4; }
    .wu-proc-desc { font-size:14px; color:#5a7390; line-height:1.65; margin-top:8px; }

    /* ── TEAM ── */
    .wu-team { background:#f4f6f9; padding:140px var(--pad); }
    .wu-team-inner { max-width:var(--max); margin:0 auto; }
    .wu-team-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; max-width:1200px; margin:0 auto; align-items:stretch; }
    .wu-team-card { background:#fff; border:1px solid #e2e6ec; border-radius:28px; padding:52px 36px 44px; text-align:center; transition:transform 0.25s,box-shadow 0.25s; display:flex; flex-direction:column; }
    .wu-team-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(2,47,84,0.12); }
    .wu-team-avatar { width:140px; height:140px; border-radius:50%; background:#e2e6ec; margin:0 auto 28px; overflow:hidden; border:5px solid #e8f3fb; transition:border-color 0.3s,box-shadow 0.3s; flex-shrink:0; }
    .wu-team-card:hover .wu-team-avatar { border-color:#0775b9; box-shadow:0 0 0 5px rgba(7,117,185,0.15); }
    .wu-team-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
    .wu-team-name { font-family:'Plus Jakarta Sans',sans-serif; font-size:21px; font-weight:800; color:#022f54; margin-bottom:6px; }
    .wu-team-role { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#0775b9; margin-bottom:16px; }
    .wu-team-desc { font-size:15px; color:#5a7390; line-height:1.7; flex:1; }

    /* ── RESPONSIVE ── */
    @media (max-width:1280px) {
      .wu { --pad:48px; }
      .wu-pillars-grid { grid-template-columns:1fr 1fr; }
      .wu-svc-grid { grid-template-columns:1fr 1fr; }
      .wu-deliv-grid { grid-template-columns:1fr; }
      .wu-team-grid { grid-template-columns:1fr 1fr; max-width:760px; }
      .wu-stats-inner { grid-template-columns:repeat(2,1fr); }
    }
    @media (max-width:768px) {
      .wu { --pad:24px; }
      .wu-hdr { padding:80px 24px 64px; }
      .wu-hdr-h1 { font-size:clamp(36px,10vw,56px); letter-spacing:-2px; }
      .wu-banner-wrap { padding:0 24px 64px; }
      .wu-banner { height:280px; }
      .wu-stats-inner { grid-template-columns:1fr 1fr; }
      .wu-stat-num { font-size:40px; }
      .wu-cards-wrap,.wu-svc,.wu-deliv,.wu-proc,.wu-team,.wu-pillars { padding:80px 24px; }
      .wu-cards-grid { grid-template-columns:1fr; }
      .wu-pillars-grid,.wu-svc-grid { grid-template-columns:1fr; }
      .wu-proc-line { display:none; }
      .wu-proc-row { grid-template-columns:1fr; }
      .wu-proc-dot-col { display:none; }
      .wu-proc-side-l,.wu-proc-side-r { padding:0; }
      .wu-team-grid { grid-template-columns:1fr; max-width:360px; }
      .wu-values { min-height:auto; padding:100px 24px; }
      .wu-values-p { font-size:clamp(28px,8vw,44px); letter-spacing:-1px; }
      .wu-values-deco { display:none; }
    }
    @media (max-width:540px) {
      .wu-deliv-item { flex-direction:column; }
      .wu-stats-inner { grid-template-columns:1fr 1fr; }
    }
  `;

  return (
    <div className="wu">
      <SEO page="why-us" content={content}/>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div className="wu-hdr">
        <Reveal>
          <span className="wu-eyebrow">About Us</span>
          <h1 className="wu-hdr-h1">{wu?.header?.title ?? 'Why Choose Maxima?'}</h1>
          <p className="wu-hdr-sub">{wu?.header?.subtitle ?? "With over 14 years of experience guiding international manufacturers into Indonesia's top industrial zones, we are the partner you need."}</p>
        </Reveal>
      </div>

      {/* ── BANNER ── */}
      <div className="wu-banner-wrap">
        <Reveal delay={80}>
          <div className="wu-banner">
            <img src={wu?.banner?.image ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'} alt="Industrial facility"/>
          </div>
        </Reveal>
      </div>

      {/* ── ANIMATED STATS ── */}
      <section className="wu-stats" aria-label="Company statistics">
        <div className="wu-stats-inner">
          {(content?.stats ?? [{ number:'14+', label:'Years of Experience' },{ number:'200+', label:'Projects Completed' },{ number:'15+', label:'Countries Served' }]).concat(
            content?.stats ? [] : [{ number:'7+', label:'Industrial Zones' }]
          ).map((st, i) => {
            // Support both { number, label } (from Firestore stats) and { n, s, l } (fallback)
            const rawNum = st.number ?? `${st.n}${st.s ?? ''}`;
            const lbl = st.label ?? st.l ?? '';
            const numOnly = parseInt(rawNum) || 0;
            const suffix = rawNum.replace(String(numOnly), '');
            return (
            <Reveal key={i} delay={i * 100}>
              <div className="wu-stat">
                <div className="wu-stat-num"><CountUp target={String(numOnly)}/>{suffix}</div>
                <div className="wu-stat-lbl">{lbl}</div>
              </div>
            </Reveal>
          );})}
        </div>
      </section>

      {/* ── PHOTO CARDS ── */}
      <div className="wu-cards-wrap">
        <div className="wu-cards-grid">
          {[0,1].map(i => (
            <Reveal key={i} from={i===0?'left':'right'} delay={i*100}>
              <div className="wu-photo-card">
                <div className="wu-photo-frame">
                  <img src={wu?.cards?.[i]?.image ?? (i===0
                    ? 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80'
                    : 'https://images.unsplash.com/photo-1529101091760-61df6be5d187?auto=format&fit=crop&w=1000&q=80')}
                    alt={wu?.cards?.[i]?.title ?? (i===0 ? 'Industrial locations across Indonesia' : 'Global clients')}/>
                  <div className="wu-photo-gradient"/>
                  <div className="wu-photo-text">
                    <div className="wu-photo-label">{wu?.cards?.[i]?.title ?? (i===0 ? 'Key Locations' : 'Global Clientele')}</div>
                    <p className="wu-photo-desc">{wu?.cards?.[i]?.desc ?? (i===0 ? 'Operations across 9 major industrial zones in Indonesia.' : 'Proudly serving clients from over 15 countries worldwide.')}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── FULL-SCREEN VALUES ── */}
      <section ref={valuesRef} className={`wu-values${valuesVis ? ' vis' : ''}`} aria-label="Company values">
        <div className="wu-values-deco" aria-hidden="true">VALUES</div>
        <div className="wu-values-inner">
          <span className="wu-values-eyebrow">Our Philosophy</span>
          <p className="wu-values-headline">The most important principles for our business</p>
          <p className="wu-values-p">
            The most important principle<br/>
            for our business is{' '}
            <span className="wu-values-word-container">
              <span className="wu-values-word-reel" style={{ transform: `translateY(-${wordIdx * 1.12}em)` }}>
                {highlightWords.map((word) => (
                  <span key={word} className="wu-values-word">{word}</span>
                ))}
              </span>
            </span>
          </p>
          <div className="wu-values-icons" aria-hidden="true">
            <div className="wu-value-icon icon-1"><ShieldCheck size="100%" /></div>
            <div className="wu-value-icon icon-2"><Heart size="100%" /></div>
            <div className="wu-value-icon icon-3"><ThumbsUp size="100%" /></div>
            <div className="wu-value-icon icon-4"><Clock size="100%" /></div>
            <div className="wu-value-icon icon-5"><DollarSign size="100%" /></div>
            <div className="wu-value-icon icon-6"><Sparkles size="100%" /></div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="wu-pillars" aria-label="Business pillars">
        <div className="wu-pillars-bg"/>
        <div className="wu-pillars-inner">
          <Reveal>
            <div className="wu-sec-head center" style={{ marginBottom:64 }}>
              <span className="wu-eyebrow" style={{ color:'rgba(255,255,255,0.5)' }}>Foundation</span>
              <h2 className="wu-sec-title" style={{ color:'#fff' }}>Our Three Pillars</h2>
            </div>
          </Reveal>
          <div className="wu-pillars-grid">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="wu-pillar-card">
                  <div className="wu-pillar-icon">{pillarIcons[i]}</div>
                  <div className="wu-pillar-num">/ {String(i+1).padStart(2,'0')}</div>
                  <div className="wu-pillar-name">{p.title}</div>
                  <div className="wu-pillar-desc">{p.desc ?? p.description}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="wu-svc" aria-label="Services offered">
        <div className="wu-svc-inner">
          <Reveal>
            <div className="wu-sec-head">
              <span className="wu-eyebrow">{wu?.services?.title ?? 'What We Offer'}</span>
              <h2 className="wu-sec-title">{wu?.services?.description ?? 'Comprehensive Services'}</h2>
            </div>
          </Reveal>
          <div className="wu-svc-grid">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 100}>
                <div className="wu-svc-card">
                  <div className="wu-svc-bar" style={{ background:svc.color }}/>
                  <div className="wu-svc-head">{svc.title}</div>
                  <ul className="wu-svc-body">
                    {(svc.items??[]).map((item,j) => <li key={j} className="wu-svc-item"><Check size={14}/><span>{item}</span></li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="wu-deliv" aria-label="Our deliverables">
        <div className="wu-deliv-bg"><img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80" alt="" aria-hidden="true"/></div>
        <div className="wu-deliv-inner">
          <Reveal><h2 className="wu-deliv-title">Our Deliverables</h2></Reveal>
          <div className="wu-deliv-grid">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="wu-deliv-item">
                  <div className="wu-deliv-icon">{deliverableIcons[i % deliverableIcons.length]}</div>
                  <div className="wu-deliv-txt">{item}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="wu-proc" aria-label="Our process">
        <div className="wu-proc-inner">
          <Reveal>
            <div className="wu-sec-head center">
              <span className="wu-eyebrow">Methodology</span>
              <h2 className="wu-sec-title">{wu?.process?.title ?? 'Our Process'}</h2>
            </div>
          </Reveal>
          <div className="wu-proc-wrap">
            <div className="wu-proc-line" aria-hidden="true"/>
            <div className="wu-proc-steps">
              {processSteps.map((step, idx) => {
                const isL = idx % 2 === 0;
                const card = (
                  <div className="wu-proc-card">
                    <div className="wu-proc-lbl">Step {step.step}</div>
                    <div className="wu-proc-txt">{step.title}</div>
                    {step.description && <p className="wu-proc-desc">{step.description}</p>}
                  </div>
                );
                return (
                  <Reveal key={idx} from={isL ? 'left' : 'right'} delay={idx * 80}>
                    <div className="wu-proc-row">
                      {isL ? <><div className="wu-proc-side-l">{card}</div><div className="wu-proc-dot-col"><div className="wu-proc-dot"/></div><div className="wu-proc-side-r"/></>
                           : <><div className="wu-proc-side-l"/><div className="wu-proc-dot-col"><div className="wu-proc-dot"/></div><div className="wu-proc-side-r">{card}</div></>}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="wu-team" aria-label="Our team">
        <div className="wu-team-inner">
          <Reveal>
            <div className="wu-sec-head center">
              <span className="wu-eyebrow">People</span>
              <h2 className="wu-sec-title">Meet the Team</h2>
            </div>
          </Reveal>
          <div className="wu-team-grid">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <div className="wu-team-card">
                  <div className="wu-team-avatar">
                    <img src={m.img ?? m.image} alt={`${m.name} — ${m.role}`} onError={e => { e.target.style.opacity='0'; }}/>
                  </div>
                  <div className="wu-team-name">{m.name}</div>
                  <div className="wu-team-role">{m.role}</div>
                  <div className="wu-team-desc">{m.desc ?? m.description}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}