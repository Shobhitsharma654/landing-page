import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

/* ══════════════════════════════════════════════════════
   MessBee — Cookies Policy Page
   Palette mirrors LandingPage: #18181B · #16A34A · #FFF
   ══════════════════════════════════════════════════════ */

const sections = [
  {
    id: "what",
    title: "1. What Are Cookies?",
    icon: "🍪",
    content: `Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide website owners with information about how their site is being used.\n\nCookies do not typically contain any information that personally identifies a user, but personal information that we store about you may be linked to the information stored in and obtained from cookies.`,
  },
  {
    id: "types",
    title: "2. Types of Cookies We Use",
    icon: "📋",
    content: `We use the following categories of cookies on the MessBee platform:

Strictly Necessary Cookies
These cookies are essential for the platform to function. They enable core features such as authentication, session management, and security. You cannot opt out of these cookies as the Service would not work without them.

Performance & Analytics Cookies
These help us understand how visitors interact with the platform by collecting anonymous information. We use this to improve the user experience and measure the effectiveness of features.

Functional Cookies
These cookies allow the platform to remember choices you make (such as your language, timezone, or notification preferences) and provide enhanced, personalized features.

Marketing Cookies
Used to track visitors across our marketing website and display relevant advertisements. These are only set with your explicit consent.`,
  },
  {
    id: "third-party",
    title: "3. Third-Party Cookies",
    icon: "🔗",
    content: `Some cookies on our platform are set by third-party services that appear on our pages. We use the following third-party services that may set cookies:

• Google Analytics – For website traffic analysis and user behaviour insights.
• Razorpay – For payment processing and fraud prevention.
• Intercom – For in-app customer support and live chat.
• Meta (Facebook) – For conversion tracking and advertising (only on our marketing site).
• Hotjar – For heatmaps and session recordings to improve UX.

These third-party providers have their own privacy and cookie policies. We recommend reviewing them on their respective websites.`,
  },
  {
    id: "duration",
    title: "4. Cookie Duration",
    icon: "⏱️",
    content: `Cookies can be either "session" cookies or "persistent" cookies:

Session Cookies
These are temporary and are deleted from your device when you close your browser. They are used to maintain your login state during a single browsing session.

Persistent Cookies
These remain on your device for a defined period (ranging from 30 days to 2 years depending on purpose). They are used to remember your preferences across multiple visits.

Our authentication token cookie expires after 30 days of inactivity, after which you will need to log in again.`,
  },
  {
    id: "consent",
    title: "5. Your Cookie Consent",
    icon: "✅",
    content: `When you first visit the MessBee platform, you will be shown a cookie consent banner. You can choose to:

• Accept All Cookies – Allow all categories including analytics and marketing cookies.
• Accept Necessary Only – Only allow strictly necessary cookies required for the platform to function.
• Manage Preferences – Customise which categories of cookies you consent to.

Your consent preference is stored and respected. You can change your preference at any time through the Cookie Settings option in your account or at the bottom of any page on our marketing website.`,
  },
  {
    id: "manage",
    title: "6. How to Manage Cookies",
    icon: "⚙️",
    content: `You can control and manage cookies in several ways:

Browser Settings
Most browsers allow you to refuse cookies, accept only certain types, or delete existing cookies through their settings. Please refer to your browser's documentation:
• Chrome: Settings → Privacy and security → Cookies and other site data
• Firefox: Settings → Privacy & Security → Cookies and Site Data
• Safari: Preferences → Privacy → Manage Website Data
• Edge: Settings → Cookies and site permissions

Please note that disabling cookies may impact the functionality of the MessBee platform, and some features may not work as expected.

Our Cookie Preference Centre
You can also update your preferences directly within the MessBee platform under Account Settings → Privacy → Cookie Preferences.`,
  },
  {
    id: "local-storage",
    title: "7. Local Storage & Similar Technologies",
    icon: "💾",
    content: `In addition to cookies, we also use other tracking technologies such as:

• Local Storage – To store user preferences and session data that persists after the browser is closed.
• Session Storage – Temporary storage that is cleared when the browser tab is closed.
• IndexedDB – For offline data caching in the MessBee web app.
• Fingerprinting (limited) – To detect suspicious login attempts and prevent account hijacking.

These technologies serve similar purposes to cookies and are subject to the same consent framework described in this policy.`,
  },
  {
    id: "do-not-track",
    title: "8. Do Not Track",
    icon: "🚫",
    content: `Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no consistent industry standard for how websites should respond to DNT signals, so our platform does not respond to browser DNT signals at this time.\n\nHowever, you can still control your preferences through our Cookie Preference Centre and by adjusting your browser settings as described above.`,
  },
  {
    id: "updates",
    title: "9. Updates to This Policy",
    icon: "🔄",
    content: `We may update this Cookie Policy from time to time to reflect changes in the cookies we use, new regulations, or improvements to our platform. We will notify you of any significant changes by:\n\n• Displaying a notice on our website\n• Resetting your cookie consent preferences (requiring you to consent again)\n\nThe "Last Updated" date at the top of this page will always reflect the most recent revision. We encourage you to review this policy periodically.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    icon: "📬",
    content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us:\n\nEmail: privacy@messbee.com\nPhone: +91-9876543210\nAddress: MessBee Technologies Pvt. Ltd., 100, MG Road, Bangalore – 560001, Karnataka, India\n\nWe aim to respond to all privacy-related queries within 5 business days.`,
  },
];

const CookiesPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("what");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh" }}>
      {/* ─── NAVBAR ─── */}
      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{
        background: "linear-gradient(135deg, #18181B 0%, #111827 60%, #0F172A 100%)",
        paddingTop: 140, paddingBottom: 80, paddingLeft: "6%", paddingRight: "6%",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: "8%", width: 360, height: 360, background: "radial-gradient(circle, rgba(0,200,83,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.1)", border: "1px solid rgba(0,200,83,0.2)", borderRadius: 40, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>🍪</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Cookie Transparency</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
            Cookies <span style={{ color: "#16A34A" }}>Policy</span>
          </h1>
          <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}>
            We believe in full transparency about how we use cookies. Here's everything you need to know about the cookies MessBee uses and how you can manage them.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Last Updated", value: "July 1, 2026" },
              { label: "Effective Date", value: "July 1, 2026" },
              { label: "GDPR Compliant", value: "Yes ✓" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 10, color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: "#E4E4E7", fontWeight: 600 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section style={{ padding: "60px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 60, alignItems: "flex-start" }}>

          {/* TOC */}
          <aside style={{ width: 260, flexShrink: 0, position: "sticky", top: 90, background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>
              Table of Contents
            </div>
            <nav>
              {sections.map((s) => (
                <span key={s.id} className={`toc-link${activeSection === s.id ? " active" : ""}`} onClick={() => scrollToSection(s.id)}>
                  {s.icon} {s.title}
                </span>
              ))}
            </nav>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
              <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid #D1FAE5", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#065F46", marginBottom: 6 }}>Manage Your Cookies</div>
                <p style={{ fontSize: 11, color: "#047857", lineHeight: 1.5 }}>
                  You can change your cookie preferences at any time in your account settings.
                </p>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Quick note */}
            <div style={{ background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: "1px solid #D1FAE5", borderLeft: "4px solid #16A34A", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.7, fontWeight: 500 }}>
                <strong>Quick summary:</strong> We use essential cookies to run the platform, and optional analytics/marketing cookies to improve your experience. You can manage all preferences through our cookie settings at any time.
              </p>
            </div>

            {/* Cookie type cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { type: "Necessary", desc: "Always active. Required for the platform to work.", color: "#16A34A", bg: "#F0FDF4" },
                { type: "Analytics", desc: "Help us understand usage and improve features.", color: "#3B82F6", bg: "#EFF6FF" },
                { type: "Functional", desc: "Remember your preferences and settings.", color: "#8B5CF6", bg: "#F5F3FF" },
                { type: "Marketing", desc: "Used for targeted advertising (consent required).", color: "#F59E0B", bg: "#FFFBEB" },
              ].map((c) => (
                <div key={c.type} style={{ background: c.bg, borderRadius: 14, padding: "18px 20px", border: `1px solid ${c.color}22` }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, marginBottom: 10 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{c.type}</div>
                  <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>

            {sections.map((s) => (
              <div key={s.id} id={s.id} className="section-card" onMouseEnter={() => setActiveSection(s.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>{s.title}</h2>
                </div>
                <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.content}</p>
              </div>
            ))}

            {/* CTA */}
            <div style={{ marginTop: 48, background: "#18181B", borderRadius: 20, padding: "40px 36px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>
                🍪
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", marginBottom: 10 }}>You're in control of your cookies</h3>
              <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
                Manage your cookie preferences anytime from your account settings or reach out if you have questions.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login?flow=register"} style={{ background: "#16A34A", color: "#FFF", border: "none", borderRadius: 40, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Start Free Trial
                </button>
                <button onClick={() => navigate("/privacy")} style={{ background: "rgba(255,255,255,0.08)", color: "#E4E4E7", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 40, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Read Privacy Policy
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />

    </div>
  );
};

export default CookiesPage;
