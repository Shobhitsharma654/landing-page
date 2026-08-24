import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";

/* ── WhatsApp page has its own distinct design language ── */
const WA   = "#25D366";    // WhatsApp brand green
const WAD  = "#128C7E";    // WhatsApp dark green
const WAL  = "#DCF8C6";    // WhatsApp light green (bubble color)
const D    = "#0F172A";
const D2   = "#111827";
const MU   = "#64748B";
const G    = "#16A34A";    // MessBee green (for buttons)
const GL   = "#F0FDF4";    // Light green background
const GB   = "#BBF7D0";    // Light green border

const FEATURES = [
  { icon:"💬", color:WA,       bg:WAL,       title:"WhatsApp Messaging",      desc:"Use supported WhatsApp Business Platform capabilities to send notifications, updates and engage customers at every stage of their journey." },
  { icon:"📥", color:"#3B82F6", bg:"#DBEAFE", title:"Business Inbox",          desc:"All incoming WhatsApp conversations in one organized team workspace — assign, track, respond and follow up without missing anything." },
  { icon:"📋", color:"#8B5CF6", bg:"#EDE9FE", title:"Message Templates",       desc:"Create pre-approved message templates for order updates, appointment reminders, payment notifications and business alerts." },
  { icon:"📣", color:"#F59E0B", bg:"#FEF3C7", title:"WhatsApp Campaigns",      desc:"Send targeted, permission-based WhatsApp campaigns for product launches, offers, re-engagement and seasonal communication." },
  { icon:"⚡", color:"#14B8A6", bg:"#CCFBF1", title:"Automation",              desc:"Automate follow-ups, reminders, notifications and customer journey steps so your team focuses on conversations that matter." },
  { icon:"🛍️", color:"#F97316", bg:"#FFEDD5", title:"WhatsApp Commerce",       desc:"Where supported, connect WhatsApp conversations with product discovery, enquiries, orders and commerce workflows." },
  { icon:"🔗", color:"#6366F1", bg:"#E0E7FF", title:"CRM Integration",         desc:"Every WhatsApp conversation automatically links to the customer's CRM profile — full context before every reply." },
  { icon:"🛡️", color:WA,       bg:WAL,       title:"Compliance-Focused",      desc:"Built around Meta/WhatsApp Business Platform requirements, anti-spam rules and responsible Indian business messaging practices." },
];

