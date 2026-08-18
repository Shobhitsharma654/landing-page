import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import heroDashboard from "../assets/hero-dashboard.png";
import aiRobot from "../assets/ai_robot_new.png";
import howItWorksPerson from "../assets/how_it_works_person.jpg";
import chooseUsWoman from "../assets/choose_us_woman_nobg.png";
import messbeeText from "../assets/messbee_text.png";
import reviewerRajesh from "../assets/reviewer_rajesh.png";
import reviewerPriya from "../assets/reviewer_priya.png";
import reviewerAmit from "../assets/reviewer_amit.png";
import indianAvatar from "../assets/indian_avatar.jpg";



/* ═══════════════════════════════════════════════════════════════
   MessBee Marketing Landing Page
   - Navbar with Login / Start Free
   - Hero Section with dashboard preview
   - Features, Stats, Pricing, Testimonials, CTA
   ═══════════════════════════════════════════════════════════════ */

/* ── Animated Counter ── */
const Counter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (target / duration) * 16;
        const interval = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start >= target) clearInterval(interval);
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const VideoBanner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,0,0,0.08)", marginBottom: 32, background: "#000", cursor: isPlaying ? "default" : "pointer" }} onClick={!isPlaying ? handlePlay : undefined}>
      <video 
        ref={videoRef}
        src="/testimonial_video.mp4" 
        controls={isPlaying}
        style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
        poster="/video_poster.jpg"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.15)", transition: "background 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.25)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" color="#16A34A" style={{ marginLeft: 4 }}>
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};


