import Navbar from "../Navbar";
import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";
import messbeeText from "../../assets/messbee_text.png";
import aboutHero from "../../assets/about_hero.png";
import {
  FiGlobe,
  FiCpu,
  FiSettings,
  FiUsers,
  FiLayers,
  FiLink2,
  FiCloud,
  FiBarChart2,
  FiShoppingBag,
  FiCoffee,
  FiScissors,
  FiPackage,
  FiPlusSquare,
  FiActivity,
  FiFolderPlus,
  FiBriefcase,
  FiBookOpen,
  FiBook,
  FiTruck,
  FiSmartphone,
  FiCreditCard,
  FiDatabase,
  FiMessageSquare,
  FiLock,
  FiKey,
  FiShield,
  FiClipboard,
  FiFileText,
  FiHeart,
  FiTrendingUp,
  FiEye,
  FiZap,
  FiTarget,
  FiCheckSquare
} from "react-icons/fi";
import { FiFolder, FiGift, FiAward, FiRefreshCw, FiArrowUpRight, FiTag } from "react-icons/fi";

/* ══════════════════════════════════════════════════════
   MessBee — About Page
   Dark navbar / hero + white body sections + full footer
   ══════════════════════════════════════════════════════ */

const FOOTER_LINKS = {
  company: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Find resources", path: "/resources" },
    { label: "Find business", path: "/business" },
  ],
  legal: [
    { label: "Terms and conditions", path: "/terms" },
    { label: "Privacy policy", path: "/privacy" },
    { label: "Cookies policy", path: "/cookies" },
    { label: "License agreement", path: "/license" },
    { label: "Refund & Cancellation Policy", path: "/refundpolicy" }
  ],
};

const stats = [
  { value: "0", label: "Active Businesses" },
  { value: "0", label: "Messages Sent" },
  { value: "0%", label: "Uptime SLA" },
  { value: "0+", label: "Countries" },
];

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trust & Security",
    desc: "We build on the official WhatsApp Business API, ensuring every message is secure, compliant, and delivered reliably.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Speed & Scale",
    desc: "From solo entrepreneurs to enterprise fleets, MessBee scales instantly — handling millions of messages without breaking a sweat.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Customer-First",
    desc: "Every feature we ship starts with a real business problem. Our roadmap is shaped by the businesses that use us every day.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
    title: "Always On",
    desc: "Our infrastructure runs 24/7 with redundant failovers so your customer conversations never miss a beat.",
  },
];


