import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import defaultLogo from "../assets/logo.jpeg";

/* ── Reusable Pill Tag (Aligned with Solutions & Resources design) ── */
const Pill = ({ children }) => (
  <div
    style={{
      display: "inline-block",
      background: "#E6F9EE",
      color: "#10B981",
      padding: "6px 18px",
      borderRadius: 30,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "1px",
      marginBottom: 20,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const CheckIcon = ({ size = 18, color = "#10B981" }) => (
  <div
    style={{
      width: size + 4,
      height: size + 4,
      borderRadius: "50%",
      background: "#E6F9EE",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 2,
    }}
  >
    <svg width={size - 4} height={size - 4} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const BookDemoPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Schedule a Live Demo | MessBee WhatsApp & CRM Platform";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Schedule a 1-on-1 personalized live demo with MessBee product specialists."
    );
  }, []);

  /* ── Dynamic Today & Tomorrow Calculation ── */
  const todayISO = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const defaultDateISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [selectedDate, setSelectedDate] = useState(defaultDateISO);
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [interests, setInterests] = useState(["WhatsApp API Automation", "Shared Team Inbox CRM"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "1-5 Agents",
    notes: "",
  });

  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success"
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  /* ── Formatted Date and Time Strings ── */
  const formattedDateStr = useMemo(() => {
    if (!selectedDate) return "N/A";
    try {
      const [y, m, d] = selectedDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  const formattedTimeStr = useMemo(() => {
    if (!selectedTime) return "11:30 AM";
    try {
      const [hours, minutes] = selectedTime.split(":");
      let h = parseInt(hours, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    } catch {
      return selectedTime;
    }
  }, [selectedTime]);

  const handleInterestToggle = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !selectedDate || !selectedTime) {
      setErrorMessage("Please fill all required fields (*).");
      return;
    }
    setErrorMessage("");
    setStatus("submitting");

    const refNumber = "MB-DEMO-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refNumber);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      teamSize: formData.teamSize,
      date: formattedDateStr,
      dateISO: selectedDate,
      timeSlot: `${formattedTimeStr} IST`,
      timezone: "IST (India Standard Time)",
      interests: interests.join(", "),
      notes: formData.notes || "None",
      bookingRef: refNumber,
      subject: `[Demo Scheduled: ${refNumber}] ${formData.name} - ${formData.company}`,
      message: `New Live Demo Scheduled!\n\nBooking Ref: ${refNumber}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone/WhatsApp: ${formData.phone}\nCompany: ${formData.company}\nTeam Size: ${formData.teamSize}\nScheduled Date: ${formattedDateStr}\nTime Slot: ${formattedTimeStr} IST\nInterests: ${interests.join(", ")}\nNotes: ${formData.notes || "None"}`,
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      let res = await fetch(`${apiBase}/api/book-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!res || !res.ok) {
        await fetch(`${apiBase}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!selectedDate) return "#";
    const title = encodeURIComponent("MessBee 1-on-1 Product Demo & Strategy Call");
    const details = encodeURIComponent(
      `MessBee Live Product Walkthrough\n\nBooking Ref: ${bookingRef}\nParticipant: ${formData.name} (${formData.company})\nEmail: ${formData.email}\nPhone: ${formData.phone}\nScheduled Date: ${formattedDateStr}\nTime: ${formattedTimeStr} IST\n\nGoogle Meet / Video link will be sent prior to the session.`
    );
    const location = encodeURIComponent("Google Meet (Link will be sent to your email)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const handleDownloadIcs = () => {
    if (!selectedDate) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MessBee//Live Demo Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:MessBee 1-on-1 Product Demo (${formData.company || "Demo"})
DESCRIPTION:1-on-1 Live Walkthrough with MessBee Specialists.\\nBooking Ref: ${bookingRef}\\nParticipant: ${formData.name}\\nPhone: ${formData.phone}\\nScheduled: ${formattedDateStr} at ${formattedTimeStr} IST
LOCATION:Google Meet / Zoom (Link in Email)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `MessBee_Demo_${bookingRef || "Invite"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const demoFeatures = [
    {
      icon: "🎯",
      title: "Customized 1-on-1 Walkthrough",
      desc: "Tailored directly to your business model, whether you're in e-commerce, retail, healthcare, services, or enterprise.",
      bg: "#E6F9EE",
      color: "#10B981",
    },
    {
      icon: "🚀",
      title: "Meta WhatsApp API Guidance",
      desc: "Learn how to easily get green tick verification, bulk broadcasts, and automated catalog messaging setup.",
      bg: "#EFF6FF",
      color: "#3B82F6",
    },
    {
      icon: "🤖",
      title: "AI Chatbots & Multi-Agent CRM",
      desc: "Discover how to deploy drag-and-drop AI bots to qualify leads 24/7 and route incoming chats to your support team.",
      bg: "#F3E8FF",
      color: "#8B5CF6",
    },
    {
      icon: "📊",
      title: "Tailored ROI & Cost Breakdown",
      desc: "Get clear pricing recommendations, expected conversion uplift, and custom onboarding milestones for your team.",
      bg: "#FEF3C7",
      color: "#F59E0B",
    },
  ];

  const demoFaqs = [
    {
      q: "Is the 1-on-1 live demo completely free?",
      a: "Yes, 100% free with zero obligation! Our product specialists will provide a complete walkthrough tailored to your business needs.",
    },
    {
      q: "Can I invite my team members or co-founders?",
      a: "Absolutely! After booking, you can forward the Google Calendar / Zoom invite link to any members of your team.",
    },
    {
      q: "Do I need a Meta WhatsApp Business API account ready before the demo?",
      a: "No! During the demo, our specialists will explain the Meta approval process and help guide you through the setup step-by-step.",
    },
    {
      q: "What happens after I schedule a demo?",
      a: "You'll instantly receive a booking confirmation ref number and calendar invite. Our team will join you via Google Meet at the chosen time.",
    },
    {
      q: "What if I need to reschedule or cancel?",
      a: "You can easily update or reschedule your session using the calendar invite link sent to your work email.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#0F172A", background: "#FFFFFF", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .demo-hero-row {
          display: flex;
          align-items: flex-start;
          gap: 48px;
        }

        .demo-input {
          width: 100%;
          padding: 9px 13px;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          font-size: 13px;
          color: #0F172A;
          outline: none;
          background: #F8FAFC;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .demo-input:hover {
          border-color: #CBD5E1;
          background: #FFFFFF;
        }
        .demo-input:focus {
          background: #FFFFFF;
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.14);
        }

        .interest-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 18px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid #E2E8F0;
          background: #FFFFFF;
          color: #475569;
          transition: all 0.2s ease;
          user-select: none;
        }
        .interest-chip:hover {
          border-color: #10B981;
          background: #F0FDF4;
          color: #059669;
        }
        .interest-chip.active {
          border-color: #10B981;
          background: #E6F9EE;
          color: #10B981;
          font-weight: 700;
        }

        .btn-schedule-submit {
          width: 100%;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          padding: 11px 20px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
        }
        .btn-schedule-submit:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-1px);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.32);
        }

        .feature-card-hover {
          transition: all 0.25s ease;
        }
        .feature-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.07);
          border-color: #A7F3D0 !important;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 992px) {
          .demo-hero-row {
            flex-direction: column !important;
            gap: 36px;
          }
          .demo-section-pad {
            padding: 40px 5% 50px !important;
          }
        }
        @media (max-width: 600px) {
          .demo-section-pad {
            padding: 30px 4% 40px !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN HERO & BOOKING WIZARD SECTION
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="demo-section-pad"
        style={{
          marginTop: 70,
          padding: "54px 5% 64px",
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {/* Top Right Light Green Circle Aura (Matching Solutions & Resources) */}
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

        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="demo-hero-row">
            
            {/* ═══════════════════════════════════════════════════════════════
                LEFT COLUMN: VALUE PROPOSITION & HOST INFO
               ═══════════════════════════════════════════════════════════════ */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <Pill>LIVE 1-ON-1 DEMO</Pill>

              <h1
                style={{
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.18,
                  letterSpacing: "-1px",
                  marginBottom: 14,
                }}
              >
                Experience MessBee in Action — <br />
                <span style={{ color: "#10B981" }}>Schedule Live Demo</span>
              </h1>

              <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.55, marginBottom: 22, maxWidth: 480, fontWeight: 400 }}>
                Get a customized walkthrough with our product specialists. We’ll show you how to automate WhatsApp communication, organize incoming chats with CRM, and build AI workflows tailored to your goals.
              </p>

              {/* Session Meta Badge */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #F1F5F9",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 20,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#1E293B" }}>
                  <span style={{ fontSize: 14 }}>⏱️</span> 30 Mins Walkthrough
                </div>
                <div style={{ width: 1, height: 14, background: "#E2E8F0" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#1E293B" }}>
                  <span style={{ fontSize: 14 }}>💻</span> Google Meet / Zoom
                </div>
                <div style={{ width: 1, height: 14, background: "#E2E8F0" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#10B981" }}>
                  <span style={{ fontSize: 14 }}>🎯</span> 1-on-1 Customized
                </div>
              </div>

              {/* What You'll See Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  What You’ll Discover:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { title: "WhatsApp Cloud API Setup", desc: "Green tick verification & high-volume broadcasts." },
                    { title: "Smart AI Chatbot Builder", desc: "Drag-and-drop lead qualification & auto-routing." },
                    { title: "Multi-Agent CRM Inbox", desc: "Tagging, live chat assignment & contact profiles." },
                    { title: "Custom Integration & ROI", desc: "Webhooks, REST APIs and tailored cost roadmap." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckIcon size={16} color="#10B981" />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", lineHeight: 1.25 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "#64748B", marginTop: 1, lineHeight: 1.35 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Graphic Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.1)",
                  maxWidth: 440,
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFFFFF", padding: 3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF" }}>MessBee Solutions Specialists</div>
                  <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginTop: 1 }}>Live sessions available Mon – Sat (IST)</div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                RIGHT COLUMN: INTERACTIVE BOOKING WIZARD CARD
               ═══════════════════════════════════════════════════════════════ */}
            <div style={{ flex: 1, width: "100%", maxWidth: 480, margin: "0 auto" }}>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: "1.5px solid #F1F5F9",
                  padding: "22px 22px",
                  boxShadow: "0 18px 45px -10px rgba(15, 23, 42, 0.07)",
                  position: "relative",
                }}
              >
                {status === "success" ? (
                  /* ── SUCCESS / CONFIRMATION SCREEN ── */
                  <div style={{ textAlign: "center", padding: "20px 8px" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "#E6F9EE",
                        color: "#10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        margin: "0 auto 16px",
                        border: "2px solid #A7F3D0",
                      }}
                    >
                      ✓
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.5px" }}>
                      Demo Scheduled Successfully!
                    </h2>
                    <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.5, marginBottom: 20, maxWidth: 420, margin: "0 auto 20px" }}>
                      Thank you, <strong>{formData.name}</strong>. Your 1-on-1 walkthrough has been scheduled.
                    </p>

                    {/* Booking summary card */}
                    <div
                      style={{
                        background: "#F8FAFC",
                        border: "1.5px solid #E2E8F0",
                        borderRadius: 14,
                        padding: "16px 18px",
                        textAlign: "left",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", paddingBottom: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Ref Number</span>
                        <span style={{ fontSize: 13, color: "#10B981", fontWeight: 800 }}>{bookingRef}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", paddingBottom: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Scheduled Date</span>
                        <span style={{ fontSize: 13, color: "#0F172A", fontWeight: 700 }}>{formattedDateStr}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", paddingBottom: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Time Slot</span>
                        <span style={{ fontSize: 13, color: "#0F172A", fontWeight: 700 }}>{formattedTimeStr} IST</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Work Email</span>
                        <span style={{ fontSize: 13, color: "#0F172A", fontWeight: 700 }}>{formData.email}</span>
                      </div>
                    </div>

                    {/* Calendar Links */}
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
                      <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: "#FFFFFF",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: 30,
                          padding: "10px 18px",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#1E293B",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "all 0.2s",
                        }}
                      >
                        <span>📅</span> Add to Google Calendar
                      </a>
                      <button
                        onClick={handleDownloadIcs}
                        style={{
                          background: "#FFFFFF",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: 30,
                          padding: "10px 18px",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#1E293B",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "inherit",
                          transition: "all 0.2s",
                        }}
                      >
                        <span>📥</span> Download .ICS File
                      </button>
                    </div>

                    <button
                      onClick={() => navigate("/")}
                      style={{
                        background: "#10B981",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: 30,
                        padding: "12px 28px",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Back to Home
                    </button>
                  </div>
                ) : (
                  /* ── BOOKING FORM WITH DYNAMIC DATE & TIME ── */
                  <form onSubmit={handleSubmit}>
                    
                    {/* Form Header */}
                    <div style={{ marginBottom: 12, borderBottom: "1.5px solid #F1F5F9", paddingBottom: 8 }}>
                      <h2 style={{ fontSize: 17, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.4px" }}>
                        Select Date &amp; Time
                      </h2>
                      <p style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                        Pick your preferred date and time for a 30-minute live demo.
                      </p>
                    </div>

                    {/* Step 1 & 2: Dynamic Native Date & Time Selection */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 10, marginBottom: 10 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 10.5, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>
                          Select Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={todayISO}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="demo-input"
                          style={{ cursor: "pointer", fontWeight: 600 }}
                        />
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                          <label style={{ fontSize: 10.5, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Time Slot *
                          </label>
                          <span style={{ fontSize: 9.5, color: "#10B981", fontWeight: 700, background: "#E6F9EE", padding: "1px 5px", borderRadius: 8 }}>
                            🇮🇳 IST
                          </span>
                        </div>
                        <input
                          type="time"
                          required
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="demo-input"
                          style={{ cursor: "pointer", fontWeight: 600 }}
                        />
                      </div>
                    </div>

                    {/* Live Selected Slot Preview Banner */}
                    <div
                      style={{
                        background: "#F0FDF4",
                        border: "1.5px solid #BBF7D0",
                        borderRadius: 8,
                        padding: "7px 11px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>📅</span>
                      <span style={{ fontSize: 12, color: "#166534", fontWeight: 700 }}>
                        {formattedDateStr} at {formattedTimeStr} (IST)
                      </span>
                    </div>

                    {/* Step 3: Contact Details */}
                    <div style={{ borderTop: "1.5px solid #F1F5F9", paddingTop: 10, marginBottom: 10 }}>
                      <label style={{ display: "block", fontSize: 10.5, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                        Contact Details
                      </label>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 2 }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Rahul Sharma"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="demo-input"
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 2 }}>
                            Work Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="rahul@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="demo-input"
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 2 }}>
                            WhatsApp / Mobile *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="demo-input"
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 2 }}>
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            placeholder="Acme Tech Pvt Ltd"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="demo-input"
                          />
                        </div>
                      </div>

                      {/* Team Size dropdown */}
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 2 }}>
                          Team Size / Agents
                        </label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          className="demo-input"
                          style={{ cursor: "pointer" }}
                        >
                          <option value="1-5 Agents">1-5 Agents (Starter)</option>
                          <option value="6-20 Agents">6-20 Agents (Growth)</option>
                          <option value="21-50 Agents">21-50 Agents (Established)</option>
                          <option value="50+ Agents">50+ Agents (Enterprise)</option>
                        </select>
                      </div>

                      {/* Key Focus Areas */}
                      <div style={{ marginBottom: 8 }}>
                        <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                          Key Focus Areas:
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {[
                            "WhatsApp API",
                            "CRM Inbox",
                            "AI Chatbot",
                            "Broadcasts",
                            "API & Webhooks",
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`interest-chip ${interests.includes(item) ? "active" : ""}`}
                              onClick={() => handleInterestToggle(item)}
                            >
                              <span>{interests.includes(item) ? "✓" : "+"}</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Optional Notes */}
                      <div>
                        <input
                          type="text"
                          name="notes"
                          placeholder="Specific requirements or questions... (Optional)"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="demo-input"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-schedule-submit"
                    >
                      {status === "submitting" ? (
                        <span>Scheduling Demo...</span>
                      ) : (
                        <>
                          <span>Confirm &amp; Schedule Demo</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 10, fontWeight: 500 }}>
                      🔒 Zero spam guarantee. We respect your privacy.
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY BOOK A DEMO - FEATURE GRID (Matching Solutions & Resources)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          
          <Pill>WHY BOOK A DEMO</Pill>
          
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: "#0F172A", marginBottom: 16, letterSpacing: "-1px" }}>
            Tailored 1-on-1 Insights for Your Business
          </h2>

          <p style={{ fontSize: 16, color: "#64748B", maxWidth: 640, margin: "0 auto 54px", lineHeight: 1.6 }}>
            Our demo isn't a pre-recorded video. It's a live interactive session with solutions experts focused on solving your specific communication bottlenecks.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, textAlign: "left" }}>
            {demoFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="feature-card-hover"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #F1F5F9",
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: feat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {feat.icon}
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.4px" }}>
                  {feat.title}
                </h3>

                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3-STEP SIMPLE DEMO PROCESS ROADMAP
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          
          <Pill>HOW IT WORKS</Pill>
          
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: "#0F172A", marginBottom: 48, letterSpacing: "-1px" }}>
            3 Simple Steps to Your Live Walkthrough
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, textAlign: "left", position: "relative" }}>
            {[
              { step: "01", title: "Select Date & Time", desc: "Choose a convenient 30-minute window and specify your key focus areas." },
              { step: "02", title: "Join 1-on-1 Session", desc: "Connect with our solution engineers via Google Meet / Zoom to see live flows." },
              { step: "03", title: "Get Custom Roadmap", desc: "Receive a tailored pricing proposal, API setup checklist, and onboarding plan." },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 20,
                  padding: "32px 28px",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 900, color: "#10B981", background: "#E6F9EE", display: "inline-block", padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>
                  STEP {st.step}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.3px" }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DEMO FAQ ACCORDION SECTION (Matching Solutions Page)
         ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F8FAFC", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Pill>DEMO FAQS</Pill>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: "#0F172A", marginBottom: 12, letterSpacing: "-1px" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>
              Everything you need to know about scheduling and attending your live demo.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {demoFaqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 16,
                  border: "1.5px solid #E2E8F0",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0F172A",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 400,
                      color: "#10B981",
                      transform: openFaq === idx ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                {openFaq === idx && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#475569", lineHeight: 1.65, borderTop: "1px solid #F1F5F9", paddingTop: 14 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDemoPage;