const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("annual");
  const [activeFaq, setActiveFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail) return;
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus({ type: "success", message: data.message });
        setNewsletterEmail("");
      } else {
        setNewsletterStatus({ type: "error", message: data.message });
      }
    } catch (err) {
      setNewsletterStatus({ type: "error", message: "Failed to subscribe" });
    }
    setTimeout(() => setNewsletterStatus(null), 3000);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const plans = [
    {
      name: "Starter",
      monthly: 999,
      annual: 799,
      color: "#6366F1",
      badge: null,
      features: ["5,000 messages/month", "1 WhatsApp Number", "Basic Analytics", "Email Support", "API Access"],
    },
    {
      name: "Growth",
      monthly: 2999,
      annual: 2399,
      color: "#16A34A",
      badge: "Most Popular",
      features: ["50,000 messages/month", "3 WhatsApp Numbers", "Advanced Analytics", "Priority Support", "Team Inbox", "Chatbot Builder", "CRM Integration"],
    },
    {
      name: "Enterprise",
      monthly: 7999,
      annual: 6399,
      color: "#F59E0B",
      badge: "Best Value",
      features: ["Unlimited messages", "10+ WhatsApp Numbers", "Custom Analytics", "Dedicated Manager", "White Label", "Custom Integrations", "SLA Guarantee", "Onboarding Support"],
    },
  ];

  const faqs = [
    { q: "What is MessBee?", a: "MessBee is India's leading WhatsApp Business automation platform that helps businesses sell, market, support, and grow via WhatsApp." },
    { q: "Is there a free trial?", a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required." },
    { q: "How many WhatsApp numbers can I connect?", a: "Depending on your plan, you can connect 1 to 10+ verified WhatsApp Business API numbers." },
    { q: "Do I need technical knowledge?", a: "Not at all. MessBee is designed for non-technical users with a drag-and-drop chatbot builder and no-code integrations." },
    { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption, are GDPR compliant, and store all data on Indian servers." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden" }}>
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVBAR â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Navbar />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section style={{ background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 6% 40px", overflow: "hidden" }}>



        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "4vw", width: "100%", maxWidth: 1280, margin: "0 auto" }}>
          {/* Left content */}
          <div style={{ flex: "1 1 500px", minWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
              {/* Meta Badge */}
              <div style={{
                 background: "#FFFFFF",
                 borderRadius: "40px",
                 padding: "8px 20px",
                 display: "flex",
                 alignItems: "center",
                 gap: "10px",
                 boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                 border: "1px solid #E5E7EB",
                 whiteSpace: "nowrap"
               }}>
                 <svg width="24" height="24" viewBox="0 0 16 16" fill="#0668E1">
                   <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
                 </svg>
                 <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748B" }}>
                   Meta Tech Partner. Powered by official WhatsApp API
                 </span>
                 <div style={{ width: 20, height: 20, background: "#16A34A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                 </div>
               </div>
            </div>


            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1.05, letterSpacing: "normal", marginBottom: 8, color: "#111827" }}>
              India's Digital<br />
              <span style={{ color: "#16A34A" }}>Business Operating</span><br />
              <span style={{ color: "#111827" }}>System</span>
            </h1>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#111827", lineHeight: 1.5, marginBottom: 8, fontWeight: 600 }}>
              Own Your Business. Own Your Customers.<br />
              <span style={{ fontWeight: 600 }}>Own Your Future.</span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#111827", fontWeight: 800, marginBottom: 24 }}>
              Broadcast Smarter. Automate Faster. <span style={{ color: "#16A34A" }}>Grow Without Limits.</span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#4B5563", lineHeight: 1.6, marginBottom: 40, maxWidth: 480, fontWeight: 500 }}>
              MessBee is India's comprehensive Digital Business Operating System, powered by the Official WhatsApp Business API. We help businesses connect with customers at scale through WhatsApp Broadcasting, automated messaging, customer engagement, sales workflows, payments and AI-powered business automation all from one unified platform.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free</button>
              <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/login", "_blank")} style={{ background: "#111827", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                Book Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div>

          {/* Right: Dashboard preview Image */}
          <div style={{ flex: "1.3 1 560px", minWidth: 350, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
             {/* Trusted Pill */}
             <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", borderRadius: 40, padding: "6px 14px", marginLeft: "15%", marginBottom: "16px", zIndex: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A" }}>Trusted by 35,000+ businesses across India</span>
             </div>

            <img src={heroDashboard} alt="Dashboard Preview" style={{ width: "115%", maxWidth: "none", height: "auto", objectFit: "contain", marginTop: "-30px", marginLeft: "15%", maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)" }} />
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES STRIP BAR ═══════════════ */}
      <section style={{ background: "#FFFFFF", padding: "10px 5% 35px 5%", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{
          maxWidth: 1380,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px 24px"
        }}>
          {[
            {
              title: "CRM",
              desc: "Manage relationships",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M6 18c0-3 2.7-5 6-5s6 2 6 5" />
                  <circle cx="4" cy="9" r="1.5" />
                  <circle cx="20" cy="9" r="1.5" />
                  <path d="M5.5 9.5l2.5 1.5" />
                  <path d="M18.5 9.5l-2.5 1.5" />
                </svg>
              )
            },
            {
              title: "Digital Store",
              desc: "Launch your storefront",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l1.5-5h15L21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M3 9h18" />
                  <path d="M9 13h6" />
                  <path d="M10 9v4" />
                  <path d="M14 9v4" />
                </svg>
              )
            },
            {
              title: "Marketing Automation",
              desc: "Run campaigns that convert",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 4 4 4L8 19l-4-4L15 4z" />
                  <path d="m18 1 2 2" />
                  <path d="M20 7l2 2" />
                  <path d="M13 2l-1 2" />
                  <path d="M7 16l-3 3" />
                </svg>
              )
            },
            {
              title: "Inventory",
              desc: "Track & manage stock",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              )
            },
            {
              title: "Orders",
              desc: "Manage orders seamlessly",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1.5" />
                  <circle cx="19" cy="21" r="1.5" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              )
            },
            {
              title: "Payments",
              desc: "Accept payments securely",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              )
            },
            {
              title: "Analytics",
              desc: "Track performance",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <polyline points="4 8 10 2 16 8 21 3" />
                  <polyline points="17 3 21 3 21 7" />
                </svg>
              )
            },
            {
              title: "Team Management",
              desc: "Roles, access & control",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500, marginTop: 2 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ═══════════════ DASHBOARD PREVIEW SECTION ═══════════════ */}
      <section style={{ padding: "20px 6% 60px 6%", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ color: "#16A34A", fontSize: 13, fontWeight: 800, marginBottom: 12 }}>
            Explore Services
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: "#111827", lineHeight: 1.15, marginBottom: 10, letterSpacing: "-1.2px" }}>
            Scale Your Business with <span style={{ color: "#16A34A" }}>MessBee's</span> Powerful<br />WhatsApp API Platform
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#475569", marginBottom: 0, fontWeight: 600 }}>
            Everything your business need
          </p>

          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB", background: "#F8FAFC", padding: 12, width: "100%", maxWidth: 1000, margin: "0 auto", transform: "scale(0.75)", transformOrigin: "top center", marginBottom: "-140px" }}>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E2E8F0", background: "#FFF", display: "flex", flexDirection: "column" }}>
              {/* Browser bar */}
              <div style={{ background: "#F8FAFC", padding: "12px 16px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 6, width: 60 }}>
                  {["#FF6B6B", "#FFD93D", "#6BCB77"].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ background: "#E5E7EB", borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "#94A3B8", textAlign: "center", width: 300 }}>
                  app.messbee.com/dashboard
                </div>
                <div style={{ width: 60 }}></div>
              </div>
              {/* Handcoded Messbee Dashboard UI */}
              <div style={{ background: "#FFFFFF", display: "flex", flexDirection: "column", height: 480, borderTop: "1px solid #E5E7EB" }}>
                {/* Dashboard Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid #E5E7EB" }}>
                  {/* Left: Logo */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, background: "#16A34A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFF"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.21.72 4.25 1.93 5.88L3 22l4.12-.93C8.75 22.28 10.79 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.04-.37-4.33-1.02l-2.61.59.59-2.61C4.37 15.04 4 13.57 4 12 4 7.58 7.58 4 12 4s8 3.58 8 8-3.58 8-8 8zm3.5-6.5c-.38 1.13-1.5 2-2.5 2h-2c-1.13 0-2.25-.87-2.62-2l-1.38-4H8.5c1.13 0 2.25.87 2.62 2l1.38 4h2.5z" /></svg>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>MessBee</span>
                  </div>

                  {/* Middle: Search */}
                  <div style={{ background: "#F1F5F9", borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, width: 320 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <span style={{ fontSize: 12, color: "#94A3B8" }}>Search conversations, contacts...</span>
                  </div>

                  {/* Right: Actions & Profile */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ background: "#F0FDF4", padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6, border: "1px solid #DCFCE7" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#059669", letterSpacing: "0.5px" }}>API STATUS</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#16A34A" }}>Online</span>
                      </div>
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "4px 12px", borderRadius: 20, display: "flex", alignItems: "center", border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#64748B", letterSpacing: "0.5px" }}>CREDITS</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#0F172A" }}>₹618.51</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#64748B", paddingLeft: 8 }}>
                      <div style={{ position: "relative" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                        <div style={{ position: "absolute", top: 0, right: 2, width: 6, height: 6, background: "#EF4444", borderRadius: "50%" }} />
                      </div>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 8, borderLeft: "1px solid #E2E8F0" }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E2E8F0", overflow: "hidden" }}>
                        <img src={indianAvatar} alt="user" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>Admission Anytime</span>
                        <span style={{ fontSize: 9, color: "#64748B", fontWeight: 500 }}>9910700008</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                  {/* Left Sidebar */}
                  <div style={{ width: 220, borderRight: "1px solid #E5E7EB", padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto", flexShrink: 0 }}>
                    <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12, border: "1px solid #E2E8F0" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>Search</span>
                    </div>

                    {[
                      { icon: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />, label: "Home" },
                      { icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />, label: "Chats", active: true, badge: "10+" },
                      { icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: "Contacts & CRM", arrow: true },
                      { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>, label: "Templates", arrow: true },
                      { icon: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>, label: "Campaign" },
                      { icon: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>, label: "Commerce", arrow: true },
                      { icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>, label: "Automation" },
                      { icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>, label: "Analytics", arrow: true },
                      { icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>, label: "Developer API" },
                      { icon: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>, label: "App Integration" },
                      { icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>, label: "Settings", arrow: true },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: "8px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: item.active ? "#F9FAFB" : "transparent" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {item.icon}
                        </svg>
                        <span style={{ fontSize: 12, fontWeight: 600, color: item.active ? "#0F172A" : "#64748B", flex: 1 }}>{item.label}</span>
                        {item.badge && (
                          <div style={{ background: "#16A34A", color: "#FFF", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>{item.badge}</div>
                        )}
                        {item.arrow && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        )}
                      </div>
                    ))}

                    <div style={{ padding: "8px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginTop: "auto", color: "#EF4444" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Logout</span>
                    </div>
                  </div>

                  {/* Main Canvas */}
                  <div style={{ flex: 1, background: "#F8FAFC", padding: "24px", overflowY: "auto" }}>

                    {/* Top Card */}
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px", marginBottom: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Admission Anytime</span>
                              <span style={{ fontSize: 9, fontWeight: 700, color: "#64748B", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4 }}>OFFICIAL API</span>
                            </div>
                            <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>+91 1202611111</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <button style={{ background: "#0F172A", color: "#FFF", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Update Profile</button>
                          <button style={{ background: "#FFF", color: "#374151", border: "1px solid #E2E8F0", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>
                            Sync Data
                          </button>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.5px", marginBottom: 6 }}>MESSAGE LIMIT TIER</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>10,000 <span style={{ fontSize: 12, fontWeight: 500, color: "#64748B" }}>/ day</span></div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.5px", marginBottom: 6 }}>QUALITY SCORE</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#16A34A", display: "flex", alignItems: "center", gap: 6 }}>
                            High <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.5px", marginBottom: 6 }}>CONNECTION STATUS</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", display: "flex", alignItems: "center", gap: 6 }}>
                            Connected <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

                      {/* Available Balance */}
                      <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.5px" }}>AVAILABLE BALANCE</div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" ry="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", letterSpacing: "-1px" }}>₹618.51</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: "#16A34A" }} /> Auto-recharge on</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 24 }}>Estimated 14 days of usage remaining based on current volume</div>

                        <div style={{ display: "flex", gap: 12 }}>
                          <button style={{ flex: 1, background: "#0F172A", color: "#FFF", border: "none", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Add Credit</button>
                          <button style={{ background: "#FFF", color: "#374151", border: "1px solid #E2E8F0", padding: "10px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Statement</button>
                        </div>
                      </div>

                      {/* Active Subscription */}
                      <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.5px" }}>ACTIVE SUBSCRIPTION</div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "#64748B", background: "#F1F5F9", padding: "4px 8px", borderRadius: 4 }}>ENTERPRISE PLAN</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                          <span style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", letterSpacing: "-1px" }}>76 Days</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#94A3B8" }}>remaining</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 24 }}>Next billing cycle starts April 28, 2026</div>

                        <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2, marginBottom: 24, overflow: "hidden" }}>
                          <div style={{ width: "70%", height: "100%", background: "#0F172A", borderRadius: 2 }} />
                        </div>

                        <button style={{ width: "100%", background: "#FFF", color: "#374151", border: "1px solid #E2E8F0", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Manage Subscription</button>
                      </div>

                    </div>

                    {/* Bottom Card */}
                    <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Performance Overview</div>
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>Showing data for <span style={{ fontWeight: 600, color: "#475569" }}>Today</span></div>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #E2E8F0", padding: "6px 12px", borderRadius: 6 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>March 17, 2026</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 16, borderTop: "1px solid #F1F5F9", paddingTop: 16 }}>
                        {["TOTAL CHATS", "UNREAD", "OPEN CASES", "FAILED", "FREE TIER", "AGENTS"].map(title => (
                          <div key={title} style={{ fontSize: 9, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.5px" }}>{title}</div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUSTED PILL & COMPARISON SECTION ═══════════════ */}
      <section style={{ padding: "0px 6% 80px", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Trusted Pill */}
          <div style={{ background: "#e8faee", borderRadius: 12, padding: "24px 60px", marginBottom: 80, border: "1px solid #C8E6C9", width: "calc(100% + 6vw)", marginLeft: "-3vw" }}>
            <div style={{ fontSize: 9, fontWeight: 400, color: "#4A5568", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>
              Trusted by 35,000+ Growing Businesses
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 90, flexWrap: "wrap", width: "100%" }}>
              {["META", "RAZORPAY", "GOOGLE", "SHIPROCKET", "ZAPIER", "SHOPIFY"].map((brand) => (
                <span key={brand} style={{ fontSize: 14, fontWeight: 800, color: "black", letterSpacing: "0.5px" }}>{brand}</span>
              ))}
            </div>
          </div>

          {/* VS Title */}
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 600, color: "#0F172A", marginBottom: 16, letterSpacing: "normal" }}>
            Marketplace <span style={{ color: "#16A34A" }}>vs</span> Messbee
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#94A3B8", fontWeight: 400, marginBottom: 56 }}>
            Stop renting your business. Start owning your future.
          </p>

          {/* Comparison Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, textAlign: "left", maxWidth: 1150, margin: "0 auto" }}>
            {/* Left Card - Traditional */}
            <div style={{ background: "#ebebeb", borderRadius: 24, padding: "36px 28px", border: "1px solid #dcfce7" }}>
              <h3 style={{ fontSize: 21, fontWeight: 700, color: "#64748B", marginBottom: 24 }}>Traditional Marketplaces</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  "High Commissions (up to 30%)",
                  "No Customer Data Access",
                  "Competing with your own products"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 400, color: "#dc2626" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card - Messbee */}
            <div style={{ background: "#0B1521", borderRadius: 24, padding: "36px 28px", border: "2px solid #16A34A", position: "relative", boxShadow: "0 20px 40px rgba(0, 200, 83, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <h3 style={{ fontSize: 21, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Messbee Operating System</h3>
                <div style={{ background: "#059669", color: "#FFFFFF", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                  RECOMMENDED
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  "0% Transaction Commission",
                  "Complete CRM & Data Control",
                  "Direct-to-Consumer Growth"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 10 11 15 8 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 400, color: "#CBD5E1" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AI POWERED BUSINESS SECTION ═══════════════ */}
      <section style={{ padding: "18px 0", background: "#FFFFFF", overflow: "visible" }}>
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1.2fr 0.65fr", gap: 60, alignItems: "stretch" }}>

          {/* Left Column - Content wrapper pushes the card to the bottom */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {/* The card itself is set to ~74% of the container height (which matches the image height), so it stays aligned at all sizes */}
            <div style={{ background: "linear-gradient(135deg, #E6E4DD 0%, #C4C4C4 100%)", borderRadius: "0 100px 0 0", padding: "4% 8% 5% 2%", display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "74%" }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 800, color: "#0F172A", marginBottom: "2%", letterSpacing: "-1px" }}>
                <span style={{ color: "#10B981" }}>AI</span> Powered Business
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(16px, 1.8vw, 20px)", color: "#334155", lineHeight: 1.5, marginBottom: "4%", fontWeight: 400, maxWidth: 600 }}>
                Imagine an employee who never sleeps, never makes mistakes, and grows smarter every day.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginLeft: "6%" }}>
                {[
                  "Reply instantly", "Sell products",
                  "Recommend products", "Collect payments",
                  "Book appointments", "Recover abandoned carts",
                  "Answer FAQs", "Generate reports"
                ].map((item, i) => (
                  <div key={i} style={{ background: "#e8faee", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 600, color: "#0F172A" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Robot Image: bottom-aligned so grey area matches card height, head overflows above */}
          <div style={{ display: "flex", alignItems: "flex-end", overflow: "visible" }}>
            <img src={aiRobot} alt="AI Assistant Robot" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ═══════════════ BROWSE BY CATEGORY SECTION ═══════════════ */}
      <section style={{ padding: "40px 6% 50px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", marginBottom: 12 }}>
              Explore Services
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 600, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Browse by <span style={{ color: "#10B981" }}>Category</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>
              Everything your business need
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                ), title: "CRM", desc: "Intelligent contact profiles and relationship management at scale."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                ), title: "WhatsApp Commerce", desc: "Sell, support, and engage customers directly on WhatsApp."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                ), title: "Digital Store", desc: "Launch a branded online storefront in minutes — no code needed."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
                ), title: "AI Assistant", desc: "Your 24/7 sales rep that never sleeps and never misses a lead."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ), title: "Loyalty Program", desc: "Points, rewards, and referrals that retain your best customers."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                ), title: "Marketing Automation", desc: "Trigger campaigns that convert at exactly the right moment."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                ), title: "Inventory", desc: "Track stock across all locations with real-time low-stock alerts."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                ), title: "Orders", desc: "Unified order management from every sales channel in one view."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                ), title: "Payments", desc: "Accept UPI, cards, wallets, and BNPL with one-click checkout."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                ), title: "Analytics", desc: "Business intelligence dashboards built for action, not vanity."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                ), title: "Customer Journey", desc: "Map and optimize every touchpoint across the full lifecycle."
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                ), title: "Team Management", desc: "Roles, permissions, and performance tracking at any scale."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "#247844", borderRadius: 16, padding: "18px 20px", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: 12, transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <div style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button 
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#16A34A", color: "#FFFFFF", padding: "12px 32px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
            >
              More
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS SECTION ═══════════════ */}
      <section id="how-it-works" style={{ padding: "0 0 50px", background: "radial-gradient(circle at 25% 50%, #FDF0D5 0%, #F4F5F7 50%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 6%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Left - Image side */}
          <div style={{ position: "relative", width: "65%", margin: "0 auto" }}>
            <div style={{ overflow: "hidden", mixBlendMode: "multiply" }}>
              <img src={howItWorksPerson} alt="Person working on laptop" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", filter: "contrast(1.15) brightness(1.1)" }} />
            </div>

            {/* Badges and Decorations */}
            <svg width="32" height="32" viewBox="0 0 100 100" style={{ position: "absolute", top: "10%", left: "5%", zIndex: 10, pointerEvents: "none" }}>
              <path d="M15 35 Q22 35 22 42 Q22 35 29 35 Q22 35 22 28 Q22 35 15 35 Z" fill="#111827" />
              <path d="M75 40 Q80 40 80 45 Q80 40 85 40 Q80 40 80 35 Q80 40 75 40 Z" fill="#111827" />
              <path d="M30 65 Q35 65 35 70 Q35 65 40 65 Q35 65 35 60 Q35 65 30 65 Z" fill="#111827" />
              <path d="M50 15 Q55 15 55 20 Q55 15 60 15 Q55 15 55 10 Q55 15 50 15 Z" fill="#111827" />
              
              <g transform="rotate(25 50 50)" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35 45 C35 20, 65 20, 65 45 C65 58, 55 62, 55 72 L45 72 C45 62, 35 58, 35 45 Z" />
                <path d="M45 72 L55 72 M46 78 L54 78 M47 84 L53 84" />
                <path d="M45 72 L48 55 C46 51, 54 51, 52 55 L55 72" />
              </g>
            </svg>
            
            <svg width="36" height="36" viewBox="0 0 100 100" style={{ position: "absolute", top: "18%", right: "22%", zIndex: 10, pointerEvents: "none" }}>
              <g transform="rotate(25 50 50)" fill="none" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="25" y="45" width="50" height="32" rx="2" />
                <polygon points="45,53 45,67 57,60" fill="#111827" />
                <polygon points="25,40 75,40 80,30 30,30" />
                <line x1="40" y1="30" x2="35" y2="40" />
                <line x1="55" y1="30" x2="50" y2="40" />
                <line x1="70" y1="30" x2="65" y2="40" />
              </g>
            </svg>
            <div style={{ position: "absolute", top: "25%", left: "-20%", background: "#FFFFFF", padding: "8px 14px", borderRadius: 24, fontSize: 11, fontWeight: 600, color: "#1E293B", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", zIndex: 11 }}>
              100% ready for business
            </div>
            <div style={{ position: "absolute", top: "15%", right: "-10%", background: "#FFFFFF", padding: "8px 14px", borderRadius: 24, fontSize: 11, fontWeight: 600, color: "#1E293B", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
              Global Available
            </div>
            <div style={{ position: "absolute", top: "60%", left: "-10%", background: "#FFFFFF", padding: "8px 14px", borderRadius: 24, fontSize: 11, fontWeight: 600, color: "#1E293B", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
              Secure System
            </div>
          </div>

          {/* Right - Text and steps */}
          <div style={{ paddingTop: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Simple Processs
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              How It <span style={{ color: "#10B981" }}>Works</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B", marginBottom: 32 }}>
              Get your project done in 4 simple step
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
              {/* Vertical connecting line */}
              <div style={{ position: "absolute", left: 14, top: 30, bottom: 30, width: 2, background: "#10B981" }}></div>

              {[
                { num: "01", title: "Create Account", desc: "Sign up for free and complete your profile" },
                { num: "02", title: "Post a Products", desc: "Describe your project and lets talented freelancer bids" },
                { num: "03", title: "Review", desc: "Compare Proposal, API Chat with and hire the best" },
                { num: "04", title: "Get Work Done", desc: "Track Progress, and release payment securely" }
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#10B981", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 500, color: "#111827", marginBottom: 2 }}>{step.title}</h4>
                    <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ marginTop: 24, background: "#10B981", color: "#FFFFFF", padding: "8px 16px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Get Started Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US SECTION ═══════════════ */}
      <section style={{ padding: "30px 0", background: "#0A0A0A", position: "relative", overflow: "hidden" }}>

        {/* Map Background Pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#6B5A42",
          WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          maskSize: "cover",
          maskPosition: "center",
          opacity: 0.25,
          zIndex: 0
        }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "30px solid #FFFFFF", zIndex: 0 }}></div>
        <div style={{ position: "absolute", top: 30, right: -80, width: 240, height: 240, borderRadius: "50%", border: "50px solid #FFFFFF", zIndex: 0 }}></div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 6%", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, position: "relative", zIndex: 1, alignItems: "center" }}>

          {/* Left - Content */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginBottom: 20, letterSpacing: "-0.5px" }}>
              Why Should You <span style={{ color: "#16A34A" }}>Choose Us</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><path d="M12 8v14" /><path d="M5 12h14" /></svg>, title: "AI Powered", desc: "Automate conversations with intelligent AI assistance." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: "No Coding", desc: "Create workflows easily without writing any code." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: "Secure", desc: "Enterprise-grade security keeps your data protected." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>, title: "Cloud Based", desc: "Access your account anytime from anywhere." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Multi-user", desc: "Collaborate with your team using multiple user accounts." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, title: "Multi-location", desc: "Manage multiple business locations from one platform." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: "API Ready", desc: "Easily integrate with your existing tools and systems." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>, title: "Mobile Friendly", desc: "Manage your business seamlessly on any device." },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /></svg>, title: "Enterprise Grade", desc: "Built to scale with powerful features for growing businesses." },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "10%", background: "#16A34A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 2 }}>{item.title}</h4>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Woman Image */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "visible" }}>
            <img src={chooseUsWoman} alt="Professional woman with laptop" style={{
              width: "85%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transform: "translateX(40px)",
              mixBlendMode: "screen",
              filter: "brightness(1.1) contrast(1.05)"
            }} />
          </div>

        </div>
      </section>

      {/* ═══════════════ MADE ON SECTION ═══════════════ */}
      <section style={{ padding: "40px 6% 100px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Work
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Made on <span style={{ color: "#10B981" }}>Eventlancer</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Designed for professionals who deliver excellence.
            </p>
          </div>

          {/* Dark Background Container for Image Gallery */}
          <div style={{ background: "#0D0D0D", borderRadius: 10, padding: "10px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { title: "Kirana Store", desc: "Manage orders, send offers and update customers instantly.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>, bgImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800", color: "#4CAF50", cols: 3 },
                { title: "Restaurant", desc: "Take reservations, share menus and handle customer queries.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>, bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", color: "#FF9800", cols: 3 },
                { title: "Pharmacy", desc: "Send medicine reminders, offers and order updates.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, bgImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=800", color: "#00BCD4", cols: 3 },
                { title: "Boutique", desc: "Showcase new arrivals, send offers and manage customer chats.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>, bgImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800", color: "#E91E63", cols: 3 },
                { title: "Gym", desc: "Share workout plans, class schedules and membership updates.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>, bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800", color: "#9C27B0", cols: 3 },
                { title: "Coaching", desc: "Share study materials, schedules and important announcements.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>, bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800", color: "#2196F3", cols: 3 },
                { title: "Clinic", desc: "Manage appointments, send reminders and follow up with patients.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800", color: "#009688", cols: 4 },
                { title: "Automobile", desc: "Share offers, service reminders and booking confirmations.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M3 11l2.5-6h13l2.5 6" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></svg>, bgImage: "https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=800", color: "#1976D2", cols: 4 },
                { title: "Distributor", desc: "Track orders, share updates and manage retailer communication.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>, bgImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800", color: "#FF5722", cols: 4 },
                { title: "Manufacturer", desc: "Manage inquiries, bulk orders and support with ease.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /></svg>, bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", color: "#4CAF50", cols: 4 }
              ].map((item, idx) => (
                <div key={idx} style={{
                  width: `calc(${100 / item.cols}% - ${16 * (item.cols - 1) / item.cols}px)`,
                  height: 180,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}>
                  {/* Background Image */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.5s ease"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                  {/* Dark Gradient Overlay for text readability */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)" }} />

                  {/* Content */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                    {/* Icon */}
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", marginBottom: 12 }}>
                      {item.icon}
                    </div>

                    {/* Text */}
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, maxWidth: "90%" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS SECTION ═══════════════ */}
      <section style={{ padding: "20px 6% 40px", background: "radial-gradient(ellipse at top, #FFF7E3 0%, #FFFFFF 50%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Testimonials
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Trusted by Event <span style={{ color: "#10B981" }}>Professionals</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Stories from creators and organisers who build events with Event business.
            </p>
          </div>

          {/* Video Testimonial Banner Card */}
          <VideoBanner />

          {/* Testimonial Cards Carousel (3 Unique Indian Reviews, Compact Height) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", padding: "10px 20px", position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)", boxSizing: "border-box" }}>

            {[
              {
                name: "Rajesh Sharma",
                role: "Founder, KiranaFresh",
                rating: "5.0",
                image: reviewerRajesh,
                review: "MessBee's WhatsApp API changed the game for our daily orders! Automated broadcasts & payment links helped us scale sales by 35% smoothly.",
                featured: false
              },
              {
                name: "Priya Patel",
                role: "Owner, StyleBoutique Jaipur",
                rating: "5.0",
                image: reviewerPriya,
                review: "MessBee went above and beyond our expectations! Customer support and automated catalog sharing on WhatsApp helped us convert leads instantly.",
                featured: true
              },
              {
                name: "Amit Verma",
                role: "Director, Apex Health Clinic",
                rating: "5.0",
                image: reviewerAmit,
                review: "Sending report updates & appointment reminders on WhatsApp has reduced no-shows by 80%. MessBee is super easy to manage for our team.",
                featured: false
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                flex: "0 0 auto",
                width: item.featured ? 480 : 420,
                margin: "0 12px",
                background: item.featured ? "linear-gradient(135deg, #FFE492 0%, #FFFFFF 65%)" : "linear-gradient(135deg, #FFFDEB 0%, #FFFFFF 80%)",
                borderRadius: 20,
                padding: item.featured ? "20px 24px" : "16px 20px",
                boxShadow: item.featured ? "0 16px 36px rgba(0,0,0,0.08)" : "0 6px 20px rgba(0,0,0,0.03)",
                transform: idx === 0 ? "scale(0.88) translateY(6px) translateX(30px)" : idx === 2 ? "scale(0.88) translateY(6px) translateX(-30px)" : "scale(1) translateY(0)",
                opacity: item.featured ? 1 : 0.65,
                zIndex: item.featured ? 10 : 1,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid rgba(0,0,0,0.06)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  {/* Big Quote Icon */}
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Rating */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4A5568", fontSize: 13, fontWeight: 700 }}>
                    {item.rating}
                    <div style={{ display: "flex", color: "#4A5568" }}>
                      {[1, 2, 3, 4, 5].map(star => <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>)}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: item.featured ? 14.5 : 13.5, color: "#4A5568", lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>
                  "{item.review}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #FFF", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>{item.name}</div>
                    <div style={{ color: "#4A5568", fontSize: 13, fontWeight: 500 }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════ NEWSLETTER SECTION ═══════════════ */}
      <section style={{ padding: "100px 6%", background: "#1F1D1B", position: "relative", overflow: "hidden" }}>
        {/* Map Background Pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#6B5A42",
          WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
          maskSize: "cover",
          maskPosition: "center",
          opacity: 0.35,
          zIndex: 0
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
            Subscribe To Your <span style={{ color: "#16A34A" }}>Newsletter</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 40, padding: "0 20px" }}>
            Subscribe to our newsletter and stay ahead with the latest Business projects, expert tips, and exclusive platform updates. Join thousands of businesses today and get opportunities delivered straight to your inbox every week!
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <input
              type="email"
              placeholder="Enter Your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{ width: "100%", maxWidth: 460, padding: "12px 20px", borderRadius: 8, border: "none", outline: "none", fontSize: 14 }}
            />
            {newsletterStatus && (
              <div style={{ color: newsletterStatus.type === "success" ? "#16A34A" : "#EF4444", fontSize: 14, fontWeight: 600 }}>
                {newsletterStatus.message}
              </div>
            )}
            <button onClick={handleNewsletterSubmit} style={{ background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "12px 36px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = "#00A844"} onMouseLeave={e => e.currentTarget.style.background = "#16A34A"}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
};

export default LandingPage;
