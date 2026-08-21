import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";

/* ── Project palette ── */
const G   = "#16A34A";
const GL  = "#F0FDF4";
const GB  = "#BBF7D0";
const GD  = "#15803D";
const D   = "#0F172A";
const D2  = "#111827";
const MU  = "#64748B";
const BA  = "#F8FAFC";
const BS  = "#F1F5F9";

const FEATURES = [
  { icon:"🤖", color:G,         bg:GL,        title:"AI Business Assistant",      desc:"AI-assisted capabilities that help your team handle routine business tasks, answer common questions and assist with customer enquiries more efficiently." },
  { icon:"💬", color:"#0EA5E9", bg:"#E0F2FE", title:"AI Chatbot",                 desc:"Create conversational AI experiences that help customers get answers to common questions around the clock — even when your team is offline." },
  { icon:"🎧", color:"#14B8A6", bg:"#CCFBF1", title:"Automated Customer Support", desc:"Let automation handle repetitive customer interactions while your team focuses on issues that genuinely need human attention and judgment." },
  { icon:"🌱", color:"#F59E0B", bg:"#FEF3C7", title:"AI Lead Assistance",         desc:"AI-assisted workflows that help your team organize and understand incoming leads — with lead qualification, follow-up suggestions and priority signals." },
  { icon:"⚡", color:"#EC4899", bg:"#FCE7F3", title:"Workflow Automation",        desc:"Connect triggers, conditions and actions into structured workflows that run automatically — from lead capture to customer notification to team alert." },
  { icon:"✍️", color:"#6366F1", bg:"#E0E7FF", title:"Smart Responses",            desc:"AI-generated and suggested responses based on available business context — helping your team draft replies faster and more consistently." },
  { icon:"🎯", color:G,         bg:GL,        title:"AI Customer Engagement",     desc:"Combine AI with customer data and communication workflows to create more contextual, personalized interactions at scale." },
];

const STEPS = [
  {
    num:"01", id:"ai-assistant",
    title:"AI Business Assistant",
    headline:"Your Intelligent Business Assistant",
    color:G, bg:GL, border:GB,
    desc:"Use AI-assisted capabilities to help your team handle routine business tasks and customer interactions more efficiently. The actual capabilities depend on your configuration, integrations and subscription plan.",
    points:["Answering common questions","Finding relevant business information","Assisting with customer enquiries","Drafting responses","Summarizing information","Supporting internal workflows"],
    visual:[
      {q:"What are your store hours?",   a:"Our store is open Mon-Sat 10am to 8pm and Sunday 11am to 6pm."},
      {q:"Do you offer bulk discounts?", a:"Yes! We offer bulk purchase options. I can connect you with our sales team."},
      {q:"How can I check my order status?", a:"Your order status and real-time delivery tracking link are sent directly on WhatsApp."},
    ],
  },
  {
    num:"02", id:"ai-chatbot",
    title:"AI Chatbot",
    headline:"Engage Customers Around the Clock",
    color:G, bg:GL, border:GB,
    desc:"Create AI-assisted conversational experiences that can help customers get answers to common questions, qualify leads and guide them to the right next step — even when your team is offline.",
    points:["Frequently asked questions","Product or service information","Basic customer enquiries","Lead qualification","Customer guidance","Initial support"],
    flow:["Customer Question","AI Chatbot","Automated Response","Human Handover"],
  },
  {
    num:"03", id:"ai-support",
    title:"Automated Customer Support",
    headline:"Resolve Routine Questions Faster",
    color:G, bg:GL, border:GB,
    desc:"Let automation handle repetitive customer interactions so your team can focus on complex issues that require human expertise. Where required, conversations are routed to an authorized team member.",
    points:["Handle repetitive support queries automatically","Route complex queries to team members","Reduce average response time","Maintain consistent support quality","Track support interactions in CRM","Create structured support workflows"],
    flow:["Customer Question","AI Response","Automated Action","Human Support"],
  },
  {
    num:"04", id:"ai-leads",
    title:"AI Lead Assistance",
    headline:"Help Your Team Prioritize Opportunities",
    color:G, bg:GL, border:GB,
    desc:"AI-assisted workflows that help businesses organize and understand incoming leads. AI outputs should be reviewed where business decisions require human judgment.",
    points:["Lead information and context","Initial customer enquiries","Lead qualification workflows","Follow-up suggestions","Customer intent signals","Lead prioritization"],
    visual:[
      {name:"Rahul Mehra",    tag:"Hot Lead",   c:"#22C55E"},
      {name:"Priya Sharma",   tag:"Warm",       c:"#F59E0B"},
      {name:"Amit Patel",     tag:"Nurture",    c:"#3B82F6"},
      {name:"Sneha Gupta",    tag:"New Lead",   c:"#14B8A6"},
    ],
  },
  {
    num:"05", id:"ai-workflow",
    title:"Workflow Automation",
    headline:"Automate the Work That Happens Every Day",
    color:G, bg:GL, border:GB,
    desc:"Connect triggers, conditions and actions into structured workflows that run automatically — reducing manual effort and keeping your business moving even outside business hours.",
    points:["Lead management","Customer follow-ups","Notifications","Marketing workflows","Support workflows","Order-related communication","Internal business processes"],
    flow:["New Lead","CRM Record","Customer Message","Follow-Up","Team Notification"],
  },
  {
    num:"06", id:"ai-responses",
    title:"Smart Responses",
    headline:"Respond Faster With AI Assistance",
    color:G, bg:GL, border:GB,
    desc:"AI can help generate or suggest responses based on available business context. Users should review AI-generated responses before sending them when accuracy or business impact is important.",
    points:["Draft customer replies","Answer common questions","Improve response consistency","Reduce repetitive writing","Assist customer-support teams"],
    visual:[
      {label:"Original enquiry",  text:"Hi, I want to know the return policy for my order"},
      {label:"AI Suggested Reply", text:"Hello! Items can be returned or exchanged within 7 days of delivery. Would you like me to initiate the return process for you?"},
    ],
  },
  {
    num:"07", id:"ai-engagement",
    title:"AI Customer Engagement",
    headline:"Create More Relevant Customer Experiences",
    color:G, bg:GL, border:GB,
    desc:"Combine AI with your customer data and communication workflows to create more contextual interactions. Maintain control over your communication processes while AI assists with personalization.",
    points:["Connect customer data with AI assistance","Create contextual communication workflows","Improve engagement across channels","Build personalized customer journeys","Connect AI with CRM, WhatsApp and email","Measure engagement and performance"],
    flow:["Customer Data","AI Assistance","Communication","Automation","Analytics"],
  },
];

