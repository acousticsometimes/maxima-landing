import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import useLandingContent from './hooks/useLandingContent';
import SEO from './SEO';

const Reveal = ({ children, delay = 0, from = 'bottom', className = '' }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(e.target); }
    }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
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

export default function FAQ({ language = 'en' }) {
  const { content, loading } = useLandingContent();
  const [openIndex, setOpenIndex] = useState(null);

  if (loading) return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#022f54', fontFamily:'Plus Jakarta Sans, sans-serif' }}>Loading...</div>
  );

  const faq = content?.faq;
  const items = faq?.items ?? [];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    .fq { font-family:'DM Sans',sans-serif; background:#fff; color:#0d1e30; padding-top:72px; min-height:100vh; }
    .fq { --blue:#0775b9; --navy:#022f54; --surface:#f4f6f9; --border:#e2e6ec; --muted:#5a7390; --pad:80px; --max:1600px; }

    /* ── HEADER ── */
    .fq-hdr { text-align:center; padding:140px var(--pad) 100px; background:#fff; position:relative; overflow:hidden; }
    .fq-hdr::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(7,117,185,0.07) 0%,transparent 70%); pointer-events:none; }
    .fq-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#0775b9; margin-bottom:20px; display:block; }
    .fq-hdr-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(48px,6vw,80px); font-weight:800; letter-spacing:-2.5px; line-height:1.04; color:#022f54; margin-bottom:24px; }
    .fq-hdr-sub { font-size:20px; font-weight:400; color:#5a7390; line-height:1.7; max-width:640px; margin:0 auto; }

    /* ── STATS ROW ── */
    .fq-stats { background:#f4f6f9; padding:64px var(--pad); }
    .fq-stats-inner { max-width:var(--max); margin:0 auto; display:flex; align-items:center; justify-content:center; gap:0; }
    .fq-stat { text-align:center; padding:0 72px; border-right:1px solid #e2e6ec; }
    .fq-stat:last-child { border-right:none; }
    .fq-stat-num { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(40px,4vw,60px); font-weight:900; color:#022f54; letter-spacing:-2px; line-height:1; margin-bottom:8px; }
    .fq-stat-lbl { font-size:14px; font-weight:500; color:#5a7390; }

    /* ── ACCORDION BODY ── */
    .fq-body { max-width:1000px; margin:0 auto; padding:120px var(--pad) 0; }

    /* ── ACCORDION ITEM ── */
    .fq-item { border:1px solid #e2e6ec; border-radius:20px; background:#fff; overflow:hidden; margin-bottom:16px; transition:border-color 0.25s ease,box-shadow 0.25s ease,transform 0.25s ease; }
    .fq-item:hover { border-color:#c8d8e8; transform:translateY(-2px); box-shadow:0 8px 32px rgba(2,47,84,0.08); }
    .fq-item.open { border-color:#0775b9; box-shadow:0 8px 40px rgba(7,117,185,0.14); transform:translateY(-2px); }
    .fq-trigger { width:100%; display:flex; justify-content:space-between; align-items:center; gap:24px; text-align:left; padding:28px 36px; background:none; border:none; cursor:pointer; transition:background 0.15s; }
    .fq-trigger:hover { background:#f8fafc; }
    .fq-item.open .fq-trigger { background:#f0f6fd; }
    .fq-q { font-family:'Plus Jakarta Sans',sans-serif; font-size:19px; font-weight:700; color:#022f54; line-height:1.45; flex:1; }
    .fq-item.open .fq-q { color:#0775b9; }
    .fq-icon { width:36px; height:36px; border-radius:50%; background:#f4f6f9; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#6b7f95; transition:background 0.25s,color 0.25s,transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
    .fq-item.open .fq-icon { background:#0775b9; color:#fff; transform:rotate(180deg); }
    .fq-answer { display:grid; grid-template-rows:0fr; transition:grid-template-rows 0.35s ease; }
    .fq-item.open .fq-answer { grid-template-rows:1fr; }
    .fq-answer-inner { overflow:hidden; }
    .fq-answer-text { padding:0 36px 32px; font-size:17px; font-weight:400; color:#5a7390; line-height:1.75; border-top:1px solid #e2e6ec; padding-top:24px; }

    /* ── CTA STRIP ── */
    .fq-cta { max-width:1200px; margin:120px auto 140px; border-radius:28px; background:linear-gradient(135deg,#022f54 0%,#03416e 60%,#0775b9 100%); padding:80px 96px; display:flex; align-items:center; justify-content:space-between; gap:48px; flex-wrap:wrap; }
    .fq-cta-text { flex:1; min-width:260px; }
    .fq-cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(28px,3vw,40px); font-weight:800; color:#fff; letter-spacing:-1px; margin-bottom:12px; line-height:1.15; }
    .fq-cta-desc { font-size:18px; color:rgba(255,255,255,0.7); line-height:1.7; }
    .fq-cta-btn { display:inline-flex; align-items:center; gap:9px; padding:16px 32px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; color:#022f54; background:#fff; border:none; cursor:pointer; white-space:nowrap; transition:box-shadow 0.18s,transform 0.15s; box-shadow:0 6px 20px rgba(0,0,0,0.22); flex-shrink:0; }
    .fq-cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.28); }

    /* ── RESPONSIVE ── */
    @media (max-width:1280px) {
      .fq { --pad:48px; }
      .fq-stat { padding:0 48px; }
    }
    @media (max-width:768px) {
      .fq { --pad:24px; }
      .fq-hdr { padding:80px 24px 64px; }
      .fq-hdr-h1 { font-size:clamp(36px,10vw,56px); letter-spacing:-2px; }
      .fq-stats { padding:48px 24px; }
      .fq-stats-inner { flex-wrap:wrap; gap:32px; }
      .fq-stat { border-right:none; padding:0 24px; }
      .fq-body { padding:72px 24px 0; }
      .fq-trigger { padding:20px 24px; }
      .fq-q { font-size:16px; }
      .fq-answer-text { padding:0 24px 24px; padding-top:18px; font-size:15px; }
      .fq-cta { margin:72px 24px 80px; padding:48px 36px; flex-direction:column; }
    }
  `;

  return (
    <div className="fq">
      <SEO page="faq" content={content} faqItems={items}/>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div className="fq-hdr">
        <Reveal>
          <span className="fq-eyebrow">Support</span>
          <h1 className="fq-hdr-h1">{faq?.header?.title ?? 'Frequently Asked Questions'}</h1>
          <p className="fq-hdr-sub">{faq?.header?.subtitle ?? 'Find answers to common questions about expanding your business in Indonesia.'}</p>
        </Reveal>
      </div>

      {/* ── STATS ROW ── */}
      <div className="fq-stats">
        <div className="fq-stats-inner">
          {[{ n:`${items.length}`, lbl:'Questions Answered' },{ n:'14+', lbl:'Years of Expertise' },{ n:'24h', lbl:'Response Time' },{ n:'200+', lbl:'Projects Completed' }].map((st, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="fq-stat">
                <div className="fq-stat-num">{st.n}</div>
                <div className="fq-stat-lbl">{st.lbl}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── ACCORDION ── */}
      <div className="fq-body">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 50}>
            <div className={`fq-item${openIndex === i ? ' open' : ''}`}>
              <button className="fq-trigger" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="fq-q">{item.q}</span>
                <span className="fq-icon"><ChevronDown size={18} strokeWidth={2.5}/></span>
              </button>
              <div className="fq-answer">
                <div className="fq-answer-inner">
                  <div className="fq-answer-text">{item.a}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── CTA ── */}
      <Reveal>
        <div className="fq-cta">
          <div className="fq-cta-text">
            <div className="fq-cta-title">Still have questions?</div>
            <div className="fq-cta-desc">Our team is ready to help you with any queries about expanding into Indonesia.</div>
          </div>
          <button className="fq-cta-btn">Get in Touch <ArrowRight size={16}/></button>
        </div>
      </Reveal>
    </div>
  );
}