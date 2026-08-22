import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";

/* ═══════════════════════════════════════════════════════════════════════
   MessBee — FAQs Page
   Official MessBee logo in Hero graphic.
   Strictly adheres ONLY to the text provided in the user prompt.
   Compact, sleek typography & clean responsive layout.
   ═══════════════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  // ── 1. About MessBee ──
  {
    category: "About MessBee",
    q: "What is MessBee?",
    a: "MessBee is a digital business platform that brings customer management, business communication, marketing, automation and digital commerce tools together in one connected environment.",
  },
  {
    category: "About MessBee",
    q: "Who is MessBee built for?",
    a: "MessBee is designed for small and medium businesses, retail and local businesses, e-commerce businesses, service businesses and other growing organizations that want to organize their digital business operations.",
  },
  {
    category: "About MessBee",
    q: "What can I do with MessBee?",
    a: "Depending on your plan and configuration, MessBee can help you:",
    bullets: [
      "Manage customers and leads",
      "Organize customer information",
      "Use supported WhatsApp Business capabilities",
      "Run marketing campaigns",
      "Automate business workflows",
      "Use AI-assisted features",
      "Create a Digital Store",
      "Manage supported commerce activities",
      "Track available business and campaign activity",
    ],
  },
  {
    category: "About MessBee",
    q: "Is MessBee suitable for a small business?",
    a: "Yes. MessBee is designed to support businesses at different stages of growth. You can start with the features relevant to your current needs and expand your use of the platform as your business grows.",
  },

  // ── 2. Products & Features ──
  {
    category: "Products & Features",
    q: "What products does MessBee offer?",
    a: "MessBee's core product areas include:",
    bullets: [
      "CRM",
      "WhatsApp Business",
      "Marketing Automation",
      "AI & Automation",
      "Digital Store",
    ],
    footerText: "The availability of individual features depends on the applicable plan, configuration and integrations.",
  },
  {
    category: "Products & Features",
    q: "Can MessBee manage customers and leads?",
    a: "Yes. MessBee CRM can help businesses organize customer profiles, contacts, leads, conversations and sales-related information.",
  },
  {
    category: "Products & Features",
    q: "Can I connect WhatsApp Business with MessBee?",
    a: "MessBee may support WhatsApp Business Platform capabilities, subject to applicable Meta/WhatsApp requirements, account eligibility, permissions, configuration and available features.",
  },
  {
    category: "Products & Features",
    q: "Can I use MessBee for marketing?",
    a: "Yes. Supported marketing features can help businesses manage campaigns, customer segments, follow-ups and customer engagement across available communication channels.",
  },
  {
    category: "Products & Features",
    q: "Can I automate repetitive business tasks?",
    a: "Yes. MessBee provides configurable automation capabilities for supported business workflows, helping reduce repetitive manual tasks.",
  },
  {
    category: "Products & Features",
    q: "Does MessBee provide AI features?",
    a: "Yes. MessBee may offer AI-assisted features such as chatbot capabilities, response assistance and workflow support, depending on the applicable plan and configuration.",
  },
  {
    category: "Products & Features",
    q: "Can I create a Digital Store?",
    a: "Yes. MessBee Digital Store can help businesses create a digital storefront for showcasing supported products and services.",
  },

  // ── 3. WhatsApp Business ──
  {
    category: "WhatsApp Business",
    q: "Can I send WhatsApp marketing messages through MessBee?",
    a: "Eligible WhatsApp marketing communication may be supported where the business meets applicable Meta/WhatsApp requirements and has the required customer permission or other lawful basis.",
  },
  {
    category: "WhatsApp Business",
    q: "Can I send unlimited WhatsApp messages?",
    a: "No. WhatsApp Business Platform usage is subject to applicable Meta/WhatsApp policies, limits, account conditions and other requirements. MessBee does not offer WhatsApp as an unrestricted spam or bulk messaging service.",
  },
  {
    category: "WhatsApp Business",
    q: "Are WhatsApp message templates automatically approved?",
    a: "No. Template approval is subject to the applicable Meta/WhatsApp review and policy requirements. MessBee cannot guarantee approval of a particular template.",
  },
  {
    category: "WhatsApp Business",
    q: "Can MessBee guarantee WhatsApp message delivery?",
    a: "No. Delivery can depend on factors including Meta/WhatsApp systems, recipient availability, account status, messaging policies and other technical conditions.",
  },
  {
    category: "WhatsApp Business",
    q: "Can MessBee prevent my WhatsApp Business account from being restricted?",
    a: "MessBee cannot guarantee that an account will never be restricted. Businesses must follow applicable Meta/WhatsApp policies and responsible messaging practices.",
  },

  // ── 4. Marketing & Automation ──
  {
    category: "Marketing & Automation",
    q: "Can I create customer segments?",
    a: "Yes. Supported CRM and marketing features can allow businesses to organize customers and leads using relevant information and configured criteria.",
  },
  {
    category: "Marketing & Automation",
    q: "Can I automate customer follow-ups?",
    a: "Yes. Supported automation workflows can be configured for activities such as lead follow-ups, reminders, customer engagement and other routine processes.",
  },
  {
    category: "Marketing & Automation",
    q: "Can I use WhatsApp, SMS and Email for marketing?",
    a: "Depending on your plan and available integrations, MessBee may support these communication channels. Each channel has its own technical, legal and policy requirements.",
  },
  {
    category: "Marketing & Automation",
    q: "Does MessBee guarantee more leads or sales?",
    a: "No. MessBee provides technology and business tools but does not guarantee a specific number of leads, conversions, customers or revenue.",
  },

  // ── 5. AI & Automation ──
  {
    category: "AI & Automation",
    q: "Is MessBee AI always accurate?",
    a: "No. AI-generated information can sometimes be incomplete, inaccurate or unsuitable for a particular situation. Important outputs should be reviewed before being relied upon or shared with customers.",
  },
  {
    category: "AI & Automation",
    q: "Can AI make business decisions automatically?",
    a: "MessBee provides AI-assisted capabilities. Businesses remain responsible for reviewing AI outputs and making appropriate decisions, particularly where a decision could materially affect a customer.",
  },
  {
    category: "AI & Automation",
    q: "Can I use my customer data with AI features?",
    a: "AI feature availability and data processing depend on the specific feature, configuration and applicable terms. Businesses must ensure they have the appropriate rights and lawful basis for processing customer information.",
  },

  // ── 6. Digital Store & Commerce ──
  {
    category: "Digital Store & Commerce",
    q: "Can I sell products through MessBee Digital Store?",
    a: "Supported Digital Store and commerce capabilities may allow businesses to showcase products or services and manage eligible commerce workflows.",
  },
  {
    category: "Digital Store & Commerce",
    q: "Can I accept online payments?",
    a: "MessBee may support integrations with applicable payment providers. Payment availability, transaction processing, fees and settlement are subject to the relevant provider's terms.",
  },
  {
    category: "Digital Store & Commerce",
    q: "Is MessBee an online marketplace?",
    a: "No. MessBee is designed to help businesses build and manage their own digital presence, customer relationships and supported commerce workflows. It is not positioned as a consumer marketplace.",
  },

  // ── 7. Pricing & Plans ──
  {
    category: "Pricing & Plans",
    q: "How does MessBee pricing work?",
    a: "MessBee may offer different plans based on the features, usage and business requirements included in each plan. Current pricing and plan inclusions should be checked on the Pricing page.",
  },
  {
    category: "Pricing & Plans",
    q: "Can I upgrade my plan later?",
    a: "Plan changes may be available depending on the applicable subscription terms and current MessBee offerings.",
  },
  {
    category: "Pricing & Plans",
    q: "Are third-party charges included in MessBee pricing?",
    a: "Not necessarily. Charges from third-party providers, communication platforms, payment providers or other integrations may apply separately where applicable.",
  },
  {
    category: "Pricing & Plans",
    q: "Can pricing or features change?",
    a: "MessBee may update its plans, features, usage limits or pricing from time to time in accordance with its applicable terms and customer communications.",
  },

  // ── 8. Security, Privacy & Compliance ──
  {
    category: "Security, Privacy & Compliance",
    q: "How does MessBee handle customer data?",
    a: "MessBee handles information according to its applicable Privacy Policy and, where relevant, contractual data-processing arrangements.",
  },
  {
    category: "Security, Privacy & Compliance",
    q: "Does MessBee provide a Data Processing Agreement?",
    a: "Where applicable, MessBee may provide a Data Processing Agreement (DPA) governing the processing of personal data on behalf of customers.",
  },
  {
    category: "Security, Privacy & Compliance",
    q: "Is MessBee compliant with Indian data-protection requirements?",
    a: "MessBee is designed with applicable Indian legal and data-protection requirements in mind. Specific compliance obligations can depend on the business, data processed, processing activities and applicable law.",
  },
  {
    category: "Security, Privacy & Compliance",
    q: "Does MessBee sell customer data?",
    a: "MessBee's data practices are described in its Privacy Policy. Customer information should be handled according to applicable contractual, privacy and legal requirements.",
  },
  {
    category: "Security, Privacy & Compliance",
    q: "Is my business data secure?",
    a: "MessBee uses appropriate security measures for its services. However, no online service can guarantee absolute security, and customers are also responsible for protecting account credentials and configuring access appropriately.",
  },

  // ── 9. Meta & Technology Partnerships ──
  {
    category: "Meta & Technology Partnerships",
    q: "Is MessBee connected with Meta?",
    a: "MessBee may use or integrate with Meta technologies and services, including supported WhatsApp Business Platform capabilities.",
  },
  {
    category: "Meta & Technology Partnerships",
    q: "Is MessBee a Meta-owned company?",
    a: "No. MessBee is not owned by Meta unless explicitly stated otherwise. Any relationship, integration or technology partnership should not be interpreted as Meta ownership or endorsement unless officially stated.",
  },
  {
    category: "Meta & Technology Partnerships",
    q: "Does using MessBee mean Meta's policies do not apply?",
    a: "No. Where MessBee uses Meta or WhatsApp services, the applicable Meta/WhatsApp terms, policies and requirements continue to apply.",
  },

  // ── 10. Support ──
  {
    category: "Support",
    q: "Where can I get help using MessBee?",
    a: "You can visit the MessBee Help Center for setup guides, documentation and troubleshooting information.",
  },
  {
    category: "Support",
    q: "How can I contact MessBee Support?",
    a: "You can contact MessBee Support through the support channels provided on the MessBee website.",
    email: "support@messbee.com",
  },
  {
    category: "Support",
    q: "What information should I provide when contacting support?",
    a: "For account or technical issues, providing relevant details such as your account information, feature being used, error message and screenshots where appropriate can help the support team investigate the issue more efficiently.",
  },
];

const CATEGORIES = [
  "All",
  "About MessBee",
  "Products & Features",
  "WhatsApp Business",
  "Marketing & Automation",
  "AI & Automation",
  "Digital Store & Commerce",
  "Pricing & Plans",
  "Security, Privacy & Compliance",
  "Meta & Technology Partnerships",
  "Support",
];

/* ── Individual Accordion Item Component ── */
const FaqCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`faq-glass-card ${open ? "open-card" : ""}`}
      onClick={() => setOpen(!open)}
      style={{
        background: "#FFFFFF",
        border: `1.5px solid ${open ? "#16A34A" : "#E2E8F0"}`,
        borderRadius: 14,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: open ? "0 8px 24px rgba(22, 163, 74, 0.08)" : "0 2px 6px rgba(15, 23, 42, 0.02)",
        marginBottom: 12,
        animationDelay: `${(index % 10) * 45}ms`,
      }}
    >
      <div className="faq-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span className="faq-card-question" style={{ fontSize: 14, fontWeight: 700, color: open ? "#16A34A" : "#0F172A", lineHeight: 1.45, flex: "1 1 auto", textAlign: "left", transition: "color 0.25s ease" }}>
          {item.q}
        </span>
        <span
          className="faq-card-icon"
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="faq-card-body" style={{ marginTop: 12, borderTop: "1px solid #F1F5F9", paddingTop: 12, textAlign: "left" }}>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7 }}>{item.a}</p>

          {item.bullets && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {item.bullets.map((b, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A" }}>{b}</span>
                </div>
              ))}
            </div>
          )}

          {item.footerText && (
            <p style={{ fontSize: 12, color: "#64748B", marginTop: 10, lineHeight: 1.5 }}>
              {item.footerText}
            </p>
          )}

          {item.email && (
            <div style={{ marginTop: 10, fontSize: 12.5, fontWeight: 800, color: "#16A34A" }}>
              Email: <a href={`mailto:${item.email}`} style={{ color: "#16A34A", textDecoration: "underline" }}>{item.email}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN FAQ PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const FaqPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHelpCenter = () => {
    navigate("/docs");
  };

  const handleContactSupport = () => {
    navigate("/contact");
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── BUTTONS ── */
        .faq-btn-primary {
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
        .faq-btn-primary:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(22, 163, 74, 0.32);
        }

        .faq-btn-secondary {
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
        .faq-btn-secondary:hover {
          border-color: #16A34A;
          color: #16A34A;
          background: #F0FDF4;
          transform: translateY(-2px);
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

        .faq-glass-card {
          animation: fadeInUp 0.4s ease-out both;
        }
        .faq-glass-card:hover {
          transform: translateY(-3px);
          border-color: #BBF7D0 !important;
        }

        /* ── RESPONSIVE HERO ROW ── */
        .faq-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .faq-hero-row { gap: 60px; }
        }

        /* Medium Laptops (1200px - 1439px) */
        @media (max-width: 1439px) and (min-width: 1200px) {
          .faq-hero-row { gap: 44px; }
        }

        /* Small Laptops (1024px - 1199px) */
        @media (max-width: 1199px) and (min-width: 1024px) {
          .faq-hero-row { gap: 32px; }
        }

        /* Compact Laptop / Tablet-Laptop (under 1024px) */
        @media (max-width: 1023px) {
          .faq-hero-row { flex-direction: column !important; gap: 32px; }
        }

        /* Mobile Breakpoints (768px and under) */
        @media (max-width: 768px) {
          .faq-section {
            padding: 28px 16px !important;
          }
          .faq-hero-section {
            margin-top: 0px !important;
            padding-top: 84px !important;
            padding-bottom: 28px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .faq-hero-row {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .faq-hero-left {
            min-width: 100% !important;
          }
          .faq-hero-graphic-box {
            margin-top: 10px !important;
            padding-top: 24px !important;
            margin-bottom: 0 !important;
            min-width: 0 !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .faq-hero-graphic-card {
            transform: none !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px !important;
            padding: 22px 16px !important;
            box-sizing: border-box !important;
          }
          .faq-btn-primary, .faq-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
          .faq-glass-card {
            padding: 14px 16px !important;
            border-radius: 12px !important;
            margin-bottom: 10px !important;
          }
          .faq-card-question {
            font-size: 13.5px !important;
          }
          .faq-card-body p {
            font-size: 13px !important;
            line-height: 1.65 !important;
          }
          .category-pills-wrapper {
            padding: 24px 14px 16px !important;
          }
          .category-pill-btn {
            padding: 6px 12px !important;
            font-size: 11.5px !important;
          }
          .faq-list-section {
            padding: 24px 16px 36px !important;
          }
          .faq-callout-section {
            padding: 32px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .faq-hero-graphic-card {
            padding: 18px 12px !important;
            border-radius: 18px !important;
          }
          .faq-hero-section {
            margin-top: 0px !important;
            padding-top: 78px !important;
            padding-bottom: 24px !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          .faq-glass-card {
            padding: 12px 14px !important;
          }
          .faq-card-question {
            font-size: 13px !important;
          }
          .faq-card-body p {
            font-size: 12.5px !important;
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

      {/* SEO Document Title & Meta Description (Exact Prompt Meta) */}
      <title>MessBee FAQs | CRM, WhatsApp Business, AI, Marketing & Support</title>
      <meta
        name="description"
        content="Find answers to common questions about MessBee CRM, WhatsApp Business, marketing automation, AI, Digital Store, pricing, security, privacy and support."
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Strictly Provided Copy & Recommended H1)
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="faq-hero-section"
        style={{
          marginTop: 0,
          padding: "92px 6% 48px",
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

        <div className="faq-hero-row" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div className="faq-hero-left" style={{ flex: 1.1, minWidth: 320 }}>
            {/* Provided Badge: FAQs */}
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
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 6px #16A34A" }} />
              FAQs
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
              MessBee FAQs – Answers About Products,{" "}
              <span style={{ color: "#16A34A" }}>Features &amp; Support</span>
            </h1>

            {/* Provided Sub-headline */}
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 800, color: "#16A34A", marginBottom: 12, letterSpacing: "-0.3px" }}>
              Frequently Asked Questions About MessBee
            </p>

            {/* Provided Paragraph 1 */}
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 10, maxWidth: 540 }}>
              Have questions about MessBee, its products, integrations or business features? Find answers to some of the most common questions below.
            </p>

            {/* Provided Paragraph 2 */}
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 20, maxWidth: 540 }}>
              If you cannot find what you are looking for, visit the Help Center or contact our support team.
            </p>

            {/* CTAs from Prompt */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="faq-btn-primary" onClick={handleHelpCenter}>
                Visit Help Center
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button className="faq-btn-secondary" onClick={handleContactSupport}>
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column: Visual FAQ Graphic Node Box with Official MessBee Logo */}
          <div className="faq-hero-graphic-box" style={{ flex: 0.85, minWidth: 320, position: "relative", display: "flex", justifyContent: "center", paddingTop: 20, marginBottom: -120 }}>
            <div
              className="faq-hero-graphic-card"
              style={{
                background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
                borderRadius: 24,
                padding: 28,
                boxShadow: "0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)",
                border: "1px solid rgba(34,197,94,.2)",
                color: "#FFFFFF",
                position: "relative",
                width: "100%",
                maxWidth: 460,
                transform: "scale(0.75)",
                transformOrigin: "top center",
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

              {/* Header featuring Official MessBee Logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 4 }}>
                    <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.3px" }}>MessBee Knowledge Base</div>
                    <div style={{ fontSize: 11, color: "#34D399", fontWeight: 700 }}>Instant Answers &amp; Documentation</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, background: "rgba(16,185,129,0.15)", color: "#34D399", padding: "6px 12px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(16,185,129,0.4)" }}>
                  24/7 Access
                </span>
              </div>

              {/* Fast Category Quick Nodes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                {[
                  { label: "CRM & Contacts", icon: "👥", count: "4 Questions" },
                  { label: "WhatsApp API", icon: "💬", count: "5 Questions" },
                  { label: "Automation & AI", icon: "⚡", count: "7 Questions" },
                  { label: "Pricing & Plans", icon: "💳", count: "4 Questions" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(16,185,129,0.09)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: 14,
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.2px" }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#34D399", fontWeight: 700 }}>{item.count}</span>
                  </div>
                ))}
              </div>

              {/* Search Bar Input inside Graphic Box */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search questions (e.g. WhatsApp, CRM, Pricing)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(22,163,74,0.4)",
                    borderRadius: 12,
                    padding: "10px 14px 10px 38px",
                    color: "#FFFFFF",
                    fontSize: 12.5,
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: "absolute", left: 14, top: 12 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: CATEGORY FILTER TABS & SEARCH
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="category-pills-wrapper" style={{ padding: "40px 6% 20px", background: "#FAFAFA", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Category Pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  className="category-pill-btn"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: active ? "#16A34A" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#475569",
                    border: `1px solid ${active ? "#16A34A" : "#E2E8F0"}`,
                    borderRadius: 30,
                    padding: "7px 16px",
                    fontSize: 12.5,
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: active ? "0 4px 12px rgba(22,163,74,0.2)" : "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: ACCORDION LIST OF FAQS (FILTERED & CATEGORIZED)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="faq-list-section" style={{ padding: "48px 6% 64px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#64748B" }}>
                No questions found matching &quot;{searchQuery}&quot;.
              </p>
              <button
                className="faq-btn-secondary"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                style={{ marginTop: 16 }}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((faqItem, idx) => (
              <FaqCard key={idx} item={faqItem} index={idx} />
            ))
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: STILL HAVE QUESTIONS? (CALLOUT SECTION)
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="faq-callout-section"
        style={{
          padding: "68px 6%",
          background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
          borderTop: "1px solid #BBF7D0",
          borderBottom: "1px solid #BBF7D0",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          {/* Title from Prompt */}
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 14 }}>
            Still Have Questions?
          </h2>

          {/* Paragraphs from Prompt */}
          <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.68, marginBottom: 10, maxWidth: 700, margin: "0 auto 10px" }}>
            If you couldn&apos;t find the answer here, our Help Center provides more detailed product information and troubleshooting guides.
          </p>

          <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.68, marginBottom: 28, maxWidth: 700, margin: "0 auto 28px" }}>
            For account-specific assistance, contact the MessBee Support team.
          </p>

          {/* CTAs from Prompt */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="faq-btn-primary" onClick={handleHelpCenter} style={{ fontSize: 14, padding: "12px 28px" }}>
              Visit Help Center
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button className="faq-btn-secondary" onClick={handleContactSupport} style={{ fontSize: 14, padding: "11px 26px" }}>
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage;