const CAPABILITIES = [
  {
    id:"wa-inbox", num:"01",
    title:"Business Inbox",
    headline:"All Your Customer Conversations, One Place",
    desc:"Stop switching between personal WhatsApp chats and business conversations. MessBee gives your team a dedicated business inbox where every customer conversation is tracked, assigned and manageable.",
    points:["View all incoming WhatsApp conversations in one view","Assign conversations to team members with clear ownership","Track conversation status — Open, Pending, Resolved","Respond with full customer context from linked CRM profiles","Manage follow-ups so no customer is left waiting"],
    chat:[
      {from:"customer",msg:"Hi, I'd like to place a bulk order for 500 units",time:"10:32 AM"},
      {from:"agent",   msg:"Hi Priya! Happy to help with your bulk order. Let me pull up your account details right away.",time:"10:33 AM"},
      {from:"system",  msg:"📋 Customer Profile Loaded — Priya Sharma · Regular Customer · 3 Previous Orders",time:""},
      {from:"customer",msg:"Great! Can I also get a volume discount?",time:"10:34 AM"},
    ]
  },
  {
    id:"wa-templates", num:"02",
    title:"Message Templates",
    headline:"Send Pre-Approved Business Messages at Scale",
    desc:"WhatsApp requires approved message templates for initiating business conversations. MessBee helps you create, manage and send compliant message templates across your customer base.",
    points:["Order confirmations and shipping updates","Appointment reminders and service notifications","Payment confirmation and invoice messages","Abandoned cart and re-engagement messages","Customer support follow-up messages"],
    chat:[
      {from:"template",msg:"[Template] Order Shipped — Hi [name], your order #[order_id] has been shipped and will arrive by [date]. Track here: [link]",time:""},
      {from:"agent",   msg:"Sending to 1,240 customers...",time:"2:00 PM"},
      {from:"system",  msg:"✅ Delivered: 1,198 · Read: 934 · Replied: 287",time:"2:01 PM"},
    ]
  },
  {
    id:"wa-campaigns", num:"03",
    title:"WhatsApp Campaigns",
    headline:"Reach the Right Customers With Relevant Messages",
    desc:"Organize targeted WhatsApp campaigns using segmented customer lists. Only send messages to customers who have given the required consent — and watch engagement rates soar compared to email or SMS.",
    points:["Segment customers before sending — location, purchase history, tags","Schedule campaigns for optimal delivery times","Track delivery, read and reply rates in real-time","Set up automated follow-up sequences","Campaigns stay within Meta/WhatsApp messaging limits"],
    chat:[
      {from:"system",  msg:"Campaign: Diwali Offer 2024 — Target: 2,400 opted-in customers",time:""},
      {from:"template",msg:"[Campaign] Hi Rahul, our Diwali sale is live! Get 20% off everything today only. Shop now → messbee.in/sale",time:"9:00 AM"},
      {from:"customer",msg:"Great timing! Just added 3 items to my cart 🛒",time:"9:05 AM"},
      {from:"system",  msg:"📊 Open rate: 78% · Reply rate: 24% · Sales: ₹1.8L",time:""},
    ]
  },
  {
    id:"wa-automation", num:"04",
    title:"WhatsApp Automation",
    headline:"Automate Without Losing the Personal Touch",
    desc:"Connect WhatsApp with your business workflows to automate routine communication — so your team spends less time on repetitive messages and more time on conversations that need a human touch.",
    points:["Auto-reply to common enquiries 24/7","Trigger messages based on customer actions or CRM events","Lead follow-up sequences — Day 1, Day 3, Day 7","Appointment reminders with two-tap confirmation","Order status updates sent automatically on fulfilment"],
    chat:[
      {from:"customer",msg:"What are your store timings?",time:"11:47 PM"},
      {from:"agent",   msg:"🤖 Hi! Our store is open Mon–Sat, 10am–8pm. You can also order online 24/7 at messbee.in",time:"11:47 PM"},
      {from:"customer",msg:"Thanks! I'll place my order tomorrow morning.",time:"11:48 PM"},
      {from:"system",  msg:"⏰ Follow-up scheduled: Tomorrow 10:00 AM",time:""},
    ]
  },
];

const WHY = [
  { icon:"📱", color:WA,       title:"WhatsApp-Native",        desc:"Purpose-built for WhatsApp Business Platform — not an afterthought." },
  { icon:"👥", color:"#3B82F6", title:"Team Inbox",             desc:"Multiple agents, one shared workspace. No conversations get missed." },
  { icon:"🔗", color:"#8B5CF6", title:"CRM Connected",          desc:"Every chat links to a customer profile. Your team always has context." },
  { icon:"⚡", color:"#F59E0B", title:"Automation Ready",       desc:"Set up workflows once. Let automation handle the routine." },
  { icon:"📊", color:"#EC4899", title:"Campaign Analytics",     desc:"Track delivery, open and reply rates for every campaign." },
  { icon:"🛡️", color:WAD,      title:"Compliance Built-In",    desc:"Follows Meta/WhatsApp policies and Indian messaging regulations." },
];

