import { useState, useEffect, useRef } from 'react';
import { Download, FileText, ArrowRight, ExternalLink, Trash2 } from 'lucide-react';
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

export default function InvestmentGuidelines({ language = 'en' }) {
  const { content, loading } = useLandingContent();

  if (loading) return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#022f54', fontFamily:'Plus Jakarta Sans, sans-serif' }}>Loading...</div>
  );

  const translations = {
    en: { eyebrow:'Legal & Compliance', title:'Investment Guidelines', subtitle:'A comprehensive overview of the permits, licenses, and registrations required at each stage of your investment in Indonesia.', download:'Download Full Guide (PDF)', ctaTitle:'Need personalised guidance?', ctaDesc:'Our compliance experts will walk you through every step of the process.', ctaBtn:'Talk to an Expert' },
    id: { eyebrow:'Hukum & Kepatuhan', title:'Panduan Investasi', subtitle:'Gambaran lengkap tentang izin, lisensi, dan pendaftaran yang diperlukan di setiap tahap investasi Anda di Indonesia.', download:'Unduh Panduan Lengkap (PDF)', ctaTitle:'Butuh panduan personal?', ctaDesc:'Pakar kepatuhan kami akan memandu Anda di setiap langkah proses.', ctaBtn:'Bicara dengan Pakar' },
    cn: { eyebrow:'法律与合规', title:'投资指南', subtitle:'全面概述您在印尼投资各阶段所需的许可证、执照和注册事项。', download:'下载完整指南（PDF）', ctaTitle:'需要个性化指导？', ctaDesc:'我们的合规专家将指导您完成每一个流程步骤。', ctaBtn:'联系专家' },
  };

  const t = translations[language] ?? translations.en;
  const phaseColors = ['#0775b9', '#022f54', '#0a6e55'];
  const guidelinesData = content?.investmentGuidelines?.guidelines ?? [];

  // The global PDF for the "Download Full Guide" button — stored at investmentGuidelines.pdf
  const globalPdfUrl = content?.investmentGuidelines?.pdf ?? null;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    .ig { font-family:'DM Sans',sans-serif; background:#fff; color:#0d1e30; padding-top:72px; }
    .ig { --blue:#0775b9; --navy:#022f54; --surface:#f4f6f9; --border:#e2e6ec; --muted:#5a7390; --pad:80px; --max:1600px; }

    /* ── HEADER ── */
    .ig-hdr { text-align:center; padding:140px var(--pad) 100px; background:#fff; position:relative; overflow:hidden; }
    .ig-hdr::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(7,117,185,0.07) 0%,transparent 70%); pointer-events:none; }
    .ig-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#0775b9; margin-bottom:20px; display:block; }
    .ig-hdr-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(48px,6vw,80px); font-weight:800; letter-spacing:-2.5px; line-height:1.04; color:#022f54; margin-bottom:24px; position:relative; }
    .ig-hdr-sub { font-size:20px; font-weight:400; color:#5a7390; line-height:1.7; max-width:680px; margin:0 auto 48px; }

    /* Download button — active when PDF exists, greyed when not */
    .ig-hdr-btn {
      display:inline-flex; align-items:center; gap:9px; padding:16px 32px; border-radius:40px;
      font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700;
      color:#fff; border:none; cursor:pointer;
      transition:background 0.18s,transform 0.15s,opacity 0.18s;
      text-decoration:none;
    }
    .ig-hdr-btn.active { background:#0775b9; box-shadow:0 6px 20px rgba(7,117,185,0.32); }
    .ig-hdr-btn.active:hover { background:#0563a0; transform:translateY(-2px); }
    .ig-hdr-btn.inactive { background:#94a3b8; cursor:not-allowed; opacity:0.7; }
    .ig-hdr-btn-note { font-size:13px; color:#94a3b8; margin-top:12px; }

    /* ── PHASE STEPPER ── */
    .ig-stepper { display:flex; align-items:center; justify-content:center; gap:0; max-width:860px; margin:0 auto 100px; padding:0 var(--pad); }
    .ig-step { display:flex; align-items:center; gap:14px; flex:1; }
    .ig-step-dot { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:800; color:#fff; flex-shrink:0; box-shadow:0 4px 16px rgba(0,0,0,0.15); }
    .ig-step-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:700; color:#022f54; line-height:1.35; }
    .ig-step-line { flex:1; height:2px; background:#e2e6ec; margin:0 16px; }

    /* ── GRID ── */
    .ig-grid-wrap { max-width:var(--max); margin:0 auto; padding:0 var(--pad) 140px; }
    .ig-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; align-items:stretch; }

    /* ── CARD ── */
    .ig-card { background:#fff; border:1px solid #e2e6ec; border-radius:28px; overflow:hidden; transition:transform 0.28s ease,box-shadow 0.28s ease; display:flex; flex-direction:column; }
    .ig-card:hover { transform:translateY(-8px); box-shadow:0 24px 64px rgba(2,47,84,0.14); }
    .ig-card-bar { height:5px; width:100%; flex-shrink:0; }
    .ig-card-head { padding:36px 36px 24px; border-bottom:1px solid #e2e6ec; position:relative; }
    .ig-card-phase { font-family:'Plus Jakarta Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px; }
    .ig-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:22px; font-weight:800; color:#022f54; line-height:1.3; }
    .ig-card-count { position:absolute; bottom:24px; right:28px; font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; color:#a0b0c0; background:#f4f6f9; padding:4px 10px; border-radius:99px; }
    .ig-card-body { padding:24px 28px 32px; display:flex; flex-direction:column; gap:10px; flex:1; }

    /* ── ITEM ROWS ── */
    .ig-item { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:14px 18px; border-radius:12px; background:#f4f6f9; border:1px solid transparent; cursor:default; text-align:left; transition:background 0.18s,border-color 0.18s,transform 0.18s; width:100%; text-decoration:none; }
    .ig-item.clickable { cursor:pointer; }
    .ig-item.clickable:hover { background:#edf4fc; border-color:rgba(7,117,185,0.25); transform:translateX(4px); }
    .ig-item-left { display:flex; align-items:center; gap:12px; flex:1; min-width:0; }
    .ig-item-icon { color:#6b7f95; flex-shrink:0; transition:color 0.18s; }
    .ig-item.clickable:hover .ig-item-icon { color:#0775b9; }
    .ig-item-label { font-size:14px; font-weight:500; color:#0d1e30; line-height:1.45; }
    .ig-item-dl { color:#a0b0c0; flex-shrink:0; transition:color 0.18s; }
    .ig-item.clickable:hover .ig-item-dl { color:#0775b9; }

    /* ── CTA STRIP ── */
    .ig-cta { max-width:1200px; margin:0 auto 140px; border-radius:28px; background:linear-gradient(135deg,#022f54 0%,#03416e 60%,#0775b9 100%); padding:80px 96px; display:flex; align-items:center; justify-content:space-between; gap:48px; flex-wrap:wrap; }
    .ig-cta-text { flex:1; min-width:260px; }
    .ig-cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(28px,3vw,40px); font-weight:800; color:#fff; letter-spacing:-1px; margin-bottom:12px; line-height:1.15; }
    .ig-cta-desc { font-size:18px; color:rgba(255,255,255,0.7); line-height:1.7; }
    .ig-cta-btn { display:inline-flex; align-items:center; gap:9px; padding:16px 32px; border-radius:40px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; color:#022f54; background:#fff; border:none; cursor:pointer; white-space:nowrap; transition:box-shadow 0.18s,transform 0.15s; box-shadow:0 6px 20px rgba(0,0,0,0.22); flex-shrink:0; }
    .ig-cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,0,0,0.28); }

    /* ── RESPONSIVE ── */
    @media (max-width:1280px) {
      .ig { --pad:48px; }
      .ig-grid { grid-template-columns:1fr 1fr; }
    }
    @media (max-width:1024px) {
      .ig-grid { grid-template-columns:1fr; max-width:640px; margin:0 auto; }
      .ig-stepper { flex-direction:column; align-items:flex-start; gap:16px; max-width:480px; }
      .ig-step-line { display:none; }
    }
    @media (max-width:768px) {
      .ig { --pad:24px; }
      .ig-hdr { padding:80px 24px 64px; }
      .ig-hdr-h1 { font-size:clamp(36px,10vw,56px); letter-spacing:-2px; }
      .ig-grid-wrap { padding:0 24px 80px; }
      .ig-cta { margin:0 24px 80px; padding:48px 36px; flex-direction:column; }
      .ig-stepper { padding:0 24px; }
    }
  `;

  return (
    <div className="ig">
      <SEO page="investment-guidelines" content={content}/>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div className="ig-hdr">
        <Reveal>
          <span className="ig-eyebrow">{t.eyebrow}</span>
          <h1 className="ig-hdr-h1">{content?.investmentGuidelines?.header?.title ?? t.title}</h1>
          <p className="ig-hdr-sub">{content?.investmentGuidelines?.header?.subtitle ?? t.subtitle}</p>

          {/* Download button — links to the global PDF if one has been uploaded */}
          {globalPdfUrl ? (
            <a href={globalPdfUrl} target="_blank" rel="noopener noreferrer" className="ig-hdr-btn active">
              <Download size={16}/> {t.download}
            </a>
          ) : (
            <span className="ig-hdr-btn inactive">
              <Download size={16}/> {t.download}
            </span>
          )}
          {!globalPdfUrl && (
            <p className="ig-hdr-btn-note">PDF guide not yet uploaded — add it via the dashboard editor.</p>
          )}
        </Reveal>
      </div>

      {/* ── PHASE STEPPER ── */}
      <Reveal delay={80}>
        <div className="ig-stepper">
          {guidelinesData.map((g, i) => (
            <div key={i} style={{ display:'contents' }}>
              <div className="ig-step">
                <div className="ig-step-dot" style={{ background:phaseColors[i % phaseColors.length] }}>{String(i+1).padStart(2,'0')}</div>
                <div className="ig-step-label">{g.category}</div>
              </div>
              {i < guidelinesData.length - 1 && <div className="ig-step-line"/>}
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── CARDS GRID ── */}
      <div className="ig-grid-wrap">
        <div className="ig-grid">
          {guidelinesData.map((section, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="ig-card">
                <div className="ig-card-bar" style={{ background:phaseColors[index % phaseColors.length] }}/>
                <div className="ig-card-head">
                  <div className="ig-card-phase" style={{ color:phaseColors[index % phaseColors.length] }}>Phase {String(index+1).padStart(2,'0')}</div>
                  <h2 className="ig-card-title">{section.category}</h2>
                  <span className="ig-card-count">{(section.items||[]).length} items</span>
                </div>
                <div className="ig-card-body">
                  {(section.items||[]).map((item, idx) => {
                    const hasPdf = !!item.pdf;
                    const Tag = hasPdf ? 'a' : 'div';
                    return (
                      <Tag
                        key={idx}
                        href={item.pdf || undefined}
                        target={hasPdf ? '_blank' : undefined}
                        rel={hasPdf ? 'noopener noreferrer' : undefined}
                        className={`ig-item${hasPdf ? ' clickable' : ''}`}
                        style={{ textDecoration:'none' }}
                      >
                        <div className="ig-item-left">
                          <FileText size={15} className="ig-item-icon"/>
                          <span className="ig-item-label">{item.name}</span>
                        </div>
                        {hasPdf && <ExternalLink size={14} className="ig-item-dl"/>}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <Reveal>
        <div className="ig-cta">
          <div className="ig-cta-text">
            <div className="ig-cta-title">{t.ctaTitle}</div>
            <div className="ig-cta-desc">{t.ctaDesc}</div>
          </div>
          <button className="ig-cta-btn">{t.ctaBtn} <ArrowRight size={16}/></button>
        </div>
      </Reveal>
    </div>
  );
}