const milestones = [
  { year: "2020", event: "MessBee founded in Bangalore by two engineers frustrated with clunky CRM tools." },
  { year: "2021", event: "Launched first WhatsApp automation suite. Onboarded 500 businesses in 90 days." },
  { year: "2022", event: "Received official Meta Business Partner status and Series A funding." },
  { year: "2023", event: "Crossed 1 billion messages sent. Expanded to South-East Asia and the Middle East." },
  { year: "2024", event: "Launched AI-powered chatbots, payment integrations, and the Broadcast Studio." },
  { year: "2025", event: "50,000+ businesses worldwide. Recognised in Deloitte Fast 50 India." },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredVal, setHoveredVal] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedIndustryTab, setSelectedIndustryTab] = useState("all");
  const [aboutFaqOpenIdx, setAboutFaqOpenIdx] = useState(null);
  const [hoveredCap, setHoveredCap] = useState(null);
  const [hoveredLeaderCap, setHoveredLeaderCap] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleCarouselTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 40) {
      // Swiped Left -> Next Card
      setActiveFeature(prev => (prev < 11 ? prev + 1 : 0));
    } else if (distance < -40) {
      // Swiped Right -> Previous Card
      setActiveFeature(prev => (prev > 0 ? prev - 1 : 11));
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="about-page-wrapper" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#FFFFFF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { transform:scale(0.92); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes capCardIn { from { opacity:0; transform:translateY(20px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes iconPulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.18); } }
        @keyframes iconSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes iconBounce { 0%,100% { transform:translateY(0); } 40% { transform:translateY(-5px); } 70% { transform:translateY(-2px); } }
        .about-hero-animate { animation: fadeUp 0.7s ease both; }
        .about-stat-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,200,83,0.15) !important; }
        .about-val-card { transition: all 0.25s ease; }
        .about-val-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,200,83,0.12) !important; }
        .timeline-dot { transition: transform 0.2s ease; }
        .timeline-item:hover .timeline-dot { transform: scale(1.4); }
        .team-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 50px rgba(0,200,83,0.12) !important; }
        .cap-card { animation: capCardIn 0.5s ease both; position: relative; overflow: hidden; }
        .cap-card:hover { transform: translateY(-5px) !important; border-color: #16A34A !important; box-shadow: 0 12px 32px rgba(22,163,74,0.18) !important; background: #fff !important; }
        .cap-front { transition: opacity 0.25s ease, transform 0.25s ease; opacity: 1; transform: translateY(0); }
        .cap-back  { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px; opacity: 0; transform: translateY(10px); transition: opacity 0.25s ease, transform 0.25s ease; }
        .cap-card:hover .cap-front { opacity: 0; transform: translateY(-8px); }
        .cap-card:hover .cap-back  { opacity: 1; transform: translateY(0); }
        .cap-card:hover .cap-icon { animation: iconBounce 0.6s ease; }
        .cap-card:hover .cap-icon-spin { animation: iconSpin 0.7s linear; }
        .cap-card:hover .cap-icon-pulse { animation: iconPulse 0.5s ease; }

        .capabilities-grid-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px 25px;
          flex: 1 1 380px;
          margin-top: clamp(24px, 3.2vw, 45px);
          align-content: flex-start;
        }

        .capability-pill-badge {
          font-size: 15px;
        }

        /* Responsive scaling for pill chips grid & margin-top */
        @media (max-width: 1440px) {
          .capabilities-grid-cols {
            margin-top: 38px !important;
          }
        }
        @media (max-width: 1366px) {
          .capabilities-grid-cols {
            gap: 12px 18px;
            margin-top: 32px !important;
          }
          .capability-pill-badge {
            font-size: 14px !important;
            padding: 7px 16px !important;
          }
        }
        @media (max-width: 1299px) {
          .capabilities-grid-cols {
            gap: 10px 14px;
            margin-top: 26px !important;
          }
          .capability-pill-badge {
            font-size: 13px !important;
            padding: 6px 14px !important;
          }
        }
        @media (max-width: 1024px) {
          .capabilities-grid-cols {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px 12px !important;
            margin-top: 20px !important;
          }
          .capability-pill-badge {
            font-size: 13px !important;
            padding: 6px 14px !important;
          }
        }
        @media (max-width: 768px) {
          .capabilities-grid-cols {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px 10px !important;
            margin-top: 20px !important;
          }
          .capability-pill-badge {
            font-size: 12.5px !important;
            padding: 6px 12px !important;
          }
        }
        @media (max-width: 576px) {
          .capabilities-grid-cols {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            margin-top: 16px !important;
          }
          .capability-pill-badge {
            font-size: 12px !important;
            padding: 6px 14px !important;
          }
        }

        /* ── RESPONSIVE MEDIA QUERIES ── */
        .about-section {
          padding: 60px 6%;
        }
        .about-hero-section {
          padding: 100px 6% 70px;
        }

        /* ── Standard Laptops (1366px) ── */
        @media (max-width: 1366px) {
          .about-page-wrapper section {
            padding: 48px 5% !important;
          }
          .about-page-wrapper .about-hero-section {
            padding: 100px 5% 54px !important;
          }
          .hero-flex-container,
          .capabilities-container,
          .connectivity-container,
          .security-container {
            gap: 32px !important;
          }
          .hero-left-col {
            flex: 0 0 55% !important;
          }
          .capabilities-left {
            flex: 1.2 1 480px !important;
          }
          .connectivity-left {
            flex: 1 1 440px !important;
          }
          .security-left {
            flex: 1 1 440px !important;
          }

          /* Text sizes for 1366px */
          .about-page-wrapper h1 {
            font-size: clamp(24px, 2.8vw, 38px) !important;
          }
          .about-page-wrapper h2 {
            font-size: clamp(20px, 2.4vw, 28px) !important;
          }
          .about-page-wrapper h3 {
            font-size: 15px !important;
          }
          .about-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
          .about-page-wrapper .hero-left-col p:first-of-type,
          .about-page-wrapper .capabilities-left p:first-of-type {
            font-size: 14.5px !important;
          }
          
          /* Icon sizes for cards */
          .about-page-wrapper svg {
            max-width: 100%;
          }
        }

        /* ── Compact Laptops (1299px / 1280x720 HD) ── */
        @media (max-width: 1299px) {
          .about-page-wrapper section {
            padding: 34px 4% !important;
          }
          .about-page-wrapper .about-hero-section {
            padding: 90px 4% 34px !important;
          }
          .hero-flex-container,
          .capabilities-container,
          .connectivity-container,
          .security-container {
            gap: 24px !important;
          }
          
          /* Text sizes for 1299px */
          .about-page-wrapper h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .about-page-wrapper h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .about-page-wrapper h3 {
            font-size: 14.5px !important;
          }
          .about-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
          .about-page-wrapper .hero-left-col p:first-of-type,
          .about-page-wrapper .capabilities-left p:first-of-type {
            font-size: 14px !important;
          }
        }

        /* ── Small Laptops / Netbooks (1024px) ── */
        @media (max-width: 1024px) {
          .about-section {
            padding: 40px 4% !important;
          }
          .about-hero-section {
            padding: 95px 4% 36px !important;
          }
          .hero-flex-container {
            gap: 30px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-left-col {
            flex: 1 1 100% !important;
          }
          .hero-right-col {
            flex: 1 1 100% !important;
            margin-top: 24px !important;
          }
          .capabilities-container {
            gap: 30px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .capabilities-left {
            flex: 1 1 100% !important;
          }
          .capabilities-right {
            flex: 1 1 100% !important;
            margin-top: 20px !important;
          }
          .connectivity-container {
            gap: 30px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .connectivity-left {
            flex: 1 1 100% !important;
          }
          .connectivity-right {
            flex: 1 1 100% !important;
            margin-top: 24px !important;
          }
          .security-container {
            gap: 30px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .security-left {
            flex: 1 1 100% !important;
          }
          .security-right {
            flex: 1 1 100% !important;
            margin-top: 24px !important;
          }

          /* Text size reductions for netbooks/small laptops */
          .about-page-wrapper .about-hero-section h1,
          .about-page-wrapper .about-section h1 {
            font-size: clamp(22px, 2.5vw, 32px) !important;
          }
          .about-page-wrapper .about-section h2,
          .about-page-wrapper section h2,
          .about-page-wrapper h2 {
            font-size: clamp(17px, 2vw, 23px) !important;
          }
          .about-page-wrapper .about-section h3,
          .about-page-wrapper section h3,
          .about-page-wrapper h3 {
            font-size: clamp(15px, 1.6vw, 18px) !important;
          }
          .about-page-wrapper .about-hero-section p,
          .about-page-wrapper .about-section p,
          .about-page-wrapper section p,
          .about-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
          .about-page-wrapper .hero-left-col p:first-of-type {
            font-size: 14.5px !important;
          }
          .about-page-wrapper .capabilities-left p:first-of-type {
            font-size: 13px !important;
          }
        }

        /* ── Tablets / Large Phones (768px) ── */
        @media (max-width: 768px) {
          .about-section {
            padding: 32px 16px !important;
          }
          .about-hero-section {
            padding: 95px 16px 32px !important;
          }
          .hero-flex-container,
          .capabilities-container,
          .connectivity-container,
          .security-container {
            gap: 24px !important;
          }

          /* Mobile Typography Scaling */
          .about-page-wrapper .about-hero-section h1,
          .about-page-wrapper .about-section h1,
          .about-page-wrapper h1 {
            font-size: clamp(24px, 6.2vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            margin-bottom: 14px !important;
          }
          .about-page-wrapper .about-section h2,
          .about-page-wrapper section h2,
          .about-page-wrapper h2 {
            font-size: clamp(20px, 4.8vw, 26px) !important;
            letter-spacing: -0.4px !important;
            margin-bottom: 12px !important;
          }
          .about-page-wrapper .about-section h3,
          .about-page-wrapper section h3,
          .about-page-wrapper h3 {
            font-size: 15px !important;
          }
          .about-page-wrapper .about-hero-section p,
          .about-page-wrapper .about-section p,
          .about-page-wrapper section p,
          .about-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
          .about-page-wrapper .hero-left-col p:first-of-type {
            font-size: 14.5px !important;
          }
          .about-page-wrapper .capabilities-left p:first-of-type {
            font-size: 13.5px !important;
          }
          .capability-pill-badge span {
            white-space: normal !important;
          }
        }

        /* ── Small Mobile (576px) ── */
        @media (max-width: 576px) {
          .about-section {
            padding: 24px 14px !important;
          }
          .about-hero-section {
            padding: 90px 14px 28px !important;
          }
          .hero-flex-container > div:first-child > div:last-child {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .about-page-wrapper button {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 20px !important;
            font-size: 13.5px !important;
          }
          .capabilities-grid-cols {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            margin-top: 16px !important;
          }
          .capability-pill-badge {
            font-size: 12.5px !important;
            padding: 8px 14px !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="about-hero-section" style={{ background: "#FFFFFF" }}>
        <div className="hero-flex-container" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>

          {/* ── LEFT 60% — text ── */}
          <div className="about-hero-animate hero-left-col" style={{ flex: "0 0 58%", minWidth: 280 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)", borderRadius: 40, padding: "6px 18px", marginBottom: 28 }}>
              <FiBookOpen style={{ color: "#16A34A", width: 14, height: 14 }} />
              <span style={{ color: "#16A34A", fontSize: 13, fontWeight: 600 }}>Our Story</span>
            </div>
            <h1 style={{ fontSize: "clamp(20px,4vw,45px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, marginBottom: 20, textAlign: "left" }}>
              India&apos;s Digital Business {" "} <br />
              <span style={{ color: "#16A34A" }}>Operating System</span>
            </h1>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 20, textAlign: "left" }}>
              Own Your Business.{" "}
              <span style={{ color: "#16A34A", fontWeight: 700 }}>Own Your Customers.</span>{" "}
              Own Your Growth.
            </p>
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.85, marginBottom: 16, textAlign: "left" }}>
              MessBee is a unified digital business platform built for Indian businesses to manage customer relationships,
              communication, sales, marketing, automation, and everyday business operations from one connected system.
              <br />
              From a local shop or restaurant to a growing company, educational institution, healthcare business,
              distributor, manufacturer or multi-location enterprise, MessBee brings essential digital business
              capabilities together in one platform.
              <br />
              Instead of managing separate tools for customer communication, CRM, marketing, orders, automation and business operations, businesses can use MessBee to create a more connected and organized digital ecosystem around their own brand.
            </p>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.85, marginBottom: 36, fontWeight: 600, textAlign: "left" }}>
              <span style={{ color: "#16A34A" }}>One platform.</span>{" "}
              One business ecosystem.{" "}
              <span style={{ color: "#16A34A" }}>One place to manage your digital growth.</span>
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}
                style={{
                  background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 40,
                  padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(22,163,74,0.25)", transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Start Trial
              </button>
              <button
                onClick={() => navigate("/business")}
                style={{
                  background: "#F1F5F9", color: "#334155", border: "1px solid #E2E8F0",
                  borderRadius: 40, padding: "14px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#E2E8F0"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                Find a Business →
              </button>
            </div>
          </div>

          {/* ── RIGHT 40% — image ── */}
          <div className="hero-right-col" style={{ flex: "1 1 300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
              border: "1px solid rgba(22,163,74,0.25)",
              width: "100%",
              maxWidth: 420,
            }}>
              <img
                src={aboutHero}
                alt="MessBee digital business platform dashboard"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── WHAT IS MESSBEE ── */}
      <section className="about-section" style={{ background: "#ffffff" }}>
        <div className="capabilities-container" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 60, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* LEFT — text */}
          <div className="capabilities-left" style={{ flex: "1.3 1 540px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 24,
            }}>
              <FiGlobe style={{ color: "#16A34A", width: 12, height: 12 }} />
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>What Is MessBee?</span>
            </div>

            <h2 style={{ fontSize: "clamp(25px,3.5vw,37px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24 }}>
              What Is <span style={{ color: "#16A34A" }}>MessBee?</span>
            </h2>

            <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", fontWeight: 800, color: "#16A34A", lineHeight: 1.4, marginBottom: 14 }}>
              MessBee is more than a messaging platform, CRM, or chatbot.
            </p>

            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, marginBottom: 16 }}>
              It is designed as a <strong style={{ color: "#0F172A" }}>Digital Business Operating System</strong> that connects
              the different parts of a modern business—from the first customer enquiry to engagement,
              conversion, order, payment, follow-up and long-term retention.
            </p>

            <p style={{ fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 24 }}>
              With MessBee, businesses can bring together:
            </p>

            {/* Objective callout */}
            <div style={{
              background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1px solid #bbf7d0",
              borderRadius: 16, padding: "20px 24px", marginTop: 20, marginBottom: 28,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#15803D", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>The Objective is Simple</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#15803D", lineHeight: 1.6 }}>
                  Help businesses spend less time managing disconnected digital tools and more time serving customers and growing their business.
                </span>
              </div>
            </div>

            <button
              onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}
              style={{
                background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 40,
                padding: "14px 34px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(22,163,74,0.35)", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(22,163,74,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(22,163,74,0.35)"; }}>
              Get Started →
            </button>
          </div>

          {/* RIGHT — premium wrapping tag cloud (flexible pill badges) */}
          <div className="capabilities-grid-cols">
            {[
              {
                anim: "bounce", color: "#6366F1", bg: "#EEF2FF",
                title: "CRM", desc: "Customer Relationship Management",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              },
              {
                anim: "pulse", color: "#22C55E", bg: "#F0FDF4",
                title: "WhatsApp Business", desc: "WhatsApp Business communication",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
              },
              {
                anim: "bounce", color: "#F59E0B", bg: "#FFFBEB",
                title: "WhatsApp Commerce", desc: "Sell directly on WhatsApp",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
              },
              {
                anim: "pulse", color: "#EC4899", bg: "#FDF2F8",
                title: "Digital Storefronts", desc: "Your branded digital shop",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
              },
              {
                anim: "spin", color: "#8B5CF6", bg: "#F5F3FF",
                title: "AI Assistance", desc: "AI-powered customer support",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16" r="1" fill="currentColor" /></svg>,
              },
              {
                anim: "bounce", color: "#F97316", bg: "#FFF7ED",
                title: "Marketing Automation", desc: "Campaigns & broadcast workflows",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>,
              },
              {
                anim: "pulse", color: "#EF4444", bg: "#FEF2F2",
                title: "Lead Management", desc: "Capture, track & convert leads",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
              },
              {
                anim: "bounce", color: "#06B6D4", bg: "#ECFEFF",
                title: "Customer Engagement", desc: "Keep customers coming back",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
              },
              {
                anim: "pulse", color: "#16A34A", bg: "#F0FDF4",
                title: "Orders & Payments", desc: "End-to-end order workflows",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
              },
              {
                anim: "bounce", color: "#64748B", bg: "#F8FAFC",
                title: "Inventory", desc: "Real-time stock management",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
              },
              {
                anim: "spin", color: "#A855F7", bg: "#FAF5FF",
                title: "Loyalty & Rewards", desc: "Retain customers with rewards",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
              },
              {
                anim: "bounce", color: "#0EA5E9", bg: "#F0F9FF",
                title: "Business Analytics", desc: "Data-driven decisions",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
              },
              {
                anim: "pulse", color: "#F59E0B", bg: "#FFFBEB",
                title: "Team Management", desc: "Roles, tasks & collaboration",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="11" /><line x1="20" y1="8" x2="20" y2="14" /></svg>,
              },
              {
                anim: "bounce", color: "#10B981", bg: "#ECFDF5",
                title: "Multi-location", desc: "Manage all branches centrally",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /><line x1="12" y1="3" x2="12" y2="9" /></svg>,
              },
              {
                anim: "spin", color: "#6366F1", bg: "#EEF2FF",
                title: "API Integrations", desc: "Connect your existing tools",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
              },
              {
                anim: "pulse", color: "#F97316", bg: "#FFF7ED",
                title: "No-code Automation", desc: "Automate without coding",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
              },
            ].map((f, i) => {
              const isHovered = hoveredCap === i;
              return (
                <div
                  key={i}
                  className="capability-pill-badge"
                  onMouseEnter={() => setHoveredCap(i)}
                  onMouseLeave={() => setHoveredCap(null)}
                  style={{
                    background: isHovered ? f.color : `${f.color}0a`,
                    borderRadius: "30px",
                    padding: "8px 18px",
                    border: `1px solid ${isHovered ? f.color : `${f.color}25`}`,
                    transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: isHovered ? `0 6px 18px ${f.color}35` : "none",
                  }}
                  title={f.desc}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isHovered ? "#FFFFFF" : f.color,
                    transition: "color 0.25s ease",
                    flexShrink: 0
                  }}>
                    <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {f.svg.props.children}
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: isHovered ? "#FFFFFF" : "#0F172A",
                    transition: "color 0.25s ease",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap"
                  }}>
                    {f.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ── INDIAN BUSINESSES OPERATING SYSTEM (PREMIUM DESIGN) ── */}
      <section style={{ padding: "100px 6%", background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", position: "relative" }}>
        <style>{`
          .growth-timeline-vertical {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            max-width: 600px;
            margin: 20px 0 0 0;
            padding: 10px 0 10px 32px;
          }
          .growth-step-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            position: relative;
            z-index: 2;
            width: 100%;
            cursor: default;
          }
          .growth-step-item:last-child {
            margin-bottom: 0;
          }
          .growth-step-card {
            background: #FFFFFF;
            border: 1.5px solid #E2E8F0;
            border-radius: 12px;
            padding: 10px 16px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.01);
            flex-grow: 1;
            transition: all 0.25s ease;
          }
          .growth-step-item:hover .growth-step-card {
            border-color: #CBD5E1;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
            transform: translateY(-2px);
          }
          .growth-step-title {
            font-size: 14.5px;
            font-weight: 700;
            color: #0F172A;
            margin-bottom: 3px;
            transition: color 0.2s ease;
          }
          .growth-step-desc {
            font-size: 13px;
            color: #64748B;
            line-height: 1.45;
          }
          .growth-timeline-col {
            margin-top: 140px;
          }
          .indian-market-flex-row {
            display: flex;
            gap: 100px;
            align-items: flex-start;
            flex-wrap: wrap;
          }
          @media (max-width: 1024px) {
            .indian-market-flex-row {
              gap: 24px !important;
            }
            .growth-timeline-col {
              margin-top: 0px !important;
            }
          }
          @media (max-width: 768px) {
            .indian-market-flex-row {
              gap: 12px !important;
            }
            .growth-timeline-col {
              margin-top: 0px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "left" }}>

          <div className="indian-market-flex-row">

            {/* Left Column: All Text Content */}
            <div style={{ flex: "1 1 480px" }}>

              {/* Built for the Way Indian Businesses Operate */}
              <div style={{ marginBottom: 48 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                  borderRadius: 40, padding: "5px 16px", marginBottom: 24,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
                  <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Indian Market</span>
                </div>

                <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                  Built for the Way<br />
                  <span style={{ color: "#16A34A" }}>Indian Businesses</span> Operate
                </h2>

                <div style={{
                  borderLeft: "3px solid #16A34A",
                  paddingLeft: 16,
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    Indian businesses are diverse.
                  </p>
                </div>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                  A neighbourhood Kirana store, a restaurant, a coaching institute, a pharmacy, a fashion boutique, a distributor, a manufacturer and a multi-branch enterprise do not operate in the same way.
                </p>

                <div style={{
                  borderLeft: "3px solid #16A34A",
                  paddingLeft: 16,
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    MessBee is designed around this reality.
                  </p>
                </div>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, fontFamily: "'Inter', sans-serif" }}>
                  Whether your business primarily handles enquiries, bookings, orders, customer relationships, repeat purchases, marketing campaigns or multiple business locations, MessBee provides a flexible digital environment that can adapt to different business workflows.
                </p>
              </div>


              {/* From Local Business to Growing Enterprise */}
              <div>

                <h3 style={{ fontSize: "clamp(24px,2.8vw,34px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
                  From Local Business<br />
                  <span style={{ color: "#16A34A" }}>to Growing Enterprise</span>
                </h3>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                  A business can start with customer communication and gradually expand its use of MessBee as its requirements grow.
                </p>

                <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.9, marginBottom: 5, marginTop:15,fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                  For example:
                </p>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, marginTop: 15, fontFamily: "'Inter', sans-serif" }}>
                  This makes MessBee suitable for businesses at different stages of digital growth.
                </p>
              </div>

            </div>

            {/* Right Column: Timeline Cards */}
            <div className="growth-timeline-col" style={{ flex: "1 1 480px" }}>
              <div className="growth-timeline-vertical" style={{ margin: 0, padding: 0 }}>
                {[
                  { title: "Customer Communication", color: "#10B981", bg: "#F0FDF4", badge: "01", tag: "CONNECT" },
                  { title: "CRM", color: "#10B981", bg: "#F0FDF4", badge: "02", tag: "CONNECT" },
                  { title: "Digital Store", color: "#10B981", bg: "#F0FDF4", badge: "03", tag: "CONNECT" },
                  { title: "AI Assistant", color: "#6366F1", bg: "#EEF2FF", badge: "04", tag: "AUTOMATE" },
                  { title: "Automation", color: "#6366F1", bg: "#EEF2FF", badge: "05", tag: "AUTOMATE" },
                  { title: "Marketing", color: "#6366F1", bg: "#EEF2FF", badge: "06", tag: "AUTOMATE" },
                  { title: "Orders", color: "#F59E0B", bg: "#FFFBEB", badge: "07", tag: "TRANSACT" },
                  { title: "Payments", color: "#F59E0B", bg: "#FFFBEB", badge: "08", tag: "TRANSACT" },
                  { title: "Loyalty", color: "#F59E0B", bg: "#FFFBEB", badge: "09", tag: "TRANSACT" },
                  { title: "Analytics", color: "#EC4899", bg: "#FDF2F8", badge: "10", tag: "SCALE" },
                  { title: "Multi-Location Management", color: "#EC4899", bg: "#FDF2F8", badge: "11", tag: "SCALE" }
                ].map((step, idx) => (
                  <div key={idx} className="growth-step-item">
                    <div className="growth-step-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="growth-step-title" style={{ margin: 0 }}>
                          <span style={{ color: step.color, marginRight: 8, fontWeight: 800 }}>{step.badge}</span>
                          {step.title}
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.5, padding: "3px 8px", borderRadius: 4, background: step.bg, color: step.color }}>
                          {step.tag}
                        </span>
                      </div>
                      <p className="growth-step-desc" style={{ margin: "6px 0 0 0" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── EVERYTHING YOUR BUSINESS NEEDS, CONNECTED (PREMIUM SLIDER CAROUSEL) ── */}
      <section style={{ padding: "100px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", overflow: "hidden" }}>
        <style>{`
          .carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            width: 52px;
            height: 55px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #0F172A;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .carousel-arrow:hover {
            border-color: #16A34A;
            color: #16A34A;
            transform: translateY(-50%) scale(1.08);
            box-shadow: 0 10px 28px rgba(22, 163, 74, 0.16);
          }
          .carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #CBD5E1;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 4px;
          }
          .carousel-dot.active {
            background: #16A34A;
            width: 28px;
            border-radius: 6px;
          }
          .carousel-card-shadow {
            box-shadow: 0 12px 40px rgba(15, 23, 42, 0.06);
          }
          .carousel-card-hover {
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .carousel-mobile-nav-btn {
            display: none;
            background: #FFFFFF;
            border: 1.5px solid #BBF7D0;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            color: #16A34A;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(22, 163, 74, 0.12);
            transition: all 0.2s ease;
          }
          .carousel-mobile-nav-btn:active {
            transform: scale(0.92);
            background: #F0FDF4;
          }
          @media (max-width: 768px) {
            .carousel-arrow {
              display: none !important;
            }
            .carousel-mobile-nav-btn {
              display: inline-flex !important;
            }
            .carousel-card-item {
              width: calc(100vw - 32px) !important;
              max-width: 340px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 0 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 10,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>All-in-One Capabilities</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 10 }}>
              Everything Your Business Needs, <span style={{ color: "#16A34A" }}>Connected</span>
            </h2>

            <p style={{ fontSize: 16, color: "#64748B", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
              Instead of managing scattered systems, run your communication, workflows, database, marketing and daily operations on a single connected operating system.
            </p>
          </div>

          {/* Slider Layout */}
          <div style={{ position: "relative", width: "100%", height: "540px", display: "flex", alignItems: "center", justifyContent: "center", margin: "30px auto 0" }}>

            {/* Left Control Arrow */}
            <button
              className="carousel-arrow"
              style={{ left: "calc(50% - 240px - 26px)" }}
              onClick={() => setActiveFeature(prev => (prev > 0 ? prev - 1 : 11))}
              aria-label="Previous capability"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Control Arrow */}
            <button
              className="carousel-arrow"
              style={{ right: "calc(50% - 240px - 26px)" }}
              onClick={() => setActiveFeature(prev => (prev < 11 ? prev + 1 : 0))}
              aria-label="Next capability"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Cards Frame */}
            <div
              onTouchStart={handleCarouselTouchStart}
              onTouchMove={handleCarouselTouchMove}
              onTouchEnd={handleCarouselTouchEnd}
              style={{
                position: "relative", width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                touchAction: "pan-y", userSelect: "none"
              }}
            >
              {[
                {
                  title: "CRM & Customer Management",
                  tag: "CRM",
                  gradient: "linear-gradient(135deg, #10B981, #059669)",
                  icon: <FiUsers style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Build organized customer profiles and maintain a connected view of customer interactions. MessBee helps businesses manage contacts, enquiries, conversations, leads, customer activity and relationship history in one centralized environment. Instead of keeping customer data scattered across spreadsheets, chats and applications, create a structured management process."
                },
                {
                  title: "WhatsApp Business & Commerce",
                  tag: "WHATSAPP",
                  gradient: "linear-gradient(135deg, #22C55E, #16A34A)",
                  icon: <FiMessageSquare style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Turn customer conversations into meaningful business interactions. Using WhatsApp Business, communicate with customers, answer enquiries, showcase products, support ordering workflows and send updates. MessBee connects WhatsApp with CRM, automation and business functions so conversations become part of the wider customer journey."
                },
                {
                  title: "Digital Storefront",
                  tag: "STOREFRONT",
                  gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  icon: <FiShoppingBag style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Give your business a digital presence that works around your brand. MessBee enables businesses to create a branded digital storefront where customers can discover products, services, offers, and other business information. A digital storefront can help businesses create a more direct customer experience without making their digital presence dependent on a single marketplace."
                },
                {
                  title: "AI Business Assistant",
                  tag: "AI ASSISTANT",
                  gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                  icon: <FiCpu style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Intelligent Assistance for Everyday Customer Interactions. Customers often ask the same questions repeatedly: Product availability, pricing, services, business hours, appointment details, order queries, and general FAQs. MessBee&apos;s AI-powered capabilities automate customer interactions 24/7.",
                  points: [
                    "Answering frequently asked FAQs",
                    "Sharing product/service details",
                    "Assisting with orders & appointments",
                    "Escalating complex cases to humans"
                  ]
                },
                {
                  title: "Marketing Automation",
                  tag: "AUTOMATION",
                  gradient: "linear-gradient(135deg, #EC4899, #D946EF)",
                  icon: <FiZap style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Reach the Right Customer at the Right Stage. Marketing becomes more effective when communication is connected to customer activity. MessBee helps businesses create structured campaigns, follow-ups, reminders and customer engagement workflows across supported communication channels.",
                  points: [
                    "Lead follow-ups",
                    "Customer re-engagement",
                   
                    "Order updates",
                    "Appointment reminders",
                    "Service reminders",
                    "Loyalty communication",
                   
                    "Internal alerts"
                  ]
                },
                {
                  title: "From Lead to Loyal Customer",
                  tag: "JOURNEY",
                  gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
                  icon: <FiRefreshCw style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "A successful business relationship does not end after the first sale. MessBee is designed around the complete customer journey. By connecting these stages, businesses can create more consistent customer experiences and identify repeat opportunities."
                },
                {
                  title: "Orders, Payments & Workflows",
                  tag: "TRANSACTIONS",
                  gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
                  icon: <FiCreditCard style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Bring customer requests and order-related activities into a more organized workflow. MessBee supports business processes around orders, customer requests, and payment-related workflows, helping businesses connect transactions with the customer relationship and communication journey."
                },
                {
                  title: "Inventory Management",
                  tag: "INVENTORY",
                  gradient: "linear-gradient(135deg, #64748B, #475569)",
                  icon: <FiPackage style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "For businesses that manage products, keeping track of inventory is an essential part of daily operations. MessBee provides inventory-related capabilities to help businesses organize products, monitor stock and maintain better visibility into product availability. This can be particularly useful for managing multiple products."
                },
                {
                  title: "Loyalty & Customer Retention",
                  tag: "LOYALTY",
                  gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
                  icon: <FiGift style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Acquiring a customer is only one part of business growth. Long-term growth often depends on repeat customers and stronger relationships. MessBee enables businesses to build loyalty initiatives around points, rewards, referrals, special offers, and personalized communication."
                },
                {
                  title: "Analytics & Business Insights",
                  tag: "ANALYTICS",
                  gradient: "linear-gradient(135deg, #F43F5E, #EC4899)",
                  icon: <FiBarChart2 style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Business decisions are stronger when they are supported by useful information. MessBee brings business activity into dashboards and analytics so businesses can better understand customer engagement, campaigns, sales-related activity, and operational performance.",
                  points: [
                    "See what is happening",
                    "Understand what matters",
                    "Act with greater clarity",
                    "Data-backed decisions"
                  ]
                },
                {
                  title: "Team & Multi-Location Management",
                  tag: "MANAGEMENT",
                  gradient: "linear-gradient(135deg, #0F172A, #334155)",
                  icon: <FiBriefcase style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Modern businesses often have multiple employees, departments, branches or locations. MessBee supports centralized team and business management as operations become more complex.",
                  points: [
                    "User roles & permissions",
                    "Team collaboration tools",
                    "Multi-location operations",
                    "Centralized visibility"
                  ]
                },
                {
                  title: "No-Code Business Automation",
                  tag: "NO-CODE",
                  gradient: "linear-gradient(135deg, #4F46E5, #3730A3)",
                  icon: <FiSettings style={{ width: 64, height: 64, color: "#FFFFFF" }} />,
                  desc: "Automate Workflows Without Building Everything From Scratch. Businesses should not need a large development team for repetitive digital tasks. MessBee is designed to make business automation accessible through configurable workflows.",
                  points: [
                    "Customer enquiries & follow-ups",
                    "Order & payment notifications",
                    "Loyalty & marketing campaigns",
                    "Support & escalation workflows"
                  ]
                }
              ].map((step, idx) => {
                // Calculate position index relative to the active index
                let diff = idx - activeFeature;
                if (diff < -6) diff += 12;
                if (diff > 6) diff -= 12;

                const isActive = diff === 0;
                const isLeft = diff === -1;
                const isRight = diff === 1;
                const isFarLeft = diff === -2;
                const isFarRight = diff === 2;

                let transform = "scale(0.5) translateX(0)";
                let opacity = 0;
                let zIndex = 1;
                let visibility = "hidden";

                if (isActive) {
                  transform = "scale(1.05) translateX(0)";
                  opacity = 1;
                  zIndex = 10;
                  visibility = "visible";
                } else if (isLeft) {
                  transform = "scale(0.86) translateX(-320px)";
                  opacity = 0.55;
                  zIndex = 5;
                  visibility = "visible";
                } else if (isRight) {
                  transform = "scale(0.86) translateX(320px)";
                  opacity = 0.55;
                  zIndex = 5;
                  visibility = "visible";
                } else if (isFarLeft) {
                  transform = "scale(0.72) translateX(-580px)";
                  opacity = 0.15;
                  zIndex = 3;
                  visibility = "visible";
                } else if (isFarRight) {
                  transform = "scale(0.72) translateX(580px)";
                  opacity = 0.15;
                  zIndex = 3;
                  visibility = "visible";
                }

                return (
                  <div
                    key={idx}
                    className="carousel-card-item carousel-card-hover carousel-card-shadow"
                    style={{
                      position: "absolute",
                      width: "360px",
                      height: "490px",
                      borderRadius: "20px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transform,
                      opacity,
                      zIndex,
                      visibility,
                      transition: "all 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  >
                    {/* Top Illustration Box */}
                    <div style={{ height: "160px", background: step.gradient, position: "relative", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: "#FFFFFF",
                        color: "#0F172A",
                        fontSize: 9,
                        fontWeight: 900,
                        padding: "5px 12px",
                        borderRadius: 30,
                        letterSpacing: 0.5,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                      }}>
                        {step.tag}
                      </div>
                      <div style={{ fontSize: 64, filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))" }}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column", textAlign: "left", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                          {step.title}
                        </h4>
                        
                        {step.points && (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", borderBottom: "1px solid #F1F5F9", paddingBottom: 12, marginBottom: 12 }}>
                            {step.points.map((pt, pIdx) => (
                              <div key={pIdx} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#16A34A" }}>
                                <span>•</span>
                                <span style={{ color: "#475569" }}>{pt}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {step.tag === "JOURNEY" ? (
                          <>
                            <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                              A successful business relationship does not end after the first sale. MessBee is designed around the complete customer journey:
                            </p>
                            <div style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: "4px 3px",
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                              borderRadius: "10px",
                              padding: "8px",
                              marginBottom: 12
                            }}>
                              {["Discover", "Enquire", "Engage", "Recommend", "Convert", "Order", "Pay", "Follow Up", "Retain", "Grow"].map((stepText, sIdx, arr) => (
                                <React.Fragment key={sIdx}>
                                  <span style={{ fontSize: 8.5, fontWeight: 700, background: "#16A34A08", color: "#16A34A", border: "1px solid rgba(22,163,74,0.12)", padding: "2px 5px", borderRadius: 30 }}>
                                    {stepText}
                                  </span>
                                  {sIdx < arr.length - 1 && (
                                    <span style={{ color: "#94A3B8", fontSize: 9, fontWeight: 800 }}>➔</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                            <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                              By connecting these stages, businesses can create more consistent customer experiences and identify repeat opportunities.
                            </p>
                          </>
                        ) : (
                          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Dots Indicator Progress */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 24 }}>
            <button
              className="carousel-mobile-nav-btn"
              onClick={() => setActiveFeature(prev => (prev > 0 ? prev - 1 : 11))}
              aria-label="Previous capability"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className={`carousel-dot ${i === activeFeature ? "active" : ""}`}
                  onClick={() => setActiveFeature(i)}
                />
              ))}
            </div>
            <button
              className="carousel-mobile-nav-btn"
              onClick={() => setActiveFeature(prev => (prev < 11 ? prev + 1 : 0))}
              aria-label="Next capability"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Navigation position counter details */}
          <div style={{ marginTop: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.8 }}>
              Viewing {activeFeature + 1} of 12 business capabilities
            </span>
            <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
              Join thousands making their operations connected and more responsive.
            </div>
          </div>
        </div>
      </section>

      {/* ── API CONNECTIVITY & INTEGRATION SECTION ── */}
      <section style={{ padding: "80px 6%", background: "#FFFFFF", position: "relative" }}>
        <style>{`
          @keyframes pulseRing {
            0% { transform: scale(0.95); opacity: 0.8; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          @keyframes flowDash {
            to { stroke-dashoffset: -20; }
          }
          .visualizer-node {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
          }
          .visualizer-node:hover {
            transform: scale(1.15) !important;
            border-color: #16A34A !important;
            box-shadow: 0 10px 25px rgba(22, 163, 74, 0.2) !important;
          }
          .pulse-indicator {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid #16A34A;
            animation: pulseRing 2s infinite ease-out;
            pointer-events: none;
          }
          .flow-line {
            stroke: #CBD5E1;
            stroke-width: 1.5;
            stroke-dasharray: 5 5;
            animation: flowDash 1.5s infinite linear;
            transition: all 0.3s ease;
          }
          .visualizer-container:hover .flow-line {
            stroke: #16A34A;
            stroke-width: 2;
          }
          .node-tooltip {
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
            background: #0F172A;
            color: #FFFFFF;
            font-size: 9px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 4px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            white-space: nowrap;
            letter-spacing: 0.5;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .visualizer-node:hover .node-tooltip {
            opacity: 1;
          }
          @media (max-width: 768px) {
            .connectivity-right {
              width: 100% !important;
              overflow: hidden !important;
              margin-top: 10px !important;
            }
            .visualizer-container {
              transform: scale(0.82);
              transform-origin: center center;
              margin: -15px auto !important;
            }
            .node-tooltip {
              opacity: 0.9 !important;
              bottom: -22px !important;
              font-size: 8.5px !important;
              padding: 2px 6px !important;
            }
          }
          @media (max-width: 480px) {
            .visualizer-container {
              transform: scale(0.72);
              transform-origin: center center;
              margin: -32px auto !important;
            }
            .node-tooltip {
              opacity: 0.95 !important;
              bottom: -20px !important;
              font-size: 8px !important;
              padding: 2px 5px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="connectivity-container" style={{ display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Left Column: Descriptions and Pills */}
            <div className="connectivity-left" style={{ flex: "1 1 480px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                borderRadius: 40, padding: "5px 16px", marginBottom: 20,
              }}>
                <FiLink2 style={{ color: "#16A34A", width: 12, height: 12 }} />
                <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Connectivity & API</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                Connect MessBee With<br />
                <span style={{ color: "#16A34A" }}>Your Existing Technology</span>
              </h2>

              <div style={{
                borderLeft: "3px solid #16A34A",
                paddingLeft: 16,
                marginTop: 24,
                marginBottom: 24,
              }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  Every business already uses technology.
                </p>
              </div>

              {/* Tag Pills */}
              <div style={{ display: "flex", gap: "8px 12px", flexWrap: "wrap", marginBottom: 24 }}>
                {["Websites", "Applications", "Payment Systems", "CRM Tools", "Internal Software", "Business Databases"].map((tech, tIdx) => (
                  <span key={tIdx} style={{ fontSize: 13, fontWeight: 600, color: "#475569", background: "#F1F5F9", padding: "6px 14px", borderRadius: 10, border: "1px solid #E2E8F0" }}>
                    {tech}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
                MessBee is designed with API connectivity in mind so businesses can connect their existing technology environment with their digital business workflows where supported.
              </p>

              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                This makes MessBee suitable not only for businesses starting their digital journey, but also for organizations looking to connect and streamline existing systems.
              </p>
            </div>

            {/* Right Column: High-Fidelity CSS Connectivity Visualizer */}
            <div className="connectivity-right" style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="visualizer-container" style={{ position: "relative", width: "400px", height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>

                {/* SVG Connections Line */}
                <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
                  <line x1="200" y1="190" x2="340" y2="190" className="flow-line" />
                  <line x1="200" y1="190" x2="270" y2="311" className="flow-line" />
                  <line x1="200" y1="190" x2="130" y2="311" className="flow-line" />
                  <line x1="200" y1="190" x2="60" y2="190" className="flow-line" />
                  <line x1="200" y1="190" x2="130" y2="69" className="flow-line" />
                  <line x1="200" y1="190" x2="270" y2="69" className="flow-line" />
                </svg>

                {/* Center Node (MessBee) */}
                <div style={{
                  position: "absolute",
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #16A34A 0%, #10B981 100%)",
                  boxShadow: "0 8px 32px rgba(22, 163, 74, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  zIndex: 20,
                  border: "3px solid #FFFFFF"
                }}>
                  <div className="pulse-indicator" />
                  <img
                    src={defaultLogo}
                    alt="MessBee Logo"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1.5px solid #FFFFFF",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 10.5, letterSpacing: 0.5 }}>MessBee</span>
                </div>

                {/* Surrounding Nodes */}
                {[
                  { label: "Websites", icon: <FiGlobe style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 340, y: 190 },
                  { label: "Applications", icon: <FiSmartphone style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 270, y: 311 },
                  { label: "Payment Systems", icon: <FiCreditCard style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 130, y: 311 },
                  { label: "CRM Tools", icon: <FiUsers style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 60, y: 190 },
                  { label: "Internal Software", icon: <FiSettings style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 130, y: 69 },
                  { label: "Databases", icon: <FiDatabase style={{ color: "#16A34A", width: 28, height: 28 }} />, x: 270, y: 69 }
                ].map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="visualizer-node"
                    style={{
                      position: "absolute",
                      left: node.x - 34,
                      top: node.y - 34,
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10
                    }}
                  >
                    {node.icon}
                    <div className="node-tooltip">{node.label}</div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BUILT FOR DIFFERENT INDUSTRIES SECTION ── */}
      <section style={{ padding: "60px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .industry-tab-btn {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            color: #64748B;
            padding: 10px 24px;
            border-radius: 30px;
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 0.5;
          }
          .industry-tab-btn:hover {
            color: #16A34A;
            border-color: #16A34A;
            transform: translateY(-1px);
          }
          .industry-tab-btn.active {
            background: #16A34A;
            border-color: #16A34A;
            color: #FFFFFF;
            box-shadow: 0 6px 16px rgba(22, 163, 74, 0.2);
          }
          .marquee-container {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 24px 0;
            display: flex;
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          }
          .marquee-track {
            display: flex;
            gap: 20px;
            width: max-content;
            animation: marqueeScroll 40s linear infinite;
          }
          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .industry-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 16px;
            width: 290px;
            height: 250px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.015);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
            flex-shrink: 0;
          }
          .industry-card:hover {
            transform: translateY(-6px);
            border-color: #16A34A;
            box-shadow: 0 16px 36px rgba(22, 163, 74, 0.08);
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 20,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Industry Adaptability</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 10 }}>
              Built for <span style={{ color: "#16A34A" }}>Different Industries</span>
            </h2>
          </div>

          {/* Dynamic Tabs Filters */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {[
              { id: "all", label: "All Industries" },
              { id: "commerce", label: "Commerce & Retail" },
              { id: "services", label: "Services & Health" },
              { id: "education", label: "Education & Industrial" }
            ].map(tab => (
              <button
                key={tab.id}
                className={`industry-tab-btn ${selectedIndustryTab === tab.id ? "active" : ""}`}
                onClick={() => setSelectedIndustryTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic marquee loop */}
          {(() => {
            const filteredInd = [
              {
                title: "Retail & Kirana",
                icon: <FiShoppingBag style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "commerce",
                image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&auto=format&fit=crop&q=60",
                desc: "Manage customer enquiries, product communication, offers, orders and repeat-customer engagement."
              },
              {
                title: "Restaurants & Food Businesses",
                icon: <FiCoffee style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "commerce",
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=60",
                desc: "Share menus, handle customer enquiries, promote offers and support ordering and customer communication workflows."
              },
              {
                title: "Boutique & Fashion",
                icon: <FiScissors style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "commerce",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=60",
                desc: "Promote collections, communicate offers, engage customers and manage customer relationships."
              },
              {
                title: "Distributors & Wholesalers",
                icon: <FiPackage style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "commerce",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60",
                desc: "Coordinate retailer communication, product information, orders and business relationships."
              },
              {
                title: "Pharmacy & Healthcare Businesses",
                icon: <FiPlusSquare style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "services",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60",
                desc: "Support appropriate customer communication, reminders, notifications and service-related workflows while following guidelines."
              },
              {
                title: "Gyms & Fitness Centers",
                icon: <FiActivity style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "services",
                image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60",
                desc: "Manage customer communication, memberships, schedules, reminders and engagement campaigns."
              },
              {
                title: "Clinics & Healthcare Services",
                icon: <FiFolderPlus style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "services",
                image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop&q=60",
                desc: "Support appointment enquiries, reminders, follow-ups and customer communication workflows."
              },
              {
                title: "Professional & Service Businesses",
                icon: <FiBriefcase style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "services",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60",
                desc: "Centralize leads, enquiries, appointments, follow-ups, customer communication and operational workflows."
              },
              {
                title: "Coaching & Education",
                icon: <FiBookOpen style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "education",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&auto=format&fit=crop&q=60",
                desc: "Communicate with students and parents, share schedules, reminders, announcements and important updates."
              },
              {
                title: "Schools, Colleges & Universities",
                icon: <FiBook style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "education",
                image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=60",
                desc: "Manage enquiries, announcements, admissions-related communication, reminders and engagement."
              },
              {
                title: "Automobile Businesses",
                icon: <FiTruck style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "education",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=60",
                desc: "Manage enquiries, service reminders, booking confirmations and customer follow-ups."
              },
              {
                title: "Manufacturers",
                icon: <FiSettings style={{ color: "#16A34A", width: 15, height: 15 }} />,
                category: "education",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60",
                desc: "Support dealer, distributor and customer communication, enquiries, orders and business workflows."
              }
            ].filter(ind => selectedIndustryTab === "all" || ind.category === selectedIndustryTab);

            // Multiply array so that marquee is filled and loops continuously
            let marqueeItems = [...filteredInd];
            while (marqueeItems.length < 10 && filteredInd.length > 0) {
              marqueeItems = [...marqueeItems, ...filteredInd];
            }
            // Double for seamless looping
            marqueeItems = [...marqueeItems, ...marqueeItems];

            if (marqueeItems.length === 0) return null;

            return (
              <div className="marquee-container">
                <div className="marquee-track">
                  {marqueeItems.map((ind, idx) => (
                    <div key={idx} className="industry-card">
                      <div style={{ height: "130px", width: "100%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                        <img src={ind.image} alt={ind.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                          border: "1px solid #E2E8F0"
                        }}>
                          {ind.icon}
                        </div>
                      </div>
                      <div style={{ padding: "16px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 6 }}>
                        <h4 style={{ fontSize: "14.5px", fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                          {ind.title}
                        </h4>
                        <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                          {ind.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── WHY BUSINESSES CHOOSE MESSBEE SECTION ── */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <style>{`
          .choose-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 16px;
            padding: 20px 24px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.015);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .choose-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #16A34A;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }
          .choose-card:hover {
            transform: translateY(-4px);
            border-color: #E2E8F0;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.035);
          }
          .choose-card:hover::after {
            transform: scaleX(1);
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 20,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Our Advantages</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, margin: 0 }}>
              Why Businesses <span style={{ color: "#16A34A" }}>Choose MessBee</span>
            </h2>
          </div>

          {/* Grid Layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20
          }}>
            {[
              {
                title: "One Connected Business Platform",
                icon: <FiGlobe style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Bring communication, CRM, AI, automation, commerce, orders and analytics into one connected ecosystem."
              },
              {
                title: "Built for Indian Businesses",
                icon: <img src={defaultLogo} alt="MessBee Logo" style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover", display: "block" }} />,
                desc: "Designed with the diverse requirements of Indian MSMEs, growing businesses, and larger organizations in mind."
              },
              {
                title: "AI-Assisted",
                icon: <FiCpu style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Use AI capabilities to support customer interactions and automate suitable repetitive tasks."
              },
              {
                title: "No-Code Automation",
                icon: <FiSettings style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Create business workflows without building every process through custom software development."
              },
              {
                title: "Customer-Centric",
                icon: <FiUsers style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Build a more complete understanding of customer interactions across their journey."
              },
              {
                title: "Multi-User & Multi-Location",
                icon: <FiLayers style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Support growing teams, branches, stores, and business locations from a centralized environment."
              },
              {
                title: "API-Ready",
                icon: <FiLink2 style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Connect MessBee with existing applications and business systems where supported."
              },
              {
                title: "Cloud-Based",
                icon: <FiCloud style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Access your business environment across supported devices and locations."
              },
              {
                title: "Analytics-Driven",
                icon: <FiBarChart2 style={{ color: "#16A34A", width: 20, height: 20 }} />,
                desc: "Turn business activity into useful information for better business decisions."
              }
            ].map((item, idx) => (
              <div key={idx} className="choose-card">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(22, 163, 74, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(22, 163, 74, 0.15)",
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif", textAlign: "left" }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif", textAlign: "left" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BEYOND MESSAGING CUSTOMER JOURNEY SECTION ── */}
      <section style={{ padding: "60px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .flow-step-pill {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 12px 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 10px rgba(15, 23, 42, 0.02);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 13px;
            font-weight: 700;
            color: #0F172A;
            width: 100%;
            justify-content: center;
          }
          .flow-step-pill:hover {
            transform: scale(1.05);
            border-color: #16A34A;
            box-shadow: 0 8px 20px rgba(22, 163, 74, 0.1);
          }
          @keyframes arrowPulse {
            0% { opacity: 0.3; transform: translateX(-2px); }
            50% { opacity: 1; transform: translateX(2px); }
            100% { opacity: 0.3; transform: translateX(-2px); }
          }
          .flow-arrow-icon {
            color: #16A34A;
            font-size: 14px;
            font-weight: 900;
            animation: arrowPulse 1.5s infinite ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .ecosystem-flow-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr auto 1fr;
            align-items: center;
            gap: 16px 8px;
            width: 100%;
            max-width: 540px;
          }
          @media (max-width: 768px) {
            .ecosystem-flow-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 10px 8px !important;
              max-width: 100% !important;
            }
            .flow-arrow-icon {
              display: none !important;
            }
            .flow-step-pill {
              padding: 8px 6px !important;
              font-size: 11.5px !important;
              gap: 5px !important;
              border-radius: 10px !important;
            }
          }
          @media (max-width: 576px) {
            .ecosystem-flow-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
            }
            .flow-step-pill {
              padding: 10px 10px !important;
              font-size: 12px !important;
              justify-content: flex-start !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Left Column: Descriptions */}
            <div style={{ flex: "1 1 540px", textAlign: "left" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                borderRadius: 40, padding: "5px 16px", marginBottom: 20,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
                <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Ecosystem Vision</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                More Than Messaging.<br />
                <span style={{ color: "#16A34A" }}>Run Your Business.</span><br />
                Not Just Your Messages.
              </h2>

              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.9, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
                Messaging is only one part of a modern business. A customer may discover your business through a campaign, ask a question through WhatsApp, visit your digital store, place an order, make a payment, receive an update, and later return for another purchase.
              </p>

              <div style={{
                borderLeft: "3px solid #16A34A",
                paddingLeft: 16,
                marginTop: 24,
                marginBottom: 24,
              }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  MessBee is designed to connect these interactions.
                </p>
              </div>

              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.9, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                This connected approach helps businesses build a more organized digital customer journey.
              </p>
            </div>

            {/* Right Column: Visual Connected Flow */}
            <div style={{ flex: "1 1 480px", display: "flex", justifyContent: "center", width: "100%" }}>
              <div className="ecosystem-flow-grid">
                {[
                  { label: "Communication", icon: <FiMessageSquare style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "CRM", icon: <FiUsers style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "AI", icon: <FiCpu style={{ color: "#16A34A", width: 15, height: 15 }} /> },

                  { label: "Marketing", icon: <FiZap style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "Commerce", icon: <FiShoppingBag style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "Orders", icon: <FiPackage style={{ color: "#16A34A", width: 15, height: 15 }} /> },

                  { label: "Payments", icon: <FiCreditCard style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "Loyalty", icon: <FiGift style={{ color: "#16A34A", width: 15, height: 15 }} /> },
                  { type: "arrow" },
                  { label: "Analytics", icon: <FiBarChart2 style={{ color: "#16A34A", width: 15, height: 15 }} /> }
                ].map((item, idx) => {
                  if (item.type === "arrow") {
                    return (
                      <div key={idx} className="flow-arrow-icon">
                        ➔
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flow-step-pill">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MANIFESTO / PHILOSOPHY SECTION ── */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <style>{`
          .manifesto-container {
            background: #F0FDF4;
            border: 1px solid #DCFCE7;
            border-radius: 20px;
            padding: 32px;
            text-align: left;
            max-width: 1100px;
            margin: 0 auto 48px auto;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(22, 163, 74, 0.01);
          }
          .manifesto-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            padding: 12px 20px;
            text-align: left;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.015);
          }
          .manifesto-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          }
          .manifesto-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .manifesto-btn {
            border: none;
            border-radius: 9999px;
            padding: 8px 18px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }
          .manifesto-btn:hover {
            filter: brightness(0.9);
            transform: translateY(-1px);
          }
          @media (max-width: 1024px) {
            .manifesto-grid {
              grid-template-columns: 1fr;
            }
            .manifesto-container {
              padding: 24px 16px;
            }
            .manifesto-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
            }
            .manifesto-btn {
              align-self: flex-end;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 20,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Our Philosophy</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, maxWidth: 850, margin: "0 auto 24px auto" }}>
              Your Business. Your Brand.<br />
              <span style={{ color: "#16A34A" }}>Your Customer Relationships.</span>
            </h2>
          </div>

          {/* Principle Callout */}
          <div style={{
            padding: "10px 30px",
            maxWidth: 850,
            margin: "0 auto 30px auto",
            textAlign: "center",
          }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#15803D", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
              MessBee is built around an important principle:
            </p>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#0d0e0dff", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Businesses should have greater control over their digital customer relationships.
            </p>
          </div>

          {/* Pillars Container Box */}
          <div className="manifesto-container">

            {/* Header tag inside box */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, fontSize: 15, fontWeight: 800, color: "#15803D" }}>
              <span>4 Core Pillars of Our Philosophy</span>
            </div>

            {/* Pillars Grid */}
            <div className="manifesto-grid">
              {[
                {
                  title: "Your Brand",
                  icon: "🎯",
                  desc: "Your brand should remain at the center of the customer experience.",
                  tip: "Keep customer touchpoints consistent",
                  color: "#16A34A",
                  btnText: "Active"
                },
                {
                  title: "Your Ecosystem",
                  icon: "🌐",
                  desc: "Your customers should be able to interact with your business through your digital ecosystem.",
                  tip: "Connect your domain & endpoints",
                  color: "#0284C7",
                  btnText: "Configure"
                },
                {
                  title: "Your Team",
                  icon: "👥",
                  desc: "Your team should have access to the information and workflows required to serve those customers effectively.",
                  tip: "Setup custom roles & permissions",
                  color: "#7C3AED",
                  btnText: "Manage"
                },
                {
                  title: "Long-Term Growth",
                  icon: "🔄",
                  desc: "Your business should be able to build long-term relationships rather than relying only on one-time interactions.",
                  tip: "Activate loyalty rewards & campaigns",
                  color: "#D97706",
                  btnText: "Grow"
                }
              ].map((pillar, pIdx) => (
                <div key={pIdx} className="manifesto-card">
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{pillar.icon}</span>
                      <h4 style={{ fontSize: 15.5, fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                        {pillar.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: "4px 0 8px 0", fontFamily: "'Inter', sans-serif" }}>
                      {pillar.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: pillar.color }}>
                     
                      <span>{pillar.tip}</span>
                    </div>
                  </div>

                  <button className="manifesto-btn" style={{ background: `${pillar.color}12`, color: pillar.color }} onClick={() => navigate("/solutions")}>
                    {pillar.btnText}
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Footer Footnote */}
          <p style={{ fontSize: 14, color: "#64748B", maxWidth: 750, margin: "0 auto", lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
            All customer data and communication workflows remain subject to applicable laws, platform policies, permissions and contractual requirements.
          </p>

        </div>
      </section>

      {/* ── DESIGNED TO GROW WITH YOUR BUSINESS (GROWTH ROADMAP PATH) ── */}
      <section style={{ padding: "60px 5%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .stage-column {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 20px;
            padding: 30px 28px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .stage-column:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
          }
          .stage-item-pill {
            background: #F8FAFC;
            border: 1px solid #F1F5F9;
            border-radius: 12px;
            padding: 10px 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s ease;
            font-size: 13.5px;
            font-weight: 700;
            color: #334155;
            text-align: left;
          }
          .stage-item-pill:last-child {
            margin-bottom: 0;
          }
          .stage-column.start:hover {
            border-color: #10B981;
          }
          .stage-column.start:hover .stage-item-pill:hover {
            border-color: #10B981;
            background: #FFFFFF;
            color: #10B981;
          }
          .stage-column.grow:hover {
            border-color: #6366F1;
          }
          .stage-column.grow:hover .stage-item-pill:hover {
            border-color: #6366F1;
            background: #FFFFFF;
            color: #6366F1;
          }
          .stage-column.scale:hover {
            border-color: #EC4899;
          }
          .stage-column.scale:hover .stage-item-pill:hover {
            border-color: #EC4899;
            background: #FFFFFF;
            color: #EC4899;
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 20,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Scalable Growth</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 16 }}>
              Designed to <span style={{ color: "#16A34A" }}>Grow With Your Business</span>
            </h2>

            <p style={{ fontSize: 19, color: "#1E293B", fontWeight: 800, maxWidth: 720, margin: "0 auto 10px auto", lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
              You do not need to implement everything on day one.
            </p>
            <p style={{ fontSize: 16, color: "#475569", fontWeight: 500, maxWidth: 720, margin: "0 auto 6px auto", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
              Start with the capabilities your business <span style={{ color: "#16A34A", fontWeight: 700 }}>needs today</span>.
            </p>
            <p style={{ fontSize: 16, color: "#475569", fontWeight: 500, maxWidth: 720, margin: "0 auto", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
              As your business grows, <span style={{ color: "#16A34A", fontWeight: 700 }}>expand dynamically</span> into additional workflows and capabilities.
            </p>
          </div>

          {/* 3-Column Roadmap Path */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 48
          }}>

            {/* Start Phase */}
            <div className="stage-column start">
              <div style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "rgba(16,185,129,0.08)",
                color: "#10B981",
                fontSize: 11,
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: 30,
                letterSpacing: 0.5,
                marginBottom: 24,
                textTransform: "uppercase"
              }}>
                Phase 01 — Start
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  "Customer Communication",
                  "CRM",
                  "Lead Management"
                ].map((item, idx) => (
                  <div key={idx} className="stage-item-pill">
                    <span style={{ color: "#10B981" }}>✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grow Phase */}
            <div className="stage-column grow">
              <div style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "rgba(99,102,241,0.08)",
                color: "#6366F1",
                fontSize: 11,
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: 30,
                letterSpacing: 0.5,
                marginBottom: 24,
                textTransform: "uppercase"
              }}>
                Phase 02 — Grow
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  "Digital Store",
                  "AI Assistant",
                  "Marketing Automation",
                  "Orders",
                  "Payments"
                ].map((item, idx) => (
                  <div key={idx} className="stage-item-pill">
                    <span style={{ color: "#6366F1" }}>✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scale Phase */}
            <div className="stage-column scale">
              <div style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "rgba(236,72,153,0.08)",
                color: "#EC4899",
                fontSize: 11,
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: 30,
                letterSpacing: 0.5,
                marginBottom: 24,
                textTransform: "uppercase"
              }}>
                Phase 03 — Scale
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  "Inventory",
                  "Loyalty",
                  "Analytics",
                  "Multi-Location Management",
                  "Advanced Automation",
                  "API Integrations"
                ].map((item, idx) => (
                  <div key={idx} className="stage-item-pill">
                    <span style={{ color: "#EC4899" }}>✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Statement callout */}
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
            border: "1px solid #BBF7D0",
            borderRadius: "30px",
            padding: "12px 32px",
            boxShadow: "0 4px 12px rgba(22, 163, 74, 0.04)"
          }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#15803D", margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Start with what you need. Build what comes next.
            </p>
          </div>

        </div>
      </section>

      {/* ── SECURITY, PRIVACY & RESPONSIBLE TECH SECTION ── */}
      <section className="about-section" style={{ background: "#FFFFFF", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .security-item {
            background: #F8FAFC;
            border: 1px solid #F1F5F9;
            border-radius: 12px;
            padding: 12px 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
            cursor: default;
          }
          .security-item:hover {
            background: #FFFFFF;
            border-color: #16A34A;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(22, 163, 74, 0.08);
          }
          .security-icon-box {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(22, 163, 74, 0.08);
            color: #16A34A;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .security-item:hover .security-icon-box {
            transform: scale(1.1) rotate(6deg);
            background: #16A34A;
            color: #FFFFFF;
          }
          @media (max-width: 576px) {
            .security-grid {
              grid-template-columns: repeat(auto-fit, minmax(135px, 1fr)) !important;
              gap: 10px !important;
            }
            .security-item {
              padding: 10px 11px !important;
              gap: 8px !important;
            }
            .security-icon-box {
              width: 28px !important;
              height: 28px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="security-container" style={{ display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Left Column: Manifesto details */}
            <div className="security-left" style={{ flex: "1 1 480px", textAlign: "left" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                borderRadius: 40, padding: "5px 16px", marginBottom: 16,
              }}>
                <FiShield style={{ color: "#16A34A", width: 12, height: 12 }} />
                <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Trust & Safety</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
                Security, Privacy &<br />
                <span style={{ color: "#16A34A" }}>Responsible Technology</span>
              </h2>

              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
                MessBee is being developed with security, responsible data handling and compliance-oriented technology practices as important considerations.
              </p>

              <div style={{
                borderLeft: "3px solid #16A34A",
                paddingLeft: 16,
                marginTop: 20,
                marginBottom: 20,
              }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", lineHeight: 1.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  Businesses operate with valuable customer and operational information. Responsible technology therefore requires more than simply adding features.
                </p>
              </div>

              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                Specific security, privacy and compliance commitments are subject to the applicable MessBee policies, agreements, technical implementation and service terms.
              </p>
            </div>

            {/* Right Column: 2x4 Grid Points */}
            <div className="security-right" style={{ flex: "1 1 450px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14, textAlign: "left" }}>
                MessBee&apos;s approach focuses on:
              </div>
              <div className="security-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12
              }}>
                {[
                  { label: "Responsible communication", icon: <FiMessageSquare style={{ width: 15, height: 15 }} /> },
                  { label: "Data protection", icon: <FiLock style={{ width: 15, height: 15 }} /> },
                  { label: "Access control", icon: <FiKey style={{ width: 15, height: 15 }} /> },
                  { label: "User permissions", icon: <FiUsers style={{ width: 15, height: 15 }} /> },
                  { label: "Secure technology practices", icon: <FiShield style={{ width: 15, height: 15 }} /> },
                  { label: "Applicable legal requirements", icon: <FiFileText style={{ width: 15, height: 15 }} /> },
                  { label: "Platform policies", icon: <FiClipboard style={{ width: 15, height: 15 }} /> },
                  { label: "Responsible use of AI & automation", icon: <FiCpu style={{ width: 15, height: 15 }} /> }
                ].map((item, idx) => (
                  <div key={idx} className="security-item">
                    <div className="security-icon-box">
                      {item.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", lineHeight: 1.35, fontFamily: "'Inter', sans-serif" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: "70px 6%" }}>
        <style>{`
          .aim-pill {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 12.5px;
            font-weight: 700;
            color: #374151;
            text-align: left;
          }
          .aim-pill:hover {
            background: #FFFFFF;
            border-color: #16A34A;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(22, 163, 74, 0.06);
          }
          .our-mission-flex-row {
            display: flex;
            gap: 80px;
            align-items: center;
            flex-wrap: wrap;
          }
          .our-mission-aims-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
          }
          @media (max-width: 768px) {
            .our-mission-flex-row {
              gap: 20px !important;
            }
            .our-mission-aims-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
            }
            .aim-pill {
              padding: 10px 10px !important;
              font-size: 12px !important;
              gap: 8px !important;
              border-radius: 10px !important;
            }
          }
          @media (max-width: 480px) {
            .our-mission-aims-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 6px !important;
            }
            .aim-pill {
              padding: 8px 8px !important;
              font-size: 11.5px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="our-mission-flex-row">

            {/* Left Column: Text description */}
            <div style={{ flex: "1 1 500px", textAlign: "left" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                borderRadius: 40, padding: "5px 16px", marginBottom: 20,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
                <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Our Mission</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                Make Digital Business<br />
                Technology <span style={{ color: "#16A34A" }}>More Accessible</span>
              </h2>

              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.9, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
                Our mission is to help businesses use modern technology to build, operate and grow their digital business ecosystem.
              </p>

              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.9, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                We want businesses of different sizes to have access to capabilities that were traditionally difficult, expensive or fragmented across multiple systems.
              </p>
            </div>

            {/* Right Column: 10 Objectives grid */}
            <div style={{ flex: "1 1 480px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 20, textAlign: "left" }}>
                MessBee aims to help businesses:
              </div>
              <div className="our-mission-aims-grid">
                {[
                  { label: "Build direct customer relationships", icon: <FiUsers style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Reduce repetitive manual work", icon: <FiSettings style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Improve customer experience", icon: <FiHeart style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Organize business operations", icon: <FiFolder style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Use AI responsibly", icon: <FiCpu style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Automate digital workflows", icon: <FiRefreshCw style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Understand business activity", icon: <FiBarChart2 style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Encourage customer loyalty", icon: <FiGift style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Create scalable processes", icon: <FiTrendingUp style={{ width: 14, height: 14, color: "#16A34A" }} /> },
                  { label: "Grow through technology", icon: <FiArrowUpRight style={{ width: 14, height: 14, color: "#16A34A" }} /> }
                ].map((aim, idx) => (
                  <div key={idx} className="aim-pill">
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      background: "rgba(22, 163, 74, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      {aim.icon}
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>{aim.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OUR VISION ── */}
      <section className="vision-section" style={{ background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .vision-section {
            padding: 60px 6%;
          }
          .vision-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            max-width: 980px;
            margin: 0 auto 36px auto;
          }
          .vision-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 16px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
          }
          .vision-card:hover {
            transform: translateY(-4px);
            border-color: #16A34A;
            box-shadow: 0 12px 30px rgba(22, 163, 74, 0.05);
          }
          .vision-card-title {
            font-size: 14px;
            font-weight: 700;
            color: #0F172A;
            margin: 0;
            font-family: 'Inter', sans-serif;
            line-height: 1.3;
          }
          .vision-banner {
            display: inline-block;
            background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
            border: 1px solid #BBF7D0;
            border-radius: 30px;
            padding: 14px 36px;
            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.04);
          }
          .vision-banner-text {
            font-size: 15px;
            font-weight: 800;
            color: #15803D;
            margin: 0;
            font-family: 'Inter', sans-serif;
          }

          /* Responsive scaling for Vision Section */
          @media (max-width: 1366px) {
            .vision-section {
              padding: 46px 5% !important;
            }
            .vision-cards-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 14px !important;
              max-width: 900px !important;
              margin-bottom: 28px !important;
            }
            .vision-card {
              padding: 14px 16px !important;
              gap: 12px !important;
            }
            .vision-card-title {
              font-size: 13.5px !important;
            }
            .vision-banner {
              padding: 12px 28px !important;
            }
            .vision-banner-text {
              font-size: 14px !important;
            }
          }

          @media (max-width: 1299px) {
            .vision-section {
              padding: 36px 4% !important;
            }
            .vision-cards-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 12px !important;
              max-width: 850px !important;
              margin-bottom: 24px !important;
            }
            .vision-card {
              padding: 12px 14px !important;
              gap: 10px !important;
            }
            .vision-card-title {
              font-size: 13px !important;
            }
            .vision-banner {
              padding: 10px 22px !important;
              border-radius: 24px !important;
            }
            .vision-banner-text {
              font-size: 13px !important;
            }
          }

          @media (max-width: 1024px) {
            .vision-cards-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 12px !important;
            }
            .vision-card-title {
              font-size: 13px !important;
            }
          }

          @media (max-width: 768px) {
            .vision-section {
              padding: 28px 16px !important;
            }
            .vision-cards-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 10px !important;
              margin-bottom: 20px !important;
            }
            .vision-card {
              padding: 10px 12px !important;
              gap: 8px !important;
            }
            .vision-card-title {
              font-size: 12px !important;
            }
            .vision-banner {
              padding: 10px 16px !important;
              border-radius: 20px !important;
            }
            .vision-banner-text {
              font-size: 12px !important;
            }
          }

          @media (max-width: 576px) {
            .vision-cards-grid {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          {/* Header */}
          <div style={{ marginBottom: 10 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
              borderRadius: 40, padding: "5px 16px", marginBottom: 20,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
              <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Our Vision</span>
            </div>

            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, maxWidth: 850, margin: "0 auto 24px auto" }}>
              A Digital Future Where Every Business<br />
              <span style={{ color: "#16A34A" }}>Can Own Its Growth</span>
            </h2>
          </div>

          {/* Core Vision Paragraph */}
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, maxWidth: 850, margin: "0 auto 40px auto", fontFamily: "'Inter', sans-serif" }}>
            We envision a future where a local business can access the fundamental digital capabilities required to compete, serve customers and grow—without having to build a complex technology infrastructure from scratch.
          </p>

          {/* Grid Layout of Ownership Pillars */}
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 20 }}>
            We want businesses to have:
          </div>

          <div className="vision-cards-grid">
            {[
              { title: "Their Own Brand", icon: <FiTag style={{ color: "#16A34A", width: 16, height: 16 }} /> },
              { title: "Their Own Customer Relationships", icon: <FiHeart style={{ color: "#16A34A", width: 16, height: 16 }} /> },
              { title: "Their Own Digital Store", icon: <FiShoppingBag style={{ color: "#16A34A", width: 16, height: 16 }} /> },
              { title: "Their Own Business Workflows", icon: <FiSettings style={{ color: "#16A34A", width: 16, height: 16 }} /> },
              { title: "Their Own AI-Assisted Experience", icon: <FiCpu style={{ color: "#16A34A", width: 16, height: 16 }} /> },
              { title: "Their Own Digital Ecosystem", icon: <FiGlobe style={{ color: "#16A34A", width: 16, height: 16 }} /> }
            ].map((pillar, idx) => (
              <div key={idx} className="vision-card">
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: "rgba(22, 163, 74, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  border: "1px solid rgba(22, 163, 74, 0.12)",
                  flexShrink: 0,
                  
                }}>
                  {pillar.icon}
                </div>
                <h4 className="vision-card-title">
                  {pillar.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Bottom Ecosystem Callout */}
          <div className="vision-banner">
            <p className="vision-banner-text">
              MessBee&apos;s vision is to make these capabilities more accessible through one connected Digital Business Operating System.
            </p>
          </div>

        </div>
      </section>
      {/* ── LEADERSHIP SECTION ── */}
      <section className="about-section" style={{ padding: "60px 6% 60px", background: "#FFFFFF" }}>
        <style>{`
          .leadership-tag {
            font-size: 13.5px;
            font-weight: 700;
            color: #16A34A;
            background: rgba(22, 163, 74, 0.06);
            border: 1px solid rgba(22, 163, 74, 0.12);
            padding: 8px 16px;
            border-radius: 30px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
          }
          .leadership-tag:hover {
            background: #16A34A;
            border-color: #16A34A;
            color: #FFFFFF;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(22, 163, 74, 0.15);
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Left Column: Bio Details */}
            <div style={{ flex: "1 1 480px", textAlign: "left" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
                borderRadius: 40, padding: "5px 16px", marginBottom: 20,
              }}>
                <FiUsers style={{ color: "#16A34A", width: 12, height: 12 }} />
                <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Our Leadership</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                Leadership &<br />
                <span style={{ color: "#16A34A" }}>Corporate Structure</span>
              </h2>

              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.9, marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
                 MessBee is founded and led by <strong>Mr. Anil Kumar Atri</strong>, Founder & CEO. The platform is being developed with a focus on building practical, scalable, and compliance-oriented technology solutions for modern businesses.
              </p>

              <p style={{ fontSize: 16, fontWeight: 800, color: "#16A34A", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
                The leadership philosophy behind MessBee is straightforward:
              </p>

              <div style={{
                borderLeft: "3px solid #16A34A",
                paddingLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  Technology should give businesses more control—not create more dependency.
                </p>
              </div>

              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.9, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                MessBee is being developed to help businesses strengthen customer engagement, automate suitable business processes, use AI intelligently and build a digital ecosystem that can evolve with their requirements.
              </p>
            </div>

            {/* Right Column: Key Tenets Board */}
            <div style={{ flex: "1 1 200px", textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 24 }}>
                Our approach is centered around:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "Innovation", icon: <FiZap style={{ width: 12, height: 12 }} />, color: "#F59E0B" },
                  { name: "Reliability", icon: <FiHeart style={{ width: 12, height: 12 }} />, color: "#0EA5E9" },
                  { name: "Scalability", icon: <FiTrendingUp style={{ width: 12, height: 12 }} />, color: "#6366F1" },
                  { name: "Security", icon: <FiShield style={{ width: 12, height: 12 }} />, color: "#10B981" },
                  { name: "Transparency", icon: <FiEye style={{ width: 12, height: 12 }} />, color: "#8B5CF6" },
                  { name: "Automation", icon: <FiSettings style={{ width: 12, height: 12 }} />, color: "#F97316" },
                  { name: "AI", icon: <FiCpu style={{ width: 12, height: 12 }} />, color: "#EC4899" },
                  { name: "Customer Ownership", icon: <FiTarget style={{ width: 12, height: 12 }} />, color: "#EF4444" },
                  { name: "Responsible Technology", icon: <FiCheckSquare style={{ width: 12, height: 12 }} />, color: "#64748B" }
                ].map((val, idx) => {
                  const isHovered = hoveredLeaderCap === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredLeaderCap(idx)}
                      onMouseLeave={() => setHoveredLeaderCap(null)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        background: isHovered ? val.color : "#F8FAFC",
                        border: `1.5px solid ${isHovered ? val.color : "#E2E8F0"}`,
                        padding: "8px 14px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        cursor: "pointer",
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "all 0.2s ease",
                        boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isHovered ? "rgba(255, 255, 255, 0.2)" : `${val.color}15`,
                        color: isHovered ? "#FFFFFF" : val.color,
                        flexShrink: 0
                      }}>
                        {val.icon}
                      </div>
                      <span style={{ color: isHovered ? "#FFFFFF" : "#0F172A", transition: "color 0.2s ease" }}>
                        {val.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>      {/* ── FREQUENTLY ASKED QUESTIONS SECTION ── */}
      <section style={{ padding: "60px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <style>{`
          .about-faq-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 16px;
            margin-bottom: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.01);
            transition: all 0.3s ease;
          }
          .about-faq-card:hover {
            border-color: #16A34A;
            box-shadow: 0 8px 24px rgba(22, 163, 74, 0.05);
          }
          .about-faq-trigger {
            width: 100%;
            padding: 18px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            background: transparent;
            border: none;
            cursor: pointer;
            text-align: left;
            outline: none;
          }
          .about-faq-question {
            font-size: 15px;
            font-weight: 700;
            color: #0F172A;
            margin: 0;
            text-align: left;
            flex: 1 1 auto;
            line-height: 1.45;
            transition: color 0.25s ease;
          }
          .about-faq-card:hover .about-faq-question {
            color: #16A34A;
          }
          .about-faq-answer {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0 24px;
            font-size: 14px;
            color: #475569;
            line-height: 1.7;
          }
          .about-faq-answer.open {
            max-height: 350px;
            opacity: 1;
            padding-bottom: 20px;
          }
          .faq-icon-holder {
            width: 32px;
            height: 32px;
            min-width: 32px;
            min-height: 32px;
            border-radius: 50%;
            background: #F1F5F9;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }
          .about-faq-card.open-card .faq-icon-holder {
            background: #16A34A;
            transform: rotate(180deg);
          }

          /* Responsive Scaling for Tablets & Laptops */
          @media (max-width: 1024px) {
            .about-faq-trigger {
              padding: 16px 20px !important;
            }
            .about-faq-question {
              font-size: 14.5px !important;
            }
            .about-faq-answer {
              padding: 0 20px !important;
              font-size: 13.5px !important;
            }
            .about-faq-answer.open {
              padding-bottom: 16px !important;
            }
          }

          /* Mobile Smartphones (max-width: 768px) */
          @media (max-width: 768px) {
            .about-faq-card {
              border-radius: 14px !important;
              margin-bottom: 10px !important;
            }
            .about-faq-trigger {
              padding: 14px 16px !important;
              gap: 12px !important;
            }
            .about-faq-question {
              font-size: 13.5px !important;
              font-weight: 700 !important;
              line-height: 1.45 !important;
              text-align: left !important;
            }
            .about-faq-answer {
              padding: 0 16px !important;
              font-size: 13px !important;
              line-height: 1.65 !important;
            }
            .about-faq-answer.open {
              padding-bottom: 14px !important;
            }
            .faq-icon-holder {
              width: 28px !important;
              height: 28px !important;
              min-width: 28px !important;
              min-height: 28px !important;
            }
          }

          /* Extra Small Mobile (max-width: 480px) */
          @media (max-width: 480px) {
            .about-faq-trigger {
              padding: 12px 14px !important;
              gap: 10px !important;
            }
            .about-faq-question {
              font-size: 13px !important;
            }
            .about-faq-answer {
              padding: 0 14px !important;
              font-size: 12.5px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)",
            borderRadius: 40, padding: "5px 16px", marginBottom: 20,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#16A34A"><circle cx="12" cy="12" r="10" /></svg>
            <span style={{ color: "#16A34A", fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Common Questions</span>
          </div>

          {/* Heading */}
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.18, marginBottom: 48 }}>
            Frequently Asked <span style={{ color: "#16A34A" }}>Questions</span>
          </h2>

          {/* Accordion List */}
          <div style={{ textAlign: "left" }}>
            {[
              {
                q: "What is MessBee?",
                a: "MessBee is a Digital Business Operating System designed to help businesses manage customer communication, CRM, AI assistance, marketing automation, commerce, orders, payments, loyalty, analytics and business workflows from one connected platform."
              },
              {
                q: "Is MessBee only a WhatsApp Business platform?",
                a: "No. WhatsApp Business capabilities are an important part of MessBee, but MessBee is designed as a broader digital business platform that combines communication with CRM, AI, automation, commerce, operations and analytics."
              },
              {
                q: "Who can use MessBee?",
                a: "MessBee is designed for a wide range of businesses, including retailers, Kirana stores, restaurants, clinics, pharmacies, boutiques, gyms, coaching institutes, service businesses, distributors, manufacturers, educational institutions and growing enterprises."
              },
              {
                q: "Can small businesses use MessBee?",
                a: "Yes. MessBee is designed to support businesses at different stages of digital growth. A small business can begin with the capabilities it needs and expand its use as the business grows."
              },
              {
                q: "Does MessBee provide CRM?",
                a: "Yes. MessBee includes CRM capabilities for organizing customer profiles, contacts, interactions, enquiries, leads and customer relationships."
              },
              {
                q: "Does MessBee support AI automation?",
                a: "MessBee includes AI-powered capabilities designed to assist with customer enquiries, FAQs, product or service information, recommendations, order-related conversations, follow-ups and other suitable repetitive interactions."
              },
              {
                q: "Can MessBee automate business workflows?",
                a: "Yes. MessBee is designed to support no-code or configurable automation workflows for activities such as lead follow-ups, reminders, customer re-engagement, notifications, campaigns and other routine business processes."
              },
              {
                q: "Can MessBee manage multiple business locations?",
                a: "MessBee is designed to support multi-location business management, allowing growing organizations to manage multiple branches, stores, offices or locations from a centralized environment."
              },
              {
                q: "Can MessBee integrate with other software?",
                a: "MessBee is designed to be API-ready so that businesses can connect supported applications, websites and business systems with their MessBee environment."
              },
              {
                q: "Is MessBee suitable for Indian MSMEs?",
                a: "Yes. MessBee's positioning and product ecosystem are specifically designed to address the digital communication, customer management, automation, and growth requirements of Indian businesses, including MSMEs and growing organizations."
              }
            ].map((faq, idx) => {
              const isOpen = aboutFaqOpenIdx === idx;
              return (
                <div key={idx} className={`about-faq-card ${isOpen ? "open-card" : ""}`}>
                  <button className="about-faq-trigger" onClick={() => setAboutFaqOpenIdx(isOpen ? null : idx)}>
                    <h3 className="about-faq-question" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{faq.q}</h3>
                    <div className="faq-icon-holder">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#FFFFFF" : "#64748B"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>
                  <div className={`about-faq-answer ${isOpen ? "open" : ""}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "14.5px", color: "#475569", lineHeight: "1.7" }}>
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── THE MESSBEE PROMISE SECTION ── */}
      <section style={{ padding: "40px 6%", background: "#FFFFFF" }}>
        <style>{`
          .promise-container {
            background: #0B0F19;
            border: 1.5px solid #16A34A;
            border-radius: 20px;
            padding: 36px 32px;
            max-width: 1100px;
            margin: 0 auto;
            text-align: center;
            box-shadow: 0 0 30px rgba(22, 163, 74, 0.25), inset 0 0 20px rgba(22, 163, 74, 0.15);
          }
          .promise-verb-light-card {
            background: #111827;
            border: 1.5px solid rgba(74, 222, 128, 0.35);
            border-radius: 12px;
            padding: 10px 16px;
            font-size: 13.5px;
            font-weight: 800;
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            text-align: center;
            transition: all 0.25s ease;
            cursor: default;
            box-shadow: 0 0 12px rgba(74, 222, 128, 0.08);
          }
          .promise-verb-light-card:hover {
            background: #16A34A !important;
            border-color: #4ADE80 !important;
            transform: translateY(-2px);
            box-shadow: 0 0 20px rgba(74, 222, 128, 0.45) !important;
          }
          .promise-verb-light-card:hover .promise-verb-icon {
            color: #FFFFFF !important;
          }
          .promise-verb-light-card:hover .promise-verb-text {
            color: #FFFFFF !important;
          }
          @media (max-width: 768px) {
            .promise-container {
              padding: 32px 18px !important;
              border-radius: 20px !important;
            }
            .promise-verbs-row {
              display: grid !important;
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
              width: 100% !important;
            }
            .promise-verb-light-card {
              flex: none !important;
              max-width: 100% !important;
              width: 100% !important;
              padding: 10px 12px !important;
              font-size: 13px !important;
              border-radius: 12px !important;
            }
          }
          @media (max-width: 480px) {
            .promise-container {
              padding: 24px 14px !important;
            }
            .promise-verbs-row {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
            }
          }
        `}</style>

        <div className="promise-container">

          {/* Heading */}
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 900, color: "#FFFFFF", textShadow: "0 0 10px rgba(22, 163, 74, 0.4)", lineHeight: 1.18, marginBottom: 12 }}>
            The MessBee Promise
          </h2>

          {/* Negation Text Paragraphs */}
          <div style={{ fontSize: 15.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 14 }}>
            <p style={{ margin: "0 0 4px 0", fontFamily: "'Inter', sans-serif" }}>
              MessBee is not intended to be just another messaging tool.
            </p>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif" }}>
              It is not just another CRM. It is not just another chatbot. It is not just another online store.
            </p>
          </div>

          {/* Connection Text Header Highlight */}
          <p style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 900, color: "#4ADE80", textShadow: "0 0 8px rgba(74, 222, 128, 0.3)", lineHeight: 1.35, margin: "0 auto 16px auto", fontFamily: "'Inter', sans-serif" }}>
            MessBee brings these capabilities together into one connected business ecosystem.
          </p>

          {/* Verbs Heading */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
            A platform where businesses can:
          </div>

          {/* Verbs Flex Rows (4 Upper, 4 Lower - Centered) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, alignItems: "center" }}>
            {/* Row 1 */}
            <div className="promise-verbs-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, width: "100%" }}>
              {[
                { name: "Communicate", icon: <FiMessageSquare style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Engage", icon: <FiHeart style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Automate", icon: <FiZap style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Sell", icon: <FiShoppingBag style={{ width: 14, height: 14, color: "currentColor" }} /> },
              ].map((item, idx) => (
                <div key={idx} className="promise-verb-light-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flex: "1 1 180px", maxWidth: "240px" }}>
                  <span className="promise-verb-icon" style={{ display: "flex", color: "#4ADE80", transition: "color 0.2s ease" }}>
                    {item.icon}
                  </span>
                  <span className="promise-verb-text" style={{ color: "#FFFFFF", transition: "color 0.2s ease" }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="promise-verbs-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, width: "100%" }}>
              {[
                { name: "Manage", icon: <FiBriefcase style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Understand", icon: <FiBarChart2 style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Retain", icon: <FiGift style={{ width: 14, height: 14, color: "currentColor" }} /> },
                { name: "Grow", icon: <FiTrendingUp style={{ width: 14, height: 14, color: "currentColor" }} /> }
              ].map((item, idx) => (
                <div key={idx} className="promise-verb-light-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flex: "1 1 180px", maxWidth: "240px" }}>
                  <span className="promise-verb-icon" style={{ display: "flex", color: "#4ADE80", transition: "color 0.2s ease" }}>
                    {item.icon}
                  </span>
                  <span className="promise-verb-text" style={{ color: "#FFFFFF", transition: "color 0.2s ease" }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Big Editorial Quote */}
          <div style={{ position: "relative", padding: "12px 0", marginBottom: 20 }}>
            <span style={{ position: "absolute", top: -5, left: "5%", fontSize: 70, color: "rgba(74, 222, 128, 0.15)", lineHeight: 0, fontFamily: "serif" }}>&ldquo;</span>
            <p style={{ fontSize: "17.5px", fontWeight: 800, color: "#E2E8F0", lineHeight: 1.5, maxWidth: 820, margin: "0 auto", fontFamily: "'Inter', sans-serif" }}>
              Because your business deserves technology that works around your business&mdash;not the other way around.
            </p>
            <span style={{ position: "absolute", bottom: -25, right: "5%", fontSize: 70, color: "rgba(74, 222, 128, 0.15)", lineHeight: 0, fontFamily: "serif" }}>&rdquo;</span>
          </div>

          {/* Digital OS Footer Text Details */}
          <div style={{
            borderTop: "1px solid rgba(74, 222, 128, 0.2)",
            paddingTop: 24,
            marginTop: 24
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#FFFFFF", marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: "#4ADE80", textShadow: "0 0 6px rgba(74, 222, 128, 0.2)" }}>MessBee</span> &mdash; India&apos;s Digital Business Operating System
            </h3>

            <p style={{ fontSize: "14.5px", fontWeight: 800, color: "#4ADE80", letterSpacing: 0.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Own Your Business <span style={{ color: "#475569" }}>&bull;</span> Own Your Customers <span style={{ color: "#475569" }}>&bull;</span> Own Your Growth
            </p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "50px 6%", background: "#1F2937", borderTop: "none", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 900, color: "#FFFFFF", marginBottom: 12, lineHeight: 1.2 }}>
            MessBee: One Business. <span style={{ color: "#16A34A" }}>One Connected Digital Ecosystem.</span>
          </h2>
          <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 24, lineHeight: 1.6 }}>
            Your Business. Your Brand. Your Customers. Your Control. &nbsp;
            <strong style={{ color: "#FFFFFF" }}><span style={{ color: "#22C55E" }}>MessBee</span> &mdash; India&apos;s Digital Business Operating System</strong>
          </p>
          <button
            onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}
            style={{
              background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 40,
              padding: "12px 36px", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 4px 28px rgba(0,200,83,0.45)", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            Start for free →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
};

export default AboutPage;
