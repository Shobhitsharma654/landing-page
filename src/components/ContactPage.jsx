import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

/* ══════════════════════════════════════════════════════
   MessBee — Contact Us Page
   ══════════════════════════════════════════════════════ */

const FOOTER_LINKS = {
  company: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Find resources", path: "/resources" },
    { label: "Find business", path: "/business" },
  ],
  support: [
    { label: "Contact Us", path: "/contact" },
    { label: "FAQs", path: "/faq" },
  ],
  legal: [
    { label: "Terms and conditions", path: "/terms" },
    { label: "Privacy policy", path: "/privacy" },
    { label: "Cookies policy", path: "/cookies" },
    { label: "License agreement", path: "/license" },
  ],
};

const ContactPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = async (e) => {
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
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        console.error("Contact form error:", data.message);
      }
    } catch (err) {
      console.error("Contact submit failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HEADER ── */}
      <section style={{ background: "linear-gradient(135deg,#18181B 60%,#1a2e1a 100%)", padding: "80px 6% 120px", textAlign: "center", position: "relative" }}>
        <div className="hero-animate" style={{ maxWidth: 760, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 20 }}>
            How can we <span style={{ color: "#16A34A" }}>help you?</span>
          </h1>
          <p style={{ fontSize: 18, color: "#9CA3AF", lineHeight: 1.7 }}>
            Whether you have a question about features, pricing, API integration, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: "0 6%", marginTop: -60, position: "relative", zIndex: 10, marginBottom: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
          
          {/* Left: Contact Info Cards */}
          <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="contact-card" style={{ background: "#FFFFFF", borderRadius: 16, padding: 32, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,200,83,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Email Us</h3>
              <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 16 }}>Our friendly team is here to help.</p>
              <a href="mailto:support@messbee.com" style={{ fontSize: 16, fontWeight: 600, color: "#16A34A", textDecoration: "none" }}>support@messbee.com</a>
            </div>

            <div className="contact-card" style={{ background: "#FFFFFF", borderRadius: 16, padding: 32, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,200,83,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Call Us</h3>
              <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 16 }}>Mon-Fri: 9:00 AM – 6:00 PM IST.</p>
              <a href="tel:+918765432109" style={{ fontSize: 16, fontWeight: 600, color: "#16A34A", textDecoration: "none" }}>+91 876 543 2109</a>
            </div>

            <div className="contact-card" style={{ background: "#FFFFFF", borderRadius: 16, padding: 32, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,200,83,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Business Hours</h3>
              <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 6, lineHeight: 1.7 }}>Mon-Fri: 9:00 AM – 6:00 PM IST</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#16A34A", margin: 0 }}>24/7 Email Support</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{ flex: "2 1 500px", background: "#FFFFFF", borderRadius: 20, padding: 48, border: "1px solid #E5E7EB", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Send us a message</h2>
            <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32 }}>We'll get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Full Name</label>
                  <input type="text" required className="input-field" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div style={{ flex: "1 1 200px" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Email Address</label>
                  <input type="email" required className="input-field" placeholder="john@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Subject</label>
                <select className="input-field" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ appearance: "none", cursor: "pointer" }}>
                  <option value="">Select a topic...</option>
                  <option value="sales">Sales & Pricing</option>
                  <option value="support">Technical Support</option>
                  <option value="api">API Integration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Message</label>
                <textarea required className="input-field" placeholder="How can we help?" rows={5} style={{ resize: "vertical" }} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>

              <button type="submit" disabled={status === "submitting"} style={{
                background: status === "success" ? "#16A34A" : status === "error" ? "#EF4444" : "#111827",
                color: "#FFFFFF", border: "none", borderRadius: 8,
                padding: "16px", fontSize: 16, fontWeight: 700, cursor: status === "submitting" ? "not-allowed" : "pointer",
                transition: "all 0.2s", marginTop: 8, display: "flex", justifyContent: "center", alignItems: "center", gap: 8
              }}
              onMouseEnter={e => { if (status !== "success" && status !== "submitting" && status !== "error") e.currentTarget.style.background = "#000000"; }}
              onMouseLeave={e => { if (status !== "success" && status !== "submitting" && status !== "error") e.currentTarget.style.background = "#111827"; }}>
                {status === "submitting" ? (
                  <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#FFF", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    Sending...
                  </span>
                ) : status === "success" ? (
                  "Message Sent ✓"
                ) : status === "error" ? (
                  "Failed — Try Again"
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
};

export default ContactPage;
