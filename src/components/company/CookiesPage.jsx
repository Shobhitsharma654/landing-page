import Navbar from "../Navbar";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   MessBee — Cookie Policy Page
   Same UI as TermsPage: white hero · sticky TOC · section cards
   ══════════════════════════════════════════════════════ */

const sections = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="9" r="1" fill="currentColor" /><path d="M9 13s.5 2 3 2 3-2 3-2" />
      </svg>
    ),
    content: `Cookies are small text files placed on your browser or device when you visit a website.\nThey help websites remember information about your visit, understand how the website is used and, where permitted,\n provide a more relevant experience.\n\nWe may also use similar technologies such as pixels, SDKs, tags and local storage where applicable.`,
  },
  {
    id: "why-we-use",
    title: "2. Why Does MessBee Use Cookies?",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    content: `MessBee may use cookies and similar technologies to:\n\n• Keep the website functioning properly\n• Remember user preferences\n• Maintain login and session information\n• Improve website performance\n• Understand how visitors use our website\n• Measure website traffic and usage\n• Improve our products and services\n• Support security and fraud prevention\n• Understand the effectiveness of marketing activities, where applicable\n\nWe do not use cookies simply because they are available. Their use depends on the purpose and the relevant service.`,
  },
  {
    id: "types-of-cookies",
    title: "3. Types of Cookies We May Use",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    subsections: [
      {
        label: "A. Strictly Necessary Cookies",
        color: "#16A34A",
        bg: "#F0FDF4",
        border: "#BBF7D0",
        text: `These cookies are required for essential website functions.\n\nThey may support:\n• Login and authentication\n• Session management\n• Security\n• Account access\n• Form functionality\n• Load balancing\n• Basic website operation\n\nBecause these cookies are necessary for the requested service, they may not be removable through the cookie preference tool.`,
      },
      {
        label: "B. Functional Cookies",
        color: "#7C3AED",
        bg: "#F5F3FF",
        border: "#DDD6FE",
        text: `These cookies help remember choices and preferences so that the website can provide a more convenient experience.\n\nExamples may include:\n• Language preferences\n• Region or settings\n• User interface preferences\n• Previously selected options`,
      },
      {
        label: "C. Analytics & Performance Cookies",
        color: "#0284C7",
        bg: "#F0F9FF",
        border: "#BAE6FD",
        text: `Where enabled, these cookies help us understand how visitors use our website.\n\nThey may help us understand:\n• Which pages are visited\n• How visitors navigate the website\n• Website performance\n• General traffic patterns\n• Which content is useful to visitors\n\nAnalytics information may be aggregated or otherwise processed according to the applicable service and our Privacy Policy.`,
      },
      {
        label: "D. Marketing & Advertising Technologies",
        color: "#D97706",
        bg: "#FFFBEB",
        border: "#FDE68A",
        text: `Where applicable and legally permitted, MessBee may use cookies or similar technologies to understand marketing performance or support relevant advertising activities.\n\nSuch technologies may be provided by third-party service providers.\n\nWhere required by applicable law, we will seek the appropriate consent before using non-essential marketing cookies.`,
      },
    ],
  },
  {
    id: "third-party",
    title: "4. Third-Party Cookies",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    content: `Some cookies or similar technologies may be placed by third-party services used by MessBee.\n\nThese may include services supporting:\n• Website analytics\n• Security\n• Customer support\n• Marketing\n• Embedded content\n• Payment or other integrations\n\nThird parties may process information according to their own privacy policies and terms.\nWe do not control the privacy practices of independent third-party services.`,
  },
  {
    id: "cookie-consent",
    title: "5. Cookie Consent",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    intro: `Where required by applicable law, MessBee may display a cookie consent or preference mechanism when you visit our website.\n\nDepending on the available options, you may be able to:`,
    subsections: [
      {
        label: "Accept All",
        color: "#16A34A",
        bg: "#F0FDF4",
        border: "#BBF7D0",
        text: "Allow applicable optional cookies.",
      },
      {
        label: "Reject / Decline Optional Cookies",
        color: "#EF4444",
        bg: "#FEF2F2",
        border: "#FEE2E2",
        text: "Disable optional cookies where supported.",
      },
      {
        label: "Manage Preferences",
        color: "#2563EB",
        bg: "#EFF6FF",
        border: "#DBEAFE",
        text: "Choose which categories of optional cookies you allow.",
      },
    ],
    outro: `Your choices may be stored so that we do not repeatedly ask you for the same preference, subject to applicable technical requirements.`,
  },
  {
    id: "managing-browser",
    title: "6. Managing Cookies Through Your Browser",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    content: `You can also manage or delete cookies through your browser settings.\n\nMost modern browsers allow you to:\n• Block cookies\n• Delete existing cookies\n• Allow cookies only from selected websites\n• Receive notifications before cookies are stored\n\nDisabling certain cookies may affect the functionality of MessBee or prevent some features from working properly.`,
  },
  {
    id: "personal-data",
    title: "7. Cookies and Personal Data",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    content: `Cookies do not always identify you directly.\n\nHowever, information collected through cookies or similar technologies may sometimes be associated with other information that can identify an individual.\n\nWhere such information constitutes personal data under applicable law, MessBee will handle it in accordance with applicable privacy requirements and our Privacy Policy.`,
  },
  {
    id: "security",
    title: "8. Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: `Cookies and similar technologies may be used as part of security and fraud-prevention measures.\n\nHowever, no website, application or online service can guarantee complete security.\n\nYou should also take reasonable steps to protect your account, including maintaining the confidentiality of your login credentials and authentication information.`,
  },
  {
    id: "cookies-used",
    title: "9. Cookies Used on MessBee",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    content: `The specific cookies used by MessBee may change as our website, applications and services evolve.\n\nWhere applicable, our cookie preference mechanism may provide additional information about:\n• Cookie name\n• Provider\n• Purpose\n• Category\n• Duration\n• Whether the cookie is first-party or third-party\n\nWe recommend maintaining the live cookie inventory alongside the website's technical implementation rather than publishing cookie names that are not actually being used.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Cookie Policy",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" />
      </svg>
    ),
    content: `We may update this Cookie Policy from time to time to reflect:\n• Changes to our website\n• Changes to our services\n• Changes in technology\n• Changes in applicable legal or regulatory requirements\n• Changes in our use of cookies or similar technologies\n\nThe updated version will be published on this page with the revised Last Updated date.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    content: `If you have questions about this Cookie Policy or how MessBee uses cookies and similar technologies, contact us:`,
  },
];

