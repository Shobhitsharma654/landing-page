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
   MessBee — Service Business Solutions Page
   Strictly adheres ONLY to the text provided in the user prompt.
   Distinct Service Hero Graphic with official MessBee Logo.
   Compact, sleek typography & clean layout matching Ecommerce & SMB pages.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. With MessBee, You Can (9 items from prompt)
const WITH_MESSBEE_YOU_CAN = [
  { text: "Manage customer and lead information", icon: "👥" },
  { text: "Track enquiries and follow-ups", icon: "📋" },
  { text: "Keep relevant customer conversations organized", icon: "💬" },
  { text: "Use supported WhatsApp Business communication", icon: "📱" },
  { text: "Promote your services through eligible campaigns", icon: "📢" },
  { text: "Automate routine reminders and follow-ups", icon: "⏰" },
  { text: "Create a digital presence for your services", icon: "🌐" },
  { text: "Connect supported payment and business workflows", icon: "💳" },
  { text: "Use AI-assisted tools for selected tasks", icon: "🤖" },
];

// 2. From Enquiry to Long-Term Customer (6 steps from prompt)
const SERVICE_JOURNEY_STEPS = [
  {
    step: "Enquiry",
    desc: "Capture and organize new customer enquiries.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "📥",
  },
  {
    step: "Understand",
    desc: "Keep relevant customer information and requirements together.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "📂",
  },
  {
    step: "Follow Up",
    desc: "Stay connected with prospects and customers through supported channels.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "🔄",
  },
  {
    step: "Book or Convert",
    desc: "Move customers through your preferred service or sales process.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "✅",
  },
  {
    step: "Deliver",
    desc: "Keep customer communication organized during the service journey.",
    color: "#06B6D4",
    bg: "#CFFAFE",
    border: "#A5F3FC",
    icon: "💼",
  },
  {
    step: "Reconnect",
    desc: "Follow up after the service and stay connected for future requirements.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "❤️",
  },
];

// 3. Tools That Fit Service Businesses (6 items from prompt)
const TOOLS_THAT_FIT = [
  {
    title: "Customer Management",
    desc: "Keep customer profiles, contact information, enquiries and relevant business notes organized in one place.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "👤",
  },
  {
    title: "Lead Management",
    desc: "Track new enquiries, follow-ups and opportunities so potential customers don't get lost.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "🎯",
  },
  {
    title: "WhatsApp Business",
    desc: "Use supported WhatsApp Business capabilities for customer conversations, service updates, reminders and eligible business communication.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "💬",
  },
  {
    title: "Marketing Automation",
    desc: "Create campaigns and customer journeys for promotions, follow-ups and re-engagement.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "📢",
  },
  {
    title: "AI & Automation",
    desc: "Use supported AI-assisted features and automated workflows to reduce repetitive work.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "🤖",
  },
  {
    title: "Digital Store",
    desc: "Present your services and relevant offerings through a digital storefront where supported.",
    color: "#06B6D4",
    bg: "#CFFAFE",
    border: "#A5F3FC",
    icon: "🛍️",
  },
];

// 4. Spend Less Time Chasing Follow-Ups (7 items from prompt)
const FOLLOWUP_WORKFLOWS = [
  "New enquiry follow-ups",
  "Appointment reminders",
  "Service updates",
  "Customer feedback requests",
  "Renewal reminders",
  "Re-engagement",
  "Post-service communication",
];

// 5. Connected Conversation Flow (4 nodes from prompt)
const CONVERSATION_NODES = [
  "Enquiry",
  "Conversation",
  "Service",
  "Follow-Up",
];

// 6. Stay Connected After Service Workflows (7 items from prompt)
const AFTER_SERVICE_WORKFLOWS = [
  "Repeat services",
  "Maintenance",
  "Renewals",
  "New offers",
  "Service reminders",
  "Customer feedback",
  "Re-engagement",
];

