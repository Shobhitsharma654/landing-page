import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

/* ── Brand tokens ── */
const G  = "#16A34A";
const GD = "#15803D";
const GL = "#F0FDF4";
const GB = "#BBF7D0";
const D  = "#0F172A";
const D2 = "#111827";
const MU = "#64748B";
const BA = "#F8FAFC";
const BS = "#F1F5F9";

/* ── Overview grid ── */
const OVERVIEW = [
  { icon:"🏪", title:"Online Storefront",          desc:"Give your business a professional digital presence where customers can discover your products and services." },
  { icon:"📦", title:"Product Catalogue",           desc:"Organize your products or services with names, images, pricing, categories and descriptions." },
  { icon:"⚙️", title:"Product & Service Mgmt",     desc:"Add, update and manage your business offerings as your catalogue evolves." },
  { icon:"🏷️", title:"Store Information",           desc:"Present key business information — hours, location, contact and more — in one customer-facing place." },
  { icon:"💬", title:"Customer Enquiries",          desc:"Turn store visits into conversations through supported enquiry and communication workflows." },
  { icon:"📋", title:"Order Management",            desc:"Track and manage customer orders, status and fulfilment for supported commerce configurations." },
  { icon:"💳", title:"Payment Integration",         desc:"Connect with supported payment providers to facilitate digital transactions from your store." },
  { icon:"🔗", title:"Commerce Workflows",          desc:"Connect store activity with CRM, communication and automation to create a connected customer journey." },
];

/* ── Step-based sections ── */
const STEPS = [
  {
    num:"01", id:"online-storefront",
    title:"Online Storefront",
    headline:"Give Your Business a Digital Presence",
    desc:"Create a digital storefront where customers can discover your products or services and learn more about your business. Your storefront can help present business information, products and services, pricing, images and contact details.",
    points:["Business information","Products and services","Pricing, where applicable","Product details","Images and descriptions","Contact information","Customer-facing information"],
    tagline:"Create a professional digital presence without depending entirely on marketplace platforms.",
  },
  {
    num:"02", id:"product-catalogue",
    title:"Product Catalogue",
    headline:"Organize What You Sell",
    desc:"Keep your products or services structured and easy for customers to explore. A well-organized catalogue helps customers find relevant products faster and make informed enquiries or purchases.",
    points:["Product names","Descriptions","Images","Categories","Pricing","Availability","Product details"],
    tagline:"A well-organized catalogue helps customers find what they need faster.",
  },
  {
    num:"03", id:"product-service-mgmt",
    title:"Product & Service Management",
    headline:"Manage Your Business Offerings From One Place",
    desc:"Businesses can maintain and update their products or services as their offerings change. This helps keep your digital storefront aligned with your actual business.",
    points:["Add new products","Update product information","Manage categories","Update pricing","Manage availability","Remove or disable unavailable offerings"],
    tagline:"Keep your storefront aligned with your actual business at all times.",
  },
  {
    num:"04", id:"store-information",
    title:"Store Information",
    headline:"Tell Customers Who You Are",
    desc:"Your digital store can bring important business information together in one customer-facing location, giving customers the information they need before they contact or purchase from your business.",
    points:["Business name","Business description","Contact details","Business hours","Location information","Products and services","Customer support information"],
    tagline:"Give customers the information they need before they reach out.",
  },
  {
    num:"05", id:"customer-enquiries",
    title:"Customer Enquiries",
    headline:"Turn Store Visits Into Conversations",
    desc:"A digital store should not end with a product page. Connect customers with your business through supported communication and enquiry workflows. Where supported, these interactions can connect with MessBee CRM.",
    points:["Product discovery to enquiry","Supported communication workflows","CRM-connected interactions","Customer journey continuation","Multi-channel enquiry support","Contextual follow-up"],
    flow:["Explore","Enquire","Communicate","Purchase"],
    tagline:"Every store visit is a potential customer conversation.",
  },
  {
    num:"06", id:"order-management",
    title:"Order Management",
    headline:"Keep Track of Customer Orders",
    desc:"For supported commerce configurations, MessBee can help businesses organize order-related workflows. Available functionality depends on the selected MessBee plan and configuration.",
    points:["Customer orders","Order status","Customer details","Product information","Order-related communication","Fulfilment information"],
    tagline:"Available order-management functionality depends on your plan and configuration.",
  },
  {
    num:"07", id:"payment-integration",
    title:"Payment Integration",
    headline:"Connect Your Store With Supported Payment Options",
    desc:"MessBee may support integration with applicable payment providers to help businesses facilitate digital transactions. Actual payment methods, fees and availability depend on the selected payment provider and applicable terms.",
    points:["Payment collection","Payment status","Transaction references","Order-payment association","Payment-related customer communication"],
    tagline:"MessBee does not itself guarantee payment authorization or successful completion of every transaction.",
  },
  {
    num:"08", id:"commerce-workflows",
    title:"Commerce Workflows",
    headline:"Connect Your Store With Your Business Operations",
    desc:"A digital store becomes more useful when connected with the rest of your business. MessBee helps businesses create a more connected customer and commerce journey across supported features.",
    points:["Store-to-CRM connection","Automated follow-ups","Customer communication workflows","Order-to-payment automation","Marketing integration","Analytics and reporting"],
    flow:["Store","Customer","CRM","Communication","Order","Payment","Follow-Up"],
    tagline:"Your store works best when connected to everything else.",
  },
];

