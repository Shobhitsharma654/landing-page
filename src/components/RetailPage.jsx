import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";

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
   MessBee — Retail & Local Businesses Solutions Page
   Strictly adheres ONLY to the text provided in the user prompt.
   Distinct Retail & Local Hero Graphic with official MessBee Logo.
   Compact, sleek typography & clean layout matching Ecommerce, SMB & Service pages.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. With MessBee, You Can (8 items from prompt)
const WITH_MESSBEE_YOU_CAN = [
  { text: "Keep customer information organized", icon: "📁" },
  { text: "Manage leads and enquiries", icon: "👥" },
  { text: "Communicate through supported WhatsApp Business services", icon: "💬" },
  { text: "Share offers and business updates", icon: "📢" },
  { text: "Follow up with customers", icon: "🔄" },
  { text: "Automate routine communication", icon: "⚡" },
  { text: "Showcase products and services through a Digital Store", icon: "🛍️" },
  { text: "Understand customer and campaign activity", icon: "📊" },
];

// 2. Turn First-Time Visitors Into Returning Customers (5 steps from prompt)
const RETAIL_JOURNEY_STEPS = [
  {
    step: "Discover",
    desc: "Help customers find your products, services and business information online.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "🔍",
  },
  {
    step: "Enquire",
    desc: "Make it easier for customers to ask questions and start a conversation.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "💬",
  },
  {
    step: "Purchase",
    desc: "Support your sales and commerce workflows through available MessBee features.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "🛒",
  },
  {
    step: "Follow Up",
    desc: "Stay connected with customers after an enquiry or purchase.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "📦",
  },
  {
    step: "Return",
    desc: "Build ongoing relationships with customers through relevant communication.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "❤️",
  },
];

// 3. Practical Tools for Local Businesses (5 items from prompt)
const PRACTICAL_TOOLS = [
  {
    title: "Customer Management",
    desc: "Keep customer and contact information organized instead of relying only on phone contacts, notebooks or scattered spreadsheets.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "👤",
  },
  {
    title: "WhatsApp Business",
    desc: "Use supported WhatsApp Business capabilities for customer enquiries, updates, notifications and eligible promotional communication.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "💬",
  },
  {
    title: "Marketing Automation",
    desc: "Create campaigns and follow-up workflows for offers, announcements, customer engagement and re-engagement.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "📢",
  },
  {
    title: "Digital Store",
    desc: "Give customers a convenient way to discover your products or services through a digital storefront.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "🛍️",
  },
  {
    title: "AI & Automation",
    desc: "Use supported AI-assisted tools and automation to reduce repetitive work and help your team respond more efficiently.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "🤖",
  },
];

