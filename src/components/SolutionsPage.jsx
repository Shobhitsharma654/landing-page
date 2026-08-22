import Navbar from "./Navbar";
import React, { useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

const SolutionsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [openFaq, setOpenFaq] = React.useState(0);
  const [activeSolutionModal, setActiveSolutionModal] = React.useState(null);

  const faqs = [
    {
      q: "What industries does MessBee support?",
      a: "MessBee supports 16+ industries including Retail, Restaurants, Healthcare, Education, Salons, Gyms, Real Estate, Automobile, Manufacturing, and more. Each solution is purpose-built with industry-specific workflows."
    },
    {
      q: "Can I customize workflows for my business?",
      a: "Yes, absolutely! MessBee's platform allows you to create highly customized workflows tailored exactly to your unique business needs."
    },
    {
      q: "Does MessBee integrate with WhatsApp Business API?",
      a: "Yes, MessBee is natively built on the official WhatsApp Business API, ensuring seamless and compliant integration for all your customer communications."
    },
    {
      q: "How secure is my business data?",
      a: "We take security seriously. All data is end-to-end encrypted and stored securely using industry-best practices to protect your business and customer information."
    },
    {
      q: "Can I migrate from another platform?",
      a: "Our onboarding team provides full assistance to help you smoothly transition your existing data and workflows from other platforms into MessBee without disruption."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const connectedTools = [
    { label: "WhatsApp", icon: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></>, color: "#10B981", bgColor: "#D1FAE5" },
    { label: "CRM", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, color: "#3B82F6", bgColor: "#DBEAFE" },
    { label: "Analytics", icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>, color: "#8B5CF6", bgColor: "#EDE9FE" },
    { label: "Payments", icon: <><rect x="2" y="5" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /></>, color: "#F59E0B", bgColor: "#FEF3C7" },
    { label: "Marketing", icon: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></>, color: "#EC4899", bgColor: "#FCE7F3" },
    { label: "Inventory", icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>, color: "#14B8A6", bgColor: "#CCFBF1" },
    { label: "Orders", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>, color: "#F97316", bgColor: "#FFEDD5" },
    { label: "AI", icon: <><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></>, color: "#6366F1", bgColor: "#E0E7FF" },
    { label: "Support", icon: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>, color: "#10B981", bgColor: "#D1FAE5" }
  ];

  const industries = [
    { name: "Retail", icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />, color: "#10B981" },
    { name: "Restaurants", icon: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></>, color: "#F59E0B" },
    { name: "Pharmacy", icon: <><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>, color: "#3B82F6" },
    { name: "Healthcare", icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />, color: "#EF4444" },
    { name: "Hospitals", icon: <><path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /><path d="M9 7h6" /><path d="M9 11h6" /></>, color: "#8B5CF6" },
    { name: "Education", icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>, color: "#06B6D4" },
    { name: "Coaching", icon: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />, color: "#F97316" },
    { name: "Schools", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />, color: "#EC4899" },
    { name: "Beauty", icon: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22v-7" /></>, color: "#D946EF" },
    { name: "Gym", icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>, color: "#14B8A6" },
    { name: "Real Estate", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>, color: "#64748B" },
    { name: "Automobile", icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M3 11l2.5-6h13l2.5 6" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></>, color: "#3B82F6" },
  ];

  const filters = ["All", "Retail", "Healthcare", "Education", "Services", "Industrial"];

  const industryCards = [
    {
      id: "retail",
      category: "Retail",
      icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
      color: "#10B981",
      bgColor: "#D1FAE5",
      title: "Retail & Grocery",
      desc: "Sell smarter with a complete digital retail platform.",
      tags: ["POS", "Inventory", "Loyalty", "Analytics"],
      dashboard: {
        type: "retail",
        sales: "â‚¹84,200",
        orders: "1,204",
        stats: [
          { label: "In-Store", val: "42%" },
          { label: "Online", val: "38%" },
          { label: "Delivery", val: "20%" }
        ]
      }
    },
    {
      id: "restaurants",
      category: "Services",
      icon: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></>,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      title: "Restaurants & CafÃ©s",
      desc: "Manage orders, reservations and payments from one platform.",
      tags: ["Orders", "Reservations", "Billing", "Reports"],
      dashboard: {
        type: "restaurant",
        liveOrders: 12,
        orders: [
          { name: "Table 4", status: "Preparing", progress: 60 },
          { name: "Delivery #29", status: "On the way", progress: 90 },
          { name: "QR Order #31", status: "New", progress: 20 },
        ],
        revenue: "â‚¹52K",
        tables: "18/24"
      }
    },
    {
      id: "pharmacy",
      category: "Healthcare",
      icon: <><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
      color: "#3B82F6",
      bgColor: "#DBEAFE",
      title: "Pharmacy",
      desc: "Digitize medicine ordering and patient communication.",
      tags: ["Inventory", "Prescriptions", "Delivery", "Reminders"],
      dashboard: {
        type: "pharmacy",
        stock: { in: 2841, low: 43, expired: 5 },
        orders: 284,
        refills: 67
      }
    },
    {
      id: "healthcare",
      category: "Healthcare",
      icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
      color: "#EF4444",
      bgColor: "#FEE2E2",
      title: "Healthcare & Clinics",
      desc: "Manage patients, appointments and healthcare communication digitally.",
      tags: ["Bookings", "Patient CRM", "Payments", "Reports"],
      dashboard: {
        type: "healthcare",
        schedule: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        activeAppt: "11:00",
        patients: 142,
        wait: "8 min"
      }
    },
    {
      id: "hospitals",
      category: "Healthcare",
      icon: <><path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /><path d="M9 7h6" /><path d="M9 11h6" /></>,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      title: "Hospitals",
      desc: "Complete patient engagement and hospital management platform.",
      tags: ["OPD / IPD", "Departments", "Analytics", "Comms"],
      dashboard: {
        type: "hospitals",
        opd: 284, ipd: 96, icu: 12,
        occupancy: [
          { dept: "Cardiology", val: 91 },
          { dept: "Orthopedics", val: 74 },
          { dept: "Pediatrics", val: 58 }
        ]
      }
    },
    {
      id: "education",
      category: "Education",
      icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
      color: "#06B6D4",
      bgColor: "#CFFAFE",
      title: "Education",
      desc: "Digitize admissions, fees and student communication seamlessly.",
      tags: ["Admissions", "Fee", "Student CRM", "Analytics"],
      dashboard: {
        type: "education",
        pipeline: [
          { stage: "Enquiries", val: 480, max: 500 },
          { stage: "Applied", val: 212, max: 500 },
          { stage: "Enrolled", val: 96, max: 500 }
        ],
        attendance: "88%",
        feeCollected: "â‚¹4.2Cr"
      }
    },
    {
      id: "coaching",
      category: "Education",
      icon: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
      color: "#F97316",
      bgColor: "#FFEDD5",
      title: "Coaching Institutes",
      desc: "Manage enquiries, admissions and student learning efficiently.",
      tags: ["Tests", "CRM", "Marketing", "Analytics"],
      dashboard: {
        type: "coaching",
        performance: [30, 45, 25, 60, 50, 80, 70],
        students: "1,840",
        passRate: "82%"
      }
    },
    {
      id: "schools",
      category: "Education",
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
      color: "#EC4899",
      bgColor: "#FCE7F3",
      title: "Schools & Colleges",
      desc: "Connect students, parents and teachers on one platform.",
      tags: ["Attendance", "Timetable", "Fees", "Parent App"],
      dashboard: {
        type: "schools",
        present: "1,104",
        absent: "96",
        attendancePercent: 92,
        parentAlerts: "48 sent",
        dueFees: "â‚¹2.1L"
      }
    },
    {
      id: "beauty",
      category: "Services",
      icon: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22v-7" /></>,
      color: "#EC4899",
      bgColor: "#FDF2F8",
      title: "Beauty & Salon",
      desc: "Grow your salon with online bookings and customer loyalty.",
      tags: ["Bookings", "Loyalty", "Staff", "Revenue"],
      dashboard: {
        type: "beauty",
        calendar: [
          { name: "Priya", status: "booked" }, { name: "Anjali", status: "booked" }, { name: "Free", status: "free" }, { name: "Meera", status: "booked" },
          { name: "Kavya", status: "booked" }, { name: "Free", status: "free" }, { name: "Riya", status: "booked" }, { name: "Sonal", status: "booked" }
        ],
        revenue: "â‚¹28K",
        members: "340"
      }
    },
    {
      id: "gym",
      category: "Services",
      icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
      color: "#10B981",
      bgColor: "#ECFDF5",
      title: "Gym & Fitness",
      desc: "Manage memberships, trainers and customer engagement.",
      tags: ["Members", "Attendance", "Payments", "Reports"],
      dashboard: {
        type: "gym",
        active: 842,
        checkIns: 128,
        renewals: 34,
        split: { monthly: 61, annual: 39 }
      }
    },
    {
      id: "realestate",
      category: "Services",
      icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
      color: "#64748B",
      bgColor: "#F8FAFC",
      title: "Real Estate",
      desc: "Capture leads and close deals faster with smart CRM tools.",
      tags: ["Listings", "Lead CRM", "Pipeline", "Analytics"],
      dashboard: {
        type: "realestate",
        pipeline: [
          { stage: "New Leads", val: 48 },
          { stage: "Site Visit", val: 22 },
          { stage: "Negotiation", val: 9 },
          { stage: "Closed", val: 4 }
        ],
        listings: 182,
        revenue: "â‚¹6.2Cr"
      }
    },
    {
      id: "automobile",
      category: "Retail",
      icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M3 11l2.5-6h13l2.5 6" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></>,
      color: "#3B82F6",
      bgColor: "#EFF6FF",
      title: "Automobile",
      desc: "Manage vehicle sales and service operations digitally.",
      tags: ["Catalog", "Service", "CRM", "Payments"],
      dashboard: {
        type: "automobile",
        testDrives: 24, serviceJobs: 38, deliveries: 7,
        bayStatus: [
          { bay: "Bay 1 - In Progress", color: "#3B82F6" },
          { bay: "Bay 2 - Ready", color: "#10B981" },
          { bay: "Bay 3 - Waiting", color: "#F59E0B" }
        ]
      }
    },
    {
      id: "manufacturing",
      category: "Industrial",
      icon: <><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /></>,
      color: "#D97706",
      bgColor: "#FFF7ED",
      title: "Manufacturing",
      desc: "Manage production, inventory and distributors efficiently.",
      tags: ["Inventory", "Production", "CRM", "Reports"],
      dashboard: {
        type: "manufacturing",
        production: [40, 60, 45, 70, 50, 85, 60, 90],
        efficiency: "94%",
        stockValue: "â‚¹1.8Cr",
        materials: 82, goods: 67
      }
    },
    {
      id: "distributors",
      category: "Industrial",
      icon: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
      title: "Distributors",
      desc: "Manage dealers, retailers and supply chain operations.",
      tags: ["Dealers", "Orders", "Stock", "Analytics"],
      dashboard: {
        type: "distributors",
        fulfillment: [
          { label: "Dispatched", val: 128 },
          { label: "In Transit", val: 34 },
          { label: "Delivered", val: 286 }
        ],
        dealers: 240,
        gmv: "â‚¹8.4Cr"
      }
    },
    {
      id: "professionalservices",
      category: "Services",
      icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
      color: "#0D9488",
      bgColor: "#F0FDFA",
      title: "Professional Services",
      desc: "Manage appointments, projects and client communication.",
      tags: ["Bookings", "Projects", "Invoicing", "Client CRM"],
      dashboard: {
        type: "professionalservices",
        projects: [
          { name: "Brand Redesign", val: 72 },
          { name: "SEO Campaign", val: 45 },
          { name: "Market Study", val: 100 }
        ],
        clients: 84,
        revenue: "â‚¹42L"
      }
    },
    {
      id: "ngos",
      category: "Services",
      icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>,
      color: "#E11D48",
      bgColor: "#FFF1F2",
      title: "NGOs",
      desc: "Manage donors, volunteers and community engagement campaigns.",
      tags: ["Donations", "Volunteers", "Campaigns", "Impact"],
      dashboard: {
        type: "ngos",
        donations: "â‚¹18.4L",
        donors: "1,240",
        volunteers: 380,
        campaigns: [
          { name: "Education Drive", val: 78, color: "#E11D48" },
          { name: "Food Relief", val: 54, color: "#F59E0B" }
        ]
      }
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0F172A", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR (Copied from LandingPage) */}
      <Navbar />

      {/* HERO SECTION */}
      <section style={{
        flex: 1,
        padding: "92px 6% 48px",
        position: "relative",
        background: "#FFFFFF",
        overflow: "hidden"
      }}>
        {/* Background Decorative Circle */}
        <div style={{
          position: "absolute",
          top: -200,
          right: -100,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,83,0.08) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0
        }} />

        <div style={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,83,0.05) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: "4vw", position: "relative", zIndex: 1 }}>

          {/* Left Content */}
          <div style={{ flex: 1, minWidth: 400, alignSelf: "flex-start" }}>
            <div style={{
              display: "inline-block",
              background: "#D1FAE5",
              color: "#059669",
              padding: "4px 12px",
              borderRadius: 40,
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: 16,
              textTransform: "uppercase"
            }}>
              Solutions
            </div>

            <h1 style={{ fontSize: "clamp(28px, 2.9vw, 42px)", fontWeight: 900, lineHeight: 1.12, color: "#0F172A", marginBottom: 16, letterSpacing: "-1px" }}>
              Solutions Built for<br />
              <span style={{ color: "#16A34A" }}>Every Industry</span>
            </h1>

            <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.65, marginBottom: 28, maxWidth: 480, fontWeight: 400 }}>
              Purpose-built solutions designed for every industry. Digitize customer engagement, sales, operations, payments and business growth with MessBee.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 60 }}>
              <button 
                onClick={() => document.getElementById("find-your-industry")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                background: "#16A34A",
                color: "#FFFFFF",
                border: "none",
                padding: "13px 22px",
                borderRadius: 40,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 10px 25px rgba(0, 200, 83, 0.25)"
              }}>
                Explore Industries
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>

              <button 
                onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login"}
                style={{
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                padding: "13px 22px",
                borderRadius: 40,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
              }}>
                Book Demo
              </button>
            </div>

            <div style={{ display: "flex", gap: 48 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>16+</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>Industries</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>10K+</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>Businesses</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>99.9%</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginTop: 4 }}>Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Network Graph */}
          <div style={{ flex: 1, minWidth: 400, position: "relative", height: 600, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -30 }}>

            {/* Center Logo */}
            <div style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "#16A34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              boxShadow: "0 20px 40px rgba(0, 200, 83, 0.3)"
            }}>
              {/* Pulse effect behind logo */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#16A34A",
                animation: "pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
                zIndex: -1
              }} />
              <img src={defaultLogo} alt="MessBee" style={{ width: 48, height: 48, borderRadius: 12, objectFit: "contain", background: "#FFF", padding: 6 }} />
            </div>

            {/* Orbiting Icons */}
            {industries.map((ind, i) => {
              const total = industries.length;
              const angle = (i * 360) / total;
              // Start from top (Retail)
              const rad = (angle - 90) * (Math.PI / 180);
              const radius = 170; // Distance from center

              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <React.Fragment key={ind.name}>
                  {/* Dashed Line from center to icon */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: radius,
                    height: 1,
                    background: "linear-gradient(90deg, rgba(0,200,83,0.2) 0%, rgba(0,200,83,0.2) 50%, transparent 50%)",
                    backgroundSize: "8px 1px",
                    transformOrigin: "0 0",
                    transform: `rotate(${angle - 90}deg)`,
                    zIndex: 1
                  }} />

                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    zIndex: 5
                  }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                      border: "1px solid #F1F5F9",
                      color: ind.color
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {ind.icon}
                      </svg>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B", whiteSpace: "nowrap" }}>
                      {ind.name}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIND YOUR INDUSTRY SECTION */}
      <section id="find-your-industry" style={{ padding: "80px 6%", background: "#F8FAFC", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div style={{
            display: "inline-block",
            background: "#D1FAE5",
            color: "#059669",
            padding: "6px 14px",
            borderRadius: 40,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1px",
            marginBottom: 20,
            textTransform: "uppercase"
          }}>
            Industry Solutions
          </div>

          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A", marginBottom: 16, letterSpacing: "-1px" }}>
            Find Your Industry
          </h2>

          <p style={{ fontSize: 16, color: "#64748B", marginBottom: 48, fontWeight: 400, maxWidth: 600, margin: "0 auto 48px" }}>
            Tailored workflows, automations, and tools for your specific business type.
          </p>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 56 }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 40,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: activeFilter === f ? "none" : "1px solid #D1D5DB",
                  background: activeFilter === f ? "#16A34A" : "#FFFFFF",
                  color: activeFilter === f ? "#FFFFFF" : "#374151",
                  transition: "all 0.2s",
                  boxShadow: "none"
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "left" }}>
            {industryCards.filter(c => activeFilter === "All" || c.category === activeFilter).map(card => (
              <div key={card.id} style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                border: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: card.bgColor, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 3 }}>{card.title}</h3>
                    <p style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.4 }}>{card.desc}</p>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {card.tags.map(tag => (
                    <span key={tag} style={{
                      background: card.bgColor,
                      color: card.color,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dashboard Area */}
                <div style={{ background: "#FAFAFA", borderRadius: 12, border: "1px solid #F1F5F9", padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.5px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.color }} />
                    Live Dashboard
                  </div>

                  {/* Dynamic Dashboard Content */}
                  {card.dashboard.type === "retail" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>Sales Today</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.sales}</div>
                          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none" style={{ marginTop: 8 }}>
                            <polyline points="0,20 20,15 40,22 60,10 80,18 100,5" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>Orders</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.orders}</div>
                          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 24, marginTop: 8 }}>
                            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: card.color, borderRadius: 2 }} />)}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {card.dashboard.stats.map(s => (
                          <div key={s.label} style={{ flex: 1, background: "#FFF", borderRadius: 8, padding: "8px 0", textAlign: "center", border: "1px solid #F1F5F9" }}>
                            <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2 }}>{s.label}</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>{s.val}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "restaurant" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                          <span style={{ fontSize: 10, color: "#94A3B8" }}>Live Orders</span>
                          <span style={{ fontSize: 9, fontWeight: 800, color: "#FFF", background: card.color, padding: "2px 6px", borderRadius: 10 }}>{card.dashboard.liveOrders} active</span>
                        </div>
                        {card.dashboard.orders.map((o, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10 }}>
                            <span style={{ color: "#475569", width: 60 }}>{o.name}</span>
                            <div style={{ flex: 1, height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ width: `${o.progress}%`, height: "100%", background: card.color, borderRadius: 2 }} />
                            </div>
                            <span style={{ color: "#94A3B8", width: 50, textAlign: "right" }}>{o.status}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Revenue</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.revenue}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Tables</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.tables}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "pharmacy" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Inventory Status</div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                          <span style={{ color: "#475569" }}>In Stock</span>
                          <span style={{ fontWeight: 800, color: card.color }}>{card.dashboard.stock.in.toLocaleString()}</span>
                        </div>
                        <div style={{ width: "100%", height: 4, background: card.color, borderRadius: 2, marginBottom: 12 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                          <span style={{ color: "#475569" }}>Low Stock</span>
                          <span style={{ fontWeight: 800, color: "#F59E0B" }}>{card.dashboard.stock.low}</span>
                        </div>
                        <div style={{ width: "15%", height: 4, background: "#F59E0B", borderRadius: 2, marginBottom: 12 }} />

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                          <span style={{ color: "#475569" }}>Expired</span>
                          <span style={{ fontWeight: 800, color: "#EF4444" }}>{card.dashboard.stock.expired}</span>
                        </div>
                        <div style={{ width: "5%", height: 4, background: "#EF4444", borderRadius: 2 }} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Orders</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.orders}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Refills</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.refills}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "healthcare" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Today's Schedule</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                          {card.dashboard.schedule.map(t => (
                            <div key={t} style={{
                              background: t === card.dashboard.activeAppt ? card.color : "#F8FAFC",
                              color: t === card.dashboard.activeAppt ? "#FFF" : "#64748B",
                              fontSize: 9,
                              fontWeight: 700,
                              textAlign: "center",
                              padding: "4px 0",
                              borderRadius: 12,
                              border: t === card.dashboard.activeAppt ? "none" : "1px solid #E2E8F0"
                            }}>
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Patients</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.patients}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Wait</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.wait}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "hospitals" && (
                    <>
                      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        {[
                          { label: "OPD", val: card.dashboard.opd },
                          { label: "IPD", val: card.dashboard.ipd },
                          { label: "ICU", val: card.dashboard.icu }
                        ].map(d => (
                          <div key={d.label} style={{ flex: 1, background: "#FFF", borderRadius: 20, padding: "12px 0", textAlign: "center", border: "1px solid #F1F5F9" }}>
                            <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>{d.label}</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{d.val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Dept. Occupancy</div>
                        {card.dashboard.occupancy.map((o, i) => (
                          <div key={i} style={{ marginBottom: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                              <span style={{ color: "#475569" }}>{o.dept}</span>
                              <span style={{ fontWeight: 800, color: i === 0 ? card.color : i === 1 ? "#F59E0B" : "#3B82F6" }}>{o.val}%</span>
                            </div>
                            <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2 }}>
                              <div style={{ width: `${o.val}%`, height: "100%", background: i === 0 ? card.color : i === 1 ? "#F59E0B" : "#3B82F6", borderRadius: 2 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "education" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Admissions Pipeline</div>
                        {card.dashboard.pipeline.map((p, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10 }}>
                            <span style={{ color: "#475569", width: 60 }}>{p.stage}</span>
                            <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${(p.val / p.max) * 100}%`, height: "100%", background: card.color, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontWeight: 800, color: "#0F172A", width: 30, textAlign: "right" }}>{p.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Attendance</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: card.color }}>{card.dashboard.attendance}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Fee Collected</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.feeCollected}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "coaching" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Test Performance</div>
                        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60, marginBottom: 8 }}>
                          {card.dashboard.performance.map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: card.color, borderRadius: "4px 4px 0 0" }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#94A3B8" }}>
                          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Students</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.students}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Pass Rate</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.passRate}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "schools" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12, position: "relative" }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 16 }}>Today Attendance</div>

                        <div style={{ display: "flex", gap: 24 }}>
                          <div>
                            <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Present</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.present}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Absent</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: "#475569" }}>{card.dashboard.absent}</div>
                          </div>
                        </div>

                        {/* Circular Progress Gauge Mock */}
                        <div style={{ position: "absolute", top: 12, right: 12, width: 40, height: 40, borderRadius: "50%", border: `3px solid ${card.color}`, borderLeftColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 9, fontWeight: 800, color: card.color }}>{card.dashboard.attendancePercent}%</span>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Parent Alerts</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.parentAlerts}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Due Fees</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.dueFees}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "beauty" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Appointment Calendar</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
                          {card.dashboard.calendar.map((c, i) => (
                            <div key={i} style={{
                              background: c.status === "booked" ? card.bgColor : "#F8FAFC",
                              color: c.status === "booked" ? card.color : "#94A3B8",
                              fontSize: 9,
                              fontWeight: 700,
                              textAlign: "center",
                              padding: "4px 0",
                              borderRadius: 12
                            }}>
                              {c.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Revenue</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.revenue}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Members</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.members}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "gym" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>Active Members</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color, marginBottom: 8 }}>{card.dashboard.active}</div>
                          <svg width="100%" height="16" viewBox="0 0 100 16" preserveAspectRatio="none">
                            <polyline points="0,14 30,10 60,12 100,2" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9", flex: 1 }}>
                            <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2 }}>Check-Ins</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.checkIns}</div>
                          </div>
                          <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9", flex: 1 }}>
                            <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2 }}>Renewals</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.renewals}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Membership Split</div>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                            <span style={{ color: "#475569" }}>Monthly</span>
                            <span style={{ fontWeight: 800, color: card.color }}>{card.dashboard.split.monthly}%</span>
                          </div>
                          <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2 }}>
                            <div style={{ width: `${card.dashboard.split.monthly}%`, height: "100%", background: card.color, borderRadius: 2 }} />
                          </div>
                        </div>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                            <span style={{ color: "#475569" }}>Annual</span>
                            <span style={{ fontWeight: 800, color: "#8B5CF6" }}>{card.dashboard.split.annual}%</span>
                          </div>
                          <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2 }}>
                            <div style={{ width: `${card.dashboard.split.annual}%`, height: "100%", background: "#8B5CF6", borderRadius: 2 }} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "realestate" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Sales Pipeline</div>
                        {card.dashboard.pipeline.map((p, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10 }}>
                            <span style={{ color: "#475569", width: 60 }}>{p.stage}</span>
                            <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${(p.val / 50) * 100}%`, height: "100%", background: card.color, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontWeight: 800, color: "#0F172A", width: 20, textAlign: "right" }}>{p.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Listings</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.listings}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Revenue</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.revenue}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "automobile" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                        {[
                          { label: "Test Drives", val: card.dashboard.testDrives },
                          { label: "Service Jobs", val: card.dashboard.serviceJobs },
                          { label: "Deliveries", val: card.dashboard.deliveries }
                        ].map(d => (
                          <div key={d.label} style={{ background: "#FFF", borderRadius: "50%", aspectRatio: "1", padding: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #F1F5F9" }}>
                            <div style={{ fontSize: 8, color: "#94A3B8", textAlign: "center", marginBottom: 2 }}>{d.label}</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{d.val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Service Bay Status</div>
                        {card.dashboard.bayStatus.map((b, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10, color: "#475569" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color }} />
                            {b.bay}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "manufacturing" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Production Output</div>
                        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 40 }}>
                          {card.dashboard.production.map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: card.color, borderRadius: "4px 4px 0 0", opacity: 0.5 + (i / 15) }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Efficiency</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.efficiency}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Stock Value</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.stockValue}</div>
                        </div>
                      </div>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                          <span style={{ color: "#475569" }}>Raw Materials</span>
                          <span style={{ fontWeight: 800, color: card.color }}>{card.dashboard.materials}%</span>
                        </div>
                        <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2, marginBottom: 12 }}>
                          <div style={{ width: `${card.dashboard.materials}%`, height: "100%", background: card.color, borderRadius: 2 }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                          <span style={{ color: "#475569" }}>Finished Goods</span>
                          <span style={{ fontWeight: 800, color: "#F59E0B" }}>{card.dashboard.goods}%</span>
                        </div>
                        <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2 }}>
                          <div style={{ width: `${card.dashboard.goods}%`, height: "100%", background: "#F59E0B", borderRadius: 2 }} />
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "distributors" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Order Fulfillment</div>
                        {card.dashboard.fulfillment.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10 }}>
                            <span style={{ color: "#475569", width: 60 }}>{f.label}</span>
                            <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${(f.val / 300) * 100}%`, height: "100%", background: card.color, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontWeight: 800, color: "#0F172A", width: 30, textAlign: "right" }}>{f.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Dealers</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.dealers}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>GMV</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.gmv}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "professionalservices" && (
                    <>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Projects Overview</div>
                        {card.dashboard.projects.map((p, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 10 }}>
                            <span style={{ color: "#475569", width: 70 }}>{p.name}</span>
                            <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${p.val}%`, height: "100%", background: card.color, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontWeight: 800, color: "#94A3B8", width: 20, textAlign: "right" }}>{p.val}%</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Clients</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color }}>{card.dashboard.clients}</div>
                        </div>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Revenue</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.revenue}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {card.dashboard.type === "ngos" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                        <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>Donations</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: card.color, marginBottom: 8 }}>{card.dashboard.donations}</div>
                          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
                            <polyline points="0,20 20,15 40,22 60,10 80,18 100,5" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9", flex: 1 }}>
                            <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2 }}>Donors</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.donors}</div>
                          </div>
                          <div style={{ background: "#FFF", borderRadius: 8, padding: "8px 12px", border: "1px solid #F1F5F9", flex: 1 }}>
                            <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 2 }}>Volunteers</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>{card.dashboard.volunteers}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ background: "#FFF", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 12 }}>Campaign Progress</div>
                        {card.dashboard.campaigns.map((c, i) => (
                          <div key={i} style={{ marginBottom: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                              <span style={{ color: "#475569" }}>{c.name}</span>
                              <span style={{ fontWeight: 800, color: c.color }}>{c.val}%</span>
                            </div>
                            <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2 }}>
                              <div style={{ width: `${c.val}%`, height: "100%", background: c.color, borderRadius: 2 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <button 
                  onClick={() => setActiveSolutionModal(card)}
                  style={{
                  width: "100%",
                  marginTop: 10,
                  background: card.bgColor,
                  color: card.color,
                  border: "none",
                  padding: "7px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4
                }}>
                  View Solution
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section style={{ padding: "80px 6%", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          <div style={{
            display: "inline-block",
            background: "#D1FAE5",
            color: "#059669",
            padding: "6px 14px",
            borderRadius: 40,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1px",
            marginBottom: 20,
            textTransform: "uppercase"
          }}>
            Why MessBee
          </div>

          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 56, letterSpacing: "-1px" }}>
            One Platform. Everything Included.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, textAlign: "left" }}>

            {/* Traditional Software Card */}
            <div style={{
              background: "#F8FAFC",
              borderRadius: 24,
              padding: 40,
              border: "1px solid #F1F5F9"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#FEE2E2", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>Traditional Software</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  "Multiple disconnected tools",
                  "Separate CRM systems",
                  "Manual customer communication",
                  "Data silos everywhere",
                  "Higher operational cost",
                  "No automation",
                  "Complex integrations"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, color: "#64748B", fontSize: 16, fontWeight: 500 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FEE2E2", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* MessBee Card */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: 40,
              border: "2px solid #10B981",
              boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.15)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Top right decorative shape */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "#ECFDF5", borderRadius: "50%", zIndex: 0 }} />

              <div style={{ position: "absolute", top: 32, right: 32, background: "#10B981", color: "#FFF", padding: "6px 14px", borderRadius: 40, fontSize: 12, fontWeight: 800, zIndex: 1 }}>
                Recommended
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, position: "relative", zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#D1FAE5", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>MessBee</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                {[
                  "WhatsApp Business API",
                  "Built-in CRM",
                  "Marketing Automation",
                  "Payment Collection",
                  "Customer Engagement",
                  "Analytics & Reports",
                  "AI Automation"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, color: "#0F172A", fontSize: 16, fontWeight: 600 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#D1FAE5", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* EVERYTHING CONNECTED SECTION */}
      <section style={{ padding: "80px 6%", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 16, letterSpacing: "-1px" }}>
              Everything Connected
            </h2>
            <p style={{ fontSize: 18, color: "#64748B", fontWeight: 400 }}>
              MessBee unifies all your business tools into one intelligent platform.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

            {/* Left: Network Graph */}
            <div style={{ position: "relative", height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Lines and Nodes */}
              {connectedTools.map((tool, i) => {
                // Adjusting the starting angle to be at top (-90 deg), incrementing clockwise
                const angle = -90 + (i * 360) / connectedTools.length;
                const radius = 160; // distance from center
                const rad = (angle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                return (
                  <React.Fragment key={tool.id || tool.label}>
                    {/* Line connecting to center */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: radius,
                      height: 2,
                      background: `linear-gradient(90deg, #10B981, ${tool.color})`,
                      transformOrigin: "0 50%",
                      transform: `translate(0, -50%) rotate(${angle}deg)`,
                      opacity: 0.3,
                      zIndex: 1
                    }} />

                    {/* Node */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      zIndex: 2
                    }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: tool.bgColor,
                        color: tool.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)"
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {tool.icon}
                        </svg>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{tool.label}</span>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Center Node */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "#10B981",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                zIndex: 10,
                color: "#FFF"
              }}>
                <img src={defaultLogo} alt="MessBee" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", marginBottom: 4 }} />
                <span style={{ fontSize: 12, fontWeight: 800 }}>messbee</span>
              </div>
            </div>

            {/* Right: List of Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {connectedTools.map((tool, i) => (
                <div key={i} style={{
                  background: "#FFFFFF",
                  borderRadius: 16,
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
                  border: "1px solid #F1F5F9"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: tool.bgColor, color: tool.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {tool.icon}
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 2 }}>{tool.label}</div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>Fully integrated</div>
                    </div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* METRICS BANNER */}
      <section style={{ padding: "64px 6%", background: "#22C55E", color: "#FFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>10,000+</div>
            <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Businesses Onboarded</div>
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>50M+</div>
            <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Messages Sent</div>
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>â‚¹500Cr+</div>
            <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Payments Processed</div>
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>98%</div>
            <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.9 }}>Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section style={{ padding: "50px 6%", background: "#FFFFFF", textAlign: "center" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          <div style={{
            display: "inline-block",
            background: "#D1FAE5",
            color: "#059669",
            padding: "6px 14px",
            borderRadius: 40,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1px",
            marginBottom: 20,
            textTransform: "uppercase"
          }}>
            Success Stories
          </div>

          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 64, letterSpacing: "-1px" }}>
            Businesses Love MessBee
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32, textAlign: "left", marginBottom: 32 }}>

            {/* Testimonial 1 */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#10B981", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>
                    RM
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Ravi Mehta</div>
                    <div style={{ fontSize: 13, color: "#94A3B8" }}>FreshMart Retail Chain</div>
                  </div>
                </div>
                <div style={{ background: "#D1FAE5", color: "#059669", padding: "6px 12px", borderRadius: 40, fontSize: 12, fontWeight: 800 }}>
                  +240% Online Orders
                </div>
              </div>

              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 16, color: "#10B981" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                </div>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6 }}>
                  "MessBee transformed how we engage customers. Our WhatsApp ordering went live in days and repeat purchases tripled."
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ color: "#10B981", background: "#D1FAE5", padding: "4px 10px", borderRadius: 40 }}>Retail</span>
                  <span style={{ color: "#94A3B8" }}>120 Stores</span>
                </div>
                <div style={{ color: "#10B981", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, padding: 5, display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#EF4444", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>
                    PS
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Dr. Priya Sharma</div>
                    <div style={{ fontSize: 13, color: "#94A3B8" }}>HealthFirst Clinics</div>
                  </div>
                </div>
                <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "6px 12px", borderRadius: 40, fontSize: 12, fontWeight: 800 }}>
                  +85% Appointments
                </div>
              </div>

              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 16, color: "#EF4444" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                </div>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6 }}>
                  "Patient communication is seamless now. Automated reminders cut no-shows by 60% and our ratings improved significantly."
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ color: "#EF4444", background: "#FEE2E2", padding: "4px 10px", borderRadius: 40 }}>Healthcare</span>
                  <span style={{ color: "#94A3B8" }}>18 Clinics</span>
                </div>
                <div style={{ color: "#EF4444", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            <div style={{ width: 24, height: 8, borderRadius: 8, background: "#10B981" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2E8F0" }} />
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: "50px 6%", background: "#F8FAFC", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <div style={{
            display: "inline-block",
            background: "#D1FAE5",
            color: "#059669",
            padding: "6px 14px",
            borderRadius: 40,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1px",
            marginBottom: 20,
            textTransform: "uppercase"
          }}>
            FAQ
          </div>

          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 64, letterSpacing: "-1px" }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out"
                }}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: 0 }}>{faq.q}</h3>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: openFaq === i ? "#10B981" : "#F1F5F9",
                    color: openFaq === i ? "#FFF" : "#64748B",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    transition: "all 0.2s"
                  }}>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {openFaq === i && (
                  <div style={{ padding: "0 32px 24px", color: "#64748B", fontSize: 15, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "120px 6%", background: "#22C55E", color: "#FFF", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -100, left: -50, width: 400, height: 400, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -50, right: -50, width: 300, height: 300, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", zIndex: 0 }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ display: "flex" }}>
              {["RM", "PS", "AK", "SP"].map((initials, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255, 255, 255, 0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800,
                  marginLeft: i === 0 ? -4 : -10, zIndex: 4 - i
                }}>
                  {initials}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>10,000+ businesses trust MessBee</span>
          </div>

          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, marginBottom: 24, letterSpacing: "-1px", lineHeight: 1.2 }}>
            Ready to Transform<br />Your Business?
          </h2>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", opacity: 0.9, marginBottom: 48, lineHeight: 1.6, maxWidth: 700, margin: "0 auto 48px" }}>
            Launch your business with MessBee and automate customer engagement, operations, sales and growth from one platform.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button 
              onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login"}
              style={{
              background: "#FFF", color: "#22C55E", border: "none", padding: "14px 32px",
              borderRadius: 40, fontSize: 16, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}>
              Get Started
            </button>
            <button 
              onClick={() => navigate("/contact")}
              style={{
              background: "transparent", color: "#FFF", border: "1px solid rgba(255, 255, 255, 0.5)", padding: "14px 32px",
              borderRadius: 40, fontSize: 16, fontWeight: 800, cursor: "pointer",
              transition: "all 0.2s"
            }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              Talk to Sales
            </button>
            <button 
              onClick={() => navigate("/contact#contact-form-section")}
              style={{
              background: "transparent", color: "#FFF", border: "1px solid rgba(255, 255, 255, 0.5)", padding: "14px 32px",
              borderRadius: 40, fontSize: 16, fontWeight: 800, cursor: "pointer",
              transition: "all 0.2s"
            }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              Contact Support
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* SOLUTION MODAL */}
      {activeSolutionModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: "#FFF",
            width: "100%",
            maxWidth: 600,
            borderRadius: 24,
            padding: 40,
            position: "relative",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <button 
              onClick={() => setActiveSolutionModal(null)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "#F1F5F9",
                border: "none",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748B"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: activeSolutionModal.bgColor,
                color: activeSolutionModal.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {activeSolutionModal.icon}
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: activeSolutionModal.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {activeSolutionModal.category}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {activeSolutionModal.title}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.6, marginBottom: 32 }}>
              {activeSolutionModal.desc} This is a placeholder for detailed information about the {activeSolutionModal.title} solution. Here you can add specific features, case studies, or a demo video.
            </p>

            <div style={{ display: "flex", gap: 16 }}>
              <button 
                onClick={() => window.location.href = (import.meta.env.VITE_ADMIN_URL || "http://localhost:5173") + "/login"}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 14px 24px -5px ${activeSolutionModal.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 10px 20px -5px ${activeSolutionModal.color}40`;
                }}
                style={{
                  flex: 1,
                  background: activeSolutionModal.color,
                  color: "#FFF",
                  border: "none",
                  padding: "16px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: `0 10px 20px -5px ${activeSolutionModal.color}40`,
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Start Trial
              </button>
              <button 
                onClick={() => setActiveSolutionModal(null)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F1F5F9";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}
                style={{
                  flex: 1,
                  background: "#F8FAFC",
                  color: "#0F172A",
                  border: "1px solid #E2E8F0",
                  padding: "16px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionsPage;