/* ── Ecosystem ── */
const ECOSYSTEM = [
  { icon:"👥", title:"CRM",               desc:"Manage customer and lead information from store activity." },
  { icon:"💬", title:"WhatsApp Business", desc:"Communicate with customers through supported WhatsApp capabilities." },
  { icon:"📣", title:"Marketing",         desc:"Create eligible promotional and customer-engagement workflows." },
  { icon:"🤖", title:"AI & Automation",   desc:"Use supported AI capabilities for customer and business workflows." },
  { icon:"📊", title:"Analytics",         desc:"Monitor available store and business activity." },
];

/* ── Why choose ── */
const WHY = [
  { icon:"🏪", title:"Build Your Own Digital Presence",  desc:"Create a business storefront without relying exclusively on third-party marketplaces." },
  { icon:"📦", title:"Showcase Products & Services",     desc:"Present your offerings in an organized digital catalogue." },
  { icon:"💬", title:"Connect With Customers",           desc:"Turn product discovery into customer conversations and enquiries." },
  { icon:"📋", title:"Manage Commerce",                  desc:"Connect supported ordering and payment workflows." },
  { icon:"👥", title:"Integrate With CRM",               desc:"Keep customer and commerce activities connected." },
  { icon:"📈", title:"Grow as Your Business Grows",      desc:"Build your digital presence today and expand your business operations over time." },
];

/* ── FAQs ── */
const FAQS = [
  { q:"What is MessBee Digital Store?", a:"MessBee Digital Store is a digital storefront solution that helps businesses showcase products or services and connect store activity with supported customer, communication and commerce workflows." },
  { q:"Can I sell products through my Digital Store?", a:"Depending on your MessBee plan and configuration, supported commerce functionality may allow businesses to facilitate product-related enquiries, orders and payments." },
  { q:"Can I add products and services?", a:"Yes. Businesses can organize their products or services with relevant information such as names, descriptions, images, categories and pricing, subject to the applicable features." },
  { q:"Can customers contact my business from the store?", a:"Supported customer enquiry and communication features can allow customers to connect with your business." },
  { q:"Can Digital Store connect with CRM?", a:"Yes, supported configurations can connect store-related customer activity with MessBee CRM." },
  { q:"Can I accept online payments?", a:"MessBee may support integrations with applicable payment providers. Payment methods and availability depend on the provider, configuration and applicable terms." },
  { q:"Do I need to sell only physical products?", a:"No. The Digital Store can be used to present products and services, depending on your business model and the supported functionality." },
  { q:"Is MessBee a marketplace?", a:"No. MessBee Digital Store is designed to help businesses establish and manage their own digital storefront and customer relationships rather than operate as a consumer marketplace." },
];

/* ── Helpers ── */
const Pill = ({ children }) => (
  <div style={{ display:"inline-block", background:GL, border:`1px solid ${GB}`, color:G, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:16 }}>
    {children}
  </div>
);

