import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { 
  FiMail, 
  FiTrendingUp, 
  FiLifeBuoy, 
  FiAward, 
  FiBriefcase, 
  FiMapPin, 
  FiShare2, 
  FiHelpCircle, 
  FiSend, 
  FiPhone, 
  FiClock,
  FiChevronDown
} from "react-icons/fi";

/* ══════════════════════════════════════════════════════
   MessBee — Contact Us Page
   Premium styling, stacked vertical sections, animated, react-icons.
   ══════════════════════════════════════════════════════ */

const FAQS = [
  {
    q: "What can I contact MessBee about?",
    a: "You can contact us regarding products, pricing, sales, partnerships, general enquiries, account-related questions and other business requirements."
  },
  {
    q: "How can I contact MessBee Support?",
    a: "For existing customers who need product or technical assistance, contact support@messbee.com or visit the Help Center."
  },
  {
    q: "Can I request a MessBee product demonstration?",
    a: "Yes, where demo availability is offered. You can submit a sales enquiry with details about your business and requirements."
  },
  {
    q: "Can businesses become MessBee partners?",
    a: "Yes. Businesses interested in partnership opportunities can contact the MessBee partnership team through the relevant enquiry channel."
  },
  {
    q: "Where is MessBee based?",
    a: "MessBee is operated in India."
  },
  {
    q: "How long does it take to receive a response?",
    a: "Response times can vary depending on the type and complexity of the enquiry. Support and business enquiries may have different response processes."
  }
];

