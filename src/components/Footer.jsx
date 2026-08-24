import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultLogo from '../assets/logo.jpeg';
import messbeeText from '../assets/messbee_text.png';


const PRODUCT_LINKS = [
  { label: "CRM",                   path: "/crm" },
  { label: "WhatsApp Business",     path: "/whatsapp-business" },
  { label: "Marketing Automation",  path: "/marketing-automation" },
  { label: "AI & Automation",         path: "/ai-automation" },
  { label: "Digital Store",         path: "/digital-store" },
];

const SOLUTIONS_LINKS = [
  { label: "Small & Medium Businesses", path: "/solutions/small-medium-businesses" },
  { label: "Retail & Local Businesses", path: "/solutions/retail-local-businesses" },
  { label: "E-commerce",               path: "/solutions/e-commerce" },
  { label: "Service Businesses",       path: "/solutions/service-businesses" },
];

const RESOURCES_LINKS = [
  { label: "Business Library",  path: "/resources/business-library" },
  { label: "Help Center",       path: "/resources/help-center" },
  { label: "Blog",              path: "/resources/blog" },
  { label: "FAQs",              path: "/resources/faqs" },
  { label: "Contact Support",   path: "/contact-support" },
];

const LEGAL_LINKS = [
  { label: "About MessBee",       path: "/about" },
  { label: "Careers",             path: "/careers" },
  { label: "Contact Us",          path: "/contact" },
  { label: "Privacy Policy",      path: "/privacy" },
  { label: "Terms & Conditions",  path: "/terms" },
  { label: "Refund & Cancellation", path: "/refundpolicy" },
  { label: "DPA",                 path: "/dpa" },
  { label: "Cookie Policy",       path: "/cookies" },
];

const BOTTOM_LINKS = [
  { label: "Privacy",       path: "/privacy" },
  { label: "Terms",         path: "/terms" },
  { label: "Refund Policy", path: "/refundpolicy" },
  { label: "Sitemap",       path: "/" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon fill="#18181B" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

/* ── Small reusable NavLink ── */
const FooterLink = ({ label, path }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      onClick={() => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? "#4ADE80" : "#94A3B8",
        cursor: "pointer",
        transition: "color 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 7,
        lineHeight: 1.5,
        userSelect: "none",
        paddingLeft: 0,
      }}>
      <span style={{
        width: 4, height: 4, borderRadius: "50%",
        background: hovered ? "#4ADE80" : "#334155",
        flexShrink: 0, display: "inline-block",
        transition: "background 0.2s"
      }} />
      {label}
    </span>
  );
};

/* ── Column heading ── */
const ColHead = ({ children }) => (
  <div style={{
    fontSize: 11, fontWeight: 800, color: "#E4E4E7",
    textTransform: "uppercase", letterSpacing: "1.2px",
    marginBottom: 20,
  }}>
    {children}
  </div>
);

/* ══════════════════════════════════════ */

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: "linear-gradient(180deg, #18181B 0%, #0F172A 100%)",
      fontFamily: "'Inter', sans-serif",
      color: "#94A3B8",
    }}>
      <style>{`
        .footer-social-btn {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background: rgba(22,163,74,0.15);
          border-color: rgba(22,163,74,0.4);
          color: #4ADE80;
          transform: translateY(-2px);
        }
        .footer-bottom-link {
          font-size: 12px;
          color: #64748B;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }
        .footer-bottom-link:hover { color: #4ADE80; }

        .footer-logo-text {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.6px;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
        }

        /* Responsive scaling for laptop and mobile */
        @media (max-width: 1366px) {
          .footer-logo-text {
            font-size: 24px;
          }
        }
        @media (max-width: 1299px) {
          .footer-logo-text {
            font-size: 22px;
          }
        }
        @media (max-width: 1280px) and (min-width: 769px) {
          .footer-grid-container {
            grid-template-columns: 2fr 1.2fr 1.2fr 1.4fr 1.5fr !important;
            gap: 16px !important;
          }
          .footer-grid-container span {
            font-size: 11px !important;
          }
          .footer-grid-container div {
            font-size: 10px !important;
            margin-bottom: 12px !important;
          }
          .footer-brand-col p {
            font-size: 11.5px !important;
            margin-bottom: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 16px !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1 !important;
            margin-bottom: 8px !important;
          }
          .footer-top-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .footer-logo-text {
            font-size: 20px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px 12px !important;
          }
        }
      `}</style>

      {/* ═══ TOP STRIP — Brand & tagline ═══ */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 6% 18px",
      }}>
        <div className="footer-top-strip" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          {/* Logo + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
              <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span className="footer-logo-text">
              <span style={{ color: "#15803D" }}>Mess</span>
              <span style={{ color: "#4ADE80" }}>Bee</span>
            </span>
          </div>

          {/* Tagline badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(22,163,74,0.08)",
            border: "1px solid rgba(22,163,74,0.2)",
            borderRadius: 40, padding: "8px 18px"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", display: "inline-block", boxShadow: "0 0 6px #16A34A" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4ADE80", letterSpacing: "0.3px" }}>
              India's Digital Business Operating System
            </span>
          </div>
        </div>
      </div>

      {/* ═══ MAIN LINK COLUMNS ═══ */}
      <div style={{ padding: "30px 6%", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="footer-grid-container" style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1.2fr 1.4fr 1.5fr",
          gap: 32,
        }}>

          {/* ── Brand column ── */}
          <div className="footer-brand-col">
            <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 40, maxWidth: 300 }}>
              MessBee empowers businesses with smarter communication, automation, and commerce — all in one platform.
            </p>


            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20,}}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="footer-social-btn" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <a href="mailto:support@messbee.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "#94A3B8", textDecoration: "none",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, padding: "8px 14px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"}
              onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              support@messbee.com
            </a>
          </div>

          {/* ── Product ── */}
          <div>
            <ColHead>Product</ColHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PRODUCT_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* ── Solutions ── */}
          <div>
            <ColHead>Solutions</ColHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SOLUTIONS_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* ── Resources ── */}
          <div>
            <ColHead>Resources</ColHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {RESOURCES_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* ── Company & Legal ── */}
          <div>
            <ColHead>Company & Legal</ColHead>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {LEGAL_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div style={{ padding: "12px 6%" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 16,
        }}>
          {/* Copyright */}
          <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
            <span style={{ color: "#64748B", fontWeight: 600 }}>© 2026 MessBee.</span>
            {" "}All Rights Reserved.
            
          </div>

          {/* Quick links */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            {BOTTOM_LINKS.map((l, i) => (
              <React.Fragment key={l.label}>
                <span className="footer-bottom-link" onClick={() => { navigate(l.path); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {l.label}
                </span>
                {i < BOTTOM_LINKS.length - 1 && (
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#334155", display: "inline-block" }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* India badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8, padding: "6px 12px",
          }}>
            <svg width="18" height="14" viewBox="0 0 90 60" style={{ borderRadius: 2, flexShrink: 0 }}><rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#FFFFFF"/><rect y="40" width="90" height="20" fill="#138808"/><circle cx="45" cy="30" r="8" fill="#000080" /><circle cx="45" cy="30" r="6" fill="#FFFFFF" /><circle cx="45" cy="30" r="2" fill="#000080" /></svg>
            <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
