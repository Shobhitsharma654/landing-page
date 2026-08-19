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
   MessBee — Help Center Page Component
   Official MessBee logo in Hero graphic.
   Strictly adheres ONLY to the text provided in the user prompt.
   Unified, cohesive emerald design system across all sections & cards.
   Same dark forest green gradient (#14532D -> #022C22) & typography.
   Fully responsive across all laptop, tablet, and mobile displays.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. How Can We Help? (6 Help Categories from prompt)
const HELP_CATEGORIES = [
  {
    title: "Getting Started",
    desc: "Learn the basics of setting up your MessBee account and getting your business ready.",
    icon: "🚀",
    bullets: [
      "Account Setup",
      "Business Profile",
      "Team & User Setup",
      "Plans & Billing",
      "Getting Started Guides",
    ],
  },
  {
    title: "CRM",
    desc: "Learn how to manage your customers, contacts and leads.",
    icon: "📊",
    bullets: [
      "Customer Management",
      "Contact Management",
      "Lead Management",
      "Customer Profiles",
      "Sales Pipeline",
      "Segmentation",
    ],
  },
  {
    title: "WhatsApp Business",
    desc: "Find guidance for supported WhatsApp Business features and integrations.",
    icon: "💬",
    bullets: [
      "WhatsApp Setup",
      "Business Account Connection",
      "Messaging",
      "Message Templates",
      "Customer Conversations",
      "Common Issues",
    ],
  },
  {
    title: "Marketing",
    desc: "Learn how to create and manage your marketing activities.",
    icon: "📢",
    bullets: [
      "Campaigns",
      "Customer Segments",
      "Marketing Automation",
      "Email",
      "SMS",
      "WhatsApp Campaigns",
    ],
  },
  {
    title: "AI & Automation",
    desc: "Understand how to set up supported AI and automation features.",
    icon: "🤖",
    bullets: [
      "AI Features",
      "Chatbot Setup",
      "Automation Workflows",
      "Triggers & Actions",
      "Workflow Management",
      "Troubleshooting",
    ],
  },
  {
    title: "Digital Store",
    desc: "Get help setting up and managing your digital storefront.",
    icon: "🛍️",
    bullets: [
      "Store Setup",
      "Products & Services",
      "Catalogue Management",
      "Orders",
      "Payments",
      "Store Settings",
    ],
  },
];

// 2. Quick Answers to Common Questions (9 items from prompt)
const QUICK_ANSWERS = [
  "How to set up your MessBee account",
  "How to connect supported integrations",
  "How to manage customers and leads",
  "How to create campaigns",
  "How to configure automation",
  "How to manage your Digital Store",
  "How billing and plans work",
  "How to troubleshoot common issues",
  "How to contact MessBee Support",
];

// 3. Troubleshooting Pipeline Nodes (from prompt)
const TROUBLESHOOTING_NODES = [
  "Account",
  "Integrations",
  "Messaging",
  "Campaigns",
  "Automation",
  "Store",
  "Payments",
];

// 4. Product Updates - What's New items (from prompt)
const WHATS_NEW_ITEMS = [
  "New product features",
  "Platform improvements",
  "Integration updates",
  "Important service notices",
  "Policy-related updates",
];

// 5. Frequently Asked Questions (5 items from prompt)
const HELP_FAQS = [
  {
    q: "What is the MessBee Help Center?",
    a: "The Help Center is MessBee's central resource for product documentation, setup guides, how-to articles and troubleshooting information.",
  },
  {
    q: "Is the Help Center available to all users?",
    a: "Access to specific support resources may depend on the MessBee product, plan or account type.",
  },
  {
    q: "Can I find WhatsApp Business setup information here?",
    a: "Yes. The Help Center can provide guidance for supported WhatsApp Business features, setup and common issues.",
  },
  {
    q: "Where can I get help with billing?",
    a: "Billing and subscription information can be covered under the Plans & Billing section. For account-specific billing questions, contact MessBee Support.",
  },
  {
    q: "What if I cannot find a solution?",
    a: "If the available guides do not resolve your issue, contact support@messbee.com and provide relevant details about the problem.",
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
   MAIN HELP CENTER PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const HelpCenterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVisitHelpCenter = () => {
    const el = document.getElementById("how-can-we-help");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSupport = () => {
    navigate("/resources/contact-support");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#0F172A", background: "#FFFFFF" }}>
      {/* Dynamic CSS Styling & Media Queries matching Solution/Resource Pages */}
      <style>{`
        .help-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .help-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(22, 163, 74, 0.08);
          border-color: #BBF7D0 !important;
        }

        .help-btn-primary {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
        }
        .help-btn-primary:hover {
          background: linear-gradient(135deg, #15803D 0%, #166534 100%);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .help-btn-secondary {
          background: #FFFFFF;
          color: #16A34A;
          border: 1px solid #BBF7D0;
          border-radius: 12px;
          padding: 12px 24px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .help-btn-secondary:hover {
          background: #F0FDF4;
          border-color: #16A34A;
          transform: translateY(-1.5px);
        }

        .help-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .categories-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 22px;
        }

        .quick-answers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 14px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .help-hero-row { gap: 60px; }
          .categories-auto-grid { gap: 26px; }
        }

        /* Small Laptops & Tablets (under 1024px) */
        @media (max-width: 1023px) {
          .help-hero-row { flex-direction: column !important; gap: 32px; }
          .categories-auto-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        }

        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        .pulse-aura {
          animation: auraPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* SEO Title & Meta Description */}
      <title>MessBee Help Center | Guides, Support &amp; Troubleshooting</title>
      <meta
        name="description"
        content="Find MessBee setup guides, product documentation, troubleshooting help and answers for CRM, WhatsApp Business, marketing, AI, automation and Digital Store."
      />
      <link rel="canonical" href="https://messbee.com/resources/help-center" />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO
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
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(22,163,74,0.06) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="help-hero-row">
            {/* Left Column: Text Copy */}
            <div style={{ flex: 1.15 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#D1FAE5",
                  color: "#059669",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  border: "1px solid #A7F3D0",
                }}
              >
                Help Center
              </div>

              {/* H1 Heading */}
              <h1
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.18,
                  letterSpacing: "-1.2px",
                  marginBottom: 12,
                }}
              >
                MessBee Help Center – <span style={{ color: "#16A34A" }}>Guides, Answers &amp; Support</span>
              </h1>

              <p style={{ fontSize: 16, fontWeight: 800, color: "#16A34A", marginBottom: 16, letterSpacing: "-0.2px" }}>
                Get the Help You Need, When You Need It
              </p>

              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 12 }}>
                Have a question about MessBee? The MessBee Help Center brings product information, setup instructions, how-to guides and troubleshooting resources together in one place.
              </p>

              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 20 }}>
                Whether you're setting up your account, connecting a business channel or learning how to use a MessBee feature, you'll find practical guidance to help you get started.
              </p>

              <div style={{ fontSize: 16, fontWeight: 900, color: "#15803D", marginBottom: 24, letterSpacing: "-0.3px" }}>
                Find an Answer. Follow the Steps. Get Back to Business.
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button className="help-btn-primary" onClick={handleVisitHelpCenter}>
                  Visit Help Center
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <button className="help-btn-secondary" onClick={handleContactSupport}>
                  Contact Support
                </button>
              </div>
            </div>

            {/* Right Column: Hero Graphic Box with Dark Forest Green Gradient */}
            <div style={{ flex: 0.85, minWidth: 320, position: "relative" }}>
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

                {/* Header featuring Official MessBee Logo */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 2 }}>
                      <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Support Desk</div>
                      <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>24/7 Documentation Hub</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, background: "rgba(52,211,153,0.2)", color: "#34D399", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(52,211,153,0.3)" }}>
                    Official Guides
                  </span>
                </div>

                {/* Help Nodes Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { label: "Getting Started", icon: "⚙️" },
                    { label: "CRM & Contacts", icon: "📊" },
                    { label: "WhatsApp Setup", icon: "💬" },
                    { label: "AI Workflows", icon: "🤖" },
                  ].map((node, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(52,211,153,0.2)",
                        borderRadius: 14,
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 18 }}>{node.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#FFFFFF" }}>{node.label}</span>
                      </div>
                      <span style={{ fontSize: 10, color: "#34D399", fontWeight: 700 }}>Step-by-Step Help</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 12, padding: 12, textAlign: "center" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: "#4ADE80" }}>
                    Find an Answer. Follow the Steps. Get Back to Business.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: HOW CAN WE HELP? (6 Help Categories, 100% Uniform Sizing)
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="how-can-we-help" style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Knowledge Base
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              How Can We <span style={{ color: "#16A34A" }}>Help?</span>
            </h2>
          </div>

          {/* 6 Help Category Cards */}
          <div className="categories-auto-grid">
            {HELP_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="help-glass-card"
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 45}ms`,
                  border: "1px solid #E2E8F0",
                }}
              >
                <div>
                  {/* Icon + Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#16A34A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", lineHeight: 1.3 }}>
                      {cat.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 12.8, color: "#64748B", lineHeight: 1.62, marginBottom: 16 }}>
                    {cat.desc}
                  </p>

                  {/* Bullet Topics */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
                    {cat.bullets.map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#16A34A", fontWeight: 900, fontSize: 12 }}>•</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#334155" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anchored Footer Bar for 100% uniform card sizing */}
                <div
                  style={{
                    marginTop: "auto",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#059669", background: "#D1FAE5", padding: "3px 10px", borderRadius: 20 }}>
                    {cat.bullets.length} Topics
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: "#16A34A" }}>
                    View Guides ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: QUICK ANSWERS TO COMMON QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Popular Guides
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 10 }}>
              Quick Answers to Common Questions
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B" }}>
              Use the Help Center to find answers about:
            </p>
          </div>

          <div className="quick-answers-grid">
            {QUICK_ANSWERS.map((ans, idx) => (
              <div
                key={idx}
                className="help-glass-card"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid #E2E8F0",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>
                  {ans}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: TROUBLESHOOTING
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "60px 6%", background: GL, borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", textAlign: "center" }}>
          <Pill>Issue Resolution</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            Troubleshooting<br />
            <span style={{ color: G }}>Something isn't working as expected?</span>
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 720, margin: "0 auto 20px" }}>
            Our troubleshooting guides can help you identify and resolve common issues related to:
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0, marginBottom: 26 }}>
            {TROUBLESHOOTING_NODES.map((node, i, arr) => (
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

          <p style={{ fontSize: 13, color: MU, marginBottom: 24, fontWeight: 700 }}>
            If you still need help, you can contact the MessBee Support team.
          </p>
          <button className="help-btn-primary" onClick={handleContactSupport} style={{ fontSize: 13, padding: "11px 26px" }}>
            Contact Support
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: PRODUCT UPDATES
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Release Notes
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 10 }}>
              Product Updates
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto" }}>
              Stay informed about new features, improvements and important changes to MessBee.
            </p>
          </div>

          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div
              className="help-glass-card"
              style={{
                padding: 28,
                border: "1px solid #E2E8F0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  🔔
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>
                  What's New
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {WHATS_NEW_ITEMS.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#16A34A", fontWeight: 900, fontSize: 14 }}>•</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: NEED MORE HELP? (Contact Support Box)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              background: "#D1FAE5",
              color: "#059669",
              padding: "4px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Direct Assistance
          </div>
          <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
            Need More Help?
          </h2>

          <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 680, margin: "0 auto 20px", lineHeight: 1.68 }}>
            If you can't find the answer you're looking for, our support team can help with your MessBee account and supported services.
          </p>

          <div style={{ marginBottom: 20 }}>
            <button className="help-btn-primary" onClick={handleContactSupport} style={{ fontSize: 14, padding: "13px 30px" }}>
              Contact Support
            </button>
          </div>

          <div style={{ fontSize: 14, fontWeight: 800, color: "#16A34A", marginBottom: 14 }}>
            Email: <a href="mailto:support@messbee.com" style={{ color: "#16A34A", textDecoration: "underline" }}>support@messbee.com</a>
          </div>

          <p style={{ fontSize: 12, color: "#64748B", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            For account-specific assistance, you may be asked to provide relevant account or technical information so the support team can investigate the issue.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: FREQUENTLY ASKED QUESTIONS
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
            {HELP_FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;
