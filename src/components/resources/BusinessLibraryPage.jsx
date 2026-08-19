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
   MessBee — Business Library Page Component
   Official MessBee logo in Hero graphic.
   Strictly adheres ONLY to the text provided in the user prompt.
   Unified, cohesive emerald design system across all sections & cards.
   Same dark forest green gradient (#14532D -> #022C22) & typography.
   Fully responsive across all laptop, tablet, and mobile displays.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. What You'll Find in the Business Library (7 Resource Cards from prompt)
const LIBRARY_RESOURCES = [
  {
    title: "Business Guides",
    desc: "Practical guides covering customer management, marketing, sales, automation and digital business operations.",
    icon: "📖",
  },
  {
    title: "WhatsApp Business Guides",
    desc: "Learn about WhatsApp Business Platform, business messaging, customer communication and responsible messaging practices.",
    icon: "💬",
  },
  {
    title: "Marketing & Growth",
    desc: "Ideas and practical resources for customer acquisition, engagement, retention and business growth.",
    icon: "📢",
  },
  {
    title: "CRM & Customer Management",
    desc: "Learn how to organize customer information, manage leads and build stronger customer relationships.",
    icon: "📊",
  },
  {
    title: "AI & Automation",
    desc: "Understand how AI and automation can be used to reduce repetitive work and improve everyday business processes.",
    icon: "🤖",
  },
  {
    title: "Digital Commerce",
    desc: "Resources covering digital storefronts, online customer journeys, products, services and supported commerce workflows.",
    icon: "🛍️",
  },
  {
    title: "Business Tips & Insights",
    desc: "Practical information for small businesses, local businesses, service providers, retailers and growing companies.",
    icon: "💡",
  },
];

// 2. Learn What Matters to Your Business (10 Topic Items from prompt)
const BUSINESS_TOPICS = [
  "How to manage customer relationships",
  "How to improve lead follow-ups",
  "How WhatsApp Business works",
  "How to plan customer communication",
  "How marketing automation can save time",
  "How AI can support everyday business tasks",
  "How to build a digital presence",
  "How to improve customer retention",
  "How to organize business workflows",
  "How to use data more effectively",
];

// 3. Resources for Different Business Stages (4 Stage Cards from prompt)
const BUSINESS_STAGES = [
  {
    stage: "Starting Your Digital Journey",
    desc: "Understand the basics of customer management, digital marketing and online business operations.",
    icon: "🌱",
  },
  {
    stage: "Growing Your Customer Base",
    desc: "Learn how to manage leads, improve engagement and create more consistent follow-ups.",
    icon: "📈",
  },
  {
    stage: "Scaling Your Operations",
    desc: "Explore automation, CRM, AI and connected business workflows to reduce manual work.",
    icon: "⚡",
  },
  {
    stage: "Building Long-Term Relationships",
    desc: "Learn practical ways to retain customers and create better experiences after the first sale.",
    icon: "❤️",
  },
];

// 4. Why Use the MessBee Business Library? (4 Pillar Cards from prompt)
const WHY_USE_LIBRARY = [
  {
    title: "Practical, Not Complicated",
    desc: "Content is written to be useful for business owners and teams, without unnecessary technical language.",
    icon: "📌",
  },
  {
    title: "Business-Focused",
    desc: "Resources focus on real challenges faced by businesses rather than theory alone.",
    icon: "💼",
  },
  {
    title: "Easy to Explore",
    desc: "Find guides and information by topic, business need or area of interest.",
    icon: "🔍",
  },
  {
    title: "Continuously Growing",
    desc: "New guides, articles, insights and resources can be added as business needs and technology evolve.",
    icon: "🔄",
  },
];

// 5. Frequently Asked Questions (5 items from prompt)
const LIBRARY_FAQS = [
  {
    q: "What is the MessBee Business Library?",
    a: "The Business Library is a collection of business guides, educational resources, insights and practical information covering customer management, marketing, WhatsApp Business, AI, automation and digital commerce.",
  },
  {
    q: "Is the Business Library free?",
    a: "Access to Business Library content may vary by resource. Individual resources will clearly indicate if any registration or subscription is required.",
  },
  {
    q: "Who is the Business Library for?",
    a: "It is designed for business owners, entrepreneurs, marketing teams, sales teams and professionals looking to improve their digital business operations.",
  },
  {
    q: "What topics does it cover?",
    a: "Topics include CRM, customer engagement, WhatsApp Business, marketing automation, AI, business automation, digital commerce and business growth.",
  },
  {
    q: "Can I contribute a resource?",
    a: "If MessBee opens its library to external contributors or partners, submission requirements will be published on the relevant page.",
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
   MAIN BUSINESS LIBRARY PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const BusinessLibraryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExplore = () => {
    const el = document.getElementById("explore-resources");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#0F172A", background: "#FFFFFF" }}>
      {/* Dynamic CSS Styling & Media Queries matching Solution/Resource Pages */}
      <style>{`
        .library-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .library-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(22, 163, 74, 0.08);
          border-color: #BBF7D0 !important;
        }

        .library-btn-primary {
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
        .library-btn-primary:hover {
          background: linear-gradient(135deg, #15803D 0%, #166534 100%);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .library-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .resources-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 22px;
        }

        .topics-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 14px;
        }

        .four-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 18px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .library-hero-row { gap: 60px; }
          .resources-auto-grid { gap: 26px; }
        }

        /* Small Laptops & Tablets (under 1024px) */
        @media (max-width: 1023px) {
          .library-hero-row { flex-direction: column !important; gap: 32px; }
          .resources-auto-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
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
      <title>Business Library | Guides, Insights &amp; Resources for Businesses | MessBee</title>
      <meta
        name="description"
        content="Explore the MessBee Business Library for practical guides and resources on CRM, WhatsApp Business, marketing, AI, automation, digital commerce and business growth."
      />
      <link rel="canonical" href="https://messbee.com/resources/business-library" />

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
          <div className="library-hero-row">
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
                Business Library
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
                Business Library – <span style={{ color: "#16A34A" }}>Practical Guides &amp; Resources for Growing Businesses</span>
              </h1>

              <p style={{ fontSize: 16, fontWeight: 800, color: "#16A34A", marginBottom: 16, letterSpacing: "-0.2px" }}>
                Practical Resources to Help You Run and Grow Your Business
              </p>

              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 12 }}>
                Running a business comes with questions at every stage — how to attract customers, manage leads, improve communication, automate routine work and build a stronger digital presence.
              </p>

              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.68, marginBottom: 20 }}>
                MessBee Business Library brings useful guides, practical insights and business resources together in one place, so you can find relevant information without searching across multiple sources.
              </p>

              <div style={{ fontSize: 16, fontWeight: 900, color: "#15803D", marginBottom: 24, letterSpacing: "-0.3px" }}>
                Learn Better. Work Smarter. Grow With Confidence.
              </div>

              <div>
                <button className="library-btn-primary" onClick={handleExplore}>
                  Explore Business Library
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
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
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Resource Vault</div>
                      <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>Curated Business Library</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, background: "rgba(52,211,153,0.2)", color: "#34D399", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(52,211,153,0.3)" }}>
                    Verified Guides
                  </span>
                </div>

                {/* Library Nodes Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { label: "Business Guides", icon: "📖" },
                    { label: "WhatsApp Guides", icon: "💬" },
                    { label: "Marketing & Growth", icon: "📢" },
                    { label: "CRM & Customers", icon: "📊" },
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
                      <span style={{ fontSize: 10, color: "#34D399", fontWeight: 700 }}>Practical Insights</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 12, padding: 12, textAlign: "center" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: "#4ADE80" }}>
                    Learn Better. Work Smarter. Grow With Confidence.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: WHAT YOU'LL FIND IN THE BUSINESS LIBRARY (7 Cards, 100% Uniform Sizing)
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="explore-resources" style={{ padding: "64px 6%", background: "#FFFFFF" }}>
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
              Library Content
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              What You'll Find in the <span style={{ color: "#16A34A" }}>Business Library</span>
            </h2>
          </div>

          {/* 7 Resource Cards with Uniform Emerald Styling */}
          <div className="resources-auto-grid">
            {LIBRARY_RESOURCES.map((item, idx) => (
              <div
                key={idx}
                className="library-glass-card"
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
                      {item.icon}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.62, marginBottom: 16 }}>
                    {item.desc}
                  </p>
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
                    Resource Guide
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: "#16A34A" }}>
                    Explore Category ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: LEARN WHAT MATTERS TO YOUR BUSINESS
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
              Practical Topics
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 10 }}>
              Learn What Matters to Your Business
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 700, margin: "0 auto" }}>
              The Business Library is organized around real business needs rather than technical jargon. You can explore topics such as:
            </p>
          </div>

          <div className="topics-auto-grid">
            {BUSINESS_TOPICS.map((topic, idx) => (
              <div
                key={idx}
                className="library-glass-card"
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
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: RESOURCES FOR DIFFERENT BUSINESS STAGES
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
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
              Growth Stages
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Resources for <span style={{ color: "#16A34A" }}>Different Business Stages</span>
            </h2>
          </div>

          <div className="four-auto-grid">
            {BUSINESS_STAGES.map((st, idx) => (
              <div
                key={idx}
                className="library-glass-card"
                style={{
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 50}ms`,
                  borderLeft: "4px solid #16A34A",
                }}
              >
                <div>
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
                      marginBottom: 14,
                    }}
                  >
                    {st.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", marginBottom: 8 }}>
                    {st.stage}
                  </h3>
                  <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: WHY USE THE MESSBEE BUSINESS LIBRARY?
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
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
              Core Value
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Why Use the <span style={{ color: "#16A34A" }}>MessBee Business Library?</span>
            </h2>
          </div>

          <div className="four-auto-grid">
            {WHY_USE_LIBRARY.map((item, idx) => (
              <div
                key={idx}
                className="library-glass-card"
                style={{
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 50}ms`,
                  border: "1px solid #E2E8F0",
                }}
              >
                <div>
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
                      marginBottom: 14,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: A RESOURCE CENTRE FOR MODERN BUSINESSES
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: GL, padding: "72px 6%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <Pill>A Resource Centre for Modern Businesses</Pill>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            Whether you're a local retailer or growing company,<br />
            <span style={{ color: G }}>the right information helps you grow.</span>
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 760, margin: "0 auto 20px" }}>
            The MessBee Business Library is designed to become a practical resource centre for businesses looking to improve how they manage customers, communicate, market, automate and grow.
          </p>
          <div style={{ fontSize: 16.5, fontWeight: 900, color: G, marginBottom: 26, letterSpacing: "-0.3px" }}>
            Explore a topic. Learn something useful. Put it into practice.
          </div>
          <button className="library-btn-primary" onClick={handleExplore} style={{ fontSize: 13, padding: "11px 26px" }}>
            Explore the Business Library
          </button>
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
            {LIBRARY_FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLibraryPage;
