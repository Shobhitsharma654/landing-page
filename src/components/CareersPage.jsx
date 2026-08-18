import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════
   MessBee — Careers Page
   SEO Title: Careers at MessBee | Jobs, Internships & Career Opportunities
   ═══════════════════════════════════════════════ */

const WHY_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Work on a Real Product",
    desc: "Build and improve technology that is designed for real businesses and their everyday needs.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Learn & Grow",
    desc: "Work across modern technologies, product development and business use cases while continuing to develop your skills.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Solve Meaningful Problems",
    desc: "From customer management to automation and digital commerce, you'll work on problems that directly affect how businesses operate.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Work With a Growing Team",
    desc: "Join a team where ideas, ownership and practical problem-solving are valued.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Build for a Diverse Market",
    desc: "Work on products designed for businesses across different industries, sizes and locations.",
  },
];

const TEAMS = [
  {
    name: "Engineering & Technology",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    roles: ["Frontend Development", "Backend Development", "Full-Stack Development", "Mobile App Development", "API & Integrations", "QA & Testing", "DevOps"],
  },
  {
    name: "Product & Design",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="12 8 8 12 12 16 16 12 12 8" />
      </svg>
    ),
    roles: ["Product Management", "UI/UX Design", "Product Design", "User Research"],
  },
  {
    name: "Business & Growth",
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    roles: ["Sales", "Business Development", "Marketing", "Customer Success", "Partnerships"],
  },
  {
    name: "Operations",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.42 1.42M4.93 4.93l1.42 1.42M19.07 19.07l-1.42-1.42M4.93 19.07l1.42-1.42M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    roles: ["Customer Support", "Business Operations", "Administration"],
  },
];

const STEPS = [
  { num: "01", title: "Apply", desc: "Submit your application for a suitable opening." },
  { num: "02", title: "Initial Review", desc: "Our team reviews your profile, skills and relevant experience." },
  { num: "03", title: "Interview / Assessment", desc: "Depending on the position, you may be invited for an interview or practical assessment." },
  { num: "04", title: "Selection", desc: "Selected candidates receive further information about the role and joining process." },
];

const FAQS = [
  {
    q: "How can I apply for a job at MessBee?",
    a: "You can apply through the relevant job opening published on the MessBee Careers page or submit your resume through the designated careers channel.",
  },
  {
    q: "Can students apply for internships?",
    a: "Yes, where internship opportunities are available and the candidate meets the requirements specified for the particular program.",
  },
  {
    q: "Do you offer remote work?",
    a: "Work arrangements depend on the specific role and current company requirements. The applicable job description will mention the working arrangement.",
  },
  {
    q: "What technologies does MessBee use?",
    a: "MessBee's technology environment may include React.js, Next.js, Flutter, Node.js, Python, NestJS, Django, Spring Boot and databases such as MongoDB, MySQL and PostgreSQL.",
  },
  {
    q: "Can I send my resume even if there is no suitable vacancy?",
    a: "Yes. You may submit your resume to careers@messbee.com for consideration for future opportunities.",
  },
];

const TECH_STACK = [
  { label: "Frontend", value: "React.js, Next.js, JavaScript, TypeScript", color: "#0EA5E9" },
  { label: "Mobile", value: "Flutter", color: "#38BDF8" },
  { label: "Backend", value: "Node.js, Python, NestJS, Django, Spring Boot", color: "#16A34A" },
  { label: "Database", value: "MongoDB, MySQL, PostgreSQL", color: "#7C3AED" },
  { label: "Tools", value: "Git, GitHub, VS Code, Android Studio, Postman", color: "#D97706" },
];

