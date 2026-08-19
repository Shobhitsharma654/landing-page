import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

/* ── Project brand palette (same as CRM & WA pages) ── */
const G   = "#16A34A";   // primary brand green
const GL  = "#F0FDF4";   // green light bg
const GB  = "#BBF7D0";   // green border
const GD  = "#15803D";   // green dark
const D   = "#0F172A";   // dark navy
const D2  = "#111827";   // near-black
const MU  = "#64748B";   // muted text
const BA  = "#F8FAFC";   // soft section bg
const BS  = "#F1F5F9";   // border

const FEATURES = [
  { icon:"📣", color:G,         bg:GL,        title:"Campaign Management",    desc:"Plan, launch and manage structured marketing campaigns for product launches, seasonal offers, re-engagement and customer retention from one workspace." },
  { icon:"🗺️", color:"#0EA5E9", bg:"#E0F2FE", title:"Customer Journeys",     desc:"Build automated marketing journeys around customer actions, lifecycle stages and configured business rules — the right message at the right time." },
  { icon:"⚡", color:G,         bg:GL,        title:"Automated Follow-Ups",  desc:"Replace manual follow-up chaos with automation. From new leads to post-purchase sequences, keep engagement consistent and on time." },
  { icon:"💬", color:"#059669", bg:"#DCFCE7", title:"WhatsApp Marketing",    desc:"Use supported WhatsApp Business capabilities as part of your marketing workflows — promotions, announcements and re-engagement where permitted." },
  { icon:"📧", color:"#3B82F6", bg:"#DBEAFE", title:"Email Marketing",       desc:"Create structured email campaigns for promotions, newsletters, customer updates, follow-ups and re-engagement." },
  { icon:"🌱", color:"#14B8A6", bg:"#CCFBF1", title:"Lead Nurturing",        desc:"Keep prospects engaged throughout their journey from first enquiry to conversion with structured, automated nurture workflows." },
  { icon:"🎯", color:"#EC4899", bg:"#FCE7F3", title:"Audience Segmentation", desc:"Segment customers by type, location, lifecycle stage, purchase activity and engagement to send more relevant campaigns." },
  { icon:"📊", color:G,         bg:GL,        title:"Marketing Analytics",   desc:"Measure campaign performance, message activity, engagement, lead movement and channel effectiveness from one dashboard." },
];

