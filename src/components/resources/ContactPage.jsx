import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";
import { submitToWebhookOrEmail } from "../../utils/formSubmit";

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

// 1. How Can We Help? (6 Category Cards from prompt)
const HELP_CATEGORIES = [
  {
    title: "Account & Setup",
    subtitle: "Get help with:",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    icon: "👤",
    bullets: [
      "Account setup",
      "Business profile",
      "User access",
      "Account settings",
      "Subscription-related questions",
    ],
  },
  {
    title: "CRM",
    subtitle: "Need help managing your customers or leads? Our team can assist with questions related to:",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "📊",
    bullets: [
      "Customers",
      "Contacts",
      "Leads",
      "Customer profiles",
      "Sales pipeline",
      "Segmentation",
    ],
  },
  {
    title: "WhatsApp Business",
    subtitle: "Get assistance with supported WhatsApp Business integrations and features, including:",
    color: "#059669",
    bg: "#D1FAE5",
    border: "#A7F3D0",
    icon: "💬",
    bullets: [
      "Account connection",
      "Business messaging",
      "Message templates",
      "Customer conversations",
      "Integration-related issues",
    ],
    footerNote: "WhatsApp Business Platform accounts, approvals, limits and policy enforcement may be controlled by Meta and are subject to applicable Meta/WhatsApp requirements.",
  },
  {
    title: "Marketing & Automation",
    subtitle: "Need help with your marketing workflows? Get guidance on:",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: "⚡",
    bullets: [
      "Campaign setup",
      "Customer segments",
      "Automated workflows",
      "Follow-ups",
      "Email and SMS integrations",
      "Supported WhatsApp campaigns",
    ],
  },
  {
    title: "AI & Automation",
    subtitle: "For questions about supported AI and automation features:",
    color: "#EC4899",
    bg: "#FCE7F3",
    border: "#FBCFE8",
    icon: "🤖",
    bullets: [
      "AI configuration",
      "Chatbot workflows",
      "Automation rules",
      "Triggers and actions",
      "AI-assisted features",
    ],
  },
  {
    title: "Digital Store",
    subtitle: "Get help with:",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: "🛍️",
    bullets: [
      "Store setup",
      "Products and services",
      "Catalogue",
      "Orders",
      "Payment integrations",
      "Store settings",
    ],
  },
];

// 2. Before You Contact Support (6 items from prompt)
const BEFORE_YOU_CONTACT = [
  "Getting Started Guides",
  "Product Documentation",
  "How-To Guides",
  "Troubleshooting",
  "FAQs",
  "Product Updates",
];

// 3. Technical Support Guidelines (5 items from prompt)
const TECH_GUIDELINES = [
  {
    q: "What happened?",
    a: "Briefly describe the issue.",
  },
  {
    q: "Where did it happen?",
    a: "Mention the relevant product, page or feature.",
  },
  {
    q: "What were you trying to do?",
    a: "Explain the action you were attempting.",
  },
  {
    q: "What did you see?",
    a: "Include the exact error message if available.",
  },
  {
    q: "When did it happen?",
    a: "Mention the approximate date and time if relevant.",
  },
];

// 4. Frequently Asked Questions (5 items from prompt)
const SUPPORT_FAQS = [
  {
    q: "How do I contact MessBee Support?",
    a: "You can contact MessBee Support through the support channel provided on the MessBee website or email support@messbee.com.",
  },
  {
    q: "What should I include in my support request?",
    a: "Include your registered email, account or business name, the product you're using, a description of the issue and any relevant error message or screenshot.",
  },
  {
    q: "Can Support help with WhatsApp Business issues?",
    a: "MessBee Support can assist with supported MessBee-side configuration and integration issues. However, certain WhatsApp Business Platform approvals, limits, account restrictions and policy decisions are controlled by Meta.",
  },
  {
    q: "Can Support access my account password?",
    a: "You should never share your password, OTP, authentication code or other account credentials with support.",
  },
  {
    q: "Where can I find quick answers?",
    a: "Visit the MessBee Help Center and FAQs for product guides, troubleshooting information and common questions.",
  },
];

