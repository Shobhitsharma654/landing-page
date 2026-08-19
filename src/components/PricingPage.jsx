import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";

/* ── Check & Dash Icons ── */
const CheckIcon = ({ color = "#16A34A", size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DashIcon = () => (
  <span style={{ color: "#94A3B8", fontWeight: 700, fontSize: 14 }}>—</span>
);

const Pill = ({ children }) => (
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "#D1FAE5",
    color: "#059669",
    border: "1px solid #A7F3D0",
    padding: "3px 12px",
    borderRadius: 20,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: 12,
  }}>
    {children}
  </div>
);

const PricingPage = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("INR"); // "INR" | "USD"
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" | "quarterly" | "annual"
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = (planId) => {
    setExpandedCards((prev) => ({ ...prev, [planId]: !prev[planId] }));
  };

  const scrollToPricing = () => {
    document.getElementById("plan-cards-section")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── 5 Core Plans strictly adhering to provided text (Flat rates, no off) ── */
  const plansData = [
    {
      id: "free",
      name: "FREE",
      icon: "🚀",
      badge: "Try & Test",
      badgeColor: "#059669",
      badgeBg: "#D1FAE5",
      prices: {
        INR: { monthly: "₹0", quarterly: "₹0", annual: "₹0", annualDisplay: "₹0/year", save: null },
        USD: { monthly: "$0", quarterly: "$0", annual: "$0", annualDisplay: "$0/year", save: null },
      },
      bestFor: "Testing, startups and small businesses.",
      cta: "Get Started Free",
      popular: false,
      includes: [
        "500 message replies/month",
        "500 contacts",
        "1 automation",
        "3 automation nodes",
        "1 chatbot",
        "3 chatbot nodes",
        "1 campaign",
        "Basic Team Inbox",
        "Multiple Agent Chat",
        "Private Notes",
        "Contact Management",
        "Basic CRM",
        "Labels",
        "Custom Fields",
        "Status Management",
        "Quick Replies",
        "Template Management",
        "Basic Campaign Analytics",
        "Basic Automation",
        "Welcome Message",
        "Away Message",
        "CSV Contact Import",
      ],
    },
    {
      id: "basic",
      name: "BASIC",
      icon: "⚡",
      badge: "Essential",
      badgeColor: "#0284C7",
      badgeBg: "#E0F2FE",
      prices: {
        INR: { monthly: "₹899", quarterly: "₹2,697", annual: "₹10,788", annualDisplay: "₹10,788/year", save: null },
        USD: { monthly: "$12", quarterly: "$36", annual: "$144", annualDisplay: "$144/year", save: null },
      },
      bestFor: "Small businesses that need WhatsApp marketing, CRM and team collaboration.",
      cta: "Get Started",
      popular: false,
      includes: [
        "Everything in Free",
        "Bulk WhatsApp Campaigns",
        "Unlimited Campaigns",
        "CSV Campaign Import",
        "Campaign Scheduling",
        "Campaign Analytics",
        "Marketing Templates",
        "Utility Templates",
        "Authentication Templates",
        "Choice-Based Chatbot",
        "Welcome & Away Automation",
        "Fallback Automation",
        "Button-Based Automation",
        "Agent Assignment",
        "Agent Tracking",
        "CRM Contact Management",
        "Increased Labels",
        "Increased Custom Fields",
        "Increased Quick Replies",
        "Template Analytics",
        "WhatsApp Number Setup",
        "Basic Onboarding & Training",
      ],
    },
    {
      id: "growth",
      name: "GROWTH",
      icon: "⭐",
      badge: "Most Popular",
      badgeColor: "#15803D",
      badgeBg: "#DCFCE7",
      prices: {
        INR: { monthly: "₹1,299", quarterly: "₹3,897", annual: "₹15,588", annualDisplay: "₹15,588/year", save: null },
        USD: { monthly: "$18", quarterly: "$54", annual: "$216", annualDisplay: "$216/year", save: null },
      },
      bestFor: "Growing businesses requiring API, automation, advanced CRM, analytics and integrations.",
      cta: "Get Started",
      popular: true,
      includes: [
        "Everything in Basic",
        "Scheduled Bulk Messages",
        "Advanced Campaign Management",
        "Campaign API",
        "Contact API",
        "REST API",
        "API Messaging",
        "240 API Calls/minute",
        "Add Contacts via API",
        "Contact Export",
        "Auto Agent Assignment",
        "Round-Robin Agent Assignment",
        "Smart Retargeting",
        "Customer Segmentation",
        "Advanced Chatbot",
        "Ask Customer Questions",
        "Save Customer Responses",
        "Multiple Actions on Buttons",
        "Chatbot Agent Assignment",
        "Marketing Opt-in/Opt-out",
        "Update Custom Fields",
        "Payment Integration",
        "Google Sheets Integration",
        "Advanced Analytics",
        "Contact Reports",
        "Campaign Reports",
        "Manual Retry",
        "Advanced CRM",
        "Template Setup Assistance",
        "Campaign Setup Assistance",
        "CRM Setup Assistance",
        "1-Hour Training",
      ],
    },
    {
      id: "professional",
      name: "PROFESSIONAL",
      icon: "💼",
      badge: "High Scale",
      badgeColor: "#7C3AED",
      badgeBg: "#EDE9FE",
      prices: {
        INR: { monthly: "₹2,500", quarterly: "₹7,500", annual: "₹30,000", annualDisplay: "₹30,000/year", save: null },
        USD: { monthly: "$35", quarterly: "$105", annual: "$420", annualDisplay: "$420/year", save: null },
      },
      bestFor: "Established businesses requiring advanced automation, APIs, integrations, webhooks and larger teams.",
      cta: "Get Started",
      popular: false,
      includes: [
        "Everything in Growth",
        "Advanced Chatbot Builder",
        "Up to 10 Chatbot Nodes",
        "Recurring Campaigns",
        "Advanced Campaign Automation",
        "Smart Auto Retry",
        "Marketing Delivery Optimization",
        "Number Masking",
        "Webhooks",
        "600 API Calls/minute",
        "Up to 5 App Integrations",
        "Up to 10 Agents",
        "Advanced Workflow Automation",
        "Multi-Step Automation",
        "Advanced Agent Assignment",
        "Higher Usage Limits",
        "Extended Backup",
        "Advanced Analytics",
        "Advanced Reporting",
        "CRM Integration",
        "Payment Integration",
        "Google Sheets Integration",
        "Custom API Integration",
        "Contact & CRM Setup",
        "Facebook Business Verification Assistance",
        "Professional Onboarding",
        "Priority Support",
      ],
    },
    {
      id: "corporate",
      name: "CORPORATE",
      icon: "🏢",
      badge: "Enterprise",
      badgeColor: "#111827",
      badgeBg: "#F1F5F9",
      prices: {
        INR: { monthly: "Custom", quarterly: "Custom", annual: "Custom", annualDisplay: "Custom Pricing", save: null },
        USD: { monthly: "Custom", quarterly: "Custom", annual: "Custom", annualDisplay: "Custom Pricing", save: null },
      },
      bestFor: "Large organizations and enterprises requiring customized infrastructure, integrations and dedicated support.",
      cta: "Contact Sales",
      popular: false,
      includes: [
        "Everything in Professional",
        "Custom Usage Limits",
        "Multiple WhatsApp Numbers",
        "Custom Number of Agents",
        "Enterprise Team Management",
        "Custom Roles & Permissions",
        "Department Management",
        "Advanced Access Control",
        "Enterprise API",
        "Custom API Limits",
        "Advanced Webhooks",
        "CRM Integration",
        "ERP Integration",
        "Custom Software Integration",
        "Custom Automation",
        "Custom Chatbot",
        "AI Automation",
        "Lead Routing",
        "Custom Business Rules",
        "Custom Triggers",
        "Custom Reports",
        "Custom Dashboards",
        "Advanced Business Analytics",
        "Dedicated Account Manager",
        "Priority Support",
        "Dedicated Onboarding",
        "Custom Training",
        "Migration Assistance",
        "Enterprise Implementation",
        "Custom Data Management",
      ],
    },
  ];

  /* ── 6. PLAN COMPARISON Feature Matrix ── */
  const comparisonRows = [
    { feature: "WhatsApp API", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Team Inbox", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Multi-Agent Chat", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Private Notes", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "CRM", free: "Basic", basic: "✓", growth: "Advanced", pro: "Advanced", corp: "Enterprise" },
    { feature: "Contact Import", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Labels", free: "Limited", basic: "✓", growth: "Advanced", pro: "Higher", corp: "Custom" },
    { feature: "Custom Fields", free: "Limited", basic: "✓", growth: "Advanced", pro: "Higher", corp: "Custom" },
    { feature: "Quick Replies", free: "Limited", basic: "✓", growth: "Advanced", pro: "Higher", corp: "Custom" },
    { feature: "Bulk Campaign", free: "Limited", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Campaign Scheduling", free: "—", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Campaign Analytics", free: "✓", basic: "✓", growth: "Advanced", pro: "Advanced", corp: "Enterprise" },
    { feature: "Template Management", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Basic Automation", free: "✓", basic: "✓", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Chatbot", free: "Basic", basic: "✓", growth: "Advanced", pro: "Advanced", corp: "Enterprise" },
    { feature: "Advanced Chatbot", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Agent Assignment", free: "—", basic: "Basic", growth: "Advanced", pro: "Advanced", corp: "Enterprise" },
    { feature: "Round-Robin Assignment", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "API Messaging", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Contact API", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Campaign API", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "REST API", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Webhook", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Payment Integration", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Google Sheets", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "CRM Integration", free: "—", basic: "Basic", growth: "✓", pro: "✓", corp: "Custom" },
    { feature: "Recurring Campaign", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Smart Auto Retry", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Number Masking", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Multiple Integrations", free: "—", basic: "Limited", growth: "✓", pro: "Up to 5", corp: "Custom" },
    { feature: "Multiple WhatsApp Numbers", free: "—", basic: "Limited", growth: "✓", pro: "✓", corp: "Custom" },
    { feature: "Agent Management", free: "Basic", basic: "✓", growth: "✓", pro: "Up to 10", corp: "Custom" },
    { feature: "Advanced Analytics", free: "—", basic: "—", growth: "✓", pro: "✓", corp: "✓" },
    { feature: "Custom Reports", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Dedicated Support", free: "—", basic: "—", growth: "—", pro: "✓", corp: "✓" },
    { feature: "Dedicated Account Manager", free: "—", basic: "—", growth: "—", pro: "—", corp: "✓" },
    { feature: "Custom Integration", free: "—", basic: "—", growth: "—", pro: "Limited", corp: "✓" },
  ];

  /* ── Plan Positioning Data ── */
  const positioningData = [
    { tier: "FREE", target: "Try & Test", desc: "Test core features, setup your profile, and experience the MessBee platform.", color: "#059669", bg: "#D1FAE5" },
    { tier: "BASIC", target: "WhatsApp + CRM + Campaigns", desc: "Designed for small businesses ready to launch WhatsApp campaigns & CRM.", color: "#0284C7", bg: "#E0F2FE" },
    { tier: "GROWTH", target: "Automation + API + Analytics + Integrations", desc: "Ideal for growing teams scaling with APIs, bots, payments & Google Sheets.", color: "#16A34A", bg: "#DCFCE7" },
    { tier: "PROFESSIONAL", target: "Advanced Automation + Webhooks + Higher Usage", desc: "Engineered for established companies requiring webhooks & multi-step automation.", color: "#7C3AED", bg: "#EDE9FE" },
    { tier: "CORPORATE", target: "Enterprise + Custom Implementation", desc: "Custom limits, ERP connections, dedicated managers, and on-premise solutions.", color: "#111827", bg: "#F1F5F9" },
  ];

  /* ── Pricing Summary Table Data (Flat pricing across cycles) ── */
  const summaryTableData = [
    { plan: "Free", monthlyINR: "₹0", quarterlyINR: "₹0", annualINR: "₹0", monthlyUSD: "$0", quarterlyUSD: "$0", annualUSD: "$0" },
    { plan: "Basic", monthlyINR: "₹899", quarterlyINR: "₹2,697", annualINR: "₹10,788", monthlyUSD: "$12", quarterlyUSD: "$36", annualUSD: "$144" },
    { plan: "Growth", monthlyINR: "₹1,299", quarterlyINR: "₹3,897", annualINR: "₹15,588", monthlyUSD: "$18", quarterlyUSD: "$54", annualUSD: "$216" },
    { plan: "Professional", monthlyINR: "₹2,500", quarterlyINR: "₹7,500", annualINR: "₹30,000", monthlyUSD: "$35", quarterlyUSD: "$105", annualUSD: "$420" },
    { plan: "Corporate", monthlyINR: "Custom", quarterlyINR: "Custom", annualINR: "Custom", monthlyUSD: "Custom", quarterlyUSD: "Custom", annualUSD: "Custom" },
  ];

  /* ── Annual Price Calculations Data (Exact multiplication, no discount) ── */
  const annualCalculations = [
    {
      name: "Basic",
      monthlyINR: "₹899/month",
      quarterlyINR: "₹899 × 3 = ₹2,697/quarter",
      annualINR: "₹899 × 12 = ₹10,788/year",
      monthlyUSD: "$12/month",
      quarterlyUSD: "$12 × 3 = $36/quarter",
      annualUSD: "$12 × 12 = $144/year",
      color: "#0284C7",
      bg: "#F0F9FF",
      border: "#BAE6FD",
    },
    {
      name: "Growth",
      monthlyINR: "₹1,299/month",
      quarterlyINR: "₹1,299 × 3 = ₹3,897/quarter",
      annualINR: "₹1,299 × 12 = ₹15,588/year",
      monthlyUSD: "$18/month",
      quarterlyUSD: "$18 × 3 = $54/quarter",
      annualUSD: "$18 × 12 = $216/year",
      color: "#16A34A",
      bg: "#F0FDF4",
      border: "#BBF7D0",
    },
    {
      name: "Professional",
      monthlyINR: "₹2,500/month",
      quarterlyINR: "₹2,500 × 3 = ₹7,500/quarter",
      annualINR: "₹2,500 × 12 = ₹30,000/year",
      monthlyUSD: "$35/month",
      quarterlyUSD: "$35 × 3 = $105/quarter",
      annualUSD: "$35 × 12 = $420/year",
      color: "#7C3AED",
      bg: "#FAF5FF",
      border: "#DDD6FE",
    },
  ];

  const handleAction = () => {
    window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#0F172A", background: "#FFFFFF", overflowX: "hidden", minHeight: "100vh" }}>
      <Navbar />

      {/* Embedded CSS for styling matching Resources/Solutions & responsive across all small, medium, and large laptops */}
      <style>{`
        .pricing-hero-row {
          display: flex;
          align-items: center;
          gap: 44px;
        }

        /* ── Exact Reference Pricing Card Styling (AiSensy SaaS Layout - Compact) ── */
        .reference-pricing-card {
          background: #FFFFFF;
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          padding: 16px 14px 14px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.22s ease-in-out;
          box-sizing: border-box;
          width: 100%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .reference-pricing-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.05);
          border-color: #D1D5DB;
        }
        .reference-pricing-card.popular-card {
          border: 2px solid #00C365;
          box-shadow: 0 6px 20px rgba(0, 195, 101, 0.1);
        }
        .reference-pricing-card.popular-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 195, 101, 0.16);
        }

        .popular-top-ribbon {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #00C365;
          color: #FFFFFF;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 2.5px 12px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 6px rgba(0, 195, 101, 0.3);
          white-space: nowrap;
          z-index: 3;
        }

        .compact-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Large Laptops & Desktops (1440px+) ── */
        @media (min-width: 1440px) {
          .pricing-hero-row { gap: 56px; }
          .compact-grid { gap: 12px; }
          .reference-pricing-card { padding: 18px 14px 16px; }
        }

        /* ── Medium & Small Laptops (1024px - 1439px) ── */
        @media (max-width: 1439px) and (min-width: 1024px) {
          .pricing-hero-row { gap: 28px; }
          .compact-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
          }
          .reference-pricing-card {
            padding: 14px 8px 12px;
          }
        }

        /* ── Tablets (640px - 1023px) ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .pricing-hero-row {
            flex-direction: column !important;
            gap: 32px;
          }
          .compact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            max-width: 680px;
            margin: 0 auto;
          }
          .compact-grid > :nth-child(5):last-child {
            grid-column: span 2;
            max-width: 340px;
            margin: 0 auto;
            width: 100%;
          }
        }

        /* ── Mobile Devices (< 640px) ── */
        @media (max-width: 639px) {
          .pricing-hero-row {
            flex-direction: column !important;
            gap: 24px;
          }
          .compact-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            max-width: 100%;
            margin: 0 auto;
          }
        }

        /* Reference CTA Button (Top Positioned) */
        .btn-card-cta-top {
          width: 100%;
          border-radius: 6px;
          padding: 9px 0;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.18s ease;
          border: none;
          background: #00C365;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          margin-bottom: 14px;
          box-shadow: 0 2px 6px rgba(0, 195, 101, 0.2);
        }
        .btn-card-cta-top:hover {
          background: #00A855;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 195, 101, 0.3);
        }

        .toggle-btn-small {
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .toggle-btn-small.active {
          background: #16A34A;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.25);
        }
        .toggle-btn-small.inactive {
          color: #64748B;
        }
        .toggle-btn-small.inactive:hover {
          color: #0F172A;
        }

        .hero-btn-primary {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          padding: 11px 22px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
        }
        .hero-btn-primary:hover {
          background: linear-gradient(135deg, #15803D 0%, #166534 100%);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .hero-btn-secondary {
          background: #FFFFFF;
          color: #16A34A;
          border: 1px solid #BBF7D0;
          border-radius: 10px;
          padding: 11px 22px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .hero-btn-secondary:hover {
          background: #F0FDF4;
          border-color: #16A34A;
          transform: translateY(-1.5px);
        }

        /* ── Compact Comparison Table Scrollbar & Styling ── */
        .comparison-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 12px;
          border: 1.5px solid #E2E8F0;
          background: #FFFFFF;
          box-shadow: 0 1px 4px rgba(0,0,0,0.02);
        }
        .comparison-table-wrapper table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }
        .comparison-table-wrapper th {
          padding: 8px 10px;
          font-size: 11.5px;
          font-weight: 800;
          text-align: center;
          border-bottom: 1.5px solid #E2E8F0;
        }
        .comparison-table-wrapper td {
          padding: 6.5px 10px;
          font-size: 11.5px;
          text-align: center;
          border-bottom: 1px solid #F1F5F9;
          line-height: 1.35;
        }
        .comparison-table-wrapper th:first-child,
        .comparison-table-wrapper td:first-child {
          text-align: left;
          font-weight: 600;
          color: #1E293B;
          padding-left: 14px;
          position: sticky;
          left: 0;
          background: inherit;
          z-index: 2;
        }

        /* ── Typography & Paragraph scaling for all laptops ── */
        .hero-title-text {
          font-size: clamp(24px, 2.8vw, 40px);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.25;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }

        .hero-subtitle-text {
          font-size: clamp(14.5px, 1.2vw, 16.5px);
          font-weight: 800;
          color: #16A34A;
          line-height: 1.45;
          margin-bottom: 14px;
          letter-spacing: -0.2px;
        }

        .hero-desc-text {
          font-size: clamp(13px, 1.05vw, 14.5px);
          color: #475569;
          line-height: 1.75;
          margin-bottom: 14px;
          max-width: 580px;
        }

        .hero-punchline-text {
          font-size: clamp(13.5px, 1.1vw, 15.5px);
          font-weight: 900;
          color: #15803D;
          line-height: 1.5;
          margin-bottom: 24px;
          letter-spacing: -0.3px;
        }

        .card-plan-title {
          font-size: clamp(16px, 1.3vw, 18px);
          font-weight: 800;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: -0.3px;
          margin-bottom: 8px;
        }

        .card-price-main {
          font-size: clamp(20px, 1.8vw, 26px);
          font-weight: 900;
          color: #111827;
          letter-spacing: -0.6px;
          line-height: 1.1;
        }

        .card-price-period {
          font-size: 11.5px;
          color: #6B7280;
          font-weight: 500;
        }

        .card-billing-caption {
          font-size: 10.5px;
          color: #9CA3AF;
          margin-top: 2px;
          font-weight: 500;
        }

        .card-feature-li {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          font-size: 11.5px;
          color: #374151;
          line-height: 1.35;
        }

        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        .pulse-aura {
          animation: auraPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 0: 2-COLUMN HERO (Matching Resources & Solutions Layout)
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          marginTop: 70,
          padding: "56px 6% 60px",
          minHeight: "calc(88vh - 70px)",
          display: "flex",
          alignItems: "center",
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

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div className="pricing-hero-row" style={{ alignItems: "center" }}>
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
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  border: "1px solid #A7F3D0",
                }}
              >
                Pricing &amp; Plans
              </div>

              {/* H1 Heading with comfortable line-height */}
              <h1 className="hero-title-text">
                Predictable &amp; Transparent Pricing for <span style={{ color: "#16A34A" }}>Growing Businesses</span>
              </h1>

              <p className="hero-subtitle-text">
                Simple, High-Value Plans Designed to Scale with Your Growth
              </p>

              <p className="hero-desc-text">
                Choosing the right platform should be simple and transparent. MessBee provides predictable, feature-packed pricing designed for startups, growing teams and established businesses.
              </p>

              <p className="hero-desc-text">
                Start with essential tools for WhatsApp messaging and CRM, or unlock advanced workflow automations, APIs, and multi-agent collaboration as your business expands.
              </p>

              <div className="hero-punchline-text">
                Transparent Pricing. Zero Hidden Fees. Cancel Anytime.
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
                <button className="hero-btn-primary" onClick={scrollToPricing}>
                  Explore Pricing Plans
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </button>
                <button className="hero-btn-secondary" onClick={() => navigate("/contact")}>
                  Talk to Sales
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: "clamp(11.5px, 0.9vw, 12.5px)", color: "#64748B", fontWeight: 600, lineHeight: 1.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckIcon size={14} color="#16A34A" /> No Credit Card Required
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckIcon size={14} color="#16A34A" /> Flexible Billing Options
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckIcon size={14} color="#16A34A" /> GST Invoice Available
                </span>
              </div>
            </div>

            {/* Right Column: Hero Graphic Box with Dark Forest Green Gradient (Matching Resources & Solutions) */}
            <div style={{ flex: 0.85, minWidth: 260, maxWidth: "100%", width: "100%", position: "relative" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
                  borderRadius: 22,
                  padding: "26px 20px",
                  boxShadow: "0 18px 45px rgba(2, 44, 34, 0.38)",
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 2 }}>
                      <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#FFFFFF" }}>MessBee Pricing Engine</div>
                      <div style={{ fontSize: 10, color: "#4ADE80", fontWeight: 700 }}>High Value &amp; Scalability</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, background: "rgba(52,211,153,0.2)", color: "#34D399", padding: "2.5px 9px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(52,211,153,0.3)" }}>
                    Verified ROI
                  </span>
                </div>

                {/* Pricing Showcase Nodes Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    { label: "Free Plan", price: "₹0/mo", note: "Try & Test", icon: "🚀" },
                    { label: "Basic Plan", price: "₹899/mo", note: "WhatsApp + CRM", icon: "⚡" },
                    { label: "Growth Plan", price: "₹1,299/mo", note: "API & Auto", icon: "📈" },
                    { label: "Professional", price: "₹2,500/mo", note: "Scale & Webhooks", icon: "💼" },
                  ].map((node, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(52,211,153,0.2)",
                        borderRadius: 10,
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14 }}>{node.icon}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 900, color: "#4ADE80" }}>{node.price}</span>
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: "#FFFFFF" }}>{node.label}</span>
                      <span style={{ fontSize: 9.5, color: "#94A3B8", fontWeight: 600 }}>{node.note}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom value line */}
                <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, padding: 9, textAlign: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#4ADE80" }}>
                    Predictable Pricing. Instant ROI. Scale On Your Terms.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: PLAN & PRICING (Exact Reference Card Design - Compact)
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="plan-cards-section" style={{
        padding: "28px 2.5% 44px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F5F9",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: 1420, margin: "0 auto", width: "100%" }}>
          
          {/* Section Heading & Interactive Controls */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Pill>PLAN &amp; PRICING</Pill>
            <h2 style={{
              fontSize: "clamp(20px, 2.4vw, 30px)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "-0.8px",
              marginBottom: 10,
            }}>
              Choose the Plan That Fits Your Growth
            </h2>

            {/* Currency & Billing Switchers Container */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
            }}>
              {/* Currency Selector */}
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 30,
                padding: 3,
                display: "inline-flex",
                alignItems: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
              }}>
                <button
                  className={`toggle-btn-small ${currency === "INR" ? "active" : "inactive"}`}
                  onClick={() => setCurrency("INR")}
                >
                  INR (₹)
                </button>
                <button
                  className={`toggle-btn-small ${currency === "USD" ? "active" : "inactive"}`}
                  onClick={() => setCurrency("USD")}
                >
                  USD ($)
                </button>
              </div>

              {/* Billing Cycle Selector (No off tags) */}
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 30,
                padding: 3,
                display: "inline-flex",
                alignItems: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
              }}>
                <button
                  className={`toggle-btn-small ${billingCycle === "monthly" ? "active" : "inactive"}`}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`toggle-btn-small ${billingCycle === "quarterly" ? "active" : "inactive"}`}
                  onClick={() => setBillingCycle("quarterly")}
                >
                  Quarterly
                </button>
                <button
                  className={`toggle-btn-small ${billingCycle === "annual" ? "active" : "inactive"}`}
                  onClick={() => setBillingCycle("annual")}
                >
                  Yearly / Annual
                </button>
              </div>
            </div>
          </div>

          {/* 5 Compact Reference Style Pricing Cards */}
          <div className="compact-grid">
            {plansData.map((plan) => {
              const isExpanded = !!expandedCards[plan.id];
              const visibleFeatures = isExpanded ? plan.includes : plan.includes.slice(0, 8);
              const p = plan.prices[currency];

              const priceVal = billingCycle === "quarterly" && p.quarterly !== "Custom"
                ? p.quarterly
                : billingCycle === "annual" && p.annual !== "Custom"
                ? p.annual
                : p.monthly;

              const periodLabel = p.monthly === "Custom"
                ? ""
                : plan.id === "free"
                ? "Forever"
                : billingCycle === "quarterly"
                ? "/ month (quarterly)"
                : billingCycle === "annual"
                ? "/ month (annual)"
                : "/ month";

              const billingCaption = plan.id === "free"
                ? "No card required"
                : plan.id === "corporate"
                ? "Custom billing cycle"
                : billingCycle === "quarterly"
                ? `Billed quarterly (${currency === "INR" ? "₹" : "$"}${p.quarterly.replace(/[^\d]/g, "")})`
                : billingCycle === "annual"
                ? `Billed annually (${currency === "INR" ? "₹" : "$"}${p.annual.replace(/[^\d]/g, "")})`
                : "Billed monthly";

              return (
                <div
                  key={plan.id}
                  className={`reference-pricing-card ${plan.popular ? "popular-card" : ""}`}
                >
                  {/* Top Popular Ribbon (Growth) */}
                  {plan.popular && (
                    <div className="popular-top-ribbon">
                      <span>★ MOST POPULAR</span>
                    </div>
                  )}

                  {/* 1. Plan Title with (i) icon */}
                  <div className="card-plan-title">
                    <span>{plan.name === "FREE" ? "Free Forever" : plan.name.charAt(0) + plan.name.slice(1).toLowerCase()}</span>
                    <span style={{ fontSize: 12, color: "#9CA3AF", cursor: "help", fontWeight: 400 }} title={`Details for ${plan.name}`}>ⓘ</span>
                  </div>

                  {/* 2. Price Display */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                      <span className="card-price-main">
                        {priceVal}
                      </span>
                      {periodLabel && (
                        <span className="card-price-period">
                          {periodLabel}
                        </span>
                      )}
                    </div>
                    <div className="card-billing-caption">
                      {billingCaption}
                    </div>
                  </div>

                  {/* 3. CTA Button (Labeled "Start Now" & redirects all to signup) */}
                  <button
                    className="btn-card-cta-top"
                    onClick={() => {
                      if (plan.id === "corporate") navigate("/contact");
                      else handleAction();
                    }}
                  >
                    {plan.id === "corporate" ? "Contact Sales" : "Start Now"}
                  </button>

                  {/* 4. Features Section Divider */}
                  <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 12, flex: 1, display: "flex", flexDirection: "column" }}>
                    
                    {/* Subheading e.g. "WHAT YOU GET" or "FEATURES" */}
                    <div style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      marginBottom: 10,
                    }}>
                      {plan.id === "free" ? "WHAT YOU GET" : "FEATURES"}
                    </div>

                    {/* Features List */}
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      flex: 1,
                    }}>
                      {visibleFeatures.map((item, idx) => {
                        const isLeadingHeader = item.startsWith("Everything in");
                        return (
                          <li key={idx} className="card-feature-li">
                            <span style={{ color: "#00C365", fontWeight: 900, fontSize: 12, lineHeight: 1, flexShrink: 0, marginTop: 1.5 }}>
                              ✓
                            </span>
                            <span style={{
                              fontWeight: isLeadingHeader ? 800 : 500,
                              color: isLeadingHeader ? "#111827" : "#374151",
                            }}>
                              {isLeadingHeader ? item.replace("Everything in ", "All ") + " features, plus:" : item}
                            </span>
                            {/* subtle info icon */}
                            <span style={{ fontSize: 10, color: "#D1D5DB", marginLeft: "auto", flexShrink: 0 }}>ⓘ</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Expand / Collapse Features Toggle */}
                    {plan.includes.length > 8 && (
                      <div style={{ marginTop: "auto", paddingTop: 10 }}>
                        <button
                          onClick={() => toggleExpand(plan.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#00C365",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "pointer",
                            padding: 0,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          {isExpanded ? "▲ Show Less" : `▼ +${plan.includes.length - 8} More Features`}
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: PRICING SUMMARY
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "48px 6%", background: "#FFFFFF", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Pill>SUMMARY</Pill>
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.8px" }}>
              PRICING SUMMARY
            </h2>
          </div>

          <div style={{
            background: "#FFFFFF",
            borderRadius: 14,
            border: "1.5px solid #E2E8F0",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
              background: "#F8FAFC",
              borderBottom: "1.5px solid #E2E8F0",
              padding: "12px 20px",
              fontWeight: 800,
              fontSize: 12.5,
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              <div>Plan</div>
              <div>Monthly</div>
              <div>Quarterly (3 Mo)</div>
              <div>Annual (12 Mo)</div>
            </div>

            {summaryTableData.map((row, idx) => {
              const isEven = idx % 2 === 0;
              const monthly = currency === "INR" ? row.monthlyINR : row.monthlyUSD;
              const quarterly = currency === "INR" ? row.quarterlyINR : row.quarterlyUSD;
              const annual = currency === "INR" ? row.annualINR : row.annualUSD;

              return (
                <div
                  key={row.plan}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                    padding: "13px 20px",
                    background: isEven ? "#FFFFFF" : "#FAFAFA",
                    borderBottom: idx < summaryTableData.length - 1 ? "1px solid #F1F5F9" : "none",
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{row.plan}</div>
                  <div style={{ fontWeight: 600, color: "#334155" }}>{monthly}</div>
                  <div style={{ fontWeight: 600, color: "#334155" }}>{quarterly}</div>
                  <div style={{ fontWeight: 700, color: "#16A34A" }}>{annual}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: ANNUAL PRICE CALCULATION
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "48px 6%", background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Pill>TRANSPARENT BILLING</Pill>
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.8px" }}>
              ANNUAL PRICE CALCULATION
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {annualCalculations.map((calc) => {
              const monthly = currency === "INR" ? calc.monthlyINR : calc.monthlyUSD;
              const quarterly = currency === "INR" ? calc.quarterlyINR : calc.quarterlyUSD;
              const annual = currency === "INR" ? calc.annualINR : calc.annualUSD;

              return (
                <div
                  key={calc.name}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${calc.border}`,
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{
                    display: "inline-block",
                    background: calc.bg,
                    color: calc.color,
                    fontSize: 11.5,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 12,
                    marginBottom: 12,
                  }}>
                    {calc.name}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#334155" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B" }}>Monthly Rate:</span>
                      <span style={{ fontWeight: 700 }}>{monthly}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9", paddingBottom: 6 }}>
                      <span style={{ color: "#64748B" }}>Quarterly (3 Mo):</span>
                      <span style={{ fontWeight: 700 }}>{quarterly.split("=")[1]?.trim() || quarterly}</span>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: calc.bg,
                      borderRadius: 8,
                      padding: "10px 12px",
                      marginTop: 2,
                    }}>
                      <span style={{ fontWeight: 800, color: "#0F172A" }}>Annual (12 Mo):</span>
                      <span style={{ fontWeight: 900, color: calc.color, fontSize: 14.5 }}>{annual.split("=")[1]?.trim() || annual}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: IMPORTANT NOTICE
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 6%", background: "#FFFFFF", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            background: "#FFFBEB",
            border: "1.5px solid #FDE68A",
            borderRadius: 16,
            padding: "22px 26px",
            boxShadow: "0 2px 10px rgba(245, 158, 11, 0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#FDE68A",
                color: "#92400E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
              }}>
                ℹ️
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: "#92400E", letterSpacing: "-0.4px" }}>
                IMPORTANT
              </h3>
            </div>

            <p style={{ fontSize: 13, color: "#78350F", lineHeight: 1.5, marginBottom: 10, fontWeight: 600 }}>
              WhatsApp/Meta messaging charges are separate from the platform subscription.
            </p>

            <div style={{ fontSize: 12, color: "#92400E", marginBottom: 6, fontWeight: 700 }}>
              Final customer cost may include:
            </div>

            <div style={{
              background: "#FFFFFF",
              border: "1px solid #FCD34D",
              borderRadius: 10,
              padding: "11px 14px",
              fontSize: 12.5,
              fontWeight: 700,
              color: "#B45309",
              lineHeight: 1.5,
            }}>
              Platform Subscription + WhatsApp/Meta Messaging Charges + Optional Add-ons + Setup/Integration Charges
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: PLAN POSITIONING
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "48px 6%", background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Pill>TIER ARCHITECTURE</Pill>
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.8px" }}>
              PLAN POSITIONING
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}>
            {positioningData.map((item, idx) => (
              <div
                key={item.tier}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 14,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: item.color,
                      background: item.bg,
                      padding: "3px 10px",
                      borderRadius: 10,
                    }}>
                      {item.tier}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8" }}>
                      0{idx + 1}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", lineHeight: 1.35, marginBottom: 8 }}>
                    → {item.target}
                  </div>

                  <p style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.45 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: 6. PLAN COMPARISON (37 Feature Matrix - Compact & Sleek)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "36px 6% 40px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Pill>DETAILED BREAKDOWN</Pill>
            <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.6px" }}>
              6. PLAN COMPARISON
            </h2>
            <p style={{ fontSize: 12, color: "#64748B", maxWidth: 500, margin: "6px auto 0" }}>
              Compare all features across Free, Basic, Growth, Professional, and Corporate tiers.
            </p>
          </div>

          {/* Compact Comparison Table */}
          <div className="comparison-table-wrapper">
            <table>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  <th style={{ width: "28%", fontSize: 11.5, fontWeight: 800, color: "#0F172A" }}>Feature</th>
                  <th style={{ width: "14.4%", fontSize: 11.5, fontWeight: 800, color: "#059669" }}>Free</th>
                  <th style={{ width: "14.4%", fontSize: 11.5, fontWeight: 800, color: "#0284C7" }}>Basic</th>
                  <th style={{ width: "14.4%", fontSize: 11.5, fontWeight: 800, color: "#16A34A", background: "#F0FDF4" }}>Growth (Popular)</th>
                  <th style={{ width: "14.4%", fontSize: 11.5, fontWeight: 800, color: "#7C3AED" }}>Professional</th>
                  <th style={{ width: "14.4%", fontSize: 11.5, fontWeight: 800, color: "#111827" }}>Corporate</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => {
                  const isEven = idx % 2 === 0;
                  const rowBg = isEven ? "#FFFFFF" : "#FAFAFA";

                  const renderCell = (val, isGrowth = false) => {
                    if (val === "✓") return <CheckIcon size={12} color="#16A34A" />;
                    if (val === "—") return <DashIcon />;
                    return (
                      <span style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: isGrowth ? "#15803D" : "#334155",
                      }}>
                        {val}
                      </span>
                    );
                  };

                  return (
                    <tr key={row.feature} style={{ background: rowBg }}>
                      <td style={{ background: rowBg, fontWeight: 600, color: "#1E293B" }}>
                        {row.feature}
                      </td>
                      <td>{renderCell(row.free)}</td>
                      <td>{renderCell(row.basic)}</td>
                      <td style={{ background: isEven ? "#F4FCF7" : "#EDF9F1" }}>
                        {renderCell(row.growth, true)}
                      </td>
                      <td>{renderCell(row.pro)}</td>
                      <td>{renderCell(row.corp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Compact Bottom Action Card */}
          <div style={{
            marginTop: 28,
            background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
            borderRadius: 16,
            padding: "20px 24px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            boxShadow: "0 10px 28px rgba(2, 44, 34, 0.25)",
            border: "1px solid rgba(52, 211, 153, 0.25)",
          }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(52,211,153,0.2)", color: "#4ADE80", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 800, marginBottom: 6 }}>
                READY TO SCALE?
              </div>
              <h3 style={{ fontSize: "clamp(16px, 1.8vw, 20px)", fontWeight: 900, marginBottom: 4, letterSpacing: "-0.3px" }}>
                Start with MessBee Today
              </h3>
              <p style={{ fontSize: 12, color: "#A7F3D0", maxWidth: 440, lineHeight: 1.45, margin: 0 }}>
                Join thousands of businesses streamlining WhatsApp marketing, CRM, automated workflows, and customer communication.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="btn-card-cta-primary"
                style={{
                  borderRadius: 20,
                  padding: "9px 18px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={handleAction}
              >
                Start Free Trial
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 20,
                  padding: "9px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
                onClick={() => navigate("/contact")}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                Talk to Sales
              </button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
