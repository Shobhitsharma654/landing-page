import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { QRCodeSVG } from "qrcode.react";

const QrConnectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateQr = () => {
    navigate("/whatsapp-qr-generator");
  };

  const handleWatchDemo = () => {
    navigate("/book-demo");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <style>{`
        .btn-green-primary {
          background: #16A34A;
          color: #FFFFFF;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.25);
        }
        .btn-green-primary:hover {
          background: #15803D;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35);
        }
        .btn-outline-demo {
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid #CBD5E1;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .btn-outline-demo:hover {
          background: #F8FAFC;
          border-color: #94A3B8;
        }

        /* Feature Cards */
        .fc { background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:16px; transition:all .3s; display:flex; flex-direction:column; height:100%; }
        .fc:hover { border-color:#86EFAC; box-shadow:0 6px 18px -4px rgba(22,163,74,.1); transform:translateY(-2px); }

        /* Grids */
        .fg { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; }
        .wg { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; }
        .sg { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; position:relative; }

        @media(max-width:1280px) {
          .fg { grid-template-columns:repeat(5,1fr); gap:10px; }
          .wg { grid-template-columns:repeat(3,1fr); }
        }
        @media(max-width:1100px) {
          .fg { grid-template-columns:repeat(3,1fr); }
          .wg { grid-template-columns:repeat(3,1fr); }
          .sg { grid-template-columns:repeat(3,1fr); }
          .scl { display:none !important; }
        }
        @media(max-width:768px) {
          .fg { grid-template-columns:repeat(2,1fr); }
          .wg { grid-template-columns:repeat(2,1fr); }
          .sg { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:480px) {
          .fg { grid-template-columns:1fr; }
          .wg { grid-template-columns:1fr; }
          .sg { grid-template-columns:1fr; }
        }

        /* Hero visual */
        .hvc {
          flex: 1 1 580px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 400px;
          transform-origin: center center;
          margin-top: -45px;
          margin-left: 120px;
        }
        @media(max-width:1280px) {
          .hvc {
            transform: scale(.88);
            margin-left: 0px !important;
            margin-top: 0px !important;
          }
        }
        @media(max-width:1100px) {
          .hvc {
            transform: scale(.78);
            margin-left: 0px !important;
            margin-top: 0px !important;
          }
        }
        @media(max-width:960px) {
          .hvc {
            transform: scale(0.85) !important;
            transform-origin: top center !important;
            margin: 10px auto -40px !important;
            flex: 1 1 100% !important;
            min-height: 380px !important;
          }
          .hsc { display: flex !important; }
          .hsv { display: block !important; }
        }
        @media(max-width:768px) {
          .hvc {
            transform: scale(0.8) !important;
            transform-origin: top center !important;
            margin: 0 auto -50px !important;
            min-height: 360px !important;
          }
        }
        @media(max-width:540px) {
          .hvc {
            transform: scale(0.7) !important;
            transform-origin: top center !important;
            margin: -10px auto -100px !important;
            min-height: 310px !important;
          }
        }
        @media(max-width:420px) {
          .hvc {
            transform: scale(0.58) !important;
            transform-origin: top center !important;
            margin: -20px auto -140px !important;
            min-height: 260px !important;
          }
        }
        @media(max-width:360px) {
          .hvc {
            transform: scale(0.5) !important;
            transform-origin: top center !important;
            margin: -25px auto -160px !important;
            min-height: 230px !important;
          }
        }

        /* Checklist responsive */
        @media(min-width:900px) { .hcr { flex-wrap:nowrap !important; justify-content:space-between !important; } }
        @media(max-width:899px) { .hcr { flex-wrap:wrap !important; justify-content:center !important; gap:12px 20px !important; } }

        /* What is QR responsive */
        @media(max-width:1100px) { .wql { gap:20px !important; } .wqg { max-width:300px !important; flex:1 1 260px !important; } .wqc { flex:1 1 500px !important; } }
        @media(max-width:768px) { .wqg { max-width:100% !important; flex:1 1 100% !important; } .wqc { flex:1 1 100% !important; } }

        /* Mobile Breakpoints (768px and under) */
        @media (max-width: 768px) {
          .qr-section {
            padding: 28px 16px !important;
          }
          .qr-hero-section {
            margin-top: 0px !important;
            padding-top: 84px !important;
            padding-bottom: 28px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .qr-hero-row {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 20px !important;
          }
          .qr-hero-left {
            min-width: 100% !important;
            max-width: 100% !important;
          }
          .hvc {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100% !important;
          }
          .btn-green-primary, .btn-outline-demo {
            width: 100% !important;
            justify-content: center !important;
          }
          .fg {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .wg {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .sg {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .wq-highlights {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }

        .wq-highlights {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .wq-card:hover {
          border-color: #16A34A !important;
          box-shadow: 0 8px 20px rgba(22, 163, 74, 0.08) !important;
          transform: translateY(-2px);
        }
        .step-item-card:hover {
          border-color: #16A34A !important;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.08) !important;
          transform: translateY(-3px);
        }
        .step-connector-arrow {
          display: none;
        }

        @media (max-width: 768px) {
          .qr-section {
            padding: 28px 16px !important;
          }
          .qr-hero-section {
            margin-top: 0px !important;
            padding-top: 84px !important;
            padding-bottom: 28px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .qr-hero-row {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 20px !important;
          }
          .qr-hero-left {
            min-width: 100% !important;
            max-width: 100% !important;
          }
          .hvc {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100% !important;
          }
          .btn-green-primary, .btn-outline-demo {
            width: 100% !important;
            justify-content: center !important;
          }
          .fg {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .wg {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .sg {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
          .wq-highlights {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .scl {
            display: none !important;
          }
          .step-item-card {
            max-width: 290px !important;
            margin: 0 auto !important;
          }
          .step-connector-arrow {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 4px auto !important;
            color: #16A34A !important;
          }
        }

        @media (max-width: 480px) {
          .qr-section {
            padding: 20px 14px !important;
          }
          .qr-hero-section {
            margin-top: 0px !important;
            padding-top: 78px !important;
            padding-bottom: 24px !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          .fg {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .wg {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .wg > div {
            padding: 12px 10px !important;
          }
          .sg {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
          .wq-highlights {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .scl {
            display: none !important;
          }
          .step-item-card {
            max-width: 290px !important;
            margin: 0 auto !important;
          }
          .step-connector-arrow {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 4px auto !important;
            color: #16A34A !important;
          }
        }
      `}</style>

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="qr-hero-section" style={{ paddingTop: 92, paddingBottom: 48, background: "#FFFFFF", paddingLeft: "6%", paddingRight: "6%", overflow: "hidden" }}>
        <div className="qr-hero-row" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          
          {/* Left Column */}
          <div className="qr-hero-left" style={{ flex: "1 1 420px", minWidth: 280, maxWidth: 520 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 40, padding: "5px 14px", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "#16A34A" }}>MessBee QR &amp; Connect</span>
            </div>

            <h1 style={{ fontSize: "clamp(28px, 2.9vw, 42px)", fontWeight: 900, color: "#0F172A", lineHeight: 1.12, letterSpacing: "-1px", marginBottom: 16 }}>
              Every Scan.<br />
              <span style={{ color: "#16A34A" }}>A New Customer.</span>
            </h1>

            <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginBottom: 14, maxWidth: 520 }}>
              MessBee QR &amp; Connect helps you create powerful QR codes and smart links to start WhatsApp conversations, promote offers, showcase products, and connect offline customers to your digital business.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {["Create Smart QR.", "Share Everywhere.", "Engage on WhatsApp.", "Track & Grow."].map(t => (
                <span key={t} style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#64748B", borderRadius: 40, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 0 }}>
              <button className="btn-green-primary" onClick={handleCreateQr}>
                Get Started <span>→</span>
              </button>
              <button className="btn-outline-demo" onClick={handleWatchDemo}>
                Watch Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            </div>
          </div>

          {/* Right Column: Phone + Cards + Dotted Lines */}
          <div className="hvc" style={{ flex: "1 1 340px", minWidth: 280, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              
              {/* SVG Dotted Lines */}
              <svg className="hsv" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 640 400">
                <path d="M 190 20 C 218 110, 218 290, 190 380" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 450 20 C 422 110, 422 290, 450 380" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="178" y1="80" x2="218" y2="80" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="178" y1="200" x2="218" y2="200" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="178" y1="320" x2="218" y2="320" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="462" y1="80" x2="422" y2="80" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="462" y1="200" x2="422" y2="200" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="462" y1="320" x2="422" y2="320" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>

              {/* Left 3 Cards */}
              <div className="hsc" style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 2, flex: "0 0 160px" }}>
                {[
                  { bg: "#E8F5E9", color: "#16A34A", title: "Direct Chat", desc: "One-click WhatsApp chat with you", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                  { bg: "#FFF7ED", color: "#EA580C", title: "Offer QR", desc: "Promote offers and get more customers", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
                  { bg: "#F3E8FF", color: "#9333EA", title: "Campaign QR", desc: "Run campaigns and measure performance", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> }
                ].map((c, i) => (
                  <div key={i} style={{ background: "#FFF", border: "1px solid #F1F5F9", borderRadius: 9, padding: "5px 7px", boxShadow: "0 3px 10px -3px rgba(0,0,0,.05)", display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: "#0F172A", marginBottom: 1 }}>{c.title}</div>
                      <div style={{ fontSize: 8, color: "#64748B", lineHeight: 1.2 }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Phone */}
              <div style={{ zIndex: 2, margin: "0 16px" }}>
                <div style={{ width: 170, height: 340, background: "#FFF", borderRadius: 28, border: "6px solid #0B132B", boxShadow: "0 16px 40px -8px rgba(11,19,43,.18)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 6px 14px", overflow: "hidden" }}>
                  <div style={{ width: 44, height: 10, background: "#0B132B", borderRadius: "0 0 7px 7px", marginBottom: 20, marginTop: -10 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, width: "100%" }}>
                    <div style={{ position: "relative", background: "#FFF", padding: 6, borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,.04)", border: "1px solid #F1F5F9", marginBottom: 16 }}>
                      <QRCodeSVG value="https://messbee.in/whatsapp-qr-generator" size={90} level="Q" fgColor="#0F172A" />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 24, height: 24, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #FFF" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFF"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", lineHeight: 1.2, marginBottom: 4 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>Scan to Chat</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#16A34A" }}>on WhatsApp</div>
                    </div>
                    <svg width="36" height="18" viewBox="0 0 60 30" fill="none"><path d="M10 25 C 25 28, 45 25, 52 8" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"/><path d="M44 8 L 52 8 L 52 16" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>

              {/* Right 3 Cards */}
              <div className="hsc" style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 2, flex: "0 0 160px" }}>
                {[
                  { bg: "#EFF6FF", color: "#2563EB", title: "Product QR", desc: "Showcase products and drive enquiries", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
                  { bg: "#ECFDF5", color: "#059669", title: "Referral", desc: "Grow through customer referrals and sharing", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { bg: "#E0F2FE", color: "#0284C7", title: "Analytics", desc: "Track scans, chats and conversions", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
                ].map((c, i) => (
                  <div key={i} style={{ background: "#FFF", border: "1px solid #F1F5F9", borderRadius: 9, padding: "5px 7px", boxShadow: "0 3px 10px -3px rgba(0,0,0,.05)", display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: "#0F172A", marginBottom: 1 }}>{c.title}</div>
                      <div style={{ fontSize: 8, color: "#64748B", lineHeight: 1.2 }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GREEN TRUST BANNER ═══════ */}
      <section style={{ background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", padding: "36px 6%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#FFFFFF", marginBottom: 18, letterSpacing: "-1px" }}>
            Everything You Need to Run and Grow Your Business
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {[
              { icon: "⚡", title: "2 Minute Setup", desc: "Get started instantly" },
              { icon: "✅", title: "100% WhatsApp Ready", desc: "Meta API powered" },
              { icon: "🧩", title: "No Coding Required", desc: "Drag & drop builder" },
              { icon: "📊", title: "Track Real Results", desc: "Live analytics dash" },
              { icon: "🎁", title: "Free to Get Started", desc: "No credit card needed" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 160,
                flex: "1 1 160px",
                maxWidth: 210,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>{item.title}</div>
                  <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 1 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ WHAT IS QR & CONNECT ═══════ */}
      <section className="qr-section" style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="wql" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
            
            {/* Left Graphic */}
            <div className="wqg" style={{ flex: "1 1 320px", maxWidth: 360, background: "#F8FAFC", borderRadius: 18, padding: "24px 20px", border: "1px solid #F1F5F9" }}>
              <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 280 180">
                  <line x1="140" y1="90" x2="55" y2="50" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="90" x2="140" y2="30" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="90" x2="225" y2="50" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="90" x2="225" y2="130" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="90" x2="55" y2="130" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
                <div style={{ width: 58, height: 58, background: "#16A34A", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(22,163,74,.2)", zIndex: 2 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                {[
                  { t: 30, l: 40, stroke: "#16A34A", d: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></> },
                  { t: 12, l: "calc(50% - 14px)", stroke: "#16A34A", d: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></> },
                  { t: 30, r: 40, stroke: "#EA580C", d: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></> },
                  { b: 25, r: 40, stroke: "#059669", d: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
                  { b: 25, l: 40, stroke: "#2563EB", d: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> }
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", top: s.t, bottom: s.b, left: s.l, right: s.r, width: 28, height: 28, background: "#FFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(0,0,0,.05)", border: "1px solid #F1F5F9", zIndex: 2 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={s.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{s.d}</svg>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", marginBottom: 6, lineHeight: 1.2 }}>
                One QR Code.<br /><span>Unlimited Possibilities.</span>
              </h3>
              <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.4, margin: 0 }}>Create once and use anywhere – online or offline.<br />Connect instantly. Grow endlessly.</p>
            </div>

            {/* Right Content */}
            <div className="wqc" style={{ flex: "1 1 500px" }}>
              <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", marginBottom: 10, letterSpacing: "-1px" }}>What is QR & Connect?</h2>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, marginBottom: 8 }}>QR & Connect is a powerful suite of tools that helps you turn every scan into a valuable customer conversation on WhatsApp.</p>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, marginBottom: 8 }}>Whether you want to share your WhatsApp number, promote a special offer, showcase a product, book a service, run a marketing campaign or grow through referrals – you can do it all in just a few clicks.</p>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, marginBottom: 8 }}>Share your QR codes and smart links anywhere: on shop counters, visiting cards, packaging, brochures, posters, websites, social media or even in WhatsApp status.</p>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, marginBottom: 16 }}>Every scan, every click and every conversation is tracked in real-time so you can understand what works best and grow your business smarter.</p>

              <div className="wq-highlights" style={{ marginTop: 24 }}>
                {[
                  { title: "Easy to Create", desc: "Create any QR code in less than 2 minutes.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                  { title: "Instant Connection", desc: "Customers connect instantly on WhatsApp.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
                  { title: "Track & Measure", desc: "Real-time analytics to track performance.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
                  { title: "More Conversions", desc: "Turn more scans into conversations and sales.", icon: <span style={{ fontSize: 13, fontWeight: 900, color: "#16A34A" }}>₹</span> }
                ].map((h, i) => (
                  <div key={i} className="wq-card" style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 12,
                    padding: "12px 14px",
                    boxShadow: "0 2px 6px rgba(15,23,42,0.03)",
                    transition: "all 0.25s ease"
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{h.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 11.5, marginBottom: 2 }}>{h.title}</div>
                      <div style={{ fontSize: 9.5, color: "#64748B", lineHeight: 1.4 }}>{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ ALL FEATURES ═══════ */}
      <section style={{ padding: "60px 6%", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: "-1px" }}>All QR & Connect Features</h2>
            <p style={{ fontSize: 12, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>Everything you need to connect physical and digital touchpoints directly to WhatsApp.</p>
          </div>
          <div className="fg">
            {[
              { icon: "💬", title: "WhatsApp Chat QR", desc: "Create QR codes to start WhatsApp conversations instantly with a pre-filled message." },
              { icon: "🔗", title: "Direct Chat Links", desc: "Share one-click links to start WhatsApp chat without saving numbers. Perfect for websites, emails and social media." },
              { icon: "🏷️", title: "Offer QR", desc: "Promote discounts, offers and deals with QR codes and turn every scan into more conversations." },
              { icon: "🛍️", title: "Product QR", desc: "Showcase your products and let customers enquire or place orders directly on WhatsApp." },
              { icon: "🛠️", title: "Service QR", desc: "Generate QR codes for service enquiries, bookings, support requests and appointment scheduling." },
              { icon: "📣", title: "Campaign QR", desc: "Run marketing campaigns with unique QR codes and track responses, leads and performance in real-time." },
              { icon: "👥", title: "Referral QR", desc: "Grow your business through customer referrals and unique shareable links. Reward your best customers." },
              { icon: "📍", title: "Location QR", desc: "Create location-wise QR codes for multiple branches, stores or outlets and know which location performs best." },
              { icon: "👤", title: "Team QR", desc: "Empower your team with unique QR codes to engage customers and track individual performance." },
              { icon: "📊", title: "QR Analytics", desc: "Track scans, chats, leads, conversions and more with detailed reports and actionable insights." }
            ].map((item, idx) => (
              <div key={idx} className="fc">
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", marginBottom: 4, lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: 10, color: "#64748B", lineHeight: 1.45, flex: 1, marginBottom: 10 }}>{item.desc}</p>
                <div onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ fontSize: 10.5, fontWeight: 700, color: "#16A34A", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3 }}>Create Now →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY BUSINESSES LOVE ═══════ */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: "-1px" }}>Why Businesses Love QR & Connect</h2>
          </div>
          <div className="wg">
            {[
              { icon: "⚡", title: "Instant Engagement", desc: "Start conversations in seconds and never miss a potential customer." },
              { icon: "🌐", title: "Wider Reach", desc: "Share anywhere – offline or online – and reach more people effortlessly." },
              { icon: "📈", title: "Better Insights", desc: "Know who your customers like and improve your marketing strategy." },
              { icon: "💰", title: "Cost Effective", desc: "Reduce ad spend and get more leads, conversations and sales." },
              { icon: "🛡️", title: "Secure & Reliable", desc: "Enterprise-grade security to keep your data and customer information safe." },
              { icon: "⏱️", title: "Easy to Use", desc: "No technical skills required. Simple, fast and built for everyone." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "#FFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, textAlign: "center", transition: "all .2s" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, margin: "0 auto 8px" }}>{item.icon}</div>
                <h3 style={{ fontSize: 11, fontWeight: 800, color: "#0F172A", marginBottom: 3 }}>{item.title}</h3>
                <p style={{ fontSize: 9.5, color: "#64748B", lineHeight: 1.35, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section style={{ padding: "60px 6%", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: "-1px" }}>How QR & Connect Works?</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div className="scl" style={{ position: "absolute", top: 18, left: "10%", right: "10%", height: 0, borderTop: "2px dashed #CBD5E1", zIndex: 0 }} />
            <div className="sg">
              {[
                { n: 1, title: "Create", desc: "Choose the type, add details, customize your QR code or generate a smart link." },
                { n: 2, title: "Share", desc: "Share your QR code or link anywhere – offline or online." },
                { n: 3, title: "Customer Scans", desc: "Customers scan the QR code or click the link from any device." },
                { n: 4, title: "Start Conversation", desc: "WhatsApp opens instantly and the customer starts the conversation." },
                { n: 5, title: "Track & Grow", desc: "Track scans, chats, leads and conversions. Improve and grow your business." }
              ].map((s, i, arr) => (
                <React.Fragment key={i}>
                  <div className="step-item-card" style={{
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 14,
                    padding: "16px 12px",
                    boxShadow: "0 2px 8px rgba(15,23,42,0.03)",
                    transition: "all 0.25s ease"
                  }}>
                    {/* Step Badge */}
                    <div style={{ display: "inline-flex", alignItems: "center", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#16A34A", fontSize: 10, fontWeight: 900, textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                      <span>Step {s.n}</span>
                    </div>

                    {/* Green Number Circle */}
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, margin: "0 auto 10px", boxShadow: "0 4px 12px rgba(22,163,74,0.25)" }}>
                      {s.n}
                    </div>

                    <h3 style={{ fontSize: 12.5, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>{s.title}</h3>
                    <p style={{ fontSize: 9.8, color: "#64748B", lineHeight: 1.45, margin: 0 }}>{s.desc}</p>
                  </div>

                  {i < arr.length - 1 && (
                    <div className="step-connector-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #15803D 0%, #16A34A 50%, #22C55E 100%)", borderRadius: 18, padding: "32px 30px", color: "#FFF", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#FFF", marginBottom: 6, lineHeight: 1.2, letterSpacing: "-1px" }}>
                Ready to turn every scan<br />into meaningful conversations?
              </h2>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.85)", lineHeight: 1.45, margin: 0, maxWidth: 420 }}>Create your first QR code in less than 2 minutes and start connecting with more customers on WhatsApp today.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
              <button onClick={handleCreateQr} style={{ background: "#FFF", color: "#16A34A", border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 3px 12px rgba(0,0,0,.1)", transition: "all .2s" }}>
                Create Your First QR Now <span>→</span>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  No Credit Card Required
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Free Forever Plan Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QrConnectPage;