/* ── FAQ Accordion Item Component ── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`faq-card-item ${open ? "open-card" : ""}`}
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${open ? "#16A34A" : "#E2E8F0"}`,
        borderRadius: 14,
        marginBottom: 12,
        overflow: "hidden",
        boxShadow: open ? "0 8px 24px rgba(22, 163, 74, 0.08)" : "0 2px 8px rgba(15, 23, 42, 0.02)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="faq-card-trigger"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span
          className="faq-card-question"
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: open ? "#16A34A" : "#0F172A",
            textAlign: "left",
            lineHeight: 1.45,
            flex: "1 1 auto",
            transition: "color 0.25s ease"
          }}
        >
          {q}
        </span>
        <div
          className="faq-icon-holder"
          style={{
            width: 30,
            height: 30,
            minWidth: 30,
            minHeight: 30,
            borderRadius: "50%",
            background: open ? "#16A34A" : "#F1F5F9",
            color: open ? "#FFFFFF" : "#64748B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {open && (
        <div
          className="faq-card-answer"
          style={{
            fontSize: 13.5,
            color: "#475569",
            lineHeight: 1.7,
            padding: "0 20px 18px 20px",
            textAlign: "left",
            borderTop: "1px solid #F1F5F9",
            paddingTop: 12,
            marginTop: 0
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
};

const ContactPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    interest: "MessBee Products",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHelpCenter = () => {
    navigate("/docs");
  };

  const handleBusinessEnquiries = () => {
    navigate("/business");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    await submitToWebhookOrEmail("support", {
      name: form.name,
      businessName: form.businessName,
      email: form.email,
      phone: form.phone,
      interest: form.interest,
      message: form.message,
    });

    setStatus("success");
    setForm({
      name: "",
      businessName: "",
      email: "",
      phone: "",
      interest: "MessBee Products",
      message: "",
    });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── GLOBAL SECTION RESPONSIVENESS ── */
        .contact-section {
          padding: 60px 6% !important;
          transition: padding 0.3s ease;
        }

        /* ── BUTTONS ── */
        .contact-btn-primary {
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
        .contact-btn-primary:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.32);
        }

        .contact-btn-secondary {
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
        .contact-btn-secondary:hover {
          border-color: #16A34A;
          color: #16A34A;
          background: #F0FDF4;
          transform: translateY(-2px);
        }

        /* ── FORM INPUTS ── */
        .contact-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #CBD5E1;
          border-radius: 9px;
          font-size: 13.5px;
          color: #0F172A;
          outline: none;
          background: #FFFFFF;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease-in-out;
        }
        .contact-input:focus {
          border-color: #16A34A;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
        }
        .contact-input::placeholder {
          color: #94A3B8;
        }

        /* ── CARDS & ANIMATION ── */
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

        .contact-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: fadeInUp 0.5s ease-out both;
        }
        .contact-glass-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 14px 30px rgba(22, 163, 74, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02);
          border-color: #BBF7D0 !important;
        }

        /* ── FORM CONTAINER BOXES ── */
        .contact-form-info-box, .contact-form-box {
          padding: 24px !important;
        }

        /* ── RESPONSIVE GRID & LAYOUT ── */
        .contact-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .contact-hero-left {
          flex: 1.1;
          min-width: 0;
        }
        .contact-hero-right {
          flex: 0.9;
          min-width: 0;
          position: relative;
        }

        .grid-col-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .grid-col-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .grid-col-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* Responsive Breakpoints */

        /* Under 1200px (Medium screen / Small Laptop) */
        @media (max-width: 1200px) {
          .grid-col-5 {
            grid-template-columns: repeat(3, 1fr);
          }
          .grid-col-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .contact-hero-section h1 {
            font-size: clamp(24px, 3.2vw, 38px) !important;
          }
          .contact-section h2 {
            font-size: clamp(20px, 2.6vw, 28px) !important;
          }
          .contact-section h3 {
            font-size: 15px !important;
          }
          .contact-section p {
            font-size: 13.5px !important;
          }
        }

        /* Under 992px (Tablet) */
        @media (max-width: 992px) {
          .contact-hero-row {
            flex-direction: column !important;
            gap: 40px;
          }
          .contact-hero-left, .contact-hero-right {
            width: 100% !important;
            flex: none !important;
          }
          .grid-col-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          .contact-hero-section h1 {
            font-size: clamp(22px, 3vw, 34px) !important;
          }
          .contact-section h2 {
            font-size: clamp(18px, 2.4vw, 24px) !important;
          }
          .contact-section h3 {
            font-size: 14px !important;
          }
          .contact-section p {
            font-size: 13px !important;
          }
        }

        /* Under 768px (Mobile Portrait/Landscape) */
        @media (max-width: 768px) {
          .contact-section {
            padding: 24px 16px !important;
          }
          .contact-hero-section {
            margin-top: 60px !important;
            padding-top: 24px !important;
            padding-bottom: 28px !important;
          }
          .contact-hero-section h1 {
            font-size: clamp(24px, 6.2vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            margin-bottom: 14px !important;
          }
          .grid-col-3 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .grid-col-2 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .grid-col-5 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .contact-form-info-box, .contact-form-box {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
          .contact-btn-primary, .contact-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* Under 576px (Small Mobile) */
        @media (max-width: 576px) {
          .contact-section {
            padding: 20px 14px !important;
          }
          .grid-col-5 {
            grid-template-columns: 1fr !important;
          }
          .contact-btn-primary, .contact-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
          .contact-hero-row {
            gap: 24px !important;
          }
          .contact-form-info-box, .contact-form-box {
            padding: 18px 14px !important;
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
      <title>Contact MessBee Support | Help With Products &amp; Integrations</title>
      <meta
        name="description"
        content="Contact MessBee Support for help with CRM, WhatsApp Business, marketing automation, AI, Digital Store, account setup and technical issues."
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="contact-section contact-hero-section"
        style={{
          marginTop: 70,
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

        <div className="contact-hero-row" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div className="contact-hero-left">
            {/* Provided Badge */}
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
              Contact Support
            </div>

            {/* Title */}
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
              Contact MessBee Support – <span style={{ color: "#16A34A" }}>We&apos;re Here to Help</span>
            </h1>

            {/* Sub-headline */}
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 800, color: "#16A34A", marginBottom: 14, letterSpacing: "-0.3px" }}>
              We&apos;re Here to Help
            </p>

            {/* Paragraphs */}
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 12, maxWidth: 540 }}>
              Need help with your MessBee account, a product feature, integration or a technical issue? MessBee Support is here to help you find the right information and get your issue resolved as efficiently as possible.
            </p>

            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 26, maxWidth: 540 }}>
              Whether you&apos;re setting up MessBee for the first time or already using it for your business, you can reach out to our support team when you need assistance.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="contact-btn-primary"
                onClick={() => document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Support
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button className="contact-btn-secondary" onClick={handleHelpCenter}>
                Visit Help Center
              </button>
            </div>
          </div>

          {/* Right Column: Visual Support Hub Node Graphic */}
          <div className="contact-hero-right">
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
                  top: "20%",
                  left: "25%",
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(52,211,153,0) 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Header with logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 2 }}>
                    <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Support Desk</div>
                    <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>Dedicated Technical Assistance</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, background: "rgba(52,211,153,0.2)", color: "#34D399", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(52,211,153,0.3)" }}>
                  24/7 Queue
                </span>
              </div>

              {/* Direct email box */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 14, marginBottom: 14, backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "#A7F3D0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
                  Direct Email Channel
                </div>
                <a href="mailto:support@messbee.com" style={{ fontSize: 15, fontWeight: 900, color: "#4ADE80", textDecoration: "none" }}>
                  support@messbee.com
                </a>
              </div>

              {/* Topics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { title: "CRM & Contacts", icon: "👤" },
                  { title: "WhatsApp Business", icon: "💬" },
                  { title: "Marketing & AI", icon: "⚡" },
                  { title: "Digital Store", icon: "🛍️" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: "#FFFFFF" }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: HOW CAN WE HELP?
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
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
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Support Scope
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              How Can <span style={{ color: "#16A34A" }}>We Help?</span>
            </h2>
          </div>

          <div className="grid-col-3">
            {HELP_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="contact-glass-card"
                style={{
                  padding: "16px 18px",
                  border: `1px solid ${cat.border}`,
                  animationDelay: `${idx * 50}ms`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: cat.bg,
                        color: cat.color,
                        border: `1px solid ${cat.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 18,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A" }}>{cat.title}</h3>
                  </div>

                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5, marginBottom: 8 }}>
                    {cat.subtitle}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {cat.bullets.map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {cat.footerNote && (
                  <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.45, borderTop: "1px solid #F1F5F9", paddingTop: 8, marginTop: 8 }}>
                    {cat.footerNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: BEFORE YOU CONTACT SUPPORT
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
              Self-Service Help
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Before You <span style={{ color: "#16A34A" }}>Contact Support</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 600, margin: "0 auto 6px", lineHeight: 1.68 }}>
              You may find a quick answer in the MessBee Help Center.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", maxWidth: 500, margin: "0 auto" }}>
              It includes:
            </p>
          </div>

          {/* 6 Items Grid */}
          <div className="grid-col-3" style={{ marginBottom: 32 }}>
            {BEFORE_YOU_CONTACT.map((item, idx) => (
              <div
                key={idx}
                className="contact-glass-card"
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  animationDelay: `${idx * 40}ms`,
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="contact-btn-primary" onClick={handleHelpCenter}>
              Visit Help Center
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: CONTACT Support Form
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact-form-section" className="contact-section" style={{ background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
              Direct Message
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Contact Our <span style={{ color: "#16A34A" }}>Support Team</span>
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 620, margin: "0 auto", lineHeight: 1.68 }}>
              If you couldn&apos;t find the answer in our Help Center, send us your question and our team will review it.
            </p>
          </div>

          <div className="contact-hero-row" style={{ alignItems: "stretch" }}>
            {/* Left Box: Visit Us & Connect with MessBee */}
            <div className="contact-form-info-box" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, justifyContent: "space-between" }}>
              {/* Box 1: Visit Us */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" /></svg>
                  Visit Us
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#16A34A", display: "flex", alignItems: "center", gap: 8 }}>
                    MessBee
                  </div>
                  <div style={{ fontSize: 13.5, color: "#475569", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.55 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span><strong>Corporate Office:</strong> 510A, Devika Tower, Chander Nagar, Surya Nagar, Ghaziabad, Uttar Pradesh 201011</span>
                  </div>
                  <div style={{ fontSize: 13.5, color: "#475569", display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    <span><strong>Ph:</strong> 0120-2611111, +91-9217742081</span>
                  </div>
                  <div style={{ fontSize: 13.5, color: "#475569", display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    <span><strong>Email:</strong> support@messbee.com</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Connect with MessBee */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "28px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                  Connect With MessBee
                </h3>
                <p style={{ fontSize: 13.5, color: "#64748B", marginBottom: 16, lineHeight: 1.6 }}>
                  Follow MessBee for product updates, business insights, and company news.
                </p>

                {/* Social media icons grid */}
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link-btn linkedin">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link-btn facebook">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link-btn instagram">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link-btn youtube">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="social-link-btn x">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/></svg>
                  </a>
                </div>

                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#64748B", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span>Email: support@messbee.com</span>
                </div>
              </div>
            </div>

            {/* Right Box: Contact Form */}
            <div className="contact-form-box" style={{ flex: 1.2, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "32px", boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  Contact Form
                </h3>

                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Row 1: Full Name + Business Name */}
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                        Full Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="contact-input"
                      />
                    </div>

                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                        Business / Organization Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your business name"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        className="contact-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Work Email + Phone Number */}
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                        Work Email*
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your business email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="contact-input"
                      />
                    </div>

                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your contact number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="contact-input"
                      />
                    </div>
                  </div>

                  {/* Row 3: I'm Interested In */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                      I’m Interested In*
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="contact-input"
                      style={{ cursor: "pointer", background: "#F8FAFC" }}
                    >
                      <option value="MessBee Products">MessBee Products</option>
                      <option value="CRM">CRM</option>
                      <option value="WhatsApp Business">WhatsApp Business</option>
                      <option value="Marketing Automation">Marketing Automation</option>
                      <option value="AI & Automation">AI &amp; Automation</option>
                      <option value="Digital Store">Digital Store</option>
                      <option value="Enterprise Solutions">Enterprise Solutions</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Row 4: How Can We Help? */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                      How Can We Help?*
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your requirement or question."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="contact-input"
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  {status === "success" && (
                    <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 10, padding: "12px 16px", color: "#15803D", fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>Thank you! Your enquiry has been submitted and saved. We'll be in touch soon.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="contact-btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6, padding: "14px 20px", fontSize: 14.5, borderRadius: 10, opacity: status === "submitting" ? 0.7 : 1 }}
                  >
                    {status === "submitting" ? "Submitting..." : status === "success" ? "Enquiry Submitted ✓" : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FULL-WIDTH CORPORATE OFFICE ADDRESS SECTION
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#F8FAFC", padding: "36px 5%", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{
            background: "#FFFFFF",
            border: "1.5px solid #BBF7D0",
            borderRadius: 24,
            padding: "28px 32px",
            boxShadow: "0 10px 30px rgba(22, 163, 74, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            boxSizing: "border-box"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 30, padding: "6px 16px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#16A34A", letterSpacing: "0.5px", textTransform: "uppercase" }}>Corporate Office Location</span>
              </div>
              <a
                href="https://www.google.com/maps/dir//MessBee,+510,+Devika+Tower,+HIG+Flats,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011,+India/@28.6686012,77.3308721,16z"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#16A34A",
                  color: "#FFFFFF",
                  padding: "8px 18px",
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                Get Directions on Google Maps
              </a>
            </div>

            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: "1 1 500px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#16A34A", marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                  MessBee
                </h3>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 4 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#475569", margin: 0, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                    <strong style={{ color: "#1E293B" }}>Corporate Office:</strong> 510A, Devika Tower, Chander Nagar, Surya Nagar, Ghaziabad, Uttar Pradesh 201011
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Phone</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>0120-2611111 / +91-9217742081</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Email</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>support@messbee.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div style={{
              width: "100%",
              height: "400px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              marginTop: 10
            }}>
              <iframe
                title="MessBee Corporate Office Location Map"
                src="https://maps.google.com/maps?q=MessBee,+510,+Devika+Tower,+HIG+Flats,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011,+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: TECHNICAL SUPPORT GUIDELINES
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
              Investigation Details
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Technical <span style={{ color: "#16A34A" }}>Support</span>
            </h2>

            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 680, margin: "0 auto", lineHeight: 1.68 }}>
              If you&apos;re reporting a technical problem, providing the following information can help us investigate it faster:
            </p>
          </div>

          <div className="grid-col-5">
            {TECH_GUIDELINES.map((t, idx) => (
              <div
                key={idx}
                className="contact-glass-card"
                style={{
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 45}ms`,
                }}
              >
                <div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#16A34A", background: "#F0FDF4", padding: "3px 8px", borderRadius: 12, display: "inline-block", marginBottom: 8 }}>
                    Question {idx + 1}
                  </span>
                  <h3 style={{ fontSize: 14, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {t.q}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {t.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: BUSINESS & PARTNERSHIP ENQUIRIES
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Pill>Partnerships</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            Business &amp; Partnership Enquiries
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 720, margin: "0 auto 20px" }}>
            Looking to work with MessBee, discuss a partnership or explore a business integration? Please use the appropriate business enquiry channel provided on the Contact Us / Partners page.
          </p>
          <button className="contact-btn-primary" onClick={handleBusinessEnquiries} style={{ fontSize: 13, padding: "11px 26px" }}>
            Business Enquiries
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: A BETTER SUPPORT EXPERIENCE
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: GL, textAlign: "center", position: "relative", overflow: "hidden", borderBottom: `1px solid ${GB}` }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <Pill>A Better Support Experience</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            We want support conversations<br />
            <span style={{ color: G }}>to be straightforward.</span>
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
            Providing accurate information about your issue helps our team understand the problem and provide more relevant guidance.
          </p>
          <div style={{ fontSize: 16.5, fontWeight: 900, color: G, marginBottom: 26, letterSpacing: "-0.3px" }}>
            Tell us what you need help with. We&apos;ll take it from there.
          </div>
          <button
            className="contact-btn-primary"
            onClick={() => document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontSize: 13, padding: "11px 26px" }}
          >
            Contact Support
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: FREQUENTLY ASKED QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>FAQ</Pill>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 900, color: D2, letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div>
            {SUPPORT_FAQS.map((faq, idx) => (
              <FaqItem key={idx} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