const INTERESTED_OPTIONS = [
  "MessBee Products",
  "CRM",
  "WhatsApp Business",
  "Marketing Automation",
  "AI & Automation",
  "Digital Store",
  "Enterprise Solutions",
  "Partnership",
  "General Enquiry",
  "Other"
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${open ? "#16A34A" : "#E2E8F0"}`,
        borderRadius: 16,
        padding: "18px 26px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: open ? "0 10px 25px -5px rgba(22,163,74,0.08)" : "0 2px 8px rgba(0,0,0,0.01)",
        marginBottom: 10,
        textAlign: "left"
      }}
      className="faq-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 15.5, fontWeight: 700, color: "#0F172A", transition: "color 0.2s" }} className="faq-question">{q}</span>
        <span style={{
          width: 32, height: 32, borderRadius: "50%",
          background: open ? "#16A34A" : "#F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.3s ease"
        }} className="faq-icon-holder">
          <FiChevronDown style={{ 
            width: 16, height: 16, 
            stroke: open ? "#fff" : "#64748B", 
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease"
          }} />
        </span>
      </div>
      <div style={{
        maxHeight: open ? 200 : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.3s ease"
      }}>
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "16px 0 0", paddingRight: 44 }}>
          {a}
        </p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    interestedIn: "MessBee Products",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          subject: form.interestedIn,
          message: `Business: ${form.businessName || "N/A"}\nPhone: ${form.phone || "N/A"}\n\n${form.message}`
        })
      });
      if (res.ok) {
        setStatus("success");
        setForm({ fullName: "", businessName: "", email: "", phone: "", interestedIn: "MessBee Products", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "clip", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 0px; position: relative; }
        .form-label { font-size: 13.5px; font-weight: 700; color: #475569; text-align: left; transition: color 0.2s; }
        .required-indicator {
          color: #EF4444;
          border-bottom: 1.5px dotted #EF4444;
          margin-left: 3px;
          cursor: help;
          display: inline-block;
          font-weight: 700;
        }
        
        .form-input-container { position: relative; width: 100%; }
        .form-input { width: 100%; height: 50px; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 0 18px; font-size: 14.5px; font-family: inherit; color: #0F172A; transition: all 0.3s; outline: none; background: #FAFAFA; }
        .form-input:hover { border-color: #CBD5E1; background: #FFFFFF; }
        .form-input:focus { border-color: #16A34A; background: #FFFFFF; box-shadow: 0 0 0 4px rgba(22,163,74,0.1); }
        .form-group:focus-within .form-label { color: #16A34A; }

        .form-select { width: 100%; height: 50px; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 0 18px; font-size: 14.5px; font-family: inherit; color: #0F172A; outline: none; background: #FAFAFA; cursor: pointer; transition: all 0.3s; }
        .form-select:hover { border-color: #CBD5E1; background: #FFFFFF; }
        .form-select:focus { border-color: #16A34A; background: #FFFFFF; box-shadow: 0 0 0 4px rgba(22,163,74,0.1); }
        
        .form-textarea { width: 100%; min-height: 120px; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 18px; font-size: 14.5px; font-family: inherit; color: #0F172A; transition: all 0.3s; outline: none; resize: vertical; background: #FAFAFA; }
        .form-textarea:hover { border-color: #CBD5E1; background: #FFFFFF; }
        .form-textarea:focus { border-color: #16A34A; background: #FFFFFF; box-shadow: 0 0 0 4px rgba(22,163,74,0.1); }
        
        .submit-btn { width: 100%; height: 52px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 9999px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(22,163,74,0.25); }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22,163,74,0.35); }

        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 1px;
        }
        @media (max-width: 640px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        
        /* Interactive Cards System */
        .channel-card { 
          background: #FFFFFF; 
          border: 1.5px solid #F1F5F9; 
          border-radius: 20px; 
          padding: 28px; 
          text-align: left; 
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(15,23,42,0.015);
        }
        
        .channel-card::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 4px;
          transition: all 0.3s ease;
        }

        /* Color Coding with custom highlights & border gradients */
        .card-green::before { background: #16A34A; opacity: 0; }
        .card-green:hover { border-color: #BBF7D0; transform: translateY(-5px); box-shadow: 0 12px 24px -8px rgba(22,163,74,0.12); }
        .card-green:hover::before { opacity: 1; }

        .card-purple::before { background: #7C3AED; opacity: 0; }
        .card-purple:hover { border-color: #DDD6FE; transform: translateY(-5px); box-shadow: 0 12px 24px -8px rgba(124,58,237,0.12); }
        .card-purple:hover::before { opacity: 1; }

        .card-blue::before { background: #0284C7; opacity: 0; }
        .card-blue:hover { border-color: #BAE6FD; transform: translateY(-5px); box-shadow: 0 12px 24px -8px rgba(2,132,199,0.12); }
        .card-blue:hover::before { opacity: 1; }

        .card-amber::before { background: #D97706; opacity: 0; }
        .card-amber:hover { border-color: #FDE68A; transform: translateY(-5px); box-shadow: 0 12px 24px -8px rgba(217,119,6,0.12); }
        .card-amber:hover::before { opacity: 1; }

        .card-slate::before { background: #475569; opacity: 0; }
        .card-slate:hover { border-color: #E2E8F0; transform: translateY(-5px); box-shadow: 0 12px 24px -8px rgba(71,85,105,0.12); }
        .card-slate:hover::before { opacity: 1; }

        .contact-btn { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; padding: 10px 22px; border-radius: 9999px; font-size: 13.5px; font-weight: 700; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; margin-top: 16px; box-shadow: 0 4px 12px rgba(22,163,74,0.2); }
        .contact-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(22,163,74,0.3); }

        .contact-btn.btn-purple { background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%); box-shadow: 0 4px 12px rgba(124,58,237,0.2); }
        .contact-btn.btn-purple:hover { box-shadow: 0 6px 16px rgba(124,58,237,0.3); }

        .contact-btn.btn-blue { background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); box-shadow: 0 4px 12px rgba(2,132,199,0.2); }
        .contact-btn.btn-blue:hover { box-shadow: 0 6px 16px rgba(2,132,199,0.3); }

        .contact-btn.btn-amber { background: linear-gradient(135deg, #D97706 0%, #B45309 100%); box-shadow: 0 4px 12px rgba(217,119,6,0.2); }
        .contact-btn.btn-amber:hover { box-shadow: 0 6px 16px rgba(217,119,6,0.3); }
        
        .contact-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #16A34A; border: 1.5px solid #16A34A; padding: 9px 20px; border-radius: 9999px; font-size: 13.5px; font-weight: 700; text-decoration: none; transition: all 0.3s ease; cursor: pointer; margin-top: 16px; }
        .contact-btn-secondary:hover { background: #F0FDF4; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(22,163,74,0.06); }
        
        .enquiry-form-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 8px 30px rgba(15,23,42,0.03);
          max-width: 960px;
          margin: 0 auto 80px auto;
          text-align: left;
        }

        .contact-btn-secondary.btn-secondary-slate { color: #475569; border-color: #CBD5E1; }
        .contact-btn-secondary.btn-secondary-slate:hover { background: #F8FAFC; border-color: #475569; box-shadow: 0 4px 12px rgba(71,85,105,0.06); }

        .contact-hero { padding-top: 130px; padding-bottom: 56px; padding-left: 6%; padding-right: 6%; }
        .contact-content { padding: 56px 6%; }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .contact-hero { padding-left: 4%; padding-right: 4%; }
          .contact-content { padding-left: 4%; padding-right: 4%; }
        }
        @media (max-width: 1024px) {
          .contact-hero { padding-top: 120px; padding-bottom: 36px; }
          .enquiry-form-container { padding: 40px 32px; }
        }
        @media (max-width: 768px) {
          .enquiry-form-container { padding: 32px 20px; border-radius: 16px; margin-bottom: 56px; }
        }
        @media (max-width: 480px) {
          .contact-hero { padding-top: 110px; padding-bottom: 24px; }
        }

        .faq-card:hover { border-color: #16A34A; }
        
        /* Spin animation */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <title>Contact MessBee | Sales, Support &amp; Business Enquiries</title>
      <meta name="description" content="Contact MessBee for product information, sales enquiries, customer support, partnerships and business solutions for CRM, marketing, automation and digital commerce." />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="contact-hero" style={{
        background: "#FFFFFF",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #F1F5F9",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
          backgroundSize: "30px 30px", opacity: 0.5, pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 8% 50%, rgba(22,163,74,0.06) 0%, transparent 45%), radial-gradient(circle at 90% 20%, rgba(22,163,74,0.04) 0%, transparent 40%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 40, padding: "6px 16px", marginBottom: 24 }}>
            <FiMail style={{ color: "#16A34A", width: 14, height: 14 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", letterSpacing: "0.4px" }}>Get In Touch</span>
          </div>

          <h1 style={{ fontSize: "clamp(35px, 2.9vw, 62px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-2px", lineHeight: 1.06, marginBottom: 20 }}>
            Contact MessBee – <span style={{ color: "#16A34A" }}>Let’s Talk About Your Business</span>
          </h1>

          <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 4, marginBottom: 24 }} />

          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 1190, margin: 0 }}>
            Have a question about MessBee, want to explore a business solution, or interested in working with us?<br /><br />
            Whether you're looking for product information, support, a partnership opportunity, or a solution for your business, our team is here to help.
          </p>

          <p style={{ fontSize: 15, fontWeight: 600, color: "#16A34A", marginTop: 16, margin: "16px 0 0 0" }}>
            Tell us what you need. We’ll help you find the right way forward.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button className="contact-btn" style={{ margin: 0 }} onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}>
              <FiSend style={{ width: 14, height: 14 }} /> Send an Enquiry
            </button>
            <button className="contact-btn-secondary" style={{ margin: 0 }} onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="contact-content" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          
          {/* 1. "How Can We Help?" Section */}
          <div style={{ textAlign: "left", marginBottom: 80 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.8px", marginBottom: 12 }}>How Can We Help?</h2>
            <div style={{ width: 48, height: 4, background: "linear-gradient(90deg, #16A34A, #4ADE80)", borderRadius: 2, marginBottom: 32 }} />
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              
              {/* General Enquiries */}
              <div className="channel-card card-green">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FiMail style={{ color: "#16A34A", width: 18, height: 18 }} />
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>General Enquiries</span>
                </div>
                <p style={{ fontSize: 13.8, color: "#475569", lineHeight: 1.6, margin: "0 0 18px 0" }}>
                  Have a question about MessBee, our products or how the platform works?
                </p>
                <div style={{ fontSize: 13.8, fontWeight: 700, color: "#16A34A" }}>
                  Email: <a href="mailto:info@messbee.com" style={{ color: "#16A34A", textDecoration: "none", borderBottom: "1.5px solid transparent", transition: "border-color 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "#16A34A"} onMouseOut={e => e.currentTarget.style.borderColor = "transparent"}>info@messbee.com</a>
                </div>
              </div>

              {/* Sales & Business */}
              <div className="channel-card card-purple" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F3FF", border: "1px solid #DDD6FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiTrendingUp style={{ color: "#7C3AED", width: 18, height: 18 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Sales &amp; Business Enquiries</span>
                  </div>
                  <p style={{ fontSize: 13.8, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    Interested in MessBee for your business or want to discuss a suitable plan?
                  </p>
                </div>
                <button className="contact-btn btn-purple" style={{ alignSelf: "flex-start", fontSize: 12.5, padding: "8px 18px" }} onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}>
                  Talk to Sales
                </button>
              </div>

              {/* Customer Support */}
              <div className="channel-card card-blue" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0F9FF", border: "1px solid #BAE6FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiLifeBuoy style={{ color: "#0284C7", width: 18, height: 18 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Customer Support</span>
                  </div>
                  <p style={{ fontSize: 13.8, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    Already using MessBee and need help with your account, product or integration?
                  </p>
                  <div style={{ fontSize: 13.8, fontWeight: 700, color: "#0284C7", marginTop: 14, marginBottom: 14 }}>
                    Email: <a href="mailto:support@messbee.com" style={{ color: "#0284C7", textDecoration: "none", borderBottom: "1.5px solid transparent", transition: "border-color 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "#0284C7"} onMouseOut={e => e.currentTarget.style.borderColor = "transparent"}>support@messbee.com</a>
                  </div>
                </div>
                <button className="contact-btn btn-blue" style={{ alignSelf: "flex-start", fontSize: 12.5, padding: "8px 18px", margin: 0 }} onClick={() => window.location.href = "mailto:support@messbee.com"}>
                  Contact Support
                </button>
              </div>

              {/* Partnerships */}
              <div className="channel-card card-amber" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFFBEB", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiAward style={{ color: "#D97706", width: 18, height: 18 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Partnerships</span>
                  </div>
                  <p style={{ fontSize: 13.8, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    Interested in becoming a MessBee partner, technology partner or business partner?
                  </p>
                </div>
                <button className="contact-btn btn-amber" style={{ alignSelf: "flex-start", fontSize: 12.5, padding: "8px 18px" }} onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}>
                  Become a Partner
                </button>
              </div>

              {/* Careers */}
              <div className="channel-card card-slate" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FAFAFA", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiBriefcase style={{ color: "#475569", width: 18, height: 18 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Careers</span>
                  </div>
                  <p style={{ fontSize: 13.8, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    Looking for career or internship opportunities at MessBee?
                  </p>
                  <div style={{ fontSize: 13.8, fontWeight: 700, color: "#475569", marginTop: 14, marginBottom: 14 }}>
                    Email: <a href="mailto:info@messbee.com" style={{ color: "#475569", textDecoration: "none", borderBottom: "1.5px solid transparent", transition: "border-color 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "#475569"} onMouseOut={e => e.currentTarget.style.borderColor = "transparent"}>info@messbee.com</a>
                  </div>
                </div>
                <button className="contact-btn-secondary btn-secondary-slate" style={{ alignSelf: "flex-start", fontSize: 12.5, padding: "8px 18px", margin: 0 }} onClick={() => navigate("/careers")}>
                  View Careers
                </button>
              </div>
            </div>
          </div>

          {/* 2. "Tell Us About Your Requirement" Section */}
          <div id="enquiry-form" className="enquiry-form-container">
            <div style={{ marginBottom: 26 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.8px", marginBottom: 8 }}>Tell Us About Your Requirement</h2>
              <p style={{ fontSize: 14.5, color: "#64748B", margin: 0 }}>
                Use our contact form and provide a few details so the right team can understand your requirement.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="contact-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name <span className="required-indicator">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Enter your name"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Business / Organization Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your business name"
                    value={form.businessName}
                    onChange={e => setForm({ ...form, businessName: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-grid">
                <div className="form-group">
                  <label className="form-label">Work Email <span className="required-indicator">*</span></label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="Enter your business email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Enter your contact number"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">I’m Interested In <span className="required-indicator">*</span></label>
                <select
                  className="form-select"
                  value={form.interestedIn}
                  onChange={e => setForm({ ...form, interestedIn: e.target.value })}
                >
                  {INTERESTED_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">How Can We Help? <span className="required-indicator">*</span></label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Tell us about your requirement or question."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <div style={{ marginTop: 8 }}>
                <button type="submit" disabled={status === "submitting"} className="submit-btn">
                  {status === "submitting" ? (
                    <>
                      <div style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#FFF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Submitting...
                    </>
                  ) : status === "success" ? (
                    "Submitted Successfully ✓"
                  ) : status === "error" ? (
                    "Failed to Submit — Try Again"
                  ) : (
                    <>
                      <FiSend style={{ width: 14, height: 14 }} /> Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ═══ OFFICE VISIT SECTION ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 44, borderTop: "1px solid #F1F5F9", paddingTop: 56, textAlign: "left" }}>
            
            {/* Visit Us Address */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px", transition: "all 0.3s ease" }} className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiMapPin style={{ color: "#16A34A", width: 16, height: 16 }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Visit Us</span>
              </div>
              <p style={{ fontSize: 14.5, fontWeight: 700, color: "#334155", margin: "0 0 4px" }}>MessBee</p>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "0 0 16px" }}>
                <br />
                510, Devika Tower, Chander Nagar, Ghaziabad, Uttar Pradesh – 201011, India
              </p>
              <p style={{ fontSize: 13.5, color: "#475569", margin: "0 0 6px" }}>
                <FiPhone style={{ display: "inline", verticalAlign: "middle", marginRight: 6, color: "#16A34A" }} /> 0120-2611111, +91-9217742081
              </p>
              <p style={{ fontSize: 13.5, color: "#475569", margin: 0 }}>
                <FiMail style={{ display: "inline", verticalAlign: "middle", marginRight: 6, color: "#16A34A" }} /> support@messbee.com
              </p>
            </div>

            {/* Connect With MessBee */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px", transition: "all 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiShare2 style={{ color: "#16A34A", width: 16, height: 16 }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Connect With MessBee</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>
                Follow MessBee for product updates, business insights, and company news.
              </p>
              
              {/* Social Channels List */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                {["LinkedIn", "Facebook", "Instagram", "YouTube", "X"].map((social) => (
                  <span key={social} style={{
                    fontSize: 12.5, fontWeight: 600, color: "#166534",
                    background: "#DCFCE7", border: "1px solid #86EFAC",
                    borderRadius: 20, padding: "5px 12px", cursor: "pointer",
                    transition: "all 0.2s"
                  }} onMouseOver={e => { e.currentTarget.style.background = "#16A34A"; e.currentTarget.style.color = "#FFF"; }} onMouseOut={e => { e.currentTarget.style.background = "#DCFCE7"; e.currentTarget.style.color = "#166534"; }}>{social}</span>
                ))}
              </div>
              <p style={{ fontSize: 13.5, color: "#475569", margin: 0 }}>
                <FiMail style={{ display: "inline", verticalAlign: "middle", marginRight: 6, color: "#16A34A" }} /> hello@messbee.com
              </p>
            </div>

            {/* Product Help */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px", transition: "all 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiHelpCircle style={{ color: "#16A34A", width: 16, height: 16 }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Looking for Product Help?</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>
                If you're already a MessBee customer and need technical or account assistance, the Help Center may be the quickest place to find an answer.
              </p>
              
              <div style={{ display: "flex", gap: 12 }}>
                <button className="contact-btn" style={{ fontSize: 12.5, padding: "8px 16px", margin: 0 }} onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}>
                  Visit FAQs
                </button>
                <button className="contact-btn-secondary" style={{ fontSize: 12.5, padding: "8px 16px", margin: 0 }} onClick={() => window.location.href = "mailto:support@messbee.com"}>
                  Contact Support
                </button>
              </div>
            </div>

          </div>

          {/* ═══ FAQ SECTION ═══ */}
          <div id="faq-section" style={{ marginTop: 80, borderTop: "1px solid #F1F5F9", paddingTop: 46 }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10 }}>FAQ</p>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1.2px", margin: 0 }}>
                Frequently Asked <span style={{ color: "#16A34A" }}>Questions</span>
              </h2>
            </div>
            
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              {FAQS.map((faq, i) => (
                <FaqItem key={i} {...faq} />
              ))}
            </div>
          </div>

          {/* ═══ JOIN US / TALK TO MESSBEE SECTION ═══ */}
          <div style={{ marginTop: 80, background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)", border: "1px solid #BBF7D0", borderRadius: 24, padding: "48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32, textAlign: "left" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: "#0F172A", letterSpacing: "-1px", marginBottom: 10 }}>
                We’re Ready to <span style={{ color: "#16A34A" }}>Hear From You</span>
              </h2>
              <p style={{ fontSize: 14.5, color: "#166534", lineHeight: 1.7, margin: 0 }}>
                Whether you're starting your digital journey, looking to improve your existing business operations or exploring a partnership with MessBee, we're happy to hear from you. Have a question? Start the conversation.
              </p>
            </div>
            
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <button className="contact-btn" style={{ margin: 0 }} onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}>
                <FiSend style={{ width: 14, height: 14 }} /> Send an Enquiry
              </button>
              <button className="contact-btn-secondary" style={{ background: "#FFFFFF", margin: 0 }} onClick={() => window.location.href = "mailto:support@messbee.com"}>
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