const CAPABILITIES = [
  {
    id:"cap-campaigns", num:"01",
    title:"Campaign Management",
    headline:"Plan, Launch and Manage All Your Campaigns",
    desc:"Create structured marketing campaigns for every business goal — from product launches to seasonal promotions to customer retention campaigns. Manage all campaign information and performance from a centralized workspace.",
    points:["Product launches and special offers","Seasonal promotions","Customer re-engagement","Lead follow-up campaigns","Events and announcements","Customer retention campaigns"],
    visual:[
      {name:"Diwali Sale 2024",     status:"Live",    val:"2,400", rate:"78%", c:"#22C55E"},
      {name:"New Customer Welcome", status:"Running", val:"890",   rate:"65%", c:"#3B82F6"},
      {name:"Re-engagement Nov",    status:"Draft",   val:"1,200", rate:"—",   c:"#F59E0B"},
      {name:"Product Launch",       status:"Paused",  val:"500",   rate:"42%", c:G},
    ],
    visualLabel:"Active Campaigns",
  },
  {
    id:"cap-journeys", num:"02",
    title:"Customer Journeys",
    headline:"Build Marketing Journeys Around Your Customers",
    desc:"Every customer is at a different stage of their relationship with your business. MessBee helps you create structured customer journeys based on customer actions, information and configured business rules.",
    points:["Design journeys based on customer lifecycle stage","Trigger actions based on customer behaviour","Branch journeys based on conditions and rules","Set timing delays between journey steps","Monitor journey performance in real time"],
    flow:["New Lead","Welcome","Follow-Up","Offer","Conversion","Retention"],
  },
  {
    id:"cap-followups", num:"03",
    title:"Automated Follow-Ups",
    headline:"Follow Up Consistently Without Manual Effort",
    desc:"Manual follow-ups break down as your customer base grows. Configured automation helps your team stay consistent — delivering the right message at the right time, every time.",
    points:["New lead follow-up sequences","Enquiry and appointment reminders","Post-purchase communication","Customer re-engagement workflows","Service follow-up messages","Retention sequences"],
    visual:[
      {name:"New Lead Day 1",    status:"Active", val:"1,240", rate:"72%", c:G},
      {name:"Enquiry Reminder",  status:"Active", val:"890",   rate:"61%", c:"#3B82F6"},
      {name:"Post-Purchase D+3", status:"Active", val:"567",   rate:"58%", c:"#F59E0B"},
      {name:"Re-engagement 30d", status:"Active", val:"340",   rate:"44%", c:"#14B8A6"},
    ],
    visualLabel:"Automation Sequences",
  },
  {
    id:"cap-nurturing", num:"04",
    title:"Lead Nurturing",
    headline:"Turn Prospects Into Long-Term Customers",
    desc:"Not every lead is ready to buy immediately. Lead nurturing helps businesses maintain relevant communication with prospects throughout the customer journey so when they are ready, your business is their first choice.",
    points:["Segment leads by readiness and behaviour","Deliver relevant content at each stage","Configure multi-step nurture workflows","Pass ready leads to conversion workflows","Maintain engagement across WhatsApp, SMS and email"],
    flow:["Capture","Engage","Educate","Follow Up","Convert"],
  },
  {
    id:"cap-segmentation", num:"05",
    title:"Audience Segmentation",
    headline:"Send More Relevant Marketing to the Right People",
    desc:"Different customers have different needs and readiness levels. Segmentation lets you send the right message to the right group — rather than the same message to everyone.",
    points:["Customer type and category","Location and region","Interests and product preferences","Lead stage and lifecycle","Previous interactions and purchase activity","Engagement level and recency"],
    visual:[
      {name:"High-Value Customers", status:"Active",  val:"2,140", rate:"High",    c:G},
      {name:"Warm Leads",           status:"Active",  val:"890",   rate:"Medium",  c:"#3B82F6"},
      {name:"Re-engage Window",     status:"Active",  val:"1,200", rate:"Medium",  c:"#F59E0B"},
      {name:"New Subscribers",      status:"Growing", val:"340",   rate:"Building",c:"#14B8A6"},
    ],
    visualLabel:"Audience Segments",
  },
];

const WHY = [
  { icon:"🔁", title:"Reduce Repetitive Work",       desc:"Automate eligible marketing workflows and routine follow-ups so your team focuses on strategy." },
  { icon:"💡", title:"Improve Customer Engagement",  desc:"Create communication based on customer context, lifecycle stage and behaviour." },
  { icon:"🎯", title:"Stay Consistent",              desc:"Maintain structured customer journeys across every campaign and channel." },
  { icon:"📡", title:"Connect Multiple Channels",    desc:"Bring WhatsApp, SMS and email workflows into one connected marketing strategy." },
  { icon:"🌱", title:"Nurture More Leads",           desc:"Maintain relevant engagement with prospects until they are ready to convert." },
  { icon:"📊", title:"Measure Performance",         desc:"Use campaign and engagement insights to understand what is working and optimize." },
  { icon:"📈", title:"Built to Scale",               desc:"Create more structured marketing operations as your customer base grows." },
];

const FAQS = [
  { q:"What is Marketing Automation?",              a:"Marketing automation uses technology and predefined business rules to automate selected marketing activities, customer journeys and follow-ups — so your team can deliver consistent, timely communication without manual effort for every step." },
  { q:"What channels can I use with MessBee?",      a:"Depending on your plan and integrations, MessBee may support WhatsApp Business, SMS and email-based marketing workflows." },
  { q:"Can I automate customer follow-ups?",        a:"Yes. Supported workflows can be configured to automate eligible follow-ups based on business rules and customer information." },
  { q:"Can I create customer segments?",            a:"Yes. Businesses can organize customers and leads into relevant segments using available data and configured criteria for more targeted campaigns." },
  { q:"Can I automate WhatsApp marketing?",         a:"MessBee may support WhatsApp marketing workflows through supported Meta/WhatsApp Business Platform capabilities. All communications must comply with applicable Meta/WhatsApp requirements and customer permissions." },
  { q:"Does MessBee guarantee marketing results?",  a:"No. MessBee provides marketing technology and automation tools but does not guarantee a specific number of leads, sales, conversions or revenue." },
];

