import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

/* ── Brand tokens ── */
const G  = "#16A34A";
const GL = "#F0FDF4";
const GB = "#BBF7D0";
const D  = "#0F172A";
const D2 = "#111827";
const MU = "#64748B";
const BA = "#F8FAFC";
const BS = "#F1F5F9";

/* ── Feature-card data (overview grid) ── */
const OVERVIEW = [
  { icon:"\u{1F465}", color:"#3B82F6", bg:"#DBEAFE", title:"Customer Management",   desc:"Organize customer records, track activity, and manage relationships from one centralized environment." },
  { icon:"\u{1F4C8}", color:G,         bg:GL,        title:"Lead Management",        desc:"Capture leads, track their status, assign to team members, and follow up without losing opportunities." },
  { icon:"\u{1F4CB}", color:"#8B5CF6", bg:"#EDE9FE", title:"Contact Management",     desc:"Maintain a centralized contact database — customers, prospects, details and communication history." },
  { icon:"\u{1F464}", color:"#F59E0B", bg:"#FEF3C7", title:"Customer Profiles",      desc:"Bring customer details, lead status, conversation history and notes into one connected view." },
  { icon:"\u{1F4AC}", color:"#EC4899", bg:"#FCE7F3", title:"Conversation History",   desc:"Maintain customer conversation history to continue with context and improve every follow-up." },
  { icon:"\u{1F504}", color:"#14B8A6", bg:"#CCFBF1", title:"Sales Pipeline",         desc:"Visualize opportunity stages from new lead to conversion and keep your sales process on track." },
  { icon:"\u{1F3AF}", color:"#F97316", bg:"#FFEDD5", title:"Customer Segmentation",  desc:"Group customers and leads by type, location, interests or lifecycle stage for relevant campaigns." },
  { icon:"\u{1F91D}", color:"#6366F1", bg:"#E0E7FF", title:"Team Collaboration",     desc:"Give authorized team members shared access to customer information, leads and interactions." },
];

/* ── Detailed sections data ── */
const SECTIONS = [
  {
    id:"customer-management",
    badge:"Customer Management",
    color:G,
    bg:GL,
    headline:"Keep Your Customer Information Organized",
    sub:"Manage your business customers from one centralized CRM environment.",
    desc:"Store and organize relevant customer information so your team can quickly understand who the customer is, how they have interacted with your business, and what action may be required next.",
    tagline:"Built for businesses that want a clearer view of their customers.",
    points:["Organize customer records","Maintain important customer information","Track customer activity","Manage customer relationships","Access customer information from one place","Keep your customer database structured"],
  },
  {
    id:"lead-management",
    badge:"Lead Management",
    color:G,
    bg:GL,
    headline:"Capture, Organize and Follow Up With Leads",
    sub:"Turn incoming enquiries and prospects into organized sales opportunities.",
    desc:"MessBee CRM helps your team keep track of leads, understand their current status and make timely follow-ups without losing important prospects.",
    tagline:"No more losing valuable leads because of scattered information.",
    points:["Create and organize lead records","Track lead status","Assign leads to team members","Record follow-up activities","Prioritize potential customers","Monitor lead progress","Move qualified leads through your sales process"],
  },
  {
    id:"contact-management",
    badge:"Contact Management",
    color:G,
    bg:GL,
    headline:"One Organized Place for Business Contacts",
    sub:"Keep customer and prospect contact information structured and accessible.",
    desc:"Instead of maintaining contact information across multiple systems, MessBee helps your team maintain a centralized contact database.",
    tagline:"A consistent view of the people your team communicates with.",
    points:["Customer contacts","Prospect contacts","Contact details","Business information","Communication history","Customer-related information","Contact categories and segments"],
  },
  {
    id:"customer-profiles",
    badge:"Customer Profiles",
    color:G,
    bg:GL,
    headline:"Understand Every Customer at a Glance",
    sub:"A customer profile brings relevant customer information together in one place.",
    desc:"Your team can use customer profiles to better understand customer relationships and provide more relevant communication and follow-up.",
    tagline:"One Customer. One Connected View.",
    points:["Customer details","Contact information","Lead status","Conversation history","Customer interactions","Orders or business activity, where applicable","Segmentation information","Relevant notes"],
  },
  {
    id:"conversation-history",
    badge:"Conversation History",
    color:G,
    bg:GL,
    headline:"Keep Customer Conversations Connected",
    sub:"Important customer conversations should not disappear into scattered chats or disconnected records.",
    desc:"MessBee CRM can help your business maintain relevant conversation history associated with customer relationships, subject to the connected channels, permissions and applicable platform limitations.",
    tagline:"Every conversation can become useful business context.",
    points:["Understand previous interactions","Review customer enquiries","Continue conversations with context","Reduce repetitive questions","Improve follow-up","Maintain better customer service"],
  },
  {
    id:"sales-pipeline",
    badge:"Sales Pipeline",
    color:G,
    bg:GL,
    headline:"See Where Every Opportunity Stands",
    sub:"A structured sales pipeline helps your team understand which leads are new, which opportunities are being followed up, and which prospects are moving toward conversion.",
    desc:"MessBee CRM helps organize opportunities according to your business's sales process. Your business can customize stages according to its actual sales workflow.",
    tagline:"A clearer view of your entire sales process.",
    points:["Organize opportunities","Track lead stages","Identify pending follow-ups","Monitor sales progress","Assign opportunities to team members","Get a clearer view of your sales process"],
    flow:["New Lead","Contacted","Qualified","Follow-Up","Opportunity","Converted"],
  },
  {
    id:"customer-segmentation",
    badge:"Customer Segmentation",
    color:G,
    bg:GL,
    headline:"Send More Relevant Communication",
    sub:"Not every customer has the same needs.",
    desc:"MessBee CRM allows businesses to organize customers and leads into meaningful segments based on available customer information and business requirements.",
    tagline:"More relevant communication, campaigns and customer experiences.",
    points:["Customer type","Location","Interests","Purchase or interaction history","Lead status","Business category","Engagement","Customer lifecycle stage"],
  },
];

