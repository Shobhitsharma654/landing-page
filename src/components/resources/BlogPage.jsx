import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/logo.jpeg";

const G  = "#16A34A";
const GL = "#F0FDF4";
const GB = "#BBF7D0";
const D2 = "#111827";
const MU = "#64748B";

const Pill = ({ children }) => (
  <div style={{ display:"inline-block", background:GL, border:`1px solid ${GB}`, color:G, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", padding:"5px 14px", borderRadius:20, marginBottom:16 }}>
    {children}
  </div>
);
/* ═══════════════════════════════════════════════════════════════════════
   MessBee — Blog Page Component
   Official MessBee logo in Hero graphic.
   Strictly adheres ONLY to the text provided in the user prompt.
   Unified, cohesive emerald design system across all sections & cards.
   Same dark forest green gradient (#14532D -> #022C22) & typography.
   Fully responsive across all laptop, tablet, and mobile displays.
   ═══════════════════════════════════════════════════════════════════════ */

// 1. Explore Business Topics (7 Topics from prompt)
const BUSINESS_TOPICS = [
  {
    title: "Business Growth",
    desc: "Practical ideas for attracting customers, improving operations and building a stronger foundation for long-term business growth.",
    icon: "🚀",
    subhead: "Explore topics such as:",
    bullets: [
      "Customer acquisition",
      "Business planning",
      "Customer retention",
      "Digital transformation",
      "Business productivity",
      "Growth strategies",
    ],
  },
  {
    title: "CRM & Customer Management",
    desc: "Your customer information becomes more valuable when it is organized and easy to use. Learn how businesses can use CRM tools to manage customers, leads, conversations and follow-ups more effectively.",
    icon: "📊",
    subhead: "Topics include:",
    bullets: [
      "CRM basics",
      "Lead management",
      "Customer segmentation",
      "Customer profiles",
      "Sales pipeline",
      "Customer retention",
      "Follow-up strategies",
    ],
  },
  {
    title: "WhatsApp Business",
    desc: "WhatsApp is an important communication channel for many businesses in India. Learn about WhatsApp Business, customer communication, messaging workflows and responsible business use.",
    icon: "💬",
    subhead: "Topics include:",
    bullets: [
      "WhatsApp Business Platform",
      "Business messaging",
      "Customer communication",
      "Message templates",
      "WhatsApp automation",
      "Customer engagement",
      "WhatsApp marketing",
      "Meta/WhatsApp policy updates",
    ],
  },
  {
    title: "Marketing & Customer Engagement",
    desc: "Marketing is not only about reaching more people. It is also about reaching the right customers with relevant communication. Explore practical ideas for planning campaigns, improving engagement and building better customer journeys.",
    icon: "📢",
    subhead: "Topics include:",
    bullets: [
      "Marketing automation",
      "Customer journeys",
      "Lead nurturing",
      "Email marketing",
      "SMS marketing",
      "Customer re-engagement",
      "Campaign planning",
      "Customer retention",
    ],
  },
  {
    title: "AI & Automation",
    desc: "AI and automation are becoming useful parts of everyday business operations. Our articles explain where these technologies can help, where human involvement is still important and how businesses can introduce automation responsibly.",
    icon: "🤖",
    subhead: "Topics include:",
    bullets: [
      "AI for business",
      "AI customer support",
      "AI chatbots",
      "Business automation",
      "Workflow automation",
      "AI-assisted marketing",
      "Productivity automation",
      "Responsible AI",
    ],
  },
  {
    title: "Digital Commerce",
    desc: "Customers increasingly discover products and services online before contacting or purchasing from a business. Learn about digital storefronts, online customer journeys and ways businesses can create a stronger digital presence.",
    icon: "🛍️",
    subhead: "Topics include:",
    bullets: [
      "Digital stores",
      "Online catalogues",
      "E-commerce",
      "Customer journeys",
      "Digital selling",
      "Online customer engagement",
      "Product discovery",
    ],
  },
  {
    title: "Small & Local Business",
    desc: "Small businesses often have different challenges from large enterprises. Limited teams, multiple responsibilities and changing customer expectations require practical solutions.",
    icon: "🏪",
    subhead: "Explore ideas specifically relevant to:",
    bullets: [
      "Retail businesses",
      "Local businesses",
      "Service providers",
      "Professional businesses",
      "Startups",
      "Growing SMEs",
      "E-commerce businesses",
    ],
  },
];

// 2. Recommended Article Categories (5 items from prompt)
const RECOMMENDED_CATEGORIES = [
  {
    title: "How-To Guides",
    desc: "Step-by-step information for using digital tools and improving business processes.",
    icon: "📖",
  },
  {
    title: "Business Insights",
    desc: "Practical ideas around customers, marketing, sales and growth.",
    icon: "💡",
  },
  {
    title: "Technology",
    desc: "Understand how CRM, AI, automation and digital commerce can affect everyday business operations.",
    icon: "⚙️",
  },
  {
    title: "Industry Updates",
    desc: "Important developments in business technology and supported platforms.",
    icon: "🌐",
  },
  {
    title: "Product Updates",
    desc: "News about new MessBee features, improvements and capabilities.",
    icon: "🔔",
  },
];

// 3. Guides That Help You Take Action (4 framework steps from prompt)
const ACTION_GUIDES = [
  {
    q: "What is it?",
    desc: "Understand the technology, concept or business problem.",
    icon: "❓",
  },
  {
    q: "Why does it matter?",
    desc: "See how it can affect your business.",
    icon: "💡",
  },
  {
    q: "When should you use it?",
    desc: "Understand where the solution may actually be useful.",
    icon: "⏰",
  },
  {
    q: "How can you get started?",
    desc: "Follow practical steps and examples where appropriate.",
    icon: "🚀",
  },
];

// 4. For Business Owners & Teams (5 audience roles from prompt)
const AUDIENCE_ROLES = [
  {
    role: "Business Owners",
    desc: "Understand tools and strategies that can help you manage and grow your business.",
    icon: "👔",
  },
  {
    role: "Marketing Teams",
    desc: "Find ideas for campaigns, customer engagement and marketing automation.",
    icon: "📢",
  },
  {
    role: "Sales Teams",
    desc: "Learn about lead management, customer follow-ups and sales workflows.",
    icon: "🎯",
  },
  {
    role: "Customer Support Teams",
    desc: "Explore ways to organize customer communication and improve response workflows.",
    icon: "🎧",
  },
  {
    role: "Technology Teams",
    desc: "Understand integrations, automation, APIs and business technology from a practical perspective.",
    icon: "💻",
  },
];

// 5. Why Read the MessBee Blog? (5 Pillars from prompt)
const WHY_READ_BLOG = [
  {
    title: "Practical Content",
    desc: "We focus on information that can be useful in real business situations.",
    icon: "📌",
  },
  {
    title: "Easy to Understand",
    desc: "Technical topics are explained in straightforward language wherever possible.",
    icon: "📝",
  },
  {
    title: "Business First",
    desc: "Technology is discussed in terms of how it can solve a business problem—not simply because it is a new technology.",
    icon: "💼",
  },
  {
    title: "India-Relevant",
    desc: "Where appropriate, content considers the Indian business environment, customer behaviour and applicable requirements.",
    icon: <svg width="18" height="14" viewBox="0 0 90 60" style={{ borderRadius: 2, flexShrink: 0, marginTop: 4 }}><rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#FFFFFF"/><rect y="40" width="90" height="20" fill="#138808"/><circle cx="45" cy="30" r="8" fill="#000080" /><circle cx="45" cy="30" r="6" fill="#FFFFFF" /><circle cx="45" cy="30" r="2" fill="#000080" /></svg>,
  },
  {
    title: "Regularly Updated",
    desc: "Important articles may be reviewed and updated when products, platforms, technologies or requirements change.",
    icon: "🔄",
  },
];

// 6. Popular Searches (13 tags from prompt)
const POPULAR_SEARCHES = [
  "CRM for small businesses",
  "WhatsApp Business for businesses",
  "Marketing automation",
  "AI for small businesses",
  "Customer engagement",
  "Lead management",
  "Business automation",
  "Digital commerce",
  "E-commerce marketing",
  "Customer retention",
  "Local business marketing",
  "SME technology",
  "Digital transformation",
];

// 7. Frequently Asked Questions (6 items from prompt)
const BLOG_FAQS = [
  {
    q: "What is the MessBee Blog?",
    a: "The MessBee Blog is a collection of business articles, guides, insights and technology resources covering CRM, WhatsApp Business, marketing, AI, automation, digital commerce and business growth.",
  },
  {
    q: "Who can read the MessBee Blog?",
    a: "The content is intended for business owners, entrepreneurs, marketing and sales teams, customer support professionals and technology teams.",
  },
  {
    q: "Is the MessBee Blog only for MessBee customers?",
    a: "No. Publicly available articles can be useful for businesses whether or not they currently use MessBee.",
  },
  {
    q: "What topics does the Blog cover?",
    a: "The main topics include CRM, WhatsApp Business, marketing automation, AI, business automation, digital commerce, customer engagement and small business growth.",
  },
  {
    q: "Does MessBee provide legal or professional advice through its Blog?",
    a: "No. Blog content is provided for general informational purposes and should not be treated as legal, financial, medical or other professional advice.",
  },
  {
    q: "How often will the Blog be updated?",
    a: "New articles and updates can be published as new topics, product developments and relevant business information become available.",
  },
];

/* ── FAQ Accordion Item Component ── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid #F1F5F9` }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          cursor: "pointer",
        }}
      >
        <span className="blog-faq-trigger" style={{ fontSize: 14, fontWeight: 700, color: open ? G : D2, transition: "color .2s" }}>{q}</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: open ? GL : "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .2s",
            color: open ? G : MU,
            border: open ? `1px solid ${GB}` : "1px solid transparent",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d={open ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div className="blog-faq-answer" style={{ fontSize: 13, color: MU, lineHeight: 1.8, paddingBottom: 16 }}>{a}</div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN BLOG PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const BlogPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExplore = () => {
    const el = document.getElementById("explore-topics");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="blog-page-wrapper" style={{ fontFamily: "'Inter', sans-serif", color: "#0F172A", background: "#FFFFFF" }}>
      {/* Dynamic CSS Styling & Media Queries matching Solution/Resource Pages */}
      <style>{`
        /* ── PAGE-WIDE TYPOGRAPHY OVERRIDES (font-size & weight only — no color changes) ── */
        .blog-page-wrapper { font-family: 'Inter', 'Segoe UI', sans-serif !important; }
        .blog-page-wrapper h1,
        .blog-page-wrapper h2 { font-size: clamp(20px, 2.5vw, 32px) !important; font-weight: 900 !important; letter-spacing: -0.5px !important; }
        .blog-page-wrapper h3,
        .blog-page-wrapper h4 { font-size: 12px !important; font-weight: 800 !important; }
        .blog-page-wrapper p { font-size: 12px !important; font-weight: 400 !important; line-height: 1.7 !important; }
        .blog-page-wrapper .blog-faq-trigger { font-size: 14.5px !important; font-weight: 700 !important; }
        .blog-page-wrapper .blog-faq-answer { font-size: 12px !important; line-height: 1.8 !important; }
        .blog-page-wrapper .blog-btn-primary { font-size: 12.5px !important; font-weight: 700 !important; padding: 8px 18px !important; }
        .blog-page-wrapper .blog-btn-secondary { font-size: 12.5px !important; font-weight: 600 !important; padding: 10px 20px !important; }

        .blog-glass-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .blog-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(22, 163, 74, 0.08);
          border-color: #BBF7D0 !important;
        }

        .blog-btn-primary {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
        }
        .blog-btn-primary:hover {
          background: linear-gradient(135deg, #15803D 0%, #166534 100%);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .blog-hero-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .topics-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 22px;
        }

        .flex-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .action-auto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
        }

        /* Large Laptops / Desktops (1440px +) */
        @media (min-width: 1440px) {
          .blog-hero-row { gap: 60px; }
          .topics-auto-grid { gap: 26px; }
        }

        /* Small Laptops & Tablets (under 1024px) */
        @media (max-width: 1023px) {
          .blog-hero-row { flex-direction: column !important; gap: 32px; }
          .topics-auto-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        }

        /* Mobile Breakpoints (768px and under) */
        @media (max-width: 768px) {
          .blog-section {
            padding: 28px 16px !important;
          }
          .blog-hero-section {
            margin-top: 0px !important;
            padding-top: 84px !important;
            padding-bottom: 28px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .blog-hero-row {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .blog-hero-left {
            min-width: 100% !important;
          }
          .blog-hero-graphic-box {
            margin-top: 10px !important;
            padding-top: 24px !important;
            margin-bottom: 0 !important;
            min-width: 0 !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .blog-hero-graphic-card {
            transform: none !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px !important;
            padding: 22px 16px !important;
            box-sizing: border-box !important;
          }
          .blog-btn-primary, .blog-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
          .blog-glass-card {
            padding: 18px 16px !important;
            border-radius: 14px !important;
          }
          .topics-auto-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .flex-auto-grid, .action-auto-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .blog-hero-graphic-card {
            padding: 18px 12px !important;
            border-radius: 18px !important;
          }
          .blog-section {
            padding: 20px 14px !important;
          }
          .blog-hero-section {
            margin-top: 0px !important;
            padding-top: 78px !important;
            padding-bottom: 24px !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          .blog-hero-row {
            gap: 16px !important;
          }
          .blog-glass-card {
            padding: 16px 14px !important;
          }
          .topics-auto-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .flex-auto-grid, .action-auto-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }

        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        .pulse-aura {
          animation: auraPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* SEO Title & Meta Description */}
      <title>MessBee Blog | Business, CRM, WhatsApp, AI & Marketing Insights</title>
      <meta
        name="description"
        content="Explore the MessBee Blog for practical business guides and insights on CRM, WhatsApp Business, marketing automation, AI, digital commerce and customer engagement."
      />
      <link rel="canonical" href="https://messbee.com/resources/blog" />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Uniform Dark Forest Green Branding)
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="blog-hero-section"
        style={{
          marginTop: 0,
          padding: "92px 6% 48px",
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

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="blog-hero-row">
            {/* Left Column: Text Copy */}
            <div className="blog-hero-left" style={{ flex: 1.15 }}>
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
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  border: "1px solid #A7F3D0",
                }}
              >
                MessBee Blog
              </div>

              {/* H1 Heading */}
              <h1
                style={{
                  fontSize: "clamp(28px, 2.9vw, 42px)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.12,
                  letterSpacing: "-1px",
                  marginBottom: 14,
                }}
              >
                MessBee Blog – <span style={{ color: "#16A34A" }}>Practical Insights for Modern Businesses</span>
              </h1>

              <p style={{ fontSize: 16, fontWeight: 800, color: "#16A34A", marginBottom: 12, letterSpacing: "-0.2px" }}>
                Practical Ideas, Guides &amp; Insights for Growing Businesses
              </p>

              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 16, maxWidth: 540 }}>
                The MessBee Blog covers practical insights on CRM, WhatsApp Business, marketing, AI and digital commerce — helping business owners and teams make smarter decisions as they grow.
              </p>

              <div style={{ fontSize: 15, fontWeight: 800, color: "#15803D", marginBottom: 20, letterSpacing: "-0.2px" }}>
                Read. Learn. Apply. Grow.
              </div>

              <div>
                <button className="blog-btn-primary" onClick={handleExplore}>
                  Explore Latest Articles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Graphic Box with Dark Forest Green Gradient */}
            <div className="blog-hero-graphic-box" style={{ flex: 0.85, minWidth: 320, position: "relative", display: "flex", justifyContent: "center", paddingTop: 20, marginBottom: -120 }}>
              <div
                className="blog-hero-graphic-card"
                style={{
                  background: "linear-gradient(135deg, #14532D 0%, #022C22 100%)",
                  borderRadius: 24,
                  padding: 28,
                  boxShadow: "0 32px 80px rgba(0,0,0,.3),0 0 0 1px rgba(255,255,255,.1)",
                  border: "1px solid rgba(34,197,94,.2)",
                  color: "#FFFFFF",
                  position: "relative",
                  width: "100%",
                  maxWidth: 460,
                  transform: "scale(0.75)",
                  transformOrigin: "top center",
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#FFFFFF", padding: 4 }}>
                      <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.3px" }}>MessBee Blog Insights</div>
                      <div style={{ fontSize: 11, color: "#34D399", fontWeight: 700 }}>Practical Knowledge Hub</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, background: "rgba(16,185,129,0.15)", color: "#34D399", padding: "6px 12px", borderRadius: 20, fontWeight: 700, border: "1px solid rgba(16,185,129,0.4)" }}>
                    Updated Weekly
                  </span>
                </div>

                {/* Topic Nodes Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                  {[
                    { label: "Business Growth", icon: "🚀" },
                    { label: "WhatsApp Guide", icon: "💬" },
                    { label: "AI & Automation", icon: "🤖" },
                    { label: "Digital Commerce", icon: "🛍️" },
                  ].map((node, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(16,185,129,0.09)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        borderRadius: 14,
                        padding: "14px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{node.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.2px" }}>{node.label}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#34D399", fontWeight: 700 }}>Actionable Ideas</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(16,185,129,0.09)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#34D399" }}>
                    Read. Learn. Apply. Grow.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: EXPLORE BUSINESS TOPICS (Organized Balanced Grid & Unified Emerald System)
         ═══════════════════════════════════════════════════════════════════ */}
      <section id="explore-topics" className="blog-section" style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Categories &amp; Themes
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Explore <span style={{ color: "#16A34A" }}>Business Topics</span>
            </h2>
          </div>

          {/* 7 Business Topic Cards with Cohesive Palette */}
          <div className="topics-auto-grid">
            {BUSINESS_TOPICS.map((topic, idx) => (
              <div
                key={idx}
                className="blog-glass-card"
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 45}ms`,
                  border: "1px solid #E2E8F0",
                }}
              >
                <div>
                  {/* Unified Header with Emerald Icon Box */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#16A34A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {topic.icon}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", lineHeight: 1.3 }}>
                      {topic.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 12.8, color: "#64748B", lineHeight: 1.62, marginBottom: 16 }}>
                    {topic.desc}
                  </p>

                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#16A34A", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                    {topic.subhead}
                  </div>

                  {/* Bullet Chips List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
                    {topic.bullets.map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#16A34A", fontWeight: 900, fontSize: 12 }}>•</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#334155" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anchored Footer Bar for 100% uniform card sizing */}
                <div
                  style={{
                    marginTop: "auto",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#059669", background: "#D1FAE5", padding: "3px 10px", borderRadius: 20 }}>
                    {topic.bullets.length} Key Topics
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: "#16A34A" }}>
                    Explore Guides ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: FEATURED ARTICLES & LATEST FROM MESSBEE
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Featured Articles
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 10 }}>
              Latest From MessBee
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 640, margin: "0 auto" }}>
              Stay updated with our latest business guides, product insights and technology articles.
            </p>
          </div>

          <div style={{ fontSize: 13, fontWeight: 900, color: "#0F172A", marginBottom: 18, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Recommended article categories:
          </div>

          {/* 5 Recommended Categories Grid - Unified Emerald Palette */}
          <div className="flex-auto-grid">
            {RECOMMENDED_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="blog-glass-card"
                style={{
                  padding: 20,
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${i * 45}ms`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      marginBottom: 12,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: GUIDES THAT HELP YOU TAKE ACTION
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Structured Approach
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              Guides That Help You Take Action
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 680, margin: "0 auto 6px", lineHeight: 1.68 }}>
              The MessBee Blog is not intended to be another collection of generic business articles.
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: "#16A34A", maxWidth: 500, margin: "0 auto" }}>
              Our goal is to explain:
            </p>
          </div>

          {/* 4 Action Steps Grid - Unified Palette */}
          <div className="action-auto-grid" style={{ marginBottom: 24 }}>
            {ACTION_GUIDES.map((item, idx) => (
              <div
                key={idx}
                className="blog-glass-card"
                style={{
                  padding: 22,
                  animationDelay: `${idx * 50}ms`,
                  // border: "4px solid ",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: "#0F172A" }}>
                    {item.q}
                  </h3>
                </div>
                <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "#475569", textAlign: "center", fontWeight: 700 }}>
            This keeps the content useful for business owners who may not have a technical background.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FOR BUSINESS OWNERS & TEAMS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Audience Focus
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 12 }}>
              For Business Owners &amp; Teams
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", maxWidth: 760, margin: "0 auto", lineHeight: 1.68 }}>
              Whether you are running a local shop, managing an e-commerce brand, providing professional services or building a growing company, the MessBee Blog is designed to provide information that can be applied to real business situations.
            </p>
          </div>

          {/* 5 Audience Cards - Unified Palette */}
          <div className="flex-auto-grid">
            {AUDIENCE_ROLES.map((aud, idx) => (
              <div
                key={idx}
                className="blog-glass-card"
                style={{
                  padding: 20,
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 45}ms`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: 12,
                    }}
                  >
                    {aud.icon}
                  </div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {aud.role}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {aud.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: WHY READ THE MESSBEE BLOG?
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-block",
                background: "#D1FAE5",
                color: "#059669",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Our Core Pillars
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Why Read the <span style={{ color: "#16A34A" }}>MessBee Blog?</span>
            </h2>
          </div>

          {/* 5 Reasons Grid - Unified Palette */}
          <div className="flex-auto-grid">
            {WHY_READ_BLOG.map((item, idx) => (
              <div
                key={idx}
                className="blog-glass-card"
                style={{
                  padding: 20,
                  animationDelay: `${idx * 45}ms`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      marginBottom: 12,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: OUR APPROACH TO BUSINESS INFORMATION
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: GL, borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Pill>Our Approach to Business Information</Pill>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: D2, letterSpacing: "-1px", marginBottom: 14 }}>
            Technology and platform policies can change quickly.
          </h2>

          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 14 }}>
            Where an article discusses services such as Meta, WhatsApp, payment providers, APIs or regulatory requirements, readers should also refer to the relevant official source for the latest information.
          </p>

          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20 }}>
            MessBee does not present third-party policies or services as being under its control.
          </p>

          <div style={{ fontSize: 15, fontWeight: 900, color: G, letterSpacing: "-0.2px" }}>
            This approach helps keep our content useful without making unsupported guarantees.
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: POPULAR SEARCHES
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 8 }}>
              Popular Searches
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B" }}>
              Visitors can explore the Blog by topics such as:
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 960, margin: "0 auto" }}>
            {POPULAR_SEARCHES.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 30,
                  padding: "8px 16px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#334155",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#16A34A";
                  e.currentTarget.style.color = "#16A34A";
                  e.currentTarget.style.background = "#F0FDF4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "#F8FAFC";
                }}
              >
                • {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: START WITH WHAT YOUR BUSINESS NEEDS (FINAL CTA)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: GL, padding: "72px 6%", textAlign: "center", position: "relative", overflow: "hidden", borderBottom: `1px solid ${GB}` }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "rgba(22,163,74,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto" }}>
          <Pill>Start With What Your Business Needs</Pill>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: D2, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>
            You don't need to adopt every new technology<br />
            <span style={{ color: G }}>to build a better business.</span>
          </h2>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 12, maxWidth: 700, margin: "0 auto 12px" }}>
            Start by understanding the problem you are trying to solve.
          </p>
          <p style={{ fontSize: 13.5, color: MU, lineHeight: 1.68, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
            Then explore the tools, processes and strategies that make sense for your business. The MessBee Blog is here to help you make that decision with better information.
          </p>
          <div style={{ fontSize: 16.5, fontWeight: 900, color: G, marginBottom: 26, letterSpacing: "-0.3px" }}>
            Read Something Useful Today.
          </div>
          <button className="blog-btn-primary" onClick={handleExplore} style={{ fontSize: 13, padding: "11px 26px" }}>
            Explore the Blog
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: FREQUENTLY ASKED QUESTIONS
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Pill>FAQ</Pill>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 900, color: D2, letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ borderTop: "1px solid #F1F5F9" }}>
            {BLOG_FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
