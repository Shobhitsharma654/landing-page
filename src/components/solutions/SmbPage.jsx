import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";

const G  = "#16A34A";
const GL = "#F0FDF4";
const GB = "#BBF7D0";
const D2 = "#111827";
const MU = "#64748B";

const Pill = ({ children }) => (
  <div style={{ display:"inline-block", background:GL, border:`1px solid ${GB}`, color:G, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:16 }}>
    {children}
  </div>
);
/* ═══════════════════════════════════════════════════════════════════════
   MessBee — Small & Medium Business Solutions Page
   Distinct SMB Hero Graphic with MessBee Logo.
   Compact, sleek typography & clean layout.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. With MessBee, you can (8 items from prompt)
const WITH_MESSBEE_YOU_CAN = [
  { text: "Manage customers and leads", icon: "👥" },
  { text: "Keep customer information organized", icon: "📁" },
  { text: "Connect supported WhatsApp Business services", icon: "💬" },
  { text: "Run marketing campaigns", icon: "📢" },
  { text: "Automate routine follow-ups", icon: "🔄" },
  { text: "Create a digital storefront", icon: "🛍️" },
  { text: "Manage customer communication", icon: "💬" },
  { text: "Track business activity and performance", icon: "📊" },
];

// 2. What MessBee Can Help You With (6 items from prompt)
const WHAT_MESSBEE_HELP_WITH = [
  {
    title: "Manage Customers",
    desc: "Keep customer and lead information organized in one place. Give your team the context they need before contacting a customer or following up on an enquiry.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "👤",
  },
  {
    title: "Communicate on WhatsApp",
    desc: "Use supported WhatsApp Business capabilities to handle customer conversations, notifications and eligible business communication.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "💬",
  },
  {
    title: "Automate Follow-Ups",
    desc: "Create workflows for repetitive tasks such as lead follow-ups, reminders and customer engagement.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "⚡",
  },
  {
    title: "Market Your Business",
    desc: "Plan and manage campaigns across supported channels, including WhatsApp, SMS and email, according to your plan and applicable requirements.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "📢",
  },
  {
    title: "Build Your Digital Store",
    desc: "Showcase your products or services through a digital storefront and make it easier for customers to discover and contact your business.",
    color: "#06B6D4",
    bg: "#CFFAFE",
    border: "#A5F3FC",
    icon: "🛍️",
  },
  {
    title: "Use AI Where It Helps",
    desc: "Use supported AI features to assist with customer enquiries, responses and routine business workflows while keeping your team in control.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "🤖",
  },
];

// 3. Made for Different Types of Businesses (5 items from prompt)
const BUSINESS_TYPES = [
  {
    type: "Retail & Local Businesses",
    desc: "Keep customer records organized, promote your products and stay connected with regular customers.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  {
    type: "Service Businesses",
    desc: "Manage enquiries, customer information and follow-ups without relying on multiple disconnected tools.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    type: "E-commerce Businesses",
    desc: "Bring customer communication, marketing and supported commerce activities into a more connected workflow.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
  {
    type: "Professional Businesses",
    desc: "Manage leads, client information, communication and follow-ups from a centralized platform.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
  },
  {
    type: "Growing Businesses",
    desc: "Build a digital business setup that can expand as your customer base and daily operations increase.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
  },
];

// 4. Flow Nodes (6 nodes from prompt)
const WORKFLOW_FLOW_NODES = [
  "Customer",
  "CRM",
  "Communication",
  "Marketing",
  "Automation",
  "Growth",
];

// 5. Why Businesses Choose MessBee (6 items from prompt)
const WHY_CHOOSE_MESSBEE = [
  {
    title: "Everything in One Place",
    desc: "Manage important customer and business activities through a connected platform.",
    icon: "📌",
  },
  {
    title: "Easier Customer Management",
    desc: "Keep customer information, leads and interactions organized.",
    icon: "👥",
  },
  {
    title: "Save Time on Routine Work",
    desc: "Automate repetitive tasks and follow-ups where appropriate.",
    icon: "⚡",
  },
  {
    title: "Stay Connected With Customers",
    desc: "Use supported communication channels to engage customers throughout their journey.",
    icon: "💬",
  },
  {
    title: "Build Direct Customer Relationships",
    desc: "Create a digital presence and communicate directly with the people who matter to your business.",
    icon: "❤️",
  },
  {
    title: "Grow at Your Own Pace",
    desc: "Start with what your business needs and expand your use of MessBee over time.",
    icon: "📈",
  },
];

// 6. Frequently Asked Questions (7 items from prompt)
const SMB_FAQS = [
  {
    q: "What is MessBee for small and medium businesses?",
    a: "MessBee is a business platform that helps small and medium businesses manage customers, leads, communication, marketing, automation and supported digital commerce activities.",
  },
  {
    q: "Is MessBee suitable for a small business?",
    a: "Yes. MessBee is designed for businesses that want to organize their customer and business processes and gradually expand their digital operations.",
  },
  {
    q: "What can I manage with MessBee?",
    a: "Depending on your plan and configuration, you can use MessBee for CRM, WhatsApp Business communication, marketing automation, AI-assisted workflows and digital storefront capabilities.",
  },
  {
    q: "Can I manage leads with MessBee?",
    a: "Yes. MessBee CRM can help you organize leads, track their progress and manage follow-up activities.",
  },
  {
    q: "Can MessBee automate business tasks?",
    a: "Yes. Supported automation features can be used to create workflows for repetitive customer and business activities.",
  },
  {
    q: "Can I connect WhatsApp Business?",
    a: "MessBee may support WhatsApp Business Platform capabilities subject to Meta/WhatsApp requirements, account eligibility, permissions and configuration.",
  },
  {
    q: "Can I use MessBee for a local business?",
    a: "Yes. Local retailers, service providers and other businesses can use MessBee to organize customer relationships and build a stronger digital presence.",
  },
];

/* ── FAQ Accordion Item Component ── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid #F1F5F9` }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: open ? G : D2, transition: "color .2s" }}>{q}</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: open ? GL : "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .2s",
            color: open ? G : MU,
            border: open ? `1px solid ${GB}` : "1px solid transparent",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d={open ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div style={{ fontSize: 13, color: MU, lineHeight: 1.8, paddingBottom: 16 }}>{a}</div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN SMALL & MEDIUM BUSINESSES PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const SmbPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── BUTTONS ── */
        .smb-btn-primary {
          background: #16A34A;
          color: #FFFFFF;
          border: none;
          border-radius: 40px;
          padding: 11px 26px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 18px rgba(22, 163, 74, 0.22);
          user-select: none;
          text-decoration: none;
        }
        .smb-btn-primary:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.32);
        }

        .smb-btn-secondary {
          background: #FFFFFF;
          color: #0F172A;
          border: 1.5px solid #E2E8F0;
          border-radius: 40px;
          padding: 10px 22px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.03);
          user-select: none;
          text-decoration: none;
        }
        .smb-btn-secondary:hover {
          border-color: #16A34A;
          color: #16A34A;
          background: #F0FDF4;
          transform: translateY(-2px);
        }

        /* ── CARDS HOVER ── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .smb-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: fadeInUp 0.5s ease-out both;
        }
        .smb-glass-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 30px rgba(22, 163, 74, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);
          border-color: #BBF7D0 !important;
        }

        .smb-dark-card {
          transition: all 0.25s ease;
        }
        .smb-dark-card:hover {
          transform: translateY(-3px);
          border-color: rgba(74, 222, 128, 0.4) !important;
        }

        /* ── LAPTOP & DESKTOP RESPONSIVE GRID SYSTEM ── */
        .smb-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .grid-col-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .grid-col-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .grid-col-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .grid-col-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .smb-hero-row { gap: 60px; }
          .grid-col-3 { gap: 22px; }
        }

        /* Medium Laptops (1200px - 1439px) */
        @media (max-width: 1439px) and (min-width: 1200px) {
          .grid-col-5 { grid-template-columns: repeat(3, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(3, 1fr); }
        }

        /* Small Laptops (1024px - 1199px) */
        @media (max-width: 1199px) and (min-width: 1024px) {
          .grid-col-5 { grid-template-columns: repeat(3, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-3 { grid-template-columns: repeat(2, 1fr); }
          .smb-hero-row { gap: 32px; }
        }

        .smb-hero-right-col { flex: 0.9; min-width: 320px; position: relative; display: flex; justify-content: center; }
        .smb-hero-right-card { transform: scale(0.8); transform-origin: center right; width: 100%; max-width: 480px; }

        /* Compact Laptop / Tablet-Laptop (under 1024px) */
        @media (max-width: 1023px) {
          .smb-hero-row { flex-direction: column !important; }
          .smb-hero-right-col { width: 100% !important; min-width: unset !important; justify-content: center !important; margin-top: 24px !important; }
          .smb-hero-right-card { transform: none !important; transform-origin: center center !important; max-width: 340px !important; margin: 0 auto !important; }
          .grid-col-5 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-3 { grid-template-columns: repeat(1, 1fr); }
          .grid-col-2 { grid-template-columns: repeat(1, 1fr); }
        }

        /* Mobile Phones & Tablets (under 768px) */
        @media (max-width: 768px) {
          .grid-col-4, .grid-col-3 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .smb-help-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .grid-col-5, .grid-col-2 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .smb-glass-card {
            padding: 12px 10px !important;
            border-radius: 12px !important;
          }
          .smb-why-title {
            font-size: 12.5px !important;
            line-height: 1.3 !important;
          }
          .smb-why-desc {
            font-size: 11px !important;
            line-height: 1.5 !important;
          }
          .smb-glass-card-icon {
            width: 30px !important;
            height: 30px !important;
            font-size: 15px !important;
            border-radius: 8px !important;
            margin-bottom: 8px !important;
          }
          .smb-glass-card-text {
            font-size: 11.5px !important;
            line-height: 1.3 !important;
          }
          .smb-india-section {
            padding: 32px 16px !important;
          }
          .smb-india-card {
            padding: 24px 18px !important;
            border-radius: 18px !important;
          }
        }

        @media (max-width: 480px) {
          .grid-col-4, .grid-col-3 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .smb-help-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .smb-glass-card {
            padding: 10px 8px !important;
            border-radius: 10px !important;
          }
          .smb-why-title {
            font-size: 11.5px !important;
          }
          .smb-why-desc {
            font-size: 10px !important;
          }
          .smb-glass-card-text {
            font-size: 10.5px !important;
          }
          .smb-india-section {
            padding: 24px 12px !important;
          }
          .smb-india-card {
            padding: 20px 14px !important;
            border-radius: 16px !important;
          }
        }

        /* Glowing Pulse Animation */
        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        .pulse-aura {
          animation: auraPulse 3.5s ease-in-out infinite;
        }

        /* Efficiency Flow Grid */
        .smb-efficiency-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px 6px;
          margin: 24px auto;
        }
        .smb-eff-card {
          background: #FFFFFF;
          border: 1.5px solid #BBF7D0;
          color: #16A34A;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13.5px;
          font-weight: 700;
          display: inline-block;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.05);
        }
        .smb-eff-arrow {
          color: #94A3B8;
          font-size: 16px;
          font-weight: 700;
          padding: 0 4px;
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .smb-efficiency-grid {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
            gap: 10px 4px !important;
            margin: 18px auto 22px !important;
            width: 100% !important;
          }
          .smb-eff-card {
            background: #FFFFFF !important;
            border: 1.5px solid #BBF7D0 !important;
            border-radius: 7px !important;
            padding: 6px 12px !important;
            font-size: 13.5px !important;
            font-weight: 700 !important;
            color: #16A34A !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          .smb-eff-arrow {
            color: #94A3B8 !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            padding: 0 2px !important;
          }
        }

        @media (max-width: 480px) {
          .smb-efficiency-grid {
            gap: 8px 3px !important;
          }
          .smb-eff-card {
            padding: 5px 10px !important;
            font-size: 12.5px !important;
            border-radius: 6px !important;
          }
          .smb-eff-arrow {
            font-size: 13px !important;
          }
        }
      `}</style>

      {/* SEO Document Title & Description */}
      <title>Small &amp; Medium Business Solutions | MessBee</title>
      <meta
        name="description"
        content="MessBee helps small and medium businesses manage customers, WhatsApp Business, marketing, automation and digital commerce from one connected platform."
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (SMB Specific Graphic Layout & Compact Typography)
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          marginTop: 70,
          padding: "56px 6% 64px",
          position: "relative",
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
          overflow: "hidden",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(22,163,74,0.06) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="smb-hero-row" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div style={{ flex: 1.1, minWidth: 320 }}>
            {/* Provided Badge: Small & Medium Businesses */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#D1FAE5",
                color: "#059669",
                padding: "5px 14px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 18,
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 6px #16A34A" }} />
              Small &amp; Medium Businesses
            </div>

            {/* Recommended H1 */}
            <h1
              style={{
                fontSize: "clamp(28px, 2.9vw, 42px)",
                fontWeight: 900,
                lineHeight: 1.12,
                color: "#0F172A",
                marginBottom: 14,
                letterSpacing: "-1px",
              }}
            >
              Small &amp; Medium Business Solutions That Help You{" "}
              <span style={{ color: "#16A34A" }}>Manage, Connect &amp; Grow</span>
            </h1>

            {/* Provided Sub-headline */}
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 800, color: "#16A34A", marginBottom: 14, letterSpacing: "-0.3px" }}>
              Run Your Business From One Connected Platform
            </p>

            {/* Description */}
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, marginBottom: 22, maxWidth: 540 }}>
              MessBee unifies CRM, marketing, and communication into one connected platform—eliminating scattered tools so you can manage relationships and scale effortlessly.
            </p>

            {/* Provided Tagline Badge */}
            <div
              style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: 14,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 800,
                color: "#15803D",
                marginBottom: 28,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Manage your customers. Simplify your work. Grow your business.
            </div>

            {/* CTAs from Prompt */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="smb-btn-primary" onClick={handleStart} style={{ fontSize: 13, padding: "11px 26px" }}>
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                className="smb-btn-secondary"
                onClick={() => document.getElementById("built-for-growing-businesses")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore MessBee
              </button>
            </div>
          </div>

          {/* Right Column: Unique SMB Graphic Layout featuring Official MessBee Logo & SMB Operations Pipeline */}
          <div className="smb-hero-right-col">
            <div
              className="smb-hero-right-card"
              style={{
                background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
                borderRadius: 24,
                padding: "28px 24px",
                boxShadow: "0 20px 50px rgba(2, 44, 34, 0.4)",
                border: "1px solid rgba(52, 211, 153, 0.25)",
                color: "#FFFFFF",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Outer Pulse aura background */}
              <div
                className="pulse-aura"
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "20%",
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(22,163,74,0.28) 0%, rgba(22,163,74,0) 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Unique SMB Graphic Header featuring Official MessBee Logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 2 }}>
                    <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee for SMBs</div>
                    <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>One Connected Business Platform</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, background: "rgba(22,163,74,0.2)", color: "#4ADE80", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(22,163,74,0.3)" }}>
                  SME Ready
                </span>
              </div>

              {/* SMB Multi-Channel Connected Flow Bar (Unique to SMB page) */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>
                  Connected Operations Pipeline
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { step: "Enquiries & Leads", detail: "Centralized Records", icon: "📥", color: "#38BDF8" },
                    { step: "WhatsApp & Comms", detail: "Active Conversation", icon: "💬", color: "#4ADE80" },
                    { step: "Automation & Growth", detail: "Automated Follow-ups", icon: "📈", color: "#F472B6" },
                  ].map((pipe, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{pipe.icon}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#FFFFFF" }}>{pipe.step}</span>
                      </div>
                      <span style={{ fontSize: 10, color: pipe.color, fontWeight: 700 }}>{pipe.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Connector Badge */}
              <div style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: 12, padding: 10, textAlign: "center" }}>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: "#4ADE80" }}>
                  Manage. Connect. Grow.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: BUILT FOR GROWING BUSINESSES
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="built-for-growing-businesses" style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Section Headings from Prompt */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Organized Workflow
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Built for <span style={{ color: "#16A34A" }}>Growing Businesses</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 20px", lineHeight: 1.68 }}>
              MessBee is designed for businesses that want to move beyond scattered tools and build a more organized digital workflow.
            </p>

            <div
              style={{
                display: "inline-block",
                background: "#0F172A",
                color: "#FFFFFF",
                padding: "7px 18px",
                borderRadius: 30,
                fontSize: 13.5,
                fontWeight: 900,
                letterSpacing: "-0.2px",
              }}
            >
              With MessBee, you can:
            </div>
          </div>

          {/* 8 List Items Grid */}
          <div className="grid-col-4" style={{ marginBottom: 28 }}>
            {WITH_MESSBEE_YOU_CAN.map((item, idx) => (
              <div
                key={idx}
                className="smb-glass-card"
                style={{
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  animationDelay: `${idx * 40}ms`,
                }}
              >
                <div
                  className="smb-glass-card-icon"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 20,
                  }}
                >
                  {item.icon}
                </div>
                <div className="smb-glass-card-text" style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", lineHeight: 1.35 }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13.5, color: "#475569", textAlign: "center", fontWeight: 700 }}>
            You can start with the tools you need today and add more as your business grows.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: WHAT MESSBEE CAN HELP YOU WITH
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Headings from Prompt */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Key Capabilities
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              What MessBee <span style={{ color: "#16A34A" }}>Can Help You With</span>
            </h2>
          </div>

          {/* 6 Feature Tool Cards from Prompt */}
          <div className="grid-col-3 smb-help-grid">
            {WHAT_MESSBEE_HELP_WITH.map((t, idx) => (
              <div
                key={idx}
                className="smb-glass-card"
                style={{
                  padding: 22,
                  border: `1px solid ${t.border}`,
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: t.bg,
                    color: t.color,
                    border: `1px solid ${t.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 14,
                  }}
                >
                  {t.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", marginBottom: 8 }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: MADE FOR DIFFERENT TYPES OF BUSINESSES
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Headings from Prompt */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Versatile Support
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Made for <span style={{ color: "#16A34A" }}>Different Types of Businesses</span>
            </h2>
          </div>

          {/* 5 Business Type Cards from Prompt */}
          <div className="grid-col-5">
            {BUSINESS_TYPES.map((b, idx) => (
              <div
                key={idx}
                className="smb-glass-card"
                style={{
                  padding: 18,
                  border: `1px solid ${b.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: b.color,
                      marginBottom: 12,
                    }}
                  />
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>{b.type}</h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: LESS SWITCHING. MORE GETTING THINGS DONE.
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "60px 6%", background: GL, borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>Efficiency</Pill>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 900, color: D2, letterSpacing: "-1px", marginBottom: 12 }}>
              Less Switching. <span style={{ color: G }}>More Getting Things Done.</span>
            </h2>
            <p style={{ fontSize: 13, color: MU, maxWidth: 660, margin: "0 auto 8px", lineHeight: 1.68 }}>
              Small businesses often use one tool for customer contacts, another for WhatsApp, another for marketing and spreadsheets for tracking leads.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: G, maxWidth: 560, margin: "0 auto" }}>
              MessBee brings these activities closer together.
            </p>
          </div>

          <div className="smb-efficiency-grid">
            {WORKFLOW_FLOW_NODES.map((node, i) => (
              <React.Fragment key={node}>
                <div className="smb-eff-card">{node}</div>
                {i < WORKFLOW_FLOW_NODES.length - 1 && (
                  <span className="smb-eff-arrow">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, color: MU, textAlign: "center", letterSpacing: "0.2px" }}>
            Your team gets a clearer picture of customer activity, while customers get a more consistent experience.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: WHY BUSINESSES CHOOSE MESSBEE
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Heading from Prompt */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Why MessBee
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Why Businesses <span style={{ color: "#16A34A" }}>Choose MessBee</span>
            </h2>
          </div>

          {/* 6 Reason Cards from Prompt */}
          <div className="grid-col-3">
            {WHY_CHOOSE_MESSBEE.map((r, idx) => (
              <div
                key={idx}
                className="smb-glass-card"
                style={{
                  padding: 22,
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div
                  className="smb-glass-card-icon"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 14,
                  }}
                >
                  {r.icon}
                </div>
                <h3 className="smb-why-title" style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>{r.title}</h3>
                <p className="smb-why-desc" style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: BUILT WITH INDIAN BUSINESSES IN MIND
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="smb-india-section" style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            className="smb-india-card"
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
            <div style={{ maxWidth: 840, position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(22,163,74,0.15)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  borderRadius: 40,
                  padding: "4px 12px",
                  marginBottom: 16,
                }}
              >
                <svg width="16" height="12" viewBox="0 0 90 60" style={{ borderRadius: 2, flexShrink: 0 }}><rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#FFFFFF"/><rect y="40" width="90" height="20" fill="#138808"/><circle cx="45" cy="30" r="8" fill="#000080" /><circle cx="45" cy="30" r="6" fill="#FFFFFF" /><circle cx="45" cy="30" r="2" fill="#000080" /></svg>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#4ADE80" }}>Indian Businesses</span>
              </div>

              {/* Title from Prompt */}
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, marginBottom: 14, letterSpacing: "-1px" }}>
                Built With Indian Businesses in Mind
              </h2>

              {/* Paragraphs from Prompt */}
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 12 }}>
                Small and medium businesses across India work differently. A local retailer, a service provider and an online seller may have very different day-to-day needs.
              </p>
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 14 }}>
                MessBee is built to support these different business models while giving them access to connected tools for customer management, communication, marketing, automation and digital commerce.
              </p>
              <p style={{ fontSize: 13.5, color: "#4ADE80", fontWeight: 700, lineHeight: 1.7 }}>
                Whether you are taking your first steps online or looking to organize an existing digital operation, MessBee can grow with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: YOUR CUSTOMERS ARE YOUR BUSINESS (FINAL CTA)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: GL, padding: "72px 6%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
          <Pill>Your Customers Are Your Business</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            The tools you use should make it easier to<br />
            <span style={{ color: G }}>build and maintain those relationships.</span>
          </h2>
          <p style={{ fontSize: 14, color: MU, lineHeight: 1.7, maxWidth: 660, margin: "0 auto 24px" }}>
            MessBee helps bring customer information, communication and business workflows together so your team can spend less time managing disconnected systems and more time serving customers.
          </p>
          <div style={{ fontSize: 15, fontWeight: 800, color: G, marginBottom: 26 }}>
            Start with MessBee and build your business your way.
          </div>
          <button className="smb-btn-primary" onClick={handleStart} style={{ fontSize: 13, padding: "11px 26px" }}>
            Get Started
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: FREQUENTLY ASKED QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              FAQ
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Frequently Asked <span style={{ color: "#16A34A" }}>Questions</span>
            </h2>
          </div>

          {GRID_FAQS || SMB_FAQS.map((faq, idx) => (
            <FaqItem key={idx} {...faq} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const GRID_FAQS = null; // internal mapping variable

export default SmbPage;
