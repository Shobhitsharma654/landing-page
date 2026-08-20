import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const G = "#16A34A";
const GL = "#F0FDF4";
const GB = "#BBF7D0";
const D2 = "#111827";
const MU = "#64748B";

/* ── FAQ Accordion Item Component ── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: open ? "1.5px solid #CBD5E1" : "1.5px solid #E2E8F0",
        borderRadius: "14px",
        marginBottom: "10px",
        background: "#FFFFFF",
        boxShadow: open ? "0 4px 12px rgba(0, 0, 0, 0.03)" : "0 2px 6px rgba(0, 0, 0, 0.01)",
        transition: "all 0.25s ease-in-out",
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: open ? "14px 20px 8px 20px" : "16px 20px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 14.5, fontWeight: 700, color: open ? G : D2, transition: "color 0.2s", paddingRight: "12px" }}>
          {q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: open ? "#F0FDF4" : "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
            color: open ? G : MU,
            border: open ? `1px solid ${GB}` : "1.5px solid #E2E8F0",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
          padding: open ? "0px 20px 14px 20px" : "0px 20px",
        }}
      >
        <div style={{ fontSize: 13.5, color: D2, lineHeight: 1.6, borderTop: open ? "1px solid #F1F5F9" : "none", paddingTop: open ? "8px" : "0px" }}>
          {a}
        </div>
      </div>
    </div>
  );
};

const ContactUsPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    orgName: "",
    email: "",
    phone: "",
    interest: "General Enquiry",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact MessBee | Sales, Support & Business Enquiries";
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Contact MessBee for product information, sales enquiries, customer support, partnerships and business solutions for CRM, marketing, automation and digital commerce.");
  }, []);

  const handleScrollToForm = (interestOption) => {
    if (interestOption) {
      setForm((prev) => ({ ...prev, interest: interestOption }));
    }
    document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `[Enquiry: ${form.interest}] Org: ${form.orgName || "N/A"}`,
          message: `Phone: ${form.phone || "N/A"}\n\n${form.message}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", orgName: "", email: "", phone: "", interest: "General Enquiry", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── GLOBAL SECTION RESPONSIVENESS ── */
        .contact-section {
          padding: 50px 6% !important;
          transition: padding 0.3s ease;
        }

        /* ── BUTTONS ── */
        .contact-btn-primary {
          background: linear-gradient(135deg, #16A34A 0%, #10B981 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 40px;
          padding: 12px 28px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(22, 163, 74, 0.25);
          user-select: none;
          text-decoration: none;
        }
        .contact-btn-primary:hover {
          background: linear-gradient(135deg, #15803D 0%, #059669 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(22, 163, 74, 0.35);
        }

        .contact-btn-secondary {
          background: #FFFFFF;
          color: #0F172A;
          border: 1.5px solid #E2E8F0;
          border-radius: 40px;
          padding: 11px 24px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.02);
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
          padding: 12px 15px;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          font-size: 14px;
          color: #0F172A;
          outline: none;
          background: #F8FAFC;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease-in-out;
        }
        .contact-input:hover {
          border-color: #CBD5E1;
        }
        .contact-input:focus {
          background: #FFFFFF;
          border-color: #16A34A;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.08);
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
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: fadeInUp 0.5s ease-out both;
        }
        .contact-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(22, 163, 74, 0.06), 0 4px 12px rgba(0, 0, 0, 0.01);
          border-color: #BBF7D0 !important;
        }

        /* ── CATEGORY GLASS CARDS RESPONSIVENESS ── */
        .category-card {
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .category-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          flex-shrink: 0;
        }
        .category-card-title {
          font-size: 16.5px;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .category-card-desc {
          font-size: 13.5px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .category-card-footer {
          border-top: 1.5px solid #F1F5F9;
          padding-top: 14px;
          font-size: 13.5px;
          font-weight: 700;
        }

        @media (max-width: 1366px) {
          .category-card {
            padding: 22px !important;
          }
          .category-card-icon {
            width: 38px !important;
            height: 38px !important;
            margin-bottom: 14px !important;
          }
          .category-card-icon svg {
            width: 18px !important;
            height: 18px !important;
          }
          .category-card-title {
            font-size: 15px !important;
            margin-bottom: 8px !important;
          }
          .category-card-desc {
            font-size: 13px !important;
            margin-bottom: 14px !important;
          }
          .category-card-footer {
            padding-top: 12px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 1299px) {
          .category-card {
            padding: 18px 16px !important;
          }
          .category-card-icon {
            width: 36px !important;
            height: 36px !important;
            border-radius: 10px !important;
            margin-bottom: 12px !important;
          }
          .category-card-icon svg {
            width: 16px !important;
            height: 16px !important;
          }
          .category-card-title {
            font-size: 14px !important;
            margin-bottom: 6px !important;
          }
          .category-card-desc {
            font-size: 12.5px !important;
            margin-bottom: 12px !important;
            line-height: 1.5 !important;
          }
          .category-card-footer {
            padding-top: 10px !important;
            font-size: 12.5px !important;
          }
        }

        @media (max-width: 768px) {
          .category-card {
            padding: 16px 14px !important;
          }
          .category-card-icon {
            width: 34px !important;
            height: 34px !important;
            margin-bottom: 10px !important;
          }
          .category-card-title {
            font-size: 13.5px !important;
          }
          .category-card-desc {
            font-size: 12px !important;
          }
        }

        /* ── RESPONSIVE GRID & LAYOUT ── */
        .contact-hero-row {
          display: flex;
          align-items: stretch;
          gap: 48px;
        }
        .contact-hero-left {
          flex: 1.2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-hero-right {
          flex: 0.8;
          min-width: 0;
          position: relative;
          display: flex;
          align-items: center;
        }

        .grid-col-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .grid-col-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .grid-col-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
        }

        /* ── CONNECT SOCIALS HOVER ── */
        .social-link-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-link-btn:hover {
          transform: translateY(-3px);
          color: #FFFFFF;
        }
        .social-link-btn.linkedin:hover { background: #0A66C2; border-color: #0A66C2; box-shadow: 0 6px 15px rgba(10,102,194,0.3); }
        .social-link-btn.facebook:hover { background: #1877F2; border-color: #1877F2; box-shadow: 0 6px 15px rgba(24,119,242,0.3); }
        .social-link-btn.instagram:hover { background: linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D); border-color: transparent; box-shadow: 0 6px 15px rgba(193,53,132,0.3); }
        .social-link-btn.youtube:hover { background: #FF0000; border-color: #FF0000; box-shadow: 0 6px 15px rgba(255,0,0,0.3); }
        .social-link-btn.x:hover { background: #0F172A; border-color: #0F172A; box-shadow: 0 6px 15px rgba(15,23,42,0.3); }

        /* ── RESPONSIVE MEDIA QUERIES FOR LAPTOPS & MOBILE ── */

        /* Standard Laptops (max-width: 1366px) */
        @media (max-width: 1366px) {
          .contact-section {
            padding: 42px 5% !important;
          }
          .contact-hero-section h1 {
            font-size: clamp(24px, 3vw, 40px) !important;
          }
          .contact-section h2 {
            font-size: clamp(20px, 2.4vw, 30px) !important;
          }
          .contact-section h3 {
            font-size: 15px !important;
          }
          .contact-section p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
          .contact-btn-primary, .contact-btn-secondary {
            padding: 10px 22px !important;
            font-size: 13px !important;
          }
        }

        /* 1280px x 720px (HD Small Laptop Screens) & max-width: 1299px */
        @media (max-width: 1299px) {
          .contact-section {
            padding: 34px 4% !important;
          }
          .grid-col-5 {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .grid-col-3 {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .contact-hero-section h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .contact-section h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .contact-section h3 {
            font-size: 14px !important;
          }
          .contact-section p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
          .contact-btn-primary, .contact-btn-secondary {
            padding: 9px 18px !important;
            font-size: 12.5px !important;
          }
          .contact-glass-card {
            padding: 20px !important;
          }
        }

        /* Tablets (max-width: 992px) */
        @media (max-width: 992px) {
          .contact-section {
            padding: 30px 4% !important;
          }
          .contact-hero-row {
            flex-direction: column !important;
            gap: 32px;
          }
          .contact-hero-left, .contact-hero-right {
            width: 100% !important;
            flex: none !important;
          }
          .grid-col-5 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile Landscapes/Portraits (max-width: 768px) */
        @media (max-width: 768px) {
          .contact-section {
            padding: 24px 16px !important;
          }
          .grid-col-3 {
            grid-template-columns: 1fr;
          }
          .grid-col-2 {
            grid-template-columns: 1fr;
          }
        }

        /* Small Mobile (max-width: 576px) */
        @media (max-width: 576px) {
          .contact-section {
            padding: 20px 14px !important;
          }
          .grid-col-5 {
            grid-template-columns: 1fr;
          }
          .contact-btn-primary, .contact-btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .contact-hero-row {
            gap: 24px;
          }
          .contact-form-info-box, .contact-form-box {
            padding: 20px 16px !important;
          }
        }

        /* Glowing Pulse Animation */
        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.06); opacity: 0.6; }
        }
        .pulse-aura {
          animation: auraPulse 4s ease-in-out infinite;
        }
      `}</style>

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
            background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="contact-hero-row" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Text Column */}
          <div className="contact-hero-left">
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                alignSelf: "flex-start",
                gap: 8,
                background: "rgba(22, 163, 74, 0.06)",
                color: "#15803D",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1.2px",
                marginBottom: 20,
                textTransform: "uppercase",
                border: "1.5px solid rgba(22, 163, 74, 0.15)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 6px #16A34A" }} />
              Contact Us
            </div>

            {/* Recommended H1 */}
            <h1
              style={{
                fontSize: "clamp(26px, 2.6vw, 38px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#0F172A",
                marginBottom: 16,
                letterSpacing: "-1.5px",
              }}
            >
              <span style={{ color: "#16A34A" }}>Contact MessBee</span> – Let’s Talk About Your Business
            </h1>

            {/* Description */}
            <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 640 }}>
              Have a question about MessBee, want to explore a business solution, or interested in working with us?
              Whether you're looking for product information, support, a partnership opportunity, or a solution for
              your business, our team is here to help.
              <br /><br />
              Tell us what you need. We’ll help you find the right way forward.
            </p>

            {/* Primary & Secondary CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                className="contact-btn-primary"
                onClick={() => handleScrollToForm("General Enquiry")}
              >
                Send an Enquiry
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button className="contact-btn-secondary" onClick={() => navigate("/")}>
                Get Started
              </button>
            </div>
          </div>

          {/* Right Column: Visual Support Hub Node Graphic */}
          <div className="contact-hero-right" style={{ marginTop: 60 }}>
            <div
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
                borderRadius: 24,
                padding: "24px 20px",
                boxShadow: "0 20px 50px rgba(2, 44, 34, 0.35)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                color: "#FFFFFF",
                position: "relative",
                overflow: "hidden",
                transform: "scale(0.88)",
                transformOrigin: "top right",
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
                  background: "radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(52,211,153,0) 70%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.3px" }}>MessBee Business Hub</div>
                  <div style={{ fontSize: 11, color: "#4ADE80", fontWeight: 700, marginTop: 4 }}>Direct Communication Channels</div>
                </div>
                <span style={{ fontSize: 10, background: "rgba(52,211,153,0.2)", color: "#34D399", padding: "4px 12px", borderRadius: 20, fontWeight: 800, border: "1px solid rgba(52,211,153,0.25)", textTransform: "uppercase" }}>
                  Active
                </span>
              </div>

              {/* Support Info Cards inside Node */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 18px", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: "#A7F3D0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>General &amp; Careers</div>
                  <a href="mailto:info@messbee.com" style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    info@messbee.com
                  </a>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 18px", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: "#A7F3D0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Customer Support</div>
                  <a href="mailto:support@messbee.com" style={{ fontSize: 15, fontWeight: 800, color: "#4ADE80", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    support@messbee.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: HOW CAN WE HELP? (5 CARDS)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FAFAFA", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                letterSpacing: "1.2px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Categories
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              How Can <span style={{ color: "#16A34A" }}>We Help?</span>
            </h2>
          </div>

          <div className="grid-col-3" style={{ justifyContent: "center" }}>
            {/* Card 1: General Enquiries */}
            <div className="contact-glass-card category-card">
              <div>
                <div className="category-card-icon" style={{ background: "#EFF6FF", color: "#3B82F6", border: "1.5px solid #BFDBFE" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <h3 className="category-card-title">General Enquiries</h3>
                <p className="category-card-desc">
                  Have a question about MessBee, our products or how the platform works?
                </p>
              </div>
              <div className="category-card-footer" style={{ color: "#3B82F6" }}>
                Email: info@messbee.com
              </div>
            </div>

            {/* Card 2: Sales & Business Enquiries */}
            <div className="contact-glass-card category-card">
              <div>
                <div className="category-card-icon" style={{ background: "#F0FDF4", color: "#16A34A", border: "1.5px solid #BBF7D0" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                </div>
                <h3 className="category-card-title">Sales &amp; Business Enquiries</h3>
                <p className="category-card-desc">
                  Interested in MessBee for your business or want to discuss a suitable plan?
                </p>
              </div>
              <button
                className="contact-btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => handleScrollToForm("Enterprise Solutions")}
              >
                Talk to Sales
              </button>
            </div>

            {/* Card 3: Customer Support */}
            <div className="contact-glass-card category-card">
              <div>
                <div className="category-card-icon" style={{ background: "#FEF3C7", color: "#D97706", border: "1.5px solid #FDE68A" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                </div>
                <h3 className="category-card-title">Customer Support</h3>
                <p className="category-card-desc" style={{ marginBottom: 8 }}>
                  Already using MessBee and need help with your account, product or integration?
                </p>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#D97706", marginBottom: 14 }}>
                  Email: support@messbee.com
                </div>
              </div>
              <button
                className="contact-btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => handleScrollToForm("General Enquiry")}
              >
                Contact Support
              </button>
            </div>

            {/* Card 4: Partnerships */}
            <div className="contact-glass-card category-card">
              <div>
                <div className="category-card-icon" style={{ background: "#F5F3FF", color: "#8B5CF6", border: "1.5px solid #DDD6FE" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3 className="category-card-title">Partnerships</h3>
                <p className="category-card-desc">
                  Interested in becoming a MessBee partner, technology partner or business partner?
                </p>
              </div>
              <button
                className="contact-btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => handleScrollToForm("Partnership")}
              >
                Become a Partner
              </button>
            </div>

            {/* Card 5: Careers */}
            <div className="contact-glass-card category-card">
              <div>
                <div className="category-card-icon" style={{ background: "#FCE7F3", color: "#EC4899", border: "1.5px solid #FBCFE8" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                </div>
                <h3 className="category-card-title">Careers</h3>
                <p className="category-card-desc" style={{ marginBottom: 8 }}>
                  Looking for career or internship opportunities at MessBee?
                </p>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#EC4899", marginBottom: 14 }}>
                  Email: info@messbee.com
                </div>
              </div>
              <button
                className="contact-btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => navigate("/careers")}
              >
                View Careers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: VISIT US, CONNECT & ENQUIRY FORM
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact-form-section" className="contact-section" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1.2px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Requirements
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 14 }}>
              Tell Us About Your Requirement
            </h2>
            <p style={{ fontSize: 14.5, color: "#64748B", maxWidth: 620, margin: "0 auto", lineHeight: 1.65 }}>
              Use our contact form and provide a few details so the right team can understand your requirement.
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
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#16A34A", display: "flex", alignItems: "center", gap: 8 }}>
                    MessBee
                  </div>
          
                  <div style={{ fontSize: 13.5, color: "#475569", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.55 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span><strong>Corporate Office:</strong> MessBee, Devika Tower, 510A, Chander Nagar, Surya Nagar, Ghaziabad, Uttar Pradesh 201011</span>
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
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link-btn linkedin">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link-btn facebook">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link-btn instagram">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link-btn youtube">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* X */}
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="social-link-btn x">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/></svg>
                  </a>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#64748B", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span>Email: hello@messbee.com</span>
                </div>
              </div>
            </div>

            {/* Right Box: Interactive Support Form */}
            <div className="contact-form-box" style={{ flex: 1.2, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "32px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", marginBottom: 22, display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #E2E8F0", paddingBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  Contact Form
                </h3>

                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Row 1: Name + Business Name */}
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
                        value={form.orgName}
                        onChange={(e) => setForm({ ...form, orgName: e.target.value })}
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

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="contact-btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: 6, padding: "14px 20px", fontSize: 14.5, borderRadius: 10 }}
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
                href="https://www.google.com/maps/dir//MessBee,+Devika+Tower,+510,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011/@28.6805919,77.4587233,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390cfb2702bd3435:0x5174d17b09289b6b!2m2!1d77.3308721!2d28.6686012?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D"
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
                <h3 style={{ fontSize: 17, fontWeight: 900, color: "#0F172A", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  MessBee Corporate Office
                </h3>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", margin: 0, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                  MessBee, Devika Tower, 510A, Chander Nagar, Surya Nagar, Ghaziabad, Uttar Pradesh 201011
                </p>
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
                src="https://maps.google.com/maps?q=MessBee,+Devika+Tower,+510,+Chander+Nagar,+Surya+Nagar,+Ghaziabad,+Uttar+Pradesh+201011&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
          SECTION 4: LOOKING FOR PRODUCT HELP?
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF", padding: "10px 5% !important" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center",
            border: "1.5px solid #BBF7D0",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%)",
            padding: "36px 28px",
            boxShadow: "0 10px 30px rgba(22, 163, 74, 0.03)"
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#D1FAE5",
              color: "#059669",
              padding: "4px 12px",
              borderRadius: 40,
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "1.2px",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Product Help
          </div>
          <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 14 }}>
            Looking for Product Help?
          </h2>
          <p style={{ fontSize: 14.5, color: MU, lineHeight: 1.75, marginBottom: 22, maxWidth: 720, margin: "0 auto 22px" }}>
            If you're already a MessBee customer and need technical or account assistance, the Help Center may be the quickest place to find an answer.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="contact-btn-primary" onClick={() => navigate("/docs")} style={{ padding: "11px 26px", fontSize: 13.5 }}>
              Visit Help Center
            </button>
            <button className="contact-btn-secondary" onClick={() => handleScrollToForm("General Enquiry")} style={{ padding: "10px 22px", fontSize: 13.5 }}>
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FREQUENTLY ASKED QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 12px",
                borderRadius: 40,
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "1.2px",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              FAQ
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: D2, letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <FaqItem
              q="What can I contact MessBee about?"
              a="You can contact us regarding products, pricing, sales, partnerships, general enquiries, account-related questions and other business requirements."
            />
            <FaqItem
              q="How can I contact MessBee Support?"
              a="For existing customers who need product or technical assistance, contact support@messbee.com or visit the Help Center."
            />
            <FaqItem
              q="Can I request a MessBee product demonstration?"
              a="Yes, where demo availability is offered. You can submit a sales enquiry with details about your business and requirements."
            />
            <FaqItem
              q="Can businesses become MessBee partners?"
              a="Yes. Businesses interested in partnership opportunities can contact the MessBee partnership team through the relevant enquiry channel."
            />
            <FaqItem
              q="Where is MessBee based?"
              a="MessBee is based in India."
            />
            <FaqItem
              q="How long does it take to receive a response?"
              a="Response times can vary depending on the type and complexity of the enquiry. Support and business enquiries may have different response processes."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: WE'RE READY TO HEAR FROM YOU
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="contact-section" style={{ background: GL, textAlign: "center", position: "relative", overflow: "hidden", borderBottom: `1px solid ${GB}` }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "#D1FAE5",
              color: "#059669",
              padding: "4px 12px",
              borderRadius: 40,
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "1.2px",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Talk to MessBee
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            We’re Ready to Hear From You
          </h2>
          <p style={{ fontSize: 14, color: MU, lineHeight: 1.7, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
            Whether you're starting your digital journey, looking to improve your existing business operations or exploring a partnership with MessBee, we're happy to hear from you.
          </p>
          <div style={{ fontSize: 17, fontWeight: 900, color: G, marginBottom: 26, letterSpacing: "-0.3px" }}>
            Have a question? Start the conversation.
          </div>
          <button
            className="contact-btn-primary"
            onClick={() => handleScrollToForm("General Enquiry")}
            style={{ fontSize: 13.5, padding: "12px 28px" }}
          >
            Send an Enquiry
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