// 4. Useful for Different Local Businesses (6 items from prompt)
const LOCAL_BUSINESS_TYPES = [
  {
    type: "Retail Stores",
    desc: "Keep customers informed about new products, offers and business updates while maintaining organized customer records.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  {
    type: "Showrooms",
    desc: "Manage enquiries, customer information and follow-ups throughout the buying journey.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    type: "Salons & Beauty Businesses",
    desc: "Stay connected with customers through appointment-related communication, offers and follow-ups where supported.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
  {
    type: "Cafés & Restaurants",
    desc: "Engage customers with updates, offers and relevant business communication while building repeat customer relationships.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
  },
  {
    type: "Service Centres",
    desc: "Manage customer enquiries, service-related communication and follow-ups in a more organized way.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
  },
  {
    type: "Local Professional Services",
    desc: "Keep track of enquiries, clients and ongoing customer relationships from one place.",
    color: "#06B6D4",
    bg: "#CFFAFE",
    border: "#A5F3FC",
  },
];

// 5. Connected Flow Nodes (6 nodes from prompt)
const RETAIL_FLOW_NODES = [
  "Customer",
  "CRM",
  "WhatsApp",
  "Marketing",
  "Automation",
  "Digital Store",
];

// 6. Why Retail & Local Businesses Choose MessBee (6 items from prompt)
const WHY_CHOOSE_MESSBEE = [
  {
    title: "Know Your Customers",
    desc: "Keep useful customer information organized and accessible to authorized team members.",
    icon: "📂",
  },
  {
    title: "Stay in Touch",
    desc: "Maintain customer communication through supported channels.",
    icon: "💬",
  },
  {
    title: "Promote Your Business",
    desc: "Share relevant offers, products, services and updates with appropriate customers.",
    icon: "📢",
  },
  {
    title: "Encourage Repeat Business",
    desc: "Use customer engagement and follow-up workflows to stay connected after a sale.",
    icon: "🔄",
  },
  {
    title: "Save Time",
    desc: "Automate routine communication and repetitive tasks where appropriate.",
    icon: "⚡",
  },
  {
    title: "Build Your Digital Presence",
    desc: "Use MessBee Digital Store to showcase your products or services online.",
    icon: "🌐",
  },
];

// 7. Frequently Asked Questions (7 items from prompt)
const RETAIL_FAQS = [
  {
    q: "What can MessBee do for a retail business?",
    a: "MessBee can help retail businesses manage customer information, leads, communication, marketing campaigns, follow-ups and supported digital commerce activities.",
  },
  {
    q: "Can a local shop use MessBee?",
    a: "Yes. MessBee is suitable for local shops and other businesses that want to organize customer relationships and build a stronger digital presence.",
  },
  {
    q: "Can I communicate with my customers on WhatsApp?",
    a: "MessBee may support WhatsApp Business Platform capabilities, subject to Meta/WhatsApp requirements, account eligibility, permissions and configuration.",
  },
  {
    q: "Can I send offers to existing customers?",
    a: "Eligible promotional communication can be sent where the business has the required permission or other lawful basis and complies with applicable messaging policies and laws.",
  },
  {
    q: "Can I manage repeat customers?",
    a: "Yes. Customer records, segmentation and supported marketing workflows can help businesses organize and engage their existing customers.",
  },
  {
    q: "Can I create a digital store for my local business?",
    a: "Yes. MessBee Digital Store can help businesses showcase products or services online and connect customers with their business.",
  },
  {
    q: "Does MessBee guarantee more sales?",
    a: "No. MessBee provides tools for customer management, communication and business growth. Sales and business results depend on factors including your products, pricing, service, market and business practices.",
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
   MAIN RETAIL & LOCAL BUSINESSES PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const RetailPage = () => {
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
        .retail-btn-primary {
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
        .retail-btn-primary:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.32);
        }

        .retail-btn-secondary {
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
        .retail-btn-secondary:hover {
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
        .retail-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: fadeInUp 0.5s ease-out both;
        }
        .retail-glass-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 30px rgba(22, 163, 74, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);
          border-color: #BBF7D0 !important;
        }

        .retail-dark-card {
          transition: all 0.25s ease;
        }
        .retail-dark-card:hover {
          transform: translateY(-3px);
          border-color: rgba(74, 222, 128, 0.4) !important;
        }

        /* ── LAPTOP & DESKTOP RESPONSIVE GRID SYSTEM ── */
        .retail-hero-row {
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
          .retail-hero-row { gap: 60px; }
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
          .retail-hero-row { gap: 32px; }
        }

        /* Compact Laptop / Tablet-Laptop (under 1024px) */
        @media (max-width: 1023px) {
          .retail-hero-row { flex-direction: column !important; }
          .grid-col-5 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-3 { grid-template-columns: repeat(1, 1fr); }
          .grid-col-2 { grid-template-columns: repeat(1, 1fr); }
        }

        /* Glowing Pulse Animation */
        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        .pulse-aura {
          animation: auraPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* SEO Document Title & Meta Description */}
      <title>Retail &amp; Local Business Solutions | Customer Engagement | MessBee</title>
      <meta
        name="description"
        content="MessBee helps retail and local businesses manage customers, WhatsApp communication, marketing, follow-ups and digital storefronts from one connected platform."
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Retail & Local Specific Graphic Layout with MessBee Logo)
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

        <div className="retail-hero-row" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div style={{ flex: 1.1, minWidth: 320 }}>
            {/* Provided Badge: Retail & Local Businesses */}
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
              Retail &amp; Local Businesses
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
              Retail &amp; Local Business Solutions to Connect With{" "}
              <span style={{ color: "#16A34A" }}>Customers and Grow</span>
            </h1>

            {/* Provided Sub-headline */}
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 800, color: "#16A34A", marginBottom: 14, letterSpacing: "-0.3px" }}>
              Bring Your Local Business Closer to Your Customers
            </p>

            {/* Provided Paragraph 1 */}
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 12, maxWidth: 540 }}>
              A local business grows through relationships. Whether you run a retail shop, showroom, salon, café, service centre or another neighbourhood business, staying connected with customers can be just as important as attracting new ones.
            </p>

            {/* Provided Paragraph 2 */}
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 22, maxWidth: 540 }}>
              MessBee helps retail and local businesses manage customers, communicate with them, promote their business and build a stronger digital presence from one connected platform.
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
              Know Your Customers. Stay Connected. Grow Locally.
            </div>

            {/* CTAs from Prompt */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="retail-btn-primary" onClick={handleStart}>
                Get Started with MessBee
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                className="retail-btn-secondary"
                onClick={() => document.getElementById("built-around-everyday")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore MessBee
              </button>
            </div>
          </div>

          {/* Right Column: Unique Retail & Local Graphic Layout with Official MessBee Logo */}
          <div style={{ flex: 0.9, minWidth: 320, position: "relative" }}>
            <div
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

              {/* Graphic Title Header featuring Official MessBee Logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 2 }}>
                    <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Local Hub</div>
                    <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>Shop &amp; Storefront Digital Operations</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, background: "rgba(22,163,74,0.2)", color: "#4ADE80", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(22,163,74,0.3)" }}>
                  Local CRM
                </span>
              </div>

              {/* Local Business Digital Hub Graphic Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {[
                  { title: "In-Store & Digital Visitors", desc: "Customer Records & CRM", status: "Connected", icon: "🏪", color: "#38BDF8" },
                  { title: "WhatsApp Offer Broadcast", desc: "Local Promotions & Updates", status: "Sent", icon: "📢", color: "#4ADE80" },
                  { title: "Digital Storefront Catalog", desc: "Product & Service Showcase", status: "Live", icon: "🛍️", color: "#FBBF24" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#FFFFFF" }}>{item.title}</div>
                        <div style={{ fontSize: 10, color: "#94A3B8" }}>{item.desc}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: item.color, background: "rgba(255,255,255,0.08)", padding: "2px 8px", borderRadius: 12 }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Connector Bar */}
              <div style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: 12, padding: 10, textAlign: "center" }}>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: "#4ADE80" }}>
                  Connect Your Business. Grow Locally.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: BUILT AROUND YOUR EVERYDAY BUSINESS
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="built-around-everyday" style={{ padding: "64px 6%", background: "#FAFAFA" }}>
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
              Everyday Business
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Built Around Your <span style={{ color: "#16A34A" }}>Everyday Business</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 8px", lineHeight: 1.68 }}>
              Running a local business involves more than making a sale. You may need to answer enquiries, follow up with customers, announce offers, manage repeat customers and keep your business visible online.
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", maxWidth: 560, margin: "0 auto 24px" }}>
              MessBee brings these activities together so your team can spend less time switching between different tools.
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
              With MessBee, You Can
            </div>
          </div>

          {/* 8 List Items Grid */}
          <div className="grid-col-4">
            {WITH_MESSBEE_YOU_CAN.map((item, idx) => (
              <div
                key={idx}
                className="retail-glass-card"
                style={{
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  animationDelay: `${idx * 40}ms`,
                }}
              >
                <div
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
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", lineHeight: 1.35 }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: TURN FIRST-TIME VISITORS INTO RETURNING CUSTOMERS
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
              Repeat Business
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Turn First-Time Visitors Into <span style={{ color: "#16A34A" }}>Returning Customers</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 6px", lineHeight: 1.68 }}>
              For local businesses, a customer's relationship with your business often continues after the first purchase.
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: "#16A34A", maxWidth: 560, margin: "0 auto" }}>
              MessBee helps you stay connected throughout that journey.
            </p>
          </div>

          {/* 5 Step Visual Pipeline */}
          <div className="grid-col-5">
            {RETAIL_JOURNEY_STEPS.map((s, i) => (
              <div
                key={s.step}
                className="retail-glass-card"
                style={{
                  padding: 18,
                  border: `1px solid ${s.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: s.bg,
                      color: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      marginBottom: 12,
                    }}
                  >
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {s.step}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: PRACTICAL TOOLS FOR LOCAL BUSINESSES
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
              Practical Tools
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Practical Tools for <span style={{ color: "#16A34A" }}>Local Businesses</span>
            </h2>
          </div>

          {/* 5 Feature Tool Cards from Prompt */}
          <div className="grid-col-5">
            {PRACTICAL_TOOLS.map((t, idx) => (
              <div
                key={idx}
                className="retail-glass-card"
                style={{
                  padding: 20,
                  border: `1px solid ${t.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
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
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: USEFUL FOR DIFFERENT LOCAL BUSINESSES
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
              Business Types
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Useful for <span style={{ color: "#16A34A" }}>Different Local Businesses</span>
            </h2>
          </div>

          {/* 6 Business Type Cards from Prompt */}
          <div className="grid-col-3">
            {LOCAL_BUSINESS_TYPES.map((b, idx) => (
              <div
                key={idx}
                className="retail-glass-card"
                style={{
                  padding: 20,
                  border: `1px solid ${b.border}`,
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: b.color, marginBottom: 12 }} />
                <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>{b.type}</h3>
                <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: KEEP YOUR CUSTOMERS CONNECTED TO YOUR BUSINESS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "60px 6%", background: GL, borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>Unified Experience</Pill>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 900, color: D2, letterSpacing: "-1px", marginBottom: 12 }}>
              Keep Your Customers <span style={{ color: G }}>Connected to Your Business</span>
            </h2>
            <p style={{ fontSize: 13, color: MU, maxWidth: 680, margin: "0 auto", lineHeight: 1.68 }}>
              Customers may discover your business through different channels, but your relationship with them should not have to remain scattered.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0, marginBottom: 26 }}>
            {RETAIL_FLOW_NODES.map((node, i, arr) => (
              <React.Fragment key={node}>
                <span style={{ background: "#fff", border: `1.5px solid ${GB}`, color: G, borderRadius: 6, padding: "8px 16px", fontSize: 12, fontWeight: 700 }}>
                  {node}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "#94A3B8", fontSize: 15, padding: "0 6px" }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, color: MU, textAlign: "center", letterSpacing: "0.2px" }}>
            This gives your business a more organized way to manage customer relationships and day-to-day communication.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: WHY RETAIL & LOCAL BUSINESSES CHOOSE MESSBEE
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
              Why Retail &amp; Local Businesses <span style={{ color: "#16A34A" }}>Choose MessBee</span>
            </h2>
          </div>

          {/* 6 Reason Cards from Prompt */}
          <div className="grid-col-3">
            {WHY_CHOOSE_MESSBEE.map((r, idx) => (
              <div
                key={idx}
                className="retail-glass-card"
                style={{
                  padding: 22,
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <div
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
                <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>{r.title}</h3>
                <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: MADE FOR THE WAY LOCAL BUSINESSES GROW
         ═══════════════════════════════════════════════════════════════════ */}
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
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#4ADE80" }}>Local Growth</span>
              </div>

              {/* Title from Prompt */}
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, marginBottom: 14, letterSpacing: "-1px" }}>
                Made for the Way Local Businesses Grow
              </h2>

              {/* Paragraphs from Prompt */}
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 12 }}>
                You don't need to transform your entire business overnight.
              </p>
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 24 }}>
                Start with the tools that solve your immediate needs—such as customer management or WhatsApp communication—and add marketing, automation and digital commerce capabilities as your business grows.
              </p>

              {/* Headline Callout from Prompt */}
              <div
                style={{
                  display: "inline-block",
                  background: "#16A34A",
                  color: "#FFFFFF",
                  padding: "11px 22px",
                  borderRadius: 40,
                  fontSize: 13.5,
                  fontWeight: 900,
                  letterSpacing: "0.2px",
                }}
              >
                Start local. Build stronger customer relationships. Grow with MessBee.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: FINAL CTA
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: GL, padding: "72px 6%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
          <Pill>Start Local. Grow With MessBee.</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            Bring your retail shop or local business<br />
            <span style={{ color: G }}>closer to your customers.</span>
          </h2>
          <button className="retail-btn-primary" onClick={handleStart} style={{ fontSize: 13, padding: "11px 26px", marginTop: 10 }}>
            Get Started with MessBee
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: FREQUENTLY ASKED QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>FAQ</Pill>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 900, color: D2, letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ borderTop: "1px solid #F1F5F9" }}>
            {RETAIL_FAQS.map((faq, idx) => (
              <FaqItem key={idx} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RetailPage;
