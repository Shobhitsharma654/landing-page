import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ Animated Counter ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ */
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = (target / 1600) * 16;
        const iv = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start >= target) clearInterval(iv);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
};

/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ Check Icon ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ */
const Check = ({ color = "#16A34A" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Cost Calculator ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */
const CostCalculator = () => {
  const navigate = useNavigate();
  const [teamSize, setTeamSize]   = useState(5);
  const [waConvos, setWaConvos]   = useState(5000);
  const [smsUsage, setSmsUsage]   = useState(2000);
  const [emailUse, setEmailUse]   = useState(10000);
  const [aiCreds,  setAiCreds]    = useState(300);

  const getPlan = () => {
    if (teamSize <= 1  && waConvos <= 500   && smsUsage <= 1000  && emailUse <= 5000)  return { name: "Starter",      monthly: 999,  annual: 799,  color: "#3B82F6" };
    if (teamSize <= 10 && waConvos <= 10000 && smsUsage <= 10000 && emailUse <= 50000) return { name: "Growth",       monthly: 2499, annual: 1999, color: "#16A34A" };
    if (teamSize <= 50 && waConvos <= 25000)                                            return { name: "Professional", monthly: 4999, annual: 3999, color: "#8B5CF6" };
    return { name: "Enterprise", monthly: null, annual: null, color: "#111827" };
  };

  const plan = getPlan();
  const monthlyDisplay = plan.monthly ? `₹${plan.monthly.toLocaleString("en-IN")}` : "Custom";
  const yearlyDisplay  = plan.annual  ? `₹${(plan.annual * 12).toLocaleString("en-IN")}` : "Custom";
  const savings        = plan.monthly && plan.annual ? (plan.monthly - plan.annual) * 12 : null;
  const roi            = plan.monthly ? Math.round(plan.monthly * 4.2) : null;

  const sliders = [
    { label: "Team Size",               val: teamSize, set: setTeamSize, min: 1,   max: 100,    step: 1,    unit: "members",  color: "#16A34A" },
    { label: "WhatsApp Conversations",  val: waConvos, set: setWaConvos, min: 500, max: 50000,  step: 500,  unit: "/mo",      color: "#25D366" },
    { label: "SMS Usage",               val: smsUsage, set: setSmsUsage, min: 500, max: 100000, step: 500,  unit: "/mo",      color: "#8B5CF6" },
    { label: "Email Usage",             val: emailUse, set: setEmailUse, min: 0,   max: 200000, step: 1000, unit: "/mo",      color: "#F59E0B" },
    { label: "AI Credits",              val: aiCreds,  set: setAiCreds,  min: 0,   max: 5000,   step: 50,   unit: "/mo",      color: "#EC4899" },
  ];

  const breakdownPct = [
    { label: "Base",  color: "#16A34A", pct: 35 },
    { label: "WA",   color: "#25D366", pct: Math.min(30, Math.round(waConvos / 1500)) },
    { label: "AI",   color: "#8B5CF6", pct: Math.min(15, Math.round(aiCreds  / 300)) },
    { label: "SMS",  color: "#F59E0B", pct: Math.min(12, Math.round(smsUsage / 3000)) },
    { label: "Email",color: "#EC4899", pct: Math.min(8,  Math.round(emailUse / 10000)) },
  ];
  const totalPct = breakdownPct.reduce((a, b) => a + b.pct, 0);

  const fmt = (v, unit) => {
    if (unit === "members") return `${v} member${v !== 1 ? "s" : ""}`;
    return `${v.toLocaleString("en-IN")} ${unit}`;
  };

  return (
    <section style={{ padding: "80px 6%", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-block", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>CALCULATOR</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 12 }}>Estimate Your Monthly Cost</h2>
          <p style={{ fontSize: 15, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>Drag the sliders to match your usage and see your estimated plan and cost instantly.</p>
        </div>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ LEFT: Sliders ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */}
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 32 }}>
            {sliders.map((s) => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{s.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{fmt(s.val, s.unit)}</span>
                </div>
                <div style={{ position: "relative", height: 6 }}>
                  <div style={{ position: "absolute", inset: 0, background: "#F1F5F9", borderRadius: 4 }} />
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${((s.val - s.min) / (s.max - s.min)) * 100}%`, background: s.color, borderRadius: 4, transition: "width 0.1s" }} />
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                    onChange={e => s.set(Number(e.target.value))}
                    style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", height: "100%", margin: 0 }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: "#94A3B8" }}>{s.min.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: "#94A3B8" }}>{s.max.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ RIGHT: Estimate Card ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */}
          <div style={{ flex: "1 1 320px", background: "#FFFFFF", border: `2px solid ${plan.color}`, borderRadius: 24, padding: "28px 28px 24px", boxShadow: `0 8px 32px ${plan.color}22`, minWidth: 300 }}>
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Estimated Cost</span>
            </div>

            {/* Cost rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>Monthly Cost</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{monthlyDisplay}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>Yearly Cost</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{yearlyDisplay}</span>
              </div>
              {savings && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "#F0FDF4", borderRadius: 10, margin: "12px 0" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16A34A" }}>Annual Savings</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#16A34A" }}>₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            {/* Recommended plan + ROI */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px" }}>Recommended Plan</span>
              <span style={{ background: plan.color, color: "#FFF", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 12 }}>{plan.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px" }}>Estimated ROI</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{roi ? `₹${roi.toLocaleString("en-IN")}/mo` : "Custom"}</span>
            </div>

            {/* Cost breakdown bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 8 }}>Cost Breakdown</div>
              <div style={{ display: "flex", height: 8, borderRadius: 6, overflow: "hidden", gap: 2 }}>
                {breakdownPct.map((b) => (
                  <div key={b.label} style={{ flex: b.pct, background: b.color, minWidth: 4, transition: "flex 0.3s" }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                {breakdownPct.map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color }} />
                    <span style={{ fontSize: 10, color: "#64748B" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"}
              style={{ width: "100%", background: plan.color, color: "#FFF", border: "none", borderRadius: 40, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 16px ${plan.color}44`, transition: "all 0.22s" }}
              onMouseEnter={e => e.target.style.opacity = "0.88"}
              onMouseLeave={e => e.target.style.opacity = "1"}>
              Get Started with {plan.name}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
/* ─── ADD-ONS ─── */
const AddOns = () => {
  const navigate = useNavigate();

  const addonsData = [
    {
      title: "Communication",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      ),
      theme: { color: "#3B82F6", bg: "#EFF6FF", border: "#DBEAFE" },
      items: [
        { name: "WhatsApp Conversations", price: "₹0.50/conv", desc: "Additional WhatsApp conversations" },
        { name: "SMS Credits", price: "₹0.10/SMS", desc: "Bulk SMS credits pack" },
        { name: "Email Credits", price: "₹0.02/email", desc: "Additional email sends" },
      ]
    },
    {
      title: "AI",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 21.1 21.1"/></svg>
      ),
      theme: { color: "#A855F7", bg: "#FAF5FF", border: "#F3E8FF" },
      items: [
        { name: "AI Assistant", price: "₹999/mo", desc: "Standalone AI assistant module" },
        { name: "AI Chatbot", price: "₹1,499/mo", desc: "Full chatbot builder & deployment" },
        { name: "AI Credits Pack", price: "₹499/1K", desc: "Top-up AI processing credits" },
      ]
    },
    {
      title: "Business",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
      ),
      theme: { color: "#10B981", bg: "#ECFDF5", border: "#D1FAE5" },
      items: [
        { name: "Extra Users", price: "₹299/user/mo", desc: "Add more team members" },
        { name: "Extra Storage", price: "₹99/10GB", desc: "Additional file storage" },
        { name: "Premium Integrations", price: "₹799/mo", desc: "Custom integration setup" },
      ]
    },
    {
      title: "Support",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      ),
      theme: { color: "#F59E0B", bg: "#FFFBEB", border: "#FEF3C7" },
      items: [
        { name: "Priority Support", price: "₹999/mo", desc: "< 2hr response SLA" },
        { name: "Dedicated Manager", price: "₹2,999/mo", desc: "Personal success manager" },
        { name: "Training Sessions", price: "₹1,999/session", desc: "1-on-1 onboarding training" },
      ]
    }
  ];

  return (
    <section style={{ padding: "80px 6%", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-block", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>
            ADD-ONS
          </div>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 12 }}>Power Up Your Plan</h2>
          <p style={{ fontSize: 15, color: "#64748B", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>Add exactly what you need. No bloat, no bundles — just the features that matter.</p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {addonsData.map((addon, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: `1.5px solid ${addon.theme.border}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.22s, box-shadow 0.22s" }}
                 onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 32px -8px ${addon.theme.border}` }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
              
              {/* Card Header */}
              <div style={{ background: addon.theme.bg, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                {addon.icon}
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{addon.title}</h3>
              </div>

              {/* Items */}
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                {addon.items.map((item, j) => (
                  <div key={j}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{item.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: addon.theme.color }}>{item.price}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div style={{ padding: "0 24px 24px" }}>
                <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"}
                        style={{ width: "100%", background: addon.theme.bg, color: addon.theme.color, border: "none", borderRadius: 30, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.96)" }}
                        onMouseLeave={e => { e.currentTarget.style.filter = "none" }}>
                  Add to Plan &gt;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
/* ─── ENTERPRISE SECTION ─── */
const EnterpriseSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "White Label Platform",
      desc: "Deploy MessBee under your own brand with custom domain, logo, and UI.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      )
    },
    {
      title: "Dedicated Infrastructure",
      desc: "Private cloud setup with guaranteed resources and zero shared tenancy.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M2 12h20"/><path d="M2 16h20"/></svg>
      )
    },
    {
      title: "Custom Integrations",
      desc: "Build bespoke connectors to your existing ERP, HRMS, or proprietary systems.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.11a2 2 0 0 0-1.806.547l-2.322 2.322a2 2 0 0 0 0 2.828l2.828 2.828a2 2 0 0 0 2.828 0l1.628-1.628a6 6 0 0 0 .517-3.86l.158-.318a6 6 0 0 1 .517-3.86l.477-2.387a2 2 0 0 0-.547-1.022z"/><path d="M8 8h8v8"/></svg>
      )
    },
    {
      title: "Enterprise Security",
      desc: "SSO, RBAC, audit logs, data encryption at rest and in transit.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      )
    },
    {
      title: "SLA & Compliance",
      desc: "Guaranteed 99.99% uptime SLA with GDPR, ISO 27001, and SOC 2 compliance.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
      )
    },
    {
      title: "Dedicated Success Manager",
      desc: "A named account manager available 24/7 for strategic guidance.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      )
    },
    {
      title: "On-Premise Deployment",
      desc: "Deploy MessBee entirely within your own data center or private cloud.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      )
    },
    {
      title: "Multi-location Support",
      desc: "Manage unlimited branches, regions, or subsidiaries from one dashboard.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
      )
    }
  ];

  return (
    <section style={{ padding: "100px 6%", background: "#0F172A", position: "relative", overflow: "hidden" }}>
      {/* Background circular decorations */}
      <div style={{ position: "absolute", top: "-150px", left: "-150px", width: 400, height: 400, border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-50px", left: "-50px", width: 200, height: 200, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none" }} />
      
      <div style={{ position: "absolute", bottom: "-200px", right: "-100px", width: 500, height: 500, border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-50px", right: "50px", width: 200, height: 200, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "6px 16px", borderRadius: 20, marginBottom: 20 }}>
            ENTERPRISE
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#F8FAFC", letterSpacing: "-1px", marginBottom: 16 }}>
            Enterprise Solutions Built for<br/>Large Organizations
          </h2>
          <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Custom deployments, dedicated infrastructure, and white-glove support for enterprises at scale.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20, marginBottom: 50 }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px", display: "flex", flexDirection: "column", gap: 16, transition: "background 0.2s" }}
                 onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                 onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", marginBottom: 8 }}>{feature.title}</h3>
                <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => window.location.href = "/contact"}
                  style={{ background: "#10B981", color: "#FFF", border: "none", borderRadius: 30, padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.filter = "none"}>
            Talk to Enterprise Team
          </button>
          <button onClick={() => window.location.href = "/contact"}
                  style={{ background: "rgba(255,255,255,0.05)", color: "#F1F5F9", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 30, padding: "14px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
            Contact Sales
          </button>
        </div>

      </div>
    </section>
  );
};
/* ─── TRUSTED BY SECTION ─── */
const TrustedBySection = () => {
  const stats = [
    { value: "10,000+", label: "Businesses", color: "#10B981" },
    { value: "50M+", label: "Messages Sent", color: "#3B82F6" },
    { value: "99.9%", label: "Uptime", color: "#8B5CF6" },
    { value: "24x7", label: "Support", color: "#F59E0B" },
  ];

  const companies = [
    { initial: "F", name: "FreshMart", industry: "Retail", bg: "#10B981" },
    { initial: "H", name: "HealthFirst", industry: "Healthcare", bg: "#EF4444" },
    { initial: "L", name: "LearnSphere", industry: "Education", bg: "#3B82F6" },
    { initial: "G", name: "Glow Studio", industry: "Salon", bg: "#EC4899" },
    { initial: "A", name: "AutoZone", industry: "Automobile", bg: "#2563EB" },
    { initial: "B", name: "BuildCo", industry: "Manufacturing", bg: "#B45309" },
  ];

  const testimonials = [
    {
      stars: 5,
      color: "#10B981",
      text: '"MessBee paid for itself in the first week. Our WhatsApp sales tripled within a month."',
      initial: "RM",
      author: "Ravi Mehta",
      company: "FreshMart Retail"
    },
    {
      stars: 5,
      color: "#EF4444",
      text: '"The ROI has been extraordinary. We saved ₹2L/month by replacing 4 separate tools with MessBee."',
      initial: "DPS",
      author: "Dr. Priya Sharma",
      company: "HealthFirst Clinics"
    },
    {
      stars: 5,
      color: "#3B82F6",
      text: '"Switching from our old CRM was seamless. Growth plan covers everything we need at a fraction of the cost."',
      initial: "AK",
      author: "Arun Kumar",
      company: "LearnSphere Institute"
    }
  ];

  return (
    <section style={{ padding: "100px 6%", background: "#FAFAFA" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-block", background: "#DCFCE7", color: "#16A34A", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "6px 16px", borderRadius: 20, marginBottom: 20 }}>
            TRUSTED BY
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
            10,000+ Businesses Trust MessBee
          </h2>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 40 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ flex: "1 1 200px", maxWidth: 280, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px", textAlign: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: stat.color, marginBottom: 6, letterSpacing: "-1px" }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Companies */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 60 }}>
          {companies.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 40, padding: "8px 24px 8px 8px", boxShadow: "0 2px 4px -1px rgba(0,0,0,0.02)" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.bg, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
                {c.initial}
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", lineHeight: 1.2 }}>{c.name}</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>{c.industry}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 10px 24px -4px rgba(0,0,0,0.03)" }}>
              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[...Array(t.stars)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill={t.color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 32 }}>{t.text}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>
                  {t.initial}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1E293B" }}>{t.author}</span>
                  <span style={{ fontSize: 13, color: "#94A3B8" }}>{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};





const PricingPage = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState("annual");
  const [activeFaq, setActiveFaq] = useState(null);
  const [hovered, setHovered] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      tagline: "For small businesses just getting started",
      monthly: 999,
      annual: 799,
      color: "#6366F1",
      glow: "rgba(99,102,241,0.22)",
      badge: null,
      popular: false,
      features: [
        { label: "5,000 messages / month", ok: true },
        { label: "1 WhatsApp Number", ok: true },
        { label: "Basic Analytics", ok: true },
        { label: "Email Support", ok: true },
        { label: "REST API Access", ok: true },
        { label: "Team Inbox", ok: false },
        { label: "Chatbot Builder", ok: false },
        { label: "CRM Integration", ok: false },
        { label: "White Label", ok: false },
        { label: "Dedicated Manager", ok: false },
      ],
      cta: "Start Free Trial",
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "Scale with automation & team collaboration",
      monthly: 2999,
      annual: 2399,
      color: "#16A34A",
      glow: "rgba(0,200,83,0.28)",
      badge: "Most Popular",
      popular: true,
      features: [
        { label: "50,000 messages / month", ok: true },
        { label: "3 WhatsApp Numbers", ok: true },
        { label: "Advanced Analytics", ok: true },
        { label: "Priority 24/7 Support", ok: true },
        { label: "REST API Access", ok: true },
        { label: "Team Inbox (10 agents)", ok: true },
        { label: "Drag-and-drop Chatbot Builder", ok: true },
        { label: "CRM Integration", ok: true },
        { label: "White Label", ok: false },
        { label: "Dedicated Manager", ok: false },
      ],
      cta: "Get Started",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Full power for large-scale operations",
      monthly: 7999,
      annual: 6399,
      color: "#F59E0B",
      glow: "rgba(245,158,11,0.22)",
      badge: "Best Value",
      popular: false,
      features: [
        { label: "Unlimited messages", ok: true },
        { label: "10+ WhatsApp Numbers", ok: true },
        { label: "Custom Analytics & Reports", ok: true },
        { label: "Dedicated SLA Support", ok: true },
        { label: "API + Webhook Access", ok: true },
        { label: "Unlimited Inbox Agents", ok: true },
        { label: "Drag-and-drop Chatbot Builder", ok: true },
        { label: "Advanced CRM Integration", ok: true },
        { label: "White Label Solution", ok: true },
        { label: "Dedicated Account Manager", ok: true },
      ],
      cta: "Contact Sales",
    },
  ];

  const featureTable = [
    { label: "Monthly Messages",  starter: "5,000",      growth: "50,000",        enterprise: "Unlimited" },
    { label: "WhatsApp Numbers",  starter: "1",           growth: "3",             enterprise: "10+" },
    { label: "Team Agents",       starter: "1",           growth: "10",            enterprise: "Unlimited" },
    { label: "Analytics",         starter: "Basic",       growth: "Advanced",      enterprise: "Custom" },
    { label: "API Access",        starter: "✓",           growth: "✓",             enterprise: "✓ + Webhooks" },
    { label: "Chatbot Builder",   starter: "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â",           growth: "✓",             enterprise: "✓" },
    { label: "CRM Integration",   starter: "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â",           growth: "✓",             enterprise: "✓ Advanced" },
    { label: "White Label",       starter: "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â",           growth: "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â",             enterprise: "✓" },
    { label: "Support",           starter: "Email",       growth: "24/7 Priority", enterprise: "Dedicated SLA" },
    { label: "Onboarding",        starter: "Self-serve",  growth: "Assisted",      enterprise: "Full Setup" },
  ];

  const faqs = [
    { q: "Is there a free trial?", a: "Yes! All plans include a 14-day free trial with full feature access. No credit card required. Upgrade or cancel anytime." },
    { q: "Can I switch plans later?", a: "Absolutely. Upgrade or downgrade at any time. Prorated billing ensures you only pay for what you use." },
    { q: "What happens if I exceed my message limit?", a: "You'll get an email alert at 80% usage. Beyond the limit, additional messages are charged at a small per-message overage rate." },
    { q: "Are there any hidden fees?", a: "None. The price you see is the price you pay. Meta's WhatsApp Business API conversation charges are separate and billed by Meta directly." },
    { q: "Do you offer custom enterprise plans?", a: "Yes! Contact our sales team for a custom quote tailored to your volume, features, SLA, and integration needs." },
    { q: "What payment methods do you accept?", a: "All major credit/debit cards, UPI, Net Banking, and bank transfers for annual plans, processed securely via Razorpay. GST invoice provided." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", color: "#0F172A", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .pp-nav-link { font-size: 13px; font-weight: 600; color: #A1A1AA; cursor: pointer; padding: 6px 2px; transition: color 0.2s; }
        .pp-nav-link:hover { color: #FFFFFF; }
        .pp-nav-link.active { color: #16A34A; }

        .pp-card {
          background: #FFFFFF;
          border: 1.5px solid #E5E7EB;
          border-radius: 28px;
          padding: 40px 34px;
          transition: transform 0.32s cubic-bezier(.4,0,.2,1), box-shadow 0.32s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .pp-card:hover { transform: translateY(-6px); box-shadow: 0 28px 56px rgba(0,0,0,0.10); }
        .pp-card.popular {
          border-color: #16A34A;
          background: #FAFFFD;
          transform: translateY(-10px);
          box-shadow: 0 24px 56px rgba(0,200,83,0.16);
          z-index: 2;
        }
        .pp-card.popular:hover { transform: translateY(-16px); box-shadow: 0 36px 72px rgba(0,200,83,0.2); }

        .pp-toggle { display:inline-flex; align-items:center; background:#FFFFFF; border:1.5px solid #E5E7EB; border-radius:50px; padding:4px; gap:2px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .pp-toggle-btn { padding:10px 28px; border-radius:46px; border:none; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; transition:all 0.22s; }
        .pp-toggle-btn.on { background:#0F172A; color:#FFFFFF; box-shadow:0 2px 8px rgba(0,0,0,0.18); }
        .pp-toggle-btn.off { background:transparent; color:#64748B; }

        .pp-cta { width:100%; border:none; border-radius:14px; padding:14px 0; font-size:15px; font-weight:700; cursor:pointer; font-family:inherit; transition:all 0.22s; margin-top:28px; letter-spacing:0.1px; }
        .pp-cta:hover { transform:translateY(-2px); }

        .pp-stat { background:#FFFFFF; border:1px solid #F1F5F9; border-radius:20px; padding:30px 24px; text-align:center; transition:all 0.28s; flex:1 1 180px; }
        .pp-stat:hover { box-shadow:0 16px 40px rgba(0,0,0,0.08); transform:translateY(-4px); }

        .pp-faq-wrap { background:#FFFFFF; border-radius:24px; border:1px solid #E5E7EB; box-shadow:0 4px 24px rgba(0,0,0,0.04); overflow:hidden; }
        .pp-faq-item { border-bottom:1px solid #F1F5F9; }
        .pp-faq-item:last-child { border-bottom:none; }
        .pp-faq-q { display:flex; justify-content:space-between; align-items:center; padding:20px 32px; cursor:pointer; font-weight:600; color:#0F172A; font-size:15px; transition:background 0.2s; }
        .pp-faq-q:hover { background:#F8FAFC; }
        .pp-faq-a { font-size:14px; color:#475569; line-height:1.85; padding:0 32px 20px; }

        .pp-tbl-row { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; }
        .pp-tbl-row:nth-child(even) { background:#F8FAFC; }
        .pp-tbl-row:nth-child(odd) { background:#FFFFFF; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,10px) scale(0.95)} }
        @keyframes dot-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .animate-up { animation: fadeUp 0.6s ease both; }

        .pp-badge-pill { display:inline-flex; align-items:center; gap:8px; border-radius:40px; padding:6px 16px; font-size:12px; font-weight:700; }
      `}</style>

      {/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â NAVBAR ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â */}
      <Navbar />

      {/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â HERO ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â */}
      <section style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex", alignItems: "center",
        padding: "100px 6% 60px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,83,0.06) 0%, transparent 70%)", animation: "blob 12s infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", animation: "blob 15s 3s infinite", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "6vw", flexWrap: "wrap" }}>

          {/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ LEFT ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ */}
          <div style={{ flex: "1 1 480px", minWidth: 300 }} className="animate-up">
            {/* Badge */}
            <div className="pp-badge-pill" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", animation: "dot-pulse 2s infinite" }} />
              PRICING
            </div>

            <h1 style={{ fontSize: "clamp(28px,4.5vw,54px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-2px", color: "#0F172A", marginBottom: 22 }}>
              Simple, Transparent<br />
              <span style={{ color: "#16A34A" }}>Pricing</span> for Every<br />
              Business
            </h1>

            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
              Choose the right plan for your business. Scale as your business grows with flexible pricing built for startups, growing businesses, and enterprises.
            </p>

            <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
              <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,200,83,0.32)" }}>
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button onClick={() => window.location.href = "/contact"} style={{ background: "#FFFFFF", color: "#0F172A", border: "2px solid #E5E7EB", borderRadius: 40, padding: "13px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Book a Demo
              </button>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["No Credit Card Required", "Cancel Anytime", "GST Invoice Available"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#475569", fontWeight: 500 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check color="#16A34A" />
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ RIGHT: Dashboard mockup ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ */}
          <div className="animate-up" style={{ animationDelay: "0.15s", flex: "1 1 460px", minWidth: 300, position: "relative" }}>
            {/* Glow */}
            <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(0,200,83,0.08) 0%, transparent 65%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

            {/* Main card */}
            <div style={{ position: "relative", zIndex: 1, background: "#FFFFFF", borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
              {/* Card header */}
              <div style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Your Plan</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "4px 12px" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", animation: "dot-pulse 2s infinite" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Active</span>
                </div>
              </div>

              <div style={{ padding: "20px 20px 0" }}>
                {/* Billing toggle in card */}
                <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 40, padding: 3, marginBottom: 20, width: "fit-content", gap: 2 }}>
                  {["Monthly", "Yearly  -20%"].map((t, i) => (
                    <button key={i} onClick={() => setBilling(i === 0 ? "monthly" : "annual")}
                      style={{ padding: "7px 18px", borderRadius: 36, border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                        background: (i === 0 && billing === "monthly") || (i === 1 && billing === "annual") ? "#FFFFFF" : "transparent",
                        color: (i === 0 && billing === "monthly") || (i === 1 && billing === "annual") ? "#0F172A" : "#64748B",
                        boxShadow: (i === 0 && billing === "monthly") || (i === 1 && billing === "annual") ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                      }}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 8 }}>₹</span>
                  <span style={{ fontSize: 46, fontWeight: 900, color: "#16A34A", letterSpacing: "-2px", lineHeight: 1 }}>
                    {billing === "annual" ? "2,399" : "2,999"}
                  </span>
                  <span style={{ fontSize: 13, color: "#94A3B8", marginBottom: 6, fontWeight: 500 }}>/month</span>
                </div>
                {billing === "annual" && (
                  <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16 }}>
                    Billed annually · <span style={{ color: "#16A34A", fontWeight: 700 }}>Save ₹7,200/yr</span>
                  </div>
                )}

                {/* Usage bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                  {[
                    { label: "WhatsApp Conversations", value: "7,241", pct: 72, color: "#16A34A" },
                    { label: "AI Credits",             value: "3,400", pct: 68, color: "#6366F1" },
                    { label: "Team Members",           value: "7/10",  pct: 70, color: "#F59E0B" },
                  ].map((row, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{row.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{row.value}</span>
                      </div>
                      <div style={{ width: "100%", height: 6, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revenue row */}
                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>Revenue Attributed</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#16A34A" }}>+ 34%</span>
                </div>
              </div>
            </div>

            {/* Floating stats pill ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ messages */}
            <div style={{ position: "absolute", top: -18, left: -28, background: "#FFFFFF", borderRadius: 20, padding: "12px 18px", boxShadow: "0 8px 28px rgba(0,0,0,0.1)", border: "1px solid #F1F5F9", zIndex: 10 }}>
              <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600, marginBottom: 2 }}>Messages Sent</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>50M+</div>
              <div style={{ fontSize: 10, color: "#16A34A", fontWeight: 700, marginTop: 2 }}>+ 12% this month</div>
            </div>

            {/* Floating team pill */}
            <div style={{ position: "absolute", top: 60, right: -32, background: "#FFFFFF", borderRadius: 20, padding: "12px 18px", boxShadow: "0 8px 28px rgba(0,0,0,0.1)", border: "1px solid #F1F5F9", zIndex: 10 }}>
              <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600, marginBottom: 6 }}>Team</div>
              <div style={{ display: "flex", gap: -4 }}>
                {["#6366F1","#16A34A","#F59E0B","#EC4899"].map((c, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid #FFF", marginLeft: i > 0 ? -6 : 0 }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#475569", fontWeight: 600, marginTop: 4 }}>7/10 seats</div>
            </div>

            {/* AI credits floating */}
            <div style={{ position: "absolute", bottom: -20, right: -24, background: "#0F172A", borderRadius: 20, padding: "14px 18px", boxShadow: "0 8px 28px rgba(0,0,0,0.18)", zIndex: 10, minWidth: 130 }}>
              <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600, marginBottom: 4 }}>AI Credits</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#16A34A", letterSpacing: "-1px" }}>500</div>
              <div style={{ fontSize: 10, color: "#475569", fontWeight: 500 }}>325 used</div>
            </div>
          </div>
        </div>
      </section>

      {/* ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚Â PRICING CARDS ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚Â */}
      <section style={{ padding: "72px 6% 80px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 14 }}>PRICING</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 28 }}>
              Simple, Transparent Pricing
            </h2>

            {/* Billing Toggle */}
            <div style={{ display: "inline-flex", alignItems: "center", background: "#F1F5F9", borderRadius: 50, padding: 4, border: "1px solid #E2E8F0" }}>
              <button
                onClick={() => setBilling("monthly")}
                style={{ padding: "9px 24px", borderRadius: 46, border: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.22s",
                  background: billing === "monthly" ? "#FFFFFF" : "transparent",
                  color: billing === "monthly" ? "#0F172A" : "#64748B",
                  boxShadow: billing === "monthly" ? "0 1px 6px rgba(0,0,0,0.12)" : "none" }}>
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                style={{ padding: "9px 24px", borderRadius: 46, border: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.22s", display: "flex", alignItems: "center", gap: 8,
                  background: billing === "annual" ? "#FFFFFF" : "transparent",
                  color: billing === "annual" ? "#0F172A" : "#64748B",
                  boxShadow: billing === "annual" ? "0 1px 6px rgba(0,0,0,0.12)" : "none" }}>
                Annual
                <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>-20%</span>
              </button>
            </div>
          </div>

          {/* Cards Row */}
          <div style={{ display: "flex", gap: 16, flexWrap: "nowrap", overflowX: "auto", justifyContent: "center", alignItems: "stretch", paddingBottom: 8 }}>

            {/* ── FREE TRIAL ── */}
            <div style={{ flex: "0 0 220px", background: "#FFFFFF", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "28px 22px", position: "relative", display: "flex", flexDirection: "column", minWidth: 200 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FEF9C3", border: "1px solid #FDE68A", borderRadius: 20, padding: "4px 12px", marginBottom: 16, width: "fit-content" }}>
                <span style={{ fontSize: 13 }}>🏆</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#92400E" }}>Best for New Users</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Free Trial</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16, lineHeight: 1.5 }}>Explore Messbee with essential features before choosing a paid plan.</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>₹</span>
                <span style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", lineHeight: 1, letterSpacing: "-1px" }}>0</span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#16A34A", marginBottom: 20 }}>14 Days Free Trial</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["WhatsApp Business API Access","CRM & Contact Management","Up to 500 Contacts","Broadcast Messaging","Basic Automation","Dashboard Analytics","2 Team Members","Email Support","No Credit Card Required"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#374151", fontWeight: 500 }}>
                    <svg width="14" height="14" style={{ flexShrink: 0, marginTop: 1 }} viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ marginTop: 24, width: "100%", background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(0,200,83,0.3)", transition: "all 0.22s" }}
                onMouseEnter={e => e.target.style.background = "#00B248"}
                onMouseLeave={e => e.target.style.background = "#16A34A"}>
                Start Free Trial
              </button>
            </div>

            {/* â”€â”€ STARTER â”€â”€ */}
            <div style={{ flex: "0 0 220px", background: "#FFFFFF", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "28px 22px", display: "flex", flexDirection: "column", minWidth: 200 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Starter</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16, lineHeight: 1.5 }}>Perfect for early-stage businesses</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>â‚¹</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", lineHeight: 1, letterSpacing: "-1px" }}>{billing === "annual" ? "799" : "999"}</span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Up to 500 customers","Basic CRM","Digital Store","WhatsApp (500 msgs/mo)","Email support"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#374151", fontWeight: 500 }}>
                    <svg width="14" height="14" style={{ flexShrink: 0, marginTop: 1 }} viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ marginTop: 24, width: "100%", background: "transparent", color: "#0F172A", border: "2px solid #E5E7EB", borderRadius: 40, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#16A34A"; e.currentTarget.style.color = "#16A34A"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#0F172A"; }}>
                Get Started
              </button>
            </div>

            {/* â”€â”€ GROWTH â”€â”€ */}
            <div style={{ flex: "0 0 220px", background: "#FFFFFF", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "28px 22px", display: "flex", flexDirection: "column", minWidth: 200 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Growth</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16, lineHeight: 1.5 }}>For growing businesses ready to scale</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>â‚¹</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", lineHeight: 1, letterSpacing: "-1px" }}>{billing === "annual" ? "1,999" : "2,499"}</span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Up to 5,000 customers","Full CRM + Orders","Marketing Automation","WhatsApp (5,000 msgs/mo)","Inventory & Payments","Priority support"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#374151", fontWeight: 500 }}>
                    <svg width="14" height="14" style={{ flexShrink: 0, marginTop: 1 }} viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ marginTop: 24, width: "100%", background: "transparent", color: "#0F172A", border: "2px solid #E5E7EB", borderRadius: 40, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#16A34A"; e.currentTarget.style.color = "#16A34A"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#0F172A"; }}>
                Get Started
              </button>
            </div>

            {/* â”€â”€ PROFESSIONAL (Most Popular) â”€â”€ */}
            <div style={{ flex: "0 0 240px", background: "#111827", border: "none", borderRadius: 20, padding: "28px 22px", display: "flex", flexDirection: "column", minWidth: 220, position: "relative", boxShadow: "0 24px 56px rgba(0,0,0,0.22)" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#16A34A", color: "#FFF", fontSize: 11, fontWeight: 800, padding: "4px 18px", borderRadius: 20, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,200,83,0.4)" }}>
                Most Popular
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>Professional</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16, lineHeight: 1.5 }}>For established businesses demanding more</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>â‚¹</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-1px" }}>{billing === "annual" ? "3,999" : "4,999"}</span>
                <span style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Up to 25,000 customers","AI Assistant","All Modules Included","WhatsApp (25,000 msgs/mo)","Loyalty Program","Dedicated account manager","Advanced Analytics"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#D1D5DB", fontWeight: 500 }}>
                    <svg width="14" height="14" style={{ flexShrink: 0, marginTop: 1 }} viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ marginTop: 24, width: "100%", background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "13px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 18px rgba(0,200,83,0.4)", transition: "all 0.22s" }}
                onMouseEnter={e => e.target.style.background = "#00B248"}
                onMouseLeave={e => e.target.style.background = "#16A34A"}>
                Start Free Trial
              </button>
            </div>

            {/* â”€â”€ ENTERPRISE â”€â”€ */}
            <div style={{ flex: "0 0 220px", background: "#FFFFFF", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "28px 22px", display: "flex", flexDirection: "column", minWidth: 200 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Enterprise</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 16, lineHeight: 1.5 }}>Tailored for large organizations</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>Custom</span>
                <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 4 }}>pricing</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Unlimited customers","Custom integrations","SLA-backed uptime","White-label option","On-premise deployment","24/7 dedicated support"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#374151", fontWeight: 500 }}>
                    <svg width="14" height="14" style={{ flexShrink: 0, marginTop: 1 }} viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate("/contact")} style={{ marginTop: 24, width: "100%", background: "transparent", color: "#0F172A", border: "2px solid #0F172A", borderRadius: 40, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0F172A"; e.currentTarget.style.color = "#FFF"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0F172A"; }}>
                Contact Sales
              </button>
            </div>

          </div>

          {/* Bottom note */}
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#94A3B8" }}>
            ðŸ”’ No credit card required &nbsp;Â·&nbsp; Cancel anytime &nbsp;Â·&nbsp; GST invoice available
          </div>
        </div>
      </section>

      {/* ════════════════════ COMPARE PLANS ════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "5px 14px", borderRadius: 20, marginBottom: 16 }}>
              COMPARISON
            </div>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 12 }}>Compare Plans</h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>Everything you need to make the right choice for your business.</p>
          </div>

          {/* Table */}
          <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Column Headers Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #E2E8F0", background: "#FFFFFF" }}>
              <div style={{ padding: "24px 24px", fontSize: 14, fontWeight: 700, color: "#1E293B", alignSelf: "center" }}>Feature</div>
              {[
                { label: "Starter",      color: "#3B82F6", badge: null },
                { label: "Growth",       color: "#16A34A", badge: "Popular", bg: "#F4FCF7" },
                { label: "Professional", color: "#8B5CF6", badge: null },
                { label: "Enterprise",   color: "#111827", badge: null },
              ].map((col) => (
                <div key={col.label} style={{ padding: "24px 12px", textAlign: "center", background: col.bg || "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: col.color, marginBottom: col.badge ? 6 : 0 }}>{col.label}</div>
                  {col.badge && <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 12 }}>{col.badge}</span>}
                </div>
              ))}
            </div>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Helper components inline Ã¢â€â‚¬Ã¢â€â‚¬ */}
            {(() => {
              const Tick = () => (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", display: "block" }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              );
              const Dash = () => <span style={{ color: "#CBD5E1", fontWeight: 400, fontSize: 16 }}>-</span>;

              const SectionHeader = ({ icon, label }) => (
                <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
                  <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                    {icon}
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
                  </div>
                  <div style={{ background: "transparent" }} />
                  <div style={{ background: "#EDF9F1" }} />
                  <div style={{ background: "transparent" }} />
                  <div style={{ background: "transparent" }} />
                </div>
              );

              const Row = ({ label, vals, idx }) => {
                const bgRow = idx % 2 === 0 ? "#FFFFFF" : "#F9FAFB";
                return (
                  <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #F1F5F9", background: bgRow }}>
                    <div style={{ padding: "18px 24px", fontSize: 13, color: "#475569", fontWeight: 500 }}>{label}</div>
                    {vals.map((v, j) => {
                      const bgCell = j === 1 ? (idx % 2 === 0 ? "#F4FCF7" : "#EDF9F1") : "transparent";
                      return (
                        <div key={j} style={{ padding: "18px 12px", textAlign: "center", fontSize: 13, fontWeight: 500, color: "#475569", background: bgCell }}>
                          {v === "✓" ? <Tick /> : v === "-" ? <Dash /> : v}
                        </div>
                      );
                    })}
                  </div>
                );
              };

              return (
                <>
                  {/* COMMUNICATION */}
                  <SectionHeader label="Communication" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  } />
                  {[
                    { label: "WhatsApp API",  vals: ["✓",         "✓",          "✓",          "✓"] },
                    { label: "SMS",           vals: ["1,000/mo",  "10,000/mo",  "Unlimited",  "Unlimited"] },
                    { label: "Email",         vals: ["5,000/mo",  "50,000/mo",  "Unlimited",  "Unlimited"] },
                    { label: "Voice",         vals: ["-",         "-",          "✓",          "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* AI FEATURES */}
                  <SectionHeader label="AI Features" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 21.1 21.1"/></svg>
                  } />
                  {[
                    { label: "AI Assistant",  vals: ["-",      "✓",        "✓",        "✓"] },
                    { label: "AI Chatbot",    vals: ["-",      "-",        "✓",        "✓"] },
                    { label: "AI Automation", vals: ["-",      "-",        "✓",        "✓"] },
                    { label: "AI Credits",    vals: ["-",      "500/mo",   "5,000/mo", "Unlimited"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* CRM */}
                  <SectionHeader label="CRM" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  } />
                  {[
                    { label: "Contacts",         vals: ["1,000",   "25,000",   "250,000",  "Unlimited"] },
                    { label: "Leads & Pipelines", vals: ["✓",       "✓",        "✓",        "✓"] },
                    { label: "Custom Pipelines",  vals: ["1",       "5",        "Unlimited","Unlimited"] },
                    { label: "Tasks & Notes",     vals: ["✓",       "✓",        "✓",        "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* COMMERCE */}
                  <SectionHeader label="Commerce" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  } />
                  {[
                    { label: "Payments",           vals: ["✓",  "✓",  "✓",  "✓"] },
                    { label: "Orders Management",  vals: ["-",  "✓",  "✓",  "✓"] },
                    { label: "Inventory",          vals: ["-",  "-",  "✓",  "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* OPERATIONS */}
                  <SectionHeader label="Operations" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                  } />
                  {[
                    { label: "Team Members",        vals: ["2",      "10",       "50",       "Unlimited"] },
                    { label: "Reports & Analytics", vals: ["Basic",  "Advanced", "Custom",   "Custom"] },
                    { label: "Role Permissions",    vals: ["-",      "✓",        "✓",        "✓"] },
                    { label: "Activity Logs",       vals: ["-",      "✓",        "✓",        "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* INTEGRATIONS */}
                  <SectionHeader label="Integrations" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  } />
                  {[
                    { label: "Zapier",    vals: ["-",  "✓",  "✓",  "✓"] },
                    { label: "Razorpay", vals: ["✓",  "✓",  "✓",  "✓"] },
                    { label: "Shopify",  vals: ["-",  "✓",  "✓",  "✓"] },
                    { label: "Meta Ads", vals: ["-",  "✓",  "✓",  "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}

                  {/* SUPPORT */}
                  <SectionHeader label="Support" icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  } />
                  {[
                    { label: "Email Support",     vals: ["✓",  "✓",  "✓",  "✓"] },
                    { label: "Chat Support",      vals: ["-",  "✓",  "✓",  "✓"] },
                    { label: "Phone Support",     vals: ["-",  "-",  "✓",  "✓"] },
                    { label: "Dedicated Manager", vals: ["-",  "-",  "-",  "✓"] },
                  ].map((r, i) => <Row key={r.label} label={r.label} vals={r.vals} idx={i} />)}
                </>
              );
            })()}

          </div>
        </div>
      </section>
      <CostCalculator />
      <AddOns />
      <EnterpriseSection />
      <TrustedBySection />
      <Footer />
    </div>
  );
};

export default PricingPage;