/* ── Why choose ── */
const WHY = [
  { icon:"\u{1F4CA}", color:G, title:"Centralized Customer Data",    desc:"Keep important customer information organized in one place." },
  { icon:"\u{1F4F2}", color:G, title:"Better Follow-Ups",            desc:"Give your team visibility into leads and pending customer actions." },
  { icon:"\u{1F4AC}", color:G, title:"Connected Conversations",      desc:"Maintain relevant customer interaction history where supported." },
  { icon:"\u{1F504}", color:G, title:"Organized Sales Process",      desc:"Track opportunities through your preferred sales pipeline." },
  { icon:"\u{1F3AF}", color:G, title:"Smarter Segmentation",         desc:"Group customers based on useful business criteria." },
  { icon:"\u{1F91D}", color:G, title:"Team Collaboration",           desc:"Give authorized team members access to the customer information they need." },
];

/* ── FAQ ── */
const FAQS = [
  { q:"What is MessBee CRM?",                     a:"MessBee CRM is a customer relationship management solution that helps businesses organize customer information, manage leads, track conversations, manage sales opportunities and segment customers from a centralized platform." },
  { q:"Who can use MessBee CRM?",                 a:"MessBee CRM can be used by small and medium businesses, retail businesses, service providers, e-commerce businesses and other organizations that need to manage customer relationships and sales activities." },
  { q:"Can I manage leads with MessBee CRM?",     a:"Yes. MessBee CRM provides lead management capabilities to help businesses organize prospects, track lead status and manage follow-ups." },
  { q:"Can MessBee CRM store customer information?", a:"Yes, businesses can maintain relevant customer information within their CRM environment, subject to their plan, configuration, applicable permissions and MessBee's policies." },
  { q:"Can CRM connect with WhatsApp?",           a:"MessBee may provide integration with supported WhatsApp Business services and Meta technologies. Availability and functionality depend on the applicable Meta/WhatsApp requirements, account configuration and MessBee plan." },
  { q:"Can I create customer segments?",          a:"Yes. Customer segmentation can help businesses organize customers and leads according to relevant business criteria and available data." },
  { q:"Is MessBee CRM suitable for small businesses?", a:"Yes. MessBee is designed to support growing businesses that want to organize customer relationships, leads and business communication without maintaining disconnected systems." },
  { q:"Can my team access the CRM together?",    a:"Yes. You can give authorized team members access to customer records, leads, pipeline stages and interaction history so your entire team has a shared view of customer relationships." },
];

/* ── Helpers ── */
function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = (target / 1400) * 16;
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(Math.floor(cur));
          if (cur >= target) clearInterval(iv);
        }, 16);
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const Pill = ({ children, color, bg, border }) => (
  <div style={{ display:"inline-block", background: bg || GL, border:`1px solid ${border || GB}`, color: color || G, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:16 }}>
    {children}
  </div>
);