const Check = () => (
  <div style={{ width:20, height:20, borderRadius:"50%", background:G+"18", border:`1.5px solid ${G}35`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .dsp { background:#16A34A;color:#fff;border:none;border-radius:40px;padding:11px 26px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;box-shadow:0 4px 18px rgba(22,163,74,.3); }
  .dsp:hover { background:#15803D;transform:translateY(-1px);box-shadow:0 6px 24px rgba(22,163,74,.4); }
  .dsd { background:#fff;color:#111827;border:1.5px solid #F1F5F9;border-radius:40px;padding:11px 26px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s; }
  .dsd:hover { border-color:#BBF7D0;background:#F0FDF4; }
  .dsf { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .28s; }
  .dsf:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .why-card { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .25s; }
  .why-card:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .frow { border-bottom:1px solid #F1F5F9; }
  .fq { display:flex;justify-content:space-between;align-items:center;padding:14px 0;cursor:pointer;gap:16px; }
  .fq:hover .fqt { color:#16A34A; }
  .fqt { font-size:13px;font-weight:600;transition:color .2s;line-height:1.5; }
  .ds-fg { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .ds-why { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
  .ds-eco { display:grid;grid-template-columns:repeat(5,1fr);gap:12px; }
  .ds-wrap { display:flex;gap:0; }
  .ds-nav { width:180px;flex-shrink:0;position:sticky;top:80px;align-self:flex-start; }
  .ds-body { flex:1;min-width:0; }
  .ds-btn { display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;cursor:pointer;transition:all .2s;margin-bottom:3px;border:none;background:transparent;width:100%;text-align:left; }
  .ds-btn:hover { background:#F0FDF4; }
  .ds-btn.act { background:#F0FDF4;border:1px solid #BBF7D0; }
  .ds-card { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:24px 22px; }
  .ds-in { display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start; }
  @media(max-width:1100px){
    .ds-fg { grid-template-columns:repeat(2,1fr)!important; }
    .ds-eco { grid-template-columns:repeat(3,1fr)!important; }
    .ds-wrap { flex-direction:column!important; }
    .ds-why { grid-template-columns:repeat(2,1fr)!important; }
    .ds-in { grid-template-columns:1fr!important; }
  }
  @media(max-width:640px){
    .ds-fg { grid-template-columns:1fr!important; }
    .ds-why { grid-template-columns:1fr!important; }
    .ds-eco { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(hover:none){
    .dsf:hover,.why-card:hover { transform:none!important; }
  }
`;

const DigitalStorePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";
  const step = STEPS[activeStep];

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", background:"#fff", color:D, overflowX:"hidden" }}>
      <style>{CSS}</style>
      <title>Digital Store for Businesses | Online Storefront & Commerce | MessBee</title>
      <meta name="description" content="Create your digital storefront with MessBee. Showcase products and services, manage customer enquiries, orders and supported payments while connecting your store with CRM and automation." />

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background:"#fff", padding:"100px 6% 60px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", gap:48 }}>
            <div style={{ flex:"1 1 420px", minWidth:280 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:GL, border:`1px solid ${GB}`, borderRadius:40, padding:"6px 18px", marginBottom:28 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
                <span style={{ fontSize:13, fontWeight:600, color:G }}>MessBee Digital Store</span>
              </div>
              <h1 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:900, color:D2, letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:16 }}>
                Build Your Digital<br/>
                <span style={{ color:G }}>Storefront</span>
              </h1>

              <p style={{ fontSize:15, color:MU, lineHeight:1.75, maxWidth:500, marginBottom:32 }}>
                MessBee Digital Store helps businesses create and manage their digital presence for products and services, showcase their offerings, connect with customers and manage commerce workflows from one connected platform.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:36 }}>
                {["Showcase.","Sell.","Connect.","Grow."].map(t => (
                  <span key={t} style={{ background:BS, border:"1px solid #E5E7EB", color:MU, borderRadius:40, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>

              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <button id="ds-hero-start" className="dsp" onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                <button id="ds-hero-explore" style={{ background:"#fff", color:D2, border:`1.5px solid ${GB}`, borderRadius:40, padding:"10px 24px", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }} onClick={() => document.getElementById("ds-features")?.scrollIntoView({behavior:"smooth"})}>
                  Explore Digital Store →
                </button>
              </div>
            </div>

            {/* Storefront mockup */}
            <div style={{ flex:"1 1 340px", minWidth:280, display:"flex", justifyContent:"center", marginTop:60 }}>
              <div style={{ background:"linear-gradient(135deg,#14532d 0%,#052e16 60%,#022c22 100%)", borderRadius:16, padding:"18px 20px", boxShadow:"0 20px 50px rgba(2,44,34,.4),0 0 0 1px rgba(52,211,153,.15)", border:"1.5px solid rgba(52,211,153,.2)", width:"100%", maxWidth:290, marginLeft:40 }}>
                <div style={{ marginBottom:12, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,.1)" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#fff", marginBottom:1 }}>MessBee Digital Store</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,.5)" }}>Your Business · Online</div>
                </div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,.45)", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Featured Products</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
                  {[{n:"Product A",p:"₹499",tag:"In Stock"},{n:"Service B",p:"₹1,299",tag:"Available"},{n:"Product C",p:"₹799",tag:"In Stock"},{n:"Package D",p:"₹2,499",tag:"Popular"}].map(p => (
                    <div key={p.n} style={{ background:"rgba(255,255,255,.07)", borderRadius:6, padding:"7px 8px", border:"1px solid rgba(255,255,255,.1)" }}>
                      <div style={{ width:"100%", height:28, borderRadius:4, background:"rgba(255,255,255,.06)", marginBottom:5 }}/>
                      <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.85)", marginBottom:2 }}>{p.n}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:10, fontWeight:800, color:"#4ADE80" }}>{p.p}</span>
                        <span style={{ fontSize:8, color:"rgba(255,255,255,.4)" }}>{p.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,.45)", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Store Activity</div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {[{l:"New Enquiry",v:"Product A",c:"#4ADE80"},{l:"Order Placed",v:"Service B",c:"#60A5FA"},{l:"Payment Received",v:"₹1,299",c:"#FCD34D"}].map(a => (
                    <div key={a.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 8px", background:"rgba(255,255,255,.06)", borderRadius:5, border:"1px solid rgba(255,255,255,.08)" }}>
                      <span style={{ fontSize:9, color:"rgba(255,255,255,.6)" }}>{a.l}</span>
                      <span style={{ fontSize:9, fontWeight:700, color:a.c }}>{a.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR BUSINESS ONLINE ── */}
      <section style={{ background:BA, padding:"48px 6%", borderTop:`1px solid ${BS}` }}>
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <Pill>Your Business, Online</Pill>
          <h2 style={{ fontSize:"clamp(18px,2vw,28px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:10 }}>
            A Digital Storefront for Every Business
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.75, maxWidth:560, margin:"0 auto" }}>
            A digital storefront gives customers an easier way to discover what your business offers. With MessBee Digital Store, businesses can organize their products or services, present important information and create a more convenient customer journey.
          </p>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="ds-features" style={{ background:"#fff", padding:"60px 6%", borderTop:`1px solid ${BS}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <Pill>Platform Capabilities</Pill>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:10 }}>
              Manage Your Digital Store
            </h2>
          </div>
          <div className="ds-fg">
            {OVERVIEW.map(f => (
              <div key={f.title} className="dsf">
                <div style={{ fontSize:20, marginBottom:8 }}>{f.icon}</div>
                <h3 style={{ fontSize:12, fontWeight:700, color:D2, marginBottom:4, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP DEEP DIVE ── */}
      <section style={{ background:BA, padding:"60px 6%", borderTop:`1px solid ${BS}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <Pill>Deep Dive</Pill>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Digital Store Capabilities
            </h2>
          </div>
          <div className="ds-wrap">
            <div className="ds-nav" style={{ paddingRight:20 }}>
              {STEPS.map((s,i) => (
                <button key={s.id} id={"ds-step-"+i} className={"ds-btn"+(activeStep===i?" act":"")}
                  onClick={() => setActiveStep(i)}
                  style={{ borderColor: activeStep===i ? GB : "transparent" }}>
                  <div style={{ width:26, height:26, borderRadius:7, background:activeStep===i?GL:BS, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:activeStep===i?G:MU, flexShrink:0 }}>{s.num}</div>
                  <span style={{ fontSize:12, fontWeight:activeStep===i?700:500, color:activeStep===i?G:MU, lineHeight:1.3 }}>{s.title}</span>
                </button>
              ))}
            </div>
            <div className="ds-body">
              <div className="ds-card" key={step.id} style={{ borderColor:GB }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:GL, border:`1px solid ${GB}`, borderRadius:40, padding:"3px 10px", marginBottom:14 }}>
                  <span style={{ fontSize:11, fontWeight:800, color:G }}>{step.num}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:G }}>{step.title}</span>
                </div>
                <h3 style={{ fontSize:"clamp(14px,1.5vw,20px)", fontWeight:900, color:D2, lineHeight:1.2, letterSpacing:"-0.5px", marginBottom:10 }}>{step.headline}</h3>
                <p style={{ fontSize:13, color:MU, lineHeight:1.7, marginBottom:16 }}>{step.desc}</p>
                <div className="ds-in">
                  <div>
                    {step.flow && (
                      <div style={{ marginBottom:14 }}>
                        <div style={{ fontSize:11, color:MU, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Workflow</div>
                        <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:0 }}>
                          {step.flow.map((f,i) => (
                            <React.Fragment key={f}>
                              <span style={{ background:GL, border:`1.5px solid ${GB}`, color:G, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700 }}>{f}</span>
                              {i<step.flow.length-1 && <span style={{ color:"#94A3B8", fontSize:13, padding:"0 3px" }}>→</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                    <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
                      {step.points.map(pt => (
                        <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"#374151", lineHeight:1.6 }}>
                          <Check />{pt}
                        </li>
                      ))}
                    </ul>
                    <button id={"ds-cap-"+activeStep} className="dsp" style={{ fontSize:12, padding:"9px 20px" }} onClick={() => window.open(adminUrl+"/signup","_blank")}>Create Your Digital Store</button>
                  </div>
                  <div>
                    <div style={{ background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)", borderRadius:14, padding:18, border:"1px solid rgba(22,163,74,.2)", boxShadow:"0 16px 40px rgba(0,0,0,.16)" }}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", letterSpacing:1.2, textTransform:"uppercase", marginBottom:12 }}>Store Preview</div>
                      <div style={{ background:"rgba(255,255,255,.05)", borderRadius:8, padding:"10px 12px", marginBottom:8, border:"1px solid rgba(255,255,255,.07)" }}>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:4 }}>Your Business Name</div>
                        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.85)" }}>{step.title}</div>
                      </div>
                      {[1,2,3].map(n => (
                        <div key={n} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:n<3?"1px solid rgba(255,255,255,.05)":"none" }}>
                          <div style={{ width:28, height:28, borderRadius:6, background:"rgba(22,163,74,.12)", flexShrink:0 }}/>
                          <div style={{ flex:1 }}>
                            <div style={{ height:6, background:"rgba(255,255,255,.1)", borderRadius:3, marginBottom:4, width:"70%" }}/>
                            <div style={{ height:5, background:"rgba(255,255,255,.06)", borderRadius:3, width:"50%" }}/>
                          </div>
                          <div style={{ fontSize:9, fontWeight:700, color:"#4ADE80" }}>₹{(n*499).toLocaleString()}</div>
                        </div>
                      ))}
                      <div style={{ marginTop:10, padding:"8px 10px", background:"rgba(22,163,74,.08)", border:"1px solid rgba(22,163,74,.2)", borderRadius:7 }}>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>Connected to CRM · WhatsApp · Payments</div>
                      </div>
                    </div>
                  </div>
                </div>
                {step.tagline && (
                  <div style={{ marginTop:16, padding:"10px 14px", background:GL, border:`1px solid ${GB}`, borderRadius:8 }}>
                    <p style={{ fontSize:12, color:GD, margin:0 }}>{step.tagline}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section style={{ background:GL, padding:"48px 6%", borderTop:`1px solid ${GB}`, borderBottom:`1px solid ${GB}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto", textAlign:"center" }}>
          <Pill>Connected Ecosystem</Pill>
          <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:10 }}>
            Connect Your Digital Store With MessBee
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.7, maxWidth:480, margin:"0 auto 28px" }}>
            Your storefront becomes more powerful when it works alongside the rest of your business tools.
          </p>
          <div className="ds-eco">
            {ECOSYSTEM.map(e => (
              <div key={e.title} style={{ background:"#fff", border:`1.5px solid ${GB}`, borderRadius:14, padding:"14px 12px", textAlign:"center" }}>
                <div style={{ fontSize:20, marginBottom:7 }}>{e.icon}</div>
                <div style={{ fontSize:12, fontWeight:700, color:D2, marginBottom:4 }}>{e.title}</div>
                <div style={{ fontSize:11, color:MU, lineHeight:1.5 }}>{e.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:24, display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:0 }}>
            {["Store","Customer","CRM","Communication","Order","Payment","Follow-Up"].map((item,i,arr) => (
              <React.Fragment key={item}>
                <span style={{ background:"#fff", border:`1.5px solid ${GB}`, color:G, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700 }}>{item}</span>
                {i<arr.length-1 && <span style={{ color:"#94A3B8", fontSize:13, padding:"0 3px" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section style={{ background:"#fff", padding:"60px 6%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <Pill>Why MessBee</Pill>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Why Businesses Choose MessBee Digital Store
            </h2>
          </div>
          <div className="ds-why">
            {WHY.map(w => (
              <div key={w.title} className="why-card">
                <div style={{ width:32, height:32, borderRadius:8, background:GL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, marginBottom:8 }}>{w.icon}</div>
                <h3 style={{ fontSize:13, fontWeight:700, color:D2, marginBottom:4 }}>{w.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR INDIA ── */}
      <section style={{ background:GL, padding:"60px 6%", textAlign:"center", borderTop:`1px solid ${GB}`, borderBottom:`1px solid ${GB}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:`1px solid ${GB}`, borderRadius:40, padding:"4px 14px", marginBottom:16 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:G }}/>
            <span style={{ fontSize:12, fontWeight:600, color:G }}>Built for Indian Businesses</span>
          </div>
          <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:12 }}>
            From Local Retailers to Growing Online Businesses
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.7, maxWidth:580, margin:"0 auto 20px" }}>
            Customers increasingly discover businesses digitally before making an enquiry or purchase. MessBee Digital Store helps businesses establish a more direct digital presence and connect storefront activity with their broader customer and business operations.
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:0, marginBottom:28 }}>
            {["Discover","Explore","Enquire","Purchase","Support","Retain"].map((s,i,arr) => (
              <React.Fragment key={s}>
                <span style={{ background:"#fff", border:`1.5px solid ${GB}`, color:G, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700 }}>{s}</span>
                {i<arr.length-1 && <span style={{ color:"#94A3B8", fontSize:13, padding:"0 3px" }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <button id="ds-india-start" className="dsp" style={{ fontSize:13, padding:"10px 20px" }} onClick={() => window.open(adminUrl+"/signup","_blank")}>
            Create Your Digital Store
          </button>
        </div>
      </section>

      {/* ── YOUR STORE YOUR RELATIONSHIP ── */}
      <section style={{ background:"#fff", padding:"48px 6%", borderTop:`1px solid ${BS}` }}>
        <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
          <Pill>Your Customer Relationship</Pill>
          <h2 style={{ fontSize:"clamp(18px,2.5vw,28px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:12 }}>
            Your Digital Store. Your Customer Relationship.
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.75, maxWidth:580, margin:"0 auto 16px" }}>
            Instead of treating your storefront, customer communication, CRM and marketing as separate systems, MessBee brings supported business functions together into one connected platform.
          </p>
          <p style={{ fontSize:13, fontWeight:700, color:G }}>
            Build Your Presence. Own Your Customer Relationship. Grow Your Business.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:BA, padding:"60px 6%" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <Pill>FAQ</Pill>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,30px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>
          {FAQS.map((faq,i) => (
            <div key={i} className="frow">
              <div id={"ds-faq-"+i} className="fq" onClick={() => setOpenFaq(openFaq===i?null:i)}>
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

      {/* ── CTA ── */}
      <section style={{ background:GL, padding:"72px 6%", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, background:"rgba(22,163,74,.08)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:600, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:`1px solid ${GB}`, borderRadius:40, padding:"4px 14px", marginBottom:20 }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
            <span style={{ fontSize:12, fontWeight:600, color:G }}>Get Started Today</span>
          </div>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,40px)", fontWeight:900, color:D2, letterSpacing:"-1px", lineHeight:1.1, marginBottom:12 }}>
            Ready to Build Your<br/>
            <span style={{ color:G }}>Digital Storefront?</span>
          </h2>
          <p style={{ fontSize:14, color:MU, lineHeight:1.7, maxWidth:480, margin:"0 auto 32px" }}>
            Join businesses using MessBee Digital Store to showcase products, connect with customers and manage commerce from one connected platform.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button id="ds-cta-final" className="dsp" style={{ fontSize:13, padding:"11px 26px" }} onClick={() => window.open(adminUrl+"/signup","_blank")}>
              Create Your Digital Store
            </button>
            <button id="ds-cta-sales" className="dsd" style={{ fontSize:13, padding:"11px 26px" }} onClick={() => navigate("/contact#contact-form-section")}>Contact Support</button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalStorePage;