const RELATED_POLICIES = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Refund & Cancellation Policy", path: "/refundpolicy" },
];

const renderFormattedContent = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      return (
        <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 6, marginBottom: 6 }}>
          <span style={{ color: "#16A34A", fontWeight: 800, fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}>•</span>
          <span style={{ flex: 1, lineHeight: 1.6, color: "#334155" }}>{trimmed.replace(/^[•-]\s*/, '')}</span>
        </div>
      );
    }
    const match = line.match(/^([A-Z0-9][A-Za-z0-9\s&.–-]{1,50}:)(.*)$/);
    if (match) {
      return (
        <React.Fragment key={index}>
          <strong style={{ color: "#0F172A", fontWeight: 700, display: "inline-block", marginTop: index === 0 ? "0px" : "8px" }}>
            {match[1]}
          </strong>
          {match[2]}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const CookiesPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("what-are-cookies");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const mobileTocRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileTocRef.current && !mobileTocRef.current.contains(e.target)) {
        setIsMobileTocOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const mobileTocEl = document.querySelector(".mobile-toc-wrapper");
      const isMobileTocVisible = mobileTocEl && window.getComputedStyle(mobileTocEl).display !== "none";
      const offset = isMobileTocVisible ? 485 : 95;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="cookies-page-wrapper" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "clip", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .cookies-container { display: flex; gap: 60px; align-items: flex-start; }
        .cookies-sidebar {
          width: 320px; flex-shrink: 0;
          position: sticky; top: 95px; z-index: 10;
          background: #F8FAFC; border: 1px solid #E5E7EB;
          border-radius: 16px; padding: 20px;
          max-height: calc(100vh - 130px); overflow-y: auto;
        }
        .toc-item {
          font-size: 13px; font-weight: 500; color: #475569;
          cursor: pointer; transition: all 0.2s ease-in-out;
          display: block; padding: 6px 12px; line-height: 1.4;
          border-left: 3px solid transparent;
          border-radius: 0 6px 6px 0; margin-bottom: 2px; text-align: left;
        }
        .toc-item:hover {
          color: #16A34A; background: rgba(22,163,74,0.04);
          border-left-color: rgba(22,163,74,0.4); padding-left: 14px;
        }
        .toc-item.active {
          font-weight: 700; color: #16A34A;
          background: #F0FDF4;
          border-left-color: #16A34A; padding-left: 14px;
        }
        .mobile-toc-wrapper { display: none !important; }

        .cookies-article { flex: 1; min-width: 0; }
        
        .policy-hero {
          padding-top: 130px; padding-bottom: 48px;
          padding-left: 6%; padding-right: 6%;
        }
        .policy-content {
          padding: 48px 6%;
        }

        /* ── STANDARDIZED RESPONSIVE TYPOGRAPHY & PADDING ── */
        @media (max-width: 1366px) {
          .cookies-container {
            gap: 32px !important;
          }
          .cookies-sidebar {
            width: 270px !important;
            padding: 16px !important;
            max-height: calc(100vh - 120px) !important;
          }
          .cookies-page-wrapper section {
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
          .cookies-page-wrapper h1 {
            font-size: clamp(24px, 2.8vw, 38px) !important;
          }
          .cookies-page-wrapper h2 {
            font-size: clamp(20px, 2.4vw, 28px) !important;
          }
          .cookies-page-wrapper h3 {
            font-size: 15px !important;
          }
          .cookies-page-wrapper p {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
          }
          .cookies-section-card {
            padding: 24px !important;
          }
        }
        @media (max-width: 1299px) {
          .cookies-page-wrapper section {
            padding-left: 4% !important;
            padding-right: 4% !important;
          }
          .cookies-page-wrapper h1 {
            font-size: clamp(22px, 2.6vw, 34px) !important;
          }
          .cookies-page-wrapper h2 {
            font-size: clamp(18px, 2.2vw, 25px) !important;
          }
          .cookies-page-wrapper h3 {
            font-size: 14.5px !important;
          }
          .cookies-page-wrapper p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
          .cookies-section-card {
            padding: 20px !important;
          }
        }
        @media (max-width: 1024px) {
          .cookies-sidebar {
            display: none !important;
          }
          .cookies-container {
            gap: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .policy-hero { padding-top: 100px !important; padding-bottom: 20px !important; }
          .policy-content { padding-top: 20px !important; padding-bottom: 30px !important; }
          .mobile-toc-wrapper {
            display: block !important;
            position: sticky;
            top: 70px;
            z-index: 25;
            margin-bottom: 16px !important;
            width: calc(100% + 32px) !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
          }
          .mobile-toc-wrapper > div {
            border: 1px solid #E2E8F0 !important;
            border-left: none !important;
            border-right: none !important;
            border-radius: 0 !important;
          }
          .cookies-page-wrapper article > div:first-child {
            margin-bottom: 16px !important;
          }
          .cookies-page-wrapper article > div[id] {
            scroll-margin-top: 485px !important;
            padding: 20px 16px !important;
            margin-bottom: 14px !important;
          }
          .cookies-page-wrapper section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .cookies-page-wrapper h1 {
            font-size: clamp(24px, 6vw, 36px) !important;
            letter-spacing: -0.5px !important;
            line-height: 1.25 !important;
            word-spacing: 2px !important;
            margin-bottom: 12px !important;
          }
          .cookies-page-wrapper h2 {
            font-size: clamp(17px, 2vw, 22px) !important;
          }
          .cookies-page-wrapper h3 {
            font-size: 13.5px !important;
          }
          .cookies-page-wrapper p {
            font-size: 12.5px !important;
          }
          .cookies-section-card { padding: 18px !important; }
        }
      `}</style>

      <title>Cookie Policy | MessBee</title>
      <meta name="description" content="Learn how MessBee uses cookies and similar technologies for website functionality, security, analytics, preferences and other permitted purposes." />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="policy-hero" style={{
        background: "#FFFFFF",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #F1F5F9",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none",
        }} />
        {/* Green radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 10% 60%, rgba(22,163,74,0.07) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(22,163,74,0.05) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 40, padding: "6px 16px", marginBottom: 24 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1" fill="#16A34A" /><circle cx="15" cy="9" r="1" fill="#16A34A" /><path d="M9 13s.5 2 3 2 3-2 3-2" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", letterSpacing: "0.3px" }}>Cookie Transparency</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: "clamp(35px, 2.9vw, 62px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 20 }}>
            Cookie {" "}
            <span style={{ color: "#16A34A" }}>Policy</span>
          </h1>

          {/* Divider */}
          <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 4, marginBottom: 24 }} />

          {/* Description */}
          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 850, margin: 0 }}>
            This Cookie Policy explains how MessBee, uses cookies and similar technologies on messbee.com, our applications and related digital services.<br />
            This policy should be read with our Privacy Policy and Terms &amp; Conditions.
          </p>

        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="policy-content" style={{ background: "#FFFFFF" }}>
        <div className="cookies-container" style={{ maxWidth: 1380, margin: "0 auto" }}>

          {/* ── Sticky Table of Contents ── */}
          <aside className="cookies-sidebar no-scrollbar">
            <div style={{
              position: "sticky",
              top: -20,
              marginTop: -20,
              marginLeft: -20,
              marginRight: -20,
              padding: "16px 20px 12px 20px",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 800,
              color: "#16A34A",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: 10,
            }}>
              Table of Contents
            </div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {sections.map((s) => (
                <span key={s.id}
                  className={`toc-item${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollToSection(s.id)}>
                  {s.title}
                </span>
              ))}
            </nav>


          </aside>

          {/* ── Article ── */}
          <article className="cookies-article">

            {/* Plain language box */}
            <div style={{
              background: "#F0FDF4", border: "1px solid #D1FAE5",
              borderLeft: "4px solid #16A34A", borderRadius: 12,
              padding: "20px 24px", marginBottom: 32,
            }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
                <strong>In plain language:</strong> MessBee uses cookies to keep the website working, remember your preferences, and where you consent, to understand usage and support marketing. You can manage or decline optional cookies at any time.
              </p>
            </div>

            {/* ── Mobile Table of Contents Menu (Custom Responsive Selector) ── */}
            <div className="mobile-toc-wrapper" ref={mobileTocRef}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "12px 16px",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "none",
              }}>
                {/* Header / Current selection row */}
                <div
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "rgba(22, 163, 74, 0.12)",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                          Table of Contents
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#15803D", background: "#DCFCE7", padding: "1px 7px", borderRadius: 10 }}>
                          {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                        </span>
                      </div>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0F172A",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: 1,
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {sections.find(s => s.id === activeSection)?.title || sections[0].title}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: isMobileTocOpen ? "#F0FDF4" : "#F1F5F9",
                    color: isMobileTocOpen ? "#16A34A" : "#64748B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginLeft: 8,
                    transition: "transform 0.25s ease, background 0.2s ease",
                    transform: isMobileTocOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Options List */}
                {isMobileTocOpen && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid #E2E8F0",
                    maxHeight: "340px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                  className="no-scrollbar"
                  >
                    {sections.map((s, idx) => {
                      const isActive = activeSection === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => {
                            scrollToSection(s.id);
                            setIsMobileTocOpen(false);
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: isActive ? "#F0FDF4" : "transparent",
                            color: isActive ? "#16A34A" : "#334155",
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 13,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span style={{
                            display: "inline-block",
                            width: 22,
                            fontSize: 11,
                            fontWeight: 700,
                            color: isActive ? "#16A34A" : "#94A3B8",
                            flexShrink: 0
                          }}>
                            {idx + 1}.
                          </span>
                          <span style={{ flex: 1, lineHeight: 1.35 }}>
                            {s.title.replace(/^\d+\.\s*/, '')}
                          </span>
                          {isActive && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Sections */}
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="cookies-section-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 26,
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
                  textAlign: "left",
                  scrollMarginTop: "95px",
                }}
                onMouseEnter={() => setActiveSection(s.id)}
              >
                {/* Icon Badge */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(22, 163, 74, 0.08)",
                    color: "#16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                {/* Title */}
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#111827",
                    marginBottom: 16,
                    letterSpacing: "-0.3px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {s.title}
                </h2>

                {/* Subsections (for types of cookies / consent options) */}
                {s.subsections ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {s.intro && <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>{s.intro}</p>}
                    {s.subsections.map((sub) => (
                      <div key={sub.label} style={{ background: sub.bg, border: `1px solid ${sub.border}`, borderRadius: 12, padding: "18px 20px" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: sub.color, marginBottom: 10 }}>{sub.label}</div>
                        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{sub.text}</p>
                      </div>
                    ))}
                    {s.outro && <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "16px 0 0", fontFamily: "'Inter', sans-serif" }}>{s.outro}</p>}
                  </div>
                ) : (
                  <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    {renderFormattedContent(s.content)}
                  </div>
                )}

                {/* Contact section special rendering */}
                {s.id === "contact" && (
                  <div style={{ marginTop: 20, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Operating Brand", value: "MessBee" },
                        { label: "Country", value: "India" },
                        { label: "Privacy", value: "info@messbee.com", href: "mailto:privacy@messbee.com" },
                        { label: "Support", value: "support@messbee.com", href: "mailto:support@messbee.com" },
                      ].map((item) => (
                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                          <span style={{ fontWeight: 700, color: "#0F172A", minWidth: 130 }}>{item.label}:</span>
                          {item.href
                            ? <a href={item.href} style={{ color: "#16A34A", fontWeight: 600, textDecoration: "none" }}>{item.value}</a>
                            : <span style={{ color: "#475569" }}>{item.value}</span>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Related Policies card */}
            <div className="cookies-section-card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(22,163,74,0.08)", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.3px", margin: 0 }}>Related Policies</h2>
              </div>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 16, lineHeight: 1.7 }}>For more information, please also refer to:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Privacy Policy", path: "/privacy" },
                  { label: "Terms & Conditions", path: "/terms" },
                  { label: "Refund & Cancellation Policy", path: "/refundpolicy" },
                  { label: "Data Processing Agreement (DPA)", path: "/dpa" },
                  { label: "Acceptable Use Policy", path: null },
                  { label: "Anti-Spam Policy", path: null },
                  { label: "Security & Compliance", path: null },
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => item.path && navigate(item.path)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 10,
                      background: "#F8FAFC", border: "1px solid #E2E8F0",
                      cursor: item.path ? "pointer" : "default",
                      fontSize: 14, fontWeight: 600,
                      color: item.path ? "#16A34A" : "#64748B",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => { if (item.path) e.currentTarget.style.background = "#F0FDF4"; }}
                    onMouseLeave={e => { if (item.path) e.currentTarget.style.background = "#F8FAFC"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.path ? <polyline points="9 18 15 12 9 6" /> : <line x1="5" y1="12" x2="19" y2="12" />}
                    </svg>
                    {item.label}
                    {!item.path && <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginLeft: "auto" }}>Coming soon</span>}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiesPage;