const ECOSYSTEM = [
  {icon:"👥",title:"CRM",         desc:"Understand customer and lead context."},
  {icon:"💬",title:"WhatsApp",    desc:"Support eligible customer conversations and workflows."},
  {icon:"📣",title:"Marketing",   desc:"Assist with customer journeys and follow-ups."},
  {icon:"🛍️",title:"Digital Store",desc:"Support eligible product and customer workflows."},
  {icon:"📊",title:"Analytics",   desc:"Use available business information to understand activity."},
];

const WHY = [
  {icon:"🔁",title:"Reduce Repetitive Work",     desc:"Automate routine tasks and workflows so your team spends time where it matters."},
  {icon:"⚡",title:"Respond Faster",             desc:"Use AI assistance for common customer interactions, 24/7."},
  {icon:"👥",title:"Improve Team Productivity",  desc:"Let teams focus on tasks that require human judgment and expertise."},
  {icon:"🔗",title:"Connect Business Workflows", desc:"Bring AI, CRM, communication and automation together in one platform."},
  {icon:"📈",title:"Scale Operations",           desc:"Build repeatable workflows as your business and customer base grow."},
  {icon:"🧠",title:"Keep Humans in Control",     desc:"AI is designed to assist — not replace responsible business decision-making."},
];

const FAQS = [
  {q:"What is MessBee AI & Automation?",         a:"MessBee AI & Automation combines AI-assisted capabilities with configurable business automation to help businesses reduce repetitive work and manage customer and operational workflows more efficiently."},
  {q:"Can AI answer customer questions?",         a:"Yes, supported AI chatbot and customer-support workflows can assist with common customer questions based on the information and configuration provided by the business."},
  {q:"Can I automate my business workflows?",     a:"Yes. MessBee can support configurable workflows involving triggers, conditions and actions across supported business functions."},
  {q:"Can AI help with leads?",                   a:"AI-assisted features may help with lead enquiries, qualification workflows, response assistance and other supported lead-management activities."},
  {q:"Does MessBee AI make decisions for my business?", a:"MessBee provides AI-assisted tools. Businesses remain responsible for reviewing outputs and making appropriate business decisions."},
  {q:"Is AI content always accurate?",            a:"No. AI-generated output can contain errors. Important information should be reviewed before it is relied upon or communicated to customers."},
  {q:"Can AI work with MessBee CRM?",             a:"Supported AI capabilities may use relevant CRM information and workflows, subject to configuration, permissions, subscription features and applicable data-protection requirements."},
];