const Check = ({ color = G }) => (
  <div style={{ width:20, height:20, borderRadius:"50%", background: color+"18", border:`1.5px solid ${color}35`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .cp { background:#16A34A;color:#fff;border:none;border-radius:40px;padding:11px 26px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;box-shadow:0 4px 18px rgba(22,163,74,.3); }
  .cp:hover { background:#15803D;transform:translateY(-1px);box-shadow:0 6px 24px rgba(22,163,74,.4); }
  .cd { background:#111827;color:#fff;border:none;border-radius:40px;padding:11px 26px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;display:inline-flex;align-items:center;gap:8px; }
  .cd:hover { background:#1F2937;transform:translateY(-1px); }
  .co { background:rgba(255,255,255,.08);color:#E4E4E7;border:1px solid rgba(255,255,255,.15);border-radius:40px;padding:11px 26px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
  .co:hover { background:rgba(255,255,255,.14); }
  .cf { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .28s cubic-bezier(.4,0,.2,1); }
  .cf:hover { border-color:#BBF7D0;transform:translateY(-5px);box-shadow:0 16px 40px rgba(22,163,74,.09); }
  .why-card { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .25s; }
  .why-card:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .frow { border-bottom:1px solid #F1F5F9; }
  .fq { display:flex;justify-content:space-between;align-items:center;padding:14px 0;cursor:pointer;gap:16px; }
  .fq:hover .fqt { color:#16A34A; }
  .fqt { font-size:13px;font-weight:600;transition:color .2s;line-height:1.5; }
  .sec-grid { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start; }
  .sec-grid.rev { direction:rtl; }
  .sec-grid.rev > * { direction:ltr; }
  .hg { display:flex;flex-wrap:wrap;align-items:center;gap:48px; }
  .hl { flex:1 1 420px;min-width:280px; }
  .hr { flex:1 1 340px;min-width:280px;display:flex;justify-content:center; }
  .ig { display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center; }
  .sg { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .fg { display:grid;grid-template-columns:repeat(4,1fr);gap:20px; }
  .wg { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
  .ctr { display:flex;gap:14px;flex-wrap:wrap; }
  .sc { background:#FAFAFA;border:1.5px solid #F1F5F9;border-radius:16px;padding:28px 20px;text-align:center; transition:all .2s; }
  .sc:hover { border-color:#BBF7D0; transform:translateY(-2px); box-shadow:0 12px 32px rgba(22,163,74,.05); }
  .flow-strip { display:flex;align-items:center;flex-wrap:wrap;gap:0; }
  .flow-item { background:#F0FDF4;border:1.5px solid #BBF7D0;color:#16A34A;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:700; }
  .flow-arr { color:#94A3B8;font-size:18px;padding:0 6px; }
  .connect-strip { display:flex;align-items:center;flex-wrap:wrap;gap:0;justify-content:center; }
  .connect-item { color:#fff;padding:8px 12px;font-size:14px;font-weight:700; }
  .connect-arr { color:rgba(255,255,255,.6);font-size:18px;padding:0 6px;font-weight:700; }
  @media(max-width:1100px){
    .fg { grid-template-columns:repeat(2,1fr)!important; }
    .sec-grid { grid-template-columns:1fr!important; }
    .sec-grid.rev { direction:ltr; }
    .wg { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:860px){
    .ig { grid-template-columns:1fr!important; }
    .sg { grid-template-columns:1fr 1fr!important; }
  }
  @media(max-width:640px){
    .fg  { grid-template-columns:1fr!important; }
    .wg  { grid-template-columns:1fr!important; }
    .ctr { flex-direction:column!important;align-items:flex-start!important; }
    .hr  { display:none!important; }
    .sg  { grid-template-columns:1fr 1fr!important; }
    .ig  { grid-template-columns:1fr!important; }
    .sec-grid { grid-template-columns:1fr!important; }
  }
  @media(max-width:480px){
    .sg  { grid-template-columns:1fr!important; }
    .sc  { padding:20px 14px!important; }
  }
`;

const CrmPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", background:"#fff", color:D, overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* SEO */}
      <title>MessBee CRM | Customer Relationship & Lead Management Platform</title>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background:"#fff", padding:"100px 6% 60px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="hg" style={{ alignItems:"flex-start" }}>
            <div className="hl">
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:GL, border:`1px solid ${GB}`, borderRadius:40, padding:"6px 18px", marginBottom:28 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
                <span style={{ fontSize:13, fontWeight:600, color:G }}>MessBee CRM</span>
              </div>
              <h1 style={{ fontSize:"clamp(26px,3.5vw,44px)", fontWeight:900, color:D2, lineHeight:1.08, letterSpacing:"-1.5px", marginBottom:16 }}>
                Turn Customer Data Into<br />
                <span style={{ color:G }}>Meaningful Business</span><br />
                Relationships
              </h1>
              <p style={{ fontSize:15, color:MU, lineHeight:1.75, marginBottom:10, maxWidth:520 }}>
                MessBee CRM helps businesses organize customer information, manage leads, track conversations,
                follow up with prospects, and build stronger customer relationships from one centralized platform.
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:36 }}>
                {["Manage Customers.","Track Leads.","Build Relationships.","Grow Your Business."].map(t => (
                  <span key={t} style={{ background:BS, border:"1px solid #E5E7EB", color:MU, borderRadius:40, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>
              <div className="ctr">
                <button id="crm-hero-start" className="cp" onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                <button id="crm-hero-explore" className="cd" onClick={() => document.getElementById("crm-overview")?.scrollIntoView({behavior:"smooth"})}>
                  Explore CRM <Arrow/>
                </button>
              </div>

            </div>

            <div className="hr" style={{ paddingTop: "54px", marginBottom: "-140px" }}>
              <div style={{ background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)", borderRadius:20, padding:24, boxShadow:"0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)", border:"1px solid rgba(34,197,94,.3)", width:"100%", maxWidth:420, transform:"scale(0.75)", transformOrigin:"top right" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:18 }}>
                  {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                  <div style={{ flex:1, background:"rgba(255,255,255,.05)", borderRadius:5, height:16, marginLeft:8 }}/>
                </div>
                <div style={{ marginBottom:16, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,.07)" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,.88)", marginBottom:3 }}>CRM Dashboard</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>Customer Relationship Management</div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
                  {[{l:"Contacts",v:"4,821",c:"#3B82F6"},{l:"Leads",v:"342",c:G},{l:"Closed",v:"89",c:"#F59E0B"}].map(s => (
                    <div key={s.l} style={{ background:"rgba(255,255,255,.04)", borderRadius:10, padding:"10px 8px", border:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
                      <div style={{ fontSize:17, fontWeight:800, color:s.c }}>{s.v}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginTop:2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.3)", marginBottom:10, letterSpacing:1.2, textTransform:"uppercase" }}>Sales Pipeline</div>
                {[{s:"New Enquiry",n:124,p:72,c:"#3B82F6"},{s:"Qualified",n:87,p:50,c:G},{s:"Proposal",n:43,p:25,c:"#F59E0B"},{s:"Converted",n:21,p:12,c:G}].map(r => (
                  <div key={r.s} style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,.6)" }}>{r.s}</span>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>{r.n}</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,.06)", borderRadius:4, height:5 }}>
                      <div style={{ width:r.p+"%", height:"100%", borderRadius:4, background:r.c }}/>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize:10, color:"rgba(255,255,255,.3)", margin:"14px 0 10px", letterSpacing:1.2, textTransform:"uppercase" }}>Recent Contacts</div>
                {[{n:"Priya Sharma",t:"Lead",c:"#3B82F6"},{n:"Rahul Mehra",t:"Customer",c:G},{n:"Anjali Singh",t:"Prospect",c:"#F59E0B"}].map(c => (
                  <div key={c.n} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                    <div style={{ width:26, height:26, borderRadius:"50%", background:c.c+"25", color:c.c, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{c.n[0]}</div>
                    <div style={{ flex:1, fontSize:12, color:"rgba(255,255,255,.8)", fontWeight:600 }}>{c.n}</div>
                    <div style={{ background:c.c+"20", color:c.c, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:40 }}>{c.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── OVERVIEW FEATURES GRID ── */}
      <section id="crm-overview" style={{ background:"#fff", padding:"90px 6% 40px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <Pill>What You Can Do</Pill>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:12 }}>
              What You Can Do with MessBee CRM
            </h2>
            <p style={{ fontSize:14, color:MU, maxWidth:600, margin:"0 auto", lineHeight:1.7 }}>
              Everything your team needs to manage customer relationships in one connected platform.
            </p>
          </div>
          <div className="fg">
            {OVERVIEW.map(f => (
              <div key={f.title} className="cf">
                <div style={{ width:32, height:32, borderRadius:8, background:f.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, marginBottom:10 }}>{f.icon}</div>
                <h3 style={{ fontSize:13, fontWeight:700, color:D2, marginBottom:4, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED SECTIONS ── */}
      {SECTIONS.map((sec, idx) => {
        const isEven = idx % 2 === 0;
        const bgColor = "#fff";
        return (
          <section key={sec.id} id={sec.id} style={{ background:bgColor, padding:"60px 6%", borderTop:"1px solid #F1F5F9" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <div className={"sec-grid" + (isEven ? "" : " rev")}>
                {/* Text side */}
                <div>
                  <Pill color={sec.color} bg={sec.bg} border={sec.color+"40"}>{sec.badge}</Pill>
                  <h2 style={{ fontSize:"clamp(18px,2.5vw,28px)", fontWeight:900, color:D2, lineHeight:1.2, letterSpacing:"-1px", marginBottom:10 }}>
                    {sec.headline}
                  </h2>
                  <p style={{ fontSize:13, fontWeight:600, color:sec.color, marginBottom:14 }}>{sec.sub}</p>
                  <p style={{ fontSize:13, color:MU, lineHeight:1.8, marginBottom:20 }}>{sec.desc}</p>

                  {sec.flow && (
                    <div style={{ marginBottom:20 }}>
                      <p style={{ fontSize:11, color:MU, fontWeight:600, marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>Track Your Sales Journey</p>
                      <div className="flow-strip">
                        {sec.flow.map((f,i) => (
                          <React.Fragment key={f}>
                            <span className="flow-item">{f}</span>
                            {i < sec.flow.length-1 && <span className="flow-arr">&#8594;</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                    {sec.points.map(pt => (
                      <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"#374151", lineHeight:1.6 }}>
                        <Check color={sec.color}/>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize:13, fontWeight:600, color:sec.color }}>{sec.tagline}</p>
                </div>

                {/* Visual side */}
                <div style={{ background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)", borderRadius:16, padding:18, border:`1px solid rgba(34,197,94,.3)`, boxShadow:"0 24px 56px rgba(0,0,0,.18)", maxWidth:400, margin:"110px auto 0", width:"100%" }}>
                  <div style={{ marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:sec.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{OVERVIEW[idx]?.icon}</div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.85)" }}>{sec.badge}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.3)" }}>MessBee CRM</div>
                    </div>
                  </div>
                  <div style={{ background:"rgba(255,255,255,.04)", borderRadius:10, padding:12, border:"1px solid rgba(255,255,255,.07)", marginBottom:12 }}>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", marginBottom:10, letterSpacing:1.2, textTransform:"uppercase" }}>Key Capabilities</div>
                    {sec.points.slice(0,5).map((pt,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom: i < Math.min(sec.points.length,5)-1 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:sec.color, flexShrink:0 }}/>
                        <span style={{ fontSize:11, color:"rgba(255,255,255,.65)" }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ flex:1, background:"rgba(255,255,255,.04)", borderRadius:8, padding:"8px 8px", border:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
                      <div style={{ fontSize:16, fontWeight:800, color:sec.color }}>&#10003;</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginTop:2 }}>Organized</div>
                    </div>
                    <div style={{ flex:1, background:"rgba(255,255,255,.04)", borderRadius:8, padding:"8px 8px", border:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
                      <div style={{ fontSize:16, fontWeight:800, color:sec.color }}>&#10003;</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginTop:2 }}>Trackable</div>
                    </div>
                    <div style={{ flex:1, background:"rgba(255,255,255,.04)", borderRadius:8, padding:"8px 8px", border:"1px solid rgba(255,255,255,.06)", textAlign:"center" }}>
                      <div style={{ fontSize:16, fontWeight:800, color:sec.color }}>&#10003;</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginTop:2 }}>Connected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CRM CONNECTS GROWTH ── */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
              borderRadius: 22,
              padding: "48px 40px",
              color: "#FFFFFF",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(52, 211, 153, 0.25)",
              boxShadow: "0 20px 50px rgba(2, 44, 34, 0.35)",
            }}
          >
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
              <Pill color="#4ADE80" bg="rgba(74,222,128,.1)" border="rgba(74,222,128,.3)">Connected Business</Pill>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 10 }}>
                CRM That Connects Customer Data<br />With Business Growth
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 16px" }}>
                MessBee CRM is designed to work alongside your broader business operations — not in isolation.
              </p>
              <div className="connect-strip">
                {["CRM", "Communication", "Marketing", "Automation", "Commerce", "Analytics"].map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <span className="connect-item">{item}</span>
                    {i < arr.length - 1 && <span className="connect-arr">&#8594;</span>}
                  </React.Fragment>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 16, marginBottom: 0 }}>
                A more connected digital business workflow — instead of managing every function separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section style={{ background:"#fff", padding:"90px 6%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <Pill>Why Businesses Choose Us</Pill>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:12 }}>
              Why Businesses Choose MessBee CRM
            </h2>
          </div>
          <div className="wg">
            {WHY.map(w => (
              <div key={w.title} className="why-card">
                <div style={{ width:32, height:32, borderRadius:8, background:w.color+"15", color:w.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, marginBottom:10 }}>{w.icon}</div>
                <h3 style={{ fontSize:13, fontWeight:700, color:D2, marginBottom:4 }}>{w.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR INDIA ── */}
      <section style={{ background:GL, padding:"80px 6%", borderTop:`1px solid ${GB}`, borderBottom:`1px solid ${GB}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto", textAlign:"center" }}>
          <Pill>Built for Indian Businesses</Pill>
          <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:14 }}>
            Built for Indian Businesses
          </h2>
          <p style={{ fontSize:14, color:MU, lineHeight:1.8, maxWidth:680, margin:"0 auto 16px" }}>
            Whether you run a local business, retail store, service business, e-commerce operation or growing company,
            customer relationships are at the center of your business.
          </p>
          <p style={{ fontSize:14, color:MU, lineHeight:1.8, maxWidth:640, margin:"0 auto 32px" }}>
            MessBee CRM is designed to help businesses move from scattered customer information to a more
            organized digital customer-management workflow.
          </p>
          <div style={{ background:"#fff", border:`1.5px solid ${GB}`, borderRadius:16, padding:"12px 32px", display:"inline-block", maxWidth:720 }}>
            <p style={{ fontSize:11, color:MU, fontWeight:600, marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>From First Enquiry to Long-Term Customer</p>
            <div className="connect-strip" style={{ justifyContent:"center" }}>
              {["Capture","Organize","Communicate","Follow Up","Convert","Retain"].map((step,i,arr) => (
                <React.Fragment key={step}>
                  <span style={{ background:GL, border:`1.5px solid ${GB}`, color:G, borderRadius:8, padding:"5px 12px", fontSize:12, fontWeight:700 }}>{step}</span>
                  {i < arr.length-1 && <span style={{ color:"#94A3B8", fontSize:16, padding:"0 4px" }}>&#8594;</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ marginTop:36 }}>
            <button className="cp" id="crm-india-start" onClick={() => window.open(adminUrl+"/signup","_blank")}>
              Start with MessBee CRM
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:BA, padding:"90px 6%" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <Pill>FAQ</Pill>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>
          {FAQS.map((faq,i) => (
            <div key={i} className="frow">
              <div id={"crm-faq-"+i} className="fq" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span className="fqt" style={{ color:openFaq===i?G:D2 }}>{faq.q}</span>
                <div style={{ width:28, height:28, borderRadius:8, background:openFaq===i?GL:BS, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", color:openFaq===i?G:MU, border:openFaq===i?`1px solid ${GB}`:"1px solid transparent" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d={openFaq===i?"M3 9l4-4 4 4":"M3 5l4 4 4-4"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {openFaq===i && <div style={{ fontSize:13, color:MU, lineHeight:1.8, paddingBottom:16 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background:GL, padding:"90px 6%", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, background:"rgba(22,163,74,.08)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:640, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:`1px solid ${GB}`, borderRadius:40, padding:"4px 14px", marginBottom:20 }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
            <span style={{ fontSize:12, fontWeight:600, color:G }}>Get Started Today</span>
          </div>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,40px)", fontWeight:900, color:D2, letterSpacing:"-1px", lineHeight:1.1, marginBottom:14 }}>
            Ready to Build Stronger<br />
            <span style={{ color:G }}>Customer Relationships?</span>
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.7, maxWidth:480, margin:"0 auto 32px" }}>
            Join thousands of businesses using MessBee CRM to organize, track, and grow their
            customer relationships from one powerful platform.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button id="crm-cta-final" className="cp" style={{ fontSize:13, padding:"10px 20px" }} onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
            <button id="crm-cta-sales" style={{ background:"#fff", color:D2, border:`1.5px solid ${GB}`, borderRadius:40, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s" }} onClick={() => navigate("/contact#contact-form-section")} onMouseOver={(e) => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }}>Contact Support</button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrmPage;
