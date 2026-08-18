import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  // Contact Support Modal
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportForm, setSupportForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [supportStatus, setSupportStatus] = useState("idle"); // idle | submitting | success | error

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    setSupportStatus("submitting");
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supportForm),
      });
      const data = await res.json();
      if (res.ok) {
        setSupportStatus("success");
        setSupportForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => { setSupportStatus("idle"); setShowSupportModal(false); }, 3000);
      } else {
        setSupportStatus("error");
        setTimeout(() => setSupportStatus("idle"), 3000);
        console.error("Support form error:", data.message);
      }
    } catch (err) {
      setSupportStatus("error");
      setTimeout(() => setSupportStatus("idle"), 3000);
      console.error("Support submit failed:", err);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = ["All", "Guides", "Videos", "API Docs", "Templates", "Product Updates"];
  const searchTags = [
    "Getting Started",
    "API",
    "WhatsApp",
    "CRM",
    "Billing",
    "AI",
    "Marketing",
    "Automation",
    "Integrations",
    "Security"
  ];

  const resourceCards = [
    {
      id: 1,
      category: "Guides",
      tag: "Getting Started",
      title: "Complete WhatsApp Business API Setup Guide",
      desc: "Learn how to connect your Meta Business Manager, verify phone numbers, and get approved for high-volume WhatsApp broadcasting in 15 minutes.",
      readTime: "8 min read",
      icon: "🚀",
      badgeColor: "#16A34A",
      badgeBg: "#E6F9EE"
    },
    {
      id: 2,
      category: "Videos",
      tag: "Tutorial",
      title: "Building Your First AI Chatbot Flow",
      desc: "Watch step-by-step video instructions to build interactive multi-choice chatbots, automated reply rules, and agent assignment workflows.",
      readTime: "12 min video",
      icon: "🎥",
      badgeColor: "#3B82F6",
      badgeBg: "#EFF6FF"
    },
    {
      id: 3,
      category: "API Docs",
      tag: "Developer",
      title: "REST API & Webhooks Integration Reference",
      desc: "Comprehensive developer documentation for sending messages, receiving incoming webhooks, managing contacts, and tracking delivery status.",
      readTime: "15 min read",
      icon: "⚡",
      badgeColor: "#8B5CF6",
      badgeBg: "#F3E8FF"
    },
    {
      id: 4,
      category: "Templates",
      tag: "Best Practices",
      title: "High-Converting WhatsApp Message Templates",
      desc: "50+ pre-approved WhatsApp utility & marketing templates designed to maximize open rates, click-through rates, and customer responses.",
      readTime: "5 min read",
      icon: "💬",
      badgeColor: "#F59E0B",
      badgeBg: "#FEF3C7"
    },
    {
      id: 5,
      category: "Product Updates",
      tag: "What's New",
      title: "MessBee v3.5: AI Smart Auto-Responders & Analytics",
      desc: "Explore our newest release featuring GPT-4 powered automated customer support, advanced broadcast analytics, and multi-team inbox routing.",
      readTime: "4 min read",
      icon: "📢",
      badgeColor: "#EC4899",
      badgeBg: "#FCE7F3"
    },
    {
      id: 6,
      category: "Guides",
      tag: "Growth Strategy",
      title: "E-commerce Abandoned Cart Recovery via WhatsApp",
      desc: "How leading brands recover up to 35% of abandoned checkout carts using automated WhatsApp payment reminders and personalized discount codes.",
      readTime: "10 min read",
      icon: "🛒",
      badgeColor: "#14B8A6",
      badgeBg: "#CCFBF1"
    }
  ];

  const isSearchActive = searchQuery.trim().length > 0 || activeCategory !== "All";

  const filteredResources = resourceCards.filter((item) => {
    const q = searchQuery.toLowerCase();
    // Match by selected tag pill — checks tag field AND category
    const matchesCategory =
      activeCategory === "All" ||
      item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      item.tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
      item.title.toLowerCase().includes(activeCategory.toLowerCase());
    // Match by free-text search query
    const matchesSearch =
      q === "" ||
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: "Are MessBee learning resources completely free?",
      a: "Yes! All guides, documentation, video tutorials, and template libraries are 100% free for everyone, whether you are a trial user or an enterprise customer."
    },
    {
      q: "How fast can I get my WhatsApp API account approved?",
      a: "With MessBee's guided setup, Meta Business verification usually takes between 10 minutes to a few hours. Our support team assists you at every step."
    },
    {
      q: "Can I request custom integration documentation?",
      a: "Absoluty. If you need help integrating MessBee with custom CRMs or ERPs, our developer support team provides customized code samples and API support."
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#111827", background: "#FFFFFF", minHeight: "100vh" }}>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <Navbar />

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section style={{
        marginTop: 70,
        padding: "90px 6% 110px",
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Top Right Light Green Circle Aura */}
        <div style={{
          position: "absolute",
          top: -160,
          right: -100,
          width: 750,
          height: 750,
          borderRadius: "50%",
          background: "radial-gradient(circle, #F0FDF4 0%, #E6F9EE 45%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        {/* Bottom Left Soft Glow */}
        <div style={{
          position: "absolute",
          bottom: -180,
          left: -120,
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, #F0FDF4 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justify: "space-between", gap: "4vw", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          
          {/* Left Content Column */}
          <div style={{ flex: "1 1 540px", minWidth: 320 }}>
            
            {/* Pill Badge */}
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 16px",
              borderRadius: 30,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1px",
              marginBottom: 24,
              textTransform: "uppercase"
            }}>
              RESOURCES
            </div>

            {/* Main Title */}
            <h1 style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#0F172A",
              letterSpacing: "-1.5px",
              marginBottom: 24
            }}>
              Everything You Need<br />
              to <span style={{ color: "#10B981" }}>Learn, Launch &</span><br />
              <span style={{ color: "#10B981" }}>Grow</span> with MessBee
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 16,
              color: "#475569",
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 540,
              fontWeight: 400
            }}>
              Explore comprehensive guides, tutorials, documentation, videos, product updates, and expert insights to help you get the most out of MessBee.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
              <button 
                onClick={() => document.getElementById("search-filter")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                background: "#10B981",
                color: "#FFFFFF",
                border: "none",
                padding: "14px 28px",
                borderRadius: 40,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
                transition: "all 0.2s"
              }} onMouseOver={(e) => e.currentTarget.style.background = "#059669"} onMouseOut={(e) => e.currentTarget.style.background = "#10B981"}>
                Explore Resources
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                onClick={() => setShowSupportModal(true)}
                style={{
                  background: "#FFFFFF",
                  color: "#0F172A",
                  border: "1px solid #E2E8F0",
                  padding: "14px 28px",
                  borderRadius: 40,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#F8FAFC"}
                onMouseOut={(e) => e.currentTarget.style.background = "#FFFFFF"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Contact Support
              </button>
            </div>

            {/* Feature Checkmarks Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              {[
                "Beginner Friendly",
                "Updated Regularly",
                "Free Learning Resources"
              ].map((feat, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#E6F9EE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Column - Graphic Mockup Container */}
          <div style={{ flex: "1 1 540px", minWidth: 320, position: "relative", minHeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Main Window Container */}
            <div style={{
              width: "100%",
              maxWidth: 540,
              background: "#FFFFFF",
              borderRadius: 32,
              border: "1.5px solid #F1F5F9",
              boxShadow: "0 30px 70px -15px rgba(0, 0, 0, 0.07), 0 10px 30px -5px rgba(0,0,0,0.02)",
              overflow: "hidden",
              position: "relative",
              zIndex: 5
            }}>
              {/* Window Header / Address Bar */}
              <div style={{ background: "#FFFFFF", borderBottom: "1.5px solid #F1F5F9", padding: "16px 28px", display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
                  messbee.com/getting-started
                </div>
              </div>

              {/* Window Body Layout */}
              <div style={{ display: "flex", padding: 28, gap: 24, minHeight: 300 }}>
                {/* Sidebar Navigation */}
                <div style={{
                  width: 140,
                  background: "#F8FAFC",
                  borderRadius: 24,
                  padding: "16px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8
                }}>
                  {[
                    { title: "Getting Started", active: true },
                    { title: "WhatsApp API", active: false },
                    { title: "CRM", active: false },
                    { title: "Automation", active: false },
                    { title: "Integrations", active: false },
                    { title: "Security", active: false }
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "8px 14px",
                      borderRadius: 30,
                      background: item.active ? "#DCFCE7" : "transparent",
                      color: item.active ? "#16A34A" : "#94A3B8",
                      fontSize: 12,
                      fontWeight: item.active ? 700 : 600
                    }}>
                      {item.title}
                    </div>
                  ))}
                </div>

                {/* Main Content Preview Area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, paddingTop: 6 }}>
                  {/* Dark Top Title Line */}
                  <div style={{ width: "65%", height: 16, background: "#0F172A", borderRadius: 8 }} />
                  <div style={{ width: "95%", height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                  <div style={{ width: "80%", height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                  
                  {/* Highlighted Green Outlined Container */}
                  <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 20, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 4, background: "#16A34A" }} />
                      <div style={{ width: "55%", height: 10, background: "#16A34A", borderRadius: 5 }} />
                    </div>
                    <div style={{ width: "95%", height: 8, background: "#86EFAC", borderRadius: 4 }} />
                    <div style={{ width: "75%", height: 8, background: "#86EFAC", borderRadius: 4 }} />
                  </div>

                  {/* Stat Capsules / Bottom Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "14px", display: "flex", flexDirection: "column", gap: 8, background: "#FFFFFF" }}>
                      <div style={{ width: "75%", height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                      <div style={{ width: "45%", height: 8, background: "#F1F5F9", borderRadius: 4 }} />
                    </div>
                    <div style={{ border: "1.5px solid #E2E8F0", borderRadius: 18, padding: "14px", display: "flex", flexDirection: "column", gap: 8, background: "#FFFFFF" }}>
                      <div style={{ width: "55%", height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                      <div style={{ width: "35%", height: 8, background: "#F1F5F9", borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element 1 (Top Left) - AI Assistant */}
            <div style={{
              position: "absolute",
              top: -30,
              left: -40,
              background: "#FFFFFF",
              borderRadius: 22,
              padding: "20px 24px",
              boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
              border: "1px solid #E2E8F0",
              zIndex: 12,
              minWidth: 200
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "#F3E8FF", color: "#9333EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  🤖
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>AI Assistant</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: 140, height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                <div style={{ width: 100, height: 8, background: "#E2E8F0", borderRadius: 4 }} />
                <div style={{ width: 65, height: 8, background: "#DCFCE7", borderRadius: 4 }} />
              </div>
            </div>

            {/* Floating Element 2 (Top Right) - Course Progress */}
            <div style={{
              position: "absolute",
              top: 220,
              right: -35,
              background: "#FFFFFF",
              borderRadius: 22,
              padding: "20px 22px",
              boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
              border: "1px solid #E2E8F0",
              zIndex: 13,
              width: 180
            }}>
              <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, marginBottom: 12 }}>Course Progress</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                <div style={{ width: "100%", height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "78%", height: "100%", background: "#10B981", borderRadius: 4 }} />
                </div>
                <div style={{ width: "100%", height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "45%", height: "100%", background: "#3B82F6", borderRadius: 4 }} />
                </div>
                <div style={{ width: "100%", height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "88%", height: "100%", background: "#8B5CF6", borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>75% Complete</div>
            </div>

            {/* Floating Element 3 (Bottom Right) - Video Guide Card */}
            <div style={{
              position: "absolute",
              bottom: -30,
              right: -20,
              background: "#FFFFFF",
              borderRadius: 26,
              padding: 14,
              boxShadow: "0 25px 55px rgba(0,0,0,0.12)",
              border: "1px solid #E2E8F0",
              zIndex: 12,
              width: 230
            }}>
              <div style={{ background: "linear-gradient(135deg, #0A192F 0%, #0F2537 100%)", height: 115, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 13 }}>
                  ▶
                </div>
                <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10, color: "#FFFFFF", fontWeight: 700, background: "rgba(0,0,0,0.4)", padding: "2px 6px", borderRadius: 4 }}>4:32</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 2 }}>Getting Started Guide</div>
              <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>1,240 views</div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════ SEARCH & FILTER SECTION ═══════════════ */}
      <section id="search-filter" style={{ padding: "80px 6%", background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          
          {/* Section Heading */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 12, letterSpacing: "-1px" }}>
              Find What You're Looking For
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
              Search across all guides, docs, tutorials, and FAQs
            </p>
          </div>

          {/* Search Bar Input */}
          <div style={{ maxWidth: 720, margin: "0 auto 12px", width: "100%" }}>
            <input
              type="text"
              placeholder="Search guides, documentation, blogs, tutorials, FAQs..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); if (!e.target.value) setActiveCategory("All"); }}
              style={{
                width: "100%",
                padding: "18px 32px",
                borderRadius: 50,
                border: "1.5px solid #E2E8F0",
                background: "#FFFFFF",
                fontSize: 15,
                color: "#0F172A",
                outline: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#10B981"}
              onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
            />
          </div>

          {/* Live search feedback */}
          {searchQuery && (
            <div style={{ maxWidth: 720, margin: "0 auto 24px", display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-start", paddingLeft: 8 }}>
              <span style={{ fontSize: 13, color: "#64748B" }}>Showing results for:</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#E6F9EE", color: "#10B981", border: "1px solid #A7F3D0", borderRadius: 20, padding: "3px 12px", fontSize: 13, fontWeight: 700 }}>
                {searchQuery}
                <span
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  style={{ cursor: "pointer", fontWeight: 900, fontSize: 15, lineHeight: 1, color: "#059669" }}
                  title="Clear search"
                >×</span>
              </span>
            </div>
          )}

          {/* Tag Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, maxWidth: 800, margin: "0 auto" }}>
            {searchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const newTag = activeCategory === tag ? "All" : tag;
                  setActiveCategory(newTag);
                  setSearchQuery(newTag === "All" ? "" : tag);
                  document.getElementById("search-filter")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  background: activeCategory === tag ? "#10B981" : "#FFFFFF",
                  color: activeCategory === tag ? "#FFFFFF" : "#475569",
                  border: activeCategory === tag ? "1.5px solid #10B981" : "1.5px solid #E2E8F0",
                  padding: "8px 22px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.01)",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
                onMouseOver={(e) => {
                  if (activeCategory !== tag) {
                    e.currentTarget.style.borderColor = "#10B981";
                    e.currentTarget.style.color = "#10B981";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeCategory !== tag) {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#475569";
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════ SEARCH RESULTS (shown when searching) ═══════════════ */}
      {isSearchActive && (
        <section style={{ padding: "48px 6%", background: "#FFFFFF", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* Results header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.5px" }}>
                  {filteredResources.length > 0
                    ? `${filteredResources.length} result${filteredResources.length !== 1 ? "s" : ""} found`
                    : "No results found"}
                </h2>
                {searchQuery && (
                  <p style={{ fontSize: 13, color: "#94A3B8", margin: "4px 0 0", fontWeight: 500 }}>
                    for "{searchQuery}"
                  </p>
                )}
              </div>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                style={{
                  background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0",
                  borderRadius: 20, padding: "7px 18px", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#F1F5F9"}
                onMouseOut={(e) => e.currentTarget.style.background = "#F8FAFC"}
              >
                ✕ Clear
              </button>
            </div>

            {/* Results grid */}
            {filteredResources.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20
              }}>
                {filteredResources.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #F1F5F9",
                      borderRadius: 20,
                      padding: "24px 22px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.08)";
                      e.currentTarget.style.borderColor = "#A7F3D0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)";
                      e.currentTarget.style.borderColor = "#F1F5F9";
                    }}
                  >
                    {/* Top row: emoji + badges */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: card.badgeBg,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                      }}>
                        {card.icon}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{
                          background: card.badgeBg, color: card.badgeColor,
                          padding: "3px 11px", borderRadius: 20, fontSize: 11, fontWeight: 700
                        }}>
                          {card.tag}
                        </span>
                        <span style={{
                          background: "#F8FAFC", color: "#64748B",
                          padding: "3px 11px", borderRadius: 20, fontSize: 11, fontWeight: 600
                        }}>
                          {card.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.4, letterSpacing: "-0.3px" }}>
                      {card.title}
                    </h3>

                    {/* Desc */}
                    <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                      {card.desc}
                    </p>

                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>⏱ {card.readTime}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>Read →</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>No resources found</h3>
                <p style={{ fontSize: 15, color: "#64748B", marginBottom: 24 }}>
                  Try a different keyword or browse categories below
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  style={{
                    background: "#10B981", color: "#FFFFFF", border: "none",
                    borderRadius: 30, padding: "12px 28px", fontSize: 14, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit"
                  }}
                >
                  Clear & Browse All
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ BROWSE BY CATEGORY SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#FFFFFF", position: "relative" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              CATEGORIES
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-1px",
              marginBottom: 12
            }}>
              Browse by Category
            </h2>
            <p style={{
              fontSize: 16,
              color: "#64748B",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              fontWeight: 400
            }}>
              All the resources you need, organized for easy discovery.
            </p>
          </div>

          {/* 5 Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22,
            alignItems: "stretch"
          }}>

            {/* ── CARD 1: Getting Started ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)";
            }}>
              {/* Top accent bar */}
              <div style={{ height: 6, background: "#10B981" }} />
              
              <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  {/* Icon & Count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E6F9EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      🚀
                    </div>
                    <span style={{ background: "#E6F9EE", color: "#10B981", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      24
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                    Getting Started
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>
                    Everything you need to launch your business with MessBee.
                  </p>

                  {/* Micro Graphic Preview */}
                  <div style={{ background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 16, padding: 14, marginBottom: 20, minHeight: 96, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                      <div style={{ flex: 1, height: 8, background: "#10B981", borderRadius: 4 }} />
                    </div>
                    <div style={{ width: "85%", height: 6, background: "#A7F3D0", borderRadius: 3, marginLeft: 16 }} />
                    <div style={{ width: "95%", height: 6, background: "#E2E8F0", borderRadius: 3, marginLeft: 16 }} />
                    <div style={{ width: "65%", height: 6, background: "#E2E8F0", borderRadius: 3, marginLeft: 16 }} />
                  </div>

                  {/* Bullet list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Quick Start Guide", "Product Tour", "Setup Guide", "Video Tutorials"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => navigate("/docs?section=api")}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#E6F9EE",
                    color: "#10B981",
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#D1FAE5"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#E6F9EE"}
                >
                  View All &nbsp;&gt;
                </button>
              </div>
            </div>

            {/* ── CARD 2: Learn ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)";
            }}>
              {/* Top accent bar */}
              <div style={{ height: 6, background: "#3B82F6" }} />
              
              <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  {/* Icon & Count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      📚
                    </div>
                    <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      86
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                    Learn
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>
                    Improve your business knowledge with expert content.
                  </p>

                  {/* Micro Graphic Preview */}
                  <div style={{ background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 16, padding: 10, marginBottom: 20, minHeight: 96, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#3B82F6", fontSize: 12 }}>📄</span> Business Growth 101
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#3B82F6", fontSize: 12 }}>📄</span> WhatsApp Marketing
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#3B82F6", fontSize: 12 }}>📄</span> CRM Best Practices
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Blog", "Business Guides", "Industry Insights", "Webinars"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => navigate("/docs?section=crm")}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#EFF6FF",
                    color: "#3B82F6",
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#DBEAFE"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#EFF6FF"}
                >
                  View All &nbsp;&gt;
                </button>
              </div>
            </div>

            {/* ── CARD 3: Support ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)";
            }}>
              {/* Top accent bar */}
              <div style={{ height: 6, background: "#F59E0B" }} />
              
              <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  {/* Icon & Count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      💬
                    </div>
                    <span style={{ background: "#FEF3C7", color: "#D97706", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      340
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                    Support
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>
                    Get help whenever you need it, 24×7.
                  </p>

                  {/* Micro Graphic Preview */}
                  <div style={{ background: "#FFFBEB", border: "1px solid #FEF3C7", borderRadius: 16, padding: 10, marginBottom: 20, minHeight: 96, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                    <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "5px 10px", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#059669" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
                      System Status: All Good
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, textAlign: "center" }}>
                      <div style={{ background: "#FFFFFF", padding: "4px 2px", borderRadius: 8, border: "1px solid #FEF3C7" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#D97706" }}>12</div>
                        <div style={{ fontSize: 9, color: "#92400E", fontWeight: 500 }}>Open</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "4px 2px", borderRadius: 8, border: "1px solid #FEF3C7" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#D97706" }}>4h</div>
                        <div style={{ fontSize: 9, color: "#92400E", fontWeight: 500 }}>Avg. Reply</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "4px 2px", borderRadius: 8, border: "1px solid #FEF3C7" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#D97706" }}>98%</div>
                        <div style={{ fontSize: 9, color: "#92400E", fontWeight: 500 }}>CSAT</div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Help Center", "FAQs", "Raise a Ticket", "System Status"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => navigate("/docs?section=whatsapp")}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#FEF3C7",
                    color: "#D97706",
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#FDE68A"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#FEF3C7"}
                >
                  View All &nbsp;&gt;
                </button>
              </div>
            </div>

            {/* ── CARD 4: Updates ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)";
            }}>
              {/* Top accent bar */}
              <div style={{ height: 6, background: "#8B5CF6" }} />
              
              <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  {/* Icon & Count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      ✨
                    </div>
                    <span style={{ background: "#F3E8FF", color: "#8B5CF6", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      48
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                    Updates
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>
                    Stay informed about the latest product improvements.
                  </p>

                  {/* Micro Graphic Preview */}
                  <div style={{ background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 16, padding: 10, marginBottom: 20, minHeight: 96, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748B", fontWeight: 600, fontSize: 10 }}>v3.4.0</span>
                      <span style={{ fontWeight: 600, color: "#1E293B", fontSize: 10 }}>AI Automation</span>
                      <span style={{ background: "#F3E8FF", color: "#8B5CF6", padding: "2px 6px", borderRadius: 10, fontSize: 9, fontWeight: 700 }}>New</span>
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748B", fontWeight: 600, fontSize: 10 }}>v3.3.2</span>
                      <span style={{ fontWeight: 600, color: "#1E293B", fontSize: 10 }}>WhatsApp Rows</span>
                      <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "2px 6px", borderRadius: 10, fontSize: 9, fontWeight: 700 }}>Update</span>
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#64748B", fontWeight: 600, fontSize: 10 }}>v3.3.0</span>
                      <span style={{ fontWeight: 600, color: "#1E293B", fontSize: 10 }}>CRM Redesign</span>
                      <span style={{ background: "#F3E8FF", color: "#8B5CF6", padding: "2px 6px", borderRadius: 10, fontSize: 9, fontWeight: 700 }}>New</span>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {["What's New", "Release Notes", "Roadmap", "Changelog"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => navigate("/docs?section=automation")}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#F3E8FF",
                    color: "#8B5CF6",
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#E9D5FF"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#F3E8FF"}
                >
                  View All &nbsp;&gt;
                </button>
              </div>
            </div>

            {/* ── CARD 5: Downloads ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)";
            }}>
              {/* Top accent bar */}
              <div style={{ height: 6, background: "#EC4899" }} />
              
              <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  {/* Icon & Count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FCE7F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      📥
                    </div>
                    <span style={{ background: "#FCE7F3", color: "#EC4899", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      18
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                    Downloads
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 20, minHeight: 38 }}>
                    Download everything you need for your business.
                  </p>

                  {/* Micro Graphic Preview */}
                  <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 16, padding: 10, marginBottom: 20, minHeight: 96, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #FFE4E6", borderRadius: 20, padding: "5px 10px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#EC4899", fontSize: 11 }}>📥</span>
                        <span style={{ color: "#475569", fontWeight: 600, fontSize: 10 }}>Product Brochure.pdf</span>
                      </div>
                      <span style={{ fontSize: 9, color: "#94A3B8" }}>2.4 MB</span>
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #FFE4E6", borderRadius: 20, padding: "5px 10px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#EC4899", fontSize: 11 }}>📥</span>
                        <span style={{ color: "#475569", fontWeight: 600, fontSize: 10 }}>Security Guide.pdf</span>
                      </div>
                      <span style={{ fontSize: 9, color: "#94A3B8" }}>1.0 MB</span>
                    </div>
                    <div style={{ background: "#FFFFFF", border: "1px solid #FFE4E6", borderRadius: 20, padding: "5px 10px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#EC4899", fontSize: 11 }}>📥</span>
                        <span style={{ color: "#475569", fontWeight: 600, fontSize: 10 }}>Brand Kit.zip</span>
                      </div>
                      <span style={{ fontSize: 9, color: "#94A3B8" }}>12 MB</span>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Product Brochure", "Security & Compliance", "Brand Assets", "Product Overview"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#334155" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EC4899", display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => navigate("/docs?section=security")}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: "#FCE7F3",
                    color: "#EC4899",
                    border: "none",
                    borderRadius: 30,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#FBCFE8"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#FCE7F3"}
                >
                  View All &nbsp;&gt;
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ POPULAR RESOURCES SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Section Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{
                display: "inline-block",
                background: "#E6F9EE",
                color: "#10B981",
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.8px",
                marginBottom: 12,
                textTransform: "uppercase"
              }}>
                FEATURED
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-1px",
                margin: 0
              }}>
                Popular Resources
              </h2>
            </div>

            {/* View All Link */}
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#10B981",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
            onClick={() => navigate("/docs")}
            onMouseOver={(e) => e.currentTarget.style.color = "#059669"}
            onMouseOut={(e) => e.currentTarget.style.color = "#10B981"}>
              View All &nbsp;&rarr;
            </span>
          </div>

          {/* 3-Column Grid for Cards (Strictly 3 cards per row on desktop) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 26,
            alignItems: "stretch"
          }}>

            {/* Card 1: Blog */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=whatsapp")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              {/* Card Cover Image */}
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#0F172A"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80"
                  alt="WhatsApp Setup"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Badge top-left */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "#10B981",
                  color: "#FFFFFF",
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  Blog
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" }}>
                    How to Set Up WhatsApp Business API in 10 Minutes
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                    A step-by-step guide to connecting your business to WhatsApp Business API using MessBee.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#EEF2F6", color: "#64748B", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        PN
                      </div>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>Priya Nair</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      🕒 6 min read
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More &nbsp;&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Business Guide */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=crm")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              {/* Card Cover Image */}
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#1E3A8A"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="CRM Playbook"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "#3B82F6",
                  color: "#FFFFFF",
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  Business Guide
                </span>
              </div>

              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" }}>
                    The Ultimate CRM Playbook for Growing Businesses
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                    Learn how to manage leads, pipelines, and customer relationships using MessBee CRM.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#EFF6FF", color: "#3B82F6", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        RM
                      </div>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>Rahul Mehta</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      🕒 12 min read
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More &nbsp;&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Webinar */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=automation")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              {/* Card Cover Image */}
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#4C1D95",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="AI Automation Webinar"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "#8B5CF6",
                  color: "#FFFFFF",
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  Webinar
                </span>
                {/* Play Button Overlay */}
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
              </div>

              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" }}>
                    AI Automation for Retail Businesses – Live Session
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                    Watch our expert webinar on automating customer engagement for retail and grocery stores.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#F3E8FF", color: "#8B5CF6", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        AS
                      </div>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>Anjali Singh</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      🕒 48 min watch
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#8B5CF6", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More &nbsp;&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Customer Story */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=crm")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              {/* Card Cover Image */}
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#7C2D12"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                  alt="FreshMart Customer Story"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "#F59E0B",
                  color: "#FFFFFF",
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  Customer Story
                </span>
              </div>

              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" }}>
                    How FreshMart Scaled from 1 to 120 Stores with MessBee
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                    Learn how FreshMart automated customer engagement and increased repeat orders by 240%.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#FEF3C7", color: "#D97706", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        MT
                      </div>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>MessBee Team</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      🕒 8 min read
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#D97706", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More &nbsp;&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Documentation */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=api")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              {/* Card Cover Image */}
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#042F2E"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="API Documentation"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "#0D9488",
                  color: "#FFFFFF",
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  Documentation
                </span>
              </div>

              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" }}>
                    MessBee REST API Reference – v3.4
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                    Complete API reference for developers building integrations with the MessBee platform.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#CCFBF1", color: "#0D9488", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        DT
                      </div>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>Dev Team</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      🕒 Docs
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0D9488", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More &nbsp;&gt;
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ VIDEO LEARNING SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Section Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{
                display: "inline-block",
                background: "#E6F9EE",
                color: "#10B981",
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.8px",
                marginBottom: 12,
                textTransform: "uppercase"
              }}>
                VIDEO
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-1px",
                margin: 0
              }}>
                Video Learning
              </h2>
            </div>

            {/* YouTube Channel Link */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#10B981",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "#059669"}
              onMouseOut={(e) => e.currentTarget.style.color = "#10B981"}
            >
              YouTube Channel &nbsp;&#x2197;
            </a>
          </div>

          {/* 3-Column Grid for 6 Video Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 26,
            alignItems: "stretch"
          }}>

            {/* ── CARD 1: MessBee Product Tour ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
                  alt="MessBee Product Tour"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#10B981",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(16,185,129,0.8)"
                }} />
                {/* Play Button Overlay */}
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                {/* Bottom Right Duration Badge */}
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  4:32
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  MessBee Product Tour
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 12.4K views
                </div>
              </div>
            </div>

            {/* ── CARD 2: Getting Started in 10 Min ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#1E3A8A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Getting Started in 10 Min"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#3B82F6",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(59,130,246,0.8)"
                }} />
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  9:48
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  Getting Started in 10 Min
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 8.2K views
                </div>
              </div>
            </div>

            {/* ── CARD 3: WhatsApp API Setup Guide ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80"
                  alt="WhatsApp API Setup Guide"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#10B981",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(16,185,129,0.8)"
                }} />
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  14:20
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  WhatsApp API Setup Guide
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 6.9K views
                </div>
              </div>
            </div>

            {/* ── CARD 4: Automation Workflows Deep-Dive ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#4C1D95",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                  alt="Automation Workflows Deep-Dive"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#8B5CF6",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(139,92,246,0.8)"
                }} />
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  22:15
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  Automation Workflows Deep-Dive
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 4.8K views
                </div>
              </div>
            </div>

            {/* ── CARD 5: CRM Setup & Pipeline Config ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#7C2D12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="CRM Setup & Pipeline Config"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#F59E0B",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(245,158,11,0.8)"
                }} />
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  18:04
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  CRM Setup & Pipeline Config
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 3.6K views
                </div>
              </div>
            </div>

            {/* ── CARD 6: Campaign Management Masterclass ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div style={{
                height: 190,
                position: "relative",
                overflow: "hidden",
                background: "#831843",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Campaign Management Masterclass"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Top Left Colored Dot */}
                <span style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#EC4899",
                  zIndex: 2,
                  boxShadow: "0 0 10px rgba(236,72,153,0.8)"
                }} />
                <div style={{
                  position: "absolute",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(6px)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 16,
                  zIndex: 2
                }}>
                  ▶
                </div>
                <span style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  31:50
                </span>
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6, letterSpacing: "-0.2px" }}>
                  Campaign Management Masterclass
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📺</span> 2.9K views
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ DOCUMENTATION SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              DOCS
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-1px",
              marginBottom: 12
            }}>
              Documentation
            </h2>
            <p style={{
              fontSize: 16,
              color: "#64748B",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              fontWeight: 400
            }}>
              Detailed technical reference for every feature, API, and integration.
            </p>
          </div>

          {/* 6 Cards Grid (3 Columns) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 26,
            alignItems: "stretch"
          }}>

            {/* ── CARD 1: API Documentation ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=api")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#E0F2FE", color: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    📄
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    142 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  API Documentation
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  REST API reference, authentication, endpoints, and SDKs.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#0284C7", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=api")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

            {/* ── CARD 2: WhatsApp Business API ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=whatsapp")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#DCFCE7", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    💬
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    68 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  WhatsApp Business API
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  Setup, templates, webhooks, and message types.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#16A34A", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=whatsapp")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

            {/* ── CARD 3: CRM Documentation ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=crm")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    👥
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    94 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  CRM Documentation
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  Contacts, pipelines, tasks, and automation rules.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=crm")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

            {/* ── CARD 4: Integrations ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=integrations")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    🧩
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    56 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  Integrations
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  Zapier, Shopify, Razorpay, Meta, and custom webhooks.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#D97706", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=integrations")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

            {/* ── CARD 5: Automation ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=automation")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#F3E8FF", color: "#9333EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    ⚡
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    78 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  Automation
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  Workflows, triggers, conditions, and action builders.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#9333EA", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=automation")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

            {/* ── CARD 6: Security & Compliance ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate("/docs?section=security")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "#FEE2E2", color: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    🛡️
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                    34 pages
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  Security & Compliance
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                  Data protection, GDPR, encryption, and SSO setup.
                </p>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", display: "flex", alignItems: "center", gap: 6 }} onClick={() => navigate("/docs?section=security")}>
                Read Docs &nbsp;&rarr;
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT UPDATES SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#FFFFFF", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              UPDATES
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-1px",
              marginBottom: 12
            }}>
              Product Updates
            </h2>
            <p style={{
              fontSize: 16,
              color: "#64748B",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              fontWeight: 400
            }}>
              Track what's new, what's improved, and what's coming next.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div style={{ position: "relative", paddingLeft: 40 }}>
            
            {/* Vertical Timeline Line */}
            <div style={{
              position: "absolute",
              top: 20,
              bottom: 20,
              left: 7,
              width: 2,
              background: "#E2E8F0"
            }} />

            {/* ── TIMELINE ITEM 1 ── */}
            <div style={{ position: "relative", marginBottom: 32 }}>
              {/* Timeline Node Dot */}
              <div style={{
                position: "absolute",
                left: -40,
                top: 24,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#10B981",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 0 2px #10B981",
                zIndex: 2
              }} />

              {/* Card Container */}
              <div style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #F1F5F9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                padding: 28,
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
              }}>
                {/* Top Row: Version & Date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>v3.4.0</span>
                    <span style={{ background: "#10B981", color: "#FFFFFF", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      Major Release
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>Jul 15, 2026</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.3px" }}>
                  AI Automation Engine
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                  Fully revamped AI automation with visual workflow builder, natural language triggers, and smart scheduling.
                </p>

                {/* Feature Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Visual Workflow Builder", "NLP Triggers", "Smart Scheduling", "AI Chatbot V2"].map((tag, idx) => (
                    <span key={idx} style={{ background: "#F1F5F9", color: "#475569", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TIMELINE ITEM 2 ── */}
            <div style={{ position: "relative", marginBottom: 32 }}>
              <div style={{
                position: "absolute",
                left: -40,
                top: 24,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#3B82F6",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 0 2px #3B82F6",
                zIndex: 2
              }} />

              <div style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #F1F5F9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                padding: 28,
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>v3.3.2</span>
                    <span style={{ background: "#3B82F6", color: "#FFFFFF", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      Update
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>Jun 28, 2026</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.3px" }}>
                  WhatsApp Flows & Interactive Messages
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                  Support for WhatsApp Flow templates, list messages, quick replies, and reaction tracking.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Flow Templates", "List Messages", "Reaction Tracking"].map((tag, idx) => (
                    <span key={idx} style={{ background: "#F1F5F9", color: "#475569", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TIMELINE ITEM 3 ── */}
            <div style={{ position: "relative", marginBottom: 32 }}>
              <div style={{
                position: "absolute",
                left: -40,
                top: 24,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#10B981",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 0 2px #10B981",
                zIndex: 2
              }} />

              <div style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #F1F5F9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                padding: 28,
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>v3.3.0</span>
                    <span style={{ background: "#10B981", color: "#FFFFFF", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      Major Release
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>Jun 10, 2026</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.3px" }}>
                  CRM Redesign & Mobile App
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                  Complete CRM UI overhaul with Kanban view, deal cards, and the launch of the MessBee mobile app for iOS and Android.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Kanban View", "Deal Cards", "iOS App", "Android App"].map((tag, idx) => (
                    <span key={idx} style={{ background: "#F1F5F9", color: "#475569", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TIMELINE ITEM 4 ── */}
            <div style={{ position: "relative", marginBottom: 40 }}>
              <div style={{
                position: "absolute",
                left: -40,
                top: 24,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#F59E0B",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 0 2px #F59E0B",
                zIndex: 2
              }} />

              <div style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #F1F5F9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                padding: 28,
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>v3.2.4</span>
                    <span style={{ background: "#F59E0B", color: "#FFFFFF", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      Fix
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>May 22, 2026</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10, letterSpacing: "-0.3px" }}>
                  Performance & Stability Improvements
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
                  Message delivery latency reduced by 40%, webhook reliability improved, and analytics dashboard speed doubled.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["40% faster delivery", "Webhook reliability", "2x analytics speed"].map((tag, idx) => (
                    <span key={idx} style={{ background: "#F1F5F9", color: "#475569", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* View Full Changelog Button */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => setActiveCategory("Product Updates")}
              style={{
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1.5px solid #E2E8F0",
                padding: "14px 36px",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#10B981";
                e.currentTarget.style.color = "#10B981";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.color = "#0F172A";
              }}
            >
              View Full Changelog &nbsp;&gt;
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ SUCCESS STORIES / TESTIMONIALS SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              SUCCESS STORIES
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-1px",
              margin: 0
            }}>
              Businesses Thriving with MessBee
            </h2>
          </div>

          {/* 4 Metric Stats Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 44
          }}>
            {/* Stat 1 */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              padding: "28px 20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "#10B981", marginBottom: 4, letterSpacing: "-1px" }}>
                10,000+
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                Businesses
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              padding: "28px 20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "#3B82F6", marginBottom: 4, letterSpacing: "-1px" }}>
                50M+
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                Messages Sent
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              padding: "28px 20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "#8B5CF6", marginBottom: 4, letterSpacing: "-1px" }}>
                98%
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                Customer Satisfaction
              </div>
            </div>

            {/* Stat 4 */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
              padding: "28px 20px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "#F59E0B", marginBottom: 4, letterSpacing: "-1px" }}>
                99.9%
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>
                Platform Uptime
              </div>
            </div>
          </div>

          {/* 3 Success Story Testimonial Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 26,
            alignItems: "stretch"
          }}>

            {/* ── TESTIMONIAL 1 ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                {/* Author Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#10B981", color: "#FFFFFF", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      RM
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Ravi Mehta</div>
                      <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>FreshMart Retail Chain</div>
                    </div>
                  </div>
                  <div style={{ background: "#E6F9EE", color: "#10B981", padding: "4px 10px", borderRadius: 20, textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>+240%</div>
                    <div style={{ fontSize: 9, fontWeight: 600 }}>Online Orders</div>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ color: "#10B981", fontSize: 16, marginBottom: 16 }}>
                  ★★★★★
                </div>

                {/* Quote */}
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
                  "MessBee paid for itself in the first week. WhatsApp sales tripled and our customer engagement score went from 42 to 91."
                </p>
              </div>

              {/* Card Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ background: "#E6F9EE", color: "#10B981", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  Retail
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981", display: "flex", alignItems: "center", gap: 4 }}>
                  View Case Study &nbsp;&gt;
                </span>
              </div>
            </div>

            {/* ── TESTIMONIAL 2 ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#EF4444", color: "#FFFFFF", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      PS
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Dr. Priya Sharma</div>
                      <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>HealthFirst Clinics</div>
                    </div>
                  </div>
                  <div style={{ background: "#FEE2E2", color: "#EF4444", padding: "4px 10px", borderRadius: 20, textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>+85%</div>
                    <div style={{ fontSize: 9, fontWeight: 600 }}>Appointments</div>
                  </div>
                </div>

                <div style={{ color: "#EF4444", fontSize: 16, marginBottom: 16 }}>
                  ★★★★★
                </div>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
                  "Automated reminders cut no-shows by 60%. The AI assistant handles 70% of patient queries without any manual effort."
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ background: "#FEE2E2", color: "#EF4444", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  Healthcare
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", display: "flex", alignItems: "center", gap: 4 }}>
                  View Case Study &nbsp;&gt;
                </span>
              </div>
            </div>

            {/* ── TESTIMONIAL 3 ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#3B82F6", color: "#FFFFFF", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      AK
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Arun Kumar</div>
                      <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>LearnSphere Institute</div>
                    </div>
                  </div>
                  <div style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 10px", borderRadius: 20, textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>+320%</div>
                    <div style={{ fontSize: 9, fontWeight: 600 }}>Lead Conversions</div>
                  </div>
                </div>

                <div style={{ color: "#3B82F6", fontSize: 16, marginBottom: 16 }}>
                  ★★★★★
                </div>

                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
                  "From enquiry to enrollment is fully automated. We handle 10x more students with the same 4-person admissions team."
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  Education
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6", display: "flex", alignItems: "center", gap: 4 }}>
                  View Case Study &nbsp;&gt;
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ SUPPORT OPTIONS SECTION ═══════════════ */}
      <section style={{ padding: "80px 4%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{
              display: "inline-block",
              background: "#E6F9EE",
              color: "#10B981",
              padding: "6px 18px",
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              SUPPORT
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-1px",
              marginBottom: 12
            }}>
              Can't Find What You're Looking For?
            </h2>
            <p style={{
              fontSize: 16,
              color: "#64748B",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.5,
              fontWeight: 400
            }}>
              Our team is here to help you get the answers you need, fast.
            </p>
          </div>

          {/* 5 Support Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
            alignItems: "stretch"
          }}>

            {/* ── CARD 1: Live Chat ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: "32px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#DCFCE7", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                  💬
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Live Chat
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  Chat with our support team in real-time.
                </p>
              </div>

              <button style={{
                width: "100%",
                padding: "11px 0",
                background: "#E6F9EE",
                color: "#10B981",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#D1FAE5"}
              onMouseOut={(e) => e.currentTarget.style.background = "#E6F9EE"}>
                Start Chat
              </button>
            </div>

            {/* ── CARD 2: Email Support ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: "32px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#EFF6FF", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                  ✉️
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Email Support
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  Send us a detailed message and we'll respond within 4 hours.
                </p>
              </div>

              <button style={{
                width: "100%",
                padding: "11px 0",
                background: "#EFF6FF",
                color: "#2563EB",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#DBEAFE"}
              onMouseOut={(e) => e.currentTarget.style.background = "#EFF6FF"}>
                Send Email
              </button>
            </div>

            {/* ── CARD 3: Help Center ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: "32px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                  🛟
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Help Center
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  Browse 340+ articles for self-serve answers.
                </p>
              </div>

              <button style={{
                width: "100%",
                padding: "11px 0",
                background: "#FEF3C7",
                color: "#D97706",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#FDE68A"}
              onMouseOut={(e) => e.currentTarget.style.background = "#FEF3C7"}>
                Browse Help
              </button>
            </div>

            {/* ── CARD 4: Raise a Ticket ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: "32px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#F3E8FF", color: "#9333EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                  🎫
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Raise a Ticket
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  Submit a support ticket and track its status.
                </p>
              </div>

              <button style={{
                width: "100%",
                padding: "11px 0",
                background: "#F3E8FF",
                color: "#9333EA",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#E9D5FF"}
              onMouseOut={(e) => e.currentTarget.style.background = "#F3E8FF"}>
                Open Ticket
              </button>
            </div>

            {/* ── CARD 5: Book Onboarding ── */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid #F1F5F9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              padding: "32px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
            }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "#FCE7F3", color: "#DB2777", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                  📅
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Book Onboarding
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  Schedule a 1-on-1 session with a MessBee expert.
                </p>
              </div>

              <button style={{
                width: "100%",
                padding: "11px 0",
                background: "#FCE7F3",
                color: "#DB2777",
                border: "none",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#FBCFE8"}
              onMouseOut={(e) => e.currentTarget.style.background = "#FCE7F3"}>
                Book Session
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER SECTION: START GROWING WITH MESSBEE ═══════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        padding: "100px 6%",
        position: "relative",
        overflow: "hidden",
        color: "#FFFFFF"
      }}>
        {/* Background Decorative Circles */}
        <div style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: -100,
          right: 80,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          top: 40,
          right: 320,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.06)",
          pointerEvents: "none"
        }} />

        {/* Right Floating Glassmorphism Widget (Matching UI Screenshot) */}
        <div style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 20,
          padding: "20px 24px",
          width: 200,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          zIndex: 3
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#FFFFFF" }}>
            <span>📖</span> Resources
          </div>
          <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 2.0, color: "#FFFFFF" }}>
            <div>• Getting Started</div>
            <div>• API Docs</div>
            <div>• Video Tutorials</div>
          </div>
        </div>

        {/* Main Center Content */}
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          
          {/* Overlapping Avatars & Trust Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            padding: "6px 20px 6px 8px",
            borderRadius: 40,
            border: "1px solid rgba(255, 255, 255, 0.25)",
            marginBottom: 32
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#FFFFFF" }}>RM</div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#FFFFFF", marginLeft: -10 }}>PS</div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#FFFFFF", marginLeft: -10 }}>AK</div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#FFFFFF", marginLeft: -10 }}>SP</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
              10,000+ businesses trust MessBee
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-1.5px",
            marginBottom: 20,
            lineHeight: 1.15
          }}>
            Start Growing with<br />MessBee Today
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "rgba(255, 255, 255, 0.92)",
            fontWeight: 400,
            maxWidth: 680,
            margin: "0 auto 44px",
            lineHeight: 1.6
          }}>
            Everything you need to learn, implement, and scale your business is just one click away.
          </p>

          {/* Buttons Row */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"}
              style={{
                background: "#FFFFFF",
                color: "#10B981",
                border: "none",
                padding: "16px 36px",
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.18)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.12)";
              }}
            >
              Start Free Trial
            </button>

            <button
              onClick={() => navigate("/demo")}
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(8px)",
                padding: "16px 36px",
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
            >
              Book a Demo
            </button>

            <button
              onClick={() => setShowSupportModal(true)}
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(8px)",
                padding: "16px 36px",
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
            >
              Contact Support
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════ FOOTER (MATCHING LANDING PAGE) ═══════════════ */}
      <Footer />

      {/* ═══════════════ CONTACT SUPPORT MODAL ═══════════════ */}
      {/* Backdrop */}
      <div
        onClick={() => { setShowSupportModal(false); setSupportStatus("idle"); }}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(4px)",
          opacity: showSupportModal ? 1 : 0,
          pointerEvents: showSupportModal ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Slide-in Panel */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 9999,
          width: "min(520px, 100vw)",
          background: "#FFFFFF",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.12)",
          transform: showSupportModal ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Panel Header */}
        <div style={{
          padding: "28px 32px 24px",
          borderBottom: "1px solid #F1F5F9",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          background: "linear-gradient(135deg, #0F172A 0%, #1a2e1a 100%)",
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 20, padding: "4px 14px", marginBottom: 14
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", letterSpacing: "0.5px", textTransform: "uppercase" }}>Support</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", margin: 0, letterSpacing: "-0.5px", lineHeight: 1.3 }}>
              How can we help?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "6px 0 0", fontWeight: 400 }}>
              We'll respond within 24 hours
            </p>
          </div>
          <button
            onClick={() => { setShowSupportModal(false); setSupportStatus("idle"); }}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#FFFFFF", fontSize: 20, lineHeight: 1, flexShrink: 0, marginTop: 2,
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            ×
          </button>
        </div>

        {/* Success State */}
        {supportStatus === "success" ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 32px", textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #10B981, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 24, boxShadow: "0 12px 32px rgba(16,185,129,0.3)"
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              Message Sent!
            </h3>
            <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, maxWidth: 320 }}>
              Your message has been saved. Our team will get back to you within 24 hours.
            </p>
            <div style={{ marginTop: 28, fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
              Closing automatically...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSupportSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px", gap: 20 }}>

            {/* Name + Email row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 180px" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={supportForm.name}
                  onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 16px", border: "1.5px solid #E2E8F0",
                    borderRadius: 10, fontSize: 14, color: "#0F172A", background: "#FAFAFA",
                    outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#10B981"; e.target.style.background = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#FAFAFA"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ flex: "1 1 180px" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={supportForm.email}
                  onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 16px", border: "1.5px solid #E2E8F0",
                    borderRadius: 10, fontSize: 14, color: "#0F172A", background: "#FAFAFA",
                    outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "all 0.2s"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#10B981"; e.target.style.background = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#FAFAFA"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                Topic
              </label>
              <select
                value={supportForm.subject}
                onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                style={{
                  width: "100%", padding: "12px 16px", border: "1.5px solid #E2E8F0",
                  borderRadius: 10, fontSize: 14,
                  color: supportForm.subject ? "#0F172A" : "#94A3B8",
                  background: "#FAFAFA", outline: "none", fontFamily: "inherit",
                  cursor: "pointer", appearance: "none", boxSizing: "border-box", transition: "all 0.2s"
                }}
                onFocus={(e) => { e.target.style.borderColor = "#10B981"; e.target.style.background = "#FFFFFF"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#FAFAFA"; }}
              >
                <option value="">Select a topic...</option>
                <option value="Getting Started">Getting Started</option>
                <option value="API Integration">API Integration</option>
                <option value="WhatsApp Setup">WhatsApp Setup</option>
                <option value="Billing &amp; Pricing">Billing &amp; Pricing</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                Message *
              </label>
              <textarea
                required
                rows={6}
                placeholder="Describe your issue or question in detail..."
                value={supportForm.message}
                onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                style={{
                  width: "100%", padding: "12px 16px", border: "1.5px solid #E2E8F0",
                  borderRadius: 10, fontSize: 14, color: "#0F172A", background: "#FAFAFA",
                  outline: "none", fontFamily: "inherit", resize: "vertical",
                  boxSizing: "border-box", lineHeight: 1.6, transition: "all 0.2s"
                }}
                onFocus={(e) => { e.target.style.borderColor = "#10B981"; e.target.style.background = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "#FAFAFA"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Error banner */}
            {supportStatus === "error" && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10,
                padding: "12px 16px", display: "flex", alignItems: "center", gap: 10
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ fontSize: 13, color: "#EF4444", fontWeight: 600 }}>Failed to send. Please try again.</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={supportStatus === "submitting"}
              style={{
                width: "100%", padding: "15px",
                background: supportStatus === "submitting"
                  ? "#6EE7B7"
                  : "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700,
                cursor: supportStatus === "submitting" ? "not-allowed" : "pointer",
                fontFamily: "inherit", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                boxShadow: "0 8px 24px rgba(16,185,129,0.28)",
                transition: "all 0.2s", marginTop: 4,
              }}
              onMouseOver={(e) => { if (supportStatus !== "submitting") { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(16,185,129,0.38)"; } }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(16,185,129,0.28)"; }}
            >
              {supportStatus === "submitting" ? (
                <>
                  <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#FFF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Send Message
                </>
              )}
            </button>

            {/* Trust note */}
            <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", margin: 0, fontWeight: 500 }}>
              🔒 Saved securely · Average response time: 4 hours
            </p>
          </form>
        )}
      </div>

    </div>
  );
};

export default ResourcesPage;