const COMPLIANCE = [
  "Applicable Indian laws and regulations","Customer consent and communication preferences",
  "Anti-spam requirements","Meta/WhatsApp policies, where applicable",
  "SMS provider requirements","Email communication requirements",
  "MessBee Acceptable Use Policy","MessBee Anti-Spam Policy",
];

/* ── Shared CSS ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .gbtn  { background:#16A34A;color:#fff;border:none;border-radius:40px;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;box-shadow:0 4px 20px rgba(22,163,74,.3); }
  .gbtn:hover { background:#15803D;transform:translateY(-1px);box-shadow:0 8px 28px rgba(22,163,74,.4); }
  .dbtn  { background:#111827;color:#fff;border:none;border-radius:40px;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;display:inline-flex;align-items:center;gap:8px; }
  .dbtn:hover { background:#1F2937;transform:translateY(-1px); }
  .obtn  { background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:40px;padding:12px 28px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
  .obtn:hover { background:rgba(255,255,255,.18); }
  .mfc  { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .28s; }
  .mfc:hover { border-color:#BBF7D0;transform:translateY(-5px);box-shadow:0 16px 40px rgba(22,163,74,.09); }
  .mwc  { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .25s; }
  .mwc:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .frow { border-bottom:1px solid #F1F5F9; }
  .fq   { display:flex;justify-content:space-between;align-items:center;padding:14px 0;cursor:pointer;gap:16px; }
  .fq:hover .fqt { color:#16A34A; }
  .fqt  { font-size:14px;font-weight:600;transition:color .2s;line-height:1.5; }
  /* Accordion */
  .acc-item { border:1.5px solid #F1F5F9;border-radius:16px;overflow:hidden;transition:border-color .2s;margin-bottom:8px; }
  .acc-item.open { border-color:#BBF7D0; box-shadow:0 8px 32px rgba(22,163,74,.07); }
  .acc-hd { display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;background:#fff;transition:background .2s; }
  .acc-hd:hover { background:#FAFAFA; }
  .acc-body { padding:0 16px 20px;background:#fff; }
  /* Layout */
  .m-hg  { display:flex;flex-wrap:wrap;align-items:flex-start;gap:56px; }
  .m-hl  { flex:1 1 440px;min-width:280px; }
  .m-hr  { flex:1 1 360px;min-width:280px;display:flex;justify-content:center; }
  .m-fg  { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .m-why { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .m-ctr { display:flex;gap:14px;flex-wrap:wrap; }
  .m-stat{ display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .m-in  { display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start; }
  .m-intro { display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start; }
  @media(max-width:1100px){
    .m-fg  { grid-template-columns:repeat(2,1fr)!important; }
    .m-why { grid-template-columns:repeat(2,1fr)!important; }
    .m-in  { grid-template-columns:1fr!important; }
    .m-intro{ grid-template-columns:1fr!important; }
  }
  @media(max-width:860px){
    .m-stat { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:640px){
    .m-fg  { grid-template-columns:1fr!important; }
    .m-why { grid-template-columns:1fr!important; }
    .m-ctr { flex-direction:column!important;align-items:flex-start!important; }
    .m-hr  { display:none!important; }
    .ch-grid { grid-template-columns:1fr!important; }
  }

  /* ── Global responsive section overrides ── */
  @media(max-width:860px){
    .sec-pad { padding-top:60px!important;padding-bottom:60px!important; }
    .fqt { font-size:14px!important; }
    .bubble-wrap { gap:8px!important; }
  }
  @media(max-width:640px){
    /* Hero sections */
    .a-hg,.m-hg,.wa-hg { flex-direction:column!important;gap:24px!important; }
    /* Trust stat bars compact */
    .a-stat,.m-stat,.wa-stat { text-align:center; }
    /* Step cards */
    .step-card { padding:18px 14px!important;border-radius:14px!important; }
    /* Capability caps */
    .wa-cap,.m-in,.a-in { gap:24px!important; }
    /* Remove hover lift on touch */
    .afc:hover,.awc:hover,.mfc:hover,.mwc:hover,.wfc:hover,.wyc:hover { transform:none!important; }
    /* Compliance grid */
    .comp-grid { grid-template-columns:1fr!important; }
    /* Flow strips wrap nicely */
    .flow-strip { justify-content:flex-start!important; }
  }
  @media(max-width:480px){
    .fqt { font-size:13px!important; }
    .step-card { padding:16px 12px!important; }
    .bubble { font-size:12px!important; }
    .acc-hd { padding:12px 14px!important; }
  }
`;

const Check = ({ color = G }) => (
  <div style={{width:20,height:20,borderRadius:"50%",background:color+"18",border:"1.5px solid "+color+"35",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const Pill = ({ children }) => (
  <div style={{display:"inline-block",background:GL,border:"1px solid "+GB,color:G,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",padding:"5px 14px",borderRadius:20,marginBottom:16}}>{children}</div>
);

const FlowStrip = ({ steps }) => (
  <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:0,marginTop:12}}>
    {steps.map((s,i) => (
      <React.Fragment key={s}>
        <span style={{background:GL,border:"1.5px solid "+GB,color:G,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700}}>{s}</span>
        {i < steps.length-1 && <span style={{color:"#94A3B8",fontSize:18,padding:"0 4px"}}>→</span>}
      </React.Fragment>
    ))}
  </div>
);

const VisualPanel = ({ label, items }) => (
  <div style={{background:D,borderRadius:16,padding:22,border:"1px solid rgba(22,163,74,.2)",boxShadow:"0 20px 48px rgba(0,0,0,.2)"}}>
    <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:14}}>{label}</div>
    {items.map((item,i) => (
      <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom: i<items.length-1?"1px solid rgba(255,255,255,.05)":"none"}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:item.c,flexShrink:0}}/>
        <div style={{flex:1,fontSize:13,color:"rgba(255,255,255,.8)",fontWeight:600}}>{item.name}</div>
        <div style={{background:item.c+"20",color:item.c,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:40}}>{item.status}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.4)",minWidth:36,textAlign:"right"}}>{item.val}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",fontWeight:600,minWidth:32,textAlign:"right"}}>{item.rate}</div>
      </div>
    ))}
    <div style={{marginTop:16,padding:"12px 14px",background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.2)",borderRadius:10}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Connected to CRM · Segmentation · Analytics</div>
    </div>
  </div>
);

const MarketingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [openCap, setOpenCap] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";

  return (
    <div style={{fontFamily:"'Inter','Segoe UI',sans-serif",background:"#fff",color:D,overflowX:"hidden"}}>
      <style>{CSS}</style>
      <title>Marketing Automation Software for Businesses | MessBee</title>
      <Navbar />

      {/* ══ HERO — clean white like CRM ══ */}
      <section style={{background:"#fff",padding:"110px 6% 80px",position:"relative",overflow:"hidden"}}>

        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="m-hg">
            {/* Left */}
            <div className="m-hl">
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:GL,border:`1px solid ${GB}`,borderRadius:40,padding:"5px 14px",marginBottom:28}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:G}}/>
                <span style={{fontSize:12,fontWeight:600,color:G}}>MessBee Marketing Automation</span>
              </div>

              <h1 style={{fontSize:"clamp(26px,3.5vw,44px)",fontWeight:900,color:D2,lineHeight:1.08,letterSpacing:"-1.5px",marginBottom:16}}>
                Turn Marketing Activities<br/>Into Automated<br/>
                <span style={{color:G}}>Customer Journeys</span>
              </h1>

              <p style={{fontSize:14,color:MU,lineHeight:1.75,marginBottom:10,maxWidth:520}}>
                Plan, execute and manage customer marketing workflows from one connected platform.
                Instead of manually managing every campaign, follow-up and interaction — automate it.
              </p>
              <p style={{fontSize:13,color:MU,lineHeight:1.7,marginBottom:36,maxWidth:480}}>
                Deliver the right communication at the right stage of the customer lifecycle.
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:40}}>
                {["Plan.","Automate.","Engage.","Measure.","Grow."].map(t => (
                  <span key={t} style={{ background:"#F1F5F9", border:"1px solid #E5E7EB", color:MU, borderRadius:40, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>

              <div className="m-ctr">
                <button id="mkt-hero-start" className="gbtn" onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                <button id="mkt-hero-explore" style={{background:"#fff",border:"1.5px solid #E5E7EB",color:D2,borderRadius:40,padding:"12px 28px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}} onClick={() => document.getElementById("mkt-features")?.scrollIntoView({behavior:"smooth"})}>
                  Explore Marketing Automation →
                </button>
              </div>
            </div>

            {/* Right — marketing funnel panel */}
            <div className="m-hr">
              <div style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:20,padding:24,boxShadow:"0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)",border:"1px solid rgba(34,197,94,.3)",width:"100%",maxWidth:420,transform:"scale(0.75)",transformOrigin:"top right",marginTop:"60px",marginBottom:"-120px"}}>
                <div style={{marginBottom:18,paddingBottom:14,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.85)",marginBottom:3}}>Marketing Automation Hub</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>MessBee · Campaigns + Journeys + Analytics</div>
                </div>

                {/* Channels */}
                <div style={{fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:10}}>Active Channels</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
                  {[{l:"WhatsApp",v:"1,240",c:"#4ADE80"},{l:"Email",v:"3,800",c:"#60A5FA"},{l:"SMS",v:"890",c:"#FCD34D"}].map(ch => (
                    <div key={ch.l} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 8px",border:"1px solid rgba(255,255,255,.06)",textAlign:"center"}}>
                      <div style={{fontSize:16,fontWeight:800,color:ch.c}}>{ch.v}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:2}}>{ch.l}</div>
                    </div>
                  ))}
                </div>

                {/* Funnel */}
                <div style={{fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:12}}>Marketing Funnel</div>
                {[
                  {stage:"Awareness",   val:5200, pct:100, c:"#4ADE80"},
                  {stage:"Engaged",     val:2800, pct:54,  c:"#34D399"},
                  {stage:"Nurtured",    val:1400, pct:27,  c:"#2DD4BF"},
                  {stage:"Opportunity", val:560,  pct:11,  c:"#60A5FA"},
                  {stage:"Converted",   val:210,  pct:4,   c:"#FCD34D"},
                ].map(row => (
                  <div key={row.stage} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{row.stage}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{row.val.toLocaleString()}</span>
                    </div>
                    <div style={{background:"rgba(255,255,255,.06)",borderRadius:4,height:6}}>
                      <div style={{width:row.pct+"%",height:"100%",borderRadius:4,background:row.c}}/>
                    </div>
                  </div>
                ))}

                <div style={{fontSize:10,color:"rgba(255,255,255,.3)",margin:"16px 0 10px",letterSpacing:1.2,textTransform:"uppercase"}}>Running Journeys</div>
                {[
                  {name:"Welcome Series",  stat:"Running", c:"#4ADE80"},
                  {name:"Diwali Campaign", stat:"Live",    c:"#FCD34D"},
                  {name:"Re-engage Q4",    stat:"Active",  c:"#60A5FA"},
                ].map((j,i) => (
                  <div key={j.name} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom: i<2?"1px solid rgba(255,255,255,.04)":"none"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:j.c,flexShrink:0}}/>
                    <div style={{flex:1,fontSize:12,color:"rgba(255,255,255,.7)",fontWeight:600}}>{j.name}</div>
                    <div style={{background:j.c+"20",color:j.c,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:40}}>{j.stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTRO BAND — green tinted ══ */}
      <section style={{background:GL,padding:"64px 6%",borderTop:"1px solid "+GB,borderBottom:"1px solid "+GB}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="m-intro">
            <div>
              <Pill>One Platform for Smarter Marketing</Pill>
              <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",lineHeight:1.2,marginBottom:14}}>
                Marketing is More Than<br/>Just Sending Messages
              </h2>
              <p style={{fontSize:15,color:"#374151",lineHeight:1.8,marginBottom:14}}>
                It is about understanding where a customer is in their journey and communicating with them appropriately.
              </p>
              <p style={{fontSize:15,color:"#374151",lineHeight:1.8}}>
                MessBee brings customer data, campaigns, communication channels and automation into a connected marketing workflow.
              </p>
            </div>
            <div style={{background:"#fff",border:"1px solid "+GB,borderRadius:16,padding:"20px 24px"}}>
              <div style={{fontSize:11,fontWeight:700,color:G,marginBottom:12,textTransform:"uppercase",letterSpacing:1.2}}>Manage Your Marketing Workflow</div>
              {["Campaign Management","Customer Journeys","Automated Follow-ups","Email Marketing","WhatsApp Campaigns","Lead Nurturing","Audience Segmentation","Campaign Analytics"].map((item,i,arr) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom: i<arr.length-1?"1px solid "+GL:"none"}}>
                  <Check/><span style={{fontSize:13,color:"#374151",fontWeight:500}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ FEATURES GRID — white ══ */}
      <section id="mkt-features" style={{background:"#fff",padding:"72px 6% 48px"}}>
        <div style={{maxWidth:1140,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <Pill>Platform Capabilities</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",marginBottom:12}}>
              Everything in MessBee<br/>Marketing Automation
            </h2>
            <p style={{fontSize:14,color:MU,maxWidth:520,margin:"0 auto",lineHeight:1.7}}>
              Campaigns, journeys, automation, multi-channel messaging, nurturing, segmentation and analytics — all connected.
            </p>
          </div>
          <div className="m-fg">
            {FEATURES.map(f => (
              <div key={f.title} className="mfc">
                <div style={{width:32,height:32,borderRadius:8,background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginBottom:10}}>{f.icon}</div>
                <h3 style={{fontSize:13,fontWeight:700,color:D2,marginBottom:4,lineHeight:1.3}}>{f.title}</h3>
                <p style={{fontSize:11,color:MU,lineHeight:1.5}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAPABILITY ACCORDION — green-tinted bg, unique to Marketing page ══ */}
      <section style={{background:BA,padding:"60px 6% 48px",borderTop:"1px solid "+BS}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <Pill>Deep Dive</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              Key Marketing Capabilities
            </h2>
          </div>
          {CAPABILITIES.map((cap,i) => (
            <div key={cap.id} id={cap.id} className={"acc-item"+(openCap===i?" open":"")}>
              <div className="acc-hd" onClick={() => setOpenCap(openCap===i?-1:i)}>
                <div style={{width:28,height:28,borderRadius:6,background:openCap===i?GL:BS,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s"}}>
                  <span style={{fontSize:12,fontWeight:900,color:openCap===i?G:MU}}>{cap.num}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:openCap===i?G:D2,transition:"color .2s"}}>{cap.title}</div>
                  {openCap!==i && <div style={{fontSize:11,color:MU,marginTop:2}}>{cap.headline}</div>}
                </div>
                <div style={{width:24,height:24,borderRadius:6,background:openCap===i?GL:BS,border:openCap===i?"1px solid "+GB:"1px solid "+BS,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0}}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d={openCap===i?"M3 9l4-4 4 4":"M3 5l4 4 4-4"} stroke={openCap===i?G:MU} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {openCap===i && (
                <div className="acc-body">
                  <div className="m-in">
                    <div>
                      <h3 style={{fontSize:"clamp(16px,2vw,24px)",fontWeight:900,color:D2,lineHeight:1.2,letterSpacing:"-0.5px",marginBottom:8}}>{cap.headline}</h3>
                      <p style={{fontSize:13,color:MU,lineHeight:1.8,marginBottom:16}}>{cap.desc}</p>
                      {cap.flow && (
                        <div style={{marginBottom:16}}>
                          <div style={{fontSize:11,color:MU,fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Example Journey</div>
                          <FlowStrip steps={cap.flow}/>
                        </div>
                      )}
                      <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
                        {cap.points.map(pt => (
                          <li key={pt} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"#374151",lineHeight:1.6}}>
                            <Check/>{pt}
                          </li>
                        ))}
                      </ul>
                      <button className="gbtn" id={"mkt-cap-"+i} onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                    </div>
                    <div>
                      {cap.visual
                        ? <VisualPanel label={cap.visualLabel} items={cap.visual}/>
                        : (
                          <div style={{background:D,borderRadius:16,padding:24,border:"1px solid rgba(22,163,74,.2)",boxShadow:"0 20px 48px rgba(0,0,0,.2)"}}>
                            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:16}}>Journey Steps</div>
                            {cap.flow && cap.flow.map((step,si) => (
                              <div key={step} style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom: si<cap.flow.length-1?0:0}}>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,flexShrink:0}}>
                                  <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(22,163,74,.2)",border:"1.5px solid rgba(22,163,74,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#4ADE80"}}>{si+1}</div>
                                  {si<cap.flow.length-1 && <div style={{width:2,height:20,background:"rgba(255,255,255,.06)",margin:"2px 0"}}/>}
                                </div>
                                <div style={{flex:1,paddingBottom: si<cap.flow.length-1?18:0}}>
                                  <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,.85)"}}>{step}</div>
                                  <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Automated step {si+1}</div>
                                </div>
                              </div>
                            ))}
                            <div style={{marginTop:20,padding:"12px 14px",background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.25)",borderRadius:10}}>
                              <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Connected to CRM · Channels · Analytics</div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ MULTI-CHANNEL SECTION ══ */}
      <section style={{background:"#fff",padding:"40px 6%",borderTop:"1px solid "+BS}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <Pill>Multi-Channel</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              WhatsApp · Email
            </h2>
            <p style={{fontSize:15,color:MU,maxWidth:520,margin:"0 auto 40px",lineHeight:1.7}}>Reach customers on the channels they use — from one connected marketing workspace.</p>
          </div>
          <div className="m-ch" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20,maxWidth:800,margin:"0 auto"}}>
            {[
              {icon:"💬",color:"#059669",bg:"#DCFCE7",title:"WhatsApp Marketing",  desc:"Use supported WhatsApp Business Platform capabilities for promotional campaigns, offers, product announcements and re-engagement where permitted.",  note:"Subject to Meta/WhatsApp approval and permissions."},
              {icon:"📧",color:"#3B82F6",bg:"#DBEAFE",title:"Email Marketing",     desc:"Create structured email campaigns for promotions, newsletters, customer updates and re-engagement. Businesses are responsible for customer permissions and applicable email requirements.", note:"Customer permissions required."},
            ].map(ch => (
              <div key={ch.title} className="mfc">
                <div style={{width:32,height:32,borderRadius:8,background:ch.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginBottom:10}}>{ch.icon}</div>
                <h3 style={{fontSize:13,fontWeight:700,color:D2,marginBottom:4}}>{ch.title}</h3>
                <p style={{fontSize:11,color:MU,lineHeight:1.6,marginBottom:10}}>{ch.desc}</p>
                <div style={{background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:6,padding:"6px 10px"}}>
                  <span style={{fontSize:11,color:"#92400E"}}>⚠ {ch.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONNECT FLOW — dark green ══ */}
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
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(22,163,74,.12)", border: "1px solid rgba(22,163,74,.3)", borderRadius: 40, padding: "6px 18px", marginBottom: 20 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: G }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#86EFAC" }}>Connected Platform</span>
              </div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 14 }}>
                Connect Marketing<br /><span style={{ color: "#4ADE80" }}>With Your Entire Business</span>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
                Marketing automation becomes more powerful when connected with CRM, segmentation and analytics — not managed separately.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
                {["CRM", "Segmentation", "Campaign", "Automation", "Engagement", "Analytics"].map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 700, color: "#fff" }}>{item}</div>
                    {i < arr.length - 1 && <div style={{ color: G, fontSize: 20, padding: "0 6px", fontWeight: 900 }}>→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE ══ */}
      <section style={{background:"#fff",padding:"60px 6% 72px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Pill>Why MessBee</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              Why Businesses Choose MessBee<br/>Marketing Automation
            </h2>
          </div>
          <div className="m-why">
            {WHY.map(w => (
              <div key={w.title} className="mwc">
                <div style={{width:32,height:32,borderRadius:8,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginBottom:10}}>{w.icon}</div>
                <h3 style={{fontSize:13,fontWeight:700,color:D2,marginBottom:4}}>{w.title}</h3>
                <p style={{fontSize:11,color:MU,lineHeight:1.5}}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUILT FOR INDIA — green-tinted ══ */}
      <section style={{background:GL,padding:"72px 6%",borderTop:"1px solid "+GB,borderBottom:"1px solid "+GB}}>
        <div style={{maxWidth:860,margin:"0 auto",textAlign:"center"}}>
          <Pill>India First</Pill>
          <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",marginBottom:16}}>
            Built for Indian Businesses
          </h2>
          <p style={{fontSize:15,color:"#374151",lineHeight:1.8,maxWidth:640,margin:"0 auto 40px"}}>
            MessBee Marketing Automation helps Indian businesses move from manual marketing to organized, measurable and scalable customer journeys across WhatsApp, SMS and email.
          </p>
          <div style={{background:"#fff",border:"1.5px solid "+GB,borderRadius:16,padding:"16px 32px",display:"inline-flex",flexWrap:"wrap",alignItems:"center",gap:0,justifyContent:"center",marginBottom:32}}>
            {["Attract","Engage","Nurture","Convert","Retain"].map((step,i,arr) => (
              <React.Fragment key={step}>
                <span style={{background:GL,border:"1.5px solid "+GB,color:G,borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700}}>{step}</span>
                {i<arr.length-1 && <span style={{color:"#94A3B8",fontSize:16,padding:"0 6px"}}>→</span>}
              </React.Fragment>
            ))}
          </div><br/>
          <button id="mkt-india-start" className="gbtn" onClick={() => window.open(adminUrl+"/signup","_blank")}>
            Start Automating Your Marketing
          </button>
        </div>
      </section>

      {/* ══ COMPLIANCE ══ */}
      <section style={{background:"#fff",padding:"64px 6%"}}>
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <div style={{background:BA,border:"1.5px solid "+BS,borderRadius:16,padding:"20px 24px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:16}}>
              <div style={{fontSize:22}}>⚖️</div>
              <div>
                <h3 style={{fontSize:14,fontWeight:800,color:D2,marginBottom:4}}>Responsible Marketing & Compliance</h3>
                <p style={{fontSize:12,color:MU,lineHeight:1.6}}>
                  MessBee is designed for responsible business communication. Businesses are responsible for ensuring their campaigns comply with:
                </p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:8,marginBottom:16}}>
              {COMPLIANCE.map((item,i) => (
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,color:"#374151",lineHeight:1.6}}>
                  <Check/>{item}
                </div>
              ))}
            </div>
            <div style={{background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:8,padding:"10px 14px"}}>
              <p style={{fontSize:11,color:"#92400E",lineHeight:1.6,margin:0}}>
                <strong>Important:</strong> MessBee does not authorize businesses to send unsolicited or unlawful communications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{background:BA,padding:"60px 6%",borderTop:"1px solid "+BS}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Pill>FAQ</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              Frequently Asked Questions
            </h2>
          </div>
          {FAQS.map((faq,i) => (
            <div key={i} className="frow">
              <div id={"mkt-faq-"+i} className="fq" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span className="fqt" style={{color:openFaq===i?G:D2}}>{faq.q}</span>
                <div style={{width:28,height:28,borderRadius:8,background:openFaq===i?GL:BS,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s",color:openFaq===i?G:MU,border:openFaq===i?"1px solid "+GB:"1px solid transparent"}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d={openFaq===i?"M3 9l4-4 4 4":"M3 5l4 4 4-4"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {openFaq===i && <div style={{fontSize:13,color:MU,lineHeight:1.8,paddingBottom:16}}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section style={{background:GL,padding:"90px 6%",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,background:"rgba(22,163,74,.08)",borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:640,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:`1px solid ${GB}`,borderRadius:40,padding:"4px 14px",marginBottom:20}}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
            <span style={{fontSize:12,fontWeight:600,color:G}}>Get Started Today</span>
          </div>
          <h2 style={{fontSize:"clamp(22px,3.5vw,40px)",fontWeight:900,color:D2,letterSpacing:"-1px",lineHeight:1.1,marginBottom:14}}>
            Ready to Automate Your<br/>
            <span style={{color:G}}>Customer Journeys?</span>
          </h2>
          <p style={{fontSize:13,color:MU,lineHeight:1.7,maxWidth:480,margin:"0 auto 32px"}}>
            Join thousands of businesses using MessBee to plan, launch and automate marketing campaigns across WhatsApp and email.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button id="mkt-cta-final" className="gbtn" style={{fontSize:13,padding:"10px 20px"}} onClick={() => window.open(adminUrl+"/signup","_blank")}>Start Automating Your Marketing</button>
            <button id="mkt-cta-sales" style={{background:"#fff",color:D2,border:`1.5px solid ${GB}`,borderRadius:40,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}} onClick={() => navigate("/contact#contact-form-section")} onMouseOver={(e) => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }}>Contact Support</button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketingPage;
