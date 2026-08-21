import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { submitToWebhookOrEmail } from "../utils/formSubmit";
import defaultLogo from "../assets/logo.jpeg";
import heroDashboard from "../assets/hero-messscale.png";
import howItWorksPerson from "../assets/how_it_works_person.jpg";
import chooseUsWoman from "../assets/messgirl.png";
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
        poster="/videomess.png"
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
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonialsList = [
    {
      name: "Rajesh Sharma",
      role: "Founder, KiranaFresh",
      rating: "5.0",
      image: reviewerRajesh,
      review: "MessBee's WhatsApp API changed the game for our daily orders! Automated broadcasts & payment links helped us scale smoothly."
    },
    {
      name: "Priya Patel",
      role: "Owner, StyleBoutique Jaipur",
      rating: "5.0",
      image: reviewerPriya,
      review: "Instant customer lead capture and automated catalog sharing on WhatsApp helped us convert inquiries into real sales effortlessly."
    },
    {
      name: "Amit Verma",
      role: "Director, Apex Health Clinic",
      rating: "5.0",
      image: reviewerAmit,
      review: "Sending report updates & appointment reminders on WhatsApp reduced no-shows by 80%. Super easy to manage for our team."
    },
    {
      name: "Vikram Malhotra",
      role: "Co-Founder, Malhotra Electronics",
      rating: "5.0",
      image: indianAvatar,
      review: "The WhatsApp broadcasting tool helped us announce festival sales with a 98% open rate. Website lead generation went 3x higher!"
    },
    {
      name: "Sneha Gupta",
      role: "Founder, Organic Bites D2C",
      rating: "5.0",
      image: reviewerPriya,
      review: "MessBee's automated cart recovery brought back 30% of lost shoppers on WhatsApp. It's like an extra sales rep working 24/7."
    },
    {
      name: "Rohan Desai",
      role: "Operations Head, QuickRetail",
      rating: "5.0",
      image: reviewerRajesh,
      review: "Instant WhatsApp order confirmation and UPI payment collection doubled our customer satisfaction score within weeks."
    }
  ];

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialsList.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isTestimonialHovered, testimonialsList.length]);

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await submitToWebhookOrEmail("newsletter", { email: newsletterEmail });
      setNewsletterStatus({ type: "success", message: "Thank you for subscribing! You're now on our mailing list." });
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus({ type: "success", message: "Thank you for subscribing! You're now on our mailing list." });
      setNewsletterEmail("");
    } finally {
      setNewsletterLoading(false);
    }
    setTimeout(() => setNewsletterStatus(null), 4000);
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
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <Navbar />

      {/* ═══════════════ RESPONSIVE CSS ═══════════════ */}
      <style>{`
        .lp-hero-row { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 4vw; width: 100%; max-width: 1280px; margin: 0 auto; }
        .lp-hero-left { flex: 1 1 500px; min-width: 300px; }
        .lp-hero-right { flex: 1.1 1 460px; min-width: 320px; display: flex; flex-direction: column; align-items: center; position: relative; }
        .lp-hero-badge { position: absolute; background: #FFFFFF; border-radius: 30px; padding: 5px 12px; display: flex; align-items: center; gap: 6px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #F1F5F9; z-index: 10; }
        .lp-hiw-badge { position: absolute; background: #FFFFFF; padding: 8px 14px; border-radius: 24px; font-size: 11px; font-weight: 600; color: #1E293B; box-shadow: 0 4px 15px rgba(0,0,0,0.08); z-index: 11; }
        .lp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; text-align: left; max-width: 1200px; margin: 0 auto; }
        .lp-ai-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: stretch; }
        .lp-hiw-grid { max-width: 1280px; margin: 0 auto; padding: 0 6%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .lp-choose-grid { max-width: 1280px; margin: 0 auto; padding: 0 6%; display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; position: relative; z-index: 1; align-items: center; }
        .lp-choose-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
        .lp-testimonial-grid { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 16px; align-items: center; }
        .lp-industry-flex { display: flex; flex-wrap: wrap; gap: 16px; }
        .lp-meta-badge { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .lp-meta-badge span { font-size: 14px; }
        .lp-hero-btns { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .lp-nav-arrow-left { position: absolute; left: -24px; }
        .lp-nav-arrow-right { position: absolute; right: -24px; }
        .lp-hiw-img-col { position: relative; width: 65%; margin: 0 auto; }

        @media (max-width: 900px) {
          .lp-hero-row { flex-direction: column; gap: 24px; }
          .lp-hero-left { flex: 1 1 100%; min-width: unset; }
          .lp-hero-right { flex: 1 1 100%; min-width: unset; }
          .lp-ai-grid { grid-template-columns: 1fr !important; }
          .lp-compare-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .lp-hiw-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lp-hiw-img-col { width: 80% !important; }
          .lp-choose-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lp-choose-deco { display: none !important; }
          .lp-testimonial-grid { grid-template-columns: 1fr !important; }
          .lp-testimonial-side { display: none !important; }
          .lp-nav-arrow-left { left: -8px !important; }
          .lp-nav-arrow-right { right: -8px !important; }
        }

        @media (max-width: 768px) {
          .lp-hero-section { padding: 80px 4% 32px !important; }
          .lp-hero-right { display: flex !important; width: 100% !important; margin-top: 18px !important; align-items: center !important; justify-content: center !important; padding: 0 8px !important; }
          .lp-hero-mockup-wrap { width: 100% !important; max-width: 520px !important; transform: none !important; margin-bottom: 0 !important; }
          .lp-hero-viewport { min-height: auto !important; }
          .lp-hero-sidebar { width: 34px !important; padding: 6px 2px !important; gap: 6px !important; }
          .lp-hero-canvas { padding: 6px 8px !important; gap: 5px !important; }
          .lp-hero-top-row { gap: 6px !important; }
          .lp-hero-top-row > div { padding: 4px 6px !important; }
          .lp-hero-mid-row { padding: 4px 8px !important; }
          .lp-hero-chart { height: 22px !important; }
          .lp-hero-bottom-row { gap: 6px !important; }
          .lp-hero-bottom-row > div { padding: 4px 8px !important; }
          .lp-hero-badge { display: flex !important; padding: 3px 6px !important; font-size: 9px !important; z-index: 12 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; }
          .lp-hero-badge span { font-size: 8.5px !important; }
          .lp-badge-wa   { left: -14px !important; top: 18px !important; }
          .lp-badge-api  { left: -18px !important; top: 85px !important; }
          .lp-badge-rzp  { left: -14px !important; bottom: 50px !important; }
          .lp-badge-ship { right: -14px !important; top: 20px !important; }
          .lp-badge-goog { right: -12px !important; top: 90px !important; }
          .lp-badge-ondc { right: -12px !important; bottom: 55px !important; }
          .lp-compare-card-pad { padding: 24px 20px !important; }
          .lp-newsletter-section { padding: 60px 5% !important; }
          .lp-choose-inner { grid-template-columns: 1fr !important; gap: 12px !important; }
          .lp-choose-img { max-height: 320px; overflow: hidden; justify-content: center !important; }
          .lp-choose-img img { max-height: 320px; object-fit: contain; width: auto !important; transform: none !important; }
          .lp-industry-item { width: calc(50% - 8px) !important; height: 140px !important; }
          .lp-meta-badge span { font-size: 12px !important; }
          .lp-hero-btns { gap: 10px; }
        }

        @media (max-width: 480px) {
          .lp-hero-section { padding: 70px 3% 24px !important; }
          .lp-hero-mockup-wrap { max-width: 100% !important; }
          .lp-hero-top-row > div { padding: 3px 4px !important; }
          .lp-badge-wa   { left: -8px !important; top: 14px !important; }
          .lp-badge-api  { left: -12px !important; top: 75px !important; }
          .lp-badge-rzp  { left: -8px !important; bottom: 40px !important; }
          .lp-badge-ship { right: -8px !important; top: 16px !important; }
          .lp-badge-goog { right: -6px !important; top: 80px !important; }
          .lp-badge-ondc { right: -6px !important; bottom: 45px !important; }
          .lp-industry-item { width: 100% !important; height: 130px !important; }
          .lp-testimonial-grid { gap: 0 !important; }
          .lp-newsletter-section { padding: 40px 4% !important; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="lp-hero-section" style={{ background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 6% 40px", overflow: "hidden" }}>
        <div className="lp-hero-row">
          {/* Left content */}
          <div className="lp-hero-left">
            <div className="lp-meta-badge" style={{ marginBottom: 28, flexWrap: "wrap" }}>
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
                 whiteSpace: "normal",
                 flexWrap: "wrap"
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
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#111827", fontWeight: 800, marginBottom: 24, wordBreak: "break-word", overflowWrap: "break-word" }}>
              Broadcast Smarter. Automate Faster. <span style={{ color: "#16A34A" }}>Grow Without Limits.</span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#4B5563", lineHeight: 1.6, marginBottom: 40, maxWidth: 480, fontWeight: 500 }}>
              MessBee is India's comprehensive Digital Business Operating System, powered by the Official WhatsApp Business API. We help businesses connect with customers at scale through WhatsApp Broadcasting, automated messaging, customer engagement, sales workflows, payments and AI-powered business automation all from one unified platform.
            </p>

            <div className="lp-hero-btns">
              <button onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Get Started</button>
              <button onClick={() => navigate("/book-demo")} style={{ background: "#111827", color: "#FFF", border: "none", borderRadius: 40, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                Book Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div>

          {/* Right: Pixel-Perfect Crisp Dashboard UI Mockup */}
          <div className="lp-hero-right">
            {/* Value / Capability Pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", borderRadius: 40, padding: "5px 14px", marginBottom: "16px", zIndex: 2, border: "1px solid #DCFCE7", boxShadow: "0 2px 6px rgba(22, 163, 74, 0.08)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#16A34A" }}>⚡ AI-Powered Lead Generation & Growth Engine</span>
            </div>

            {/* Dashboard Container with Floating Integration Badges */}
            <div className="lp-hero-mockup-wrap" style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              
              {/* Floating Badge: WhatsApp */}
              <div className="lp-hero-badge lp-badge-wa" style={{ left: -48, top: 32 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>WhatsApp</span>
              </div>

              {/* Floating Badge: API Ready */}
              <div className="lp-hero-badge lp-badge-api" style={{ left: -54, top: 125 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EC4899" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>API Ready</span>
              </div>

              {/* Floating Badge: Razorpay */}
              <div className="lp-hero-badge lp-badge-rzp" style={{ left: -50, bottom: 95 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>Razorpay</span>
              </div>

              {/* Floating Badge: Shiprocket */}
              <div className="lp-hero-badge lp-badge-ship" style={{ right: -48, top: 35 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>Shiprocket</span>
              </div>

              {/* Floating Badge: Google */}
              <div className="lp-hero-badge lp-badge-goog" style={{ right: -42, top: 130 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>Google</span>
              </div>

              {/* Floating Badge: ONDC */}
              <div className="lp-hero-badge lp-badge-ondc" style={{ right: -42, bottom: 100 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366F1" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B" }}>ONDC</span>
              </div>

              {/* Main Crisp Vector Dashboard Window */}
              <div style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                boxShadow: "0 20px 45px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}>
                
                {/* Browser Header Bar */}
                <div style={{
                  background: "#FFFFFF",
                  padding: "8px 14px",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F" }} />
                  </div>

                  <div style={{
                    background: "#F8FAFC",
                    borderRadius: 20,
                    padding: "3px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    border: "1px solid #E2E8F0",
                    width: 170,
                    justifyContent: "center"
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 500 }}>app.messbee.com</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10B981" }} />
                  </div>
                </div>

                {/* Dashboard Main Viewport */}
                <div className="lp-hero-viewport" style={{ display: "flex", background: "#F8FAFC", minHeight: 330 }}>
                  
                  {/* Left Dark Sidebar */}
                  <div className="lp-hero-sidebar" style={{
                    width: 42,
                    background: "#0F172A",
                    padding: "10px 4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0
                  }}>
                    {/* Active Apps Grid Icon */}
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                        <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>
                      </svg>
                    </div>

                    {/* Nav Icons */}
                    {[
                      <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>,
                      <path d="m21 16-9 5-9-5V8l9-5 9 5v8z"/>,
                      <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
                      <rect x="2" y="5" width="20" height="14" rx="2"/>,
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
                      <circle cx="12" cy="12" r="3"/>
                    ].map((icon, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
                        {icon}
                      </svg>
                    ))}
                  </div>

                  {/* Dashboard Content Canvas */}
                  <div className="lp-hero-canvas" style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 8 }}>
                    
                    {/* Top Row: 3 Business Value Cards */}
                    <div className="lp-hero-top-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0", padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>Lead Generation</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", margin: "1px 0" }}>Create Campaign</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>By Business Type</div>
                      </div>

                      <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0", padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>Broadcast</div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", margin: "1px 0" }}>Instant Reach</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>Offers & Catalog</div>
                      </div>

                      <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0", padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>Support</div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", margin: "1px 0" }}>100% Automated</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>24/7 AI Sales Rep</div>
                      </div>
                    </div>

                    {/* Middle Row: Business Growth Funnel */}
                    <div className="lp-hero-mid-row" style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0", padding: "8px 12px", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#334155" }}>Business Growth & Lead Funnel</span>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#16A34A", background: "#ECFDF5", padding: "1px 6px", borderRadius: 10, border: "1px solid #A7F3D0" }}>⚡ Active System</span>
                      </div>

                      {/* Vector SVG Trend Curve */}
                      <div className="lp-hero-chart" style={{ width: "100%", height: 36, position: "relative" }}>
                        <svg viewBox="0 0 400 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25"/>
                              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0"/>
                            </linearGradient>
                          </defs>
                          <path d="M0,45 C60,44 120,46 180,38 C240,30 300,24 400,10 L400,60 L0,60 Z" fill="url(#chartGrad)" />
                          <path d="M0,45 C60,44 120,46 180,38 C240,30 300,24 400,10" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Funnel Steps on X-Axis */}
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, color: "#64748B", fontWeight: 600, paddingTop: 2 }}>
                        <span>Capture Leads</span>
                        <span>Share Catalog</span>
                        <span>Auto Followup</span>
                        <span>Close Sales</span>
                        <span>Collect Payment</span>
                      </div>
                    </div>

                    {/* Bottom Row: Live Leads & AI Assistant */}
                    <div className="lp-hero-bottom-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr", gap: 8 }}>
                      
                      {/* Live Leads & Inquiries */}
                      <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", marginBottom: 1 }}>Live WhatsApp Leads</div>
                        {[
                          { action: "Website Inquiry", status: "Auto-Replied" },
                          { action: "Catalog View", status: "Followup Sent" },
                          { action: "Order Request", status: "Payment Ready" }
                        ].map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 8.5 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                              <span style={{ fontWeight: 600, color: "#334155" }}>{item.action}</span>
                            </div>
                            <span style={{ fontWeight: 700, color: "#16A34A", background: "#ECFDF5", padding: "1px 5px", borderRadius: 4 }}>{item.status}</span>
                          </div>
                        ))}
                      </div>

                      {/* AI Assistant Card (Dark) */}
                      <div style={{ background: "#0B132B", borderRadius: 10, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5, color: "#FFFFFF" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="7" height="7" viewBox="0 0 24 24" fill="#FFF"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <span style={{ fontSize: 9.5, fontWeight: 700 }}>AI Sales Assistant</span>
                          </div>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#10B981" }} />
                        </div>

                        {/* Prompt bubble */}
                        <div style={{ background: "#1E293B", borderRadius: 5, padding: "5px 7px", fontSize: 8, color: "#CBD5E1", lineHeight: 1.3 }}>
                          "How do I generate more leads today?"
                        </div>

                        {/* Reply bubble */}
                        <div style={{ background: "#064E3B", border: "1px solid #047857", borderRadius: 5, padding: "5px 7px", fontSize: 8, color: "#34D399", lineHeight: 1.3, fontWeight: 500 }}>
                          Run a broadcast to website visitors with your new catalog link.
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ EVERYTHING YOU NEED HEADING & FEATURES STRIP ═══════════════ */}
      <section style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", padding: "36px 4% 36px", textAlign: "center", boxShadow: "0 10px 30px rgba(22, 163, 74, 0.15)" }}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.5px", margin: "0 0 24px 0" }}>
          Everything You Need to Run and Grow Your Business
        </h2>

        <div style={{
          maxWidth: 1380,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "14px",
          alignItems: "stretch"
        }}>
          {[
            {
              title: "CRM",
              desc: "Manage relationships",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 4 4 4L8 19l-4-4L15 4z" />
                  <path d="m18 1 2 2" />
                  <path d="M20 7l2 2" />
                  <path d="M13 2l-1 2" />
                  <path d="M7 16l-3 3" />
                </svg>
              )
            },
            {
              title: "Orders",
              desc: "Manage orders seamlessly",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              )
            },
            {
              title: "Team Management",
              desc: "Roles, access & control",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#FFFFFF",
                padding: "12px 16px",
                borderRadius: 14,
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#F0FDF4",
                  boxShadow: "0 2px 6px rgba(22, 163, 74, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {item.icon}
              </div>
              <div style={{ textAlign: "left", minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 10.5, color: "#64748B", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PLATFORM PREVIEW & DASHBOARD SECTION ═══════════════ */}
      <section style={{ background: "#FFFFFF", padding: "40px 6% 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          
          <div style={{ color: "#16A34A", fontSize: 13, fontWeight: 800, marginBottom: 10, letterSpacing: "0.5px" }}>
            Explore Services
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.8px" }}>
            Scale Your Business with <span style={{ color: "#16A34A" }}>MessBee's</span> Powerful<br />WhatsApp API Platform
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B", marginBottom: 36, fontWeight: 500 }}>
            Everything your business needs to connect, engage and grow at scale.
          </p>

          {/* Desktop Dashboard Image */}
          <div style={{
            position: "relative",
            margin: "0 auto",
            width: "100%",
            maxWidth: 1040,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img
              src={heroDashboard}
              alt="MessBee WhatsApp API Platform"
              style={{
                width: "100%",
                maxWidth: 1040,
                height: "auto",
                borderRadius: 16,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                display: "block"
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ MARKETPLACE VS MESSBEE SECTION ═══════════════ */}
      <section style={{ padding: "20px 6% 60px", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* VS Title */}
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "#0F172A", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Marketplace <span style={{ color: "#16A34A" }}>vs</span> Messbee
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 2vw, 16px)", color: "#64748B", fontWeight: 500, marginBottom: 32 }}>
            Stop renting your business. Start owning your future.
          </p>

          {/* Comparison Cards */}
          <div className="lp-compare-grid">
            {/* Left Card - Traditional */}
            <div className="lp-compare-card-pad" style={{
              background: "#F8FAFC",
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#475569", marginBottom: 28 }}>Traditional Marketplaces</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    "High Commissions (up to 30%)",
                    "No Customer Data Access",
                    "Competing with your own products"
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                      <span style={{ fontSize: 15.5, fontWeight: 500, color: "#DC2626" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Messbee (Green Background) */}
            <div className="lp-compare-card-pad" style={{
              background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              position: "relative",
              boxShadow: "0 20px 40px rgba(22, 163, 74, 0.28)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>Messbee Operating System</h3>
                  <div style={{ background: "#FFFFFF", color: "#15803D", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", letterSpacing: "0.5px" }}>
                    RECOMMENDED
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    "0% Transaction Commission",
                    "Complete CRM & Data Control",
                    "Direct-to-Consumer Growth"
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span style={{ fontSize: 15.5, fontWeight: 600, color: "#FFFFFF" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AI POWERED BUSINESS SECTION ═══════════════ */}
      <section style={{ padding: "40px 5%", background: "#FFFFFF" }}>
        <div className="lp-ai-grid">

          {/* Left Column - Content Card */}
          <div style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            borderRadius: 24,
            padding: "30px 30px",
            color: "#FFFFFF",
            boxShadow: "0 18px 36px -12px rgba(15, 23, 42, 0.28)",
            border: "1px solid #334155",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.15)", borderRadius: 30, padding: "4px 12px", border: "1px solid rgba(16, 185, 129, 0.3)", width: "fit-content", marginBottom: 14 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#34D399", letterSpacing: "0.5px" }}>⚡ 24/7 AUTONOMOUS AI</span>
              </div>

              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 10, letterSpacing: "-0.6px", lineHeight: 1.15 }}>
                <span style={{ color: "#10B981" }}>AI</span> Powered Business
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12.5px, 1vw, 14px)", color: "#94A3B8", lineHeight: 1.5, marginBottom: 20, fontWeight: 400 }}>
                Imagine an employee who never sleeps, never makes mistakes, and grows smarter every day — driving sales, delighting customers, and running your operations on autopilot.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                "Reply instantly", "Sell products",
                "Recommend products", "Collect payments",
                "Book appointments", "Recover abandoned carts",
                "Answer FAQs", "Generate reports"
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: "#F1F5F9" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Robot Image Showcase Card (Equal Height) */}
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 18px 36px -12px rgba(15, 23, 42, 0.28)",
            border: "1px solid #1E293B",
            background: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            boxSizing: "border-box"
          }}>
            <img
              src="/messrobo.png"
              alt="AI Assistant Robot"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block"
              }}
            />
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
        <div className="lp-hiw-grid">

          {/* Left - Image side */}
          <div className="lp-hiw-img-col">
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
            <div className="lp-hiw-badge" style={{ top: "25%", left: "-20%", zIndex: 11 }}>
              100% ready for business
            </div>
            <div className="lp-hiw-badge" style={{ top: "15%", right: "-10%" }}>
              Global Available
            </div>
            <div className="lp-hiw-badge" style={{ top: "60%", left: "-10%" }}>
              Secure System
            </div>
          </div>

          {/* Right - Text and steps */}
          <div style={{ paddingTop: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Simple Process
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              How It <span style={{ color: "#10B981" }}>Works</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B", marginBottom: 32 }}>
              Get your business up and running in 4 simple steps
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
              {/* Vertical connecting line */}
              <div style={{ position: "absolute", left: 14, top: 30, bottom: 30, width: 2, background: "#10B981" }}></div>

              {[
                { num: "01", title: "Create Free Account", desc: "Sign up in 2 minutes with no credit card required" },
                { num: "02", title: "Connect WhatsApp API", desc: "Link your official WhatsApp Business API number easily" },
                { num: "03", title: "Launch Lead Generation & Campaigns", desc: "Capture leads, broadcast offers, and automate instant chat replies" },
                { num: "04", title: "Automate Sales & Get Paid", desc: "Track orders, collect payments securely via UPI/cards, and scale growth" }
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#10B981", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{step.title}</h4>
                    <p style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5 }}>{step.desc}</p>
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
        <div className="lp-choose-deco" style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "30px solid #FFFFFF", zIndex: 0 }}></div>
        <div className="lp-choose-deco" style={{ position: "absolute", top: 30, right: -80, width: 240, height: 240, borderRadius: "50%", border: "50px solid #FFFFFF", zIndex: 0 }}></div>

        <div className="lp-choose-grid">

          {/* Left - Content */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", marginBottom: 20, letterSpacing: "-0.5px" }}>
              Why Should You <span style={{ color: "#16A34A" }}>Choose Us</span>
            </h2>

            <div className="lp-choose-inner">
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
          <div className="lp-choose-img" style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "visible", position: "relative" }}>
            {/* Soft Warm / Yellow Ambient Glow */}
            <div style={{
              position: "absolute",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.36) 0%, rgba(217, 119, 6, 0.20) 42%, rgba(180, 83, 9, 0.08) 62%, rgba(0, 0, 0, 0) 78%)",
              top: "5%",
              right: "-5%",
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0
            }} />

            <img src={chooseUsWoman} alt="Professional woman with laptop" style={{
              width: "95%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transform: "translateX(20px)",
              filter: "brightness(1.18) contrast(1.05) drop-shadow(0 14px 40px rgba(0,0,0,0.6))",
              position: "relative",
              zIndex: 1
            }} />
          </div>

        </div>
      </section>

      {/* ═══════════════ MADE ON SECTION ═══════════════ */}
      <section style={{ padding: "40px 6% 100px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Industries
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Built For <span style={{ color: "#10B981" }}>Every Industry</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Empowering Indian businesses to generate leads, automate support and scale revenue.
            </p>
          </div>

          {/* Dark Background Container for Image Gallery */}
          <div style={{ background: "#0D0D0D", borderRadius: 10, padding: "10px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <div className="lp-industry-flex">
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
                <div key={idx} className="lp-industry-item" style={{
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
      <section style={{ padding: "20px 5% 50px", background: "radial-gradient(ellipse at top, #FFF7E3 0%, #FFFFFF 50%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#10B981", fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
              Success Stories
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#0F172A", marginBottom: 12, letterSpacing: "normal" }}>
              Built to Scale <span style={{ color: "#10B981" }}>Your Business</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#64748B" }}>
              Discover how modern businesses generate leads, automate support, and grow revenue on WhatsApp.
            </p>
          </div>

          {/* Video Testimonial Banner Card */}
          <div style={{ maxWidth: 1000, margin: "0 auto 32px" }}>
            <VideoBanner />
          </div>

          {/* Interactive 3-Card Center-Featured Testimonial Carousel */}
          <div 
            style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "20px 0" }}
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            {/* Left Nav Arrow Button */}
            <button
              onClick={() => setCurrentTestimonial(prev => (prev === 0 ? testimonialsList.length - 1 : prev - 1))}
              className="lp-nav-arrow-left"
              style={{
                position: "absolute",
                left: -24,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#0F172A"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Nav Arrow Button */}
            <button
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonialsList.length)}
              className="lp-nav-arrow-right"
              style={{
                position: "absolute",
                right: -24,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#0F172A"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 3 Cards Container (Left, Center Golden, Right) */}
            <div className="lp-testimonial-grid">
              {[
                { ...testimonialsList[(currentTestimonial - 1 + testimonialsList.length) % testimonialsList.length], isCenter: false },
                { ...testimonialsList[currentTestimonial], isCenter: true },
                { ...testimonialsList[(currentTestimonial + 1) % testimonialsList.length], isCenter: false }
              ].map((item, idx) => (
                // eslint-disable-next-line no-unused-vars
                <div
                  key={idx}
                  className={!item.isCenter ? "lp-testimonial-side" : ""}
                  style={{
                    background: item.isCenter
                      ? "linear-gradient(135deg, #FFE492 0%, #FFFFFF 65%)"
                      : "linear-gradient(135deg, #FFFDEB 0%, #FFFFFF 80%)",
                    borderRadius: 24,
                    padding: item.isCenter ? "32px 30px" : "24px 22px",
                    boxShadow: item.isCenter
                      ? "0 20px 45px rgba(0,0,0,0.09)"
                      : "0 6px 20px rgba(0,0,0,0.03)",
                    border: item.isCenter
                      ? "1px solid rgba(255, 228, 146, 0.6)"
                      : "1px solid rgba(0,0,0,0.05)",
                    transform: item.isCenter ? "scale(1.05)" : "scale(0.92)",
                    opacity: item.isCenter ? 1 : 0.72,
                    zIndex: item.isCenter ? 5 : 1,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: item.isCenter ? 260 : 230
                  }}
                >
                  <div>
                    {/* Top Row: Big Quote + Rating Stars */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      {/* Big White Quote Icon */}
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFFFFF" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.04))" }}>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      {/* Rating */}
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#4A5568", fontSize: item.isCenter ? 13 : 12, fontWeight: 700 }}>
                        <span>{item.rating}</span>
                        <div style={{ display: "flex", color: "#4A5568" }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} width={item.isCenter ? "13" : "11"} height={item.isCenter ? "13" : "11"} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Quote */}
                    <p style={{
                      fontSize: item.isCenter ? 14.5 : 13,
                      color: item.isCenter ? "#334155" : "#64748B",
                      lineHeight: 1.6,
                      marginBottom: 22,
                      fontWeight: item.isCenter ? 600 : 400
                    }}>
                      "{item.review}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: item.isCenter ? 44 : 38,
                        height: item.isCenter ? 44 : 38,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #FFF",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: "#0F172A", fontSize: item.isCenter ? 14.5 : 13.5 }}>{item.name}</div>
                      <div style={{ color: "#64748B", fontSize: item.isCenter ? 12.5 : 11.5, fontWeight: 500 }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dot Indicators */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28 }}>
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  style={{
                    width: currentTestimonial === idx ? 28 : 8,
                    height: 8,
                    borderRadius: 10,
                    background: currentTestimonial === idx ? "#16A34A" : "#CBD5E1",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: 0
                  }}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ NEWSLETTER SECTION ═══════════════ */}
      <section className="lp-newsletter-section" style={{ padding: "100px 6%", background: "#1F1D1B", position: "relative", overflow: "hidden" }}>
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
            Subscribe To Our <span style={{ color: "#16A34A" }}>Newsletter</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 40, padding: "0 20px" }}>
            Subscribe to our newsletter and stay ahead with the latest business insights, expert tips, and exclusive platform updates. Join thousands of businesses today and get opportunities delivered straight to your inbox every week!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNewsletterSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{ width: "100%", maxWidth: 460, padding: "12px 20px", borderRadius: 8, border: "none", outline: "none", fontSize: 14 }}
            />
            {newsletterStatus && (
              <div style={{ color: newsletterStatus.type === "success" ? "#16A34A" : "#EF4444", fontSize: 14, fontWeight: 600 }}>
                {newsletterStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={newsletterLoading}
              style={{ background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "12px 36px", fontSize: 14, fontWeight: 600, cursor: newsletterLoading ? "not-allowed" : "pointer", opacity: newsletterLoading ? 0.7 : 1, transition: "background 0.3s" }}
              onMouseEnter={e => { if (!newsletterLoading) e.currentTarget.style.background = "#00A844"; }}
              onMouseLeave={e => { if (!newsletterLoading) e.currentTarget.style.background = "#16A34A"; }}
            >
              {newsletterLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
};

export default LandingPage;
