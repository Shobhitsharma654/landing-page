import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   MessBee — FAQ Page
   ══════════════════════════════════════════════════════ */

const FAQ_CATEGORIES = ["General", "Capabilities & CRM", "Automation & AI", "API & Integrations"];

const FAQS = [
  {
    category: "General",
    q: "What is MessBee?",
    a: "MessBee is a Digital Business Operating System designed to help businesses manage customer communication, CRM, AI assistance, marketing automation, commerce, orders, payments, loyalty, analytics and business workflows from one connected platform."
  },
  {
    category: "General",
    q: "Is MessBee only a WhatsApp Business platform?",
    a: "No. WhatsApp Business capabilities are an important part of MessBee, but MessBee is designed as a broader digital business platform that combines communication with CRM, AI, automation, commerce, operations and analytics."
  },
  {
    category: "General",
    q: "Who can use MessBee?",
    a: "MessBee is designed for a wide range of businesses, including retailers, Kirana stores, restaurants, clinics, pharmacies, boutiques, gyms, coaching institutes, service businesses, distributors, manufacturers, educational institutions and growing enterprises."
  },
  {
    category: "General",
    q: "Can small businesses use MessBee?",
    a: "Yes. MessBee is designed to support businesses at different stages of digital growth. A small business can begin with the capabilities it needs and expand its use as the business grows."
  },
  {
    category: "General",
    q: "Is MessBee suitable for Indian MSMEs?",
    a: "Yes. MessBee's positioning and product ecosystem are specifically designed to address the digital communication, customer management, automation, and growth requirements of Indian businesses, including MSMEs and growing organizations."
  },
  
  {
    category: "Capabilities & CRM",
    q: "Does MessBee provide CRM?",
    a: "Yes. MessBee includes CRM capabilities for organizing customer profiles, contacts, interactions, enquiries, leads and customer relationships."
  },
  {
    category: "Capabilities & CRM",
    q: "Can MessBee manage multiple business locations?",
    a: "MessBee is designed to support multi-location business management, allowing growing organizations to manage multiple branches, stores, offices or locations from a centralized environment."
  },

  {
    category: "Automation & AI",
    q: "Does MessBee support AI automation?",
    a: "MessBee includes AI-powered capabilities designed to assist with customer enquiries, FAQs, product or service information, recommendations, order-related conversations, follow-ups and other suitable repetitive interactions."
  },
  {
    category: "Automation & AI",
    q: "Can MessBee automate business workflows?",
    a: "Yes. MessBee is designed to support no-code or configurable automation workflows for activities such as lead follow-ups, reminders, customer re-engagement, notifications, campaigns and other routine business processes."
  },

  {
    category: "API & Integrations",
    q: "Can MessBee integrate with other software?",
    a: "MessBee is designed to be API-ready so that businesses can connect supported applications, websites and business systems with their MessBee environment."
  }
];

const FaqPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredFaqs = FAQS.filter(f => f.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HEADER ── */}
      <section style={{ background: "linear-gradient(135deg,#18181B 60%,#1a2e1a 100%)", padding: "80px 6% 100px", textAlign: "center", position: "relative" }}>
        <div className="hero-animate" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.3)", borderRadius: 40, padding: "6px 18px", marginBottom: 28 }}>
            <span style={{ color: "#16A34A", fontSize: 13, fontWeight: 600 }}>Help Center</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 20 }}>
            Frequently Asked <span style={{ color: "#16A34A" }}>Questions</span>
          </h1>
          <p style={{ fontSize: 18, color: "#9CA3AF", lineHeight: 1.7 }}>
            Find answers to common questions about MessBee, billing, integrations, and the WhatsApp Business API.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: "0 6%", marginTop: -40, position: "relative", zIndex: 10, marginBottom: 100 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", background: "#FFFFFF", borderRadius: 20, border: "1px solid #E5E7EB", boxShadow: "0 8px 30px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          
          {/* Categories */}
          <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", overflowX: "auto", background: "#F9FAFB" }}>
            {FAQ_CATEGORIES.map(cat => (
              <button key={cat} className="cat-btn" onClick={() => { setActiveCategory(cat); setOpenIndex(null); }} style={{
                flex: 1, padding: "20px 24px", fontSize: 15, fontWeight: 600, border: "none", background: "transparent", cursor: "pointer",
                color: activeCategory === cat ? "#16A34A" : "#6B7280", borderBottom: `2px solid ${activeCategory === cat ? "#16A34A" : "transparent"}`,
                whiteSpace: "nowrap"
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ padding: "32px 40px" }}>
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ borderBottom: i === filteredFaqs.length - 1 ? "none" : "1px solid #E5E7EB" }}>
                <div 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", cursor: "pointer" }}
                >
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: openIndex === i ? "#16A34A" : "#111827", paddingRight: 24, transition: "color 0.2s" }}>
                    {faq.q}
                  </h3>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: "50%", background: openIndex === i ? "#16A34A" : "#F3F4F6", 
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0)"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={openIndex === i ? "#FFFFFF" : "#6B7280"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                <div className="faq-answer" style={{ 
                  maxHeight: openIndex === i ? 200 : 0, 
                  paddingBottom: openIndex === i ? 24 : 0, 
                  opacity: openIndex === i ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s ease"
                }}>
                  <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still have questions? CTA */}
        <div style={{ maxWidth: 860, margin: "40px auto 0", background: "rgba(0,200,83,0.06)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 16, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Still have questions?</h3>
            <p style={{ fontSize: 15, color: "#4B5563" }}>Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</p>
          </div>
          <button onClick={() => navigate("/contact")} style={{
            background: "#16A34A", color: "#FFFFFF", border: "none", borderRadius: 40,
            padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,200,83,0.3)"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            Get in touch
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
};

export default FaqPage;