const RESPONSIBLE_AI = [
  "Incomplete","Inaccurate","Outdated","Misinterpreted","Unsuitable for a particular situation",
];

/* ── CSS ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .gbtn { background:#16A34A;color:#fff;border:none;border-radius:40px;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;box-shadow:0 4px 20px rgba(22,163,74,.3); }
  .gbtn:hover { background:#15803D;transform:translateY(-1px);box-shadow:0 8px 28px rgba(22,163,74,.4); }
  .gbtn2 { background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:40px;padding:12px 28px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
  .gbtn2:hover { background:rgba(255,255,255,.18); }
  .dbtn { background:#fff;color:#111827;border:1.5px solid #F1F5F9;border-radius:40px;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s; }
  .dbtn:hover { border-color:#BBF7D0;background:#F0FDF4; }
  .afc { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .28s; }
  .afc:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .awc { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:16px 14px;transition:all .25s; }
  .awc:hover { border-color:#BBF7D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.08); }
  .frow { border-bottom:1px solid #F1F5F9; }
  .fq   { display:flex;justify-content:space-between;align-items:center;padding:20px 0;cursor:pointer;gap:16px; }
  .fq:hover .fqt { color:#16A34A; }
  .fqt  { font-size:15px;font-weight:600;transition:color .2s;line-height:1.5; }
  /* Step sidebar layout — unique to AI page */
  .step-wrap { display:flex;gap:0; }
  .step-nav  { width:180px;flex-shrink:0;position:sticky;top:80px;align-self:flex-start; }
  .step-body { flex:1;min-width:0; }
  .step-btn  { display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;cursor:pointer;transition:all .2s;margin-bottom:3px;border:none;background:transparent;width:100%;text-align:left; }
  .step-btn:hover { background:#F0FDF4; }
  .step-btn.act { background:#F0FDF4;border:1px solid #BBF7D0; }
  .step-card { background:#fff;border:1.5px solid #F1F5F9;border-radius:16px;padding:24px 22px; }
  /* Grids */
  .a-hg  { display:flex;flex-wrap:wrap;align-items:flex-start;gap:56px; }
  .a-hl  { flex:1 1 440px;min-width:280px; }
  .a-hr  { flex:1 1 360px;min-width:280px;display:flex;justify-content:center; }
  .a-fg  { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
  .a-why { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
  .a-ctr { display:flex;gap:14px;flex-wrap:wrap; }
  .a-stat{ display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
  .a-in  { display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start; }
  .eco-g { display:grid;grid-template-columns:repeat(5,1fr);gap:12px; }
  @media(max-width:1100px){
    .a-fg    { grid-template-columns:repeat(2,1fr)!important; }
    .step-wrap{ flex-direction:column!important; }
    .step-nav { width:100%!important;position:static!important;padding-right:0!important;display:flex;flex-wrap:wrap;gap:4px;margin-bottom:20px; }
    .step-btn { flex:1 1 auto;min-width:120px; }
    .a-in    { grid-template-columns:1fr!important; }
    .eco-g   { grid-template-columns:repeat(3,1fr)!important; }
    .a-why   { grid-template-columns:repeat(2,1fr)!important; }
    .a-hg    { gap:32px!important; }
  }
  @media(max-width:860px){
    .a-stat  { grid-template-columns:repeat(2,1fr)!important; }
    .eco-g   { grid-template-columns:repeat(2,1fr)!important; }
    .step-card{ padding:24px 18px!important; }
    .a-fg    { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:640px){
    .a-fg    { grid-template-columns:1fr!important; }
    .a-why   { grid-template-columns:1fr!important; }
    .a-ctr   { display:flex!important; flex-direction:row!important; align-items:center!important; gap:10px!important; flex-wrap:wrap!important; }
    .gbtn,.dbtn,.gbtn2 { width:auto!important; padding:10px 18px!important; font-size:12px!important; text-align:center!important; justify-content:center!important; }
    .a-hr    { width:100%!important; justify-content:center!important; padding-top:24px!important; margin-bottom:0!important; }
    .a-hr > div { transform:none!important; transform-origin:top center!important; margin:0 auto!important; width:100%!important; max-width:100%!important; padding:20px 14px!important; box-sizing:border-box!important; margin-top:0!important; }
    .ai-vis-wrap { margin-bottom:0!important; margin-top:20px!important; width:100%!important; }
    .ai-vis-card { transform:none!important; transform-origin:top center!important; height:auto!important; width:100%!important; max-width:100%!important; margin:0 auto!important; box-sizing:border-box!important; }
    .eco-g   { grid-template-columns:1fr!important; }
    .step-nav{ flex-direction:column!important; }
    .step-btn{ min-width:100%!important; }
    .step-card{ padding:20px 14px!important; }
    .a-stat  { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:480px){
    .a-stat  { grid-template-columns:1fr!important; }
    .eco-g   { grid-template-columns:1fr!important; }
    .a-why   { grid-template-columns:1fr!important; }
    .a-fg    { grid-template-columns:1fr!important; }
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

const Check = ({color=G}) => (
  <div style={{width:20,height:20,borderRadius:"50%",background:color+"18",border:"1.5px solid "+color+"35",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const Pill = ({children,color=G,bg=GL,border=GB}) => (
  <div style={{display:"inline-block",background:bg,border:"1px solid "+border,color,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",padding:"5px 14px",borderRadius:20,marginBottom:16}}>{children}</div>
);

const FlowStrip = ({steps,color=G,bg=GL,border=GB}) => (
  <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"8px 3px",marginTop:8}}>
    {steps.map((s,i) => (
      <React.Fragment key={s}>
        <span style={{background:bg,border:"1.5px solid "+border,color,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,display:"inline-block"}}>{s}</span>
        {i<steps.length-1 && <span style={{color:"#94A3B8",fontSize:13,padding:"0 3px"}}>→</span>}
      </React.Fragment>
    ))}
  </div>
);

const AiPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => { window.scrollTo(0,0); },[]);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";
  const step = STEPS[activeStep];

  return (
    <div style={{fontFamily:"'Inter','Segoe UI',sans-serif",background:"#fff",color:D,overflowX:"hidden"}}>
      <style>{CSS}</style>
      <title>AI & Business Automation Platform | MessBee</title>
      <Navbar/>

      {/* ══ HERO ══ */}
      <section style={{background:"#fff",padding:"118px 6% 20px",position:"relative",overflow:"hidden"}}>


        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="a-hg">
            {/* Left */}
            <div className="a-hl">
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.25)",borderRadius:40,padding:"5px 14px",marginBottom:28}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:G}}/>
                <span style={{fontSize:12,fontWeight:600,color:G}}>MessBee AI & Automation</span>
              </div>

              <h1 style={{fontSize:"clamp(28px,3vw,42px)",fontWeight:900,color:D2,lineHeight:1.08,letterSpacing:"-1px",marginBottom:20}}>
                Make Your Business<br/>Smarter With<br/>
                <span style={{color:G}}>AI-Powered Automation</span>
              </h1>

              <p style={{fontSize:14,color:MU,lineHeight:1.75,marginBottom:10,maxWidth:520}}>
                Automate repetitive tasks, assist customer interactions and create smarter business workflows using AI and configurable automation — all in one connected environment.
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:40}}>
                {["Think Smarter.","Automate Better.","Grow Faster."].map(t => (
                  <span key={t} style={{ background:"#F1F5F9", border:"1px solid #E5E7EB", color:MU, borderRadius:40, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>

              <div className="a-ctr">
                <button id="ai-hero-start" className="gbtn" onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                <button id="ai-hero-explore" style={{ background:"#fff", color:D2, border:`1.5px solid ${GB}`, borderRadius:40, padding:"10px 24px", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }} onClick={() => document.getElementById("ai-features")?.scrollIntoView({behavior:"smooth"})}>
                  Explore More →
                </button>
              </div>
            </div>

            {/* Right — AI workflow visualization */}
            <div className="a-hr">
              <div style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:24,padding:28,boxShadow:"0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)",border:"1px solid rgba(34,197,94,.2)",width:"100%",maxWidth:460,transform:"scale(0.75)",transformOrigin:"top center",marginTop:"72px",overflow:"hidden"}}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", padding:4 }}>
                      <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius:6 }} />
                    </div>
                    <div>
                      <div style={{ fontSize:17, fontWeight:800, color:"#fff", letterSpacing:"-0.3px" }}>AI & Automation Hub</div>
                      <div style={{ fontSize:11, fontWeight:700, color:"#34D399" }}>Intelligent Workflows</div>
                    </div>
                  </div>
                  <div style={{ background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.4)", borderRadius:20, padding:"6px 12px", color:"#34D399", fontSize:11, fontWeight:700 }}>
                    AI Active
                  </div>
                </div>

                {/* Grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                  {[
                    { icon: "🤖", title: "AI Chatbots", sub: "24/7 Support" },
                    { icon: "⚡", title: "Smart Replies", sub: "Instant Responses" },
                    { icon: "🔄", title: "Auto-Routing", sub: "Smart Handoffs" },
                    { icon: "📊", title: "AI Insights", sub: "Customer Sentiment" }
                  ].map(card => (
                    <div key={card.title} style={{ background:"rgba(16,185,129,0.09)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:14, padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                        <span style={{ fontSize:16 }}>{card.icon}</span>
                        <span style={{ fontSize:13, fontWeight:800, color:"#fff", letterSpacing:"-0.2px" }}>{card.title}</span>
                      </div>
                      <div style={{ fontSize:11, fontWeight:700, color:"#34D399" }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom Banner */}
                <div style={{ background:"rgba(16,185,129,0.09)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:12, padding:"14px", textAlign:"center" }}>
                  <div style={{ fontSize:12, fontWeight:800, color:"#34D399" }}>Save Time. Reduce Effort. Scale Smarter.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTRO BAND — white ══ */}
      <section style={{background:"#fff",padding:"24px 6%",borderBottom:"1px solid "+BS}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="a-intro" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
            <div>
              <Pill>AI That Works With Your Business</Pill>
              <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",lineHeight:1.2,marginBottom:14}}>
                AI Should Not Be Separate<br/>From Your Business
              </h2>
              <p style={{fontSize:15,color:MU,lineHeight:1.8,marginBottom:14}}>
                MessBee connects AI-assisted capabilities with your CRM, customer communication, marketing and automation workflows — helping your team reduce repetitive work and focus on higher-value activities.
              </p>
            </div>
            <div style={{background:GL,border:"1.5px solid "+GB,borderRadius:16,padding:"18px 22px"}}>
              <div style={{fontSize:11,fontWeight:700,color:G,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>What You Can Do With MessBee AI</div>
              {["AI Business Assistant","AI Chatbot","Automated Customer Support","AI Lead Assistance","Workflow Automation","Smart Responses","AI-Powered Customer Engagement"].map((item,i,arr) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom: i<arr.length-1?"1px solid "+GB:"none"}}>
                  <Check/><span style={{fontSize:13,color:"#374151",fontWeight:500}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ FEATURES GRID — soft bg ══ */}
      <section id="ai-features" style={{background:BA,padding:"20px 6%"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <Pill>Platform Capabilities</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",marginBottom:12}}>
              Everything in MessBee<br/>AI & Automation
            </h2>
          </div>
          <div className="a-fg">
            {FEATURES.map(f => (
              <div key={f.title} className="afc">
                <div style={{width:28,height:28,borderRadius:7,background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginBottom:8}}>{f.icon}</div>
                <h3 style={{fontSize:12,fontWeight:700,color:D2,marginBottom:4,lineHeight:1.3}}>{f.title}</h3>
                <p style={{fontSize:11,color:MU,lineHeight:1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STEP-BASED CAPABILITY DEEP-DIVE ══ */}
      <section style={{background:"#fff",padding:"60px 6%",borderTop:"1px solid "+BS}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <Pill>Deep Dive</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              AI & Automation Capabilities
            </h2>
          </div>
          <div className="step-wrap">
            {/* Left nav */}
            <div className="step-nav" style={{paddingRight:24}}>
              {STEPS.map((s,i) => (
                <button key={s.id} id={"ai-step-"+i} className={"step-btn"+(activeStep===i?" act":"")}
                  onClick={() => setActiveStep(i)}
                  style={{borderColor: activeStep===i ? GB : "transparent"}}>
                  <div style={{width:26,height:26,borderRadius:7,background:activeStep===i?s.bg:BS,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:activeStep===i?s.color:MU,flexShrink:0,transition:"all .2s"}}>{s.num}</div>
                  <span style={{fontSize:12,fontWeight:activeStep===i?700:500,color:activeStep===i?s.color:MU,transition:"all .2s",lineHeight:1.3}}>{s.title}</span>
                </button>
              ))}
            </div>

            {/* Right content */}
            <div className="step-body">
              <div className="step-card" key={step.id} style={{borderColor:step.border}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:step.bg,border:"1px solid "+step.border,borderRadius:40,padding:"3px 10px",marginBottom:14}}>
                  <span style={{fontSize:11,fontWeight:800,color:step.color}}>{step.num}</span>
                  <span style={{fontSize:11,fontWeight:600,color:step.color}}>{step.title}</span>
                </div>
                <h3 style={{fontSize:"clamp(14px,1.5vw,20px)",fontWeight:900,color:D2,lineHeight:1.2,letterSpacing:"-0.5px",marginBottom:10}}>{step.headline}</h3>
                <p style={{fontSize:13,color:MU,lineHeight:1.7,marginBottom:16}}>{step.desc}</p>

                <div className="a-in">
                  <div>
                    {step.flow && (
                      <div style={{marginBottom:14}}>
                        <div style={{fontSize:11,color:MU,fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Workflow</div>
                        <FlowStrip steps={step.flow} color={step.color} bg={step.bg} border={step.border}/>
                      </div>
                    )}
                    <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:7,marginBottom:18}}>
                      {step.points.map(pt => (
                        <li key={pt} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"#374151",lineHeight:1.6}}>
                          <Check color={step.color}/>{pt}
                        </li>
                      ))}
                    </ul>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <button className="gbtn" id={"ai-cap-start-"+activeStep} onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                    </div>
                  </div>

                  {/* Visual panel varies by step type */}
                  <div className="ai-vis-wrap" style={{ marginBottom: -74 }}>
                    {step.visual && step.visual[0]?.q && (
                      /* AI chat Q&A visual */
                      <div className="ai-vis-card" style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:16,padding:22,border:"1px solid rgba(34,197,94,.3)",boxShadow:"0 20px 48px rgba(0,0,0,.25)",transform:"scale(0.82)",transformOrigin:"top right",height:410,display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:14}}>Live AI Responses</div>
                        {step.visual.map((item,i) => (
                          <div key={i} style={{marginBottom:14}}>
                            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:4}}>Q: {item.q}</div>
                            <div style={{background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.2)",borderRadius:8,padding:"8px 12px",fontSize:13,color:"rgba(255,255,255,.85)"}}>🤖 {item.a}</div>
                          </div>
                        ))}
                        <div style={{marginTop:"auto",padding:"10px 12px",background:"rgba(22,163,74,.08)",border:"1px solid rgba(22,163,74,.2)",borderRadius:8}}>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Connected to CRM · Inventory · Order Data</div>
                        </div>
                      </div>
                    )}
                    {step.visual && step.visual[0]?.tag && (
                      /* Lead scoring visual */
                      <div className="ai-vis-card" style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:16,padding:22,border:"1px solid rgba(34,197,94,.3)",boxShadow:"0 20px 48px rgba(0,0,0,.25)",transform:"scale(0.82)",transformOrigin:"top right",height:410,display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:14}}>AI Lead Categorization</div>
                        {step.visual.map((lead,i) => (
                          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom: i<step.visual.length-1?"1px solid rgba(255,255,255,.05)":"none"}}>
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <div style={{width:32,height:32,borderRadius:"50%",background:lead.c+"25",color:lead.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{lead.name[0]}</div>
                              <div style={{fontSize:13,color:"rgba(255,255,255,.9)",fontWeight:600}}>{lead.name}</div>
                            </div>
                            <div style={{background:lead.c+"20",color:lead.c,fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:40}}>{lead.tag}</div>
                          </div>
                        ))}
                        <div style={{marginTop:"auto",padding:"10px 12px",background:"rgba(22,163,74,.08)",border:"1px solid rgba(22,163,74,.2)",borderRadius:8}}>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Categorized by intent & context · Review before action</div>
                        </div>
                      </div>
                    )}
                    {step.visual && step.visual[0]?.label && (
                      /* Smart response visual */
                      <div className="ai-vis-card" style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:16,padding:22,border:"1px solid rgba(34,197,94,.3)",boxShadow:"0 20px 48px rgba(0,0,0,.25)",transform:"scale(0.82)",transformOrigin:"top right",height:410,display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:14}}>Smart Response Draft</div>
                        {step.visual.map((item,i) => (
                          <div key={i} style={{marginBottom:14}}>
                            <div style={{fontSize:10,color:"rgba(255,255,255,.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{item.label}</div>
                            <div style={{background: i===0?"rgba(255,255,255,.05)":"rgba(22,163,74,.1)",border:"1px solid "+(i===0?"rgba(255,255,255,.07)":"rgba(22,163,74,.25)"),borderRadius:10,padding:"10px 14px",fontSize:13,color:"rgba(255,255,255,.8)",lineHeight:1.6}}>
                              {i===1 && <span style={{fontSize:11,color:"rgba(22,163,74,.8)",fontWeight:700,display:"block",marginBottom:4}}>🤖 AI Suggested</span>}
                              {item.text}
                            </div>
                          </div>
                        ))}
                        <div style={{marginTop:"auto",padding:"8px 12px",background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",borderRadius:8}}>
                          <div style={{fontSize:11,color:"rgba(245,158,11,.8)"}}>⚠ Always review before sending to customers</div>
                        </div>
                      </div>
                    )}
                    {!step.visual && step.flow && (
                      /* Flow journey visual */
                      <div className="ai-vis-card" style={{background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)",borderRadius:16,padding:22,border:"1px solid rgba(34,197,94,.3)",boxShadow:"0 20px 48px rgba(0,0,0,.25)",transform:"scale(0.82)",transformOrigin:"top right",height:410,display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:16}}>Automation Flow</div>
                        {step.flow.map((s,si) => (
                          <div key={s} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(22,163,74,.2)",border:"1.5px solid rgba(22,163,74,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#4ADE80"}}>{si+1}</div>
                              {si<step.flow.length-1 && <div style={{width:2,height:20,background:"rgba(255,255,255,.06)",margin:"2px 0"}}/>}
                            </div>
                            <div style={{flex:1,paddingBottom: si<step.flow.length-1?18:0}}>
                              <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,.85)"}}>{s}</div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Step {si+1}</div>
                            </div>
                          </div>
                        ))}
                        <div style={{marginTop:"auto",padding:"10px 12px",background:"rgba(22,163,74,.1)",border:"1px solid rgba(22,163,74,.2)",borderRadius:8}}>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Automated · No manual trigger needed</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ECOSYSTEM ══ */}
      <section style={{background:GL,padding:"48px 6%",borderTop:"1px solid "+GB,borderBottom:"1px solid "+GB}}>
        <div style={{maxWidth:1060,margin:"0 auto",textAlign:"center"}}>
          <Pill>Connected Ecosystem</Pill>
          <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",marginBottom:10}}>
            Connect AI With Your MessBee Ecosystem
          </h2>
          <p style={{fontSize:13,color:MU,lineHeight:1.7,maxWidth:480,margin:"0 auto 28px"}}>
            AI becomes more useful when it works with the rest of your business — not as a standalone tool.
          </p>
          <div className="eco-g">
            {ECOSYSTEM.map(e => (
              <div key={e.title} style={{background:"#fff",border:"1.5px solid "+GB,borderRadius:14,padding:"14px 12px",textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:7}}>{e.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:D2,marginBottom:4}}>{e.title}</div>
                <div style={{fontSize:11,color:MU,lineHeight:1.5}}>{e.desc}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:24,display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:0}}>
            {["Customer Data","AI Assistance","Communication","Automation","Analytics"].map((item,i,arr) => (
              <React.Fragment key={item}>
                <span style={{background:"#fff",border:"1.5px solid "+GB,color:GD,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700}}>{item}</span>
                {i<arr.length-1 && <span style={{color:"#94A3B8",fontSize:13,padding:"0 3px"}}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE ══ */}
      <section style={{background:"#fff",padding:"60px 6%"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <Pill>Why MessBee</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              Why Businesses Choose MessBee<br/>AI & Automation
            </h2>
          </div>
          <div className="a-why">
            {WHY.map(w => (
              <div key={w.title} className="awc">
                <div style={{width:32,height:32,borderRadius:8,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,marginBottom:8}}>{w.icon}</div>
                <h3 style={{fontSize:13,fontWeight:700,color:D2,marginBottom:4}}>{w.title}</h3>
                <p style={{fontSize:11,color:MU,lineHeight:1.6}}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUILT FOR INDIA ══ */}
      <section style={{background:GL,padding:"60px 6%",textAlign:"center",borderTop:"1px solid "+GB,borderBottom:"1px solid "+GB}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid "+GB,borderRadius:40,padding:"4px 14px",marginBottom:16}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:G}}/>
            <span style={{fontSize:12,fontWeight:600,color:G}}>India First</span>
          </div>
          <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px",marginBottom:14}}>
            Built for Indian Businesses
          </h2>
          <p style={{fontSize:13,color:MU,lineHeight:1.7,maxWidth:580,margin:"0 auto 28px"}}>
            Indian businesses manage customer enquiries, follow-ups, orders, marketing and support across multiple channels. MessBee AI & Automation helps bring these into a more connected, efficient digital workflow.
          </p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:"8px 10px",marginBottom:28}}>
            {["Understand","Assist","Automate","Engage","Improve"].map((step,i,arr) => (
              <div key={step} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{background:"#fff",border:"1.5px solid "+GB,color:G,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700}}>{step}</span>
                {i<arr.length-1 && <span style={{color:"#94A3B8",fontSize:13,padding:"0 3px"}}>→</span>}
              </div>
            ))}
          </div>
          <button id="ai-india-start" className="gbtn" style={{fontSize:13,padding:"10px 20px"}} onClick={() => window.open(adminUrl+"/signup","_blank")}>
            Get Started
          </button>
        </div>
      </section>


      {/* ══ RESPONSIBLE AI — soft bg ══ */}
      <section style={{background:BA,padding:"44px 6%"}}>
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <div className="a-resp" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{background:"#fff",border:"1.5px solid "+BS,borderRadius:14,padding:"18px 20px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}>
                <div style={{fontSize:18}}>🧠</div>
                <div>
                  <h3 style={{fontSize:13,fontWeight:800,color:D2,marginBottom:4}}>Responsible AI</h3>
                  <p style={{fontSize:12,color:MU,lineHeight:1.6}}>AI-generated outputs may sometimes be:</p>
                </div>
              </div>
              {RESPONSIBLE_AI.map((item,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom: i<RESPONSIBLE_AI.length-1?"1px solid "+BS:"none",fontSize:12,color:"#374151"}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#F59E0B",flexShrink:0}}/>
                  {item}
                </div>
              ))}
              <div style={{marginTop:10,padding:"8px 10px",background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:7}}>
                <div style={{fontSize:11,color:"#92400E"}}>Always review AI outputs before relying on them for important decisions.</div>
              </div>
            </div>
            <div style={{background:"#fff",border:"1.5px solid "+BS,borderRadius:14,padding:"18px 20px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}>
                <div style={{fontSize:18}}>🔒</div>
                <div>
                  <h3 style={{fontSize:13,fontWeight:800,color:D2,marginBottom:4}}>Privacy & Data</h3>
                  <p style={{fontSize:12,color:MU,lineHeight:1.6}}>AI features may process information provided through MessBee workflows.</p>
                </div>
              </div>
              <div style={{fontSize:12,color:MU,lineHeight:1.7,marginBottom:10}}>
                Businesses are responsible for ensuring they have the appropriate rights, permissions and lawful basis to provide personal data to MessBee for processing.
              </div>
              <div style={{padding:"8px 10px",background:GL,border:"1px solid "+GB,borderRadius:7}}>
                <div style={{fontSize:11,color:GD}}>Governed by MessBee Privacy Policy and applicable Data Processing Agreement (DPA).</div>
              </div>
              <div style={{marginTop:8,padding:"8px 10px",background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:7}}>
                <div style={{fontSize:11,color:"#92400E"}}>MessBee AI is not a substitute for qualified legal, medical, financial or professional advice.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{background:BA,padding:"60px 6%"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <Pill>FAQ</Pill>
            <h2 style={{fontSize:"clamp(20px,2.5vw,32px)",fontWeight:900,color:D2,letterSpacing:"-1px"}}>
              Frequently Asked Questions
            </h2>
          </div>
          {FAQS.map((faq,i) => (
            <div key={i} className="frow">
              <div id={"ai-faq-"+i} className="fq" onClick={() => setOpenFaq(openFaq===i?null:i)}>
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

      {/* ══ CTA ══ */}
      <section style={{background:GL,padding:"72px 6%",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,background:"rgba(22,163,74,.08)",borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:600,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid "+GB,borderRadius:40,padding:"4px 14px",marginBottom:20}}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill={G}><circle cx="5" cy="5" r="5"/></svg>
            <span style={{fontSize:12,fontWeight:600,color:G}}>Get Started Today</span>
          </div>
          <h2 style={{fontSize:"clamp(22px,3.5vw,40px)",fontWeight:900,color:D2,letterSpacing:"-1px",lineHeight:1.1,marginBottom:12}}>
            Ready to Make Your Business<br/>
            <span style={{color:G}}>Smarter With AI?</span>
          </h2>
          <p style={{fontSize:14,color:MU,lineHeight:1.7,maxWidth:480,margin:"0 auto 32px"}}>
            Join thousands of businesses using MessBee AI & Automation to reduce manual work, respond faster and create smarter customer workflows.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button id="ai-cta-final" className="gbtn" style={{fontSize:13,padding:"11px 26px"}} onClick={() => window.open(adminUrl+"/signup","_blank")}>
              Get Started
            </button>
            <button id="ai-cta-sales" className="dbtn" style={{fontSize:13,padding:"11px 26px"}} onClick={() => navigate("/contact#contact-form-section")}>Contact Support</button>
          </div>

        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AiPage;