// 7. Suitable for Different Service Businesses (6 items from prompt)
const SERVICE_BUSINESS_TYPES = [
  {
    type: "Professional Services",
    desc: "Manage enquiries, clients, follow-ups and ongoing customer relationships.",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  {
    type: "Home & Personal Services",
    desc: "Stay organized with customer enquiries, appointments and service-related communication.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    type: "Repair & Maintenance Services",
    desc: "Keep customer information, service requests and follow-ups together.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
  {
    type: "Education & Training Services",
    desc: "Manage enquiries, prospective customers and ongoing communication.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
  },
  {
    type: "Health & Wellness Businesses",
    desc: "Organize customer enquiries and appointment-related workflows, subject to applicable professional and legal requirements.",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
  },
  {
    type: "B2B Service Providers",
    desc: "Manage leads, customer relationships, communication and longer sales cycles.",
    color: "#06B6D4",
    bg: "#CFFAFE",
    border: "#A5F3FC",
  },
];

// 8. Why Service Businesses Choose MessBee (7 items from prompt)
const WHY_CHOOSE_MESSBEE = [
  {
    title: "Keep Customer Information Organized",
    desc: "Give your team a clearer view of each customer relationship.",
    icon: "📂",
  },
  {
    title: "Never Miss an Important Follow-Up",
    desc: "Create structured reminders and automation for routine customer activities.",
    icon: "⏰",
  },
  {
    title: "Improve Customer Communication",
    desc: "Keep supported conversations and business updates more organized.",
    icon: "💬",
  },
  {
    title: "Reduce Repetitive Work",
    desc: "Automate routine tasks where appropriate.",
    icon: "⚡",
  },
  {
    title: "Build Repeat Business",
    desc: "Stay connected with existing customers after the service.",
    icon: "🔄",
  },
  {
    title: "Create a Digital Presence",
    desc: "Showcase your services through supported MessBee Digital Store capabilities.",
    icon: "🌐",
  },
  {
    title: "Grow Without Adding Unnecessary Complexity",
    desc: "Start with the tools you need and expand as your business grows.",
    icon: "📈",
  },
];

// 9. Frequently Asked Questions (7 items from prompt)
const SERVICE_FAQS = [
  {
    q: "What is MessBee for service businesses?",
    a: "MessBee helps service businesses manage customers, leads, communication, marketing, follow-ups and supported automation from one connected platform.",
  },
  {
    q: "Can I manage service enquiries?",
    a: "Yes. MessBee CRM can help organize enquiries, customer information and follow-up activities.",
  },
  {
    q: "Can I use WhatsApp Business for customer communication?",
    a: "MessBee may support WhatsApp Business Platform capabilities, subject to applicable Meta/WhatsApp requirements, account eligibility, permissions and configuration.",
  },
  {
    q: "Can I automate appointment reminders?",
    a: "Supported automation can be used for eligible reminders and customer workflows. Specific appointment functionality depends on your configuration and plan.",
  },
  {
    q: "Can I manage repeat customers?",
    a: "Yes. CRM, segmentation and marketing automation features can help you organize and engage existing customers.",
  },
  {
    q: "Can I promote my services?",
    a: "Yes. Supported marketing features can help businesses create campaigns and customer-engagement workflows, subject to applicable communication requirements.",
  },
  {
    q: "Is MessBee suitable for B2B service companies?",
    a: "Yes. MessBee can support B2B businesses that need to manage leads, longer customer journeys, communication and follow-ups.",
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
   MAIN SERVICE BUSINESSES PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const ServicePage = () => {
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
        .service-btn-primary {
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
        .service-btn-primary:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.32);
        }

        .service-btn-secondary {
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
        .service-btn-secondary:hover {
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
        .service-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: fadeInUp 0.5s ease-out both;
        }
        .service-glass-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 30px rgba(22, 163, 74, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);
          border-color: #BBF7D0 !important;
        }

        .service-dark-card {
          transition: all 0.25s ease;
        }
        .service-dark-card:hover {
          transform: translateY(-3px);
          border-color: rgba(74, 222, 128, 0.4) !important;
        }

        /* ── LAPTOP & DESKTOP RESPONSIVE GRID SYSTEM ── */
        .service-hero-row {
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
        .grid-col-6 {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .service-hero-row { gap: 60px; }
          .grid-col-3 { gap: 22px; }
        }

        /* Medium Laptops (1200px - 1439px) */
        @media (max-width: 1439px) and (min-width: 1200px) {
          .grid-col-6 { grid-template-columns: repeat(3, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(3, 1fr); }
        }

        /* Small Laptops (1024px - 1199px) */
        @media (max-width: 1199px) and (min-width: 1024px) {
          .grid-col-6 { grid-template-columns: repeat(3, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-3 { grid-template-columns: repeat(2, 1fr); }
          .service-hero-row { gap: 32px; }
        }

        .service-hero-right-col { flex: 0.9; min-width: 320px; position: relative; display: flex; justify-content: center; }
        .service-hero-right-card { transform: scale(0.8); transform-origin: center right; width: 100%; max-width: 480px; }

        /* Compact Laptop / Tablet-Laptop (under 1024px) */
        @media (max-width: 1023px) {
          .service-hero-row { flex-direction: column !important; }
          .service-hero-right-col { width: 100% !important; min-width: unset !important; justify-content: center !important; margin-top: 24px !important; }
          .service-hero-right-card { transform: none !important; transform-origin: center center !important; max-width: 340px !important; margin: 0 auto !important; }
          .grid-col-6 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-col-3 { grid-template-columns: repeat(1, 1fr); }
          .grid-col-2 { grid-template-columns: repeat(1, 1fr); }
        }

        /* Mobile Phones & Tablets (under 768px) */
        @media (max-width: 768px) {
          .grid-col-6, .grid-col-4, .grid-col-3, .grid-col-2 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .service-glass-card {
            padding: 14px 16px !important;
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
      `}</style>

      {/* SEO Document Title & Meta Description */}
      <title>Service Business Solutions | CRM, Automation &amp; Customer Management | MessBee</title>
      <meta
        name="description"
        content="MessBee helps service businesses manage customers, leads, WhatsApp communication, marketing, follow-ups and automation from one connected platform."
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Service Business Specific Graphic with MessBee Logo)
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

        <div className="service-hero-row" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div style={{ flex: 1.1, minWidth: 320 }}>
            {/* Provided Badge: Service Businesses */}
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
              Service Businesses
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
              Service Business Solutions to Manage Customers,{" "}
              <span style={{ color: "#16A34A" }}>Enquiries &amp; Growth</span>
            </h1>

            {/* Provided Sub-headline */}
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 800, color: "#16A34A", marginBottom: 14, letterSpacing: "-0.3px" }}>
              Manage Customers, Enquiries &amp; Follow-Ups in One Place
            </p>

            {/* Provided Paragraph 1 */}
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 12, maxWidth: 540 }}>
              Client relationships extend far beyond a single booking, requiring flawless organization of enquiries and appointments.
            </p>

            {/* Provided Paragraph 2 */}
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 22, maxWidth: 540 }}>
              MessBee unifies CRM, communication, and marketing workflows—empowering you to focus purely on delivering exceptional service.
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
              Get Organized. Stay Connected. Serve Better.
            </div>

            {/* CTAs from Prompt */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="service-btn-primary" onClick={handleStart} style={{ fontSize: 13, padding: "11px 26px" }}>
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                className="service-btn-secondary"
                onClick={() => document.getElementById("built-around-service")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore MessBee
              </button>
            </div>
          </div>

          {/* Right Column: Unique Service Business Hero Graphic with Official MessBee Logo */}
          <div className="service-hero-right-col">
            <div
              className="service-hero-right-card"
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
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Service CRM</div>
                    <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>Enquiry &amp; Booking Lifecycle</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, background: "rgba(22,163,74,0.2)", color: "#4ADE80", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(22,163,74,0.3)" }}>
                  Service Flow
                </span>
              </div>

              {/* Service Enquiry & Booking Lifecycle Graphic Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {[
                  { title: "New Customer Enquiry", desc: "Captured & Assigned in CRM", status: "Received", icon: "📩", color: "#38BDF8" },
                  { title: "WhatsApp Appointment", desc: "Automated Reminder Sent", status: "Confirmed", icon: "📅", color: "#4ADE80" },
                  { title: "Service Delivery & Follow-Up", desc: "Post-Service Feedback Requested", status: "Active", icon: "⭐", color: "#FBBF24" },
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
                  Seamless Service Lifecycle Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: BUILT AROUND YOUR SERVICE BUSINESS
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="built-around-service" style={{ padding: "64px 6%", background: "#FAFAFA" }}>
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
              Organized Operations
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Built Around Your <span style={{ color: "#16A34A" }}>Service Business</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 20px", lineHeight: 1.68 }}>
              Whether you provide professional, personal, home, technical or business services, MessBee helps bring everyday customer activities into a more organized workflow.
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

          {/* 9 List Items Grid */}
          <div className="grid-col-3">
            {WITH_MESSBEE_YOU_CAN.map((item, idx) => (
              <div
                key={idx}
                className="service-glass-card"
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
          SECTION 3: FROM ENQUIRY TO LONG-TERM CUSTOMER
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
              Customer Journey
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              From Enquiry to <span style={{ color: "#16A34A" }}>Long-Term Customer</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 6px", lineHeight: 1.68 }}>
              A service business doesn't end with a single appointment or transaction. Good service creates the opportunity for a lasting customer relationship.
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: "#16A34A", maxWidth: 560, margin: "0 auto" }}>
              MessBee helps you manage that journey:
            </p>
          </div>

          {/* 6 Step Visual Pipeline */}
          <div className="grid-col-6">
            {SERVICE_JOURNEY_STEPS.map((s, i) => (
              <div
                key={s.step}
                className="service-glass-card"
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
          SECTION 4: TOOLS THAT FIT SERVICE BUSINESSES
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
              Essential Tools
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Tools That Fit <span style={{ color: "#16A34A" }}>Service Businesses</span>
            </h2>
          </div>

          {/* 6 Feature Tool Cards from Prompt */}
          <div className="grid-col-3">
            {TOOLS_THAT_FIT.map((t, idx) => (
              <div
                key={idx}
                className="service-glass-card"
                style={{
                  padding: 22,
                  border: `1px solid ${t.border}`,
                  animationDelay: `${idx * 60}ms`,
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
          SECTION 5: SPEND LESS TIME CHASING FOLLOW-UPS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Headings from Prompt */}
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
              Follow-Up Automation
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Spend Less Time <span style={{ color: "#16A34A" }}>Chasing Follow-Ups</span>
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 6px", lineHeight: 1.68 }}>
              Service businesses often lose opportunities simply because a follow-up was missed.
            </p>
            <p style={{ fontSize: 13, color: "#475569", maxWidth: 640, margin: "0 auto" }}>
              MessBee can help create structured workflows for activities such as:
            </p>
          </div>

          {/* 7 Workflows Grid from Prompt */}
          <div className="grid-col-4" style={{ marginBottom: 28 }}>
            {FOLLOWUP_WORKFLOWS.map((fw, idx) => (
              <div
                key={idx}
                className="service-glass-card"
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  animationDelay: `${idx * 45}ms`,
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#16A34A" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{fw}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13.5, color: "#475569", textAlign: "center", fontWeight: 700 }}>
            You decide which workflows your business needs. Automation takes care of the repetitive steps.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: KEEP CUSTOMER CONVERSATIONS CONNECTED
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "60px 6%", background: GL, borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>Unified History</Pill>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 900, color: D2, letterSpacing: "-1px", marginBottom: 12 }}>
              Keep Customer Conversations <span style={{ color: G }}>Connected</span>
            </h2>
            <p style={{ fontSize: 13, color: MU, maxWidth: 680, margin: "0 auto", lineHeight: 1.68 }}>
              A customer may contact your business before booking, during service delivery and again afterwards. Having relevant conversation history available to authorized team members can help them understand the customer's previous interactions and respond with better context.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0, marginBottom: 26 }}>
            {CONVERSATION_NODES.map((node, i, arr) => (
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
            One connected customer journey is easier to manage than information spread across different places.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: STAY CONNECTED AFTER THE SERVICE
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Headings from Prompt */}
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
              Post-Service Engagement
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Stay Connected <span style={{ color: "#16A34A" }}>After the Service</span>
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto 6px", lineHeight: 1.68 }}>
              The relationship shouldn't end when the service is completed.
            </p>
            <p style={{ fontSize: 13, color: "#475569", maxWidth: 640, margin: "0 auto" }}>
              With appropriate customer information and permissions, you can create relevant follow-up workflows for:
            </p>
          </div>

          {/* 7 Workflows Grid from Prompt */}
          <div className="grid-col-4" style={{ marginBottom: 28 }}>
            {AFTER_SERVICE_WORKFLOWS.map((as, idx) => (
              <div
                key={idx}
                className="service-glass-card"
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  animationDelay: `${idx * 45}ms`,
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{as}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13.5, color: "#475569", textAlign: "center", fontWeight: 700 }}>
            This gives your business a practical way to stay connected without manually contacting every customer.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: SUITABLE FOR DIFFERENT SERVICE BUSINESSES
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
              Target Industries
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Suitable for <span style={{ color: "#16A34A" }}>Different Service Businesses</span>
            </h2>
          </div>

          {/* 6 Business Type Cards from Prompt */}
          <div className="grid-col-3">
            {SERVICE_BUSINESS_TYPES.map((b, idx) => (
              <div
                key={idx}
                className="service-glass-card"
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
          SECTION 9: WHY SERVICE BUSINESSES CHOOSE MESSBEE
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
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
              Why Service Businesses <span style={{ color: "#16A34A" }}>Choose MessBee</span>
            </h2>
          </div>

          {/* 7 Reason Cards from Prompt */}
          <div className="grid-col-3">
            {WHY_CHOOSE_MESSBEE.map((r, idx) => (
              <div
                key={idx}
                className="service-glass-card"
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
          SECTION 10: BUILT FOR INDIA'S SERVICE ECONOMY
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
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
                <svg width="16" height="12" viewBox="0 0 90 60" style={{ borderRadius: 2, flexShrink: 0 }}><rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#FFFFFF"/><rect y="40" width="90" height="20" fill="#138808"/><circle cx="45" cy="30" r="8" fill="#000080" /><circle cx="45" cy="30" r="6" fill="#FFFFFF" /><circle cx="45" cy="30" r="2" fill="#000080" /></svg>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "#4ADE80" }}>Indian Service Economy</span>
              </div>

              {/* Title from Prompt */}
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, marginBottom: 14, letterSpacing: "-1px" }}>
                Built for India's Service Economy
              </h2>

              {/* Paragraphs from Prompt */}
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 12 }}>
                India's service businesses range from independent professionals and local service providers to established agencies and growing B2B companies.
              </p>
              <p style={{ fontSize: 13.5, color: "#94A3B8", lineHeight: 1.7, marginBottom: 24 }}>
                Each business has its own way of working. MessBee gives you flexible tools to build workflows around your actual customer journey instead of forcing you into a single business model.
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
                Your Service. Your Customers. Your Way of Working.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 11: GOOD SERVICE STARTS WITH GOOD CUSTOMER MANAGEMENT (FINAL CTA)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: GL, padding: "72px 6%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <Pill>Good Service Starts With Good Customer Management</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            Manage Better. Communicate Better.<br />
            <span style={{ color: G }}>Serve Better.</span>
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 720, margin: "0 auto 20px" }}>
            Your customers should not have to repeat their requirements every time they contact your business. MessBee helps your team keep customer information, conversations and follow-ups organized so you can focus on what matters most — delivering a good service experience.
          </p>
          <button className="service-btn-primary" onClick={handleStart} style={{ fontSize: 13, padding: "11px 26px" }}>
            Get Started
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 12: FREQUENTLY ASKED QUESTIONS
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
            {SERVICE_FAQS.map((faq, idx) => (
              <FaqItem key={idx} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
