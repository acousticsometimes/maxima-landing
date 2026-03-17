import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, BarChart3, Activity, Award, ArrowRight, Check } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

export default function WhyIndonesia({ language = 'en', onOpenWhatsApp }) {
  const { content, loading } = useLandingContent();

  if (loading) return <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#022f54', fontFamily:'Plus Jakarta Sans, sans-serif' }}>Loading...</div>;

  const wi = content?.whyIndonesia;
  const factIcons = [<TrendingUp size={22}/>, <Users size={22}/>, <BarChart3 size={22}/>, <Activity size={22}/>, <Award size={22}/>];

  const chartData = wi?.chart?.data ?? [
    { country:'Singapore', value:35, color:'#0775b9' },
    { country:'China',     value:28, color:'#03416e' },
    { country:'Hong Kong', value:22, color:'#022f54' },
    { country:'Japan',     value:18, color:'#2d8fb5' },
    { country:'S. Korea',  value:12, color:'#5aabcc' },
  ];
  const chartMax = Math.ceil(Math.max(...chartData.map(d=>d.value), 0) / 10) * 10 || 40;
  const chartGridLines = Array.from({ length:5 }, (_,i) => chartMax - i * (chartMax/4));

  const destinations = wi?.destinations ?? [
    { title:'Karawang', image:'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80', desc:"Lies in the heart of the Jakarta–Bandung economic corridor — one of Indonesia's most active industrial belts.", points:['Hub of 1,762 manufacturing companies.','Home to 1.5 million capable workforces.'] },
    { title:'Batang Industrial Park', image:'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=800&q=80', desc:'A strategic national project designed to boost industrial growth in Central Java with world-class infrastructure.', points:['Competitive land pricing and labour costs.','Direct access to Trans-Java Toll Road and Railway.'] },
    { title:'Cikarang', image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', desc:'The largest industrial estate complex in Southeast Asia, hosting thousands of multinational companies.', points:['Over 4,000 companies operating.','Excellent port and logistics connectivity.'] },
    { title:'Kendal Industrial Park', image:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80', desc:'A joint Indonesia-Singapore development offering modern infrastructure and special economic zone benefits.', points:['SEZ tax incentives available.','Close proximity to Semarang port.'] },
  ];

  const mapPins = [
    { name:'Jakarta',    coords:[-6.2088, 106.8456] },
    { name:'Cikarang',   coords:[-6.2611, 107.1528] },
    { name:'Karawang',   coords:[-6.3042, 107.3079] },
    { name:'Subang',     coords:[-6.5716, 107.7587] },
    { name:'Semarang',   coords:[-6.9667, 110.4167] },
    { name:'Kendal',     coords:[-6.9222, 110.2039] },
    { name:'Batang',     coords:[-6.9128, 109.7338] },
    { name:'Grobogan',   coords:[-7.0266, 110.9227] },
    { name:'Sidoarjo',   coords:[-7.4478, 112.7183] },
    { name:'Surabaya',   coords:[-7.2575, 112.7521] },
    { name:'Medan',      coords:[ 3.5952,  98.6722] },
    { name:'Balikpapan', coords:[-1.2379, 116.8529] },
    { name:'Makassar',   coords:[-5.1477, 119.4327] },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    .wi { font-family:'DM Sans',sans-serif; background:#fff; color:#0d1e30; padding-top:72px; }
    .wi { --blue:#0775b9; --navy:#022f54; --surface:#f4f6f9; --border:#e2e6ec; --muted:#5a7390; --pad:80px; --max:1600px; }

    /* ── HEADER ── */
    .wi-hdr { text-align:center; padding:140px var(--pad) 100px; background:#fff; position:relative; overflow:hidden; }
    .wi-hdr::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(7,117,185,0.07) 0%,transparent 70%); pointer-events:none; }
    .wi-eyebrow { font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#0775b9; margin-bottom:20px; display:block; }
    .wi-hdr-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(48px,6vw,80px); font-weight:800; letter-spacing:-2.5px; line-height:1.04; color:#022f54; margin-bottom:24px; }
    .wi-hdr-sub { font-size:20px; font-weight:400; color:#5a7390; line-height:1.7; max-width:640px; margin:0 auto; }
    .wi-sec-head { text-align:center; margin-bottom:72px; }
    .wi-sec-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(32px,4vw,52px); font-weight:800; letter-spacing:-1.5px; line-height:1.08; color:#022f54; margin-bottom:14px; }
    .wi-sec-sub { font-size:17px; color:#5a7390; max-width:520px; margin:0 auto; line-height:1.7; }

    /* ── MAP ── */
    .wi-map-wrap { padding:0 var(--pad) 120px; max-width:var(--max); margin:0 auto; }
    .wi-map-container { width:100%; height:560px; border-radius:28px; overflow:hidden; box-shadow:0 20px 64px rgba(2,47,84,0.14); border:1px solid #e2e6ec; }

    /* ── FACTS BAND — equal height ── */
    .wi-facts { background:#022f54; padding:140px var(--pad); position:relative; overflow:hidden; }
    .wi-facts-bg { position:absolute; inset:0; opacity:0.06; }
    .wi-facts-bg img { width:100%; height:100%; object-fit:cover; }
    .wi-facts-inner { max-width:var(--max); margin:0 auto; position:relative; z-index:2; }
    .wi-facts-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(32px,4vw,52px); font-weight:800; color:#fff; letter-spacing:-1.5px; text-align:center; margin-bottom:72px; }
    .wi-facts-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:20px; align-items:stretch; }
    .wi-fact-card { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:36px 24px; border-radius:24px; transition:all 0.3s ease; display:flex; flex-direction:column; align-items:center; text-align:center; }
    .wi-fact-card:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.22); transform:translateY(-6px); }
    .wi-fact-icon { width:52px; height:52px; border-radius:16px; background:#0775b9; color:#fff; display:flex; align-items:center; justify-content:center; margin-bottom:20px; flex-shrink:0; }
    .wi-fact-lbl { font-family:'Plus Jakarta Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:8px; }
    .wi-fact-val { font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:10px; line-height:1.3; }
    .wi-fact-desc { font-size:14px; color:rgba(255,255,255,0.6); line-height:1.65; flex:1; }

    /* ── CHART ── */
    .wi-chart { background:#f4f6f9; padding:140px var(--pad); }
    .wi-chart-inner { max-width:var(--max); margin:0 auto; }
    .wi-chart-box { background:#fff; border:1px solid #e2e6ec; border-radius:28px; padding:64px 72px 56px; box-shadow:0 4px 24px rgba(2,47,84,0.06); }
    .wi-chart-wrap { position:relative; height:320px; padding-left:52px; }
    .wi-chart-grid { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:space-between; }
    .wi-chart-gl { position:relative; width:100%; border-top:1px dashed #e2e6ec; }
    .wi-chart-gl span { position:absolute; left:-52px; top:-10px; font-size:13px; color:#9aadbe; font-weight:500; }
    .wi-chart-bars { position:absolute; inset:0; display:flex; align-items:flex-end; justify-content:space-around; padding:0 32px; gap:12px; }
    .wi-bar-item { display:flex; flex-direction:column; align-items:center; width:14%; height:100%; }
    .wi-bar { width:100%; max-width:64px; border-radius:10px 10px 0 0; position:relative; margin-top:auto; transition:filter 0.2s,transform 0.2s; }
    .wi-bar-item:hover .wi-bar { filter:brightness(1.15); transform:scaleY(1.03); transform-origin:bottom; }
    .wi-bar-val { position:absolute; top:-28px; left:50%; transform:translateX(-50%); font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:800; color:#022f54; opacity:0; transition:opacity 0.2s; white-space:nowrap; }
    .wi-bar-item:hover .wi-bar-val { opacity:1; }
    .wi-bar-lbl { font-size:13px; font-weight:600; color:#6b7f95; margin-top:12px; text-align:center; }

    /* ── DESTINATIONS — equal height ── */
    .wi-dest { background:#fff; padding:140px var(--pad); }
    .wi-dest-inner { max-width:var(--max); margin:0 auto; }
    .wi-dest-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:stretch; }
    .wi-loc-card { background:#fff; border:1px solid #e2e6ec; border-radius:28px; overflow:hidden; display:flex; flex-direction:column; transition:transform 0.28s ease,box-shadow 0.28s ease; }
    .wi-loc-card:hover { transform:translateY(-8px); box-shadow:0 24px 64px rgba(2,47,84,0.14); }
    .wi-loc-img { height:260px; overflow:hidden; position:relative; flex-shrink:0; }
    .wi-loc-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.55s ease; }
    .wi-loc-card:hover .wi-loc-img img { transform:scale(1.06); }
    .wi-loc-body { padding:36px; display:flex; flex-direction:column; flex:1; }
    .wi-loc-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; font-weight:800; color:#022f54; margin-bottom:12px; }
    .wi-loc-desc { font-size:16px; color:#5a7390; line-height:1.7; margin-bottom:20px; }
    .wi-loc-points { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; flex:1; }
    .wi-loc-point { display:flex; align-items:flex-start; gap:14px; font-size:15px; font-weight:500; color:#3d5168; line-height:1.6; }
    .wi-loc-point svg { color:#0775b9; flex-shrink:0; margin-top:3px; }
    .wi-loc-btn { display:flex; align-items:center; justify-content:center; gap:9px; width:100%; padding:15px 24px; border-radius:14px; font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:700; color:#fff; background:#022f54; border:none; cursor:pointer; transition:background 0.2s; margin-top:auto; flex-shrink:0; }
    .wi-loc-btn:hover { background:#0775b9; }

    /* ── RESPONSIVE ── */
    @media (max-width:1280px) {
      .wi { --pad:48px; }
      .wi-facts-grid { grid-template-columns:repeat(3,1fr); }
      .wi-dest-grid { grid-template-columns:1fr 1fr; }
      .wi-chart-box { padding:40px 32px; }
    }
    @media (max-width:768px) {
      .wi { --pad:24px; }
      .wi-hdr { padding:80px 24px 64px; }
      .wi-hdr-h1 { font-size:clamp(36px,10vw,56px); letter-spacing:-2px; }
      .wi-map-wrap { padding:0 24px 72px; }
      .wi-map-container { height:360px; }
      .wi-facts { padding:80px 24px; }
      .wi-facts-grid { grid-template-columns:repeat(2,1fr); }
      .wi-chart { padding:80px 24px; }
      .wi-chart-box { padding:28px 16px; }
      .wi-dest { padding:80px 24px; }
      .wi-dest-grid { grid-template-columns:1fr; }
    }
    @media (max-width:540px) {
      .wi-facts-grid { grid-template-columns:1fr; }
    }
  `;

  return (
    <div className="wi">
      <SEO page="why-indonesia" content={content}/>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header className="wi-hdr">
        <Reveal>
          <span className="wi-eyebrow">Opportunity</span>
          <h1 className="wi-hdr-h1">{wi?.header?.title ?? 'Why Invest in Indonesia?'}</h1>
          <p className="wi-hdr-sub">{wi?.header?.subtitle ?? "Explore Indonesia's vast industrial potential and strategic advantages for global manufacturers."}</p>
        </Reveal>
      </header>

      {/* ── MAP ── */}
      <div className="wi-map-wrap">
        <Reveal delay={80}>
          <div className="wi-map-container" role="application" aria-label="Map of Indonesian industrial zones">
            <MapContainer center={[-2.5, 118]} zoom={5} scrollWheelZoom={false} style={{ height:'100%', width:'100%' }}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              {mapPins.map((pin, i) => (
                <CircleMarker key={i} center={pin.coords} pathOptions={{ color:'#0775b9', fillColor:'#0775b9', fillOpacity:0.8, weight:2 }} radius={8}>
                  <Popup>{pin.name} — Industrial Zone</Popup>
                  <Tooltip>{pin.name}</Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </Reveal>
      </div>

      {/* ── FACTS BAND ── */}
      <section className="wi-facts" aria-label="Economic facts about Indonesia">
        <div className="wi-facts-bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=2000&q=80" alt=""/></div>
        <div className="wi-facts-inner">
          <Reveal><h2 className="wi-facts-title">{wi?.factsTitle ?? wi?.header?.title ?? 'Why Invest Here?'}</h2></Reveal>
          <div className="wi-facts-grid">
            {(wi?.facts ?? []).map((fact, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="wi-fact-card">
                  <div className="wi-fact-icon" aria-hidden="true">{factIcons[i]}</div>
                  <div className="wi-fact-lbl">{fact.title}</div>
                  <div className="wi-fact-val">{fact.subtitle}</div>
                  <p className="wi-fact-desc">{fact.desc ?? fact.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHART ── */}
      <section className="wi-chart" aria-label="Foreign investment chart">
        <div className="wi-chart-inner">
          <Reveal>
            <div className="wi-sec-head">
              <h2 className="wi-sec-title">{wi?.chart?.title ?? 'Top 5 Investment Sources'}</h2>
              <p className="wi-sec-sub">Foreign direct investment realisation by country of origin.</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="wi-chart-box" role="img" aria-label="Bar chart of top investment sources">
              <div className="wi-chart-wrap">
                <div className="wi-chart-grid" aria-hidden="true">
                  {chartGridLines.map(val => (<div key={val} className="wi-chart-gl">{val > 0 && <span>{Math.round(val)}%</span>}</div>))}
                </div>
                <div className="wi-chart-bars">
                  {chartData.map((data, i) => (
                    <div key={i} className="wi-bar-item">
                      <div className="wi-bar" style={{ height:`${(data.value/chartMax)*100}%`, backgroundColor:data.color }}>
                        <span className="wi-bar-val">{data.value}%</span>
                      </div>
                      <span className="wi-bar-lbl">{data.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="wi-dest" aria-label="Key industrial destinations">
        <div className="wi-dest-inner">
          <Reveal>
            <div className="wi-sec-head">
              <h2 className="wi-sec-title">Key Industrial Destinations</h2>
              <p className="wi-sec-sub">Prime zones ready for foreign investment across the archipelago.</p>
            </div>
          </Reveal>
          <div className="wi-dest-grid">
            {destinations.map((loc, i) => (
              <Reveal key={loc.title} from={i%2===0?'left':'right'} delay={i * 80}>
                <article className="wi-loc-card">
                  <div className="wi-loc-img">
                    <img src={loc.image} alt={`${loc.title} industrial zone in Indonesia`} loading="lazy"/>
                  </div>
                  <div className="wi-loc-body">
                    <h3 className="wi-loc-title">{loc.title}</h3>
                    <p className="wi-loc-desc">{loc.desc}</p>
                    <div className="wi-loc-points">
                      {loc.points.map((pt,j) => (
                        <div key={j} className="wi-loc-point"><Check size={15} aria-hidden="true"/><span>{pt}</span></div>
                      ))}
                    </div>
                    <button onClick={() => onOpenWhatsApp && onOpenWhatsApp(loc.title)} className="wi-loc-btn" aria-label={`Enquire about ${loc.title}`}>
                      Enquire Now <ArrowRight size={15} aria-hidden="true"/>
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}