const TRAITS = [
  "Curious and willing to learn",
  "Responsible about their work",
  "Comfortable solving problems",
  "Open to feedback",
  "Interested in building quality products",
  "Able to work collaboratively",
  "Willing to take ownership of their responsibilities",
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${open ? "#BBF7D0" : "#E2E8F0"}`,
        borderRadius: 14,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: open ? "0 0 0 3px rgba(22,163,74,0.07)" : "none",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          background: open ? "#16A34A" : "#F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "background 0.2s",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? "#fff" : "#64748B"} strokeWidth="2.5" strokeLinecap="round">
            {open ? <line x1="5" y1="12" x2="19" y2="12" /> : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>}
          </svg>
        </span>
      </div>
      {open && (
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "14px 0 0", paddingRight: 44 }}>
          {a}
        </p>
      )}
    </div>
  );
};

const CareersPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .careers-btn-primary {
          background: #16A34A; color: #FFFFFF; border: none;
          borderRadius: 40px; padding: 14px 32px; fontSize: 15px;
          fontWeight: 700; cursor: pointer; font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
          border-radius: 40px;
        }
        .careers-btn-primary:hover { background: #15803D; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22,163,74,0.35); }
        .careers-btn-secondary {
          background: transparent; color: #16A34A;
          border: 1.5px solid #16A34A; border-radius: 40px;
          padding: 13px 30px; fontSize: 15px; fontWeight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .careers-btn-secondary:hover { background: #F0FDF4; transform: translateY(-2px); }
        .why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(15,23,42,0.08); }
        .trait-pill:hover { background: #DCFCE7; border-color: #86EFAC; color: #166534; }
        @media (max-width: 768px) {
          .careers-hero-btns { flex-direction: column; }
          .teams-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .tech-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <title>Careers at MessBee | Jobs, Internships & Career Opportunities</title>
      <meta name="description" content="Explore career and internship opportunities at MessBee across technology, product, design, marketing, sales, customer success and business operations." />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{
        background: "#FFFFFF", paddingTop: 130, paddingBottom: 80,
        paddingLeft: "6%", paddingRight: "6%",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #F1F5F9",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none",
        }} />
        {/* Green glow */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 15% 60%, rgba(22,163,74,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(22,163,74,0.05) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 40, padding: "6px 16px", marginBottom: 28 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", letterSpacing: "0.3px" }}>We're Hiring</span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: 20, maxWidth: 740 }}>
            Careers at <span style={{ color: "#16A34A" }}>MessBee</span>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#334155", marginBottom: 16, letterSpacing: "-0.3px" }}>
            Build the Future of Digital Business With Us
          </p>
          <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 4, marginBottom: 28 }} />
          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.8, maxWidth: 600, marginBottom: 20 }}>
            MessBee is building tools that help businesses manage customers, communication, marketing, automation and digital commerce from one connected platform.
          </p>
          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, maxWidth: 600, marginBottom: 20 }}>
            We are looking for people who enjoy solving real problems, learning new technologies and building products that businesses can actually use.
          </p>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#16A34A", lineHeight: 1.6, maxWidth: 600, marginBottom: 40, letterSpacing: "-0.3px" }}>
            If you want to work on meaningful technology and grow with a developing product, we'd like to hear from you.
          </p>

          <div className="careers-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="careers-btn-primary" onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              View Open Positions
            </button>
            <button className="careers-btn-secondary" onClick={() => window.location.href = "mailto:careers@messbee.com"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Send Your Resume
            </button>
          </div>
        </div>
      </section>

      {/* ═══ WHY MESSBEE ═══ */}
      <section style={{ padding: "80px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Why MessBee</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 16 }}>
              Why Work With <span style={{ color: "#16A34A" }}>MessBee?</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>
              Five reasons people choose to build their careers here.
            </p>
          </div>

          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="why-card" style={{
                background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 18,
                padding: "32px 28px", transition: "transform 0.25s, box-shadow 0.25s",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: "#F0FDF4",
                  border: "1px solid #BBF7D0", color: "#16A34A",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE LOOK FOR ═══ */}
      <section style={{ padding: "80px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Our Ideal Candidate</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 20 }}>
              What We <span style={{ color: "#16A34A" }}>Look For</span>
            </h2>
            <div style={{ width: 48, height: 4, background: "linear-gradient(90deg,#16A34A,#4ADE80)", borderRadius: 4, marginBottom: 24 }} />
            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 16 }}>
              We value people who are:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TRAITS.map((trait, i) => (
                <div key={i} className="trait-pill" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 40,
                  padding: "10px 18px", fontSize: 14, fontWeight: 600, color: "#334155",
                  transition: "background 0.2s, border-color 0.2s, color 0.2s", width: "fit-content",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                  {trait}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 32, background: "#F0FDF4", border: "1px solid #BBF7D0",
              borderRadius: 14, padding: "18px 22px",
            }}>
              <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.75, fontWeight: 500 }}>
                <strong>You don't need to know everything when you join.</strong> A willingness to learn and improve matters.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Technology Environment</p>
            <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 20 }}>
              Our <span style={{ color: "#16A34A" }}>Tech Stack</span>
            </h2>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, marginBottom: 28 }}>
              MessBee works with modern web, mobile and backend technologies. Technology choices may evolve as the product and engineering requirements grow.
            </p>
            <div className="tech-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TECH_STACK.map((t, i) => (
                <div key={i} style={{
                  background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14,
                  padding: "16px 18px", gridColumn: i === 4 ? "1 / -1" : undefined,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: t.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>{t.label}</div>
                  <div style={{ fontSize: 13, color: "#334155", fontWeight: 500, lineHeight: 1.6 }}>{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAMS ═══ */}
      <section style={{ padding: "80px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Our Teams</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.5px", marginBottom: 16 }}>
              Teams at <span style={{ color: "#16A34A" }}>MessBee</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>
              Depending on current openings, opportunities may be available across these areas.
            </p>
          </div>
          <div className="teams-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {TEAMS.map((team, i) => (
              <div key={i} style={{
                background: "#FFFFFF", border: `1px solid ${team.border}`,
                borderRadius: 18, padding: "28px 24px",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: team.bg, border: `1px solid ${team.border}`,
                  color: team.color, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  {team.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", marginBottom: 14 }}>{team.name}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {team.roles.map((role, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: team.color, flexShrink: 0 }} />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STUDENTS ═══ */}
      <section style={{ padding: "80px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
            border: "1px solid #BBF7D0", borderRadius: 24, padding: "52px 56px",
            display: "flex", gap: 60, alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <div style={{ flex: "1 1 340px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 40, padding: "6px 14px", marginBottom: 20 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#166534" }}>Students & Early-Career</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 16 }}>
                Starting Your Career?
              </h2>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
                We believe in giving students and early-career professionals opportunities to gain practical experience. Depending on current programs and openings, opportunities may include internships, graduate roles, junior developer positions, design roles and technical training opportunities.
              </p>
              <p style={{ fontSize: 13, color: "#6B7280", marginTop: 16, lineHeight: 1.7 }}>
                Available positions, eligibility, duration and compensation will be specified in the relevant job or internship listing.
              </p>
            </div>
            <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 12 }}>
              {["Internships", "Graduate roles", "Junior Developer positions", "Design roles", "Technical training opportunities"].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "#FFFFFF", border: "1px solid #D1FAE5", borderRadius: 12,
                  padding: "14px 18px", fontSize: 14, fontWeight: 600, color: "#065F46",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HIRING PROCESS ═══ */}
      <section style={{ padding: "80px 6%", background: "#0F172A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#4ADE80", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Hiring Process</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-1.5px", marginBottom: 16 }}>
              How Our Hiring <span style={{ color: "#4ADE80" }}>Process Works</span>
            </h2>
            <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 480, margin: "0 auto" }}>
              Our process may vary by role, but generally follows these steps.
            </p>
          </div>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: "absolute", top: 30, left: "calc(100% - 12px)", width: "24px",
                    height: 2, background: "rgba(74,222,128,0.3)", zIndex: 0,
                    display: window.innerWidth > 768 ? "block" : "none",
                  }} />
                )}
                <div style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18, padding: "28px 24px", position: "relative", zIndex: 1,
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#4ADE80" }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPEN POSITIONS / NO OPENING ═══ */}
      <section id="open-positions" style={{ padding: "80px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "stretch" }}>
          {/* Open Positions */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "44px 40px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>View Open Positions</h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 28 }}>
              Check our current openings across engineering, product, design, business and operations. Find the role that matches your skills and ambitions.
            </p>
            <button className="careers-btn-primary" onClick={() => window.location.href = "mailto:careers@messbee.com"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              View Open Positions
            </button>
          </div>

          {/* No Suitable Opening */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: "44px 40px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>No Suitable Opening?</h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 16 }}>
              We may not always have an opening that matches your profile. You can still share your resume with us for consideration when a relevant opportunity becomes available.
            </p>
            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 28, lineHeight: 1.7 }}>
              Please do not send confidential information, passwords, financial credentials or other sensitive personal information in your resume or application unless specifically required.
            </p>
            <button className="careers-btn-secondary" onClick={() => window.location.href = "mailto:careers@messbee.com"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Send Your Resume
            </button>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 16 }}>
              📧 <a href="mailto:careers@messbee.com" style={{ color: "#16A34A", textDecoration: "none", fontWeight: 600 }}>careers@messbee.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ EQUAL OPPORTUNITY ═══ */}
      <section style={{ padding: "48px 6%", background: "#FFFFFF", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)", border: "1px solid #E2E8F0",
            borderRadius: 18, padding: "32px 36px", display: "flex", alignItems: "flex-start", gap: 20,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>Equal Opportunity</h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                MessBee aims to provide a professional working environment where employment decisions are based on relevant qualifications, skills, experience and business requirements, subject to applicable law. We encourage applications from qualified candidates with diverse backgrounds and experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: "80px 6%", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>
              Frequently Asked <span style={{ color: "#16A34A" }}>Questions</span>
            </h2>
          </div>
          {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
        </div>
      </section>

      {/* ═══ JOIN US CTA ═══ */}
      <section style={{ padding: "48px 6%", background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)", position: "relative", overflow: "hidden", borderTop: "1px solid #BBF7D0" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #86EFAC 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.25, pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32, position: "relative", zIndex: 1 }}>
          <div style={{ flex: "1 1 420px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #BBF7D0", borderRadius: 40, padding: "5px 14px", marginBottom: 16 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", display: "inline-block", boxShadow: "0 0 6px #16A34A" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", letterSpacing: "0.4px" }}>Now Hiring</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.2px", marginBottom: 10 }}>
              Join <span style={{ color: "#16A34A" }}>Us</span> at MessBee
            </h2>
            <p style={{ fontSize: 15, color: "#166534", lineHeight: 1.75, maxWidth: 480, marginBottom: 8 }}>
              Great products are built by people who care about the problems they are solving. Explore opportunities at MessBee.
            </p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#15803D", letterSpacing: "-0.2px" }}>
              Build. Learn. Contribute. Grow.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button
              className="careers-btn-primary"
              style={{ background: "#16A34A", boxShadow: "0 4px 16px rgba(22,163,74,0.35)" }}
              onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              View Open Positions
            </button>
            <button
              className="careers-btn-secondary"
              style={{ borderColor: "#16A34A", color: "#16A34A", background: "#FFFFFF" }}
              onClick={() => window.location.href = "mailto:careers@messbee.com"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Send Your Resume
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SEO INFORMATION ═══ */}
      <section style={{ padding: "64px 6%", background: "#FFFFFF", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 40, padding: "5px 14px", marginBottom: 16 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", letterSpacing: "0.4px" }}>SEO Information</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 6 }}>
              Page SEO <span style={{ color: "#16A34A" }}>Details</span>
            </h2>
            <p style={{ fontSize: 14, color: "#64748B" }}>Metadata and keyword information for this careers page.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>

            {/* SEO Title */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h8M4 18h12"/></svg>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>SEO Title</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", lineHeight: 1.6 }}>
                Careers at MessBee | Jobs, Internships &amp; Career Opportunities
              </p>
            </div>

            {/* Meta Description */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>Meta Description</span>
              </div>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                Explore career and internship opportunities at MessBee across technology, product, design, marketing, sales, customer success and business operations.
              </p>
            </div>

            {/* Suggested URL + H1 */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>Suggested URL</span>
                </div>
                <code style={{ fontSize: 12, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 6, padding: "4px 10px", fontFamily: "monospace" }}>
                  messbee.com/careers
                </code>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>Recommended H1</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", lineHeight: 1.5 }}>
                  Careers at MessBee – Build, Learn &amp; Grow With Us
                </p>
              </div>
            </div>

            {/* Primary Keywords */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>Primary Keywords</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "MessBee careers", "MessBee jobs", "MessBee internship",
                  "SaaS jobs India", "Software developer jobs", "Technology careers",
                  "Startup jobs India", "Software internship India",
                  "Product design jobs", "Business development jobs"
                ].map((kw, i) => (
                  <span key={i} style={{
                    fontSize: 12, fontWeight: 600, color: "#166534",
                    background: "#DCFCE7", border: "1px solid #86EFAC",
                    borderRadius: 20, padding: "4px 12px",
                  }}>{kw}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 22px", gridColumn: "2 / span 2" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M14 12H3"/></svg>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px" }}>Page CTAs</span>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200, background: "#FFFFFF", border: "1px solid #BBF7D0", borderRadius: 12, padding: "16px 20px" }}>
                  <p style={{ fontSize: 10, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Primary CTA</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>View Open Positions</p>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>Scrolls to open positions section</p>
                </div>
                <div style={{ flex: 1, minWidth: 200, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px 20px" }}>
                  <p style={{ fontSize: 10, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Secondary CTA</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>Send Your Resume</p>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>Opens careers@messbee.com</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
