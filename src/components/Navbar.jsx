import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultLogo from "../assets/logo.jpeg";
import messbeeText from "../assets/messbee_text.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const productDropdownRef = useRef(null);
  const solutionsDropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setProductDropdownOpen(false);
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target)) {
        setSolutionsDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target)) {
        setResourcesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    if (path === "/#features") {
      if (location.pathname === "/") {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#features";
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { label: "Products" },
    { label: "Solutions" },
    { label: "QR & Connect", path: "/qr-connect" },
    { label: "Pricing", path: "/pricing" },
    { label: "Resources" },
  ];

  const productLinks = [
    { label: "CRM", path: "/crm" },
    { label: "WhatsApp Business", path: "/whatsapp-business" },
    { label: "Marketing Automation", path: "/marketing-automation" },
    { label: "AI & Automation", path: "/ai-automation" },
    { label: "Digital Store", path: "/digital-store" },
  ];

  const solutionsLinks = [
    { label: "Small & Medium Businesses", path: "/solutions/small-medium-businesses" },
    { label: "Retail & Local Businesses", path: "/solutions/retail-local-businesses" },
    { label: "E-commerce", path: "/solutions/e-commerce" },
    { label: "Service Businesses", path: "/solutions/service-businesses" },
  ];

  const resourcesLinks = [
    { label: "Business Library", path: "/resources/business-library" },
    { label: "Help Center", path: "/resources/help-center" },
    { label: "Blog", path: "/resources/blog" },
    { label: "FAQs", path: "/resources/faqs" },
    { label: "Contact Support", path: "/contact-support" },
  ];

  return (
    <>
      <style>{`
        .nav-btn-login { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 600; color: #111827; font-family: inherit; padding: 8px 16px; border-radius: 8px; transition: background 0.2s; }
        .nav-btn-login:hover { background: rgba(0,0,0,0.05); }
        
        .nav-btn-register { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.1); cursor: pointer; font-size: 12px; font-weight: 600; color: #111827; font-family: inherit; padding: 8px 20px; border-radius: 8px; transition: background 0.2s; }
        .nav-btn-register:hover { background: rgba(0,0,0,0.06); }
        
        .nav-btn-start { background: #16A34A; border: none; color: #FFFFFF; padding: 10px 24px; font-size: 14px; font-weight: 700; border-radius: 8px; cursor: pointer; font-family: inherit; transition: background 0.2s; }
        .nav-btn-start:hover { background: #00B248; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }

        /* 4 Horizontal Lines Menu Button for Mobile */
        .mobile-menu-btn {
          display: none;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          cursor: pointer;
          padding: 8px 9px;
          flex-direction: column;
          justify-content: center;
          gap: 3.5px;
          align-items: center;
          transition: all 0.2s ease;
        }
        .mobile-menu-btn:hover {
          background: #F0FDF4;
          border-color: #BBF7D0;
        }
        .mobile-menu-btn .line {
          width: 20px;
          height: 2px;
          background: #0F172A;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: #1E293B;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          user-select: none;
        }
        .mobile-menu-link:hover, .mobile-menu-link.active {
          background: #F0FDF4;
          color: #16A34A;
        }
        .mobile-sub-link {
          display: block;
          padding: 8px 10px 8px 18px;
          font-size: 12.5px;
          font-weight: 500;
          color: #475569;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .mobile-sub-link:hover, .mobile-sub-link.active {
          background: #F8FAFC;
          color: #16A34A;
          padding-left: 22px;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-desktop-auth { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* Main Fixed Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "#FFFFFF",
        borderBottom: "none",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)",
        padding: "0 6%",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => handleNavigation("/")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
            <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.6px", fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center" }}>
            <span style={{ color: "#15803D" }}>Mess</span>
            <span style={{ color: "#4ADE80" }}>Bee</span>
          </span>
        </div>

        {/* Desktop Nav links */}
        <div className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/#features" && location.pathname === "/" && location.hash === "#features");
            
            if (link.label === "Products" || link.label === "Solutions" || link.label === "Resources") {
              const isProduct = link.label === "Products";
              const isSolutions = link.label === "Solutions";
              const isResources = link.label === "Resources";
              const isOpen = isProduct ? productDropdownOpen : isSolutions ? solutionsDropdownOpen : resourcesDropdownOpen;
              const setOpen = isProduct ? setProductDropdownOpen : isSolutions ? setSolutionsDropdownOpen : setResourcesDropdownOpen;
              const linksList = isProduct ? productLinks : isSolutions ? solutionsLinks : resourcesLinks;
              const dropdownRef = isProduct ? productDropdownRef : isSolutions ? solutionsDropdownRef : resourcesDropdownRef;

              return (
                <div key={link.label} style={{ position: "relative" }} ref={dropdownRef}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: isOpen ? "#16A34A" : "#4B5563", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                    onClick={() => {
                      if (isProduct) { setSolutionsDropdownOpen(false); setResourcesDropdownOpen(false); } 
                      else if (isSolutions) { setProductDropdownOpen(false); setResourcesDropdownOpen(false); }
                      else if (isResources) { setProductDropdownOpen(false); setSolutionsDropdownOpen(false); }
                      setOpen(!isOpen);
                    }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = "#111827"; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = "#4B5563"; }}>
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>

                  {isOpen && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "0px",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                      padding: "8px 0",
                      width: "200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0px",
                      zIndex: 1000,
                    }}>
                      {/* Arrow */}
                      <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "12px", height: "12px", background: "#FFFFFF", borderLeft: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0" }} />
                      
                      {linksList.map(pLink => {
                        const isSubActive = location.pathname === pLink.path;
                        return (
                          <div
                            key={pLink.label}
                            style={{
                              position: "relative",
                              zIndex: 2,
                              padding: "10px 16px",
                              fontSize: 12,
                              fontWeight: 500,
                              color: isSubActive ? "#16A34A" : "#334155",
                              background: isSubActive ? "#F0FDF4" : "transparent",
                              cursor: "pointer",
                              borderRadius: "0px",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={e => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = "#F8FAFC";
                                e.currentTarget.style.color = "#16A34A";
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#334155";
                              }
                            }}
                            onClick={() => {
                              setOpen(false);
                              handleNavigation(pLink.path);
                            }}
                          >
                            {pLink.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <span key={link.label} style={{ color: isActive ? "#16A34A" : "#4B5563", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}
                onClick={() => handleNavigation(link.path)}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#111827"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#4B5563"; }}>
                {link.label}
              </span>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="nav-desktop-auth" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-btn-login" onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/login", "_blank")}>
            Login
          </button>
          <button className="nav-btn-register" onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}>
            Register
          </button>
        </div>

        {/* 4 Laying Lines Menu Button (Mobile View) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
          title="Open Menu"
        >
          <span className="line" />
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </button>
      </nav>

      {/* ── Mobile Side Menu Overlay ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(3px)",
          zIndex: 9998,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ── Mobile Side Menu Card (Auto Height till Content) ── */}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          width: "66%",
          maxWidth: 245,
          height: "auto",
          maxHeight: "calc(100vh - 20px)",
          background: "#FFFFFF",
          zIndex: 9999,
          borderRadius: 16,
          border: "1px solid #E2E8F0",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          transform: mobileMenuOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-8px)",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: "16px 14px 16px",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #F1F5F9", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }} onClick={() => handleNavigation("/")}>
            <div style={{ width: 26, height: 26, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
              <img src={defaultLogo} alt="MessBee" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.5px", fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: "#15803D" }}>Mess</span>
              <span style={{ color: "#4ADE80" }}>Bee</span>
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
            style={{
              background: "#F1F5F9",
              border: "none",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748B",
              transition: "background 0.2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Products Accordion */}
          <div>
            <div
              className={`mobile-menu-link ${mobileProductsOpen ? "active" : ""}`}
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              <span>Products</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: mobileProductsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {mobileProductsOpen && (
              <div style={{ padding: "4px 0 6px 6px", borderLeft: "2px solid #DCFCE7", marginLeft: 14 }}>
                {productLinks.map((p) => (
                  <div
                    key={p.label}
                    className={`mobile-sub-link ${location.pathname === p.path ? "active" : ""}`}
                    onClick={() => handleNavigation(p.path)}
                  >
                    {p.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Accordion */}
          <div>
            <div
              className={`mobile-menu-link ${mobileSolutionsOpen ? "active" : ""}`}
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
            >
              <span>Solutions</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: mobileSolutionsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {mobileSolutionsOpen && (
              <div style={{ padding: "4px 0 6px 6px", borderLeft: "2px solid #DCFCE7", marginLeft: 14 }}>
                {solutionsLinks.map((s) => (
                  <div
                    key={s.label}
                    className={`mobile-sub-link ${location.pathname === s.path ? "active" : ""}`}
                    onClick={() => handleNavigation(s.path)}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QR & Connect */}
          <div
            className={`mobile-menu-link ${location.pathname === "/qr-connect" ? "active" : ""}`}
            onClick={() => handleNavigation("/qr-connect")}
          >
            <span>QR & Connect</span>
          </div>

          {/* Pricing */}
          <div
            className={`mobile-menu-link ${location.pathname === "/pricing" ? "active" : ""}`}
            onClick={() => handleNavigation("/pricing")}
          >
            <span>Pricing</span>
          </div>

          {/* Resources Accordion */}
          <div>
            <div
              className={`mobile-menu-link ${mobileResourcesOpen ? "active" : ""}`}
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
            >
              <span>Resources</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: mobileResourcesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {mobileResourcesOpen && (
              <div style={{ padding: "4px 0 6px 6px", borderLeft: "2px solid #DCFCE7", marginLeft: 14 }}>
                {resourcesLinks.map((r) => (
                  <div
                    key={r.label}
                    className={`mobile-sub-link ${location.pathname === r.path ? "active" : ""}`}
                    onClick={() => handleNavigation(r.path)}
                  >
                    {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Auth CTAs */}
        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12, marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/login", "_blank")}
            style={{
              width: "100%",
              padding: "9px 0",
              background: "#F8FAFC",
              border: "1.5px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              color: "#0F172A",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
          
          <button
            onClick={() => window.open((import.meta.env.VITE_ADMIN_URL || "http://localhost:5174") + "/signup", "_blank")}
            style={{
              width: "100%",
              padding: "9px 0",
              background: "#16A34A",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              color: "#FFFFFF",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)",
              transition: "background 0.2s",
            }}
          >
            Get Started / Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
