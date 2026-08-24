import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

/* ══════════════════════════════════════════════════════
   MessBee — Find a Business Page
   A curated directory of businesses powered by MessBee
   ══════════════════════════════════════════════════════ */

const FOOTER_LINKS = {
  company: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Find resources", path: "/resources" },
    { label: "Find business", path: "/business" },
  ],
  legal: [
    { label: "Terms and conditions", path: "/terms" },
    { label: "Privacy policy", path: "/privacy" },
    { label: "Cookies policy", path: "/cookies" },
    { label: "License agreement", path: "/license" },
  ],
};

const CATEGORIES = ["All", "E-Commerce", "Healthcare", "Food & Beverage", "Education", "Real Estate", "Finance", "Travel"];

const businesses = [
  { name: "Zara Boutique", category: "E-Commerce", location: "Mumbai", desc: "Fashion-forward clothing brand using MessBee for abandoned cart recovery and new arrivals broadcasts.", initials: "ZB", color: "#7C3AED" },
  { name: "MedRush Clinics", category: "Healthcare", location: "Bengaluru", desc: "Multi-specialty chain automating appointment reminders, reports, and follow-up care via WhatsApp.", initials: "MR", color: "#059669" },
  { name: "Spice Garden", category: "Food & Beverage", location: "Hyderabad", desc: "Cloud kitchen brand driving repeat orders with personalised daily menus and flash discount alerts.", initials: "SG", color: "#D97706" },
  { name: "BrightMind Academy", category: "Education", location: "Chennai", desc: "Ed-tech platform sending class schedules, homework reminders, and exam prep kits to 20,000 students.", initials: "BM", color: "#2563EB" },
  { name: "HomeNest Realty", category: "Real Estate", location: "Pune", desc: "Property consultancy sharing listing videos, virtual tours, and instant EMI calculators over chat.", initials: "HN", color: "#DC2626" },
  { name: "ClearFunds", category: "Finance", location: "Delhi", desc: "Fintech startup sending portfolio nudges, SIP reminders, and KYC updates with 99% open rates.", initials: "CF", color: "#0891B2" },
  { name: "JetSetGo Tours", category: "Travel", location: "Goa", desc: "Travel agency booking confirmations, itinerary updates, and real-time flight alerts – all on WhatsApp.", initials: "JG", color: "#9333EA" },
  { name: "FreshHarvest", category: "E-Commerce", location: "Ahmedabad", desc: "Farm-to-table grocery delivery sending daily deals, order tracking, and referral rewards effortlessly.", initials: "FH", color: "#16A34A" },
  { name: "DentalCare Pro", category: "Healthcare", location: "Kolkata", desc: "Dental chain reducing no-shows by 60% with automated appointment reminders and aftercare tips.", initials: "DC", color: "#BE185D" },
  { name: "ByteCafe", category: "Food & Beverage", location: "Bengaluru", desc: "Tech-themed café running loyalty campaigns and QR-code table ordering through MessBee flows.", initials: "BC", color: "#EA580C" },
  { name: "SkillUp Labs", category: "Education", location: "Noida", desc: "Upskilling platform converting 40% more leads with AI chatbot enrollment flows and placement alerts.", initials: "SL", color: "#7C3AED" },
  { name: "SwiftMove Logistics", category: "Finance", location: "Surat", desc: "B2B logistics company automating shipment updates, proof of delivery, and invoice sharing.", initials: "SM", color: "#0284C7" },
];

const BusinessPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filtered = businesses.filter(b => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()) || b.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="business-page-wrapper" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#FFFFFF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        /* Global Typography Overrides from ABOUT_TYPOGRAPHY_README.md & Business Section */
        .business-page-wrapper h1,
        .business-page-wrapper h2 {
          font-size: clamp(20px, 2.5vw, 32px) !important;
          font-weight: 900 !important;
          color: #FFFFFF !important;
          line-height: 1.2 !important;
        }
        .business-page-wrapper h1 span,
        .business-page-wrapper h2 span {
          color: #16A34A !important;
        }
        .business-page-wrapper p {
          font-size: 12px !important;
          font-weight: 400 !important;
          color: #64748B !important;
          line-height: 1.45 !important;
        }
        .business-page-wrapper .biz-hero p {
          color: #9CA3AF !important;
        }
        .business-page-wrapper .biz-card-title {
          font-size: 12px !important;
          font-weight: 800 !important;
          color: #111827 !important;
          line-height: 1.45 !important;
        }
        .business-page-wrapper .cat-pill {
          font-size: 12px !important;
          font-weight: 600 !important;
        }
        .business-page-wrapper .biz-btn-primary {
          padding: 8px 18px !important;
          font-size: 12.5px !important;
          font-weight: 700 !important;
          box-shadow: 0 1px 5px rgba(22, 163, 74, 0.25) !important;
          border-radius: 40px !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .business-page-wrapper .biz-btn-secondary {
          padding: 10px 20px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          border-radius: 40px !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        .biz-hero { animation: fadeUp 0.7s ease both; }
        .biz-card { transition: all 0.25s ease; }
        .biz-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.10) !important; }
        .cat-pill { transition: all 0.18s ease; }
        .search-input:focus { outline: none; border-color: #16A34A !important; box-shadow: 0 0 0 3px rgba(0,200,83,0.12); }
      `}</style>

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg,#18181B 60%,#1a2e1a 100%)", padding: "90px 6% 80px", textAlign: "center" }}>
        <div className="biz-hero" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.3)", borderRadius: 40, padding: "6px 18px", marginBottom: 28 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#16A34A"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span style={{ color: "#16A34A", fontSize: 13, fontWeight: 600 }}>Business Directory</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.15, marginBottom: 20 }}>
            Discover businesses<br />
            <span style={{ color: "#16A34A" }}>powered by MessBee</span>
          </h1>
          <p style={{ fontSize: 18, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 40 }}>
            Browse real businesses using MessBee to grow their customer relationships, automate conversations, and drive more revenue — every single day.
          </p>
          {/* Search */}
          <div style={{ display: "flex", maxWidth: 520, margin: "0 auto", background: "rgba(255,255,255,0.06)", borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)", overflow: "hidden", padding: "6px 6px 6px 20px", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="search-input" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, category, or city…"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 15, color: "#F3F4F6", caretColor: "#16A34A" }} />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>✕</button>
            )}
            <button className="biz-btn-primary" style={{ background: "#16A34A", color: "#FFFFFF" }}>Search</button>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section style={{ background: "#F9FAFB", padding: "36px 6%", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {[{ v: "12,000+", l: "Listed Businesses" }, { v: "50+", l: "Industries" }, { v: "60+", l: "Cities" }, { v: "4.9★", l: "Average Rating" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#16A34A" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <section style={{ padding: "40px 6% 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className="cat-pill" onClick={() => setActiveCategory(cat)} style={{
                padding: "9px 20px", borderRadius: 40, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: activeCategory === cat ? "#16A34A" : "#F3F4F6",
                color: activeCategory === cat ? "#FFFFFF" : "#374151",
                border: activeCategory === cat ? "none" : "1px solid #E5E7EB",
                boxShadow: activeCategory === cat ? "0 4px 16px rgba(0,200,83,0.35)" : "none",
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* ── BUSINESS GRID ── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>No businesses found</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your search or category filter</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24, marginBottom: 80 }}>
              {filtered.map((b, i) => (
                <div key={i} className="biz-card" style={{
                  background: "#FFFFFF", borderRadius: 18, padding: 28, border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "pointer",
                }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: b.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#FFFFFF", flexShrink: 0 }}>
                      {b.initials}
                    </div>
                    <div>
                      <div className="biz-card-title" style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{b.name}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(0,200,83,0.10)", color: "#00a844", borderRadius: 20, padding: "3px 10px" }}>{b.category}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, background: "#F3F4F6", color: "#6B7280", borderRadius: 20, padding: "3px 10px" }}>📍 {b.location}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.65 }}>{b.desc}</p>
                  <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#FBBF24", fontSize: 14 }}>★</span>)}
                    </div>
                    <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 4 }}>MessBee Verified</span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", marginLeft: "auto" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIST YOUR BUSINESS CTA ── */}
      <section style={{ padding: "80px 6%", background: "linear-gradient(135deg,#18181B,#1a2e1a)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#FFFFFF", marginBottom: 16 }}>
            List your business — <span style={{ color: "#16A34A" }}>it's free</span>
          </h2>
          <p style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 36, lineHeight: 1.7 }}>
            Already using MessBee? Get discovered by thousands of new customers in your city and industry. Takes less than 2 minutes.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="biz-btn-primary" onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")} style={{ background: "#16A34A", color: "#FFFFFF" }}>
              List my business
            </button>
            <button className="biz-btn-secondary" onClick={() => navigate("/about")} style={{ color: "#E4E4E7" }}>
              Learn about us
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
};

export default BusinessPage;