const FAQS = [
  { q:"What is MessBee WhatsApp Business?",          a:"MessBee WhatsApp Business is a business communication solution that helps organizations manage supported WhatsApp customer conversations, send approved message templates, run campaigns and automate workflows — all connected to MessBee CRM." },
  { q:"Can multiple team members use the same WhatsApp number?", a:"Yes. MessBee's shared inbox allows multiple authorized team members to view, respond to and manage conversations from the same WhatsApp Business account, with conversation assignment and tracking built in." },
  { q:"Can I send WhatsApp marketing messages?",     a:"Businesses may send eligible marketing communications where permitted and where the required customer permissions and applicable WhatsApp/Meta requirements are satisfied." },
  { q:"Can I send bulk WhatsApp messages?",          a:"MessBee may support campaign-based messaging, subject to applicable plan limits, Meta/WhatsApp requirements, customer permissions and anti-spam rules. MessBee should not be used as an unrestricted bulk-message platform." },
  { q:"Can WhatsApp connect with MessBee CRM?",      a:"Yes. Supported WhatsApp conversations can be linked to customer CRM profiles, giving your team full context — conversation history, lead status, past orders — before every reply." },
  { q:"Are WhatsApp message templates guaranteed to be approved?", a:"No. Template approval is controlled by Meta/WhatsApp systems and policies. MessBee helps you create compliant templates but cannot guarantee approval." },
  { q:"Does MessBee control WhatsApp account restrictions?", a:"No. Meta independently controls WhatsApp Business Platform account eligibility, messaging limits, restrictions and enforcement." },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  /* ── PAGE-WIDE TYPOGRAPHY OVERRIDES (font-size & weight only — no color changes) ── */
  .wa-page-wrapper { font-family: 'Inter', 'Segoe UI', sans-serif !important; }
  .wa-page-wrapper h1,
  .wa-page-wrapper h2 { font-size: clamp(20px, 2.5vw, 32px) !important; font-weight: 900 !important; letter-spacing: -0.5px !important; }
  .wa-page-wrapper h3,
  .wa-page-wrapper h4 { font-size: 12px !important; font-weight: 800 !important; }
  .wa-page-wrapper p { font-size: 12px !important; font-weight: 400 !important; line-height: 1.7 !important; }
  .wa-page-wrapper .fqt { font-size: 14.5px !important; font-weight: 700 !important; }
  .wa-page-wrapper .wa-faq-answer { font-size: 12px !important; line-height: 1.8 !important; }
  .wa-page-wrapper .wbp { font-size: 12.5px !important; font-weight: 700 !important; padding: 8px 18px !important; }
  .wa-page-wrapper .wbd { font-size: 12.5px !important; font-weight: 600 !important; padding: 10px 20px !important; }

  /* Buttons */
  .wbp  { background:#16A34A;color:#fff;border:none;border-radius:40px;padding:10px 24px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;box-shadow:0 4px 18px rgba(22,163,74,.3); }
  .wbp:hover { background:#15803D;transform:translateY(-1px);box-shadow:0 6px 24px rgba(22,163,74,.4); }
  .wbd  { background:#111827;color:#fff;border:none;border-radius:40px;padding:10px 24px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;display:inline-flex;align-items:center;gap:8px; }
  .wbd:hover  { background:#1F2937;transform:translateY(-1px); }
  .wbo  { background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:40px;padding:10px 24px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
  .wbo:hover  { background:rgba(255,255,255,.18); }

  /* Cards */
  .wfc  { background:#fff;border:1.5px solid #F1F5F9;border-radius:12px;padding:12px;transition:all .28s; }
  .wfc:hover { border-color:#A7F3D0;transform:translateY(-5px);box-shadow:0 16px 40px rgba(37,211,102,.1); }
  .wyc  { background:#fff;border:1.5px solid #F1F5F9;border-radius:12px;padding:12px;transition:all .25s; }
  .wyc:hover { border-color:#A7F3D0;transform:translateY(-4px);box-shadow:0 12px 32px rgba(37,211,102,.08); }

  /* Chat bubble styles */
  .bubble-wrap { display:flex;flex-direction:column;gap:10px; }
  .bubble { max-width:80%;border-radius:12px;padding:10px 14px;font-size:13px;line-height:1.55;position:relative; }
  .bubble.customer { background:#fff;border:1px solid #E5E7EB;color:#111827;align-self:flex-start;border-bottom-left-radius:3px; }
  .bubble.agent    { background:#DCF8C6;color:#111827;align-self:flex-end;border-bottom-right-radius:3px; }
  .bubble.system   { background:#F0FDF4;border:1px solid #BBF7D0;color:#16A34A;font-size:11px;font-weight:600;align-self:center;text-align:center;border-radius:8px;max-width:95%; }
  .bubble.template { background:#FEF3C7;border:1px solid #FDE68A;color:#92400E;align-self:flex-start;border-bottom-left-radius:3px;white-space:pre-line; }
  .bubble-time { font-size:10px;color:#94A3B8;margin-top:3px; }

  /* FAQ */
  .frow { border-bottom:1px solid #F1F5F9; }
  .fq   { display:flex;justify-content:space-between;align-items:center;padding:16px 0;cursor:pointer;gap:12px; }
  .fq:hover .fqt { color:#25D366; }
  .fqt  { font-size:13px;font-weight:600;transition:color .2s;line-height:1.5; }

  /* Layout grids */
  .wa-hg   { display:flex;flex-wrap:wrap;align-items:center;gap:48px; }
  .wa-hl   { flex:1 1 420px;min-width:280px; }
  .wa-hr   { flex:1 1 340px;min-width:280px;display:flex;justify-content:center; }
  .wa-fg   { display:grid;grid-template-columns:repeat(4,1fr);gap:20px; }
  .wa-cap  { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center; }
  .wa-cap.rev { direction:rtl; }
  .wa-cap.rev > * { direction:ltr; }
  .wa-why  { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
  .wa-ctr  { display:flex;gap:14px;flex-wrap:wrap; }
  .wa-stat { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }

  @media(max-width:1100px){
    .wa-fg   { grid-template-columns:repeat(2,1fr)!important; }
    .wa-cap  { grid-template-columns:1fr!important; }
    .wa-cap.rev{ direction:ltr!important; }
    .wa-why  { grid-template-columns:repeat(2,1fr)!important; }
    .wa-hg   { gap:32px!important; }
    .wa-tabs { gap:6px!important; }
  }
  @media(max-width:860px){
    .wa-stat { grid-template-columns:repeat(2,1fr)!important; }
    .wa-fg   { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:640px){
    .wa-fg   { grid-template-columns:1fr!important; }
    .wa-why  { grid-template-columns:repeat(2,1fr)!important; gap:10px!important; }
    .wyc     { padding:12px 10px!important; border-radius:10px!important; }
    .wa-ctr  { display:flex!important; flex-direction:row!important; align-items:center!important; gap:10px!important; flex-wrap:wrap!important; }
    .wbp,.wbo,.wbd { width:auto!important; padding:10px 18px!important; font-size:12px!important; text-align:center!important; justify-content:center!important; }
    .wa-hr   { width:100%!important; justify-content:center!important; padding-top:24px!important; margin-bottom:0!important; }
    .wa-hr > div { transform:none!important; transform-origin:top center!important; margin:0 auto!important; width:100%!important; max-width:100%!important; padding:20px 14px!important; box-sizing:border-box!important; }
    .wa-stat { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media(max-width:480px){
    .wa-hr > div { padding:18px 12px!important; border-radius:18px!important; }
    .wa-stat { grid-template-columns:1fr!important; }
    .wa-fg   { grid-template-columns:1fr!important; }
    .wa-why  { grid-template-columns:repeat(2,1fr)!important; gap:8px!important; }
    .wyc     { padding:10px 8px!important; border-radius:8px!important; }
  }

  /* Flow Grid Desktop & Mobile */
  .wa-flow-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 6px;
  }
  .wa-flow-badge {
    background: #FFFFFF;
    border: 1.5px solid #BBF7D0;
    color: #15803D;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
    display: inline-block;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .wa-flow-arrow {
    color: #4ADE80;
    font-size: 13px;
    font-weight: 700;
    padding: 0 2px;
  }

  @media(max-width:860px){
    .wa-connect-section {
      padding: 28px 16px !important;
    }
    .wa-connect-card {
      padding: 20px 14px !important;
      border-radius: 18px !important;
    }
  }

  @media(max-width:768px){
    .wa-india-journey {
      padding: 16px 12px !important;
      gap: 8px !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .wa-india-journey span:nth-child(even) {
      display: none !important;
    }
    .wa-india-journey span:nth-child(odd) {
      width: 100% !important;
      text-align: center !important;
      box-sizing: border-box !important;
      padding: 8px 6px !important;
      font-size: 12px !important;
    }
  }

  @media(max-width:480px){
    .wa-connect-section {
      padding: 20px 10px !important;
    }
    .wa-connect-card {
      padding: 16px 10px !important;
      border-radius: 16px !important;
    }
    .wa-flow-grid {
      gap: 8px 4px !important;
    }
    .wa-flow-badge {
      padding: 4px 8px !important;
      font-size: 10.5px !important;
      border-radius: 6px !important;
    }
    .wa-flow-arrow {
      font-size: 12px !important;
      padding: 0 1px !important;
    }
  }
`;

/* ── Chat UI component ── */
function ChatMock({ messages }) {
  return (
    <div style={{ background:"#ECE5DD", borderRadius:12, padding:8, display:"flex", flexDirection:"column", gap:0 }}>
      {/* WhatsApp-style header */}
      <div style={{ background:"#128C7E", borderRadius:"10px 10px 0 0", padding:"4px 8px", display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
        <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
        </div>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:"#fff" }}>MessBee Business</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,.7)" }}>WhatsApp Business · Online</div>
        </div>
      </div>
      {messages.map((m,i) => (
        <div key={i} style={{ alignSelf: m.from==="customer"?"flex-start": m.from==="system"?"center":"flex-end", background: m.from==="system"?"rgba(22,163,74,.1)":m.from==="customer"?"#fff":"#dcf8c6", padding:"4px 8px", borderRadius: m.from==="customer"?"0 8px 8px 8px":m.from==="system"?"6px":"8px 0 8px 8px", maxWidth:"90%", marginBottom:4, position:"relative", boxShadow: m.from==="system"?"none":"0 1px 2px rgba(0,0,0,.05)", border: m.from==="system"?"1px solid rgba(22,163,74,.2)":"none" }}>
          {m.from==="system" && <span style={{ marginRight:4, fontSize:9 }}>✅</span>}
          <span style={{ fontSize:9, color: m.from==="system"?"#16A34A":"#1E293B", lineHeight:1.3, fontWeight:m.from==="system"?600:400 }}>{m.msg}</span>
          {m.time && <div style={{ fontSize:7, color:"#94A3B8", textAlign:"right", marginTop:2 }}>{m.time}</div>}
        </div>
      ))}
    </div>
  );
}

const WaPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";

  return (
    <div className="wa-page-wrapper" style={{ fontFamily:"'Inter','Segoe UI',sans-serif", background:"#fff", color:D, overflowX:"hidden" }}>
      <style>{CSS}</style>
      <title>WhatsApp Business Platform for Businesses | MessBee</title>
      <Navbar />

      {/* ══ HERO — Plain White ══ */}
      <section style={{ background:"#fff", padding:"92px 6% 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div className="wa-hg">
            {/* Left */}
            <div className="wa-hl">
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:GL, border:`1px solid ${GB}`, borderRadius:40, padding:"5px 14px", marginBottom:16 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:WA }}/>
                <span style={{ fontSize:12, fontWeight:600, color:G }}>MessBee WhatsApp Business</span>
              </div>

              <h1 style={{ fontSize:"clamp(28px,3vw,42px)", fontWeight:900, color:D2, lineHeight:1.08, letterSpacing:"-1px", marginBottom:16 }}>
                Connect With Customers<br/>
                on <span style={{ color:G }}>WhatsApp</span><br/>
                The Smarter Way
              </h1>

              <p style={{ fontSize:15, color:MU, lineHeight:1.75, marginBottom:10, maxWidth:520 }}>
                Manage customer conversations, send approved business messages, follow up on leads
                and build real relationships — all through the WhatsApp Business Platform.
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
                {["Connect.","Communicate.","Automate.","Grow."].map(t => (
                  <span key={t} style={{ background:"#F1F5F9", border:"1px solid #E5E7EB", color:MU, borderRadius:40, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>

              <div className="wa-ctr">
                <button id="wa-hero-start" className="wbp" onClick={() => window.open(adminUrl+"/signup","_blank")}>
                  Get Started
                </button>
                <button id="wa-hero-explore" style={{ background:"#fff", color:D2, border:`1.5px solid ${GB}`, borderRadius:40, padding:"10px 24px", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor=G; e.currentTarget.style.color=G; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }} onClick={() => document.getElementById("wa-features")?.scrollIntoView({behavior:"smooth"})}>
                  Explore More →
                </button>
              </div>


            </div>

            <div className="wa-hr" style={{ paddingTop: "20px", marginBottom: "-120px" }}>
              <div style={{ background:"linear-gradient(135deg, #14532d 0%, #022c22 100%)", borderRadius:24, padding:28, boxShadow:"0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)", border:"1px solid rgba(34,197,94,.2)", width:"100%", maxWidth:460, transform:"scale(0.75)", transformOrigin:"top center", overflow:"hidden" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", padding:4 }}>
                      <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius:6 }} />
                    </div>
                    <div>
                      <div style={{ fontSize:17, fontWeight:800, color:"#fff", letterSpacing:"-0.3px" }}>WhatsApp Business</div>
                      <div style={{ fontSize:11, fontWeight:700, color:"#34D399" }}>Conversational Commerce</div>
                    </div>
                  </div>
                  <div style={{ background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.4)", borderRadius:20, padding:"6px 12px", color:"#34D399", fontSize:11, fontWeight:700 }}>
                    Official API
                  </div>
                </div>

                {/* Grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
                  {[
                    { icon: "💬", title: "Chat Automations", sub: "Smart Replies" },
                    { icon: "📢", title: "Broadcasts", sub: "Bulk Messaging" },
                    { icon: "📥", title: "Shared Inbox", sub: "Team Collaboration" },
                    { icon: "📊", title: "Analytics", sub: "Performance Tracking" }
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
                  <div style={{ fontSize:12, fontWeight:800, color:"#34D399" }}>Engage Customers. Drive Sales. Scale Support.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ══ FEATURE OVERVIEW GRID ══ */}
      <section id="wa-features" style={{ background:"#fff", padding:"20px 6% 40px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ display:"inline-block", background:WAL, border:"1px solid #A7F3D0", color:WAD, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:14 }}>Platform Capabilities</div>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:12 }}>
              Everything in MessBee<br/>WhatsApp Business
            </h2>
            <p style={{ fontSize:15, color:MU, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
              A complete WhatsApp Business toolkit — conversations, templates, campaigns, automation and CRM, all in one place.
            </p>
          </div>
          <div className="wa-fg">
            {FEATURES.map(f => (
              <div key={f.title} className="wfc">
                <div style={{ width:24, height:24, borderRadius:6, background:f.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, marginBottom:8 }}>{f.icon}</div>
                <h3 style={{ fontSize:12, fontWeight:700, color:D2, marginBottom:6, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.55 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEEP-DIVE CAPABILITIES — tabs + chat UI (completely different from CRM) ══ */}
      <section style={{ background:"#F7FFF7", padding:"60px 6%", borderTop:"1px solid #D1FAE5" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"inline-block", background:WAL, border:"1px solid #A7F3D0", color:WAD, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:14 }}>Deep Dive</div>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              See It In Action
            </h2>
          </div>

          {/* Tab buttons */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center", marginBottom:40 }}>
            {CAPABILITIES.map((cap,i) => (
              <button key={cap.id} id={"wa-tab-"+i}
                onClick={() => setActiveTab(i)}
                style={{ background: activeTab===i ? WA : "#fff", color: activeTab===i ? "#fff" : MU, border: activeTab===i ? "none" : "1px solid #E5E7EB", borderRadius:40, padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", boxShadow: activeTab===i ? "0 4px 16px rgba(37,211,102,.35)" : "none" }}>
                {cap.title}
              </button>
            ))}
          </div>

          {/* Active capability */}
          {CAPABILITIES.map((cap,i) => i === activeTab && (
            <div key={cap.id} className="wa-cap">
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:WAL, border:"1px solid #A7F3D0", borderRadius:40, padding:"3px 10px", marginBottom:16 }}>
                  <span style={{ fontSize:11, fontWeight:800, color:WAD }}>{cap.num}</span>
                  <span style={{ fontSize:10, fontWeight:600, color:WAD }}>{cap.title}</span>
                </div>
                <h3 style={{ fontSize:"clamp(18px,2.5vw,28px)", fontWeight:900, color:D2, lineHeight:1.2, letterSpacing:"-1px", marginBottom:12 }}>{cap.headline}</h3>
                <p style={{ fontSize:13, color:MU, lineHeight:1.7, marginBottom:20 }}>{cap.desc}</p>
                <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                  {cap.points.map(pt => (
                    <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:12, color:"#374151", lineHeight:1.6 }}>
                      <div style={{ width:16, height:16, borderRadius:"50%", background:WAL, border:"1px solid #A7F3D0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={WA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="wa-ctr">
                  <button className="wbp" id={"wa-cap-start-"+i} onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
                </div>
              </div>

              {/* Chat demo instead of dark panel */}
              <div>
                <div style={{ fontSize:11, color:MU, fontWeight:600, letterSpacing:1.2, textTransform:"uppercase", marginBottom:10 }}>Live Example</div>
                <ChatMock messages={cap.chat}/>
                <div style={{ background:"#fff", border:"1px solid #D1FAE5", borderRadius:12, padding:"14px 16px", marginTop:24 }}>
                  <div style={{ fontSize:11, color:WAD, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>Connected to</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["CRM","Automation","Analytics"].map(tag => (
                      <span key={tag} style={{ background:WAL, border:"1px solid #A7F3D0", color:WAD, borderRadius:40, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONNECT FLOW — darker green ══ */}
      <section className="wa-connect-section" style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="wa-connect-card"
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
              <div style={{ display: "inline-block", background: "rgba(37,211,102,.15)", border: "1px solid rgba(37,211,102,.35)", color: WAL, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>Connected Platform</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 14 }}>
                WhatsApp + CRM + Automation<br />
                <span style={{ color: WA }}>All in One Workflow</span>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
                WhatsApp is most powerful when it's connected to your customer data and business workflows — not siloed as a standalone messaging app.
              </p>
              <div className="wa-flow-grid" style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px 6px" }}>
                {["WhatsApp", "CRM", "Automation", "Marketing", "Commerce", "Analytics"].map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <span className="wa-flow-badge">{item}</span>
                    {i < arr.length - 1 && <span className="wa-flow-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE — plain white ══ */}
      <section style={{ background:"#fff", padding:"90px 6%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ display:"inline-block", background:WAL, border:"1px solid #A7F3D0", color:WAD, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:14 }}>Why MessBee</div>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Why Businesses Choose MessBee<br/>WhatsApp Business
            </h2>
          </div>
          <div className="wa-why">
            {WHY.map(w => (
              <div key={w.title} className="wyc">
                <div style={{ width:24, height:24, borderRadius:6, background:w.color+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, marginBottom:8 }}>{w.icon}</div>
                <h3 style={{ fontSize:12, fontWeight:700, color:D2, marginBottom:6 }}>{w.title}</h3>
                <p style={{ fontSize:11, color:MU, lineHeight:1.55 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUILT FOR INDIA — wa tinted ══ */}
      <section style={{ background:"#F0FFF4", padding:"72px 6%", borderTop:"1px solid #A7F3D0", borderBottom:"1px solid #A7F3D0" }}>
        <div style={{ maxWidth:880, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:WAL, border:"1px solid #A7F3D0", color:WAD, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:16 }}>India First</div>
          <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px", marginBottom:16 }}>
            Built for Indian Businesses
          </h2>
          <p style={{ fontSize:15, color:MU, lineHeight:1.8, maxWidth:640, margin:"0 auto 40px" }}>
            WhatsApp is India's most used communication app. MessBee helps local retailers, service businesses, e-commerce stores and growing companies use WhatsApp as part of a professional, scalable digital business — not just a personal chat app.
          </p>
          {/* Journey */}
          <div className="wa-india-journey" style={{ background:"#fff", border:"1.5px solid #A7F3D0", borderRadius:16, padding:"24px 28px", display:"inline-flex", flexWrap:"wrap", alignItems:"center", gap:4, justifyContent:"center", marginBottom:32 }}>
            {["Connect","Engage","Follow Up","Convert","Support","Retain"].map((step,i,arr) => (
              <React.Fragment key={step}>
                <span style={{ background:WAL, border:"1.5px solid #A7F3D0", color:WAD, borderRadius:8, padding:"7px 16px", fontSize:13, fontWeight:700 }}>{step}</span>
                {i < arr.length-1 && <span style={{ color:"#94A3B8", fontSize:18 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <br/>
          <button id="wa-india-start" className="wbp" onClick={() => window.open(adminUrl+"/signup","_blank")}>
            Start with MessBee
          </button>
        </div>
      </section>

      {/* ══ COMPLIANCE ══ */}
      <section style={{ background:"#fff", padding:"64px 6% 16px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <div style={{ background:"#F8FAFC", border:"1px solid #E5E7EB", borderRadius:16, padding:"24px 28px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
              <div style={{ fontSize:24 }}>🛡️</div>
              <div>
                <h3 style={{ fontSize:13, fontWeight:800, color:D2, marginBottom:6 }}>Meta & WhatsApp Compliance</h3>
                <p style={{ fontSize:12, color:MU, lineHeight:1.7 }}>
                  Your use of WhatsApp functionality through MessBee is subject to applicable Meta Terms, WhatsApp Business Platform Terms, WhatsApp Business Messaging Policies, WhatsApp Commerce Policies, MessBee policies and applicable Indian laws.
                </p>
              </div>
            </div>
            <div style={{ background:"#FEF3C7", border:"1px solid #FDE68A", borderRadius:10, padding:"12px 16px" }}>
              <p style={{ fontSize:11, color:"#92400E", lineHeight:1.7, margin:0 }}>
                <strong>Important:</strong> MessBee does not support spam, unsolicited messaging or deceptive practices. Availability, messaging limits, template approval, pricing and account status may be determined by Meta independently of MessBee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background:"#FFF", padding:"16px 6% 90px" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ display:"inline-block", background:WAL, border:"1px solid #A7F3D0", color:WAD, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:14 }}>FAQ</div>
            <h2 style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:900, color:D2, letterSpacing:"-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>
          {FAQS.map((faq,i) => (
            <div key={i} className="frow">
              <div id={"wa-faq-"+i} className="fq" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span className="fqt" style={{ color:openFaq===i?WA:D2 }}>{faq.q}</span>
                <div style={{ width:20, height:20, borderRadius:6, background:openFaq===i?WAL:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", color:openFaq===i?WA:MU, border:openFaq===i?"1px solid #A7F3D0":"1px solid transparent" }}>
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path d={openFaq===i?"M3 9l4-4 4 4":"M3 5l4 4 4-4"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {openFaq===i && <div className="wa-faq-answer" style={{ fontSize:12, color:MU, lineHeight:1.8, paddingBottom:16 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section style={{ background:GL, padding:"90px 6%", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, background:"rgba(37,211,102,.08)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:640, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:`1px solid ${GB}`, borderRadius:40, padding:"4px 14px", marginBottom:20 }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill={WA}><circle cx="5" cy="5" r="5"/></svg>
            <span style={{ fontSize:12, fontWeight:600, color:WA }}>Get Started Today</span>
          </div>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,40px)", fontWeight:900, color:D2, letterSpacing:"-1px", lineHeight:1.1, marginBottom:14 }}>
            Ready to Connect With<br/>
            <span style={{ color:WA }}>Customers on WhatsApp?</span>
          </h2>
          <p style={{ fontSize:13, color:MU, lineHeight:1.7, maxWidth:480, margin:"0 auto 32px" }}>
            Join 35,000+ Indian businesses using MessBee to manage WhatsApp conversations, run campaigns and automate customer communication.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button id="wa-cta-final" className="wbp" style={{ fontSize:13, padding:"10px 20px" }} onClick={() => window.open(adminUrl+"/signup","_blank")}>Get Started</button>
            <button id="wa-cta-sales" style={{ background:"#fff", color:D2, border:`1.5px solid ${GB}`, borderRadius:40, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s" }} onClick={() => navigate("/contact#contact-form-section")} onMouseOver={(e) => { e.currentTarget.style.borderColor=WA; e.currentTarget.style.color=WA; }} onMouseOut={(e) => { e.currentTarget.style.borderColor=GB; e.currentTarget.style.color=D2; }}>Contact Support</button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaPage;
